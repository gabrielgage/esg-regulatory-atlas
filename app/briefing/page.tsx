"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileText, Gauge, Map, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { CopyOutputNote } from "@/components/CopyOutputNote";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { GlossaryHelpCard } from "@/components/GlossaryHelpCard";
import { PageIntro } from "@/components/PageIntro";
import { AdvisoryInsights } from "@/components/AdvisoryInsights";
import { DataQualityPanel } from "@/components/DataQualityPanel";
import { ExecutiveBriefing } from "@/components/ExecutiveBriefing";
import { ExportSummaryButton } from "@/components/ExportSummaryButton";
import { MarketBriefingCTA } from "@/components/MarketBriefingCTA";
import { SectorHeatmap } from "@/components/SectorHeatmap";
import { RegulationDetail } from "@/components/RegulationDetail";
import { Badge } from "@/components/Badge";
import { briefingScenarios, getBriefingScenarioById, getScenarioRegulations, type BriefingScenario } from "@/data/briefingScenarios";
import { regulations } from "@/data/seed";
import { Regulation } from "@/types/regulation";
import { buildBriefingScenarioMarkdown } from "@/lib/briefingBrief";
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
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const activeScenario = getBriefingScenarioById(activeScenarioId);
  const scenarioRegulations = activeScenario ? getScenarioRegulations(regulations, activeScenario) : [];
  const scenarioMarkdown = activeScenario ? buildBriefingScenarioMarkdown(activeScenario, scenarioRegulations) : "";
  const activeStep = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Briefing"
          title="Executive and advisory briefing workspace"
          body="Choose a briefing scenario, then assemble priority records, advisory workstreams, data governance risks and a copyable planning summary for that context."
        />
        <DisclaimerBanner />
        <GlossaryHelpCard
          title="Interpret briefing outputs carefully"
          body="Briefing tabs and copied summaries combine seed records, status labels, evidence prompts and advisory signals. Treat them as planning aids to review with sources and qualified advisors, not client-ready legal conclusions."
          termIds={["seed-intelligence", "assurance", "value-chain"]}
          compact
        />
        <BriefingScenarioSelector
          activeScenarioId={activeScenarioId}
          onSelect={(scenario) => {
            setActiveScenarioId(scenario.id);
            setActiveTab("Priority regulations");
          }}
        />
        {activeScenario ? (
        <section className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" aria-label="Briefing builder">
            <div className="rounded-2xl border border-teal/20 bg-teal/5 p-4 shadow-sm" data-testid="active-briefing-scenario">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal">Selected scenario</p>
              <h2 className="mt-2 text-base font-semibold text-ink">{activeScenario.label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{activeScenario.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {activeScenario.bestFor.slice(0, 4).map((audience) => (
                  <Badge key={audience} className="border-teal/20 bg-white text-teal">
                    {audience}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-teal/15 bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Next briefing checks</p>
                <ul className="mt-2 space-y-1 text-xs leading-5 text-slate-600">
                  {activeScenario.nextSteps.map((step) => (
                    <li key={step}>- {step}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 rounded-xl border border-teal/15 bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Scenario memo</p>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  Copy a source-aware scenario memo with priority records, evidence starters, owner functions, first actions and caveats.
                </p>
                <div className="mt-3 space-y-2">
                  <CopyMarkdownButton text={scenarioMarkdown} label="Copy scenario memo" />
                  <CopyOutputNote />
                </div>
              </div>
            </div>

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

            {activeTab === "Priority regulations" && <ExecutiveBriefing regulations={scenarioRegulations} onSelect={setSelectedRegulation} scenario={activeScenario} />}
            {activeTab === "Sector heatmap" && <SectorHeatmap />}
            {activeTab === "Advisory workstreams" && <AdvisoryInsights regulations={scenarioRegulations} />}
            {activeTab === "Data governance risks" && <DataQualityPanel regulations={scenarioRegulations} onSelect={setSelectedRegulation} />}
            {activeTab === "Client summary" && <ExportSummaryButton jurisdiction={null} regulations={scenarioRegulations} />}
          </div>
        </section>
        ) : (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm" data-testid="briefing-scenario-empty">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal">Start with a scenario</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">Choose a briefing scenario before generating outputs</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              This keeps the briefing from mixing unrelated regimes, evidence packages or leadership questions. Each scenario remains a source-linked planning aid, not legal advice or a definitive applicability view.
            </p>
          </section>
        )}
        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}

function BriefingScenarioSelector({
  activeScenarioId,
  onSelect
}: {
  activeScenarioId: string | null;
  onSelect: (scenario: BriefingScenario) => void;
}) {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Briefing scenario</p>
          <h2 className="mt-2 text-xl font-semibold text-ink">Pick the planning question first</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Scenario selection narrows records, operating moves and evidence prompts so the output reads like an intentional advisory note rather than a raw database rollup.
          </p>
        </div>
        <p className="text-xs font-semibold text-slate-500">{activeScenarioId ? "Scenario active" : "Required before briefing output"}</p>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-5">
        {briefingScenarios.map((scenario) => {
          const active = activeScenarioId === scenario.id;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onSelect(scenario)}
              aria-pressed={active}
              className={cn(
                "rounded-xl border p-4 text-left transition",
                active ? "border-teal/50 bg-teal/10 shadow-sm" : "border-slate-200 bg-slate-50 hover:border-teal/40 hover:bg-white"
              )}
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-teal">{scenario.eyebrow}</span>
              <span className="mt-2 block text-sm font-semibold text-ink">{scenario.label}</span>
              <span className="mt-2 block text-xs leading-5 text-slate-600">{scenario.description}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
