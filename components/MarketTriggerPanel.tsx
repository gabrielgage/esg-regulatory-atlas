import Link from "next/link";
import { Building2, ExternalLink, Factory, FileSearch, Landmark, Leaf, Network, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/Badge";
import { marketTriggersFor, type MarketTriggerKind } from "@/lib/marketTriggerProfile";
import type { Jurisdiction, Regulation } from "@/types/regulation";

export function MarketTriggerPanel({ jurisdiction, records }: { jurisdiction: Jurisdiction; records: Regulation[] }) {
  const triggers = marketTriggersFor(jurisdiction, records);

  return (
    <section data-testid="market-trigger-panel" className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink">Market trigger review</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            These trigger groups explain what currently drives the {jurisdiction.name} market profile. Use them to decide what facts to confirm before opening
            priority records, preparing a brief or requesting advisory review.
          </p>
        </div>
        <Badge className="border-amber-200 bg-amber-50 text-amber-800">Seed coverage, not legal scope</Badge>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {triggers.map((trigger) => (
          <article key={trigger.kind} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-3">
                <span className="rounded-xl bg-white p-2 text-teal">
                  <TriggerIcon kind={trigger.kind} />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{trigger.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{trigger.description}</p>
                </div>
              </div>
              <Badge className="shrink-0 border-slate-200 bg-white text-slate-600">{trigger.matchedRecords.length} matched</Badge>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Verify next</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{trigger.verifyNext}</p>
              </div>
              <div className="rounded-xl border border-white bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">First action</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{trigger.firstAction}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {trigger.topRecords.length ? (
                trigger.topRecords.map((record) => (
                  <Link
                    key={record.id}
                    href={`/regulations/${record.id}`}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:border-teal/40 hover:text-teal"
                  >
                    {record.shortName}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </Link>
                ))
              ) : (
                <span className="text-xs text-slate-500">No current seed records in this trigger group.</span>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
        Market trigger review is an orientation aid. It does not determine legal applicability, complete jurisdiction coverage or entity-specific compliance
        obligations.
      </p>
    </section>
  );
}

function TriggerIcon({ kind }: { kind: MarketTriggerKind }) {
  if (kind === "corporate-reporting") return <Building2 className="h-5 w-5" aria-hidden="true" />;
  if (kind === "climate-transition") return <Leaf className="h-5 w-5" aria-hidden="true" />;
  if (kind === "sustainable-finance") return <Landmark className="h-5 w-5" aria-hidden="true" />;
  if (kind === "supply-chain") return <Network className="h-5 w-5" aria-hidden="true" />;
  if (kind === "product-trade") return <Factory className="h-5 w-5" aria-hidden="true" />;
  if (kind === "source-review") return <FileSearch className="h-5 w-5" aria-hidden="true" />;
  return <ShieldCheck className="h-5 w-5" aria-hidden="true" />;
}
