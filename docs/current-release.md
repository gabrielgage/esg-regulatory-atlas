# Current Release Context

## Current Edition

`0.5.60 - May 2026`

## What Changed In The Latest Release Context Sync

The latest release context captures the glossary and label-interpretation rollout from PRs #39 through #42, the release-context sync in PR #43, the assessment label guardrail in PR #44, the timeline date-label guardrail in PR #45, the briefing output guardrail in PR #46, the comparison output guardrail in PR #47, the market/sector coverage guardrail in PR #48, the profile-detail guardrail in PR #49, the copied-output caveat hardening in PR #50, the export caveat metadata hardening in PR #51, the source memo/citation caveat hardening in PR #52, the copyable decision-readiness checklist hardening in PR #53, the map contrast/untracked coverage key in PR #54, the map coverage key localization in PR #55, the daily launch pulse added afterward, the AI review pack added for external product, ESG and legal-safety critique, the external review intake workflow added to Data Quality, the value-chain exposure workspace added for business-exposure triage, the expert-review launch-readiness fixes for threshold wording, premium gates, public navigation and homepage orientation, the scenario-led briefing workspace that prevents raw default briefing output, the near-term timeline planning view, automated regulatory data guardrail checks, trust-signal/request-path clarity for user-facing commercial and governance surfaces, the threshold matrix for high-value scope signals, the assessment readiness plan, the Marquee 10 source-review packet, the regulation implementation roadmap, the assessment trigger review, the market trigger review on jurisdiction profiles, the CI Node 24 readiness pass for GitHub Actions, the follow-up upgrade to Node 24-compatible GitHub action versions, the market obligation footprint for jurisdiction profiles, the public journey simplification pass from the 2026-05-25 expert brief, the assessment shortlist overview that moves top records and next actions above detailed trigger logic, and the Regulations search-first layout.

### 0.5.60 - Regulations Search-First Layout

- Moved `/regulations` into a search-first hierarchy.
- Leads with search, jurisdiction, topic, sector, company type and reporting year filters.
- Keeps active filter summary immediately after the primary filter workspace.
- Moves role lenses and comparison into secondary tools below the result table.
- Moves label help, share and export controls below the result table so first-time users see records faster.
- Keeps exports, source caveats, role lenses and compare functionality intact.

### 0.5.59 - Assessment Shortlist Overview

- Added a decision-first overview to `/assessment` before detailed trigger logic.
- Shows top records to review first, relevance-mix counts, facts to confirm and first 30-day actions.
- Adds an advisory scan CTA inside the assessment hierarchy so users can move from orientation to manual review.
- Keeps the existing profile summary, trigger review, readiness plan, form controls and detailed shortlist.
- Added smoke coverage so the overview remains visible.
- Kept all wording indicative and caveated.

### 0.5.58 - Public Journey Simplification

- Reduced the primary navigation to Start, Assessment, Markets, Regulations, Advisory and a grouped More menu.
- Reframed the homepage around the three highest-value user jobs: run an indicative assessment, explore markets/regulations and request a source-linked advisory scan.
- Replaced homepage changelog/plans hero CTAs with assessment, market and regulation search actions.
- Demoted public-facing launch/operator wording by keeping `/launch` noindex and describing it as an internal launch workspace.
- Replaced “Static MVP CTA only” language in the market briefing CTA with customer-facing advisory scan language.
- Added a simplification roadmap that separates urgent May 25 items from the next-seven-day and 30-day backlog.
- Kept regulatory depth, source links, caveats and static deployment guardrails intact.

### 0.5.57 - Market Obligation Footprint

- Added a market obligation footprint to jurisdiction profile pages.
- Grouped tracked records by business-impact categories such as reporting, assurance, governance, due diligence, supply chain, financial disclosure, taxonomy, transition plans, data collection and product compliance.
- Added likely owner functions, evidence starters, first actions and priority record links for each populated obligation category.
- Added obligation-footprint context to copied market profile Markdown.
- Kept the footprint framed as seed-data planning orientation, not legal applicability, entity-specific duties or complete market coverage.

### 0.5.56 - GitHub Actions Node 24 Action Upgrade

- Upgraded `actions/checkout` from v4 to v5 in CI and Lighthouse workflows.
- Upgraded `actions/setup-node` from v4 to v5 in CI and Lighthouse workflows.
- Kept the workflow-level Node 24 action-runtime opt-in as an early compatibility signal.
- Kept the application build/runtime target on Node 22.
- Documented that the v4 actions were being forced to Node 24 but still targeted Node 20, so action-version upgrades were needed to remove the warning at source.

### 0.5.55 - CI Node 24 Readiness

- Opted CI and Lighthouse workflows into the Node 24 JavaScript action runtime.
- Kept the application build/runtime target on Node 22 through `actions/setup-node`.
- Documented the GitHub Actions Node 20 deprecation warning and prevention rule in the issue-resolution log.
- Updated development workflow notes so future agents understand the difference between GitHub action runtime and the app build runtime.
- Kept the change as workflow hardening only; it does not add infrastructure, external services or product-scope changes.

### 0.5.54 - Market Trigger Review

- Added market trigger-review panels to jurisdiction profile pages.
- Grouped market drivers into corporate reporting, climate, sustainable finance, supply-chain, product/trade and source-review signals.
- Added matched-record counts, priority record links, verification prompts and first actions for each trigger category.
- Added trigger-review context to copied market profile Markdown.
- Kept market trigger review as a seed-data orientation aid, not a legal scope conclusion or complete jurisdiction inventory.

### 0.5.53 - Assessment Trigger Review

- Added a profile trigger-review panel to the assessment workspace.
- Explained how jurisdiction, company profile, sector, value-chain, financial and source/threshold signals shape the indicative shortlist.
- Added matched-record counts and next verification facts for each trigger category.
- Added trigger-review context to copied assessment shortlist Markdown.
- Kept trigger review as a planning explanation, not a legal applicability conclusion.

### 0.5.52 - Regulation Implementation Roadmap

- Added 30/60/90-day implementation roadmaps to regulation detail pages and drawers.
- Added suggested owner, source to verify, source posture and evidence focus cues.
- Added copyable roadmap Markdown with edition metadata, source-review context and caveats.
- Added smoke and copy-surface checks for the roadmap.
- Kept roadmap output as orientation and planning support, not legal advice or applicability determination.

### 0.5.51 - Marquee 10 Source-Review Packet

- Added a Marquee 10 source-review packet to the Data Quality review workflow tab.
- Combined review status, decision-readiness, source-posture and premium-use signals for the highest-demand launch records.
- Added priority source, threshold fact and owner/action cards for each Marquee 10 regime.
- Added smoke coverage so the source-review packet stays visible in the Data Quality workflow.
- Kept the packet framed as source-governance and planning support, not legal verification or applicability determination.

### 0.5.50 - Assessment Readiness Plan

- Added assessment readiness plan cards for threshold facts to check, first 30-day actions and likely owner functions.
- Added threshold matrix badges to assessment shortlist records when a record appears in `/thresholds`.
- Added copied assessment shortlist metadata listing threshold-sensitive records.
- Updated assessment smoke coverage so the readiness plan stays visible.
- Kept assessment output legally cautious and source-review oriented.

### 0.5.49 - Threshold Matrix For High-Value Records

- Added `/thresholds` as a public decision-readiness surface for high-value scope signals.
- Added `data/thresholdMatrix.ts` with threshold type, facts to confirm, timing signal, source to verify, review status, confidence and caveat for each row.
- Linked Data Quality and threshold-sensitive regulation detail pages to the matrix so source, threshold and entity-fact review has a visible product lane.
- Added data-guardrail coverage so threshold matrix rows must map to existing regulation records, include source links, provide facts to confirm and preserve caveats.
- Kept threshold rows as seed planning signals, not legal determinations or client-ready scope findings.

### 0.5.48 - Trust-Signal Clarity And Request Paths

- Added a reusable Quality Signal explainer to `/data-quality` and `/markets` so record counts, source-link rates, review prompts and confidence labels are framed as planning signals.
- Added a reusable Manual Request panel to `/plans`, `/alerts`, `/advisory` and `/premium-roadmap` explaining what users should send, what Etica returns and why requests remain manual.
- Renamed broad source-coverage and review-flag language into captured-source and review-prompt language across core surfaces.
- Clarified that request paths are mailto-only validation flows and do not create accounts, subscriptions, automated alerts or legal advice.

### 0.5.47 - Regulatory Data Guardrail Checks

- Added `tests/data-guardrails.spec.ts` to check core source-governance metadata, high-impact review signals, premium-use gates and definitive legal wording across seed and premium-pack data.
- Added `npm run check:data` for targeted regulatory data guardrail validation.
- Kept the checks inside the existing Playwright CI run so future seed-data changes fail before merge when common trust risks appear.
- Documented that automated guardrails support source governance but do not replace legal, regulatory or source review.

### 0.5.46 - Near-Term Regulatory Timeline Planning

- Added planning-horizon tabs to `/timeline`: next 12 months, next 24 months, already in force, longer-term watch and full history.
- Changed the default timeline from full chronology to the next 24 months plus high-impact already-effective obligations.
- Updated timeline copy so date filters are presented as planning signals anchored to the May 2026 release context.
- Added active filter summary support for non-default timeline horizons.
- Added smoke coverage for timeline horizon selection and reset behavior.

### 0.5.45 - Scenario-Led Briefing Workspace

- Added `data/briefingScenarios.ts` with curated briefing scenarios for EU corporate reporting, PE portfolio exposure, SME supplier/exporter readiness, financial services sustainable finance and board/risk committee updates.
- Updated `/briefing` so users choose a planning scenario before dynamic briefing output appears.
- Scenario selection now narrows priority records, advisory workstreams, data-governance checks and copied summaries to the selected context.
- Executive briefing cards now use scenario-specific leadership questions, first operating moves, evidence packages, advisory motions and caveats.
- Added smoke coverage for the scenario-first briefing flow.

### 0.5.44 - Expert Review Launch-Readiness Fixes

- Added a compact Start Here panel to `/` so first-time users can begin with an exposure assessment, market profile or regulation search.
- Removed `/launch` from public navigation and set noindex metadata on the route because it is an operator workspace, not a client-facing product route.
- Replaced public commercial CTA secondary links to `/launch` with user-facing plan or advisory routes.
- Added premium source-review gates on premium pack preview pages so blocked or review-needed records are labelled as illustrative-only or review-before-use.
- Strengthened CSRD/CSDDD threshold wording so CSDDD threshold signals are not presented as general EU corporate-reporting thresholds.
- Added smoke coverage for the Start Here panel, hidden Launch nav item and premium gate visibility.

### 0.5.43 - Value-Chain Exposure Workspace

- Added `/value-chain` as a business-exposure workspace for suppliers, trade/imports, products, claims, portfolio companies, financed emissions, own operations and board oversight.
- Added `lib/valueChainProfile.ts` to aggregate value-chain tags into priority records, markets, topics, evidence, actions and advisory opportunities.
- Added copyable value-chain exposure briefs with caveats.
- Added filtered handoffs to `/regulations?valueChain=...`.
- Added the route to the Header More menu and smoke coverage.

### 0.5.42 - External Review Intake Workflow

- Added `data/reviewIntake.ts` to define how external feedback should be routed after AI, ESG specialist, legal-risk or user review.
- Added `components/ExternalReviewIntakePanel.tsx` on the Data Quality review workflow tab.
- Added a copyable intake-routing packet covering issue logs, coverage worksheets, product backlog and future capability planning.
- Added `docs/ai-review/Review_Feedback_Intake_Template.md`.
- Added smoke coverage for the new Data Quality intake surface.

### 0.5.41 - AI Review Pack

- Added `docs/ai-review/ESG_Regulatory_Atlas_AI_Review_Export_2026-05-20.md` for a detailed external-review handoff covering current capabilities, architecture, UX, data model, commercial strategy, legal safeguards and open questions.
- Added `docs/ai-review/AI_Reviewer_Feedback_Prompt.md` so the product owner can ask another AI for structured, critical findings instead of generic feedback.
- Added `docs/ai-review/Future_Capabilities_Deep_Review_Backlog.md` to separate near-term static MVP improvements from later platform capabilities that require explicit scope approval.
- Added `docs/ai-review/Regulatory_Coverage_Review_Worksheet.md` and `.csv` so market and regulation coverage review can be tracked in Markdown, Notion or spreadsheet form.
- Updated release metadata and core context docs so future Codex and Claude sessions know where external feedback should be captured and reconciled.

### 0.5.40 - Daily Launch Pulse And Dependency Audit Patch

- Added static daily launch pulse data in `data/dailyUpdates.ts`.
- Added a reusable daily launch pulse component for latest shipping context, validation expectations and next product-review focus.
- Added the pulse to `/changelog` and the Data Quality overview without adding automation, accounts, email infrastructure or backend services.
- Patched Next.js to `^16.2.6` after `npm audit --omit=dev` flagged a high-severity advisory on the prior production dependency range.
- Added smoke coverage confirming the daily launch pulse renders on both public and governance surfaces.

### 0.5.39 - Localized Map Coverage Key

- Moved the untracked-country map explanation into the interface translation dictionary.
- Added map key translations for English, Spanish, Dutch, French, German and Portuguese.
- Added smoke coverage confirming the Spanish map coverage key appears after switching language.
- Documented the learning that new product chrome should not ship as English-only copy.

### 0.5.38 - Map Contrast And Untracked Coverage Key

- Increased ocean, untracked-land and country-border contrast in light and dark mode.
- Added an explicit map key explaining that pale countries are visible but do not yet have direct Atlas seed coverage.
- Added a subtle ocean gradient and map frame so the country outline map reads as a map rather than floating shapes.
- Added smoke coverage for the map coverage key and untracked-country styling.

### 0.5.37 - Decision Readiness Checklist Copy

- Added a copy readiness checklist control to regulation detail decision-readiness panels.
- Added edition, publisher, editor and contact metadata to copied readiness checklists.
- Added source-review steps, facts to confirm, evidence package, first 30-day actions, decision-data gaps and caveats to copied readiness output.
- Added smoke coverage for the copyable decision-readiness checklist surface.

### 0.5.36 - Source Memo And Citation Caveats

- Added copied-output guidance next to source memo copy controls on regulation detail pages.
- Added publisher, editor, contact, edition, dataset review date and source-count context to copied source governance memos.
- Added visible citation caveat language and embedded citation-copy caveats for APA, legal research note and BibTeX snippets.
- Added smoke coverage for source memo and citation caveat surfaces.

### 0.5.35 - Export Caveat Metadata

- Added visible export caveat guidance to `/regulations` near CSV/JSON download controls.
- Wrapped JSON exports with metadata covering publisher, editor, edition, review dates, record count, caveat and source-review note.
- Added CSV metadata columns covering edition, exported date, publisher, editor, record count, caveat and source-review note.
- Added smoke coverage for the regulation export caveat note.

### 0.5.34 - Copied Summary Caveat Hardening

- Added visible copied-output caveat notes to `/jurisdiction/[code]`, `/sectors/[slug]` and `/jurisdiction/[code]/brief`.
- Added source-review notes and review-flag counts to copied market, sector and jurisdiction brief Markdown.
- Added smoke coverage for copied-output caveat notes.

### 0.5.33 - Market And Sector Detail Interpretation Guardrail

- Added contextual glossary help to `/jurisdiction/[code]` and `/sectors/[slug]`.
- Clarified that profile detail pages combine seed records, readiness scores, source-confidence signals, timing cues and advisory prompts for triage only.
- Added smoke coverage for jurisdiction and sector profile glossary handoffs.

### 0.5.32 - Market And Sector Coverage Interpretation Guardrail

- Added contextual glossary help to `/markets` and `/sectors`.
- Clarified that market counts, sector counts, confidence badges and review prompts show tracked seed coverage, not complete legal inventories.
- Added smoke coverage for the market and sector glossary handoffs.

### 0.5.31 - Comparison Output Interpretation Guardrail

- Added contextual glossary help to `/compare` for both jurisdiction and regulation comparison modes.
- Clarified that side-by-side comparison tables show tracked seed-record differences, not legal equivalence or complete market coverage.
- Added smoke coverage for the comparison glossary handoff.

### 0.5.30 - Briefing Output Interpretation Guardrail

- Added contextual glossary help to `/briefing`.
- Clarified that priority records, copied summaries, evidence prompts and advisory signals are planning aids.
- Added smoke coverage for the briefing glossary handoff.

### 0.5.29 - Timeline Date Interpretation Guardrail

- Added contextual glossary help to `/timeline`.
- Clarified that effective dates, first reporting years, first report due dates and Atlas review dates are planning signals.
- Added smoke coverage for the timeline glossary handoff.

### 0.5.28 - Assessment Label Interpretation Guardrail

- Added contextual glossary help to `/assessment`.
- Clarified that shortlist categories, confidence labels and data-quality signals are triage prompts.
- Added smoke coverage for the assessment glossary handoff.

### 0.5.27 - Glossary And Label Interpretation

- Public `/glossary` route for plain-language ESG regulatory terms.
- Status and source-confidence guide for interpreting labels such as in force, consultation, voluntary, needs review, date uncertain and source missing.
- Contextual glossary help on `/regulations`, `/data-quality` and `/regulations/[slug]`.
- Smoke tests for glossary navigation and contextual label-help surfaces.

### 0.5.26 - Homepage Workspace And Multilingual Handoff Polish

- Homepage priority-record cards with source-to-verify and first-reporting cues.
- Localized homepage workspace chrome across English, Spanish, Dutch, French, German and Portuguese.
- Scoped smoke tests for priority-card and language-label behavior.

### 0.5.25 - Assessment Profile Transparency

- Active assessment profile summary.
- Facts-to-confirm prompts before users interpret an indicative shortlist.
- Reset-profile behavior for restarting the static assessment flow.

## Why This Matters

The Atlas now has many label-heavy, copyable, citation-like and exportable decision surfaces. The glossary, contextual help, copied-output caveats, source memo metadata, citation caveats and export metadata reduce the chance that users treat status labels, confidence labels, data-quality labels, filtered regulation lists, assessment shortlists, timeline milestone dates, briefing outputs, side-by-side comparisons, market counts, sector counts, profile-detail priority signals, copied Markdown summaries, copied source memos, copied decision-readiness checklists, Atlas citation snippets or downloaded CSV/JSON files as legal applicability conclusions, source verification, official translations or complete coverage claims.

## Legal And Product Caveat

Glossary definitions, label guidance, copied summaries, copied source memos, copied decision-readiness checklists, citation snippets and downloaded exports are plain-language orientation aids. They are not official legal definitions, official translations, legal advice, source verification, legal opinions, legal authority or compliance determinations. Regulation records, assessment categories, timeline milestones, briefing summaries, comparison tables, market profiles, sector profiles, profile-detail priority records, copied Markdown outputs, source memo outputs, decision-readiness checklist outputs, map color signals, Atlas citation snippets and CSV/JSON exports remain seed regulatory intelligence unless independently source-reviewed.

## Future Release Sync Rule

After every cluster of small launch-train PRs, update:

- `data/_meta.ts`
- public changelog data or changelog supplement
- relevant docs or QA notes
- the issue-resolution log when a bug, check failure or product defect was fixed

Do this before starting the next feature round so future Codex and Claude sessions inherit the correct current state.
