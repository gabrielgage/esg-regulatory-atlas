import { coverageTargetByJurisdiction } from "@/data/coverageTargets";
import { recordsForJurisdiction } from "@/lib/layers";
import type { Jurisdiction, Regulation } from "@/types/regulation";

export type CoverageConfidenceLevel = "source-reviewed" | "usable-seed" | "review-needed" | "watch-only";

export type CoverageConfidence = {
  jurisdiction: Jurisdiction;
  directCount: number;
  scopedCount: number;
  targetCount: number;
  missingDirectRecords: number;
  sourceBackedCount: number;
  prioritySourceCount: number;
  verifiedCount: number;
  highConfidenceCount: number;
  reviewFlagCount: number;
  staleCount: number;
  dateSensitiveCount: number;
  confidenceScore: number;
  level: CoverageConfidenceLevel;
  nextAction: string;
};

export const coverageConfidenceLabel: Record<CoverageConfidenceLevel, string> = {
  "source-reviewed": "Source-reviewed seed",
  "usable-seed": "Usable seed coverage",
  "review-needed": "Review needed",
  "watch-only": "Watch-only"
};

export function coverageConfidenceForJurisdiction(jurisdiction: Jurisdiction, regulations: Regulation[]): CoverageConfidence {
  const scoped = recordsForJurisdiction(jurisdiction, regulations);
  const direct = regulations.filter((regulation) => regulation.jurisdictionIds.includes(jurisdiction.id));
  const target = coverageTargetByJurisdiction.get(jurisdiction.id);
  const targetCount = target?.targetDirectRecords || 3;
  const missingDirectRecords = Math.max(0, targetCount - direct.length);
  const sourceBackedCount = scoped.filter((regulation) => regulation.sourceUrls.length > 0).length;
  const prioritySourceCount = scoped.filter(hasPrioritySource).length;
  const verifiedCount = scoped.filter((regulation) => regulation.dataQualityStatus === "verified_seed").length;
  const highConfidenceCount = scoped.filter((regulation) => regulation.confidenceLevel === "high").length;
  const reviewFlagCount = scoped.filter(hasReviewFlag).length;
  const staleCount = scoped.filter((regulation) => isOverdue(regulation.nextReviewDate)).length;
  const dateSensitiveCount = scoped.filter(isDateSensitive).length;

  const scopedCount = scoped.length || 1;
  const depthScore = Math.min(1, direct.length / targetCount) * 30;
  const prioritySourceScore = (prioritySourceCount / scopedCount) * 25;
  const highConfidenceScore = (highConfidenceCount / scopedCount) * 20;
  const verifiedScore = (verifiedCount / scopedCount) * 15;
  const reviewPenalty = (reviewFlagCount / scopedCount) * 20;
  const stalePenalty = (staleCount / scopedCount) * 10;
  const confidenceScore = Math.max(0, Math.min(100, Math.round(depthScore + prioritySourceScore + highConfidenceScore + verifiedScore + 10 - reviewPenalty - stalePenalty)));
  const level = classifyCoverageConfidence({
    directCount: direct.length,
    missingDirectRecords,
    prioritySourceRatio: prioritySourceCount / scopedCount,
    highConfidenceRatio: highConfidenceCount / scopedCount,
    reviewFlagRatio: reviewFlagCount / scopedCount,
    confidenceScore
  });

  return {
    jurisdiction,
    directCount: direct.length,
    scopedCount: scoped.length,
    targetCount,
    missingDirectRecords,
    sourceBackedCount,
    prioritySourceCount,
    verifiedCount,
    highConfidenceCount,
    reviewFlagCount,
    staleCount,
    dateSensitiveCount,
    confidenceScore,
    level,
    nextAction: nextCoverageAction(level, missingDirectRecords, reviewFlagCount, staleCount, dateSensitiveCount)
  };
}

export function coverageConfidenceClass(level: CoverageConfidenceLevel) {
  if (level === "source-reviewed") return "border-teal/20 bg-teal/10 text-teal";
  if (level === "usable-seed") return "border-blue-200 bg-blue-50 text-blue-700";
  if (level === "review-needed") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-slate-200 bg-slate-50 text-slate-600";
}

function classifyCoverageConfidence({
  directCount,
  missingDirectRecords,
  prioritySourceRatio,
  highConfidenceRatio,
  reviewFlagRatio,
  confidenceScore
}: {
  directCount: number;
  missingDirectRecords: number;
  prioritySourceRatio: number;
  highConfidenceRatio: number;
  reviewFlagRatio: number;
  confidenceScore: number;
}) {
  if (directCount === 0) return "watch-only";
  if (missingDirectRecords === 0 && prioritySourceRatio >= 0.75 && highConfidenceRatio >= 0.6 && reviewFlagRatio <= 0.3 && confidenceScore >= 70) {
    return "source-reviewed";
  }
  if (missingDirectRecords === 0 && prioritySourceRatio >= 0.55 && reviewFlagRatio <= 0.55 && confidenceScore >= 50) {
    return "usable-seed";
  }
  return "review-needed";
}

function nextCoverageAction(level: CoverageConfidenceLevel, missing: number, reviewFlags: number, stale: number, dateSensitive: number) {
  if (level === "source-reviewed") return "Keep on normal review cadence before premium or advisory reuse.";
  if (missing > 0) return `Add ${missing} direct source-linked record${missing === 1 ? "" : "s"} or mark the market as watch-only before commercial use.`;
  if (stale > 0) return "Refresh stale source dates and confirm whether status, thresholds or phase-ins changed.";
  if (dateSensitive > 0) return "Recheck date-sensitive milestones before using this market in a client-ready output.";
  if (reviewFlags > 0) return "Resolve source, threshold or confidence flags before using the market in premium examples.";
  return "Use as seed intelligence only and confirm primary sources before client reliance.";
}

function hasPrioritySource(regulation: Regulation) {
  return regulation.sourceUrls.some((source) => source.type === "primary" || source.type === "regulator" || source.type === "standards_body");
}

function hasReviewFlag(regulation: Regulation) {
  return regulation.dataQualityStatus !== "verified_seed" || regulation.confidenceLevel !== "high" || regulation.sourceConfidence === "needs_review";
}

function isDateSensitive(regulation: Regulation) {
  return (
    regulation.dataQualityStatus === "date_uncertain" ||
    regulation.status === "consultation" ||
    regulation.status === "transition" ||
    regulation.status === "paused" ||
    isDueSoon(regulation.consultationDeadline) ||
    isDueSoon(regulation.firstReportDueDate)
  );
}

function isDueSoon(date?: string) {
  if (!date) return false;
  const reviewDate = new Date(date);
  if (Number.isNaN(reviewDate.getTime())) return false;
  const ninetyDays = 1000 * 60 * 60 * 24 * 90;
  const delta = reviewDate.getTime() - Date.now();
  return delta >= 0 && delta <= ninetyDays;
}

function isOverdue(date?: string) {
  if (!date) return false;
  const reviewDate = new Date(date);
  if (Number.isNaN(reviewDate.getTime())) return false;
  return reviewDate.getTime() < Date.now();
}
