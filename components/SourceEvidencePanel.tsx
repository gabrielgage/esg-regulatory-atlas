import { AlertTriangle, CalendarClock, ExternalLink, FileCheck2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import type { Regulation } from "@/types/regulation";
import {
  sourceEvidenceFor,
  sourceFreshnessClass,
  sourceGovernanceMemo,
  sourceHost,
  sourceLabelFor
} from "@/lib/sourceGovernance";
import { formatDate } from "@/lib/utils";

export function SourceEvidencePanel({
  regulation,
  compact = false
}: {
  regulation: Regulation;
  compact?: boolean;
}) {
  const evidence = sourceEvidenceFor(regulation);

  return (
    <section className={compact ? "rounded-2xl border border-slate-200 bg-slate-50 p-5" : "rounded-2xl border bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm"}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-teal" />
            <h2 className="text-lg font-semibold text-ink">Source evidence trail</h2>
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Source authority, freshness and review packet for turning this seed record into a client-ready or premium-ready research item.
          </p>
        </div>
        <Badge className={sourceFreshnessClass[evidence.level]}>{evidence.levelLabel}</Badge>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <MiniCard
          icon={FileCheck2}
          title="Priority source"
          body={evidence.prioritySource ? evidence.prioritySource.label : "Add official source"}
          detail={evidence.sourceAuthority}
        />
        <MiniCard
          icon={CalendarClock}
          title="Review timing"
          body={formatDate(regulation.nextReviewDate)}
          detail={evidence.reviewTiming}
        />
        <MiniCard
          icon={AlertTriangle}
          title="Source coverage"
          body={`${evidence.prioritySourceCount}/${evidence.sourceCount} priority`}
          detail="Primary, regulator or standard-setter sources are prioritized over secondary commentary."
        />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Captured sources</h3>
          <div className="mt-3 space-y-3">
            {regulation.sourceUrls.length ? (
              regulation.sourceUrls.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm hover:bg-teal/5"
                >
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  <span>
                    <span className="font-semibold text-ink">{sourceLabelFor(source.type)}: </span>
                    <span className="text-teal underline">{source.label}</span>
                    <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">{sourceHost(source)}</span>
                  </span>
                </a>
              ))
            ) : (
              <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                No source URL is captured yet. Do not use this record in premium examples or client-ready outputs before source review.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Review packet</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            {evidence.reviewPacket.map((item) => (
              <li key={item} className="rounded-lg bg-slate-50 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Source-review steps</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Copy this memo into the content review process before using the record for premium packs, advisory scans or client-ready summaries.
            </p>
          </div>
          <CopyMarkdownButton text={sourceGovernanceMemo(regulation)} label="Copy source memo" />
        </div>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700 md:grid-cols-2">
          {evidence.sourceReviewSteps.map((step) => (
            <li key={step} className="rounded-lg bg-white px-3 py-2">
              {step}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
        Source evidence is a governance aid only. It does not verify legal completeness, translate requirements officially or determine entity-specific applicability.
      </p>
    </section>
  );
}

function MiniCard({
  icon: Icon,
  title,
  body,
  detail
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  detail: string;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
        <Icon className="h-4 w-4 text-teal" />
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-ink">{body}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
    </article>
  );
}
