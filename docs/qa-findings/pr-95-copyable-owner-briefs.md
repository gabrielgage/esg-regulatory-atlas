# PR 95 - Copyable Owner Briefs

Date: 2026-06-04

## Summary

Added copyable Markdown owner briefs to the `/functions` owner workbench. This turns each owner lane into a reusable planning artifact with priority records, first actions, evidence focus, review prompts and caveats.

## Why

The owner workbench already translated regulation records into likely internal functions, but users still had to manually copy or summarize each lane. The existing `businessFunctionMarkdown` helper was not exposed in the UI. Adding a copy action makes the owner workbench more useful for advisory planning while keeping the app static and legally cautious.

## Validation

- `git diff --check` passes locally.
- `tests/functions.spec.ts` now verifies the copy owner brief controls render.

## Guardrails

- No Stripe, Supabase, authentication, database, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables.
- Owner briefs remain indicative seed intelligence and do not assign formal legal accountability or determine entity-specific applicability.
