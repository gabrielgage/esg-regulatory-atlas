# PR 73 QA Finding - Market Obligation Footprint

## Finding

Jurisdiction profile pages explained market drivers and listed priority records, but users still had to infer what kinds of business workstreams may be needed in a selected market. A market could be reporting-heavy, due-diligence-heavy, finance-heavy, product-heavy or data-heavy, but that obligation footprint was not visible as a first-class decision surface.

## Root Cause

The market profile aggregated topics, sectors, value-chain labels, business impacts and evidence as separate lists. Those lists were useful, but they did not translate tracked seed records into obligation categories with owner functions, evidence starters and first actions.

## Resolution

- Added `lib/marketObligationProfile.ts` to derive obligation categories from existing market records.
- Added `components/MarketObligationMatrix.tsx` on jurisdiction profile pages.
- Added owner-function, evidence-starter, first-action and priority-record cues for each populated obligation category.
- Added obligation-footprint context to copied market profile Markdown.
- Added smoke coverage for the obligation footprint on `/jurisdiction/euu`.

## Prevention

Future jurisdiction-profile improvements should keep market interpretation decision-oriented:

- market triggers explain why the market matters;
- obligation footprints explain what kinds of workstreams may need planning;
- priority records show where to inspect source-linked detail;
- caveats preserve that the Atlas does not determine legal applicability, entity-specific duties or complete jurisdiction coverage.
