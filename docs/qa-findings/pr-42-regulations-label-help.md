# PR 42 - Regulations Label Help

## Finding

The Regulations workspace is the first high-density label surface many users see. It combines status, readiness, confidence, data-quality, legal-force, record-type and client-relevance cues in one table. After adding the glossary and contextual help to Data Quality and regulation detail pages, the database needed a lightweight handoff so users do not treat filtered table results as legal scope.

## Resolution

- Added the reusable `GlossaryHelpCard` to `/regulations` directly after the disclaimer.
- The card explains that database labels are triage signals and links to `/glossary` for status/source interpretation.
- Extended the existing regulations smoke test to assert the helper renders and links to the glossary.

## Product Rationale

This keeps the table useful without adding tooltip clutter to every badge. It supports non-specialist users who are scanning records by persona, sector, jurisdiction or confidence and need a fast reminder that labels support orientation and review rather than legal applicability conclusions.

## Legal And Data Guardrails

- The helper states that filtered results should not be treated as compliance scope.
- No regulation records, statuses, source links, confidence values, thresholds, scoring logic or applicability logic changed.
- The change is static and deployable on Vercel with no infrastructure additions.
- No Stripe, Supabase, authentication, database, paid API, Mapbox, scraping, cron, production email backend, AI legal summary or required environment variable was added.

## Follow-Up

If future user testing shows the helper is too visually prominent, convert it into a compact expandable panel above the table. Do not make every badge a tooltip unless keyboard and screen-reader behavior stays clean.
