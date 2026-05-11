"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileText, Gauge, Map, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { AdvisoryInsights } from "@/components/AdvisoryInsights";
import { DataQualityPanel } from "@/components/DataQualityPanel";
import { ExecutiveBriefing } from "@/components/ExecutiveBriefing";
import { ExportSummaryButton } from "@/components/ExportSummaryButton";
import { MarketBriefingCTA } from "@/components/MarketBriefingCTA";
import { SectorHeatmap } from "@/components/SectorHeatmap";
import { RegulationDetail } from "@/components/RegulationDetail";
import { regulations } from "@/data/seed";
import { Regulation } from "@/types/regulation";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "Priority regulations",
    label: "Priority regulations",
    eyebrow: "Step 1",
    title: "Select the records worth leadership attention",
    body: "Start with high-impact and near-term records before moving into advisory or governance detail.",
    icon: Gauge
  },
  {
    id: "Sector heatmap",
    label: "Sector heatmap",
    eyebrow: "Step 2",
    title: "Check sector and value-chain exposure",
    body: "Use sector signals to explain why a regulation may matter to a client, portfolio or operating team.",
    icon: Map
  },
  {
    id: "Advisory workstreams",
    label: "Advisory workstreams",
    eyebrow: "Step 3",
    title: "Translate regulation into workstreams",
    body: "Group the opportunity layer into readiness, evidence, controls, supplier diligence and board briefing motions.",
    icon: Sparkles
  },
  {
    id: "Data governance risks",
    label: "Data governance risks",
    eyebrow: "Step 4",
    title: "Confirm the source and review posture",
    body: "Keep review risk visible before a static seed record is used in a client-ready or premium example.",
    icon: ShieldCheck
  },
  {
    id: "Client summary",
    label: "Client summary",
    eyebrow: "Step 5",
    title: "Copy the handoff summary",
    body: "Produce a caveated planning note with next links into assessment, market briefs and advisory review.",
    icon: ClipboardCheck
  }
] as const;

type BriefingTab = (typeof tabs)[number]["id"];

export default function BriefingPage() {
  const [activeTab, setActiveTab] = useState<BriefingTab>("Priority regulations");
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const activeStep = tabs.find((tab) => tab.id === activeTab) || tabs[0];

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
        <section className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" aria-label="Briefing builder">
            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal" />
                <h2 className="font-semibold text-ink">Briefing builder</h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Work through the briefing in order, or jump straight to the output you need. Each step stays caveated as regulatory intelligence, not legal advice.
              </p>
              <div className="mt-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-pressed={activeTab === tab.id}
                      className={cn(
                        "w-full rounded-xl border p-3 text-left transition",
                        activeTab === tab.id
                          ? "border-teal/40 bg-teal/10 text-ink shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-teal/30 hover:bg-white"
                      )}
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        <Icon className={cn("h-4 w-4", activeTab === tab.id ? "text-teal" : "text-slate-400")} />
                        {tab.eyebrow}: {tab.label}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">{tab.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Recommended path</p>
              <div className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                <p>1. Run the assessment if the client profile is unclear.</p>
                <p>2. Open a market brief for jurisdiction-specific evidence and owner prompts.</p>
                <p>3. Copy the client summary after source and review risks are visible.</p>
              </div>
              <div className="mt-4 grid gap-2">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-ink hover:border-teal/40 hover:bg-teal/5"
                >
                  Start assessment
                  <ArrowRight className="h-4 w-4 text-teal" />
                </Link>
                <Link
                  href="/markets"
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-ink hover:border-teal/40 hover:bg-teal/5"
                >
                  Browse market profiles
                  <ArrowRight className="h-4 w-4 text-teal" />
                </Link>
              </div>
            </div>

            <MarketBriefingCTA />
          </aside>

          <div className="min-w-0 space-y-4">
            <section className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal">{activeStep.eyebrow}</p>
                  <h2 className="mt-2 text-xl font-semibold text-ink">{activeStep.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{activeStep.body}</p>
                </div>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
                  {tabs.findIndex((tab) => tab.id === activeTab) + 1} of {tabs.length}
                </div>
              </div>
            </section>

            {activeTab === "Priority regulations" && <ExecutiveBriefing regulations={regulations} onSelect={setSelectedRegulation} />}
            {activeTab === "Sector heatmap" && <SectorHeatmap />}
            {activeTab === "Advisory workstreams" && <AdvisoryInsights regulations={regulations} />}
            {activeTab === "Data governance risks" && <DataQualityPanel regulations={regulations} onSelect={setSelectedRegulation} />}
            {activeTab === "Client summary" && <ExportSummaryButton jurisdiction={null} regulations={regulations} />}
          </div>
        </section>
        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}
