import { DATASET_META } from "./_meta";

const contactHref = (subject: string, body: string) =>
  `mailto:${DATASET_META.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export type CommercialTier = "free" | "premium" | "advisory" | "enterprise-future";
export type CommercialStatus = "available" | "preview" | "design-partner" | "future";

export type CommercialOffer = {
  id: string;
  name: string;
  tier: CommercialTier;
  status: CommercialStatus;
  targetUsers: string[];
  description: string;
  includedOutputs: string[];
  updateCadence?: "weekly" | "monthly" | "quarterly" | "on-request";
  exampleUseCases: string[];
  ctaLabel: string;
  ctaHref: string;
  legalCaveat: string;
};

export type CommercialComparisonRow = {
  capability: string;
  freeAtlas: string;
  premiumIntelligence: string;
  advisoryAtlas: string;
  enterpriseFuture: string;
};

export type AdvisoryService = {
  id: string;
  name: string;
  description: string;
  bestFor: string[];
  deliverables: string[];
  process: string[];
  ctaLabel: string;
  ctaHref: string;
  caveat: string;
};

export const commercialOffers: CommercialOffer[] = [
  {
    id: "free-atlas",
    name: "Free Atlas",
    tier: "free",
    status: "available",
    targetUsers: ["CSOs", "Legal and compliance teams", "Finance controllers", "ESG consultants", "Procurement teams"],
    description:
      "Public, source-linked ESG regulatory orientation across tracked jurisdictions, topics, sectors, value-chain exposure and reporting years.",
    includedOutputs: [
      "Interactive map and jurisdiction profiles",
      "Regulation database with source links and caveats",
      "Indicative assessment wizard",
      "Timeline, comparison, data-quality and methodology surfaces",
      "CSV and JSON export of filtered seed records"
    ],
    updateCadence: "on-request",
    exampleUseCases: ["Initial regulatory landscape review", "Client scoping", "Board or management orientation", "Source-review planning"],
    ctaLabel: "Start with the Atlas",
    ctaHref: "/",
    legalCaveat: "Free Atlas content is seed regulatory intelligence for orientation and planning, not legal advice."
  },
  {
    id: "premium-intelligence",
    name: "Premium Intelligence",
    tier: "premium",
    status: "preview",
    targetUsers: ["Sustainability leaders", "Legal teams", "Advisors", "Private equity teams", "Financial institutions"],
    description:
      "Static preview of future regulatory alerts, executive digests, watchlists and premium market packs. Demand is being validated before paid infrastructure is added.",
    includedOutputs: [
      "Weekly and monthly regulatory alert previews",
      "Jurisdiction, topic, sector and persona watchlist concepts",
      "Premium market-pack table-of-contents previews",
      "Priority source-review and evidence summaries"
    ],
    updateCadence: "monthly",
    exampleUseCases: ["ISSB adoption monitoring", "CSRD/ESRS readiness tracking", "Supply-chain due diligence watchlist", "Product sustainability monitoring"],
    ctaLabel: "Request premium preview",
    ctaHref: contactHref(
      "Etica ESG premium intelligence preview",
      "Hi Gabriel,\n\nI would like to see a Premium Intelligence preview.\n\nInterested watchlists or packs:\n- Jurisdictions:\n- Topics:\n- Sector/company profile:\n"
    ),
    legalCaveat: "Premium Intelligence is preview-only in this MVP. Production automated alerts, billing and accounts are not live."
  },
  {
    id: "advisory-atlas",
    name: "Advisory Atlas",
    tier: "advisory",
    status: "available",
    targetUsers: ["ESG consultants", "Legal teams", "Portfolio teams", "Procurement leaders", "Board and risk committees"],
    description:
      "Manual advisory support that turns Atlas intelligence into an exposure scan, watchlist, portfolio/supplier map or client-ready briefing.",
    includedOutputs: [
      "Regulatory exposure scan",
      "Custom watchlist setup",
      "Portfolio or supplier ESG regulatory map",
      "Board or client briefing pack",
      "Source review and data-quality QA support"
    ],
    updateCadence: "on-request",
    exampleUseCases: ["Pre-client call scan", "Portfolio diligence", "Supplier exposure review", "Market entry briefing"],
    ctaLabel: "Request advisory scan",
    ctaHref: contactHref(
      "Etica ESG advisory scan request",
      "Hi Gabriel,\n\nI would like to discuss an advisory-supported ESG regulatory exposure scan.\n\nContext:\n- Organization/portfolio:\n- Jurisdictions:\n- Sector/company type:\n- Main question:\n"
    ),
    legalCaveat: "Advisory outputs support orientation and planning. They are not legal, tax, investment or assurance advice."
  },
  {
    id: "enterprise-api-future",
    name: "Enterprise / API Future",
    tier: "enterprise-future",
    status: "future",
    targetUsers: ["Enterprise sustainability teams", "GRC/product teams", "Regulatory data partners", "Large advisory teams"],
    description:
      "Future product architecture for accounts, workspaces, API/data export, monitoring, governance workflow and audit history after demand and source governance are validated.",
    includedOutputs: [
      "Client workspaces",
      "Team permissions and saved views",
      "API or governed data export",
      "Reviewer workflow and audit trail",
      "Production monitoring and alert operations"
    ],
    updateCadence: "quarterly",
    exampleUseCases: ["Enterprise regulatory intelligence operations", "Integrated ESG data workflows", "Custom portfolio monitoring"],
    ctaLabel: "Discuss design partnership",
    ctaHref: contactHref(
      "Etica ESG enterprise design partnership",
      "Hi Gabriel,\n\nI would like to discuss future enterprise/API requirements for ESG Regulatory Atlas.\n\nPotential use case:\n"
    ),
    legalCaveat: "Enterprise/API functionality is future-state only and is not implemented in the static MVP."
  }
];

export const commercialComparisonRows: CommercialComparisonRow[] = [
  { capability: "Global map", freeAtlas: "Included", premiumIntelligence: "Included", advisoryAtlas: "Used in outputs", enterpriseFuture: "Workspace-ready future" },
  { capability: "Regulation database", freeAtlas: "Included", premiumIntelligence: "Curated views", advisoryAtlas: "Reviewed extracts", enterpriseFuture: "Governed data future" },
  { capability: "Source links and caveats", freeAtlas: "Included", premiumIntelligence: "Prioritized", advisoryAtlas: "Reviewed in scope", enterpriseFuture: "Review workflow future" },
  { capability: "Data-quality indicators", freeAtlas: "Included", premiumIntelligence: "Source freshness notes", advisoryAtlas: "QA commentary", enterpriseFuture: "Audit trail future" },
  { capability: "Assessment wizard", freeAtlas: "Basic indicative", premiumIntelligence: "Persona watchlists", advisoryAtlas: "Advisor-supported scan", enterpriseFuture: "Saved profiles future" },
  { capability: "CSV/JSON export", freeAtlas: "Included", premiumIntelligence: "Pack extracts preview", advisoryAtlas: "Custom briefing extracts", enterpriseFuture: "API/data export future" },
  { capability: "Regulatory alert digest", freeAtlas: "Preview only", premiumIntelligence: "Static preview / request access", advisoryAtlas: "Manual briefing support", enterpriseFuture: "Production alert future" },
  { capability: "Market packs", freeAtlas: "Preview only", premiumIntelligence: "Available on request preview", advisoryAtlas: "Advisor-supported delivery", enterpriseFuture: "Workspace future" },
  { capability: "Custom watchlists", freeAtlas: "Concept only", premiumIntelligence: "Design-partner preview", advisoryAtlas: "Manual setup", enterpriseFuture: "Saved watchlists future" },
  { capability: "Board/client briefing", freeAtlas: "Copyable summaries", premiumIntelligence: "Template preview", advisoryAtlas: "Manual briefing pack", enterpriseFuture: "Report workflow future" },
  { capability: "Billing/accounts/API", freeAtlas: "Not included", premiumIntelligence: "Not live", advisoryAtlas: "Manual inquiry", enterpriseFuture: "Future only" }
];

export const advisoryServices: AdvisoryService[] = [
  {
    id: "regulatory-exposure-scan",
    name: "Regulatory Exposure Scan",
    description: "A fast scan of potentially relevant ESG, sustainability, climate and responsible-business rules for a company, fund, supplier base or market entry question.",
    bestFor: ["CSOs", "General counsel", "Finance controllers", "ESG consultants"],
    deliverables: ["Priority regulation shortlist", "Why each record appears", "Missing facts to confirm", "Source and caveat log", "First 30-day readiness actions"],
    process: ["Define profile and jurisdictions", "Run Atlas scan", "Review sources and caveats", "Deliver briefing and next-step plan"],
    ctaLabel: "Request exposure scan",
    ctaHref: contactHref("Etica ESG regulatory exposure scan", "Hi Gabriel,\n\nI would like to request a regulatory exposure scan.\n\nContext:\n"),
    caveat: "The scan is indicative and should be validated with qualified counsel before compliance reliance."
  },
  {
    id: "custom-watchlist",
    name: "Custom Watchlist Setup",
    description: "Manual setup of a jurisdiction, topic, sector or portfolio watchlist using current Atlas source-linked records and review-risk indicators.",
    bestFor: ["Legal teams", "ESG advisors", "Procurement teams", "Private equity teams"],
    deliverables: ["Watchlist definition", "Priority records", "Review cadence", "Source-quality risk notes", "Sample update digest"],
    process: ["Select watchlist lens", "Map relevant records", "Flag review-risk items", "Create manual monitoring plan"],
    ctaLabel: "Request watchlist setup",
    ctaHref: contactHref("Etica ESG custom watchlist setup", "Hi Gabriel,\n\nI would like to discuss a custom ESG regulatory watchlist.\n\nWatchlist lens:\n"),
    caveat: "Watchlists are manually supported in this MVP; automated monitoring is not live."
  },
  {
    id: "portfolio-supplier-map",
    name: "Portfolio / Supplier Regulatory Map",
    description: "An indicative map of ESG regulatory exposure across portfolio companies, suppliers, exporters or market-facing operations.",
    bestFor: ["Private equity", "Procurement", "Supply-chain teams", "Banks and insurers"],
    deliverables: ["Market and value-chain exposure map", "Investor/customer-driven relevance notes", "Evidence-needed summary", "Data-quality and source confidence notes"],
    process: ["Collect portfolio or supplier profile", "Map jurisdictions and sectors", "Identify direct and indirect exposure", "Prepare action-oriented summary"],
    ctaLabel: "Request portfolio map",
    ctaHref: contactHref("Etica ESG portfolio or supplier regulatory map", "Hi Gabriel,\n\nI would like to discuss a portfolio/supplier regulatory map.\n\nContext:\n"),
    caveat: "Portfolio/supplier mapping is for orientation and due-diligence planning, not a legal applicability determination."
  },
  {
    id: "board-client-briefing",
    name: "Board / Client Briefing Pack",
    description: "A concise, source-linked briefing for board, risk, client, legal or sustainability leadership conversations.",
    bestFor: ["Boards", "Risk committees", "Client teams", "Advisors"],
    deliverables: ["Executive summary", "Priority regulations", "Key dates", "Evidence and owners", "Caveats and source-quality notes"],
    process: ["Define briefing audience", "Scope jurisdictions and topics", "Select priority records", "Prepare caveated briefing pack"],
    ctaLabel: "Request briefing pack",
    ctaHref: contactHref("Etica ESG board or client briefing pack", "Hi Gabriel,\n\nI would like to discuss a board/client briefing pack.\n\nAudience and topic:\n"),
    caveat: "Briefing packs support decision preparation and should not be treated as legal advice."
  },
  {
    id: "market-pack-review",
    name: "Premium Market Pack Support",
    description: "Advisor-supported preparation of a market pack such as EU ESG compliance, ISSB adoption, supply-chain due diligence or product sustainability.",
    bestFor: ["ESG consultants", "Corporate strategy", "Legal/compliance", "Financial services"],
    deliverables: ["Pack scope", "Priority regime table", "Milestone and source review notes", "Evidence and advisory workstream map"],
    process: ["Choose market pack", "Review source quality", "Prioritize high-impact regimes", "Prepare client-ready pack outline"],
    ctaLabel: "Request market pack",
    ctaHref: contactHref("Etica ESG premium market pack support", "Hi Gabriel,\n\nI would like to discuss a premium market pack.\n\nInterested pack:\n"),
    caveat: "Market packs are available on request as advisory-supported outputs; they are not gated SaaS products in this MVP."
  }
];

export const commercialCaveat =
  "Commercial previews are static validation surfaces. They do not activate billing, accounts, automated email alerts, production monitoring, legal advice or definitive applicability determinations.";
