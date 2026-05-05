import { ExternalLink, X } from "lucide-react";
import { Regulation } from "@/types/regulation";
import { Badge } from "./Badge";
import { CommercialCTA } from "./CommercialCTA";
import { DecisionReadinessChecklist } from "./DecisionReadinessChecklist";
import { RecordMetaBadges } from "./RecordMetaBadges";
import { StatusBadge } from "./StatusBadge";
import { DATASET_META } from "@/data/_meta";
import { readinessBand, readinessClass, readinessReasons, readinessScore } from "@/lib/scoring";
import { formatDate } from "@/lib/utils";
import { profileFor } from "@/lib/applicability";

export function RegulationDetail({ regulation, onClose }: { regulation: Regulation | null; onClose: () => void }) {
  if (!regulation) return null;
  const profile = profileFor(regulation);
  const thresholdSummary = thresholdSummaryFor(regulation);
  const phaseInSummary = phaseInSummaryFor(regulation);
  const enforcementSummary = enforcementSummaryFor(regulation);
  const missingData = missingDecisionDataFor(regulation);
  const relatedRegimes = relatedRegimesFor(regulation);

  return (
    <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl overflow-y-auto overscroll-contain border-l bg-white p-6 shadow-2xl">
      <button
        onClick={onClose}
        className="absolute right-5 top-5 rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
        aria-label="Close regulation detail"
      >
        <X size={18} />
      </button>

      <div className="pr-12">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={regulation.status} />
          <Badge className="border-slate-200 bg-slate-50 text-slate-600">{regulation.adoptionLevel.replaceAll("_", " ")}</Badge>
          {regulation.highImpact && <Badge className="border-red-200 bg-red-50 text-red-700">High impact</Badge>}
        </div>
        <RecordMetaBadges regulation={regulation} />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink">{regulation.shortName}</h2>
        <p className="mt-1 text-slate-500">{regulation.title}</p>
        <p className="mt-2 text-sm font-semibold text-slate-500">Last reviewed by Gabriel Gage on {formatDate(regulation.lastReviewed)}</p>
        <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
          This record is seed regulatory intelligence and may be incomplete. It does not determine legal applicability; confirm entity-specific scope, dates and obligations with primary sources and qualified advisors.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        <Card title="Executive summary">{regulation.summary}</Card>
        <div className="grid gap-3 sm:grid-cols-2">
          <DecisionCard title="What this is" body={`${labelOrMissing(regulation.recordType)} - ${labelOrMissing(regulation.legalForce)} - ${regulation.status.replaceAll("_", " ")}`} />
          <DecisionCard title="Who may be affected" body={profile.companyTypes.slice(0, 5).join(", ") || "Confirm entity profile and thresholds."} />
          <DecisionCard title="Facts to confirm" body={thresholdSummary} />
          <DecisionCard title="Timing uncertainty" body={phaseInSummary} />
          <DecisionCard title="Evidence likely needed" body={profile.evidenceRequired.slice(0, 3).join(", ") || "Applicability assessment and source review log."} />
          <DecisionCard title="Suggested owners" body={regulation.affectedFunctions.slice(0, 4).join(", ") || "Assign accountable owner before reliance."} />
          <DecisionCard title="Enforcement or penalty cue" body={enforcementSummary} />
          <DecisionCard title="Missing decision data" body={missingData.join("; ")} />
        </div>
        {relatedRegimes.length ? (
          <Card title="Related regimes and dependencies">
            <BadgeList values={relatedRegimes} tone="slate" />
            <p className="mt-3 text-sm text-slate-600">
              Related items are orientation links only. Confirm whether each regime is legally separate, transposed locally or only a market expectation before using it in a compliance workplan.
            </p>
          </Card>
        ) : null}
        <DecisionReadinessChecklist regulation={regulation} compact />
        <Card title="Atlas record governance">
          <div className="grid gap-3 sm:grid-cols-2">
            <Metric label="Record type" value={labelOrMissing(regulation.recordType)} />
            <Metric label="Legal force" value={labelOrMissing(regulation.legalForce)} />
            <Metric label="Client relevance" value={labelOrMissing(regulation.clientRelevanceCategory)} />
            <Metric label="Display tier" value={labelOrMissing(regulation.displayTier)} />
            <Metric label="Granularity" value={labelOrMissing(regulation.atlasGranularity)} />
            <Metric label="Source system" value={labelOrMissing(regulation.sourceSystem)} />
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Parent records keep the Atlas usable: delegated acts, questionnaires and subrequirements are shown as child items or aliases rather than scattered across the map.
          </p>
        </Card>
        {(regulation.aliases?.length || regulation.childItems?.length) ? (
          <Card title="Aliases and child details">
            {regulation.aliases?.length ? (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Search aliases</h4>
                <BadgeList values={regulation.aliases} tone="slate" />
              </div>
            ) : null}
            {regulation.childItems?.length ? (
              <div className="mt-4 space-y-2">
                {regulation.childItems.map((item) => (
                  <div key={`${item.label}-${item.date || item.type}`} className="rounded-xl bg-white px-3 py-2">
                    <div className="font-semibold text-ink">{item.label}</div>
                    <div className="mt-1 text-xs uppercase tracking-wide text-slate-400">{item.type.replaceAll("-", " ")}</div>
                    {item.note ? <p className="mt-1 text-sm text-slate-600">{item.note}</p> : null}
                    {item.date ? <p className="mt-1 text-xs text-slate-500">Indicative timing: {item.date}</p> : null}
                  </div>
                ))}
              </div>
            ) : null}
          </Card>
        ) : null}
        <Card title="Applicability">{regulation.applicability}</Card>
        {regulation.applicabilityScope?.thresholds?.length ? (
          <Card title="Scope thresholds">
            <ul className="space-y-2">
              {regulation.applicabilityScope.thresholds.map((threshold) => (
                <li key={threshold} className="rounded-lg bg-white px-3 py-2">
                  {threshold}
                </li>
              ))}
            </ul>
          </Card>
        ) : null}
        <Card title="Company profile fit">
          <BadgeList values={profile.companyTypes} tone="slate" />
        </Card>
        <Card title="Key requirements">
          <ul className="space-y-2">
            {regulation.keyRequirements.map((requirement) => (
              <li key={requirement} className="rounded-lg bg-white px-3 py-2">
                {requirement}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Business impact">{regulation.businessImpact}</Card>
        <Card title="Readiness priority">
          <div className="grid gap-3 sm:grid-cols-[.65fr_1.35fr]">
            <Metric label="Indicative score" value={`${readinessScore(regulation)} / 100`} />
            <div className="rounded-xl bg-white p-4">
              <div className="text-xs uppercase tracking-wide text-slate-400">Priority band</div>
              <Badge className={`mt-2 ${readinessClass(readinessBand(regulation))}`}>{readinessBand(regulation)}</Badge>
              <p className="mt-3 text-sm text-slate-600">
                Based on timing, obligation breadth, status, source quality and high-impact classification. This is a planning signal, not a legal determination.
              </p>
            </div>
          </div>
          <BadgeList values={readinessReasons(regulation)} tone="slate" />
        </Card>
        <Card title="Required actions">
          <ul className="space-y-2">
            {profile.requiredActions.map((action) => (
              <li key={action} className="rounded-lg bg-white px-3 py-2">
                {action}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Evidence required">
          <BadgeList values={profile.evidenceRequired} tone="slate" />
        </Card>
        <Card title="Affected functions">
          <BadgeList values={regulation.affectedFunctions} tone="slate" />
        </Card>
        <Card title="Impact classification">
          <BadgeList values={regulation.businessImpacts} tone="teal" />
        </Card>
        <Card title="Key dates">
          <div className="grid grid-cols-2 gap-3">
            <Metric label="Effective date" value={formatDate(regulation.effectiveDate)} />
            <Metric label="First reporting" value={String(regulation.firstReportingYear || "n/a")} />
            <Metric label="Last reviewed" value={formatDate(regulation.lastReviewed)} />
            <Metric label="Next review" value={formatDate(regulation.nextReviewDate)} />
            {regulation.firstReportDueDate && <Metric label="First report due" value={formatDate(regulation.firstReportDueDate)} />}
            {regulation.consultationDeadline && <Metric label="Consultation deadline" value={formatDate(regulation.consultationDeadline)} />}
          </div>
          {regulation.phaseInNotes && <p className="mt-3 text-sm text-slate-600">{regulation.phaseInNotes}</p>}
        </Card>
        <Card title="Value chain impact">
          <BadgeList values={regulation.valueChain} tone="teal" />
        </Card>
        <Card title="Advisory opportunities">
          <BadgeList values={regulation.advisoryOpportunities} tone="violet" />
        </Card>
        <CommercialCTA
          compact
          eyebrow="Advisory next step"
          title="Request context-specific review"
          body="Use this record as the starting point for a cautious exposure scan, market briefing or source review."
          href={`mailto:${DATASET_META.contactEmail}?subject=${encodeURIComponent(`Etica ESG advisory review - ${regulation.shortName}`)}&body=${encodeURIComponent(
            `Hi Gabriel,\n\nI would like an advisory review of ${regulation.shortName}.\n\nContext:\n`
          )}`}
          label="Request review"
          secondaryHref="/advisory"
          secondaryLabel="Advisory options"
        />
        {regulation.penalties ? <Card title="Penalties and enforcement">{regulation.penalties}</Card> : null}
        <Card title="Typical client questions">
          <ul className="space-y-2">
            {profile.typicalClientQuestions.map((question) => (
              <li key={question} className="rounded-lg bg-white px-3 py-2">
                {question}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Data quality">
          <div className="grid gap-3 sm:grid-cols-3">
            <Metric label="Confidence" value={regulation.confidenceLevel.replace("_", " ")} />
            <Metric label="Quality status" value={qualityLabel(regulation.dataQualityStatus)} />
            <Metric label="Sources" value={String(regulation.sourceUrls.length)} />
          </div>
          {regulation.changeLogSummary && <p className="mt-3 text-sm text-slate-600">{regulation.changeLogSummary}</p>}
        </Card>
        <Card title="Latest update">{regulation.latestUpdate}</Card>
        <Card title="Caveats">
          <ul className="space-y-2">
            {profile.caveats.map((caveat) => (
              <li key={caveat} className="rounded-lg bg-white px-3 py-2">
                {caveat}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Sources">
          {regulation.sourceUrls.length ? (
            <div className="space-y-2">
              {regulation.sourceUrls.map((source) => (
                <a
                  key={source.url}
                  className="flex items-start gap-2 text-sm text-teal underline"
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="break-words">{source.label}</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No source URL is available for this record yet.</p>
          )}
        </Card>
      </div>
    </aside>
  );
}

function thresholdSummaryFor(regulation: Regulation) {
  if (regulation.applicabilityScope?.thresholds?.length) return regulation.applicabilityScope.thresholds.slice(0, 2).join("; ");
  if (regulation.legalForce === "mandatory") return "Thresholds are not fully structured yet; confirm employee, revenue, asset, listing, sector and market-exposure triggers in primary sources.";
  return "Confirm whether the record is voluntary, investor/customer-driven or only a monitor item for this entity profile.";
}

function phaseInSummaryFor(regulation: Regulation) {
  if (regulation.phaseInNotes) return regulation.phaseInNotes;
  if (regulation.firstReportDueDate) return `First report due date captured as ${formatDate(regulation.firstReportDueDate)}; verify any phase-in relief or local guidance.`;
  if (regulation.consultationDeadline) return `Consultation deadline captured as ${formatDate(regulation.consultationDeadline)}; monitor whether final rules change timing or scope.`;
  if (regulation.firstReportingYear) return `Indicative first reporting year ${regulation.firstReportingYear}; confirm entity-specific phase-in and filing date.`;
  return "No specific phase-in date captured; treat timing as a source-review item.";
}

function enforcementSummaryFor(regulation: Regulation) {
  if (regulation.penalties) return regulation.penalties;
  if (regulation.legalForce === "mandatory") return "Penalty or enforcement detail is not captured in structured form yet; review official sources before client reliance.";
  if (regulation.legalForce === "supervisory-expectation") return "Supervisory expectation; confirm regulator guidance, examination focus and enforcement posture.";
  return "No enforcement claim is made for this seed record.";
}

function missingDecisionDataFor(regulation: Regulation) {
  const missing = new Set<string>();
  if (!regulation.applicabilityScope?.thresholds?.length && regulation.legalForce === "mandatory") missing.add("threshold detail");
  if (!regulation.penalties && regulation.legalForce === "mandatory") missing.add("penalty/enforcement detail");
  if (!regulation.firstReportDueDate && regulation.businessImpacts.includes("reporting obligation")) missing.add("first report due date");
  if (regulation.dataQualityStatus !== "verified_seed") missing.add(`data quality: ${qualityLabel(regulation.dataQualityStatus)}`);
  if (regulation.confidenceLevel !== "high") missing.add(`confidence: ${regulation.confidenceLevel}`);
  if (!regulation.sourceUrls.some((source) => source.type === "primary" || source.type === "regulator" || source.type === "standards_body")) missing.add("primary/regulator source");
  return missing.size ? Array.from(missing) : ["No obvious decision-data gaps captured in the seed record."];
}

function relatedRegimesFor(regulation: Regulation) {
  const values = new Set<string>();
  regulation.aliases?.slice(0, 5).forEach((alias) => values.add(alias));
  regulation.childItems?.slice(0, 5).forEach((item) => values.add(item.label));
  if (regulation.parentRecordId) values.add(`Parent record: ${regulation.parentRecordId}`);
  regulation.topics.slice(0, 3).forEach((topic) => values.add(topic));
  return Array.from(values).slice(0, 8);
}

function qualityLabel(status: Regulation["dataQualityStatus"]) {
  if (status === "verified_seed") return "Verified source set";
  return status.replaceAll("_", " ");
}

function labelOrMissing(value: string | undefined) {
  return value ? value.replaceAll("-", " ") : "Not classified";
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      <div className="text-sm leading-6 text-slate-700">{children}</div>
    </section>
  );
}

function DecisionCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-ink">{body}</p>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 font-semibold capitalize text-ink">{value}</div>
    </div>
  );
}

function BadgeList({ values, tone }: { values: string[]; tone: "slate" | "teal" | "violet" }) {
  const classes = {
    slate: "border-slate-200 bg-white text-slate-600",
    teal: "border-teal/20 bg-teal/10 text-teal",
    violet: "border-violet/20 bg-violet/10 text-violet"
  };
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <Badge key={value} className={classes[tone]}>
          {value}
        </Badge>
      ))}
    </div>
  );
}
