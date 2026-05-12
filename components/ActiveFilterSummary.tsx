"use client";

import { Filter, RotateCcw, X } from "lucide-react";
import { Badge } from "@/components/Badge";
import { jurisdictions } from "@/data/jurisdictions";
import { personaPresetById } from "@/data/personaPresets";
import { clientRelevanceLabel, legalForceLabel, recordTypeLabel, statusLabel } from "@/data/seed";
import type { FilterState } from "@/types/regulation";

const filterLabels: Record<keyof FilterState, string> = {
  query: "Search",
  jurisdiction: "Jurisdiction",
  region: "Region",
  topic: "Topic",
  sector: "Sector",
  companyType: "Company type",
  jurisdictionType: "Jurisdiction type",
  status: "Status",
  reportingYear: "Reporting year",
  valueChain: "Value chain",
  businessFunction: "Business function",
  obligation: "Obligation",
  confidence: "Confidence",
  dataQuality: "Data quality",
  advisory: "Advisory",
  recordType: "Record type",
  legalForce: "Legal force",
  clientRelevance: "Client relevance"
};

export function ActiveFilterSummary({
  filters,
  activePersona,
  filteredCount,
  totalCount,
  onClearFilter,
  onReset
}: {
  filters: FilterState;
  activePersona: string;
  filteredCount: number;
  totalCount: number;
  onClearFilter: (key: keyof FilterState) => void;
  onReset: () => void;
}) {
  const persona = personaPresetById(activePersona);
  const activeFilters = (Object.entries(filters) as Array<[keyof FilterState, string]>)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => ({ key, label: filterLabels[key], value: displayValue(key, value) }));
  const hasActiveLens = Boolean(persona || activeFilters.length);
  const hiddenCount = Math.max(totalCount - filteredCount, 0);

  return (
    <section data-testid="active-filter-summary" className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Filter className="h-4 w-4 text-teal" />
            Current database view
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Showing {filteredCount} of {totalCount} tracked seed records
            {hiddenCount ? ` after hiding ${hiddenCount} records outside the current lens.` : "."}
          </p>
        </div>
        {hasActiveLens ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            Clear view
          </button>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {persona ? <Badge className="border-teal/20 bg-teal/10 text-teal">Role lens: {persona.role}</Badge> : null}
        {activeFilters.length ? (
          activeFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => onClearFilter(filter.key)}
              aria-label={`Remove ${filter.label} filter`}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium leading-none text-slate-600 transition hover:border-teal/30 hover:bg-teal/10 hover:text-teal"
            >
              {filter.label}: {filter.value}
              <X className="h-3 w-3" />
            </button>
          ))
        ) : (
          <span className="text-sm text-slate-500">No filters are active. Use search, a role lens or filters to narrow the dataset.</span>
        )}
      </div>
    </section>
  );
}

function displayValue(key: keyof FilterState, value: string) {
  if (key === "jurisdiction") return jurisdictions.find((jurisdiction) => jurisdiction.id === value)?.name || value;
  if (key === "status") return statusLabel[value as keyof typeof statusLabel] || humanize(value);
  if (key === "recordType") return recordTypeLabel[value as keyof typeof recordTypeLabel] || humanize(value);
  if (key === "legalForce") return legalForceLabel[value as keyof typeof legalForceLabel] || humanize(value);
  if (key === "clientRelevance") return clientRelevanceLabel[value as keyof typeof clientRelevanceLabel] || humanize(value);
  return humanize(value);
}

function humanize(value: string) {
  return value.replace(/[-_]/g, " ");
}
