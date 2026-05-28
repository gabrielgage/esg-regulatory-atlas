import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, FileSearch2, UsersRound, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/Badge";
import { businessFunctionProfileFor } from "@/lib/businessFunctionProfile";
import { uniq } from "@/lib/utils";
import type { Regulation } from "@/types/regulation";

export function OwnerHandoffPanel({ regulation, compact = false }: { regulation: Regulation; compact?: boolean }) {
  const ownerNames = regulation.affectedFunctions.length ? regulation.affectedFunctions : ["Sustainability", "Legal"];
  const ownerProfiles = ownerNames.slice(0, compact ? 3 : 4).map((owner) => businessFunctionProfileFor(owner));
  const firstActions = uniq(ownerProfiles.flatMap((profile) => profile.playbook.firstActions)).slice(0, compact ? 3 : 5);
  const evidenceFocus = uniq([
    ...(regulation.evidenceRequired || []),
    ...ownerProfiles.flatMap((profile) => profile.playbook.evidenceFocus)
  ]).slice(0, compact ? 4 : 6);
  const reviewPrompts = uniq(ownerProfiles.flatMap((profile) => profile.playbook.reviewPrompts)).slice(0, compact ? 2 : 4);
  const reviewFlags = ownerProfiles.reduce((count, profile) => count + profile.reviewFlags, 0);

  return (
    <section
      className="rounded-2xl border border-teal/20 bg-teal/5 p-5 shadow-sm dark:border-teal/30 dark:bg-teal/10"
      data-testid="owner-handoff-panel"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Owner handoff</p>
          <h2 className="mt-2 text-lg font-semibold text-ink">Suggested owner lanes for first action</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-300">
            Use these internal-owner prompts to turn this seed record into a practical evidence, source-review and workstream handoff. They are planning signals only and do not assign formal legal accountability.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/functions" className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-white px-3 py-2 text-sm font-semibold text-teal hover:bg-teal/10 dark:bg-slate-900">
            Open owner workbench
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href={`/regulations?businessFunction=${encodeURIComponent(ownerProfiles[0]?.functionName || "Sustainability")}`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            Filter by owner
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <MiniMetric icon={UsersRound} label="Owner lanes" value={String(ownerProfiles.length)} />
        <MiniMetric icon={ClipboardCheck} label="First actions" value={String(firstActions.length)} />
        <MiniMetric icon={FileSearch2} label="Review prompts" value={String(reviewFlags || reviewPrompts.length)} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-sm font-semibold text-ink">Likely owner lanes</h3>
          <div className="mt-3 grid gap-3">
            {ownerProfiles.map((profile) => (
              <Link
                key={profile.functionName}
                href={`/functions#${profile.slug}`}
                className="group rounded-xl border border-slate-200 bg-slate-50 p-3 hover:border-teal/40 hover:bg-teal/5 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge className="border-teal/20 bg-white text-teal dark:bg-slate-900">{profile.functionName}</Badge>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{profile.records.length} linked records</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{profile.playbook.startQuestion}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal">
                  View function lane
                  <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <List title="First actions" values={firstActions} />
          <List title="Evidence focus" values={evidenceFocus} />
          {reviewPrompts.length ? <List title="Review prompts" values={reviewPrompts} /> : null}
        </div>
      </div>

      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
        Owner handoffs are indicative. Confirm entity-specific scope, legal interpretation, governance responsibility and source quality before using this in compliance planning, board materials or client advice.
      </p>
    </section>
  );
}

function MiniMetric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
      <Icon className="h-4 w-4 text-teal" aria-hidden="true" />
      <div className="mt-2 text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-lg font-bold text-ink">{value}</div>
    </div>
  );
}

function List({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-3 space-y-2">
        {values.length ? (
          values.map((value) => (
            <li key={value} className="rounded-xl bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {value}
            </li>
          ))
        ) : (
          <li className="rounded-xl bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            No structured item captured yet; treat this as a source-review task before client reliance.
          </li>
        )}
      </ul>
    </div>
  );
}
