import { AlertTriangle, CheckCircle2, CircleDot, ShieldCheck } from "lucide-react";
import { regulatoryStatusGuide, sourceConfidenceGuide, type GlossaryGuideItem } from "@/data/glossaryGuides";
import { cn } from "@/lib/utils";

const guideGroups = [
  {
    eyebrow: "Regulatory status guide",
    title: "How to read status labels",
    description:
      "Status labels explain where a rule sits in the regulatory lifecycle. They are planning signals, not entity-specific applicability conclusions.",
    items: regulatoryStatusGuide
  },
  {
    eyebrow: "Source confidence guide",
    title: "How to read source and data-quality labels",
    description:
      "Source labels explain how much review confidence the current seed record carries and what should be checked before higher-stakes use.",
    items: sourceConfidenceGuide
  }
] as const;

export function GlossaryGuide() {
  return (
    <section className="grid gap-5 lg:grid-cols-2" aria-label="Status and source confidence guide">
      {guideGroups.map((group) => (
        <article key={group.eyebrow} className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">{group.eyebrow}</p>
          <h2 className="mt-2 text-xl font-semibold text-ink">{group.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{group.description}</p>
          <div className="mt-5 space-y-3">
            {group.items.map((item) => (
              <GuideCard key={item.label} item={item} />
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

function GuideCard({ item }: { item: GlossaryGuideItem }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/40">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("inline-flex h-8 w-8 items-center justify-center rounded-full", toneClass(item.tone))}>{toneIcon(item.tone)}</span>
          <h3 className="text-base font-semibold text-ink">{item.label}</h3>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          Interpretation cue
        </span>
      </div>
      <dl className="mt-4 grid gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        <div>
          <dt className="font-semibold text-ink">Signal</dt>
          <dd>{item.signal}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">What it means</dt>
          <dd>{item.means}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">Next user action</dt>
          <dd>{item.userAction}</dd>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">
          <dt className="font-semibold">Caveat</dt>
          <dd className="mt-1">{item.caveat}</dd>
        </div>
      </dl>
    </div>
  );
}

function toneClass(tone: GlossaryGuideItem["tone"]) {
  switch (tone) {
    case "active":
      return "bg-teal/10 text-teal ring-1 ring-teal/20 dark:bg-teal/15 dark:text-teal-200";
    case "watch":
      return "bg-amber-100 text-amber-800 ring-1 ring-amber-200 dark:bg-amber-400/15 dark:text-amber-100 dark:ring-amber-300/25";
    case "risk":
      return "bg-rose-100 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-400/15 dark:text-rose-100 dark:ring-rose-300/25";
    default:
      return "bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700";
  }
}

function toneIcon(tone: GlossaryGuideItem["tone"]) {
  switch (tone) {
    case "active":
      return <CheckCircle2 className="h-4 w-4" aria-hidden="true" />;
    case "watch":
      return <CircleDot className="h-4 w-4" aria-hidden="true" />;
    case "risk":
      return <AlertTriangle className="h-4 w-4" aria-hidden="true" />;
    default:
      return <ShieldCheck className="h-4 w-4" aria-hidden="true" />;
  }
}
