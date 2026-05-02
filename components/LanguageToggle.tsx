"use client";

import { Globe2 } from "lucide-react";
import { languages } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className="inline-flex h-10 items-center gap-2 rounded-full border bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm">
      <Globe2 className="h-4 w-4 text-teal" aria-hidden="true" />
      <span className="sr-only">{t("language.label")}</span>
      <select
        className="h-8 border-0 bg-transparent p-0 text-sm font-semibold text-slate-700 outline-none"
        aria-label={t("language.label")}
        value={language}
        onChange={(event) => setLanguage(event.target.value as typeof language)}
      >
        {languages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.shortLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
