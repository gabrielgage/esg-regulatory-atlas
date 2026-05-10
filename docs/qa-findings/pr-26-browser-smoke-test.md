# PR #26 Browser Smoke Test Resolution

Date: 2026-05-10
Status: resolved in PR branch

## Symptom

PR #26 passed the Vercel deployment, Lighthouse, and typecheck/build checks, but the GitHub Actions browser smoke test failed on the refreshed homepage map workspace.

The failure was not a production build failure. It came from broad smoke-test selectors that no longer matched the redesigned page structure reliably.

## Root Cause

The homepage now has multiple links to some destinations, including header navigation links and body CTA links. The smoke test was checking page-level links for destinations such as Alerts, which caused strict selector ambiguity.

The map selection test also clicked a broad Canada control by accessible name. After adding pan/zoom and multiple map interaction surfaces, that selector could hit more than one SVG/list target instead of the intended map jurisdiction pin.

## Resolution

- Scoped navigation smoke-test assertions to the header navigation landmark.
- Added stable test hooks to map jurisdiction pins and labels.
- Added a stable test hook to the jurisdiction panel.
- Updated the Canada smoke test to click the Canada map pin by jurisdiction code and verify the selected jurisdiction panel.

## Prevention Rule

When a route appears in both navigation and body CTAs, browser tests should scope assertions to the intended landmark. Interactive SVG map tests should use stable jurisdiction hooks for pins, labels and panels rather than broad accessible-name matches that may target multiple controls.

## Files Changed

- `components/WorldChoropleth.tsx`
- `components/CountryPanel.tsx`
- `tests/smoke.spec.ts`
