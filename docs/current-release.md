# Current Release Context

## Current Edition

`0.5.81 - June 2026`

Publisher: Etica ESG. Editor: Gabriel Gage. Contact: `gabriel@eticaesg.com`.

## Latest Release Context

The latest release context captures the launch-train simplification work through copyable sector exposure briefs, copyable market obligation footprints, copyable market quick starts, the copyable owner matrix, copyable owner briefs, drawer-level action memos, regulation action memos, regulation-detail owner handoffs and the internal owner workbench. The public app metadata now reports `0.5.81 - June 2026`; this file should remain aligned with `DATASET_META.edition`, the README and the public changelog.

### 0.5.81 - Copyable Sector Exposure Brief

- Upgraded the sector starting point Markdown export into a copyable sector exposure brief.
- The copied brief now includes edition metadata, direct versus broad sector record counts, tracked market signals, priority records, source-to-verify prompts, source-review watch items, exposure themes, likely owner functions, evidence starters and first 30-day actions.
- Renamed the page action to `Copy sector brief` so users understand the output before copying it.
- Added smoke coverage for the sector brief copy control on `/sectors/financial-services`.
- Kept the brief framed as current tracked seed intelligence, not a complete sector legal inventory, source verification or entity-specific applicability determination.

### 0.5.80 - Copyable Market Obligation Footprint

- Added a copyable obligation-footprint output to jurisdiction market profiles.
- Reused the existing `marketObligationMarkdown` generator so copied outputs include obligation categories, matched records, likely owners, evidence starters, first actions and caveats.
- Added smoke coverage for the market obligation footprint copy control on `/jurisdiction/euu`.
- Kept footprints framed as derived seed-record planning intelligence, not legal applicability, entity-specific duties, enforcement exposure or complete jurisdiction coverage.

### 0.5.79 - Copyable Market Quick Starts

- Added copyable market quick-start outputs to jurisdiction market profiles.
- Added a copyable quick-start index to `/markets` for the core market playbooks.
- The copied outputs include edition metadata, planning questions, first 30-day actions, evidence starter packs, likely owner functions, watch items, advisory prompts and legal-caution caveats.
- Added smoke coverage for the quick-start copy controls on `/markets` and `/jurisdiction/euu`.
- Kept quick starts framed as indicative seed-data planning aids, not legal applicability, complete market coverage, source verification or formal compliance responsibility.

### 0.5.78 - Copyable Owner Matrix

- Added a copyable full owner matrix to `/functions`.
- The copied matrix includes edition metadata, priority owner lanes, first actions, evidence focus, priority records, source-review prompt counts and a legal-caution caveat.
- Kept the UI compact by placing the matrix copy action in the Priority owner lanes header.
- Added smoke coverage for the copy owner matrix control.
- Kept the matrix framed as indicative seed-data planning intelligence, not formal legal accountability or entity-specific applicability determination.

### 0.5.77 - Copyable Owner Briefs

- Added copyable Markdown owner briefs to `/functions`.
- Reused the existing `businessFunctionMarkdown` generator so copied owner briefs include priority records, first actions, evidence focus, review prompts, source/caveat context and legal-caution language.
- Added owner-brief copy controls to each function lane alongside the filtered database handoff.
- Added smoke coverage for the copy owner brief controls.
- Kept owner briefs framed as indicative seed-data planning aids, not formal legal accountability assignments or entity-specific applicability determinations.

### 0.5.76 - Drawer Action Memo

- Added compact mode to `components/RegulationActionMemo.tsx` for smaller drawer use.
- Added a compact action memo to `components/RegulationDetail.tsx`, the map/table regulation drawer.
- Lets users copy facts to confirm, first 30-day actions and source-to-verify prompts without leaving the main map workspace.
- Added smoke coverage for opening a priority record card and verifying the drawer action memo.
- Kept the memo framed as an indicative planning aid, not legal applicability, source completeness, formal accountability, deadlines or compliance obligations.

### 0.5.75 - Regulation Action Memo

- Added `components/RegulationActionMemo.tsx` for copyable regulation-level planning summaries.
- Added the memo after the owner handoff flow on regulation detail pages.
- Summarizes facts to confirm, first 30-day actions, likely evidence, suggested owner lanes, source to verify first and related scoping records.
- Preserves a legal-caution caveat in the visible panel and copied output.
- Extended smoke coverage for `/regulations/csrd` to verify the memo and copy action are present.

### 0.5.74 - Regulation Owner Handoff

- Added `components/OwnerHandoffPanel.tsx` for regulation-level owner planning.
- Added the owner handoff panel to regulation detail pages so a selected record points to likely owner lanes, evidence focus, first actions and source-review prompts.
- Linked detail pages to `/functions` and to filtered regulation database views by business function.
- Kept the panel framed as indicative seed intelligence, not formal legal accountability, source verification or an applicability determination.

### 0.5.73 - Internal Owner Workbench

- Added `/functions` as a planning workspace for likely internal owner functions.
- Added static business-function playbooks for Sustainability, Finance, Legal, Compliance, Procurement, Risk, Internal audit and Board users.
- Added `lib/businessFunctionProfile.ts` to aggregate affected-function metadata into owner profiles, priority records, evidence focus, first actions and source-review prompts.
- Added the route to the More menu under Planning views.
- Kept the workbench framed as a seed-data planning aid, not an assignment of formal legal accountability or an applicability determination.

### 0.5.72 - Data Quality Maturity Distribution

- Added `components/MaturityDistributionPanel.tsx` to show current maturity counts across the static seed dataset.
- Surfaced the panel in the Data Quality quality-signal area while keeping compact market-page quality guidance unchanged.
- Split records into in-force, first-reporting, transitional, adopted, consultation, paused, voluntary and monitor categories.
- Added summary counts for operating/phased records and watch/uncertain records.
- Kept the panel framed as source-governance and planning context, not legal applicability, enforceability or complete coverage.

### 0.5.71 - Regulatory Maturity Planning Layer

- Added `lib/regulatoryMaturity.ts` to derive maturity labels from existing status, legal-force and display-tier metadata.
- Added `components/RegulatoryMaturityPanel.tsx` for regulation detail pages and drawers.
- Added planning-use, facts-to-verify and caution prompts for consultation, adopted, transitional, first-reporting, in-force, paused, voluntary and monitor-stage records.
- Added data guardrail coverage so every seed record resolves to a complete maturity label.
- Added smoke coverage for maturity context on regulation detail pages.

## Current Product State

The Atlas is a static, source-linked, legally cautious MVP. It includes:

- map-centered market discovery with local Natural Earth geometry, visible country outlines, pan/zoom/reset controls and untracked-country context;
- searchable regulation records, market profiles, sector profiles with copyable exposure briefs, value-chain lanes, business-function owner lanes, timeline, assessment, briefing and Data Quality surfaces;
- source quality, data quality, confidence, caveat, review-risk and maturity indicators;
- decision-support surfaces for threshold facts, assessment triggers, market triggers, market obligation footprints, owner-function evidence planning, regulation owner handoffs, regulation action memos, drawer action memos and regulation implementation roadmaps;
- copyable and printable outputs that preserve edition metadata and legal-caution caveats;
- public commercial validation surfaces for plans, alerts, advisory, premium roadmap and manual advisory scan requests;
- multilingual interface chrome for English, Spanish, Dutch, French, German and Portuguese, with regulatory records still treated as source-linked seed intelligence rather than official legal translations.

## Current Technical State

- Next.js, React, TypeScript and Tailwind v3.
- Static TypeScript seed data only.
- No database, authentication, user accounts, Supabase, Stripe, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables.
- Vercel deployment remains the target runtime.
- GitHub Actions CI, data guardrails, Playwright smoke checks and Lighthouse remain the validation envelope.

## Legal And Product Caveat

The Atlas provides structured regulatory intelligence for orientation, triage, planning and advisory scoping. It is not legal advice, tax advice, investment advice, assurance advice, source verification, official translation, complete market coverage or a definitive applicability determination. Users should validate requirements with qualified counsel or regulatory advisors before relying on the information for compliance decisions.

## Release Sync Rule

After every connector-published product PR, verify these surfaces are aligned before starting the next feature branch:

- `data/_meta.ts`
- `README.md`
- `docs/current-release.md`
- public changelog data (`data/changelog.ts`, `data/changelogLatest.ts` or related changelog source)
- `docs/issue-resolution-log.md` or a focused QA note when a bug, failed check or context drift was fixed

## Recent History Pointer

The full public update trail is available at `/changelog`. Older release details from `0.5.70` and earlier remain in the public changelog data and related QA notes under `docs/qa-findings/`.
