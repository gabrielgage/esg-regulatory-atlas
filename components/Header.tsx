"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Map" },
  { href: "/regulations", label: "Regulations" },
  { href: "/assessment", label: "Assessment" },
  { href: "/timeline", label: "Timeline" },
  { href: "/briefing", label: "Briefing" },
  { href: "/data-quality", label: "Data Quality" }
];

export function Header() {
  const pathname = usePathname();

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
        <nav className="flex gap-1 overflow-x-auto rounded-full border bg-slate-50 p-1 text-sm">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-full px-3 py-2 font-semibold text-slate-600 transition hover:bg-white hover:text-ink",
                  active && "bg-white text-ink shadow-sm"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-sm text-slate-600 md:flex">
            <ShieldCheck size={16} /> Intelligence tool, not legal advice
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
