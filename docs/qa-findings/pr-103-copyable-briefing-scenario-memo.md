# PR 103 QA Finding - Copyable Briefing Scenario Memo

Date: 2026-06-26

## Scope

Added a copyable scenario memo to the `/briefing` workspace after a user selects an executive or advisory briefing scenario.

## Why It Was Needed

The briefing workspace starts from leadership scenarios such as EU corporate reporting, PE portfolio exposure, supplier/exporter readiness, financial-services watchlists and board/risk updates. Before this change, users could move through tabs and copy a generic client summary, but they could not immediately export the selected scenario frame with priority records, evidence prompts, owner functions and source-review caveats.

## Resolution

- Added `lib/briefingBrief.ts` to generate scenario-level Markdown from the existing static scenario and regulation data.
- Added `Copy scenario memo` to the selected-scenario card on `/briefing`.
- Included leadership question, first operating move, evidence package, advisory motion, priority records, source-review watch prompts, owner functions, first actions and caveats.
- Added smoke coverage for the scenario memo copy control.

## Legal And Product Guardrail

The copied memo is framed as seed regulatory intelligence for orientation and planning. It is not legal advice, board advice, a complete regulatory inventory, official translation, source verification or an entity-specific applicability determination.

## Validation

Run before merge:

- `node node_modules/typescript/bin/tsc --noEmit`
- `npm run lint`
- `npm audit --omit=dev --cache /private/tmp/esg-atlas-npm-cache`
- `npm run build`
- `git diff --check`

GitHub Actions and Vercel remain the authoritative browser and deployment checks after publishing.
