import { CalendarRange, Clock3 } from "lucide-react";
import { Badge } from "./Badge";
import { Regulation } from "@/types/regulation";
import { formatDate, statusClass, statusLabel } from "@/lib/utils";

export function RegulatoryTimeline({
  regulations,
  onSelect
}: {
  regulations: Regulation[];
  onSelect: (regulation: Regulation) => void;
}) {
  const dated = regulations
    .filter((regulation) => regulation.firstReportingYear || !regulation.effectiveDate.toLowerCase().includes("uncertain"))
    .sort((a, b) => sortValue(a) - sortValue(b))
    .slice(0, 9);

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarRange className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Regulatory timeline</h2>
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Sorted view of effective dates and first reporting years in the current filter set, designed for readiness planning.
          </p>
        </div>
        <Badge className="border-slate-200 bg-slate-50 text-slate-600">{dated.length} dated milestones</Badge>
      </div>

      <div className="mt-4 space-y-3">
        {dated.length ? (
          dated.map((regulation) => (
            <button
              key={regulation.id}
              type="button"
              onClick={() => onSelect(regulation)}
              className="grid w-full gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-teal/40 hover:bg-teal/5 md:grid-cols-[140px_1fr_auto]"
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Milestone</div>
                <div className="mt-1 text-lg font-bold text-ink">{regulation.firstReportingYear || formatDate(regulation.effectiveDate)}</div>
              </div>
              <div>
                <div className="font-semibold text-ink">{regulation.shortName}</div>
                <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">{regulation.summary}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {regulation.businessImpacts.slice(0, 2).map((impact) => (
                    <Badge key={impact} className="border-teal/20 bg-teal/10 text-teal">
                      {impact}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2 md:justify-end">
                <Badge className={statusClass[regulation.status]}>{statusLabel[regulation.status]}</Badge>
              </div>
            </button>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
            No dated milestones match the current filters.
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <Clock3 className="h-3.5 w-3.5" />
        Date-sensitive planning should be checked against primary sources before reliance.
      </div>
    </section>
  );
}

function sortValue(regulation: Regulation) {
  if (regulation.firstReportingYear) return regulation.firstReportingYear * 10000;
  const date = new Date(`${regulation.effectiveDate}T00:00:00`);
  if (!Number.isNaN(date.getTime())) return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
  return 99999999;
}
