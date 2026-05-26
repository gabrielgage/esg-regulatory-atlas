import type { ReactNode } from "react";
import { AlertTriangle, Info } from "lucide-react";

type LegalNoticeTone = "amber" | "slate" | "teal";

type LegalNoticeProps = {
  children: ReactNode;
  title?: string;
  tone?: LegalNoticeTone;
  compact?: boolean;
  className?: string;
};

const toneClasses: Record<LegalNoticeTone, string> = {
  amber:
    "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100",
  slate:
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200",
  teal:
    "border-teal/25 bg-teal/5 text-slate-700 dark:border-teal/30 dark:bg-teal/10 dark:text-slate-200"
};

export function LegalNotice({ children, title, tone = "amber", compact = false, className = "" }: LegalNoticeProps) {
  const Icon = tone === "amber" ? AlertTriangle : Info;
  const classes = [
    "rounded-2xl border",
    toneClasses[tone],
    compact ? "px-4 py-3 text-xs leading-5" : "p-4 text-sm leading-6",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes}>
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <div>
          {title ? <p className="font-semibold">{title}</p> : null}
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
