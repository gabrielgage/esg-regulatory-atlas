"use client";

import { useMemo, useState } from "react";
import { CalendarClock, RotateCcw, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { GlossaryHelpCard } from "@/components/GlossaryHelpCard";
import { PageIntro } from "@/components/PageIntro";
import { RegulatoryTimeline, type TimelineScope } from "@/components/RegulatoryTimeline";
import { RegulationDetail } from "@/components/RegulationDetail";
import { jurisdictions, regulations, topics } from "@/data/seed";
import { Regulation } from "@/types/regulation";

const timelineScopes: { id: TimelineScope; label: string; description: string }[] = [
  { id: "next-12", label: "Next 12 months", description: "Most immediate milestones" },
  { id: "next-24", label: "Next 24 months", description: "Default planning view" },
  { id: "in-force", label: "Already in force", description: "Immediate source review" },
  { id: "longer-watch", label: "Longer-term watch", description: "Beyond 24 months" },
  { id: "full-history", label: "Full history", description: "All dated signals" }
];

export default function TimelinePage() {
  const [jurisdiction, setJurisdiction] = useState("");
  const [topic, setTopic] = useState("");
  const [year, setYear] = useState("");
  const [scope, setScope] = useState<TimelineScope>("next-24");
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const years = timelineYearsFrom(regulations);
  const filtered = useMemo(
    () =>
      regulations.filter(
        (regulation) =>
          (!jurisdiction || regulation.jurisdictionIds.includes(jurisdiction)) &&
          (!topic || regulation.topics.includes(topic)) &&
          (!year || recordHasTimelineYear(regulation, Number(year)))
      ),
    [jurisdiction, topic, year]
  );
  const hasTimelineFilters = Boolean(jurisdiction || topic || year || scope !== "next-24");
  const dateBearingRecords = filtered.filter(recordHasAnyTimelineYear).length;
  const activeScope = timelineScopes.find((item) => item.id === scope) || timelineScopes[1];
  const activeFilters = [
    scope !== "next-24" && { label: "Planning horizon", value: activeScope.label },
    jurisdiction && { label: "Jurisdiction", value: jurisdictions.find((item) => item.id === jurisdiction)?.name || jurisdiction },
    topic && { label: "Topic", value: topic },
    year && { label: "Reporting year", value: year }
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  function resetTimelineFilters() {
    setJurisdiction("");
    setTopic("");
    setYear("");
    setScope("next-24");
  }

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Timeline"
          title="Regulatory milestones and reporting years"
          body="Track effective dates, first reporting years and phased milestones across jurisdictions and topics."
          meta="Validate date-sensitive planning against linked primary sources before reliance."
        />
        <DisclaimerBanner />
        <GlossaryHelpCard
          title="Interpret timeline dates carefully"
          body="Timeline labels such as effective date, first reporting year, first report due date and Atlas review date are planning signals. Confirm date-sensitive obligations against primary sources and entity-specific facts before relying on them."
          termIds={["reporting-year", "transition-plan", "assurance"]}
          compact
        />
        <section className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <CalendarClock className="h-4 w-4 text-teal" />
                Planning horizon
              </div>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
                The default view prioritizes the next 24 months plus high-impact already-effective obligations, so users see what needs planning attention before the full historical timeline.
              </p>
            </div>
            <Badge className="border-teal/20 bg-teal/10 text-teal">Default: next 24 months</Badge>
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-5" data-testid="timeline-scope-tabs">
            {timelineScopes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setScope(item.id)}
                aria-pressed={scope === item.id}
                className={
                  scope === item.id
                    ? "rounded-xl border border-teal/40 bg-teal/10 px-3 py-3 text-left text-sm font-semibold text-ink shadow-sm"
                    : "rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-left text-sm font-semibold text-slate-600 hover:border-teal/30 hover:bg-white"
                }
              >
                <span className="block">{item.label}</span>
                <span className="mt-1 block text-xs font-normal leading-5 text-slate-500">{item.description}</span>
              </button>
            ))}
          </div>
        </section>
        <section className="grid gap-3 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-[repeat(3,minmax(0,1fr))_auto] md:items-end">
          <Select
            label="Jurisdiction"
            value={jurisdiction}
            onChange={setJurisdiction}
            options={jurisdictions.filter((item) => item.type !== "international").map((item) => ({ value: item.id, label: item.name }))}
          />
          <Select label="Topic" value={topic} onChange={setTopic} options={topics.map((item) => ({ value: item, label: item }))} />
          <Select label="Reporting year" value={year} onChange={setYear} options={years.map((item) => ({ value: String(item), label: String(item) }))} />
          <button
            type="button"
            onClick={resetTimelineFilters}
            disabled={!hasTimelineFilters}
            className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold transition ${
              hasTimelineFilters ? "text-slate-600 hover:bg-slate-50" : "cursor-not-allowed text-slate-400 opacity-60"
            }`}
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </button>
        </section>
        <section data-testid="timeline-filter-summary" className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <SlidersHorizontal className="h-4 w-4 text-teal" />
                Current timeline view
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Showing {filtered.length} of {regulations.length} tracked seed records in the {activeScope.label.toLowerCase()} horizon, including {dateBearingRecords} records with dated milestone signals.
              </p>
            </div>
            <Badge className="border-amber-200 bg-amber-50 text-amber-800">Date-sensitive planning</Badge>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {activeFilters.length ? (
              activeFilters.map((filter) => (
                <Badge key={filter.label} className="border-slate-200 bg-slate-50 text-slate-600">
                  {filter.label}: {filter.value}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-slate-500">No timeline filters are active. Use jurisdiction, topic or reporting year to narrow the milestone view.</span>
            )}
          </div>
        </section>
        <RegulatoryTimeline regulations={filtered} scope={scope} onSelect={setSelectedRegulation} />
        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}

function timelineYearsFrom(records: Regulation[]) {
  return Array.from(new Set(records.flatMap((regulation) => timelineYearsFor(regulation)).filter((candidate) => candidate >= 2021))).sort((a, b) => a - b);
}

function recordHasTimelineYear(regulation: Regulation, year: number) {
  return timelineYearsFor(regulation).includes(year);
}

function recordHasAnyTimelineYear(regulation: Regulation) {
  return timelineYearsFor(regulation).length > 0;
}

function timelineYearsFor(regulation: Regulation) {
  return [
    regulation.firstReportingYear,
    yearFromDate(regulation.effectiveDate),
    yearFromDate(regulation.firstReportDueDate),
    yearFromDate(regulation.consultationDeadline),
    yearFromDate(regulation.nextReviewDate)
  ].filter((value): value is number => Boolean(value));
}

function yearFromDate(value?: string) {
  if (!value || value.toLowerCase().includes("uncertain") || value.toLowerCase().includes("market") || value.toLowerCase().includes("stayed")) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.getFullYear();
}

function Select({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-500">{label}</span>
      <select
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">All {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
