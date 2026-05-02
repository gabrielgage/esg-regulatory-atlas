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
        <section className="rounded-2xl border bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Source-of-truth governance</p>
          <h2 className="mt-2 text-xl font-semibold text-ink">Condensed parent records keep the Atlas decision-ready</h2>
          <p className="mt-2">
            The Atlas intentionally does not split ESRS, GRI, ISSB, SFDR, EU Taxonomy, CDP, PCAF or major financial-services packages into dozens of disconnected top-level records. Modules, delegated acts, questionnaires and milestones are captured as aliases or child details so users can search them without losing the market view.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <GovernanceCard title="Source hierarchy" body="Primary law, regulator guidance and standard-setter materials are prioritised above secondary commentary." />
            <GovernanceCard title="Review cadence" body="Records carry last-reviewed and next-review dates so high-impact, uncertain or changing items can be queued." />
            <GovernanceCard title="Legal caution" body="Records describe potential relevance and planning actions. They do not decide legal applicability." />
            <GovernanceCard title="Granularity rule" body="Top-level records are parent regimes; subrules stay as child items, aliases, milestones or source notes." />
          </div>
        </section>
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

function GovernanceCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}
