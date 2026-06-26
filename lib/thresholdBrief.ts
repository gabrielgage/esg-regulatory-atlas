import { DATASET_META } from "@/data/_meta";
import type { ThresholdMatrixRow } from "@/data/thresholdMatrix";
import { uniq } from "@/lib/utils";
import type { Regulation } from "@/types/regulation";

type ThresholdBriefItem = {
  row: ThresholdMatrixRow;
  regulation: Regulation;
  reviewItem?: {
    premiumUseBlockedUntilReviewed?: boolean;
    thresholdReviewNextAction?: string;
    sourceReviewNextAction?: string;
    owner?: string;
  };
};

export function buildThresholdBriefMarkdown(items: ThresholdBriefItem[]) {
  const priorityItems = [...items].sort(thresholdPrioritySort).slice(0, 12);
  const reviewBeforeUse = items.filter((item) => item.row.reviewStatus === "review-before-client-use" || item.reviewItem?.premiumUseBlockedUntilReviewed);
  const dateSensitive = items.filter((item) => item.row.reviewStatus === "date-sensitive");
  const sourceReviewed = items.filter((item) => item.row.reviewStatus === "source-reviewed-seed");
  const factsToConfirm = uniq(priorityItems.flatMap((item) => item.row.factsToConfirm)).slice(0, 12);
  const ownerPrompts = uniq(priorityItems.flatMap((item) => item.regulation.affectedFunctions || [])).slice(0, 8);

  return [
    "# Threshold screening brief",
    "",
    `Edition: ${DATASET_META.edition}`,
    `Publisher: ${DATASET_META.publisher}`,
    `Editor: ${DATASET_META.editor}`,
    `Contact: ${DATASET_META.contactEmail}`,
    "",
    "This is indicative seed regulatory intelligence for orientation and planning. It is not legal, tax, investment or assurance advice.",
    "",
    "## At a glance",
    `- Tracked threshold rows: ${items.length}`,
    `- Review before client use: ${reviewBeforeUse.length}`,
    `- Date-sensitive rows: ${dateSensitive.length}`,
    `- Source-reviewed seed rows: ${sourceReviewed.length}`,
    `- Likely owner functions to involve: ${ownerPrompts.join(", ") || "Legal, Sustainability, Finance and relevant business owners"}`,
    "",
    "## Priority scope signals to verify",
    ...(priorityItems.length
      ? priorityItems.map(({ row, regulation, reviewItem }) =>
          [
            `- ${regulation.shortName} (${regulation.jurisdiction})`,
            `  - Threshold type: ${formatLabel(row.thresholdType)}`,
            `  - Screening signal: ${row.thresholdSignal}`,
            `  - Facts to confirm: ${row.factsToConfirm.join("; ")}`,
            `  - Timing signal: ${row.timingSignal}`,
            `  - Review status: ${formatLabel(row.reviewStatus)}; confidence: ${formatLabel(row.confidence)}`,
            `  - Source to verify first: ${row.sourceToVerify} (${row.sourceUrl})`,
            `  - Next review action: ${reviewItem?.thresholdReviewNextAction || reviewItem?.sourceReviewNextAction || "Confirm source text, threshold facts and entity-specific context before reuse."}`,
            `  - Caveat: ${row.caveat}`
          ].join("\n")
        )
      : ["- No threshold rows are available in the current seed matrix."]),
    "",
    "## Facts to gather before assessment or advisory reuse",
    ...(factsToConfirm.length ? factsToConfirm.map((fact) => `- ${fact}`) : ["- Entity scope", "- Jurisdiction nexus", "- Revenue, employee, asset or market-role facts", "- Source review log"]),
    "",
    "## Review queue",
    ...(reviewBeforeUse.length
      ? reviewBeforeUse
          .slice(0, 8)
          .map(
            ({ row, regulation, reviewItem }) =>
              `- ${regulation.shortName}: ${formatLabel(row.reviewStatus)}${reviewItem?.premiumUseBlockedUntilReviewed ? "; premium/client reuse should wait for review" : ""}`
          )
      : ["- No threshold rows are currently marked review-before-client-use in this matrix."]),
    "",
    "## Use caveat",
    "Threshold rows are screening prompts. They do not decide whether a company, fund, product, supplier or portfolio company is legally in scope. Confirm entity facts and primary sources with qualified counsel or regulatory advisors before using this output for compliance decisions."
  ].join("\n");
}

function thresholdPrioritySort(a: ThresholdBriefItem, b: ThresholdBriefItem) {
  const blockedDelta = Number(Boolean(b.reviewItem?.premiumUseBlockedUntilReviewed)) - Number(Boolean(a.reviewItem?.premiumUseBlockedUntilReviewed));
  if (blockedDelta) return blockedDelta;
  return thresholdStatusRank(a.row.reviewStatus) - thresholdStatusRank(b.row.reviewStatus) || a.regulation.shortName.localeCompare(b.regulation.shortName);
}

function thresholdStatusRank(status: ThresholdMatrixRow["reviewStatus"]) {
  if (status === "review-before-client-use") return 0;
  if (status === "date-sensitive") return 1;
  if (status === "jurisdiction-dependent") return 2;
  return 3;
}

function formatLabel(value: string) {
  return value.replaceAll("_", " ").replaceAll("-", " ");
}
