# PR 70 QA Finding - Market Trigger Review

## Finding

Jurisdiction profile pages listed priority records and readiness signals, but they did not clearly explain what was driving a selected market. Users could see records for a market such as the European Union, United Kingdom or Singapore, yet still had to infer whether the market profile was primarily driven by corporate reporting, climate disclosure, sustainable finance, supply-chain due diligence, product/trade compliance or source-review risk.

## Root Cause

Market profile aggregation focused on record counts, priority records, quick starts and copied summaries. There was no reusable market-level trigger model equivalent to the assessment trigger review, so jurisdiction pages did not translate tracked seed records into driver categories or next verification steps.

## Resolution

- Added `lib/marketTriggerProfile.ts` to derive trigger categories from existing jurisdiction records.
- Added `components/MarketTriggerPanel.tsx` to render matched counts, priority links, facts to verify and first actions.
- Added the panel to `/jurisdiction/[code]`.
- Added market trigger context to copied market profile Markdown.
- Added smoke coverage for the market trigger panel on `/jurisdiction/euu`.

## Prevention

Future market-profile changes should preserve the distinction between:

- tracked seed records and complete market coverage;
- market drivers and legal applicability;
- planning actions and compliance obligations;
- source-review prompts and verified legal conclusions.

When adding a new market-profile surface, include a test or QA note that confirms users can understand why the market matters, not only which records are present.
