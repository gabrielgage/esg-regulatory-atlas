"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label = "Print brief" }: { label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      data-print-hidden="true"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 print:hidden"
    >
      <Printer className="h-4 w-4" />
      {label}
    </button>
  );
}
