"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, ArrowUpRight, Scale } from "lucide-react";
import { Badge } from "./Badge";
import { Jurisdiction, Regulation } from "@/types/regulation";
import { statusClass, statusLabel, uniq } from "@/lib/utils";

export function JurisdictionCompare({
  jurisdictions,
  regulations,
  onSelect
}: {
  jurisdictions: Jurisdiction[];
  regulations: Regulation[];
  onSelect: (regulation: Regulation) => void;
}) {
  const comparable = jurisdictions.filter((jurisdiction) => jurisdiction.type !== "international");
  const [leftId, setLeftId] = useState("eu");
  const [rightId, setRightId] = useState("uk");
  const left = comparable.find((jurisdiction) => jurisdiction.id === leftId) || comparable[0];
  const right = comparable.find((jurisdiction) => jurisdiction.id === rightId) || comparable[1] || comparable[0];

  const leftRecords = useMemo(() => recordsFor(left, regulations), [left, regulations]);
  const rightRecords = useMemo(() => recordsFor(right, regulations), [right, regulations]);

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Jurisdiction comparison</h2>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Compare regulatory pressure, reporting timing and advisory workstreams across two jurisdictions in the current filter context.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <CompareSelect label="Primary jurisdiction" value={left.id} onChange={setLeftId} jurisdictions={comparable} />
          <CompareSelect label="Compare with" value={right.id} onChange={setRightId} jurisdictions={comparable} />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <JurisdictionColumn jurisdiction={left} regulations={leftRecords} onSelect={onSelect} />
        <JurisdictionColumn jurisdiction={right} regulations={rightRecords} onSelect={onSelect} />
      </div>
    </section>
  );
}

function JurisdictionColumn({
  jurisdiction,
  regulations,
  onSelect
}: {
  jurisdiction: Jurisdiction;
  regulations: Regulation[];
  onSelect: (regulation: Regulation) => void;
}) {
  const firstYears = uniq(regulations.map((regulation) => String(regulation.firstReportingYear || "")).filter(Boolean));
  const impacts = uniq(regulations.flatMap((regulation) => regulation.businessImpacts)).slice(0, 4);
  const advisory = uniq(regulations.flatMap((regulation) => regulation.advisoryOpportunities)).slice(0, 4);
  const highImpact = regulations.filter((regulation) => regulation.highImpact).length;

  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-teal" />
            <h3 className="font-semibold text-ink">{jurisdiction.name}</h3>
          </div>
          <p className="mt-1 text-sm leading-5 text-slate-500">{jurisdiction.region}</p>
        </div>
        <Badge className="border-slate-200 bg-slate-50 text-slate-600">{jurisdiction.regulatoryIntensity}</Badge>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Metric label="Records" value={String(regulations.length)} />
        <Metric label="High impact" value={String(highImpact)} />
        <Metric label="Years" value={firstYears.length ? firstYears.slice(0, 2).join(", ") : "n/a"} />
      </div>

      <div className="mt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Obligation profile</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {impacts.length ? (
            impacts.map((impact) => (
              <Badge key={impact} className="border-teal/20 bg-teal/10 text-teal">
                {impact}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-slate-500">No impacts in current filters.</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Advisory entry points</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {advisory.map((item) => (
            <Badge key={item} className="border-violet/20 bg-violet/10 text-violet">
              {item}
            </Badge>
          ))}
          {!advisory.length && <p className="text-sm text-slate-500">No advisory entry points in current filters.</p>}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {regulations.slice(0, 4).map((regulation) => (
          <button
            key={regulation.id}
            type="button"
            onClick={() => onSelect(regulation)}
            className="w-full rounded-lg border border-slate-200 p-3 text-left hover:border-teal/40 hover:bg-teal/5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-ink">{regulation.shortName}</span>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-2">
              <Badge className={statusClass[regulation.status]}>{statusLabel[regulation.status]}</Badge>
            </div>
          </button>
        ))}
        {!regulations.length && <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">No records match this jurisdiction in the current filters.</p>}
      </div>
    </div>
  );
}

function CompareSelect({
  label,
  value,
  onChange,
  jurisdictions
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  jurisdictions: Jurisdiction[];
}) {
  return (
    <label>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
      <select
        className="h-10 w-full min-w-[190px] rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-teal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {jurisdictions.map((jurisdiction) => (
          <option key={jurisdiction.id} value={jurisdiction.id}>
            {jurisdiction.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 truncate text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}

function recordsFor(jurisdiction: Jurisdiction, regulations: Regulation[]) {
  return regulations.filter(
    (regulation) =>
      regulation.jurisdictionIds.includes(jurisdiction.id) ||
      Boolean(jurisdiction.parent && regulation.jurisdictionIds.includes(jurisdiction.parent))
  );
}
