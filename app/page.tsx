"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Database, HelpCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import { WorldChoropleth as WorldMap } from "@/components/WorldChoropleth";
import { CountryPanel } from "@/components/CountryPanel";
import { RegulationTable } from "@/components/RegulationTable";
import { RegulationDetail } from "@/components/RegulationDetail";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { ShareViewButton } from "@/components/ShareViewButton";
import { ViewSelector } from "@/components/ViewSelector";
import { useLanguage } from "@/components/LanguageProvider";
import { DATASET_META } from "@/data/_meta";
import { jurisdictions, quickViews, regulations } from "@/data/seed";
import { initialFilters, filterRegulations } from "@/lib/filters";
import { filtersFromSearchParams, filtersToSearchParams, viewFromSearchParams } from "@/lib/urlFilters";
import { Jurisdiction, Regulation } from "@/types/regulation";

export default function Home() {
  const [filters, setFilters] = useState(initialFilters);
  const [activeView, setActiveView] = useState("overview");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(
    jurisdictions.find((jurisdiction) => jurisdiction.id === "eu") || null
  );
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const [urlReady, setUrlReady] = useState(false);
  const { t } = useLanguage();

  const filtered = useMemo(() => filterRegulations(regulations, filters), [filters]);
  const activeViewLabel = activeView === "overview" ? t("views.overview") : quickViews.find((view) => view.id === activeView)?.label || t("views.custom");
  const sourceCount = filtered.reduce((count, regulation) => count + regulation.sourceUrls.length, 0);
  const highImpact = filtered.filter((regulation) => regulation.highImpact).length;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters(filtersFromSearchParams(params));
    setActiveView(viewFromSearchParams(params));
    setUrlReady(true);
  }, []);

  useEffect(() => {
    if (!urlReady) return;
    const params = filtersToSearchParams(filters, activeView);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  }, [activeView, filters, urlReady]);

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
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-5 md:px-6">
        <section className="rounded-2xl border bg-white p-5 shadow-sm md:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,.6fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">{DATASET_META.edition} · source-linked seed intelligence</p>
              <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {t("home.heroTitle")}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                {t("home.heroBody")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/changelog" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                  {t("home.viewChangelog")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/plans" className="inline-flex items-center gap-2 rounded-xl bg-navy px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                  Compare options <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-3 max-w-2xl text-xs leading-5 text-slate-500">{t("home.languageCaveat")}</p>
            </div>
            <WorkspaceSnapshot records={filtered.length} highImpact={highImpact} sources={sourceCount} />
          </div>
        </section>

        <DisclaimerBanner />

        <section className="rounded-2xl border bg-white p-3 shadow-sm">
          <div className="mb-3 flex flex-col gap-2 px-1 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-ink">Map workspace</h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">Select a planning view, filter the seed dataset, then inspect jurisdictions on the map.</p>
            </div>
            <ShareViewButton />
          </div>
          <div className="space-y-3">
            <ViewSelector activeId={activeView} onApply={applyView} embedded />
            <Filters filters={filters} regulations={regulations} onChange={updateFilters} onReset={resetFilters} embedded />
          </div>
        </section>

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
                <h2 className="font-semibold text-ink">{t("home.tableTitle")}</h2>
                <p className="mt-1 text-sm text-slate-500">{t("home.tableBody")}</p>
              </div>
              <Link href="/regulations" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                {t("home.viewAll")} <ArrowRight className="h-4 w-4" />
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
  const { t } = useLanguage();

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-teal/10 p-2 text-teal">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold text-ink">{t("home.assessmentTitle")}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {t("home.assessmentBody")}
          </p>
          <Link href="/assessment" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            {t("home.startAssessment")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WorkspaceSnapshot({ records, highImpact, sources }: { records: number; highImpact: number; sources: number }) {
  const { t } = useLanguage();
  const metrics = [
    { label: t("home.currentView"), value: records },
    { label: t("home.highImpact"), value: highImpact },
    { label: t("home.sources"), value: sources }
  ];

  return (
    <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/60">
      <div className="flex items-center gap-2 text-sm font-semibold text-ink">
        <span className="rounded-lg bg-white p-2 text-teal shadow-sm dark:bg-slate-800">
          <Database className="h-4 w-4" />
        </span>
        {t("home.currentView")}
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl bg-white p-3 text-center shadow-sm dark:bg-slate-800/80">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{metric.label}</dt>
            <dd className="mt-1 text-lg font-bold text-ink">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
