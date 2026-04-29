import { Filter, Sparkles } from "lucide-react";
import { quickViews } from "@/data/seed";
import { FilterState } from "@/types/regulation";
import { cn } from "@/lib/utils";

export function QuickViews({
  activeId,
  onApply
}: {
  activeId: string;
  onApply: (id: string, filters: Partial<FilterState>) => void;
}) {
  return (
    <section className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Sparkles className="h-4 w-4 text-teal" />
            Saved views
          </div>
          <p className="mt-1 text-xs text-slate-500">Fast lenses for common advisory and compliance workflows.</p>
        </div>
        <Filter className="hidden h-4 w-4 text-slate-400 md:block" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {quickViews.map((view) => (
          <button
            key={view.id}
            onClick={() => onApply(view.id, view.filters)}
            className={cn(
              "min-h-[78px] rounded-xl border p-3 text-left transition hover:border-teal/40 hover:bg-teal/5",
              activeId === view.id ? "border-teal bg-teal/10" : "border-slate-200 bg-white"
            )}
          >
            <div className="text-sm font-semibold text-ink">{view.label}</div>
            <div className="mt-1 text-xs leading-5 text-slate-500">{view.description}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
