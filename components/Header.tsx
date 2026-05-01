"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Map" },
  { href: "/regulations", label: "Regulations" },
  { href: "/assessment", label: "Assessment" },
  { href: "/timeline", label: "Timeline" },
  { href: "/briefing", label: "Briefing" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-navy p-2 text-white">
            <Globe2 size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">ESG Regulatory Atlas</h1>
            <p className="text-sm text-slate-500">Sustainability regulatory intelligence workspace</p>
          </div>
        </div>
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
        <div className="hidden items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-sm text-slate-600 xl:flex">
          <ShieldCheck size={16} /> Intelligence tool, not legal advice
        </div>
      </div>
    </header>
  );
}
