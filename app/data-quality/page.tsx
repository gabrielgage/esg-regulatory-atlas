"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { CoverageMatrix } from "@/components/CoverageMatrix";
import { DataQualityPanel } from "@/components/DataQualityPanel";
import { SourceLibrary } from "@/components/SourceLibrary";
import { RegulationDetail } from "@/components/RegulationDetail";
import { DATASET_META } from "@/data/_meta";
import { jurisdictions, regulations } from "@/data/seed";
import { Jurisdiction, Regulation } from "@/types/regulation";

export default function DataQualityPage() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(jurisdictions.find((jurisdiction) => jurisdiction.id === "eu") || null);
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Data quality"
          title="Source coverage and review risk"
          body="Internal governance view for coverage, source quality and review prioritisation across the static seed dataset."
          meta={`Current edition ${DATASET_META.edition}. Dataset last reviewed ${DATASET_META.lastReviewed}.`}
        />
        <DisclaimerBanner />
        <SourceLibrary regulations={regulations} onSelect={setSelectedRegulation} />
        <CoverageMatrix
          jurisdictions={jurisdictions}
          regulations={regulations}
          selectedId={selectedJurisdiction?.id}
          onSelect={setSelectedJurisdiction}
        />
        <DataQualityPanel regulations={regulations} onSelect={setSelectedRegulation} />
        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}
