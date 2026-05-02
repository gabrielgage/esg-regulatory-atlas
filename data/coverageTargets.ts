export type CoverageTargetTier = "deep-anchor" | "core-commercial" | "watch-expansion";

export type CoverageTarget = {
  jurisdictionId: string;
  tier: CoverageTargetTier;
  targetDirectRecords: number;
  rationale: string;
};

export const coverageTargets: CoverageTarget[] = [
  {
    jurisdictionId: "eu",
    tier: "deep-anchor",
    targetDirectRecords: 20,
    rationale: "EU remains the deepest launch anchor because it drives corporate reporting, sustainable finance, product, trade and due-diligence workstreams."
  },
  ...["nl", "uk", "us", "ca-us", "sg", "jp", "au", "br", "in", "cn", "ca", "ch", "tr", "mx"].map((jurisdictionId) => ({
    jurisdictionId,
    tier: "core-commercial" as const,
    targetDirectRecords: 5,
    rationale: "Core commercial market for public Atlas demos, premium pack previews, advisory scans or investor/customer-facing regulatory mapping."
  })),
  ...["fr", "de", "no", "hk", "kr", "tw", "nz", "my", "id", "th", "ph", "za"].map((jurisdictionId) => ({
    jurisdictionId,
    tier: "watch-expansion" as const,
    targetDirectRecords: 3,
    rationale: "Watch or expansion market that needs enough direct records to support credible jurisdiction profiles without implying complete local coverage."
  }))
];

export const coverageTargetByJurisdiction = new Map(coverageTargets.map((target) => [target.jurisdictionId, target]));

export const coverageTierLabel: Record<CoverageTargetTier, string> = {
  "deep-anchor": "Deep anchor",
  "core-commercial": "Core commercial",
  "watch-expansion": "Watch expansion"
};
