import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function GlossaryHelpCard({
  title = "How to read these labels",
  body = "Use the glossary guide to interpret status, legal-force, confidence and source-quality labels before turning Atlas output into compliance planning.",
  compact = false,
  className
}: {
  title?: string;
  body?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-2xl border border-teal/20 bg-teal/5 text-sm leading-6 shadow-sm dark:border-teal/30 dark:bg-teal/10",
        compact ? "p-4" : "p-5",
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-teal ring-1 ring-teal/20 dark:bg-slate-900 dark:text-teal-200">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h2 className={compact ? "text-sm font-semibold text-ink" : "text-base font-semibold text-ink"}>{title}</h2>
            <p className="mt-1 text-slate-600 dark:text-slate-300">{body}</p>
          </div>
        </div>
        <Link
          href="/glossary"
          className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-navy dark:hover:bg-slate-200"
        >
          Open glossary <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
        Glossary content is plain-language orientation only. It is not an official legal definition, translation or applicability determination.
      </p>
    </aside>
  );
}
