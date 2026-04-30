"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { CoverageMatrix } from "@/components/CoverageMatrix";
import { DataQualityPanel } from "@/components/DataQualityPanel";
import { RegulationDetail } from "@/components/RegulationDetail";
import { SourceLibrary } from "@/components/SourceLibrary";
import { jurisdictions, regulations } from "@/data/seed";
import { Jurisdiction, Regulation } from "@/types/regulation";

export default function DataQualityPage() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(jurisdictions.find((jurisdiction) => jurisdiction.id === "eu") || null);
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);

  return (
    <main className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Data Quality"
          title="Coverage, source quality and review risk"
          body="Internal governance workspace for tracking source coverage, review queues, jurisdiction coverage depth and research-risk indicators."
        />
        <DisclaimerBanner />
        <CoverageMatrix
          jurisdictions={jurisdictions}
          regulations={regulations}
          selectedId={selectedJurisdiction?.id}
          onSelect={setSelectedJurisdiction}
        />
        <section className="grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
          <DataQualityPanel regulations={regulations} onSelect={setSelectedRegulation} />
          <SourceLibrary regulations={regulations} onSelect={setSelectedRegulation} />
        </section>
        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}
