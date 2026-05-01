"use client";

import { useMemo, useState } from "react";
import { Compass, ShieldCheck } from "lucide-react";
import { companyTypes, sectors } from "@/data/seed";
import { jurisdictions } from "@/data/jurisdictions";
import {
  ApplicabilityAnswers,
  defaultApplicabilityAnswers,
  evaluateApplicability,
  jurisdictionLabel
} from "@/lib/applicability";
import { Regulation } from "@/types/regulation";
import { Badge } from "./Badge";

export function ApplicabilityWizard({ regulations, onSelect }: { regulations: Regulation[]; onSelect: (regulation: Regulation) => void }) {
  const [answers, setAnswers] = useState<ApplicabilityAnswers>(defaultApplicabilityAnswers);
  const results = useMemo(() => evaluateApplicability(regulations, answers), [answers, regulations]);
  const trackedJurisdictions = jurisdictions.filter((jurisdiction) => jurisdiction.type !== "international");
  const sectorChoices = sectors.filter((sector) => sector !== "Listed companies");

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Compass className="h-4 w-4 text-teal" />
            Find relevant regulations
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Answer a few planning questions to generate an indicative regulatory shortlist. Results are orientation only and should be validated against thresholds, local implementation and legal advice.
          </p>
        </div>
        <Badge className="border-amber-200 bg-amber-50 text-amber-800">Indicative, not legal advice</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Select
              label="Headquartered in"
              value={answers.headquarters}
              onChange={(value) => setAnswers((current) => ({ ...current, headquarters: value }))}
              options={trackedJurisdictions.map((jurisdiction) => ({ value: jurisdiction.id, label: jurisdiction.name }))}
            />
            <Select
              label="Company type"
              value={answers.companyType}
              onChange={(value) => setAnswers((current) => ({ ...current, companyType: value }))}
              options={companyTypes.map((value) => ({ value, label: value }))}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Select
              label="Approximate size"
              value={answers.companySize}
              onChange={(value) => setAnswers((current) => ({ ...current, companySize: value as ApplicabilityAnswers["companySize"] }))}
              options={[
                { value: "small", label: "Small or SME" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" },
                { value: "very-large", label: "Very large group" }
              ]}
            />
            <MultiSelect
              label="Operates or sells in"
              values={answers.operatingJurisdictions}
              options={trackedJurisdictions.map((jurisdiction) => ({ value: jurisdiction.id, label: jurisdiction.name }))}
              onChange={(values) => setAnswers((current) => ({ ...current, operatingJurisdictions: values }))}
            />
          </div>
          <MultiSelect
            label="Sectors"
            values={answers.sectors}
            options={sectorChoices.map((value) => ({ value, label: value }))}
            onChange={(values) => setAnswers((current) => ({ ...current, sectors: values.length ? values : ["All sectors"] }))}
          />
          <div className="grid gap-2 sm:grid-cols-2">
            <Toggle label="Listed company" checked={answers.listed} onChange={(listed) => setAnswers((current) => ({ ...current, listed }))} />
            <Toggle
              label="Financial institution, fund or insurer"
              checked={answers.financialInstitution}
              onChange={(financialInstitution) => setAnswers((current) => ({ ...current, financialInstitution }))}
            />
            <Toggle
              label="EU market exposure"
              checked={answers.euMarketExposure}
              onChange={(euMarketExposure) => setAnswers((current) => ({ ...current, euMarketExposure }))}
            />
            <Toggle
              label="Regulated imports or commodities"
              checked={answers.regulatedImports}
              onChange={(regulatedImports) => setAnswers((current) => ({ ...current, regulatedImports }))}
            />
            <Toggle
              label="Portfolio or financed emissions exposure"
              checked={answers.portfolioExposure}
              onChange={(portfolioExposure) => setAnswers((current) => ({ ...current, portfolioExposure }))}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <ShieldCheck className="h-4 w-4 text-teal" />
              Indicative shortlist
            </div>
            <span className="text-xs text-slate-500">{results.length} records</span>
          </div>
          <div className="space-y-3">
            {results.length ? (
              results.map((result) => (
                <button
                  key={result.regulation.id}
                  type="button"
                  onClick={() => onSelect(result.regulation)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-teal/40 hover:bg-teal/5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-semibold text-ink">{result.regulation.shortName}</div>
                    <Badge className={categoryClass(result.category)}>{result.category}</Badge>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{result.reasons[0]}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {result.triggeredBy.slice(0, 3).map((trigger) => (
                      <Badge key={trigger} className="border-slate-200 bg-slate-50 text-slate-600">
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    First action: {result.firstActions[0] || "Review primary sources and assign an accountable owner."}
                  </p>
                </button>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm leading-6 text-slate-500">
                No indicative results for this profile. Try adding operating jurisdictions, EU market exposure, sectors or broader company type information.
              </div>
            )}
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Profile: {jurisdictionLabel(answers.headquarters)} headquarters · {answers.companySize} · {answers.companyType}
          </p>
        </div>
      </div>
    </section>
  );
}

function Select({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="mb-1 block text-xs font-semibold text-slate-500">{label}</span>
      <select
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function MultiSelect({
  label,
  values,
  options,
  onChange
}: {
  label: string;
  values: string[];
  options: { value: string; label: string }[];
  onChange: (values: string[]) => void;
}) {
  function toggle(value: string) {
    onChange(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  return (
    <div>
      <div className="mb-1 text-xs font-semibold text-slate-500">{label}</div>
      <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2">
        {options.map((option) => {
          const selected = values.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggle(option.value)}
              className={selected ? "rounded-full bg-teal px-3 py-1 text-xs font-semibold text-white" : "rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex min-h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
      <input className="h-4 w-4 accent-teal" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function categoryClass(category: string) {
  if (category === "Potentially directly relevant") return "border-teal/20 bg-teal/10 text-teal";
  if (category === "Potentially indirectly relevant") return "border-violet/20 bg-violet/10 text-violet";
  if (category === "Relevant through investors or customers") return "border-blue-200 bg-blue-50 text-blue-700";
  return "border-slate-200 bg-slate-50 text-slate-600";
}
