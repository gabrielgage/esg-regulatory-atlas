import { jurisdictions, regulations } from "@/data/seed";
import { fallbackMarketQuickStart, marketQuickStartFor } from "@/data/marketQuickStarts";
import { coverageConfidenceForJurisdiction } from "@/lib/coverageConfidence";
import { recordsForJurisdiction } from "@/lib/layers";
import { readinessScore } from "@/lib/scoring";
import { uniq } from "@/lib/utils";
import type { Jurisdiction, Regulation } from "@/types/regulation";

export function findJurisdictionByCode(code: string) {
  const normalized = code.toLowerCase();
  return jurisdictions.find((jurisdiction) => jurisdiction.code.toLowerCase() === normalized || jurisdiction.id.toLowerCase() === normalized);
}

export function marketProfileFor(jurisdiction: Jurisdiction) {
  const scoped = recordsForJurisdiction(jurisdiction, regulations);
  const directRecords = regulations.filter((regulation) => regulation.jurisdictionIds.includes(jurisdiction.id));
  const inheritedRecords = jurisdiction.parent ? regulations.filter((regulation) => regulation.jurisdictionIds.includes(jurisdiction.parent || "")) : [];
  const highImpact = scoped.filter((regulation) => regulation.highImpact);
  const priorityRecords = [...scoped].sort(prioritySort).slice(0, 8);
  const watchItems = scoped
    .filter(
      (regulation) =>
        regulation.status === "consultation" ||
        regulation.status === "transition" ||
        regulation.confidenceLevel !== "high" ||
        regulation.dataQualityStatus !== "verified_seed"
    )
    .sort(prioritySort)
    .slice(0, 6);
  const years = uniq(scoped.map((regulation) => String(regulation.firstReportingYear || "")).filter(Boolean)).sort();
  const sourceBacked = scoped.filter((regulation) => regulation.sourceUrls.length > 0).length;
  const primarySourceBacked = scoped.filter((regulation) =>
    regulation.sourceUrls.some((source) => source.type === "primary" || source.type === "regulator" || source.type === "standards_body")
  ).length;
  const reviewFlags = scoped.filter((regulation) => regulation.dataQualityStatus !== "verified_seed" || regulation.confidenceLevel !== "high").length;
  const coverageConfidence = coverageConfidenceForJurisdiction(jurisdiction, regulations);

  return {
    jurisdiction,
    coverageConfidence,
    scoped,
    directRecords,
    inheritedRecords,
    priorityRecords,
    watchItems,
    highImpact,
    years,
    sourceBacked,
    primarySourceBacked,
    reviewFlags,
    topics: uniq(scoped.flatMap((regulation) => regulation.topics)).slice(0, 12),
    sectors: uniq(scoped.flatMap((regulation) => regulation.sectors)).slice(0, 12),
    businessImpacts: uniq(scoped.flatMap((regulation) => regulation.businessImpacts)).slice(0, 12),
    valueChain: uniq(scoped.flatMap((regulation) => regulation.valueChain)).slice(0, 12),
    affectedFunctions: uniq(scoped.flatMap((regulation) => regulation.affectedFunctions)).slice(0, 12),
    advisoryOpportunities: uniq(scoped.flatMap((regulation) => regulation.advisoryOpportunities)).slice(0, 12),
    evidenceRequired: uniq(scoped.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 12),
    requiredActions: uniq(scoped.flatMap((regulation) => regulation.requiredActions || [])).slice(0, 10)
  };
}

export function marketProfiles() {
  return jurisdictions
    .filter((jurisdiction) => jurisdiction.type !== "international")
    .map((jurisdiction) => marketProfileFor(jurisdiction));
}

export function buildMarketMarkdown(jurisdiction: Jurisdiction, records: Regulation[]) {
  const relevant = [...records].sort(prioritySort).slice(0, 8);
  const years = uniq(relevant.map((regulation) => String(regulation.firstReportingYear || "")).filter(Boolean));
  const impacts = uniq(relevant.flatMap((regulation) => regulation.businessImpacts)).slice(0, 8);
  const evidence = uniq(relevant.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 8);
  const actions = uniq(relevant.flatMap((regulation) => regulation.requiredActions || [])).slice(0, 8);
  const quickStart = marketQuickStartFor(jurisdiction.id) || fallbackMarketQuickStart(jurisdiction, actions);

  return [
    `# ${jurisdiction.name} market profile`,
    "",
    "This is indicative seed regulatory intelligence for orientation and planning. It is not legal, tax, investment or assurance advice.",
    "",
    "## Market quick start",
    quickStart.headline,
    "",
    `Planning question: ${quickStart.userQuestion}`,
    "",
    "### First 30-day actions",
    ...quickStart.firstActions.map((action) => `- ${action}`),
    "",
    "## Priority records",
    ...(relevant.length ? relevant.map((regulation) => `- ${regulation.shortName}: ${regulation.summary}`) : ["- No tracked records in the current seed dataset."]),
    "",
    `First reporting years captured: ${years.join(", ") || "n/a"}`,
    `Main business impacts: ${impacts.join(", ") || "n/a"}`,
    "",
    "## Evidence to prepare",
    ...(quickStart.evidenceStarterPack.length ? quickStart.evidenceStarterPack.map((item) => `- ${item}`) : evidence.length ? evidence.map((item) => `- ${item}`) : ["- Applicability assessment", "- Source review log", "- Entity threshold evidence"]),
    "",
    "## Likely owner functions",
    ...quickStart.ownerFunctions.map((owner) => `- ${owner}`),
    "",
    "## Watch items",
    ...quickStart.watchItems.map((item) => `- ${item}`),
    "",
    "## Caveat",
    `${quickStart.caveat} Applicability depends on entity-specific facts, local implementation, thresholds, sector rules and legal interpretation. Review primary sources and qualified advice before reliance.`
  ].join("\n");
}

function prioritySort(a: Regulation, b: Regulation) {
  if (Boolean(b.highImpact) !== Boolean(a.highImpact)) return Number(Boolean(b.highImpact)) - Number(Boolean(a.highImpact));
  return readinessScore(b) - readinessScore(a);
}
