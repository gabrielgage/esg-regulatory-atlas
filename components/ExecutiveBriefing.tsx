"use client";

import { AlertTriangle, ArrowUpRight, BriefcaseBusiness, ClipboardCheck, Gauge } from "lucide-react";
import { Badge } from "./Badge";
import { StatusBadge } from "./StatusBadge";
import { Regulation } from "@/types/regulation";
import { uniq } from "@/lib/utils";

export function ExecutiveBriefing({
  regulations,
  onSelect
}: {
  regulations: Regulation[];
  onSelect: (regulation: Regulation) => void;
}) {
  const priority = regulations
    .map((regulation) => ({ regulation, score: priorityScore(regulation) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  const urgent = priority.filter(({ score }) => score >= 6).length;
  const workstreams = uniq(regulations.flatMap((regulation) => regulation.businessImpacts)).slice(0, 6);
  const advisory = uniq(regulations.flatMap((regulation) => regulation.advisoryOpportunities)).slice(0, 6);

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Executive briefing</h2>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Decision-ready snapshot of what needs leadership attention in the current regulatory view.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-red-200 bg-red-50 text-red-700">{urgent} urgent priorities</Badge>
          <Badge className="border-teal/20 bg-teal/10 text-teal">{workstreams.length} workstreams</Badge>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-3">
          {priority.length ? (
            priority.map(({ regulation, score }) => (
              <button
                key={regulation.id}
                type="button"
                onClick={() => onSelect(regulation)}
                className="w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-teal/40 hover:bg-teal/5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink">{regulation.shortName}</span>
                    <Badge className={score >= 6 ? "border-red-200 bg-red-50 text-red-700" : "border-amber-200 bg-amber-50 text-amber-800"}>
                      Priority {score}
                    </Badge>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">{regulation.businessImpact}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  <StatusBadge status={regulation.status} />
                  {regulation.businessImpacts.slice(0, 2).map((impact) => (
                    <Badge key={impact} className="border-slate-200 bg-slate-50 text-slate-600">
                      {impact}
                    </Badge>
                  ))}
                </div>
              </button>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
              No priority records match the current filters.
            </div>
          )}
        </div>

        <div className="grid gap-3">
          <BriefingCard
            icon={AlertTriangle}
            title="Leadership question"
            body="Which obligations create board, finance or external assurance exposure in the next reporting cycles?"
          />
          <BriefingCard
            icon={ClipboardCheck}
            title="First operating move"
            body={workstreams.length ? `Stand up accountable owners for ${workstreams.slice(0, 3).join(", ")}.` : "Broaden filters to identify accountable workstreams."}
          />
          <BriefingCard
            icon={BriefcaseBusiness}
            title="Advisory motion"
            body={advisory.length ? advisory.slice(0, 3).join(", ") : "No advisory opportunities in the current filter set."}
          />
        </div>
      </div>
    </section>
  );
}

function priorityScore(regulation: Regulation) {
  let score = 0;
  if (regulation.highImpact) score += 3;
  if (["in_force", "first_reporting"].includes(regulation.status)) score += 2;
  if (regulation.status === "transition") score += 1;
  if (regulation.firstReportingYear && regulation.firstReportingYear <= 2027) score += 2;
  if (regulation.dataQualityStatus !== "verified_seed") score += 1;
  if (regulation.businessImpacts.includes("board oversight obligation")) score += 1;
  if (regulation.businessImpacts.includes("assurance obligation")) score += 1;
  return score;
}

function BriefingCard({
  icon: Icon,
  title,
  body
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <Icon className="h-5 w-5 text-teal" />
      <h3 className="mt-3 text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}
