import { CalendarRange, Clock3 } from "lucide-react";
import { Badge } from "./Badge";
import { StatusBadge } from "./StatusBadge";
import { Regulation } from "@/types/regulation";
import { formatDate } from "@/lib/utils";

type TimelineMilestone = {
  id: string;
  type: "Consultation" | "Effective date" | "First reporting year" | "First report due" | "Atlas review";
  label: string;
  year: string;
  quarter: string;
  sortKey: number;
  regulation: Regulation;
  planningUse: string;
};

export function RegulatoryTimeline({
  regulations,
  onSelect
}: {
  regulations: Regulation[];
  onSelect: (regulation: Regulation) => void;
}) {
  const allMilestones = buildMilestones(regulations).sort((a, b) => a.sortKey - b.sortKey || a.regulation.shortName.localeCompare(b.regulation.shortName));
  const milestones = allMilestones.slice(0, 80);
  const groups = groupMilestones(milestones);

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarRange className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Regulatory timeline</h2>
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Quarter-level view of consultation deadlines, effective dates, first reporting years, report due dates and Atlas review milestones in the current filter set.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-slate-200 bg-slate-50 text-slate-600">
            {milestones.length}
            {allMilestones.length > milestones.length ? `/${allMilestones.length}` : ""} milestones
          </Badge>
          <Badge className="border-amber-200 bg-amber-50 text-amber-800">Date-sensitive</Badge>
        </div>
      </div>

      <div className="mt-4 space-y-5">
        {groups.length ? (
          groups.map((group) => (
            <div key={group.year} className="relative border-l border-slate-200 pl-4">
              <div className="sticky top-20 z-10 mb-3 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-bold text-ink shadow-sm">
                {group.year}
              </div>
              <div className="space-y-4">
                {group.quarters.map((quarter) => (
                  <div key={`${group.year}-${quarter.quarter}`}>
                    <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">{quarter.quarter}</div>
                    <div className="space-y-3">
                      {quarter.items.map((milestone) => (
                        <button
                          key={milestone.id}
                          type="button"
                          onClick={() => onSelect(milestone.regulation)}
                          className="grid w-full gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-teal/40 hover:bg-teal/5 md:grid-cols-[165px_1fr_auto]"
                        >
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{milestone.type}</div>
                            <div className="mt-1 text-lg font-bold text-ink">{milestone.label}</div>
                            <p className="mt-2 text-xs leading-5 text-slate-500">{milestone.planningUse}</p>
                          </div>
                          <div>
                            <div className="font-semibold text-ink">{milestone.regulation.shortName}</div>
                            <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">{milestone.regulation.summary}</p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {milestone.regulation.businessImpacts.slice(0, 2).map((impact) => (
                                <Badge key={impact} className="border-teal/20 bg-teal/10 text-teal">
                                  {impact}
                                </Badge>
                              ))}
                              <Badge className={qualityClass(milestone.regulation)}>{qualityLabel(milestone.regulation)}</Badge>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 md:justify-end">
                            <StatusBadge status={milestone.regulation.status} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
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

function buildMilestones(regulations: Regulation[]) {
  return regulations.flatMap((regulation) => {
    const milestones: TimelineMilestone[] = [];
    addDatedMilestone(milestones, regulation, "Consultation", regulation.consultationDeadline, "Track consultation response, policy position and likely finalization.");
    addDatedMilestone(milestones, regulation, "Effective date", regulation.effectiveDate, "Confirm whether obligations, transitional provisions or local transposition are active.");
    if (regulation.firstReportingYear) {
      milestones.push({
        id: `${regulation.id}-first-reporting-${regulation.firstReportingYear}`,
        type: "First reporting year",
        label: `FY ${regulation.firstReportingYear}`,
        year: String(regulation.firstReportingYear),
        quarter: "Q1",
        sortKey: regulation.firstReportingYear * 10000 + 100,
        regulation,
        planningUse: "Start readiness calendar, data ownership and control design for the reporting cycle."
      });
    }
    addDatedMilestone(milestones, regulation, "First report due", regulation.firstReportDueDate, "Back-solve reporting, assurance and approval deadlines from the due date.");
    addDatedMilestone(milestones, regulation, "Atlas review", regulation.nextReviewDate, "Refresh sources, dates and confidence before client or compliance reliance.");
    return milestones;
  });
}

function addDatedMilestone(
  milestones: TimelineMilestone[],
  regulation: Regulation,
  type: TimelineMilestone["type"],
  value: string | undefined,
  planningUse: string
) {
  const parsed = parseDate(value);
  if (!parsed) return;
  milestones.push({
    id: `${regulation.id}-${type.toLowerCase().replaceAll(" ", "-")}-${value}`,
    type,
    label: formatDate(value),
    year: String(parsed.year),
    quarter: parsed.quarter,
    sortKey: parsed.sortKey,
    regulation,
    planningUse
  });
}

function parseDate(value?: string) {
  if (!value || value.toLowerCase().includes("uncertain") || value.toLowerCase().includes("market") || value.toLowerCase().includes("stayed")) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  const month = date.getMonth();
  return {
    year: date.getFullYear(),
    quarter: `Q${Math.floor(month / 3) + 1}`,
    sortKey: date.getFullYear() * 10000 + (month + 1) * 100 + date.getDate()
  };
}

function groupMilestones(milestones: TimelineMilestone[]) {
  const groups = new Map<string, Map<string, TimelineMilestone[]>>();
  milestones.forEach((milestone) => {
    const quarterMap = groups.get(milestone.year) || new Map<string, TimelineMilestone[]>();
    quarterMap.set(milestone.quarter, [...(quarterMap.get(milestone.quarter) || []), milestone]);
    groups.set(milestone.year, quarterMap);
  });
  return Array.from(groups.entries()).map(([year, quarterMap]) => ({
    year,
    quarters: Array.from(quarterMap.entries()).map(([quarter, items]) => ({ quarter, items }))
  }));
}

function qualityLabel(regulation: Regulation) {
  if (regulation.dataQualityStatus === "verified_seed" && regulation.confidenceLevel === "high") return "source-backed";
  if (regulation.dataQualityStatus === "date_uncertain") return "date risk";
  if (regulation.dataQualityStatus === "needs_review") return "review needed";
  if (regulation.dataQualityStatus === "source_missing") return "source missing";
  return "check source";
}

function qualityClass(regulation: Regulation) {
  if (regulation.dataQualityStatus === "verified_seed" && regulation.confidenceLevel === "high") return "border-teal/20 bg-teal/10 text-teal";
  if (regulation.dataQualityStatus === "date_uncertain") return "border-violet/20 bg-violet/10 text-violet";
  if (regulation.dataQualityStatus === "needs_review") return "border-amber-200 bg-amber-50 text-amber-800";
  if (regulation.dataQualityStatus === "source_missing") return "border-red-200 bg-red-50 text-red-700";
  return "border-slate-200 bg-slate-50 text-slate-600";
}
