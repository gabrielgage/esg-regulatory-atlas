export type Status = "consultation" | "adopted" | "in_force" | "first_reporting" | "transition" | "paused" | "voluntary";
export type JurisdictionType = "local" | "national" | "regional" | "supranational" | "international";
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
  | "board oversight obligation";

export interface SourceLink {
  label: string;
  url: string;
  type: "primary" | "secondary" | "regulator" | "standards_body";
}

export interface Jurisdiction {
  id: string;
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
  highImpact?: boolean;
}

export interface FilterState {
  query: string;
  topic: string;
  sector: string;
  jurisdictionType: string;
  status: string;
  reportingYear: string;
  valueChain: string;
  confidence: string;
  advisory: string;
}

export interface QuickView {
  id: string;
  label: string;
  description: string;
  filters: Partial<FilterState>;
}
