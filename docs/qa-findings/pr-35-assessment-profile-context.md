# PR 35 - Assessment Profile Context

## Finding

The assessment page already produced useful indicative results, but the page did not summarize the user profile that generated the shortlist. A user could apply a persona or edit answers and still need to infer which headquarters, sector, market and exposure facts were driving the result set.

## Resolution

- Added a compact `Assessment profile` summary above the form and shortlist.
- Shows headquarters, company size, company type, result count, operating markets, sectors and active exposure toggles.
- Added a `Facts to confirm next` preview from the top indicative results.
- Added a `Reset profile` action that clears persona state and removes the `persona` URL parameter.
- Added browser smoke coverage for the profile summary and reset behavior.

## Guardrails

- No regulation data, source confidence, legal force, status, thresholds or scoring logic changed.
- The new copy uses orientation language and states that the profile summary is not an applicability determination.
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.

## Follow-Up

Watch future assessment changes for repeated profile-summary copy in the result cards. If the page becomes visually dense again, consolidate the profile summary and persona doorway into a single guided start panel.
