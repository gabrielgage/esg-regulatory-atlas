# PR 79 QA Finding - Interface Language Clarity

## Finding

The language selector supported English, Spanish, Dutch, French, German and Portuguese interface chrome, but the compact header label could be read as broad product translation rather than interface translation.

## Risk

Users could over-infer that regulatory records, source materials or legal interpretation were officially translated. That creates trust and legal-safety risk because the MVP provides source-linked seed intelligence, not official legal translations.

## Resolution

- Changed the accessible label to "Interface language" with localized equivalents.
- Added a localized tooltip caveat explaining that the toggle changes interface guidance only.
- Clarified that regulatory records are not official legal translations.
- Improved dark-mode styling for the compact header control.

## Prevention

When adding language-related UI, distinguish interface chrome from legal source translation. Do not imply official legal translation, complete localization of regulatory records or legal interpretation in another language unless a qualified translation/source-review workflow exists.
