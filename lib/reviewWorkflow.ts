import { marqueeReviewItems } from "@/data/contentReview";
import { decisionReadinessFor } from "@/lib/decisionReadiness";
import { sourceEvidenceFor } from "@/lib/sourceGovernance";
import type { Regulation } from "@/types/regulation";
import { formatDate } from "@/lib/utils";

export type ReviewWorkflowRow = {
  id: string;
  shortName: string;
  title: string;
  jurisdiction: string;
  tier: string;
  premiumSurface: string;
  owner: string;
  decisionGate: string;
  sourcePosture: string;
  prioritySource: string;
  prioritySourceUrl: string;
  lastReviewed: string;
  nextReview: string;
  reviewPriority: number;
  premiumUse: string;
  sourceNextAction: string;
  thresholdNextAction: string;
  factsToConfirm: string[];
  evidenceNeeded: string[];
  firstActions: string[];
  caveat: string;
};

export function buildReviewWorkflowRows(regulations: Regulation[]) {
  return regulations
    .map((regulation) => reviewWorkflowRowFor(regulation, regulations))
    .sort((a, b) => b.reviewPriority - a.reviewPriority || a.shortName.localeCompare(b.shortName));
}

export function reviewWorkflowRowFor(regulation: Regulation, allRegulations: Regulation[]): ReviewWorkflowRow {
  const reviewItem = marqueeReviewItems.find((item) => item.id === regulation.id);
  const decision = decisionReadinessFor(regulation, allRegulations);
  const source = sourceEvidenceFor(regulation);

  return {
    id: regulation.id,
    shortName: regulation.shortName,
    title: regulation.title,
    jurisdiction: regulation.jurisdiction,
    tier: reviewItem?.tier || regulation.displayTier || "expanded",
    premiumSurface: reviewItem?.premiumUse || premiumSurfaceFor(regulation),
    owner: reviewItem?.ownerPlaceholder || decision.owner,
    decisionGate: decision.levelLabel,
    sourcePosture: source.levelLabel,
    prioritySource: source.prioritySource?.label || "Add primary, regulator or standard-setter source",
    prioritySourceUrl: source.prioritySource?.url || "",
    lastReviewed: formatDate(regulation.lastReviewed),
    nextReview: formatDate(regulation.nextReviewDate),
    reviewPriority: reviewPriorityFor(regulation, decision.level, source.level, Boolean(reviewItem?.launchBlocker), reviewItem?.tier),
    premiumUse: reviewItem?.premiumUseBlockedUntilReviewed ? "Blocked until reviewed" : decision.commercialUse,
    sourceNextAction: reviewItem?.sourceReviewNextAction || source.sourceReviewSteps[0] || "Open priority source and confirm source date.",
    thresholdNextAction:
      reviewItem?.thresholdReviewNextAction || decision.factsToConfirm[0] || "Confirm entity-specific thresholds, dates and legal status.",
    factsToConfirm: decision.factsToConfirm,
    evidenceNeeded: decision.evidencePackage,
    firstActions: decision.firstThirtyDayActions,
    caveat: decision.caveat
  };
}

export function reviewWorkflowCsv(rows: ReviewWorkflowRow[]) {
  const headers = [
    "id",
    "shortName",
    "title",
    "jurisdiction",
    "tier",
    "premiumSurface",
    "owner",
    "decisionGate",
    "sourcePosture",
    "prioritySource",
    "prioritySourceUrl",
    "lastReviewed",
    "nextReview",
    "reviewPriority",
    "premiumUse",
    "sourceNextAction",
    "thresholdNextAction",
    "factsToConfirm",
    "evidenceNeeded",
    "firstActions",
    "caveat"
  ];
  const body = rows.map((row) => [
    row.id,
    row.shortName,
    row.title,
    row.jurisdiction,
    row.tier,
    row.premiumSurface,
    row.owner,
    row.decisionGate,
    row.sourcePosture,
    row.prioritySource,
    row.prioritySourceUrl,
    row.lastReviewed,
    row.nextReview,
    String(row.reviewPriority),
    row.premiumUse,
    row.sourceNextAction,
    row.thresholdNextAction,
    row.factsToConfirm.join("; "),
    row.evidenceNeeded.join("; "),
    row.firstActions.join("; "),
    row.caveat
  ]);

  return [headers, ...body].map((row) => row.map(csvCell).join(",")).join("\n");
}

export function reviewWorkflowMarkdown(rows: ReviewWorkflowRow[], limit = 10) {
  const topRows = rows.slice(0, limit);
  return [
    "# Etica ESG Regulatory Atlas - source review workflow packet",
    "",
    "Purpose: prioritize source, threshold and evidence review before premium examples, advisory scans or client-ready summaries.",
    "",
    ...topRows.flatMap((row, index) => [
      `## ${index + 1}. ${row.shortName} - ${row.jurisdiction}`,
      "",
      `- Decision gate: ${row.decisionGate}`,
      `- Source posture: ${row.sourcePosture}`,
      `- Review priority score: ${row.reviewPriority}`,
      `- Owner: ${row.owner}`,
      `- Premium surface: ${row.premiumSurface}`,
      `- Premium use: ${row.premiumUse}`,
      `- Priority source: ${row.prioritySource}${row.prioritySourceUrl ? ` (${row.prioritySourceUrl})` : ""}`,
      `- Last reviewed: ${row.lastReviewed}`,
      `- Next review: ${row.nextReview}`,
      `- Source next action: ${row.sourceNextAction}`,
      `- Threshold next action: ${row.thresholdNextAction}`,
      "- Facts to confirm:",
      ...row.factsToConfirm.slice(0, 4).map((item) => `  - ${item}`),
      "- Evidence needed:",
      ...row.evidenceNeeded.slice(0, 4).map((item) => `  - ${item}`),
      "- First actions:",
      ...row.firstActions.slice(0, 4).map((item) => `  - ${item}`),
      ""
    ]),
    "## Caveat",
    "This packet is seed regulatory intelligence for orientation, research planning and source review. It does not constitute legal, tax, investment or assurance advice. Validate current sources, thresholds and entity-specific applicability with qualified counsel or regulatory advisors before compliance reliance."
  ].join("\n");
}

export function reviewWorkflowJson(rows: ReviewWorkflowRow[]) {
  return JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      caveat:
        "Static seed intelligence for source review and planning only. Not legal, tax, investment or assurance advice.",
      rows
    },
    null,
    2
  );
}

function reviewPriorityFor(
  regulation: Regulation,
  decisionLevel: string,
  sourceLevel: string,
  launchBlocker: boolean,
  tier?: string
) {
  let score = 0;
  if (decisionLevel === "premium-blocked") score += 8;
  if (decisionLevel === "review-before-client-use") score += 5;
  if (launchBlocker) score += 5;
  if (tier === "marquee-10") score += 3;
  if (tier === "marquee-25") score += 2;
  if (sourceLevel === "source-missing") score += 6;
  if (sourceLevel === "priority-source-needed") score += 5;
  if (sourceLevel === "stale") score += 4;
  if (sourceLevel === "upcoming-review") score += 2;
  if (regulation.highImpact) score += 2;
  if (["consultation", "transition", "paused"].includes(regulation.status)) score += 2;
  if (regulation.confidenceLevel !== "high") score += 2;
  if (regulation.dataQualityStatus !== "verified_seed") score += 2;
  return score;
}

function premiumSurfaceFor(regulation: Regulation) {
  if (regulation.topics.some((topic) => /sustainable finance|taxonomy/i.test(topic))) return "Sustainable finance pack";
  if (regulation.valueChain.some((value) => /supplier|import|export|upstream/i.test(value))) return "Supply-chain and exporter watchlist";
  if (regulation.topics.some((topic) => /climate|ghg|transition/i.test(topic))) return "Climate disclosure watchlist";
  if (regulation.businessImpacts.includes("product compliance obligation")) return "Product sustainability pack";
  return "Atlas source review queue";
}

function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}
