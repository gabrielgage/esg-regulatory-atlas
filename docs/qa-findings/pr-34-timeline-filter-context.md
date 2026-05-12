# PR #34 Timeline Filter Context

Date: 2026-05-12
Status: implementation round
Area: Timeline workspace UX

## What Changed

Added visible filter labels, a reset action and a `Current timeline view` summary to `/timeline`. The summary shows how many tracked seed records are in scope, how many have dated milestone signals and which jurisdiction/topic/year filters are active.

## Why It Changed

Regulatory timing is one of the most decision-critical parts of the Atlas, but the previous timeline filters were visually quiet and did not explain the current slice of data. This makes the page easier to use for reporting-calendar planning without changing the underlying seed data or milestone logic.

## Legal And Data-Risk Safeguard

This change only clarifies filter context. It does not alter dates, source confidence, legal force, applicability language, exports or assessment logic. The page keeps date-sensitive caveats and continues to require primary-source validation before reliance.

## Validation

- Local TypeScript check passed with `node node_modules/typescript/bin/tsc --noEmit`.
- Local whitespace check passed with `git diff --check`.
- Smoke coverage now verifies the timeline filter summary, active jurisdiction chip and clear action.

## Guardrails

No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.
