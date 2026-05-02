"use client";

import { useEffect, useMemo, useState } from "react";
import { Compass, ShieldCheck, UserRound } from "lucide-react";
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
import { CopyMarkdownButton } from "./CopyMarkdownButton";
import { RecordMetaBadges } from "./RecordMetaBadges";

type PersonaId = "cso" | "supplier" | "legal" | "advisor";

const personaDoorways: Array<{
  id: PersonaId;
  label: string;
  description: string;
  answers: ApplicabilityAnswers;
}> = [
  {
    id: "cso",
    label: "CSO",
    description: "Large EU-facing corporate with reporting, assurance and governance exposure.",
    answers: {
      ...defaultApplicabilityAnswers,
      headquarters: "eu",
      operatingJurisdictions: ["eu", "uk", "us"],
      companyType: "Large private company",
      listed: false,
      companySize: "very-large",
      sectors: ["All sectors"],
      euMarketExposure: true
    }
  },
  {
    id: "supplier",
    label: "SME supplier lead",
    description: "Supplier or exporter profile with customer-driven data and due diligence requests.",
    answers: {
      ...defaultApplicabilityAnswers,
      headquarters: "nl",
      operatingJurisdictions: ["eu", "nl"],
      companyType: "Supplier",
      companySize: "small",
      sectors: ["Manufacturing"],
      euMarketExposure: true,
      regulatedImports: true
    }
  },
  {
    id: "legal",
    label: "In-house legal",
    description: "Listed or large multinational profile focused on thresholds, caveats and deadlines.",
    answers: {
      ...defaultApplicabilityAnswers,
      headquarters: "us",
      operatingJurisdictions: ["us", "ca-us", "eu", "uk"],
      companyType: "Listed company",
      listed: true,
      companySize: "large",
      sectors: ["All sectors"],
      euMarketExposure: true
    }
  },
  {
    id: "advisor",
    label: "External advisor",
    description: "Broad advisory discovery view across jurisdictions, sectors and workstreams.",
    answers: {
      ...defaultApplicabilityAnswers,
      headquarters: "uk",
      operatingJurisdictions: ["eu", "uk", "sg", "au"],
      companyType: "Corporate",
      companySize: "large",
      sectors: ["Financial services", "Manufacturing"],
      financialInstitution: true,
      euMarketExposure: true,
      portfolioExposure: true
    }
  }
];

export function ApplicabilityWizard({ regulations, onSelect }: { regulations: Regulation[]; onSelect: (regulation: Regulation) => void }) {
  const [answers, setAnswers] = useState<ApplicabilityAnswers>(defaultApplicabilityAnswers);
  const [activePersona, setActivePersona] = useState<PersonaId | null>(null);
  const results = useMemo(() => evaluateApplicability(regulations, answers), [answers, regulations]);
  const summary = useMemo(() => buildAssessmentSummary(results, answers), [answers, results]);
  const trackedJurisdictions = jurisdictions.filter((jurisdiction) => jurisdiction.type !== "international");
  const sectorChoices = sectors.filter((sector) => sector !== "Listed companies");

  useEffect(() => {
    const persona = new URLSearchParams(window.location.search).get("persona") as PersonaId | null;
    const config = persona ? personaDoorways.find((doorway) => doorway.id === persona) : undefined;
    if (config) {
      setActivePersona(config.id);
      setAnswers(config.answers);
    }
  }, []);

  function applyPersona(persona: PersonaId, writeUrl = true) {
    const config = personaDoorways.find((doorway) => doorway.id === persona);
    if (!config) return;
    setActivePersona(persona);
    setAnswers(config.answers);
    if (writeUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("persona", persona);
      window.history.replaceState({}, "", url);
    }
  }

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
        <div className="flex flex-wrap gap-2">
          {activePersona && <Badge className="border-teal/20 bg-teal/10 text-teal">Persona: {personaDoorways.find((doorway) => doorway.id === activePersona)?.label}</Badge>}
          <Badge className="border-amber-200 bg-amber-50 text-amber-800">Indicative, not legal advice</Badge>
          <CopyMarkdownButton text={summary} label="Copy shortlist" />
        </div>
      </div>

      <div className="mb-4 grid gap-3 md:grid-cols-4">
        {personaDoorways.map((persona) => (
          <button
            key={persona.id}
            type="button"
            aria-pressed={activePersona === persona.id}
            onClick={() => applyPersona(persona.id)}
            className={
              activePersona === persona.id
                ? "rounded-xl border border-teal bg-teal/10 p-4 text-left shadow-sm"
                : "rounded-xl border border-slate-200 bg-slate-50 p-4 text-left hover:border-teal/40 hover:bg-white"
            }
          >
            <div className="flex items-center gap-2 font-semibold text-ink">
              <UserRound className="h-4 w-4 text-teal" />
              {persona.label}
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">{persona.description}</p>
          </button>
        ))}
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
                    <div className="flex flex-wrap gap-1">
                      <Badge className={reviewPriorityClass(result.reviewPriority)}>{result.reviewPriority} review</Badge>
                      <Badge className={categoryClass(result.category)}>{result.category}</Badge>
                    </div>
                  </div>
                  <RecordMetaBadges regulation={result.regulation} compact />
                  <div className="mt-2 space-y-1">
                    {result.reasons.slice(0, 2).map((reason) => (
                      <p key={reason} className="text-xs leading-5 text-slate-500">
                        {reason}
                      </p>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {result.triggeredBy.slice(0, 3).map((trigger) => (
                      <Badge key={trigger} className="border-slate-200 bg-slate-50 text-slate-600">
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 grid gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600 sm:grid-cols-2">
                    <div>
                      <span className="font-semibold text-ink">First action: </span>
                      {result.firstActions[0] || "Review primary sources and assign an accountable owner."}
                    </div>
                    <div>
                      <span className="font-semibold text-ink">Evidence: </span>
                      {result.evidenceNeeded[0] || "Applicability assessment"}
                    </div>
                    <div>
                      <span className="font-semibold text-ink">Functions: </span>
                      {result.functionsInvolved.join(", ") || "Assign owner"}
                    </div>
                    <div>
                      <span className="font-semibold text-ink">Verify: </span>
                      {result.sourceToVerify}
                    </div>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{result.sourceQualityNote}</p>
                </button>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm leading-6 text-slate-500">
                No indicative results for this profile. Try adding operating jurisdictions, EU market exposure, sectors or broader company type information.
              </div>
            )}
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            Profile: {jurisdictionLabel(answers.headquarters)} headquarters - {answers.companySize} - {answers.companyType}
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
              aria-pressed={selected}
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

function reviewPriorityClass(priority: string) {
  if (priority === "High") return "border-red-200 bg-red-50 text-red-700";
  if (priority === "Medium") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-slate-200 bg-slate-50 text-slate-600";
}

function buildAssessmentSummary(results: ReturnType<typeof evaluateApplicability>, answers: ApplicabilityAnswers) {
  return [
    "# Etica ESG · Regulatory Atlas indicative shortlist",
    "",
    `Headquarters: ${jurisdictionLabel(answers.headquarters)}`,
    `Company type: ${answers.companyType}`,
    `Company size: ${answers.companySize}`,
    `Listed: ${answers.listed ? "yes" : "no"}`,
    `Sectors: ${answers.sectors.join(", ")}`,
    "",
    "## Recommended records",
    ...results.slice(0, 12).flatMap((result) => [
      `- ${result.regulation.shortName} (${result.category}; ${result.reviewPriority} review priority)`,
      `  - Why it appears: ${result.reasons[0]}`,
      `  - Triggered by: ${result.triggeredBy.join(", ")}`,
      `  - First action: ${result.firstActions[0] || "Review primary sources."}`,
      `  - Evidence to start: ${result.evidenceNeeded.slice(0, 2).join(", ") || "Applicability assessment"}`,
      `  - Source to verify: ${result.sourceToVerify}`
    ]),
    "",
    "## Caveat",
    "This shortlist is indicative only. It does not constitute legal, tax, investment or assurance advice and does not determine entity-specific applicability."
  ].join("\n");
}
