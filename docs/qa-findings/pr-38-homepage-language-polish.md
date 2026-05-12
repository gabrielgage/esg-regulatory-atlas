# PR 38 - Homepage Language Polish

## Finding

The language toggle translated the main navigation, filters, map guidance and some homepage labels, but newer homepage workspace copy introduced during the map-handoff and priority-card rounds was still hardcoded in English. This made the multilingual experience feel uneven even though regulatory record content is intentionally kept as English source-linked seed intelligence.

## Resolution

- Added route-scoped translations for the homepage edition label, compare CTA, map workspace guidance, current workspace context, empty-state copy, priority-card labels and source-to-verify cue.
- Applied those strings on the map homepage while keeping regulation titles, source labels and record summaries unchanged.
- Added browser smoke coverage so Spanish mode checks the homepage workspace and priority-card source and first-reporting labels.

## Guardrails

- Regulatory records, source labels, summaries, thresholds, dates, legal-force labels and applicability logic were not translated or changed.
- This is product chrome localization only, not an official legal translation workflow.
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.

## Follow-Up

Continue using product-chrome localization for navigation and workflow guidance, but keep legal/regulatory content in source-linked record data unless a governed translation-review workflow is introduced.
