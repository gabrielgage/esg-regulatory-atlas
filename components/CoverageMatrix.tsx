import { BarChart3, CheckCircle2, CircleAlert } from "lucide-react";
import { Badge } from "./Badge";
import { Jurisdiction, Regulation } from "@/types/regulation";
import { internationalRecords, localRecords, recordsForJurisdiction, sectoralRecords } from "@/lib/layers";
import { cn } from "@/lib/utils";

export function CoverageMatrix({
  jurisdictions,
  regulations,
  selectedId,
  onSelect
}: {
  jurisdictions: Jurisdiction[];
  regulations: Regulation[];
  selectedId?: string;
  onSelect: (jurisdiction: Jurisdiction) => void;
}) {
  const rows = jurisdictions
    .filter((jurisdiction) => jurisdiction.type !== "international")
    .map((jurisdiction) => {
      const applicable = recordsForJurisdiction(jurisdiction, regulations);
      return {
        jurisdiction,
        applicable,
        international: internationalRecords(regulations).length,
        local: localRecords(jurisdiction, applicable).length,
        sectoral: sectoralRecords(jurisdiction, applicable).length,
        sourced: applicable.filter((regulation) => regulation.sourceUrls.length).length,
        needsReview: applicable.filter((regulation) => ["needs_review", "date_uncertain", "source_missing"].includes(regulation.dataQualityStatus)).length
      };
    })
    .sort((a, b) => b.applicable.length - a.applicable.length);

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Coverage matrix</h2>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Snapshot of layer depth and research readiness across tracked jurisdictions in the current filter view.
          </p>
        </div>
        <Badge className="border-slate-200 bg-slate-50 text-slate-600">{rows.length} jurisdictions</Badge>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">Jurisdiction</th>
              <th className="px-3 py-2">Records</th>
              <th className="px-3 py-2">International</th>
              <th className="px-3 py-2">Local</th>
              <th className="px-3 py-2">Sectoral/regional</th>
              <th className="px-3 py-2">Sources</th>
              <th className="px-3 py-2">Review risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr
                key={row.jurisdiction.id}
                className={cn("cursor-pointer hover:bg-teal/5", selectedId === row.jurisdiction.id && "bg-teal/5")}
                onClick={() => onSelect(row.jurisdiction)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") onSelect(row.jurisdiction);
                }}
                tabIndex={0}
              >
                <td className="px-3 py-3">
                  <div className="font-semibold text-ink">{row.jurisdiction.name}</div>
                  <div className="mt-1 text-xs capitalize text-slate-500">{row.jurisdiction.type}</div>
                </td>
                <td className="px-3 py-3 font-semibold text-ink">{row.applicable.length}</td>
                <td className="px-3 py-3"><LayerCount value={row.international} /></td>
                <td className="px-3 py-3"><LayerCount value={row.local} /></td>
                <td className="px-3 py-3"><LayerCount value={row.sectoral} /></td>
                <td className="px-3 py-3">
                  <Badge className={row.sourced === row.applicable.length && row.applicable.length ? "border-teal/20 bg-teal/10 text-teal" : "border-amber-200 bg-amber-50 text-amber-800"}>
                    {row.sourced}/{row.applicable.length}
                  </Badge>
                </td>
                <td className="px-3 py-3">
                  <Badge className={row.needsReview ? "border-amber-200 bg-amber-50 text-amber-800" : "border-teal/20 bg-teal/10 text-teal"}>
                    {row.needsReview ? `${row.needsReview} review` : "clear"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function LayerCount({ value }: { value: number }) {
  return (
    <span className={cn("inline-flex items-center gap-1 font-semibold", value ? "text-teal" : "text-slate-400")}>
      {value ? <CheckCircle2 className="h-4 w-4" /> : <CircleAlert className="h-4 w-4" />}
      {value}
    </span>
  );
}
