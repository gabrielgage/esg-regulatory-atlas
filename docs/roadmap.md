# Roadmap

This roadmap separates what belongs in the static MVP from later product phases. Do not implement later-phase items unless the project owner explicitly expands scope.

## Current MVP

The current MVP should remain:

- Static
- Vercel deployable
- Free of required environment variables
- Free of paid APIs
- Free of authentication
- Free of external databases
- Legally cautious
- Source-linked
- Useful for initial ESG regulatory orientation

Current capability areas:

- Interactive regulatory map
- Jurisdiction profiles
- Filterable regulation table
- Regulation detail view
- Assessment wizard
- Timeline view
- Methodology and data quality surfaces
- Consulting-oriented advisory opportunities
- Business impact and obligation tags
- Public changelog
- Jurisdiction and regulation comparison
- Printable and copyable jurisdiction briefs
- Citation copy blocks and edition snapshot routes
- Persona doorway presets in the assessment wizard
- Light/dark mode toggle
- Multilingual interface chrome for English, Spanish, Dutch, French, German and Portuguese
- Shareable filtered Map and Regulations URLs
- Filtered CSV and JSON regulation exports
- Readiness-priority scoring on records
- GitHub Actions CI, Playwright smoke tests, Lighthouse CI and PR preview checklist
- Workbook-backed regulation tracker for coverage and review planning
- Sector heatmap in the briefing workspace
- Copyable assessment shortlist
- First-visit light mode default with a saved explicit dark-mode preference
- Condensed parent-record model with record type, legal force, client relevance, aliases and child items
- EU financial-services regulatory lens covering banking, insurance, MiFID/IDD, AIFMD/UCITS, benchmarks, EuGBS, ESG ratings and ESAP
- APAC/ISSB coverage expansion including Hong Kong, South Korea, Taiwan, New Zealand, Malaysia, Indonesia, Thailand and Philippines
- Voluntary framework coverage for CDP, SBTi, PCAF, PRI, ICMA, GRESB, IFC/Equator/World Bank safeguards and ISO environmental/GHG standards
- Static market briefing CTA and premium roadmap page without payments, authentication or gated data
- `/plans` commercial architecture page for Free Atlas, Premium Intelligence previews, Advisory Atlas and Enterprise/API Future
- `/alerts` static alert preview page with weekly/monthly sample digests and watchlist concepts
- `/advisory` service page for manual exposure scans, custom watchlists, portfolio/supplier maps and briefing packs
- `/launch` launch-resource workspace with copyable LinkedIn, email, direct-outreach, advisory and premium-preview assets
- Concrete premium market-pack previews in `/premium-roadmap`
- Assessment outputs with review priority, explanation triggers, evidence needs, functions involved and source-to-verify guidance
- Assessment outputs with missing facts, suggested owners and next 30-day actions
- Regulation detail decision cards for threshold gaps, timing caveats, enforcement cues and missing data
- Quarter-level milestone timeline covering consultation, effective-date, reporting-year, report-due and Atlas review events
- Review-queue scoring in the data-quality dashboard with visible reasons for source and confidence follow-up
- Source freshness signals and Marquee owner/action controls for premium/advisory review readiness
- Market coverage-depth targets and Data Quality panel for direct records per jurisdiction
- Tablet-and-desktop Natural Earth country-outline map with stronger visual contrast and geometry fallback
- Jurisdiction briefs with readiness starters, watch items, evidence packages and source-backed priority-record counts
- PM/ESG specialist improvement backlog across three waves in `docs/product-improvement-backlog.md`
- Static seed data

## Recently Delivered Phase 1L Items

- Updated dataset metadata and changelog to `0.5.12 - May 2026`.
- Added Data Quality source freshness signals for stale sources, upcoming review, missing primary/regulator/standard-setter sources and date-sensitive records.
- Extended the Marquee launch review data model with optional owner, source-review action, threshold-review action and premium-use blocker fields.
- Surfaced owner placeholders, next actions and premium-use blocked labels in the Marquee review queue.
- Added Playwright smoke coverage for the Data Quality source-governance queue.

## Recently Delivered Phase 1K Items

- Updated dataset metadata and changelog to `0.5.11 - May 2026`.
- Added `/launch` as a public launch-operator page for copyable commercial validation assets.
- Added `components/LaunchAssetLibrary.tsx` to render `data/launchAssets.ts` with copy and draft-email actions.
- Linked Plans, Alerts, Advisory and Premium Roadmap CTAs into the launch workflow.
- Kept launch conversion manual through mailto subjects, static copy and caveats; no analytics, CRM sync, email backend, billing, accounts or database were added.

## Recently Delivered Phase 1J Items

- Updated dataset metadata and changelog to `0.5.10 - May 2026`.
- Extended the assessment engine with missing facts, next steps and suggested owner signals.
- Upgraded the assessment result cards and copied shortlist output with evidence, source-to-verify, missing facts, next 30-day action and caveats.
- Added regulation-detail decision cards for thresholds, timing uncertainty, enforcement or penalty cues, related regimes and missing decision data.
- Kept the new outputs as planning prompts only, not legal applicability determinations.

## Recently Delivered Phase 1I Items

- Made the local Natural Earth choropleth visible from tablet widths upward rather than hiding the SVG until large desktop layouts.
- Strengthened map border, ocean/land, selected-state and EU overlay contrast so country outlines are visibly inspectable.
- Added a clear map-geometry fallback state while keeping jurisdiction navigation available.
- Added `data/coverageTargets.ts` and `components/CoverageDepthPanel.tsx` to track minimum direct-record depth by market.
- Added `data/marketDepthAdditions.ts` with seed records that bring core commercial markets to at least five direct records and watch-expansion markets to at least three.
- Added Playwright checks for country path rendering, tablet map size, jurisdiction selection and geometry fallback.

## Recently Delivered Phase 1A Items

- Public changelog route at `/changelog`
- Two-jurisdiction comparison route at `/compare`
- Regulation comparison route via `/compare?ids=csrd,issb-s1-s2`
- Printable/copyable jurisdiction brief route at `/jurisdiction/[code]/brief`
- Etica ESG rebrand, branded 404 and ISSB redirect aliases
- Regulation citation widget and `/edition/0.5/regulations/[slug]` snapshot route
- Assessment persona doorways and advanced filter grouping
- Header light/dark mode toggle
- Real `/data-quality` governance page and simplified primary navigation
- Sector heatmap tab in `/briefing`
- Homepage "What's new" strip
- Mobile map fallback list
- Favicon
- Marquee EU record threshold and penalty cleanup
- Direct vs inherited jurisdiction record-count distinction
- Agent and documentation workflow files

## Recently Delivered Phase 1B Items

- Added market-depth seed records through `data/marketCoverage.ts`, especially for Mexico, Netherlands, California, United States, China, Singapore, Japan, Australia, Brazil, Switzerland and Turkey.
- Improved map legibility with stronger country outlines and local graticule cues while keeping the dependency-free local Natural Earth approach.
- Added language toggle support for English, Spanish, Dutch, French, German and Portuguese product chrome.
- Added shareable filtered URLs to the Map and Regulations workspaces.
- Added filtered CSV and JSON exports for the static regulation database.
- Added readiness-priority scoring and reasons for planning conversations.
- Grouped timeline milestones by year and expanded the visible milestone set.
- Expanded comparison mode with thresholds, first report due date, readiness, affected functions, advisory opportunities and enforcement rows.
- Improved the data-quality page with high-impact review checks and a larger prioritized research queue.
- Added configurable client planning summaries by jurisdiction, sector and company type.

## Recently Delivered Phase 1C Items

- Added GitHub Actions CI for typecheck and production build validation.
- Added Playwright smoke tests for the map workspace, language toggle, regulation detail route and launch-critical pages.
- Added Lighthouse CI on key public routes with warning-level launch thresholds.
- Added a pull request template requiring Vercel preview review and MVP guardrail checks.
- Expanded translated UI chrome across filters, map guidance, status labels, confidence labels, data-quality labels and regulation table controls.
- Added `data/phase1cCoverage.ts`, bringing the static seed dataset to 80+ source-linked records.
- Added a workbook-backed coverage control workflow for regulation inventory and review planning.
- Strengthened map outline rendering with an explicit country-border overlay.

## Recently Delivered Phase 1D Items

- Added `data/masterUpdateAdditions.ts` for the master update pack expansion.
- Added master metadata fields to `types/regulation.ts`: record type, legal force, display tier, atlas granularity, parent record ID, aliases, child items, source system, source confidence, client relevance category, market maturity score and monetization tier.
- Added filters and badges for record type, legal force and client relevance category.
- Expanded the static dataset with condensed EU financial-services records, APAC/ISSB market records, South Africa and Europe national due-diligence coverage, and major voluntary frameworks.
- Added Hong Kong, South Korea, Taiwan, New Zealand, Malaysia, Indonesia, Thailand, Philippines, France, Germany, Norway and South Africa as jurisdiction tiles.
- Added source-of-truth governance guidance on `/data-quality`.
- Added a static market briefing CTA and `/premium-roadmap` route for future market packs, sector packs and portfolio scans without adding Stripe, authentication, Supabase, databases or paid APIs.

## Recently Delivered Phase 1E Items

- Updated dataset metadata and changelog to `0.5.5 - May 2026`.
- Improved `lib/applicability.ts` so the assessment wizard considers legal force, display tier, high-impact classification, client relevance tags, supplier exposure and investor/customer-driven records.
- Added assessment result fields for evidence needed, source to verify, source-quality note, functions involved and high/medium/monitor review priority.
- Upgraded `/assessment` cards and copied shortlists so results explain why each record appears and what should be verified before reliance.
- Converted `/timeline` from a single-date list into a quarter-level milestone view across consultation deadlines, effective dates, first reporting years, first report due dates and Atlas review dates.
- Improved timeline filtering so year filters match any relevant milestone year, not only `firstReportingYear`.
- Upgraded `/data-quality` with review-queue scoring, priority-source coverage and visible reasons for source/confidence follow-up.
- Improved `/briefing` priority cards and copied client summaries with evidence packages, first moves, functions, legal force, client relevance and source-coverage notes.
- Enriched `/jurisdiction/[code]/brief` with source-backed counts, status/metadata badges, 30-day readiness starters, watch items, functions, evidence and market briefing CTA.
- Added evidence summaries and review-flag counts to the map-side jurisdiction panel.

## Recently Delivered Phase 1F Items

- Updated dataset metadata and changelog to `0.5.6 - May 2026`.
- Added `data/commercialOffers.ts`, `data/alertDigests.ts`, `data/premiumPacks.ts` and `data/launchAssets.ts`.
- Added `/plans` to explain Free Atlas, Premium Intelligence previews, Advisory Atlas and Enterprise/API Future without Stripe, auth, billing, gating or database dependencies.
- Added `/alerts` as a static premium-alert preview surface with weekly and monthly digest samples, watchlist concepts and source-quality legend.
- Added `/advisory` as the near-term manual monetization surface for regulatory exposure scans, custom watchlists, portfolio/supplier regulatory maps, board/client briefings and market-pack support.
- Rebuilt `/premium-roadmap` around concrete market-pack previews, alert-roadmap concepts, advisory-supported pack delivery and future enterprise/API guardrails.
- Added `CommercialCTA` and surfaced commercial pathways from the homepage, assessment, regulation detail, briefing and premium pages.
- Upgraded regulation detail pages and drawers with decision cards for what the record is, who may be affected, evidence likely needed and suggested owners.
- Added source-trust and coverage-tier explainers to Data Quality and Methodology.
- Added `docs/feature-request-tracking.md` and `docs/notion-update-plan.md` for launch sprint task tracking and deep-research intake.

## Recently Delivered Phase 1G Items

- Updated dataset metadata and changelog to `0.5.7 - May 2026`.
- Added `/premium-packs/[id]` static sample pages so each premium market-pack concept has an inspectable scope, table of contents, outputs, included regimes and caveats.
- Linked `/premium-roadmap` pack cards to the new premium-pack sample pages.
- Added `data/conversionTracking.ts` and `docs/conversion-tracking-plan.md` for manual, no-dependency conversion validation.
- Added manual validation loop signals to `/plans`.
- Added advisory next-step language to copied jurisdiction briefs and client planning summaries.
- Kept conversion tracking intentionally manual: no analytics SDK, cookies, CRM sync, production email automation, billing events, accounts or database were added.

## Recently Delivered Phase 1H Items

- Updated dataset metadata and changelog to `0.5.8 - May 2026`.
- Added copy/print controls to `/premium-packs/[id]` so sample packs can be shared as caveated Markdown briefs.
- Added `data/contentReview.ts` for Marquee 10 and Marquee 25 launch review governance.
- Added a Marquee launch review queue to `/data-quality`.
- Surfaced content-review status, launch-blocker flags, premium-use mapping and source/threshhold/status review questions for high-value regimes.
- Kept the review queue as editorial/source-governance support only, not legal verification or a completeness claim.

## May 2026 Commercialization Validation Sprint

Goal: launch a credible public MVP by May 23, 2026 and validate monetization by May 31, 2026 without adding paid infrastructure.

Week 1, May 2-8:

- Ship `/plans`, `/advisory`, stronger `/premium-roadmap`, source-trust copy and feature-request tracking.
- Confirm the product explains Free Atlas, Premium Intelligence previews and Advisory Atlas clearly.

Week 2, May 9-15:

- Validate `/alerts`, premium market-pack previews and source freshness messaging.
- Prepare sample premium outputs and launch assets.

Week 3, May 16-23:

- Harden regulation detail, assessment, core routes, legal wording, source visibility and launch QA.

Week 4, May 24-31:

- Run monetization experiments for alerts waitlist, market-pack requests and advisory scan calls.

Commercial guardrail: billing, authentication, database, production email alerts, scraping, cron jobs and AI legal summaries remain later-phase items until explicitly approved.

## Phase 1: Credibility And Utility

Phase 1 should deepen the static product without changing the deployment model.

Recommended improvements:

- More precise timeline view with quarter-level milestone grouping: partially delivered in Phase 1E; horizontal swimlane layout remains a later refinement.
- Deeper source review queue workflow with assigned owners and review states: review scoring delivered in Phase 1E; named owners remain a later data-governance step.
- Marquee content review queue: partially delivered in Phase 1H for high-value launch regimes; owner assignment and formal review workflow remain later data-governance work.
- Changelog detail grouped by regulation and jurisdiction
- More consistent source metadata across all records
- Better assessment scoring with visible reasons: partially delivered in Phase 1E.
- Stronger regulation detail pages with threshold summaries and caveats
- Improved map legend and layer explanations
- Static premium alert and market-pack previews: partially delivered in Phase 1F and expanded with individual pack sample pages in Phase 1G.
- Advisory-led monetization surfaces: partially delivered in Phase 1F.
- Better mobile and tablet refinements
- Excel and PDF-ready export formats after the CSV/JSON pattern is validated
- Maturity axis alongside status, such as mandatory in place or mandatory in progress
- Deeper threshold, penalty and phase-in content for non-marquee records

Phase 1 still should not add authentication, databases, paid APIs, Stripe, scraping, cron jobs, or AI-generated summaries.

## Phase 2: Data Operations

Phase 2 may introduce structured content operations after the static MVP proves useful.

Possible features:

- Database-backed regulation records
- Admin editing interface
- Reviewer roles
- Source review workflow
- Legal review workflow
- Jurisdiction owner assignment
- Change history
- Source monitoring queue
- Draft and published record states
- Client workspaces
- Saved views per client or portfolio
- Authentication
- Team permissions

Candidate database options should be evaluated separately. Supabase is not part of the MVP and should not be added without explicit approval.

## Phase 3: Intelligence And Monitoring

Phase 3 may introduce active monitoring and AI-assisted workflows.

Possible features:

- Automated source monitoring
- Regulatory change alerts
- Email notifications
- AI-assisted summaries with human review
- Evidence extraction from primary sources
- Diffing regulation updates over time
- Client-specific impact briefs
- Portfolio-level impact scoring
- Jurisdiction watchlists

Any AI feature must include source grounding, human review, uncertainty display, and legal safeguard language.

## Phase 4: Commercialization

Commercial packaging belongs after product-market validation.

Possible features:

- Paid plans
- Billing
- Subscription management
- Usage limits
- Enterprise workspaces
- SSO
- Audit logs
- Advanced exports

Stripe is explicitly out of scope until the project owner requests commercialization work.

## Near-Term Priority Order

1. Improve remaining content depth: thresholds, penalties, phase-ins and primary sources for non-marquee records.
2. Improve planning: horizontal timeline/swimlane, quarter precision and milestone grouping.
3. Improve exportability: CSV/JSON export and richer copyable briefs.
4. Improve usability: map legend, mobile layout, comparison fields and filters.
5. Improve maintainability: reusable data helpers, consistent taxonomy and living documentation.

For the current 36-item PM/ESG specialist backlog, use `docs/product-improvement-backlog.md` as the working prioritization source. Wave 1 keeps the product static and focuses on launch quality, map clarity, persona presets, evidence summaries, source confidence and briefing quality.

## Non-Goals For The MVP

- Definitive legal applicability engine
- Legal opinion generation
- Tax advice or assurance advice
- Production-grade regulatory monitoring
- Customer accounts
- Paid subscriptions
- Mapbox or paid geospatial services
- Multi-tenant architecture
- Complex CMS
- Email alerts
- Scraping pipelines
