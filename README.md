# Etica ESG · Regulatory Atlas

Interactive sustainability regulatory intelligence by jurisdiction, sector, value chain and reporting year.

Etica ESG · Regulatory Atlas is a static Next.js MVP for exploring ESG, climate, sustainable finance, supply-chain due diligence, biodiversity, product sustainability, corporate reporting and related sustainability regulation. It is designed for sustainability leaders, ESG consultants, legal and compliance teams, finance and controllership teams, investors, banks, insurers, procurement teams and board/risk committees.

Publisher: Etica ESG. Editor: Gabriel Gage. Contact: `gabriel@eticaesg.com`.

## Current Edition

The current public release context is `0.5.33 - May 2026`.

Latest release-context update:

- adds contextual glossary help to `/jurisdiction/[code]` and `/sectors/[slug]`
- clarifies that market and sector profile details combine seed records, readiness scores, source-confidence signals, timing cues and advisory prompts for triage only
- keeps profile-detail outputs as orientation only, not entity-specific applicability decisions, compliance determinations, official translations or source verification
- keeps `docs/current-release.md` current so future Codex and Claude sessions can quickly understand the latest launch-train state

The full public update log is available at `/changelog`. Release governance notes are in `docs/current-release.md` and `docs/qa-findings/pr-43-release-context-sync.md`.

## Important Disclaimer

This tool provides structured regulatory intelligence for orientation and planning purposes. It does not constitute legal advice, tax advice, investment advice or assurance advice. Applicability depends on entity-specific facts, jurisdictional transposition, sector rules, thresholds and legal interpretation. Users should validate requirements with qualified counsel or regulatory advisors before relying on the information for compliance decisions.

All records are illustrative seed data unless independently verified through a production research workflow.

## MVP Scope

The MVP is intentionally static, transparent and Vercel-simple:

- Next.js, React, TypeScript and Tailwind v3
- stable Tailwind/PostCSS v3 setup for Vercel deployment
- static TypeScript seed data only
- local Natural Earth country geometry, no paid map API and no Mapbox token
- interactive map with visible country outlines, untracked-country styling, pan/zoom/reset controls and geometry fallback
- market profiles at `/markets` and `/jurisdiction/[code]` with tracked-coverage and detail-level glossary handoffs
- sector profiles at `/sectors` and `/sectors/[slug]` with tagged-record and detail-level glossary handoffs
- regulation database and regulation detail pages
- public glossary and contextual label-help surfaces
- assessment wizard with cautious indicative categories and glossary handoff
- timeline with date-label glossary handoff
- briefing workspace with copied-output glossary handoff
- methodology, data-quality and comparison surfaces with side-by-side glossary handoff
- printable/copyable jurisdiction briefs
- citation copy blocks and edition snapshot routes
- light/dark mode toggle and first-visit light mode default
- English, Spanish, Dutch, French, German and Portuguese interface chrome
- shareable filtered URLs and CSV/JSON exports
- source quality, data quality, confidence, caveat and review-risk indicators
- commercial validation pages for plans, alerts, advisory, launch assets and premium roadmap
- GitHub Actions CI, Playwright smoke tests, Lighthouse CI and PR preview checklist

The MVP does not include authentication, Supabase, external databases, Stripe, checkout, billing, paid APIs, Mapbox, scraping, cron jobs, production email alerts, AI legal summaries, client workspaces or required environment variables.

## Main Routes

- Map workspace: `/`
- Regulations: `/regulations`
- Regulation detail: `/regulations/[slug]`
- Glossary: `/glossary`
- Assessment: `/assessment`
- Timeline: `/timeline`
- Briefing: `/briefing`
- Data Quality: `/data-quality`
- Compare: `/compare`, `/compare?jurisdictions=EUU,GBR`, `/compare?ids=csrd,issb-s1-s2`
- Markets: `/markets`, `/jurisdiction/[code]`
- Sectors: `/sectors`, `/sectors/[slug]`
- Jurisdiction brief: `/jurisdiction/[code]/brief`
- Plans: `/plans`
- Alerts preview: `/alerts`
- Advisory: `/advisory`
- Launch assets: `/launch`
- Premium roadmap: `/premium-roadmap`
- Methodology: `/methodology`
- Changelog: `/changelog`
- About: `/about`

## Local Setup

```bash
npm install
npm run dev
npm run lint
npm run build
npm run test:e2e
npm run lhci
```

Open `http://localhost:3000`.

## Deployment

Deploy on Vercel with the default Next.js settings. The MVP does not require environment variables.

If a deployed URL shows `401 Unauthorized`, check Vercel Project Settings -> Deployment Protection. For client demos, production should usually be public while preview deployments can remain protected.

Do not add app-level authentication to solve a Vercel dashboard protection setting.

## Tailwind/PostCSS Strategy

This project intentionally uses the stable Tailwind v3 path:

- `tailwindcss ^3.4.17`
- `postcss ^8.5.10`
- `autoprefixer ^10.4.20`
- `postcss.config.mjs` uses `tailwindcss` and `autoprefixer`
- `app/globals.css` starts with `@tailwind base`, `@tailwind components`, `@tailwind utilities`

The original deployment failure was caused by an inconsistent Tailwind/PostCSS setup where Tailwind was loaded as a PostCSS plugin in a way incompatible with the installed Tailwind version. The MVP keeps one consistent v3 configuration.

## Data Structure

Core static data lives in `data/`:

- `_meta.ts`
- `changelog.ts` and `changelogRecent.ts`
- `regulations.ts`, `coverageAdditions.ts`, `marketCoverage.ts`, `marketDepthAdditions.ts`, `phase1cCoverage.ts`, `masterUpdateAdditions.ts`
- `jurisdictions.ts`, `sectors.ts`, `taxonomy.ts`
- `coverageTargets.ts`, `contentReview.ts`
- `glossary.ts`, `glossaryGuides.ts`
- `commercialOffers.ts`, `alertDigests.ts`, `premiumPacks.ts`, `launchAssets.ts`, `conversionTracking.ts`
- `personaPresets.ts`

Shared regulation types live in `types/regulation.ts`. Filtering and applicability logic live in `lib/filters.ts` and `lib/applicability.ts`. Market and sector aggregation live in `lib/marketProfile.ts` and `lib/sectorProfile.ts`. Readiness, source governance, review workflow, URL filters and translations live under `lib/`.

## Project Guidance

Use these files to brief future coding agents, reviewers and collaborators:

- `AGENTS.md`: repo-specific operating instructions for Codex, Claude and future agents
- `ESG_Regulatory_Atlas_Claude_Handoff.md`: implementation handoff and technical context
- `docs/current-release.md`: latest release context and launch-train state
- `docs/product-brief.md`: product purpose, users, workflow and success criteria
- `docs/roadmap.md`: phase boundaries and recommended next improvements
- `docs/data-methodology.md`: seed data structure, source hierarchy and review workflow
- `docs/legal-safeguards.md`: approved legal wording, disclaimers and caution rules
- `docs/regulatory-taxonomy.md`: canonical topics, sectors, value-chain labels and statuses
- `docs/development-workflow.md`: working process, validation steps and documentation update rules
- `docs/issue-resolution-log.md`: resolved bugs, failed checks, root causes, fixes and prevention rules
- `docs/product-improvement-backlog.md`: prioritized PM/ESG specialist improvement backlog
- `docs/feature-request-tracking.md`: feature request schema, scoring rubric and research intake process
- `docs/notion-update-plan.md`: Notion-ready launch sprint updates, ADRs and task plan
- `docs/conversion-tracking-plan.md`: no-dependency manual tracking process for commercial interest

## Agent Workflow Rule

When making meaningful updates, keep the context files current. Future Codex or Claude runs should not need to rediscover product state, build strategy, data methodology, legal wording or shipped routes from scratch.

If a change affects how the product works, how it is validated, how data is structured, or how legal risk is managed, update the relevant documentation in the same pass.

When fixing a bug, failed deployment, failed GitHub check, visible product defect or platform issue, identify the root cause, deploy the smallest durable fix, validate it, and add a note to `docs/issue-resolution-log.md` or a focused QA note under `docs/qa-findings/`.

## Adding A Regulation

Add a typed record to the appropriate static data file. At minimum include:

- `id`, `title`, `shortName`
- jurisdiction fields and `jurisdictionIds`
- issuing body, status and adoption level
- topics, sectors, value-chain coverage and affected functions
- summary, applicability, key requirements and business impact
- business impact tags and advisory opportunities
- source URLs
- latest update, last reviewed, confidence and data quality status
- caveats where the record has uncertainty

Use careful language such as "may apply", "potentially relevant" and "indicative" rather than definitive legal conclusions.

## Adding A Jurisdiction

Add a record to `data/jurisdictions.ts` with:

- `id`, `name`, region and type
- canonical display code, such as `USA`, `CAN`, `EUU` or `USA-CA`
- map coordinates where available
- regulatory intensity
- executive summary

Then reference the jurisdiction `id` from regulation records.

## Known Limitations

- Seed data is illustrative and not legal advice.
- Source verification needs a production research workflow with named owners and review cadence.
- The world map uses simplified Natural Earth polygons suitable for MVP choropleth display, not production GIS analysis.
- No authentication yet.
- No database yet.
- No automated regulatory update monitoring yet.
- No email alerts yet.
- No payment integration yet.
- No legal opinion or definitive applicability determination.

## Phase 2 Roadmap

Do not implement these in the MVP without an explicit follow-up decision:

- Supabase or another database
- admin editing interface
- authentication and client workspaces
- regulatory monitoring workflow
- source review and legal review workflow
- email alerts
- AI-generated summaries
- PDF export
- Stripe paid plans
