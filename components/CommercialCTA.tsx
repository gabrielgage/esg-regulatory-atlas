import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function CommercialCTA({
  eyebrow = "Commercial validation",
  title,
  body,
  href,
  label,
  secondaryHref,
  secondaryLabel,
  compact = false
}: {
  eyebrow?: string;
  title: string;
  body: string;
  href: string;
  label: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  compact?: boolean;
}) {
  return (
    <section className={cn("rounded-2xl border bg-white shadow-sm", compact ? "p-4" : "p-6")}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">{eyebrow}</p>
          <h2 className={cn("mt-1 font-bold tracking-tight text-ink", compact ? "text-lg" : "text-2xl")}>{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{body}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {secondaryHref && secondaryLabel ? (
            <Link href={secondaryHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              {secondaryLabel}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : null}
          <a href={href} className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            <Mail className="h-4 w-4" />
            {label}
          </a>
        </div>
      </div>
    </section>
  );
}
