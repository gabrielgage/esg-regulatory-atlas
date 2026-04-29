import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Regulation, Status } from "@/types/regulation";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export const statusLabel: Record<Status, string> = {
  consultation: "Consultation",
  adopted: "Adopted",
  in_force: "In force",
  first_reporting: "First reporting",
  transition: "Transition",
  paused: "Paused"
};

export const statusClass: Record<Status, string> = {
  consultation: "bg-amber-100 text-amber-800 border-amber-200",
  adopted: "bg-mint/30 text-teal border-teal/20",
  in_force: "bg-teal/10 text-teal border-teal/20",
  first_reporting: "bg-teal text-white border-teal",
  transition: "bg-violet/10 text-violet border-violet/20",
  paused: "bg-slate-200 text-slate-700 border-slate-300"
};

export function scoreJurisdiction(regs: Regulation[]) {
  const active = regs.filter(r => ["in_force", "first_reporting", "adopted"].includes(r.status)).length;
  if (active >= 5) return "high";
  if (active >= 2) return "medium";
  if (active >= 1) return "emerging";
  return "none";
}
