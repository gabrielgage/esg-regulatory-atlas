"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { Filters } from "@/components/Filters";
import { ComparePicker } from "@/components/ComparePicker";
import { RegulationDetail } from "@/components/RegulationDetail";
import { RegulationTable } from "@/components/RegulationTable";
import { regulations } from "@/data/seed";
import { filterRegulations, initialFilters } from "@/lib/filters";
import { Regulation } from "@/types/regulation";

export default function RegulationsPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const filtered = useMemo(() => filterRegulations(regulations, filters), [filters]);

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Regulations"
          title="Search the ESG regulatory database"
          body="Review records by jurisdiction, sector, company type, obligation, reporting year, source quality and advisory opportunity."
        />
        <DisclaimerBanner />
        <ComparePicker regulations={filtered} />
        <Filters filters={filters} regulations={regulations} onChange={setFilters} onReset={() => setFilters(initialFilters)} />
        <RegulationTable regulations={filtered} onSelect={setSelectedRegulation} />
        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}
