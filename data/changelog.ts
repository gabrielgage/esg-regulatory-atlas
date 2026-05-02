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
