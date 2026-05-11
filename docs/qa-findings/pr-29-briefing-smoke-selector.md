# PR #29 Briefing Smoke Selector Fix

Date: 2026-05-11
Status: Resolved
Area: Browser smoke tests

## Symptom

PR #29 passed typecheck/build-related checks, Lighthouse and Vercel, but the browser smoke test for `briefing client summary exposes handoff links` failed while selecting the European Union jurisdiction.

## Root Cause

The jurisdiction selector stores option values from the static data model's `jurisdiction.id` field, while routes and visible labels use jurisdiction codes or display names. The test selected `euu`, which is the European Union route code used in brief URLs. The actual select value is `eu`.

## Resolution

Updated `tests/smoke.spec.ts` to select `eu` from the jurisdiction selector, while keeping the user-facing assertion against `European Union brief`.

## Prevention Rule

When smoke tests interact with select controls generated from static data, select by the actual data-model value and assert the resulting visible label, route or link separately. This prevents tests from coupling route codes to form values unless the component intentionally uses the same field for both.
