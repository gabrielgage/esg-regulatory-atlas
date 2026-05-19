# Current Release Context

## Current Edition

`0.5.37 - May 2026`

## What Changed In The Latest Release Context Sync

The latest release context captures the glossary and label-interpretation rollout from PRs #39 through #42, the release-context sync in PR #43, the assessment label guardrail in PR #44, the timeline date-label guardrail in PR #45, the briefing output guardrail in PR #46, the comparison output guardrail in PR #47, the market/sector coverage guardrail in PR #48, the profile-detail guardrail in PR #49, the copied-output caveat hardening in PR #50, the export caveat metadata hardening in PR #51, the source memo/citation caveat hardening in PR #52, and the copyable decision-readiness checklist hardening added immediately after.

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

Glossary definitions, label guidance, copied summaries, copied source memos, copied decision-readiness checklists, citation snippets and downloaded exports are plain-language orientation aids. They are not official legal definitions, official translations, legal advice, source verification, legal opinions, legal authority or compliance determinations. Regulation records, assessment categories, timeline milestones, briefing summaries, comparison tables, market profiles, sector profiles, profile-detail priority records, copied Markdown outputs, source memo outputs, decision-readiness checklist outputs, Atlas citation snippets and CSV/JSON exports remain seed regulatory intelligence unless independently source-reviewed.

## Future Release Sync Rule

After every cluster of small launch-train PRs, update:

- `data/_meta.ts`
- public changelog data or changelog supplement
- relevant docs or QA notes
- the issue-resolution log when a bug, check failure or product defect was fixed

Do this before starting the next feature round so future Codex and Claude sessions inherit the correct current state.
