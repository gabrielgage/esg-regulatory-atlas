import { CheckCircle2, CircleAlert, Gauge } from "lucide-react";
import { Badge } from "./Badge";
import { coverageTargetByJurisdiction, coverageTierLabel } from "@/data/coverageTargets";
import { Jurisdiction, Regulation } from "@/types/regulation";
import { cn } from "@/lib/utils";

export function CoverageDepthPanel({
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
    .map((jurisdiction) => {
      const target = coverageTargetByJurisdiction.get(jurisdiction.id);
      const directRecords = regulations.filter((regulation) => regulation.jurisdictionIds.includes(jurisdiction.id));
      const directCount = directRecords.length;
      const targetCount = target?.targetDirectRecords || 3;
      const missing = Math.max(0, targetCount - directCount);
      const reviewRisk = directRecords.filter((regulation) => ["needs_review", "date_uncertain", "source_missing"].includes(regulation.dataQualityStatus)).length;

      return {
        jurisdiction,
        directCount,
        target,
        targetCount,
        missing,
        reviewRisk
      };
    })
    .sort((a, b) => b.missing - a.missing || a.jurisdiction.name.localeCompare(b.jurisdiction.name));

  const complete = rows.filter((row) => row.missing === 0).length;
  const gaps = rows.filter((row) => row.missing > 0).length;
  const recordsNeeded = rows.reduce((total, row) => total + row.missing, 0);

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Market coverage depth</h2>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Launch targets compare direct seed records per market against the minimum depth needed for a credible profile. This is a coverage-management signal, not a statement of complete legal coverage.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-teal/20 bg-teal/10 text-teal">{complete} at target</Badge>
          <Badge className={gaps ? "border-amber-200 bg-amber-50 text-amber-800" : "border-teal/20 bg-teal/10 text-teal"}>{gaps} gaps</Badge>
          <Badge className="border-slate-200 bg-slate-50 text-slate-600">{recordsNeeded} records needed</Badge>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">Market</th>
              <th className="px-3 py-2">Target tier</th>
              <th className="px-3 py-2">Direct records</th>
              <th className="px-3 py-2">Target</th>
              <th className="px-3 py-2">Gap</th>
              <th className="px-3 py-2">Review risk</th>
              <th className="px-3 py-2">Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr
                key={row.jurisdiction.id}
                role="button"
                aria-label={`Open ${row.jurisdiction.name} coverage profile`}
                className="cursor-pointer outline-none hover:bg-teal/5 focus-visible:bg-teal/5 focus-visible:ring-2 focus-visible:ring-teal/30"
                tabIndex={0}
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
                  <Badge className="border-slate-200 bg-slate-50 text-slate-600">
                    {row.target ? coverageTierLabel[row.target.tier] : "Default watch"}
                  </Badge>
                </td>
                <td className="px-3 py-3 font-semibold text-ink">{row.directCount}</td>
                <td className="px-3 py-3 text-slate-600">{row.targetCount}</td>
                <td className="px-3 py-3">
                  <DepthStatus missing={row.missing} />
                </td>
                <td className="px-3 py-3">
                  <Badge className={row.reviewRisk ? "border-amber-200 bg-amber-50 text-amber-800" : "border-teal/20 bg-teal/10 text-teal"}>
                    {row.reviewRisk ? `${row.reviewRisk} needs review` : "low"}
                  </Badge>
                </td>
                <td className="max-w-md px-3 py-3 text-sm leading-6 text-slate-500">
                  {row.target?.rationale || "Default watch coverage target for tracked jurisdictions."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DepthStatus({ missing }: { missing: number }) {
  return (
    <span className={cn("inline-flex items-center gap-1 font-semibold", missing ? "text-amber-700" : "text-teal")}>
      {missing ? <CircleAlert className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
      {missing ? `${missing} missing` : "at target"}
    </span>
  );
}
