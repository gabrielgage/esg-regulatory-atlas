# PR 99 QA Note - Copyable Sector Exposure Brief

## Context

Sector pages already helped users start from a business context, but the copy action produced a basic Markdown summary. The next product need was to make sector outputs reusable in advisory triage notes without adding document generation, accounts, storage or paid infrastructure.

## Change

- Renamed the sector detail action to `Copy sector brief`.
- Upgraded `buildSectorMarkdown` so copied output includes edition metadata, direct and broad sector record counts, tracked market signals, priority records, source-to-verify prompts, source-review watch items, exposure themes, likely owner functions, evidence starters and first 30-day actions.
- Added smoke coverage for the sector copy control on `/sectors/financial-services`.

## Legal And Data Guardrails

- The copied brief states that it is indicative seed regulatory intelligence for orientation and planning.
- The output does not claim complete sector coverage, source verification, legal advice or entity-specific applicability.
- Source-backed counts remain a triage signal only; users are told to confirm primary sources before sharing or relying on the brief.

## Validation Plan

- `npm run lint`
- `npm audit --omit=dev --cache /private/tmp/esg-atlas-npm-cache`
- `npm run build`
- `git diff --check`
- GitHub CI smoke coverage for `/sectors/financial-services`

## Local Browser Note

The targeted local Playwright smoke test was attempted after installing Chromium into `/private/tmp/ms-playwright`, but the Codex macOS sandbox blocked browser launch with `bootstrap_check_in ... Permission denied`. The test did not reach page navigation. Keep the smoke assertion in `tests/smoke.spec.ts` and rely on GitHub Actions for browser execution.
