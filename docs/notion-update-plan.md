# Notion Update Plan

This page mirrors the Notion launch updates needed for the May 2026 commercialization sprint. Keep it in the repo even when Notion is updated so future agents can reconcile Notion state with code state.

## Launch Command Center Section

Add section: `2026-05 May Commercialization Sprint`

Objective:

Ship ESG Regulatory Atlas as a credible free MVP by May 23, 2026, and validate monetization by May 31, 2026 through premium alert previews, premium market-pack previews, and advisory lead-generation CTAs.

Commercial strategy:

- Free Atlas remains the public trust surface.
- Premium Intelligence is validated through static alert and market-pack previews before billing infrastructure.
- Advisory Atlas is the near-term revenue path via exposure scans, portfolio/supplier maps, custom watchlists, and board/client briefings.
- No Stripe, auth, database, cron jobs, scraping, or production email-alert backend until demand and governance are validated.

May exit criteria:

- Public site explains free vs premium vs advisory.
- `/alerts` shows weekly/monthly digest previews.
- `/plans` and `/premium-roadmap` show premium market-pack options.
- `/advisory` supports inquiry flow.
- Assessment and regulation detail pages produce decision-ready next steps.
- Data Quality explains coverage tiers, source quality, and review limitations.
- Launch Tasks, Content Review, Feature Requests, Decisions, QA, and Launch Assets are updated.

## Decisions Log ADRs

ADR-014:

- Decision: Validate premium demand before Stripe/auth.
- Why: Current MVP is static and guardrails prohibit paid infrastructure without explicit phase change.
- Consequence: Build static offer pages and request-access CTAs first.
- Status: Active.

ADR-015:

- Decision: Treat email alerts as editorial preview in May.
- Why: Production alerts require monitoring, email ops, unsubscribe/privacy mechanics, and governance.
- Consequence: Build `/alerts` preview and sample digest; use manual list/request flow.
- Status: Active.

ADR-016:

- Decision: Use advisory-led monetization first.
- Why: Advisory can monetize without product infrastructure and fits ESG regulatory intelligence.
- Consequence: Add `/advisory`, CTAs, sample scan outputs, outreach assets.
- Status: Active.

ADR-017:

- Decision: Free Atlas remains broad trust surface.
- Why: Free tier builds credibility and acquisition.
- Consequence: Do not gate core map/regulation/methodology before validation.
- Status: Active.

ADR-018:

- Decision: Track May commercial interest manually before analytics or CRM.
- Why: The static MVP can learn from mailto subjects, route context and direct replies without cookies, SDKs, accounts, databases or CRM sync.
- Consequence: Use `data/conversionTracking.ts`, copied-summary subject lines and a manual review cadence until demand justifies instrumentation.
- Status: Active.

ADR-019:

- Decision: Treat Marquee review queue as source governance, not legal verification.
- Why: High-value records need visible review prioritisation before premium/advisory use, but the static MVP cannot certify legal completeness.
- Consequence: Add Marquee 10/25 review queue with launch blockers and review questions while preserving caveats.
- Status: Active.

ADR-020:

- Decision: Treat market coverage targets as product QA controls, not legal completeness claims.
- Why: Direct-record targets help the Atlas avoid thin market profiles, but they cannot prove comprehensive local legal coverage.
- Consequence: Add coverage-depth targets, visible gaps and direct-record QA while preserving seed-data caveats.
- Status: Active.

ADR-021:

- Decision: Treat assessment missing-fact output as planning prompts, not applicability conclusions.
- Why: Users need practical next steps, owners and evidence prompts, but the static MVP cannot determine legal applicability.
- Consequence: Add missing facts, suggested owners and next 30-day actions while preserving source-review and legal-advice caveats.
- Status: Active.

ADR-022:

- Decision: Use copyable launch assets for manual commercial validation before adding automation.
- Why: The product needs faster feedback on premium alerts, market packs and advisory scans, but infrastructure such as email automation, CRM sync, accounts and billing is still out of scope.
- Consequence: Add `/launch` with caveated copy blocks and draft-email actions; keep conversion tracking manual.
- Status: Active.

ADR-023:

- Decision: Treat source freshness and premium-use blockers as editorial governance signals.
- Why: The static Atlas can show which records need review before premium/advisory examples, but it cannot certify legal completeness or source verification.
- Consequence: Add source freshness, owner placeholders, next actions and premium-use blocked labels on Data Quality while preserving caveats.
- Status: Active.

ADR-024:

- Decision: Add sector starting points as static triage surfaces before building role-specific dashboards.
- Why: Many users begin with business context such as financial services, manufacturing, agriculture or technology rather than a regulation name. Sector pages improve orientation without adding accounts, saved profiles or database infrastructure.
- Consequence: Add `/sectors` and `/sectors/[slug]` from existing seed data; keep sector outputs as current tracked coverage and planning prompts, not complete sector legal inventories.
- Status: Active.

ADR-025:

- Decision: Add persona presets as shareable static filters before building saved profiles or user dashboards.
- Why: CSOs, legal teams, finance controllers, procurement leads, private equity users and advisors need different first-pass database lenses, but saved workspaces would require auth/database scope.
- Consequence: Add `/regulations?persona=` role lenses backed by static data and keep them as orientation filters, not applicability determinations.
- Status: Active.

ADR-026:

- Decision: Separate coverage confidence from market coverage depth.
- Why: Direct-record counts help avoid thin market profiles, but users and advisors also need to know whether records are priority-source backed, current and low-risk enough for premium examples or client-ready planning.
- Consequence: Add coverage-confidence scoring and labels on Data Quality, Markets and jurisdiction profiles while preserving the caveat that confidence is not legal verification or complete coverage.
- Status: Active.

ADR-027:

- Decision: Treat decision-readiness outputs as review gates, not legal conclusions.
- Why: Premium packs and advisory scans need practical facts, evidence, owners and source-review steps, but the static MVP cannot certify legal applicability or complete source review.
- Consequence: Add shared decision-readiness logic and Premium Evidence Gates while preserving caveats that these are governance prompts for review and scoping.
- Status: Active.

ADR-028:

- Decision: Treat source evidence trails as review packets, not legal verification.
- Why: Source posture and review timing make content QA easier, but source trails cannot certify complete legal coverage, official translation or entity-specific applicability.
- Consequence: Add source evidence trails and copyable source-review memos while preserving caveats.
- Status: Active.

ADR-029:

- Decision: Treat review workflow exports as operational QA trackers.
- Why: Reviewers need CSV/JSON and copyable packets to move static seed records into Notion, spreadsheets or advisory prep, but exported rows cannot become legal opinions.
- Consequence: Add Data Quality review workflow exports with caveats, priority sources, facts to confirm and next actions.
- Status: Active.

ADR-030:

- Decision: Keep the homepage map-first and move non-map commercial/governance content into supporting routes.
- Why: The public MVP was becoming visually busy as launch, premium and data-quality surfaces accumulated. The strongest first impression is still the map, selected jurisdiction panel and regulation preview.
- Consequence: Use a compact hero, one disclaimer and one map-control surface on `/`; keep plans, alerts, advisory, launch assets and governance controls in their dedicated routes.
- Status: Active.

ADR-031:

- Decision: Use local SVG pan/zoom controls before introducing a map platform.
- Why: Users need inspectable map behavior, but Mapbox, paid map APIs and runtime geospatial services remain out of MVP scope.
- Consequence: Add no-dependency SVG pan/zoom/reset controls, stronger country outlines and untracked-country styling while preserving local Natural Earth geometry.
- Status: Active.

## Launch Tasks

Create or update `LAUNCH-001` through `LAUNCH-025` from the May 2026 sprint prompt. Mark implemented static website work as Review once code has shipped locally, and keep future infrastructure tasks as Post-launch or Deferred.

Recent follow-up launch tasks:

- LAUNCH-066 - Add Data Quality review workflow export panel
- LAUNCH-067 - Add caveated CSV/JSON review workflow exports
- LAUNCH-068 - Add copyable priority review packet for source QA
- LAUNCH-069 - Add static and smoke coverage for review workflow exports
- LAUNCH-070 - Streamline Data Quality into focused governance tabs
- LAUNCH-071 - Refresh homepage into a calmer map-first workspace
- LAUNCH-072 - Add no-dependency map pan, zoom and reset controls
- LAUNCH-073 - Make untracked countries, ocean background and country outlines visibly distinct
- LAUNCH-074 - Add smoke coverage for map viewport controls and untracked countries

## Content Review

Add or verify review entries for the Marquee 10 and Marquee 25 records. Mark launch blockers where thresholds, legal status, source review or date confidence are incomplete for records used in premium examples.

## Launch Assets

Track:

- Free Atlas launch homepage strip
- Premium Alerts preview copy
- Monthly ESG regulatory digest sample
- Advisory Exposure Scan one-pager
- Market Pack sample table of contents
- LinkedIn launch post 1: free Atlas
- LinkedIn launch post 2: alerts preview
- LinkedIn launch post 3: advisory scans
- Direct outreach email for advisory scan
- Direct outreach email for premium alert preview
- Premium pack sample pages for EU, ISSB, supply chain, financial services and portfolio/private equity use cases
- Manual conversion tracking log template
- Copyable premium pack brief template
- Marquee content review queue for premium/advisory launch records
- Market coverage-depth launch note
- Copyable launch-resource page for LinkedIn, email, direct outreach, advisory scan and premium-preview assets

## QA And Review Findings

Log issues discovered during implementation, especially:

- dark mode readability
- map clarity
- legal wording
- broken routes
- stale data labels
- missing source links
- export caveat failures
- copied summary disclaimer failures
- mobile CTA/layout issues
- map country outlines hidden or visually too faint
- market coverage depth below the current launch target
- coverage confidence showing review-needed markets that are presented as commercially ready
- map viewport controls missing or visually unavailable
- homepage commercial panels crowding the primary map workspace

## 2026-05-02 Codex Update - Visible Map And Market Coverage Depth

Launch Command Center note:

> Phase 1I improved the first trust surface of the Atlas: the local Natural Earth country-outline map now appears from tablet widths upward with stronger borders, selected-state cues and a geometry fallback. Data Quality now includes market coverage-depth targets so core commercial markets and watch-expansion markets show direct-record depth, gaps and review risk.

Launch Tasks:

- LAUNCH-034 - Make country-outline map visibly inspectable on tablet and desktop
- LAUNCH-035 - Add market coverage-depth target model and Data Quality panel
- LAUNCH-036 - Expand direct market-depth seed records for under-covered jurisdictions
- LAUNCH-037 - Add map rendering and coverage target QA checks
- LAUNCH-038 - Add missing-facts prompts to assessment results
- LAUNCH-039 - Add suggested owner and next 30-day actions to assessment output
- LAUNCH-040 - Add threshold, timing, enforcement and missing-data decision cards to regulation details
- LAUNCH-041 - Publish copyable launch-resource page backed by `data/launchAssets.ts`
- LAUNCH-042 - Link commercial CTAs to launch assets for manual validation
- LAUNCH-043 - Preserve legal and commercial caveats in copied launch assets
- LAUNCH-044 - Add source freshness signals to Data Quality
- LAUNCH-045 - Add Marquee review owners, next actions and premium-use blockers
- LAUNCH-046 - Add source-governance smoke coverage
- LAUNCH-047 - Add market profile index at `/markets`
- LAUNCH-048 - Add jurisdiction market profile pages at `/jurisdiction/[code]`
- LAUNCH-049 - Link map-side jurisdiction selection to market profile pages
- LAUNCH-050 - Add sector starting point index at `/sectors`
- LAUNCH-051 - Add sector profile pages at `/sectors/[slug]`
- LAUNCH-052 - Add sector-profile smoke coverage and documentation updates
- LAUNCH-053 - Add persona starting points to the Regulations workspace
- LAUNCH-054 - Preserve persona lenses in shareable regulation URLs
- LAUNCH-055 - Add smoke coverage for role-based regulation filters

QA finding:

- Map visual defect resolved: SVG country paths were hidden below the large desktop breakpoint and borders were too subtle. Future map QA must assert visible country paths, not just the map container.

## 2026-05-03 Codex Update - Sector Starting Points

Launch Command Center note:

> Phase 1N added sector starting points so users can begin from business context before opening an assessment or filtered regulation table. The new sector pages aggregate current tracked seed records into priority records, market signals, evidence needs, source confidence and advisory next steps while preserving the caveat that sector coverage is not complete legal inventory.

Launch Tasks:

- LAUNCH-050 - Add sector starting point index at `/sectors`
- LAUNCH-051 - Add sector profile pages at `/sectors/[slug]`
- LAUNCH-052 - Add sector-profile smoke coverage and update README, roadmap, product brief, backlog and handoff docs

QA finding:

- Sector navigation now has a smoke check for `/sectors` and `/sectors/financial-services`. Future additions to the sector taxonomy should preserve stable slug generation and avoid hardcoding sector regulatory content in UI components.

## 2026-05-03 Codex Update - Persona Regulation Presets

Launch Command Center note:

> Phase 1O added role-based starting points to the Regulations workspace so common buyer and advisor personas can apply a cautious first-pass lens without needing accounts, saved profiles or a database. Each preset shows first questions and first actions while preserving the caveat that role lenses are orientation filters only.

Launch Tasks:

- LAUNCH-053 - Add persona starting points to `/regulations`
- LAUNCH-054 - Persist active role lenses in shareable `?persona=` URLs
- LAUNCH-055 - Add smoke coverage for persona filter application

QA finding:

- Persona presets now clear automatically when a user manually changes filters, preventing stale role labels from remaining active after a custom filter change.

## 2026-05-03 Codex Update - Coverage Confidence View

Launch Command Center note:

> Phase 1P added a coverage-confidence layer so Data Quality, Markets and jurisdiction profiles distinguish record volume from source trust. The new scoring uses direct depth, priority-source backing, high-confidence records, review flags, stale dates and date-sensitive records. It remains an internal readiness signal, not legal verification or complete market coverage.

Launch Tasks:

- LAUNCH-056 - Add coverage-confidence scoring for tracked jurisdictions
- LAUNCH-057 - Add Coverage Confidence panel to Data Quality
- LAUNCH-058 - Add coverage confidence badges to Markets and jurisdiction profiles

QA finding:

- Market depth targets alone are not enough for commercial readiness. Future market/profile work should check both direct-record depth and coverage confidence before presenting a jurisdiction as ready for premium examples or advisory scans.

## 2026-05-05 Codex Update - Decision Readiness Evidence Gates

Launch Command Center note:

> Phase 1Q added decision-readiness evidence gates so regulation details, drawers and the Data Quality workspace convert source, threshold, evidence and timing gaps into practical review controls. These controls support premium-pack and advisory readiness without claiming legal verification or definitive applicability.

Launch Tasks:

- LAUNCH-059 - Add shared decision-readiness helper for regulation records
- LAUNCH-060 - Add Decision Readiness checklist to regulation details and drawers
- LAUNCH-061 - Add Premium Evidence Gates panel to Data Quality

QA finding:

- Premium/advisory readiness needs more than source confidence. Future client-ready surfaces should show facts to confirm, evidence package, first 30-day actions, source-review steps and commercial-use gates before presenting a regulation as usable in premium examples.

## 2026-05-05 Codex Update - Source Evidence Review Packets

Launch Command Center note:

> Phase 1R added source evidence trails and copyable source-review memos so regulation details can move from seed orientation into a clearer content QA, premium-pack or advisory-review workflow. Source posture, review timing, captured sources and source-review steps are visible at the record level while preserving the caveat that these controls do not verify legal completeness or determine applicability.

Launch Tasks:

- LAUNCH-062 - Add shared source-governance helper for regulation records
- LAUNCH-063 - Add Source Evidence Trail panel to regulation detail pages and drawers
- LAUNCH-064 - Add copyable source-review memo with caveats and captured source links
- LAUNCH-065 - Add source posture samples to the Data Quality source library

QA finding:

- Source links alone are not enough for client-ready or premium reuse. Future record-detail work should show the priority source, review freshness and source-review packet before a record is used in advisory outputs, premium examples or copied briefs.

## 2026-05-07 Codex Update - Review Workflow Tabs And Map Workspace Refresh

Launch Command Center note:

> Phase 1S streamlined Data Quality into focused governance tabs, and Phase 1T refreshed the homepage into a calmer map-first product workspace. The local Natural Earth SVG map now includes no-dependency zoom, reset and drag-to-pan controls, stronger country outlines, visible untracked-country styling and a clearer ocean background. The controls remain static, local and legally cautious: map color is tracked seed record volume, not legal applicability or complete coverage.

Follow-up CI note:

> PR #26 initially failed browser smoke tests because the map index still referenced tracked-only geometry, leaving zero untracked country paths. The fix was to bundle Natural Earth Admin 0 country geometry locally and keep the untracked-country assertion so this does not regress.

Launch Tasks:

- LAUNCH-070 - Streamline Data Quality into focused governance tabs
- LAUNCH-071 - Refresh homepage into a calmer map-first workspace
- LAUNCH-072 - Add no-dependency map pan, zoom and reset controls
- LAUNCH-073 - Make untracked countries, ocean background and country outlines visibly distinct
- LAUNCH-074 - Add smoke coverage for map viewport controls and untracked countries

QA finding:

- The map can technically render country paths and still fail as a product experience if users cannot inspect it. Future map QA should include visible untracked countries, outline/background contrast, viewport controls, selected jurisdiction behavior and page scroll behavior.
