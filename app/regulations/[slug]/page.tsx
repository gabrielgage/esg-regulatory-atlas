import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { Badge } from "@/components/Badge";
import { CommercialCTA } from "@/components/CommercialCTA";
import { GlossaryHelpCard } from "@/components/GlossaryHelpCard";
import { RecordMetaBadges } from "@/components/RecordMetaBadges";
import { StatusBadge } from "@/components/StatusBadge";
import { CitationWidget } from "@/components/CitationWidget";
import { DecisionReadinessChecklist } from "@/components/DecisionReadinessChecklist";
import { SourceEvidencePanel } from "@/components/SourceEvidencePanel";
import { DATASET_META } from "@/data/_meta";
import { regulations } from "@/data/seed";
import { thresholdMatrixRows } from "@/data/thresholdMatrix";
import { profileFor } from "@/lib/applicability";
import { readinessBand, readinessClass, readinessReasons, readinessScore } from "@/lib/scoring";
import { formatDate } from "@/lib/utils";

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
  const related = regulations
    .filter((item) => item.id !== regulation.id && item.topics.some((topic) => regulation.topics.includes(topic)))
    .slice(0, 5);
  const thresholdRows = thresholdMatrixRows.filter((row) => row.regulationId === regulation.id);

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

        <GlossaryHelpCard
          compact
          title="Interpret this record before using it"
          body="Status, legal-force, readiness and data-quality labels are planning signals. The glossary explains how to read them before using this record in an assessment, market brief or advisory conversation."
        />

        <Section title="Why it matters">
          <p>{regulation.summary}</p>
          <p className="mt-3 text-slate-600">{regulation.businessImpact}</p>
        </Section>

        <section className="grid gap-4 md:grid-cols-2">
          <DecisionCard title="What this is" body={`${labelOrMissing(regulation.recordType)} · ${labelOrMissing(regulation.legalForce)} · ${regulation.status.replaceAll("_", " ")}`} />
          <DecisionCard title="Who may be affected" body={profile.companyTypes.slice(0, 5).join(", ") || "Confirm entity profile and thresholds."} />
          <DecisionCard title="Evidence likely needed" body={profile.evidenceRequired.slice(0, 3).join(", ") || "Applicability assessment and source review log."} />
          <DecisionCard title="Suggested internal owners" body={regulation.affectedFunctions.slice(0, 4).join(", ") || "Assign accountable owner before reliance."} />
        </section>

        <DecisionReadinessChecklist regulation={regulation} allRegulations={regulations} />

        {thresholdRows.length ? (
          <Section title="Threshold matrix signals">
            <p>
              This record appears in the Atlas threshold matrix because its scope depends on facts that should be checked before assessment, premium or
              advisory use.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {thresholdRows.map((row) => (
                <div key={row.id} className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950">
                  <h3 className="font-semibold text-ink">{row.thresholdSignal}</h3>
                  <p className="mt-2 text-sm leading-6">{row.caveat}</p>
                  <Link href="/thresholds" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-ink">
                    Open threshold matrix
                  </Link>
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        <CitationWidget regulation={regulation} />

        <SourceEvidencePanel regulation={regulation} />

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

        {related.length ? (
          <Section title="Related regimes to review">
            <div className="grid gap-3 md:grid-cols-2">
              {related.map((item) => (
                <Link key={item.id} href={`/regulations/${item.id}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4 hover:bg-teal/5">
                  <div className="font-semibold text-ink">{item.shortName}</div>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">{item.summary}</p>
                </Link>
              ))}
            </div>
          </Section>
        ) : null}

        <CommercialCTA
          compact
          eyebrow="Advisory next step"
          title="Need this translated into an exposure scan?"
          body="Request a cautious source-linked review of this regime in context of a jurisdiction, sector, company type, supplier base or portfolio."
          href={`mailto:${DATASET_META.contactEmail}?subject=${encodeURIComponent(`Etica ESG advisory review - ${regulation.shortName}`)}&body=${encodeURIComponent(
            `Hi Gabriel,\n\nI would like an advisory review of ${regulation.shortName} in context.\n\nJurisdiction/company profile:\n`
          )}`}
          label="Request review"
          secondaryHref="/advisory"
          secondaryLabel="Advisory options"
        />

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

function DecisionCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h2>
      <p className="mt-3 text-sm font-semibold leading-6 text-ink">{body}</p>
    </article>
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
  if (status === "verified_seed") return "Source-reviewed seed";
  return status.replaceAll("_", " ");
}

function labelOrMissing(value: string | undefined) {
  return value ? value.replaceAll("-", " ") : "Not classified";
}
