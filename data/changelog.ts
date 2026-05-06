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
    edition: "0.5.20 - May 2026",
    date: "2026-05-07",
    label: "Map workspace redesign and pan/zoom controls",
    summary:
      "Refreshed the homepage into a calmer map-first workspace and upgraded the SVG map so untracked countries, country outlines, ocean background, zoom controls and drag-to-pan behavior are visible from tablet widths upward.",
    added: [
      "No-dependency map zoom, reset and drag-to-pan controls",
      "Visible ocean background and untracked-country land styling",
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
