import { ArrowRight, CalendarDays, CheckCircle2, ClipboardList } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { latestDailyUpdate } from "@/data/dailyUpdates";

export function DailyUpdatePulse({ compact = false }: { compact?: boolean }) {
  const update = latestDailyUpdate;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" data-testid="daily-launch-pulse">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-teal/20 bg-teal/10 text-teal">Daily launch pulse</Badge>
            <Badge className="border-slate-200 bg-slate-50 text-slate-600">{update.edition}</Badge>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
              <CalendarDays className="h-3.5 w-3.5" />
              {update.date}
            </span>
          </div>
          <h2 className="mt-3 text-xl font-semibold text-ink">{update.headline}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            A concise operating note for what just shipped, how it should be validated and what the next product-review pass should prioritize.
          </p>
        </div>
        <Link
          href="/data-quality"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:border-teal/40 hover:bg-teal/5 hover:text-teal"
        >
          Review governance <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className={compact ? "mt-4 grid gap-3 lg:grid-cols-2" : "mt-5 grid gap-4 lg:grid-cols-3"}>
        <PulseList icon="shipped" title="Shipped" items={update.shipped} />
        <PulseList icon="validation" title="Validation" items={update.validation} />
        {!compact ? <PulseList icon="next" title="Next focus" items={update.nextFocus} /> : null}
      </div>

      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">{update.caveat}</p>
    </section>
  );
}

function PulseList({ icon, title, items }: { icon: "shipped" | "validation" | "next"; title: string; items: string[] }) {
  const Icon = icon === "next" ? ClipboardList : CheckCircle2;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-teal" />
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
      </div>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
