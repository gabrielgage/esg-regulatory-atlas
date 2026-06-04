# PR 97 QA Note - Copyable Market Quick Starts

## What Changed

- Added a copyable quick-start output to jurisdiction market profile cards.
- Added a copyable quick-start index on `/markets` for the core market playbooks.
- Kept copied outputs caveated as seed regulatory intelligence for orientation and planning.

## Why

Market profiles already contained useful first-action, evidence, owner and watch-item prompts, but those prompts were not easy to reuse in client notes or internal triage. This release makes the market quick-start layer portable without adding accounts, databases, document generation or paid infrastructure.

## Guardrails

- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron, production email backend, AI legal summaries or required environment variables.
- Copied outputs preserve edition metadata and legal-caution caveats.
- Quick starts remain indicative seed intelligence and do not determine legal applicability, complete market coverage or formal compliance ownership.

## Validation Focus

- `/markets` renders a copyable quick-start index.
- `/jurisdiction/euu` renders a copyable jurisdiction quick start.
- Copied output structure includes first actions, evidence starter packs, likely owner functions, watch items and caveats.
