# PR 48 Market And Sector Glossary Help

Date: 2026-05-15

## Finding

The market and sector discovery pages expose coverage counts, confidence badges, review flags, sector-tagged record links and high-impact signals. These are useful triage aids, but users can overread them as complete jurisdiction inventories, complete sector legal inventories or definitive statements about what applies in a market or industry.

## Product Reasoning

A compact glossary helper near the top of `/markets` and `/sectors` gives users a clear interpretation path before they use coverage counts for advisory planning. This keeps the pages visually calm while reinforcing the Atlas distinction between tracked seed coverage and complete legal research.

## Resolution

- Added `GlossaryHelpCard` to `/markets` with market-specific coverage wording.
- Added `GlossaryHelpCard` to `/sectors` with sector-specific coverage wording.
- Added Playwright smoke coverage for the market and sector glossary handoffs.
- Updated release metadata, changelog supplement, README and current release context to `0.5.32 - May 2026`.

## Guardrails

- No regulation records, source links, dates, status values, thresholds, scoring rules, map data or applicability logic changed.
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries, external database or required environment variables were added.
- Market and sector outputs remain caveated planning aids, not complete inventories, compliance determinations, official translations or source verification.

## Future Note

If user testing shows market or sector coverage counts are still overread, add a tiny tooltip or inline label near the count metrics. Avoid adding more large cards to these discovery pages unless there is direct evidence users need them.
