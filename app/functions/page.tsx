import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowUpRight, ClipboardList, FileSearch2, ShieldCheck, Users } from "lucide-react";
import { AdvisoryScanCTA } from "@/components/AdvisoryScanCTA";
import { Badge } from "@/components/Badge";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { GlossaryHelpCard } from "@/components/GlossaryHelpCard";
import { Header } from "@/components/Header";
import { PageIntro } from "@/components/PageIntro";
import { DATASET_META } from "@/data/_meta";
import { businessFunctionProfiles } from "@/lib/businessFunctionProfile";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Internal owner workbench | Etica ESG Regulatory Atlas",
  description: "Translate tracked ESG regulation records into likely owner functions, evidence needs, first actions and source-review prompts."
};

export default function FunctionsPage() {
  const profiles = businessFunctionProfiles();
  const recordLinks = profiles.reduce((count, profile) => count + profile.records.length, 0);
  const highImpact = profiles.reduce((count, profile) => count + profile.highImpact.length, 0);
  const reviewFlags = profiles.reduce((count, profile) => count + profile.reviewFlags, 0);
  const priorityProfiles = profiles.filter((profile) => ["Sustainability", "Finance", "Legal", "Procurement"].includes(profile.functionName));

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Owner workbench"
          title="Translate regulation into internal action"
          body="Start from the business function that will likely own evidence, controls, source review or advisory scoping. This view helps teams move from tracked regulations to first actions without treating the Atlas as a legal applicability engine."
          meta={`${DATASET_META.edition} · seed intelligence, not legal advice`}
        />
        <DisclaimerBanner />
        <GlossaryHelpCard
          title="Owner views are planning aids"
          body="Function cards show likely ownership signals from seed records. They do not assign formal legal accountability, determine entity-specific applicability or replace source review by legal and regulatory advisors."
          termIds={["seed-intelligence", "legal-force", "source-confidence"]}
          compact
        />

        <section className="grid gap-3 md:grid-cols-4" data-testid="business-function-metrics">
          <Metric icon={Users} label="Owner functions" value={String(profiles.length)} />
          <Metric icon={ClipboardList} label="Record-owner links" value={String(recordLinks)} />
          <Metric icon={ShieldCheck} label="High-impact links" value={String(highImpact)} />
          <Metric icon={FileSearch2} label="Review prompts" value={String(reviewFlags)} />
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900" data-testid="owner-priority-lanes">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal">Start here</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-ink">Priority owner lanes</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                These four functions usually shape the first ESG regulatory triage conversation: scope, evidence, source review and implementation ownership.
              </p>
            </div>
            <Link href="/assessment" className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
              Run assessment
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-4">
            {priorityProfiles.map((profile) => (
              <a key={profile.functionName} href={`#${profile.slug}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-teal/40 hover:bg-teal/5 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-teal/40">
                <Badge className="border-teal/20 bg-white text-teal dark:bg-slate-900">{profile.functionName}</Badge>
                <h3 className="mt-3 text-base font-semibold text-ink">{profile.playbook.headline}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{profile.records.length} tracked record links · {profile.reviewFlags} review prompts</p>
              </a>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2" data-testid="business-function-workbench">
          {profiles.map((profile) => (
            <FunctionCard key={profile.functionName} profile={profile} />
          ))}
        </section>

        <AdvisoryScanCTA
          eyebrow="Owner-ready advisory scan"
          title="Need a function-by-function regulatory handoff?"
          body="Etica can prepare a source-linked owner matrix for selected jurisdictions, sectors or portfolios, including likely owners, evidence packs, first actions and source-review caveats."
          subject="Etica ESG owner workbench advisory scan"
          label="Request owner matrix"
          secondaryLabel="View advisory options"
          secondaryHref="/advisory"
        />
        <FooterDisclaimer />
      </div>
    </main>
  );
}

function FunctionCard({ profile }: { profile: ReturnType<typeof businessFunctionProfiles>[number] }) {
  const filterHref = `/regulations?businessFunction=${encodeURIComponent(profile.functionName)}`;

  return (
    <article id={profile.slug} className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge className="border-teal/20 bg-teal/10 text-teal">{profile.functionName}</Badge>
            <Badge className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">{profile.records.length} records</Badge>
            {profile.reviewFlags ? <Badge className="border-amber-200 bg-amber-50 text-amber-800">{profile.reviewFlags} review prompts</Badge> : null}
          </div>
          <h2 className="mt-4 text-xl font-bold tracking-tight text-ink">{profile.playbook.headline}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{profile.playbook.startQuestion}</p>
        </div>
        <Link href={filterHref} className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-teal underline">
          Filter database
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <MiniMetric label="High impact" value={String(profile.highImpact.length)} />
        <MiniMetric label="Source-backed" value={`${profile.sourceBacked}/${profile.records.length || 0}`} />
        <MiniMetric label="Priority-source" value={`${profile.primarySourceBacked}/${profile.records.length || 0}`} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <List title="First actions" values={profile.playbook.firstActions.slice(0, 3)} />
        <List title="Evidence focus" values={profile.playbook.evidenceFocus.slice(0, 5)} />
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-ink">Priority records</h3>
        <div className="mt-3 space-y-2">
          {profile.priorityRecords.length ? (
            profile.priorityRecords.slice(0, 4).map((regulation) => (
              <Link key={regulation.id} href={`/regulations/${regulation.id}`} className="group flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 hover:border-teal/40 hover:bg-teal/5 dark:border-slate-700 dark:bg-slate-800">
                <span>
                  <span className="block text-sm font-semibold text-ink">{regulation.shortName}</span>
                  <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-600 dark:text-slate-300">{regulation.summary}</span>
                </span>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-teal transition group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ))
          ) : (
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              No direct seed records currently name this function. Use the playbook as a planning prompt and confirm source relevance before assigning work.
            </p>
          )}
        </div>
      </div>

      <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">{profile.playbook.caveat}</p>
    </article>
  );
}

function Metric({ icon: Icon, label, value }: { icon: ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <Icon className="h-5 w-5 text-teal" aria-hidden="true" />
      <div className="mt-3 text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-bold text-ink">{value}</div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-lg font-bold text-ink">{value}</div>
    </div>
  );
}

function List({ title, values }: { title: string; values: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-3 space-y-2">
        {values.map((value) => (
          <li key={value} className={cn("rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700 dark:bg-slate-800 dark:text-slate-300")}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
