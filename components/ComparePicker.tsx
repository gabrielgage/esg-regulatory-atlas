"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GitCompare, X } from "lucide-react";
import { Regulation } from "@/types/regulation";
import { Badge } from "./Badge";

export function ComparePicker({ regulations }: { regulations: Regulation[] }) {
  const defaultIds = useMemo(() => regulations.slice(0, 2).map((regulation) => regulation.id), [regulations]);
  const [selected, setSelected] = useState<string[]>(defaultIds);
  const compareHref = selected.length ? `/compare?ids=${selected.join(",")}` : "/compare";

  function toggle(id: string) {
    setSelected((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      return [...current, id].slice(0, 3);
    });
  }

  return (
    <details className="rounded-2xl border bg-white p-4 shadow-sm">
      <summary className="flex cursor-pointer list-none flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <span>
          <span className="inline-flex items-center gap-2 font-semibold text-ink">
            <GitCompare className="h-4 w-4 text-teal" />
            Compare records
          </span>
          <span className="mt-1 block text-sm text-slate-500">Select two or three records for a side-by-side advisory view.</span>
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          {selected.length} selected
        </span>
      </summary>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {selected.map((id) => {
            const regulation = regulations.find((item) => item.id === id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggle(id)}
                className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-semibold text-teal"
              >
                {regulation?.shortName || id}
                <X className="h-3 w-3" />
              </button>
            );
          })}
        </div>
        <div className="grid max-h-72 gap-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2 md:grid-cols-2 xl:grid-cols-3">
          {regulations.map((regulation) => {
            const isSelected = selected.includes(regulation.id);
            return (
              <button
                key={regulation.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggle(regulation.id)}
                className={isSelected ? "rounded-xl border border-teal bg-white p-3 text-left shadow-sm" : "rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-teal/40"}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-ink">{regulation.shortName}</span>
                  <Badge className="border-slate-200 bg-slate-50 text-slate-600">{regulation.jurisdiction}</Badge>
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{regulation.title}</p>
              </button>
            );
          })}
        </div>
        <Link href={compareHref} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          Open comparison
        </Link>
      </div>
    </details>
  );
}
