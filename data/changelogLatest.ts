import type { ChangelogEntry } from "./changelog";

export const LATEST_CHANGELOG: ChangelogEntry[] = [
  {
    edition: "0.5.73 - May 2026",
    date: "2026-05-28",
    label: "Internal owner workbench",
    summary:
      "Added a business-function workbench so users can translate tracked ESG regulatory records into likely owner functions, evidence focus areas, first actions and source-review prompts.",
    added: [
      "Owner workbench route at `/functions`",
      "Business-function playbooks for sustainability, finance, legal, compliance, procurement, risk, internal audit and board users",
      "Static owner-profile aggregation from regulation affected-function metadata",
      "Smoke coverage for owner cards, evidence focus, database handoff and advisory request path"
    ],
    updated: [
      "Planning navigation via the More menu",
      "Release metadata",
      "Current release context documentation"
    ],
    records: ["csrd", "issb-s1-s2", "eudr", "california-sb253-sb261", "eu-taxonomy"],
    caveat:
      "Owner workbench cards are seed-data planning aids. They do not assign formal legal accountability, determine entity-specific applicability or replace source review by legal and regulatory advisors."
  },
  {
    edition: "0.5.72 - May 2026",
    date: "2026-05-28",
    label: "Data Quality maturity distribution",
    summary:
      "Added a Data Quality maturity distribution view so source reviewers can distinguish operative, transitional, proposed, voluntary and monitor-stage seed records before treating them as planning inputs.",
    added: [
      "Maturity distribution panel on the Data Quality signal explainer",
      "Counts and percentages for each derived maturity status",
      "Non-compact-only rendering so market-page quality signals stay concise",
      "Dataset metadata bump to 0.5.72"
    ],
    updated: [
      "Data Quality source-governance workspace",
      "Quality signal interpretation",
      "Release context documentation"
    ],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "tnfd", "us-sec-climate-watch"],
    caveat:
      "Maturity distribution is derived from seed metadata. It is a planning and source-governance signal, not a legal conclusion about applicability, enforceability or complete market coverage."
  },
  {
    edition: "0.5.71 - May 2026",
    date: "2026-05-27",
    label: "Regulatory maturity planning layer",
    summary:
      "Added a derived maturity panel to regulation detail surfaces so users can distinguish consultation, adopted, transitional, first-reporting, in-force, voluntary and monitor-stage records before planning next actions.",
    added: [
      "Regulatory maturity derivation from existing status, legal-force and display-tier metadata",
      "Regulatory maturity panel on regulation detail pages and drawers",
      "Data guardrail coverage for maturity labels across all seed records",
      "Smoke coverage for maturity context on regulation detail pages"
    ],
    updated: [
      "Regulation detail decision context",
      "Release context documentation",
      "Product backlog status for the maturity-axis item"
    ],
    records: ["csrd", "issb-s1-s2", "us-sec-climate-watch", "tnfd", "california-sb253-sb261"],
    caveat:
      "Maturity labels are derived planning aids. They do not determine legal applicability, enforceability, timing, source verification or complete market coverage."
  }
];
