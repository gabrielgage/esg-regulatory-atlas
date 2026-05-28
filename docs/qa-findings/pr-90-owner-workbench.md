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

## QA Correction

While adding the new changelog entry, the latest changelog chip data was reviewed. The `0.5.72` latest-entry chips used non-record planning labels, which would render as links to non-existent regulation detail routes. This PR changes latest changelog chip values back to real regulation IDs so the public changelog record chips remain navigable.

Prevention rule: latest changelog `records` should contain regulation IDs only. Use labels in `added`, `updated`, `summary` or `caveat` fields rather than in the record-chip array.

## Legal-Safety Notes

- Function cards are labelled as planning aids.
- Copy avoids assigning formal legal accountability.
- Caveats state that entity-specific applicability, governance responsibility and legal interpretation require source review and qualified advice.

## Guardrails

No Stripe, Supabase, auth, database, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.

## Validation Plan

CI/Vercel should validate the connector-published branch with typecheck/build, smoke tests, Lighthouse and Vercel deployment. The new smoke test checks `/functions`, owner cards, evidence focus, database handoff and advisory request path.
