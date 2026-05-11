import type { Jurisdiction } from "@/types/regulation";

export type MarketQuickStart = {
  jurisdictionId: string;
  headline: string;
  userQuestion: string;
  firstActions: string[];
  evidenceStarterPack: string[];
  ownerFunctions: string[];
  watchItems: string[];
  advisoryPrompts: string[];
  caveat: string;
};

export const marketQuickStarts: MarketQuickStart[] = [
  {
    jurisdictionId: "eu",
    headline: "Start with reporting scope, value-chain exposure and product/trade touchpoints.",
    userQuestion: "Do EU reporting, sustainable finance, supply-chain, product or trade rules create direct or customer-driven obligations?",
    firstActions: [
      "Map EU entities, parent-company structure, listed status and non-EU turnover exposure.",
      "Screen CSRD/ESRS, EU Taxonomy, SFDR, CSDDD, CBAM, EUDR and product sustainability records together.",
      "Identify data owners for value-chain, emissions, taxonomy, supplier, product and assurance evidence."
    ],
    evidenceStarterPack: [
      "Entity structure and EU/non-EU turnover evidence",
      "Double materiality and ESRS data-point inventory",
      "Scope 1, 2 and 3 emissions data and supplier data request log",
      "Taxonomy eligibility/alignment workpapers and product/import evidence"
    ],
    ownerFunctions: ["Sustainability", "Finance", "Legal", "Procurement", "Product", "Internal audit"],
    watchItems: ["Omnibus/transposition timing", "Sector standards", "Assurance phase-in", "CSDDD and product-rule implementation"],
    advisoryPrompts: [
      "CSRD/ESRS readiness and double materiality design",
      "Taxonomy and sustainable finance classification support",
      "Supplier due diligence and product/trade exposure scan"
    ],
    caveat: "EU obligations may depend on entity thresholds, national transposition, group structure, sector rules and non-EU market exposure."
  },
  {
    jurisdictionId: "nl",
    headline: "Combine EU obligations with Dutch permitting, nitrogen, climate and energy-saving context.",
    userQuestion: "Which EU inherited rules apply, and where do Dutch environmental or permitting constraints change implementation priorities?",
    firstActions: [
      "Confirm which EU reporting and due-diligence records are inherited through Dutch entities.",
      "Screen nitrogen, energy-saving and climate-plan records for operational sites, real estate and supply-chain exposure.",
      "Separate legal applicability review from operational permitting risk review."
    ],
    evidenceStarterPack: [
      "Dutch entity and reporting-boundary evidence",
      "Site, permit, energy-use and emissions inventory",
      "Supplier and construction/agriculture exposure notes",
      "EU reporting and assurance workplan"
    ],
    ownerFunctions: ["Legal", "Sustainability", "Operations", "Real estate", "Procurement"],
    watchItems: ["CSRD transposition", "Nitrogen permitting developments", "Energy-saving enforcement priorities"],
    advisoryPrompts: ["Dutch market regulatory exposure scan", "CSRD implementation roadmap", "Operational permitting and ESG data review"],
    caveat: "Dutch market relevance may combine EU-level obligations with local environmental permitting facts that require specialist review."
  },
  {
    jurisdictionId: "uk",
    headline: "Start with listed-company, financial-services and anti-greenwashing exposure.",
    userQuestion: "Are UK disclosure, transition-plan, sustainable finance or modern slavery expectations relevant to the entity or its investors?",
    firstActions: [
      "Confirm UK listing status, FCA perimeter, fund/product labels and investor disclosure expectations.",
      "Review SDR, anti-greenwashing, UK TCFD-aligned rules, transition-plan expectations and UK SRS development.",
      "Map green claims, fund labels and supplier transparency evidence to accountable owners."
    ],
    evidenceStarterPack: [
      "Listing and FCA-regulated activity evidence",
      "Climate-risk governance and transition-plan materials",
      "Product/fund sustainability claim substantiation",
      "Supplier transparency and modern slavery statement inputs"
    ],
    ownerFunctions: ["Legal", "Compliance", "Investor relations", "Sustainability", "Product", "Procurement"],
    watchItems: ["UK SRS timing", "Transition-plan expectations", "FCA sustainable investment label implementation"],
    advisoryPrompts: ["UK SDR and anti-greenwashing review", "Transition plan gap assessment", "Fund/product disclosure support"],
    caveat: "UK relevance depends on listing, FCA perimeter, product claims, investor expectations and entity-specific facts."
  },
  {
    jurisdictionId: "us",
    headline: "Treat the US as a fragmented market with state, federal, investor and sector-driven signals.",
    userQuestion: "Which state-level, investor, supplier or sector expectations matter even if federal climate disclosure remains uncertain?",
    firstActions: [
      "Screen California, SEC monitor items, federal supplier developments and investor/customer ESG data requests together.",
      "Map state operating footprint, revenue exposure, listing status and procurement/customer pressure.",
      "Track climate disclosure and anti-greenwashing records as separate legal-status categories."
    ],
    evidenceStarterPack: [
      "US entity footprint and state revenue/activity notes",
      "Investor/customer ESG request log",
      "GHG inventory and climate-risk governance materials",
      "Public sustainability claim substantiation"
    ],
    ownerFunctions: ["Legal", "Sustainability", "Finance", "Investor relations", "Sales", "Procurement"],
    watchItems: ["SEC climate rule status", "State climate disclosure laws", "Federal supplier climate disclosure developments"],
    advisoryPrompts: ["US state exposure scan", "California readiness check", "Climate disclosure and claims evidence review"],
    caveat: "US relevance is fragmented and date-sensitive; state law, litigation and federal agency developments should be reviewed before reliance."
  },
  {
    jurisdictionId: "ca-us",
    headline: "Prioritize emissions disclosure, climate-risk reporting and public climate-claim evidence.",
    userQuestion: "Does California activity, revenue or public climate-claim exposure make SB 253, SB 261 or AB 1305 relevant?",
    firstActions: [
      "Confirm whether the company is doing business in California and whether revenue thresholds may be met.",
      "Prepare emissions inventory, assurance readiness and climate-risk governance evidence.",
      "Review public net-zero, carbon-neutral and emissions-reduction claims for substantiation."
    ],
    evidenceStarterPack: [
      "California business activity and revenue evidence",
      "Scope 1, 2 and 3 emissions inventory",
      "Climate-related financial risk assessment",
      "Public climate-claims substantiation file"
    ],
    ownerFunctions: ["Legal", "Finance", "Sustainability", "Communications", "Internal audit"],
    watchItems: ["Regulatory implementation guidance", "Assurance phase-in", "Litigation or timing changes"],
    advisoryPrompts: ["California climate disclosure readiness", "GHG data and controls review", "Climate-claims substantiation support"],
    caveat: "California applicability depends on doing-business analysis, revenue thresholds, implementation guidance and claim-specific facts."
  },
  {
    jurisdictionId: "sg",
    headline: "Use Singapore as an ISSB-aligned climate reporting and assurance readiness market.",
    userQuestion: "Do SGX listing status, large non-listed company scope or investor expectations trigger climate disclosure readiness work?",
    firstActions: [
      "Confirm listing status, company size and expected ISSB-aligned phase-in timing.",
      "Map climate governance, emissions inventory, risk management and assurance-readiness evidence.",
      "Track SGX and national roadmap updates separately from voluntary investor expectations."
    ],
    evidenceStarterPack: [
      "Listed or large non-listed company scope evidence",
      "Climate governance and risk-management documentation",
      "Scope 1, 2 and relevant Scope 3 emissions data",
      "Assurance readiness and internal controls inventory"
    ],
    ownerFunctions: ["Sustainability", "Finance", "Risk", "Legal", "Internal audit"],
    watchItems: ["ISSB-aligned roadmap phase-in", "Assurance requirements", "SGX climate disclosure updates"],
    advisoryPrompts: ["Singapore climate reporting readiness", "ISSB gap assessment", "Assurance preparation"],
    caveat: "Singapore timing and scope should be confirmed against current SGX and government guidance before client reliance."
  },
  {
    jurisdictionId: "au",
    headline: "Start with mandatory climate reporting group thresholds and assurance phase-in.",
    userQuestion: "Which reporting group, financial threshold or entity type could bring Australian climate reporting into scope?",
    firstActions: [
      "Confirm Australian entity size, group threshold, financial institution status and reporting phase.",
      "Map climate governance, strategy, risk management, emissions and scenario-analysis evidence.",
      "Prepare assurance and board oversight workstreams early."
    ],
    evidenceStarterPack: [
      "Australian entity/group threshold evidence",
      "Climate-risk governance and scenario analysis",
      "Scope 1, 2 and 3 emissions inventory",
      "Controls, assurance and board approval evidence"
    ],
    ownerFunctions: ["Finance", "Sustainability", "Risk", "Board", "Internal audit"],
    watchItems: ["Phase-in timing", "Assurance standards", "ASIC guidance and enforcement posture"],
    advisoryPrompts: ["Australia climate reporting phase-in review", "Scenario-analysis readiness", "Assurance controls preparation"],
    caveat: "Australian reporting phase and assurance timing depend on group thresholds, entity status and regulator guidance."
  },
  {
    jurisdictionId: "jp",
    headline: "Treat Japan as an ISSB-aligned disclosure and investor-expectation market.",
    userQuestion: "Are Japanese listed-company, investor or group reporting expectations creating ISSB-aligned readiness needs?",
    firstActions: [
      "Confirm listing market, reporting boundary and SSBJ/ISSB alignment expectations.",
      "Map governance, strategy, risk, metrics and emissions evidence against IFRS S1/S2 concepts.",
      "Track local standard-setting and exchange guidance updates."
    ],
    evidenceStarterPack: [
      "Listed-company and reporting-boundary evidence",
      "Climate and sustainability governance documentation",
      "Emissions and climate-risk metrics",
      "Investor disclosure request log"
    ],
    ownerFunctions: ["Investor relations", "Finance", "Sustainability", "Legal"],
    watchItems: ["SSBJ standard timing", "Exchange disclosure expectations", "Assurance and implementation guidance"],
    advisoryPrompts: ["Japan ISSB readiness review", "Investor disclosure mapping", "Group reporting alignment"],
    caveat: "Japan coverage is seed intelligence and should be validated against current SSBJ and exchange materials."
  },
  {
    jurisdictionId: "in",
    headline: "Focus on BRSR, BRSR Core and value-chain ESG data collection.",
    userQuestion: "Does listed-company status or value-chain participation make BRSR reporting or customer-driven ESG evidence relevant?",
    firstActions: [
      "Confirm listed-company status, top-company scope and value-chain reporting exposure.",
      "Map BRSR indicators to data owners and supplier/customer evidence requests.",
      "Separate direct listed-entity obligations from customer or investor-driven requests."
    ],
    evidenceStarterPack: [
      "Listing and market-cap scope evidence",
      "BRSR indicator data inventory",
      "Supplier/customer ESG data request log",
      "Board, policy and assurance support evidence"
    ],
    ownerFunctions: ["Sustainability", "Finance", "Legal", "Procurement", "Operations"],
    watchItems: ["BRSR Core phase-in", "Value-chain disclosure expectations", "SEBI ESG rating and assurance guidance"],
    advisoryPrompts: ["India BRSR readiness", "Supplier data model design", "Controls and evidence framework"],
    caveat: "India applicability and value-chain expectations depend on listing scope, SEBI guidance and customer/investor requirements."
  },
  {
    jurisdictionId: "br",
    headline: "Screen CVM/ISSB reporting, sustainable finance and taxonomy developments together.",
    userQuestion: "Do Brazilian listed-company, investor or sustainable-finance expectations create ISSB-aligned reporting work?",
    firstActions: [
      "Confirm listed-company or capital-market exposure and voluntary/mandatory reporting timing.",
      "Map IFRS S1/S2-aligned disclosure gaps and source-review status.",
      "Track sustainable taxonomy and financial-market guidance where relevant."
    ],
    evidenceStarterPack: [
      "CVM scope and issuer status evidence",
      "Sustainability and climate disclosure inventory",
      "Emissions and climate-risk governance materials",
      "Investor or lender ESG request log"
    ],
    ownerFunctions: ["Finance", "Investor relations", "Sustainability", "Legal"],
    watchItems: ["CVM implementation timing", "Sustainable taxonomy development", "ISSB alignment guidance"],
    advisoryPrompts: ["Brazil ISSB readiness review", "Capital-market disclosure gap assessment", "Taxonomy watchlist setup"],
    caveat: "Brazil timing and scope should be source-reviewed before premium, advisory or compliance reliance."
  },
  {
    jurisdictionId: "cn",
    headline: "Separate stock-exchange ESG disclosure, carbon-market, supply-chain and exporter evidence needs.",
    userQuestion: "Are Chinese listed-company, exporter, supplier or manufacturing operations creating ESG disclosure or customer-driven evidence needs?",
    firstActions: [
      "Confirm listing venue, operating footprint, exporter role and customer ESG data requests.",
      "Screen stock-exchange sustainability guidance, climate/carbon-market records and supply-chain due diligence expectations together.",
      "Document where requirements are direct local obligations versus investor, buyer or export-market expectations."
    ],
    evidenceStarterPack: [
      "China operating, listing or supplier/exporter footprint",
      "Customer ESG questionnaire and supplier evidence log",
      "Energy, emissions and environmental-compliance data",
      "Governance, safety and supply-chain controls evidence"
    ],
    ownerFunctions: ["Legal", "Sustainability", "Operations", "Supply chain", "Finance"],
    watchItems: ["Exchange ESG disclosure updates", "Carbon-market and climate policy developments", "Export-market supply-chain evidence requests"],
    advisoryPrompts: ["China ESG disclosure scan", "Supplier/exporter evidence review", "Carbon and climate data readiness"],
    caveat: "China coverage is seed intelligence and may mix direct local requirements with exporter, investor or buyer-driven expectations."
  },
  {
    jurisdictionId: "ca",
    headline: "Separate securities disclosure developments from financial-supervision climate risk expectations.",
    userQuestion: "Are Canadian issuer, financial institution or investor requirements driving climate and sustainability disclosure readiness?",
    firstActions: [
      "Confirm issuer status, financial-institution status and investor disclosure needs.",
      "Review CSSB/ISSB-aligned standards, CSA developments and OSFI climate risk expectations together.",
      "Map governance, climate risk, emissions and assurance-readiness evidence."
    ],
    evidenceStarterPack: [
      "Issuer or federally regulated financial institution scope evidence",
      "Climate-risk governance and risk-management materials",
      "Emissions inventory and financed-emissions notes where relevant",
      "Investor and lender ESG request log"
    ],
    ownerFunctions: ["Risk", "Finance", "Sustainability", "Legal", "Investor relations"],
    watchItems: ["CSA climate disclosure status", "CSSB standards uptake", "OSFI climate-risk expectations"],
    advisoryPrompts: ["Canada climate disclosure scan", "OSFI B-15 readiness", "ISSB/CSSB gap assessment"],
    caveat: "Canadian disclosure requirements remain sensitive to regulator status, issuer scope and financial-institution classification."
  },
  {
    jurisdictionId: "mx",
    headline: "Use Mexico as a market-entry and supply-chain watch market tied to trade, finance and global customers.",
    userQuestion: "Are customer, lender, supply-chain or market-entry requirements creating ESG evidence needs in Mexico?",
    firstActions: [
      "Confirm whether Mexico exposure is direct operations, supplier role, exporter role or financing relationship.",
      "Screen sustainable finance, climate, supply-chain and customer-driven disclosure records.",
      "Document where requirements are legal obligations versus investor/customer expectations."
    ],
    evidenceStarterPack: [
      "Mexico operating, supplier or exporter footprint",
      "Customer ESG request log and supplier questionnaires",
      "Climate/emissions and operational environmental data",
      "Financing or lender ESG covenant evidence"
    ],
    ownerFunctions: ["Operations", "Procurement", "Legal", "Finance", "Sustainability"],
    watchItems: ["Sustainable finance taxonomy developments", "Climate disclosure and market guidance", "Trade/customer-driven ESG requirements"],
    advisoryPrompts: ["Mexico ESG market-entry scan", "Supplier/exporter evidence review", "Sustainable finance watchlist"],
    caveat: "Mexico records are seed intelligence and may be more customer, lender or market-exposure driven than direct statutory obligations."
  }
];

export function marketQuickStartFor(jurisdictionId: string) {
  return marketQuickStarts.find((quickStart) => quickStart.jurisdictionId === jurisdictionId);
}

export function fallbackMarketQuickStart(jurisdiction: Jurisdiction, profileActions: string[] = []): MarketQuickStart {
  return {
    jurisdictionId: jurisdiction.id,
    headline: "Start with entity scope, source review and evidence ownership.",
    userQuestion: `Which tracked seed records may be relevant to ${jurisdiction.name}, and what facts are needed before relying on them?`,
    firstActions: profileActions.length
      ? profileActions.slice(0, 4)
      : [
          "Confirm entity-specific thresholds, local implementation and reporting boundary.",
          "Assign accountable owners across legal, sustainability, finance and operational teams.",
          "Create a source-review log for high-impact and date-sensitive records.",
          "Map evidence owners for emissions, supplier, finance, governance and assurance data."
        ],
    evidenceStarterPack: [
      "Entity structure and market footprint evidence",
      "Source-review log for priority records",
      "Threshold and applicability facts to confirm",
      "Owner map for data, controls and review sign-off"
    ],
    ownerFunctions: ["Legal", "Sustainability", "Finance", "Compliance"],
    watchItems: ["Primary-source review", "Date-sensitive records", "Low-confidence or needs-review records"],
    advisoryPrompts: ["Market exposure scan", "Custom watchlist setup", "Source and evidence QA"],
    caveat: "This quick start is generated from current seed intelligence and does not determine legal applicability or complete market coverage."
  };
}
