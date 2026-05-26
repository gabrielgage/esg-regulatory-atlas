"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { primaryNavItems, routeLabel, secondaryNavGroups } from "@/data/routeRegistry";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";
import { ThemeToggle } from "./ThemeToggle";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const secondaryActive = secondaryNavGroups.some((group) => group.items.some((item) => isActive(pathname, item.href)));

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur dark:bg-navy/92">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Etica ESG home">
          <div className="rounded-xl bg-white p-1 ring-1 ring-slate-200">
            <img className="h-8 w-8 md:h-9 md:w-9" src="/etica-esg-logo.svg" alt="Etica ESG" />
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight text-ink">Etica ESG</div>
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
                {routeLabel(item, language, t)}
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
            <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 hidden w-72 rounded-2xl border bg-white p-2 shadow-xl group-open:block dark:border-slate-700 dark:bg-slate-900">
              {secondaryNavGroups.map((group) => (
                <div key={group.labels.en} className="border-b border-slate-100 py-2 last:border-b-0 dark:border-slate-800">
                  <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {group.labels[language] || group.labels.en}
                  </div>
                  {group.items.map((item) => {
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
                        {routeLabel(item, language, t)}
                      </Link>
                    );
                  })}
                </div>
              ))}
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
