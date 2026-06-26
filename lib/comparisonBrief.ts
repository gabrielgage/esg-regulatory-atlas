import { DATASET_META } from "@/data/_meta";
import { readinessBand, readinessScore } from "@/lib/scoring";
import { uniq } from "@/lib/utils";
import type { Jurisdiction, Regulation } from "@/types/regulation";

export function buildJurisdictionComparisonBriefMarkdown({
  left,
  right,
  leftRecords,
  rightRecords
}: {
  left: Jurisdiction;
  right: Jurisdiction;
  leftRecords: Regulation[];
  rightRecords: Regulation[];
}) {
  const leftIds = new Set(leftRecords.map((regulation) => regulation.id));
  const rightIds = new Set(rightRecords.map((regulation) => regulation.id));
  const inBoth = leftRecords.filter((regulation) => rightIds.has(regulation.id));
  const onlyLeft = leftRecords.filter((regulation) => !rightIds.has(regulation.id));
  const onlyRight = rightRecords.filter((regulation) => !leftIds.has(regulation.id));
  const priorityLeft = priorityRecords(leftRecords).slice(0, 5);
  const priorityRight = priorityRecords(rightRecords).slice(0, 5);
  const allRecords = [...leftRecords, ...rightRecords];
  const topics = uniq(allRecords.flatMap((regulation) => regulation.topics)).slice(0, 10);
  const owners = uniq(allRecords.flatMap((regulation) => regulation.affectedFunctions || [])).slice(0, 10);
  const evidence = uniq(allRecords.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 10);

  return [
    `# Jurisdiction comparison brief: ${left.name} vs ${right.name}`,
    "",
    metadataLines(),
    "",
    "This is indicative seed regulatory intelligence for orientation and planning. It is not legal, tax, investment or assurance advice.",
    "",
    "## Comparison context",
    `- First market: ${left.name} (${left.code}); tracked records: ${leftRecords.length}`,
    `- Second market: ${right.name} (${right.code}); tracked records: ${rightRecords.length}`,
    `- Records appearing in both tracked market views: ${inBoth.length}`,
    `- Records only in ${left.code}: ${onlyLeft.length}`,
    `- Records only in ${right.code}: ${onlyRight.length}`,
    `- Common topic signals: ${topics.join(", ") || "not captured in the current comparison"}`,
    "",
    "## Priority records to review",
    ...marketPriorityLines(left, priorityLeft),
    ...marketPriorityLines(right, priorityRight),
    "",
    "## Difference prompts",
    `- ${left.code} unique seed records to review: ${formatRecordList(onlyLeft)}`,
    `- ${right.code} unique seed records to review: ${formatRecordList(onlyRight)}`,
    `- Shared tracked records: ${formatRecordList(inBoth)}`,
    "",
    "## Evidence and owner prompts",
    `- Likely owner functions to involve: ${owners.join(", ") || "Legal, Sustainability, Finance, Risk and relevant business owners"}`,
    ...(evidence.length
      ? evidence.map((item) => `- Evidence starter: ${item}`)
      : ["- Evidence starter: entity scope, thresholds, market exposure, source review log and reporting calendar"]),
    "",
    "## First 30-day comparison actions",
    "- Confirm whether each market view reflects direct rules, inherited supranational rules, voluntary frameworks or monitor-stage records.",
    "- Verify first-reporting dates, legal status and threshold signals against primary or regulator sources before using this output in client or compliance planning.",
    "- Decide which records require legal review, source freshness review or threshold review before they move into a client-facing pack.",
    "- Assign owners for legal, finance, sustainability, procurement, risk and board evidence where the comparison suggests different obligations.",
    "",
    "## Caveat",
    "This comparison reflects current tracked Atlas seed records. It is not a legal equivalence analysis, complete market inventory, official translation, source verification or entity-specific applicability determination."
  ].join("\n");
}

export function buildRegulationComparisonBriefMarkdown({
  records,
  requestedIds
}: {
  records: Regulation[];
  requestedIds: string[];
}) {
  const owners = uniq(records.flatMap((regulation) => regulation.affectedFunctions || [])).slice(0, 10);
  const evidence = uniq(records.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 10);
  const actions = uniq(records.flatMap((regulation) => regulation.requiredActions || [])).slice(0, 10);
  const missingIds = requestedIds.filter((id) => !records.some((regulation) => regulation.id.toLowerCase() === id.toLowerCase()));

  return [
    `# Regulation comparison brief`,
    "",
    metadataLines(),
    "",
    "This is indicative seed regulatory intelligence for orientation and planning. It is not legal, tax, investment or assurance advice.",
    "",
    "## Comparison context",
    `- Requested record IDs: ${requestedIds.join(", ") || "not captured"}`,
    `- Matched seed records: ${records.length}`,
    missingIds.length ? `- Requested IDs not found: ${missingIds.join(", ")}` : "- Requested IDs not found: none",
    "",
    "## Selected records",
    ...(records.length ? records.map(recordComparisonLine) : ["- No matching regulation records are available in this comparison view."]),
    "",
    "## Cross-record planning prompts",
    `- Likely owner functions to involve: ${owners.join(", ") || "Legal, Sustainability, Finance, Risk and relevant business owners"}`,
    ...(evidence.length
      ? evidence.map((item) => `- Evidence starter: ${item}`)
      : ["- Evidence starter: entity scope, thresholds, reporting boundaries, source review log and internal controls"]),
    ...(actions.length ? actions.map((action) => `- First action: ${action}`) : fallbackActions().map((action) => `- First action: ${action}`)),
    "",
    "## Source-review prompts",
    ...(records.length
      ? records.map((regulation) => {
          const source = regulation.sourceUrls[0];
          return `- ${regulation.shortName}: verify ${source ? `${source.label} (${source.url})` : "primary source; source missing in seed record"}; last reviewed ${regulation.lastReviewed || "not captured"}; next review ${regulation.nextReviewDate || "not captured"}; quality ${formatLabel(regulation.dataQualityStatus)}; confidence ${formatLabel(regulation.confidenceLevel)}.`;
        })
      : ["- Confirm requested record IDs, source availability and whether the comparison should use jurisdiction-level or regulation-level mode."]),
    "",
    "## Caveat",
    "Regulation comparisons are planning aids based on current seed records. They do not determine legal applicability, legal equivalence, complete obligation coverage, source verification, official filing deadlines or compliance responsibilities."
  ].join("\n");
}

function metadataLines() {
  return [
    `Edition: ${DATASET_META.edition}`,
    `Publisher: ${DATASET_META.publisher}`,
    `Editor: ${DATASET_META.editor}`,
    `Contact: ${DATASET_META.contactEmail}`
  ].join("\n");
}

function marketPriorityLines(jurisdiction: Jurisdiction, records: Regulation[]) {
  if (!records.length) return [`- ${jurisdiction.code}: no priority records are available in this tracked seed view.`];

  return records.map((regulation) => {
    const source = regulation.sourceUrls[0];
    return [
      `- ${jurisdiction.code} / ${regulation.shortName}`,
      `  - Status: ${formatLabel(regulation.status)}; readiness: ${readinessBand(regulation)} (${readinessScore(regulation)}/100)`,
      `  - Topics: ${regulation.topics.slice(0, 4).join(", ")}`,
      `  - Timing: first reporting ${regulation.firstReportingYear || "not captured"}; due ${regulation.firstReportDueDate || "not captured"}`,
      `  - Source to verify first: ${source ? `${source.label} (${source.url})` : "source missing / needs review"}`,
      `  - Caveat: ${regulation.caveats?.[0] || "Confirm entity-specific scope, threshold facts and source status before relying on this signal."}`
    ].join("\n");
  });
}

function recordComparisonLine(regulation: Regulation) {
  const source = regulation.sourceUrls[0];
  return [
    `- ${regulation.shortName} (${regulation.jurisdiction})`,
    `  - What this is: ${formatLabel(regulation.recordType || regulation.legalInstrumentType || "regulatory record")} with ${formatLabel(regulation.legalForce || regulation.adoptionLevel)} force/status signal`,
    `  - Status: ${formatLabel(regulation.status)}; readiness: ${readinessBand(regulation)} (${readinessScore(regulation)}/100)`,
    `  - Thresholds or scope signals: ${(regulation.applicabilityScope?.thresholds || []).slice(0, 3).join("; ") || "Confirm source record"}`,
    `  - Key dates: effective ${regulation.effectiveDate || "not captured"}; first reporting ${regulation.firstReportingYear || "not captured"}; first report due ${regulation.firstReportDueDate || "not captured"}`,
    `  - Evidence likely needed: ${(regulation.evidenceRequired || []).slice(0, 4).join("; ") || "Entity scope, source review and control evidence"}`,
    `  - Source to verify first: ${source ? `${source.label} (${source.url})` : "source missing / needs review"}`,
    `  - Caveat: ${regulation.caveats?.[0] || "Confirm entity-specific facts and primary sources before using this record for compliance decisions."}`
  ].join("\n");
}

function priorityRecords(records: Regulation[]) {
  return [...records].sort((a, b) => {
    const highImpactDelta = Number(Boolean(b.highImpact)) - Number(Boolean(a.highImpact));
    if (highImpactDelta) return highImpactDelta;
    return readinessScore(b) - readinessScore(a) || a.shortName.localeCompare(b.shortName);
  });
}

function formatRecordList(records: Regulation[]) {
  return records.length ? records.slice(0, 8).map((regulation) => regulation.shortName).join(", ") : "none in the current tracked seed view";
}

function fallbackActions() {
  return [
    "Confirm entity scope, market exposure, thresholds and legal status before using the comparison for client or compliance planning.",
    "Review primary sources for each record, prioritizing high-impact and date-sensitive items.",
    "Assign likely owner functions and evidence owners before converting the comparison into a workplan.",
    "Document unresolved caveats, missing facts and review dependencies."
  ];
}

function formatLabel(value: string) {
  return value.replaceAll("_", " ").replaceAll("-", " ");
}
