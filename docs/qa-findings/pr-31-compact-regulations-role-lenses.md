# PR #31 Compact Regulations Role Lenses

Date: 2026-05-11
Status: implementation round
Area: Regulations workspace UX

## What Changed

The role/persona preset surface on `/regulations` was compacted from large cards into a denser role-lens strip. The existing role buttons, accessible labels, active persona state, filter behavior and smoke-test hooks remain intact.

## Why It Changed

The Regulations workspace is one of the main discovery surfaces, but it can feel visually heavy because persona cards, compare controls, filters, exports and the table all appear before the user reaches the database. Compact role lenses keep the useful starting points while reducing vertical weight and visual noise.

## Legal And Data-Risk Safeguard

The change does not alter regulation data, filter logic, source confidence, legal force, assessment logic or applicability wording. The persona presets remain orientation filters only and do not determine applicability.

## Validation

- Local TypeScript check passed with `node node_modules/typescript/bin/tsc --noEmit`.
- Local whitespace check passed with `git diff --check`.
- Existing smoke coverage still targets the same Finance persona accessible label and active-role test hook.

## Guardrails

No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.
