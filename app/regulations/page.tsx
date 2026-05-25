"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Search, UsersRound } from "lucide-react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { ActiveFilterSummary } from "@/components/ActiveFilterSummary";
import { Filters } from "@/components/Filters";
import { ComparePicker } from "@/components/ComparePicker";
import { GlossaryHelpCard } from "@/components/GlossaryHelpCard";
import { PersonaPresets } from "@/components/PersonaPresets";
import { RegulationExportButtons } from "@/components/RegulationExportButtons";
import { RegulationDetail } from "@/components/RegulationDetail";
import { RegulationTable } from "@/components/RegulationTable";
import { ShareViewButton } from "@/components/ShareViewButton";
import { useLanguage } from "@/components/LanguageProvider";
import { regulations } from "@/data/seed";
import { personaPresetById, type PersonaPreset } from "@/data/personaPresets";
import { filterRegulations, initialFilters } from "@/lib/filters";
import { filtersFromSearchParams, filtersToSearchParams } from "@/lib/urlFilters";
import { FilterState, Regulation } from "@/types/regulation";

export default function RegulationsPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [activePersona, setActivePersona] = useState("");
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const [urlReady, setUrlReady] = useState(false);
  const filtered = useMemo(() => filterRegulations(regulations, filters), [filters]);
  const { t } = useLanguage();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const persona = personaPresetById(params.get("persona") || "");
    const explicitFilters = compactFilters(filtersFromSearchParams(params));
    setActivePersona(persona?.id || "");
    setFilters(persona ? { ...initialFilters, ...persona.filters, ...explicitFilters } : { ...initialFilters, ...explicitFilters });
    setUrlReady(true);
  }, []);

  useEffect(() => {
    if (!urlReady) return;
    const params = filtersToSearchParams(filters);
    if (activePersona) params.set("persona", activePersona);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  }, [activePersona, filters, urlReady]);

  function applyPersona(preset: PersonaPreset) {
    if (!urlReady) return;
    setActivePersona(preset.id);
    setFilters({ ...initialFilters, ...preset.filters });
  }

  function updateFilters(nextFilters: FilterState) {
    setActivePersona("");
    setFilters(nextFilters);
  }

  function resetFilters() {
    if (!urlReady) return;
    setActivePersona("");
    setFilters(initialFilters);
  }

  function clearFilter(key: keyof FilterState) {
    setActivePersona("");
    setFilters((current) => ({ ...current, [key]: "" }));
  }

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow={t("page.regulations.eyebrow")}
          title={t("page.regulations.title")}
          body={t("page.regulations.body")}
        />
        <DisclaimerBanner />
        <section data-testid="regulations-search-workspace" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-teal">
                <Search className="h-4 w-4" aria-hidden="true" />
                Search-first database
              </div>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-ink">Start with search and primary filters</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Narrow the Atlas by regulation, jurisdiction, topic, sector, company type or reporting year first. Role lenses, comparison, exports and label help stay below the results so the database remains scan-friendly.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <span className="font-semibold text-ink">{filtered.length}</span> of {regulations.length} tracked seed records
            </div>
          </div>
          <Filters filters={filters} regulations={regulations} onChange={updateFilters} onReset={resetFilters} embedded />
        </section>
        <ActiveFilterSummary
          filters={filters}
          activePersona={activePersona}
          filteredCount={filtered.length}
          totalCount={regulations.length}
          onClearFilter={clearFilter}
          onReset={resetFilters}
        />
        <RegulationTable regulations={filtered} onSelect={setSelectedRegulation} />

        <section data-testid="regulations-secondary-tools" className="grid gap-3 lg:grid-cols-2">
          <details className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <summary className="flex cursor-pointer list-none flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <span>
                <span className="inline-flex items-center gap-2 font-semibold text-ink">
                  <UsersRound className="h-4 w-4 text-teal" aria-hidden="true" />
                  Role lenses
                </span>
                <span className="mt-1 block text-sm text-slate-500 dark:text-slate-300">Optional persona presets for finance, legal, procurement, private equity and advisor views.</span>
              </span>
              {activePersona ? <span className="rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">Active</span> : null}
            </summary>
            <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-700">
              <PersonaPresets activeId={activePersona} onApply={applyPersona} onClear={resetFilters} disabled={!urlReady} embedded />
            </div>
          </details>
          <ComparePicker regulations={filtered} />
        </section>

        <section className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-start">
          <GlossaryHelpCard
            compact
            title="How to read database labels"
            body="The table uses status, readiness, confidence, legal-force and data-quality labels as triage signals. Use the glossary before treating a filtered result as compliance scope."
          />
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
              <Download className="h-4 w-4 text-teal" aria-hidden="true" />
              Share or export this view
            </div>
            <div className="flex flex-wrap gap-2">
              <ShareViewButton />
              <RegulationExportButtons regulations={filtered} />
            </div>
          </div>
        </section>
        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}

function compactFilters(filters: FilterState) {
  return Object.fromEntries(Object.entries(filters).filter(([, value]) => Boolean(value))) as Partial<FilterState>;
}
