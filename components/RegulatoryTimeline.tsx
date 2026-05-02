import { CalendarRange, Clock3 } from "lucide-react";
import { Badge } from "./Badge";
import { StatusBadge } from "./StatusBadge";
import { Regulation } from "@/types/regulation";
import { formatDate } from "@/lib/utils";

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
    .slice(0, 24);
  const groups = groupMilestones(dated);

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

      <div className="mt-4 space-y-5">
        {groups.length ? (
          groups.map((group) => (
            <div key={group.year} className="relative border-l border-slate-200 pl-4">
              <div className="sticky top-20 z-10 mb-3 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-bold text-ink shadow-sm">
                {group.year}
              </div>
              <div className="space-y-3">
                {group.items.map((regulation) => {
                  const milestone = milestoneFor(regulation);
                  return (
                    <button
                      key={regulation.id}
                      type="button"
                      onClick={() => onSelect(regulation)}
                      className="grid w-full gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-teal/40 hover:bg-teal/5 md:grid-cols-[155px_1fr_auto]"
                    >
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{milestone.type}</div>
                        <div className="mt-1 text-lg font-bold text-ink">{milestone.label}</div>
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
                        <StatusBadge status={regulation.status} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
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

function groupMilestones(regulations: Regulation[]) {
  const groups = new Map<string, Regulation[]>();
  regulations.forEach((regulation) => {
    const year = String(milestoneYear(regulation) || "Unscheduled");
    groups.set(year, [...(groups.get(year) || []), regulation]);
  });
  return Array.from(groups.entries()).map(([year, items]) => ({ year, items }));
}

function milestoneFor(regulation: Regulation) {
  if (regulation.firstReportingYear) return { type: "First reporting", label: String(regulation.firstReportingYear) };
  if (regulation.firstReportDueDate) return { type: "First report due", label: formatDate(regulation.firstReportDueDate) };
  if (regulation.consultationDeadline) return { type: "Consultation", label: formatDate(regulation.consultationDeadline) };
  return { type: "Effective date", label: formatDate(regulation.effectiveDate) };
}

function milestoneYear(regulation: Regulation) {
  if (regulation.firstReportingYear) return regulation.firstReportingYear;
  const candidates = [regulation.firstReportDueDate, regulation.consultationDeadline, regulation.effectiveDate];
  for (const candidate of candidates) {
    if (!candidate || candidate.toLowerCase().includes("uncertain")) continue;
    const date = new Date(`${candidate}T00:00:00`);
    if (!Number.isNaN(date.getTime())) return date.getFullYear();
  }
  return null;
}
