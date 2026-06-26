# PR 101 QA Note - Copyable Threshold Screening Brief

## Context

The threshold matrix is a high-trust product surface because it helps users identify which facts need review before a regime may be relevant. The page had structured rows and caveats, but no portable output for advisory triage or internal scope-review notes.

## Change

- Added `lib/thresholdBrief.ts` to generate a copyable threshold screening brief from existing matrix rows and review metadata.
- Added a `Copy threshold brief` action on `/thresholds`.
- The copied output includes edition metadata, row counts, priority scope signals, facts to confirm, timing signals, source-to-verify prompts, next review actions, review queue flags, likely owner functions and caveats.
- Added smoke coverage for the threshold brief copy control.

## Legal And Data Guardrails

- The copied brief says threshold rows are screening prompts only.
- It does not decide whether a company, fund, product, supplier or portfolio company is legally in scope.
- It requires entity facts and primary-source confirmation with qualified counsel or regulatory advisors before reliance.

## Validation Plan

- `npm run lint`
- `npm audit --omit=dev --cache /private/tmp/esg-atlas-npm-cache`
- `npm run build`
- `git diff --check`
- GitHub CI smoke coverage for `/thresholds`
