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
- Simplified public navigation with Start, Assessment, Markets, Regulations, Advisory and grouped secondary routes
- Homepage three-path start experience for assessment, market/regulation exploration and advisory scans
- `/markets` market profile index and `/jurisdiction/[code]` market profile pages
- Market trigger reviews on jurisdiction profiles for corporate reporting, climate, sustainable finance, supply-chain, product/trade and source-review drivers
- Market obligation footprints on jurisdiction profiles for business-impact categories, owner functions, evidence starters and first actions
- `/sectors` sector starting point index and `/sectors/[slug]` sector profile pages
- `/value-chain` business-exposure workspace for supplier, importer/exporter, product, portfolio, financed-emissions and own-operations triage
- Jurisdiction profiles
- Filterable regulation table
- Search-first Regulations workspace with primary filters above the result table and role lenses, compare, label help, share and export controls below it
- Regulation detail view
- Assessment wizard
- Timeline view
- Methodology and data quality surfaces
- Consulting-oriented advisory opportunities
- Business impact and obligation tags
- Public changelog
- Daily launch pulse for latest release context, validation expectations and next product-review focus
- Jurisdiction and regulation comparison
- Printable and copyable jurisdiction briefs
- Citation copy blocks and edition snapshot routes
- Persona doorway presets in the assessment wizard
- Persona starting points in the Regulations workspace with shareable role-lens URLs
- Light/dark mode toggle
- Multilingual interface chrome for English, Spanish, Dutch, French, German and Portuguese
- Shareable filtered Map and Regulations URLs
- Filtered CSV and JSON regulation exports
- Readiness-priority scoring on records
- GitHub Actions CI, Playwright smoke tests, Lighthouse CI and PR preview checklist with Node 24 action-runtime readiness
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
- Shared advisory-scan CTA for market, assessment and regulation-detail surfaces, preserving mailto-only manual request paths
- `/launch` internal launch-resource workspace with copyable LinkedIn, email, direct-outreach, advisory and premium-preview assets
- Grouped primary and secondary navigation so Start, Assessment, Markets, Regulations and Advisory stay prominent while planning, trust and commercial-preview routes remain one click away; `/launch` is kept as a noindex operator route, not public navigation
- Homepage Start Here panel for assessment, market/regulation exploration and advisory scan entry paths
- Concrete premium market-pack previews in `/premium-roadmap`
- Premium pack preview source-review gates for illustrative-only, review-before-use and orientation-ready records
- Assessment outputs with review priority, explanation triggers, evidence needs, functions involved and source-to-verify guidance
- Assessment trigger review explaining how profile facts drive jurisdiction, company, sector, value-chain, financial and source/threshold signals
- Assessment outputs with missing facts, suggested owners and next 30-day actions
- Assessment readiness plan cards for threshold facts, first actions and owner functions
- Assessment shortlist overview with top records, relevance mix, facts to confirm, first 30-day actions and advisory scan CTA before detailed trigger logic
- Regulation detail decision cards for threshold gaps, timing caveats, enforcement cues and missing data
- Regulation detail implementation roadmaps for cautious 30/60/90-day owner, evidence, source-review and briefing actions
- `/thresholds` threshold matrix for high-value scope signals, facts to confirm, source-to-verify links and review status
- Marquee 10 source-review packet for premium-use blockers, priority sources, threshold facts and owner actions
- Quarter-level milestone timeline covering consultation, effective-date, reporting-year, report-due and Atlas review events
- Review-queue scoring in the data-quality dashboard with visible reasons for source and confidence follow-up
- Source freshness signals and Marquee owner/action controls for premium/advisory review readiness
- Market coverage-depth targets and Data Quality panel for direct records per jurisdiction
- Market trigger review panels that translate selected jurisdiction records into driver categories, facts to verify and first actions
- Market obligation footprint panels that translate selected jurisdiction records into obligation categories, owner functions and evidence starters
- Decision-readiness evidence gates on regulation details and Data Quality for premium/advisory review controls
- Source evidence trails and copyable source-review memos on regulation details and drawers
- Data Quality review workflow exports for source, threshold, evidence and premium-use QA tracking
- AI review pack for external product, ESG, legal-safety and regulatory coverage feedback
- External review intake workflow on Data Quality for routing external findings into the right operating artifact
- Tablet-and-desktop Natural Earth Admin 0 country-outline map with stronger visual contrast, untracked-country styling, pan/zoom controls and geometry fallback
- Jurisdiction briefs with readiness starters, watch items, evidence packages and source-backed priority-record counts
- PM/ESG specialist improvement backlog across three waves in `docs/product-improvement-backlog.md`
- Static seed data

## Recently Delivered Phase 1AQ Items

- Updated dataset metadata and changelog to `0.5.61 - May 2026`.
- Added `components/AdvisoryScanCTA.tsx` as the shared manual advisory-scan CTA.
- Converted `components/MarketBriefingCTA.tsx` into a stable wrapper around the shared advisory-scan component.
- Updated the assessment advisory-scan CTA, regulation detail page CTA and regulation drawer CTA to use the shared component.
- Standardized advisory caveats and deliverable framing across those surfaces.
- Preserved mailto-only request paths with no accounts, payments, databases, automated email or legal-advice functionality.

## Recently Delivered Phase 1AP Items

- Updated dataset metadata and changelog to `0.5.60 - May 2026`.
- Reworked `/regulations` into a search-first database workspace.
- Put search, jurisdiction, topic, sector, company type and reporting year before the result table.
- Moved role lenses, compare, glossary help, share and export controls below the result table.
- Added embedded role-lens support so persona presets can sit inside a secondary tools panel without duplicate card chrome.
- Updated smoke coverage for the new search-first hierarchy and collapsed role-lens behavior.
- Kept all filtering, regulation detail navigation, source-quality indicators, exports and legal caveats intact.

## Recently Delivered Phase 1AO Items

- Updated dataset metadata and changelog to `0.5.59 - May 2026`.
- Added a decision-first assessment shortlist overview before detailed trigger logic.
- Surfaced top records to review first, relevance-mix counts, facts to confirm and first 30-day actions.
- Added an advisory-scan CTA inside the assessment result hierarchy.
- Added smoke coverage for the new overview.
- Kept the overview as indicative planning support, not legal applicability or complete coverage.

## Recently Delivered Phase 1AM Items

- Updated dataset metadata and changelog to `0.5.57 - May 2026`.
- Added `lib/marketObligationProfile.ts` to derive obligation categories from existing jurisdiction records.
- Added `components/MarketObligationMatrix.tsx` to jurisdiction profile pages.
- Grouped market records by reporting, assurance, governance, due diligence, supply chain, financial disclosure, taxonomy, transition-plan, data-collection and product-compliance obligations.
- Added likely owner functions, evidence starters, first actions and priority record links for populated obligation categories.
- Added obligation-footprint context to copied market profile Markdown.
- Added smoke coverage for the market obligation footprint on `/jurisdiction/euu`.
- Kept the footprint as seed-data planning orientation, not legal applicability or complete jurisdiction coverage.

## Recently Delivered Phase 1AL Items

- Updated dataset metadata and changelog to `0.5.56 - May 2026`.
- Upgraded CI and Lighthouse workflows to `actions/checkout@v5` and `actions/setup-node@v5`.
- Kept the GitHub Actions Node 24 action-runtime opt-in in place.
- Kept the app build runtime on Node 22.
- Documented the follow-up learning that v4 actions still targeted Node 20 after the runtime opt-in.
- Kept this as launch-pipeline hardening only; it does not add infrastructure or product-scope changes.

## Recently Delivered Phase 1AK Items

- Updated dataset metadata and changelog to `0.5.55 - May 2026`.
- Opted CI and Lighthouse workflows into the GitHub Actions Node 24 JavaScript action runtime.
- Kept the app build runtime pinned through `actions/setup-node` at Node 22.
- Documented the Node 20 action-runtime deprecation annotation in the issue-resolution log.
- Updated development workflow notes so future CI changes keep action runtime and app runtime separate.
- Kept this as launch-pipeline hardening only; it does not add infrastructure or product-scope changes.

## Recently Delivered Phase 1AJ Items

- Updated dataset metadata and changelog to `0.5.54 - May 2026`.
- Added a market trigger-review panel to jurisdiction profile pages.
- Grouped market drivers into corporate reporting, climate, sustainable finance, supply-chain, product/trade and source-review signals.
- Added matched-record counts, priority record links, next verification facts and first actions for each trigger category.
- Added trigger-review context to copied market profile Markdown.
- Added smoke coverage for market trigger review on `/jurisdiction/euu`.
- Kept market trigger review as a seed-data orientation aid, not legal applicability, complete coverage or entity-specific compliance scope.

## Recently Delivered Phase 1AI Items

- Updated dataset metadata and changelog to `0.5.53 - May 2026`.
- Added an assessment trigger-review panel for jurisdiction, company profile, sector, value-chain, financial/portfolio and source/threshold signals.
- Added matched-record counts and next facts to verify for each trigger category.
- Added trigger-review context to copied assessment shortlist Markdown.
- Added smoke coverage for the assessment trigger review.
- Kept trigger review as an explanation of planning signals, not legal applicability or compliance scope.

## Recently Delivered Phase 1AH Items

- Updated dataset metadata and changelog to `0.5.52 - May 2026`.
- Added `lib/implementationRoadmap.ts` to derive cautious implementation stages from existing regulation, decision-readiness and source-governance data.
- Added `components/ImplementationRoadmap.tsx` to regulation detail pages and drawers.
- Added copyable roadmap Markdown with edition metadata, source-review context and caveats.
- Added smoke and copy-surface coverage for the implementation roadmap.
- Kept roadmap output as an orientation tool. It does not determine applicability, verify legal completeness or replace qualified review.

## Recently Delivered Phase 1AG Items

- Updated dataset metadata and changelog to `0.5.51 - May 2026`.
- Added `components/MarqueeSourceReviewPacket.tsx` to the Data Quality review workflow.
- Combined Marquee 10 review status, premium-use blockers, decision-readiness gates, source posture and threshold matrix context in one operational packet.
- Added source, threshold and owner/action cards for launch-critical regimes used in premium and advisory examples.
- Added smoke coverage for the Marquee 10 source-review packet.
- Kept the packet static, caveated and source-governance oriented. It does not certify source completeness or determine legal applicability.

## Recently Delivered Phase 1AF Items

- Updated dataset metadata and changelog to `0.5.50 - May 2026`.
- Added assessment readiness plan cards for threshold facts to check, first 30-day actions and likely owner functions.
- Added threshold matrix badges on assessment shortlist records.
- Updated copied assessment summaries with threshold-sensitive record context.
- Kept assessment results as indicative planning prompts only.

## Recently Delivered Phase 1AE Items

- Updated dataset metadata and changelog to `0.5.49 - May 2026`.
- Added `/thresholds` as a source-linked threshold matrix for high-value records.
- Added `data/thresholdMatrix.ts` with threshold type, threshold signal, facts to confirm, timing signal, source to verify, review status, confidence and caveat.
- Added Data Quality and regulation-detail handoffs so threshold-sensitive records have a visible review lane.
- Added data guardrail coverage to make sure threshold matrix rows map to existing regulation records and preserve source/caveat metadata.
- Kept the matrix static, caveated and source-linked. It does not decide legal scope, legal applicability or client-specific compliance obligations.

## Recently Delivered Phase 1AD Items

- Updated dataset metadata and recent changelog to `0.5.48 - May 2026`.
- Added `components/QualitySignalExplainer.tsx` to clarify that record counts, source-link rates, review prompts and confidence labels are planning signals rather than completeness or applicability claims.
- Added `components/ManualRequestPanel.tsx` so Plans, Alerts, Advisory and Premium Roadmap explain exactly what a user should send and what Etica returns.
- Renamed public review-flag/source-coverage wording into review-prompt and captured-source language across Data Quality, Markets, Sectors, Jurisdiction, Value Chain and detail surfaces.
- Kept conversion manual through mailto-only paths with no payments, accounts, database, email automation or production monitoring.

## Recently Delivered Phase 1AC Items

- Updated dataset metadata and recent changelog to `0.5.47 - May 2026`.
- Added `tests/data-guardrails.spec.ts` to check minimum source metadata, high-impact review signals, premium-use gates and definitive legal wording.
- Added `npm run check:data` for targeted static data-governance checks.
- Kept the checks in the existing Playwright CI flow so future data regressions are caught before merge.
- Preserved the distinction between automated guardrails and qualified source/legal review.

## Recently Delivered Phase 1AB Items

- Updated dataset metadata and recent changelog to `0.5.46 - May 2026`.
- Added planning-horizon tabs to `/timeline` for next 12 months, next 24 months, already in force, longer-term watch and full history.
- Made next 24 months the default timeline view, with high-impact already-effective obligations retained for planning context.
- Added active filter summary support for non-default planning horizons.
- Added smoke coverage for timeline horizon selection and reset behavior.
- Kept timeline output as source-linked planning intelligence, not confirmed legal deadline advice.

## Recently Delivered Phase 1AA Items

- Updated dataset metadata and recent changelog to `0.5.45 - May 2026`.
- Added `data/briefingScenarios.ts` with curated briefing scenarios for EU corporate reporting, PE portfolio exposure, SME supplier/exporter readiness, financial-services sustainable finance and board/risk committee updates.
- Updated `/briefing` so users choose a scenario before priority records, advisory workstreams, data-governance risks or copied summaries render.
- Added scenario-specific leadership questions, first operating moves, evidence packages, advisory motions, caveats and next-check prompts.
- Added smoke coverage for the scenario-first briefing flow.
- Kept briefing outputs as static planning aids, not legal advice or definitive applicability outputs.

## Recently Delivered Phase 1Z Items

- Updated dataset metadata and recent changelog to `0.5.44 - May 2026`.
- Added the homepage Start Here panel so first-time users can choose assessment, market profile or regulation search before advanced controls.
- Removed `/launch` from public navigation, added noindex metadata to the route and replaced commercial CTA secondary links to launch assets with plan/advisory routes.
- Added `lib/premiumUseGates.ts` and premium pack preview source-review gates for blocked, review-needed and orientation-ready records.
- Strengthened CSRD/CSDDD threshold caveats so CSDDD due-diligence scope signals are not treated as general CSRD corporate-reporting thresholds.
- Added smoke coverage for Start Here, hidden Launch nav and premium gates.
- Kept the changes static, source-linked and legally cautious.

## Recently Delivered Phase 1Y Items

- Updated dataset metadata and recent changelog to `0.5.43 - May 2026`.
- Added `/value-chain` as a value-chain exposure workspace.
- Added `lib/valueChainProfile.ts` to aggregate tagged records by supplier, trade/import, product, claims, investment, financed-emissions, own-operations and governance exposure.
- Added copyable value-chain exposure briefs and filtered links into `/regulations?valueChain=...`.
- Added the route to the Header More menu and smoke coverage.
- Kept the surface as seed intelligence and evidence-planning support. It is not legal advice, complete value-chain coverage or entity-specific applicability.

## Recently Delivered Phase 1X Items

- Updated dataset metadata and recent changelog to `0.5.42 - May 2026`.
- Added `data/reviewIntake.ts` for review-finding categories, routing destinations, examples and copyable intake text.
- Added `components/ExternalReviewIntakePanel.tsx` to the `/data-quality` review workflow tab.
- Added `docs/ai-review/Review_Feedback_Intake_Template.md`.
- Added smoke coverage confirming the Data Quality external review intake lane renders.
- Kept the intake workflow as product QA and source-governance routing. It does not add a database, automation, legal verification or compliance determinations.

## Recently Delivered Phase 1W Items

- Updated dataset metadata and recent changelog to `0.5.41 - May 2026`.
- Added `docs/ai-review/ESG_Regulatory_Atlas_AI_Review_Export_2026-05-20.md` as a detailed current-state handoff for external AI or expert review.
- Added `docs/ai-review/AI_Reviewer_Feedback_Prompt.md` to request structured, critical feedback from Claude, ChatGPT or another reviewer.
- Added `docs/ai-review/Future_Capabilities_Deep_Review_Backlog.md` to separate launch-safe improvements from later platform capabilities.
- Added `docs/ai-review/Regulatory_Coverage_Review_Worksheet.md` and `.csv` to support market and regulation coverage review in Markdown, Notion or spreadsheet workflows.
- Kept the review pack as product QA and source-governance planning material; it is not legal advice, source verification, official translation or complete coverage.

## Recently Delivered Phase 1V Items

- Updated dataset metadata and recent changelog to `0.5.40 - May 2026`.
- Added `data/dailyUpdates.ts` for a static daily launch-train note.
- Added `components/DailyUpdatePulse.tsx`.
- Surfaced the daily pulse on `/changelog` and the Data Quality overview.
- Patched Next.js to `^16.2.6` after production dependency audit flagged a high-severity advisory in the previous range.
- Added smoke coverage for the daily pulse on public and governance surfaces.
- Kept the pulse editorial and static; it does not add automated monitoring, email alerts, accounts, a database, payments or legal-update-service claims.

## Recently Delivered Phase 1U Items

- Current navigation supersedes the older Phase 1U pattern: Start, Assessment, Markets, Regulations and Advisory are primary; Sectors, Timeline, Briefing, Value chain, Thresholds, Methodology, Data Quality, Glossary, Changelog, Plans, Alerts, Premium Roadmap and About live in grouped More; `/launch` remains internal/noindex.
- Updated dataset metadata and changelog to `0.5.21 - May 2026`.
- Simplified global navigation by keeping Map, Markets, Sectors, Regulations, Assessment and Plans visible while grouping Timeline, Briefing, Data Quality, Alerts, Advisory and Launch into a translated More menu.
- Added translated navigation labels for Plans, Alerts, Advisory, Launch and More across the six supported interface languages.
- Replaced three separate homepage hero metric cards with one compact workspace snapshot for record count, high-impact count and source-link count.
- Added dark-mode-aware styling to the new navigation and homepage snapshot surfaces.
- Kept all routes and product capabilities intact while reducing first-screen visual noise.

## Recently Delivered Phase 1T Items

- Updated dataset metadata and changelog to `0.5.20 - May 2026`.
- Refreshed the homepage into a calmer map-first workspace by removing the top update strip and commercial tile row.
- Consolidated view selection, default filters and share-link controls into a single compact workspace surface.
- Added no-dependency SVG map zoom, reset and drag-to-pan controls.
- Replaced the tracked-only map geometry index with locally bundled Natural Earth Admin 0 country geometry so non-covered markets render as neutral land.
- Strengthened map ocean, untracked land, country border, outline and graticule contrast in light and dark mode.
- Reduced always-on map labels while retaining clickable country paths, EU context and subnational markers.
- Added smoke coverage for untracked country visibility and map viewport controls.
- Kept the map as a static seed coverage visualization, not legal applicability, maturity or complete market coverage.

## Recently Delivered Phase 1S Items

- Updated dataset metadata and changelog to `0.5.19 - May 2026`.
- Added `lib/reviewWorkflow.ts` to generate source/threshold/evidence review rows, priority scoring and caveated exports.
- Added `components/ReviewWorkflowExportPanel.tsx` to `/data-quality`.
- Added reviewer-ready CSV and JSON exports for the static seed dataset.
- Added a copyable priority review packet for Notion, advisory prep and content QA.
- Streamlined `/data-quality` into Overview, Sources, Coverage and Review Workflow tabs so governance tools stay scannable as the product grows.
- Added smoke and static test coverage for the review workflow export panel and caveated export content.
- Kept exports as operational QA aids, not legal opinions, official translations or verified compliance determinations.

## Recently Delivered Phase 1R Items

- Updated dataset metadata and changelog to `0.5.18 - May 2026`.
- Added `lib/sourceGovernance.ts` to centralize source posture, freshness, priority-source selection, review packets and copyable source-review memo text.
- Added `components/SourceEvidencePanel.tsx` to regulation detail pages and drawers.
- Added source posture samples to the Data Quality source library.
- Added smoke and static test coverage for source evidence trails and memo caveats.
- Kept source evidence as governance and QA support, not legal verification, official translation or applicability determination.

## Recently Delivered Phase 1Q Items

- Updated dataset metadata and changelog to `0.5.17 - May 2026`.
- Added `lib/decisionReadiness.ts` to centralize facts-to-confirm, evidence-package, first-30-day action and source-review-step logic.
- Added `components/DecisionReadinessChecklist.tsx` to regulation detail pages and drawers.
- Added `components/MarqueeEvidenceGate.tsx` to `/data-quality`.
- Added smoke and static test coverage for decision-readiness controls.
- Kept decision-readiness gates as orientation and content-governance controls, not legal verification, premium certification or applicability determinations.

## Recently Delivered Phase 1P Items

- Updated dataset metadata and changelog to `0.5.16 - May 2026`.
- Added `lib/coverageConfidence.ts` to score each tracked market by depth, priority-source backing, confidence and review risk.
- Added `components/CoverageConfidencePanel.tsx` to `/data-quality`.
- Added coverage confidence badges to `/markets` and `/jurisdiction/[code]`.
- Added static test coverage for jurisdiction confidence scoring.
- Kept coverage confidence as an internal readiness signal, not legal verification or complete market coverage.

## Recently Delivered Phase 1O Items

- Updated dataset metadata and changelog to `0.5.15 - May 2026`.
- Added `data/personaPresets.ts` for role-based database lenses.
- Added `components/PersonaPresets.tsx` to the Regulations workspace.
- Added shareable `?persona=` URL support on `/regulations`.
- Added role lenses for CSO, legal/compliance, finance/controller, procurement/supplier, private equity/investor and external advisor workflows.
- Added smoke coverage for applying the Finance persona preset.
- Kept persona presets as orientation filters and first-action prompts, not applicability determinations.

## Recently Delivered Phase 1N Items

- Updated dataset metadata and changelog to `0.5.14 - May 2026`.
- Added `/sectors` as a browseable sector starting point index.
- Added `/sectors/[slug]` sector profile pages for every tracked sector in the static taxonomy.
- Added reusable sector profile aggregation logic in `lib/sectorProfile.ts`.
- Added Sectors to the global navigation and translated `nav.sectors` labels for supported interface languages.
- Added smoke coverage for `/sectors` and `/sectors/financial-services`.
- Kept sector profiles as current tracked seed coverage and broad all-sector context, not complete sector legal inventories.

## Recently Delivered Phase 1M Items

- Updated dataset metadata and changelog to `0.5.13 - May 2026`.
- Added `/markets` as a browseable market profile index grouped by region.
- Added `/jurisdiction/[code]` market profile pages for tracked jurisdictions.
- Added reusable market profile aggregation logic in `lib/marketProfile.ts`.
- Linked selected map jurisdictions to market profile pages.
- Added smoke coverage for `/markets` and `/jurisdiction/euu`.

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
