"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { ApplicabilityWizard } from "@/components/ApplicabilityWizard";
import { RegulationDetail } from "@/components/RegulationDetail";
import { regulations } from "@/data/seed";
import { Regulation } from "@/types/regulation";

export default function AssessmentPage() {
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Assessment"
          title="Find potentially relevant ESG regulations"
          body="Use a simple static profile to generate an indicative shortlist for client scoping, internal triage or advisory planning."
          meta="Indicative output only. Applicability still depends on thresholds, entity facts and legal interpretation."
        />
        <DisclaimerBanner />
        <ApplicabilityWizard regulations={regulations} onSelect={setSelectedRegulation} />
        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}
