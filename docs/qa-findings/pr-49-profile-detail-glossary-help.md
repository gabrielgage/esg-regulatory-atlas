# PR 49 Profile Detail Glossary Help

Date: 2026-05-15

## Finding

Jurisdiction and sector profile detail pages are deeper advisory-planning surfaces than the market and sector index pages. They combine priority records, readiness scores, direct and inherited records, timing cues, source-confidence signals, review flags, evidence prompts and advisory prompts. Users can overread these combined signals as complete local legal coverage, complete sector legal coverage or entity-specific applicability.

## Product Reasoning

A compact glossary helper directly below the hero caveat gives users a consistent interpretation path before they use profile metrics or priority records. This keeps the profile pages calm while reinforcing that the Atlas is a source-linked triage and planning product, not a legal determination tool.

## Resolution

- Added `GlossaryHelpCard` to `/jurisdiction/[code]` with market-profile detail wording.
- Added `GlossaryHelpCard` to `/sectors/[slug]` with sector-profile detail wording.
- Added Playwright smoke coverage for representative jurisdiction and sector profile detail pages.
- Updated release metadata, changelog supplement, README and current release context to `0.5.33 - May 2026`.

## Guardrails

- No regulation records, source links, dates, status values, thresholds, scoring rules, map data or applicability logic changed.
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries, external database or required environment variables were added.
- Profile detail outputs remain caveated planning aids, not complete inventories, compliance determinations, official translations, entity-specific applicability decisions or source verification.

## Future Note

If profile detail pages become a primary client-deliverable surface, consider adding the same caveat into copied Markdown outputs for market and sector profiles. Keep future copy concise so profile pages stay useful and not overly legalistic.
