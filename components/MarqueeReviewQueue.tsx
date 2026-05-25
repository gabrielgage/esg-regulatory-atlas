"use client";

import { AlertTriangle, CheckCircle2, ClipboardList, ExternalLink } from "lucide-react";
import { Badge } from "@/components/Badge";
import { marqueeReviewItems, marqueeReviewStatusLabel, MarqueeReviewStatus } from "@/data/contentReview";
import { Regulation } from "@/types/regulation";

export function MarqueeReviewQueue({
  regulations,
  onSelect
}: {
  regulations: Regulation[];
  onSelect: (regulation: Regulation) => void;
}) {
  const linkedItems = marqueeReviewItems.map((item) => ({
    item,
    regulation: regulations.find((regulation) => regulation.id === item.id)
  }));
  const launchBlockers = linkedItems.filter(({ item }) => item.launchBlocker).length;
  const matched = linkedItems.filter(({ regulation }) => Boolean(regulation)).length;
  const sourceReady = linkedItems.filter(({ item }) => item.status === "source-ready").length;
  const needsReview = linkedItems.length - sourceReady;

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Marquee launch review queue</h2>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Tracks the launch-critical regimes used in premium packs and advisory examples. This is a content-governance queue, not a legal verification statement.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-red-200 bg-red-50 text-red-700">{launchBlockers} launch blockers</Badge>
          <Badge className="border-teal/20 bg-teal/10 text-teal">{matched}/{linkedItems.length} records mapped</Badge>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <Metric label="Marquee 10" value={String(linkedItems.filter(({ item }) => item.tier === "marquee-10").length)} detail="highest-demand regimes" />
        <Metric label="Marquee 25" value={String(linkedItems.filter(({ item }) => item.tier === "marquee-25").length)} detail="broader launch credibility set" />
        <Metric label="Source-ready seed" value={String(sourceReady)} detail="still caveated, but ready for orientation" />
        <Metric label="Needs review" value={String(needsReview)} detail="status, source or threshold follow-up" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {linkedItems.map(({ item, regulation }) => (
          <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="font-semibold text-ink">{regulation?.shortName || item.id}</div>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{item.tier.replace("-", " ")}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className={statusClass(item.status)}>{marqueeReviewStatusLabel[item.status]}</Badge>
                {item.launchBlocker ? <Badge className="border-red-200 bg-red-50 text-red-700">Launch blocker</Badge> : null}
                {premiumUseBlocked(item) ? <Badge className="border-amber-200 bg-amber-50 text-amber-800">Review needed before client reuse</Badge> : null}
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.whyItMatters}</p>
            {item.premiumUse ? <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-violet">{item.premiumUse}</p> : null}
            <div className="mt-3 grid gap-2 rounded-lg bg-white p-3 text-xs leading-5 text-slate-600 sm:grid-cols-2">
              <div>
                <span className="font-semibold text-ink">Owner placeholder: </span>
                {item.ownerPlaceholder || defaultOwner(item.status)}
              </div>
              <div>
                <span className="font-semibold text-ink">Premium use: </span>
                {premiumUseBlocked(item) ? "Blocked until source/status/threshold review" : "Orientation-ready with caveats"}
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold text-ink">Source next action: </span>
                {item.sourceReviewNextAction || defaultSourceAction(item.status)}
              </div>
              <div className="sm:col-span-2">
                <span className="font-semibold text-ink">Threshold next action: </span>
                {item.thresholdReviewNextAction || defaultThresholdAction(item.status)}
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {item.reviewQuestions.slice(0, 3).map((question) => (
                <div key={question} className="flex gap-2 text-sm leading-5 text-slate-600">
                  {item.status === "source-ready" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> : <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />}
                  <span>{question}</span>
                </div>
              ))}
            </div>
            {regulation ? (
              <button
                type="button"
                onClick={() => onSelect(regulation)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal underline"
              >
                Open record <ExternalLink className="h-4 w-4" />
              </button>
            ) : (
              <p className="mt-4 text-sm font-semibold text-red-700">Record not currently mapped in seed data.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-2 text-2xl font-bold text-ink">{value}</div>
      <p className="mt-1 text-sm text-slate-500">{detail}</p>
    </div>
  );
}

function statusClass(status: MarqueeReviewStatus) {
  if (status === "source-ready") return "border-teal/20 bg-teal/10 text-teal";
  if (status === "needs-threshold-review") return "border-amber-200 bg-amber-50 text-amber-800";
  if (status === "needs-status-review") return "border-violet/20 bg-violet/10 text-violet";
  if (status === "needs-source-review") return "border-red-200 bg-red-50 text-red-700";
  return "border-slate-200 bg-white text-slate-600";
}

function premiumUseBlocked(item: { status: MarqueeReviewStatus; tier: string; launchBlocker: boolean; premiumUseBlockedUntilReviewed?: boolean }) {
  return item.premiumUseBlockedUntilReviewed ?? (item.launchBlocker || (item.tier === "marquee-10" && item.status !== "source-ready"));
}

function defaultOwner(status: MarqueeReviewStatus) {
  if (status === "needs-threshold-review") return "Threshold review owner";
  if (status === "needs-status-review") return "Regulatory status review owner";
  if (status === "needs-source-review") return "Source review owner";
  if (status === "watchlist-gap") return "Coverage expansion owner";
  return "Content QA owner";
}

function defaultSourceAction(status: MarqueeReviewStatus) {
  if (status === "source-ready") return "Confirm sources stay current during the next scheduled review.";
  if (status === "needs-source-review") return "Add or refresh primary, regulator or standard-setter sources before premium use.";
  if (status === "watchlist-gap") return "Identify the first official source set before adding premium examples.";
  return "Recheck official sources and source dates before using this record in premium or advisory outputs.";
}

function defaultThresholdAction(status: MarqueeReviewStatus) {
  if (status === "needs-threshold-review") return "Confirm scope thresholds, phase-ins, listing triggers and cross-border exposure rules.";
  if (status === "needs-status-review") return "Confirm whether the record is in force, transitional, consultation-stage, paused or monitor-only.";
  return "Confirm entity-specific scope facts before any client reliance.";
}
