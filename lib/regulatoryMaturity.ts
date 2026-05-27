import type { Regulation } from "@/types/regulation";

export type RegulatoryMaturityId =
  | "consultation"
  | "adopted"
  | "transition"
  | "first-reporting"
  | "in-force"
  | "paused"
  | "voluntary"
  | "monitor";

export type RegulatoryMaturity = {
  id: RegulatoryMaturityId;
  label: string;
  summary: string;
  planningUse: string;
  factsToVerify: string[];
  caution: string;
  className: string;
};

const maturityConfig: Record<RegulatoryMaturityId, Omit<RegulatoryMaturity, "id">> = {
  consultation: {
    label: "Consultation or proposal",
    summary: "The record is still being consulted on, proposed or shaped through official process.",
    planningUse: "Use for horizon scanning, response planning and early evidence-gap review.",
    factsToVerify: ["consultation deadline", "expected final rule timing", "whether scope or thresholds may change"],
    caution: "Do not treat consultation-stage items as binding obligations.",
    className: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100"
  },
  adopted: {
    label: "Adopted, not fully operating",
    summary: "The rule or standard has been adopted, but implementation, application timing or local guidance may still be developing.",
    planningUse: "Use for readiness planning, owner assignment and phase-in tracking.",
    factsToVerify: ["effective date", "first application period", "local guidance or transposition status"],
    caution: "Adopted status does not mean every entity is already in scope.",
    className: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-100"
  },
  transition: {
    label: "Transitional or phased",
    summary: "The requirement is moving through staged application, relief, phase-in or implementation guidance.",
    planningUse: "Use for milestone planning and staged controls, evidence and assurance workstreams.",
    factsToVerify: ["phase-in cohort", "relief or delay provisions", "first reporting or filing date"],
    caution: "Timing may differ by entity size, sector, listing status, market exposure or local implementation.",
    className: "border-violet/20 bg-violet/10 text-violet dark:border-violet/40 dark:bg-violet/15 dark:text-violet-100"
  },
  "first-reporting": {
    label: "First reporting active",
    summary: "The first reporting or early filing period is active or near enough to affect readiness priorities.",
    planningUse: "Use for reporting calendar, data-owner, control and assurance readiness planning.",
    factsToVerify: ["reporting period", "filing date", "assurance or approval requirement"],
    caution: "First reporting signals are date-sensitive and should be verified against current regulator guidance.",
    className: "border-teal/20 bg-teal/10 text-teal dark:border-teal/40 dark:bg-teal/15 dark:text-teal-100"
  },
  "in-force": {
    label: "In force",
    summary: "The rule is treated as currently operative in the Atlas seed record.",
    planningUse: "Use for source review, applicability triage and evidence-readiness planning.",
    factsToVerify: ["entity-specific scope", "thresholds or exemptions", "latest amendments or guidance"],
    caution: "In-force status does not determine whether a specific company is in scope.",
    className: "border-teal/20 bg-teal/10 text-teal dark:border-teal/40 dark:bg-teal/15 dark:text-teal-100"
  },
  paused: {
    label: "Paused, delayed or uncertain",
    summary: "The record has a paused, delayed, stayed or otherwise uncertain implementation signal.",
    planningUse: "Use for monitoring and scenario planning rather than firm implementation scheduling.",
    factsToVerify: ["current legal status", "litigation or delay status", "replacement or alternative regime"],
    caution: "Date and status should be rechecked before using this record in client-facing work.",
    className: "border-red-200 bg-red-50 text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-100"
  },
  voluntary: {
    label: "Voluntary or market practice",
    summary: "The record is voluntary, framework-based or driven primarily by investor, customer or market expectations.",
    planningUse: "Use for benchmarking, investor/customer data requests and voluntary readiness planning.",
    factsToVerify: ["whether a customer, investor or lender requires it", "framework version", "relationship to mandatory rules"],
    caution: "Voluntary status can still create commercial pressure, but it is not the same as direct legal force.",
    className: "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
  },
  monitor: {
    label: "Monitor item",
    summary: "The record is tracked because it may become relevant or affects market interpretation, but it should not be treated as a current direct requirement.",
    planningUse: "Use for watchlists, horizon scanning and source-review prioritization.",
    factsToVerify: ["current regulator position", "whether a binding rule exists", "date for next status review"],
    caution: "Monitor items should not be described as compliance obligations without source review.",
    className: "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
  }
};

export function maturityFor(regulation: Regulation): RegulatoryMaturity {
  const id = maturityIdFor(regulation);
  return { id, ...maturityConfig[id] };
}

export function maturityIdFor(regulation: Regulation): RegulatoryMaturityId {
  if (regulation.status === "consultation") return "consultation";
  if (regulation.status === "paused") return "paused";
  if (regulation.legalForce === "monitor" || regulation.displayTier === "monitor") return "monitor";
  if (regulation.status === "voluntary" || regulation.legalForce === "voluntary") return "voluntary";
  if (regulation.status === "first_reporting") return "first-reporting";
  if (regulation.status === "in_force") return "in-force";
  if (regulation.status === "transition") return "transition";
  return "adopted";
}

export function maturityCounts(regulations: Regulation[]) {
  return regulations.reduce(
    (counts, regulation) => {
      const id = maturityIdFor(regulation);
      counts[id] = (counts[id] || 0) + 1;
      return counts;
    },
    {} as Record<RegulatoryMaturityId, number>
  );
}
