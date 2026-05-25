# Etica ESG · Regulatory Atlas

Interactive sustainability regulatory intelligence by jurisdiction, sector, value chain and reporting year.

Etica ESG · Regulatory Atlas is a static Next.js MVP for exploring ESG, climate, sustainable finance, supply-chain due diligence, biodiversity, product sustainability, corporate reporting and related sustainability regulation. It is designed for sustainability leaders, ESG consultants, legal and compliance teams, finance and controllership teams, investors, banks, insurers, procurement teams and board/risk committees.

Publisher: Etica ESG. Editor: Gabriel Gage. Contact: `gabriel@eticaesg.com`.

## Current Edition

The current public release context is `0.5.63 - May 2026`.

Latest release-context update:

- clarifies that the language selector changes interface guidance, not official legal translations
- preserves the sector finder simplification from `0.5.62`
- preserves the reusable advisory-scan CTA from `0.5.61`
- keeps advisory scan requests as mailto-only, source-linked planning paths with legal caveats
- preserves the search-first Regulations workspace from `0.5.60`
- preserves the decision-first assessment overview from `0.5.59`
- preserves the simplified public navigation from `0.5.58`: Start, Assessment, Markets, Regulations, Advisory and grouped More
- keeps `/launch` noindex and internal-facing, while preserving market obligation footprints, trigger reviews, assessment readiness and source-review handoffs from prior releases
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
- interactive map with visible country outlines, explicit untracked-country key, stronger map contrast, pan/zoom/reset controls and geometry fallback
- market profiles at `/markets` and `/jurisdiction/[code]` with tracked-coverage and detail-level glossary handoffs
- market trigger reviews on jurisdiction profiles for corporate reporting, climate, sustainable finance, supply-chain, product/trade and source-review signals
- market obligation footprints on jurisdiction profiles for business-impact categories, likely owner functions, evidence starters and first actions
- searchable sector finder at `/sectors`, plus sector profiles at `/sectors/[slug]` with tagged-record and detail-level glossary handoffs
- six-lane value-chain workspace for supplier, trade/import, product/claim, portfolio, operations and customer-pressure triage
- regulation database and regulation detail pages
- search-first Regulations workspace with secondary role-lens, comparison, label-help and export tools
- threshold matrix for high-value scope signals, facts to confirm and source-review status
- public glossary and contextual label-help surfaces
- daily launch pulse for latest release context and next product-review focus
- assessment wizard with cautious indicative categories and glossary handoff
- assessment shortlist overview with top records, relevance mix, facts to confirm and first 30-day actions
- assessment trigger review explaining jurisdiction, company, sector, value-chain, financial and source/threshold signals
- assessment readiness plan with threshold-fact, first-action and owner-function prompts
- timeline with planning-horizon tabs and date-label glossary handoff
- scenario-led briefing workspace with copied-output glossary handoff
- methodology, data-quality and comparison surfaces with side-by-side glossary handoff
- printable/copyable jurisdiction briefs and copied profile summaries with source-review caveats
- CSV/JSON regulation exports with edition metadata, caveat fields and source-review notes
- source review memo, citation and decision-readiness copy blocks with edition metadata and legal-caution caveats
- regulation-level 30/60/90-day implementation roadmaps with copyable caveated output
- light/dark mode toggle and first-visit light mode default
- English, Spanish, Dutch, French, German and Portuguese interface chrome, including map coverage guidance
- shareable filtered URLs and CSV/JSON exports
- source quality, data quality, confidence, caveat and review-risk indicators
- quality-signal explainers for source links, review prompts, record counts and confidence labels
- Marquee 10 source-review packet for premium-use blockers, priority sources, threshold facts and owner actions
- simplified plans page for Free Atlas, advisory scan and secondary premium/enterprise validation paths
- commercial preview pages for alerts, advisory, internal launch assets and premium roadmap
- manual request guidance on commercial and advisory routes with mailto-only conversion paths
- reusable advisory-scan CTA used by market, assessment and regulation-detail surfaces
- GitHub Actions CI, Playwright smoke tests, Lighthouse CI and PR preview checklist with Node 24 action-runtime readiness

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
- Threshold matrix: `/thresholds`
- Compare: `/compare`, `/compare?jurisdictions=EUU,GBR`, `/compare?ids=csrd,issb-s1-s2`
- Markets: `/markets`, `/jurisdiction/[code]`
- Sectors: `/sectors`, `/sectors/[slug]`
- Value-chain exposure: `/value-chain` with six business-exposure lanes and copyable evidence-planning summaries
- Jurisdiction brief: `/jurisdiction/[code]/brief`
- Plans: `/plans` with Free Atlas and advisory scan as the primary live paths
- Alerts preview: `/alerts`
- Advisory: `/advisory`
- Launch assets: `/launch` (internal operator route, noindex, not linked from public navigation)
- Premium roadmap: `/premium-roadmap`
- Methodology: `/methodology`
- Changelog: `/changelog`
- About: `/about`

## Local Setup

```bash
npm install
npm run dev
npm run lint
npm run check:data
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
- `dailyUpdates.ts`
- `personaPresets.ts`

Shared regulation types live in `types/regulation.ts`. Filtering and applicability logic live in `lib/filters.ts` and `lib/applicability.ts`. Market, sector and value-chain aggregation live in `lib/marketProfile.ts`, `lib/sectorProfile.ts` and `lib/valueChainProfile.ts`. Readiness, source governance, review workflow, URL filters and translations live under `lib/`.

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
- `docs/ai-review/ESG_Regulatory_Atlas_AI_Review_Export_2026-05-20.md`: deep current-state export for external AI or expert review
- `docs/ai-review/AI_Reviewer_Feedback_Prompt.md`: prompt to request structured, critical feedback from another AI
- `docs/ai-review/Future_Capabilities_Deep_Review_Backlog.md`: current-versus-future capability roadmap for deeper review
- `docs/ai-review/Regulatory_Coverage_Review_Worksheet.md`: structured market and regulation coverage review worksheet
- `docs/ai-review/Regulatory_Coverage_Review_Worksheet.csv`: spreadsheet-ready coverage review template
- `docs/ai-review/Review_Feedback_Intake_Template.md`: template for routing external review findings into issue logs, coverage review, backlog or future capability planning

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
