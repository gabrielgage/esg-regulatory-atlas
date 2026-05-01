export type Status = "consultation" | "adopted" | "in_force" | "first_reporting" | "transition" | "paused" | "voluntary";
export type JurisdictionType = "subnational" | "local" | "national" | "regional" | "supranational" | "international";
export type Confidence = "high" | "medium" | "needs_review" | "date_uncertain";
export type DataQualityStatus = "verified_seed" | "needs_review" | "recently_updated" | "date_uncertain" | "source_missing";
export type AdoptionLevel = "mandatory" | "voluntary" | "phased" | "market_standard" | "consultation";
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
  jurisdiction: string;
  jurisdictionIds: string[];
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
}

export interface QuickView {
  id: string;
  label: string;
  description: string;
  filters: Partial<FilterState>;
}
