# PR 36 - Map Workspace Handoff Calm-Down

## Finding

The homepage had become visually busy below the map because the assessment handoff and a scan table competed for attention immediately after the core map workspace. The map should remain the primary product surface, with supporting actions available only when they help the user move forward.

## Resolution

- Added a compact workspace context note to the assessment handoff showing selected market, active view and matching seed-record count.
- Replaced the always-visible table block with three top matching regulation cards.
- Kept a scan-friendly six-record table available inside an expandable disclosure panel.
- Preserved the full `/regulations` route, regulation detail drawer, selected-jurisdiction panel and source/caveat framing.

## Guardrails

- No regulation data, source confidence, legal force, status, thresholds or applicability logic changed.
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.
- The update is an information-architecture and workflow presentation change only.

## Validation

- `node node_modules/typescript/bin/tsc --noEmit` passed locally in the Codex temp repo.
- `git diff --check` passed locally.
- Local `next build --webpack` remains blocked by the documented Codex macOS SWC code-signature limitation; GitHub CI and Vercel remain the authoritative production build checks.

## Follow-Up

Future homepage changes should avoid adding persistent panels below the map unless they directly support selecting a market, adjusting a view, inspecting priority records or moving into the assessment workflow.
