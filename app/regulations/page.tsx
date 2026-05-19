"use client";

import { useEffect, useMemo, useState } from "react";
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
        <GlossaryHelpCard
          compact
          title="How to read database labels"
          body="The table uses status, readiness, confidence, legal-force and data-quality labels as triage signals. Use the glossary before treating a filtered result as compliance scope."
        />
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <ComparePicker regulations={filtered} />
          <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
            <ShareViewButton />
            <RegulationExportButtons regulations={filtered} />
          </div>
        </div>
        <PersonaPresets activeId={activePersona} onApply={applyPersona} onClear={resetFilters} disabled={!urlReady} />
        <Filters filters={filters} regulations={regulations} onChange={updateFilters} onReset={resetFilters} />
        <ActiveFilterSummary
          filters={filters}
          activePersona={activePersona}
          filteredCount={filtered.length}
          totalCount={regulations.length}
          onClearFilter={clearFilter}
          onReset={resetFilters}
        />
        <RegulationTable regulations={filtered} onSelect={setSelectedRegulation} />
        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}

function compactFilters(filters: FilterState) {
  return Object.fromEntries(Object.entries(filters).filter(([, value]) => Boolean(value))) as Partial<FilterState>;
}