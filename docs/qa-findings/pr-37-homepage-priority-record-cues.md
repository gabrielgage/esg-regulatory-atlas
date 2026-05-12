# PR 37 - Homepage Priority Record Cues

## Finding

The Phase 1V homepage handoff reduced clutter by replacing the always-visible table with top matching regulation cards. The cards were calmer, but they did not yet show enough decision context for a user to understand why a record deserved attention before opening the detail drawer.

## Resolution

- Added status, record-type, legal-force and client-relevance badges to the homepage priority record cards.
- Added readiness-priority score, high-impact flag, first reporting cue and source-link count.
- Added a visible source-to-verify line so the card reinforces the Atlas source-governance model.
- Added smoke coverage for the homepage source and first-reporting cues.

## Guardrails

- No regulatory data, source links, legal force, status, thresholds or applicability logic changed.
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.
- The new cues are presentation and triage aids only; they do not create legal applicability conclusions.

## Follow-Up

If the homepage becomes visually busy again, prefer consolidating cues into one expandable decision context row rather than adding another persistent panel.
