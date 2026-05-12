# PR #32 Active Filter Summary

Date: 2026-05-12
Status: implementation round
Area: Regulations workspace UX

## What Changed
Added a `Current database view` summary to `/regulations` that shows the filtered record count, hidden record count, active persona lens and active filters before the table.

## Why It Changed
The Regulations workspace is dense and users need to understand why the current records are showing before scanning the table. The summary turns search, persona presets and filters into visible context without changing filter behavior or regulatory data.

## Legal And Data-Risk Safeguard
This change does not alter seed data, filter logic, source confidence, legal force, status, applicability wording or assessment output. It remains an orientation surface and does not determine legal applicability.

## Validation
- Local TypeScript check passed with `node node_modules/typescript/bin/tsc --noEmit`.
- Local whitespace check passed with `git diff --check`.
- Smoke coverage now verifies the active Finance role lens appears in the active-filter summary.

## Guardrails
No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.
