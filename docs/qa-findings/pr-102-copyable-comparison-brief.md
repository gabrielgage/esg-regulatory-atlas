# PR 102 QA Finding - Copyable Comparison Planning Brief

Date: 2026-06-26

## Scope

Added copyable comparison planning briefs to the `/compare` workspace for both jurisdiction comparison and regulation comparison modes.

## Why It Was Needed

Comparison is a natural advisory handoff point: users compare markets or regimes, then need a cautious summary they can paste into client notes, internal triage, source-review trackers or briefing drafts. Before this change, the page showed useful comparison data but did not provide a governed copied output with edition metadata, source-review prompts and caveats.

## Resolution

- Added `lib/comparisonBrief.ts` to generate Markdown briefs from the existing static seed records.
- Added `Copy comparison brief` to jurisdiction comparison mode.
- Added `Copy comparison brief` to regulation comparison mode.
- Included source-to-verify prompts, owner functions, evidence starters, first 30-day actions and legal-caution caveats in copied output.
- Added smoke coverage for both `/compare?jurisdictions=EUU,GBR` and `/compare?ids=csrd,issb-s1-s2`.

## Legal And Product Guardrail

The copied brief is framed as seed regulatory intelligence for orientation and planning. It does not provide legal equivalence analysis, complete market coverage, official translation, source verification, compliance advice or entity-specific applicability determinations.

## Validation

Run before merge:

- `node node_modules/typescript/bin/tsc --noEmit`
- `npm run lint`
- `npm audit --omit=dev --cache /private/tmp/esg-atlas-npm-cache`
- `npm run build`
- `git diff --check`

GitHub Actions and Vercel remain the authoritative browser and deployment checks after publishing.
