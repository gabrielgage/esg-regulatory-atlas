import Link from "next/link";
import { ArrowUpRight, Boxes, ClipboardCheck, Network, ShieldCheck, Truck } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { GlossaryHelpCard } from "@/components/GlossaryHelpCard";
import { Header } from "@/components/Header";
import { MarketBriefingCTA } from "@/components/MarketBriefingCTA";
import { PageIntro } from "@/components/PageIntro";
import { DATASET_META } from "@/data/_meta";
import { fallbackActions, fallbackEvidence, valueChainMarkdown, valueChainProfiles, type ValueChainProfile } from "@/lib/valueChainProfile";

export const metadata = {
  title: "Value-chain exposure | Etica ESG Regulatory Atlas",
  description: "Explore sustainability regulation by supplier, trade, product, portfolio, financed-emissions and operating exposure."
};

export default function ValueChainPage() {
  const profiles = valueChainProfiles();
  const trackedRecords = profiles.reduce((count, profile) => count + profile.records.length, 0);
  const highImpact = profiles.reduce((count, profile) => count + profile.highImpact.length, 0);
  const reviewFlags = profiles.reduce((count, profile) => count + profile.reviewFlags, 0);
  const sourceBacked = profiles.reduce((count, profile) => count + profile.sourceBacked, 0);

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Value chain"
          title="Regulatory exposure by value-chain position"
          body="Start from how the business creates exposure: suppliers, imports, products, claims, portfolio companies, financed emissions, own operations or board oversight. Use this view to frame what evidence, functions and records to inspect first."
          meta={`${DATASET_META.edition} · seed intelligence, not legal advice or complete value-chain coverage`}
        />
        <GlossaryHelpCard
          title="Interpret value-chain exposure carefully"
          body="Value-chain cards show current Atlas tags and source-linked seed records. They are a triage aid for evidence planning, not a determination that a rule applies to a specific company, supplier, fund or product."
          compact
        />

        <section className="grid gap-3 md:grid-cols-4">
          <Metric icon={Network} label="Exposure lanes" value={String(profiles.length)} />
          <Metric icon={Boxes} label="Tagged record links" value={String(trackedRecords)} />
          <Metric icon={ShieldCheck} label="High-impact links" value={String(highImpact)} />
          <Metric icon={ClipboardCheck} label="Source-backed links" value={String(sourceBacked)} />
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-ink">Use this as a business-exposure map</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                This page is built for procurement, exporters, product teams, investors and advisors who need to translate regulation into evidence requests. Start here, then open the regulation database with a pre-filtered value-chain view.
              </p>
            </div>
            <Link href="/assessment" className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
              Run company assessment
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <StarterCard title="Supplier or procurement exposure" href="/regulations?valueChain=Upstream+suppliers" body="Start here for supplier due diligence, forced labour, deforestation, human rights and customer data requests." />
            <StarterCard title="Importer or exporter exposure" href="/regulations?valueChain=Trade+and+imports" body="Start here for CBAM, product market access, commodity origin and customs-linked sustainability evidence." />
            <StarterCard title="Portfolio or finance exposure" href="/regulations?valueChain=Financed+emissions" body="Start here for sustainable finance, financed emissions, stewardship and portfolio-company ESG data." />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {profiles.map((profile) => (
            <ValueChainCard key={profile.label} profile={profile} />
          ))}
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal">Review risk</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-ink">Value-chain source review still matters</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
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

function ValueChainCard({ profile }: { profile: ValueChainProfile }) {
  const evidence = profile.evidenceRequired.length ? profile.evidenceRequired.slice(0, 4) : fallbackEvidence(profile.label);
  const actions = profile.requiredActions.length ? profile.requiredActions.slice(0, 3) : fallbackActions(profile.label);

  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge className="border-teal/20 bg-teal/10 text-teal">Value chain</Badge>
            {profile.reviewFlags ? <Badge className="border-amber-200 bg-amber-50 text-amber-800">{profile.reviewFlags} review prompts</Badge> : null}
          </div>
          <h2 className="mt-3 text-xl font-bold tracking-tight text-ink">{profile.label}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {profile.records.length} tagged seed records across {profile.markets.length} mapped markets. Use this lane to identify source review, evidence and internal owner questions.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <CopyMarkdownButton text={valueChainMarkdown(profile)} label="Copy brief" />
          <Link href={`/regulations?${new URLSearchParams({ valueChain: profile.label }).toString()}`} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50">
            Open records
            <ArrowUpRight className="h-4 w-4 text-teal" />
          </Link>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-center sm:grid-cols-4">
        <MiniMetric label="Records" value={String(profile.records.length)} />
        <MiniMetric label="High" value={String(profile.highImpact.length)} />
        <MiniMetric label="Sources" value={`${profile.primarySourceBacked}/${profile.records.length}`} />
        <MiniMetric label="Markets" value={String(profile.markets.length)} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <InfoList title="Priority records" items={profile.priorityRecords.map((regulation) => `${regulation.shortName} · ${regulation.jurisdiction}`)} empty="No current priority records" />
        <InfoList title="Evidence to prepare" items={evidence} empty="No current evidence signal" />
        <InfoList title="First actions" items={actions} empty="No current action signal" />
        <InfoList title="Markets to inspect" items={profile.markets.slice(0, 4).map((market) => `${market.name} (${market.count})`)} empty="No mapped markets" />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {profile.topics.slice(0, 4).map((topic) => (
          <Badge key={topic} className="border-slate-200 bg-slate-50 text-slate-600">
            {topic}
          </Badge>
        ))}
        {profile.businessImpacts.slice(0, 3).map((impact) => (
          <Badge key={impact} className="border-violet/20 bg-violet/10 text-violet">
            {impact}
          </Badge>
        ))}
      </div>
    </article>
  );
}

function StarterCard({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <Link href={href} className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-teal/40 hover:bg-white">
      <Truck className="h-5 w-5 text-teal" />
      <h3 className="mt-3 text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal">
        Open filtered records <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function Metric({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <Icon className="h-5 w-5 text-teal" />
      <div className="mt-3 text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-bold text-ink">{value}</div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-lg font-bold text-ink">{value}</div>
    </div>
  );
}

function InfoList({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
        {items.length ? items.map((item) => <li key={item}>• {item}</li>) : <li>{empty}</li>}
      </ul>
    </div>
  );
}
