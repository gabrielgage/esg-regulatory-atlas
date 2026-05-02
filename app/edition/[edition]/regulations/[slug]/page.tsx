import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, LockKeyhole } from "lucide-react";
import { Header } from "@/components/Header";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { Badge } from "@/components/Badge";
import { RecordMetaBadges } from "@/components/RecordMetaBadges";
import { StatusBadge } from "@/components/StatusBadge";
import { DATASET_META } from "@/data/_meta";
import { regulations } from "@/data/seed";
import { SourceLink } from "@/types/regulation";
import { profileFor } from "@/lib/applicability";
import { formatDate } from "@/lib/utils";

const sourceTypeLabel: Record<SourceLink["type"], string> = {
  primary: "Primary source",
  regulator: "Regulator guidance",
  standards_body: "Standard setter",
  secondary: "Secondary source"
};

export function generateStaticParams() {
  return regulations.map((regulation) => ({ edition: DATASET_META.editionSlug, slug: regulation.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ edition: string; slug: string }> }) {
  const { edition, slug } = await params;
  const regulation = regulations.find((item) => item.id === slug);
  return {
    title: regulation ? `${regulation.shortName} snapshot ${edition}` : `Edition ${edition} snapshot`
  };
}

export default async function EditionRegulationPage({ params }: { params: Promise<{ edition: string; slug: string }> }) {
  const { edition, slug } = await params;
  if (edition !== DATASET_META.editionSlug) notFound();
  const regulation = regulations.find((item) => item.id === slug);
  if (!regulation) notFound();
  const profile = profileFor(regulation);

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-5xl space-y-5 px-4 py-5 md:px-6">
        <Link href={`/regulations/${regulation.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal">
          <ArrowLeft className="h-4 w-4" />
          Current record view
        </Link>

        <section className="rounded-2xl border border-teal/20 bg-teal/5 p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <LockKeyhole className="mt-0.5 h-5 w-5 text-teal" />
            <div>
              <p className="font-semibold text-ink">Edition snapshot</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                This route displays the current static dataset as the published {DATASET_META.edition} snapshot. Future production editions should be backed by immutable source review records.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={regulation.status} />
            <Badge className="border-slate-200 bg-slate-50 text-slate-600">{regulation.jurisdiction}</Badge>
            <Badge className="border-teal/20 bg-teal/10 text-teal">{DATASET_META.edition}</Badge>
          </div>
          <RecordMetaBadges regulation={regulation} />
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink">{regulation.shortName}</h1>
          <p className="mt-2 text-lg text-slate-600">{regulation.title}</p>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            Snapshot reviewed by {DATASET_META.editor} on {formatDate(regulation.lastReviewed)}
          </p>
        </section>

        <Section title="Snapshot summary">
          <p>{regulation.summary}</p>
          <p className="mt-3 text-slate-600">{regulation.businessImpact}</p>
        </Section>

        <Section title="Applicability and caveats">
          <p>{regulation.applicability}</p>
          <ul className="mt-4 space-y-2">
            {profile.caveats.map((caveat) => (
              <li key={caveat} className="rounded-xl bg-slate-50 px-4 py-3">
                {caveat}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Key dates">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Effective date" value={formatDate(regulation.effectiveDate)} />
            <Metric label="First reporting" value={String(regulation.firstReportingYear || "n/a")} />
            <Metric label="First report due" value={formatDate(regulation.firstReportDueDate)} />
            <Metric label="Next review" value={formatDate(regulation.nextReviewDate)} />
          </div>
        </Section>

        <Section title="Sources">
          <div className="space-y-3">
            {regulation.sourceUrls.map((source) => (
              <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 text-sm hover:bg-teal/5">
                <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <span>
                  <span className="font-semibold text-ink">{sourceTypeLabel[source.type]}: </span>
                  <span className="text-teal underline">{source.label}</span>
                </span>
              </a>
            ))}
          </div>
        </Section>

        <FooterDisclaimer />
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 font-semibold text-ink">{value}</div>
    </div>
  );
}
