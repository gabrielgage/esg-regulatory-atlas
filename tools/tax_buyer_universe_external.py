#!/usr/bin/env python3
"""Build a public/private U.S. tax-credit buyer research universe from public data.

This script contains only public-source extraction and modeling logic. It does not
contain ACT confidential data. Output is commercial research, not tax/legal advice.

Primary sources:
- SEC XBRL Frames API for CY2023-CY2025 tax facts.
- SEC company/ticker/exchange reference data.
- SEC DERA Financial Statement Data Sets mirrored from official SEC ZIP files by
  rodrigoakiray/Brennan-report (manifest retains official SEC URL and dates).
- Inc. 5000 API for a named U.S. private-company proxy population; fallback to a
  public 2024 snapshot hosted by Toby1219/inc-5000.

Private-company revenue and tax-capacity values are modeled proxies, never verified
liabilities or legal eligibility determinations.
"""
from __future__ import annotations

import argparse
import csv
import io
import json
import math
import os
import re
import sys
import time
from dataclasses import dataclass
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any, Iterable

import duckdb
import pandas as pd
import requests

RUN_DATE = date.today().isoformat()
SEC_UA = os.environ.get(
    "SEC_USER_AGENT",
    "ACT Tax Buyer Universe Research (contact: ggage@actgroup.com)",
)
SEC_HEADERS = {
    "User-Agent": SEC_UA,
    "Accept-Encoding": "gzip, deflate",
    "Host": "data.sec.gov",
}
SEC_WWW_HEADERS = {
    "User-Agent": SEC_UA,
    "Accept-Encoding": "gzip, deflate",
    "Host": "www.sec.gov",
}
GENERIC_HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; TaxBuyerUniverse/1.2)"}

CONCEPT_PRIORITY = [
    "CurrentFederalTaxExpenseBenefit",
    "CurrentFederalStateAndLocalTaxExpenseBenefit",
    "IncomeTaxExpenseBenefit",
]
YEARS = [2023, 2024, 2025]
SCREEN_THRESHOLDS = [10_000_000, 25_000_000, 50_000_000, 100_000_000, 250_000_000, 500_000_000]

MISSING = {
    "not_reported": "NOT REPORTED",
    "not_available": "NOT AVAILABLE",
    "not_retrieved": "NOT RETRIEVED",
    "unknown": "UNKNOWN",
    "not_applicable": "NOT APPLICABLE",
    "not_assessed": "NOT ASSESSED",
    "proxy": "PROXY",
}


def log(msg: str) -> None:
    print(f"[{datetime.now(timezone.utc).isoformat()}] {msg}", flush=True)


def get_json(url: str, headers: dict[str, str], attempts: int = 6, timeout: int = 90) -> Any:
    last: Exception | None = None
    for attempt in range(1, attempts + 1):
        try:
            r = requests.get(url, headers=headers, timeout=timeout)
            if r.status_code == 404:
                return None
            if r.status_code in {403, 429, 500, 502, 503, 504}:
                raise RuntimeError(f"HTTP {r.status_code}: {r.text[:200]}")
            r.raise_for_status()
            return r.json()
        except Exception as exc:  # noqa: BLE001
            last = exc
            wait = min(30, 1.5 ** attempt)
            log(f"retry {attempt}/{attempts} for {url}: {exc}; sleep {wait:.1f}s")
            time.sleep(wait)
    raise RuntimeError(f"failed after {attempts} attempts: {url}: {last}")


def download(url: str, path: Path, attempts: int = 6, timeout: int = 180) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and path.stat().st_size > 0:
        return path
    last: Exception | None = None
    for attempt in range(1, attempts + 1):
        try:
            with requests.get(url, headers=GENERIC_HEADERS, timeout=timeout, stream=True) as r:
                if r.status_code == 404:
                    raise FileNotFoundError(url)
                r.raise_for_status()
                tmp = path.with_suffix(path.suffix + ".tmp")
                with tmp.open("wb") as fh:
                    for chunk in r.iter_content(chunk_size=1024 * 1024):
                        if chunk:
                            fh.write(chunk)
                tmp.replace(path)
            return path
        except Exception as exc:  # noqa: BLE001
            last = exc
            if isinstance(exc, FileNotFoundError):
                raise
            wait = min(30, 1.5 ** attempt)
            log(f"retry download {attempt}/{attempts} for {url}: {exc}; sleep {wait:.1f}s")
            time.sleep(wait)
    raise RuntimeError(f"download failed: {url}: {last}")


def safe_num(value: Any) -> float | None:
    try:
        if value is None or value == "":
            return None
        x = float(value)
        if math.isnan(x) or math.isinf(x):
            return None
        return x
    except (TypeError, ValueError):
        return None


def normalize_company_name(name: Any) -> str:
    s = str(name or "").upper().strip()
    s = re.sub(r"\b(THE|INCORPORATED|INC|CORPORATION|CORP|COMPANY|CO|LIMITED|LTD|LLC|PLC|LP|L P)\b", " ", s)
    s = re.sub(r"[^A-Z0-9]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def yesno(flag: bool) -> str:
    return "YES" if flag else "NO"


def cik10(cik: Any) -> str:
    try:
        return f"{int(cik):010d}"
    except (TypeError, ValueError):
        return ""


def parse_date(value: Any) -> str:
    if value is None:
        return ""
    s = str(value)
    if len(s) == 8 and s.isdigit():
        return f"{s[:4]}-{s[4:6]}-{s[6:]}"
    return s[:10]


def sic_sector(sic: Any, description: str = "") -> str:
    try:
        x = int(float(sic))
    except (TypeError, ValueError):
        x = -1
    if 100 <= x <= 999:
        return "Agriculture, Forestry & Fishing"
    if 1000 <= x <= 1499:
        return "Mining, Oil & Gas"
    if 1500 <= x <= 1799:
        return "Construction"
    if 2000 <= x <= 3999:
        return "Manufacturing"
    if 4000 <= x <= 4799:
        return "Transportation & Logistics"
    if 4800 <= x <= 4899:
        return "Communication Services"
    if 4900 <= x <= 4999:
        return "Utilities"
    if 5000 <= x <= 5199:
        return "Wholesale Trade"
    if 5200 <= x <= 5999:
        return "Retail & Consumer"
    if 6000 <= x <= 6799:
        return "Financials & Real Estate"
    if 7000 <= x <= 7999:
        return "Business & Consumer Services"
    if 8000 <= x <= 8099:
        return "Healthcare"
    if 8100 <= x <= 8999:
        return "Professional Services"
    if 9000 <= x <= 9999:
        return "Public Administration"
    d = (description or "").lower()
    if "bank" in d or "insurance" in d or "investment" in d:
        return "Financials & Real Estate"
    if "software" in d or "computer" in d:
        return "Technology"
    return "Unmapped / Other"


def obvious_noncorporate(name: str, sic: Any) -> str:
    n = str(name or "").upper()
    patterns = [
        r"\bFUND\b", r"\bETF\b", r"\bTRUST\b", r"\bPORTFOLIO\b", r"\bSERIES\b",
        r"\bACQUISITION CORP", r"\bACQUISITION CO", r"\bBLANK CHECK\b", r"\bSPAC\b",
        r"\bMUTUAL FUND\b", r"\bINVESTMENT COMPANY\b",
    ]
    try:
        sx = int(float(sic))
    except (TypeError, ValueError):
        sx = -1
    flag = any(re.search(p, n) for p in patterns) or sx in {6722, 6726, 6732, 6798}
    return "FLAGGED—REVIEW" if flag else "NO OBVIOUS FLAG"


def parent_subsidiary_flag(name: str) -> str:
    n = str(name or "").upper()
    if re.search(r"\b(HOLDINGS|HOLDING|PARENT|GROUP)\b", n):
        return "POSSIBLE PARENT/HOLDING COMPANY"
    if re.search(r"\bSUBSIDIARY\b", n):
        return "POSSIBLE SUBSIDIARY"
    return "UNKNOWN—TAX CONSOLIDATION NOT VERIFIED"


def source_record(url: str, source_type: str, asof: str, note: str = "") -> dict[str, str]:
    return {
        "source_url": url,
        "source_type": source_type,
        "source_date": asof,
        "retrieval_date": RUN_DATE,
        "source_note": note,
    }


def fetch_frames(cache: Path) -> tuple[pd.DataFrame, list[dict[str, Any]]]:
    cache.mkdir(parents=True, exist_ok=True)
    raw_rows: list[dict[str, Any]] = []
    manifest: list[dict[str, Any]] = []
    for year in YEARS:
        for concept in CONCEPT_PRIORITY:
            url = f"https://data.sec.gov/api/xbrl/frames/us-gaap/{concept}/USD/CY{year}.json"
            path = cache / f"{concept}_CY{year}.json"
            if path.exists():
                payload = json.loads(path.read_text())
            else:
                payload = get_json(url, SEC_HEADERS)
                if payload is not None:
                    path.write_text(json.dumps(payload))
            data = (payload or {}).get("data", [])
            manifest.append({
                "source_id": f"SEC_FRAME_{concept}_CY{year}",
                "url": url,
                "rows_returned": len(data),
                "retrieval_date": RUN_DATE,
                "status": "RETRIEVED" if payload else "NOT AVAILABLE",
            })
            for r in data:
                val = safe_num(r.get("val"))
                if val is None:
                    continue
                raw_rows.append({
                    "cik": int(r.get("cik")),
                    "entity_name_frame": r.get("entityName", ""),
                    "location_frame": r.get("loc", ""),
                    "year": year,
                    "concept": concept,
                    "value": val,
                    "period_end": r.get("end", ""),
                    "accession": r.get("accn", ""),
                    "fiscal_year": r.get("fy", ""),
                    "fiscal_period": r.get("fp", ""),
                    "form": r.get("form", ""),
                    "filed": r.get("filed", ""),
                    "frame": r.get("frame", f"CY{year}"),
                    "sec_source_url": url,
                })
    df = pd.DataFrame(raw_rows)
    if df.empty:
        raise RuntimeError("SEC frames returned no rows")
    priority = {c: i for i, c in enumerate(CONCEPT_PRIORITY)}
    df["concept_priority"] = df["concept"].map(priority)
    df["filed_sort"] = pd.to_datetime(df["filed"], errors="coerce")
    df["period_sort"] = pd.to_datetime(df["period_end"], errors="coerce")
    df = df.sort_values(
        ["cik", "year", "concept_priority", "filed_sort", "period_sort"],
        ascending=[True, True, True, False, False],
    )
    # Latest restated fact within a concept, then highest-priority concept for the year.
    within = df.drop_duplicates(["cik", "year", "concept"], keep="first")
    selected = within.sort_values(["cik", "year", "concept_priority"]).drop_duplicates(["cik", "year"], keep="first")
    return selected, manifest


def fetch_ticker_exchange(cache: Path) -> tuple[pd.DataFrame, dict[str, Any]]:
    url = "https://www.sec.gov/files/company_tickers_exchange.json"
    path = cache / "company_tickers_exchange.json"
    if path.exists():
        payload = json.loads(path.read_text())
    else:
        payload = get_json(url, SEC_WWW_HEADERS)
        path.write_text(json.dumps(payload))
    fields = payload.get("fields", [])
    data = payload.get("data", [])
    df = pd.DataFrame(data, columns=fields)
    df.columns = [str(c).lower() for c in df.columns]
    if "cik" in df.columns:
        df["cik"] = pd.to_numeric(df["cik"], errors="coerce").astype("Int64")
    return df, {
        "source_id": "SEC_TICKERS_EXCHANGE",
        "url": url,
        "rows_returned": len(df),
        "retrieval_date": RUN_DATE,
        "status": "RETRIEVED",
    }


def aggregate_tickers(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return pd.DataFrame(columns=["cik", "ticker", "exchange", "ticker_title"])
    def agg(series: pd.Series) -> str:
        vals = [str(x) for x in series.dropna().tolist() if str(x).strip()]
        return "; ".join(dict.fromkeys(vals)) if vals else "NOT AVAILABLE"
    grouped = df.groupby("cik", dropna=True).agg(
        ticker=("ticker", agg),
        exchange=("exchange", agg),
        ticker_title=("name", agg) if "name" in df.columns else ("ticker", agg),
    ).reset_index()
    grouped["cik"] = grouped["cik"].astype(int)
    return grouped


def dera_urls() -> list[tuple[int, int, str, str]]:
    # Annual filings from 2024Q1 through 2026Q1 provide current comparative facts.
    out: list[tuple[int, int, str, str]] = []
    ref = "31f24b1bfd216a2667dc6f382107f7164eafba5f"
    for y in [2024, 2025, 2026]:
        max_q = 1 if y == 2026 else 4
        for q in range(1, max_q + 1):
            base = f"https://raw.githubusercontent.com/rodrigoakiray/Brennan-report/{ref}/database/sec"
            num = f"{base}/num/year%3D{y}/qtr%3D{q}/part-00.parquet"
            sub = f"{base}/sub/year%3D{y}/qtr%3D{q}/data.parquet"
            out.append((y, q, num, sub))
    return out


def download_dera(cache: Path) -> tuple[list[Path], list[Path], list[dict[str, Any]]]:
    num_files: list[Path] = []
    sub_files: list[Path] = []
    manifest: list[dict[str, Any]] = []
    cache.mkdir(parents=True, exist_ok=True)
    for y, q, num_url, sub_url in dera_urls():
        try:
            num_path = download(num_url, cache / f"num_{y}q{q}.parquet")
            sub_path = download(sub_url, cache / f"sub_{y}q{q}.parquet")
            num_files.append(num_path)
            sub_files.append(sub_path)
            manifest.append({
                "source_id": f"SEC_DERA_MIRROR_{y}Q{q}",
                "url": f"https://www.sec.gov/files/dera/data/financial-statement-data-sets/{y}q{q}.zip",
                "mirror_url": num_url,
                "retrieval_date": RUN_DATE,
                "status": "RETRIEVED VIA PUBLIC MIRROR",
                "note": "Mirror manifest records official SEC ZIP source; used for row-level enrichment.",
            })
        except FileNotFoundError:
            manifest.append({
                "source_id": f"SEC_DERA_MIRROR_{y}Q{q}",
                "url": f"https://www.sec.gov/files/dera/data/financial-statement-data-sets/{y}q{q}.zip",
                "mirror_url": num_url,
                "retrieval_date": RUN_DATE,
                "status": "NOT AVAILABLE",
                "note": "Quarter not present in public mirror.",
            })
    if not num_files or not sub_files:
        raise RuntimeError("No SEC DERA parquet files downloaded")
    return num_files, sub_files, manifest


def sql_file_list(paths: Iterable[Path]) -> str:
    return "[" + ",".join("'" + str(p).replace("'", "''") + "'" for p in paths) + "]"


def load_dera_enrichment(num_files: list[Path], sub_files: list[Path]) -> tuple[pd.DataFrame, pd.DataFrame]:
    con = duckdb.connect(database=":memory:")
    num_list = sql_file_list(num_files)
    sub_list = sql_file_list(sub_files)
    log("query SEC DERA sub/num parquet files")
    # Preserve the latest filing record for each CIK; forms selected are financial annual reports.
    sub_sql = f"""
        WITH s AS (
          SELECT *, CAST(cik AS BIGINT) AS cik_int,
                 TRY_STRPTIME(CAST(filed AS VARCHAR), '%Y%m%d') AS filed_dt
          FROM read_parquet({sub_list}, union_by_name=true)
          WHERE upper(form) IN ('10-K','10-K/A','20-F','20-F/A','40-F','40-F/A')
        ), ranked AS (
          SELECT *, ROW_NUMBER() OVER (PARTITION BY cik_int ORDER BY filed_dt DESC, accepted DESC) AS rn
          FROM s
        )
        SELECT cik_int AS cik, name AS legal_company_name_dera, sic, countryba, stprba, cityba,
               countryinc, stprinc, fye, afs, wksi, form AS latest_annual_form,
               CAST(period AS VARCHAR) AS latest_reporting_period_dera,
               CAST(filed AS VARCHAR) AS latest_filing_date_dera,
               adsh AS latest_accession_dera
        FROM ranked WHERE rn=1
    """
    sub_df = con.execute(sub_sql).df()
    tags = [
        "Revenues",
        "RevenueFromContractWithCustomerExcludingAssessedTax",
        "SalesRevenueNet",
        "SalesRevenueGoodsNet",
        "SalesRevenueServicesNet",
        "IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest",
        "IncomeLossFromContinuingOperationsBeforeIncomeTaxesMinorityInterestAndIncomeLossFromEquityMethodInvestments",
        "IncomeLossFromContinuingOperationsBeforeIncomeTaxes",
        "IncomeTaxExpenseBenefit",
        "CurrentFederalTaxExpenseBenefit",
        "CurrentFederalStateAndLocalTaxExpenseBenefit",
        "CurrentIncomeTaxExpenseBenefit",
        "IncomeTaxesPaidNet",
        "CashPaidForIncomeTaxes",
        "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents",
        "EntityPublicFloat",
        "EntityNumberOfEmployees",
    ]
    tags_sql = ",".join("'" + t + "'" for t in tags)
    facts_sql = f"""
        WITH s AS (
          SELECT adsh, CAST(cik AS BIGINT) AS cik_int, name, sic, form, fp,
                 CAST(filed AS VARCHAR) AS filed, CAST(period AS VARCHAR) AS period,
                 TRY_STRPTIME(CAST(filed AS VARCHAR), '%Y%m%d') AS filed_dt
          FROM read_parquet({sub_list}, union_by_name=true)
          WHERE upper(form) IN ('10-K','10-K/A','20-F','20-F/A','40-F','40-F/A')
        ), n AS (
          SELECT adsh, tag, uom, TRY_CAST(value AS DOUBLE) AS value_num,
                 CAST(ddate AS VARCHAR) AS ddate, TRY_CAST(qtrs AS INTEGER) AS qtrs,
                 coreg
          FROM read_parquet({num_list}, union_by_name=true)
          WHERE tag IN ({tags_sql}) AND TRY_CAST(value AS DOUBLE) IS NOT NULL
        ), joined AS (
          SELECT s.cik_int AS cik, s.name, s.sic, s.form, s.fp, s.filed, s.period, s.filed_dt,
                 n.tag, n.uom, n.value_num, n.ddate, n.qtrs, n.coreg,
                 ROW_NUMBER() OVER (
                   PARTITION BY s.cik_int, n.tag
                   ORDER BY s.filed_dt DESC, TRY_STRPTIME(n.ddate, '%Y%m%d') DESC,
                            CASE WHEN n.coreg IS NULL OR n.coreg='' THEN 0 ELSE 1 END ASC,
                            ABS(n.value_num) DESC
                 ) AS rn
          FROM s JOIN n USING (adsh)
          WHERE (n.coreg IS NULL OR n.coreg='')
            AND (n.uom='USD' OR n.uom='shares' OR n.uom='pure')
            AND (n.qtrs=4 OR n.qtrs=0 OR n.qtrs IS NULL)
        )
        SELECT cik, tag, value_num, uom, ddate, filed, form, period
        FROM joined WHERE rn=1
    """
    facts = con.execute(facts_sql).df()
    if facts.empty:
        return sub_df, pd.DataFrame(columns=["cik"])
    pivot = facts.pivot_table(index="cik", columns="tag", values="value_num", aggfunc="first").reset_index()
    pivot.columns.name = None
    # Attach evidence date per CIK from the latest fact used.
    latest = facts.sort_values("filed", ascending=False).drop_duplicates("cik")[["cik", "filed", "period"]]
    latest = latest.rename(columns={"filed": "enrichment_filing_date", "period": "enrichment_reporting_period"})
    pivot = pivot.merge(latest, on="cik", how="left")
    return sub_df, pivot


def first_non_null(row: pd.Series, tags: list[str]) -> tuple[float | None, str]:
    for tag in tags:
        if tag in row.index:
            val = safe_num(row.get(tag))
            if val is not None:
                return val, tag
    return None, "NOT REPORTED"


def capacity_band(value: Any) -> str:
    v = safe_num(value)
    if v is None:
        return "NOT AVAILABLE"
    if v < 10_000_000:
        return "<$10M"
    if v < 25_000_000:
        return "$10M–$25M"
    if v < 50_000_000:
        return "$25M–$50M"
    if v < 100_000_000:
        return "$50M–$100M"
    if v < 250_000_000:
        return "$100M–$250M"
    if v < 500_000_000:
        return "$250M–$500M"
    if v < 1_000_000_000:
        return "$500M–$1B"
    return "$1B+"


def company_size_band(revenue: Any, tax_value: Any) -> str:
    r = safe_num(revenue)
    if r is not None:
        if r < 100_000_000:
            return "SMALL / <$100M REVENUE"
        if r < 250_000_000:
            return "EMERGING MID-MARKET / $100M–$250M"
        if r < 1_000_000_000:
            return "LOWER MID-MARKET / $250M–$1B"
        if r < 5_000_000_000:
            return "MID-MARKET / $1B–$5B"
        if r < 25_000_000_000:
            return "LARGE / $5B–$25B"
        return "MEGA / $25B+"
    t = safe_num(tax_value)
    if t is None:
        return "NOT AVAILABLE"
    if t < 50_000_000:
        return "PROXY: LOWER/MID-MARKET TAX SIGNAL"
    if t < 250_000_000:
        return "PROXY: MID/LARGE TAX SIGNAL"
    return "PROXY: LARGE/MEGA TAX SIGNAL"


def build_public(frames: pd.DataFrame, tickers: pd.DataFrame, sub: pd.DataFrame, facts: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    # Wide selected tax concepts by year.
    vals = frames.pivot(index="cik", columns="year", values="value").reset_index()
    vals = vals.rename(columns={2023: "tax_value_2023", 2024: "tax_value_2024", 2025: "tax_value_2025"})
    cons = frames.pivot(index="cik", columns="year", values="concept").reset_index()
    cons = cons.rename(columns={2023: "concept_2023", 2024: "concept_2024", 2025: "concept_2025"})
    meta = frames.sort_values(["cik", "year", "filed"], ascending=[True, False, False]).drop_duplicates("cik")
    meta = meta[["cik", "entity_name_frame", "location_frame", "year", "period_end", "concept", "value", "filed", "sec_source_url", "accession"]]
    meta = meta.rename(columns={
        "year": "latest_tax_year",
        "period_end": "latest_reporting_period",
        "concept": "latest_concept_used",
        "value": "latest_tax_value",
        "filed": "latest_tax_fact_filed_date",
        "sec_source_url": "sec_source_url",
        "accession": "latest_tax_fact_accession",
    })
    out = vals.merge(cons, on="cik", how="outer").merge(meta, on="cik", how="left")
    out = out.merge(tickers, on="cik", how="left").merge(sub, on="cik", how="left").merge(facts, on="cik", how="left")

    # Legal/ticker fields.
    out["cik"] = out["cik"].astype(int)
    out["cik_10"] = out["cik"].map(cik10)
    out["legal_company_name"] = out["legal_company_name_dera"].fillna(out["entity_name_frame"]).fillna(out["ticker_title"])
    out["ticker"] = out["ticker"].fillna("NOT AVAILABLE")
    out["exchange"] = out["exchange"].fillna("NOT AVAILABLE")
    out["sic"] = out["sic"].fillna("NOT AVAILABLE")
    out["sic_description"] = "NOT RETRIEVED—USE SEC COMPANY SUBMISSION FOR DETAIL"
    out["sector_mapping"] = [sic_sector(s, "") for s in out["sic"]]
    out["industry_mapping"] = out["sector_mapping"]

    # Flags and robustness.
    value_cols = [f"tax_value_{y}" for y in YEARS]
    for c in value_cols:
        if c not in out:
            out[c] = pd.NA
    out["positive_latest_flag"] = out["latest_tax_value"].map(lambda x: yesno((safe_num(x) or 0) > 0))
    out["positive_year_count"] = out[value_cols].apply(lambda r: sum(1 for x in r if safe_num(x) is not None and float(x) > 0), axis=1)
    out["two_of_three_positive_flag"] = out["positive_year_count"].map(lambda x: yesno(int(x) >= 2))
    out["three_of_three_positive_flag"] = out["positive_year_count"].map(lambda x: yesno(int(x) == 3))
    out["parent_subsidiary_flag"] = out["legal_company_name"].map(parent_subsidiary_flag)
    out["fund_trust_spac_series_flag"] = [obvious_noncorporate(n, s) for n, s in zip(out["legal_company_name"], out["sic"])]

    # Enrichment facts.
    revenue_tags = [
        "RevenueFromContractWithCustomerExcludingAssessedTax", "Revenues", "SalesRevenueNet",
        "SalesRevenueGoodsNet", "SalesRevenueServicesNet",
    ]
    pretax_tags = [
        "IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest",
        "IncomeLossFromContinuingOperationsBeforeIncomeTaxesMinorityInterestAndIncomeLossFromEquityMethodInvestments",
        "IncomeLossFromContinuingOperationsBeforeIncomeTaxes",
    ]
    total_tax_tags = ["IncomeTaxExpenseBenefit"]
    federal_tax_tags = ["CurrentFederalTaxExpenseBenefit", "CurrentFederalStateAndLocalTaxExpenseBenefit"]
    current_tax_tags = ["CurrentIncomeTaxExpenseBenefit"]
    cash_tax_tags = ["IncomeTaxesPaidNet", "CashPaidForIncomeTaxes"]

    extracted: list[dict[str, Any]] = []
    for _, row in out.iterrows():
        revenue, revenue_tag = first_non_null(row, revenue_tags)
        pretax, pretax_tag = first_non_null(row, pretax_tags)
        total_tax, total_tax_tag = first_non_null(row, total_tax_tags)
        federal_tax, federal_tax_tag = first_non_null(row, federal_tax_tags)
        total_current_tax, total_current_tag = first_non_null(row, current_tax_tags)
        cash_tax, cash_tax_tag = first_non_null(row, cash_tax_tags)
        etr = None
        if pretax is not None and total_tax is not None and abs(pretax) > 0:
            etr = total_tax / pretax
        extracted.append({
            "revenue": revenue,
            "revenue_source_tag": revenue_tag,
            "pretax_income": pretax,
            "pretax_income_source_tag": pretax_tag,
            "total_income_tax_expense": total_tax,
            "total_income_tax_source_tag": total_tax_tag,
            "current_federal_tax_expense": federal_tax,
            "current_federal_tax_source_tag": federal_tax_tag,
            "total_current_tax_expense": total_current_tax,
            "total_current_tax_source_tag": total_current_tag,
            "total_cash_taxes_paid": cash_tax,
            "total_cash_taxes_source_tag": cash_tax_tag,
            "federal_cash_taxes_paid": None,
            "federal_cash_taxes_source_tag": "NOT REPORTED",
            "effective_tax_rate": etr,
        })
    ext = pd.DataFrame(extracted)
    out = pd.concat([out.reset_index(drop=True), ext], axis=1)
    out["market_cap_company_size_proxy"] = "NOT AVAILABLE—PUBLIC FLOAT/MARKET CAP NOT CONSISTENTLY REPORTED"
    out["company_size_band"] = [company_size_band(r, t) for r, t in zip(out["revenue"], out["latest_tax_value"])]
    out["us_operating_presence"] = out.apply(
        lambda r: (
            "US BUSINESS ADDRESS" if str(r.get("countryba", "")).upper() in {"US", "USA", "UNITED STATES", ""} and str(r.get("stprba", "")).strip()
            else "FOREIGN/UNCLEAR—US TAXABLE PRESENCE NOT VERIFIED"
        ), axis=1
    )
    out["fiscal_year_end"] = out["fye"].fillna("NOT AVAILABLE")
    out["major_acquisition_nol_tax_capacity_trigger"] = "NOT ASSESSED—FILING REVIEW REQUIRED"
    out["legal_eligibility_status"] = "NOT DETERMINED—PUBLIC FILER/TAX SIGNAL IS NOT LEGAL ELIGIBILITY"
    out["tax_capacity_measure_status"] = out["latest_concept_used"].map(
        lambda c: "DIRECT CURRENT FEDERAL" if c == "CurrentFederalTaxExpenseBenefit" else (
            "QUALIFIED CURRENT FEDERAL+STATE" if c == "CurrentFederalStateAndLocalTaxExpenseBenefit" else "BROAD TOTAL TAX EXPENSE—NOT CURRENT FEDERAL"
        )
    )
    out["latest_capacity_band"] = out["latest_tax_value"].map(capacity_band)
    out["source_date"] = out["latest_tax_fact_filed_date"]
    out["retrieval_date"] = RUN_DATE
    out["sec_company_filing_url"] = out["cik_10"].map(lambda x: f"https://www.sec.gov/edgar/browse/?CIK={x}")
    out["data_confidence"] = out.apply(
        lambda r: "HIGH" if r["latest_concept_used"] == "CurrentFederalTaxExpenseBenefit" and int(r["positive_year_count"]) >= 2 else (
            "MEDIUM" if r["latest_concept_used"] == "CurrentFederalStateAndLocalTaxExpenseBenefit" or int(r["positive_year_count"]) >= 2 else "LOW-MEDIUM"
        ), axis=1
    )
    out["source_method"] = "SEC XBRL Frames CY2023–CY2025 + SEC DERA annual filing enrichment"

    # Baseline commercial access/white-space fields, to be superseded by internal evidence when merged.
    out["observed_transferable_credit_activity"] = "NOT ASSESSED IN EXTERNAL POPULATION BUILD"
    out["named_tax_treasury_persona"] = "NOT RETRIEVED"
    out["act_relationship"] = "UNKNOWN—INTERNAL CRM OVERLAY REQUIRED"
    out["incumbent_signal"] = "UNKNOWN—REQUIRES FILING/OUTREACH/PARTNER REVIEW"
    out["buy_box_fit"] = "UNKNOWN—NO SPECIFIC CREDIT/VINTAGE/SIZE MATCH"
    out["timing_signal"] = "UNKNOWN—CURRENT TAX FORECAST NOT PUBLIC"

    def baseline_route(r: pd.Series) -> str:
        if r["fund_trust_spac_series_flag"] != "NO OBVIOUS FLAG":
            return "SUPPRESS/ENTITY REVIEW"
        size = str(r["company_size_band"])
        if "MEGA" in size or (safe_num(r["latest_tax_value"]) or 0) >= 1_000_000_000:
            return "BENCHMARK/PARTNER-LED UNTIL WHITE SPACE PROVEN"
        if (safe_num(r["latest_tax_value"]) or 0) >= 10_000_000:
            return "RESEARCH REQUIRED—POTENTIAL MID-MARKET QUALIFICATION"
        return "POPULATION ONLY"
    out["baseline_route"] = out.apply(baseline_route, axis=1)

    # Score components are transparent heuristics, not legal or demand conclusions.
    def capacity_score(v: Any) -> int:
        x = safe_num(v) or 0
        if x >= 250_000_000:
            return 15
        if x >= 100_000_000:
            return 14
        if x >= 50_000_000:
            return 12
        if x >= 25_000_000:
            return 10
        if x >= 10_000_000:
            return 8
        return 0
    out["latest_capacity_score_15"] = out["latest_tax_value"].map(capacity_score)
    out["robustness_score_20"] = out["positive_year_count"].map(lambda x: 20 if int(x) == 3 else (14 if int(x) == 2 else 6))
    out["midmarket_white_space_score_15"] = out["company_size_band"].map(
        lambda s: 15 if "LOWER MID-MARKET" in s or "MID-MARKET /" in s else (8 if "EMERGING" in s else (0 if "MEGA" in s else 5))
    )
    out["data_confidence_score_10"] = out["data_confidence"].map({"HIGH": 10, "MEDIUM": 8, "LOW-MEDIUM": 5}).fillna(3)
    out["institutional_sophistication_penalty"] = out.apply(
        lambda r: -15 if "MEGA" in str(r["company_size_band"]) or (safe_num(r["latest_tax_value"]) or 0) >= 1_000_000_000 else (
            -8 if (safe_num(r["latest_tax_value"]) or 0) >= 500_000_000 else 0
        ), axis=1
    )
    out["external_screen_score"] = (
        out["latest_capacity_score_15"] + out["robustness_score_20"] +
        out["midmarket_white_space_score_15"] + out["data_confidence_score_10"] +
        out["institutional_sophistication_penalty"]
    )

    # Reorder for user-facing outputs.
    desired = [
        "cik_10", "cik", "legal_company_name", "ticker", "exchange", "sic", "sic_description",
        "sector_mapping", "industry_mapping", "latest_reporting_period", "latest_tax_year",
        "latest_concept_used", "latest_tax_value", "tax_value_2023", "tax_value_2024", "tax_value_2025",
        "concept_2023", "concept_2024", "concept_2025", "positive_latest_flag",
        "two_of_three_positive_flag", "three_of_three_positive_flag", "positive_year_count",
        "parent_subsidiary_flag", "fund_trust_spac_series_flag", "latest_capacity_band",
        "tax_capacity_measure_status", "pretax_income", "total_income_tax_expense",
        "current_federal_tax_expense", "total_current_tax_expense", "effective_tax_rate",
        "federal_cash_taxes_paid", "total_cash_taxes_paid", "revenue", "company_size_band",
        "market_cap_company_size_proxy", "us_operating_presence", "fiscal_year_end",
        "major_acquisition_nol_tax_capacity_trigger", "observed_transferable_credit_activity",
        "named_tax_treasury_persona", "act_relationship", "incumbent_signal", "buy_box_fit", "timing_signal",
        "baseline_route", "latest_capacity_score_15", "robustness_score_20", "midmarket_white_space_score_15",
        "data_confidence_score_10", "institutional_sophistication_penalty", "external_screen_score",
        "data_confidence", "legal_eligibility_status", "sec_source_url", "sec_company_filing_url",
        "latest_tax_fact_filed_date", "source_date", "retrieval_date", "source_method",
        "revenue_source_tag", "pretax_income_source_tag", "total_income_tax_source_tag",
        "current_federal_tax_source_tag", "total_current_tax_source_tag", "total_cash_taxes_source_tag",
    ]
    for col in desired:
        if col not in out.columns:
            out[col] = MISSING["not_available"]
    out = out[desired].copy()
    out = out.sort_values(["external_screen_score", "latest_tax_value"], ascending=[False, False])
    tier_c = out[out["positive_latest_flag"] == "YES"].copy()
    tier_b = tier_c[pd.to_numeric(tier_c["latest_tax_value"], errors="coerce") >= 10_000_000].copy()
    mid = tier_b[
        tier_b["company_size_band"].astype(str).str.contains("MID-MARKET|EMERGING", regex=True) &
        (tier_b["fund_trust_spac_series_flag"] == "NO OBVIOUS FLAG")
    ].copy()
    return tier_c, tier_b, mid


# Private-company proxy assumptions. These are transparent commercial modeling assumptions,
# not estimates published by Inc., IRS, Census or the companies.
PRIVATE_BENCHMARKS: dict[str, tuple[float, float]] = {
    "Advertising & Marketing": (180_000, 0.08),
    "Business Products & Services": (230_000, 0.10),
    "Consumer Products & Services": (300_000, 0.08),
    "Construction": (310_000, 0.06),
    "Education": (155_000, 0.07),
    "Energy": (650_000, 0.10),
    "Engineering": (260_000, 0.09),
    "Environmental Services": (250_000, 0.08),
    "Financial Services": (360_000, 0.15),
    "Food & Beverage": (300_000, 0.06),
    "Government Services": (225_000, 0.08),
    "Health Services": (230_000, 0.06),
    "Human Resources": (185_000, 0.07),
    "Insurance": (410_000, 0.12),
    "IT Services": (230_000, 0.09),
    "Logistics & Transportation": (290_000, 0.05),
    "Manufacturing": (370_000, 0.08),
    "Media": (230_000, 0.10),
    "Real Estate": (450_000, 0.12),
    "Retail": (260_000, 0.04),
    "Security": (190_000, 0.07),
    "Software": (270_000, 0.15),
    "Telecommunications": (420_000, 0.12),
    "Travel & Hospitality": (185_000, 0.06),
}


def inc_sector(industry: str) -> str:
    i = str(industry or "").lower()
    if any(x in i for x in ["construction", "engineering", "environmental"]):
        return "Industrials / Construction"
    if any(x in i for x in ["manufacturing", "energy"]):
        return "Manufacturing / Energy"
    if any(x in i for x in ["software", "it services", "telecommunications", "media"]):
        return "Technology / Communications"
    if any(x in i for x in ["financial", "insurance", "real estate"]):
        return "Financials / Real Estate"
    if any(x in i for x in ["health"]):
        return "Healthcare"
    if any(x in i for x in ["retail", "consumer", "food", "travel"]):
        return "Consumer"
    if any(x in i for x in ["logistics", "transportation"]):
        return "Transportation & Logistics"
    if any(x in i for x in ["business", "advertising", "human resources", "government"]):
        return "Business Services"
    return "Other / Unmapped"


def fetch_inc_private(cache: Path) -> tuple[pd.DataFrame, dict[str, Any]]:
    cache.mkdir(parents=True, exist_ok=True)
    records: list[dict[str, Any]] = []
    source_year = None
    source_url = None
    for year in [2025, 2024]:
        records = []
        try:
            for page in range(1, 7):
                url = f"https://api.inc.com/rest/i5list/{year}?records=1000&page={page}"
                headers = {
                    "accept": "application/json",
                    "origin": "https://www.inc.com",
                    "referer": "https://www.inc.com/",
                    "user-agent": GENERIC_HEADERS["User-Agent"],
                }
                payload = get_json(url, headers, attempts=4, timeout=90)
                companies = (payload or {}).get("companies", [])
                if not companies:
                    break
                records.extend(companies)
            if len(records) >= 2_000:
                source_year = year
                source_url = f"https://api.inc.com/rest/i5list/{year}"
                break
        except Exception as exc:  # noqa: BLE001
            log(f"Inc API {year} unavailable: {exc}")
            records = []
    if len(records) < 2_000:
        fallback = "https://raw.githubusercontent.com/Toby1219/inc-5000/main/inc5000_2024/2004_data.csv"
        r = requests.get(fallback, headers=GENERIC_HEADERS, timeout=120)
        r.raise_for_status()
        df = pd.read_csv(io.StringIO(r.text))
        df = df.rename(columns={
            "Rank": "rank", "CompanyName": "company", "Workers": "workers",
            "PreviousWorker": "previous_workers", "Website": "website", "State": "state_l",
            "City": "city", "Growth": "growth", "Industry": "industry", "Metro": "metro",
            "MetroCode": "metrocode", "ZipCode": "zipcode", "Founded": "founded",
        })
        source_year = 2024
        source_url = fallback
    else:
        df = pd.DataFrame(records)
    if df.empty:
        raise RuntimeError("Private company source returned no records")

    aliases = {
        "company_name": "company", "CompanyName": "company", "name": "company",
        "employee_count": "workers", "employees": "workers", "state": "state_l",
    }
    df = df.rename(columns={k: v for k, v in aliases.items() if k in df.columns})
    required = ["rank", "company", "workers", "previous_workers", "website", "state_l", "city", "growth", "industry", "metro", "metrocode", "zipcode", "founded"]
    for col in required:
        if col not in df.columns:
            df[col] = pd.NA
    df = df[required].copy()
    df["rank"] = pd.to_numeric(df["rank"], errors="coerce")
    df["workers"] = pd.to_numeric(df["workers"], errors="coerce")
    df["previous_workers"] = pd.to_numeric(df["previous_workers"], errors="coerce")
    df["founded"] = pd.to_numeric(df["founded"], errors="coerce")
    df["growth_pct"] = pd.to_numeric(df["growth"].astype(str).str.replace(",", "", regex=False).str.replace("%", "", regex=False), errors="coerce")
    df = df.dropna(subset=["company"]).drop_duplicates(subset=["company", "website"], keep="first")

    modeled: list[dict[str, Any]] = []
    current_year = int(RUN_DATE[:4])
    for _, row in df.iterrows():
        industry = str(row.get("industry") or "Other")
        rpe, margin = PRIVATE_BENCHMARKS.get(industry, (250_000, 0.08))
        workers = safe_num(row.get("workers"))
        if workers is None or workers <= 0:
            workers = max(10.0, safe_num(row.get("previous_workers")) or 25.0)
            employee_status = "PROXY/FALLBACK"
        else:
            employee_status = "REPORTED IN SOURCE LIST"
        growth = safe_num(row.get("growth_pct")) or 0
        founded = safe_num(row.get("founded"))
        age = current_year - int(founded) if founded and founded > 1800 else None
        if growth >= 1000:
            profit_factor = 0.35
        elif growth >= 300:
            profit_factor = 0.50
        elif growth >= 100:
            profit_factor = 0.60
        else:
            profit_factor = 0.70
        if age is not None and age < 5:
            profit_factor = min(profit_factor, 0.45)
        revenue_ref = max(2_000_000, workers * rpe)
        revenue_low = max(2_000_000, workers * rpe * 0.55)
        revenue_high = max(revenue_ref, workers * rpe * 1.65)
        margin_low = max(0.01, margin * 0.45)
        margin_high = min(0.25, margin * 1.55)
        pretax_low = revenue_low * margin_low * max(0.25, profit_factor * 0.55)
        pretax_ref = revenue_ref * margin * profit_factor
        pretax_high = revenue_high * margin_high * min(0.95, profit_factor * 1.25)
        # 21% statutory-rate bridge with entity/NOL/U.S.-share factors. Not a liability estimate.
        tax_low = pretax_low * 0.21 * 0.35
        tax_ref = pretax_ref * 0.21 * 0.65
        tax_high = pretax_high * 0.21 * 0.90
        if revenue_ref < 100_000_000:
            size = "SMALL / <$100M PROXY REVENUE"
        elif revenue_ref < 250_000_000:
            size = "EMERGING MID-MARKET / $100M–$250M"
        elif revenue_ref < 1_000_000_000:
            size = "LOWER MID-MARKET / $250M–$1B"
        elif revenue_ref < 5_000_000_000:
            size = "MID-MARKET / $1B–$5B"
        elif revenue_ref < 25_000_000_000:
            size = "LARGE / $5B–$25B"
        else:
            size = "MEGA / $25B+"
        if revenue_ref >= 500_000_000 or workers >= 500:
            tax_function = "LIKELY—VERIFY PUBLIC PERSONA"
        elif revenue_ref >= 100_000_000 or workers >= 150:
            tax_function = "POSSIBLE—VERIFY PUBLIC PERSONA"
        else:
            tax_function = "UNLIKELY DEDICATED TEAM / ADVISER-LED HYPOTHESIS"
        if tax_ref >= 25_000_000:
            proxy_band = "$25M+ REFERENCE PROXY"
        elif tax_ref >= 10_000_000:
            proxy_band = "$10M–$25M REFERENCE PROXY"
        elif tax_ref >= 2_500_000:
            proxy_band = "$2.5M–$10M REFERENCE PROXY"
        else:
            proxy_band = "<$2.5M REFERENCE PROXY"
        confidence = "MEDIUM-LOW" if employee_status == "REPORTED IN SOURCE LIST" else "LOW"
        midmarket = revenue_ref >= 100_000_000 and revenue_ref <= 5_000_000_000
        tax_signal_score = 15 if tax_ref >= 25_000_000 else (12 if tax_ref >= 10_000_000 else (7 if tax_ref >= 2_500_000 else 2))
        size_score = 15 if midmarket else (6 if revenue_ref < 100_000_000 else 0)
        adviser_need = 12 if "ADVISER-LED" in tax_function else (8 if "POSSIBLE" in tax_function else 4)
        data_score = 6 if confidence == "MEDIUM-LOW" else 3
        priority = tax_signal_score + size_score + adviser_need + data_score
        modeled.append({
            "private_proxy_id": f"INC{int(row.get('rank')):04d}" if safe_num(row.get("rank")) else f"INC_{normalize_company_name(row.get('company'))[:20]}",
            "company": row.get("company"),
            "public_private_status": "PRIVATE COMPANY SOURCE LIST—CURRENT OWNERSHIP/STATUS REVALIDATION REQUIRED",
            "source_list": f"Inc. 5000 {source_year}",
            "source_rank": int(row.get("rank")) if safe_num(row.get("rank")) else MISSING["not_available"],
            "website": row.get("website") or MISSING["not_available"],
            "city": row.get("city") or MISSING["not_available"],
            "state": row.get("state_l") or MISSING["not_available"],
            "metro": row.get("metro") or MISSING["not_available"],
            "industry": industry,
            "sector_mapping": inc_sector(industry),
            "employees_source_value": int(workers),
            "employee_value_status": employee_status,
            "previous_employees_source_value": int(row.get("previous_workers")) if safe_num(row.get("previous_workers")) else MISSING["not_available"],
            "growth_pct_source_value": growth,
            "founded_year": int(founded) if founded else MISSING["not_available"],
            "revenue_low_proxy": round(revenue_low, 2),
            "revenue_reference_proxy": round(revenue_ref, 2),
            "revenue_high_proxy": round(revenue_high, 2),
            "revenue_proxy_method": f"Employees × modeled {industry} revenue/employee benchmark (${rpe:,.0f}); $2M floor",
            "pretax_income_low_proxy": round(pretax_low, 2),
            "pretax_income_reference_proxy": round(pretax_ref, 2),
            "pretax_income_high_proxy": round(pretax_high, 2),
            "federal_tax_capacity_low_proxy": round(tax_low, 2),
            "federal_tax_capacity_reference_proxy": round(tax_ref, 2),
            "federal_tax_capacity_high_proxy": round(tax_high, 2),
            "tax_capacity_proxy_method": "Revenue proxy × sector pretax-margin assumption × profitability factor × 21% × entity/NOL/U.S.-share factor",
            "tax_capacity_proxy_band": proxy_band,
            "company_size_band": size,
            "us_hq_operations_proxy": "US HQ/OPERATIONS PROXY FROM SOURCE CITY/STATE—TAXABLE PRESENCE NOT VERIFIED",
            "likely_inhouse_tax_treasury_function": tax_function,
            "named_tax_treasury_persona": "NOT RETRIEVED—PUBLIC PROFESSIONAL SOURCE REQUIRED",
            "act_relationship": "UNKNOWN—INTERNAL CRM OVERLAY REQUIRED",
            "observed_transferable_credit_activity": "NOT ASSESSED",
            "incumbent_signal": "UNKNOWN—ADVISER/PLATFORM COVERAGE NOT ASSESSED",
            "credit_family_fit": "UNKNOWN—NO BUY BOX",
            "timing_signal": "UNKNOWN—CURRENT TAX FORECAST PRIVATE",
            "baseline_access_route": "REGIONAL/NATIONAL TAX ADVISER OR PE/LENDER CHANNEL" if midmarket else "RESEARCH REQUIRED",
            "tax_signal_score_15": tax_signal_score,
            "midmarket_score_15": size_score,
            "adviser_need_score_12": adviser_need,
            "data_confidence_score_6": data_score,
            "external_private_priority_score": priority,
            "data_confidence": confidence,
            "legal_eligibility_status": "NOT VERIFIED—PRIVATE REVENUE/TAX PROXY IS NOT LEGAL ELIGIBILITY OR ACTUAL TAX LIABILITY",
            "source_url": source_url,
            "source_date": str(source_year),
            "retrieval_date": RUN_DATE,
            "model_status": "COMMERCIAL PROXY—NOT REPORTED COMPANY FINANCIALS",
        })
    out = pd.DataFrame(modeled)
    out = out.sort_values(["external_private_priority_score", "federal_tax_capacity_reference_proxy"], ascending=[False, False])
    return out, {
        "source_id": f"INC5000_{source_year}",
        "url": source_url,
        "rows_returned": len(out),
        "retrieval_date": RUN_DATE,
        "status": "RETRIEVED",
        "note": "Names/employee/growth fields from source list. Revenue and tax-capacity ranges are transparent modeled proxies.",
    }


def make_partner_rows() -> pd.DataFrame:
    # Candidate universe: inclusion does not imply willingness, capability approval or partnership.
    groups: dict[str, list[tuple[str, str]]] = {
        "EXISTING/REPORTED ACT ROUTE—VERIFY": [
            ("Birch Financial", "https://www.google.com/search?q=Birch+Financial+transferable+tax+credits"),
            ("Fallbrook Financial Services", "https://www.fallbrookfinancialservices.com/"),
            ("George's tax-adviser referral route", "INTERNAL SOURCE—NAME/AGREEMENT REQUIRED"),
        ],
        "SPECIALIST PLATFORM / EXECUTION": [
            ("Crux", "https://www.cruxclimate.com/"),
            ("Reunion Infrastructure", "https://www.reunioninfra.com/"),
            ("Marex Neon", "https://www.marex.com/"),
            ("Ever.green", "https://ever.green/"),
            ("Basis Climate", "https://www.basisclimate.com/"),
            ("STX Group", "https://www.stxgroup.com/"),
            ("Monetizing Tax Credits", "https://www.monetizingtaxcredits.com/"),
            ("Tax Credit Marketplace", "https://www.taxcreditmarketplace.com/"),
            ("Green Project Technologies", "https://greenprojecttech.com/"),
            ("Bridge Renewable Energy", "https://www.google.com/search?q=Bridge+Renewable+Energy+tax+credits"),
            ("Alcazar Energy Partners / transaction ecosystem", "https://www.google.com/search?q=transferable+tax+credit+platform+buyer+marketplace"),
            ("Schneider Electric Sustainability Business", "https://www.se.com/ww/en/work/services/sustainability/"),
        ],
        "MIDDLE-MARKET TAX / ACCOUNTING CHANNEL": [
            ("RSM US", "https://rsmus.com/"), ("BDO USA", "https://www.bdo.com/"),
            ("Grant Thornton Advisors", "https://www.grantthornton.com/"), ("Forvis Mazars", "https://www.forvismazars.us/"),
            ("Crowe", "https://www.crowe.com/"), ("Baker Tilly", "https://www.bakertilly.com/"),
            ("CLA (CliftonLarsonAllen)", "https://www.claconnect.com/"), ("CBIZ", "https://www.cbiz.com/"),
            ("EisnerAmper", "https://www.eisneramper.com/"), ("CohnReznick", "https://www.cohnreznick.com/"),
            ("Plante Moran", "https://www.plantemoran.com/"), ("Moss Adams", "https://www.mossadams.com/"),
            ("Armanino", "https://www.armanino.com/"), ("Wipfli", "https://www.wipfli.com/"),
            ("Withum", "https://www.withum.com/"), ("Aprio", "https://www.aprio.com/"),
            ("Cherry Bekaert", "https://www.cbh.com/"), ("Sikich", "https://www.sikich.com/"),
            ("UHY", "https://uhy-us.com/"), ("PKF O'Connor Davies", "https://www.pkfod.com/"),
            ("Citrin Cooperman", "https://www.citrincooperman.com/"), ("BPM", "https://www.bpm.com/"),
            ("Weaver", "https://weaver.com/"), ("Elliott Davis", "https://www.elliottdavis.com/"),
            ("HORNE", "https://horne.com/"), ("Rehmann", "https://www.rehmann.com/"),
            ("Blue & Co.", "https://www.blueandco.com/"), ("Dean Dorton", "https://deandorton.com/"),
            ("Warren Averett", "https://warrenaverett.com/"), ("Doeren Mayhew", "https://www.doeren.com/"),
            ("Aldrich Advisors", "https://aldrichadvisors.com/"), ("Sensiba", "https://sensiba.com/"),
            ("GHJ", "https://www.ghjadvisors.com/"), ("Kaufman Rossin", "https://kaufmanrossin.com/"),
            ("MGO", "https://www.mgocpa.com/"), ("Carr, Riggs & Ingram", "https://www.criadv.com/"),
            ("Whitley Penn", "https://www.whitleypenn.com/"), ("HCVT", "https://www.hcvt.com/"),
            ("Frazier & Deeter", "https://www.frazierdeeter.com/"), ("Clark Schaefer Hackett", "https://www.cshco.com/"),
            ("PYA", "https://www.pyapc.com/"), ("Yeo & Yeo", "https://www.yeoandyeo.com/"),
            ("Schneider Downs", "https://schneiderdowns.com/"), ("KSM (Katz, Sapper & Miller)", "https://www.ksmcpa.com/"),
            ("LBMC", "https://www.lbmc.com/"), ("RubinBrown", "https://www.rubinbrown.com/"),
            ("Honkamp", "https://www.honkamp.com/"), ("Smith + Howard", "https://www.smith-howard.com/"),
        ],
        "BANK / LENDER / PRIVATE-CAPITAL CHANNEL": [
            ("U.S. Bank", "https://www.usbank.com/"), ("PNC", "https://www.pnc.com/"),
            ("KeyBank", "https://www.key.com/"), ("Truist", "https://www.truist.com/"),
            ("Regions Bank", "https://www.regions.com/"), ("Fifth Third Bank", "https://www.53.com/"),
            ("Huntington Bank", "https://www.huntington.com/"), ("BMO", "https://www.bmo.com/"),
            ("Citizens", "https://www.citizensbank.com/"), ("M&T Bank", "https://www.mtb.com/"),
            ("Comerica", "https://www.comerica.com/"), ("First Citizens Bank", "https://www.firstcitizens.com/"),
            ("Wintrust", "https://www.wintrust.com/"), ("CIBC US", "https://us.cibc.com/"),
            ("Santander US", "https://www.santanderbank.com/"), ("Valley Bank", "https://www.valley.com/"),
            ("Webster Bank", "https://www.websterbank.com/"), ("Cadence Bank", "https://cadencebank.com/"),
            ("Ares Management portfolio channel", "https://www.aresmgmt.com/"), ("Blackstone portfolio channel", "https://www.blackstone.com/"),
            ("KKR portfolio channel", "https://www.kkr.com/"), ("Carlyle portfolio channel", "https://www.carlyle.com/"),
            ("Apollo portfolio channel", "https://www.apollo.com/"), ("Blue Owl portfolio channel", "https://www.blueowl.com/"),
            ("Golub Capital portfolio channel", "https://golubcapital.com/"),
        ],
        "INSURANCE / RISK TRANSFER": [
            ("Marsh", "https://www.marsh.com/"), ("Aon", "https://www.aon.com/"),
            ("WTW", "https://www.wtwco.com/"), ("Lockton", "https://global.lockton.com/"),
            ("Alliant Insurance Services", "https://alliant.com/"), ("NFP", "https://www.nfp.com/"),
            ("CAC Specialty", "https://www.cacspecialty.com/"), ("Howden", "https://www.howdengroup.com/"),
            ("Euclid Transactional", "https://www.euclidtransactional.com/"), ("Liberty Mutual", "https://www.libertymutualgroup.com/"),
            ("Chubb", "https://www.chubb.com/"), ("Zurich", "https://www.zurichna.com/"),
            ("Travelers", "https://www.travelers.com/"), ("Berkley Transactional", "https://www.berkley.com/"),
            ("Ambridge Partners", "https://www.ambridgepartners.com/"),
        ],
        "LEGAL / DILIGENCE / STRUCTURING": [
            ("Latham & Watkins", "https://www.lw.com/"), ("Milbank", "https://www.milbank.com/"),
            ("Norton Rose Fulbright", "https://www.nortonrosefulbright.com/"), ("Sidley Austin", "https://www.sidley.com/"),
            ("Mayer Brown", "https://www.mayerbrown.com/"), ("McDermott Will & Emery", "https://www.mwe.com/"),
            ("Kirkland & Ellis", "https://www.kirkland.com/"), ("Orrick", "https://www.orrick.com/"),
            ("Morgan Lewis", "https://www.morganlewis.com/"), ("Hunton Andrews Kurth", "https://www.hunton.com/"),
            ("Foley Hoag", "https://foleyhoag.com/"), ("Wilson Sonsini", "https://www.wsgr.com/"),
            ("Troutman Pepper Locke", "https://www.troutman.com/"), ("White & Case", "https://www.whitecase.com/"),
            ("King & Spalding", "https://www.kslaw.com/"), ("Akin", "https://www.akingump.com/"),
            ("Bracewell", "https://www.bracewell.com/"), ("Holland & Knight", "https://www.hklaw.com/"),
            ("Baker Botts", "https://www.bakerbotts.com/"), ("Skadden", "https://www.skadden.com/"),
        ],
        "ASSOCIATION / TRUSTED ACCESS CHANNEL": [
            ("Tax Executives Institute", "https://www.tei.org/"), ("Association for Financial Professionals", "https://www.afponline.org/"),
            ("Association for Corporate Growth", "https://www.acg.org/"), ("ACG New York", "https://www.acg.org/nyc"),
            ("ACG Chicago", "https://www.acg.org/chicago"), ("ACG Atlanta", "https://www.acg.org/atlanta"),
            ("ACG Houston", "https://www.acg.org/houston"), ("ACG Los Angeles", "https://www.acg.org/los-angeles"),
            ("ACG Boston", "https://www.acg.org/boston"), ("ACG Philadelphia", "https://www.acg.org/philadelphia"),
            ("National Association of Manufacturers", "https://nam.org/"), ("National Center for the Middle Market", "https://www.middlemarketcenter.org/"),
            ("National Association of Corporate Treasurers", "https://www.nact.org/"), ("Private Directors Association", "https://www.privatedirectorsassociation.org/"),
            ("YPO", "https://www.ypo.org/"), ("Vistage", "https://www.vistage.com/"),
            ("National Federation of Independent Business", "https://www.nfib.com/"), ("U.S. Chamber of Commerce", "https://www.uschamber.com/"),
            ("American Council on Renewable Energy", "https://acore.org/"), ("Solar Energy Industries Association", "https://seia.org/"),
            ("American Biogas Council", "https://americanbiogascouncil.org/"), ("Clean Fuels Alliance America", "https://cleanfuels.org/"),
            ("Advanced Energy United", "https://advancedenergyunited.org/"), ("American Clean Power Association", "https://cleanpower.org/"),
        ],
        "DATA / PERSONA ENRICHMENT": [
            ("Moody's Orbis", "https://www.moodys.com/web/en/us/capabilities/company-reference-data/orbis.html"),
            ("PrivCo", "https://www.privco.com/"), ("Grata", "https://grata.com/"),
            ("D&B Hoovers", "https://www.dnb.com/products/marketing-sales/dnb-hoovers.html"),
            ("PitchBook", "https://pitchbook.com/"), ("Apollo", "https://www.apollo.io/"),
            ("ZoomInfo", "https://www.zoominfo.com/"), ("LinkedIn Sales Navigator", "https://business.linkedin.com/sales-solutions/sales-navigator"),
            ("Candid / nonprofit exclusion data", "https://candid.org/"), ("S&P Capital IQ", "https://www.spglobal.com/marketintelligence/"),
        ],
        "SELLER / PROJECT ORIGINATION CHANNEL": [
            ("Nexamp", "https://www.nexamp.com/"), ("Generate Capital", "https://generatecapital.com/"),
            ("Sunrun", "https://www.sunrun.com/"), ("GoodLeap", "https://goodleap.com/"),
            ("Silfab Solar", "https://silfabsolar.com/"), ("Arevon", "https://arevonenergy.com/"),
            ("Invenergy", "https://invenergy.com/"), ("Clearway Energy Group", "https://www.clearwayenergygroup.com/"),
            ("Intersect Power", "https://www.intersectpower.com/"), ("National Grid Renewables", "https://nationalgridrenewables.com/"),
            ("Origis Energy", "https://origisenergy.com/"), ("D. E. Shaw Renewable Investments", "https://www.desri.com/"),
            ("OPAL Fuels", "https://www.opalfuels.com/"), ("Ameresco", "https://www.ameresco.com/"),
            ("BTS Bioenergy / Bioenergy Devco", "https://bioenergydevco.com/"),
        ],
    }
    rows: list[dict[str, Any]] = []
    for category, entries in groups.items():
        for name, url in entries:
            if category.startswith("EXISTING"):
                archetype = "Existing/reported route"
                access, execution, midmarket, conflict = 12, 8, 8, -2
                relationship = "INTERNAL REPORTED—AGREEMENT/OWNER VERIFICATION REQUIRED"
                first_test = "Retrieve agreement, fee basis, tail, named-party protection and accountable owner"
            elif "SPECIALIST" in category:
                archetype = "Execution specialist / marketplace / co-sell"
                access, execution, midmarket, conflict = 10, 15, 8, -10
                relationship = "UNKNOWN"
                first_test = "Test protected origination economics, buyer-book access, non-circumvention and post-match ACT role"
            elif "TAX / ACCOUNTING" in category:
                archetype = "Middle-market tax adviser channel"
                access, execution, midmarket, conflict = 15, 7, 15, -5
                relationship = "UNKNOWN"
                first_test = "Test whether adviser will introduce qualified private/public clients and accept protected co-sell/referral terms"
            elif "BANK" in category:
                archetype = "Bank/lender/PE portfolio access channel"
                access, execution, midmarket, conflict = 13, 7, 12, -9
                relationship = "UNKNOWN"
                first_test = "Determine tax-credit capability, portfolio-company access and conflict with incumbent products"
            elif "INSURANCE" in category:
                archetype = "Risk-transfer enabler"
                access, execution, midmarket, conflict = 4, 12, 6, -2
                relationship = "UNKNOWN"
                first_test = "Confirm credit/risk appetite, minimum size, broker route and buyer/seller introductions"
            elif "LEGAL" in category:
                archetype = "Tax/legal/diligence enabler"
                access, execution, midmarket, conflict = 5, 13, 7, -3
                relationship = "UNKNOWN"
                first_test = "Confirm role perimeter, exact service, client conflicts and willingness to support modular ACT-led process"
            elif "ASSOCIATION" in category:
                archetype = "Trusted education / membership access channel"
                access, execution, midmarket, conflict = 13, 2, 13, 0
                relationship = "UNKNOWN"
                first_test = "Test sponsor/webinar/roundtable route to Tax/Treasury without representing demand proof"
            elif "DATA" in category:
                archetype = "Data/persona enrichment vendor"
                access, execution, midmarket, conflict = 9, 1, 11, 0
                relationship = "UNKNOWN"
                first_test = "Run 100-company coverage/accuracy/licensing bake-off before procurement"
            else:
                archetype = "Seller/project origination channel"
                access, execution, midmarket, conflict = 7, 6, 8, -6
                relationship = "UNKNOWN"
                first_test = "Verify uncommitted credit supply, mandate authority, readiness and incumbent monetization route"
            protection = 10 if conflict >= -3 else (6 if conflict >= -6 else 3)
            score = access + execution + midmarket + protection + conflict
            if category.startswith("EXISTING"):
                wave = "P0—VERIFY FIRST"
            elif score >= 42:
                wave = "P1—PRIMARY DILIGENCE"
            elif score >= 32:
                wave = "P2—SECONDARY"
            else:
                wave = "P3—ENABLER/LONG LIST"
            rows.append({
                "partner_id": f"P{len(rows)+1:03d}",
                "organization": name,
                "category": category,
                "partner_archetype": archetype,
                "potential_act_role": (
                    "Protected origination/co-sell/referral" if "SPECIALIST" in category or category.startswith("EXISTING") else
                    "Client access / qualification channel" if "TAX / ACCOUNTING" in category or "BANK" in category or "ASSOCIATION" in category else
                    "Modular transaction/risk enabler" if "INSURANCE" in category or "LEGAL" in category else
                    "Data enrichment" if "DATA" in category else "Seller origination"
                ),
                "target_audience_access": (
                    "Tax/Treasury/CFO client book" if "TAX / ACCOUNTING" in category or "BANK" in category or "ASSOCIATION" in category else
                    "Qualified buyers and sellers" if "SPECIALIST" in category else
                    "Transaction parties" if "INSURANCE" in category or "LEGAL" in category else
                    "Company/persona records" if "DATA" in category else "Developers/project sponsors"
                ),
                "buyer_access_score_15": access,
                "execution_capability_score_15": execution,
                "midmarket_access_score_15": midmarket,
                "role_protection_score_10": protection,
                "conflict_bypass_penalty": conflict,
                "partner_priority_score": score,
                "priority_wave": wave,
                "current_act_relationship": relationship,
                "capability_evidence_status": "CANDIDATE—PUBLIC CATEGORY/WEBSITE ONLY; APPETITE AND EXECUTION PROOF NOT VERIFIED",
                "first_credible_test": first_test,
                "required_protection": "Named-account protection; fee trigger; tail; non-circumvention where permitted; client/data ownership; no ACT advice/title/recapture",
                "source_url": url,
                "source_date": RUN_DATE,
                "retrieval_date": RUN_DATE,
                "confidence": "MEDIUM" if category.startswith("EXISTING") or "SPECIALIST" in category else "LOW-MEDIUM",
                "legal_tax_boundary": "PARTNER CANDIDATE ONLY—QUALIFIED OWNERS MUST CONFIRM ROLE, CONFLICTS AND PERMISSIONS",
            })
    out = pd.DataFrame(rows).sort_values(["priority_wave", "partner_priority_score"], ascending=[True, False])
    return out


def build_summaries(tier_c: pd.DataFrame, tier_b: pd.DataFrame, mid: pd.DataFrame, private: pd.DataFrame, partners: pd.DataFrame) -> dict[str, pd.DataFrame]:
    screens = []
    for threshold in SCREEN_THRESHOLDS:
        screens.append({
            "screen": f"${threshold/1_000_000:,.0f}M+ latest selected tax measure",
            "count_all": int((pd.to_numeric(tier_c["latest_tax_value"], errors="coerce") >= threshold).sum()),
            "count_cleaned": int(((pd.to_numeric(tier_c["latest_tax_value"], errors="coerce") >= threshold) & (tier_c["fund_trust_spac_series_flag"] == "NO OBVIOUS FLAG")).sum()),
            "method": "Commercial heuristic, not legal threshold",
        })
    screen_df = pd.DataFrame(screens)
    sector = tier_b.groupby("sector_mapping", dropna=False).agg(
        companies=("cik", "count"),
        median_latest_tax=("latest_tax_value", "median"),
        minimum_latest_tax=("latest_tax_value", "min"),
        maximum_latest_tax=("latest_tax_value", "max"),
        two_of_three_positive=("two_of_three_positive_flag", lambda s: int((s == "YES").sum())),
        three_of_three_positive=("three_of_three_positive_flag", lambda s: int((s == "YES").sum())),
    ).reset_index().sort_values("companies", ascending=False)
    exchange = tier_b.assign(exchange_primary=tier_b["exchange"].astype(str).str.split(";").str[0]).groupby("exchange_primary").size().reset_index(name="companies").sort_values("companies", ascending=False)
    private_summary = private.groupby(["company_size_band", "tax_capacity_proxy_band"], dropna=False).size().reset_index(name="companies").sort_values("companies", ascending=False)
    partner_summary = partners.groupby(["category", "priority_wave"], dropna=False).size().reset_index(name="partners").sort_values(["priority_wave", "partners"], ascending=[True, False])
    headline = pd.DataFrame([
        {"metric": "SEC Tier C positive latest selected tax measure", "value": len(tier_c), "status": "VERIFIED FROM SEC FRAMES"},
        {"metric": "SEC Tier B $10M+", "value": len(tier_b), "status": "COMMERCIAL SCREEN"},
        {"metric": "Public mid-market white-space candidates", "value": len(mid), "status": "PUBLIC SCREEN—ACCESS/ELIGIBILITY NOT VERIFIED"},
        {"metric": "Private named proxy population", "value": len(private), "status": "PRIVATE PROXY—TAX LIABILITY NOT VERIFIED"},
        {"metric": "Private $10M+ reference tax-capacity proxies", "value": int((private["federal_tax_capacity_reference_proxy"] >= 10_000_000).sum()), "status": "MODELED PROXY"},
        {"metric": "Partner/access candidates", "value": len(partners), "status": "CANDIDATE—APPETITE NOT VERIFIED"},
    ])
    return {
        "headline": headline,
        "screens": screen_df,
        "sector": sector,
        "exchange": exchange,
        "private_summary": private_summary,
        "partner_summary": partner_summary,
    }


def write_csv(df: pd.DataFrame, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(path, index=False, encoding="utf-8-sig")
    log(f"wrote {path.name}: {len(df):,} rows")


def fill_controlled_codes(df: pd.DataFrame) -> pd.DataFrame:
    out = df.copy()
    for col in out.columns:
        if pd.api.types.is_numeric_dtype(out[col]):
            continue
        out[col] = out[col].fillna(MISSING["not_available"]).replace("", MISSING["not_available"])
    return out


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", default="outputs/tax_buyer_universe_external")
    parser.add_argument("--cache-dir", default=".cache/tax_buyer_universe_external")
    args = parser.parse_args()
    output = Path(args.output_dir)
    cache = Path(args.cache_dir)
    output.mkdir(parents=True, exist_ok=True)
    cache.mkdir(parents=True, exist_ok=True)

    log("fetch SEC frames")
    frames, frame_manifest = fetch_frames(cache / "frames")
    log(f"selected SEC frame facts: {len(frames):,}")
    tick_raw, ticker_manifest = fetch_ticker_exchange(cache / "sec_reference")
    tickers = aggregate_tickers(tick_raw)
    num_files, sub_files, dera_manifest = download_dera(cache / "dera")
    sub, facts = load_dera_enrichment(num_files, sub_files)
    log(f"DERA enrichment: {len(sub):,} CIK metadata rows; {len(facts):,} financial rows")
    tier_c, tier_b, mid = build_public(frames, tickers, sub, facts)
    tier_c = fill_controlled_codes(tier_c)
    tier_b = fill_controlled_codes(tier_b)
    mid = fill_controlled_codes(mid)

    log("fetch private-company proxy population")
    private, private_manifest = fetch_inc_private(cache / "inc")
    private = fill_controlled_codes(private)
    if len(private) < 2_000:
        raise RuntimeError(f"Private proxy population below required 2,000 rows: {len(private)}")

    partners = fill_controlled_codes(make_partner_rows())
    summaries = build_summaries(tier_c, tier_b, mid, private, partners)

    write_csv(tier_c, output / "sec_tier_c_population.csv")
    write_csv(tier_b, output / "sec_tier_b_10m_screen.csv")
    write_csv(mid, output / "public_mid_market_whitespace.csv")
    write_csv(private, output / "private_company_proxy_population.csv")
    write_csv(partners, output / "partner_access_universe.csv")
    for name, df in summaries.items():
        write_csv(df, output / f"summary_{name}.csv")

    manifest = frame_manifest + [ticker_manifest] + dera_manifest + [private_manifest]
    (output / "source_manifest.json").write_text(json.dumps(manifest, indent=2))
    qa = {
        "run_date": RUN_DATE,
        "sec_tier_c_rows": len(tier_c),
        "sec_tier_b_10m_rows": len(tier_b),
        "public_midmarket_rows": len(mid),
        "private_proxy_rows": len(private),
        "private_reference_tax_proxy_10m_plus": int((private["federal_tax_capacity_reference_proxy"] >= 10_000_000).sum()),
        "partner_rows": len(partners),
        "tier_c_unique_ciks": int(tier_c["cik"].nunique()),
        "tier_b_unique_ciks": int(tier_b["cik"].nunique()),
        "tier_c_duplicate_ciks": int(tier_c.duplicated("cik").sum()),
        "tier_b_duplicate_ciks": int(tier_b.duplicated("cik").sum()),
        "private_duplicate_name_website": int(private.duplicated(["company", "website"]).sum()),
        "private_minimum_gate_met": len(private) >= 2_000,
        "legal_caveat_visible_public": bool((tier_c["legal_eligibility_status"].astype(str).str.contains("NOT DETERMINED")).all()),
        "legal_caveat_visible_private": bool((private["legal_eligibility_status"].astype(str).str.contains("NOT VERIFIED")).all()),
        "notes": [
            "SEC population uses selected annual concepts in hierarchy: CurrentFederalTaxExpenseBenefit; CurrentFederalStateAndLocalTaxExpenseBenefit; IncomeTaxExpenseBenefit.",
            "Latest means most recent available selected CY2023-CY2025 annual frame per CIK; counts are not forced to prior benchmarks.",
            "Public mid-market is a commercial screen, not legal eligibility or demand.",
            "Private values are modeled proxies using employee and sector assumptions; not company-reported revenue or actual tax liability.",
            "Partner rows are candidates; willingness, permissions, conflicts and ACT economics remain unverified.",
        ],
    }
    (output / "external_build_qa.json").write_text(json.dumps(qa, indent=2))
    log(json.dumps(qa, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
