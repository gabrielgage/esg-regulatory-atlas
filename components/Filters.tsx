import { SlidersHorizontal, RotateCcw, Search } from "lucide-react";
import type { ReactNode } from "react";
import {
  advisoryOpportunities,
  businessFunctions,
  businessImpactTypes,
  companyTypes,
  sectors,
  statusLabel,
  topics,
  valueChainImpacts
} from "@/data/seed";
import { jurisdictions } from "@/data/jurisdictions";
import { yearsFrom } from "@/lib/filters";
import { FilterState, Regulation } from "@/types/regulation";
import { uniq } from "@/lib/utils";

interface Props {
  filters: FilterState;
  regulations: Regulation[];
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export function Filters({ filters, regulations, onChange, onReset }: Props) {
  const update = (key: keyof FilterState, value: string) => onChange({ ...filters, [key]: value });
  const years = yearsFrom(regulations);
  const regions = uniq(jurisdictions.map((jurisdiction) => jurisdiction.region));

  return (
    <section className="rounded-2xl border bg-white p-3 shadow-sm">
      <div className="grid gap-3 xl:grid-cols-[1.5fr_repeat(5,minmax(0,1fr))_auto]">
        <label className="relative">
          <span className="sr-only">Search regulations</span>
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <input
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-teal"
            placeholder="Search title, jurisdiction, summary or advisory need"
            value={filters.query}
            onChange={(event) => update("query", event.target.value)}
          />
        </label>
        <Select
          label="Jurisdiction"
          value={filters.jurisdiction}
          onChange={(value) => update("jurisdiction", value)}
          options={jurisdictions.filter((jurisdiction) => jurisdiction.type !== "international").map((jurisdiction) => ({ value: jurisdiction.id, label: jurisdiction.name }))}
        />
        <Select label="Topic" value={filters.topic} onChange={(value) => update("topic", value)} options={topics} />
        <Select label="Sector" value={filters.sector} onChange={(value) => update("sector", value)} options={sectors} />
        <Select label="Company type" value={filters.companyType} onChange={(value) => update("companyType", value)} options={companyTypes} />
        <Select
          label="Reporting year"
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
          Reset
        </button>
      </div>
      <details className="mt-3 rounded-xl border border-slate-100 bg-slate-50/70">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600">
          <SlidersHorizontal className="h-4 w-4 text-teal" />
          Advanced filters
        </summary>
        <div className="space-y-3 border-t border-slate-100 p-3">
          <AdvancedGroup title="Geography">
            <Select label="Region" value={filters.region} onChange={(value) => update("region", value)} options={regions} />
            <Select
              label="Jurisdiction type"
              value={filters.jurisdictionType}
              onChange={(value) => update("jurisdictionType", value)}
              options={[
                { value: "supranational", label: "Supranational" },
                { value: "national", label: "National" },
                { value: "subnational", label: "Subnational" },
                { value: "international", label: "International" }
              ]}
            />
            <Select label="Value chain impact" value={filters.valueChain} onChange={(value) => update("valueChain", value)} options={valueChainImpacts} />
          </AdvancedGroup>
          <AdvancedGroup title="Regulatory shape">
            <Select
              label="Regulation status"
              value={filters.status}
              onChange={(value) => update("status", value)}
              options={Object.entries(statusLabel).map(([value, label]) => ({ value, label }))}
            />
            <Select
              label="Confidence"
              value={filters.confidence}
              onChange={(value) => update("confidence", value)}
              options={[
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "needs_review", label: "Needs review" },
                { value: "date_uncertain", label: "Date uncertain" }
              ]}
            />
            <Select
              label="Data quality"
              value={filters.dataQuality}
              onChange={(value) => update("dataQuality", value)}
              options={[
                { value: "verified_seed", label: "Verified source set" },
                { value: "recently_updated", label: "Recently updated" },
                { value: "needs_review", label: "Needs review" },
                { value: "date_uncertain", label: "Date uncertain" },
                { value: "source_missing", label: "Source missing" }
              ]}
            />
          </AdvancedGroup>
          <AdvancedGroup title="Business framing">
            <Select label="Business function" value={filters.businessFunction} onChange={(value) => update("businessFunction", value)} options={businessFunctions} />
            <Select label="Obligation type" value={filters.obligation} onChange={(value) => update("obligation", value)} options={businessImpactTypes} />
            <Select label="Advisory opportunity" value={filters.advisory} onChange={(value) => update("advisory", value)} options={advisoryOpportunities} />
          </AdvancedGroup>
        </div>
      </details>
    </section>
  );
}

function AdvancedGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="rounded-xl border border-slate-200 bg-white" open={title === "Geography"}>
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
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">All {label.toLowerCase()}</option>
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
