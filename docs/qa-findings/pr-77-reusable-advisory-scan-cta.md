# PR 77 QA Finding - Reusable Advisory Scan CTA

Date: 2026-05-25

## Finding

The Atlas had multiple advisory-scan and market-briefing CTA variants across assessment, market, regulation detail and drawer surfaces. The calls to action were directionally correct, but the copy, caveats and mailto construction could drift as more pages were added.

## Product Risk

Advisory scans are the near-term commercial path. If each route creates its own request block, the product can start to feel inconsistent and may accidentally promise different deliverables, stronger legal certainty or automated service behavior.

## Resolution

- Added `components/AdvisoryScanCTA.tsx` as the shared advisory request component.
- Added a shared `advisoryScanHref` helper for mailto-only request paths.
- Converted `components/MarketBriefingCTA.tsx` into a wrapper for market-scan wording.
- Updated assessment, regulation detail page and regulation drawer CTAs to use the shared component.
- Standardized the legal caveat: advisory scans are manual, source-linked planning outputs and are not legal opinions, official source verification or definitive applicability determinations.

## Prevention

Future advisory request surfaces should use `AdvisoryScanCTA` or a thin wrapper around it. Do not add one-off advisory mailto blocks unless the route genuinely needs a different commercial motion, and do not imply paid infrastructure, automated delivery, legal advice or confirmed applicability.
