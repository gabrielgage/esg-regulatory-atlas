"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, FileSearch } from "lucide-react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { QualitySignalExplainer } from "@/components/QualitySignalExplainer";
import { CoverageMatrix } from "@/components/CoverageMatrix";
import { CoverageConfidencePanel } from "@/components/CoverageConfidencePanel";
import { CoverageDepthPanel } from "@/components/CoverageDepthPanel";
import { DataQualityPanel } from "@/components/DataQualityPanel";
import { DailyUpdatePulse } from "@/components/DailyUpdatePulse";
import { ExternalReviewIntakePanel } from "@/components/ExternalReviewIntakePanel";
import { GlossaryHelpCard } from "@/components/GlossaryHelpCard";
import { MarqueeReviewQueue } from "@/components/MarqueeReviewQueue";
import { MarqueeEvidenceGate } from "@/components/MarqueeEvidenceGate";
import { MarqueeSourceReviewPacket } from "@/components/MarqueeSourceReviewPacket";
import { ReviewWorkflowExportPanel } from "@/components/ReviewWorkflowExportPanel";
import { SourceLibrary } from "@/components/SourceLibrary";
import { RegulationDetail } from "@/components/RegulationDetail";
import { DATASET_META } from "@/data/_meta";
import { jurisdictions, regulations } from "@/data/seed";
import { Jurisdiction, Regulation } from "@/types/regulation";

type DataQualityTab = "overview" | "sources" | "coverage" | "review";

const dataQualityTabs: { id: DataQualityTab; label: string; description: string }[] = [
  { id: "overview", label: "Overview", description: "Principles and research queue" },
  { id: "sources", label: "Sources", description: "Source library and posture" },
  { id: "coverage", label: "Coverage", description: "Market depth and confidence" },
  { id: "review", label: "Review workflow", description: "Premium gates and exports" }
];

export default function DataQualityPage() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(jurisdictions.find((jurisdiction) => jurisdiction.id === "eu") || null);
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const [activeTab, setActiveTab] = useState<DataQualityTab>("overview");

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Data quality"
          title="Source links and review prompts"
          body="Governance view for source links, source quality, coverage depth and review prioritisation across the static seed dataset."
          meta={`Current edition ${DATASET_META.edition}. Dataset last reviewed ${DATASET_META.lastReviewed}.`}
        />
        <DisclaimerBanner />
        <GlossaryHelpCard
          title="Need help interpreting status and source labels?"
          body="The glossary explains status, legal-force, confidence and data-quality labels such as in force, first reporting, needs review, date uncertain and source missing."
        />
        <QualitySignalExplainer />
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-3">
              <span className="rounded-xl bg-white/80 p-2 text-amber-700">
                <FileSearch className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-semibold text-ink">Threshold-sensitive records need a separate review lane</h2>
                <p className="mt-1 max-w-3xl">
                  The threshold matrix shows which entity, market, product, value-chain or adoption facts should be checked before high-value records are used in
                  assessments, premium previews or advisory conversations.
                </p>
              </div>
            </div>
            <Link href="/thresholds" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2 font-semibold text-white hover:bg-slate-800">
              Open threshold matrix <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="sticky top-16 z-20 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur">
          <div className="grid gap-2 md:grid-cols-4" role="tablist" aria-label="Data quality sections">
            {dataQualityTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`data-quality-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={
                  activeTab === tab.id
                    ? "rounded-xl bg-navy px-4 py-3 text-left text-white shadow-sm"
                    : "rounded-xl px-4 py-3 text-left text-slate-600 hover:bg-slate-50"
                }
              >
                <span className="block text-sm font-semibold">{tab.label}</span>
                <span className={activeTab === tab.id ? "mt-1 block text-xs text-white/75" : "mt-1 block text-xs text-slate-400"}>{tab.description}</span>
              </button>
            ))}
          </div>
        </section>

        <div id={`data-quality-${activeTab}`} role="tabpanel" className="space-y-5">
          {activeTab === "overview" ? (
            <>
              <DailyUpdatePulse compact />
              <section className="grid gap-5 lg:grid-cols-2">
                <GovernanceSection
                  eyebrow="Source-of-truth governance"
                  title="Condensed parent records keep the Atlas decision-ready"
                  body="The Atlas intentionally does not split ESRS, GRI, ISSB, SFDR, EU Taxonomy, CDP, PCAF or major financial-services packages into dozens of disconnected top-level records. Modules, delegated acts, questionnaires and milestones are captured as aliases or child details so users can search them without losing the market view."
                  cards={[
                    ["Source hierarchy", "Primary law, regulator guidance and standard-setter materials are prioritised above secondary commentary."],
                    ["Review cadence", "Records carry last-reviewed and next-review dates so high-impact, uncertain or changing items can be queued."],
                    ["Legal caution", "Records describe potential relevance and planning actions. They do not decide legal applicability."],
                    ["Granularity rule", "Top-level records are parent regimes; subrules stay as child items, aliases, milestones or source notes."]
                  ]}
                />
                <GovernanceSection
                  eyebrow="Coverage trust model"
                  title="Tracked coverage is not a comprehensive legal inventory"
                  body="The Atlas separates current tracked records from watchlist topics, source-reviewed records, seed intelligence and records needing review. This distinction helps users understand whether a record is ready for orientation, source review or deeper legal analysis."
                  cards={[
                    ["Tracked", "Included in the public seed dataset with source, confidence and review metadata."],
                    ["Watchlist", "Relevant topic or market lens that may need future monitoring or source review."],
                    ["Source-reviewed", "Priority-source support and recent review, still with entity-specific caveats."],
                    ["Needs review", "Source, date, threshold or wording should be validated before client reliance."]
                  ]}
                />
              </section>
              <DataQualityPanel regulations={regulations} onSelect={setSelectedRegulation} />
            </>
          ) : null}

          {activeTab === "sources" ? <SourceLibrary regulations={regulations} onSelect={setSelectedRegulation} /> : null}

          {activeTab === "coverage" ? (
            <>
              <CoverageConfidencePanel jurisdictions={jurisdictions} regulations={regulations} onSelect={setSelectedJurisdiction} />
              <CoverageDepthPanel jurisdictions={jurisdictions} regulations={regulations} onSelect={setSelectedJurisdiction} />
              <CoverageMatrix
                jurisdictions={jurisdictions}
                regulations={regulations}
                selectedId={selectedJurisdiction?.id}
                onSelect={setSelectedJurisdiction}
              />
            </>
          ) : null}

          {activeTab === "review" ? (
            <>
              <MarqueeSourceReviewPacket regulations={regulations} onSelect={setSelectedRegulation} />
              <MarqueeEvidenceGate regulations={regulations} />
              <ReviewWorkflowExportPanel regulations={regulations} onSelect={setSelectedRegulation} />
              <ExternalReviewIntakePanel />
              <MarqueeReviewQueue regulations={regulations} onSelect={setSelectedRegulation} />
            </>
          ) : null}
        </div>
        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}

function GovernanceSection({
  eyebrow,
  title,
  body,
  cards
}: {
  eyebrow: string;
  title: string;
  body: string;
  cards: [string, string][];
}) {
  return (
    <section className="rounded-2xl border bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-teal">{eyebrow}</p>
      <h2 className="mt-2 text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-2">{body}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {cards.map(([cardTitle, cardBody]) => (
          <GovernanceCard key={cardTitle} title={cardTitle} body={cardBody} />
        ))}
      </div>
    </section>
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
