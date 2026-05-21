# PR 69 QA Finding - Assessment Trigger Review

## Finding

The assessment workspace produced useful shortlist cards, missing facts, evidence needs and next actions, but it did not clearly explain how the user profile shaped the shortlist at a category level. Users could see individual trigger badges, yet still miss the bigger logic across jurisdiction, company size, sector, value-chain exposure, financial exposure and source/threshold review.

## Resolution

- Added a profile trigger-review panel to the assessment workspace.
- Separated jurisdiction, company profile, sector, value-chain, financial and source/threshold signals.
- Added matched-record counts and next facts to verify for each signal category.
- Added trigger-review context to copied assessment shortlist Markdown.
- Added smoke coverage for the trigger-review panel.

## Product Learning

Assessment outputs need explanation, not just ranking. Showing trigger categories helps users understand why the Atlas is surfacing records and what entity facts should be verified next. This improves trust while keeping the output safely framed as indicative planning intelligence.

## Legal And Data Caveat

The trigger review explains orientation logic only. It does not determine legal applicability, confirm thresholds, verify legal completeness, set compliance deadlines or replace qualified legal, tax, investment or assurance review.
