# Etica ESG · Regulatory Atlas Handoff

## Current Phase

The app is now in a static Phase 1AT value-chain lane simplification pass on top of the Phase 1A Etica credibility update, Phase 1B market coverage pass, Phase 1C workflow/translation/coverage-control pass, Phase 1D master content expansion, Phase 1E decision-support polish, Phase 1F commercial-validation surfaces, Phase 1G premium-pack/manual-conversion follow-up, Phase 1H premium-output/content-governance pass, Phase 1I visible-map/coverage-depth pass, Phase 1J decision-readiness pass, Phase 1K launch-assets pass, Phase 1L source-governance pass, Phase 1M market-profile navigation pass, Phase 1N sector-starting-point pass, Phase 1O persona-preset pass, Phase 1P coverage-confidence pass, Phase 1Q decision-readiness evidence-gate pass, Phase 1R source-evidence review-packet pass, Phase 1S review-workflow export pass, Phase 1T map-workspace refresh pass, Phase 1U navigation/homepage calm-down pass, Phase 1V daily launch-pulse pass, Phase 1W AI review-pack pass, Phase 1X external review-intake pass, Phase 1Y value-chain exposure pass, Phase 1Z expert-review launch-readiness pass, Phase 1AA scenario-led briefing pass, Phase 1AB timeline planning pass, Phase 1AC data-guardrail pass, Phase 1AD trust-signal clarity/manual request-path pass, Phase 1AE threshold-matrix pass, Phase 1AF assessment-readiness pass, Phase 1AG Marquee 10 source-review packet pass, Phase 1AH implementation-roadmap pass, Phase 1AI assessment-trigger-review pass, Phase 1AJ market-trigger-review pass, Phase 1AK CI Node 24 readiness pass, Phase 1AL GitHub Actions Node 24 action-upgrade pass, Phase 1AM market-obligation-footprint pass, Phase 1AN public-journey-simplification pass, Phase 1AO assessment-shortlist-overview pass, Phase 1AP regulations-search-first-layout pass, Phase 1AQ reusable-advisory-scan-CTA pass, Phase 1AR sector-finder simplification pass and Phase 1AS interface-language clarity pass. The goal remains deployability and legal caution, with added emphasis on reducing public cognitive load before adding more features.

## Phase 1AT Changes Delivered

- Updated dataset metadata and changelog to `0.5.64 - May 2026`.
- Added six primary value-chain lane definitions in `lib/valueChainProfile.ts`.
- Reworked `/value-chain` from raw tag cards into business-exposure lanes for suppliers, trade/imports, products/claims, portfolio/finance, own operations/governance and customer pressure.
- Added lane-specific start questions, evidence prompts, first actions, suggested owners and copyable lane summaries.
- Reduced repeated chip text and kept source-review, confidence and legal caveats visible.

## Phase 1AT Product Rationale

The simplification roadmap called out `/value-chain` because users often arrive with a practical exposure question rather than a legal taxonomy label. Phase 1AT turns the route into a lane-based triage tool: pick the exposure, see what evidence to prepare, then open filtered source-linked records or run the assessment. It remains seed intelligence for orientation and evidence planning, not a complete value-chain legal inventory or applicability determination.

## Phase 1AS Changes Delivered

- Updated dataset metadata and changelog to `0.5.63 - May 2026`.
- Changed the language selector label to "Interface language" and added localized equivalents.
- Added a localized tooltip caveat that language selection changes interface guidance only.
- Clarified that regulatory records are not official legal translations.
- Improved dark-mode styling for the language selector.

## Phase 1AS Product Rationale

The simplification roadmap called out language-toggle clarity because partial interface translation can create a legal-trust risk if users infer that regulatory records are official translations. Phase 1AS keeps the multilingual chrome useful while making its boundary clear: the toggle changes product guidance, not legal source language or legal interpretation.

## Phase 1AR Changes Delivered

- Updated dataset metadata and changelog to `0.5.62 - May 2026`.
- Added `lib/sectorGroups.ts` to group sectors into capital markets, industrial/infrastructure, consumer/supply-chain and public/digital contexts.
- Added `components/SectorDirectory.tsx`, a searchable sector finder with group filters, empty state, review-first records and calmer source/review cues.
- Reworked `/sectors` so the page leads with search and business-context triggers instead of aggregate metrics and dense chip cards.
- Preserved the assessment handoff, sector detail pages, advisory CTA and legal caveats.

## Phase 1AR Product Rationale

The simplification roadmap identified sector pages as the next overloaded route after Assessment, Regulations and advisory CTAs. Phase 1AR makes `/sectors` more useful for first-time business users by asking them to start with a sector family or search term, then showing review-first records and practical triggers. The page remains seed regulatory intelligence and does not imply complete sector inventories, official source verification or applicability determinations.

## Phase 1AQ Changes Delivered

- Updated dataset metadata and changelog to `0.5.61 - May 2026`.
- Added `components/AdvisoryScanCTA.tsx` as a shared manual advisory-scan component.
- Converted `components/MarketBriefingCTA.tsx` into a stable wrapper around the shared CTA.
- Updated assessment, regulation detail page and regulation drawer advisory CTAs to use the shared component.
- Standardized advisory-scan caveats, deliverable framing and mailto behavior.

## Phase 1AQ Product Rationale

Phase 1AP made the database calmer. Phase 1AQ makes the manual commercial path calmer: advisory scan CTAs should feel like one consistent Etica ESG request path, not one-off button copy scattered across routes. The component preserves the MVP guardrails by keeping requests mailto-only and caveated as source-linked planning outputs, not legal advice, official source verification or automated delivery.

## Phase 1AP Changes Delivered

- Updated dataset metadata and changelog to `0.5.60 - May 2026`.
- Reworked `/regulations` into a search-first database workspace.
- Put search, jurisdiction, topic, sector, company type and reporting year above the result table.
- Moved role lenses, compare, label help, share and export controls below the result table.
- Added embedded persona preset support so role lenses can live inside a secondary tools panel without duplicate card chrome.
- Updated smoke coverage for the search-first hierarchy and collapsed role-lens behavior.

## Phase 1AP Product Rationale

Phase 1AO made assessment outputs decision-first. Phase 1AP applies the same simplification principle to the Regulations database: users should search and narrow the table before choosing optional role lenses, comparison, glossary help or export utilities. This keeps the database calmer while preserving all source-quality, export, detail-view and legal-caution behavior.

## Phase 1AO Changes Delivered

- Updated dataset metadata and changelog to `0.5.59 - May 2026`.
- Added a decision-first shortlist overview to `/assessment`.
- Surfaced top records to review first, relevance-mix counts, facts to confirm and first 30-day actions before detailed trigger logic.
- Added a direct advisory-scan CTA inside the assessment result hierarchy.
- Added smoke coverage for the new overview.

## Phase 1AO Product Rationale

Phase 1AN clarified the public start path. Phase 1AO applies the same simplification principle inside the assessment workflow: users should see the practical shortlist answer before they inspect the detailed trigger logic. The overview remains cautious seed intelligence and does not determine legal applicability, thresholds, deadlines or complete coverage.

## Phase 1AN Changes Delivered

- Updated dataset metadata and changelog to `0.5.58 - May 2026`.
- Simplified primary navigation to Start, Assessment, Markets, Regulations, Advisory and a grouped More menu.
- Grouped More into planning views, trust/methodology and commercial preview destinations.
- Reframed the homepage hero around assessment, market browsing and regulation search instead of changelog/plans.
- Updated the Start panel to center assessment, market/regulation exploration and advisory scan paths.
- Replaced public “Static MVP CTA only” wording in the market briefing CTA with customer-facing advisory-scan language.
- Kept `/launch` noindex and relabelled it as an internal launch workspace.
- Added `docs/simplification-roadmap.md` to separate urgent May 25 work from seven-day and 30-day follow-ups.
- Added smoke coverage for simplified navigation, internal launch noindex and printable brief edition consistency.

## Phase 1AN Product Rationale

The May 25 simplification brief found that the Atlas was credible but overexposed: the public experience surfaced map, database, governance, launch operations, premium previews and methodology at the same level. Phase 1AN turns the public product back into a clear start journey: assess what may matter, inspect markets/regulations and request a source-linked advisory scan when human interpretation is needed. The deeper expert surfaces remain available under More.

## Phase 1AM Changes Delivered

- Updated dataset metadata and changelog to `0.5.57 - May 2026`.
- Added `lib/marketObligationProfile.ts` to derive market obligation categories from existing jurisdiction records.
- Added `components/MarketObligationMatrix.tsx` to jurisdiction profile pages.
- Grouped tracked records by reporting, assurance, governance, due diligence, supply-chain, financial disclosure, taxonomy, transition-plan, data-collection and product-compliance obligations.
- Added likely owner functions, evidence starters, first actions and priority record links for populated obligation categories.
- Added obligation-footprint context to copied market profile Markdown.
- Added smoke coverage for the obligation footprint on `/jurisdiction/euu`.

## Phase 1AM Product Rationale

After adding market trigger reviews, jurisdiction profiles explained why a market mattered but still made users infer what workstreams may be required. Phase 1AM adds an obligation footprint so a CSO, legal lead, advisor or procurement team can quickly understand whether the market profile is reporting-heavy, due-diligence-heavy, finance-heavy, product-heavy or data-heavy. The footprint remains derived seed-data orientation and does not determine legal applicability, entity-specific duties or complete local coverage.

## Phase 1AL Changes Delivered

- Updated dataset metadata and changelog to `0.5.56 - May 2026`.
- Upgraded `actions/checkout` from v4 to v5 in CI and Lighthouse workflows.
- Upgraded `actions/setup-node` from v4 to v5 in CI and Lighthouse workflows.
- Kept the Node 24 action-runtime opt-in from Phase 1AK.
- Kept the application build runtime on Node 22.
- Updated issue-resolution and development workflow notes after PR #71 showed the v4 actions still targeted Node 20 while being forced onto Node 24.

## Phase 1AL Product Rationale

Phase 1AK proved the workflows could run under Node 24, but GitHub still warned that the v4 action versions target Node 20 internally. Phase 1AL upgrades the action versions themselves so CI is aligned with GitHub's Node 24 action runtime before the deprecation becomes a launch blocker.

## Phase 1AK Changes Delivered

- Updated dataset metadata and changelog to `0.5.55 - May 2026`.
- Opted `.github/workflows/ci.yml` and `.github/workflows/lighthouse.yml` into the Node 24 JavaScript action runtime with `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true`.
- Kept the application install, typecheck, build, browser smoke and Lighthouse runtime on Node 22 through `actions/setup-node`.
- Documented the GitHub Actions Node 20 deprecation annotation in `docs/issue-resolution-log.md`.
- Updated development workflow guidance so future agents preserve the distinction between GitHub action runtime and app build runtime.

## Phase 1AK Product Rationale

The last green main build emitted GitHub platform deprecation annotations for Node 20 JavaScript actions. Phase 1AK resolves that launch-pipeline risk before it becomes a blocked PR, while keeping the MVP static and avoiding any product-scope, infrastructure or dependency expansion.

## Phase 1AJ Changes Delivered

- Updated dataset metadata and changelog to `0.5.54 - May 2026`.
- Added `lib/marketTriggerProfile.ts` to derive market trigger categories from existing jurisdiction records.
- Added `components/MarketTriggerPanel.tsx` to jurisdiction profile pages.
- Grouped market drivers into corporate reporting, climate, sustainable finance, supply-chain, product/trade and source-review signals.
- Added matched-record counts, priority record links, verification prompts and first actions for each trigger category.
- Added market trigger-review context to copied market profile Markdown.
- Added smoke coverage for the market trigger panel on `/jurisdiction/euu`.

## Phase 1AJ Product Rationale

Jurisdiction profiles should answer why a market matters before users open individual records. Phase 1AJ turns a selected market's seed records into a driver-level review so users can see whether the current profile is mostly corporate reporting, climate, sustainable finance, supply-chain, product/trade or source-review driven. The panel remains an orientation aid and does not determine legal applicability, complete jurisdiction coverage or entity-specific compliance obligations.

## Phase 1AI Changes Delivered

- Updated dataset metadata and changelog to `0.5.53 - May 2026`.
- Added a profile trigger-review panel to `/assessment`.
- Separated jurisdiction, company profile, sector, value-chain, financial and source/threshold signals.
- Added matched-record counts and next facts to verify for each trigger category.
- Added trigger-review context to copied assessment shortlist Markdown.
- Added smoke coverage for the trigger-review panel.

## Phase 1AI Product Rationale

Assessment users need to understand why a regulation appears, not only that it appears. Phase 1AI makes the logic more transparent by showing how user-provided profile facts affect the shortlist and which facts need verification before advisory, premium or compliance-planning use.

## Phase 1AH Changes Delivered

- Updated dataset metadata and changelog to `0.5.52 - May 2026`.
- Added `lib/implementationRoadmap.ts` to derive cautious 30/60/90-day implementation stages from existing regulation, decision-readiness and source-governance data.
- Added `components/ImplementationRoadmap.tsx` to regulation detail pages and drawers.
- Added copyable roadmap Markdown with edition metadata, source-review context and legal-caution caveats.
- Added smoke and copy-surface coverage for the implementation roadmap.

## Phase 1AH Product Rationale

Regulation detail pages should help a user move from orientation into a practical planning conversation. Phase 1AH adds a staged roadmap that shows what to verify first, who may own the work, what evidence to collect and how to brief findings while preserving the caveat that the Atlas does not determine legal applicability or verify legal completeness.

## Phase 1AG Changes Delivered

- Updated dataset metadata and changelog to `0.5.51 - May 2026`.
- Added `components/MarqueeSourceReviewPacket.tsx` on the Data Quality review workflow tab.
- Combined Marquee 10 review status, premium-use blockers, decision-readiness gates, source posture and threshold matrix context.
- Added priority source, threshold fact and owner/action cards for the highest-demand launch regimes.
- Added smoke coverage for the Marquee 10 source-review packet.

## Phase 1AG Product Rationale

Premium packs and advisory scans need a clearer bridge from static seed data to source-reviewed content. Phase 1AG turns the Marquee 10 queue into an operational packet that shows what to verify, who should own review and which records remain blocked before client-ready reuse. The packet remains source-governance support, not legal verification or an applicability determination.

## Phase 1AF Changes Delivered

- Updated dataset metadata and changelog to `0.5.50 - May 2026`.
- Added assessment readiness plan cards for threshold facts to check, first 30-day actions and likely owner functions.
- Added threshold matrix row badges on assessment shortlist cards.
- Updated copied assessment summaries so threshold-sensitive records are listed and caveated.
- Added smoke coverage for the assessment readiness plan.

## Phase 1AF Product Rationale

The threshold matrix should not sit only in Data Quality. Phase 1AF brings the same threshold-review logic into the user-facing assessment flow, so a CSO, legal lead, supplier lead or advisor can see what facts to confirm and who to involve before opening a detailed record. The output remains an indicative planning prompt, not a legal applicability finding.

## Phase 1AE Changes Delivered

- Updated dataset metadata and changelog to `0.5.49 - May 2026`.
- Added `/thresholds` as a source-linked threshold matrix for high-value records.
- Added `data/thresholdMatrix.ts` with threshold type, screening signal, facts to confirm, timing signal, source to verify, review status, confidence and caveat.
- Added a Data Quality handoff card and regulation-detail threshold callouts for records that appear in the matrix.
- Added data guardrail coverage so threshold matrix rows must map to existing regulation records and include source/caveat metadata.

## Phase 1AE Product Rationale

The expert review identified threshold and scope interpretation as one of the highest trust risks. Phase 1AE turns threshold-sensitive records into a clear review lane: users can see what facts to confirm, which source to verify and whether a row is source-reviewed seed, date-sensitive, jurisdiction-dependent or review-before-use. The matrix remains an orientation tool, not a legal applicability engine.

## Phase 1AD Changes Delivered

- Updated dataset metadata and recent changelog to `0.5.48 - May 2026`.
- Added `components/QualitySignalExplainer.tsx` on Data Quality and Markets so users understand record counts, source-link rates, review prompts and confidence labels.
- Added `components/ManualRequestPanel.tsx` on Plans, Alerts, Advisory and Premium Roadmap so commercial/advisory CTAs explain what to send and what Etica returns.
- Replaced public review-flag and broad source-coverage wording with safer review-prompt and captured-source language across core surfaces.
- Kept conversion manual through mailto-only paths with no accounts, billing, database, production email alerts or legal-advice claims.

## Phase 1AD Product Rationale

The expert review found that transparency metrics can look like product defects or completeness claims if users do not understand them, and that request CTAs can feel circular without concrete next-step guidance. Phase 1AD makes trust signals easier to interpret and turns commercial/advisory CTAs into clear manual request paths while preserving the static MVP guardrails.

## Phase 1AC Changes Delivered

- Updated dataset metadata and recent changelog to `0.5.47 - May 2026`.
- Added `tests/data-guardrails.spec.ts` to check source metadata, high-impact review signals, premium-use gates and definitive legal wording.
- Added `npm run check:data` for targeted data-governance checks without new dependencies.
- Kept the checks in the existing Playwright CI path so future seed-data regressions are caught before merge.

## Phase 1AC Product Rationale

The expert review recommended automated checks for source metadata, premium-use gates and legal-overclaim wording. Phase 1AC makes those checks part of the launch train while preserving the distinction between automated QA and qualified source/legal review.

## Phase 1AB Changes Delivered

- Updated dataset metadata and recent changelog to `0.5.46 - May 2026`.
- Added planning-horizon tabs to `/timeline`: next 12 months, next 24 months, already in force, longer-term watch and full history.
- Made the next-24-month horizon the default so users see near-term planning items first instead of a full historical chronology.
- Kept high-impact already-effective obligations visible in the default horizon for readiness context.
- Added active filter summary support and smoke coverage for timeline horizon selection and reset behavior.

## Phase 1AB Product Rationale

The expert review found that the timeline was useful but too chronological by default. Phase 1AB makes `/timeline` more decision-oriented by starting with a near-term planning horizon and moving full history into an explicit mode.

## Phase 1AA Changes Delivered

- Updated dataset metadata and recent changelog to `0.5.45 - May 2026`.
- Added `data/briefingScenarios.ts` for curated EU reporting, PE portfolio, supplier/exporter, financial-services and board/risk committee briefing scenarios.
- Updated `/briefing` so users choose a planning scenario before any priority-record, advisory-workstream, data-governance or client-summary output renders.
- Passed selected scenario context into executive briefing cards so leadership question, first operating move, evidence package, advisory motion, caveat and next checks match the chosen use case.
- Added smoke coverage for the scenario-first briefing flow.

## Phase 1AA Product Rationale

The May 20 expert review found that the briefing workspace could feel like raw data aggregation if it showed default records and evidence packages before the user selected a planning question. Phase 1AA turns `/briefing` into a scenario-led advisory workspace so outputs are narrower, clearer and less likely to mix unrelated regulatory regimes.

## Phase 1Z Changes Delivered

- Updated dataset metadata and recent changelog to `0.5.44 - May 2026`.
- Added a homepage Start Here panel with three first actions: exposure assessment, market profile and regulation search.
- Removed `/launch` from public navigation, marked the route noindex and changed public commercial CTA secondary paths to user-facing plan/advisory routes.
- Added `lib/premiumUseGates.ts` and premium pack preview labels for illustrative-only, review-before-use and orientation-ready records.
- Strengthened CSRD/CSDDD seed-record wording so CSDDD thresholds are not reused as general EU corporate-reporting thresholds.
- Added smoke coverage for the Start Here panel, hidden Launch nav item and premium pack source-review gates.

## Phase 1Z Product Rationale

The May 20 expert review identified trust-risk issues before the next product expansion: threshold wording needed to be regime-specific, blocked premium-use records needed visible gates, and operator launch resources should not be part of the public user journey. Phase 1Z fixes those credibility issues while improving first-time orientation on the homepage.

## Phase 1Y Changes Delivered

- Updated dataset metadata and recent changelog to `0.5.43 - May 2026`.
- Added `/value-chain` as a business-exposure workspace.
- Added `lib/valueChainProfile.ts` for value-chain profile aggregation.
- Added copyable value-chain exposure briefs and links into filtered regulation views.
- Added Header More-menu access and smoke coverage for the route.

## Phase 1Y Product Rationale

Many users do not start with a country or a regulation acronym. They start with a business exposure: suppliers, imports, products, claims, portfolio companies, financed emissions, own operations or board oversight. The value-chain workspace makes that entry point visible and actionable while preserving the static MVP guardrails and legal caveats.

## Phase 1X Changes Delivered

- Updated dataset metadata and recent changelog to `0.5.42 - May 2026`.
- Added `data/reviewIntake.ts` for external review categories and routing destinations.
- Added `components/ExternalReviewIntakePanel.tsx` to the Data Quality review workflow tab.
- Added copyable intake-routing text so feedback can move into issue logs, coverage worksheets, product backlog or future-capability planning.
- Added `docs/ai-review/Review_Feedback_Intake_Template.md`.
- Added smoke coverage for the new Data Quality external review intake surface.

## Phase 1X Product Rationale

The AI review pack helps collect feedback, but feedback only improves the product if it is triaged into the right artifact. Phase 1X turns outside critique into an operating workflow: confirmed defects go to the issue log, content gaps go to the coverage worksheet, static MVP improvements go to the backlog and future platform ideas stay out of the current build until explicitly approved.

## Phase 1W Changes Delivered

- Updated dataset metadata and recent changelog to `0.5.41 - May 2026`.
- Added `docs/ai-review/ESG_Regulatory_Atlas_AI_Review_Export_2026-05-20.md` as a detailed current-state export for Claude, ChatGPT or another external reviewer.
- Added `docs/ai-review/AI_Reviewer_Feedback_Prompt.md` with structured reviewer instructions for product, UX, ESG coverage, legal-safety, commercial and technical feedback.
- Added `docs/ai-review/Future_Capabilities_Deep_Review_Backlog.md` to separate static MVP improvements from later platform capabilities that require explicit scope approval.
- Added `docs/ai-review/Regulatory_Coverage_Review_Worksheet.md` and `.csv` to support market-by-market and regulation-by-regulation coverage review.
- Updated README, roadmap, product brief, release context and agent handoff docs so the external review pack becomes part of the standing workflow.

## Phase 1W Product Rationale

The product owner wants to collect detailed critique from another AI while Codex continues implementation. A structured review pack prevents outside feedback from becoming generic or disconnected from current constraints. It also gives ESG, legal-safety and product reviewers a shared worksheet for coverage gaps, source quality, launch blockers and premium-use blockers without treating the review output as legal advice.

## Phase 1V Changes Delivered

- Updated dataset metadata and recent changelog to `0.5.40 - May 2026`.
- Added `data/dailyUpdates.ts` as a static daily launch-train note for shipped work, validation expectations and next product-review focus.
- Added `components/DailyUpdatePulse.tsx`.
- Surfaced the daily pulse on `/changelog` and the Data Quality overview.
- Patched Next.js to `^16.2.6` after production dependency audit flagged a high-severity advisory in the previous range.
- Added smoke coverage for the daily pulse on both public and governance surfaces.
- Kept the update static and caveated; it does not create automated monitoring, email alerts, a database, accounts, payments or a legal update service.

## Phase 1V Product Rationale

The Atlas is moving quickly. A compact daily pulse gives users, future agents and reviewers one place to understand what changed most recently and what should be reviewed next without turning the homepage into a busy project dashboard. The pulse is intentionally editorial and static so it supports launch operations while preserving the MVP guardrails.

## Phase 1U Changes Delivered

- Updated dataset metadata and changelog to `0.5.21 - May 2026`.
- Reduced global navigation clutter by keeping core workspaces visible and grouping Timeline, Briefing, Data Quality, Alerts, Advisory and Launch into a translated More menu.
- Added translated navigation labels for Plans, Alerts, Advisory, Launch and More across English, Spanish, Dutch, French, German and Portuguese interface chrome.
- Replaced the three separate homepage hero metric cards with one compact workspace snapshot for current record count, high-impact count and source-link count.
- Added dark-mode-aware navigation and homepage snapshot styling so the calm-down pass works in both themes.

## Phase 1U Product Rationale

The Atlas now has many useful routes, but showing all of them equally in the header made the product feel busier than the actual workflow. Phase 1U preserves every feature while improving wayfinding: primary product routes stay visible, secondary governance/commercial/launch routes stay one click away, and the homepage first screen gives the map workspace more room to breathe.

## Phase 1T Changes Delivered

- Updated dataset metadata and changelog to `0.5.20 - May 2026`.
- Refreshed the homepage into a calmer map-first layout by removing the update strip and commercial tile row from the top of the page.
- Consolidated the map controls into one compact workspace surface with Views, default filters and share link.
- Added no-dependency SVG map zoom, reset and drag-to-pan controls.
- Strengthened map ocean, untracked land, border, outline and graticule contrast with light/dark theme variables.
- Reduced always-on map label noise while keeping national country paths, EU and subnational markers selectable.
- Replaced the tracked-only map geometry index with locally bundled Natural Earth Admin 0 country geometry so non-covered countries render as neutral land.
- Added smoke coverage for visible untracked countries and map viewport controls.

## Phase 1T Product Rationale

The homepage had accumulated enough commercial, launch and governance surfaces that the core product felt buried. Phase 1T brings the Atlas back to its strongest entry point: map, selected jurisdiction context and regulation preview. The map remains static and local, but now gives users enough viewport control and visual contrast to recognize covered and uncovered countries without adding Mapbox, paid APIs or GIS infrastructure.

## Phase 1S Changes Delivered

- Updated dataset metadata and changelog to `0.5.19 - May 2026`.
- Added `lib/reviewWorkflow.ts` as a shared review workflow export helper.
- Added `components/ReviewWorkflowExportPanel.tsx` on `/data-quality`.
- Added CSV and JSON exports for source, threshold, evidence, owner and premium-use QA tracking.
- Added a copyable priority review packet for Notion, advisory prep and content QA.
- Streamlined `/data-quality` into Overview, Sources, Coverage and Review Workflow tabs.
- Added smoke and static coverage for the review workflow export panel and caveated export content.
- Kept review workflow exports as operational QA aids, not legal opinions, official translations or verified compliance determinations.

## Phase 1S Product Rationale

The Atlas now has source evidence trails at record level, but reviewers still need an easy way to move the highest-priority rows into Notion, a workbook or an advisory prep tracker. Phase 1S converts the static seed dataset into a reviewer-ready export and cleans the Data Quality information architecture so governance controls remain usable without adding a database, automation or legal verification claims.

## Phase 1R Changes Delivered

- Updated dataset metadata and changelog to `0.5.18 - May 2026`.
- Added `lib/sourceGovernance.ts` as a shared source-evidence helper.
- Added `components/SourceEvidencePanel.tsx` on regulation detail pages and drawers.
- Added copyable source-review memos with source links, review timing, facts to confirm and caveats.
- Added source posture samples to the Data Quality source library.
- Added smoke and static coverage for source evidence trails and source-review memo copy.
- Kept source evidence trails as governance and QA aids, not legal verification, official translations or applicability determinations.

## Phase 1R Product Rationale

Decision-readiness gates explain what to confirm, but source review still needed a concrete packet that an advisor, analyst or content reviewer could copy and act on. Phase 1R makes source posture, priority source, review freshness and source-review steps visible at the record level so the Atlas can support a defensible research workflow without adding a database, CMS, automation or legal-advice claims.

## Phase 1Q Changes Delivered

- Updated dataset metadata and changelog to `0.5.17 - May 2026`.
- Added `lib/decisionReadiness.ts` as a shared regulation decision-readiness helper.
- Added `components/DecisionReadinessChecklist.tsx` on regulation detail pages and drawers.
- Added `components/MarqueeEvidenceGate.tsx` on `/data-quality`.
- Added smoke and static coverage for decision-readiness controls.
- Kept decision-readiness outputs as orientation and governance controls, not legal verification or applicability determinations.

## Phase 1Q Product Rationale

Coverage confidence and Marquee review queues show what needs attention, but launch users also need to know exactly what to confirm, what evidence to gather, who should own review and whether a record is blocked from premium examples. Phase 1Q turns those questions into reusable product surfaces while preserving legal caution.

## Phase 1P Changes Delivered

- Updated dataset metadata and changelog to `0.5.16 - May 2026`.
- Added `lib/coverageConfidence.ts` to classify markets as source-reviewed seed, usable seed coverage, review needed or watch-only.
- Added `components/CoverageConfidencePanel.tsx` to `/data-quality`.
- Added coverage confidence badges to `/markets` and `/jurisdiction/[code]`.
- Added static coverage confidence test coverage.
- Kept confidence labels as internal readiness and transparency signals, not complete legal coverage or applicability conclusions.

## Phase 1P Product Rationale

Market depth alone can mislead. A country with five records may still need source review if dates are stale, confidence is low or primary sources are missing. Phase 1P makes that distinction visible so the Atlas can support advisory and premium conversations without overclaiming data completeness.

## Phase 1O Changes Delivered

- Updated dataset metadata and changelog to `0.5.15 - May 2026`.
- Added `data/personaPresets.ts` for static role-based regulation database lenses.
- Added `components/PersonaPresets.tsx` to `/regulations`.
- Added shareable `/regulations?persona=` URL support.
- Added presets for CSO, legal/compliance, finance/controller, procurement/supplier, private equity/investor and external advisor users.
- Added smoke coverage for applying the Finance persona preset.

## Phase 1O Product Rationale

The Atlas has strong map, market and sector entry points, but many launch conversations start with a role: a CSO wants executive reporting priorities, legal wants thresholds and caveats, finance wants controls and assurance, procurement wants supplier evidence, private equity wants portfolio exposure, and advisors want gap-assessment workstreams. Phase 1O gives those users a faster first click while staying static and cautious. Persona presets are filters and prompts only, not saved workspaces or applicability determinations.

## Phase 1N Changes Delivered

- Updated dataset metadata and changelog to `0.5.14 - May 2026`.
- Added `/sectors` as a public index of tracked sector starting points.
- Added `/sectors/[slug]` sector profile pages for every tracked sector.
- Added `lib/sectorProfile.ts` to aggregate direct sector records, broad all-sector context, priority records, market signals, timing/watch items, evidence needs, source confidence, affected functions and advisory opportunities.
- Added Header navigation and translated `nav.sectors` labels for supported interface languages.
- Added smoke coverage for `/sectors` and `/sectors/financial-services`.

## Phase 1N Product Rationale

Many buyers and advisory conversations start with sector context rather than a regulation name or country. Sector starting points help a financial-services, manufacturing, agriculture, energy, retail or technology user understand which records to inspect first, which markets are most visible in the current seed coverage, what evidence may be needed and where source review risk remains. The pages are intentionally caveated as current tracked seed intelligence, not complete sector inventories or applicability determinations.

## Phase 1M Changes Delivered

- Updated dataset metadata and changelog to `0.5.13 - May 2026`.
- Added `/markets` as a public index of tracked jurisdiction market profiles grouped by region.
- Added `/jurisdiction/[code]` market profile pages for every tracked non-international jurisdiction.
- Added `lib/marketProfile.ts` to aggregate priority records, direct/inherited coverage, timing signals, source confidence, evidence needs, review flags and advisory opportunities.
- Linked the selected-jurisdiction map panel to the new market profile route.
- Added Header navigation and translated `nav.markets` labels for supported interface languages.
- Added smoke coverage for `/markets` and `/jurisdiction/euu`.

## Phase 1M Product Rationale

The map is the strongest visual entry point, but users also need a browseable way to understand each market without opening a printable brief first. Market profile pages make jurisdiction context, priority records, evidence needs, timing signals and review caveats easier to inspect while preserving the core safeguard: market profiles show tracked seed intelligence and planning prompts only, not complete coverage or applicability conclusions.

## Phase 1L Changes Delivered

- Updated dataset metadata and changelog to `0.5.12 - May 2026`.
- Added source freshness signals to Data Quality: stale source, upcoming review, missing primary source and date-sensitive record.
- Extended `data/contentReview.ts` with optional review owner, source-review next action, threshold-review next action and premium-use blocker fields.
- Upgraded `components/MarqueeReviewQueue.tsx` with owner placeholders, next actions and premium-use blocked labels.
- Added smoke coverage for the Data Quality source-governance queue.

## Phase 1L Product Rationale

Premium packs and advisory scans need a visible review-control layer before they can be trusted in client conversations. Phase 1L makes review risk easier to triage while preserving the core legal safeguard: source-governance signals are editorial controls, not legal verification or completeness claims.

## Phase 1K Changes Delivered

- Updated dataset metadata and changelog to `0.5.11 - May 2026`.
- Added `/launch` as a public launch-resource workspace.
- Added `components/LaunchAssetLibrary.tsx` to render `data/launchAssets.ts` as copyable cards with caveats and draft-email actions.
- Added Header navigation for Launch.
- Linked Plans, Alerts, Advisory and Premium Roadmap CTAs into the launch workflow.
- Updated README, roadmap, product brief, legal safeguards, development workflow, product backlog and handoff context.

## Phase 1K Product Rationale

The Atlas now has free, premium-preview and advisory offer surfaces, but launch execution needs reusable copy. Phase 1K makes the launch assets visible and copyable so LinkedIn posts, email drafts and advisory scan language can be reused consistently without overclaiming that paid subscriptions, automated alerts or production monitoring are live.

## Phase 1J Changes Delivered

- Updated dataset metadata and changelog to `0.5.10 - May 2026`.
- Extended `ApplicabilityResult` with missing facts, next steps and suggested owner signals.
- Upgraded assessment result cards with suggested owner, missing fact, evidence, source-to-verify and next 30-day action fields.
- Expanded copied assessment shortlists with missing facts, next actions, evidence, source-to-verify and per-record caveats.
- Upgraded the regulation detail drawer with decision cards for thresholds, timing uncertainty, enforcement cues, related regimes and missing decision data.

## Phase 1J Product Rationale

The Atlas already identifies potentially relevant records, but launch demos need to answer the next practical questions: what facts are missing, who should own review, what should happen in the next 30 days and which source should be verified first. Phase 1J makes the output more useful for client triage while preserving cautious legal language and source-review caveats.

## Phase 1I Changes Delivered

- Updated dataset metadata and changelog to `0.5.9 - May 2026`.
- Made the local Natural Earth SVG country-outline map visible from tablet widths upward instead of hiding it until the large desktop breakpoint.
- Strengthened country borders, ocean/land contrast, selected-state styling and EU overlay cues.
- Added a clear geometry failure fallback while preserving jurisdiction navigation.
- Added `data/coverageTargets.ts` with deep-anchor, core-commercial and watch-expansion direct-record targets.
- Added `components/CoverageDepthPanel.tsx` and surfaced it on `/data-quality`.
- Added `data/marketDepthAdditions.ts` with source-linked seed records for under-covered markets.
- Added Playwright checks for visible country paths, tablet map size, jurisdiction selection, geometry fallback and coverage target completeness.

## Phase 1I Product Rationale

The map is the product's first trust surface. If users cannot see country outlines, the Atlas feels less credible even when the data is strong. The coverage-depth panel also makes weak markets visible instead of hiding them behind aggregate counts. This round improves client confidence while keeping the data legally cautious: new records are still seed intelligence and require source review before compliance reliance.

## Phase 1H Changes Delivered

- Updated dataset metadata and changelog to `0.5.8 - May 2026`.
- Added copy and print controls to `/premium-packs/[id]` so each pack can be shared as a caveated Markdown brief.
- Added `data/contentReview.ts` with Marquee 10 and Marquee 25 content-review items.
- Added `components/MarqueeReviewQueue.tsx` and surfaced it on `/data-quality`.
- Added launch-blocker flags, review statuses, premium-use mapping and source/status/threshold review questions for high-value regimes.
- Updated README, roadmap, product brief, product backlog, data methodology, legal safeguards, development workflow and agent context.

## Phase 1H Product Rationale

The commercial pages are only useful if a buyer or advisor can turn them into a conversation. Copyable premium pack briefs support direct outreach and advisory scoping without PDF generation. The Marquee review queue makes the content governance work visible, especially for records used in premium-pack examples, while avoiding any claim that the seed data is legally complete or verified for reliance.

## Phase 1G Changes Delivered

- Updated dataset metadata and changelog to `0.5.7 - May 2026`.
- Added `/premium-packs/[id]` as static sample pages for each premium market pack.
- Linked `/premium-roadmap` pack cards to the new premium-pack sample pages.
- Added `data/conversionTracking.ts` for manual CTA, mailto-subject and validation-loop tracking.
- Added `docs/conversion-tracking-plan.md` for no-dependency commercial interest tracking.
- Added manual validation loop signals to `/plans`.
- Added advisory next-step language to copied jurisdiction briefs and client planning summaries.
- Updated README, roadmap, product brief, product backlog, data methodology, legal safeguards, development workflow and agent context.

## Phase 1G Product Rationale

Phase 1F made the offer architecture visible. Phase 1G makes that offer architecture more concrete and more measurable: users can inspect a specific premium pack before asking for it, and Etica can track which CTAs and subject lines generate interest without introducing analytics, CRM sync, accounts, billing or email automation too early.

## Phase 1F Changes Delivered

- Updated dataset metadata and changelog to `0.5.6 - May 2026`.
- Added static commercial data files:
  - `data/commercialOffers.ts`
  - `data/alertDigests.ts`
  - `data/premiumPacks.ts`
  - `data/launchAssets.ts`
- Added `/plans` for Free Atlas, Premium Intelligence, Advisory Atlas and Enterprise/API Future positioning.
- Added `/alerts` with static weekly/monthly alert previews, watchlist concepts, source-quality legend and request-access CTA.
- Added `/advisory` with manual advisory service packages: exposure scan, custom watchlist, portfolio/supplier map, board/client briefing and market-pack support.
- Rebuilt `/premium-roadmap` around concrete premium pack previews, alert roadmap, advisory-supported pack delivery and future enterprise/API guardrails.
- Added `components/CommercialCTA.tsx` and surfaced commercial CTAs on homepage, assessment, regulation details, briefing/premium surfaces and existing market briefing CTAs.
- Added homepage commercial strip for Free Atlas, Alerts Preview and Advisory Scans.
- Updated header navigation to include Plans, Alerts and Advisory.
- Upgraded regulation detail pages and drawers with decision cards for what the record is, who may be affected, evidence likely needed and suggested internal owners.
- Added source-trust and coverage-tier explainers to Data Quality and Methodology.
- Added `docs/feature-request-tracking.md` and `docs/notion-update-plan.md`.
- Updated README, roadmap, product brief, product backlog, data methodology, legal safeguards, development workflow and agent context.

## Phase 1F Product Rationale

The product needed to become commercially legible before adding any SaaS infrastructure. The chosen strategy keeps the Free Atlas public as the trust surface, validates Premium Intelligence through static alert and market-pack previews, and makes Advisory Atlas the fastest monetization path through manual exposure scans and briefings. This avoids the wrong early build: payments, accounts, production email alerts, scraping and databases before demand and governance are validated.

## Phase 1E Changes Delivered

- Updated dataset metadata and changelog to `0.5.5 - May 2026`.
- Improved `lib/applicability.ts` so assessment scoring considers legal force, core display tier, high-impact classification, client relevance tags, supplier exposure and investor/customer-driven records.
- Extended assessment results with review priority, evidence needed, functions involved, source to verify and source-quality notes.
- Upgraded `/assessment` result cards and copied shortlists so each recommendation explains why it appears, what triggered it, what evidence to start with and which source to verify.
- Converted `/timeline` into a quarter-level milestone view covering consultation deadlines, effective dates, first reporting years, first report due dates and Atlas review dates.
- Updated timeline year filtering so it matches any milestone year, not only `firstReportingYear`.
- Upgraded `/data-quality` with priority-source metrics, confidence checks and review-queue scoring reasons.
- Improved `/briefing` priority cards and copied client summaries with first moves, evidence packages, functions, source coverage, legal force and client relevance.
- Enriched `/jurisdiction/[code]/brief` with source-backed counts, status/metadata badges, 30-day readiness starters, watch items, evidence packages, functions and Etica market briefing CTA.
- Added evidence summaries and review-flag counts to the map-side jurisdiction panel.

## Phase 1E Product Rationale

The previous product had strong coverage breadth and a more credible data model, but a client still needed help translating records into a practical first conversation. Phase 1E focuses on the moments where users ask:

- Why is this regulation on my shortlist?
- What facts or evidence do I need next?
- Which source should I verify before relying on it?
- What is time-sensitive?
- Which records need research review before client use?
- What should a 30-day readiness starter look like for a jurisdiction?

The chosen implementation keeps the MVP static and Vercel-safe while making the assessment, timeline, data-quality and briefing surfaces act more like a regulatory advisory workspace.

## Phase 1D Changes Delivered

- Updated dataset metadata and changelog to `0.5.4 - May 2026`.
- Added master-pack metadata fields to `types/regulation.ts`: `recordType`, `legalForce`, `displayTier`, `atlasGranularity`, `parentRecordId`, `aliases`, `sourceSystem`, `sourceConfidence`, `lastVerified`, `childItems`, `clientRelevanceCategory`, `marketMaturityScore` and `monetizationTier`.
- Added `data/masterUpdateAdditions.ts` and imported it through `data/seed.ts`.
- Added condensed EU financial-services parent records for banking prudential ESG risk, insurance Solvency/ORSA ESG risk, MiFID II/IDD sustainability preferences, AIFMD/UCITS ESG risk, ESG benchmarks, EuGBS, ESG ratings, ESAP, EU ETS and EU Nature Restoration.
- Added UK Modern Slavery Act and a condensed France/Germany/Norway national supply-chain due-diligence cluster.
- Added APAC/ISSB market records for South Korea, Taiwan, New Zealand, Malaysia, Indonesia, Thailand and Philippines.
- Added South Africa as an Africa anchor market through JSE sustainability guidance and green finance taxonomy context.
- Added voluntary and investor/customer-driven framework records for CDP, SBTi, PCAF, PRI, ICMA labelled finance principles, GRESB, IFC/Equator/World Bank safeguards and ISO environmental/GHG standards.
- Added jurisdiction tiles for Hong Kong, South Korea, Taiwan, New Zealand, Malaysia, Indonesia, Thailand, Philippines, France, Germany, Norway and South Africa.
- Enriched existing parent records such as CSRD, ESRS, SFDR, EU Taxonomy, CSDDD, EUDR, EU Batteries, EU Forced Labour, GRI and ISSB with aliases, child items, source-system and client-relevance metadata.
- Linked the existing Hong Kong climate record to the new Hong Kong jurisdiction tile instead of leaving it assigned to `int`.
- Added record type, legal force and client relevance filters in the advanced filter groups.
- Added `components/RecordMetaBadges.tsx` and surfaced metadata badges in the regulation table, jurisdiction panel, regulation detail drawer and per-regulation pages.
- Added source-of-truth governance language to `/data-quality` explaining source hierarchy, review cadence and condensation rules.
- Added `components/MarketBriefingCTA.tsx` and surfaced it on `/briefing` and in jurisdiction panels.
- Added `/premium-roadmap` as a static commercial roadmap page for future market packs, sector packs, portfolio scans, alerts and client workspaces without adding Stripe, auth, Supabase, paid APIs, databases, scraping, cron or required environment variables.
- Updated README, roadmap, data methodology, regulatory taxonomy and product backlog context files so future agents inherit the master-pack direction.

## Phase 1D Product Rationale

The master update pack correctly identified that the Atlas should become a client decision system, not a catalogue of thousands of disconnected standards. The chosen MVP-safe implementation focuses on the highest-leverage static upgrades:

- richer metadata so users can distinguish legal obligations from standards, guidance, voluntary frameworks and market expectations
- condensed parent records with aliases and child details so frameworks remain searchable without overwhelming the map
- stronger market coverage where the current product was weakest: EU financial services and APAC/ISSB adoption
- voluntary frameworks that matter commercially because investors, lenders, customers and procurement teams often drive them
- lead-generation CTAs and a premium roadmap that prepare for monetization without adding payment or account complexity

## Phase 1C Changes Delivered

- Defaulted first-time visitors to light mode while preserving explicit saved dark-mode preferences.
- Improved dark-mode contrast for colored badges, warning/disclaimer text, form controls, rings, borders and hover states.
- Added `docs/product-improvement-backlog.md` with 36 PM/ESG specialist improvements prioritized across three waves.
- Added map interpretation guidance that separates direct seed record volume from legal applicability.
- Updated dataset metadata and changelog to `0.5.3 - May 2026`.
- Added GitHub Actions CI for typecheck and production build validation.
- Added Playwright smoke tests for the map workspace, language toggle, regulation detail route and launch-critical pages.
- Added Lighthouse CI for key public routes with warning-level launch thresholds.
- Added a pull request template requiring Vercel preview review and explicit MVP guardrail checks.
- Added `data/phase1cCoverage.ts` and imported it through `data/seed.ts`, bringing the static seed dataset to 80+ source-linked records.
- Expanded translations in `lib/i18n.ts` and applied them to filters, table controls, map guidance, status labels, confidence labels and data-quality labels.
- Strengthened `components/WorldChoropleth.tsx` with an explicit country-border overlay so country outlines are clearer.
- Added a `0.5.2 - May 2026` changelog entry for workflow checks, expanded translations, regulation tracker workflow and Phase 1C coverage.
- Created a workbook-backed regulation tracker process so website data can be reviewed as a structured coverage inventory.

## CI Incident Resolved After Phase 1C

On 2026-05-02, PR #11 showed a successful Vercel deployment but two failing GitHub checks: `CI / Browser smoke tests` and `Lighthouse / Lighthouse CI`.

Root causes:

- The CSRD smoke test asserted the wrong heading. The regulation detail page uses `CSRD` as the H1 and shows `Corporate Sustainability Reporting Directive` as supporting title text.
- Lighthouse used the default `lighthouse:recommended` assertion preset, which made default audit warnings act as hard failures.

Resolution:

- Updated `tests/smoke.spec.ts` to assert the actual H1 plus scoped supporting title text.
- Updated `.lighthouserc.json` to remove the recommended preset and keep explicit category thresholds as warning-level launch signals.
- Added `docs/issue-resolution-log.md` and updated workflow docs so future agents document root cause, fix and prevention rules for every bug or failed check.

Verification:

- GitHub `CI` passed after the smoke test fix.
- GitHub `Lighthouse` passed after the Lighthouse config fix.
- Vercel deployment was already successful; the issue was in quality-check configuration and test assumptions, not the app deployment.

## Phase 1B Changes Delivered

- Added `data/marketCoverage.ts` and imported it through `data/seed.ts` so under-covered markets no longer rely on one or two records.
- Added market-depth records for Mexico, Netherlands, California, United States, China, Singapore, Japan, Australia, Brazil, Switzerland and Turkey.
- Kept new market records legally cautious with source links, review dates, confidence levels and data-quality flags rather than presenting complete legal coverage.
- Added `lib/i18n.ts`, `components/LanguageProvider.tsx` and `components/LanguageToggle.tsx` for English, Spanish, Dutch, French, German and Portuguese product chrome.
- Translated navigation, legal disclaimer text, hero guidance, key homepage labels and share/export labels while leaving legal/regulatory record content in source-linked seed English.
- Improved `components/WorldChoropleth.tsx` with stronger country borders, higher non-selected opacity, clearer legend borders and subtle graticule cues.
- Added `lib/urlFilters.ts` and shareable query-string persistence for Map and Regulations filters.
- Added `components/ShareViewButton.tsx` and `components/RegulationExportButtons.tsx`.
- Added `lib/scoring.ts` and surfaced readiness-priority scoring in the regulation table, regulation drawer and per-regulation detail pages.
- Expanded `/compare` with readiness, thresholds, first report due date, affected functions, advisory opportunities and enforcement rows for regulation comparisons.
- Updated `components/RegulatoryTimeline.tsx` to group more milestones by year rather than showing a short flat list.
- Improved `components/DataQualityPanel.tsx` with high-impact review checks, upcoming review counts and a larger prioritized research queue.
- Improved `components/ExportSummaryButton.tsx` with jurisdiction, sector and company-type controls for more useful client planning summaries.
- Added a `0.5.1 - May 2026` changelog entry for market coverage and usability changes.

## Etica ESG Rebrand / v4 Unblock Changes Delivered

- Rebranded the product identity to `Etica ESG · Regulatory Atlas`.
- Added temporary Etica SVG assets at `public/etica-esg-logo.svg`, `public/favicon.svg` and `public/og-image.svg`.
- Updated `data/_meta.ts` with publisher, publisher URL, editor, contact email, LinkedIn URL, edition slug and Etica byline fields.
- Updated root metadata and visible header/footer identity to Etica ESG publisher framing.
- Added `components/ThemeToggle.tsx` and Tailwind class-based dark mode. The toggle persists `etica-theme` in local storage and is available in the global header.
- Added `app/not-found.tsx` with branded recovery links, methodology/regulations/map links and Etica contact.
- Added redirects for `/regulations/issb-ifrs-s1`, `/regulations/issb-ifrs-s2`, `/regulations/issb` and `/regulations/ifrs-s1` to `/regulations/issb-s1-s2`.
- Added `components/CitationWidget.tsx` on regulation detail pages with APA-style, legal research note and BibTeX copy blocks.
- Added `/edition/0.5/regulations/[slug]` as the current static edition snapshot route for regulation details.
- Added typed `data/changelog.ts` and updated `/changelog` to render reverse-chronological edition cards with regulation record chips.
- Expanded `/compare` to support `?jurisdictions=EUU,GBR`, legacy `?a=EUU&b=GBR`, and regulation comparison via `?ids=csrd,issb-s1-s2`.
- Added `components/ComparePicker.tsx` to `/regulations` using an accessible `<details>` panel.
- Added print/copy controls and Etica publisher/byline copy to jurisdiction briefs.
- Added four assessment persona doorways: CSO, SME supplier sustainability lead, in-house legal and external advisor.
- Added `aria-pressed` to assessment and compare chip toggles.
- Added `components/StatusBadge.tsx` with icons so status no longer relies on color alone; voluntary styling is now neutral slate.
- Grouped advanced filters into Geography, Regulatory shape and Business framing.
- Added global skip-to-content link and print CSS for cleaner A4 output.
- Simplified the primary navigation to Map, Regulations, Assessment, Timeline, Briefing and Data Quality, while keeping Methodology, Changelog, Compare and About as support routes.
- Restored `/data-quality` as a real governance page for source library, coverage matrix and review-risk workflows.

## Why These Changes Were Made

The deep review identified three credibility risks: the map claimed country fill without rendering country polygons, the product repeated "MVP / seed" language too often, and core operational surfaces such as per-regulation detail pages and methodology framing were missing. The Phase 0 update focuses on the fixes that most improve first impressions for a CSO, Head of Legal or ESG consultant.

## Phase 0 Changes Delivered

- Added a static Natural Earth country dataset under `public/world-110m/`, filtered to tracked jurisdictions and EU member states, with attribution in `public/world-110m.LICENSE.txt`.
- Added `components/WorldChoropleth.tsx`, a pure React/SVG choropleth map with no paid APIs, no Mapbox and no runtime external data calls.
- Updated the home page to use the new choropleth map instead of the previous tile-and-label map.
- Added canonical jurisdiction `code` fields so the UI can show ISO-style labels such as `USA`, `CAN`, `GBR`, `NLD`, `EUU` and `USA-CA` without changing existing internal record IDs in a risky migration.
- Added `data/_meta.ts` with dataset edition, last reviewed date, next review date, byline and contact email.
- Added `/methodology` for methodology explanation and restored `/data-quality` as the primary captured-source and review-prompt governance route.
- Added `/about` with methodology, scope, byline, review cadence and contact CTA.
- Added per-regulation detail routes under `/regulations/[slug]`.
- Changed the regulation table "Open" action from a drawer-only button to a real link.
- Added confidence display to the regulation table.
- Reduced repeated "MVP / seed" language in visible product surfaces.
- Fixed the assessment profile typo: "headquarter, large size, corporate ." is now `headquarters · size · company type`.
- Removed the duplicate value-chain filter value `Investments and portfolio companies`.
- Removed the TCFD `2018` reporting-year outlier from visible reporting-year filters while preserving the underlying record for future content review.
- Pulled sectors into `data/sectors.ts` as a single source of truth and stopped truncating the assessment sector picker.

## Phase 1A / v3 Review Changes Delivered

- Updated dataset metadata to edition `0.5 - May 2026` with a dataset last-reviewed date of `2026-05-02`.
- Added source-linked scope, threshold and penalty/enforcement notes for marquee EU records including CSRD, ESRS, EU Taxonomy, SFDR, CSDDD, CBAM, EUDR, ESPR, EU Batteries Regulation and EU Forced Labour Regulation.
- Added `transposedJurisdictionIds` to the regulation type so EU-level records can be relevant to Netherlands without inflating direct Netherlands map counts.
- Updated the choropleth count logic so country fill and visible counts use direct jurisdiction records rather than parent EU records.
- Kept jurisdiction profile panels broader by still showing linked and inherited exposure where useful.
- Removed generic threshold and penalty placeholder text from regulation detail pages.
- Added last-reviewed trust lines to regulation detail pages and drawers.
- Added `/changelog` as a public edition/update log.
- Added `/compare` for two-jurisdiction comparison using query parameters such as `/compare?a=EUU&b=GBR`.
- Added `/jurisdiction/[code]/brief` for printable/copyable jurisdiction briefs.
- Added a sector heatmap tab to `/briefing`.
- Added a copyable assessment shortlist on `/assessment`.
- Added a homepage "What's new" strip tied to the current edition.
- Added an About-page key trends section.
- Added a favicon and mobile map fallback list.
- Added `AGENTS.md` and `docs/` context files, including `docs/development-workflow.md`, so future agents know how to work safely.
- Updated `npm run build` to use `next build --webpack`, the verified stable build path for this MVP.

## Technical Notes

- No Stripe, Supabase, authentication, paid APIs, Mapbox, environment variables, database, scraping, cron jobs or runtime AI calls were added.
- Theme behavior now defaults first-time visitors to light mode. The saved `etica-theme` preference is still respected after a user explicitly toggles light or dark mode.
- The map fetches `/world-110m/index.json` and same-origin Natural Earth geometry from the app's own `public/` directory. `countries.json` contains bundled public-domain Natural Earth Admin 0 geometry so untracked countries can still render as background land.
- The map now has local SVG zoom, reset and drag-to-pan controls; do not replace this with Mapbox or a paid map service during the MVP.
- The country fill bucket is driven by direct record count in the active view: `0`, `1-2`, `3-6`, and `7+`.
- EU-level records highlight EU member-state polygons and keep a separate `EUU` overlay label for the supranational jurisdiction.
- California is shown as `USA-CA`, not `CA`, to avoid confusion with Canada.
- Parent or transposed exposure should be shown as linked/inherited context, not counted as direct national records on the map.
- Next.js default Turbopack builds may fail in the Codex sandbox when helper processes try to bind to a port. The project build script uses the webpack build path because it passed locally and is lower risk for this MVP.

## Validation

- Phase 1AT validation: `npm run lint` passed locally.
- Phase 1AT validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1AT validation: `npm run check:data` passed locally.
- Phase 1AT validation: `npm run build` passed locally with the webpack build path and generated 389 static pages.
- Phase 1AT validation: `git diff --check` passed.
- Phase 1AT local browser smoke attempt: focused `/value-chain` smoke test could not launch Chromium because the local Playwright headless shell executable is missing from `/Users/gabrielgage/Library/Caches/ms-playwright`. This existing environment limitation is documented in `docs/issue-resolution-log.md`; CI should provide the authoritative browser-smoke signal.
- Phase 1AT out-of-scope scan found only guardrail/documentation/caveat mentions of Stripe, Supabase, Mapbox, checkout, webhooks, scraping, cron and related future infrastructure; no implementation code or dependencies were added.
- Phase 1AS validation: `npm run lint` passed locally.
- Phase 1AS validation: `npm run check:data` passed locally.
- Phase 1AS validation: `npm run build` passed locally with the webpack build path and generated 389 static pages.
- Phase 1AS validation: `git diff --check` passed.
- Phase 1AS out-of-scope scan found only guardrail/documentation/caveat mentions of Stripe, Supabase, Mapbox, checkout, webhooks, scraping, cron and official-translation caveats; no implementation code or dependencies were added.
- Phase 1AR validation: `npm run lint` passed locally.
- Phase 1AR validation: `npm run check:data` passed locally.
- Phase 1AR validation: `npm run build` passed locally with the webpack build path and generated 389 static pages.
- Phase 1AR validation: `git diff --check` passed.
- Phase 1AR local browser smoke attempt: `npm run test:e2e` could not launch Chromium because the local Playwright headless shell executable is missing from `/Users/gabrielgage/Library/Caches/ms-playwright`. This is documented in `docs/issue-resolution-log.md`; CI should provide the authoritative browser-smoke signal.
- Phase 1AR CI follow-up: first PR #78 browser smoke run found two stale sector assertions after the redesign. The fix updated the glossary-help copy assertion and scoped repeated "supplier due diligence" trigger text with `.first()`.
- Phase 1AR out-of-scope scan found only guardrail/documentation/caveat mentions of Stripe, Supabase, Mapbox, checkout, webhooks, scraping, cron and related future infrastructure; no implementation code or dependencies were added.
- Phase 1AQ validation: `npm run lint` passed locally.
- Phase 1AQ validation: `npm run check:data` passed locally.
- Phase 1AQ validation: `npm run build` passed locally with the webpack build path.
- Phase 1AQ validation: `git diff --check` passed.
- Phase 1AQ browser smoke will run in CI/Vercel; no local Playwright smoke was run for this focused CTA/documentation pass.
- Phase 1AP validation: `npm run lint` passed locally.
- Phase 1AP validation: `npm run check:data` passed locally.
- Phase 1AP validation: `npm run build` passed locally with the webpack build path.
- Phase 1AP validation: `git diff --check` passed.
- Phase 1AP targeted smoke attempt: local Playwright browser smoke could not start the app server because the Codex desktop sandbox blocked `listen 0.0.0.0:3000` with `EPERM`. This matches the known local port-binding limitation; CI/Vercel should provide the authoritative browser-smoke signal.
- Phase 1AP out-of-scope scan found only existing guardrail/documentation/test mentions of Stripe, Supabase, Mapbox, checkout, webhooks, scraping, cron and related future infrastructure; no implementation code or dependencies were added.
- Phase 1T validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1T validation: `git diff --check` passed.
- Phase 1T validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1T CI follow-up: first PR #26 smoke run failed because the bundled map index still referenced tracked-only geometry, leaving zero untracked country paths. The fix was to bundle Natural Earth Admin 0 countries locally and keep the untracked-country smoke assertion.
- Phase 1T guardrail scan found only existing guardrail/documentation mentions of Stripe, Supabase, Mapbox, checkout, webhooks, scraping, cron and related future infrastructure; no implementation code or dependencies were added.
- Phase 1T legal-risk wording scan found only the intentional caveat that tracked coverage is not complete global coverage.
- Phase 1T Notion update: Launch Tasks LAUNCH-071 through LAUNCH-074 were created for homepage streamlining, map viewport controls, untracked-country visibility and smoke coverage.
- Phase 1S validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1S validation: `git diff --check` passed.
- Phase 1S validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1S out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM; no implementation code or dependencies were added for those items.
- Phase 1S legal-risk wording scan found only banned phrases inside "do not use" guidance, disclaimers and intentional coverage caveats.
- Phase 1S Notion update: Launch Tasks LAUNCH-066 through LAUNCH-070 were documented for review workflow exports and Data Quality tab streamlining.
- Phase 1R validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1R validation: `git diff --check` passed.
- Phase 1R validation: `npm run lint` could not run because the Codex desktop shell does not expose an `npm` executable; the equivalent TypeScript command passed with the local Node runtime.
- Phase 1R validation: local Playwright package files are not present in this sandbox's `node_modules`; the added smoke/static coverage should run in GitHub Actions after dependency installation.
- Phase 1R validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1R out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM; no implementation code or dependencies were added for those items.
- Phase 1R Notion update: Launch Tasks LAUNCH-062 through LAUNCH-065 were documented.
- Phase 1Q validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1Q validation: `git diff --check` passed.
- Phase 1Q validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1Q out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM; no implementation code or dependencies were added for those items.
- Phase 1Q Notion update: Launch Tasks LAUNCH-059 through LAUNCH-061 were documented.
- Phase 1P validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1P validation: `git diff --check` passed.
- Phase 1P validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1P out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM; no implementation code or dependencies were added for those items.
- Phase 1P legal-risk wording scan found only banned phrases inside "do not use" guidance, disclaimers and intentional coverage caveats.
- Phase 1P Notion update: Launch Tasks LAUNCH-056 through LAUNCH-058 were documented and ADR-026 was added to the Decisions Log.
- Phase 1O validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1O validation: `git diff --check` passed.
- Phase 1O validation: `npm run lint` could not run because the Codex desktop shell does not expose an `npm` executable; the equivalent TypeScript command passed with the local Node runtime.
- Phase 1O validation: local Playwright and Lighthouse binaries are not present in this sandbox's `node_modules/.bin`; the added smoke coverage should run in GitHub Actions after dependency installation.
- Phase 1O validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1O out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM; no implementation code or dependencies were added for those items.
- Phase 1O legal-risk wording scan found only banned phrases inside "do not use" guidance, disclaimers and intentional coverage caveats.
- Phase 1O Notion update: Launch Tasks LAUNCH-053 through LAUNCH-055 were documented and ADR-025 was added to the Decisions Log.
- Phase 1N validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1N validation: `git diff --check` passed.
- Phase 1N validation: `npm run lint` could not run because the Codex desktop shell does not expose an `npm` executable; the equivalent TypeScript command passed with the local Node runtime.
- Phase 1N validation: local Playwright and Lighthouse binaries are not present in this sandbox's `node_modules/.bin`; the added smoke coverage should run in GitHub Actions after dependency installation.
- Phase 1N validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1N out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM; no implementation code or dependencies were added for those items.
- Phase 1N legal-risk wording scan found only banned phrases inside "do not use" guidance, disclaimers and intentional coverage caveats.
- Phase 1N Notion update: Launch Tasks LAUNCH-050 through LAUNCH-052 were documented and ADR-024 was added to the Decisions Log.
- Phase 1M validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1M validation: `git diff --check` passed.
- Phase 1M validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1M out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM plus the existing Playwright `process.env.CI` check and a false-positive Public Safety Canada URL; no implementation code or dependencies were added for those items.
- Phase 1M legal-risk wording scan found only banned phrases inside "do not use" guidance, disclaimers and intentional coverage caveats.
- Phase 1L validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1L validation: `git diff --check` passed.
- Phase 1L validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1L out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM plus the existing Playwright `process.env.CI` check and a false-positive Public Safety Canada URL; no implementation code or dependencies were added for those items.
- Phase 1L legal-risk wording scan found only banned phrases inside "do not use" guidance, disclaimers and intentional coverage caveats.
- Phase 1L Notion update: Launch Tasks LAUNCH-044 through LAUNCH-046 were created and ADR-023 was added to the Decisions Log.
- Phase 1L publishing note: direct git push from the Codex sandbox was blocked by missing GitHub HTTPS credentials after network access was granted. This workflow limitation is documented in `docs/issue-resolution-log.md`; publish the current branch through GitHub Desktop if shell credentials are unavailable.
- Phase 1K validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1K validation: `git diff --check` passed.
- Phase 1K validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1K out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM plus the existing Playwright `process.env.CI` check and a false-positive Public Safety Canada URL; no implementation code or dependencies were added for those items.
- Phase 1K legal-risk wording scan found only banned phrases inside "do not use" guidance, disclaimers and intentional coverage caveats.
- Phase 1K Notion update: Launch Tasks LAUNCH-041 through LAUNCH-043 were created and ADR-022 was added to the Decisions Log.
- Phase 1J validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1J validation: `git diff --check` passed.
- Phase 1J validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1J out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM plus the existing Playwright `process.env.CI` check; no implementation code or dependencies were added for those items.
- Phase 1J legal-risk wording scan found only banned phrases inside "do not use" guidance plus intentional coverage caveats that tracked coverage is not complete global coverage.
- Phase 1I validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1I validation: `git diff --check` passed.
- Phase 1I validation: static coverage target check passed for 27 coverage targets using `node -r sucrase/register`; all tracked target markets meet the direct-record target configured in `data/coverageTargets.ts`.
- Phase 1I validation: static map geometry check passed; local Natural Earth data currently exposes 37 country features and 37 tracked labels from `public/world-110m`.
- Phase 1I validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1I validation: local Playwright execution could not run because this sandbox has no `npm` executable and the current local `node_modules` does not include `@playwright/test`. The Playwright map tests were added and should run in GitHub Actions after dependency installation.
- Phase 1I validation: local `next dev` startup was blocked by sandbox port-binding permissions (`listen EPERM 0.0.0.0:3000`), so browser smoke testing should run in CI, Vercel preview or a normal local terminal.
- Phase 1I out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM plus the existing Playwright `process.env.CI` check; no implementation code or dependencies were added for those items.
- Phase 1I legal-risk wording scan found only banned phrases inside "do not use" guidance plus intentional coverage caveats that tracked coverage is not complete global coverage.
- Phase 1I Notion update: Launch Command Center includes the visible-map and coverage-depth note; Launch Tasks LAUNCH-034 through LAUNCH-037 were created; ADR-020 was added to Decisions Log; QA & Review Findings now records the map breakpoint defect.
- Phase 1H validation: `tsc --noEmit` passed locally using the bundled Node runtime.
- Phase 1H validation: `git diff --check` passed.
- Phase 1H validation: `next build --webpack` was blocked in the Codex desktop sandbox by a macOS code-signature failure while loading `@next/swc-darwin-arm64`. This happened before app compilation and is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative Next.js build signal.
- Phase 1H out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM plus the existing Playwright `process.env.CI` check; no implementation code or dependencies were added for those items.
- Phase 1H legal-risk wording scan found only banned phrases inside "do not use" guidance plus the intentional Data Quality caveat that tracked coverage is not complete global coverage.
- Phase 1H Notion update: Launch Command Center now includes the premium output and Marquee review governance note; Launch Tasks LAUNCH-030 through LAUNCH-033 were created; ADR-019 was added to Decisions Log; Launch Assets were seeded for the premium pack brief template and Marquee review queue note.
- Phase 1G validation: `next build --webpack` passed locally using the bundled Node runtime and generated 264 static pages, including the five `/premium-packs/[id]` sample pages.
- Phase 1G validation: `tsc --noEmit` passed locally using the bundled Node runtime after the production build completed.
- Phase 1G validation: `git diff --check` passed.
- Phase 1G out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM plus the existing Playwright `process.env.CI` check; no implementation code or dependencies were added for those items.
- Phase 1G Notion update: Launch Command Center now includes the premium pack/manual conversion follow-up note; Launch Tasks LAUNCH-026 through LAUNCH-029 were created; ADR-018 was added to Decisions Log; Launch Assets were seeded for premium pack sample pages and manual conversion tracking.
- Phase 1F validation: `next build --webpack` passed locally using the bundled Node runtime and generated 259 static pages, including `/plans`, `/alerts`, `/advisory`, `/premium-roadmap`, `/assessment`, `/timeline`, `/briefing`, `/data-quality`, expanded `/regulations/[slug]` pages and edition snapshot pages.
- Phase 1F validation: `tsc --noEmit` passed locally using the bundled Node runtime after the production build completed.
- Phase 1F validation: `git diff --check` passed.
- Phase 1F out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron and environment variables plus the existing Playwright `process.env.CI` check; no implementation code or dependencies were added for those items.
- Phase 1F local route smoke testing with `next start` was blocked by sandbox port-binding permissions (`listen EPERM 127.0.0.1:3000`). This is documented in `docs/issue-resolution-log.md`; browser smoke and Lighthouse should run in GitHub Actions, Vercel preview or a local terminal with normal port permissions.
- Phase 1F Notion update: Launch Command Center now includes the May Commercialization Sprint note; Launch Tasks LAUNCH-001 through LAUNCH-025 were created; ADR-014 through ADR-017 were added to Decisions Log; Launch Assets were seeded; QA & Review Findings records the sandbox port-binding limitation.
- Phase 1E validation: `tsc --noEmit` passed locally using the bundled Node runtime.
- Phase 1E validation: `next build --webpack` passed locally and generated 256 static pages, including `/assessment`, `/timeline`, `/briefing`, `/data-quality`, `/jurisdiction/[code]/brief`, expanded `/regulations/[slug]` pages and edition snapshot pages.
- Phase 1E validation: `git diff --check` passed.
- Phase 1E out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron and environment variables plus the existing Playwright `process.env.CI` check; no implementation code or dependencies were added for those items.
- Phase 1E local route smoke testing with `next start` was blocked by sandbox port-binding permissions (`listen EPERM 0.0.0.0:3001`). This is an environment limitation; production build validation passed.
- Phase 1D validation: `tsc --noEmit` passed locally using the bundled Node runtime.
- Phase 1D validation: `next build --webpack` passed locally and generated 256 static pages, including `/premium-roadmap`, expanded `/regulations/[slug]` pages and expanded `/jurisdiction/[code]/brief` pages.
- Phase 1D validation: `git diff --check` passed.
- Phase 1D out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron and environment variables; no implementation code or dependencies were added for those items.
- `npm audit --omit=dev` could not be run in the Codex sandbox because the bundled runtime exposes `node` but not an `npm` executable. Re-run with a local Node/npm installation or in CI if audit evidence is required.
- `tsc --noEmit` passed locally using the bundled Node runtime.
- `next build --webpack` passed locally and generated the app routes, including `/changelog`, `/compare`, `/jurisdiction/[code]/brief` and `/regulations/[slug]`.
- New Etica routes to verify include `/compare?jurisdictions=EUU,GBR`, `/compare?ids=csrd,issb-s1-s2`, `/regulations/issb-s1-s2`, `/edition/0.5/regulations/csrd` and the ISSB redirects.
- `git diff --check` passed.
- Out-of-scope dependency/code scan found no Stripe, Supabase, Mapbox, payment, webhook or environment-variable usage.
- PR #11 CI incident is documented in `docs/issue-resolution-log.md`; future bug fixes should update that log.
- Dark-mode default and contrast issue is documented in `docs/issue-resolution-log.md`; future visual defects should be treated as bugs with root-cause notes.
- Local dev-server startup may be blocked by sandbox port-binding restrictions. Treat that as an environment limitation if TypeScript and production build pass.

## Known Tradeoffs

- Internal jurisdiction IDs were not migrated wholesale to ISO3 codes in this pass because that would be a risky cross-repository identifier migration. Canonical `code` fields now solve the visible UI problem and can support a later controlled migration.
- The map now uses real country polygons, but it is still a lightweight MVP choropleth rather than a full GIS product.
- Per-regulation detail routes now support populated `applicabilityScope` and `penalties` fields. Further threshold and penalty population remains a content-depth task for non-marquee records.
- `/compare` is currently a static/dynamic route driven by query parameters and server-rendered on demand. It is useful but intentionally simple.
- Jurisdiction briefs are copyable and printable, but not PDF-generating yet.

## Recommended Next Phase

Next useful improvements:

- use `docs/product-improvement-backlog.md` as the active 36-item PM/ESG specialist backlog
- clearer map legend and layer explanation
- coverage confidence view separating record volume from source confidence and review risk
- stronger evidence-needed summaries in briefing and regulation detail surfaces
- horizontal timeline/swimlane with quarter precision
- CSV or JSON export of the static regulation database
- richer comparison fields for thresholds, assurance, taxonomy and transition plans
- better per-record maturity axis, such as mandatory in place, mandatory in progress, voluntary in place or ISSB-aligned in progress
- more source-reviewed threshold and penalty content for non-EU and non-marquee records
- source review queue for records marked `needs_review`, `date_uncertain` or `source_missing`

## Ongoing Agent Instruction

When future work changes product behavior, route structure, validation, data fields, taxonomy, legal wording or roadmap status, update the relevant context files in the same pass. The repo should become easier to continue after each iteration.

When future work fixes a bug, failed check or platform issue, always document the symptom, root cause, fix and prevention rule in `docs/issue-resolution-log.md`.
