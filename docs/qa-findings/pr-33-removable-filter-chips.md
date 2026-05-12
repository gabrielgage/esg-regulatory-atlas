# PR #33 Removable Filter Chips

Date: 2026-05-12
Status: implementation round
Area: Regulations workspace UX

## What Changed
Active filters in the `/regulations` current-view summary are now removable one by one. Each filter chip is a keyboard-accessible button with a clear label such as `Remove Business function filter`.

## Why It Changed
A full reset is too blunt when a user only wants to remove one narrowing condition. Removable chips make the dense regulation database easier to tune without adding another filter panel or increasing page density.

## Legal And Data-Risk Safeguard
This change only updates filter interaction. It does not alter regulation seed data, source quality, legal force, status, applicability language, export behavior or assessment logic.

## Validation
- Local TypeScript check passed with `node node_modules/typescript/bin/tsc --noEmit`.
- Local whitespace check passed with `git diff --check`.
- Smoke coverage verifies that removing the Business function chip clears the corresponding filter control.

## Guardrails
No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.
