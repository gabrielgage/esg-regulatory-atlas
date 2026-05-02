import { AtlasRecordType, BusinessImpact, ClientRelevanceCategory, LegalForce, QuickView, Status } from "@/types/regulation";
export { sectors } from "./sectors";

export const topics = [
  "Climate",
  "Climate disclosure",
  "Climate transition planning",
  "GHG emissions",
  "Corporate reporting",
  "Sustainable finance",
  "Taxonomy and classification",
  "Supply chain due diligence",
  "Biodiversity and nature",
  "Deforestation",
  "Human rights",
  "Product and circular economy",
  "Product sustainability",
  "Green claims and consumer protection",
  "Carbon pricing",
  "Nitrogen and permitting",
  "Prudential risk",
  "Climate risk supervision",
  "Market infrastructure",
  "Voluntary frameworks",
  "Responsible investment",
  "Project finance safeguards",
  "Water",
  "Waste and pollution",
  "Governance",
  "Assurance"
];

export const companyTypes = [
  "Corporate",
  "Listed company",
  "Large private company",
  "SME",
  "Financial institution",
  "Asset manager",
  "Private equity fund",
  "Bank",
  "Insurer",
  "Benchmark administrator",
  "ESG rating provider",
  "Non EU parent",
  "Supplier",
  "Exporter",
  "Portfolio company"
];

export const businessFunctions = [
  "Sustainability",
  "Finance",
  "Legal",
  "Compliance",
  "Procurement",
  "Risk",
  "Internal audit",
  "Investor relations",
  "Product governance",
  "Operations",
  "Product",
  "Supply chain",
  "Board"
];

export const valueChainImpacts = [
  "Own operations",
  "Upstream suppliers",
  "Downstream customers",
  "Investment portfolio",
  "Financed emissions",
  "Trade and imports",
  "Products and services",
  "Products and materials",
  "Customer claims and labels",
  "Land use and nature",
  "Board and executive oversight"
];

export const advisoryOpportunities = [
  "Gap assessment",
  "Double materiality assessment",
  "ESG data model design",
  "Reporting readiness",
  "Internal controls",
  "Scope 1, 2 and 3 emissions inventory",
  "Supplier due diligence",
  "Taxonomy eligibility and alignment assessment",
  "SFDR fund classification support",
  "Climate transition plan",
  "Board training",
  "Assurance preparation",
  "ESG software implementation",
  "ESG governance operating model",
  "Portfolio ESG data collection",
  "Regulatory roadmap",
  "Evidence and control framework",
  "Digital product passport readiness",
  "Product compliance data model",
  "Green claims substantiation",
  "Financial product governance review",
  "Prudential ESG risk integration",
  "Portfolio climate risk assessment",
  "Investor reporting and stewardship support",
  "Market briefing",
  "Portfolio regulation scan",
  "Sector pack"
];

export const businessImpactTypes: BusinessImpact[] = [
  "reporting obligation",
  "governance obligation",
  "due diligence obligation",
  "financial disclosure obligation",
  "product compliance obligation",
  "supply chain obligation",
  "assurance obligation",
  "transition plan obligation",
  "data collection obligation",
  "board oversight obligation",
  "taxonomy disclosure obligation"
];

export const statusLabel: Record<Status, string> = {
  consultation: "Consultation",
  adopted: "Adopted",
  in_force: "In force",
  first_reporting: "First reporting",
  transition: "Transition",
  paused: "Paused",
  voluntary: "Voluntary"
};

export const recordTypes: AtlasRecordType[] = [
  "regulation",
  "directive",
  "law",
  "standard",
  "framework",
  "guidance",
  "taxonomy",
  "exchange-rule",
  "supervisory-expectation",
  "voluntary-questionnaire",
  "commitment",
  "roadmap",
  "source-note"
];

export const recordTypeLabel: Record<AtlasRecordType, string> = {
  regulation: "Regulation",
  directive: "Directive",
  law: "Law",
  standard: "Standard",
  framework: "Framework",
  guidance: "Guidance",
  taxonomy: "Taxonomy",
  "exchange-rule": "Exchange rule",
  "supervisory-expectation": "Supervisory expectation",
  "voluntary-questionnaire": "Voluntary questionnaire",
  commitment: "Commitment",
  roadmap: "Roadmap",
  "source-note": "Source note"
};

export const legalForces: LegalForce[] = [
  "mandatory",
  "voluntary",
  "comply-or-explain",
  "supervisory-expectation",
  "market-expectation",
  "roadmap",
  "monitor"
];

export const legalForceLabel: Record<LegalForce, string> = {
  mandatory: "Mandatory",
  voluntary: "Voluntary",
  "comply-or-explain": "Comply or explain",
  "supervisory-expectation": "Supervisory expectation",
  "market-expectation": "Market expectation",
  roadmap: "Roadmap",
  monitor: "Monitor"
};

export const clientRelevanceCategories: ClientRelevanceCategory[] = [
  "potentially-direct",
  "potentially-indirect",
  "investor-or-customer-driven",
  "voluntary-best-practice",
  "monitor-only"
];

export const clientRelevanceLabel: Record<ClientRelevanceCategory, string> = {
  "potentially-direct": "Potentially direct",
  "potentially-indirect": "Potentially indirect",
  "investor-or-customer-driven": "Investor/customer driven",
  "voluntary-best-practice": "Voluntary best practice",
  "monitor-only": "Monitor only"
};

export const quickViews: QuickView[] = [
  {
    id: "eu-reporting",
    label: "EU corporate reporting",
    description: "CSRD, ESRS and assurance readiness",
    filters: { topic: "Corporate reporting", jurisdictionType: "supranational" }
  },
  {
    id: "csrd-readiness",
    label: "CSRD readiness",
    description: "Scope, ESRS, double materiality and assurance setup",
    filters: { query: "CSRD" }
  },
  {
    id: "sustainable-finance",
    label: "Sustainable finance",
    description: "Fund, bank and investor disclosure regimes",
    filters: { topic: "Sustainable finance" }
  },
  {
    id: "supply-chain",
    label: "Supply chain due diligence",
    description: "Supplier, human rights and deforestation controls",
    filters: { topic: "Supply chain due diligence" }
  },
  {
    id: "climate",
    label: "Climate disclosure",
    description: "Climate risk, emissions and transition planning",
    filters: { topic: "Climate" }
  },
  {
    id: "nature",
    label: "Biodiversity and nature",
    description: "TNFD, nature and permitting exposure",
    filters: { topic: "Biodiversity and nature" }
  },
  {
    id: "product",
    label: "Product and trade compliance",
    description: "Product, carbon border, imports and circular rules",
    filters: { topic: "Product and circular economy" }
  },
  {
    id: "pe",
    label: "Private equity impact view",
    description: "Portfolio, financed emissions and exit readiness",
    filters: { sector: "Private equity" }
  },
  {
    id: "issb",
    label: "ISSB adoption view",
    description: "Jurisdictional adoption and alignment",
    filters: { query: "ISSB" }
  },
  {
    id: "apac-issb",
    label: "APAC ISSB markets",
    description: "Hong Kong, Korea, Taiwan, ASEAN and Oceania reporting roadmaps",
    filters: { region: "Asia Pacific", query: "ISSB" }
  },
  {
    id: "netherlands",
    label: "Netherlands regulatory view",
    description: "EU reporting plus Dutch nitrogen and permitting exposure",
    filters: { jurisdiction: "nl" }
  },
  {
    id: "financial-services",
    label: "Financial services view",
    description: "Banks, insurers, asset managers, prudential risk and investor disclosures",
    filters: { sector: "Financial services" }
  },
  {
    id: "voluntary-frameworks",
    label: "Voluntary frameworks",
    description: "CDP, SBTi, PCAF, PRI, ICMA, GRESB and ISO market expectations",
    filters: { legalForce: "voluntary" }
  },
  {
    id: "supplier-exporter",
    label: "Supplier and exporter view",
    description: "Imports, due diligence, CBAM, EUDR and product evidence",
    filters: { valueChain: "Upstream suppliers" }
  }
];
