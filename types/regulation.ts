export type Status = "consultation" | "adopted" | "in_force" | "first_reporting" | "transition" | "paused";
export type JurisdictionType = "local" | "national" | "regional" | "supranational" | "international";
export type Confidence = "high" | "medium" | "needs_review";

export interface Jurisdiction {
  id: string;
  name: string;
  iso2?: string;
  iso3?: string;
  region: string;
  type: JurisdictionType;
  parent?: string;
  executiveSummary: string;
}

export interface Regulation {
  id: string;
  title: string;
  shortName: string;
  jurisdictionIds: string[];
  jurisdictionType: JurisdictionType;
  issuingBody: string;
  status: Status;
  topics: string[];
  sectors: string[];
  valueChain: string[];
  effectiveDate: string;
  firstReportingYear?: number;
  summary: string;
  applicability: string;
  businessImpact: string;
  sourceUrls: string[];
  latestUpdate: string;
  lastReviewed: string;
  confidence: Confidence;
  advisoryOpportunities: string[];
}
