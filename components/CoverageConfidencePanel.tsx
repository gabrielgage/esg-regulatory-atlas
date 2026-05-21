import { BarChart3, CheckCircle2, CircleAlert, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CoverageConfidenceBadge } from "@/components/CoverageConfidenceBadge";
import { coverageConfidenceForJurisdiction } from "@/lib/coverageConfidence";
import type { Jurisdiction, Regulation } from "@/types/regulation";

export function CoverageConfidencePanel({
  jurisdictions,
  regulations,
  onSelect
}: {
  jurisdictions: Jurisdiction[];
  regulations: Regulation[];
  onSelect: (jurisdiction: Jurisdiction) => void;
}) {
  const rows = jurisdictions
    .filter((jurisdiction) => jurisdiction.type !== "international")
    .map((jurisdiction) => coverageConfidenceForJurisdiction(jurisdiction, regulations))
    .sort((a, b) => a.confidenceScore - b.confidenceScore || b.reviewFlagCount - a.reviewFlagCount || a.jurisdiction.name.localeCompare(b.jurisdiction.name));

  const sourceReviewed = rows.filter((row) => row.level === "source-reviewed").length;
  const usableSeed = rows.filter((row) => row.level === "usable-seed").length;
  const reviewNeeded = rows.filter((row) => row.level === "review-needed").length;
  const watchOnly = rows.filter((row) => row.level === "watch-only").length;

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Coverage confidence</h2>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Separates tracked seed-record volume from source confidence, review prompts and date sensitivity. Use this as an internal readiness signal before putting a market into premium examples, advisory scans or client-ready briefs.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-teal/20 bg-teal/10 text-teal">{sourceReviewed} source-reviewed</Badge>
          <Badge className="border-blue-200 bg-blue-50 text-blue-700">{usableSeed} usable seed</Badge>
          <Badge className="border-amber-200 bg-amber-50 text-amber-800">{reviewNeeded} need source review</Badge>
          <Badge className="border-slate-200 bg-slate-50 text-slate-600">{watchOnly} watch-only</Badge>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <Metric icon={CheckCircle2} label="Priority-source backing" value={`${sum(rows, "prioritySourceCount")}/${sum(rows, "scopedCount") || 0}`} />
        <Metric icon={ShieldCheck} label="High-confidence records" value={`${sum(rows, "highConfidenceCount")}/${sum(rows, "scopedCount") || 0}`} />
        <Metric icon={CircleAlert} label="Review prompts" value={String(sum(rows, "reviewFlagCount"))} />
        <Metric icon={BarChart3} label="Average confidence" value={`${Math.round(rows.reduce((total, row) => total + row.confidenceScore, 0) / (rows.length || 1))}/100`} />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">Market</th>
              <th className="px-3 py-2">Confidence</th>
              <th className="px-3 py-2">Score</th>
              <th className="px-3 py-2">Depth</th>
              <th className="px-3 py-2">Priority sources</th>
              <th className="px-3 py-2">High confidence</th>
              <th className="px-3 py-2">Review signals</th>
              <th className="px-3 py-2">Next action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr
                key={row.jurisdiction.id}
                role="button"
                tabIndex={0}
                aria-label={`Open ${row.jurisdiction.name} coverage confidence profile`}
                className="cursor-pointer outline-none hover:bg-teal/5 focus-visible:bg-teal/5 focus-visible:ring-2 focus-visible:ring-teal/30"
                onClick={() => onSelect(row.jurisdiction)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(row.jurisdiction);
                  }
                }}
              >
                <td className="px-3 py-3">
                  <div className="font-semibold text-ink">{row.jurisdiction.name}</div>
                  <div className="mt-1 text-xs text-slate-500">{row.jurisdiction.code}</div>
                </td>
                <td className="px-3 py-3">
                  <CoverageConfidenceBadge level={row.level} />
                </td>
                <td className="px-3 py-3 font-semibold text-ink">{row.confidenceScore}/100</td>
                <td className="px-3 py-3 text-slate-600">
                  {row.directCount}/{row.targetCount}
                  {row.missingDirectRecords ? <span className="ml-2 text-xs font-semibold text-amber-700">{row.missingDirectRecords} gap</span> : null}
                </td>
                <td className="px-3 py-3 text-slate-600">{row.prioritySourceCount}/{row.scopedCount || 0}</td>
                <td className="px-3 py-3 text-slate-600">{row.highConfidenceCount}/{row.scopedCount || 0}</td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-1">
                    <Badge className={row.reviewFlagCount ? "border-amber-200 bg-amber-50 text-amber-800" : "border-teal/20 bg-teal/10 text-teal"}>
                      {row.reviewFlagCount} review
                    </Badge>
                    <Badge className={row.staleCount ? "border-red-200 bg-red-50 text-red-700" : "border-slate-200 bg-slate-50 text-slate-600"}>
                      {row.staleCount} stale
                    </Badge>
                    <Badge className={row.dateSensitiveCount ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-slate-50 text-slate-600"}>
                      {row.dateSensitiveCount} date
                    </Badge>
                  </div>
                </td>
                <td className="max-w-md px-3 py-3 text-sm leading-6 text-slate-500">{row.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</div>
        <Icon className="h-4 w-4 text-teal" />
      </div>
      <div className="mt-2 text-2xl font-bold text-ink">{value}</div>
    </div>
  );
}

function sum(rows: ReturnType<typeof coverageConfidenceForJurisdiction>[], key: "prioritySourceCount" | "scopedCount" | "highConfidenceCount" | "reviewFlagCount") {
  return rows.reduce((total, row) => total + row[key], 0);
}
