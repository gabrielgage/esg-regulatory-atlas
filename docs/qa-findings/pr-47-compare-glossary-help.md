# PR 47 Compare Glossary Help

Date: 2026-05-15

## Finding

The comparison workspace lets users compare jurisdictions and regulations side by side. That is useful for advisory planning, but it can also be overread as legal equivalence, complete market coverage or a definitive statement that one jurisdiction has more or fewer obligations than another.

## Product Reasoning

A compact glossary helper near the top of `/compare` reinforces that comparison tables are based on tracked seed records. It keeps the page calm while giving users a direct path to glossary definitions before interpreting status, date, confidence, source-quality and data-quality labels.

## Resolution

- Added `GlossaryHelpCard` to both comparison modes on `/compare`.
- Wrote comparison-specific copy for tracked seed-record differences, legal equivalence and market coverage caveats.
- Added Playwright smoke coverage for the comparison glossary handoff.
- Updated release metadata, changelog supplement, README and current release context to `0.5.31 - May 2026`.

## Guardrails

- No regulation records, source links, dates, status values, thresholds, scoring rules, map data or applicability logic changed.
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries, external database or required environment variables were added.
- Comparison outputs remain caveated planning aids, not legal equivalence analyses, compliance determinations, official translations, complete market coverage or source verification.

## Future Note

If comparison pages become a primary client-output surface, consider adding optional copied comparison summaries with embedded caveats. Keep this future work static until demand and source-review workflow are validated.
