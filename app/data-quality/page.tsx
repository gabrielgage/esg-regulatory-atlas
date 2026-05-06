"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { CoverageMatrix } from "@/components/CoverageMatrix";
import { CoverageConfidencePanel } from "@/components/CoverageConfidencePanel";
import { CoverageDepthPanel } from "@/components/CoverageDepthPanel";
import { DataQualityPanel } from "@/components/DataQualityPanel";
import { MarqueeReviewQueue } from "@/components/MarqueeReviewQueue";
import { MarqueeEvidenceGate } from "@/components/MarqueeEvidenceGate";
import { ReviewWorkflowExportPanel } from "@/components/ReviewWorkflowExportPanel";
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
        <section className="rounded-2xl border bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Coverage trust model</p>
          <h2 className="mt-2 text-xl font-semibold text-ink">Tracked coverage is not complete global coverage</h2>
          <p className="mt-2">
            The Atlas separates current tracked records from watchlist topics, source-reviewed records, seed intelligence and records needing review. This distinction is essential for premium previews and advisory outputs because users need to know whether a record is ready for orientation, source review or deeper legal analysis.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            <GovernanceCard title="Tracked" body="Included in the public seed dataset with source, confidence and review metadata." />
            <GovernanceCard title="Watchlist" body="Relevant topic or market lens that may need future monitoring or source review." />
            <GovernanceCard title="Source-reviewed" body="Record has primary, regulator or standard-setter source support and recent review." />
            <GovernanceCard title="Seed" body="Illustrative regulatory intelligence for orientation; not production-verified legal content." />
            <GovernanceCard title="Needs review" body="Source, date, threshold or wording should be validated before client reliance." />
          </div>
        </section>
        <SourceLibrary regulations={regulations} onSelect={setSelectedRegulation} />
        <CoverageMatrix
          jurisdictions={jurisdictions}
          regulations={regulations}
          selectedId={selectedJurisdiction?.id}
          onSelect={setSelectedJurisdiction}
        />
        <CoverageConfidencePanel jurisdictions={jurisdictions} regulations={regulations} onSelect={setSelectedJurisdiction} />
        <CoverageDepthPanel jurisdictions={jurisdictions} regulations={regulations} onSelect={setSelectedJurisdiction} />
        <MarqueeEvidenceGate regulations={regulations} />
        <ReviewWorkflowExportPanel regulations={regulations} onSelect={setSelectedRegulation} />
        <MarqueeReviewQueue regulations={regulations} onSelect={setSelectedRegulation} />
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
