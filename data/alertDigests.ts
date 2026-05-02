import { DATASET_META } from "./_meta";

export type AlertDigestPreview = {
  id: string;
  title: string;
  frequency: "weekly" | "monthly" | "urgent-watchlist";
  audience: string[];
  jurisdictions: string[];
  topics: string[];
  sampleItems: {
    title: string;
    statusLabel: string;
    whyItMatters: string;
    whoShouldMonitor: string[];
    sourceQuality: "primary" | "regulator-guidance" | "standard-setter" | "secondary" | "needs-review";
    recommendedAction: string;
    advisoryNote?: string;
  }[];
  disclaimer: string;
};

export const alertDigestPreviews: AlertDigestPreview[] = [
  {
    id: "weekly-esg-regulatory-alert",
    title: "Weekly ESG Regulatory Alert",
    frequency: "weekly",
    audience: ["CSOs", "Legal and compliance teams", "ESG consultants", "Procurement and supply-chain teams"],
    jurisdictions: ["European Union", "United Kingdom", "United States", "California", "APAC ISSB markets"],
    topics: ["Corporate reporting", "Climate disclosure", "Supply-chain due diligence", "Product sustainability"],
    sampleItems: [
      {
        title: "CSRD / ESRS readiness remains a priority for EU-facing groups",
        statusLabel: "In force / phased reporting",
        whyItMatters:
          "Companies with EU reporting exposure may need to confirm scope, double materiality governance, ESRS datapoints, controls and assurance planning.",
        whoShouldMonitor: ["Sustainability", "Finance", "Legal", "Internal audit"],
        sourceQuality: "primary",
        recommendedAction: "Confirm entity scope, reporting boundary, data owners and assurance evidence plan.",
        advisoryNote: "Useful trigger for a CSRD readiness scan or evidence/control framework review."
      },
      {
        title: "ISSB adoption watch: APAC market roadmaps create investor/customer data expectations",
        statusLabel: "Market adoption / roadmap",
        whyItMatters:
          "ISSB-aligned rules and exchange expectations may affect listed companies, financial institutions and portfolio companies even where local implementation is still phasing in.",
        whoShouldMonitor: ["Investor relations", "Finance", "Risk", "Portfolio teams"],
        sourceQuality: "standard-setter",
        recommendedAction: "Map which operating or portfolio jurisdictions reference IFRS S1/S2 and identify overlapping climate data needs.",
        advisoryNote: "Useful trigger for an ISSB adoption watchlist or portfolio exposure screen."
      },
      {
        title: "EUDR and CBAM remain high-value supplier/exporter monitoring topics",
        statusLabel: "In force / transitional",
        whyItMatters:
          "Importer, exporter and supplier profiles may need commodity, product, emissions or traceability evidence depending on market exposure.",
        whoShouldMonitor: ["Procurement", "Supply chain", "Operations", "Legal"],
        sourceQuality: "primary",
        recommendedAction: "Identify regulated products, suppliers, data gaps and responsible owners for source review.",
        advisoryNote: "Useful trigger for supplier due-diligence or product-compliance data mapping."
      }
    ],
    disclaimer:
      "This weekly alert preview is static sample content for demand validation. It is not a production monitoring service and does not constitute legal advice."
  },
  {
    id: "monthly-executive-digest",
    title: "Monthly Executive ESG Regulatory Digest",
    frequency: "monthly",
    audience: ["Boards", "Risk committees", "CSOs", "General counsel", "Finance leaders"],
    jurisdictions: ["Global tracked coverage", "EU", "UK", "US", "Canada", "Brazil", "India", "Singapore", "Japan", "Australia"],
    topics: ["Climate disclosure", "Sustainable finance", "Human rights", "Biodiversity and nature", "Green claims"],
    sampleItems: [
      {
        title: "Climate disclosure convergence is increasing cross-framework data reuse",
        statusLabel: "Strategic theme",
        whyItMatters:
          "CSRD/ESRS, ISSB, jurisdictional climate disclosure rules and investor frameworks increasingly create overlapping greenhouse gas, governance, risk and transition-plan data needs.",
        whoShouldMonitor: ["Board", "Finance", "Sustainability", "Risk"],
        sourceQuality: "standard-setter",
        recommendedAction: "Build one climate disclosure data model rather than separate ad hoc reporting workstreams.",
        advisoryNote: "Useful trigger for climate disclosure operating model and control design."
      },
      {
        title: "Supply-chain rules are moving from policy to evidence",
        statusLabel: "High-impact watch",
        whyItMatters:
          "Due diligence, forced labour, deforestation, batteries and product sustainability regimes are increasing the need for supplier data, traceability and substantiation evidence.",
        whoShouldMonitor: ["Procurement", "Legal", "Operations", "Supply chain"],
        sourceQuality: "primary",
        recommendedAction: "Prioritize supplier risk segmentation, data requests and evidence retention processes.",
        advisoryNote: "Useful trigger for supplier regulatory exposure mapping."
      }
    ],
    disclaimer:
      "This executive digest preview is illustrative. Users should review primary sources and qualified advisors before relying on it for compliance decisions."
  }
];

export const alertWatchlistOptions = [
  "CSRD / ESRS readiness",
  "ISSB adoption by market",
  "Sustainable finance and fund labelling",
  "Supply-chain due diligence",
  "Product sustainability, EUDR and CBAM",
  "California and US climate disclosure",
  "Green claims and consumer protection",
  "Financial-services ESG regulation",
  "Private equity portfolio exposure",
  "Supplier and exporter watchlist"
];

export const sourceQualityLegend = [
  { label: "Primary", body: "Official law, regulation, delegated regulation, statute or official legal text." },
  { label: "Regulator guidance", body: "Official regulator guidance, technical standard, FAQ, consultation or stock-exchange rule." },
  { label: "Standard setter", body: "ISSB, GRI, OECD, UN, ILO or other recognized standard-setting or international body material." },
  { label: "Secondary", body: "Law firm, Big Four, professional body, NGO, academic or trusted commentary used for context." },
  { label: "Needs review", body: "Seed intelligence or date-sensitive item requiring source review before client or compliance reliance." }
];

export const alertRequestHref = `mailto:${DATASET_META.contactEmail}?subject=${encodeURIComponent(
  "Etica ESG alert preview request"
)}&body=${encodeURIComponent(
  "Hi Gabriel,\n\nI would like to see an ESG Regulatory Atlas alert preview or join the design-partner list.\n\nInterested watchlists:\n- Jurisdictions:\n- Topics:\n- Sector/company profile:\n"
)}`;
