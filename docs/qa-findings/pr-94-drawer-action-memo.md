# PR 94 QA Note - Drawer Action Memo

## Change

Added compact action-memo support and surfaced the memo inside the map-workspace regulation drawer. Users can now open a priority record from the main map/table flow and copy facts to confirm, first 30-day actions and source-to-verify prompts without navigating away to the full regulation detail route.

## Why It Matters

The regulation detail page already had a strong action memo, but the primary product journey is map or table -> drawer -> next step. Putting a compact memo in the drawer makes the high-traffic workflow more decision-ready while keeping the full page available for deeper review.

## Validation Added

- `tests/drawer-action-memo.spec.ts` opens the main workspace, selects the first priority record, verifies the drawer opens and confirms the compact action memo, copy button, facts-to-confirm, first-actions and source-to-verify sections render.

## Legal And Product Caveat

Drawer action memos are indicative planning aids. They do not determine legal applicability, source completeness, formal accountability, deadlines or compliance obligations for any entity. The visible memo preserves this limitation.

## Deployment Note

GitHub/Vercel checks for the current main branch are green. If the public alias still displays older release context, inspect Vercel production alias, production branch and domain promotion settings rather than adding app-level authentication or code workarounds.

## Guardrails

No Stripe, Supabase, authentication, database, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.
