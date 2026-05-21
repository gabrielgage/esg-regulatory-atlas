import { CheckCircle2, FileSearch, ShieldAlert, Signal } from "lucide-react";
import { cn } from "@/lib/utils";

const signals = [
  {
    icon: FileSearch,
    title: "Record counts",
    body: "Counts show current tracked seed records in the Atlas. They are not a complete legal inventory for a market, sector or topic."
  },
  {
    icon: Signal,
    title: "Source-link rate",
    body: "A source link means a public source has been captured. It does not mean the record is legally complete, current for every entity or ready for reliance."
  },
  {
    icon: ShieldAlert,
    title: "Review prompts",
    body: "Review prompts identify source, date, threshold or wording items to check before using a record in client, premium or compliance planning."
  },
  {
    icon: CheckCircle2,
    title: "Confidence labels",
    body: "Confidence describes the current seed-research posture. It is not a legal applicability conclusion or official source verification."
  }
];

export function QualitySignalExplainer({ compact = false }: { compact?: boolean }) {
  return (
    <section className={cn("rounded-2xl border border-blue-200 bg-blue-50/70 shadow-sm", compact ? "p-4" : "p-5")}>
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">How to read these signals</p>
          <h2 className={cn("mt-1 font-semibold text-ink", compact ? "text-base" : "text-xl")}>Transparency signals are planning prompts, not coverage claims</h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
            The Atlas makes source gaps and review needs visible on purpose. Treat the labels below as triage cues for source review and advisory scoping, not proof of complete market coverage or entity-specific applicability.
          </p>
        </div>
      </div>
      <div className={cn("grid gap-3", compact ? "mt-4 md:grid-cols-2" : "mt-5 md:grid-cols-4")}>
        {signals.map((signal) => {
          const Icon = signal.icon;
          return (
            <div key={signal.title} className="rounded-xl border border-blue-100 bg-white p-4">
              <Icon className="h-4 w-4 text-blue-700" />
              <h3 className="mt-3 text-sm font-semibold text-ink">{signal.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{signal.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
