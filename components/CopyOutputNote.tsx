import { LEGAL_NOTICES } from "@/data/legalNotices";

export function CopyOutputNote({ className = "" }: { className?: string }) {
  const classes = ["print:hidden text-xs leading-5 text-slate-500 dark:text-slate-400", className].filter(Boolean).join(" ");

  return <p className={classes}>{LEGAL_NOTICES.copyOutput}</p>;
}
