import { jurisdictions } from "@/data/jurisdictions";
import { Regulation } from "@/types/regulation";
import { inferredCompanyTypes } from "./filters";

export type ApplicabilityCategory =
  | "Potentially directly relevant"
  | "Potentially indirectly relevant"
  | "Relevant through investors or customers"
  | "Monitor only";

export interface ApplicabilityAnswers {
  headquarters: string;
  operatingJurisdictions: string[];
  companyType: string;
  listed: boolean;
  companySize: "small" | "medium" | "large" | "very-large";
  sectors: string[];
  financialInstitution: boolean;
  euMarketExposure: boolean;
  regulatedImports: boolean;
  portfolioExposure: boolean;
}

export interface ApplicabilityResult {
  regulation: Regulation;
  category: ApplicabilityCategory;
  score: number;
  reasons: string[];
  triggeredBy: string[];
  firstActions: string[];
  evidenceNeeded: string[];
  functionsInvolved: string[];
  sourceToVerify: string;
  sourceQualityNote: string;
  reviewPriority: "High" | "Medium" | "Monitor";
  caveat: string;
}

export const defaultApplicabilityAnswers: ApplicabilityAnswers = {
  headquarters: "eu",
  operatingJurisdictions: ["eu"],
  companyType: "Corporate",
  listed: false,
  companySize: "large",
  sectors: ["All sectors"],
  financialInstitution: false,
  euMarketExposure: true,
  regulatedImports: false,
  portfolioExposure: false
};

export function evaluateApplicability(regulations: Regulation[], answers: ApplicabilityAnswers): ApplicabilityResult[] {
  return regulations
    .map((regulation) => scoreRegulation(regulation, answers))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.regulation.shortName.localeCompare(b.regulation.shortName))
    .slice(0, 12);
}

export function profileFor(regulation: Regulation) {
  return {
    companyTypes: inferredCompanyTypes(regulation),
    requiredActions: regulation.requiredActions || defaultActions(regulation),
    evidenceRequired: regulation.evidenceRequired || defaultEvidence(regulation),
    typicalClientQuestions: regulation.typicalClientQuestions || defaultQuestions(regulation),
    caveats: regulation.caveats || [
      "This record is indicative regulatory intelligence and may be incomplete.",
      "Applicability depends on entity-specific facts, thresholds, jurisdictional implementation, sector rules and legal interpretation.",
      "Review linked primary sources and confirm requirements with qualified counsel or regulatory advisors before compliance use."
    ]
  };
}

function scoreRegulation(regulation: Regulation, answers: ApplicabilityAnswers): ApplicabilityResult {
  let score = 0;
  const reasons: string[] = [];
  const triggeredBy: string[] = [];
  const profile = profileFor(regulation);

  const selectedJurisdictions = new Set([answers.headquarters, ...answers.operatingJurisdictions]);
  const directJurisdiction = regulation.jurisdictionIds.some((jurisdictionId) => selectedJurisdictions.has(jurisdictionId));
  const euRelated = regulation.jurisdictionIds.includes("eu") || regulation.jurisdictionIds.includes("nl");
  const sectorMatch = answers.sectors.some((sector) => regulation.sectors.includes(sector) || regulation.sectors.includes("All sectors"));
  const companyTypeMatch = profile.companyTypes.includes(answers.companyType) || profile.companyTypes.includes("Corporate");

  if (directJurisdiction) {
    score += 4;
    reasons.push("The selected headquarters or operating footprint overlaps this jurisdiction.");
    triggeredBy.push("jurisdiction footprint");
  }

  if (answers.euMarketExposure && euRelated) {
    score += 3;
    reasons.push("EU market exposure can make EU sustainability rules relevant, including for some non-EU groups and exporters.");
    triggeredBy.push("EU market exposure");
  }

  if (sectorMatch) {
    score += 2;
    reasons.push("The selected sector appears in the regulation's sector coverage.");
    triggeredBy.push("sector match");
  }

  if (companyTypeMatch) {
    score += 1;
    reasons.push("The selected company type is directionally aligned with this record.");
    triggeredBy.push("company type");
  }

  if (regulation.legalForce === "mandatory" && (directJurisdiction || (answers.euMarketExposure && euRelated))) {
    score += 2;
    reasons.push("The record is tagged as a mandatory rule or regime in the relevant market context.");
    triggeredBy.push("mandatory legal force");
  }

  if (regulation.displayTier === "core") {
    score += 1;
    triggeredBy.push("core Atlas record");
  }

  if (regulation.highImpact) {
    score += 1;
    triggeredBy.push("high impact");
  }

  if (regulation.clientRelevanceCategory === "potentially-direct" && directJurisdiction) {
    score += 2;
    reasons.push("The record is tagged as potentially direct for entities in this market, subject to thresholds and local interpretation.");
    triggeredBy.push("direct relevance tag");
  }

  if (regulation.clientRelevanceCategory === "investor-or-customer-driven" && (answers.financialInstitution || answers.portfolioExposure || answers.regulatedImports || answers.companyType === "Supplier")) {
    score += 2;
    reasons.push("The record is often driven by investor, lender, customer or procurement expectations for this profile.");
    triggeredBy.push("investor/customer exposure");
  }

  if (answers.listed && (regulation.sectors.includes("Listed companies") || regulation.topics.includes("Corporate reporting"))) {
    score += 2;
    reasons.push("Listed-company status often increases disclosure and governance relevance.");
    triggeredBy.push("listed company");
  }

  if (answers.companySize === "large" || answers.companySize === "very-large") {
    if (regulation.topics.some((topic) => ["Corporate reporting", "Climate", "Climate disclosure"].includes(topic))) {
      score += 2;
      reasons.push("Large-company scale is commonly relevant for reporting, assurance and climate disclosure thresholds.");
      triggeredBy.push("company size");
    }
  }

  if (answers.financialInstitution && regulation.sectors.some((sector) => ["Financial services", "Asset management", "Banking", "Insurance", "Private equity"].includes(sector))) {
    score += 3;
    reasons.push("Financial institution profile aligns with investor, product, portfolio or financed-emissions obligations.");
    triggeredBy.push("financial institution");
  }

  if (answers.regulatedImports && regulation.businessImpacts.some((impact) => impact.includes("product") || impact.includes("supply chain"))) {
    score += 3;
    reasons.push("Imports, commodities or supplier exposure can trigger product, trade and supply chain due diligence review.");
    triggeredBy.push("regulated imports or suppliers");
  }

  if (answers.portfolioExposure && regulation.valueChain.some((value) => value.includes("Investment") || value.includes("portfolio") || value.includes("Financed"))) {
    score += 3;
    reasons.push("Portfolio or financed-emissions exposure can create investor data and stewardship expectations.");
    triggeredBy.push("portfolio exposure");
  }

  if (answers.companyType === "Supplier" && regulation.valueChain.some((value) => value.includes("Upstream") || value.includes("supplier"))) {
    score += 2;
    reasons.push("Supplier profile aligns with upstream data collection, customer requests or due diligence expectations.");
    triggeredBy.push("supplier exposure");
  }

  const category = categoryFor(regulation, score, directJurisdiction);

  return {
    regulation,
    category,
    score,
    reasons: reasons.length ? reasons : ["This record is retained as a monitor item based on adjacent ESG regulatory relevance."],
    triggeredBy: triggeredBy.length ? Array.from(new Set(triggeredBy)) : ["monitor"],
    firstActions: profile.requiredActions.slice(0, 4),
    evidenceNeeded: profile.evidenceRequired.slice(0, 4),
    functionsInvolved: regulation.affectedFunctions.slice(0, 4),
    sourceToVerify: sourceToVerify(regulation),
    sourceQualityNote: sourceQualityNote(regulation),
    reviewPriority: reviewPriorityFor(regulation, category, score),
    caveat: "Indicative only. This tool does not determine legal applicability and should be validated against entity-specific facts and primary sources."
  };
}

function categoryFor(regulation: Regulation, score: number, directJurisdiction: boolean): ApplicabilityCategory {
  if (score >= 8 && directJurisdiction && regulation.legalForce === "mandatory") return "Potentially directly relevant";
  if (score >= 7 && directJurisdiction) return "Potentially directly relevant";
  if (score >= 5) return "Potentially indirectly relevant";
  if (regulation.clientRelevanceCategory === "investor-or-customer-driven" && score >= 3) return "Relevant through investors or customers";
  if (score >= 3) return "Relevant through investors or customers";
  return "Monitor only";
}

function reviewPriorityFor(regulation: Regulation, category: ApplicabilityCategory, score: number): ApplicabilityResult["reviewPriority"] {
  if (
    regulation.highImpact &&
    (category === "Potentially directly relevant" || category === "Potentially indirectly relevant") &&
    (regulation.legalForce === "mandatory" || regulation.firstReportingYear === 2026 || regulation.firstReportingYear === 2027)
  ) {
    return "High";
  }
  if (score >= 5 || regulation.dataQualityStatus !== "verified_seed" || regulation.confidenceLevel !== "high") return "Medium";
  return "Monitor";
}

function sourceToVerify(regulation: Regulation) {
  const primary = regulation.sourceUrls.find((source) => source.type === "primary" || source.type === "regulator" || source.type === "standards_body");
  const source = primary || regulation.sourceUrls[0];
  return source ? `${source.label} (${source.type})` : "No source link captured yet";
}

function sourceQualityNote(regulation: Regulation) {
  if (!regulation.sourceUrls.length) return "Source missing; do not rely on this record before research review.";
  if (regulation.dataQualityStatus === "verified_seed" && regulation.confidenceLevel === "high") return "Source-backed seed record with high confidence metadata.";
  if (regulation.dataQualityStatus === "recently_updated") return "Recently updated seed record; confirm the latest official source before client reliance.";
  if (regulation.dataQualityStatus === "date_uncertain") return "Date-sensitive record; validate effective date and reporting year before planning.";
  if (regulation.dataQualityStatus === "needs_review") return "Needs production research review before being treated as verified guidance.";
  return "Source coverage should be reviewed before compliance use.";
}

function defaultActions(regulation: Regulation) {
  const actions = new Set<string>();
  if (regulation.businessImpacts.includes("reporting obligation")) actions.add("Confirm scope, thresholds and reporting boundary.");
  if (regulation.businessImpacts.includes("data collection obligation")) actions.add("Map required datapoints, data owners and source systems.");
  if (regulation.businessImpacts.includes("assurance obligation")) actions.add("Prepare evidence, controls and assurance readiness plan.");
  if (regulation.businessImpacts.includes("due diligence obligation")) actions.add("Assess supplier, commodity and value chain risk exposure.");
  if (regulation.businessImpacts.includes("transition plan obligation")) actions.add("Review climate transition plan governance, targets and dependencies.");
  if (!actions.size) actions.add("Review primary sources and assign an accountable regulatory owner.");
  return Array.from(actions);
}

function defaultEvidence(regulation: Regulation) {
  const evidence = new Set<string>(["Applicability assessment", "Source review log", "Management sign-off record"]);
  if (regulation.businessImpacts.includes("data collection obligation")) evidence.add("Data inventory and owner matrix");
  if (regulation.businessImpacts.includes("supply chain obligation")) evidence.add("Supplier due diligence files and traceability evidence");
  if (regulation.businessImpacts.includes("financial disclosure obligation")) evidence.add("Finance mapping and disclosure controls");
  if (regulation.businessImpacts.includes("product compliance obligation")) evidence.add("Product, import or claims substantiation records");
  return Array.from(evidence);
}

function defaultQuestions(regulation: Regulation) {
  return [
    `Could ${regulation.shortName} be relevant to our entity structure, sectors or market exposure?`,
    "Which thresholds, phase-ins or local transposition rules need legal confirmation?",
    "Which functions own the required data, evidence and controls?",
    "What should be prioritised in the next 90 days for readiness planning?"
  ];
}

export function jurisdictionLabel(id: string) {
  return jurisdictions.find((jurisdiction) => jurisdiction.id === id)?.name || id;
}
