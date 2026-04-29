'use client';
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import { WorldMap } from "@/components/WorldMap";
import { CountryPanel } from "@/components/CountryPanel";
import { RegulationTable } from "@/components/RegulationTable";
import { RegulationDetail } from "@/components/RegulationDetail";
import { jurisdictions, regulations } from "@/data/seed";
import { Jurisdiction, Regulation } from "@/types/regulation";
import { Badge } from "@/components/Badge";

export default function Home() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [sector, setSector] = useState("");
  const [status, setStatus] = useState("");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | null>(jurisdictions.find(j=>j.id === "nl") || null);
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);

  const filtered = useMemo(() => regulations.filter(r => {
    const haystack = [r.title, r.shortName, r.summary, r.applicability, r.issuingBody, ...r.topics, ...r.sectors, ...r.valueChain].join(" ").toLowerCase();
    return (!query || haystack.includes(query.toLowerCase())) && (!topic || r.topics.includes(topic)) && (!sector || r.sectors.includes(sector)) && (!status || r.status === status);
  }), [query, topic, sector, status]);

  return (
    <main>
      <Header />
      <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
        <section className="rounded-[2rem] bg-navy p-8 text-white shadow-xl">
          <div className="max-w-3xl">
            <Badge className="border-white/20 bg-white/10 text-white">Illustrative MVP seed data</Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">Regulatory intelligence for ESG, climate and sustainable finance.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Explore local, supranational and international sustainability requirements by geography, sector, status, reporting year and value chain impact.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <HeroMetric label="Tracked records" value={String(regulations.length)} />
            <HeroMetric label="Jurisdictions" value={String(jurisdictions.length)} />
            <HeroMetric label="Core topics" value="10" />
            <HeroMetric label="MVP cost" value="Low" />
          </div>
        </section>

        <Filters query={query} setQuery={setQuery} topic={topic} setTopic={setTopic} sector={sector} setSector={setSector} status={status} setStatus={setStatus} />

        <section className="grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
          <WorldMap jurisdictions={jurisdictions} regulations={filtered} selectedId={selectedJurisdiction?.id} onSelect={setSelectedJurisdiction} />
          <CountryPanel jurisdiction={selectedJurisdiction} regulations={filtered} onRegulation={setSelectedRegulation} />
        </section>

        <RegulationTable regulations={filtered} onSelect={setSelectedRegulation} />
      </div>
      <RegulationDetail regulation={selectedRegulation} onClose={() => setSelectedRegulation(null)} />
    </main>
  );
}
function HeroMetric({label,value}:{label:string;value:string}) { return <div className="rounded-3xl border border-white/10 bg-white/10 p-4"><div className="text-sm text-slate-300">{label}</div><div className="mt-1 text-2xl font-bold">{value}</div></div> }
