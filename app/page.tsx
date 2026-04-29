"use client";

import { useMemo, useState } from "react";
import { Activity, CalendarClock, Database, Gauge, Layers3 } from "lucide-react";
import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import { WorldMap } from "@/components/WorldMap";
import { CountryPanel } from "@/components/CountryPanel";
import { RegulationTable } from "@/components/RegulationTable";
import { RegulationDetail } from "@/components/RegulationDetail";
import { QuickViews } from "@/components/QuickViews";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { AdvisoryInsights } from "@/components/AdvisoryInsights";
import { jurisdictions, regulations } from "@/data/seed";
import { initialFilters, filterRegulations } from "@/lib/filters";
import { Jurisdiction, Regulation } from "@/types/regulation";
import { Badge } from "@/components/Badge";
import { uniq } from "@/lib/utils";

export default function Home() {
  const [filters, setFilters] = useState(initialFilters);
  const [activeQuickView, setActiveQuickView] = useState("");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(
    jurisdictions.find((jurisdiction) => jurisdiction.id === "eu") || null
  );
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);

  const filtered = useMemo(() => filterRegulations(regulations, filters), [filters]);
  const sourceCount = regulations.reduce((count, regulation) => count + regulation.sourceUrls.length, 0);
  const highImpact = filtered.filter((regulation) => regulation.highImpact).length;
  const reportingYears = uniq(filtered.map((regulation) => String(regulation.firstReportingYear || "")).filter(Boolean));

  function applyQuickView(id: string, quickFilters: Partial<typeof filters>) {
    setActiveQuickView(id);
    setFilters({ ...initialFilters, ...quickFilters });
  }

  function updateFilters(nextFilters: typeof filters) {
    setActiveQuickView("");
    setFilters(nextFilters);
  }

  function resetFilters() {
    setActiveQuickView("");
    setFilters(initialFilters);
  }

  return (
    <main className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <section className="overflow-hidden rounded-2xl bg-navy text-white shadow-xl">
          <div className="grid gap-6 p-6 md:grid-cols-[1.15fr_.85fr] md:p-8">
            <div>
              <Badge className="border-white/20 bg-white/10 text-white">Illustrative MVP seed data</Badge>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">
                ESG regulatory intelligence map for global compliance teams.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Explore sustainability reporting, climate disclosure, sustainable finance, supply chain due diligence,
                biodiversity, product sustainability and value chain obligations in one deployable MVP.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge className="border-teal/30 bg-teal/20 text-mint">No paid APIs</Badge>
                <Badge className="border-white/20 bg-white/10 text-white">Static TypeScript seed data</Badge>
                <Badge className="border-white/20 bg-white/10 text-white">Vercel-ready Next.js app</Badge>
              </div>
            </div>
            <div className="grid content-end gap-3 sm:grid-cols-2">
              <HeroMetric icon={Database} label="Tracked records" value={String(regulations.length)} />
              <HeroMetric icon={Gauge} label="Jurisdictions" value={String(jurisdictions.length)} />
              <HeroMetric icon={Layers3} label="Source links" value={String(sourceCount)} />
              <HeroMetric icon={Activity} label="High impact in view" value={String(highImpact)} />
            </div>
          </div>
        </section>

        <DisclaimerBanner />

        <QuickViews activeId={activeQuickView} onApply={applyQuickView} />

        <Filters filters={filters} regulations={regulations} onChange={updateFilters} onReset={resetFilters} />

        <section className="grid gap-4 md:grid-cols-4">
          <SummaryCard label="Current view" value={String(filtered.length)} detail="matching records" />
          <SummaryCard label="First reporting years" value={reportingYears.length ? reportingYears.join(", ") : "n/a"} detail="in filtered set" />
          <SummaryCard label="Confidence" value={`${filtered.filter((regulation) => regulation.confidenceLevel === "high").length} high`} detail="verified seed records" />
          <SummaryCard label="Data quality" value={`${filtered.filter((regulation) => regulation.dataQualityStatus === "needs_review").length} review`} detail="needs production research" />
        </section>

        <AdvisoryInsights regulations={filtered} />

        <section className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
          <WorldMap jurisdictions={jurisdictions} regulations={filtered} selectedId={selectedJurisdiction?.id} onSelect={setSelectedJurisdiction} />
          <CountryPanel jurisdiction={selectedJurisdiction} regulations={filtered} onRegulation={setSelectedRegulation} />
        </section>

        <RegulationTable regulations={filtered} onSelect={setSelectedRegulation} />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}

function HeroMetric({
  icon: Icon,
  label,
  value
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-slate-300">{label}</div>
        <Icon className="h-4 w-4 text-mint" />
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}

function SummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        <CalendarClock className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-2 truncate text-xl font-bold text-ink">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{detail}</div>
    </div>
  );
}
