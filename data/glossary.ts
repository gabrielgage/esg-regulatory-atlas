export type GlossaryTerm = {
  id: string;
  term: string;
  category: "Regulatory status" | "Reporting concepts" | "Value chain" | "Sustainable finance" | "Data and assurance" | "Nature and product";
  plainEnglish: string;
  whyItMatters: string;
  caveat: string;
  relatedTopics: string[];
  relatedLinks: Array<{ label: string; href: string }>;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "seed-intelligence",
    term: "Seed intelligence",
    category: "Data and assurance",
    plainEnglish: "Illustrative, structured regulatory information used to orient users before a governed source-review workflow is complete.",
    whyItMatters: "It lets the Atlas show coverage, sources, dates and caveats early without claiming production legal completeness.",
    caveat: "Seed intelligence should be checked against primary sources and qualified advisors before compliance reliance.",
    relatedTopics: ["Source quality", "Confidence", "Data quality"],
    relatedLinks: [
      { label: "Data Quality", href: "/data-quality" },
      { label: "Methodology", href: "/methodology" }
    ]
  },
  {
    id: "legal-force",
    term: "Legal force",
    category: "Regulatory status",
    plainEnglish: "A plain-language signal for whether a record is law, regulation, guidance, standard, voluntary framework, consultation or market expectation.",
    whyItMatters: "Users need to distinguish binding rules from voluntary frameworks and emerging expectations before prioritizing action.",
    caveat: "Legal force can depend on jurisdictional implementation, regulator interpretation and entity-specific facts.",
    relatedTopics: ["Status", "Source quality", "Applicability"],
    relatedLinks: [
      { label: "Regulations", href: "/regulations" },
      { label: "Data Quality", href: "/data-quality" }
    ]
  },
  {
    id: "double-materiality",
    term: "Double materiality",
    category: "Reporting concepts",
    plainEnglish: "An assessment lens that considers both how sustainability matters affect the company and how the company affects people and the environment.",
    whyItMatters: "It is central to CSRD and ESRS reporting readiness, evidence planning and stakeholder engagement.",
    caveat: "Materiality outcomes depend on the reporting boundary, sector, value chain and methodology used by the entity.",
    relatedTopics: ["CSRD", "ESRS", "Reporting obligation"],
    relatedLinks: [
      { label: "CSRD record", href: "/regulations/csrd" },
      { label: "Assessment", href: "/assessment" }
    ]
  },
  {
    id: "value-chain",
    term: "Value chain",
    category: "Value chain",
    plainEnglish: "The upstream and downstream relationships connected to a company, including suppliers, customers, products, services, investments and imports.",
    whyItMatters: "Many ESG rules create relevance beyond direct operations, especially for supplier due diligence, product compliance, financed emissions and trade exposure.",
    caveat: "The exact scope varies by regime and should be confirmed against the record's primary sources.",
    relatedTopics: ["Supply chain", "Imports", "Portfolio companies"],
    relatedLinks: [
      { label: "Assessment", href: "/assessment" },
      { label: "Sectors", href: "/sectors" }
    ]
  },
  {
    id: "assurance",
    term: "Assurance",
    category: "Data and assurance",
    plainEnglish: "Independent review of reported sustainability information, often starting with limited assurance and potentially increasing over time.",
    whyItMatters: "Assurance changes the implementation burden because data owners, controls, evidence and reporting calendars need to be auditable.",
    caveat: "Assurance requirements differ by jurisdiction, reporting phase-in and company scope.",
    relatedTopics: ["Controls", "Evidence", "Reporting year"],
    relatedLinks: [
      { label: "Timeline", href: "/timeline" },
      { label: "Briefing", href: "/briefing" }
    ]
  },
  {
    id: "transition-plan",
    term: "Climate transition plan",
    category: "Reporting concepts",
    plainEnglish: "A plan describing how an organization intends to align strategy, governance, capital allocation and emissions reductions with climate objectives.",
    whyItMatters: "Transition planning appears across reporting, investor, financial-services and supervisory expectations.",
    caveat: "Disclosure expectations may not mean the same thing as a mandatory operational decarbonization obligation.",
    relatedTopics: ["Climate disclosure", "Governance", "Board oversight"],
    relatedLinks: [
      { label: "Regulations", href: "/regulations?topic=Climate%20transition%20planning" },
      { label: "Alerts", href: "/alerts" }
    ]
  },
  {
    id: "taxonomy-alignment",
    term: "Taxonomy eligibility and alignment",
    category: "Sustainable finance",
    plainEnglish: "A way to classify whether activities are covered by a sustainable finance taxonomy and whether they meet technical criteria for alignment.",
    whyItMatters: "Taxonomy work affects financing claims, investor disclosure, product labeling and evidence expectations.",
    caveat: "Eligibility is not the same as alignment, and criteria are jurisdiction-specific.",
    relatedTopics: ["EU Taxonomy", "Sustainable finance", "Evidence"],
    relatedLinks: [
      { label: "EU Taxonomy", href: "/regulations/eu-taxonomy" },
      { label: "Plans", href: "/plans" }
    ]
  },
  {
    id: "due-diligence",
    term: "Sustainability due diligence",
    category: "Value chain",
    plainEnglish: "Processes for identifying, preventing, mitigating and addressing adverse human rights or environmental impacts connected to a company.",
    whyItMatters: "Due-diligence regimes can create governance, supplier engagement, grievance, remediation and documentation workstreams.",
    caveat: "Scope, thresholds and enforcement vary significantly across EU, national and sector-specific regimes.",
    relatedTopics: ["CSDDD", "Human rights", "Supplier due diligence"],
    relatedLinks: [
      { label: "CSDDD", href: "/regulations/csddd" },
      { label: "Advisory", href: "/advisory" }
    ]
  },
  {
    id: "financed-emissions",
    term: "Financed emissions",
    category: "Sustainable finance",
    plainEnglish: "GHG emissions associated with loans, investments, underwriting or portfolio holdings rather than only a company's own operations.",
    whyItMatters: "Banks, asset managers, insurers and private equity users often need portfolio data to respond to climate disclosure or investor expectations.",
    caveat: "Methodologies, attribution factors and data availability can materially affect reported figures.",
    relatedTopics: ["Financial services", "Portfolio", "GHG emissions"],
    relatedLinks: [
      { label: "Financial services", href: "/sectors/financial-services" },
      { label: "Regulations", href: "/regulations?sector=Financial%20services" }
    ]
  },
  {
    id: "scope-emissions",
    term: "Scope 1, 2 and 3 emissions",
    category: "Reporting concepts",
    plainEnglish: "A common GHG accounting structure for direct emissions, purchased energy emissions and other value-chain emissions.",
    whyItMatters: "Many climate disclosure rules and investor requests depend on emissions inventories and supporting calculation evidence.",
    caveat: "Boundary choices, estimates and data quality should be reviewed before relying on emissions data for compliance or assurance.",
    relatedTopics: ["GHG Protocol", "Climate disclosure", "Evidence"],
    relatedLinks: [
      { label: "Climate disclosure view", href: "/regulations?topic=Climate%20disclosure" },
      { label: "Assessment", href: "/assessment" }
    ]
  },
  {
    id: "green-claims",
    term: "Green claims",
    category: "Nature and product",
    plainEnglish: "Environmental or sustainability-related claims made about products, services, funds, companies or strategies.",
    whyItMatters: "Green claims rules and anti-greenwashing expectations affect marketing, product, legal, compliance and investor-relations review.",
    caveat: "Claim substantiation rules vary by jurisdiction and product type; marketing copy should be reviewed against local law and regulator guidance.",
    relatedTopics: ["Product sustainability", "Consumer protection", "Anti-greenwashing"],
    relatedLinks: [
      { label: "Regulations", href: "/regulations?topic=Green%20claims" },
      { label: "Advisory", href: "/advisory" }
    ]
  },
  {
    id: "reporting-year",
    term: "First reporting year vs report due date",
    category: "Reporting concepts",
    plainEnglish: "The first reporting year is the period covered by the report; the report due date is when information may need to be published or filed.",
    whyItMatters: "Planning often starts before the first report is due because data collection, controls and assurance readiness take time.",
    caveat: "Dates can shift due to phase-ins, delayed rules, transposition or regulator guidance; confirm current dates before relying on them.",
    relatedTopics: ["Timeline", "Phase-in", "Date uncertainty"],
    relatedLinks: [
      { label: "Timeline", href: "/timeline" },
      { label: "Data Quality", href: "/data-quality" }
    ]
  }
];

export const glossaryCategories = Array.from(new Set(glossaryTerms.map((term) => term.category)));
