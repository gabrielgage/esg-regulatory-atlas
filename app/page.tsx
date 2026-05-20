"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ClipboardList, Database, HelpCircle, MapPinned, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import { WorldChoropleth as WorldMap } from "@/components/WorldChoropleth";
import { CountryPanel } from "@/components/CountryPanel";
import { RegulationTable } from "@/components/RegulationTable";
import { RegulationDetail } from "@/components/RegulationDetail";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { Badge } from "@/components/Badge";
import { RecordMetaBadges } from "@/components/RecordMetaBadges";
import { ShareViewButton } from "@/components/ShareViewButton";
import { StatusBadge } from "@/components/StatusBadge";
import { ViewSelector } from "@/components/ViewSelector";
import { useLanguage } from "@/components/LanguageProvider";
import { DATASET_META } from "@/data/_meta";
import { jurisdictions, quickViews, regulations } from "@/data/seed";
import { initialFilters, filterRegulations } from "@/lib/filters";
import { getHomepageChrome } from "@/lib/homepageChrome";
import { readinessBand, readinessClass, readinessScore } from "@/lib/scoring";
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
  const { t, language } = useLanguage();
  const h = (key: Parameters<typeof getHomepageChrome>[1]) => getHomepageChrome(language, key);

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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                {DATASET_META.edition} · {h("editionLabel")}
              </p>
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
                  {h("compareOptions")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-3 max-w-2xl text-xs leading-5 text-slate-500">{t("home.languageCaveat")}</p>
            </div>
            <WorkspaceSnapshot records={filtered.length} highImpact={highImpact} sources={sourceCount} />
          </div>
        </section>

        <DisclaimerBanner />

        <StartHerePanel />

        <section className="rounded-2xl border bg-white p-3 shadow-sm">
          <div className="mb-3 flex flex-col gap-2 px-1 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-ink">{h("mapWorkspace")}</h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">{h("mapWorkspaceBody")}</p>
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

        <section className="grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
          <AssessmentPrompt jurisdictionName={selectedJurisdiction?.name || "the selected market"} activeViewLabel={activeViewLabel} records={filtered.length} />
          <RegulationPreviewPanel regulations={filtered} onSelect={setSelectedRegulation} />
        </section>

        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}

function StartHerePanel() {
  const { t } = useLanguage();
  const starts = [
    {
      href: "/assessment",
      icon: ClipboardList,
      title: t("home.startHereAssessmentTitle"),
      body: t("home.startHereAssessmentBody"),
      action: t("home.startHereAssessmentAction")
    },
    {
      href: "/markets",
      icon: MapPinned,
      title: t("home.startHereMarketsTitle"),
      body: t("home.startHereMarketsBody"),
      action: t("home.startHereMarketsAction")
    },
    {
      href: "/regulations",
      icon: Search,
      title: t("home.startHereRegulationsTitle"),
      body: t("home.startHereRegulationsBody"),
      action: t("home.startHereRegulationsAction")
    }
  ];

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm md:p-6" data-testid="start-here-panel">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">{t("home.startHereEyebrow")}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">{t("home.startHereTitle")}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{t("home.startHereBody")}</p>
        </div>
        <Badge className="border-amber-200 bg-amber-50 text-amber-800">{t("home.startHereCaveat")}</Badge>
      </div>
      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {starts.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-teal/40 hover:bg-teal/5">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-xl bg-white p-2 text-teal shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-teal" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              <div className="mt-4 text-sm font-semibold text-teal">{item.action}</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function AssessmentPrompt({ jurisdictionName, activeViewLabel, records }: { jurisdictionName: string; activeViewLabel: string; records: number }) {
  const { t, language } = useLanguage();
  const h = (key: Parameters<typeof getHomepageChrome>[1]) => getHomepageChrome(language, key);

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
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-600">
            <p className="font-semibold text-ink">{h("currentWorkspaceContext")}</p>
            <p className="mt-1">
              {jurisdictionName} · {activeViewLabel} · {records} {h("matchingSeedRecords")}. {h("assessmentContextHint")}
            </p>
          </div>
          <Link href="/assessment" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            {t("home.startAssessment")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function RegulationPreviewPanel({ regulations, onSelect }: { regulations: Regulation[]; onSelect: (regulation: Regulation) => void }) {
  const { t, language } = useLanguage();
  const h = (key: Parameters<typeof getHomepageChrome>[1]) => getHomepageChrome(language, key);
  const priorityRecords = regulations.slice(0, 3);
  const tableRecords = regulations.slice(0, 6);

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-semibold text-ink">{t("home.tableTitle")}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">{t("home.tableBody")}</p>
        </div>
        <Link href="/regulations" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
          {t("home.viewAll")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-3">
        {priorityRecords.map((regulation) => (
          <PriorityRecordCard key={regulation.id} regulation={regulation} onSelect={onSelect} />
        ))}
        {!priorityRecords.length && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 md:col-span-3">
            {h("noMatchingRecords")}
          </div>
        )}
      </div>

      <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70">
        <summary className="cursor-pointer list-none px-3 py-3 text-sm font-semibold text-slate-600">
          {h("openTablePreview")} ({tableRecords.length} {h("records")})
        </summary>
        <div className="border-t border-slate-200 bg-white p-3">
          <RegulationTable regulations={tableRecords} onSelect={onSelect} />
        </div>
      </details>
    </section>
  );
}

function PriorityRecordCard({ regulation, onSelect }: { regulation: Regulation; onSelect: (regulation: Regulation) => void }) {
  const { t, language } = useLanguage();
  const h = (key: Parameters<typeof getHomepageChrome>[1]) => getHomepageChrome(language, key);
  const band = readinessBand(regulation);
  const prioritySource = regulation.sourceUrls.find((source) => source.type === "primary" || source.type === "regulator" || source.type === "standards_body");

  return (
    <button
      type="button"
      onClick={() => onSelect(regulation)}
      className="flex min-h-[16rem] flex-col rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-teal/40 hover:bg-teal/5 focus-visible:border-teal/50"
      aria-label={`Review details for ${regulation.shortName}`}
      data-testid="priority-record-card"
    >
      <span className="flex items-start justify-between gap-2">
        <span>
          <span className="block text-sm font-semibold text-ink">{regulation.shortName}</span>
          <span className="mt-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">{regulation.jurisdiction}</span>
        </span>
        <StatusBadge status={regulation.status} className="shrink-0" />
      </span>
      <span className="mt-2 line-clamp-3 block text-xs leading-5 text-slate-500">{regulation.summary}</span>
      <RecordMetaBadges regulation={regulation} compact />
      <span className="mt-3 grid grid-cols-2 gap-2 text-[11px] leading-4 text-slate-500">
        <span className="rounded-lg border border-slate-200 bg-white p-2">
          <span className="block font-semibold text-ink">{regulation.firstReportingYear || h("monitor")}</span>
          <span>{h("priorityFirstReporting")}</span>
        </span>
        <span className="rounded-lg border border-slate-200 bg-white p-2">
          <span className="block font-semibold text-ink">{regulation.sourceUrls.length}</span>
          <span>{h("prioritySourceLinks")}</span>
        </span>
      </span>
      <span className="mt-2 flex flex-wrap gap-1.5">
        <Badge className={readinessClass(band)}>
          {band} {h("priority")} · {readinessScore(regulation)}
        </Badge>
        {regulation.highImpact && <Badge className="border-red-200 bg-red-50 text-red-700">{t("home.highImpact")}</Badge>}
      </span>
      <span className="mt-3 line-clamp-2 text-[11px] leading-4 text-slate-500">
        {h("sourceToVerify")}: {prioritySource?.label || regulation.sourceUrls[0]?.label || h("sourceReviewNeeded")}
      </span>
      <span className="mt-auto pt-3">
        <span className="inline-flex rounded-full bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          {h("reviewDetails")}
        </span>
      </span>
    </button>
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
