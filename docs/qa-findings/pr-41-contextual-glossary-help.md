# PR 41 - Contextual Glossary Help

## Finding

PRs #39 and #40 added a useful glossary and status/source-confidence guide, but the guidance still lived on a separate route. Users encounter status, legal-force, readiness and source-quality labels inside Data Quality and regulation details, so those surfaces needed a lightweight path back to the glossary without making tables, badges or homepage cards busier.

## Resolution

- Added `components/GlossaryHelpCard.tsx` as a reusable, low-density helper card.
- Added the card to `/data-quality` so source governance users can interpret labels such as `needs review`, `date uncertain` and `source missing`.
- Added the card to `/regulations/[slug]` so record readers can interpret status, legal-force, readiness and data-quality labels before using a record in an assessment, market brief or advisory conversation.
- Added focused Playwright smoke coverage in `tests/glossary-help.spec.ts`.

## Product Rationale

This strengthens source-linked trust without adding another workspace or making the homepage more visually busy. It also closes the loop between label-heavy decision surfaces and the new glossary guide, which supports non-specialist users and advisory handoffs.

## Legal And Data Guardrails

- The helper card says labels are planning signals, not applicability determinations.
- The helper preserves the glossary caveat that definitions are not official legal definitions or translations.
- No regulation record status, legal-force value, source URL, threshold, scoring logic or applicability logic changed.
- No Stripe, Supabase, authentication, database, paid API, Mapbox, scraping, cron, production email backend, AI legal summary or required environment variable was added.

## Follow-Up

Future rounds can add compact links from individual badge components to `/glossary`, but avoid turning every badge into a tooltip or link if it creates visual noise or keyboard clutter.
