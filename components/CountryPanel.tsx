"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, CalendarDays, FileText, GitCompare, Globe2, Layers3, LinkIcon, Network } from "lucide-react";
import { Jurisdiction, Regulation } from "@/types/regulation";
import { Badge } from "./Badge";
import { MarketBriefingCTA } from "./MarketBriefingCTA";
import { RecordMetaBadges } from "./RecordMetaBadges";
import { StatusBadge } from "./StatusBadge";
import { cn, formatDate, uniq } from "@/lib/utils";
import { internationalRecords, localRecords, recordsForJurisdiction, sectoralRecords } from "@/lib/layers";

const tabs = ["Overview", "Regulations", "Timeline", "Value chain", "Sources"] as const;

export function CountryPanel({
  jurisdiction,
  regulations,
  onRegulation
}: {
  jurisdiction: Jurisdiction | null;
  regulations: Regulation[];
  onRegulation: (r: Regulation) => void;
}) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");

  if (!jurisdiction) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-slate-500 shadow-sm">
        Select a tracked jurisdiction on the map to view its profile.
      </div>
    );
  }

  const regs = recordsForJurisdiction(jurisdiction, regulations);
  const directRegs = regulations.filter((regulation) => regulation.jurisdictionIds.includes(jurisdiction.id));
  const inheritedRegs = jurisdiction.parent ? regulations.filter((regulation) => regulation.jurisdictionIds.includes(jurisdiction.parent || "")) : [];
  const sectors = uniq(regs.flatMap((regulation) => regulation.sectors)).slice(0, 8);
  const impacts = uniq(regs.flatMap((regulation) => regulation.valueChain)).slice(0, 8);
  const evidence = uniq(regs.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 8);
  const drivers = uniq(regs.flatMap((regulation) => regulation.topics)).slice(0, 6);
  const years = uniq(regs.map((regulation) => String(regulation.firstReportingYear || "")).filter(Boolean)).sort();
  const sourceCount = regs.reduce((count, regulation) => count + regulation.sourceUrls.length, 0);
  const reviewFlags = regs.filter((regulation) => regulation.dataQualityStatus !== "verified_seed" || regulation.confidenceLevel !== "high").length;
  const confidenceSummary = `${regs.filter((regulation) => regulation.confidenceLevel === "high").length} high / ${regs.filter((regulation) => regulation.confidenceLevel === "medium").length} medium`;
  const intensity = jurisdiction.regulatoryIntensity;

  return (
    <aside className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Jurisdiction profile</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink">{jurisdiction.name}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{jurisdiction.executiveSummary}</p>
        </div>
        <Badge className={cn("capitalize", intensity === "high" ? "border-teal/20 bg-teal/10 text-teal" : "border-slate-200 bg-slate-50 text-slate-600")}>
          {intensity}
        </Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Metric label="Direct records" value={String(directRegs.length)} />
        <Metric label="Linked records" value={String(regs.length)} />
        <Metric label="EU/inherited" value={String(inheritedRegs.length)} />
        <Metric label="Sources" value={String(sourceCount)} />
        <Metric label="First years" value={years.length ? years.slice(0, 3).join(", ") : "n/a"} />
        <Metric label="Confidence" value={confidenceSummary} />
        <Metric label="Review flags" value={String(reviewFlags)} />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Link
          href={`/jurisdiction/${jurisdiction.code.toLowerCase()}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <ArrowUpRight className="h-4 w-4" />
          Open market profile
        </Link>
        <Link
          href={`/jurisdiction/${jurisdiction.code.toLowerCase()}/brief`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          <FileText className="h-4 w-4" />
          Open country brief
        </Link>
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-1">
        <Link
          href={`/compare?a=${jurisdiction.code}&b=${jurisdiction.code === "GBR" ? "EUU" : "GBR"}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          <GitCompare className="h-4 w-4" />
          Compare with...
        </Link>
      </div>

      <div className="mt-4 flex gap-1 overflow-x-auto rounded-full border bg-slate-50 p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition",
              activeTab === tab ? "bg-white text-ink shadow-sm" : "text-slate-500 hover:bg-white hover:text-ink"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "Overview" && (
          <div className="space-y-5">
            <PanelSection title="Primary regulatory drivers">
              <BadgeList values={drivers} tone="teal" empty="No driver data for current filters." limit={6} />
            </PanelSection>
            <RuleRadar jurisdiction={jurisdiction} regulations={regs} allRegulations={regulations} onRegulation={onRegulation} />
          </div>
        )}

        {activeTab === "Regulations" && (
          <PanelSection title="Key regulations">
            <div className="space-y-2">
              {regs.map((regulation) => (
                <RegulationButton key={regulation.id} regulation={regulation} onRegulation={onRegulation} />
              ))}
              {!regs.length && <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No records match the current filters for this jurisdiction.</p>}
            </div>
          </PanelSection>
        )}

        {activeTab === "Timeline" && (
          <PanelSection title="Key dates">
            <div className="space-y-2">
              {regs
                .filter((regulation) => regulation.firstReportingYear || regulation.effectiveDate)
                .sort((a, b) => String(a.firstReportingYear || a.effectiveDate).localeCompare(String(b.firstReportingYear || b.effectiveDate)))
                .slice(0, 8)
                .map((regulation) => (
                  <button
                    key={regulation.id}
                    type="button"
                    onClick={() => onRegulation(regulation)}
                    className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 p-3 text-left hover:border-teal/40 hover:bg-teal/5"
                  >
                    <div>
                      <div className="font-semibold text-ink">{regulation.shortName}</div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                        <CalendarDays className="h-3.5 w-3.5" />
                        First reporting {regulation.firstReportingYear || formatDate(regulation.effectiveDate)}
                      </div>
                    </div>
                    <StatusBadge status={regulation.status} />
                  </button>
                ))}
            </div>
          </PanelSection>
        )}

        {activeTab === "Value chain" && (
          <div className="space-y-5">
            <PanelSection title="Affected sectors">
              <BadgeList values={sectors} tone="slate" empty="No sector data for current filters." limit={8} />
            </PanelSection>
            <PanelSection title="Value chain impacts">
              <BadgeList values={impacts} tone="teal" empty="No value chain data for current filters." limit={8} />
            </PanelSection>
            <PanelSection title="Advisory opportunities">
              <BadgeList values={uniq(regs.flatMap((regulation) => regulation.advisoryOpportunities))} tone="violet" empty="No advisory opportunities for current filters." limit={10} />
            </PanelSection>
            <PanelSection title="Evidence to prepare">
              <BadgeList values={evidence} tone="slate" empty="No evidence summary for current filters." limit={8} />
            </PanelSection>
          </div>
        )}

        {activeTab === "Sources" && (
          <PanelSection title="Sources and review status">
            <div className="space-y-3">
              {regs.flatMap((regulation) => regulation.sourceUrls.map((source) => ({ ...source, id: regulation.id, shortName: regulation.shortName }))).slice(0, 8).map((source) => (
                <a key={`${source.id}-${source.url}`} href={source.url} target="_blank" rel="noreferrer" className="flex items-start gap-2 rounded-xl border border-slate-200 p-3 text-sm text-teal underline hover:bg-teal/5">
                  <LinkIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    <strong className="text-ink">{source.shortName}: </strong>
                    {source.label}
                  </span>
                </a>
              ))}
              {!sourceCount && <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No source links are available for this jurisdiction yet.</p>}
            </div>
          </PanelSection>
        )}
      </div>
      <div className="mt-5">
        <MarketBriefingCTA compact jurisdictionName={jurisdiction.name} />
      </div>
    </aside>
  );
}

function RuleRadar({
  jurisdiction,
  regulations,
  allRegulations,
  onRegulation
}: {
  jurisdiction: Jurisdiction;
  regulations: Regulation[];
  allRegulations: Regulation[];
  onRegulation: (regulation: Regulation) => void;
}) {
  const layers = [
    { title: "International", icon: Globe2, records: internationalRecords(allRegulations) },
    { title: "Local", icon: Layers3, records: localRecords(jurisdiction, regulations) },
    { title: "Sectoral", icon: Network, records: sectoralRecords(jurisdiction, regulations) }
  ];

  return (
    <PanelSection title="Three-layer rule radar">
      <div className="space-y-3">
        {layers.map((layer) => {
          const Icon = layer.icon;
          return (
            <div key={layer.title} className="rounded-xl border border-slate-200 p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <Icon className="h-4 w-4 text-teal" />
                  {layer.title}
                </div>
                <Badge className="border-slate-200 bg-slate-50 text-slate-600">{layer.records.length}</Badge>
              </div>
              <div className="space-y-2">
                {layer.records.slice(0, 3).map((regulation) => (
                  <button
                    key={regulation.id}
                    type="button"
                    onClick={() => onRegulation(regulation)}
                    className="flex w-full items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-left text-sm hover:bg-teal/5"
                  >
                    <span className="font-semibold text-ink">{regulation.shortName}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                  </button>
                ))}
                {!layer.records.length && <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">No records in this layer.</p>}
              </div>
            </div>
          );
        })}
      </div>
    </PanelSection>
  );
}

function RegulationButton({ regulation, onRegulation }: { regulation: Regulation; onRegulation: (regulation: Regulation) => void }) {
  return (
    <button
      type="button"
      onClick={() => onRegulation(regulation)}
      className="w-full rounded-xl border border-slate-200 p-3 text-left hover:border-teal/40 hover:bg-teal/5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-semibold text-ink">{regulation.shortName}</span>
        <StatusBadge status={regulation.status} />
      </div>
      <RecordMetaBadges regulation={regulation} compact />
      <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">{regulation.summary}</p>
    </button>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 truncate text-sm font-semibold capitalize text-ink">{value}</div>
    </div>
  );
}

function PanelSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold text-ink">{title}</h3>
      {children}
    </section>
  );
}

function BadgeList({
  values,
  tone,
  empty,
  limit
}: {
  values: string[];
  tone: "slate" | "teal" | "violet";
  empty: string;
  limit: number;
}) {
  if (!values.length) return <p className="text-sm text-slate-500">{empty}</p>;
  const classes = {
    slate: "border-slate-200 bg-slate-50 text-slate-600",
    teal: "border-teal/20 bg-teal/10 text-teal",
    violet: "border-violet/20 bg-violet/10 text-violet"
  };
  return (
    <div className="flex flex-wrap gap-2">
      {values.slice(0, limit).map((value) => (
        <Badge key={value} className={classes[tone]}>
          {value}
        </Badge>
      ))}
    </div>
  );
}
