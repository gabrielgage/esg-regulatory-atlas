import { regulations } from "@/data/seed";
import { businessFunctionPlaybookFor, businessFunctionPlaybooks, fallbackBusinessFunctionPlaybook } from "@/data/businessFunctionPlaybooks";
import { readinessScore } from "@/lib/scoring";
import { uniq } from "@/lib/utils";
import type { Regulation } from "@/types/regulation";

export type BusinessFunctionProfile = ReturnType<typeof businessFunctionProfileFor>;

export function businessFunctionProfiles() {
  const labels = uniq([
    ...businessFunctionPlaybooks.map((playbook) => playbook.functionName),
    ...regulations.flatMap((regulation) => regulation.affectedFunctions || [])
  ]).sort((a, b) => priorityIndex(a) - priorityIndex(b) || a.localeCompare(b));

  return labels
    .map((label) => businessFunctionProfileFor(label))
    .filter((profile) => profile.records.length > 0 || businessFunctionPlaybookFor(profile.functionName));
}

export function businessFunctionProfileFor(functionName: string) {
  const records = regulations.filter((regulation) => regulation.affectedFunctions?.includes(functionName));
  const sortedRecords = [...records].sort(prioritySort);
  const playbook = businessFunctionPlaybookFor(functionName) || fallbackBusinessFunctionPlaybook(functionName);
  const highImpact = sortedRecords.filter((regulation) => regulation.highImpact);
  const reviewFlags = sortedRecords.filter((regulation) => regulation.dataQualityStatus !== "verified_seed" || regulation.confidenceLevel !== "high").length;
  const sourceBacked = sortedRecords.filter((regulation) => regulation.sourceUrls.length > 0).length;
  const primarySourceBacked = sortedRecords.filter((regulation) =>
    regulation.sourceUrls.some((source) => source.type === "primary" || source.type === "regulator" || source.type === "standards_body")
  ).length;

  return {
    functionName,
    slug: businessFunctionSlug(functionName),
    playbook,
    records: sortedRecords,
    priorityRecords: sortedRecords.slice(0, 5),
    highImpact,
    reviewFlags,
    sourceBacked,
    primarySourceBacked,
    jurisdictions: uniq(sortedRecords.flatMap((regulation) => regulation.jurisdictionIds)).slice(0, 8),
    topics: uniq(sortedRecords.flatMap((regulation) => regulation.topics)).slice(0, 8),
    businessImpacts: uniq(sortedRecords.flatMap((regulation) => regulation.businessImpacts)).slice(0, 8),
    valueChain: uniq(sortedRecords.flatMap((regulation) => regulation.valueChain)).slice(0, 8),
    evidenceRequired: uniq(sortedRecords.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 8),
    requiredActions: uniq(sortedRecords.flatMap((regulation) => regulation.requiredActions || [])).slice(0, 8),
    advisoryOpportunities: uniq(sortedRecords.flatMap((regulation) => regulation.advisoryOpportunities || [])).slice(0, 8)
  };
}

export function businessFunctionSlug(functionName: string) {
  return functionName
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function businessFunctionMarkdown(profile: BusinessFunctionProfile) {
  return [
    `# ${profile.functionName} regulatory owner brief`,
    "",
    "This is indicative seed regulatory intelligence for orientation and planning. It is not legal, tax, investment or assurance advice.",
    "",
    `Start question: ${profile.playbook.startQuestion}`,
    "",
    "## Priority records to review",
    ...(profile.priorityRecords.length
      ? profile.priorityRecords.map((regulation) => `- ${regulation.shortName}: ${regulation.summary}`)
      : ["- No priority records in the current seed dataset."]),
    "",
    `Tracked records: ${profile.records.length}`,
    `High-impact records: ${profile.highImpact.length}`,
    `Source-backed records: ${profile.sourceBacked}/${profile.records.length || 0}`,
    `Priority-source backed records: ${profile.primarySourceBacked}/${profile.records.length || 0}`,
    `Records needing confidence/source review: ${profile.reviewFlags}`,
    "",
    "## First actions",
    ...profile.playbook.firstActions.map((action) => `- ${action}`),
    "",
    "## Evidence focus",
    ...profile.playbook.evidenceFocus.map((item) => `- ${item}`),
    "",
    "## Review prompts",
    ...profile.playbook.reviewPrompts.map((item) => `- ${item}`),
    "",
    "## Caveat",
    `${profile.playbook.caveat} This owner view does not assign formal legal accountability or determine entity-specific applicability.`
  ].join("\n");
}

function prioritySort(a: Regulation, b: Regulation) {
  if (Boolean(b.highImpact) !== Boolean(a.highImpact)) return Number(Boolean(b.highImpact)) - Number(Boolean(a.highImpact));
  return readinessScore(b) - readinessScore(a);
}

function priorityIndex(functionName: string) {
  const index = businessFunctionPlaybooks.findIndex((playbook) => playbook.functionName === functionName);
  return index === -1 ? 999 : index;
}
