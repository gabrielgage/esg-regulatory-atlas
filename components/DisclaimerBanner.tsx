"use client";

import { AlertTriangle } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>{t("disclaimer.short")}</p>
      </div>
    </section>
  );
}
