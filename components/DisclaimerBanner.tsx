import { AlertTriangle } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Indicative regulatory intelligence for orientation and planning. Validate against primary sources before reliance.
        </p>
      </div>
    </section>
  );
}
