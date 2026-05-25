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

- Decision: Require a briefing scenario before rendering briefing outputs.
- Why: Default briefings can look like raw data aggregation when records, evidence packages and leadership questions are not tied to a clear client or management scenario.
- Consequence: `/briefing` now starts with curated static scenarios and only then renders priority records, workstreams, data-governance checks and copied summaries for that scenario.
- Status: Active.

ADR-032:

- Decision: Default the regulatory timeline to near-term planning.
- Why: A full chronology can bury urgent planning signals behind older or less actionable dates.
- Consequence: `/timeline` now defaults to next 24 months plus high-impact already-effective obligations, with next-12, in-force, longer-term and full-history modes available.
- Status: Active.

ADR-033:

- Decision: Add static regulatory data guardrails to CI.
- Why: The Atlas is growing quickly and source metadata, high-impact review signals, premium-use gates and legal wording need automated regression checks before merge.
- Consequence: Add `npm run check:data` and Playwright data tests while preserving that automated checks do not replace legal/source review.
- Status: Active.

ADR-034:

- Decision: Interpret trust metrics as planning signals.
- Why: Users can misread source coverage, review flags or confidence scores as legal completeness, product defects or source verification.
- Consequence: Use captured-source, review-prompt and confidence-label language with visible caveats on market and data-quality surfaces.
- Status: Active.

ADR-031:

- Decision: Use local SVG pan/zoom controls before introducing a map platform.
- Why: Users need inspectable map behavior, but Mapbox, paid map APIs and runtime geospatial services remain out of MVP scope.
- Consequence: Add no-dependency SVG pan/zoom/reset controls, stronger country outlines and untracked-country styling while preserving local Natural Earth geometry.
- Status: Active.

ADR-032:

- Decision: Maintain an AI review pack as an external feedback interface.
- Why: The product owner wants parallel critique from Claude, ChatGPT or other reviewers while Codex continues shipping, but reviewers need accurate constraints and current-state context.
- Consequence: Keep `docs/ai-review/` current with a current-state export, reviewer prompt, future capability backlog and regulatory coverage worksheet.
- Status: Active.

ADR-033:

- Decision: Route external review feedback before implementation.
- Why: External AI and specialist feedback can mix bugs, source gaps, useful static UX improvements and future platform ideas. Treating all feedback as immediate code work creates scope risk.
- Consequence: Add a Data Quality external review intake lane that routes findings to issue logs, coverage review, backlog or future capability planning.
- Status: Active.

ADR-034:

- Decision: Add value-chain triage as a product entry point.
- Why: Procurement, exporter, product, investor and advisor users often start from exposure type rather than jurisdiction or regulation acronym.
- Consequence: Add `/value-chain` as a static workspace that aggregates existing seed records by value-chain tag and links into filtered regulation views.
- Status: Active.

## Launch Tasks

Create or update `LAUNCH-001` through `LAUNCH-025` from the May 2026 sprint prompt. Mark implemented static website work as Review once code has shipped locally, and keep future infrastructure tasks as Post-launch or Deferred.

Recent follow-up launch tasks:

- LAUNCH-073 - Add static daily launch pulse to Changelog and Data Quality
- LAUNCH-066 - Add Data Quality review workflow export panel
- LAUNCH-067 - Add caveated CSV/JSON review workflow exports
- LAUNCH-068 - Add copyable priority review packet for source QA
- LAUNCH-069 - Add static and smoke coverage for review workflow exports
- LAUNCH-070 - Streamline Data Quality into focused governance tabs
- LAUNCH-071 - Refresh homepage into a calmer map-first workspace
- LAUNCH-072 - Add no-dependency map pan, zoom and reset controls
- LAUNCH-073 - Make untracked countries, ocean background and country outlines visibly distinct
- LAUNCH-074 - Add smoke coverage for map viewport controls and untracked countries
- LAUNCH-075 - Group secondary navigation routes into a translated More menu
- LAUNCH-076 - Replace homepage metric cards with a compact workspace snapshot
- LAUNCH-077 - Add smoke coverage for grouped navigation links
- LAUNCH-078 - Add external AI review export and reviewer prompt
- LAUNCH-079 - Add regulatory coverage review worksheet for market and source-gap review
- LAUNCH-080 - Reconcile external review findings into backlog, Notion and source-governance tasks
- LAUNCH-081 - Add Data Quality external review intake lane
- LAUNCH-082 - Add review feedback intake template
- LAUNCH-083 - Add value-chain exposure workspace
- LAUNCH-084 - Add copyable value-chain exposure briefs and filtered regulation handoffs

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
- global navigation crowding the header or hiding secondary routes without a stable More-menu test

## 2026-05-02 Codex Update - Visible Map And Market Coverage Depth

Launch Command Center note:

> Phase 1I improved the first trust surface of the Atlas: the local Natural Earth country-outline map now appears from tablet widths upward with stronger borders, selected-state cues and a geometry fallback. Data Quality now includes market coverage-depth targets so core commercial markets and watch-expansion markets show direct-record depth, gaps and source-review prompts.

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

> Phase 1P added a coverage-confidence layer so Data Quality, Markets and jurisdiction profiles distinguish record volume from source trust. The new scoring uses direct depth, priority-source backing, high-confidence records, review prompts, stale dates and date-sensitive records. It remains an internal readiness signal, not legal verification or complete market coverage.

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

## 2026-05-09 Codex Update - Navigation And Homepage Calm-Down

Launch Command Center note:

> Phase 1U keeps the Atlas broad without making the first screen feel overloaded. Core workspaces remain visible in the header, secondary governance/commercial/launch routes move into a translated More menu, and the homepage hero now uses one compact workspace snapshot instead of three separate metric cards.

### 2026-05-20 Daily Launch Pulse

> Phase 1V adds a static daily launch pulse to the public changelog and Data Quality overview. The pulse records what shipped, validation expectations and the next review focus without adding automated monitoring, email alerts, accounts, payments, a database or legal-update-service claims.

Suggested Notion task:

- LAUNCH-073 - Add daily launch pulse to release governance

Acceptance criteria:

- Changelog and Data Quality display the same current daily pulse.
- Pulse includes shipped items, validation expectations, next focus and caveat language.
- Pulse remains static editorial launch-train context, not automated monitoring or legal advice.

Launch Tasks:

- LAUNCH-075 - Group secondary navigation routes into a translated More menu
- LAUNCH-076 - Replace homepage metric cards with a compact workspace snapshot
- LAUNCH-077 - Add smoke coverage for grouped navigation links

QA finding:

- Navigation breadth can become a UX bug even when every route works. Future route additions should be placed intentionally into primary navigation only if they support the main user journey; otherwise they should live in More, route-specific CTAs, or supporting pages.

## 2026-05-20 Codex Update - Expert Review Launch-Readiness Fixes

Launch Command Center note:

> Phase 1W applies the highest-risk findings from the May 20 expert review. The release separates CSRD and CSDDD threshold signals, shows premium-use gates on premium pack previews, removes the internal launch-resource route from public navigation, and adds a Start Here panel so first-time users can choose assessment, market profile or regulation search before handling advanced controls.

Launch Tasks:

- LAUNCH-078 - Separate CSRD and CSDDD threshold caveats in source-linked seed records
- LAUNCH-079 - Add premium-use/source-review gates to premium pack previews
- LAUNCH-080 - Remove internal `/launch` resources from public navigation and mark route noindex
- LAUNCH-081 - Add Start Here module to the homepage
- LAUNCH-082 - Replace public commercial CTA secondary links to `/launch` with user-facing plan/advisory routes

QA finding:

- Premium and advisory validation surfaces must respect content-governance gates. If a record is blocked or review-needed in the Marquee queue, any premium pack or alert preview that mentions it needs a visible illustrative-only or review-before-use label.

## 2026-05-20 Codex Update - Threshold Matrix For High-Value Records

Launch Command Center note:

> Phase 1AE adds a static threshold matrix for high-value records. The matrix makes entity, market, product, value-chain and jurisdiction-adoption facts visible before a user treats a record as assessment, premium-preview or advisory context. It remains source-linked seed planning intelligence, not a legal scope determination.

Launch Tasks:

- LAUNCH-083 - Add `/thresholds` page for high-value threshold and scope signals
- LAUNCH-084 - Add `data/thresholdMatrix.ts` with facts to confirm, timing signal, source to verify, review status and caveat
- LAUNCH-085 - Link Data Quality and regulation detail pages to threshold-sensitive review rows
- LAUNCH-086 - Add data guardrail coverage for threshold matrix rows

QA finding:

- Threshold-sensitive records need a separate review lane. Future premium, alert or advisory examples should check the matrix before using CSRD, CSDDD, SFDR, Taxonomy, EUDR, California climate disclosure, ISSB adoption or national due-diligence records as client-ready examples.

## 2026-05-20 Codex Update - Assessment Readiness Plan

Launch Command Center note:

> Phase 1AF brings threshold-review logic into the assessment workflow. Indicative shortlists now show threshold facts to check, first 30-day actions and likely owner functions, plus badges when a record appears in the threshold matrix.

Launch Tasks:

- LAUNCH-087 - Add assessment readiness plan cards
- LAUNCH-088 - Flag threshold-matrix records in assessment shortlist cards
- LAUNCH-089 - Add threshold-sensitive record context to copied assessment summaries
- LAUNCH-090 - Add smoke coverage for assessment readiness plan

QA finding:

- Assessment output should not stop at a ranked shortlist. Each result set should help the user decide what to verify next, who should own it and which threshold-sensitive records require source review before client use.

## 2026-05-21 Codex Update - Marquee 10 Source-Review Packet

Launch Command Center note:

> Phase 1AG turns the Marquee 10 review queue into an operational source-review packet. Data Quality now shows premium-use blockers, priority sources, threshold facts and owner actions for launch-critical regimes before those records are reused in premium packs, advisory scans or client-ready summaries.

Launch Tasks:

- LAUNCH-091 - Add Marquee 10 source-review packet to Data Quality
- LAUNCH-092 - Combine review status, decision-readiness, source posture and threshold context for Marquee 10 records
- LAUNCH-093 - Add source, threshold and owner/action cards for launch-critical regimes
- LAUNCH-094 - Add smoke coverage for the Marquee 10 source-review packet

QA finding:

- Source links, threshold rows and premium-use gates become much more useful when they are shown together. Future premium or advisory examples should check this packet before presenting Marquee 10 records as client-ready content.

## 2026-05-21 Codex Update - Regulation Implementation Roadmap

Launch Command Center note:

> Phase 1AH adds a 30/60/90-day implementation roadmap to regulation detail pages and drawers. The roadmap translates potentially relevant records into cautious source-review, owner, evidence and briefing actions without making legal applicability claims.

Launch Tasks:

- LAUNCH-095 - Add reusable implementation-roadmap helper
- LAUNCH-096 - Add implementation roadmap to regulation detail pages and drawers
- LAUNCH-097 - Add copyable roadmap output with edition metadata and caveats
- LAUNCH-098 - Add smoke and copy-surface coverage for implementation roadmap

QA finding:

- Regulation details should answer the user’s next operational question: what should we verify, who owns it, what evidence is needed and what could happen in the next 30/60/90 days. Roadmaps must remain caveated and source-review oriented.

## 2026-05-21 Codex Update - Assessment Trigger Review

Launch Command Center note:

> Phase 1AI makes the assessment workflow explain why a shortlist appears. The new profile trigger review separates jurisdiction, company profile, sector, value-chain, financial and source/threshold signals so users can see which facts shape the indicative result and what they should verify next.

Launch Tasks:

- LAUNCH-099 - Add assessment trigger-review panel
- LAUNCH-100 - Add trigger-review context to copied assessment shortlist
- LAUNCH-101 - Add smoke coverage for assessment trigger explanations

QA finding:

- Assessment users need to understand why results appear, not only what results appear. Trigger explanations should show planning logic and verification needs without implying legal applicability.

## 2026-05-21 Codex Update - Market Trigger Review

Launch Command Center note:

> Phase 1AJ adds market trigger reviews to jurisdiction profile pages. The new panel groups a selected market's tracked seed records into corporate reporting, climate, sustainable finance, supply-chain, product/trade and source-review signals so users can see what drives the market profile before opening records or preparing an advisory brief.

Launch Tasks:

- LAUNCH-102 - Add reusable market trigger-review helper
- LAUNCH-103 - Add market trigger panel to jurisdiction profile pages
- LAUNCH-104 - Add market trigger context to copied market profile Markdown and smoke coverage

QA finding:

- Jurisdiction pages should explain why a market matters, not only list records. Market trigger reviews must stay framed as seed-data orientation and should not imply complete market coverage, legal applicability or entity-specific compliance scope.

## 2026-05-22 Codex Update - CI Node 24 Readiness

Launch Command Center note:

> Phase 1AK resolves a GitHub Actions platform deprecation warning by opting CI and Lighthouse JavaScript actions into Node 24 before GitHub changes the default. The app build runtime remains Node 22, and the change is launch-pipeline hardening only.

Launch Tasks:

- LAUNCH-105 - Opt CI workflow JavaScript actions into Node 24 runtime
- LAUNCH-106 - Opt Lighthouse workflow JavaScript actions into Node 24 runtime
- LAUNCH-107 - Document action-runtime versus app-runtime distinction in workflow and issue-resolution notes

QA finding:

- Green checks can still contain platform deprecation warnings. Treat those annotations as workflow maintenance issues, fix the smallest configuration layer and document the prevention rule before the warning becomes a failed check.

## 2026-05-22 Codex Update - GitHub Actions Node 24 Action Upgrade

Launch Command Center note:

> Phase 1AL upgrades CI and Lighthouse to `actions/checkout@v5` and `actions/setup-node@v5` after the first Node 24 opt-in proved compatibility but still showed that the v4 actions targeted Node 20 internally. The app runtime remains Node 22.

Launch Tasks:

- LAUNCH-108 - Upgrade checkout action to Node 24-compatible major version
- LAUNCH-109 - Upgrade setup-node action to Node 24-compatible major version
- LAUNCH-110 - Revalidate CI, browser smoke, Lighthouse and Vercel after action-version upgrade

QA finding:

- Runtime opt-ins can prove compatibility without removing the underlying target-version warning. If GitHub says an action still targets a deprecated runtime, check the official action metadata and upgrade the action version when a stable Node 24-compatible release exists.

## 2026-05-25 Codex Update - Market Obligation Footprint

Launch Command Center note:

> Phase 1AM adds market obligation footprints to jurisdiction profile pages. The new panel translates a selected market's tracked seed records into obligation categories, likely owner functions, evidence starters and first actions so users can understand what kinds of work may need planning before opening individual regulation records.

Launch Tasks:

- LAUNCH-111 - Add reusable market obligation profile helper
- LAUNCH-112 - Add market obligation footprint to jurisdiction profile pages
- LAUNCH-113 - Add obligation-footprint context to copied market profile Markdown and smoke coverage

QA finding:

- Jurisdiction pages should help users understand both why a market matters and what kinds of work may be required. Obligation footprints must stay framed as seed-data planning orientation and should not imply legal applicability, entity-specific duties or complete jurisdiction coverage.

## 2026-05-25 Codex Update - Public Journey Simplification

Launch Command Center note:

> Phase 1AN applies the urgent simplification brief. The public journey now starts with a smaller primary nav, clearer homepage actions and a stronger advisory-scan path, while deeper planning, trust and commercial-preview routes move into a grouped More menu. `/launch` remains an internal noindex workspace.

Launch Tasks:

- LAUNCH-114 - Simplify primary navigation to Start, Assessment, Markets, Regulations, Advisory and More
- LAUNCH-115 - Reframe homepage hero and Start panel around assessment, market/regulation exploration and advisory scans
- LAUNCH-116 - Remove public MVP/operator wording from core CTAs and keep launch resources internal/noindex
- LAUNCH-117 - Create simplification roadmap with urgent, next-seven-day and 30-day follow-ups
- LAUNCH-118 - Add smoke coverage for simplified nav, launch noindex and printable brief edition consistency

QA finding:

- The Atlas should not expose every governance, commercial preview and launch-operator surface as a first-level destination. First-time users need one of three clear paths: run an indicative assessment, inspect a market/regulation or request an advisory-supported scan. Deeper expert surfaces should remain available but secondary.

## 2026-05-25 Codex Update - Assessment Shortlist Overview

Launch Command Center note:

> Phase 1AO continues the simplification pass inside `/assessment`. The page now puts a shortlist overview ahead of detailed trigger logic, with top records, cautious relevance-mix counts, facts to confirm, first 30-day actions and an advisory-scan CTA.

Launch Tasks:

- LAUNCH-119 - Add decision-first assessment shortlist overview
- LAUNCH-120 - Surface top records, relevance mix, facts to confirm and first actions before detailed trigger logic
- LAUNCH-121 - Add assessment overview smoke coverage and update release context

QA finding:

- Assessment pages should answer "what should I review first?" before asking users to parse detailed trigger logic. Keep rankings indicative and caveated; do not convert shortlist position into legal applicability or confirmed compliance scope.

## 2026-05-25 Codex Update - Regulations Search-First Layout

Launch Command Center note:

> Phase 1AP continues the simplification pass inside `/regulations`. The page now starts with search and six primary filters, then shows results, with role lenses, comparison, label help, sharing and exports treated as supporting tools below the table.

Launch Tasks:

- LAUNCH-122 - Rework Regulations into a search-first workspace
- LAUNCH-123 - Move role lenses, compare, label help, share and exports below database results
- LAUNCH-124 - Add smoke coverage for the Regulations search-first hierarchy and collapsed role lenses

QA finding:

- The Regulations database should help users narrow records before showing optional tools. Role lenses, compare, glossary help and exports are valuable but should not compete with search, primary filters or the result table on first load.

## 2026-05-25 Codex Update - Reusable Advisory Scan CTA

Launch Command Center note:

> Phase 1AQ standardizes the manual advisory-scan path. Market, assessment and regulation-detail surfaces now use a shared advisory CTA pattern with consistent mailto behavior, deliverable framing and legal caveats.

Launch Tasks:

- LAUNCH-125 - Add shared advisory scan CTA component
- LAUNCH-126 - Convert market briefing CTA into a wrapper around the shared advisory CTA
- LAUNCH-127 - Replace assessment and regulation-detail advisory CTAs with the shared component
- LAUNCH-128 - Update release context, handoff and QA notes for advisory CTA governance

QA finding:

- Advisory CTAs are the near-term commercial path and should feel consistent. They must remain manual, source-linked and legally caveated; do not create one-off advisory request blocks that drift into legal advice, automated delivery or paid-infrastructure promises.

## 2026-05-25 Codex Update - Sector Finder Simplification

Launch Command Center note:

> Phase 1AR continues the simplification pass inside `/sectors`. The page now starts with a searchable sector finder, sector-family filters and practical review-first records instead of aggregate metrics and dense chip-heavy cards.

Launch Tasks:

- LAUNCH-129 - Add sector group taxonomy for business-context browsing
- LAUNCH-130 - Add searchable sector finder with group filters and empty state
- LAUNCH-131 - Replace sector aggregate metrics with practical triggers, source counts and review-first record cues
- LAUNCH-132 - Update release context, roadmap and QA notes for sector simplification

QA finding:

- Sector pages should help business users choose a sector context and know what to inspect first. Counts must remain framed as current seed coverage, not complete sector legal inventory, source verification or applicability determination.

## 2026-05-25 Codex Update - Interface Language Clarity

Launch Command Center note:

> Phase 1AS clarifies the language selector. The control now identifies itself as interface language and carries a localized caveat that translated chrome is not official legal translation of regulatory records.

Launch Tasks:

- LAUNCH-133 - Rename language selector to interface language
- LAUNCH-134 - Add localized language-toggle caveat for legal translation boundary
- LAUNCH-135 - Improve dark-mode styling for language control
- LAUNCH-136 - Update release context and simplification roadmap

QA finding:

- Language support is useful for navigation and product guidance, but it must not imply official legal translation or source interpretation. Keep record-level legal content source-linked and caveated.
