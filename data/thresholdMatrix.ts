export type ThresholdMatrixReviewStatus =
  | "source-reviewed-seed"
  | "review-before-client-use"
  | "date-sensitive"
  | "jurisdiction-dependent";

export type ThresholdMatrixType =
  | "entity-size"
  | "role-based"
  | "market-exposure"
  | "product-or-trade"
  | "jurisdiction-adoption"
  | "value-chain"
  | "listing-or-regulated-entity";

export type ThresholdMatrixRow = {
  id: string;
  regulationId: string;
  thresholdType: ThresholdMatrixType;
  thresholdSignal: string;
  factsToConfirm: string[];
  timingSignal: string;
  sourceToVerify: string;
  sourceUrl: string;
  reviewStatus: ThresholdMatrixReviewStatus;
  confidence: "high" | "medium" | "needs_review" | "date_uncertain";
  caveat: string;
};

export const thresholdMatrixRows: ThresholdMatrixRow[] = [
  {
    id: "csrd-large-undertaking-scope",
    regulationId: "csrd",
    thresholdType: "entity-size",
    thresholdSignal:
      "Large-undertaking, listed-SME and non-EU group scope signals should be reviewed by CSRD cohort, Member State transposition, reporting year and Omnibus implementation status.",
    factsToConfirm: ["EU undertaking or group structure", "Member State transposition", "employee, turnover and balance-sheet signals", "non-EU parent trigger"],
    timingSignal: "Wave timing is phased and may be affected by stop-the-clock or simplification measures.",
    sourceToVerify: "Directive (EU) 2022/2464 and current EU simplification amendments",
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2464",
    reviewStatus: "review-before-client-use",
    confidence: "high",
    caveat:
      "CSRD threshold signals are planning prompts only. Do not reuse CSDDD due-diligence thresholds as CSRD corporate-reporting thresholds."
  },
  {
    id: "esrs-csrd-dependent-scope",
    regulationId: "esrs",
    thresholdType: "jurisdiction-adoption",
    thresholdSignal: "ESRS does not create a standalone company-size threshold; it follows CSRD scope, materiality and phase-in context.",
    factsToConfirm: ["CSRD scope", "materiality conclusions", "available ESRS phase-ins", "sector or non-EU standard developments"],
    timingSignal: "ESRS Set 1 applies through CSRD reporting years and reliefs.",
    sourceToVerify: "ESRS delegated regulation",
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R2772",
    reviewStatus: "source-reviewed-seed",
    confidence: "high",
    caveat: "Use ESRS as the disclosure-standard layer after CSRD scope has been source-reviewed for the entity."
  },
  {
    id: "taxonomy-article-8-scope",
    regulationId: "eu-taxonomy",
    thresholdType: "role-based",
    thresholdSignal:
      "Article 8 disclosure scope follows sustainability-reporting obligations for undertakings, while financial-product disclosures depend on financial-market participant and product roles.",
    factsToConfirm: ["CSRD or accounting-directive reporting scope", "financial undertaking status", "product role", "KPI template"],
    timingSignal: "Taxonomy KPIs are phased by activity and undertaking type through delegated disclosure rules.",
    sourceToVerify: "Regulation (EU) 2020/852",
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32020R0852",
    reviewStatus: "review-before-client-use",
    confidence: "high",
    caveat: "Eligibility, alignment and product disclosure signals should be reviewed separately before client use."
  },
  {
    id: "sfdr-financial-market-role",
    regulationId: "sfdr",
    thresholdType: "role-based",
    thresholdSignal:
      "SFDR is primarily role-based for financial market participants and financial advisers, with product positioning and entity-level disclosure signals.",
    factsToConfirm: ["regulated entity role", "financial product type", "Article 6, 8 or 9 positioning", "principal adverse impact approach"],
    timingSignal: "Disclosure timing depends on entity role, product documents, periodic reporting and current RTS expectations.",
    sourceToVerify: "Regulation (EU) 2019/2088",
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019R2088",
    reviewStatus: "review-before-client-use",
    confidence: "high",
    caveat: "Do not treat SFDR as a general corporate threshold; it is a financial-services and product-disclosure screening signal."
  },
  {
    id: "csddd-large-company-scope",
    regulationId: "csddd",
    thresholdType: "entity-size",
    thresholdSignal:
      "CSDDD-specific due-diligence scope currently centers on very large EU or non-EU companies, group thresholds and franchise or licensing triggers.",
    factsToConfirm: ["EU or non-EU entity status", "consolidated employee count", "worldwide or EU turnover", "franchise or licensing revenue", "ultimate parent role"],
    timingSignal: "Member State implementation and first application are phased and should be checked against current consolidated text.",
    sourceToVerify: "Directive (EU) 2024/1760 and current consolidated CSDDD text",
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202401760",
    reviewStatus: "review-before-client-use",
    confidence: "high",
    caveat: "CSDDD threshold signals are regime-specific and should not be reused for CSRD, ESRS, EU Taxonomy or SFDR screening."
  },
  {
    id: "cbam-importer-covered-goods",
    regulationId: "cbam",
    thresholdType: "product-or-trade",
    thresholdSignal: "CBAM screening starts with importer or customs-representative role, covered goods, commodity code and definitive-period authorisation signals.",
    factsToConfirm: ["importer or indirect customs representative role", "covered CN code", "volume or mass signal", "authorised CBAM declarant status", "supplier emissions data"],
    timingSignal: "The definitive regime began in 2026, with declaration and certificate obligations tied to current CBAM rules.",
    sourceToVerify: "Regulation (EU) 2023/956 and European Commission CBAM guidance",
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0956",
    reviewStatus: "source-reviewed-seed",
    confidence: "high",
    caveat: "Covered-goods and volume signals need customs and source review before being used for compliance planning."
  },
  {
    id: "eudr-operator-trader-commodity",
    regulationId: "eudr",
    thresholdType: "value-chain",
    thresholdSignal: "EUDR screening starts with operator or trader role, covered commodity or product, placement/export activity and size-based application timing.",
    factsToConfirm: ["operator or trader role", "covered commodity or product", "market placement or export activity", "operator size", "country and supplier risk evidence"],
    timingSignal: "Application timing is phased for large/medium and micro/small operators and should be checked against current EU implementation materials.",
    sourceToVerify: "Regulation (EU) 2023/1115 and European Commission EUDR implementation page",
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1115",
    reviewStatus: "date-sensitive",
    confidence: "high",
    caveat: "EUDR dates and size categories are date-sensitive planning signals and require source review before client use."
  },
  {
    id: "issb-jurisdiction-adoption",
    regulationId: "issb-s1-s2",
    thresholdType: "jurisdiction-adoption",
    thresholdSignal: "ISSB standards become mandatory only through jurisdiction, regulator, listing-rule or market-adoption decisions.",
    factsToConfirm: ["headquarters or listing market", "local adoption status", "listed-company status", "sector regulator", "voluntary or investor expectation"],
    timingSignal: "Timing varies by market; ISSB existence alone does not create a universal legal filing deadline.",
    sourceToVerify: "IFRS Foundation jurisdictional adoption and ISSB implementation materials",
    sourceUrl: "https://www.ifrs.org/supporting-implementation/supporting-materials-for-ifrs-sustainability-disclosure-standards/ifrs-s1.html",
    reviewStatus: "jurisdiction-dependent",
    confidence: "high",
    caveat: "Treat ISSB as a global baseline and adoption tracker, not as a standalone legal obligation without local source review."
  },
  {
    id: "uk-sdr-authorised-firm-products",
    regulationId: "uk-sdr",
    thresholdType: "listing-or-regulated-entity",
    thresholdSignal: "UK SDR screening depends on FCA authorisation, asset-management role, product labels, naming/marketing use and sustainability-related claims.",
    factsToConfirm: ["FCA-authorised firm role", "asset manager or distributor status", "product label or naming use", "consumer-facing disclosure", "anti-greenwashing control"],
    timingSignal: "Anti-greenwashing and SDR product rules phase through FCA implementation dates and handbook updates.",
    sourceToVerify: "FCA sustainability disclosure and labelling regime",
    sourceUrl: "https://www.fca.org.uk/firms/climate-change-and-sustainable-finance/sustainability-disclosure-and-labelling-regime",
    reviewStatus: "review-before-client-use",
    confidence: "high",
    caveat: "UK SDR signals should be separated from UK SRS corporate-reporting development and reviewed against FCA source materials."
  },
  {
    id: "california-climate-revenue-nexus",
    regulationId: "california-sb253-sb261",
    thresholdType: "market-exposure",
    thresholdSignal: "California screening depends on revenue, doing-business-in-California nexus, SB 253 or SB 261 pathway and current CARB implementation rules.",
    factsToConfirm: ["annual revenue signal", "California business nexus", "public or private group structure", "Scope 1/2/3 data readiness", "climate-risk reporting pathway"],
    timingSignal: "CARB implementation and first-year reporting guidance should be reviewed before using dates in client outputs.",
    sourceToVerify: "California Air Resources Board climate disclosure implementation materials",
    sourceUrl: "https://ww2.arb.ca.gov/our-work/programs/california-climate-disclosure",
    reviewStatus: "date-sensitive",
    confidence: "medium",
    caveat: "California climate disclosure thresholds and deadlines are implementation-sensitive planning signals and should be reviewed against CARB materials."
  },
  {
    id: "australia-climate-phase-in",
    regulationId: "australia-climate-reporting",
    thresholdType: "entity-size",
    thresholdSignal: "Australia climate reporting screening depends on reporting-entity status and phased revenue, asset, employee or NGER-related signals.",
    factsToConfirm: ["Chapter 2M reporting status", "revenue, asset and employee group", "NGER status", "financial year start", "assurance phase-in"],
    timingSignal: "Largest entities began for financial years starting on or after 1 January 2025, with later cohorts phased.",
    sourceToVerify: "ASIC sustainability reporting guidance",
    sourceUrl: "https://www.asic.gov.au/regulatory-resources/sustainability-reporting/",
    reviewStatus: "source-reviewed-seed",
    confidence: "high",
    caveat: "Use Australian group thresholds as a planning signal only; confirm group category and reporting period before relying."
  },
  {
    id: "singapore-listed-large-nonlisted",
    regulationId: "singapore-climate-reporting",
    thresholdType: "listing-or-regulated-entity",
    thresholdSignal: "Singapore screening depends on listed-company status, large non-listed company criteria, revenue and asset signals, and phased assurance timing.",
    factsToConfirm: ["SGX listed status", "large non-listed company criteria", "revenue and asset signals", "sector", "assurance timing"],
    timingSignal: "Phased reporting and assurance timing should be checked against ACRA and SGX materials.",
    sourceToVerify: "ACRA sustainability reporting requirements timeline",
    sourceUrl: "https://www.acra.gov.sg/regulations/sustainability-reporting/requirements-timeline",
    reviewStatus: "date-sensitive",
    confidence: "high",
    caveat: "Singapore ISSB-aligned roadmap signals are jurisdiction-specific and should not be generalized to other APAC markets."
  },
  {
    id: "japan-ssbj-listed-company",
    regulationId: "japan-ssbj",
    thresholdType: "listing-or-regulated-entity",
    thresholdSignal: "Japan screening depends on listed-company market segment, local disclosure roadmap and SSBJ/FSA implementation context.",
    factsToConfirm: ["listed-company status", "market segment", "annual securities report obligations", "SSBJ standard adoption path", "FSA or exchange guidance"],
    timingSignal: "Timing is tied to Japanese standards and regulator or exchange implementation updates.",
    sourceToVerify: "SSBJ sustainability disclosure standards",
    sourceUrl: "https://www.ssb-j.jp/en/ssbj_standards.html",
    reviewStatus: "jurisdiction-dependent",
    confidence: "medium",
    caveat: "Japan SSBJ signals support orientation only until local filing scope and market-segment requirements are source-reviewed."
  },
  {
    id: "canada-csds-voluntary-regulator-watch",
    regulationId: "canada-csds",
    thresholdType: "jurisdiction-adoption",
    thresholdSignal: "Canada CSDS screening is a voluntary baseline and regulator-development watch item rather than a universal mandatory threshold.",
    factsToConfirm: ["voluntary reporting decision", "securities regulator pathway", "prudential regulator expectation", "listed or financial institution status", "investor request"],
    timingSignal: "Mandatory timing depends on Canadian regulator decisions and should be monitored separately from CSDS publication.",
    sourceToVerify: "Canadian Sustainability Standards Board and regulator materials",
    sourceUrl: "https://www.cpacanada.ca/business-and-accounting-resources/financial-and-non-financial-reporting/sustainability-environmental-and-social-reporting",
    reviewStatus: "review-before-client-use",
    confidence: "medium",
    caveat: "Do not present CSDS as a final mandatory filing threshold without jurisdiction-specific regulator source review."
  },
  {
    id: "india-brsr-listed-entity-ranking",
    regulationId: "india-brsr",
    thresholdType: "listing-or-regulated-entity",
    thresholdSignal: "India BRSR screening depends on listed-entity status, market-cap ranking, BRSR Core phase-in and value-chain disclosure expectations.",
    factsToConfirm: ["listed status", "market-cap rank", "BRSR Core applicability", "value-chain reporting cohort", "assurance expectation"],
    timingSignal: "BRSR and BRSR Core timing should be checked against current SEBI circulars.",
    sourceToVerify: "SEBI BRSR circulars and listing-obligation materials",
    sourceUrl: "https://www.sebi.gov.in/sebi_data/commondocs/may-2021/Business%20responsibility%20and%20sustainability%20reporting%20by%20listed%20entitiesAnnexure1_p.PDF",
    reviewStatus: "review-before-client-use",
    confidence: "needs_review",
    caveat: "India BRSR scope and assurance signals need current SEBI review before premium or client-ready use."
  },
  {
    id: "france-duty-of-vigilance-workforce",
    regulationId: "france-duty-of-vigilance",
    thresholdType: "entity-size",
    thresholdSignal: "French Duty of Vigilance screening depends on French parent-company status, workforce thresholds and group/value-chain structure.",
    factsToConfirm: ["French registered office or parent role", "French and global workforce signals", "subsidiary/control structure", "supplier and subcontractor scope", "published vigilance plan"],
    timingSignal: "Annual vigilance-plan and enforcement context should be reviewed against current French sources and case law.",
    sourceToVerify: "Legifrance Duty of Vigilance source",
    sourceUrl: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000034290626",
    reviewStatus: "review-before-client-use",
    confidence: "medium",
    caveat: "French workforce and group thresholds require source and counsel review before being used as client-specific scope findings."
  },
  {
    id: "germany-lksg-employee-threshold",
    regulationId: "germany-lksg",
    thresholdType: "entity-size",
    thresholdSignal: "Germany LkSG screening depends on German presence, employee threshold signals and current BAFA guidance.",
    factsToConfirm: ["German entity or branch", "employee count", "group calculation approach", "supplier risk profile", "BAFA reporting evidence"],
    timingSignal: "LkSG reporting and supervisory expectations should be checked against current BAFA materials and EU CSDDD interaction.",
    sourceToVerify: "BAFA Supply Chain Act guidance",
    sourceUrl: "https://www.bafa.de/EN/Supply_Chain_Act/supply_chain_act_node.html",
    reviewStatus: "review-before-client-use",
    confidence: "medium",
    caveat: "German LkSG employee and reporting signals should not be merged with CSDDD thresholds without source-specific review."
  },
  {
    id: "norway-transparency-larger-enterprise",
    regulationId: "norway-transparency-act",
    thresholdType: "market-exposure",
    thresholdSignal: "Norway Transparency Act screening depends on larger-enterprise criteria, Norway residence or market offering, and tax or business-presence facts.",
    factsToConfirm: ["Norway residence", "goods or services offered in Norway", "larger-enterprise criteria", "taxable presence", "human-rights due-diligence process"],
    timingSignal: "Annual accounts and information-request obligations should be checked against Norwegian guidance.",
    sourceToVerify: "Norwegian Consumer Authority Transparency Act guidance",
    sourceUrl: "https://www.forbrukertilsynet.no/the-transparency-act",
    reviewStatus: "review-before-client-use",
    confidence: "medium",
    caveat: "Norway market-exposure signals are orientation prompts only and need local threshold review before client use."
  },
  {
    id: "uk-modern-slavery-turnover-nexus",
    regulationId: "uk-modern-slavery-act",
    thresholdType: "market-exposure",
    thresholdSignal: "UK Modern Slavery Act screening depends on UK business nexus, commercial-organisation status and turnover threshold signals.",
    factsToConfirm: ["commercial organisation status", "UK business nexus", "turnover signal", "group structure", "statement approval and publication route"],
    timingSignal: "Annual statement timing and reform notes should be checked against current UK government guidance.",
    sourceToVerify: "Modern Slavery Act 2015",
    sourceUrl: "https://www.legislation.gov.uk/ukpga/2015/30/contents",
    reviewStatus: "source-reviewed-seed",
    confidence: "high",
    caveat: "Turnover and UK nexus signals should be verified against current guidance before using them in a client scope note."
  },
  {
    id: "australia-modern-slavery-revenue",
    regulationId: "australia-modern-slavery-act",
    thresholdType: "market-exposure",
    thresholdSignal: "Australia Modern Slavery screening depends on annual consolidated revenue, Australian reporting-entity status and carrying-on-business facts.",
    factsToConfirm: ["consolidated revenue signal", "Australian entity or carrying-on-business status", "reporting period", "supply-chain risk profile", "modern-slavery statement evidence"],
    timingSignal: "Reporting periods and statement deadlines should be checked against current register guidance.",
    sourceToVerify: "Australian modern slavery register and guidance",
    sourceUrl: "https://modernslaveryregister.gov.au/",
    reviewStatus: "review-before-client-use",
    confidence: "medium",
    caveat: "Australian modern slavery threshold signals are seed planning prompts and need source review before client reliance."
  },
  {
    id: "batteries-product-role",
    regulationId: "eu-batteries-regulation",
    thresholdType: "product-or-trade",
    thresholdSignal: "EU Batteries Regulation screening depends on product category, economic-operator role, EU market placement and phase-in obligation type.",
    factsToConfirm: ["battery category", "manufacturer, importer or distributor role", "EU market placement", "due-diligence or passport trigger", "carbon-footprint and recycled-content timing"],
    timingSignal: "Battery obligations phase in by category and requirement; due-diligence and passport timing need current source review.",
    sourceToVerify: "Regulation (EU) 2023/1542",
    sourceUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1542",
    reviewStatus: "source-reviewed-seed",
    confidence: "high",
    caveat: "Product-role and phase-in signals should be checked by battery category before being used for compliance planning."
  }
];
