# PR 85 QA Finding - Print Output Polish

## Finding

The global print stylesheet still contained a hardcoded `Edition 0.5 - May 2026` header even though the live dataset metadata had advanced through later releases.

## Risk

Printable jurisdiction briefs and premium pack previews are client-facing trust artifacts. A stale printed edition label can make the Atlas look poorly governed and can confuse reviewers about which static dataset snapshot they are reading.

## Resolution

- Added root layout `data-print-title` and `data-print-subtitle` attributes sourced from `DATASET_META`.
- Updated print CSS to read those attributes instead of hardcoding release text.
- Added A4 margins, cleaner card printing, external source URL expansion and print page-break helper classes.
- Updated the reusable print button to hide from printed output and expose an accessible label.
- Added a data guardrail preventing stale hardcoded print edition strings.

## Prevention Rule

Print and copy outputs should inherit live metadata from shared data sources. Do not hardcode edition labels in CSS, printable pages or export templates.
