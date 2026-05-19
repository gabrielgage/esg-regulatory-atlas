import Link from "next/link";
import { AlertTriangle, CheckCircle2, ClipboardCheck, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { CopyOutputNote } from "@/components/CopyOutputNote";
import { decisionReadinessClass, decisionReadinessFor, decisionReadinessMarkdown } from "@/lib/decisionReadiness";
import type { Regulation } from "@/types/regulation";

export function DecisionReadinessChecklist({
  regulation,
  allRegulations = [],
  compact = false
}: {
  regulation: Regulation;
  allRegulations?: Regulation[];
  compact?: boolean;
}) {
  const plan = decisionReadinessFor(regulation, allRegulations);
  const checklistMarkdown = decisionReadinessMarkdown(regulation, allRegulations);

  return (
    <section className={compact ? "rounded-2xl border border-slate-200 bg-slate-50 p-5" : "rounded-2xl border bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm"}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-teal" />
            <h2 className="text-lg font-semibold text-ink">Decision readiness</h2>
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Practical review controls before this record is reused in a client-ready brief, premium pack or advisory scan.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <Badge className={decisionReadinessClass[plan.level]}>{plan.levelLabel}</Badge>
          <CopyMarkdownButton text={checklistMarkdown} label="Copy readiness checklist" />
          <CopyOutputNote className="max-w-xs sm:text-right" />
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <MiniCard title="Suggested owner" body={plan.owner} />
        <MiniCard title="Commercial use gate" body={plan.commercialUse} />
        <MiniCard title="Legal caveat" body={plan.caveat} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <ListCard icon={ShieldAlert} title="Facts to confirm" values={plan.factsToConfirm} />
        <ListCard icon={CheckCircle2} title="Evidence package" values={plan.evidencePackage} />
        <ListCard icon={ClipboardCheck} title="First 30-day actions" values={plan.firstThirtyDayActions} />
        <ListCard icon={AlertTriangle} title="Source-review steps" values={plan.sourceReviewSteps} />
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-800">Decision-data gaps to review</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {plan.missingDecisionData.map((item) => (
            <Badge key={item} className="border-amber-200 bg-white text-amber-800">
              {item}
            </Badge>
          ))}
        </div>
      </div>

      {plan.relatedRecordIds.length ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Related records to review</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {plan.relatedRecordIds.map((id) => (
              <Link key={id} href={`/regulations/${id}`} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:text-teal">
                {id}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function MiniCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-ink">{body}</p>
    </div>
  );
}

function ListCard({
  icon: Icon,
  title,
  values
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  values: string[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-teal" />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      </div>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
        {values.map((value) => (
          <li key={value} className="rounded-lg bg-white px-3 py-2">
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
