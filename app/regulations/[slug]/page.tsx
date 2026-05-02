import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { Badge } from "@/components/Badge";
import { RecordMetaBadges } from "@/components/RecordMetaBadges";
import { StatusBadge } from "@/components/StatusBadge";
import { CitationWidget } from "@/components/CitationWidget";
import { regulations } from "@/data/seed";
import { SourceLink } from "@/types/regulation";
import { profileFor } from "@/lib/applicability";
import { readinessBand, readinessClass, readinessReasons, readinessScore } from "@/lib/scoring";
import { formatDate } from "@/lib/utils";

const sourceTypeLabel: Record<SourceLink["type"], string> = {
  primary: "Primary source",
  regulator: "Regulator guidance",
  standards_body: "Standard setter",
  secondary: "Secondary source"
};

export function generateStaticParams() {
  return regulations.map((regulation) => ({ slug: regulation.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const regulation = regulations.find((item) => item.id === slug);
  return {
    title: regulation ? `${regulation.shortName} | Etica ESG` : "Regulation | Etica ESG"
  };
}

export default async function RegulationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const regulation = regulations.find((item) => item.id === slug);
  if (!regulation) notFound();

  const profile = profileFor(regulation);
  const scope = regulation.applicabilityScope;

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-5xl space-y-5 px-4 py-5 md:px-6">
        <Link href="/regulations" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal">
          <ArrowLeft className="h-4 w-4" />
          Back to regulations
        </Link>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={regulation.status} />
            <Badge className="border-slate-200 bg-slate-50 text-slate-600">{regulation.jurisdiction}</Badge>
            <Badge className="border-slate-200 bg-slate-50 text-slate-600">{qualityLabel(regulation.dataQualityStatus)}</Badge>
            {regulation.highImpact && <Badge className="border-red-200 bg-red-50 text-red-700">High impact</Badge>}
          </div>
          <RecordMetaBadges regulation={regulation} />
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink">{regulation.shortName}</h1>
          <p className="mt-2 text-lg text-slate-600">{regulation.title}</p>
          <p className="mt-3 text-sm font-semibold text-slate-500">Last reviewed by Gabriel Gage on {formatDate(regulation.lastReviewed)}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Metric label="Issuing body" value={regulation.issuingBody} />
            <Metric label="Readiness priority" value={`${readinessBand(regulation)} (${readinessScore(regulation)}/100)`} />
            <Metric label="Last reviewed" value={formatDate(regulation.lastReviewed)} />
            <Metric label="Next review" value={formatDate(regulation.nextReviewDate)} />
          </div>
        </section>

        <Section title="Why it matters">
          <p>{regulation.summary}</p>
          <p className="mt-3 text-slate-600">{regulation.businessImpact}</p>
        </Section>

        <CitationWidget regulation={regulation} />

        <Section title="Atlas record governance">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Metric label="Record type" value={labelOrMissing(regulation.recordType)} />
            <Metric label="Legal force" value={labelOrMissing(regulation.legalForce)} />
            <Metric label="Client relevance" value={labelOrMissing(regulation.clientRelevanceCategory)} />
            <Metric label="Display tier" value={labelOrMissing(regulation.displayTier)} />
            <Metric label="Granularity" value={labelOrMissing(regulation.atlasGranularity)} />
            <Metric label="Source system" value={labelOrMissing(regulation.sourceSystem)} />
          </div>
          <p className="mt-4 text-slate-600">
            The Atlas uses condensed parent records. Delegated acts, questionnaires, sector modules and source notes appear as child details or aliases so the map remains usable.
          </p>
        </Section>

        {(regulation.aliases?.length || regulation.childItems?.length) ? (
          <Section title="Aliases and child details">
            {regulation.aliases?.length ? <ListBlock title="Search aliases" values={regulation.aliases} /> : null}
            {regulation.childItems?.length ? (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {regulation.childItems.map((item) => (
                  <div key={`${item.label}-${item.date || item.type}`} className="rounded-xl bg-slate-50 p-4">
                    <h3 className="font-semibold text-ink">{item.label}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{item.type.replaceAll("-", " ")}</p>
                    {item.note ? <p className="mt-2 text-slate-600">{item.note}</p> : null}
                    {item.date ? <p className="mt-2 text-xs text-slate-500">Indicative timing: {item.date}</p> : null}
                  </div>
                ))}
              </div>
            ) : null}
          </Section>
        ) : null}

        <Section title="Scope of application">
          <p>{regulation.applicability}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {scope?.thresholds?.length ? <ListBlock title="Thresholds" values={scope.thresholds} /> : null}
            <ListBlock title="Entity types" values={scope?.entityTypes || profile.companyTypes} />
            <ListBlock title="Sectors in scope" values={scope?.sectorsInScope || regulation.sectors} />
          </div>
        </Section>

        <Section title="Key dates">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Effective date" value={formatDate(regulation.effectiveDate)} />
            <Metric label="First reporting" value={String(regulation.firstReportingYear || "n/a")} />
            <Metric label="First report due" value={formatDate(regulation.firstReportDueDate)} />
            <Metric label="Consultation deadline" value={formatDate(regulation.consultationDeadline)} />
          </div>
          {regulation.phaseInNotes && <p className="mt-4 text-sm text-slate-600">{regulation.phaseInNotes}</p>}
        </Section>

        <Section title="Obligations and required actions">
          <div className="grid gap-4 md:grid-cols-2">
            <ListBlock title="Obligation types" values={regulation.businessImpacts} />
            <ListBlock title="Required actions" values={profile.requiredActions} />
            <ListBlock title="Evidence required" values={profile.evidenceRequired} />
            <ListBlock title="Affected functions" values={regulation.affectedFunctions} />
          </div>
        </Section>

        <Section title="Readiness planning signal">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge className={readinessClass(readinessBand(regulation))}>
              {readinessBand(regulation)} priority · {readinessScore(regulation)}/100
            </Badge>
            {readinessReasons(regulation).map((reason) => (
              <Badge key={reason} className="border-slate-200 bg-slate-50 text-slate-600">
                {reason}
              </Badge>
            ))}
          </div>
          <p>
            This score is a planning aid based on timing, obligation breadth, source quality and impact indicators. It does not determine legal applicability.
          </p>
        </Section>

        {regulation.penalties && (
          <Section title="Penalties and enforcement">
            <p>{regulation.penalties}</p>
          </Section>
        )}

        <Section title="Advisory opportunities">
          <BadgeList values={regulation.advisoryOpportunities} />
        </Section>

        <Section title="Primary sources and data quality">
          <div className="mb-4 grid gap-3 sm:grid-cols-3">
            <Metric label="Confidence" value={regulation.confidenceLevel.replaceAll("_", " ")} />
            <Metric label="Quality status" value={qualityLabel(regulation.dataQualityStatus)} />
            <Metric label="Source links" value={String(regulation.sourceUrls.length)} />
          </div>
          <div className="space-y-3">
            {regulation.sourceUrls.length ? (
              regulation.sourceUrls.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="flex items-start gap-3 rounded-xl border border-slate-200 p-4 text-sm hover:bg-teal/5">
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  <span>
                    <span className="font-semibold text-ink">{sourceTypeLabel[source.type]}: </span>
                    <span className="text-teal underline">{source.label}</span>
                  </span>
                </a>
              ))
            ) : (
              <p>No source URL is available for this record yet.</p>
            )}
          </div>
        </Section>

        <Section title="Caveats">
          <ul className="space-y-2">
            {profile.caveats.map((caveat) => (
              <li key={caveat} className="rounded-xl bg-slate-50 px-4 py-3">
                {caveat}
              </li>
            ))}
          </ul>
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

function ListBlock({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
      <ul className="mt-3 space-y-2">
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

function BadgeList({ values }: { values: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <Badge key={value} className="border-violet/20 bg-violet/10 text-violet">
          {value}
        </Badge>
      ))}
    </div>
  );
}

function qualityLabel(status: string) {
  if (status === "verified_seed") return "Verified source set";
  return status.replaceAll("_", " ");
}

function labelOrMissing(value: string | undefined) {
  return value ? value.replaceAll("-", " ") : "Not classified";
}
