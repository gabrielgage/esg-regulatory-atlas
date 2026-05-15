# Current Release Context

## Current Edition

`0.5.30 - May 2026`

## What Changed In The Latest Release Context Sync

The latest release context captures the glossary and label-interpretation rollout from PRs #39 through #42, the release-context sync in PR #43, the assessment label guardrail in PR #44, the timeline date-label guardrail in PR #45, and the briefing output guardrail added immediately after.

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

The Atlas now has many label-heavy decision surfaces. The glossary and contextual help reduce the chance that users treat status labels, confidence labels, data-quality labels, filtered regulation lists, assessment shortlists, timeline milestone dates or briefing outputs as legal applicability conclusions.

## Legal And Product Caveat

Glossary definitions and label guidance are plain-language orientation aids. They are not official legal definitions, official translations, legal advice, source verification or compliance determinations. Regulation records, assessment categories, timeline milestones and briefing summaries remain seed regulatory intelligence unless independently source-reviewed.

## Future Release Sync Rule

After every cluster of small launch-train PRs, update:

- `data/_meta.ts`
- public changelog data or changelog supplement
- relevant docs or QA notes
- the issue-resolution log when a bug, check failure or product defect was fixed

Do this before starting the next feature round so future Codex and Claude sessions inherit the correct current state.
