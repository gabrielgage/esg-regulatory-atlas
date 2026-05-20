# Current Release Context

## Current Edition

`0.5.44 - May 2026`

## What Changed In The Latest Release Context Sync

The latest release context captures the glossary and label-interpretation rollout from PRs #39 through #42, the release-context sync in PR #43, the assessment label guardrail in PR #44, the timeline date-label guardrail in PR #45, the briefing output guardrail in PR #46, the comparison output guardrail in PR #47, the market/sector coverage guardrail in PR #48, the profile-detail guardrail in PR #49, the copied-output caveat hardening in PR #50, the export caveat metadata hardening in PR #51, the source memo/citation caveat hardening in PR #52, the copyable decision-readiness checklist hardening in PR #53, the map contrast/untracked coverage key in PR #54, the map coverage key localization in PR #55, the daily launch pulse added afterward, the AI review pack added for external product, ESG and legal-safety critique, the external review intake workflow added to Data Quality, the value-chain exposure workspace added for business-exposure triage, and the expert-review launch-readiness fixes for threshold wording, premium gates, public navigation and homepage orientation.

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
- Clarified that market counts, sector counts, confidence badges and review flags show tracked seed coverage, not complete legal inventories.
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
