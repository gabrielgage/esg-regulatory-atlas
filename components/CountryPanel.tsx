import { ArrowUpRight, CalendarDays, LinkIcon } from "lucide-react";
import { Jurisdiction, Regulation } from "@/types/regulation";
import { Badge } from "./Badge";
import { cn, formatDate, statusClass, statusLabel, uniq } from "@/lib/utils";

export function CountryPanel({
  jurisdiction,
  regulations,
  onRegulation
}: {
  jurisdiction: Jurisdiction | null;
  regulations: Regulation[];
  onRegulation: (r: Regulation) => void;
}) {
  if (!jurisdiction) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-slate-500 shadow-sm">
        Select a tracked jurisdiction on the map to view its profile.
      </div>
    );
  }

  const regs = regulations.filter(
    (regulation) =>
      regulation.jurisdictionIds.includes(jurisdiction.id) ||
      Boolean(jurisdiction.parent && regulation.jurisdictionIds.includes(jurisdiction.parent))
  );
  const sectors = uniq(regs.flatMap((regulation) => regulation.sectors)).slice(0, 8);
  const impacts = uniq(regs.flatMap((regulation) => regulation.valueChain)).slice(0, 8);
  const drivers = uniq(regs.flatMap((regulation) => regulation.topics)).slice(0, 6);
  const years = uniq(regs.map((regulation) => String(regulation.firstReportingYear || "")).filter(Boolean));
  const latest = regs.slice(0, 3);
  const sourceCount = regs.reduce((count, regulation) => count + regulation.sourceUrls.length, 0);
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

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric label="Tracked records" value={String(regs.length)} />
        <Metric label="Sources" value={String(sourceCount)} />
        <Metric label="Type" value={jurisdiction.type} />
        <Metric label="First years" value={years.length ? years.join(", ") : "n/a"} />
        <Metric label="Confidence" value={confidenceSummary} />
      </div>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
        Applicability depends on entity facts, thresholds, sector rules and local implementation. Use this profile for planning, not as a legal conclusion.
      </div>

      <PanelSection title="Primary regulatory drivers">
        <BadgeList values={drivers} tone="teal" empty="No driver data for current filters." />
      </PanelSection>

      <PanelSection title="Affected sectors">
        <BadgeList values={sectors} tone="slate" empty="No sector data for current filters." />
      </PanelSection>

      <PanelSection title="Value chain impacts">
        <BadgeList values={impacts} tone="teal" empty="No value chain data for current filters." />
      </PanelSection>

      <PanelSection title="Latest updates">
        <div className="space-y-3">
          {latest.length ? (
            latest.map((regulation) => (
              <button
                key={regulation.id}
                onClick={() => onRegulation(regulation)}
                className="w-full rounded-xl border border-slate-200 p-3 text-left hover:bg-slate-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-ink">{regulation.shortName}</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </div>
                <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-500">{regulation.latestUpdate}</p>
              </button>
            ))
          ) : (
            <p className="text-sm text-slate-500">No records match the current filters for this jurisdiction.</p>
          )}
        </div>
      </PanelSection>

      <PanelSection title="Key applicable regulations">
        <div className="space-y-2">
          {regs.map((regulation) => (
            <button
              key={regulation.id}
              onClick={() => onRegulation(regulation)}
              className="w-full rounded-xl border border-slate-200 p-3 text-left hover:border-teal/40 hover:bg-teal/5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-ink">{regulation.shortName}</span>
                <Badge className={statusClass[regulation.status]}>{statusLabel[regulation.status]}</Badge>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <CalendarDays className="h-3.5 w-3.5" />
                First reporting: {regulation.firstReportingYear || "n/a"}
              </div>
            </button>
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Advisory opportunities">
        <BadgeList values={uniq(regs.flatMap((regulation) => regulation.advisoryOpportunities)).slice(0, 10)} tone="violet" empty="No advisory opportunities for current filters." />
      </PanelSection>

      <PanelSection title="Source links">
        <div className="space-y-2">
          {regs.flatMap((regulation) => regulation.sourceUrls.map((source) => ({ ...source, id: regulation.id }))).slice(0, 4).map((source) => (
            <a key={`${source.id}-${source.url}`} href={source.url} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-sm text-teal underline">
              <LinkIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-2">{source.label}</span>
            </a>
          ))}
          {!sourceCount && <p className="text-sm text-slate-500">Source missing for this seed jurisdiction.</p>}
        </div>
      </PanelSection>
    </aside>
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
    <section className="mt-5">
      <h3 className="mb-2 text-sm font-semibold text-ink">{title}</h3>
      {children}
    </section>
  );
}

function BadgeList({ values, tone, empty }: { values: string[]; tone: "slate" | "teal" | "violet"; empty: string }) {
  if (!values.length) return <p className="text-sm text-slate-500">{empty}</p>;
  const classes = {
    slate: "border-slate-200 bg-slate-50 text-slate-600",
    teal: "border-teal/20 bg-teal/10 text-teal",
    violet: "border-violet/20 bg-violet/10 text-violet"
  };
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <Badge key={value} className={classes[tone]}>
          {value}
        </Badge>
      ))}
    </div>
  );
}
