#!/usr/bin/env python3
"""Runtime compatibility wrapper for the public-data universe build."""
from __future__ import annotations

import pandas as pd

import tax_buyer_universe_external as build


def _unique_columns(columns):
    seen = {}
    result = []
    for raw in columns:
        name = str(raw)
        count = seen.get(name, 0)
        seen[name] = count + 1
        result.append(name if count == 0 else f"{name}__DUPLICATE_{count}")
    return result


def fixed_fill_controlled_codes(df: pd.DataFrame) -> pd.DataFrame:
    out = df.copy()
    if out.columns.duplicated().any():
        out.columns = _unique_columns(out.columns)
    for index in range(len(out.columns)):
        series = out.iloc[:, index]
        if pd.api.types.is_numeric_dtype(series):
            continue
        series = series.astype(object)
        series = series.where(series.notna(), build.MISSING["not_available"])
        series = series.map(
            lambda value: build.MISSING["not_available"]
            if isinstance(value, str) and value.strip() == ""
            else value
        )
        out.iloc[:, index] = series
    return out


build.fill_controlled_codes = fixed_fill_controlled_codes

if __name__ == "__main__":
    raise SystemExit(build.main())
