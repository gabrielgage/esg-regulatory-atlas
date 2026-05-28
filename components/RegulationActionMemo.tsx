import Link from "next/link";
import { ArrowUpRight, ClipboardList, FileSearch2, ShieldAlert, UsersRound } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { CopyOutputNote } from "@/components/CopyOutputNote";
import { formatDate, uniq } from "@/lib/utils";
import type { Regulation } from "@/types/regulation";

export function RegulationActionMemo({
  regulation,
  related = []
}: {
  regulation: Regulation;
  related?: Regulation[];
}) {
  const factsToConfirm = buildFactsToConfirm(regulation);
  const firstActions = uniq([
    ...(regulation.immediateReadinessActions || []),
    ...(regulation.requiredActions || []),
    ...regulation.keyRequirements.slice(0, 3)
  ]).slice(0, 6);
  const evidence = uniq(regulation.evidenceRequired || []).slice(0, 6);
  const owners = uniq(regulation.affectedFunctions.length ? regulation.affectedFunctions : ["Sustainability", "Legal", "Finance"]).slice(0, 5);
  const source = regulation.sourceUrls.find((item) => ["primary", "regulator", "standards_body"].includes(item.type)) || regulation.sourceUrls[0];
  const relatedRecords = related.slice(0, 4);

  return (
    <section className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900" data-testid="regulation-action-memo">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">Action memo</p>
          <h2 className="mt-2 text-xl font-semibold text-ink">Decision-ready next step summary</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            A copyable planning memo for turning this seed record into a source-review, owner handoff or advisory exposure scan. It is intentionally cautious and should be validated before client or compliance reliance.
          </p>
        </div>
        <div className="grid gap-2 sm:justify-items-end">
          <CopyMarkdownButton text={actionMemoMarkdown(regulation, factsToConfirm, firstActions, evidence, owners, source, relatedRecords)} label="Copy action memo" />
          <CopyOutputNote className="max-w-xs sm:text-right" />
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <MiniCard icon={<ShieldAlert className="h-4 w-4 text-amber-600" />} title="Facts to confirm" value={factsToConfirm.length} />
        <MiniCard icon={<ClipboardList className="h-4 w-4 text-teal" />} title="First actions" value={firstActions.length} />
        <MiniCard icon={<UsersRound className="h-4 w-4 text-violet" />} title="Owner lanes" value={owners.length} />
        <MiniCard icon={<FileSearch2 className="h-4 w-4 text-slate-500" />} title="Sources" value={regulation.sourceUrls.length} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <ActionList title="Facts to confirm before reliance" values={factsToConfirm} tone="amber" />
        <ActionList title="First 30-day actions" values={firstActions} />
        <ActionList title="Evidence likely needed" values={evidence.length ? evidence : ["Create a source-review note and applicability fact log before client reliance."]} />
        <ActionList title="Suggested internal owner lanes" values={owners} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <h3 className="text-sm font-semibold text-ink">Source to verify first</h3>
          {source ? (
            <a href={source.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold leading-6 text-teal hover:text-ink">
              {source.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <p className="mt-2 text-sm leading-6 text-red-700 dark:text-red-300">No source URL captured yet. Treat this as source-review blocked.</p>
          )}
          <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Last reviewed {formatDate(regulation.lastReviewed)}. Next review {formatDate(regulation.nextReviewDate)}.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <h3 className="text-sm font-semibold text-ink">Related regimes to include in scoping</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {relatedRecords.length ? (
              relatedRecords.map((item) => (
                <Link key={item.id} href={`/regulations/${item.id}`} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-teal/30 hover:text-teal dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  {item.shortName}
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              ))
            ) : (
              <span className="text-sm text-slate-600 dark:text-slate-300">No related records were matched by current topic tags.</span>
            )}
          </div>
        </div>
      </div>

      <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
        This memo is an indicative planning aid. It does not determine legal applicability, source completeness, formal accountability, deadlines or compliance obligations for any entity.
      </p>
    </section>
  );
}

function MiniCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</span>
        {icon}
      </div>
      <div className="mt-2 text-2xl font-bold text-ink">{value}</div>
    </div>
  );
}

function ActionList({ title, values, tone = "slate" }: { title: string; values: string[]; tone?: "slate" | "amber" }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-3 space-y-2">
        {values.map((value) => (
          <li key={value} className={tone === "amber" ? "rounded-lg bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-950 dark:bg-amber-400/10 dark:text-amber-100" : "rounded-lg bg-white px-3 py-2 text-sm leading-6 text-slate-700 dark:bg-slate-900 dark:text-slate-300"}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

function buildFactsToConfirm(regulation: Regulation) {
  return uniq([
    ...(regulation.applicabilityScope?.thresholds || []),
    "Confirm entity-specific jurisdiction footprint and whether local implementation or transposition changes the analysis.",
    "Confirm company type, listing status, group structure and sector-specific scope before relying on this record.",
    regulation.firstReportingYear ? `Confirm whether the ${regulation.firstReportingYear} reporting-year signal applies to the entity profile.` : "Confirm effective date, reporting year and phase-in timing from the linked source.",
    regulation.sourceUrls.length ? "Review the primary or regulator source before using this in compliance planning." : "Add a primary or regulator source before using this record in client-ready output."
  ]).slice(0, 6);
}

function actionMemoMarkdown(
  regulation: Regulation,
  factsToConfirm: string[],
  firstActions: string[],
  evidence: string[],
  owners: string[],
  source: Regulation["sourceUrls"][number] | undefined,
  related: Regulation[]
) {
  return [
    `# ${regulation.shortName} action memo`,
    "",
    `Jurisdiction: ${regulation.jurisdiction}`,
    `Status: ${regulation.status.replaceAll("_", " ")}`,
    `Legal force: ${regulation.legalForce || "not classified"}`,
    `Last reviewed: ${formatDate(regulation.lastReviewed)}`,
    `Next review: ${formatDate(regulation.nextReviewDate)}`,
    "",
    "## Why this may matter",
    regulation.summary,
    "",
    "## Facts to confirm before reliance",
    ...factsToConfirm.map((item) => `- ${item}`),
    "",
    "## First 30-day actions",
    ...firstActions.map((item) => `- ${item}`),
    "",
    "## Evidence likely needed",
    ...(evidence.length ? evidence.map((item) => `- ${item}`) : ["- Create a source-review note and applicability fact log before client reliance."]),
    "",
    "## Suggested owner lanes",
    ...owners.map((item) => `- ${item}`),
    "",
    "## Source to verify first",
    source ? `- ${source.label}: ${source.url}` : "- Source missing: add a primary or regulator source before reliance.",
    "",
    "## Related regimes to scope together",
    ...(related.length ? related.map((item) => `- ${item.shortName}`) : ["- No related records matched by current topic tags."]),
    "",
    "Caveat: This memo is indicative regulatory intelligence for orientation and planning only. It is not legal, tax, investment or assurance advice and does not determine entity-specific applicability, deadlines, source completeness or compliance obligations."
  ].join("\n");
}
