"use client";

import { useState } from "react";
import { BookOpenCheck, Mail } from "lucide-react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { CoverageMatrix } from "@/components/CoverageMatrix";
import { DataQualityPanel } from "@/components/DataQualityPanel";
import { RegulationDetail } from "@/components/RegulationDetail";
import { SourceLibrary } from "@/components/SourceLibrary";
import { Badge } from "@/components/Badge";
import { DATASET_META } from "@/data/_meta";
import { jurisdictions, regulations } from "@/data/seed";
import { formatDate } from "@/lib/utils";
import { Jurisdiction, Regulation } from "@/types/regulation";

export default function MethodologyPage() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(jurisdictions.find((jurisdiction) => jurisdiction.id === "eu") || null);
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Methodology"
          title="Methodology, source library and review cadence"
          body="How the Atlas structures regulatory intelligence, prioritises source quality and tracks records that need further production research."
        />
        <DisclaimerBanner />

        <section className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5 text-teal" />
              <h2 className="font-semibold text-ink">About this radar</h2>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <p>
                Etica ESG · Regulatory Atlas is an independent radar of sustainability and ESG regulation. It is structured around three layers:
                international baseline frameworks, local jurisdictional rules, and sectoral or regional regulations that affect cross-border
                operations, finance, products and value chains.
              </p>
              <p>
                Coverage today spans {regulations.length} records across {jurisdictions.filter((jurisdiction) => jurisdiction.type !== "international").length} tracked jurisdictions.
                The dataset is reviewed on a published cadence, with each record linked to source material and assigned a confidence and review status.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-ink">Review cadence</h2>
            <div className="mt-4 grid gap-3">
              <Metric label="Edition" value={DATASET_META.edition} />
              <Metric label="Last reviewed" value={formatDate(DATASET_META.lastReviewed)} />
              <Metric label="Next scheduled review" value={formatDate(DATASET_META.nextReview)} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="border-teal/20 bg-teal/10 text-teal">Source-backed records</Badge>
              <Badge className="border-slate-200 bg-slate-50 text-slate-600">Published review cadence</Badge>
            </div>
            <a className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal underline" href={`mailto:${DATASET_META.contactEmail}`}>
              <Mail className="h-4 w-4" />
              Request a briefing
            </a>
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 font-semibold text-ink">{value}</div>
    </div>
  );
}
