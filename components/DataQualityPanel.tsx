import { ClipboardList, Link2, ShieldCheck, TriangleAlert } from "lucide-react";
import { Badge } from "./Badge";
import { Regulation } from "@/types/regulation";
import { formatDate } from "@/lib/utils";

const qualityLabels: Record<Regulation["dataQualityStatus"], string> = {
  verified_seed: "Verified source set",
  needs_review: "Needs review",
  recently_updated: "Recently updated",
  date_uncertain: "Date uncertain",
  source_missing: "Source missing"
};

export function DataQualityPanel({
  regulations,
  onSelect
}: {
  regulations: Regulation[];
  onSelect: (regulation: Regulation) => void;
}) {
  const total = regulations.length;
  const sourceCount = regulations.reduce((count, regulation) => count + regulation.sourceUrls.length, 0);
  const sourced = regulations.filter((regulation) => regulation.sourceUrls.length > 0).length;
  const sourceCoverage = total ? Math.round((sourced / total) * 100) : 0;
  const upcomingReview = regulations.filter((regulation) => isDueSoon(regulation.nextReviewDate)).length;
  const highImpactNeedsReview = regulations.filter(
    (regulation) => regulation.highImpact && ["needs_review", "date_uncertain", "source_missing"].includes(regulation.dataQualityStatus)
  ).length;
  const reviewQueue = regulations
    .filter(
      (regulation) =>
        ["needs_review", "date_uncertain", "source_missing"].includes(regulation.dataQualityStatus) ||
        isDueSoon(regulation.nextReviewDate) ||
        regulation.sourceUrls.length === 0
    )
    .sort((a, b) => Number(Boolean(b.highImpact)) - Number(Boolean(a.highImpact)) || String(a.nextReviewDate || "").localeCompare(String(b.nextReviewDate || "")))
    .slice(0, 10);
  const statusRows = Object.entries(qualityLabels).map(([status, label]) => ({
    status: status as Regulation["dataQualityStatus"],
    label,
    count: regulations.filter((regulation) => regulation.dataQualityStatus === status).length
  }));

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Review queue</h2>
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Shows whether the current view is source-backed, recently reviewed or queued for deeper production research.
          </p>
        </div>
        <Badge className="border-slate-200 bg-slate-50 text-slate-600">Methodology control</Badge>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={ShieldCheck} label="Source coverage" value={`${sourceCoverage}%`} detail={`${sourced}/${total || 0} records have source links`} />
        <Metric icon={Link2} label="Source links" value={String(sourceCount)} detail="primary, regulator and secondary links" />
        <Metric icon={TriangleAlert} label="Review queue" value={String(reviewQueue.length)} detail="records needing production research" />
        <Metric icon={TriangleAlert} label="Priority checks" value={String(highImpactNeedsReview)} detail={`${upcomingReview} records have upcoming review dates`} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="text-sm font-semibold text-ink">Data quality status</h3>
          <div className="mt-3 space-y-3">
            {statusRows.map((row) => (
              <div key={row.status} className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-600">{row.label}</span>
                <Badge className={qualityClass(row.status)}>{row.count}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="text-sm font-semibold text-ink">Research queue</h3>
          <div className="mt-3 space-y-3">
            {reviewQueue.length ? (
              reviewQueue.map((regulation) => (
                <button
                  key={regulation.id}
                  type="button"
                  onClick={() => onSelect(regulation)}
                  className="w-full rounded-lg bg-slate-50 p-3 text-left hover:bg-teal/5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-ink">{regulation.shortName}</span>
                    <Badge className={qualityClass(regulation.dataQualityStatus)}>{qualityLabels[regulation.dataQualityStatus]}</Badge>
                  </div>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Next review: {formatDate(regulation.nextReviewDate)}. {regulation.latestUpdate}
                  </p>
                </button>
              ))
            ) : (
              <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">No research queue items in the current filters.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  detail
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</div>
        <Icon className="h-4 w-4 text-teal" />
      </div>
      <div className="mt-2 text-2xl font-bold text-ink">{value}</div>
      <p className="mt-1 text-sm text-slate-500">{detail}</p>
    </div>
  );
}

function qualityClass(status: Regulation["dataQualityStatus"]) {
  if (status === "verified_seed") return "border-teal/20 bg-teal/10 text-teal";
  if (status === "recently_updated") return "border-blue-200 bg-blue-50 text-blue-700";
  if (status === "needs_review") return "border-amber-200 bg-amber-50 text-amber-800";
  if (status === "date_uncertain") return "border-violet/20 bg-violet/10 text-violet";
  return "border-red-200 bg-red-50 text-red-700";
}

function isDueSoon(date?: string) {
  if (!date) return false;
  const reviewDate = new Date(date);
  if (Number.isNaN(reviewDate.getTime())) return false;
  const ninetyDays = 1000 * 60 * 60 * 24 * 90;
  return reviewDate.getTime() - Date.now() <= ninetyDays;
}
