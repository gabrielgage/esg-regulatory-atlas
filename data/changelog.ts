export type ChangelogEntry = {
  edition: string;
  date: string;
  label: string;
  summary: string;
  added: string[];
  updated: string[];
  records: string[];
  caveat: string;
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    edition: "0.5.66 - May 2026",
    date: "2026-05-25",
    label: "Shared legal notice components",
    summary:
      "Centralized recurring legal, copy-output and manual-request caveats so new product surfaces can reuse one consistent notice system instead of adding one-off disclaimer text.",
    added: [
      "Shared LEGAL_NOTICES source for recurring caveat text",
      "Reusable LegalNotice component with light and dark mode styling",
      "Guardrail test for canonical legal-notice wording"
    ],
    updated: [
      "Top disclaimer banner",
      "Footer disclaimer",
      "Copy-output note",
      "Manual request panel",
      "Release context documentation"
    ],
    records: ["Legal notices", "Copy outputs", "Manual requests", "Footer disclaimer"],
    caveat:
      "Shared notice text improves consistency but does not replace record-specific legal review, source verification or entity-specific applicability assessment."
  },
  {
    edition: "0.5.65 - May 2026",
    date: "2026-05-25",
    label: "Plans page simplification",
    summary:
      "Reworked the plans page so the current live choice is obvious: use the free Atlas for orientation or request a manual advisory-supported scan for source-linked planning help.",
    added: [
      "Two primary current-path cards for Free Atlas and Advisory Atlas",
      "Secondary premium and enterprise validation cards",
      "Collapsed comparison table to reduce first-load visual density",
      "Clearer no-live-SaaS caveats for premium and enterprise paths"
    ],
    updated: [
      "Plans page hierarchy",
      "Commercial-path copy",
      "Dark-mode card styling",
      "Release context documentation",
      "Simplification roadmap status"
    ],
    records: ["Plans", "Free Atlas", "Advisory Atlas", "Premium previews", "Enterprise future"],
    caveat:
      "The plans page remains a static commercial validation surface. It does not add checkout, billing, accounts, gated content, automated alerts, legal advice or definitive applicability determinations."
  },
  {
    edition: "0.5.64 - May 2026",
    date: "2026-05-25",
    label: "Value-chain lane simplification",
    summary:
      "Reworked the value-chain workspace into six business-exposure lanes so users can start from supplier, trade, product, portfolio, operations or customer-pressure questions before opening source-linked records.",
    added: [
      "Six value-chain lane definitions with practical start questions",
      "Lane-specific evidence prompts, first actions and suggested owners",
      "Copyable lane summaries with legal caveats",
      "Calmer lane cards with fewer repeated chips and clearer source-review cues"
    ],
    updated: [
      "Value-chain page information architecture",
      "Value-chain aggregation helper",
      "Release context documentation",
      "Simplification roadmap status"
    ],
    records: ["Value chain", "Supplier due diligence", "Trade and imports", "Products and claims", "Portfolio exposure"],
    caveat:
      "Value-chain lanes remain seed intelligence for orientation and evidence planning. They do not provide complete legal coverage, official source verification or entity-specific applicability determinations."
  },
  {
    edition: "0.5.63 - May 2026",
    date: "2026-05-25",
    label: "Interface language clarity",
    summary:
      "Made the language selector explicitly describe interface-language behavior so users do not mistake translated navigation chrome for official legal translation of regulatory records.",
    added: [
      "Interface-language label and tooltip caveat on the language selector",
      "Localized language-caveat copy for English, Spanish, Dutch, French, German and Portuguese",
      "Dark-mode styling improvements for the language control"
    ],
    updated: [
      "Language toggle accessibility label",
      "Header language-control presentation",
      "Release context documentation",
      "Simplification roadmap status"
    ],
    records: ["Language toggle", "Interface chrome", "Legal caveats"],
    caveat:
      "The language toggle changes product interface guidance only. Regulatory records remain source-linked seed intelligence and are not official legal translations."
  },
  {
    edition: "0.5.62 - May 2026",
    date: "2026-05-25",
    label: "Sector finder simplification",
    summary:
      "Reworked the sector starting point page into a searchable sector finder with business-context groups, practical triggers, review-first records and calmer cards.",
    added: [
      "Reusable SectorDirectory component",
      "Sector group taxonomy for capital markets, industrial/infrastructure, consumer/supply-chain and public/digital contexts",
      "Searchable sector finder with group filters and empty state",
      "Business trigger summaries and review-first record prompts"
    ],
    updated: [
      "Sectors page information architecture",
      "Sector page caveat and assessment handoff",
      "Release context documentation",
      "Simplification roadmap status"
    ],
    records: ["Sectors", "Sector finder", "Assessment handoff", "Source review cues"],
    caveat:
      "Sector finder counts remain current seed coverage only. They do not represent complete sector legal inventories, official source verification or entity-specific applicability determinations."
  },
  {
    edition: "0.5.61 - May 2026",
    date: "2026-05-25",
    label: "Reusable advisory scan CTA",
    summary:
      "Standardized the manual advisory-scan path across market, assessment and regulation-detail surfaces so users see one consistent source-linked next step instead of scattered CTA variants.",
    added: [
      "Reusable AdvisoryScanCTA component",
      "Shared mailto helper for advisory scan requests",
      "Consistent advisory-scan caveat and deliverable framing",
      "Stable wrapper for existing market briefing CTAs"
    ],
    updated: [
      "Assessment advisory CTA",
      "Regulation detail page advisory CTA",
      "Regulation drawer advisory CTA",
      "Market briefing CTA implementation",
      "Release context documentation"
    ],
    records: ["Advisory scans", "Assessment", "Regulation details", "Markets"],
    caveat:
      "Advisory scan CTAs remain manual mailto request paths. They do not add accounts, payment, automated delivery, source verification, legal advice or definitive applicability determinations."
  },
  {
    edition: "0.5.60 - May 2026",
    date: "2026-05-25",
    label: "Regulations search-first layout",
    summary:
      "Advanced the simplification roadmap by making the Regulations workspace lead with search, primary filters and current result context before optional role lenses, comparison, exports and label help.",
    added: [
      "Search-first Regulations workspace panel",
      "Primary filter framing for search, jurisdiction, topic, sector, company type and reporting year",
      "Secondary tools area for role lenses and record comparison",
      "Share/export and label-help surfaces moved below the results",
      "Smoke coverage for the search-first Regulations hierarchy"
    ],
    updated: [
      "Regulations page information architecture",
      "Persona preset embedding for secondary tool panels",
      "Regulations smoke coverage",
      "Release context documentation"
    ],
    records: ["Regulations", "Search", "Filters", "Role lenses", "Comparison"],
    caveat:
      "This is a user-experience simplification pass. It does not change regulatory records, legal analysis, applicability logic, source verification or coverage completeness."
  },
  {
    edition: "0.5.59 - May 2026",
    date: "2026-05-25",
    label: "Assessment shortlist overview",
    summary:
      "Advanced the simplification roadmap by adding a decision-first shortlist overview to the assessment workspace before the detailed trigger logic.",
    added: [
      "Assessment shortlist overview with top records to review first",
      "Relevance-mix counts across cautious applicability categories",
      "Facts-to-confirm and first-30-day action panels above detailed trigger review",
      "Advisory scan CTA directly inside the assessment result hierarchy",
      "Smoke coverage for the new assessment overview"
    ],
    updated: [
      "Assessment workspace hierarchy",
      "Assessment smoke coverage",
      "Release context documentation",
      "Simplification roadmap status"
    ],
    records: ["Assessment", "Applicability orientation", "Advisory scans", "Shortlist overview"],
    caveat:
      "The assessment overview is an indicative planning aid. It does not determine legal applicability, complete coverage, entity-specific duties or compliance deadlines."
  },
  {
    edition: "0.5.58 - May 2026",
    date: "2026-05-25",
    label: "Public journey simplification",
    summary:
      "Applied the urgent simplification brief by reducing primary navigation, making the homepage a clearer three-path start screen, demoting internal launch assets, and replacing MVP/operator wording with customer-facing advisory-scan language.",
    added: [
      "Grouped More menu for planning, trust/methodology and commercial preview routes",
      "Homepage hero actions for assessment, market browsing and regulation search",
      "Three-path start panel anchored on assessment, market exploration and advisory scans",
      "Smoke coverage for simplified navigation, internal launch noindex and printable brief edition consistency",
      "Simplification roadmap for urgent, next-seven-day and 30-day follow-up work"
    ],
    updated: [
      "Header navigation",
      "Homepage hero and start panel",
      "Market briefing CTA copy",
      "Internal launch workspace copy",
      "Release context documentation"
    ],
    records: ["Navigation", "Homepage", "Advisory scans", "Launch workspace", "Printable briefs"],
    caveat:
      "This is a product-journey and trust simplification pass. It does not add legal advice, complete coverage, authentication, payments, external databases, automation, scraping or paid APIs."
  },
  {
    edition: "0.5.57 - May 2026",
    date: "2026-05-25",
    label: "Market obligation footprint",
    summary:
      "Added a market obligation footprint to jurisdiction profiles so users can see which reporting, assurance, governance, due-diligence, finance, taxonomy, transition-plan, data and product obligations are represented in the tracked seed records.",
    added: [
      "Market obligation footprint on jurisdiction profile pages",
      "Reusable market obligation helper for business-impact categories",
      "Owner-function, evidence-starter and first-action prompts for market obligation categories",
      "Obligation-footprint context in copied market profile Markdown",
      "Smoke coverage for the market obligation footprint"
    ],
    updated: [
      "Jurisdiction market profiles",
      "Copied market profile output",
      "Market profile smoke coverage",
      "Release context documentation"
    ],
    records: ["Markets", "Jurisdiction profiles", "Business impacts", "Obligation footprint"],
    caveat:
      "The market obligation footprint is derived from seed records for planning orientation. It does not determine legal applicability, entity-specific duties, enforcement exposure or complete jurisdiction coverage."
  },
  {
    edition: "0.5.56 - May 2026",
    date: "2026-05-22",
    label: "GitHub Actions Node 24 action upgrade",
    summary:
      "Upgraded checkout and setup-node actions to their Node 24-compatible major versions so the launch validation workflows no longer target the deprecated Node 20 action runtime.",
    added: [
      "actions/checkout v5 in CI and Lighthouse workflows",
      "actions/setup-node v5 in CI and Lighthouse workflows",
      "Follow-up issue-resolution documentation for the remaining Node 20 target warning"
    ],
    updated: [
      "GitHub Actions CI workflow",
      "GitHub Actions Lighthouse workflow",
      "Release context documentation",
      "Development workflow documentation"
    ],
    records: ["CI", "GitHub Actions", "Launch validation", "Workflow governance"],
    caveat:
      "This is a launch reliability update. It does not change regulatory seed data, legal analysis, product scope, authentication, billing, monitoring or infrastructure guardrails."
  },
  {
    edition: "0.5.55 - May 2026",
    date: "2026-05-22",
    label: "CI Node 24 readiness",
    summary:
      "Opted GitHub Actions workflows into the Node 24 JavaScript action runtime ahead of the platform default change while keeping the application build runtime on Node 22.",
    added: [
      "Node 24 JavaScript action runtime opt-in for CI and Lighthouse workflows",
      "Issue-resolution note documenting the deprecation warning and prevention rule"
    ],
    updated: [
      "GitHub Actions CI workflow",
      "GitHub Actions Lighthouse workflow",
      "Release context documentation",
      "Development workflow documentation"
    ],
    records: ["CI", "GitHub Actions", "Launch validation", "Workflow governance"],
    caveat:
      "This is a launch reliability update. It does not change regulatory seed data, legal analysis, product scope, authentication, billing, monitoring or infrastructure guardrails."
  },
  {
    edition: "0.5.54 - May 2026",
    date: "2026-05-21",
    label: "Market trigger review",
    summary:
      "Added market-level trigger reviews to jurisdiction profiles so users can see what drives a market: corporate reporting, climate, sustainable finance, supply chain, product/trade and source-review signals.",
    added: [
      "Market trigger-review panel on jurisdiction profile pages",
      "Reusable market trigger helper for jurisdiction records",
      "Trigger-review context in copied market profile Markdown",
      "Smoke coverage for market trigger review"
    ],
    updated: [
      "Jurisdiction market profiles",
      "Copied market profile output",
      "Market profile smoke coverage",
      "Release context documentation"
    ],
    records: ["Markets", "Jurisdiction profiles", "Market trigger review", "Source review"],
    caveat:
      "Market trigger review is a seed-data orientation aid. It does not determine legal applicability, complete jurisdiction coverage or entity-specific compliance obligations."
  },
  {
    edition: "0.5.53 - May 2026",
    date: "2026-05-21",
    label: "Assessment trigger review",
    summary:
      "Added a profile trigger review to the assessment workspace so users can see how jurisdiction, company size, sector, value-chain and financial exposure signals shape the indicative shortlist.",
    added: [
      "Assessment trigger-review panel with jurisdiction, company, sector, value-chain, financial and source/threshold signals",
      "Matched-record counts and next facts to verify for each trigger category",
      "Trigger-review context in copied assessment shortlist Markdown",
      "Smoke coverage for the trigger-review panel"
    ],
    updated: [
      "Assessment wizard",
      "Copied assessment shortlist",
      "Assessment smoke coverage",
      "Release context documentation"
    ],
    records: ["Assessment", "Applicability orientation", "Threshold matrix", "Source review"],
    caveat:
      "Assessment trigger review is a planning explanation only. It does not determine legal applicability, entity scope, deadlines or compliance obligations."
  },
  {
    edition: "0.5.52 - May 2026",
    date: "2026-05-21",
    label: "Regulation implementation roadmap",
    summary:
      "Added a cautious 30/60/90-day implementation roadmap to regulation details and drawers so users can translate a potentially relevant record into owner, evidence, source-review and briefing actions.",
    added: [
      "Implementation roadmap component on regulation detail pages and drawers",
      "Reusable implementation-roadmap helper and copyable Markdown output",
      "0-30, 31-60 and 61-90 day action stages with owner, source and evidence cues",
      "Smoke and copy-surface checks for the roadmap"
    ],
    updated: [
      "Regulation detail pages",
      "Regulation detail drawer",
      "Decision-readiness copy coverage",
      "Release context documentation"
    ],
    records: ["Regulation details", "CSRD", "Decision readiness", "Implementation roadmap"],
    caveat:
      "Implementation roadmaps are static planning aids. They do not determine applicability, verify legal completeness or replace qualified legal, tax, investment or assurance advice."
  },
  {
    edition: "0.5.51 - May 2026",
    date: "2026-05-21",
    label: "Marquee 10 source-review packet",
    summary:
      "Added a dedicated source-review packet to the Data Quality review workflow so the highest-demand regimes show premium-use blockers, priority sources, threshold facts and owner actions in one operational review lane.",
    added: [
      "Marquee 10 source-review packet on the Data Quality review workflow tab",
      "Premium-use, source-posture, decision-readiness and review-status badges for each Marquee 10 record",
      "Priority source, threshold fact and owner/action cards for launch-critical regimes",
      "Smoke coverage for the source-review packet"
    ],
    updated: [
      "Data Quality review workflow",
      "Marquee source-governance documentation",
      "Release context documentation"
    ],
    records: ["CSRD", "ISSB S1/S2", "EU Taxonomy", "SFDR", "CSDDD", "EUDR", "CBAM", "California SB 253/SB 261", "UK SDR", "SEC climate watch"],
    caveat:
      "The Marquee 10 packet is a static source-governance aid. It does not verify legal completeness, certify sources or determine entity-specific applicability."
  },
  {
    edition: "0.5.50 - May 2026",
    date: "2026-05-20",
    label: "Assessment readiness plan",
    summary:
      "Added a compact readiness plan to the assessment workspace so indicative shortlists show threshold facts to check, first 30-day actions and likely owner functions before users open individual records.",
    added: [
      "Assessment readiness plan cards for threshold facts, first actions and owner functions",
      "Threshold matrix handoff from the assessment result area",
      "Threshold matrix row badges on assessment shortlist records",
      "Copied assessment shortlist metadata for threshold-sensitive records"
    ],
    updated: [
      "Assessment wizard decision flow",
      "Assessment copied summary caveat",
      "Smoke coverage for assessment readiness plan",
      "Release context documentation"
    ],
    records: ["Assessment", "Threshold matrix", "csrd", "csddd", "sfdr", "eu-taxonomy"],
    caveat:
      "Assessment readiness plans are static planning prompts. They do not determine legal applicability, scope, deadlines or compliance obligations."
  },
  {
    edition: "0.5.49 - May 2026",
    date: "2026-05-20",
    label: "Threshold matrix for high-value records",
    summary:
      "Added a source-linked threshold matrix so high-value ESG regulatory records expose the entity, market, product, value-chain or adoption facts that should be verified before assessment, premium-preview or advisory use.",
    added: [
      "Public `/thresholds` route for high-value threshold and scope signals",
      "Static threshold matrix data with facts to confirm, timing signals, source links, confidence labels and caveats",
      "Data Quality handoff card for threshold-sensitive records",
      "Regulation detail callouts when a record appears in the threshold matrix",
      "Data guardrail test coverage for threshold matrix source links and caveats"
    ],
    updated: [
      "Header More menu with a localized Thresholds link",
      "Regulation detail pages for threshold-sensitive records",
      "Data Quality review workflow context",
      "Project documentation and release context"
    ],
    records: ["csrd", "csddd", "eu-taxonomy", "sfdr", "cbam", "eudr", "california-sb253-sb261", "uk-sdr", "issb-s1-s2"],
    caveat:
      "Threshold matrix rows are seed planning signals. They do not decide entity-specific legal scope and must be verified against linked sources and qualified advisers before reliance."
  },
  {
    edition: "0.5.48 - May 2026",
    date: "2026-05-20",
    label: "Trust-signal clarity and request paths",
    summary:
      "Clarified how users should interpret coverage, source and review signals, and added manual request guidance so commercial and advisory CTAs lead to concrete next steps without adding infrastructure.",
    added: [
      "Quality signal explainer for Data Quality and Markets",
      "Manual request panel for Plans, Alerts, Advisory and Premium Roadmap",
      "Clearer what-to-send and what-Etica-returns guidance for manual inquiries",
      "Safer public wording around review prompts and source-linked seed records"
    ],
    updated: [
      "Data Quality labels from source-coverage and review-risk language to captured source links and review prompts",
      "Market, sector, jurisdiction and value-chain review labels",
      "Commercial validation and advisory request surfaces",
      "Project documentation and release context"
    ],
    records: ["Data Quality", "Markets", "Plans", "Alerts", "Advisory", "Premium roadmap"],
    caveat:
      "Quality signals and request paths support orientation, source review and advisory scoping only. They do not create legal advice, paid accounts, automated monitoring or complete coverage claims."
  },
  {
    edition: "0.5.47 - May 2026",
    date: "2026-05-20",
    label: "Regulatory data guardrail checks",
    summary:
      "Added automated data-governance checks so future seed-data changes catch missing source metadata, missing high-impact review signals, premium-use gate gaps and definitive legal wording before merge.",
    added: [
      "Playwright data guardrail test suite",
      "`npm run check:data` command for static regulatory data checks",
      "Premium-pack gate coverage checks",
      "Definitive legal-claim phrase scan across seed and premium copy"
    ],
    updated: [
      "CI smoke coverage through the existing Playwright test run",
      "Project documentation and release context"
    ],
    records: ["Data guardrails", "Premium-use gates", "Source governance", "Legal wording"],
    caveat:
      "Automated guardrails catch common metadata and wording risks. They do not replace source review, qualified legal review or production regulatory research workflow."
  },
  {
    edition: "0.5.46 - May 2026",
    date: "2026-05-20",
    label: "Near-term regulatory timeline planning",
    summary:
      "Reworked the timeline default into a planning-horizon view so users see next-12, next-24, already-in-force, longer-term watch and full-history modes instead of an undifferentiated chronology.",
    added: [
      "Planning horizon selector on `/timeline`",
      "Default next-24-month timeline view anchored to the May 2026 release context",
      "Already-in-force, longer-term watch and full-history timeline modes",
      "Smoke coverage for timeline horizon selection and reset behavior"
    ],
    updated: [
      "Timeline filter summary",
      "Regulatory timeline milestone filtering",
      "Project documentation and release context"
    ],
    records: ["Timeline", "Planning horizon", "Date-sensitive milestones", "Legal caveats"],
    caveat:
      "Timeline horizons are planning filters over seed data. They do not confirm legal deadlines, filing obligations, local implementation or entity-specific applicability."
  },
  {
    edition: "0.5.45 - May 2026",
    date: "2026-05-20",
    label: "Scenario-led briefing workspace",
    summary:
      "Rebuilt the briefing workspace around curated scenarios so users choose the planning question before generating priority records, evidence prompts, advisory workstreams or copied summaries.",
    added: [
      "Briefing scenario data model and matcher",
      "Scenario selector for EU reporting, PE portfolio, supplier/exporter, financial services and board/risk updates",
      "Scenario-specific leadership question, first operating move, evidence package, advisory motion and next-check prompts",
      "Smoke coverage for the scenario-first briefing flow"
    ],
    updated: [
      "Briefing page information architecture",
      "Executive briefing snapshot copy",
      "Briefing client-summary smoke test",
      "Project documentation and release context"
    ],
    records: ["Briefing", "Advisory workstreams", "Client summary", "Scenario selector", "Legal caveats"],
    caveat:
      "Briefing scenarios are static orientation templates. They narrow seed records and planning prompts but do not create client-ready legal advice, definitive applicability findings or verified compliance outputs."
  },
  {
    edition: "0.5.44 - May 2026",
    date: "2026-05-20",
    label: "Expert review launch-readiness fixes",
    summary:
      "Applied the first trust-risk findings from the expert review: safer CSRD/CSDDD threshold separation, visible premium source-review gates, removal of internal launch resources from public navigation, and a clearer Start Here path on the homepage.",
    added: [
      "Homepage Start Here panel with assessment, market and regulation-search entry paths",
      "Premium source-review gate summary on premium pack preview pages",
      "Per-record premium-use labels for illustrative-only, review-before-use and orientation-ready records",
      "Noindex metadata for the internal launch-resource route"
    ],
    updated: [
      "CSRD and CSDDD threshold caveats",
      "Premium pack copied Markdown",
      "Public navigation",
      "Commercial CTA secondary paths",
      "Smoke tests",
      "Project documentation"
    ],
    records: ["CSRD", "CSDDD", "EU ESG Compliance Pack", "Premium source-review gate", "Start Here", "Public navigation"],
    caveat:
      "Premium-use gates and threshold notes are source-governance controls for planning. They do not verify legal completeness, determine applicability or make premium/advisory outputs client-ready without qualified review."
  },
  {
    edition: "0.5.24 - May 2026",
    date: "2026-05-11",
    label: "Client briefing handoff path",
    summary:
      "Added a clearer handoff path inside the client planning summary so users can move from indicative assessment to printable jurisdiction brief and advisory review without adding accounts, billing or backend services.",
    added: [
      "Briefing handoff links in the client planning summary component",
      "Assessment, market brief and advisory next-step links in copied summary text",
      "Smoke coverage for the briefing handoff path"
    ],
    updated: ["Client planning summary", "Briefing workspace", "Copied summary Markdown", "Smoke tests", "Dataset metadata"],
    records: ["Assessment", "Jurisdiction brief", "Premium roadmap", "Advisory review", "Caveats"],
    caveat: "The handoff path is a static planning workflow. It does not create a client workspace, legal determination, paid product, automated alert or production advisory engagement."
  },
  {
    edition: "0.5.23 - May 2026",
    date: "2026-05-11",
    label: "Market brief quick-start alignment",
    summary:
      "Carried market quick-start playbooks into printable and copyable jurisdiction briefs so market profile pages and exported advisory notes use the same first-action, evidence and owner-function framing.",
    added: [
      "Quick-start headline and planning question on `/jurisdiction/[code]/brief`",
      "Evidence starter pack and owner-function sections in printable briefs",
      "Quick-start content in copied jurisdiction brief Markdown"
    ],
    updated: ["Jurisdiction brief pages", "Copyable brief Markdown", "Smoke tests", "Dataset metadata"],
    records: ["Market quick start", "Evidence starter pack", "Likely owner functions", "Watch items", "Caveats"],
    caveat: "Jurisdiction briefs remain indicative seed intelligence and do not determine legal applicability, complete market coverage or compliance obligations."
  },
  {
    edition: "0.5.22 - May 2026",
    date: "2026-05-11",
    label: "Market quick-start playbooks",
    summary:
      "Added jurisdiction playbooks that translate tracked seed records into first 30-day actions, evidence starter packs, likely owner functions, watch items and advisory prompts for priority markets.",
    added: [
      "Structured market quick-start data for core launch markets",
      "Market quick-start cards on `/markets`",
      "Detailed quick-start panel on `/jurisdiction/[code]` market profile pages",
      "Quick-start content in copyable market Markdown summaries"
    ],
    updated: ["Market profiles", "Jurisdiction market pages", "Copyable market summaries", "Smoke tests", "Project documentation"],
    records: ["First 30-day actions", "Evidence starter pack", "Owner functions", "Watch items", "Advisory prompts"],
    caveat: "Market quick starts are planning prompts generated from seed regulatory intelligence. They do not determine legal applicability, complete market coverage or compliance obligations."
  },
  {
    edition: "0.5.21 - May 2026",
    date: "2026-05-09",
    label: "Navigation and homepage calm-down pass",
    summary:
      "Reduced first-screen clutter by grouping secondary workspaces into a translated More menu and replacing the three separate homepage metric cards with one compact workspace snapshot.",
    added: [
      "Translated navigation labels for Plans, Alerts, Advisory, Launch and More across the supported interface languages",
      "Consolidated homepage workspace snapshot with record, high-impact and source-link counts",
      "Dark-mode-aware navigation and snapshot styling"
    ],
    updated: ["Header navigation", "Homepage hero metrics", "Interface translation dictionary", "Project documentation"],
    records: ["Primary navigation", "Workspace summary", "Language chrome", "Homepage information architecture"],
    caveat: "This release changes product navigation and layout only. It does not change legal interpretation, data coverage or the illustrative seed-data status of the regulatory records."
  },
  {
    edition: "0.5.20 - May 2026",
    date: "2026-05-07",
    label: "Map workspace redesign and pan/zoom controls",
    summary:
      "Refreshed the homepage into a calmer map-first workspace and upgraded the SVG map so untracked countries, country outlines, ocean background, zoom controls and drag-to-pan behavior are visible from tablet widths upward.",
    added: [
      "No-dependency map zoom, reset and drag-to-pan controls",
      "Visible ocean background and untracked-country land styling",
      "Locally bundled Natural Earth Admin 0 country geometry so untracked countries render as neutral land",
      "Smoke-test checks for untracked countries and map viewport controls",
      "Tabbed Data Quality cleanup carried forward from the previous deployment"
    ],
    updated: ["Homepage information architecture", "World choropleth rendering", "Map dark-mode variables", "Smoke tests", "Project documentation"],
    records: ["Tracked coverage", "Untracked countries", "Map controls", "Country outlines", "View filters"],
    caveat: "Map color reflects current tracked seed record volume in the active view. It is not a statement of complete legal coverage, legal applicability or regulatory maturity."
  },
  {
    edition: "0.5.19 - May 2026",
    date: "2026-05-06",
    label: "Review workflow export controls",
    summary:
      "Added a source-review workflow export layer so the Data Quality workspace can produce reviewer-ready CSV/JSON trackers and a copyable priority review packet from the static seed data.",
    added: [
      "Shared review-workflow helper for review rows, priority scoring and caveated exports",
      "Review Workflow Export panel on `/data-quality`",
      "CSV and JSON exports for source, threshold, evidence and premium-use review tracking",
      "Copyable priority review packet for Notion, advisory prep and content QA",
      "Tabbed Data Quality workspace that separates overview, source library, coverage and review workflow"
    ],
    updated: ["Data Quality information architecture", "Source governance workflow", "Static tests", "Smoke tests", "Project documentation"],
    records: ["Review priority", "Decision gate", "Source posture", "Priority source", "Owner", "Next action"],
    caveat: "Review workflow exports are operational QA aids for source review and planning. They are not legal opinions, official translations or verified compliance determinations."
  },
  {
    edition: "0.5.18 - May 2026",
    date: "2026-05-05",
    label: "Source evidence review packets",
    summary:
      "Added reusable source evidence trails and copyable source-review memos so regulation records can move from seed orientation into a clearer content QA or advisory review workflow.",
    added: [
      "Shared source-governance helper for source posture, freshness and review packets",
      "Source Evidence Trail panel on regulation detail pages and detail drawers",
      "Copyable source-review memo with caveats, source links, review timing and facts to confirm",
      "Source posture samples in the Data Quality source library"
    ],
    updated: ["Regulation detail pages", "Regulation detail drawer", "Data Quality source library", "Smoke tests", "Project documentation"],
    records: ["Priority source", "Review timing", "Captured sources", "Source-review steps", "Copyable source memo"],
    caveat: "Source evidence trails are governance and QA aids. They do not verify legal completeness, provide official translations or determine applicability."
  },
  {
    edition: "0.5.17 - May 2026",
    date: "2026-05-05",
    label: "Decision readiness evidence gates",
    summary:
      "Added a reusable decision-readiness layer for regulation details and Marquee review governance, turning source, threshold and evidence gaps into practical review controls.",
    added: [
      "Shared decision-readiness helper for regulation records",
      "Decision Readiness checklist on regulation detail pages and drawers",
      "Premium Evidence Gates panel on `/data-quality`",
      "Smoke-test assertions for decision readiness and premium evidence gates"
    ],
    updated: ["Regulation details", "Regulation detail drawer", "Data Quality", "Marquee review queue", "Project documentation"],
    records: ["Facts to confirm", "Evidence package", "First 30-day actions", "Source-review steps", "Premium-use blockers"],
    caveat: "Decision readiness is an orientation and governance control. It does not verify legal completeness, determine applicability or replace qualified review."
  },
  {
    edition: "0.5.16 - May 2026",
    date: "2026-05-03",
    label: "Coverage confidence view",
    summary:
      "Added a coverage-confidence layer that separates direct market depth from source quality, review flags, stale dates and date-sensitive regulatory records.",
    added: [
      "Coverage confidence scoring helper for every tracked jurisdiction",
      "Coverage Confidence panel on `/data-quality`",
      "Coverage confidence badges on market cards and jurisdiction profiles",
      "Static coverage-confidence test coverage"
    ],
    updated: ["Data Quality", "Markets", "Jurisdiction profiles", "Smoke tests", "Project documentation"],
    records: ["Source-reviewed seed", "Usable seed coverage", "Review needed", "Watch-only"],
    caveat: "Coverage confidence is an internal readiness and transparency signal. It does not verify complete market coverage or determine legal applicability."
  },
  {
    edition: "0.5.15 - May 2026",
    date: "2026-05-03",
    label: "Persona regulation presets",
    summary:
      "Added role-based starting points to the Regulations workspace so CSOs, legal teams, finance controllers, procurement leads, private equity users and external advisors can apply cautious filters and first-action prompts quickly.",
    added: [
      "Persona preset data model for role-based regulation database lenses",
      "Persona starting point panel on `/regulations`",
      "Shareable `?persona=` URLs for active role lenses",
      "Smoke coverage for persona preset application"
    ],
    updated: ["Regulations workspace", "Dataset metadata", "Changelog", "Project documentation"],
    records: ["CSO", "Legal", "Finance", "Procurement", "Private equity", "Advisor"],
    caveat: "Persona presets are orientation filters only. They do not determine applicability, legal obligations or complete role-specific coverage."
  },
  {
    edition: "0.5.14 - May 2026",
    date: "2026-05-03",
    label: "Sector starting points",
    summary:
      "Added a Sectors workspace and static sector profile pages so users can begin regulatory triage from business context, then move into priority records, market signals, evidence needs, source confidence and advisory next steps.",
    added: [
      "/sectors route for browsing sector starting points",
      "/sectors/[slug] route for direct sector records, broad all-sector context and source-review cues",
      "Reusable sector profile aggregation logic built from the existing static regulation dataset",
      "Sector navigation and smoke coverage for the new workspace"
    ],
    updated: ["Header navigation", "Changelog", "Smoke tests", "Project documentation"],
    records: ["Financial services", "Manufacturing", "Agriculture", "Energy", "Retail", "Technology", "Private equity"],
    caveat: "Sector pages show current tracked seed coverage and broad all-sector records where relevant. They are not complete sector legal inventories and do not determine entity-specific applicability."
  },
  {
    edition: "0.5.13 - May 2026",
    date: "2026-05-03",
    label: "Market profile navigation layer",
    summary:
      "Added a Markets workspace and jurisdiction-level market profile pages so users can move from the map into structured market context, priority records, timing signals, evidence needs, source confidence and advisory next steps.",
    added: [
      "/markets route for browsing tracked jurisdictions by region",
      "/jurisdiction/[code] market profile route for every tracked market",
      "Reusable market profile aggregation logic",
      "Market profile links from the selected-jurisdiction panel"
    ],
    updated: ["Header navigation", "Jurisdiction panel", "Smoke tests", "Project documentation"],
    records: ["EUU", "GBR", "USA", "USA-CA", "SGP", "AUS", "JPN", "IND", "BRA", "CAN", "MEX", "NLD"],
    caveat: "Market profiles show current tracked seed coverage and planning prompts only. They are not complete local legal inventories and do not determine entity-specific applicability."
  },
  {
    edition: "0.5.12 - May 2026",
    date: "2026-05-03",
    label: "Source governance and freshness signals",
    summary:
      "Deepened the Data Quality governance layer with source freshness signals, Marquee review owners, next actions and premium-use blockers so launch-critical regimes can be triaged before premium examples or advisory reliance.",
    added: [
      "Source freshness signals for stale sources, upcoming review, missing priority source and date-sensitive records",
      "Owner placeholders and source/threshold next actions in the Marquee launch review queue",
      "Premium-use blocked marker for records that need review before premium or advisory examples",
      "Smoke coverage for the source-governance queue"
    ],
    updated: ["Data Quality", "Marquee review queue", "Content review data", "Smoke tests", "Project documentation"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "sfdr", "csddd", "eudr", "california-sb253-sb261", "uk-sdr"],
    caveat: "Source-governance signals are editorial controls for review prioritisation. They do not verify legal completeness or determine entity-specific applicability."
  },
  {
    edition: "0.5.11 - May 2026",
    date: "2026-05-03",
    label: "Launch assets and commercial funnel",
    summary:
      "Added a public launch-resource workspace so outreach copy, LinkedIn drafts, advisory scan copy and premium-alert validation prompts can be copied directly from the site while preserving legal and commercial caveats.",
    added: [
      "/launch route for copyable launch resources",
      "Reusable launch asset library component",
      "Copy and draft-email actions for launch assets",
      "Navigation and CTA links from commercial pages into the launch workflow"
    ],
    updated: ["Plans", "Alerts preview", "Advisory page", "Premium roadmap", "Header navigation", "Project documentation"],
    records: ["homepage-commercial-strip", "linkedin-free-atlas", "direct-advisory-scan-email", "premium-alert-preview-email"],
    caveat: "Launch assets are manual commercial validation materials. They do not describe live paid subscriptions, production monitoring, automated alerts or legal advice."
  },
  {
    edition: "0.5.10 - May 2026",
    date: "2026-05-03",
    label: "Decision-readiness launch layer",
    summary:
      "Strengthened the assessment and regulation detail experience so users can see missing facts, next 30-day actions, suggested owners, threshold gaps, timing caveats and source-review warnings before turning Atlas output into a client or internal planning conversation.",
    added: [
      "Missing-facts output in the assessment engine",
      "Suggested owner and next 30-day action signals",
      "Decision cards for threshold, timing, enforcement and missing-data cues",
      "More complete copied assessment summaries with caveats"
    ],
    updated: ["Assessment wizard", "Regulation detail drawer", "Applicability scoring", "Project documentation"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "sfdr", "csddd", "eudr", "cbam", "california-sb253-sb261"],
    caveat: "Decision-readiness outputs are planning prompts only. They do not determine legal applicability and should be validated against entity-specific facts, primary sources and qualified advice."
  },
  {
    edition: "0.5.9 - May 2026",
    date: "2026-05-02",
    label: "Visible map and market coverage depth",
    summary:
      "Made the local Natural Earth country-outline map visible from tablet widths upward, strengthened border contrast, added a geometry failure fallback and expanded direct seed-record depth across under-covered markets.",
    added: [
      "Coverage target data model for deep-anchor, core-commercial and watch-expansion markets",
      "Market coverage depth panel on Data Quality",
      "Market-depth seed records for France, Germany, Norway, Hong Kong, South Korea, Taiwan, New Zealand, Malaysia, Indonesia, Thailand, Philippines and South Africa",
      "Additional direct records for California, India, Brazil, China, Japan, Switzerland and Turkey",
      "Playwright checks for visible country paths and map fallback behavior"
    ],
    updated: ["World choropleth map", "Data Quality", "Regulation seed data", "Smoke tests", "Project documentation"],
    records: ["france-duty-of-vigilance", "germany-lksg", "norway-transparency-act", "hong-kong-hkex-climate-disclosure", "new-zealand-climate-standards", "california-cap-and-invest", "brazil-sbce-emissions-trading"],
    caveat: "New market-depth records are illustrative seed intelligence and improve orientation coverage only. They are not complete local legal inventories and require primary-source review before client reliance."
  },
  {
    edition: "0.5.8 - May 2026",
    date: "2026-05-02",
    label: "Premium output and Marquee review governance",
    summary:
      "Made premium pack previews copyable and printable, then added a Marquee launch review queue to Data Quality so the highest-value regimes used in premium packs and advisory examples have visible content-governance status.",
    added: [
      "Copy and print actions for premium pack sample pages",
      "Marquee 10 and Marquee 25 launch review queue",
      "Content review data file for high-value launch regimes",
      "Visible review questions, premium-use mapping and launch-blocker labels"
    ],
    updated: ["Premium pack pages", "Data Quality", "Changelog", "Project documentation and Notion context"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "sfdr", "csddd", "eudr", "cbam", "california-sb253-sb261", "uk-sdr", "us-sec-climate-watch"],
    caveat: "The Marquee review queue is a content-governance tool. It does not verify legal completeness, determine applicability or replace primary-source review."
  },
  {
    edition: "0.5.7 - May 2026",
    date: "2026-05-02",
    label: "Premium pack and manual conversion follow-up",
    summary:
      "Added individual premium-pack preview pages, linked market packs from the premium roadmap, added advisory next steps to copied summaries and documented a no-dependency manual conversion tracking plan.",
    added: [
      "/premium-packs/[id] static premium pack detail pages",
      "Manual conversion tracking data model",
      "Manual conversion tracking documentation",
      "Advisory next-step language in copied jurisdiction and client summaries"
    ],
    updated: ["Premium roadmap", "Plans page", "Jurisdiction briefs", "Client planning summary export", "Project documentation"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "sfdr", "csddd", "eudr", "cbam"],
    caveat: "Premium pack pages are static sample scopes for validation only. No billing, gated content, analytics SDK, CRM sync, production alerts or legal advice functionality was added."
  },
  {
    edition: "0.5.6 - May 2026",
    date: "2026-05-02",
    label: "Commercial validation and premium-preview sprint",
    summary:
      "Added static commercialization surfaces for Free Atlas, Premium Intelligence previews and Advisory Atlas, plus alert previews, market-pack previews, advisory service pages, commercial CTAs and stronger source-trust framing.",
    added: [
      "/plans free/premium/advisory comparison",
      "/alerts static weekly and monthly digest previews",
      "/advisory manual service packages",
      "Commercial offer, alert digest, premium pack and launch asset data files",
      "Reusable commercial CTA component",
      "Regulation detail decision cards and advisory next-step CTA"
    ],
    updated: ["Premium roadmap", "Homepage launch strip", "Header navigation", "Data Quality", "Methodology", "Regulation detail pages", "Documentation and feature-request tracking"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "sfdr", "csddd", "eudr", "cbam", "california-sb253-sb261"],
    caveat: "Commercial pages are static validation surfaces only. No billing, authentication, production alerts, database, scraping, cron jobs or legal advice functionality was added."
  },
  {
    edition: "0.5.5 - May 2026",
    date: "2026-05-02",
    label: "Decision-support and launch-readiness polish",
    summary:
      "Upgraded assessment outputs, timeline milestones, data-quality review prioritisation, jurisdiction briefs and client planning summaries so the static MVP behaves more like a decision-support workspace for ESG advisory and compliance planning.",
    added: [
      "Assessment review priority, evidence-needed and source-to-verify explanations",
      "Quarter-level timeline milestones across consultation, effective, reporting, due-date and Atlas review events",
      "Review-queue scoring reasons for data-quality governance",
      "Jurisdiction brief readiness starters, watch items, evidence packages and market briefing CTA",
      "Client summary evidence, functions, source-coverage and priority-record detail"
    ],
    updated: ["Assessment wizard", "Timeline page", "Data quality page", "Briefing workspace", "Jurisdiction briefs", "Jurisdiction panel", "Project documentation"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "california-sb253-sb261", "malaysia-nsrf", "pcaf-financed-emissions"],
    caveat: "This release improves decision support and planning workflow only. It does not convert seed records into legal advice or verified compliance determinations."
  },
  {
    edition: "0.5.4 - May 2026",
    date: "2026-05-02",
    label: "Master content and commercial-readiness update",
    summary:
      "Added condensed parent-record metadata, expanded EU financial-services and APAC/ISSB coverage, added voluntary framework records, surfaced legal-force/client-relevance badges and introduced static market-pack and premium-roadmap CTAs.",
    added: [
      "Record type, legal force, client relevance, display tier and child-item metadata",
      "EU financial-services package records",
      "APAC ISSB market records and new jurisdiction tiles",
      "Voluntary framework records",
      "Static market briefing CTA and premium roadmap route"
    ],
    updated: ["Regulation filters", "Regulation table", "Regulation detail drawer", "Per-regulation pages", "Data-quality governance section", "Project documentation"],
    records: [
      "eu-banking-prudential-esg-risk",
      "eu-mifid-idd-sustainability-preferences",
      "eu-green-bond-standard",
      "malaysia-nsrf",
      "cdp-disclosure-framework",
      "pcaf-financed-emissions"
    ],
    caveat: "New records are condensed seed intelligence. Many are intentionally marked needs review until a production source review workflow validates dates, thresholds and jurisdiction-specific implementation."
  },
  {
    edition: "0.5.3 - May 2026",
    date: "2026-05-02",
    label: "Theme, map clarity and PM backlog update",
    summary:
      "Defaulted first-time visitors to light mode, improved dark-mode contrast, clarified the map legend and added a PM/ESG specialist backlog for the next three improvement waves.",
    added: ["Three-wave product improvement backlog", "Map interpretation guidance", "Dark-mode issue log entry"],
    updated: ["Theme initialization", "Dark-mode contrast tokens", "Map legend copy", "Project documentation"],
    records: [],
    caveat: "This update changes product experience and documentation; regulatory records remain illustrative seed intelligence."
  },
  {
    edition: "0.5.2 - May 2026",
    date: "2026-05-02",
    label: "Workflow, translation and coverage control update",
    summary:
      "Added launch-quality automation, broadened translated product chrome, expanded the seed dataset past 80 source-linked records and introduced a workbook-ready control file workflow.",
    added: ["GitHub Actions CI", "Playwright smoke tests", "Lighthouse CI", "PR preview checklist", "Phase 1C coverage records", "Regulation tracker workbook"],
    updated: ["Filter translations", "Table translations", "Map translations", "Country-outline rendering", "Development workflow documentation"],
    records: ["uk-secr", "uk-esos", "uk-ets", "uk-packaging-epr", "us-uflpa", "australia-nger-scheme", "india-brsr-core", "canada-osfi-b15"],
    caveat: "Phase 1C records are broader market coverage seed data and need production legal/source review before compliance reliance."
  },
  {
    edition: "0.5.1 - May 2026",
    date: "2026-05-02",
    label: "Market coverage and usability update",
    summary:
      "Expanded under-covered markets, improved country-outline legibility, added multilingual product chrome, shareable filtered views, CSV/JSON exports and readiness-priority scoring.",
    added: ["Market coverage records", "Language toggle", "Shareable filter URLs", "CSV and JSON exports", "Readiness planning score"],
    updated: ["World map contrast", "Regulation table", "Timeline grouping", "Comparison dimensions", "Data-quality review queue"],
    records: ["mexico-sustainable-taxonomy", "mexico-rene", "netherlands-energy-saving-obligation", "china-stock-exchange-sustainability-guidelines", "singapore-sgx-sustainability-reporting"],
    caveat: "New market records are seed intelligence and should be validated against local primary sources before client reliance."
  },
  {
    edition: "0.5 - May 2026",
    date: "2026-05-02",
    label: "Etica credibility update",
    summary:
      "Rebranded the Atlas to Etica ESG, added public operational pages, strengthened source-quality cues, and closed visible credibility gaps on the highest-traffic regulatory records.",
    added: ["Etica publisher metadata", "Citation widget", "Edition snapshot route", "Branded 404", "Persona assessment doorway", "Light and dark mode"],
    updated: ["EU record thresholds", "Penalty and enforcement copy", "ISSB record routing", "Map count logic", "Public docs and agent context"],
    records: ["csrd", "issb-s1-s2", "eudr", "cbam", "csddd"],
    caveat: "Records remain seed regulatory intelligence and should be source-reviewed before compliance reliance."
  },
  {
    edition: "0.4 - April 2026",
    date: "2026-04-30",
    label: "Source coverage update",
    summary:
      "Improved dataset cadence, source coverage, methodology framing, per-regulation routes and local Natural Earth map rendering.",
    added: ["Methodology route", "About route", "Per-regulation pages", "Natural Earth choropleth"],
    updated: ["Footer byline", "Dataset review dates", "ISO-style jurisdiction labels", "Source coverage indicators"],
    records: ["csrd", "eu-taxonomy", "sfdr", "california-sb253-sb261"],
    caveat: "Phase 1A operational primitives were still pending after this release."
  },
  {
    edition: "0.3 - April 2026",
    date: "2026-04-29",
    label: "Information architecture refactor",
    summary:
      "Moved heavy tools away from the map page and reorganized the MVP into Map, Regulations, Assessment, Timeline, Briefing and Methodology surfaces.",
    added: ["Dedicated assessment page", "Dedicated timeline page", "Briefing tabs", "Compact map workspace"],
    updated: ["Filter hierarchy", "Jurisdiction panel tabs", "Legal disclaimer placement", "Main navigation"],
    records: ["csrd", "issb-s1-s2", "uk-sdr"],
    caveat: "The site remained a static MVP with illustrative seed data."
  }
];
