import type { ChangelogEntry } from "./changelog";

export const LATEST_CHANGELOG: ChangelogEntry[] = [
  {
    edition: "0.5.81 - June 2026",
    date: "2026-06-25",
    label: "Copyable sector exposure brief",
    summary:
      "Upgraded sector starting point exports into copyable sector exposure briefs with edition metadata, priority records, market signals, source-review prompts, evidence needs and cautious first actions.",
    added: [
      "Copy sector brief action on sector detail pages",
      "Sector exposure Markdown with source-to-verify prompts and review watchlist",
      "Smoke coverage for the sector brief copy control"
    ],
    updated: [
      "Sector starting point pages",
      "Sector profile Markdown generator",
      "Current release metadata",
      "README and current release documentation"
    ],
    records: ["csrd", "issb-s1-s2", "eudr", "california-sb253-sb261", "uk-sdr"],
    caveat:
      "Sector exposure briefs are derived from tracked seed records and broad all-sector context. They are not complete sector legal inventories, source verification or entity-specific applicability determinations."
  },
  {
    edition: "0.5.80 - June 2026",
    date: "2026-06-04",
    label: "Copyable market obligation footprint",
    summary:
      "Added a direct copy action for market obligation footprints so users can reuse jurisdiction-level obligation, owner and evidence summaries in planning notes.",
    added: [
      "Copy footprint action on jurisdiction market profiles",
      "Reuse of the existing `marketObligationMarkdown` generator",
      "Smoke coverage for the obligation-footprint copy control"
    ],
    updated: [
      "Market obligation matrix",
      "Current release metadata",
      "README and current release documentation"
    ],
    records: ["csrd", "issb-s1-s2", "eudr", "california-sb253-sb261", "eu-taxonomy"],
    caveat:
      "Market obligation footprints are derived from tracked seed records. They do not determine legal applicability, entity-specific duties, enforcement exposure or complete jurisdiction coverage."
  },
  {
    edition: "0.5.79 - June 2026",
    date: "2026-06-04",
    label: "Copyable market quick starts",
    summary:
      "Added copyable market quick-start playbooks so jurisdiction planning prompts can be reused in client notes, internal triage and advisory scoping.",
    added: [
      "Copy quick start action on jurisdiction market profiles",
      "Copy quick-start index action on `/markets`",
      "Markdown outputs with edition metadata, first actions, evidence starter packs, owner functions, watch items and caveats",
      "Smoke coverage for market quick-start copy controls"
    ],
    updated: [
      "Market quick-start component",
      "Current release metadata",
      "README and current release documentation"
    ],
    records: ["csrd", "issb-s1-s2", "eudr", "california-sb253-sb261", "uk-sdr"],
    caveat:
      "Market quick starts are indicative seed-data planning aids. They do not determine legal applicability, complete market coverage, source verification or formal compliance responsibilities."
  },
  {
    edition: "0.5.78 - June 2026",
    date: "2026-06-04",
    label: "Copyable owner matrix",
    summary:
      "Added a copyable full owner matrix to the internal owner workbench so users can lift all function lanes into one caveated planning memo.",
    added: [
      "Copy owner matrix action on `/functions`",
      "Owner-matrix Markdown output with edition metadata and caveat",
      "Smoke coverage for the owner-matrix copy control"
    ],
    updated: [
      "Internal owner workbench",
      "Current release metadata",
      "README and current release documentation"
    ],
    records: ["csrd", "issb-s1-s2", "eudr", "california-sb253-sb261", "eu-taxonomy"],
    caveat:
      "The owner matrix is indicative seed-data planning intelligence. It does not assign formal legal accountability, determine entity-specific applicability or replace source review by legal and regulatory advisors."
  },
  {
    edition: "0.5.77 - June 2026",
    date: "2026-06-04",
    label: "Copyable owner briefs",
    summary:
      "Added copyable Markdown owner briefs to the internal owner workbench so sustainability, finance, legal, procurement and other function lanes can be reused in advisory planning without leaving the page.",
    added: [
      "Copy owner brief actions on `/functions`",
      "Reuse of the existing `businessFunctionMarkdown` generator",
      "Smoke coverage for owner-brief copy controls",
      "June release metadata update"
    ],
    updated: [
      "Internal owner workbench",
      "Current release metadata",
      "README and current release documentation"
    ],
    records: ["csrd", "issb-s1-s2", "eudr", "california-sb253-sb261", "eu-taxonomy"],
    caveat:
      "Owner briefs are indicative seed-data planning aids. They do not assign formal legal accountability, determine entity-specific applicability or replace source review by legal and regulatory advisors."
  },
  {
    edition: "0.5.76 - June 2026",
    date: "2026-06-02",
    label: "Drawer action memo",
    summary:
      "Added a compact action memo inside the map-workspace regulation drawer so users can copy facts to confirm, first actions and source-to-verify prompts without leaving the map flow.",
    added: [
      "Compact mode for `RegulationActionMemo`",
      "Drawer-level action memo in `RegulationDetail`",
      "Smoke coverage for opening a priority record and seeing the drawer action memo",
      "June release metadata update"
    ],
    updated: [
      "Map workspace regulation drawer",
      "Current release metadata",
      "README and current release documentation"
    ],
    records: ["csrd", "issb-s1-s2", "eudr", "california-sb253-sb261", "eu-taxonomy"],
    caveat:
      "Drawer action memos are indicative planning aids. They do not determine legal applicability, source completeness, formal accountability, deadlines or compliance obligations for any entity."
  },
  {
    edition: "0.5.75 - May 2026",
    date: "2026-05-28",
    label: "Regulation action memo",
    summary:
      "Added a copyable regulation action memo that turns a selected seed record into facts to confirm, first 30-day actions, likely evidence, owner lanes and source-to-verify prompts.",
    added: [
      "Reusable `RegulationActionMemo` component for decision-ready record summaries",
      "Copyable action memo output with legal-caution caveat preserved",
      "Facts-to-confirm and source-to-verify prompts on regulation detail pages",
      "Smoke coverage for the action memo on CSRD"
    ],
    updated: [
      "Regulation detail owner handoff flow",
      "Current release metadata",
      "README and current release documentation"
    ],
    records: ["csrd", "issb-s1-s2", "eudr", "california-sb253-sb261", "eu-taxonomy"],
    caveat:
      "Action memos are indicative planning aids. They do not determine legal applicability, source completeness, formal accountability, deadlines or compliance obligations for any entity."
  },
  {
    edition: "0.5.74 - May 2026",
    date: "2026-05-28",
    label: "Regulation owner handoff",
    summary:
      "Added a regulation-detail owner handoff panel that translates a selected record into likely internal owner lanes, first actions, evidence focus and source-review prompts linked to the owner workbench.",
    added: [
      "Reusable `OwnerHandoffPanel` component for regulation-level owner planning",
      "Owner workbench links from regulation detail pages",
      "Function-filter handoff from a regulation to the searchable database",
      "Smoke coverage for owner handoff visibility and workbench links on CSRD"
    ],
    updated: [
      "Regulation detail decision context",
      "Current release metadata",
      "README and current release documentation"
    ],
    records: ["csrd", "issb-s1-s2", "eudr", "california-sb253-sb261", "eu-taxonomy"],
    caveat:
      "Owner handoff panels are indicative seed-data planning aids. They do not assign formal legal accountability, determine entity-specific applicability or replace source review by legal and regulatory advisors."
  },
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
