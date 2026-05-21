"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LanguageCode, TranslationKey } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";
import { ThemeToggle } from "./ThemeToggle";

const primaryNavItems = [
  { href: "/", labelKey: "nav.map" },
  { href: "/markets", labelKey: "nav.markets" },
  { href: "/sectors", labelKey: "nav.sectors" },
  { href: "/regulations", labelKey: "nav.regulations" },
  { href: "/assessment", labelKey: "nav.assessment" },
  { href: "/plans", labelKey: "nav.plans" }
] satisfies Array<{ href: string; labelKey: TranslationKey }>;

const secondaryNavItems = [
  { href: "/timeline", labelKey: "nav.timeline" },
  { href: "/briefing", labelKey: "nav.briefing" },
  { href: "/value-chain", labels: { en: "Value chain", es: "Cadena de valor", nl: "Waardeketen", fr: "Chaîne de valeur", de: "Wertschöpfung", pt: "Cadeia de valor" } },
  { href: "/thresholds", labels: { en: "Thresholds", es: "Umbrales", nl: "Drempels", fr: "Seuils", de: "Schwellen", pt: "Limiares" } },
  { href: "/data-quality", labelKey: "nav.dataQuality" },
  { href: "/glossary", labels: { en: "Glossary", es: "Glosario", nl: "Woordenlijst", fr: "Glossaire", de: "Glossar", pt: "Glossário" } },
  { href: "/alerts", labelKey: "nav.alerts" },
  { href: "/advisory", labelKey: "nav.advisory" }
] satisfies Array<{ href: string; labelKey?: TranslationKey; labels?: Record<LanguageCode, string> }>;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function secondaryLabel(item: (typeof secondaryNavItems)[number], language: LanguageCode, t: (key: TranslationKey) => string) {
  return item.labelKey ? t(item.labelKey) : item.labels?.[language] || item.labels?.en || "Glossary";
}

export function Header() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const secondaryActive = secondaryNavItems.some((item) => isActive(pathname, item.href));

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur dark:bg-navy/92">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Etica ESG home">
          <div className="rounded-xl bg-white p-1 ring-1 ring-slate-200">
            <img className="h-8 w-8 md:h-9 md:w-9" src="/etica-esg-logo.svg" alt="Etica ESG" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-ink">Etica ESG</h1>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Regulatory Atlas</p>
          </div>
        </Link>
        <nav className="flex max-w-full flex-wrap gap-1 rounded-2xl border bg-slate-50 p-1 text-sm dark:border-slate-700 dark:bg-slate-900/75">
          {primaryNavItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-full px-3 py-2 font-semibold text-slate-600 transition hover:bg-white hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
                  active && "bg-white text-ink shadow-sm dark:bg-slate-800 dark:text-white"
                )}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
          <details className="group relative shrink-0">
            <summary
              className={cn(
                "flex cursor-pointer list-none items-center gap-1 rounded-full px-3 py-2 font-semibold text-slate-600 transition hover:bg-white hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white [&::-webkit-details-marker]:hidden",
                secondaryActive && "bg-white text-ink shadow-sm dark:bg-slate-800 dark:text-white"
              )}
            >
              {t("nav.more")} <ChevronDown className="h-3.5 w-3.5 transition group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 hidden w-64 rounded-2xl border bg-white p-2 shadow-xl group-open:block dark:border-slate-700 dark:bg-slate-900">
              {secondaryNavItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
                      active && "bg-slate-100 text-ink dark:bg-slate-800 dark:text-white"
                    )}
                  >
                    {secondaryLabel(item, language, t)}
                  </Link>
                );
              })}
            </div>
          </details>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-sm text-slate-600 md:flex">
            <ShieldCheck size={16} /> {t("header.legalPill")}
          </div>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
