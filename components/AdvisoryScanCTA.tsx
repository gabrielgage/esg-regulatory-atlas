import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowUpRight, BriefcaseBusiness, FileText, Layers3, Mail, ScanSearch } from "lucide-react";
import { DATASET_META } from "@/data/_meta";
import { cn } from "@/lib/utils";

type AdvisoryScanCTAProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  subject?: string;
  emailBody?: string;
  label?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  compact?: boolean;
  showDeliverables?: boolean;
  className?: string;
  testId?: string;
};

const defaultEmailBody =
  "Hi Gabriel,\n\nI would like to discuss an ESG Regulatory Atlas advisory scan.\n\nContext:\n- Jurisdiction(s):\n- Sector / company type:\n- Main regulatory question:\n";

export function advisoryScanHref(subject = "Etica ESG advisory scan request", body = defaultEmailBody) {
  return `mailto:${DATASET_META.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function AdvisoryScanCTA({
  eyebrow = "Advisory-supported scan",
  title = "Request a source-linked advisory scan",
  body = "Share the jurisdiction, sector, company type, supplier, portfolio or regulation question you want reviewed. Etica can return a manually prepared exposure scan, market briefing or readiness note based on the current Atlas and source-review needs.",
  subject,
  emailBody,
  label = "Request advisory scan",
  secondaryLabel = "Advisory options",
  secondaryHref = "/advisory",
  compact = false,
  showDeliverables = true,
  className,
  testId
}: AdvisoryScanCTAProps) {
  return (
    <section
      data-testid={testId}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900",
        compact ? "p-4" : "p-5",
        className
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">{eyebrow}</p>
          <h2 className={cn("mt-1 font-bold tracking-tight text-ink", compact ? "text-lg" : "text-2xl")}>{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">{body}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {secondaryLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
          <a
            href={advisoryScanHref(subject, emailBody)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {label}
          </a>
        </div>
      </div>

      {showDeliverables && !compact ? (
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <CtaCard icon={FileText} title="Exposure scan" body="Relevant records, facts to confirm and source-review needs." />
          <CtaCard icon={ScanSearch} title="Market briefing" body="Jurisdiction-specific obligations, milestones and caveats." />
          <CtaCard icon={Layers3} title="Portfolio or supplier map" body="Indicative exposure across entities, assets or suppliers." />
          <CtaCard icon={BriefcaseBusiness} title="Readiness note" body="Owners, evidence, first actions and advisory workstreams." />
        </div>
      ) : null}

      <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">
        The public Atlas remains free to browse. Advisory scans are manual, source-linked planning outputs and are not legal opinions,
        official source verification or definitive applicability determinations. Premium alert and pack concepts remain secondary previews in{" "}
        <Link href="/plans" className="font-semibold text-teal underline">
          Plans
        </Link>
        .
      </p>
    </section>
  );
}

function CtaCard({
  icon: Icon,
  title,
  body
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
      <Icon className="h-5 w-5 text-teal" aria-hidden="true" />
      <h3 className="mt-3 text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{body}</p>
    </div>
  );
}
