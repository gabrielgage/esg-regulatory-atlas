import type { Regulation, SourceLink } from "@/types/regulation";
import { formatDate } from "@/lib/utils";

export type SourceFreshnessLevel =
  | "current"
  | "upcoming-review"
  | "stale"
  | "review-date-missing"
  | "priority-source-needed"
  | "source-missing";

export type SourceEvidence = {
  level: SourceFreshnessLevel;
  levelLabel: string;
  prioritySource?: SourceLink;
  sourceCount: number;
  prioritySourceCount: number;
  reviewTiming: string;
  sourceAuthority: string;
  reviewPacket: string[];
  sourceReviewSteps: string[];
};

const priorityRank: Record<SourceLink["type"], number> = {
  primary: 0,
  regulator: 1,
  standards_body: 2,
  secondary: 3
};

const sourceTypeLabel: Record<SourceLink["type"], string> = {
  primary: "Primary law or regulation",
  regulator: "Regulator guidance",
  standards_body: "Standard setter material",
  secondary: "Secondary commentary"
};

export const sourceFreshnessClass: Record<SourceFreshnessLevel, string> = {
  current: "border-teal/20 bg-teal/10 text-teal",
  "upcoming-review": "border-amber-200 bg-amber-50 text-amber-800",
  stale: "border-red-200 bg-red-50 text-red-700",
  "review-date-missing": "border-violet/20 bg-violet/10 text-violet",
  "priority-source-needed": "border-amber-200 bg-amber-50 text-amber-800",
  "source-missing": "border-red-200 bg-red-50 text-red-700"
};

export function sourceEvidenceFor(regulation: Regulation): SourceEvidence {
  const sortedSources = regulation.sourceUrls.slice().sort((a, b) => priorityRank[a.type] - priorityRank[b.type]);
  const prioritySource = sortedSources[0];
  const prioritySourceCount = regulation.sourceUrls.filter(isPrioritySource).length;
  const level = sourceFreshnessLevelFor(regulation, prioritySourceCount);

  return {
    level,
    levelLabel: sourceFreshnessLabel(level),
    prioritySource,
    sourceCount: regulation.sourceUrls.length,
    prioritySourceCount,
    reviewTiming: reviewTimingFor(regulation),
    sourceAuthority: prioritySource ? sourceTypeLabel[prioritySource.type] : "No source captured",
    reviewPacket: reviewPacketFor(regulation, prioritySource),
    sourceReviewSteps: sourceReviewStepsFor(regulation, prioritySourceCount)
  };
}

export function sourceLabelFor(type: SourceLink["type"]) {
  return sourceTypeLabel[type];
}

export function sourceHost(source: SourceLink) {
  try {
    return new URL(source.url).hostname.replace(/^www\./, "");
  } catch {
    return "source link";
  }
}

export function sourceGovernanceMemo(regulation: Regulation) {
  const evidence = sourceEvidenceFor(regulation);
  const sourceLines = regulation.sourceUrls.length
    ? regulation.sourceUrls.map((source) => `- ${sourceLabelFor(source.type)}: ${source.label} (${source.url})`)
    : ["- No source URL captured yet."];

  return [
    `# Source review memo - ${regulation.shortName}`,
    "",
    `Regulation: ${regulation.title}`,
    `Jurisdiction: ${regulation.jurisdiction}`,
    `Current Atlas status: ${regulation.status.replaceAll("_", " ")}`,
    `Source posture: ${evidence.levelLabel}`,
    `Priority source to verify: ${evidence.prioritySource ? evidence.prioritySource.label : "Add a primary, regulator or standard-setter source."}`,
    `Last reviewed: ${formatDate(regulation.lastReviewed)}`,
    `Next review: ${formatDate(regulation.nextReviewDate)}`,
    `Confidence: ${regulation.confidenceLevel.replaceAll("_", " ")}`,
    `Data quality: ${regulation.dataQualityStatus.replaceAll("_", " ")}`,
    "",
    "## Facts to confirm",
    ...(regulation.applicabilityScope?.thresholds?.length
      ? regulation.applicabilityScope.thresholds.map((threshold) => `- ${threshold}`)
      : ["- Confirm entity thresholds, sector scope, listing status, cross-border triggers and phase-in timing from official sources."]),
    "",
    "## Source-review steps",
    ...evidence.sourceReviewSteps.map((step) => `- ${step}`),
    "",
    "## Captured sources",
    ...sourceLines,
    "",
    "## Caveat",
    "This memo is seed regulatory intelligence for orientation and planning only. It does not constitute legal, tax, investment or assurance advice and should be validated with qualified counsel or regulatory advisors before compliance reliance."
  ].join("\n");
}

function sourceFreshnessLevelFor(regulation: Regulation, prioritySourceCount: number): SourceFreshnessLevel {
  if (!regulation.sourceUrls.length || regulation.dataQualityStatus === "source_missing") return "source-missing";
  if (!prioritySourceCount) return "priority-source-needed";
  if (!regulation.nextReviewDate) return "review-date-missing";
  if (isPast(regulation.nextReviewDate)) return "stale";
  if (isDueSoon(regulation.nextReviewDate)) return "upcoming-review";
  return "current";
}

function sourceFreshnessLabel(level: SourceFreshnessLevel) {
  if (level === "source-missing") return "Source missing";
  if (level === "priority-source-needed") return "Priority source needed";
  if (level === "review-date-missing") return "Review date missing";
  if (level === "stale") return "Stale source review";
  if (level === "upcoming-review") return "Upcoming review";
  return "Review current";
}

function reviewTimingFor(regulation: Regulation) {
  if (!regulation.nextReviewDate) return "No next-review date captured; add one before premium or advisory reuse.";
  if (isPast(regulation.nextReviewDate)) return `Next review date has passed: ${formatDate(regulation.nextReviewDate)}. Refresh before client-ready use.`;
  if (isDueSoon(regulation.nextReviewDate)) return `Review is due soon: ${formatDate(regulation.nextReviewDate)}. Recheck status, thresholds and dates before reuse.`;
  return `Next review scheduled for ${formatDate(regulation.nextReviewDate)}. Keep caveats attached to copied outputs.`;
}

function reviewPacketFor(regulation: Regulation, prioritySource?: SourceLink) {
  const items = new Set<string>();
  items.add(prioritySource ? `Verify ${prioritySource.label} as the priority source.` : "Add at least one primary, regulator or standard-setter source.");
  items.add("Confirm legal status, effective date, first reporting year and any phase-in relief.");
  items.add("Confirm entity thresholds, cross-border triggers and sector scope before applicability use.");
  items.add("Capture reviewer name, review date, source date and unresolved caveats.");
  if (regulation.penalties) items.add("Check whether penalty and enforcement language remains current.");
  if (regulation.dataQualityStatus !== "verified_seed") items.add(`Resolve data-quality status: ${regulation.dataQualityStatus.replaceAll("_", " ")}.`);
  return Array.from(items);
}

function sourceReviewStepsFor(regulation: Regulation, prioritySourceCount: number) {
  const steps = new Set<string>();
  if (!regulation.sourceUrls.length) {
    steps.add("Find an official legal, regulator or standard-setter source before client-ready use.");
  } else if (!prioritySourceCount) {
    steps.add("Replace or supplement secondary commentary with an official source.");
  } else {
    steps.add("Open the priority source and confirm the source date, current legal status and latest amendments.");
  }
  steps.add(`Compare captured Atlas dates against the source: effective ${formatDate(regulation.effectiveDate)}, first reporting ${regulation.firstReportingYear || "n/a"}.`);
  steps.add(`Confirm last-reviewed metadata remains current: ${formatDate(regulation.lastReviewed)}.`);
  steps.add("Record unresolved threshold, status or transposition uncertainty before using this in premium examples.");
  return Array.from(steps);
}

function isPrioritySource(source: SourceLink) {
  return source.type === "primary" || source.type === "regulator" || source.type === "standards_body";
}

function isDueSoon(date: string) {
  const reviewDate = new Date(date);
  if (Number.isNaN(reviewDate.getTime())) return false;
  const ninetyDays = 1000 * 60 * 60 * 24 * 90;
  const delta = reviewDate.getTime() - Date.now();
  return delta >= 0 && delta <= ninetyDays;
}

function isPast(date: string) {
  const reviewDate = new Date(date);
  if (Number.isNaN(reviewDate.getTime())) return false;
  return reviewDate.getTime() < Date.now();
}
