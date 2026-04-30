import { ArrowUpRight, Database, ShieldAlert } from "lucide-react";
import { Badge } from "./Badge";
import { Regulation } from "@/types/regulation";
import { cn, statusClass, statusLabel } from "@/lib/utils";

export function RegulationTable({ regulations, onSelect }: { regulations: Regulation[]; onSelect: (r: Regulation) => void }) {
  if (!regulations.length) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
        <ShieldAlert className="mx-auto h-8 w-8 text-amber-500" />
        <h2 className="mt-3 text-lg font-semibold text-ink">No regulations match these filters</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
          No regulations match the current filters. Try clearing filters or selecting a broader quick view.
        </p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Regulation database</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">{regulations.length} illustrative records in the current view</p>
        </div>
        <Badge className="border-amber-200 bg-amber-50 text-amber-800">Seed data, not legal advice</Badge>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Regulation</th>
              <th className="px-5 py-3">Jurisdiction</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Impact</th>
              <th className="px-5 py-3">First reporting</th>
              <th className="px-5 py-3">Data quality</th>
              <th className="px-5 py-3">Open</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {regulations.map((regulation) => (
              <tr
                key={regulation.id}
                onClick={() => onSelect(regulation)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") onSelect(regulation);
                }}
                tabIndex={0}
                className="cursor-pointer hover:bg-slate-50 focus:bg-teal/5"
              >
                <td className="px-5 py-4">
                  <div className="font-semibold text-ink">{regulation.shortName}</div>
                  <div className="mt-1 max-w-xl text-slate-500">{regulation.title}</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {regulation.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} className="border-slate-200 bg-slate-50 text-slate-600">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-medium text-ink">{regulation.jurisdiction}</div>
                  <div className="mt-1 text-xs capitalize text-slate-500">{regulation.jurisdictionType}</div>
                </td>
                <td className="px-5 py-4">
                  <Badge className={statusClass[regulation.status]}>{statusLabel[regulation.status]}</Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex max-w-xs flex-wrap gap-1">
                    {regulation.businessImpacts.slice(0, 3).map((impact) => (
                      <Badge key={impact} className="border-teal/20 bg-teal/10 text-teal">
                        {impact}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4">{regulation.firstReportingYear || "n/a"}</td>
                <td className="px-5 py-4">
                  <Badge className={qualityClass(regulation.dataQualityStatus)}>{regulation.dataQualityStatus.replaceAll("_", " ")}</Badge>
                </td>
                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelect(regulation);
                    }}
                    className="rounded-full border border-slate-200 p-2 text-slate-500 hover:border-teal/40 hover:bg-teal/5 hover:text-teal"
                    aria-label={`Open ${regulation.shortName}`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function qualityClass(status: Regulation["dataQualityStatus"]) {
  return cn(
    status === "verified_seed" && "border-teal/20 bg-teal/10 text-teal",
    status === "recently_updated" && "border-blue-200 bg-blue-50 text-blue-700",
    status === "needs_review" && "border-amber-200 bg-amber-50 text-amber-800",
    status === "date_uncertain" && "border-violet/20 bg-violet/10 text-violet",
    status === "source_missing" && "border-red-200 bg-red-50 text-red-700"
  );
}
