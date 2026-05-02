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
