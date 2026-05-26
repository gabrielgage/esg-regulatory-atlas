import { Mail, Send } from "lucide-react";
import { DATASET_META } from "@/data/_meta";
import { LEGAL_NOTICES } from "@/data/legalNotices";
import { LegalNotice } from "./LegalNotice";

type ManualRequestPanelProps = {
  title?: string;
  body?: string;
  subject: string;
  requestType?: string;
  whatToSend?: string[];
  whatEticaReturns?: string[];
  timing?: string;
};

export function ManualRequestPanel({
  title = "How to request support",
  body = "The MVP uses direct email requests so Etica can validate which premium previews, market packs and advisory scans are actually useful before adding product infrastructure.",
  subject,
  requestType = "Atlas request",
  whatToSend = ["Jurisdiction or market focus", "Company type, sector or portfolio context", "Main regulatory question", "Preferred output: alert preview, market pack, exposure scan or briefing"],
  whatEticaReturns = ["Cautious source-linked orientation", "Priority records and facts to confirm", "Evidence and owner prompts", "Recommended next review steps"],
  timing = "Manual response target: 1-2 business days for an initial scoping reply."
}: ManualRequestPanelProps) {
  const href = `mailto:${DATASET_META.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Hi Gabriel,\n\nI would like to request ${requestType}.\n\nContext:\n- Jurisdiction(s):\n- Sector/company type:\n- Main question:\n- Preferred output:\n`
  )}`;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal dark:text-mint">Manual request path</p>
          <h2 className="mt-1 text-xl font-semibold text-ink dark:text-white">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">{body}</p>
          <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">{timing}</p>
        </div>
        <a href={href} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-mint dark:text-ink dark:hover:bg-teal">
          <Mail className="h-4 w-4" />
          Email Etica ESG
        </a>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <RequestList title="What to send" values={whatToSend} />
        <RequestList title="What Etica returns" values={whatEticaReturns} />
      </div>
      <LegalNotice compact className="mt-4">{LEGAL_NOTICES.manualRequest}</LegalNotice>
    </section>
  );
}

function RequestList({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {values.map((value) => (
          <li key={value} className="flex gap-2">
            <Send className="mt-1 h-3.5 w-3.5 shrink-0 text-teal dark:text-mint" />
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
