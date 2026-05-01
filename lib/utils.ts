import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Regulation, Status } from "@/types/regulation";
import { statusLabel } from "@/data/taxonomy";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export const statusClass: Record<Status, string> = {
  consultation: "bg-amber-100 text-amber-800 border-amber-200",
  adopted: "bg-mint/30 text-teal border-teal/20",
  in_force: "bg-teal/10 text-teal border-teal/20",
  first_reporting: "bg-teal text-white border-teal",
  transition: "bg-violet/10 text-violet border-violet/20",
  paused: "bg-slate-200 text-slate-700 border-slate-300",
  voluntary: "bg-slate-100 text-slate-700 border-slate-200"
};

export function scoreJurisdiction(regs: Regulation[]) {
  const active = regs.filter(r => ["in_force", "first_reporting", "adopted"].includes(r.status)).length;
  if (active >= 5) return "high";
  if (active >= 2) return "medium";
  if (active >= 1) return "emerging";
  return "none";
}

export { statusLabel };

export function formatDate(value?: string) {
  if (!value) return "n/a";
  if (value.toLowerCase().includes("uncertain")) return value;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

export function uniq(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}
