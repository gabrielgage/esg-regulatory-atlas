import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, FileText, Layers3, ScanSearch } from "lucide-react";
import { DATASET_META } from "@/data/_meta";

export function MarketBriefingCTA({ compact = false, jurisdictionName }: { compact?: boolean; jurisdictionName?: string }) {
  const subject = encodeURIComponent(
    jurisdictionName ? `Etica ESG market briefing request - ${jurisdictionName}` : "Etica ESG market briefing request"
  );
  const body = encodeURIComponent(
    "Hi Gabriel,\n\nI would like to discuss an ESG Regulatory Atlas market briefing, portfolio scan, sector pack or readiness review.\n\nContext:\n- Jurisdiction(s):\n- Sector / company type:\n- Main regulatory question:\n"
  );

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Market packs and advisory briefings</p>
          <h2 className={compact ? "mt-1 text-lg font-semibold text-ink" : "mt-1 text-2xl font-bold tracking-tight text-ink"}>
            Turn Atlas intelligence into a client-ready briefing
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Static MVP CTA only: request a market scan, portfolio regulation screen, sector pack or regulatory readiness review. No payments, accounts or gated database are implemented.
          </p>
        </div>
        <a
          href={`mailto:${DATASET_META.contactEmail}?subject=${subject}&body=${body}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Request briefing
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
      {!compact ? (
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <CtaCard icon={FileText} title="Market scan" body="Jurisdiction-specific obligations, milestones and source quality." />
          <CtaCard icon={ScanSearch} title="Portfolio scan" body="Indicative exposure across portfolio companies or assets." />
          <CtaCard icon={Layers3} title="Sector pack" body="Financial services, private equity, real assets, manufacturing or supply chain." />
          <CtaCard icon={BriefcaseBusiness} title="Readiness review" body="Actions, evidence, owners and advisory workstreams." />
        </div>
      ) : null}
      <p className="mt-4 text-xs leading-5 text-slate-500">
        Future premium features are documented in the <Link href="/premium-roadmap" className="font-semibold text-teal underline">premium roadmap</Link>; this MVP remains free, static and legally cautious.
      </p>
    </section>
  );
}

function CtaCard({
  icon: Icon,
  title,
  body
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <Icon className="h-5 w-5 text-teal" />
      <h3 className="mt-3 text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}
