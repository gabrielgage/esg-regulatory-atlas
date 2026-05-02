import { DATASET_META } from "./_meta";

const requestPackHref = (packName: string) =>
  `mailto:${DATASET_META.contactEmail}?subject=${encodeURIComponent(`Etica ESG premium pack request - ${packName}`)}&body=${encodeURIComponent(
    `Hi Gabriel,\n\nI would like to discuss the ${packName}.\n\nContext:\n- Jurisdictions:\n- Sector/company type:\n- Main question:\n`
  )}`;

export type PremiumPack = {
  id: string;
  name: string;
  status: "preview" | "available-on-request" | "future";
  targetUsers: string[];
  jurisdictions: string[];
  topics: string[];
  includedRegimes: string[];
  outputs: string[];
  sampleTableOfContents: string[];
  cadence?: "monthly" | "quarterly" | "on-request";
  advisoryExtension: string;
  ctaLabel: string;
  ctaHref: string;
  disclaimer: string;
};

export const premiumPacks: PremiumPack[] = [
  {
    id: "eu-esg-compliance-pack",
    name: "EU ESG Compliance Pack",
    status: "preview",
    targetUsers: ["CSOs", "Legal teams", "Finance/controllers", "ESG consultants"],
    jurisdictions: ["European Union", "EU member-state exposure"],
    topics: ["Corporate reporting", "Sustainable finance", "Due diligence", "Product and trade"],
    includedRegimes: ["CSRD", "ESRS", "EU Taxonomy", "SFDR", "CSDDD", "CBAM", "EUDR", "ESPR", "EU Batteries", "EU Forced Labour"],
    outputs: ["Priority regime table", "Timeline and reporting-year view", "Evidence-needed summary", "Source-quality and caveat log"],
    sampleTableOfContents: [
      "Executive summary and legal caution",
      "EU regime map by obligation type",
      "CSRD/ESRS and assurance readiness",
      "Taxonomy and sustainable finance obligations",
      "Supply-chain, product and trade exposure",
      "Evidence and internal owner matrix",
      "Source review status and next-review queue"
    ],
    cadence: "quarterly",
    advisoryExtension: "Optional CSRD/ESRS readiness scan or EU source-review QA session.",
    ctaLabel: "Request EU pack preview",
    ctaHref: requestPackHref("EU ESG Compliance Pack"),
    disclaimer: "EU pack preview is indicative seed intelligence and does not determine legal applicability."
  },
  {
    id: "issb-adoption-tracker-pack",
    name: "ISSB Adoption Tracker Pack",
    status: "preview",
    targetUsers: ["Listed companies", "Financial institutions", "Private equity", "Investor relations", "ESG advisors"],
    jurisdictions: ["Singapore", "Japan", "Hong Kong", "Australia", "Canada", "Brazil", "Malaysia", "South Korea", "New Zealand"],
    topics: ["Climate disclosure", "ISSB adoption", "Financial risk", "Investor reporting"],
    includedRegimes: ["IFRS S1/S2", "Australia climate disclosure", "Singapore climate roadmap", "Japan SSBJ standards", "Hong Kong climate disclosure", "Canada CSSB"],
    outputs: ["Market adoption matrix", "First reporting and due-date milestones", "Investor/customer relevance notes", "Source-confidence summary"],
    sampleTableOfContents: [
      "ISSB adoption landscape",
      "Market-by-market reporting milestones",
      "Listed-company and financial-sector relevance",
      "Climate data overlap with CSRD/ESRS and TCFD",
      "Source quality, caveats and review cadence"
    ],
    cadence: "monthly",
    advisoryExtension: "Optional ISSB adoption watchlist or portfolio exposure scan.",
    ctaLabel: "Request ISSB pack preview",
    ctaHref: requestPackHref("ISSB Adoption Tracker Pack"),
    disclaimer: "ISSB adoption status is date-sensitive and must be confirmed against official market sources."
  },
  {
    id: "supply-chain-due-diligence-pack",
    name: "Supply Chain Due Diligence Pack",
    status: "available-on-request",
    targetUsers: ["Procurement", "Supply-chain leaders", "Legal teams", "Manufacturers", "Exporters"],
    jurisdictions: ["European Union", "United Kingdom", "United States", "France", "Germany", "Norway", "Australia"],
    topics: ["Human rights", "Forced labour", "Deforestation", "Supplier due diligence", "Product and trade"],
    includedRegimes: ["CSDDD", "EUDR", "EU Forced Labour", "UK Modern Slavery Act", "Germany LkSG", "French Duty of Vigilance", "Norwegian Transparency Act", "UFLPA"],
    outputs: ["Supplier exposure map", "Evidence and traceability checklist", "Product/import relevance notes", "Advisory workstream map"],
    sampleTableOfContents: [
      "Value-chain exposure overview",
      "Mandatory and customer-driven due diligence regimes",
      "Commodity, forced labour and product-traceability evidence",
      "Supplier data model and controls",
      "Caveats, thresholds and source review priorities"
    ],
    cadence: "on-request",
    advisoryExtension: "Optional supplier risk segmentation or procurement evidence-control workshop.",
    ctaLabel: "Request supply-chain pack",
    ctaHref: requestPackHref("Supply Chain Due Diligence Pack"),
    disclaimer: "Supply-chain pack content is for planning and source review, not a final legal determination."
  },
  {
    id: "financial-services-esg-regulation-pack",
    name: "Financial Services ESG Regulation Pack",
    status: "preview",
    targetUsers: ["Banks", "Insurers", "Asset managers", "Private equity", "Compliance and risk teams"],
    jurisdictions: ["European Union", "United Kingdom", "Global voluntary frameworks"],
    topics: ["Sustainable finance", "Prudential risk", "Fund labelling", "Financed emissions", "Stewardship"],
    includedRegimes: ["SFDR", "EU Taxonomy", "MiFID II/IDD sustainability preferences", "EU banking ESG risk", "EU insurance ESG risk", "AIFMD/UCITS ESG", "PCAF", "PRI"],
    outputs: ["Financial-services regime map", "Product and portfolio obligations", "Data and evidence matrix", "Advisory opportunity map"],
    sampleTableOfContents: [
      "Sustainable finance obligation landscape",
      "Fund, product and investor disclosure relevance",
      "Prudential and supervisory ESG risk expectations",
      "Financed emissions and portfolio data needs",
      "Source-quality and review queue"
    ],
    cadence: "quarterly",
    advisoryExtension: "Optional SFDR classification, taxonomy or portfolio ESG data readiness review.",
    ctaLabel: "Request finance pack",
    ctaHref: requestPackHref("Financial Services ESG Regulation Pack"),
    disclaimer: "Financial-services rules can be entity and product specific; validate with qualified regulatory advisors."
  },
  {
    id: "portfolio-private-equity-exposure-pack",
    name: "Portfolio / Private Equity Exposure Pack",
    status: "available-on-request",
    targetUsers: ["Private equity", "Asset managers", "Banks", "Portfolio company sustainability leads"],
    jurisdictions: ["Global tracked coverage", "EU", "UK", "US", "APAC ISSB markets"],
    topics: ["Portfolio companies", "Financed emissions", "Investor/customer-driven data", "Climate disclosure", "Supply-chain exposure"],
    includedRegimes: ["CSRD", "ISSB S1/S2", "PCAF", "PRI", "SFDR", "California climate laws", "Supply-chain due diligence regimes"],
    outputs: ["Portfolio exposure matrix", "Regime relevance categories", "Data request plan", "Evidence and source-confidence notes"],
    sampleTableOfContents: [
      "Portfolio screening methodology",
      "Direct, indirect and investor/customer-driven relevance",
      "Market and sector exposure heatmap",
      "Priority company data requests",
      "Action plan and caveats"
    ],
    cadence: "on-request",
    advisoryExtension: "Optional portfolio scan and investor reporting readiness workshop.",
    ctaLabel: "Request portfolio pack",
    ctaHref: requestPackHref("Portfolio / Private Equity Exposure Pack"),
    disclaimer: "Portfolio exposure mapping is indicative and depends on company-specific facts and fund/product structures."
  }
];
