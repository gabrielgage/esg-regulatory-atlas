"use client";

import { useState } from "react";
import { ClipboardCheck, ClipboardCopy } from "lucide-react";

export function CopyMarkdownButton({ text, label = "Copy as Markdown" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copyText() {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button
      type="button"
      onClick={copyText}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-navy px-4 text-sm font-semibold text-white hover:bg-slate-800"
    >
      {copied ? <ClipboardCheck className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </button>
  );
}
