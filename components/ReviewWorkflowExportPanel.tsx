"use client";

import { ClipboardList, Download, FileJson, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import {
  buildReviewWorkflowRows,
  reviewWorkflowCsv,
  reviewWorkflowJson,
  reviewWorkflowMarkdown
} from "@/lib/reviewWorkflow";
import type { Regulation } from "@/types/regulation";

export function ReviewWorkflowExportPanel({
  regulations,
  onSelect
}: {
  regulations: Regulation[];
  onSelect: (regulation: Regulation) => void;
}) {
  const rows = buildReviewWorkflowRows(regulations);
  const topRows = rows.slice(0, 8);
  const premiumBlocked = rows.filter((row) => row.decisionGate === "Premium use blocked").length;
  const sourceAttention = rows.filter((row) =>
    ["Source missing", "Priority source needed", "Stale source review", "Upcoming review"].includes(row.sourcePosture)
  ).length;
  const highPriority = rows.filter((row) => row.reviewPriority >= 12).length;

  function exportCsv() {
    download(`etica-esg-review-workflow-${dateStamp()}.csv`, reviewWorkflowCsv(rows), "text/csv");
  }

  function exportJson() {
    download(`etica-esg-review-workflow-${dateStamp()}.json`, reviewWorkflowJson(rows), "application/json");
  }

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Review workflow export</h2>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Export the static seed dataset into a source-review tracker or copy the highest-priority review packet for Notion, advisory prep or content QA. This is a workflow aid, not a legal verification record.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
          >
            <Download className="h-4 w-4 text-teal" />
            Export review CSV
          </button>
          <button
            type="button"
            onClick={exportJson}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
          >
            <FileJson className="h-4 w-4 text-teal" />
            Export review JSON
          </button>
          <CopyMarkdownButton text={reviewWorkflowMarkdown(rows)} label="Copy priority review packet" />
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <Metric label="Tracked records" value={String(rows.length)} detail="All static regulation records" />
        <Metric label="High priority" value={String(highPriority)} detail="Score 12+ in review queue" />
        <Metric label="Premium blocked" value={String(premiumBlocked)} detail="Do not use in premium examples yet" />
        <Metric label="Source attention" value={String(sourceAttention)} detail="Missing, stale or due soon" />
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">Priority</th>
              <th className="px-3 py-2">Regime</th>
              <th className="px-3 py-2">Decision gate</th>
              <th className="px-3 py-2">Source posture</th>
              <th className="px-3 py-2">Owner</th>
              <th className="px-3 py-2">Next action</th>
              <th className="px-3 py-2">Record</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {topRows.map((row) => {
              const regulation = regulations.find((item) => item.id === row.id);
              return (
                <tr key={row.id}>
                  <td className="px-3 py-3 align-top">
                    <Badge className={priorityClass(row.reviewPriority)}>{row.reviewPriority}</Badge>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <div className="font-semibold text-ink">{row.shortName}</div>
                    <div className="mt-1 text-xs text-slate-500">{row.jurisdiction} · {row.premiumSurface}</div>
                  </td>
                  <td className="px-3 py-3 align-top text-slate-600">{row.decisionGate}</td>
                  <td className="px-3 py-3 align-top text-slate-600">{row.sourcePosture}</td>
                  <td className="px-3 py-3 align-top text-slate-600">{row.owner}</td>
                  <td className="px-3 py-3 align-top text-slate-600">{row.sourceNextAction}</td>
                  <td className="px-3 py-3 align-top">
                    {regulation ? (
                      <button type="button" onClick={() => onSelect(regulation)} className="text-sm font-semibold text-teal underline">
                        Open
                      </button>
                    ) : (
                      <span className="text-red-700">Missing</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 flex gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
        Exported review files are operational trackers for source QA and advisory planning. They must keep the included caveat and should not be treated as legal opinions, official translations or verified compliance determinations.
      </p>
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

function priorityClass(score: number) {
  if (score >= 16) return "border-red-200 bg-red-50 text-red-700";
  if (score >= 12) return "border-amber-200 bg-amber-50 text-amber-800";
  if (score >= 8) return "border-violet/20 bg-violet/10 text-violet";
  return "border-teal/20 bg-teal/10 text-teal";
}

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function dateStamp() {
  return new Date().toISOString().slice(0, 10);
}
