import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, ClipboardCheck, FileText, ShieldCheck, Truck } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { GlossaryHelpCard } from "@/components/GlossaryHelpCard";
import { Header } from "@/components/Header";
import { MarketBriefingCTA } from "@/components/MarketBriefingCTA";
import { PageIntro } from "@/components/PageIntro";
import { DATASET_META } from "@/data/_meta";
import { valueChainLaneMarkdown, valueChainLaneProfiles, type ValueChainLaneProfile } from "@/lib/valueChainProfile";

export const metadata = {
  title: "Value-chain exposure | Etica ESG Regulatory Atlas",
  description: "Explore sustainability regulation by supplier, trade, product, portfolio, financed-emissions and operating exposure."
};

export default function ValueChainPage() {
  const lanes = valueChainLaneProfiles();
  const uniqueRecordIds = new Set(lanes.flatMap((lane) => lane.records.map((record) => record.id)));
  const highImpact = lanes.reduce((count, lane) => count + lane.highImpact.length, 0);
  const reviewFlags = lanes.reduce((count, lane) => count + lane.reviewFlags, 0);
  const sourceBacked = lanes.reduce((count, lane) => count + lane.sourceBacked, 0);

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Value chain"
          title="Start from business exposure, not legal jargon"
          body="Choose the value-chain lane that looks closest to the business question: suppliers, imports, products, portfolio data, operations or customer pressure. Each lane gives a short evidence plan before sending you into source-linked records."
          meta={`${DATASET_META.edition} · seed intelligence, not legal advice or complete value-chain coverage`}
        />
        <GlossaryHelpCard
          title="Interpret value-chain exposure carefully"
          body="Value-chain cards show current Atlas tags and source-linked seed records. They are a triage aid for evidence planning, not a determination that a rule applies to a specific company, supplier, fund or product."
          termIds={["value-chain", "due-diligence", "financed-emissions"]}
          compact
        />

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className="border-teal/20 bg-teal/10 text-teal">Six-lane triage</Badge>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink">Pick the lane that matches the client question</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Counts show current tracked seed records. They are useful for orientation, but they are not complete legal coverage or entity-specific
                applicability conclusions.
              </p>
            </div>
            <Link href="/assessment" className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
              Run company assessment
            </Link>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <Metric icon={Truck} label="Primary lanes" value={String(lanes.length)} />
            <Metric icon={FileText} label="Unique records" value={String(uniqueRecordIds.size)} />
            <Metric icon={ShieldCheck} label="High-impact links" value={String(highImpact)} />
            <Metric icon={ClipboardCheck} label="Source-backed links" value={String(sourceBacked)} />
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {lanes.map((lane) => (
              <ValueChainLaneCard key={lane.id} lane={lane} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal">Review risk</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-ink">Value-chain source review still matters</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                {reviewFlags} tagged record links currently carry a confidence, date or source-review flag. Use Data Quality before reusing this view in premium examples or client-facing advisory outputs.
              </p>
            </div>
            <Link href="/data-quality" className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
              Review data quality
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <MarketBriefingCTA />
        <FooterDisclaimer />
      </div>
    </main>
  );
}

function ValueChainLaneCard({ lane }: { lane: ValueChainLaneProfile }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-teal/40 hover:bg-white hover:shadow-md dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-900">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">{lane.shortLabel}</p>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-ink">{lane.label}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{lane.description}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <CopyMarkdownButton text={valueChainLaneMarkdown(lane)} label="Copy lane" />
          <Link
            href={`/regulations?${new URLSearchParams({ valueChain: lane.relatedTags[0] }).toString()}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Open records
            <ArrowUpRight className="h-4 w-4 text-teal" />
          </Link>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Start question</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-ink">{lane.startQuestion}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{lane.audience}</p>
      </div>

      <div className="mt-4 grid gap-2 text-center sm:grid-cols-4">
        <MiniMetric label="Records" value={String(lane.records.length)} />
        <MiniMetric label="High" value={String(lane.highImpact.length)} />
        <MiniMetric label="Sources" value={`${lane.primarySourceBacked}/${lane.records.length}`} />
        <MiniMetric label="Markets" value={String(lane.markets.length)} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <InfoList title="Priority records" items={lane.priorityRecords.map((regulation) => `${regulation.shortName} · ${regulation.jurisdiction}`)} empty="No current priority records" />
        <InfoList title="Evidence to prepare" items={lane.evidencePrompts} empty="No current evidence signal" />
        <InfoList title="First actions" items={lane.firstActions} empty="No current action signal" />
        <InfoList title="Suggested owners" items={lane.suggestedOwners} empty="No owner signal" />
      </div>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-4 dark:border-slate-700">
        {lane.topics.slice(0, 2).map((topic) => (
          <Badge key={topic} className="border-slate-200 bg-slate-50 text-slate-600">
            {topic}
          </Badge>
        ))}
        <Badge className={lane.reviewFlags ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-400/40 dark:bg-amber-950/30 dark:text-amber-100" : "border-teal/20 bg-teal/10 text-teal"}>
          {lane.reviewFlags ? `${lane.reviewFlags} review cues` : "Source-linked seed"}
        </Badge>
        <Badge className="border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {lane.relatedTags.length > 1 ? `${lane.relatedTags.length} exposure tags` : lane.relatedTags[0]}
        </Badge>
      </div>
    </article>
  );
}

function Metric({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
      <Icon className="h-5 w-5 text-teal" />
      <div className="mt-3 text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-bold text-ink">{value}</div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-lg font-bold text-ink">{value}</div>
    </div>
  );
}

function InfoList({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {items.length ? items.map((item) => <li key={item}>• {item}</li>) : <li>{empty}</li>}
      </ul>
    </div>
  );
}
