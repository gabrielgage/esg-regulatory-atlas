# PR 50 Copied Output Caveat Hardening

Date: 2026-05-18

## Finding

Market profile, sector profile and printable jurisdiction brief Markdown can be copied out of the Atlas and shared in email, documents or client planning notes. Once copied, the output loses surrounding page context unless the copied text and nearby controls clearly preserve caveats, source-review status and confidence-review signals.

## Product Reasoning

Copied outputs are a high-trust workflow because users may reuse them in advisory, internal planning or client-facing materials. The safest MVP pattern is to keep copy/export lightweight while making caveats travel with the copied text and warning users before they copy.

## Resolution

- Added a reusable `CopyOutputNote` component near copy controls on jurisdiction profiles, sector profiles and printable jurisdiction briefs.
- Added source-review notes to copied market profile Markdown.
- Added source-review notes to copied sector profile Markdown.
- Added review-flag counts and a source-review note to copied jurisdiction brief Markdown.
- Added Playwright smoke coverage for copied-output caveat notes on profile and brief routes.
- Updated release metadata, changelog supplement, README and current release context to `0.5.34 - May 2026`.

## Guardrails

- No regulation records, source URLs, dates, status values, thresholds, scoring rules, map data or applicability logic changed.
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries, external database or required environment variables were added.
- Copied outputs remain caveated planning aids, not legal opinions, source verification, official translations, complete coverage, compliance determinations or entity-specific applicability decisions.

## Future Note

If copied summaries become a primary commercial deliverable, consider a static signed-and-dated export footer or simple PDF route later. Keep it static until demand and review governance justify a richer export workflow.
