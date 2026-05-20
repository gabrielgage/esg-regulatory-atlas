import type { BusinessImpact, Regulation } from "@/types/regulation";

export type BriefingScenario = {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  bestFor: string[];
  recordIds?: string[];
  jurisdictionIds?: string[];
  topics?: string[];
  sectors?: string[];
  companyTypes?: string[];
  valueChain?: string[];
  businessImpacts?: BusinessImpact[];
  leadershipQuestion: string;
  firstOperatingMove: string;
  evidencePackage: string;
  advisoryMotion: string;
  caveat: string;
  nextSteps: string[];
};

export const briefingScenarios: BriefingScenario[] = [
  {
    id: "eu-corporate-reporting",
    label: "EU corporate reporting briefing",
    eyebrow: "Corporate reporting",
    description: "Prepare an orientation note for CSRD, ESRS, EU Taxonomy and related reporting readiness questions.",
    bestFor: ["CSOs", "Finance controllers", "Legal teams", "ESG advisors"],
    recordIds: ["csrd", "esrs", "eu-taxonomy", "sfdr", "issb-s1-s2"],
    jurisdictionIds: ["eu"],
    topics: ["Corporate reporting", "Sustainable finance"],
    businessImpacts: ["reporting obligation", "assurance obligation", "taxonomy disclosure obligation", "board oversight obligation"],
    leadershipQuestion: "Which corporate reporting, assurance and taxonomy signals may shape the next reporting-cycle readiness plan?",
    firstOperatingMove: "Confirm entity scope, reporting boundary, timing cohort, double-materiality ownership and source-review status before turning the note into a client-facing workplan.",
    evidencePackage: "Entity list, turnover and employee facts, reporting calendar, ESRS data inventory, assurance readiness evidence and linked official sources.",
    advisoryMotion: "Scope a CSRD/ESRS readiness scan, data-owner map, control framework and board reporting pathway.",
    caveat: "EU reporting scope and timing may depend on national implementation, group facts and simplification measures. Treat this as an orientation scenario.",
    nextSteps: ["Confirm scope and group structure", "Map reporting year and first publication signals", "Identify data owners", "Review source and premium-use gates"]
  },
  {
    id: "pe-portfolio-exposure",
    label: "PE portfolio exposure scan",
    eyebrow: "Portfolio and investors",
    description: "Frame portfolio-company, investor-request and financed-exposure questions across reporting, climate and due-diligence regimes.",
    bestFor: ["Private equity", "Portfolio operations", "Asset managers", "Deal teams"],
    recordIds: ["sfdr", "eu-taxonomy", "csrd", "issb-s1-s2", "california-sb253-sb261"],
    sectors: ["Private equity", "Asset management", "Financial services"],
    companyTypes: ["Private equity fund", "Asset manager", "Portfolio company", "Financial institution"],
    valueChain: ["Investments and portfolio companies", "Financed emissions"],
    businessImpacts: ["financial disclosure obligation", "data collection obligation", "governance obligation", "board oversight obligation"],
    leadershipQuestion: "Which portfolio or investor-driven regulatory signals may require data collection, governance or market monitoring?",
    firstOperatingMove: "Segment portfolio companies by market, listing status, size, sector and customer/investor data requests before ranking regulatory exposure.",
    evidencePackage: "Portfolio company list, jurisdictions, sectors, ownership/control facts, investor requests, emissions data availability and current reporting frameworks.",
    advisoryMotion: "Create a portfolio exposure map, custom watchlist and data request template for priority companies.",
    caveat: "Portfolio exposure can be indirect, customer-driven or investor-driven. This scenario does not determine legal applicability for any company.",
    nextSteps: ["Segment portfolio markets", "Flag investor/customer data requests", "Prioritize direct and indirect records", "Prepare portfolio evidence checklist"]
  },
  {
    id: "supplier-exporter-readiness",
    label: "SME supplier/exporter readiness note",
    eyebrow: "Supply chain",
    description: "Orient supplier, exporter and procurement teams around value-chain, import, product and due-diligence signals.",
    bestFor: ["SME suppliers", "Procurement teams", "Exporters", "Supply-chain leads"],
    recordIds: ["eudr", "cbam", "csddd", "eu-batteries-regulation", "eu-forced-labour-regulation"],
    topics: ["Supply chain due diligence", "Product and circular economy", "Climate"],
    valueChain: ["Upstream suppliers", "Trade and imports", "Products and services"],
    businessImpacts: ["supply chain obligation", "product compliance obligation", "due diligence obligation", "data collection obligation"],
    leadershipQuestion: "Which supplier, importer, product or customer-data requests may become near-term readiness priorities?",
    firstOperatingMove: "Map products, commodities, import flows, customer markets and supplier evidence before treating any record as directly in scope.",
    evidencePackage: "Product list, commodity exposure, supplier locations, customer requests, import/export flows, traceability files and source links.",
    advisoryMotion: "Prepare a supplier readiness scan, evidence checklist and customer-response pack.",
    caveat: "Supplier and exporter relevance often depends on product, commodity, customer and market-access facts that need source and counsel/adviser review.",
    nextSteps: ["Map trade and commodity exposure", "Collect customer ESG data requests", "Identify product-specific records", "Prepare evidence owner list"]
  },
  {
    id: "financial-services-watchlist",
    label: "Financial services sustainable finance watchlist",
    eyebrow: "Sustainable finance",
    description: "Build a watchlist around funds, sustainable finance disclosures, taxonomy, climate risk and anti-greenwashing signals.",
    bestFor: ["Banks", "Asset managers", "Insurers", "Compliance teams"],
    recordIds: ["sfdr", "eu-taxonomy", "uk-sdr", "mifid-ii-sustainability-preferences", "issb-s1-s2"],
    topics: ["Sustainable finance", "Taxonomy and classification", "Climate"],
    sectors: ["Financial services", "Asset management", "Banking", "Insurance"],
    companyTypes: ["Financial institution", "Asset manager", "Bank", "Insurer"],
    businessImpacts: ["financial disclosure obligation", "taxonomy disclosure obligation", "governance obligation", "data collection obligation"],
    leadershipQuestion: "Which sustainable finance, product-labelling, climate-risk or taxonomy signals should compliance and product teams monitor?",
    firstOperatingMove: "Separate mandatory disclosures, product labels, market expectations and voluntary frameworks before assigning compliance owners.",
    evidencePackage: "Fund/product taxonomy, entity type, market of authorization, disclosures, product labels, data vendors and regulator source links.",
    advisoryMotion: "Set up a sustainable finance watchlist and product-disclosure source review.",
    caveat: "Sustainable finance rules vary by authorization, product, market and regulatory status. Treat this as a watchlist orientation, not fund classification advice.",
    nextSteps: ["Segment entity and product scope", "Identify regulator source hierarchy", "Check labels and anti-greenwashing exposure", "Build watchlist cadence"]
  },
  {
    id: "board-risk-update",
    label: "Board and risk committee update",
    eyebrow: "Governance",
    description: "Create a leadership-facing update focused on high-impact, source-reviewed and date-sensitive regulatory signals.",
    bestFor: ["Board committees", "Risk leaders", "General counsel", "Strategy teams"],
    recordIds: ["csrd", "csddd", "california-sb253-sb261", "uk-sdr", "australia-climate-reporting"],
    topics: ["Corporate reporting", "Climate", "Supply chain due diligence", "Governance"],
    businessImpacts: ["board oversight obligation", "governance obligation", "assurance obligation", "transition plan obligation"],
    leadershipQuestion: "Which high-impact regulatory signals should leadership understand for risk oversight and planning?",
    firstOperatingMove: "Separate confirmed obligations, watch items and source-review prompts before assigning board or committee actions.",
    evidencePackage: "Priority record list, status labels, key dates, owner functions, open source-review prompts and next governance decisions.",
    advisoryMotion: "Prepare a board-ready regulatory update with caveats, source links and next-decision prompts.",
    caveat: "Board updates should preserve uncertainty and source-review limits. Do not use this scenario as a legal opinion or compliance determination.",
    nextSteps: ["Pick priority markets", "Separate mandatory and monitor items", "Review source confidence", "Define next governance questions"]
  }
];

export function getBriefingScenarioById(id: string | null) {
  return briefingScenarios.find((scenario) => scenario.id === id) || null;
}

export function getScenarioRegulations(regulations: Regulation[], scenario: BriefingScenario, limit = 10) {
  return regulations
    .map((regulation) => ({ regulation, score: scoreRegulationForScenario(regulation, scenario) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.regulation.shortName.localeCompare(b.regulation.shortName))
    .slice(0, limit)
    .map(({ regulation }) => regulation);
}

function scoreRegulationForScenario(regulation: Regulation, scenario: BriefingScenario) {
  let score = 0;
  if (scenario.recordIds?.includes(regulation.id)) score += 10;
  if (intersects(scenario.jurisdictionIds, [...regulation.jurisdictionIds, ...(regulation.transposedJurisdictionIds || [])])) score += 4;
  if (intersects(scenario.topics, [regulation.topic, ...regulation.topics])) score += 3;
  if (intersects(scenario.sectors, regulation.sectors)) score += 2;
  if (intersects(scenario.companyTypes, regulation.companyTypes || [])) score += 2;
  if (intersects(scenario.valueChain, [...regulation.valueChain, ...regulation.valueChainImpact])) score += 2;
  if (intersects(scenario.businessImpacts, regulation.businessImpacts)) score += 2;
  if (regulation.highImpact) score += 1;
  if (regulation.confidence === "needs_review" || regulation.dataQualityStatus === "needs_review") score -= 0.25;
  return score;
}

function intersects<T extends string>(target: T[] | undefined, values: string[]) {
  if (!target?.length) return false;
  return target.some((item) => values.includes(item));
}
