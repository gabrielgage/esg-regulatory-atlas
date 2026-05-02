import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { Badge } from "@/components/Badge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { MarketBriefingCTA } from "@/components/MarketBriefingCTA";
import { PrintButton } from "@/components/PrintButton";
import { RecordMetaBadges } from "@/components/RecordMetaBadges";
import { StatusBadge } from "@/components/StatusBadge";
import { DATASET_META } from "@/data/_meta";
import { jurisdictions, regulations } from "@/data/seed";
import { recordsForJurisdiction } from "@/lib/layers";
import { formatDate, uniq } from "@/lib/utils";

export function generateStaticParams() {
  return jurisdictions
    .filter((jurisdiction) => jurisdiction.type !== "international")
    .map((jurisdiction) => ({ code: jurisdiction.code.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const jurisdiction = findJurisdiction(code);
  return {
    title: jurisdiction ? `${jurisdiction.name} brief | Etica ESG` : "Jurisdiction brief | Etica ESG"
  };
}

export default async function JurisdictionBriefPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const jurisdiction = findJurisdiction(code);
  if (!jurisdiction) notFound();

  const scoped = recordsForJurisdiction(jurisdiction, regulations);
  const highImpact = scoped.filter((regulation) => regulation.highImpact);
  const topics = uniq(scoped.flatMap((regulation) => regulation.topics)).slice(0, 10);
  const sectors = uniq(scoped.flatMap((regulation) => regulation.sectors)).slice(0, 10);
  const impacts = uniq(scoped.flatMap((regulation) => regulation.businessImpacts)).slice(0, 10);
  const advisory = uniq(scoped.flatMap((regulation) => regulation.advisoryOpportunities)).slice(0, 10);
  const functions = uniq(scoped.flatMap((regulation) => regulation.affectedFunctions)).slice(0, 10);
  const evidence = uniq(scoped.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 10);
  const actions = uniq(scoped.flatMap((regulation) => regulation.requiredActions || [])).slice(0, 8);
  const years = uniq(scoped.map((regulation) => String(regulation.firstReportingYear || "")).filter(Boolean)).sort();
  const sourceBacked = scoped.filter((regulation) => regulation.sourceUrls.length > 0).length;
  const reviewFlags = scoped.filter((regulation) => regulation.dataQualityStatus !== "verified_seed" || regulation.confidenceLevel !== "high").length;
  const watchItems = scoped.filter((regulation) => regulation.status === "consultation" || regulation.status === "transition" || regulation.dataQualityStatus !== "verified_seed").slice(0, 5);
  const markdown = buildBriefMarkdown(jurisdiction.name, scoped);

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-5xl space-y-5 px-4 py-5 md:px-6">
        <div className="flex items-center justify-between gap-3 print:hidden">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal">
            <ArrowLeft className="h-4 w-4" />
            Back to map
          </Link>
          <div className="flex flex-wrap gap-2">
            <PrintButton />
            <CopyMarkdownButton text={markdown} />
          </div>
        </div>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <Badge className="border-teal/20 bg-teal/10 text-teal">{jurisdiction.code}</Badge>
            <Badge className="border-slate-200 bg-slate-50 text-slate-600 capitalize">{jurisdiction.type}</Badge>
            <Badge className="border-slate-200 bg-slate-50 text-slate-600">{DATASET_META.edition}</Badge>
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink">{jurisdiction.name} regulatory brief</h1>
          <p className="mt-3 text-lg leading-8 text-slate-600">{jurisdiction.executiveSummary}</p>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            Prepared by {DATASET_META.publisher}. Edited by {DATASET_META.editor}. Contact {DATASET_META.contactEmail}.
          </p>
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
            Indicative jurisdiction brief based on static seed intelligence. It is not legal advice and does not determine entity-specific applicability.
          </p>
        </section>

        <section className="grid gap-3 md:grid-cols-4">
          <Metric label="Tracked records" value={String(scoped.length)} />
          <Metric label="High impact" value={String(highImpact.length)} />
          <Metric label="First years" value={years.slice(0, 3).join(", ") || "n/a"} />
          <Metric label="Source backed" value={`${sourceBacked}/${scoped.length || 0}`} />
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Priority regulations</h2>
          <div className="mt-4 space-y-3">
            {(highImpact.length ? highImpact : scoped).slice(0, 8).map((regulation) => (
              <Link
                key={regulation.id}
                href={`/regulations/${regulation.id}`}
                className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-4 hover:bg-teal/5"
              >
                <div>
                  <span className="font-semibold text-ink">{regulation.shortName}</span>
                  <span className="mt-1 line-clamp-2 block text-sm leading-5 text-slate-500">{regulation.summary}</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <StatusBadge status={regulation.status} />
                    <RecordMetaBadges regulation={regulation} compact />
                  </div>
                </div>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-teal" />
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <ListCard title="Primary topics" values={topics} />
          <ListCard title="Affected sectors" values={sectors} />
          <ListCard title="Business impacts" values={impacts} />
          <ListCard title="Advisory opportunities" values={advisory} />
          <ListCard title="Functions involved" values={functions} />
          <ListCard title="Evidence to prepare" values={evidence} />
        </section>

        <section className="grid gap-5 md:grid-cols-[1fr_.85fr]">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">30-day readiness starter</h2>
            <div className="mt-4 space-y-3">
              {(actions.length ? actions : ["Confirm applicability thresholds and entity scope.", "Assign accountable owners for data, controls and source review.", "Create a short source validation log for high-impact records."]).slice(0, 6).map((action) => (
                <div key={action} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                  {action}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Watch items</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {reviewFlags} records in this jurisdiction need confidence, source or date review before compliance reliance.
            </p>
            <div className="mt-4 space-y-2">
              {watchItems.length ? (
                watchItems.map((regulation) => (
                  <Link key={regulation.id} href={`/regulations/${regulation.id}`} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 text-sm hover:bg-teal/5">
                    <span className="font-semibold text-ink">{regulation.shortName}</span>
                    <Badge className="border-amber-200 bg-amber-50 text-amber-800">{regulation.dataQualityStatus.replaceAll("_", " ")}</Badge>
                  </Link>
                ))
              ) : (
                <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-500">No watch items in this brief.</p>
              )}
            </div>
          </section>
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Source and review note</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Source coverage and confidence vary by record. {sourceBacked}/{scoped.length || 0} records have at least one captured source link. Review the linked primary sources on each regulation page before using this brief for compliance planning.
          </p>
        </section>

        <MarketBriefingCTA jurisdictionName={jurisdiction.name} />

        <FooterDisclaimer />
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-xl font-bold text-ink">{value}</div>
    </div>
  );
}

function ListCard({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-ink">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.map((value) => (
          <Badge key={value} className="border-slate-200 bg-slate-50 text-slate-600">
            {value}
          </Badge>
        ))}
      </div>
    </section>
  );
}

function findJurisdiction(code: string) {
  const normalized = code.toLowerCase();
  return jurisdictions.find((jurisdiction) => jurisdiction.code.toLowerCase() === normalized || jurisdiction.id.toLowerCase() === normalized);
}

function buildBriefMarkdown(jurisdictionName: string, scoped: typeof regulations) {
  const highImpact = scoped.filter((regulation) => regulation.highImpact).slice(0, 8);
  const relevant = highImpact.length ? highImpact : scoped.slice(0, 8);
  const years = uniq(relevant.map((regulation) => String(regulation.firstReportingYear || "")).filter(Boolean));
  const impacts = uniq(relevant.flatMap((regulation) => regulation.businessImpacts)).slice(0, 8);
  const actions = uniq(relevant.flatMap((regulation) => regulation.requiredActions || [])).slice(0, 6);
  const evidence = uniq(relevant.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 6);
  const functions = uniq(relevant.flatMap((regulation) => regulation.affectedFunctions)).slice(0, 6);
  const sourceBacked = relevant.filter((regulation) => regulation.sourceUrls.length > 0).length;

  return [
    `# ${jurisdictionName} regulatory brief`,
    "",
    `Publisher: ${DATASET_META.publisher}`,
    `Editor: ${DATASET_META.editor}`,
    `Contact: ${DATASET_META.contactEmail}`,
    `Edition: ${DATASET_META.edition}`,
    `Dataset last reviewed: ${DATASET_META.lastReviewed}`,
    "",
    "## Priority records",
    ...relevant.map((regulation) => `- ${regulation.shortName}: ${regulation.summary}`),
    "",
    `Indicative reporting years: ${years.join(", ") || "n/a"}`,
    `Main business impacts: ${impacts.join(", ") || "n/a"}`,
    `Functions involved: ${functions.join(", ") || "n/a"}`,
    `Source-backed priority records: ${sourceBacked}/${relevant.length || 0}`,
    "",
    "## First 30-day actions",
    ...(actions.length ? actions.map((action) => `- ${action}`) : ["- Confirm applicability thresholds and entity scope.", "- Assign accountable source review and data owners."]),
    "",
    "## Evidence to prepare",
    ...(evidence.length ? evidence.map((item) => `- ${item}`) : ["- Applicability assessment", "- Source review log", "- Management sign-off record"]),
    "",
    "## Optional advisory next step",
    `Request a source-linked jurisdiction exposure scan, market pack or board/client briefing from ${DATASET_META.publisher}: ${DATASET_META.contactEmail}`,
    `Suggested request subject: Etica ESG advisory review - ${jurisdictionName} brief`,
    "",
    "## Caveat",
    "This brief is indicative seed regulatory intelligence. It is not legal, tax, investment or assurance advice. Applicability depends on entity-specific facts, thresholds, jurisdictional implementation, sector rules and legal interpretation."
  ].join("\n");
}
