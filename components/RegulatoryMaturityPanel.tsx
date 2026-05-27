import { CalendarClock, FileSearch2, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/Badge";
import { maturityFor } from "@/lib/regulatoryMaturity";
import { cn } from "@/lib/utils";
import type { Regulation } from "@/types/regulation";

export function RegulatoryMaturityPanel({ regulation, compact = false }: { regulation: Regulation; compact?: boolean }) {
  const maturity = maturityFor(regulation);

  return (
    <section
      data-testid="regulatory-maturity-panel"
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900",
        compact ? "p-4" : "p-5"
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Regulatory maturity</p>
          <h2 className={cn("mt-2 font-bold tracking-tight text-ink", compact ? "text-base" : "text-xl")}>{maturity.label}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{maturity.summary}</p>
        </div>
        <Badge className={cn("shrink-0", maturity.className)}>{maturity.id.replaceAll("-", " ")}</Badge>
      </div>

      <div className={cn("grid gap-3", compact ? "mt-4" : "mt-5 md:grid-cols-3")}>
        <MaturitySignal icon={CalendarClock} title="Planning use" body={maturity.planningUse} />
        <MaturitySignal icon={FileSearch2} title="Facts to verify" body={maturity.factsToVerify.join("; ")} />
        <MaturitySignal icon={ShieldAlert} title="Caution" body={maturity.caution} />
      </div>

      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
        Maturity is derived from Atlas seed status, legal-force and display-tier metadata. It is a planning aid, not a legal conclusion about applicability,
        enforceability, timing or completeness.
      </p>
    </section>
  );
}

function MaturitySignal({
  icon: Icon,
  title,
  body
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/80">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        <Icon className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
        {title}
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{body}</p>
    </article>
  );
}
