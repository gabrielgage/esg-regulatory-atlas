import { ExternalLink, X } from "lucide-react";
import { Regulation } from "@/types/regulation";
import { Badge } from "./Badge";
import { formatDate, statusClass, statusLabel } from "@/lib/utils";
import { profileFor } from "@/lib/applicability";

export function RegulationDetail({ regulation, onClose }: { regulation: Regulation | null; onClose: () => void }) {
  if (!regulation) return null;
  const profile = profileFor(regulation);

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
          <Badge className={statusClass[regulation.status]}>{statusLabel[regulation.status]}</Badge>
          <Badge className="border-slate-200 bg-slate-50 text-slate-600">{regulation.adoptionLevel.replaceAll("_", " ")}</Badge>
          {regulation.highImpact && <Badge className="border-red-200 bg-red-50 text-red-700">High impact</Badge>}
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink">{regulation.shortName}</h2>
        <p className="mt-1 text-slate-500">{regulation.title}</p>
        <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
          This record is seed regulatory intelligence and may be incomplete. It does not determine legal applicability; confirm entity-specific scope, dates and obligations with primary sources and qualified advisors.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        <Card title="Executive summary">{regulation.summary}</Card>
        <Card title="Applicability">{regulation.applicability}</Card>
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

function qualityLabel(status: Regulation["dataQualityStatus"]) {
  if (status === "verified_seed") return "Verified source set";
  return status.replaceAll("_", " ");
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      <div className="text-sm leading-6 text-slate-700">{children}</div>
    </section>
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
