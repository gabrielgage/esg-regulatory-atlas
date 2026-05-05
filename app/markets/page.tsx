import Link from "next/link";
import { ArrowUpRight, Globe2, Layers3, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CoverageConfidenceBadge } from "@/components/CoverageConfidenceBadge";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { Header } from "@/components/Header";
import { MarketBriefingCTA } from "@/components/MarketBriefingCTA";
import { PageIntro } from "@/components/PageIntro";
import { DATASET_META } from "@/data/_meta";
import { marketProfiles } from "@/lib/marketProfile";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Market profiles | Etica ESG Regulatory Atlas",
  description: "Browse jurisdiction-level ESG regulatory market profiles with priority records, source coverage and review caveats."
};

export default function MarketsPage() {
  const profiles = marketProfiles();
  const byRegion = Array.from(new Set(profiles.map((profile) => profile.jurisdiction.region))).sort();
  const trackedRecords = profiles.reduce((count, profile) => count + profile.directRecords.length, 0);
  const highImpact = profiles.reduce((count, profile) => count + profile.highImpact.length, 0);
  const reviewFlags = profiles.reduce((count, profile) => count + profile.reviewFlags, 0);

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Markets"
          title="Jurisdiction market profiles"
          body="Browse tracked ESG regulatory markets by region, direct seed coverage, source confidence and first action prompts. Market profiles are designed for orientation before a deeper brief, assessment or advisory scan."
          meta={`${DATASET_META.edition} · seed intelligence, not legal advice`}
        />

        <section className="grid gap-3 md:grid-cols-4">
          <Metric icon={Globe2} label="Tracked markets" value={String(profiles.length)} />
          <Metric icon={Layers3} label="Direct market records" value={String(trackedRecords)} />
          <Metric icon={ShieldCheck} label="High-impact links" value={String(highImpact)} />
          <Metric icon={ShieldCheck} label="Review flags" value={String(reviewFlags)} />
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-ink">Market coverage by region</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Counts show current tracked seed coverage, not complete legal inventory. Markets with lower confidence or source gaps should be reviewed before client reliance.
              </p>
            </div>
            <Link href="/data-quality" className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
              Review data quality
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {byRegion.map((region) => {
          const regionProfiles = profiles.filter((profile) => profile.jurisdiction.region === region);
          return (
            <section key={region} className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-ink">{region}</h2>
                <Badge className="border-slate-200 bg-slate-50 text-slate-600">{regionProfiles.length} markets</Badge>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {regionProfiles.map((profile) => (
                  <MarketCard key={profile.jurisdiction.id} profile={profile} />
                ))}
              </div>
            </section>
          );
        })}

        <MarketBriefingCTA />
        <FooterDisclaimer />
      </div>
    </main>
  );
}

function MarketCard({ profile }: { profile: ReturnType<typeof marketProfiles>[number] }) {
  const jurisdiction = profile.jurisdiction;
  const topTopics = profile.topics.slice(0, 3);

  return (
    <Link href={`/jurisdiction/${jurisdiction.code.toLowerCase()}`} className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge className="border-teal/20 bg-teal/10 text-teal">{jurisdiction.code}</Badge>
            <Badge className="border-slate-200 bg-slate-50 text-slate-600 capitalize">{jurisdiction.type}</Badge>
            <CoverageConfidenceBadge level={profile.coverageConfidence.level} />
          </div>
          <h3 className="mt-4 text-xl font-bold tracking-tight text-ink">{jurisdiction.name}</h3>
        </div>
        <span className={cn("rounded-full border px-2.5 py-1 text-xs font-semibold capitalize", intensityClass(jurisdiction.regulatoryIntensity))}>
          {jurisdiction.regulatoryIntensity}
        </span>
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{jurisdiction.executiveSummary}</p>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <MiniMetric label="Direct" value={String(profile.directRecords.length)} />
        <MiniMetric label="Score" value={`${profile.coverageConfidence.confidenceScore}`} />
        <MiniMetric label="Review" value={String(profile.coverageConfidence.reviewFlagCount)} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {topTopics.map((topic) => (
          <Badge key={topic} className="border-slate-200 bg-slate-50 text-slate-600">
            {topic}
          </Badge>
        ))}
      </div>
      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal">
        Open profile
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

function intensityClass(intensity: string) {
  if (intensity === "high") return "border-teal/20 bg-teal/10 text-teal";
  if (intensity === "medium") return "border-blue-200 bg-blue-50 text-blue-700";
  if (intensity === "emerging") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-slate-200 bg-slate-50 text-slate-600";
}
