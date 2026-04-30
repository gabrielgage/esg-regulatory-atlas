"use client";

import { Layers3 } from "lucide-react";
import { quickViews } from "@/data/seed";
import { FilterState } from "@/types/regulation";
import { cn } from "@/lib/utils";

const overview = {
  id: "overview",
  label: "Global overview",
  description: "All tracked jurisdictions and records",
  filters: {}
};

export function ViewSelector({
  activeId,
  onApply
}: {
  activeId: string;
  onApply: (id: string, filters: Partial<FilterState>) => void;
}) {
  const views = [overview, ...quickViews];

  return (
    <section className="rounded-2xl border bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2 px-1 text-sm font-semibold text-ink">
        <Layers3 className="h-4 w-4 text-teal" />
        Views
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {views.map((view) => (
          <button
            key={view.id}
            type="button"
            onClick={() => onApply(view.id, view.filters)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition",
              activeId === view.id
                ? "border-teal bg-teal/10 text-teal"
                : "border-slate-200 bg-white text-slate-600 hover:border-teal/30 hover:bg-teal/5"
            )}
            title={view.description}
          >
            {view.label}
          </button>
        ))}
      </div>
    </section>
  );
}
