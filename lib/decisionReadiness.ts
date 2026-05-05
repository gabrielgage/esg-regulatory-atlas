import { marqueeReviewItems } from "@/data/contentReview";
import type { Regulation } from "@/types/regulation";
import { formatDate } from "./utils";

export type DecisionReadinessLevel = "orientation-ready" | "review-before-client-use" | "premium-blocked";

export type DecisionReadinessPlan = {
  level: DecisionReadinessLevel;
  levelLabel: string;
  owner: string;
  commercialUse: string;
  factsToConfirm: string[];
  evidencePackage: string[];
  firstThirtyDayActions: string[];
  sourceReviewSteps: string[];
  missingDecisionData: string[];
  relatedRecordIds: string[];
  caveat: string;
};

export function decisionReadinessFor(regulation: Regulation, allRegulations: Regulation[] = []): DecisionReadinessPlan {
  const reviewItem = marqueeReviewItems.find((item) => item.id === regulation.id);
  const missingDecisionData = missingDecisionDataFor(regulation);
  const factsToConfirm = factsToConfirmFor(regulation);
  const evidencePackage = evidencePackageFor(regulation);
  const firstThirtyDayActions = firstThirtyDayActionsFor(regulation);
  const sourceReviewSteps = sourceReviewStepsFor(regulation);
  const level = levelFor(regulation, Boolean(reviewItem?.premiumUseBlockedUntilReviewed), missingDecisionData.length);

  return {
    level,
    levelLabel: levelLabel[level],
    owner: reviewItem?.ownerPlaceholder || suggestedOwnerFor(regulation),
    commercialUse: commercialUseFor(level, reviewItem?.premiumUse),
    factsToConfirm,
    evidencePackage,
    firstThirtyDayActions,
    sourceReviewSteps,
    missingDecisionData: missingDecisionData.length ? missingDecisionData : ["No obvious seed-data gap captured; still confirm entity facts and primary sources."],
    relatedRecordIds: relatedRecordIdsFor(regulation, allRegulations),
    caveat:
      "Decision readiness is an orientation control. It does not verify legal completeness, decide applicability or replace qualified legal, tax, investment or assurance review."
  };
}

export const decisionReadinessClass: Record<DecisionReadinessLevel, string> = {
  "orientation-ready": "border-teal/20 bg-teal/10 text-teal",
  "review-before-client-use": "border-amber-200 bg-amber-50 text-amber-800",
  "premium-blocked": "border-red-200 bg-red-50 text-red-700"
};

const levelLabel: Record<DecisionReadinessLevel, string> = {
  "orientation-ready": "Orientation-ready seed",
  "review-before-client-use": "Review before client use",
  "premium-blocked": "Premium use blocked"
};

function levelFor(regulation: Regulation, premiumBlocked: boolean, missingCount: number): DecisionReadinessLevel {
  if (premiumBlocked || regulation.dataQualityStatus === "source_missing") return "premium-blocked";
  if (regulation.dataQualityStatus !== "verified_seed" || regulation.confidenceLevel !== "high" || missingCount >= 3) {
    return "review-before-client-use";
  }
  return "orientation-ready";
}

function commercialUseFor(level: DecisionReadinessLevel, premiumUse?: string) {
  const target = premiumUse ? ` for ${premiumUse}` : "";
  if (level === "premium-blocked") return `Do not use in premium examples${target} until source, status and threshold review is complete.`;
  if (level === "review-before-client-use") return `Use for free Atlas orientation only${target}; complete source review before client-ready or premium reuse.`;
  return `Usable for seed orientation${target}, with caveats and entity-specific source review preserved.`;
}

function factsToConfirmFor(regulation: Regulation) {
  const facts = new Set<string>();
  facts.add("Confirm entity-specific scope, group boundary, operating jurisdictions and local implementation status.");

  if (regulation.applicabilityScope?.thresholds?.length) {
    regulation.applicabilityScope.thresholds.slice(0, 2).forEach((threshold) => facts.add(`Validate threshold evidence: ${threshold}`));
  } else if (regulation.legalForce === "mandatory") {
    facts.add("Confirm employee, revenue, balance-sheet, listing, sector and cross-border triggers in primary sources.");
  }

  if (regulation.firstReportingYear || regulation.firstReportDueDate || regulation.phaseInNotes) {
    facts.add(`Confirm phase-in and first filing timing: ${regulation.phaseInNotes || formatDate(regulation.firstReportDueDate) || regulation.firstReportingYear}.`);
  }

  if (regulation.valueChain.some((value) => /supplier|upstream|import|portfolio|financed/i.test(value))) {
    facts.add("Confirm supplier, importer/exporter, portfolio, financed-emissions or commodity exposure.");
  }

  if (regulation.businessImpacts.some((impact) => /assurance|board|governance/i.test(impact))) {
    facts.add("Confirm governance owner, board oversight expectations, assurance scope and control evidence.");
  }

  return Array.from(facts).slice(0, 6);
}

function evidencePackageFor(regulation: Regulation) {
  const evidence = new Set<string>();
  (regulation.evidenceRequired || []).slice(0, 5).forEach((item) => evidence.add(item));
  evidence.add("Entity scope memo and threshold evidence");
  evidence.add("Primary-source review note with source date and reviewer");

  if (regulation.businessImpacts.includes("reporting obligation")) evidence.add("Disclosure calendar, data-owner matrix and reporting control evidence");
  if (regulation.businessImpacts.includes("due diligence obligation")) evidence.add("Supplier risk register, due-diligence procedure and remediation log");
  if (regulation.businessImpacts.includes("financial disclosure obligation")) evidence.add("Portfolio, product or financial-risk data mapping");
  if (regulation.businessImpacts.includes("product compliance obligation")) evidence.add("Product, market-placement, importer/exporter and technical documentation files");
  if (regulation.businessImpacts.includes("transition plan obligation")) evidence.add("Transition-plan assumptions, target pathway and governance approvals");

  return Array.from(evidence).slice(0, 8);
}

function firstThirtyDayActionsFor(regulation: Regulation) {
  const actions = new Set<string>();
  (regulation.immediateReadinessActions || regulation.requiredActions || []).slice(0, 4).forEach((item) => actions.add(item));
  actions.add("Assign a named business owner and source reviewer.");
  actions.add("Confirm current legal status and date-sensitive milestones from official sources.");

  if (regulation.confidenceLevel !== "high" || regulation.dataQualityStatus !== "verified_seed") {
    actions.add("Upgrade source confidence before using this record in a client-ready output.");
  }

  if (!regulation.penalties && regulation.legalForce === "mandatory") {
    actions.add("Check enforcement authority and penalty mechanics before board or client briefing use.");
  }

  return Array.from(actions).slice(0, 7);
}

function sourceReviewStepsFor(regulation: Regulation) {
  const steps = new Set<string>();
  const prioritySource = regulation.sourceUrls.find((source) => source.type === "primary" || source.type === "regulator" || source.type === "standards_body");

  steps.add(prioritySource ? `Open and date-check: ${prioritySource.label}.` : "Add at least one primary, regulator or standard-setter source before client-ready use.");
  steps.add(`Confirm last-reviewed date remains current: ${formatDate(regulation.lastReviewed)}.`);
  if (regulation.nextReviewDate) steps.add(`Schedule next review around ${formatDate(regulation.nextReviewDate)} or sooner if legal status changes.`);
  if (regulation.status === "consultation" || regulation.status === "transition" || regulation.status === "paused") {
    steps.add("Recheck status because the record is consultation-stage, transitional or paused.");
  }
  if (regulation.dataQualityStatus !== "verified_seed") steps.add(`Resolve data-quality flag: ${regulation.dataQualityStatus.replaceAll("_", " ")}.`);

  return Array.from(steps).slice(0, 6);
}

function missingDecisionDataFor(regulation: Regulation) {
  const missing = new Set<string>();
  if (!regulation.applicabilityScope?.thresholds?.length && regulation.legalForce === "mandatory") missing.add("Structured threshold detail");
  if (!regulation.penalties && regulation.legalForce === "mandatory") missing.add("Penalty or enforcement summary");
  if (!regulation.firstReportDueDate && regulation.businessImpacts.includes("reporting obligation")) missing.add("First report due date");
  if (!regulation.sourceUrls.some((source) => source.type === "primary" || source.type === "regulator" || source.type === "standards_body")) {
    missing.add("Primary, regulator or standard-setter source");
  }
  if (regulation.dataQualityStatus !== "verified_seed") missing.add(`Data quality flag: ${regulation.dataQualityStatus.replaceAll("_", " ")}`);
  if (regulation.confidenceLevel !== "high") missing.add(`Confidence flag: ${regulation.confidenceLevel.replaceAll("_", " ")}`);
  return Array.from(missing);
}

function relatedRecordIdsFor(regulation: Regulation, allRegulations: Regulation[]) {
  return allRegulations
    .filter((item) => item.id !== regulation.id)
    .filter((item) => item.topics.some((topic) => regulation.topics.includes(topic)) || item.businessImpacts.some((impact) => regulation.businessImpacts.includes(impact)))
    .slice(0, 4)
    .map((item) => item.id);
}

function suggestedOwnerFor(regulation: Regulation) {
  if (regulation.affectedFunctions.includes("Legal")) return "Legal / compliance lead";
  if (regulation.affectedFunctions.includes("Finance")) return "Finance or ESG controllership lead";
  if (regulation.affectedFunctions.includes("Procurement")) return "Procurement / supplier due-diligence lead";
  if (regulation.affectedFunctions.includes("Risk")) return "Risk and sustainability governance lead";
  if (regulation.affectedFunctions.includes("Board")) return "Board or executive sponsor";
  return regulation.affectedFunctions[0] ? `${regulation.affectedFunctions[0]} lead` : "Named business owner";
}
