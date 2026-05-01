"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Database, Gauge, HelpCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import { WorldChoropleth as WorldMap } from "@/components/WorldChoropleth";
import { CountryPanel } from "@/components/CountryPanel";
import { RegulationTable } from "@/components/RegulationTable";
import { RegulationDetail } from "@/components/RegulationDetail";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { ViewSelector } from "@/components/ViewSelector";
import { jurisdictions, quickViews, regulations } from "@/data/seed";
import { initialFilters, filterRegulations } from "@/lib/filters";
import { Jurisdiction, Regulation } from "@/types/regulation";

export default function Home() {
  const [filters, setFilters] = useState(initialFilters);
  const [activeView, setActiveView] = useState("overview");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(
    jurisdictions.find((jurisdiction) => jurisdiction.id === "eu") || null
  );
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);

  const filtered = useMemo(() => filterRegulations(regulations, filters), [filters]);
  const activeViewLabel = activeView === "overview" ? "Global overview" : quickViews.find((view) => view.id === activeView)?.label || "Custom view";
  const sourceCount = filtered.reduce((count, regulation) => count + regulation.sourceUrls.length, 0);
  const highImpact = filtered.filter((regulation) => regulation.highImpact).length;

  function applyView(id: string, quickFilters: Partial<typeof filters>) {
    setActiveView(id);
    setFilters({ ...initialFilters, ...quickFilters });
  }

  function updateFilters(nextFilters: typeof filters) {
    setActiveView("custom");
    setFilters(nextFilters);
  }

  function resetFilters() {
    setActiveView("overview");
    setFilters(initialFilters);
  }

  return (
    <main className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-5 md:px-6">
        <section className="rounded-2xl bg-navy p-6 text-white shadow-xl md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">
                ESG Regulatory Atlas
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Interactive sustainability regulatory intelligence by jurisdiction, sector, value chain and reporting year.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <HeroMetric icon={Database} label="Current view" value={`${filtered.length} records`} />
              <HeroMetric icon={Gauge} label="High impact" value={`${highImpact} records`} />
              <HeroMetric icon={Database} label="Sources" value={`${sourceCount} links`} />
            </div>
          </div>
        </section>

        <DisclaimerBanner />

        <ViewSelector activeId={activeView} onApply={applyView} />

        <Filters filters={filters} regulations={regulations} onChange={updateFilters} onReset={resetFilters} />

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,.65fr)]">
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-hidden">
            <WorldMap
              jurisdictions={jurisdictions}
              regulations={filtered}
              selectedId={selectedJurisdiction?.id}
              viewLabel={activeViewLabel}
              onSelect={setSelectedJurisdiction}
            />
          </div>
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto lg:pr-1">
            <CountryPanel jurisdiction={selectedJurisdiction} regulations={filtered} onRegulation={setSelectedRegulation} />
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[.75fr_1.25fr]">
          <AssessmentPrompt />
          <div>
            <div className="mb-3 flex items-center justify-between gap-3 px-1">
              <div>
                <h2 className="font-semibold text-ink">Regulation table preview</h2>
                <p className="mt-1 text-sm text-slate-500">Open the full Regulations workspace for deep review and filtering.</p>
              </div>
              <Link href="/regulations" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <RegulationTable regulations={filtered.slice(0, 6)} onSelect={setSelectedRegulation} />
          </div>
        </section>

        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}

function AssessmentPrompt() {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-teal/10 p-2 text-teal">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold text-ink">Not sure what applies?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Answer a few questions to generate an indicative shortlist by jurisdiction, company type, sector and value-chain exposure.
          </p>
          <Link href="/assessment" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Start assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
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
      <div className="mt-2 text-xl font-bold">{value}</div>
    </div>
  );
}
