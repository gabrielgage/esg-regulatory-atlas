"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Search, ShieldAlert } from "lucide-react";
import { Badge } from "./Badge";
import { sectorGroups } from "@/lib/sectorGroups";
import { cn } from "@/lib/utils";

export type SectorDirectoryItem = {
  sector: string;
  slug: string;
  groupId: string;
  groupLabel: string;
  groupTrigger: string;
  directCount: number;
  broadCount: number;
  highImpactCount: number;
  reviewFlags: number;
  marketCount: number;
  sourceBackedCount: number;
  totalScoped: number;
  topMarkets: string[];
  topTopics: string[];
  priorityRecords: Array<{ id: string; shortName: string }>;
  firstAction: string;
};

export function SectorDirectory({ sectors }: { sectors: SectorDirectoryItem[] }) {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return sectors.filter((item) => {
      const matchesGroup = activeGroup === "all" || item.groupId === activeGroup;
      const searchable = [
        item.sector,
        item.groupLabel,
        item.groupTrigger,
        item.firstAction,
        ...item.topMarkets,
        ...item.topTopics,
        ...item.priorityRecords.map((record) => record.shortName)
      ]
        .join(" ")
        .toLowerCase();
      return matchesGroup && (!normalized || searchable.includes(normalized));
    });
  }, [activeGroup, query, sectors]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge className="border-teal/20 bg-teal/10 text-teal">Sector finder</Badge>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink">Start with a business context</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Search or choose a sector family to see practical trigger summaries, priority records and review cues. Counts show current seed coverage,
            not complete sector legal inventory.
          </p>
        </div>
        <Link
          href="/assessment"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
          Run company assessment
        </Link>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <label className="relative block">
          <span className="sr-only">Search sectors</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sector, market, topic or regulation"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-teal/50 focus:ring-4 focus:ring-teal/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </label>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
          {filtered.length} of {sectors.length} sectors
        </p>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveGroup("all")}
          aria-pressed={activeGroup === "all"}
          className={groupButtonClass(activeGroup === "all")}
        >
          All sector groups
        </button>
        {sectorGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => setActiveGroup(group.id)}
            aria-pressed={activeGroup === group.id}
            className={groupButtonClass(activeGroup === group.id)}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {filtered.map((item) => (
          <SectorFinderCard key={item.slug} item={item} />
        ))}
      </div>

      {!filtered.length ? (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900 dark:border-amber-400/40 dark:bg-amber-950/30 dark:text-amber-100">
          No sectors match this search. Try a broader sector family, market name, topic or known regulation acronym.
        </div>
      ) : null}
    </section>
  );
}

function SectorFinderCard({ item }: { item: SectorDirectoryItem }) {
  const reviewNeeded = item.reviewFlags > 0;

  return (
    <Link
      href={`/sectors/${item.slug}`}
      className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-teal/40 hover:bg-white hover:shadow-md dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">{item.groupLabel}</p>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-ink">{item.sector}</h3>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-teal transition group-hover:translate-x-0.5" aria-hidden="true" />
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.groupTrigger}</p>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <MiniMetric label="Direct" value={String(item.directCount)} />
        <MiniMetric label="Markets" value={String(item.marketCount)} />
        <MiniMetric label="High impact" value={String(item.highImpactCount)} />
        <MiniMetric label="Sources" value={`${item.sourceBackedCount}/${item.totalScoped || 0}`} />
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Review first</p>
        <p className="mt-2 text-sm font-semibold text-ink">
          {item.priorityRecords.map((record) => record.shortName).join(", ") || "Confirm profile and source-review need"}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.firstAction}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge className="border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {item.topTopics[0] || "Topic review needed"}
        </Badge>
        <Badge className="border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {item.topMarkets[0] || "Market review needed"}
        </Badge>
        {reviewNeeded ? (
          <Badge className="border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-400/40 dark:bg-amber-950/30 dark:text-amber-100">
            <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
            {item.reviewFlags} review cues
          </Badge>
        ) : (
          <Badge className="border-teal/20 bg-teal/10 text-teal">Source-linked seed</Badge>
        )}
      </div>
    </Link>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
      <div className="text-[0.68rem] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-lg font-bold text-ink">{value}</div>
    </div>
  );
}

function groupButtonClass(active: boolean) {
  return cn(
    "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
    active
      ? "border-ink bg-ink text-white"
      : "border-slate-200 bg-white text-slate-600 hover:border-teal/40 hover:text-teal dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
  );
}
