import Link from "next/link";
import { AlertTriangle, ArrowUpRight, CheckCircle2, ClipboardList, FileSearch2, Users } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import {
  fallbackMarketQuickStart,
  marketQuickStartFor,
  marketQuickStartIndexMarkdown,
  marketQuickStartMarkdown,
  marketQuickStarts
} from "@/data/marketQuickStarts";
import type { Jurisdiction } from "@/types/regulation";

export function MarketQuickStartPanel({
  jurisdiction,
  profileActions = []
}: {
  jurisdiction: Jurisdiction;
  profileActions?: string[];
}) {
  const quickStart = marketQuickStartFor(jurisdiction.id) || fallbackMarketQuickStart(jurisdiction, profileActions);
  const markdown = marketQuickStartMarkdown(quickStart, jurisdiction.name, jurisdiction.code);

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm" data-testid="market-quick-start-panel">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Market quick start</p>
          <h2 className="mt-2 text-lg font-semibold text-ink">{quickStart.headline}</h2>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <Badge className="border-teal/20 bg-teal/10 text-teal">Seed playbook</Badge>
          <CopyMarkdownButton text={markdown} label="Copy quick start" />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Planning question</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{quickStart.userQuestion}</p>
      </div>

      <QuickStartSection icon={CheckCircle2} title="First 30-day actions" values={quickStart.firstActions} />
      <QuickStartSection icon={FileSearch2} title="Evidence starter pack" values={quickStart.evidenceStarterPack} />
      <QuickStartSection icon={Users} title="Likely owner functions" values={quickStart.ownerFunctions} compact />
      <QuickStartSection icon={AlertTriangle} title="Watch items" values={quickStart.watchItems} />
      <QuickStartSection icon={ClipboardList} title="Advisory prompts" values={quickStart.advisoryPrompts} />

      <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">{quickStart.caveat}</p>
    </section>
  );
}

export function MarketQuickStartGrid({ jurisdictions, limit = 6 }: { jurisdictions: Jurisdiction[]; limit?: number }) {
  const cards = marketQuickStarts
    .map((quickStart) => {
      const jurisdiction = jurisdictions.find((item) => item.id === quickStart.jurisdictionId);
      return jurisdiction ? { quickStart, jurisdiction } : null;
    })
    .filter(Boolean)
    .slice(0, limit) as { quickStart: (typeof marketQuickStarts)[number]; jurisdiction: Jurisdiction }[];
  const indexMarkdown = marketQuickStartIndexMarkdown(cards);

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm" data-testid="market-quick-start-grid">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Decision support</p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-ink">Market quick starts</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Core market playbooks translate tracked seed records into first actions, evidence starters and owner functions. They are orientation aids, not legal applicability conclusions.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CopyMarkdownButton text={indexMarkdown} label="Copy quick-start index" />
          <Link href="/assessment" className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
            Run assessment
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {cards.map(({ quickStart, jurisdiction }) => (
          <Link
            key={quickStart.jurisdictionId}
            href={`/jurisdiction/${jurisdiction.code.toLowerCase()}`}
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-teal/40 hover:bg-teal/5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <Badge className="border-slate-200 bg-white text-slate-600">{jurisdiction.code}</Badge>
                <h3 className="mt-3 text-lg font-bold text-ink">{jurisdiction.name}</h3>
              </div>
              <ArrowUpRight className="h-4 w-4 text-teal transition group-hover:translate-x-0.5" />
            </div>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{quickStart.headline}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {quickStart.ownerFunctions.slice(0, 3).map((owner) => (
                <Badge key={owner} className="border-teal/20 bg-white text-teal">
                  {owner}
                </Badge>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function QuickStartSection({
  icon: Icon,
  title,
  values,
  compact = false
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  values: string[];
  compact?: boolean;
}) {
  return (
    <div className="mt-5">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-teal" />
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
      </div>
      <div className={compact ? "mt-3 flex flex-wrap gap-2" : "mt-3 space-y-2"}>
        {values.map((value) =>
          compact ? (
            <Badge key={value} className="border-slate-200 bg-slate-50 text-slate-600">
              {value}
            </Badge>
          ) : (
            <div key={value} className="rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700">
              {value}
            </div>
          )
        )}
      </div>
    </div>
  );
}
