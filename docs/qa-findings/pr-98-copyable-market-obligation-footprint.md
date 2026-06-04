# PR 98 QA Note - Copyable Market Obligation Footprint

## What Changed

- Added a direct copy action to the market obligation footprint on jurisdiction profiles.
- Reused the existing `marketObligationMarkdown` generator instead of adding a duplicate summary format.
- Updated smoke coverage to verify the copy control on `/jurisdiction/euu`.

## Why

The obligation footprint already translates a market's seed records into obligation categories, likely owners, evidence starters, first actions and priority records. Making that output copyable helps users reuse the jurisdiction-level planning view in client notes, internal workplans and advisory preparation without adding document generation, accounts, databases or paid infrastructure.

## Guardrails

- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron, production email backend, AI legal summaries or required environment variables.
- The copied footprint remains a derived planning output from tracked seed records.
- The output does not determine legal applicability, entity-specific duties, enforcement exposure or complete jurisdiction coverage.

## Validation Focus

- `/jurisdiction/euu` renders the market obligation footprint.
- The footprint exposes the `Copy footprint` action.
- Smoke coverage still verifies obligation categories, likely owners and the jurisdiction decision context.
