export type MarqueeReviewTier = "marquee-10" | "marquee-25";

export type MarqueeReviewStatus =
  | "source-ready"
  | "needs-threshold-review"
  | "needs-status-review"
  | "needs-source-review"
  | "watchlist-gap";

export type MarqueeReviewItem = {
  id: string;
  tier: MarqueeReviewTier;
  status: MarqueeReviewStatus;
  launchBlocker: boolean;
  whyItMatters: string;
  reviewQuestions: string[];
  premiumUse?: string;
  ownerPlaceholder?: string;
  sourceReviewNextAction?: string;
  thresholdReviewNextAction?: string;
  premiumUseBlockedUntilReviewed?: boolean;
};

export const marqueeReviewItems: MarqueeReviewItem[] = [
  {
    id: "csrd",
    tier: "marquee-10",
    status: "needs-threshold-review",
    launchBlocker: true,
    whyItMatters: "Anchor EU corporate reporting regime and primary advisory wedge for double materiality, controls and assurance readiness.",
    reviewQuestions: ["Are non-EU undertaking triggers clearly caveated?", "Are phase-in years and assurance timing still current?", "Are linked ESRS dependencies clear?"],
    premiumUse: "EU ESG Compliance Pack",
    ownerPlaceholder: "EU corporate reporting reviewer",
    sourceReviewNextAction: "Recheck Commission CSRD/ESRS and member-state transposition sources before using in premium examples.",
    thresholdReviewNextAction: "Confirm EU and non-EU undertaking thresholds, phase-in groups and assurance timing.",
    premiumUseBlockedUntilReviewed: true
  },
  {
    id: "issb-s1-s2",
    tier: "marquee-10",
    status: "needs-status-review",
    launchBlocker: true,
    whyItMatters: "Global baseline for ISSB adoption views and market-by-market climate reporting readiness.",
    reviewQuestions: ["Which markets have adopted or proposed ISSB-aligned rules?", "Are voluntary framework caveats separate from mandatory adoption?", "Are market aliases searchable?"],
    premiumUse: "ISSB Adoption Tracker Pack",
    ownerPlaceholder: "ISSB adoption reviewer",
    sourceReviewNextAction: "Verify IFRS/ISSB standards and market adoption sources separately.",
    thresholdReviewNextAction: "Confirm each market's local scope, listing trigger and effective date before premium use.",
    premiumUseBlockedUntilReviewed: true
  },
  {
    id: "eu-taxonomy",
    tier: "marquee-10",
    status: "needs-threshold-review",
    launchBlocker: true,
    whyItMatters: "Core sustainable finance and CSRD-linked disclosure regime with high client demand.",
    reviewQuestions: ["Are eligibility and alignment outputs distinguished?", "Are financial vs non-financial undertakings separated?", "Are source links primary enough for client review?"],
    premiumUse: "EU ESG Compliance Pack",
    ownerPlaceholder: "Sustainable finance reviewer",
    sourceReviewNextAction: "Recheck taxonomy regulation, delegated acts and Commission guidance before premium use.",
    thresholdReviewNextAction: "Separate financial, non-financial and CSRD-linked disclosure triggers.",
    premiumUseBlockedUntilReviewed: true
  },
  {
    id: "sfdr",
    tier: "marquee-10",
    status: "needs-threshold-review",
    launchBlocker: true,
    whyItMatters: "High-value sustainable finance regime for asset managers, funds and financial advisers.",
    reviewQuestions: ["Are entity and product-level disclosures distinguished?", "Are Article 6/8/9 claims caveated?", "Are RTS/source notes visible?"],
    premiumUse: "Financial Services ESG Regulation Pack"
  },
  {
    id: "csddd",
    tier: "marquee-10",
    status: "needs-status-review",
    launchBlocker: true,
    whyItMatters: "Major supply-chain due diligence and transition-plan regime with shifting EU implementation context.",
    reviewQuestions: ["Are current phase-in and transposition caveats up to date?", "Are threshold references legally cautious?", "Are CSDDD and national laws clearly separated?"],
    premiumUse: "Supply Chain Due Diligence Pack"
  },
  {
    id: "eudr",
    tier: "marquee-10",
    status: "needs-status-review",
    launchBlocker: true,
    whyItMatters: "High-impact commodity, land-use and importer/exporter regulation for supply-chain and product clients.",
    reviewQuestions: ["Are delay/transition dates current?", "Are commodities and operator/trader roles clear?", "Are SME and country-risk caveats preserved?"],
    premiumUse: "Supply Chain Due Diligence Pack"
  },
  {
    id: "cbam",
    tier: "marquee-10",
    status: "source-ready",
    launchBlocker: false,
    whyItMatters: "Flagship climate-trade regulation that creates exporter/importer evidence and cost exposure.",
    reviewQuestions: ["Are transitional vs definitive periods separated?", "Are covered sectors current?", "Are importer/exporter data needs visible?"],
    premiumUse: "EU ESG Compliance Pack"
  },
  {
    id: "california-sb253-sb261",
    tier: "marquee-10",
    status: "needs-status-review",
    launchBlocker: true,
    whyItMatters: "US climate disclosure driver even while federal SEC climate disclosure remains uncertain.",
    reviewQuestions: ["Are CARB timelines and amendments current?", "Are revenue thresholds caveated?", "Is SB 253 separated from SB 261 where needed?"],
    premiumUse: "Climate Disclosure Watchlist"
  },
  {
    id: "uk-sdr",
    tier: "marquee-10",
    status: "needs-threshold-review",
    launchBlocker: true,
    whyItMatters: "Core UK sustainable finance and anti-greenwashing market for funds, labels and disclosure expectations.",
    reviewQuestions: ["Are FCA rules and UK SRS development separated?", "Are fund-label rules clear?", "Are anti-greenwashing expectations linked?"],
    premiumUse: "Financial Services ESG Regulation Pack"
  },
  {
    id: "us-sec-climate-watch",
    tier: "marquee-10",
    status: "needs-status-review",
    launchBlocker: false,
    whyItMatters: "Important monitor item for US federal disclosure uncertainty and investor expectations.",
    reviewQuestions: ["Is paused/withdrawn/litigation status current?", "Is this clearly a monitor item rather than enforceable timetable?", "Are California and ISSB alternatives linked?"],
    premiumUse: "Climate Disclosure Watchlist"
  },
  {
    id: "australia-climate-reporting",
    tier: "marquee-25",
    status: "needs-threshold-review",
    launchBlocker: false,
    whyItMatters: "High-demand ISSB-aligned APAC market for climate reporting and assurance planning.",
    reviewQuestions: ["Are group phase-in thresholds current?", "Are assurance phase-ins caveated?", "Are reporting years visible?"],
    premiumUse: "ISSB Adoption Tracker Pack"
  },
  {
    id: "singapore-climate-reporting",
    tier: "marquee-25",
    status: "needs-status-review",
    launchBlocker: false,
    whyItMatters: "Important APAC climate and ISSB roadmap market for listed and large company profiles.",
    reviewQuestions: ["Are SGX and ACRA/Accounting and Corporate Regulatory Authority roadmaps separated?", "Are listed and non-listed timelines caveated?", "Are financial-sector rules linked?"],
    premiumUse: "ISSB Adoption Tracker Pack"
  },
  {
    id: "hong-kong-climate",
    tier: "marquee-25",
    status: "needs-status-review",
    launchBlocker: false,
    whyItMatters: "ISSB-aligned exchange disclosure market that supports APAC comparison and investor reporting use cases.",
    reviewQuestions: ["Are HKEX effective dates current?", "Are listed-company scope and reliefs clear?", "Are source links primary/regulator-level?"],
    premiumUse: "ISSB Adoption Tracker Pack"
  },
  {
    id: "japan-ssbj",
    tier: "marquee-25",
    status: "needs-status-review",
    launchBlocker: false,
    whyItMatters: "Core Japan sustainability disclosure regime and major ISSB adoption comparator.",
    reviewQuestions: ["Are SSBJ standards and FSA/TSE implementation separated?", "Are timing assumptions current?", "Are listed-company thresholds caveated?"],
    premiumUse: "ISSB Adoption Tracker Pack"
  },
  {
    id: "canada-csds",
    tier: "marquee-25",
    status: "needs-status-review",
    launchBlocker: false,
    whyItMatters: "North American ISSB-aligned standards and regulator-development monitor item.",
    reviewQuestions: ["Are CSSB standards separated from securities regulator mandates?", "Is adoption status cautious?", "Are OSFI and supply-chain records linked?"],
    premiumUse: "ISSB Adoption Tracker Pack"
  },
  {
    id: "brazil-cvm-193",
    tier: "marquee-25",
    status: "needs-threshold-review",
    launchBlocker: false,
    whyItMatters: "Latin America anchor record for ISSB adoption and sustainability reporting.",
    reviewQuestions: ["Are voluntary vs mandatory phases current?", "Are listed-company and fund contexts separated?", "Are CVM source links prominent?"],
    premiumUse: "ISSB Adoption Tracker Pack"
  },
  {
    id: "india-brsr",
    tier: "marquee-25",
    status: "needs-threshold-review",
    launchBlocker: false,
    whyItMatters: "Large-market corporate sustainability disclosure and value-chain data driver.",
    reviewQuestions: ["Are top-listed-company scope and BRSR Core separated?", "Are assurance expectations caveated?", "Are supplier/value-chain data implications visible?"],
    premiumUse: "Emerging Markets Disclosure Watchlist"
  },
  {
    id: "south-africa-jse-taxonomy",
    tier: "marquee-25",
    status: "needs-source-review",
    launchBlocker: false,
    whyItMatters: "Africa anchor for sustainability guidance and taxonomy context.",
    reviewQuestions: ["Are JSE guidance and taxonomy context separated?", "Is mandatory vs guidance status clear?", "Are official sources complete enough?"],
    premiumUse: "Global Coverage Expansion Watchlist"
  },
  {
    id: "europe-national-supply-chain-dd",
    tier: "marquee-25",
    status: "needs-threshold-review",
    launchBlocker: false,
    whyItMatters: "Condensed national due-diligence cluster for Germany LkSG, French Duty of Vigilance and Norway Transparency Act.",
    reviewQuestions: ["Are country-specific thresholds represented as caveats?", "Does the cluster avoid implying one unified law?", "Are links primary/regulator-quality?"],
    premiumUse: "Supply Chain Due Diligence Pack"
  },
  {
    id: "uk-modern-slavery-act",
    tier: "marquee-25",
    status: "source-ready",
    launchBlocker: false,
    whyItMatters: "Important UK supply-chain transparency rule and client baseline for modern slavery reporting.",
    reviewQuestions: ["Are turnover thresholds and statement timing caveated?", "Are proposed reform notes separated from current law?", "Are supply-chain evidence needs visible?"],
    premiumUse: "Supply Chain Due Diligence Pack"
  },
  {
    id: "australia-modern-slavery-act",
    tier: "marquee-25",
    status: "needs-threshold-review",
    launchBlocker: false,
    whyItMatters: "Comparable modern slavery reporting regime for portfolio and supplier exposure scans.",
    reviewQuestions: ["Are reporting thresholds current?", "Are federal/state differences caveated?", "Are due-date and evidence expectations visible?"],
    premiumUse: "Supply Chain Due Diligence Pack"
  },
  {
    id: "eu-batteries-regulation",
    tier: "marquee-25",
    status: "source-ready",
    launchBlocker: false,
    whyItMatters: "Product sustainability, circularity and raw-material due diligence regime for batteries and industrial value chains.",
    reviewQuestions: ["Are due-diligence delay notes current?", "Are battery categories and phase-ins clear?", "Are passport/data needs visible?"],
    premiumUse: "Product Sustainability Pack"
  },
  {
    id: "eu-espr-dpp",
    tier: "marquee-25",
    status: "needs-status-review",
    launchBlocker: false,
    whyItMatters: "Digital Product Passport and product sustainability wedge for manufacturers, retailers and exporters.",
    reviewQuestions: ["Are working-plan priorities current?", "Are delegated-act caveats clear?", "Are product-data owners visible?"],
    premiumUse: "Product Sustainability Pack"
  },
  {
    id: "eu-ppwr",
    tier: "marquee-25",
    status: "needs-status-review",
    launchBlocker: false,
    whyItMatters: "Packaging and circular economy regime relevant across consumer goods, retail, food and manufacturing.",
    reviewQuestions: ["Are application dates and phased obligations current?", "Are packaging operators and roles clear?", "Are recycled-content and claims risks visible?"],
    premiumUse: "Product Sustainability Pack"
  },
  {
    id: "eu-forced-labour",
    tier: "marquee-25",
    status: "needs-status-review",
    launchBlocker: false,
    whyItMatters: "EU product-ban and forced-labour risk regime for importer/exporter and supplier due-diligence workflows.",
    reviewQuestions: ["Are application dates current?", "Are product-ban mechanics and investigation role caveated?", "Are links to UFLPA and supplier due diligence clear?"],
    premiumUse: "Supply Chain Due Diligence Pack"
  }
];

export const marqueeReviewStatusLabel: Record<MarqueeReviewStatus, string> = {
  "source-ready": "Source-ready seed",
  "needs-threshold-review": "Needs threshold review",
  "needs-status-review": "Needs status review",
  "needs-source-review": "Needs source review",
  "watchlist-gap": "Watchlist gap"
};
