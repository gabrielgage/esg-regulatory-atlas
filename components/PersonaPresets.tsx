"use client";

import { BriefcaseBusiness, Calculator, Leaf, Scale, ShieldCheck, Truck } from "lucide-react";
import { Badge } from "@/components/Badge";
import { personaPresets, type PersonaPreset } from "@/data/personaPresets";
import type { FilterState } from "@/types/regulation";
import { cn } from "@/lib/utils";

export function PersonaPresets({
  activeId,
  onApply,
  onClear
}: {
  activeId: string;
  onApply: (preset: PersonaPreset) => void;
  onClear: () => void;
}) {
  const active = personaPresets.find((preset) => preset.id === activeId);

  return (
    <section className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <BriefcaseBusiness className="h-4 w-4 text-teal" />
            Persona starting points
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Apply a cautious role-based lens to the regulation database. These presets are orientation filters only; they do not determine applicability or replace source review.
          </p>
        </div>
        {active ? (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Clear role lens
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {personaPresets.map((preset) => (
          <PersonaButton
            key={preset.id}
            preset={preset}
            active={activeId === preset.id}
            onApply={() => onApply(preset)}
          />
        ))}
      </div>

      {active ? (
        <div className="mt-4 rounded-xl border border-teal/20 bg-teal/5 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-teal/20 bg-teal/10 text-teal">Active role lens</Badge>
            <span data-testid="active-persona-role" className="text-sm font-semibold text-ink">{active.role}</span>
          </div>
          <div className="mt-3 grid gap-4 lg:grid-cols-2">
            <PromptList title="Questions to answer" values={active.firstQuestions} />
            <PromptList title="First actions" values={active.firstActions} />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function PersonaButton({
  preset,
  active,
  onApply
}: {
  preset: PersonaPreset;
  active: boolean;
  onApply: () => void;
}) {
  const Icon = iconForPreset(preset.id);
  return (
    <button
      type="button"
      aria-label={`Apply ${preset.role} persona preset`}
      aria-pressed={active}
      onClick={onApply}
      className={cn(
        "rounded-xl border p-4 text-left transition hover:border-teal/40 hover:bg-teal/5",
        active ? "border-teal bg-teal/10" : "border-slate-200 bg-white"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-teal" />
            <span className="text-sm font-semibold text-ink">{preset.label}</span>
          </div>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{preset.role}</p>
        </div>
        <FilterSignal filters={preset.filters} />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{preset.description}</p>
    </button>
  );
}

function PromptList({ title, values }: { title: string; values: string[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
      <ul className="mt-2 space-y-2">
        {values.map((value) => (
          <li key={value} className="text-sm leading-6 text-slate-700">
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilterSignal({ filters }: { filters: Partial<FilterState> }) {
  const [key, value] = Object.entries(filters).find(([, item]) => Boolean(item)) || [];
  if (!key || !value) return null;
  return (
    <Badge className="border-slate-200 bg-slate-50 text-slate-600">
      {String(value)}
    </Badge>
  );
}

function iconForPreset(id: string) {
  if (id.includes("legal")) return Scale;
  if (id.includes("finance")) return Calculator;
  if (id.includes("procurement")) return Truck;
  if (id.includes("private-equity")) return ShieldCheck;
  if (id.includes("advisor")) return BriefcaseBusiness;
  return Leaf;
}
