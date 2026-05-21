import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Factory, Layers3, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/Badge";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { GlossaryHelpCard } from "@/components/GlossaryHelpCard";
import { Header } from "@/components/Header";
import { MarketBriefingCTA } from "@/components/MarketBriefingCTA";
import { PageIntro } from "@/components/PageIntro";
import { DATASET_META } from "@/data/_meta";
import { sectorProfiles } from "@/lib/sectorProfile";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Sector starting points | Etica ESG Regulatory Atlas",
  description: "Browse ESG regulatory intelligence by sector, business impact, value-chain exposure and source-review risk."
};

export default function SectorsPage() {
  const profiles = sectorProfiles();
  const directRecords = profiles.reduce((count, profile) => count + profile.directRecords.length, 0);
  const highImpact = profiles.reduce((count, profile) => count + profile.highImpact.length, 0);
  const reviewFlags = profiles.reduce((count, profile) => count + profile.reviewFlags, 0);

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Sectors"
          title="Sector starting points for regulatory triage"
          body="Start from a business sector, then move into relevant records, markets, evidence needs, internal owners and advisory workstreams. Sector pages combine sector-tagged records with broad all-sector rules that may still matter."
          meta={`${DATASET_META.edition} · current tracked seed coverage, not complete sector legal inventory`}
        />
        <GlossaryHelpCard
          title="Interpret sector coverage carefully"
          body="Sector counts and source-review prompts show current tagged seed records, not a complete sector legal inventory. Treat sector pages as first-pass triage before confirming thresholds, entity facts and primary sources."
          compact
        />

        <section className="grid gap-3 md:grid-cols-4">
          <Metric icon={Factory} label="Tracked sectors" value={String(profiles.length)} />
          <Metric icon={Layers3} label="Sector-tagged links" value={String(directRecords)} />
          <Metric icon={ShieldCheck} label="High-impact links" value={String(highImpact)} />
          <Metric icon={BriefcaseBusiness} label="Review prompts" value={String(reviewFlags)} />
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-ink">Use sector pages as a first-pass orientation layer</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Counts show current Atlas seed records, not a definitive sector inventory. Use them to identify what to review first, then confirm applicability through entity facts, thresholds and primary sources.
              </p>
            </div>
            <Link href="/assessment" className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
              Run company assessment
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {profiles.map((profile) => (
            <SectorCard key={profile.sector} profile={profile} />
          ))}
        </section>

        <MarketBriefingCTA />
        <FooterDisclaimer />
      </div>
    </main>
  );
}

function SectorCard({ profile }: { profile: ReturnType<typeof sectorProfiles>[number] }) {
  const topTopics = profile.topics.slice(0, 3);
  const topMarkets = profile.markets.slice(0, 3);

  return (
    <Link href={`/sectors/${profile.slug}`} className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge className="border-teal/20 bg-teal/10 text-teal">Sector</Badge>
          <h3 className="mt-4 text-xl font-bold tracking-tight text-ink">{profile.sector}</h3>
        </div>
        <span className={cn("rounded-full border px-2.5 py-1 text-xs font-semibold", profile.reviewFlags ? "border-amber-200 bg-amber-50 text-amber-800" : "border-teal/20 bg-teal/10 text-teal")}>
          {profile.reviewFlags ? `${profile.reviewFlags} review` : "source-linked"}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {profile.directRecords.length} direct sector records and {profile.broadRecords.length} broad all-sector records in the current seed dataset.
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <MiniMetric label="Direct" value={String(profile.directRecords.length)} />
        <MiniMetric label="High" value={String(profile.highImpact.length)} />
        <MiniMetric label="Markets" value={String(profile.markets.length)} />
      </div>
      <div className="mt-4 space-y-3">
        <ChipRow title="Topics" values={topTopics} />
        <ChipRow title="Markets" values={topMarkets.map((market) => market.name)} />
      </div>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal">
        Open sector profile
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </div>
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

function ChipRow({ title, values }: { title: string; values: string[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.length ? (
          values.map((value) => (
            <Badge key={value} className="border-slate-200 bg-slate-50 text-slate-600">
              {value}
            </Badge>
          ))
        ) : (
          <span className="text-sm text-slate-500">No current signal</span>
        )}
      </div>
    </div>
  );
}
