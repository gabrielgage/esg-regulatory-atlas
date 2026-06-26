import { DATASET_META } from "@/data/_meta";
import type { BriefingScenario } from "@/data/briefingScenarios";
import { readinessBand, readinessScore } from "@/lib/scoring";
import { uniq } from "@/lib/utils";
import type { Regulation } from "@/types/regulation";

export function buildBriefingScenarioMarkdown(scenario: BriefingScenario, records: Regulation[]) {
  const priorityRecords = [...records].sort(prioritySort).slice(0, 8);
  const owners = uniq(priorityRecords.flatMap((regulation) => regulation.affectedFunctions || [])).slice(0, 10);
  const evidence = uniq(priorityRecords.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 10);
  const actions = uniq(priorityRecords.flatMap((regulation) => regulation.requiredActions || regulation.immediateReadinessActions || [])).slice(0, 10);
  const reviewWatch = priorityRecords.filter(
    (regulation) =>
      regulation.confidenceLevel !== "high" ||
      regulation.dataQualityStatus !== "verified_seed" ||
      regulation.nextReviewDate ||
      regulation.status === "consultation" ||
      regulation.status === "transition"
  );

  return [
    `# Briefing scenario memo: ${scenario.label}`,
    "",
    `Edition: ${DATASET_META.edition}`,
    `Publisher: ${DATASET_META.publisher}`,
    `Editor: ${DATASET_META.editor}`,
    `Contact: ${DATASET_META.contactEmail}`,
    "",
    "This is indicative seed regulatory intelligence for orientation and planning. It is not legal, tax, investment or assurance advice.",
    "",
    "## Scenario frame",
    `- Briefing lane: ${scenario.eyebrow}`,
    `- Best for: ${scenario.bestFor.join(", ")}`,
    `- Leadership question: ${scenario.leadershipQuestion}`,
    `- First operating move: ${scenario.firstOperatingMove}`,
    `- Evidence package: ${scenario.evidencePackage}`,
    `- Advisory motion: ${scenario.advisoryMotion}`,
    "",
    "## Priority records",
    ...(priorityRecords.length ? priorityRecords.map(recordLine) : ["- No priority seed records are available for this scenario."]),
    "",
    "## Source-review watch prompts",
    ...(reviewWatch.length
      ? reviewWatch.slice(0, 8).map((regulation) => {
          const source = regulation.sourceUrls[0];
          return `- ${regulation.shortName}: ${formatLabel(regulation.status)}; quality ${formatLabel(regulation.dataQualityStatus)}; confidence ${formatLabel(regulation.confidenceLevel)}; verify ${source ? `${source.label} (${source.url})` : "primary source / source missing"}; next review ${regulation.nextReviewDate || "not captured"}.`;
        })
      : ["- No scenario priority records are currently flagged as lower-confidence, consultation, transition or review-dated in the seed data."]),
    "",
    "## Evidence and owners",
    `- Likely owner functions: ${owners.join(", ") || "Legal, Sustainability, Finance, Risk and relevant business owners"}`,
    ...(evidence.length ? evidence.map((item) => `- Evidence starter: ${item}`) : ["- Evidence starter: entity scope, market exposure, source review log, reporting calendar and internal controls"]),
    "",
    "## First 30-day actions",
    ...(scenario.nextSteps.length ? scenario.nextSteps.map((step) => `- Scenario next step: ${step}`) : []),
    ...(actions.length ? actions.map((action) => `- Record action: ${action}`) : fallbackActions().map((action) => `- Record action: ${action}`)),
    "",
    "## Caveat",
    scenario.caveat,
    "This briefing memo is based on current tracked seed records. It is not a legal opinion, complete regulatory inventory, source verification, official translation, board advice or entity-specific applicability determination."
  ].join("\n");
}

function recordLine(regulation: Regulation) {
  const source = regulation.sourceUrls[0];

  return [
    `- ${regulation.shortName} (${regulation.jurisdiction})`,
    `  - Status: ${formatLabel(regulation.status)}; readiness: ${readinessBand(regulation)} (${readinessScore(regulation)}/100)`,
    `  - Timing: first reporting ${regulation.firstReportingYear || "not captured"}; first report due ${regulation.firstReportDueDate || "not captured"}`,
    `  - Business impact: ${regulation.businessImpact}`,
    `  - Evidence likely needed: ${(regulation.evidenceRequired || []).slice(0, 4).join("; ") || "Entity facts, source review and control evidence"}`,
    `  - Source to verify first: ${source ? `${source.label} (${source.url})` : "source missing / needs review"}`,
    `  - Caveat: ${regulation.caveats?.[0] || "Confirm entity-specific facts, thresholds and source status before client or compliance reuse."}`
  ].join("\n");
}

function prioritySort(a: Regulation, b: Regulation) {
  const highImpactDelta = Number(Boolean(b.highImpact)) - Number(Boolean(a.highImpact));
  if (highImpactDelta) return highImpactDelta;
  return readinessScore(b) - readinessScore(a) || a.shortName.localeCompare(b.shortName);
}

function fallbackActions() {
  return [
    "Confirm the briefing scenario against the client or internal audience before reusing the memo.",
    "Review primary sources for priority records and document unresolved source-review gaps.",
    "Assign likely owner functions for evidence collection, controls, legal review and leadership reporting.",
    "Convert the scenario into an assessment, market brief or advisory scan if entity-specific facts are needed."
  ];
}

function formatLabel(value: string) {
  return value.replaceAll("_", " ").replaceAll("-", " ");
}
