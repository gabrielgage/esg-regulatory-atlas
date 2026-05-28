# Current Release Context

## Current Edition

`0.5.75 - May 2026`

Publisher: Etica ESG. Editor: Gabriel Gage. Contact: `gabriel@eticaesg.com`.

## Latest Release Context

The latest release context captures the launch-train simplification work through regulation action memos, regulation-detail owner handoffs and the internal owner workbench. The public app metadata now reports `0.5.75 - May 2026`; this file should remain aligned with `DATASET_META.edition`, the README and the public changelog.

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
- searchable regulation records, market profiles, sector profiles, value-chain lanes, business-function owner lanes, timeline, assessment, briefing and Data Quality surfaces;
- source quality, data quality, confidence, caveat, review-risk and maturity indicators;
- decision-support surfaces for threshold facts, assessment triggers, market triggers, market obligation footprints, owner-function evidence planning, regulation owner handoffs, regulation action memos and regulation implementation roadmaps;
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
