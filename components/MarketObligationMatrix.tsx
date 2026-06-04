import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, FileSearch2, Users } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { marketObligationMarkdown, marketObligationProfiles } from "@/lib/marketObligationProfile";
import type { Jurisdiction, Regulation } from "@/types/regulation";

export function MarketObligationMatrix({ jurisdiction, records }: { jurisdiction: Jurisdiction; records: Regulation[] }) {
  const profiles = marketObligationProfiles(records);
  const populated = profiles.filter((profile) => profile.matchedRecords.length > 0);
  const visibleProfiles = populated.slice(0, 6);
  const markdown = marketObligationMarkdown(jurisdiction, records);

  return (
    <section data-testid="market-obligation-matrix" className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Business readiness</p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-ink">Market obligation footprint</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            This view translates the {jurisdiction.name} seed records into obligation categories, likely owner functions and evidence starters. It is a planning
            lens, not a legal applicability finding.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-amber-200 bg-amber-50 text-amber-800">Derived from tracked seed records</Badge>
          <CopyMarkdownButton text={markdown} label="Copy footprint" />
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {visibleProfiles.length ? (
          visibleProfiles.map((profile) => (
            <article key={profile.impact} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold text-ink">{profile.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{profile.description}</p>
                </div>
                <Badge className="shrink-0 border-slate-200 bg-white text-slate-600">{profile.matchedRecords.length} records</Badge>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <SignalCard icon={Users} title="Likely owners" values={profile.ownerFunctions} fallback="Confirm owner functions during review." />
                <SignalCard icon={ClipboardCheck} title="Evidence starter" values={profile.evidence} fallback="Confirm evidence needs in record details." />
              </div>

              <div className="mt-4 rounded-xl border border-white bg-white p-3">
                <div className="flex items-start gap-2">
                  <FileSearch2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">First action</p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">{profile.firstAction}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {profile.topRecords.map((record) => (
                  <Link
                    key={record.id}
                    href={`/regulations/${record.id}`}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:border-teal/40 hover:text-teal"
                  >
                    {record.shortName}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </article>
          ))
        ) : (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No obligation categories are populated for this market in the current seed dataset.</p>
        )}
      </div>

      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
        Obligation categories are derived from current seed records. They do not determine legal applicability, entity-specific duties, enforcement exposure or
        complete jurisdiction coverage.
      </p>
    </section>
  );
}

function SignalCard({
  icon: Icon,
  title,
  values,
  fallback
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  values: string[];
  fallback: string;
}) {
  return (
    <div className="rounded-xl border border-white bg-white p-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-teal" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.length ? (
          values.slice(0, 4).map((value) => (
            <Badge key={value} className="border-slate-200 bg-slate-50 text-slate-600">
              {value}
            </Badge>
          ))
        ) : (
          <p className="text-sm leading-6 text-slate-600">{fallback}</p>
        )}
      </div>
    </div>
  );
}
