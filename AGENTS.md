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

Avoid turning the home page into a long catalogue of every feature. The map should remain the main workspace, with heavier assessment, timeline, methodology, and briefing surfaces separated into dedicated pages.

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
- Keep country outlines visibly legible. The current map uses local Natural Earth geometry, stronger borders and a subtle graticule without adding map dependencies.

Recommended distinction:

- Map fill = intensity or record density
- Badge, border, or legend indicator = status or selected view relevance

## Pull Request Checklist

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

Phase 2 may introduce a database, admin editing, authentication, client workspaces, regulatory monitoring workflows, source review workflows, and AI-assisted summaries, but only after explicit scope approval.

Phase 3 may introduce commercial packaging and paid plans, including Stripe, but Stripe remains out of scope until explicitly requested.
