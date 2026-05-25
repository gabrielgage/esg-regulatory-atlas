"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Building2, Compass, FileSearch, Landmark, ListChecks, MapPin, Network, RotateCcw, SearchCheck, ShieldCheck, UserRound } from "lucide-react";
import { companyTypes, sectors } from "@/data/seed";
import { jurisdictions } from "@/data/jurisdictions";
import { thresholdMatrixRows } from "@/data/thresholdMatrix";
import {
  ApplicabilityAnswers,
  defaultApplicabilityAnswers,
  evaluateApplicability,
  jurisdictionLabel
} from "@/lib/applicability";
import { Regulation } from "@/types/regulation";
import { Badge } from "./Badge";
import { AdvisoryScanCTA } from "./AdvisoryScanCTA";
import { CopyMarkdownButton } from "./CopyMarkdownButton";
import { RecordMetaBadges } from "./RecordMetaBadges";
import { DATASET_META } from "@/data/_meta";

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
  const readinessPlan = useMemo(() => buildReadinessPlan(results), [results]);
  const triggerReview = useMemo(() => buildTriggerReview(results, answers), [answers, results]);
  const trackedJurisdictions = jurisdictions.filter((jurisdiction) => jurisdiction.type !== "international");
  const sectorChoices = sectors.filter((sector) => sector !== "Listed companies");
  const activeExposureLabels = [
    answers.listed ? "Listed company" : null,
    answers.financialInstitution ? "Financial institution / fund / insurer" : null,
    answers.euMarketExposure ? "EU market exposure" : null,
    answers.regulatedImports ? "Regulated imports / commodities" : null,
    answers.portfolioExposure ? "Portfolio / financed emissions" : null
  ].filter(Boolean) as string[];
  const missingFactsPreview = Array.from(new Set(results.flatMap((result) => result.missingFacts))).slice(0, 3);

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

  function resetProfile() {
    setActivePersona(null);
    setAnswers(defaultApplicabilityAnswers);
    const url = new URL(window.location.href);
    url.searchParams.delete("persona");
    window.history.replaceState({}, "", url);
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
          <button
            type="button"
            onClick={resetProfile}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-teal/40 hover:text-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset profile
          </button>
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

      <div data-testid="assessment-profile-summary" className="mb-4 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="text-sm font-semibold text-ink">Assessment profile</div>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {jurisdictionLabel(answers.headquarters)} headquarters - {answers.companySize} - {answers.companyType} - {results.length} indicative records
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className="border-slate-200 bg-white text-slate-600">
              Operating markets:{" "}
              {answers.operatingJurisdictions.length
                ? answers.operatingJurisdictions
                    .slice(0, 3)
                    .map((jurisdiction) => jurisdictionLabel(jurisdiction))
                    .join(", ")
                : "Not specified"}
              {answers.operatingJurisdictions.length > 3 ? ` +${answers.operatingJurisdictions.length - 3}` : ""}
            </Badge>
            <Badge className="border-slate-200 bg-white text-slate-600">
              Sectors: {answers.sectors.slice(0, 2).join(", ")}
              {answers.sectors.length > 2 ? ` +${answers.sectors.length - 2}` : ""}
            </Badge>
            {activeExposureLabels.length ? (
              activeExposureLabels.map((label) => (
                <Badge key={label} className="border-teal/20 bg-teal/10 text-teal">
                  {label}
                </Badge>
              ))
            ) : (
              <Badge className="border-slate-200 bg-white text-slate-500">No exposure toggles selected</Badge>
            )}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-600">
          <div className="font-semibold text-ink">Facts to confirm next</div>
          <ul className="mt-2 space-y-1">
            {(missingFactsPreview.length ? missingFactsPreview : ["Entity-specific scope, thresholds and local implementation status."]).map((fact) => (
              <li key={fact}>- {fact}</li>
            ))}
          </ul>
          <p className="mt-2 text-slate-400">This is an orientation summary, not an applicability determination.</p>
        </div>
      </div>

      <ShortlistOverview results={results} readinessPlan={readinessPlan} missingFactsPreview={missingFactsPreview} onSelect={onSelect} />

      <div data-testid="assessment-trigger-review" className="mb-4 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-ink">Profile trigger review</h3>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
              These are the planning signals currently driving the indicative shortlist. They show what the Atlas matched and what should be verified before
              treating a result as client-ready.
            </p>
          </div>
          <Badge className="border-amber-200 bg-amber-50 text-amber-800">Confirm facts before reliance</Badge>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {triggerReview.map((trigger) => (
            <TriggerReviewCard key={trigger.title} trigger={trigger} />
          ))}
        </div>
      </div>

      <div data-testid="assessment-readiness-plan" className="mb-4 grid gap-3 lg:grid-cols-3">
        <ReadinessPlanCard
          title="Threshold facts to check"
          icon="threshold"
          values={readinessPlan.thresholdFacts.length ? readinessPlan.thresholdFacts : ["Confirm entity-specific scope and market nexus before using results."]}
          href="/thresholds"
          action="Open threshold matrix"
        />
        <ReadinessPlanCard
          title="First 30-day actions"
          icon="actions"
          values={readinessPlan.nextActions.length ? readinessPlan.nextActions : ["Assign an accountable owner and review primary sources."]}
        />
        <ReadinessPlanCard
          title="Likely owner functions"
          icon="owners"
          values={readinessPlan.owners.length ? readinessPlan.owners : ["Sustainability", "Legal / Compliance", "Finance / ESG controllership"]}
        />
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
                    {thresholdMatrixRows.some((row) => row.regulationId === result.regulation.id) ? (
                      <Badge className="border-amber-200 bg-amber-50 text-amber-800">Threshold matrix row</Badge>
                    ) : null}
                  </div>
                  <div className="mt-3 grid gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600 sm:grid-cols-2">
                    <div>
                      <span className="font-semibold text-ink">Suggested owner: </span>
                      {result.suggestedOwner}
                    </div>
                    <div>
                      <span className="font-semibold text-ink">Evidence: </span>
                      {result.evidenceNeeded[0] || "Applicability assessment"}
                    </div>
                    <div>
                      <span className="font-semibold text-ink">Missing fact: </span>
                      {result.missingFacts[0] || "Confirm entity-specific scope."}
                    </div>
                    <div>
                      <span className="font-semibold text-ink">Verify: </span>
                      {result.sourceToVerify}
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-semibold text-ink">Next 30 days: </span>
                      {result.nextSteps[0] || result.firstActions[0] || "Review primary sources and assign an accountable owner."}
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

      <div className="mt-5">
        <AdvisoryScanCTA
          compact
          eyebrow="Advisory scan"
          title="Turn this shortlist into a source-linked exposure scan"
          body="Use the assessment result as a starting point for a manual review of missing facts, evidence needs, owners, sources and first 30-day actions."
          subject="Etica ESG assessment review request"
          emailBody="Hi Gabriel,\n\nI would like to turn my indicative assessment shortlist into an advisory-supported exposure scan.\n\nContext:\n"
          label="Request scan"
          secondaryHref="/advisory"
          secondaryLabel="Advisory options"
          showDeliverables={false}
        />
      </div>
    </section>
  );
}

function ShortlistOverview({
  results,
  readinessPlan,
  missingFactsPreview,
  onSelect
}: {
  results: ReturnType<typeof evaluateApplicability>;
  readinessPlan: ReturnType<typeof buildReadinessPlan>;
  missingFactsPreview: string[];
  onSelect: (regulation: Regulation) => void;
}) {
  const categoryOrder = [
    "Potentially directly relevant",
    "Potentially indirectly relevant",
    "Relevant through investors or customers",
    "Monitor only"
  ];
  const topResults = results.slice(0, 3);
  const firstActions = readinessPlan.nextActions.length
    ? readinessPlan.nextActions
    : ["Assign an accountable owner, verify primary sources and confirm thresholds before relying on the shortlist."];
  const facts = missingFactsPreview.length ? missingFactsPreview : ["Entity-specific thresholds, scope, market nexus and local implementation status."];
  const mailHref = `mailto:${DATASET_META.contactEmail}?subject=${encodeURIComponent("Etica ESG assessment review request")}&body=${encodeURIComponent(
    "Hi Gabriel,\n\nI would like to turn my indicative assessment shortlist into an advisory-supported exposure scan.\n\nContext:\n"
  )}`;

  return (
    <section data-testid="assessment-shortlist-overview" className="mb-4 rounded-2xl border border-teal/20 bg-teal/5 p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Shortlist overview</p>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-ink">Start with the most decision-ready signals</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            This summary puts the highest-ranked records, relevance mix, facts to confirm and first actions before the detailed trigger logic. It is still an indicative planning view, not an applicability determination.
          </p>
        </div>
        <a href={mailHref} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
          Request advisory scan <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <div className="mt-4 grid gap-3 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-white/80 bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-ink">Top records to review first</h4>
            <span className="text-xs text-slate-500">{results.length} total results</span>
          </div>
          <div className="grid gap-2 md:grid-cols-3">
            {topResults.length ? (
              topResults.map((result) => (
                <button
                  key={result.regulation.id}
                  type="button"
                  onClick={() => onSelect(result.regulation)}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-teal/40 hover:bg-white"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-ink">{result.regulation.shortName}</span>
                    <Badge className={reviewPriorityClass(result.reviewPriority)}>{result.reviewPriority}</Badge>
                  </div>
                  <Badge className={`${categoryClass(result.category)} mt-2`}>{result.category}</Badge>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{result.reasons[0]}</p>
                  <p className="mt-2 text-xs font-semibold text-teal">Open detail</p>
                </button>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm leading-6 text-slate-500 md:col-span-3">
                No records are currently shortlisted. Add operating markets, sectors or exposure signals to generate orientation results.
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-xl border border-white/80 bg-white p-4">
            <h4 className="text-sm font-semibold text-ink">Relevance mix</h4>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {categoryOrder.map((category) => (
                <div key={category} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="text-lg font-bold text-ink">{results.filter((result) => result.category === category).length}</div>
                  <div className="text-xs leading-5 text-slate-500">{category}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-xl border border-white/80 bg-white p-4">
              <h4 className="text-sm font-semibold text-ink">Facts to confirm</h4>
              <ul className="mt-2 space-y-1 text-xs leading-5 text-slate-600">
                {facts.slice(0, 3).map((fact) => (
                  <li key={fact}>- {fact}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/80 bg-white p-4">
              <h4 className="text-sm font-semibold text-ink">First 30-day actions</h4>
              <ul className="mt-2 space-y-1 text-xs leading-5 text-slate-600">
                {firstActions.slice(0, 3).map((action) => (
                  <li key={action}>- {action}</li>
                ))}
              </ul>
            </div>
          </div>
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

type TriggerReviewItem = {
  title: string;
  icon: "jurisdiction" | "company" | "sector" | "valueChain" | "finance" | "source";
  signal: string;
  matchedRecords: number;
  verify: string;
};

function TriggerReviewCard({ trigger }: { trigger: TriggerReviewItem }) {
  const Icon =
    trigger.icon === "jurisdiction"
      ? MapPin
      : trigger.icon === "company"
        ? Building2
        : trigger.icon === "sector"
          ? Landmark
          : trigger.icon === "valueChain"
            ? Network
            : trigger.icon === "finance"
              ? ShieldCheck
              : SearchCheck;

  return (
    <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-white p-2 text-teal">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <h4 className="text-sm font-semibold text-ink">{trigger.title}</h4>
        </div>
        <Badge className="border-slate-200 bg-white text-slate-600">{trigger.matchedRecords} matched</Badge>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{trigger.signal}</p>
      <p className="mt-3 rounded-lg border border-white bg-white p-3 text-xs leading-5 text-slate-500">
        <span className="font-semibold text-ink">Verify next: </span>
        {trigger.verify}
      </p>
    </article>
  );
}

function ReadinessPlanCard({
  title,
  icon,
  values,
  href,
  action
}: {
  title: string;
  icon: "threshold" | "actions" | "owners";
  values: string[];
  href?: string;
  action?: string;
}) {
  const Icon = icon === "threshold" ? FileSearch : icon === "actions" ? ListChecks : UserRound;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="rounded-lg bg-teal/10 p-2 text-teal">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
      </div>
      <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-600">
        {values.slice(0, 4).map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
      {href && action ? (
        <Link href={href} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal hover:text-ink">
          {action} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      ) : null}
    </article>
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
  const thresholdSensitive = results
    .filter((result) => thresholdMatrixRows.some((row) => row.regulationId === result.regulation.id))
    .map((result) => result.regulation.shortName);
  const triggerReview = buildTriggerReview(results, answers);

  return [
    "# Etica ESG · Regulatory Atlas indicative shortlist",
    "",
    `Headquarters: ${jurisdictionLabel(answers.headquarters)}`,
    `Company type: ${answers.companyType}`,
    `Company size: ${answers.companySize}`,
    `Listed: ${answers.listed ? "yes" : "no"}`,
    `Sectors: ${answers.sectors.join(", ")}`,
    `Threshold-sensitive records: ${thresholdSensitive.length ? thresholdSensitive.join(", ") : "none in current shortlist"}`,
    "",
    "## Profile trigger review",
    ...triggerReview.flatMap((trigger) => [
      `- ${trigger.title}: ${trigger.signal}`,
      `  - Matched records: ${trigger.matchedRecords}`,
      `  - Verify next: ${trigger.verify}`
    ]),
    "",
    "## Recommended records",
    ...results.slice(0, 12).flatMap((result) => [
      `- ${result.regulation.shortName} (${result.category}; ${result.reviewPriority} review priority)`,
      `  - Why it appears: ${result.reasons[0]}`,
      `  - Triggered by: ${result.triggeredBy.join(", ")}`,
      `  - Suggested owner: ${result.suggestedOwner}`,
      `  - First action: ${result.firstActions[0] || "Review primary sources."}`,
      `  - Missing facts to confirm: ${result.missingFacts.slice(0, 2).join("; ") || "Entity-specific scope and thresholds"}`,
      `  - Next 30-day action: ${result.nextSteps[0] || "Assign owner and review primary sources."}`,
      `  - Evidence to start: ${result.evidenceNeeded.slice(0, 2).join(", ") || "Applicability assessment"}`,
      `  - Source to verify: ${result.sourceToVerify}`,
      `  - Caveat: ${result.caveat}`
    ]),
    "",
    "## Caveat",
    "This shortlist is indicative only. It does not constitute legal, tax, investment or assurance advice and does not determine entity-specific applicability. Threshold-sensitive rows should be reviewed in the Atlas threshold matrix before client use."
  ].join("\n");
}

function buildReadinessPlan(results: ReturnType<typeof evaluateApplicability>) {
  const thresholdFacts = new Set<string>();
  const nextActions = new Set<string>();
  const owners = new Set<string>();

  results.slice(0, 8).forEach((result) => {
    const thresholdRow = thresholdMatrixRows.find((row) => row.regulationId === result.regulation.id);
    if (thresholdRow) {
      thresholdFacts.add(`${result.regulation.shortName}: ${thresholdRow.factsToConfirm[0]}`);
    } else if (result.missingFacts[0]) {
      thresholdFacts.add(`${result.regulation.shortName}: ${result.missingFacts[0]}`);
    }

    if (result.nextSteps[0]) nextActions.add(`${result.regulation.shortName}: ${result.nextSteps[0]}`);
    if (result.suggestedOwner) owners.add(result.suggestedOwner);
  });

  return {
    thresholdFacts: Array.from(thresholdFacts).slice(0, 4),
    nextActions: Array.from(nextActions).slice(0, 4),
    owners: Array.from(owners).slice(0, 4)
  };
}

function buildTriggerReview(results: ReturnType<typeof evaluateApplicability>, answers: ApplicabilityAnswers): TriggerReviewItem[] {
  const jurisdictionCount = countTriggered(results, ["jurisdiction footprint", "EU market exposure", "direct relevance tag"]);
  const companyCount = countTriggered(results, ["company size", "company type", "listed company"]);
  const sectorCount = countTriggered(results, ["sector match"]);
  const valueChainCount = countTriggered(results, ["regulated imports or suppliers", "supplier exposure"]);
  const financeCount = countTriggered(results, ["financial institution", "portfolio exposure", "investor/customer exposure"]);
  const sourceReviewCount = results.filter((result) => result.reviewPriority !== "Monitor" || thresholdMatrixRows.some((row) => row.regulationId === result.regulation.id)).length;

  return [
    {
      title: "Jurisdiction and market nexus",
      icon: "jurisdiction",
      signal: answers.euMarketExposure
        ? `${jurisdictionLabel(answers.headquarters)} headquarters, ${answers.operatingJurisdictions.length} operating market signal(s) and EU market exposure are shaping the shortlist.`
        : `${jurisdictionLabel(answers.headquarters)} headquarters and ${answers.operatingJurisdictions.length} operating market signal(s) are shaping the shortlist.`,
      matchedRecords: jurisdictionCount,
      verify: "Confirm headquarters, operating entities, sales markets, local transposition and any non-domestic trigger."
    },
    {
      title: "Company profile and size",
      icon: "company",
      signal: `${answers.companySize} ${answers.companyType}${answers.listed ? " with listed-company status" : ""} is being used as a directional threshold signal.`,
      matchedRecords: companyCount,
      verify: "Confirm employee, revenue, balance-sheet, listing, public-interest entity and consolidated group facts from source documents."
    },
    {
      title: "Sector relevance",
      icon: "sector",
      signal: `${answers.sectors.join(", ")} sector selection is compared with sector tags and all-sector reporting regimes.`,
      matchedRecords: sectorCount,
      verify: "Confirm whether sector-specific rules, financial-sector rules or all-sector obligations apply to the entity profile."
    },
    {
      title: "Value-chain exposure",
      icon: "valueChain",
      signal: answers.regulatedImports
        ? "Regulated imports, commodities or supplier exposure is increasing product, trade and due-diligence review signals."
        : "Current value-chain matching is limited unless supplier, importer/exporter, product or commodity exposure is selected.",
      matchedRecords: valueChainCount,
      verify: "Confirm supplier role, importer/exporter status, commodity exposure, product placement and customer data requests."
    },
    {
      title: "Financial or portfolio exposure",
      icon: "finance",
      signal: answers.financialInstitution || answers.portfolioExposure
        ? "Financial institution, fund, insurer, private equity or portfolio exposure is shaping sustainable-finance and financed-emissions signals."
        : "Financial, fund, insurer and portfolio signals are currently limited unless selected in the assessment profile.",
      matchedRecords: financeCount,
      verify: "Confirm regulated-entity role, fund/product status, portfolio company exposure, financed-emissions boundaries and investor requests."
    },
    {
      title: "Source and threshold review",
      icon: "source",
      signal: `${sourceReviewCount} shortlisted record(s) have a non-monitor review priority or threshold-matrix context.`,
      matchedRecords: sourceReviewCount,
      verify: "Open primary sources, threshold rows and review caveats before using the shortlist in premium, advisory or compliance planning."
    }
  ];
}

function countTriggered(results: ReturnType<typeof evaluateApplicability>, triggers: string[]) {
  return results.filter((result) => result.triggeredBy.some((trigger) => triggers.includes(trigger))).length;
}
