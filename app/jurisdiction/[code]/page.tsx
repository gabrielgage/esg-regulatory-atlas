import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, ExternalLink, FileText, GitCompare, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CoverageConfidenceBadge } from "@/components/CoverageConfidenceBadge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { CopyOutputNote } from "@/components/CopyOutputNote";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { GlossaryHelpCard } from "@/components/GlossaryHelpCard";
import { Header } from "@/components/Header";
import { MarketBriefingCTA } from "@/components/MarketBriefingCTA";
import { MarketObligationMatrix } from "@/components/MarketObligationMatrix";
import { MarketQuickStartPanel } from "@/components/MarketQuickStartPanel";
import { MarketTriggerPanel } from "@/components/MarketTriggerPanel";
import { RecordMetaBadges } from "@/components/RecordMetaBadges";
import { StatusBadge } from "@/components/StatusBadge";
import { DATASET_META } from "@/data/_meta";
import { jurisdictions } from "@/data/seed";
import { buildMarketMarkdown, findJurisdictionByCode, marketProfileFor } from "@/lib/marketProfile";
import { readinessBand, readinessClass, readinessScore } from "@/lib/scoring";
import { cn, formatDate } from "@/lib/utils";
import type { Regulation } from "@/types/regulation";

export function generateStaticParams() {
  return jurisdictions
    .filter((jurisdiction) => jurisdiction.type !== "international")
    .map((jurisdiction) => ({ code: jurisdiction.code.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const jurisdiction = findJurisdictionByCode(code);
  return {
    title: jurisdiction ? `${jurisdiction.name} market profile | Etica ESG` : "Market profile | Etica ESG",
    description: jurisdiction?.executiveSummary
  };
}

export default async function JurisdictionMarketPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const jurisdiction = findJurisdictionByCode(code);
  if (!jurisdiction) notFound();

  const profile = marketProfileFor(jurisdiction);
  const markdown = buildMarketMarkdown(jurisdiction, profile.scoped);
  const compareCode = jurisdiction.code === "GBR" ? "EUU" : "GBR";

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/markets" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal">
            <ArrowLeft className="h-4 w-4" />
            Back to markets
          </Link>
          <div className="flex flex-wrap gap-2">
            <CopyMarkdownButton text={markdown} />
            <Link href={`/jurisdiction/${jurisdiction.code.toLowerCase()}/brief`} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <FileText className="h-4 w-4" />
              Printable brief
            </Link>
          </div>
        </div>
        <CopyOutputNote className="max-w-2xl" />

        <section className="rounded-2xl bg-navy p-6 text-white shadow-xl md:p-8">
          <div className="flex flex-wrap gap-2">
            <Badge className="border-white/20 bg-white/10 text-white">{jurisdiction.code}</Badge>
            <Badge className="border-white/20 bg-white/10 text-white capitalize">{jurisdiction.type}</Badge>
            <Badge className="border-white/20 bg-white/10 text-white">{jurisdiction.region}</Badge>
            <Badge className="border-mint/30 bg-mint/10 text-mint">{DATASET_META.edition}</Badge>
            <CoverageConfidenceBadge level={profile.coverageConfidence.level} />
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_.4fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">Market profile</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">{jurisdiction.name}</h1>
              <p className="mt-4 max-w-4xl text-base leading-7 text-slate-300 md:text-lg">{jurisdiction.executiveSummary}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-mint">Use carefully</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                This market page is seed regulatory intelligence for orientation. It does not determine legal applicability or complete local coverage.
              </p>
            </div>
          </div>
        </section>

        <GlossaryHelpCard
          title="Interpret market profile details carefully"
          body="This profile combines direct and inherited seed records, priority sorting, readiness scores and source-confidence signals. Treat them as market-triage prompts, not complete local legal coverage or entity-specific applicability."
          termIds={["seed-intelligence", "legal-force", "reporting-year"]}
          compact
        />

        <section className="grid gap-3 md:grid-cols-4">
          <Metric label="Direct records" value={String(profile.directRecords.length)} />
          <Metric label="Linked records" value={String(profile.scoped.length)} />
          <Metric label="High impact" value={String(profile.highImpact.length)} />
          <Metric label="Review prompts" value={String(profile.reviewFlags)} />
        </section>

        <MarketTriggerPanel jurisdiction={jurisdiction} records={profile.scoped} />
        <MarketObligationMatrix jurisdiction={jurisdiction} records={profile.scoped} />

        <section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-ink">Priority records</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Sorted by high-impact status and readiness priority. Review primary sources before using any record in a compliance workplan.
                </p>
              </div>
              <Link href={`/regulations?jurisdiction=${jurisdiction.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
                Open filtered database
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {profile.priorityRecords.map((regulation) => (
                <PriorityRecord key={regulation.id} regulation={regulation} />
              ))}
              {!profile.priorityRecords.length ? (
                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No tracked seed records are assigned to this market yet.</p>
              ) : null}
            </div>
          </section>

          <aside className="space-y-5">
            <MarketQuickStartPanel jurisdiction={jurisdiction} profileActions={profile.requiredActions} />

            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-ink">Source confidence</h2>
              <div className="mt-4 grid gap-3">
                <MiniMetric label="Coverage confidence" value={`${profile.coverageConfidence.confidenceScore}/100`} />
                <MiniMetric label="Source-backed records" value={`${profile.sourceBacked}/${profile.scoped.length || 0}`} />
                <MiniMetric label="Priority-source records" value={`${profile.primarySourceBacked}/${profile.scoped.length || 0}`} />
                <MiniMetric label="Inherited/EU records" value={String(profile.inheritedRecords.length)} />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {profile.coverageConfidence.nextAction} Counts are transparency signals only. A source-backed record still needs entity-specific applicability review before reliance.
              </p>
            </section>
          </aside>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <ListCard title="Regulatory drivers" values={profile.topics} />
          <ListCard title="Affected sectors" values={profile.sectors} />
          <ListCard title="Value chain exposure" values={profile.valueChain} />
          <ListCard title="Business impacts" values={profile.businessImpacts} />
          <ListCard title="Functions involved" values={profile.affectedFunctions} />
          <ListCard title="Evidence to prepare" values={profile.evidenceRequired} />
        </section>

        <section className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Key timing signals</h2>
            <div className="mt-4 space-y-3">
              {profile.priorityRecords
                .filter((regulation) => regulation.firstReportingYear || regulation.firstReportDueDate || regulation.effectiveDate || regulation.consultationDeadline)
                .slice(0, 6)
                .map((regulation) => (
                  <Link key={regulation.id} href={`/regulations/${regulation.id}`} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 hover:bg-teal/5">
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <span>
                      <span className="font-semibold text-ink">{regulation.shortName}</span>
                      <span className="mt-1 block text-sm text-slate-600">
                        {regulation.firstReportDueDate
                          ? `First report due ${formatDate(regulation.firstReportDueDate)}`
                          : regulation.consultationDeadline
                            ? `Consultation deadline ${formatDate(regulation.consultationDeadline)}`
                            : regulation.firstReportingYear
                              ? `First reporting ${regulation.firstReportingYear}`
                              : `Effective ${formatDate(regulation.effectiveDate)}`}
                      </span>
                    </span>
                  </Link>
                ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Watch and review items</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Items below may involve consultation status, transition timing, lower confidence or data-quality review needs.
            </p>
            <div className="mt-4 space-y-3">
              {profile.watchItems.length ? (
                profile.watchItems.map((regulation) => (
                  <Link key={regulation.id} href={`/regulations/${regulation.id}`} className="flex items-start justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 hover:bg-amber-100">
                    <span>
                      <span className="font-semibold text-ink">{regulation.shortName}</span>
                      <span className="mt-1 block text-sm leading-5 text-amber-900">{regulation.dataQualityStatus.replaceAll("_", " ")} · {regulation.confidenceLevel.replaceAll("_", " ")}</span>
                    </span>
                    <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                  </Link>
                ))
              ) : (
                <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No watch items are currently flagged for this market.</p>
              )}
            </div>
          </section>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <ActionLink href={`/jurisdiction/${jurisdiction.code.toLowerCase()}/brief`} icon={FileText} title="Printable market brief" body="Use the source-caveated brief for client or internal planning notes." />
          <ActionLink href={`/compare?a=${jurisdiction.code}&b=${compareCode}`} icon={GitCompare} title="Compare markets" body={`Compare ${jurisdiction.name} with ${compareCode === "EUU" ? "the EU" : "the UK"} on core regulatory fields.`} />
          <ActionLink href="/assessment" icon={CheckCircle2} title="Run assessment" body="Generate an indicative shortlist using company profile, sector and value-chain facts." />
        </section>

        <MarketBriefingCTA jurisdictionName={jurisdiction.name} />
        <FooterDisclaimer />
      </div>
    </main>
  );
}

function PriorityRecord({ regulation }: { regulation: Regulation }) {
  const band = readinessBand(regulation);
  return (
    <Link href={`/regulations/${regulation.id}`} className="block rounded-xl border border-slate-200 p-4 transition hover:border-teal/40 hover:bg-teal/5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-ink">{regulation.shortName}</h3>
            <StatusBadge status={regulation.status} />
            <Badge className={cn("capitalize", readinessClass(band))}>{readinessScore(regulation)} readiness</Badge>
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
