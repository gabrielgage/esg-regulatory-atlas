"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function ShareViewButton() {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
    >
      <Link2 className="h-4 w-4 text-teal" />
      {copied ? t("share.copied") : t("share.copyView")}
    </button>
  );
}
