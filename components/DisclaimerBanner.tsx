import { AlertTriangle, Database } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Regulatory intelligence seed data for MVP evaluation only. This is not legal advice and is not a complete or verified regulatory database.
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
        <Database className="h-4 w-4" />
        Static seed dataset
      </div>
    </section>
  );
}
