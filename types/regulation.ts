export type Status = "consultation" | "adopted" | "in_force" | "first_reporting" | "transition" | "paused" | "voluntary";
export type JurisdictionType = "subnational" | "local" | "national" | "regional" | "supranational" | "international";
export type Confidence = "high" | "medium" | "needs_review" | "date_uncertain";
export type DataQualityStatus = "verified_seed" | "needs_review" | "recently_updated" | "date_uncertain" | "source_missing";
export type AdoptionLevel = "mandatory" | "voluntary" | "phased" | "market_standard" | "consultation";
export type AtlasRecordType =
  | "regulation"
  | "directive"
  | "law"
  | "standard"
  | "framework"
  | "guidance"
  | "taxonomy"
  | "exchange-rule"
  | "supervisory-expectation"
  | "voluntary-questionnaire"
  | "commitment"
  | "roadmap"
  | "source-note";
export type LegalForce =
  | "mandatory"
  | "voluntary"
  | "comply-or-explain"
  | "supervisory-expectation"
  | "market-expectation"
  | "roadmap"
  | "monitor";
export type DisplayTier = "core" | "expanded" | "monitor" | "source-note";
export type AtlasGranularity = "parent" | "child" | "alias" | "source";
export type ClientRelevanceCategory =
  | "potentially-direct"
  | "potentially-indirect"
  | "investor-or-customer-driven"
  | "voluntary-best-practice"
  | "monitor-only";
export type MarketMaturityScore = "deep" | "good" | "basic" | "monitor" | "missing";
export type MonetizationTier = "free" | "lead-generation" | "premium-roadmap";
export type SourceSystem =
  | "Atlas Seed"
  | "Rabo/KPMG Radar"
  | "Framework Master List"
  | "Seneca ESG"
  | "Official Source"
  | "Manual Research";
export type BusinessImpact =
  | "reporting obligation"
  | "governance obligation"
  | "due diligence obligation"
  | "financial disclosure obligation"
  | "product compliance obligation"
  | "supply chain obligation"
  | "assurance obligation"
  | "transition plan obligation"
  | "data collection obligation"
  | "board oversight obligation"
  | "taxonomy disclosure obligation";

export interface SourceLink {
  label: string;
  url: string;
  type: "primary" | "secondary" | "regulator" | "standards_body";
}

export interface ChildItem {
  label: string;
  type: "subrequirement" | "delegated-act" | "module" | "milestone" | "alias" | "source-note";
  status?: string;
  date?: string;
  sourceUrl?: string;
  note?: string;
}

export interface Jurisdiction {
  id: string;
  code: string;
  name: string;
  iso2?: string;
  iso3?: string;
  region: string;
  type: JurisdictionType;
  parent?: string;
  coordinates?: [number, number];
  regulatoryIntensity: "high" | "medium" | "emerging" | "watch";
  executiveSummary: string;
}

export interface Regulation {
  id: string;
  title: string;
  shortName: string;
  recordType?: AtlasRecordType;
  legalForce?: LegalForce;
  displayTier?: DisplayTier;
  atlasGranularity?: AtlasGranularity;
  parentRecordId?: string;
  aliases?: string[];
  sourceSystem?: SourceSystem;
  sourceConfidence?: Confidence;
  lastVerified?: string;
  childItems?: ChildItem[];
  clientRelevanceCategory?: ClientRelevanceCategory;
  marketMaturityScore?: MarketMaturityScore;
  monetizationTier?: MonetizationTier;
  jurisdiction: string;
  jurisdictionIds: string[];
  transposedJurisdictionIds?: string[];
  jurisdictionType: JurisdictionType;
  issuingBody: string;
  status: Status;
  adoptionLevel: AdoptionLevel;
  topics: string[];
  topic: string;
  sectors: string[];
  valueChain: string[];
  valueChainImpact: string[];
  effectiveDate: string;
  firstReportingYear?: number;
  summary: string;
  applicability: string;
  applicabilityScope?: {
    thresholds?: string[];
    entityTypes?: string[];
    sectorsInScope?: string[];
  };
  keyRequirements: string[];
  businessImpact: string;
  businessImpacts: BusinessImpact[];
  affectedFunctions: string[];
  sourceUrls: SourceLink[];
  latestUpdate: string;
  lastReviewed: string;
  nextReviewDate?: string;
  confidence: Confidence;
  confidenceLevel: Confidence;
  dataQualityStatus: DataQualityStatus;
  changeLogSummary?: string;
  advisoryOpportunities: string[];
  legalInstrumentType?: "law" | "directive" | "regulation" | "standard" | "guidance" | "consultation" | "voluntary-framework";
  companyTypes?: string[];
  requiredActions?: string[];
  evidenceRequired?: string[];
  typicalClientQuestions?: string[];
  immediateReadinessActions?: string[];
  dataNeeded?: string[];
  likelyPainPoints?: string[];
  relevantAdvisoryServices?: string[];
  softwareEnablementOpportunity?: string;
  caveats?: string[];
  firstReportDueDate?: string;
  phaseInNotes?: string;
  consultationDeadline?: string;
  implementationEffort?: "low" | "medium" | "high" | "very high";
  readinessComplexity?: "low" | "medium" | "high" | "very high";
  penalties?: string;
  highImpact?: boolean;
}

export interface FilterState {
  query: string;
  jurisdiction: string;
  region: string;
  topic: string;
  sector: string;
  companyType: string;
  jurisdictionType: string;
  status: string;
  reportingYear: string;
  valueChain: string;
  businessFunction: string;
  obligation: string;
  confidence: string;
  dataQuality: string;
  advisory: string;
  recordType: string;
  legalForce: string;
  clientRelevance: string;
}

export interface QuickView {
  id: string;
  label: string;
  description: string;
  filters: Partial<FilterState>;
}
