# Etica ESG · Regulatory Atlas Agent Guide

This file is the operating manual for Codex, Claude, and any future coding agents working on Etica ESG · Regulatory Atlas.

## Product Mission

Etica ESG · Regulatory Atlas is a static, deployable regulatory intelligence MVP for sustainability, ESG, climate, sustainable finance, supply chain due diligence, biodiversity, product sustainability, and corporate reporting regulation.

The product helps sustainability leaders, ESG consultants, legal and compliance teams, finance teams, investors, banks, insurers, procurement teams, and board/risk committees orient themselves across jurisdictions, sectors, value chain exposure, and reporting years.

The product is not a legal advice tool. It provides structured orientation and planning intelligence only.

## Non-Negotiable Boundaries

Do not add the following unless the project owner explicitly changes scope:

- Stripe, checkout, billing, subscriptions, pricing tiers, payment SDKs, webhooks, or payment environment variables
- Supabase or other external databases
- Authentication, user accounts, workspaces, or role-based access control
- Paid APIs, Mapbox, paid map services, or token-based map providers
- Required environment variables
- Scraping, cron jobs, email alerts, external monitoring jobs, or production AI summaries
- Definitive legal advice, compliance determinations, or guaranteed applicability language

The MVP should remain static, transparent, lightweight, low-cost, and easy to deploy on Vercel.

## Technical Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v3
- Static TypeScript data under `data/`
- Shared domain types under `types/`
- Pure client or server-rendered components as appropriate
- Static map assets under `public/`

The Tailwind/PostCSS setup intentionally uses the stable Tailwind v3 path:

- `tailwindcss`
- `postcss`
- `autoprefixer`
- `postcss.config.mjs` with `tailwindcss` and `autoprefixer`
- `app/globals.css` beginning with `@tailwind base`, `@tailwind components`, and `@tailwind utilities`

Do not mix Tailwind v3 and v4 conventions.

## Core Commands

Use these checks before proposing or publishing changes:

```bash
npm install
npm run lint
npm run build
```

The project build script intentionally uses the stable webpack build path: `next build --webpack`.

If the default Turbopack build or a local dev server is blocked by sandbox port-binding restrictions, document the exact failure and still run TypeScript validation plus `npm run build`.

Do not run standalone `tsc --noEmit` in parallel with `next build`; Next regenerates `.next/types` during build and parallel checks can create false missing-file errors.

## Continuous Context Rule

Every meaningful product, data, architecture, workflow, or validation change should leave the repo easier for the next agent or reviewer to understand.

When changing the app, also consider whether to update:

- `README.md` for setup, scope, routes, commands, deployment or current edition changes
- `ESG_Regulatory_Atlas_Claude_Handoff.md` for implementation state, validation results and known tradeoffs
- `docs/product-brief.md` for product positioning, workflow or user-facing capability changes
- `docs/roadmap.md` when a planned item is delivered, deferred or replaced
- `docs/data-methodology.md` when data fields, confidence rules, review cadence or source workflow changes
- `docs/legal-safeguards.md` when wording, disclaimers, assessment categories or export/copy behavior changes
- `docs/regulatory-taxonomy.md` when topics, sectors, statuses, value-chain labels or company-type labels change
- `docs/development-workflow.md` when a process, validation command, handoff step or agent workflow becomes clearer
- `docs/issue-resolution-log.md` when a bug, failed check, failed deployment, visible product defect or platform issue is investigated and resolved
- `docs/product-improvement-backlog.md` when PM/ESG roadmap priorities, waves or product-review findings change

Current coverage-governance convention:

- `data/coverageTargets.ts` and `components/CoverageDepthPanel.tsx` track whether each market has enough direct seed-record depth for a credible profile.
- `lib/coverageConfidence.ts` and `components/CoverageConfidencePanel.tsx` track whether current records are priority-source backed, high-confidence, current and low-risk enough for premium examples or advisory use.
- Treat both as internal readiness signals. They are not legal verification, complete market coverage or applicability determinations.

Current decision-readiness convention:

- `lib/decisionReadiness.ts` centralizes facts-to-confirm, evidence-package, first-30-day-action, source-review-step and commercial-use-gate logic.
- `components/DecisionReadinessChecklist.tsx` and `components/MarqueeEvidenceGate.tsx` surface those controls on regulation details and Data Quality.
- Treat these outputs as governance prompts for review and advisory scoping. They are not legal verification, premium certification or applicability determinations.

Current source-evidence convention:

- `lib/sourceGovernance.ts` centralizes source posture, freshness, priority-source selection, source-review packets and copyable source-review memo text.
- `components/SourceEvidencePanel.tsx` surfaces source evidence on regulation detail pages and drawers.
- Treat source evidence trails as QA and governance aids. They are not legal verification, official translation, source completeness certification or applicability determinations.

Current review-workflow export convention:

- `lib/reviewWorkflow.ts` centralizes reviewer-ready rows, priority scoring, CSV/JSON export content and copyable priority packets.
- `components/ReviewWorkflowExportPanel.tsx` surfaces those exports on `/data-quality`.
- Treat review workflow exports as operational QA trackers for Notion, spreadsheets or advisory prep. They are not legal opinions, official translations, source verification or compliance determinations.

Current AI review-pack convention:

- `docs/ai-review/ESG_Regulatory_Atlas_AI_Review_Export_2026-05-20.md` gives external reviewers current product context.
- `docs/ai-review/AI_Reviewer_Feedback_Prompt.md` is the preferred prompt when asking Claude, ChatGPT or another reviewer for structured critique.
- `docs/ai-review/Future_Capabilities_Deep_Review_Backlog.md` separates static launch-safe improvements from future platform capabilities.
- `docs/ai-review/Regulatory_Coverage_Review_Worksheet.md` and `.csv` are the preferred templates for market and regulation coverage review.
- `docs/ai-review/Review_Feedback_Intake_Template.md` is the preferred template for turning external feedback into routed implementation or review work.
- `data/reviewIntake.ts` and `components/ExternalReviewIntakePanel.tsx` surface the intake routing workflow on `/data-quality`.
- Treat AI/expert review outputs as product QA, content QA and source-governance input. They are not legal opinions, source verification, official translations, compliance determinations or complete-coverage certification.

Current navigation convention:

- Keep the header focused on the main discovery path: Start, Assessment, Markets, Regulations and Advisory.
- Put secondary or supporting surfaces such as Sectors, Timeline, Briefing, Value chain, Thresholds, Methodology, Data Quality, Glossary, Changelog, Plans, Alerts and Premium Roadmap in the grouped More menu unless a future user test shows they need primary placement.
- Keep Launch resources internal/noindex and out of public navigation.
- When adding a new route, decide whether it belongs in primary navigation, More, a route-specific CTA or documentation. Do not add every new route as a visible top-level header item.

Current assessment convention:

- Keep `/assessment` decision-first: profile summary, shortlist overview, top records, facts to confirm, first 30-day actions and advisory scan CTA should appear before detailed trigger logic.
- Detailed trigger cards, readiness plans and dense result cards should support the overview rather than replace it.
- Do not turn assessment ranking into legal applicability, confirmed thresholds, client-ready compliance scope or definitive deadline language.

Current regulations convention:

- Keep `/regulations` search-first: the first workspace should expose search, jurisdiction, topic, sector, company type and reporting year before secondary tools.
- Put role lenses, compare, glossary help, share and export controls below the result table unless user testing shows a stronger need above results.
- Do not add dense role presets, commercial CTAs, governance panels or export utilities above the primary filters.
- Keep regulation detail navigation, source-quality indicators, export caveats and legal-safety wording intact when changing the database layout.

Current sectors convention:

- Keep `/sectors` as a searchable sector finder, not an aggregate dashboard.
- Use `lib/sectorGroups.ts` for business-context grouping and `components/SectorDirectory.tsx` for the index UI.
- Sector cards should emphasize trigger summaries, review-first records, source cues and assessment handoff before dense topic/market chips.
- Sector counts must stay caveated as current seed coverage, not complete sector legal inventory, official source verification or applicability determination.

Current advisory CTA convention:

- Use `components/AdvisoryScanCTA.tsx` for manual exposure-scan, market-briefing, assessment-review and regulation-review CTAs.
- Keep `components/MarketBriefingCTA.tsx` as a wrapper for market, sector, value-chain, briefing and jurisdiction pages that need market-scan wording.
- Do not create new one-off mailto CTAs for advisory scans unless the route genuinely needs a separate commercial motion.
- Advisory CTAs must remain mailto-only and caveated as source-linked planning outputs, not legal opinions, official source verification, automated delivery or applicability determinations.

Do not update docs mechanically for trivial typo fixes. Do update them when a future agent would otherwise need to rediscover context.

## Issue Resolution Rule

When a bug or failed check appears, do not guess and do not patch around it blindly.

Use this sequence:

1. Separate symptom from root cause.
2. Confirm whether the app, deployment, CI check, browser test, Lighthouse check or platform setting actually failed.
3. Inspect the relevant logs, route output or browser behavior.
4. Fix the smallest responsible layer.
5. Re-run the closest available validation.
6. Record the issue, root cause, fix and prevention rule in `docs/issue-resolution-log.md`.

Example: on 2026-05-02, PR #11 deployed successfully on Vercel but GitHub checks failed. The root causes were a brittle Playwright heading assertion and an overly strict Lighthouse preset, not a Vercel deployment failure. The fix is documented in the issue log so future agents do not repeat it.

## Architecture Map

Primary folders:

- `app/`: Next.js routes, layouts, and page composition
- `components/`: UI and product workflow components
- `data/`: static jurisdiction, regulation, sector, taxonomy, and metadata records
- `lib/`: filtering, applicability, formatting, scoring, and utility logic
- `types/`: shared TypeScript domain types
- `public/`: static assets, including local map data
- `docs/`: product, methodology, legal, taxonomy, and roadmap documentation

Prefer keeping regulatory data out of UI components. Components should render data, not define the regulatory dataset.

Use `data/marketCoverage.ts` or `data/phase1cCoverage.ts` for additive country-market records that broaden MVP coverage while remaining clearly labelled as seed intelligence. Use `data/masterUpdateAdditions.ts` for the master content expansion layer: condensed EU financial-services parent records, APAC/ISSB market expansion, voluntary frameworks and enrichment metadata for existing parent records. Use `data/regulations.ts` for core canonical records and `data/coverageAdditions.ts` for broader framework/content additions from prior phases.

Current important routes:

- `/`: map workspace
- `/markets`: jurisdiction market profile index
- `/jurisdiction/[code]`: jurisdiction market profile
- `/sectors`: sector starting point index
- `/sectors/[slug]`: sector profile page
- `/value-chain`: six-lane value-chain exposure workspace for supplier, trade/import, product/claim, portfolio/finance, operations/governance and customer-pressure triage
- `/regulations`: searchable regulation database
- `/regulations/[slug]`: per-regulation detail route
- `/assessment`: indicative applicability wizard
- `/timeline`: milestone and reporting-year view
- `/briefing`: priority, sector heatmap, advisory, data-risk and client-summary workspace
- `/data-quality`: source library, coverage matrix and review-risk governance view
- `/compare`: two-jurisdiction comparison
- `/compare?jurisdictions=EUU,GBR`: explicit jurisdiction comparison URL
- `/compare?ids=csrd,issb-s1-s2`: regulation record comparison URL
- `/jurisdiction/[code]/brief`: printable/copyable jurisdiction brief
- `/edition/0.5/regulations/[slug]`: current static edition snapshot route
- `/methodology`: methodology and source-quality explanation surface
- `/changelog`: public update log
- `/about`: product, author and trend context
- `/premium-roadmap`: static future commercial roadmap with no gating, Stripe, auth or database
- `/premium-packs/[id]`: static premium pack sample scopes with no gating, billing or account system
- `/plans`: static current-path page that prioritizes Free Atlas and Advisory Atlas, with Premium Intelligence and Enterprise/API Future secondary
- `/alerts`: static premium alert and watchlist preview with no email backend
- `/advisory`: static advisory service surface for manual scans and briefings
- `/launch`: static launch-resource workspace for caveated outreach copy

Use `lib/marketProfile.ts` for jurisdiction profile aggregation and `lib/sectorProfile.ts` for sector profile aggregation. Use `lib/valueChainProfile.ts` for value-chain exposure aggregation and lane definitions. Do not hardcode regulatory records inside route components when an existing regulation field can drive the output.
Keep `/value-chain` lane-first and practical: start from business exposure, evidence prompts, first actions and suggested owners. Keep outputs as evidence-planning aids, not applicability determinations or complete value-chain legal coverage.

Persona starting points live in `data/personaPresets.ts` and are rendered on `/regulations`. Keep them as static orientation filters with cautious first-question and first-action prompts. Do not turn them into saved user profiles without explicit approval for authentication and database scope.

Current brand context:

- Publisher: Etica ESG
- Editor: Gabriel Gage
- Contact: `gabriel@eticaesg.com`
- Publisher URL: `https://eticaesg.com`
- LinkedIn: `https://www.linkedin.com/in/gabrielgage/`
- Temporary logo assets are in `public/etica-esg-logo.svg`, `public/favicon.svg`, and `public/og-image.svg`
- The global theme toggle lives in `components/ThemeToggle.tsx`; it persists `etica-theme` in local storage and uses Tailwind `darkMode: "class"`
- First-time visitors should default to light mode. Respect a saved user choice after the user explicitly toggles the theme.
- The language toggle lives in `components/LanguageToggle.tsx` and `components/LanguageProvider.tsx`; supported interface languages are English, Spanish, Dutch, French, German and Portuguese.
- Translations live in `lib/i18n.ts`. Product chrome, filters, table controls and map guidance should use translation keys. Do not imply that the regulatory records themselves are legally translated; the current implementation translates product guidance and leaves source-linked regulatory record content in English.

## Product Experience Principles

The main user journey is:

Map -> select jurisdiction or view -> filter by sector, company type, value chain, and reporting year -> inspect relevant regulations -> review sources and caveats -> plan advisory or compliance next steps.

Design should feel:

- Institutional
- Calm
- High trust
- Scan friendly
- Premium SaaS, not playful
- Useful to an ESG consultant or regulatory team in a client meeting

Avoid turning the home page into a long catalogue of every feature. The map should remain the main workspace, with heavier assessment, timeline, methodology, commercial, launch and briefing surfaces separated into dedicated pages.

## Regulatory Data Rules

Every regulation record should include, where feasible:

- Stable `id`
- Title and short name
- Atlas record type, legal force, display tier, granularity, aliases and child items where relevant
- Client relevance category and market maturity score where useful for planning
- Jurisdiction and jurisdiction IDs
- `transposedJurisdictionIds` where an EU or parent-level rule is relevant to a jurisdiction but should not inflate direct map counts
- Issuing body
- Legal instrument type
- Status and adoption level
- Topics, sectors, company types, value chain coverage, and business functions
- Applicability summary and caveats
- Obligations and business impact
- Required actions and evidence required
- Advisory opportunities
- Source URLs with source type
- Last reviewed date
- Confidence level
- Data quality status
- Change log summary or latest update

All records are illustrative seed data unless independently verified through a production research workflow.

Follow the condensation rule: major regimes and frameworks should usually be one parent record. ESRS, GRI, ISSB/SASB, SFDR, EU Taxonomy, CDP, PCAF, SBTi, PRI, ICMA, ISO, EU banking prudential ESG risk, EU insurance ESG risk and MiFID/IDD sustainability preferences should not be exploded into dozens of top-level records. Use child items, aliases, milestones and source notes instead.

For map counts, distinguish direct jurisdiction records from parent or transposed exposure. EU rules can inform a Netherlands profile, but they should not make the Netherlands appear to have more direct records than the EU bloc.

## Source Quality Rules

Prefer source hierarchy in this order:

1. Primary law or regulation
2. Regulator guidance
3. Official consultation
4. Standard setter material
5. Government announcement
6. Recognised professional body
7. Secondary commentary
8. Internal analysis

Do not present secondary commentary as equivalent to primary law. If a source is missing or uncertain, mark the record accordingly.

## Legal Language Rules

Use careful wording:

- "may apply"
- "potentially relevant"
- "indicative"
- "subject to thresholds"
- "confirm entity-specific applicability"
- "review primary sources"
- "validate with qualified counsel or regulatory advisors"

Avoid definitive wording:

- "this applies to your company"
- "you must comply"
- "guaranteed requirement"
- "legal determination"
- "complete regulatory coverage"
- "verified legal advice"

The assessment wizard should use safer categories:

- Potentially directly relevant
- Potentially indirectly relevant
- Relevant through investors or customers
- Monitor only

## Map Rules

The map must remain deployable without paid services:

- Use local static assets or lightweight dependency-free rendering
- Do not add Mapbox, paid tokens, runtime geography APIs, or external map calls
- Keep jurisdiction IDs and visible jurisdiction labels consistent
- Do not confuse regulatory intensity with regulatory status
- Keep country outlines, untracked countries and ocean background visibly legible. The current map uses locally bundled Natural Earth Admin 0 geometry, stronger borders, untracked-land styling, pan/zoom/reset controls and a subtle graticule without adding map dependencies.
- Verify visible SVG country paths, untracked-country paths and viewport controls at tablet and desktop widths when touching map code; checking only the outer map container is not enough.
- Do not point the map index back to tracked-only geometry if the UI claims untracked or no-data countries are visible.

Recommended distinction:

- Map fill = intensity or record density
- Badge, border, or legend indicator = status or selected view relevance

## Pull Request Checklist

When creating a local branch for user-assisted GitHub Desktop publishing, do not leave it tracking `origin/main`. Use `git switch --no-track -c codex/<topic> origin/main` or run `git branch --unset-upstream`, then confirm `git status --short --branch` does not show `...origin/main` before asking the user to publish.

Before opening a PR, verify:

- TypeScript passes
- Build passes or a sandbox-specific limitation is documented
- No required environment variables were added
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, or email alerts were added
- The disclaimer remains visible
- Data is still labelled as illustrative seed intelligence where appropriate
- Source quality and caveats remain visible
- Filters and jurisdiction selection still work
- Empty states do not crash
- The README or docs are updated for meaningful architecture or workflow changes
- The public changelog or handoff is updated when the product edition, shipped route set or data methodology changes
- `docs/issue-resolution-log.md` is updated when the PR fixes a bug, failing check, failed deployment, visible product defect or workflow incident
- `git diff --check` passes
- Search checks confirm old personal/Gmail framing is not present in app code

## Preferred Phase Boundaries

Phase 1 may improve static product depth, such as better timelines, source review status, richer jurisdiction pages, CSV/JSON export, comparison enhancements and more complete source-reviewed data.

Already delivered in Phase 1B: market coverage additions, language toggle, shareable filtered views, CSV/JSON export, readiness scoring, grouped timeline and expanded comparison fields.

Already delivered in Phase 1C: GitHub Actions CI, Playwright smoke tests, Lighthouse CI, PR preview checklist, broader interface translation coverage, 80+ seed records through `data/phase1cCoverage.ts`, stronger map outlines and a workbook-backed regulation tracker workflow.

Already delivered in Phase 1D: master data model metadata, record type/legal force/client relevance filters and badges, condensed EU financial-services records, APAC/ISSB market expansion, voluntary framework records, source-of-truth governance language, static market briefing CTA and `/premium-roadmap`.

Already delivered in Phase 1E: assessment explanations with review priority, evidence needs, functions involved and source-to-verify guidance; quarter-level timeline milestones across consultation, effective, reporting, due-date and source-review events; data-quality review scoring reasons; richer jurisdiction briefs with 30-day readiness starters, watch items and evidence packages; improved client summary copy.

Already delivered in Phase 1F: `/plans`, `/alerts`, `/advisory`, commercial offer data, alert digest previews, premium market-pack previews, launch asset seeds, reusable commercial CTA, stronger premium roadmap and source-trust copy. These are static validation surfaces only; no billing, auth, database, email backend, scraping, cron or paid APIs were added.

Already delivered in Phase 1G: `/premium-packs/[id]` sample pages, manual conversion tracking data/docs, manual validation signals on `/plans`, and advisory next-step text in copied client/jurisdiction summaries. These are still static validation surfaces only; no analytics SDK, cookies, CRM sync, billing events, database, accounts or automated email were added.

Already delivered in Phase 1H: copyable/printable premium pack briefs and a Marquee launch review queue on `/data-quality` backed by `data/contentReview.ts`. Treat the review queue as editorial/source-governance support only, not legal verification.

Already delivered in Phase 1I: tablet-and-desktop country-outline map visibility, map geometry fallback, coverage-depth targets in `data/coverageTargets.ts`, a Data Quality coverage-depth panel and direct market-depth seed records in `data/marketDepthAdditions.ts`. Treat coverage targets as product QA controls, not complete legal inventory claims.

Already delivered in Phase 1J: assessment missing-facts prompts, suggested owners, next 30-day actions and regulation-detail decision cards. Treat these as planning prompts only, not applicability conclusions.

Already delivered in Phase 1K: `/launch` and `components/LaunchAssetLibrary.tsx` render copyable launch assets from `data/launchAssets.ts`. Treat launch assets as manual commercial-validation material only; copied text must preserve caveats and must not imply live paid subscriptions, automated alerts or production monitoring.

Already delivered in Phase 1L: Data Quality source freshness signals and Marquee review owner/action/premium-blocker controls. Treat these as editorial source-governance signals only, not legal verification, source certification or complete review.

Already delivered in Phase 1S: Data Quality review workflow exports backed by `lib/reviewWorkflow.ts`. Treat exported CSV/JSON rows and copied priority packets as operational source QA aids only.

The `/data-quality` page is now tabbed into Overview, Sources, Coverage and Review Workflow. Add future governance surfaces to the relevant tab instead of appending another full-width panel to the default view.

Already delivered in Phase 1T: homepage map-workspace refresh and no-dependency SVG map pan/zoom/reset controls. Keep `/` map-first and route non-map commercial or governance surfaces to dedicated pages.

Already delivered in Phase 1M: `/markets` and `/jurisdiction/[code]` market profile pages. Treat market profiles as current tracked seed coverage and planning context, not complete local legal inventories or applicability determinations.

Phase 2 may introduce a database, admin editing, authentication, client workspaces, regulatory monitoring workflows, source review workflows, and AI-assisted summaries, but only after explicit scope approval.

Phase 3 may introduce commercial packaging and paid plans, including Stripe, but Stripe remains out of scope until explicitly requested.
