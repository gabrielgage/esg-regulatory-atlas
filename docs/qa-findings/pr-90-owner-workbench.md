# PR 90 QA Note - Internal Owner Workbench

Date: 2026-05-28

## Product Need

Users need to understand not only which ESG regulations may be relevant, but which internal functions should start gathering facts, evidence and source-review inputs. The workbench gives sustainability, finance, legal, compliance, procurement, risk, internal audit and board users a calmer owner-oriented entry point.

## Implementation

- Added `/functions` as a public planning route in the More menu.
- Added `data/businessFunctionPlaybooks.ts` for cautious owner playbooks and evidence prompts.
- Added `lib/businessFunctionProfile.ts` to aggregate regulation `affectedFunctions` metadata into owner profiles.
- Added owner cards with priority records, source-backed counts, review prompts, first actions, evidence focus and database handoff links.
- Added advisory scan CTA for source-linked owner matrix requests.

## Legal-Safety Notes

- Function cards are labelled as planning aids.
- Copy avoids assigning formal legal accountability.
- Caveats state that entity-specific applicability, governance responsibility and legal interpretation require source review and qualified advice.

## Guardrails

No Stripe, Supabase, auth, database, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.

## Validation Plan

CI/Vercel should validate the connector-published branch with typecheck/build, smoke tests, Lighthouse and Vercel deployment. The new smoke test checks `/functions`, owner cards, evidence focus, database handoff and advisory request path.
