import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { Badge } from "@/components/Badge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { PrintButton } from "@/components/PrintButton";
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
  const years = uniq(scoped.map((regulation) => String(regulation.firstReportingYear || "")).filter(Boolean)).sort();
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
          <Metric label="Last reviewed" value={formatDate(DATASET_META.lastReviewed)} />
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
                <span>
                  <span className="font-semibold text-ink">{regulation.shortName}</span>
                  <span className="mt-1 line-clamp-2 block text-sm leading-5 text-slate-500">{regulation.summary}</span>
                </span>
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
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Source and review note</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Source coverage and confidence vary by record. Review the linked primary sources on each regulation page before using this brief for compliance planning.
          </p>
        </section>

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
    "",
    "## Caveat",
    "This brief is indicative seed regulatory intelligence. It is not legal, tax, investment or assurance advice. Applicability depends on entity-specific facts, thresholds, jurisdictional implementation, sector rules and legal interpretation."
  ].join("\n");
}
