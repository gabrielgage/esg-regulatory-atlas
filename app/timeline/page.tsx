"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { RegulatoryTimeline } from "@/components/RegulatoryTimeline";
import { RegulationDetail } from "@/components/RegulationDetail";
import { jurisdictions, regulations, topics } from "@/data/seed";
import { yearsFrom } from "@/lib/filters";
import { Regulation } from "@/types/regulation";

export default function TimelinePage() {
  const [jurisdiction, setJurisdiction] = useState("");
  const [topic, setTopic] = useState("");
  const [year, setYear] = useState("");
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const years = yearsFrom(regulations);
  const filtered = useMemo(
    () =>
      regulations.filter(
        (regulation) =>
          (!jurisdiction || regulation.jurisdictionIds.includes(jurisdiction)) &&
          (!topic || regulation.topics.includes(topic)) &&
          (!year || regulation.firstReportingYear === Number(year))
      ),
    [jurisdiction, topic, year]
  );

  return (
    <main className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Timeline"
          title="Regulatory milestones and reporting years"
          body="Track effective dates, first reporting years and phased milestones across jurisdictions and topics."
          meta="Dates are seed intelligence fields and should be source-verified before compliance planning."
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
