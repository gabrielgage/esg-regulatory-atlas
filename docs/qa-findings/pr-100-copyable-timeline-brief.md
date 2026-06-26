# PR 100 QA Note - Copyable Timeline Planning Brief

## Context

The timeline workspace already supported planning horizons and filters, but users could not lift the active date-sensitive view into a reusable planning note. This release turns the current timeline context into a copyable, caveated brief without adding accounts, document generation, storage, automation or paid infrastructure.

## Change

- Added `lib/timelineBrief.ts` to generate a timeline planning brief from the active filtered records.
- Added a `Copy timeline brief` action to the `/timeline` current-view summary.
- The copied output includes edition metadata, active filters, filtered record counts, dated priority records, source-to-verify prompts, source-review watch items, owner functions, evidence starters and first actions.
- Added smoke coverage for the timeline brief copy control.

## Legal And Data Guardrails

- The copied brief states that it is indicative seed regulatory intelligence for orientation and planning.
- It does not claim complete legal calendars, official filing deadlines, source verification or entity-specific applicability.
- Date-sensitive records remain prompts for source review, not definitive compliance determinations.

## Validation Plan

- `npm run lint`
- `npm audit --omit=dev --cache /private/tmp/esg-atlas-npm-cache`
- `npm run build`
- `git diff --check`
- GitHub CI smoke coverage for `/timeline`
