import { ArrowRight, ExternalLink, FileSearch, LockKeyhole, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/Badge";
import { marqueeReviewItems, marqueeReviewStatusLabel } from "@/data/contentReview";
import { thresholdMatrixRows } from "@/data/thresholdMatrix";
import { decisionReadinessClass, decisionReadinessFor } from "@/lib/decisionReadiness";
import { buildReviewWorkflowRows } from "@/lib/reviewWorkflow";
import { sourceEvidenceFor, sourceFreshnessClass } from "@/lib/sourceGovernance";
import type { Regulation } from "@/types/regulation";

export function MarqueeSourceReviewPacket({
  regulations,
  onSelect
}: {
  regulations: Regulation[];
  onSelect: (regulation: Regulation) => void;
}) {
  const workflowRows = buildReviewWorkflowRows(regulations);
  const rows = marqueeReviewItems
    .filter((item) => item.tier === "marquee-10")
    .map((item) => {
      const regulation = regulations.find((record) => record.id === item.id);
      const workflow = workflowRows.find((row) => row.id === item.id);
      const thresholds = thresholdMatrixRows.filter((row) => row.regulationId === item.id);
      const decision = regulation ? decisionReadinessFor(regulation, regulations) : null;
      const source = regulation ? sourceEvidenceFor(regulation) : null;

      return {
        item,
        regulation,
        workflow,
        thresholds,
        decision,
        source
      };
    });

  const mappedRows = rows.filter((row) => row.regulation).length;
  const blockedRows = rows.filter((row) => row.decision?.level === "premium-blocked" || row.item.premiumUseBlockedUntilReviewed).length;
  const thresholdMappedRows = rows.filter((row) => row.thresholds.length > 0).length;
  const sourceReadyRows = rows.filter((row) => row.source?.level === "current").length;

  return (
    <section data-testid="marquee-source-review-packet" className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-teal" aria-hidden="true" />
            <h2 className="font-semibold text-ink">Marquee 10 source-review packet</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            This packet turns the highest-demand launch regimes into a source-review worklist: what is blocked for premium use, which source should be opened, what
            threshold fact needs checking and who should own the next review step.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[420px]">
          <Metric icon={ShieldCheck} label="Mapped records" value={`${mappedRows}/${rows.length}`} />
          <Metric icon={LockKeyhole} label="Premium blocked" value={String(blockedRows)} />
          <Metric icon={FileSearch} label="Threshold mapped" value={`${thresholdMappedRows}/${rows.length}`} />
          <Metric icon={ExternalLink} label="Current source posture" value={`${sourceReadyRows}/${rows.length}`} />
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {rows.map(({ item, regulation, workflow, thresholds, decision, source }) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-ink">{regulation?.shortName || item.id}</h3>
                  <Badge className={statusClass(item.status)}>{marqueeReviewStatusLabel[item.status]}</Badge>
                  {decision ? (
                    <Badge className={decisionReadinessClass[decision.level]}>{decision.levelLabel}</Badge>
                  ) : (
                    <Badge className="border-red-200 bg-red-50 text-red-700">Record missing</Badge>
                  )}
                  {source ? <Badge className={sourceFreshnessClass[source.level]}>{source.levelLabel}</Badge> : null}
                </div>
                <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{item.whyItMatters}</p>
              </div>
              {regulation ? (
                <button
                  type="button"
                  onClick={() => onSelect(regulation)}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-ink hover:border-teal/40 hover:text-teal"
                >
                  Open record <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-3">
              <ReviewCell
                title="Source to verify"
                body={source?.prioritySource?.label || workflow?.prioritySource || item.sourceReviewNextAction || "Add official source before premium use."}
                detail={source?.prioritySource?.url || workflow?.prioritySourceUrl || ""}
              />
              <ReviewCell
                title="Threshold fact"
                body={thresholds[0]?.factsToConfirm[0] || workflow?.thresholdNextAction || item.thresholdReviewNextAction || "Confirm entity-specific scope and timing."}
                detail={thresholds[0]?.sourceToVerify || "Use threshold matrix where mapped."}
              />
              <ReviewCell
                title="Owner and next action"
                body={workflow?.owner || item.ownerPlaceholder || decision?.owner || "Assign source review owner."}
                detail={workflow?.sourceNextAction || item.sourceReviewNextAction || decision?.sourceReviewSteps[0] || "Capture reviewer, source date and unresolved caveats."}
              />
            </div>

            <div className="mt-4 rounded-xl border border-white bg-white p-3 text-xs leading-5 text-slate-500">
              <span className="font-semibold text-slate-700">Premium-use note:</span>{" "}
              {workflow?.premiumUse || decision?.commercialUse || "Use for free Atlas orientation only until source review is complete."}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
        This packet is a static source-governance aid for review planning. It is not legal verification, source completeness certification, an official
        translation or an entity-specific applicability determination.
      </p>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[0.68rem] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
        <Icon className="h-4 w-4 text-teal" aria-hidden="true" />
      </div>
      <div className="mt-1 text-xl font-bold text-ink">{value}</div>
    </div>
  );
}

function ReviewCell({ title, body, detail }: { title: string; body: string; detail: string }) {
  return (
    <div className="rounded-xl border border-white bg-white p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
      <p className="mt-2 text-sm font-medium leading-5 text-ink">{body}</p>
      {detail ? <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p> : null}
    </div>
  );
}

function statusClass(status: string) {
  if (status === "source-ready") return "border-teal/20 bg-teal/10 text-teal";
  if (status === "needs-threshold-review") return "border-amber-200 bg-amber-50 text-amber-800";
  if (status === "needs-status-review") return "border-violet/20 bg-violet/10 text-violet";
  if (status === "needs-source-review") return "border-red-200 bg-red-50 text-red-700";
  return "border-slate-200 bg-slate-100 text-slate-600";
}
