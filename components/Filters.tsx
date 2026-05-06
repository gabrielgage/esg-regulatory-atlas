"use client";

import { SlidersHorizontal, RotateCcw, Search } from "lucide-react";
import type { ReactNode } from "react";
import {
  advisoryOpportunities,
  businessFunctions,
  businessImpactTypes,
  clientRelevanceCategories,
  clientRelevanceLabel,
  companyTypes,
  legalForceLabel,
  legalForces,
  recordTypeLabel,
  recordTypes,
  sectors,
  statusLabel,
  topics,
  valueChainImpacts
} from "@/data/seed";
import { jurisdictions } from "@/data/jurisdictions";
import { yearsFrom } from "@/lib/filters";
import { FilterState, Regulation } from "@/types/regulation";
import { uniq } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";

interface Props {
  filters: FilterState;
  regulations: Regulation[];
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  embedded?: boolean;
}

export function Filters({ filters, regulations, onChange, onReset, embedded = false }: Props) {
  const update = (key: keyof FilterState, value: string) => onChange({ ...filters, [key]: value });
  const years = yearsFrom(regulations);
  const regions = uniq(jurisdictions.map((jurisdiction) => jurisdiction.region));
  const { t } = useLanguage();

  return (
    <section className={embedded ? "" : "rounded-2xl border bg-white p-3 shadow-sm"}>
      <div className="grid gap-3 xl:grid-cols-[1.5fr_repeat(5,minmax(0,1fr))_auto]">
        <label className="relative">
          <span className="sr-only">{t("filters.search")}</span>
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <input
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-teal"
            placeholder={t("filters.searchPlaceholder")}
            value={filters.query}
            onChange={(event) => update("query", event.target.value)}
          />
        </label>
        <Select
          label={t("filters.jurisdiction")}
          value={filters.jurisdiction}
          onChange={(value) => update("jurisdiction", value)}
          options={jurisdictions.filter((jurisdiction) => jurisdiction.type !== "international").map((jurisdiction) => ({ value: jurisdiction.id, label: jurisdiction.name }))}
        />
        <Select label={t("filters.topic")} value={filters.topic} onChange={(value) => update("topic", value)} options={topics} />
        <Select label={t("filters.sector")} value={filters.sector} onChange={(value) => update("sector", value)} options={sectors} />
        <Select label={t("filters.companyType")} value={filters.companyType} onChange={(value) => update("companyType", value)} options={companyTypes} />
        <Select
          label={t("filters.reportingYear")}
          value={filters.reportingYear}
          onChange={(value) => update("reportingYear", value)}
          options={years.map(String)}
        />
        <button
          onClick={onReset}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          type="button"
        >
          <RotateCcw className="h-4 w-4" />
          {t("filters.reset")}
        </button>
      </div>
      <details className="mt-3 rounded-xl border border-slate-100 bg-slate-50/70">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600">
          <SlidersHorizontal className="h-4 w-4 text-teal" />
          {t("filters.advanced")}
        </summary>
        <div className="space-y-3 border-t border-slate-100 p-3">
          <AdvancedGroup title={t("filters.geography")} defaultOpen>
            <Select label={t("filters.region")} value={filters.region} onChange={(value) => update("region", value)} options={regions} />
            <Select
              label={t("filters.jurisdictionType")}
              value={filters.jurisdictionType}
              onChange={(value) => update("jurisdictionType", value)}
              options={[
                { value: "supranational", label: "Supranational" },
                { value: "national", label: "National" },
                { value: "subnational", label: "Subnational" },
                { value: "international", label: "International" }
              ]}
            />
            <Select label={t("filters.valueChainImpact")} value={filters.valueChain} onChange={(value) => update("valueChain", value)} options={valueChainImpacts} />
          </AdvancedGroup>
          <AdvancedGroup title={t("filters.regulatoryShape")}>
            <Select
              label="Record type"
              value={filters.recordType}
              onChange={(value) => update("recordType", value)}
              options={recordTypes.map((value) => ({ value, label: recordTypeLabel[value] }))}
            />
            <Select
              label="Legal force"
              value={filters.legalForce}
              onChange={(value) => update("legalForce", value)}
              options={legalForces.map((value) => ({ value, label: legalForceLabel[value] }))}
            />
            <Select
              label={t("filters.regulationStatus")}
              value={filters.status}
              onChange={(value) => update("status", value)}
              options={Object.entries(statusLabel).map(([value, label]) => ({ value, label }))}
            />
            <Select
              label={t("filters.confidence")}
              value={filters.confidence}
              onChange={(value) => update("confidence", value)}
              options={[
                { value: "high", label: t("confidence.high") },
                { value: "medium", label: t("confidence.medium") },
                { value: "needs_review", label: t("confidence.needs_review") },
                { value: "date_uncertain", label: t("confidence.date_uncertain") }
              ]}
            />
            <Select
              label={t("filters.dataQuality")}
              value={filters.dataQuality}
              onChange={(value) => update("dataQuality", value)}
              options={[
                { value: "verified_seed", label: t("quality.verified_seed") },
                { value: "recently_updated", label: t("quality.recently_updated") },
                { value: "needs_review", label: t("quality.needs_review") },
                { value: "date_uncertain", label: t("quality.date_uncertain") },
                { value: "source_missing", label: t("quality.source_missing") }
              ]}
            />
          </AdvancedGroup>
          <AdvancedGroup title={t("filters.businessFraming")}>
            <Select label={t("filters.businessFunction")} value={filters.businessFunction} onChange={(value) => update("businessFunction", value)} options={businessFunctions} />
            <Select label={t("filters.obligationType")} value={filters.obligation} onChange={(value) => update("obligation", value)} options={businessImpactTypes} />
            <Select
              label="Client relevance"
              value={filters.clientRelevance}
              onChange={(value) => update("clientRelevance", value)}
              options={clientRelevanceCategories.map((value) => ({ value, label: clientRelevanceLabel[value] }))}
            />
            <Select label={t("filters.advisoryOpportunity")} value={filters.advisory} onChange={(value) => update("advisory", value)} options={advisoryOpportunities} />
          </AdvancedGroup>
        </div>
      </details>
    </section>
  );
}

function AdvancedGroup({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="rounded-xl border border-slate-200 bg-white" open={defaultOpen}>
      <summary className="cursor-pointer list-none px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </summary>
      <div className="grid gap-3 border-t border-slate-100 p-3 md:grid-cols-3">{children}</div>
    </details>
  );
}

function Select({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<string | { value: string; label: string }>;
}) {
  const { t } = useLanguage();

  return (
    <label>
      <span className="sr-only">{label}</span>
      <select
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{t("filters.allPrefix")} {label.toLowerCase()}</option>
        {options.map((option) => {
          const item = typeof option === "string" ? { value: option, label: option } : option;
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </label>
  );
}
