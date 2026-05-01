"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { AdvisoryInsights } from "@/components/AdvisoryInsights";
import { DataQualityPanel } from "@/components/DataQualityPanel";
import { ExecutiveBriefing } from "@/components/ExecutiveBriefing";
import { ExportSummaryButton } from "@/components/ExportSummaryButton";
import { SectorHeatmap } from "@/components/SectorHeatmap";
import { RegulationDetail } from "@/components/RegulationDetail";
import { regulations } from "@/data/seed";
import { Regulation } from "@/types/regulation";
import { cn } from "@/lib/utils";

const tabs = ["Priority regulations", "Sector heatmap", "Advisory workstreams", "Data governance risks", "Client summary"] as const;

export default function BriefingPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Priority regulations");
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Briefing"
          title="Executive and advisory briefing workspace"
          body="Combine priority regulations, advisory workstreams, data governance risks and a copyable client planning summary in one focused briefing view."
        />
        <DisclaimerBanner />
        <section className="rounded-2xl border bg-white p-3 shadow-sm">
          <div className="flex gap-1 overflow-x-auto rounded-full bg-slate-50 p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
                  activeTab === tab ? "bg-white text-ink shadow-sm" : "text-slate-500 hover:bg-white hover:text-ink"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>
        {activeTab === "Priority regulations" && <ExecutiveBriefing regulations={regulations} onSelect={setSelectedRegulation} />}
        {activeTab === "Sector heatmap" && <SectorHeatmap />}
        {activeTab === "Advisory workstreams" && <AdvisoryInsights regulations={regulations} />}
        {activeTab === "Data governance risks" && <DataQualityPanel regulations={regulations} onSelect={setSelectedRegulation} />}
        {activeTab === "Client summary" && <ExportSummaryButton jurisdiction={null} regulations={regulations} />}
        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}
