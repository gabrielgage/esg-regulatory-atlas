import { DATASET_META } from "@/data/_meta";
import { decisionReadinessFor } from "@/lib/decisionReadiness";
import { sourceEvidenceFor } from "@/lib/sourceGovernance";
import type { Regulation } from "@/types/regulation";
import { formatDate } from "@/lib/utils";

export type ImplementationRoadmapStage = {
  title: string;
  timeframe: string;
  intent: string;
  actions: string[];
};

export type ImplementationRoadmap = {
  owner: string;
  sourceToVerify: string;
  sourcePosture: string;
  evidenceFocus: string[];
  stages: ImplementationRoadmapStage[];
  caveat: string;
};

export function implementationRoadmapFor(regulation: Regulation, allRegulations: Regulation[] = []): ImplementationRoadmap {
  const readiness = decisionReadinessFor(regulation, allRegulations);
  const source = sourceEvidenceFor(regulation);
  const evidenceFocus = unique([
    ...readiness.evidencePackage.slice(0, 4),
    ...(regulation.evidenceRequired || []).slice(0, 3),
    "Source-review note with reviewer, source date and unresolved caveats"
  ]).slice(0, 6);

  return {
    owner: readiness.owner,
    sourceToVerify: source.prioritySource?.label || "Add a primary, regulator or standard-setter source before client-ready use.",
    sourcePosture: source.levelLabel,
    evidenceFocus,
    stages: [
      {
        title: "Orient and scope",
        timeframe: "0-30 days",
        intent: "Confirm whether this record is potentially relevant before turning it into a workplan.",
        actions: unique([
          ...readiness.firstThirtyDayActions.slice(0, 4),
          "Confirm entity profile, jurisdictions, legal-force status and value-chain exposure.",
          "Open the priority source and log current status, date and unresolved caveats."
        ]).slice(0, 5)
      },
      {
        title: "Build evidence and controls",
        timeframe: "31-60 days",
        intent: "Prepare the evidence, owners and controls that would support a later compliance or advisory review.",
        actions: unique([
          evidenceActionFor(regulation),
          ownerActionFor(regulation),
          "Map data owners, source systems, approvals and review cadence.",
          "Separate mandatory obligations from voluntary, investor/customer-driven or monitor-only expectations.",
          "Document missing facts that require legal, regulatory, accounting or assurance review."
        ]).slice(0, 5)
      },
      {
        title: "Review and brief",
        timeframe: "61-90 days",
        intent: "Turn source-reviewed findings into a cautious internal, board or client briefing.",
        actions: unique([
          "Recheck priority sources before briefing or premium reuse.",
          "Prepare a short decision memo with facts confirmed, facts missing, owner, dates, caveats and sources.",
          briefingActionFor(regulation),
          "Decide whether an advisory exposure scan, market pack or custom watchlist is needed.",
          "Schedule the next review date and preserve the legal-caution note with copied outputs."
        ]).slice(0, 5)
      }
    ],
    caveat:
      "This roadmap is an orientation and planning aid. It does not determine applicability, verify legal completeness or replace qualified legal, tax, investment or assurance advice."
  };
}

export function implementationRoadmapMarkdown(regulation: Regulation, allRegulations: Regulation[] = []) {
  const roadmap = implementationRoadmapFor(regulation, allRegulations);

  return [
    `# Implementation roadmap - ${regulation.shortName}`,
    "",
    `Atlas edition: ${DATASET_META.edition}`,
    `Publisher: ${DATASET_META.publisher}`,
    `Editor: ${DATASET_META.editor}`,
    `Contact: ${DATASET_META.contactEmail}`,
    `Record: ${regulation.title}`,
    `Jurisdiction: ${regulation.jurisdiction}`,
    `Status: ${regulation.status.replaceAll("_", " ")}`,
    `Last reviewed: ${formatDate(regulation.lastReviewed)}`,
    `Next review: ${formatDate(regulation.nextReviewDate)}`,
    "",
    "## Review owner and source posture",
    `- Suggested owner: ${roadmap.owner}`,
    `- Source posture: ${roadmap.sourcePosture}`,
    `- Source to verify: ${roadmap.sourceToVerify}`,
    "",
    "## Evidence focus",
    ...roadmap.evidenceFocus.map((item) => `- ${item}`),
    "",
    ...roadmap.stages.flatMap((stage) => [
      `## ${stage.timeframe}: ${stage.title}`,
      stage.intent,
      "",
      ...stage.actions.map((action) => `- ${action}`),
      ""
    ]),
    "## Caveat",
    `- ${roadmap.caveat}`,
    "- Validate primary sources and entity-specific facts with qualified counsel or regulatory advisors before relying on this output."
  ].join("\n");
}

function evidenceActionFor(regulation: Regulation) {
  if (regulation.businessImpacts.includes("reporting obligation")) return "Create a disclosure calendar, data-owner matrix and reporting evidence inventory.";
  if (regulation.businessImpacts.includes("due diligence obligation")) return "Build a supplier, value-chain or human-rights due-diligence evidence file.";
  if (regulation.businessImpacts.includes("product compliance obligation")) return "Map product, importer/exporter, technical-file and market-placement evidence.";
  if (regulation.businessImpacts.includes("financial disclosure obligation")) return "Map portfolio, product, financed-emissions or sustainable-finance data needs.";
  return "Create an evidence inventory tied to likely obligations, owner functions and source-review gaps.";
}

function ownerActionFor(regulation: Regulation) {
  const owners = regulation.affectedFunctions.slice(0, 4);
  return owners.length
    ? `Assign named owners across ${owners.join(", ")} and document handoffs.`
    : "Assign named sustainability, legal, finance and operational owners.";
}

function briefingActionFor(regulation: Regulation) {
  if (regulation.highImpact) return "Escalate high-impact findings to the appropriate executive, board, risk or audit forum.";
  if (regulation.businessImpacts.includes("supply chain obligation")) return "Brief procurement and supply-chain teams on likely data requests and supplier evidence needs.";
  if (regulation.businessImpacts.includes("financial disclosure obligation")) return "Brief finance, investor-relations or investment teams on disclosure and data implications.";
  return "Brief accountable owners on priority actions, sources and caveats.";
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}
