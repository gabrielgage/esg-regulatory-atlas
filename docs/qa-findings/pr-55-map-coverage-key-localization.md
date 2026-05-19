# PR 55 - Map Coverage Key Localization

Date: 2026-05-19

## Finding

The untracked-country explanation introduced for the map coverage key was hardcoded in English. That created a gap in the language toggle experience because the surrounding map labels and page chrome already use the translation dictionary.

## Why It Matters

The language toggle is meant to translate product guidance, even though regulation records and legal source text remain source-linked seed intelligence. Map state explanations are product guidance, so they should localize with the rest of the interface.

## Resolution

- Added `map.untrackedTitle` and `map.untrackedBody` to English, Spanish, Dutch, French, German and Portuguese dictionaries.
- Updated `WorldChoropleth` to render the untracked-country explanation through `t()`.
- Added a Spanish smoke assertion for the map coverage key.
- Documented the hardcoded-copy learning in the issue-resolution log.

## Guardrails

The language toggle translates product guidance only. Regulation records, legal source titles, legal effect and applicability interpretation remain seed intelligence and are not official translations.
