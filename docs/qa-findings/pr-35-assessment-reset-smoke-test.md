# PR #35 Assessment Reset Smoke Test Fix

Date: 2026-05-12

## Symptom

PR #35 passed Vercel, Lighthouse and the TypeScript/build job, but `CI / Browser smoke tests` failed in the new assessment reset coverage.

## Root Cause

The test expected the reset profile summary to show `No exposure toggles selected`. The actual default assessment profile intentionally includes EU market exposure because `defaultApplicabilityAnswers` starts from a broad EU-oriented profile. The product reset behavior was correct; the smoke assertion encoded the wrong default-state expectation.

## Resolution

The reset smoke test now verifies that reset removes the persona URL parameter and returns the summary to `European Union headquarters` with `EU market exposure` visible.

## Prevention Rule

When adding reset tests, assert the documented default state from the data model rather than assuming every optional toggle clears to false. Opinionated starter profiles should have tests that confirm those starter assumptions return correctly.

## Files Changed

- `tests/smoke.spec.ts`

Note: this QA note mirrors the issue-resolution-log entry maintained locally for the branch. It keeps the CI root cause attached to the PR even when the connector path publishes the test-only fix separately.
