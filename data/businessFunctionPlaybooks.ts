export type BusinessFunctionPlaybook = {
  functionName: string;
  headline: string;
  startQuestion: string;
  firstActions: string[];
  evidenceFocus: string[];
  reviewPrompts: string[];
  advisoryAngles: string[];
  caveat: string;
};

export const businessFunctionPlaybooks: BusinessFunctionPlaybook[] = [
  {
    functionName: "Sustainability",
    headline: "Own the ESG data model, disclosure calendar and evidence package.",
    startQuestion: "Which reporting, climate, nature, supplier and product records create data ownership or coordination work?",
    firstActions: [
      "Map priority records to existing ESG data owners and reporting calendars.",
      "Identify recurring evidence requests across climate, supplier, product and finance-facing regimes.",
      "Create a source-review queue for high-impact records before using outputs with clients or leadership."
    ],
    evidenceFocus: ["ESG data inventory", "Materiality outputs", "Emissions data", "Supplier evidence", "Reporting calendar"],
    reviewPrompts: ["Which records need primary-source review?", "Which metrics lack owners?", "Which disclosures need assurance readiness?"],
    advisoryAngles: ["ESG data model design", "Reporting readiness", "Double materiality support", "Assurance preparation"],
    caveat: "Sustainability ownership is a planning lens. Entity-specific legal scope and formal accountability should be confirmed with counsel and governance owners."
  },
  {
    functionName: "Finance",
    headline: "Translate sustainability obligations into reporting controls, assurance and financial-risk disclosure work.",
    startQuestion: "Which records may affect reporting calendars, controls, assurance, financial statements or investor-facing disclosures?",
    firstActions: [
      "Map first reporting years and assurance phase-ins to the finance close and reporting calendar.",
      "Identify sustainability data that may need control owners, review evidence or audit trails.",
      "Coordinate with legal and sustainability on threshold facts before planning resourcing."
    ],
    evidenceFocus: ["Reporting calendar", "Control matrix", "Assurance evidence", "Financial-risk analysis", "Entity threshold facts"],
    reviewPrompts: ["Which data points touch financial reporting?", "Which reports may need assurance?", "Which thresholds are still uncertain?"],
    advisoryAngles: ["Internal controls", "Assurance preparation", "ESG controllership", "Regulatory roadmap"],
    caveat: "Finance relevance is indicative and does not determine financial-statement treatment, assurance scope or legal applicability."
  },
  {
    functionName: "Legal",
    headline: "Confirm thresholds, legal force, jurisdictional scope, caveats and source quality before reliance.",
    startQuestion: "Which records need legal interpretation before the business treats them as directly relevant or client-ready?",
    firstActions: [
      "Review high-impact records for legal force, status, thresholds and local implementation.",
      "Separate direct legal obligations from investor, customer, market or voluntary expectations.",
      "Document caveats and source-review needs in copied summaries and advisory outputs."
    ],
    evidenceFocus: ["Primary sources", "Threshold facts", "Entity scope", "Legal-force notes", "Caveat log"],
    reviewPrompts: ["Is this law, guidance, roadmap or voluntary framework?", "What facts are missing?", "Which sources need counsel review?"],
    advisoryAngles: ["Legal risk triage", "Threshold review", "Governance operating model", "Source-review workflow"],
    caveat: "The Atlas is not legal advice. Legal teams should validate source text, jurisdictional implementation and entity-specific facts before reliance."
  },
  {
    functionName: "Compliance",
    headline: "Convert regulatory signals into policies, monitoring, escalation and control evidence.",
    startQuestion: "Which records may require compliance monitoring, policy updates, substantiation or escalation workflows?",
    firstActions: [
      "Identify records with due-diligence, claims, product, financial-services or supplier monitoring needs.",
      "Map policy owners and escalation routes for high-impact records.",
      "Create evidence logs for substantiation, supplier review and management oversight."
    ],
    evidenceFocus: ["Policies", "Monitoring logs", "Escalation records", "Claims substantiation", "Supplier attestations"],
    reviewPrompts: ["Which obligations need recurring monitoring?", "Which claims need substantiation?", "Which supplier controls need evidence?"],
    advisoryAngles: ["Compliance operating model", "Evidence and controls framework", "Supplier due diligence", "Green-claims review"],
    caveat: "Compliance workstreams should be scoped against current sources, enforcement guidance and company-specific risk exposure."
  },
  {
    functionName: "Procurement",
    headline: "Prioritize supplier, commodity, import and customer evidence requests.",
    startQuestion: "Which upstream suppliers, commodities, imports or customer demands create ESG evidence work?",
    firstActions: [
      "Map supplier tiers, commodities, origin data and high-risk jurisdictions.",
      "Identify EUDR, CBAM, forced-labour, due-diligence and customer-driven evidence needs.",
      "Create a reusable supplier request pack with caveats and source-review notes."
    ],
    evidenceFocus: ["Supplier list", "Commodity origin", "Attestations", "Import data", "Due-diligence records"],
    reviewPrompts: ["Which suppliers create regulated commodity exposure?", "Which imports require embedded-emissions or origin data?", "Which customer requests are recurring?"],
    advisoryAngles: ["Supplier due diligence", "EUDR/CBAM exposure scan", "Supplier data model", "Procurement evidence pack"],
    caveat: "Supplier and import relevance depends on products, commodities, origin, market placement and customer-specific requirements."
  },
  {
    functionName: "Risk",
    headline: "Use regulation records to frame governance, climate, financial and operational risk discussions.",
    startQuestion: "Which records may affect enterprise risk, climate risk, governance oversight or resilience planning?",
    firstActions: [
      "Map high-impact and date-sensitive records to the risk register.",
      "Identify records that require board, audit committee or risk committee awareness.",
      "Link climate-risk, transition-plan and disclosure records to scenario and control workstreams."
    ],
    evidenceFocus: ["Risk register", "Scenario analysis", "Board papers", "Climate-risk assessment", "Control evidence"],
    reviewPrompts: ["Which records are high impact?", "Which milestones are near term?", "Which risks require board escalation?"],
    advisoryAngles: ["Board training", "Climate risk governance", "Transition-plan review", "Regulatory risk roadmap"],
    caveat: "Risk signals are planning prompts and should not be treated as final risk ratings or legal determinations."
  },
  {
    functionName: "Internal audit",
    headline: "Assess assurance readiness, control ownership and audit-trail maturity.",
    startQuestion: "Which records may require assurance, control evidence, audit trails or independent readiness review?",
    firstActions: [
      "Identify records with assurance, data-quality or control implications.",
      "Map evidence owners and control gaps for priority reporting records.",
      "Review whether copied outputs preserve source caveats and edition metadata."
    ],
    evidenceFocus: ["Audit trail", "Control owner matrix", "Evidence retention", "Assurance plan", "Data-quality log"],
    reviewPrompts: ["Which evidence is repeatable?", "Which controls need design?", "Which outputs need caveats?"],
    advisoryAngles: ["Assurance preparation", "Internal controls", "Evidence framework", "Readiness review"],
    caveat: "Internal audit planning should be aligned with actual assurance standards, reporting scope and management accountability."
  },
  {
    functionName: "Board",
    headline: "Focus on oversight, risk appetite, transition planning and management accountability.",
    startQuestion: "Which records may require board awareness, governance decisions, transition-plan oversight or risk committee review?",
    firstActions: [
      "Summarize high-impact and near-term records by jurisdiction and business function.",
      "Identify board oversight, climate-risk and transition-plan records for briefing.",
      "Separate seed intelligence from verified legal advice in board materials."
    ],
    evidenceFocus: ["Board minutes", "Governance charters", "Risk appetite", "Transition-plan materials", "Management accountability matrix"],
    reviewPrompts: ["Which records require oversight?", "Which caveats should be in board packs?", "Which decisions need counsel input?"],
    advisoryAngles: ["Board briefing", "Governance operating model", "Transition-plan workshop", "Risk committee update"],
    caveat: "Board-facing summaries should be source-reviewed and caveated before use in formal governance settings."
  }
];

export function businessFunctionPlaybookFor(functionName: string) {
  return businessFunctionPlaybooks.find((playbook) => playbook.functionName.toLowerCase() === functionName.toLowerCase());
}

export function fallbackBusinessFunctionPlaybook(functionName: string): BusinessFunctionPlaybook {
  return {
    functionName,
    headline: `Review ${functionName} responsibilities across priority ESG regulation records.`,
    startQuestion: `Which tracked records create planning, evidence or source-review work for ${functionName}?`,
    firstActions: [
      "Identify high-impact records that name this function as an affected owner.",
      "Confirm threshold, source and timing facts before assigning implementation work.",
      "Create an evidence and owner handoff for the most relevant records."
    ],
    evidenceFocus: ["Owner matrix", "Evidence inventory", "Source-review log", "First actions"],
    reviewPrompts: ["Which records are high impact?", "Which evidence is missing?", "Which sources need review?"],
    advisoryAngles: ["Regulatory roadmap", "Evidence and controls framework", "Source-review support"],
    caveat: "This owner view is a seed-data planning aid and does not assign formal legal accountability."
  };
}
