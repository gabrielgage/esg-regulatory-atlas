import { maturityCounts, type RegulatoryMaturityId } from "@/lib/regulatoryMaturity";
import type { Regulation } from "@/types/regulation";

const maturityOrder: { id: RegulatoryMaturityId; label: string; description: string }[] = [
  { id: "in-force", label: "In force", description: "Currently operative planning records" },
  { id: "first-reporting", label: "First reporting", description: "Early filing or first reporting signals" },
  { id: "transition", label: "Transitional", description: "Phased, relief or implementation timing" },
  { id: "adopted", label: "Adopted", description: "Adopted but not fully operating" },
  { id: "consultation", label: "Consultation", description: "Proposed or under consultation" },
  { id: "paused", label: "Paused", description: "Delayed, stayed or uncertain" },
  { id: "voluntary", label: "Voluntary", description: "Framework or market-practice led" },
  { id: "monitor", label: "Monitor", description: "Watchlist or horizon-scanning signal" }
];

const maturityTone: Record<RegulatoryMaturityId, string> = {
  "in-force": "bg-teal/15 text-teal dark:bg-teal/20 dark:text-teal-100",
  "first-reporting": "bg-teal/15 text-teal dark:bg-teal/20 dark:text-teal-100",
  transition: "bg-violet/10 text-violet dark:bg-violet/20 dark:text-violet-100",
  adopted: "bg-blue-50 text-blue-800 dark:bg-blue-400/10 dark:text-blue-100",
  consultation: "bg-amber-50 text-amber-900 dark:bg-amber-400/10 dark:text-amber-100",
  paused: "bg-red-50 text-red-800 dark:bg-red-400/10 dark:text-red-100",
  voluntary: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  monitor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
};

export function MaturityDistributionPanel({ regulations }: { regulations: Regulation[] }) {
  const counts = maturityCounts(regulations);
  const total = regulations.length || 1;
  const operatingCount = (counts["in-force"] || 0) + (counts["first-reporting"] || 0) + (counts.transition || 0);
  const watchCount = (counts.consultation || 0) + (counts.paused || 0) + (counts.monitor || 0);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Maturity distribution</p>
          <h2 className="mt-2 text-xl font-semibold text-ink">Planning status across the seed dataset</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            This view separates operative, transitional, proposed, voluntary and monitor records so source reviewers can avoid treating every tracked item as the same kind of obligation.
          </p>
        </div>
        <div className="grid min-w-64 grid-cols-2 gap-3 text-sm">
          <SummaryMetric label="Operating / phased" value={operatingCount} />
          <SummaryMetric label="Watch / uncertain" value={watchCount} />
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {maturityOrder.map((item) => {
          const count = counts[item.id] || 0;
          const percent = Math.round((count / total) * 100);
          return (
            <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-ink">{item.label}</h3>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${maturityTone[item.id]}`}>{count}</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{item.description}</p>
              <div className="mt-3 h-2 rounded-full bg-white dark:bg-slate-900" aria-hidden="true">
                <div className="h-2 rounded-full bg-teal" style={{ width: `${percent}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{percent}% of tracked seed records</p>
            </article>
          );
        })}
      </div>

      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
        Maturity counts are derived from Atlas seed metadata. They are quality and planning signals, not legal conclusions about applicability, enforceability or complete market coverage.
      </p>
    </section>
  );
}

function SummaryMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/80">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}
