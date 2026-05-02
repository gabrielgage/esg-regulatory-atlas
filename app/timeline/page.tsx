"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { RegulatoryTimeline } from "@/components/RegulatoryTimeline";
import { RegulationDetail } from "@/components/RegulationDetail";
import { jurisdictions, regulations, topics } from "@/data/seed";
import { Regulation } from "@/types/regulation";

export default function TimelinePage() {
  const [jurisdiction, setJurisdiction] = useState("");
  const [topic, setTopic] = useState("");
  const [year, setYear] = useState("");
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const years = timelineYearsFrom(regulations);
  const filtered = useMemo(
    () =>
      regulations.filter(
        (regulation) =>
          (!jurisdiction || regulation.jurisdictionIds.includes(jurisdiction)) &&
          (!topic || regulation.topics.includes(topic)) &&
          (!year || recordHasTimelineYear(regulation, Number(year)))
      ),
    [jurisdiction, topic, year]
  );

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Timeline"
          title="Regulatory milestones and reporting years"
          body="Track effective dates, first reporting years and phased milestones across jurisdictions and topics."
          meta="Validate date-sensitive planning against linked primary sources before reliance."
        />
        <DisclaimerBanner />
        <section className="grid gap-3 rounded-2xl border bg-white p-3 shadow-sm md:grid-cols-3">
          <Select
            label="Jurisdiction"
            value={jurisdiction}
            onChange={setJurisdiction}
            options={jurisdictions.filter((item) => item.type !== "international").map((item) => ({ value: item.id, label: item.name }))}
          />
          <Select label="Topic" value={topic} onChange={setTopic} options={topics.map((item) => ({ value: item, label: item }))} />
          <Select label="Reporting year" value={year} onChange={setYear} options={years.map((item) => ({ value: String(item), label: String(item) }))} />
        </section>
        <RegulatoryTimeline regulations={filtered} onSelect={setSelectedRegulation} />
        <FooterDisclaimer />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}

function timelineYearsFrom(records: Regulation[]) {
  return Array.from(new Set(records.flatMap((regulation) => timelineYearsFor(regulation)).filter((candidate) => candidate >= 2021))).sort((a, b) => a - b);
}

function recordHasTimelineYear(regulation: Regulation, year: number) {
  return timelineYearsFor(regulation).includes(year);
}

function timelineYearsFor(regulation: Regulation) {
  return [
    regulation.firstReportingYear,
    yearFromDate(regulation.effectiveDate),
    yearFromDate(regulation.firstReportDueDate),
    yearFromDate(regulation.consultationDeadline),
    yearFromDate(regulation.nextReviewDate)
  ].filter((value): value is number => Boolean(value));
}

function yearFromDate(value?: string) {
  if (!value || value.toLowerCase().includes("uncertain") || value.toLowerCase().includes("market") || value.toLowerCase().includes("stayed")) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.getFullYear();
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
      <span className="sr-only">{label}</span>
      <select
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">All {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
