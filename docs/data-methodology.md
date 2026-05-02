# Data Methodology

## Purpose

The data layer provides structured seed regulatory intelligence for orientation and planning. It is not a complete legal database and should not be presented as definitive regulatory coverage.

The methodology is designed to make uncertainty visible, keep the product legally cautious, and make future data review easier.

## Data Storage

The MVP stores data in static TypeScript files:

- `data/regulations.ts`
- `data/coverageAdditions.ts`
- `data/marketCoverage.ts`
- `data/phase1cCoverage.ts`
- `data/masterUpdateAdditions.ts`
- `data/commercialOffers.ts`
- `data/alertDigests.ts`
- `data/premiumPacks.ts`
- `data/launchAssets.ts`
- `data/jurisdictions.ts`
- `data/sectors.ts`
- `data/taxonomy.ts`
- `data/_meta.ts`

Shared domain types live in:

- `types/regulation.ts`

Filtering and applicability logic lives in:

- `lib/filters.ts`
- `lib/applicability.ts`
- `lib/scoring.ts`
- `lib/urlFilters.ts`
- `lib/i18n.ts`

Do not hardcode regulatory records inside UI components.

Use `data/marketCoverage.ts` and `data/phase1cCoverage.ts` for additive market-depth records that broaden the MVP's jurisdiction coverage. These records should usually be marked `needs_review`, `date_uncertain`, or `verified_seed` depending on source maturity, and should not imply complete local legal coverage.

Use `data/masterUpdateAdditions.ts` for the master-pack expansion layer. This file contains condensed EU financial-services parent records, APAC/ISSB market expansion records, voluntary and investor/customer-driven framework records, and enrichment metadata for existing parent records such as CSRD, ESRS, SFDR, EU Taxonomy, CSDDD, EUDR, EU Batteries and ISSB.

Do not duplicate an existing top-level record when a child item, alias or milestone is enough.

The external regulation tracker workbook should mirror the website seed data and add review workflow fields such as owner, review priority, source status, website inclusion, next review date and notes. Treat the workbook as a planning and QA control file, not as a separate legal source of truth.

Commercial data files support static offer, alert, premium pack and launch asset previews. They are product and go-to-market data, not legal source-of-truth files.

## Source Hierarchy

Use the strongest available source for each claim.

Preferred hierarchy:

1. Primary law or regulation
2. Regulator guidance
3. Official consultation
4. Standard setter material
5. Government announcement
6. Recognised professional body
7. Secondary commentary
8. Internal analysis

Primary source links should be visually prioritized where possible.

Internal research, Seneca/Drive materials, competitor claims and founder hypotheses can inform product positioning, UX, feature requests and monetization tests. They must not be cited as legal authority for regulatory status, thresholds, penalties, applicability or deadlines.

## Required Record Metadata

Each regulation record should include:

- Stable ID
- Title
- Short name
- Jurisdiction and jurisdiction IDs
- Transposed or inherited jurisdiction IDs where relevant
- Jurisdiction type
- Legal instrument type
- Atlas record type
- Legal force
- Display tier
- Atlas granularity
- Parent record ID where relevant
- Aliases
- Child items
- Source system
- Client relevance category
- Market maturity score
- Monetization tier
- Issuing body
- Status
- Adoption level where relevant
- Topics
- Sectors
- Company types
- Value chain coverage
- Business functions
- Applicability summary
- Key requirements
- Business impact
- Required actions
- Evidence required
- Advisory opportunities
- Source URLs
- Latest update or change log summary
- Last reviewed date
- Next review date where feasible
- Confidence level
- Data quality status
- Caveats

## Jurisdiction Counting Method

Use `jurisdictionIds` for direct record ownership. These IDs drive direct map counts and primary jurisdiction filters.

Use `transposedJurisdictionIds` for cases where a parent-level or supranational rule is relevant to a national profile but should not inflate that national jurisdiction's direct record count.

Example:

- CSRD is an EU-level record with `jurisdictionIds: ["eu"]`.
- It can include `transposedJurisdictionIds: ["nl"]` so Netherlands can show EU exposure context.
- The Netherlands map count should not exceed the EU count because every EU rule was also counted as Dutch law.

## Condensed Parent-Record Rule

The Atlas is a decision-support product, not a raw standards catalogue. Major laws, regimes and frameworks should normally be one parent record.

Use child items, aliases, milestones and source notes for subrules, delegated acts, sector modules, questionnaires and indicators.

Examples:

- Keep one `ESRS` record. ESRS 1, ESRS 2, E1-E5, S1-S4 and G1 are child metadata.
- Keep one `ISSB IFRS S1/S2` record. SASB sector guidance is alias or child metadata.
- Keep one `SFDR` record. RTS, PAI indicators and Article 6/8/9 concepts are child metadata.
- Keep one `EU Taxonomy` record. Delegated acts, DNSH and sector criteria are child metadata.
- Keep one `CDP` record. Climate, water, forests, plastics and SME questionnaires are child modules.
- Keep one `PCAF` record. Asset-class methods are child details.
- Keep one `EU Banking ESG Risk` record. EBA, ECB, Pillar 3 and scenario-analysis items are child details.

Create separate top-level records only when a regime creates a distinct user decision, market lens, source owner or implementation workflow.

## Client Relevance Categories

Use client relevance categories to avoid implying legal certainty:

- `potentially-direct`: may create a direct obligation where thresholds, role or listing status are met.
- `potentially-indirect`: may matter through value-chain, procurement, product, permitting or market exposure.
- `investor-or-customer-driven`: likely relevant through investors, lenders, customers, procurement, ratings or capital-market expectations.
- `voluntary-best-practice`: voluntary framework that may support governance, reporting, evidence or transition planning.
- `monitor-only`: important to watch, but not currently a priority without specific facts or market exposure.

## Confidence Levels

Use confidence to describe the reliability and completeness of the record, not the importance of the regulation.

### High

Use when primary sources are available, dates are clear, and the summary has been reviewed against the cited source.

### Medium

Use when the record has credible sources but may need review for jurisdiction-specific implementation, thresholds, phase-in detail, or recent updates.

### Low

Use when the record is based on limited information, secondary sources, evolving proposals, or uncertain implementation timelines.

## Data Quality Status

Use consistent status labels.

### Verified

The record has primary or official source support and has been reviewed recently.

### Needs Review

The record may be directionally useful but needs source, date, applicability, or wording review.

### Source Missing

The record lacks a sufficient primary or official source.

### Date Uncertain

The record includes effective dates, reporting years, consultation deadlines, or phase-in timing that needs confirmation.

### Seed Data

The record is included for MVP demonstration and should not be treated as production-verified.

## Review Cadence

Recommended review cadence:

- High-impact in-force regulation: every 90 days
- Proposed or consultation-stage regulation: every 30 to 60 days
- Voluntary frameworks and standards: every 180 days
- Records marked needs review, source missing, or date uncertain: prioritize before client use

The Data Quality page now surfaces a prioritized review queue that considers data-quality status, missing sources, missing primary/regulator/standard-setter sources, high-impact flags, upcoming review dates, confidence flags, changing statuses and core mandatory records. Each review queue item should show visible reason chips so researchers know why the record needs attention.

## Premium And Alert Preview Governance

Premium alert previews and market-pack previews should use the same source hierarchy and caveats as the Free Atlas.

Before using a record in a premium example:

1. Confirm the record has a source URL or mark it clearly as needing review.
2. Prefer primary, regulator or standard-setter sources.
3. Check last-reviewed and next-review dates.
4. Do not imply automated monitoring is live.
5. Include a caveat that alerts and packs are static previews or advisory-supported outputs unless a later phase explicitly implements production operations.
6. Treat source-missing, date-uncertain and needs-review records as review priorities before client reliance.

## Adding A Regulation

When adding a regulation:

1. Confirm the regulation belongs in the MVP scope.
2. Add or reuse taxonomy labels from `data/taxonomy.ts`.
3. Add source URLs with source type.
4. Write cautious summaries and applicability language.
5. Add business impacts, affected functions, required actions, and evidence required.
6. Add advisory opportunities if relevant.
7. Add confidence and data quality status.
8. Add caveats for threshold uncertainty, implementation uncertainty, or source limitations.
9. Verify filters and detail views still render.
10. If the record broadens market coverage, add a changelog or handoff note so future reviewers understand why the record was introduced.
11. Regenerate or update the regulation tracker workbook when a coverage expansion changes the website seed data.

## Planning Scores

`lib/scoring.ts` provides an indicative readiness-priority score. It is based on status, timing, obligation breadth, high-impact classification, source count and review uncertainty.

The score is not legal applicability logic. It is only a planning signal for triage, advisory scoping and readiness conversations.

## Updating A Regulation

When updating a regulation:

1. Preserve the stable ID unless a controlled migration is planned.
2. Update source metadata and last reviewed date.
3. Update change log summary.
4. Reconsider confidence and data quality status.
5. Check whether taxonomy labels still match the record.
6. Confirm no UI filter breaks due to a new label.
7. If the update changes visible coverage, update `data/_meta.ts`, `/changelog` copy and the handoff document where appropriate.

## Applicability Method

The assessment wizard is an orientation tool. It should classify records into cautious categories based on static rules, such as jurisdiction exposure, company type, sector, financial institution status, EU market exposure, supplier exposure, or portfolio exposure.

Approved output categories:

- Potentially directly relevant
- Potentially indirectly relevant
- Relevant through investors or customers
- Monitor only

The wizard must explain why a record appears and should direct users to sources and qualified advisors for confirmation. Current outputs include trigger reasons, review priority, first actions, evidence to start collecting, functions involved, source to verify and a source-quality note. These are planning aids, not legal conclusions.

## Production Research Workflow Recommendation

Before using this product for client-facing regulated decisions, create a production research workflow with:

- Named data owners
- Source review checklist
- Legal review checklist
- Date and threshold verification
- Version history
- Change approval
- Jurisdiction review cadence
- Clear escalation path for uncertain records

## Context Maintenance

When data methodology changes, update:

- `types/regulation.ts`
- `docs/data-methodology.md`
- `docs/regulatory-taxonomy.md` if labels change
- `docs/legal-safeguards.md` if wording or applicability categories change
- `ESG_Regulatory_Atlas_Claude_Handoff.md` if the change affects current implementation state
