import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, ExternalLink, FileText, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { GlossaryHelpCard } from "@/components/GlossaryHelpCard";
import { Header } from "@/components/Header";
import { MarketBriefingCTA } from "@/components/MarketBriefingCTA";
import { RecordMetaBadges } from "@/components/RecordMetaBadges";
import { StatusBadge } from "@/components/StatusBadge";
import { DATASET_META } from "@/data/_meta";
import { buildSectorMarkdown, fallbackSectorActions, sectorNameFromSlug, sectorProfileFor, sectorProfiles } from "@/lib/sectorProfile";
import { readinessBand, readinessClass, readinessScore } from "@/lib/scoring";
import { cn, formatDate } from "@/lib/utils";
import type { Regulation } from "@/types/regulation";

export function generateStaticParams() {
  return sectorProfiles().map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = sectorNameFromSlug(slug);
  return {
    title: sector ? `${sector} sector starting point | Etica ESG` : "Sector starting point | Etica ESG",
    description: sector ? `Current tracked ESG regulatory intelligence for ${sector}.` : "Sector regulatory intelligence starting point."
  };
}

export default async function SectorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sector = sectorNameFromSlug(slug);
  if (!sector) notFound();

  const profile = sectorProfileFor(sector);
  const markdown = buildSectorMarkdown(sector, profile.scoped);
  const filteredHref = `/regulations?sector=${encodeURIComponent(sector)}`;

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/sectors" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal">
            <ArrowLeft className="h-4 w-4" />
            Back to sectors
          </Link>
          <div className="flex flex-wrap gap-2">
            <CopyMarkdownButton text={markdown} />
            <Link href={filteredHref} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <FileText className="h-4 w-4" />
              Filter database
            </Link>
          </div>
        </div>

        <section className="rounded-2xl bg-navy p-6 text-white shadow-xl md:p-8">
          <div className="flex flex-wrap gap-2">
            <Badge className="border-white/20 bg-white/10 text-white">Sector</Badge>
            <Badge className="border-white/20 bg-white/10 text-white">{profile.markets.length} tracked markets</Badge>
            <Badge className="border-mint/30 bg-mint/10 text-mint">{DATASET_META.edition}</Badge>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_.4fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">Sector starting point</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">{sector}</h1>
              <p className="mt-4 max-w-4xl text-base leading-7 text-slate-300 md:text-lg">
                Use this page to identify potentially relevant regulations, source-review needs, timing signals and first actions for a {sector.toLowerCase()} regulatory triage conversation.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-mint">Sector caveat</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                This page blends direct sector records with broad all-sector records. It is not a complete legal inventory and does not determine applicability.
              </p>
            </div>
          </div>
        </section>

        <GlossaryHelpCard
          title="Interpret sector profile details carefully"
          body="This profile combines direct sector matches, broad all-sector records, timing signals, source-confidence cues and advisory prompts. Treat them as sector-triage aids before confirming thresholds, entity facts and primary sources."
          compact
        />

        <section className="grid gap-3 md:grid-cols-4">
          <Metric label="Direct records" value={String(profile.directRecords.length)} />
          <Metric label="Broad context" value={String(profile.broadRecords.length)} />
          <Metric label="High impact" value={String(profile.highImpact.length)} />
          <Metric label="Review flags" value={String(profile.reviewFlags)} />
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-ink">Priority records</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Direct sector matches are shown before broad all-sector rules. Review primary sources and entity-specific thresholds before client reliance.
                </p>
              </div>
              <Link href={filteredHref} className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
                Open filtered database
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {profile.priorityRecords.map((regulation) => (
                <PriorityRecord key={regulation.id} regulation={regulation} sector={sector} />
              ))}
              {!profile.priorityRecords.length ? (
                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No tracked seed records are assigned to this sector yet.</p>
              ) : null}
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-ink">First actions</h2>
              <div className="mt-4 space-y-3">
                {(profile.requiredActions.length ? profile.requiredActions : fallbackSectorActions()).slice(0, 5).map((action) => (
                  <div key={action} className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-ink">Source confidence</h2>
              <div className="mt-4 grid gap-3">
                <MiniMetric label="Source-backed records" value={`${profile.sourceBacked}/${profile.scoped.length || 0}`} />
                <MiniMetric label="Priority-source records" value={`${profile.primarySourceBacked}/${profile.scoped.length || 0}`} />
                <MiniMetric label="Direct sector matches" value={String(profile.directRecords.length)} />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Source-backed does not mean legally complete. Use this as a confidence signal for what to verify first.
              </p>
            </section>
          </aside>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <ListCard title="Regulatory topics" values={profile.topics} />
          <ListCard title="Value-chain exposure" values={profile.valueChain} />
          <ListCard title="Business impacts" values={profile.businessImpacts} />
          <ListCard title="Functions involved" values={profile.affectedFunctions} />
          <ListCard title="Evidence to prepare" values={profile.evidenceRequired} />
          <ListCard title="Advisory opportunities" values={profile.advisoryOpportunities} />
        </section>

        <section className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Market signals</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Markets show where the current sector-tagged seed records are concentrated.</p>
            <div className="mt-4 space-y-3">
              {profile.markets.map((market) => (
                <Link key={market.id} href={`/jurisdiction/${market.code.toLowerCase()}`} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 hover:bg-teal/5">
                  <span>
                    <span className="font-semibold text-ink">{market.name}</span>
                    <span className="mt-1 block text-sm text-slate-500">{market.region}</span>
                  </span>
                  <Badge className="border-teal/20 bg-teal/10 text-teal">{market.count} records</Badge>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Timing and review watchlist</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Prioritise date-sensitive, lower-confidence or consultation-stage items for source review before using them in a client workplan.
            </p>
            <div className="mt-4 space-y-3">
              {(profile.watchItems.length ? profile.watchItems : profile.priorityRecords.slice(0, 4)).map((regulation) => (
                <Link key={regulation.id} href={`/regulations/${regulation.id}`} className="flex items-start justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 hover:bg-amber-100">
                  <span>
                    <span className="font-semibold text-ink">{regulation.shortName}</span>
                    <span className="mt-1 block text-sm leading-5 text-amber-900">
                      {timingLabel(regulation)} · {regulation.dataQualityStatus.replaceAll("_", " ")}
                    </span>
                  </span>
                  {profile.watchItems.includes(regulation) ? (
                    <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                  ) : (
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                  )}
                </Link>
              ))}
            </div>
          </section>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <ActionLink href={filteredHref} icon={FileText} title="Open sector-filtered records" body="Review source-linked records that currently match this sector in the regulation database." />
          <ActionLink href="/assessment" icon={CheckCircle2} title="Run assessment" body="Generate an indicative shortlist using jurisdiction, company type, sector and value-chain facts." />
          <ActionLink href="/advisory" icon={ArrowUpRight} title="Request sector pack" body="Use a manual advisory request for a source-reviewed sector pack or exposure scan." />
        </section>

        <MarketBriefingCTA compact />
        <FooterDisclaimer />
      </div>
    </main>
  );
}

function PriorityRecord({ regulation, sector }: { regulation: Regulation; sector: string }) {
  const band = readinessBand(regulation);
  const direct = regulation.sectors.includes(sector);
  return (
    <Link href={`/regulations/${regulation.id}`} className="block rounded-xl border border-slate-200 p-4 transition hover:border-teal/40 hover:bg-teal/5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-ink">{regulation.shortName}</h3>
            <StatusBadge status={regulation.status} />
            <Badge className={cn("capitalize", readinessClass(band))}>{readinessScore(regulation)} readiness</Badge>
            <Badge className={direct ? "border-teal/20 bg-teal/10 text-teal" : "border-slate-200 bg-slate-50 text-slate-600"}>
              {direct ? "direct sector match" : "broad all-sector rule"}
            </Badge>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{regulation.summary}</p>
          <div className="mt-3">
            <RecordMetaBadges regulation={regulation} compact />
          </div>
        </div>
        <ExternalLink className="h-4 w-4 shrink-0 text-teal" />
      </div>
    </Link>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-bold text-ink">{value}</div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-lg font-bold text-ink">{value}</div>
    </div>
  );
}

function ListCard({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-ink">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.length ? (
          values.map((value) => (
            <Badge key={value} className="border-slate-200 bg-slate-50 text-slate-600">
              {value}
            </Badge>
          ))
        ) : (
          <p className="text-sm text-slate-500">No structured values captured yet.</p>
        )}
      </div>
    </section>
  );
}

function ActionLink({
  href,
  icon: Icon,
  title,
  body
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <Link href={href} className="rounded-2xl border bg-white p-5 shadow-sm transition hover:border-teal/40 hover:bg-teal/5">
      <Icon className="h-5 w-5 text-teal" />
      <h2 className="mt-3 text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </Link>
  );
}

function timingLabel(regulation: Regulation) {
  if (regulation.firstReportDueDate) return `First report due ${formatDate(regulation.firstReportDueDate)}`;
  if (regulation.consultationDeadline) return `Consultation deadline ${formatDate(regulation.consultationDeadline)}`;
  if (regulation.firstReportingYear) return `First reporting ${regulation.firstReportingYear}`;
  if (regulation.effectiveDate) return `Effective ${formatDate(regulation.effectiveDate)}`;
  return "Timing needs review";
}
