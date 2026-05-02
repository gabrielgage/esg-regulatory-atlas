import { Regulation } from "@/types/regulation";

export type ReadinessBand = "low" | "medium" | "high" | "very high";

export function readinessScore(regulation: Regulation) {
  let score = 0;

  if (regulation.highImpact) score += 20;
  score += Math.min(regulation.businessImpacts.length * 4, 24);
  if (regulation.businessImpacts.includes("assurance obligation")) score += 8;
  if (regulation.businessImpacts.includes("due diligence obligation")) score += 8;
  if (regulation.businessImpacts.includes("taxonomy disclosure obligation")) score += 6;
  if (regulation.firstReportingYear && regulation.firstReportingYear <= 2026) score += 14;
  else if (regulation.firstReportingYear && regulation.firstReportingYear <= 2028) score += 8;
  if (regulation.status === "in_force" || regulation.status === "first_reporting") score += 12;
  if (regulation.status === "transition" || regulation.status === "adopted") score += 8;
  if (regulation.confidenceLevel === "needs_review" || regulation.confidenceLevel === "date_uncertain") score += 4;
  if (regulation.dataQualityStatus === "needs_review" || regulation.dataQualityStatus === "date_uncertain") score += 4;
  if (regulation.sourceUrls.length >= 2) score += 4;

  return Math.min(score, 100);
}

export function readinessBand(regulation: Regulation): ReadinessBand {
  const score = readinessScore(regulation);
  if (score >= 72) return "very high";
  if (score >= 52) return "high";
  if (score >= 30) return "medium";
  return "low";
}

export function readinessReasons(regulation: Regulation) {
  const reasons: string[] = [];

  if (regulation.highImpact) reasons.push("high-impact record");
  if (regulation.firstReportingYear) reasons.push(`first reporting ${regulation.firstReportingYear}`);
  if (regulation.businessImpacts.includes("assurance obligation")) reasons.push("assurance planning");
  if (regulation.businessImpacts.includes("due diligence obligation")) reasons.push("due diligence workflow");
  if (regulation.businessImpacts.includes("data collection obligation")) reasons.push("data controls");
  if (regulation.confidenceLevel === "needs_review" || regulation.dataQualityStatus === "needs_review") reasons.push("source review needed");

  return reasons.slice(0, 4);
}

export function readinessClass(band: ReadinessBand) {
  if (band === "very high") return "border-red-200 bg-red-50 text-red-700";
  if (band === "high") return "border-amber-200 bg-amber-50 text-amber-800";
  if (band === "medium") return "border-blue-200 bg-blue-50 text-blue-700";
  return "border-slate-200 bg-slate-50 text-slate-600";
}
