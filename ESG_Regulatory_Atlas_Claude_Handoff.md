# ESG Regulatory Atlas Handoff

## Current Phase

This branch applies a Phase 0 credibility pass on top of the PR #8 information-architecture refactor. The goal is to address the most visible trust and product-readiness issues identified in the deep review while keeping the MVP static, free to run, Vercel-deployable and legally cautious.

## Why These Changes Were Made

The deep review identified three credibility risks: the map claimed country fill without rendering country polygons, the product repeated "MVP / seed" language too often, and core operational surfaces such as per-regulation detail pages and methodology framing were missing. The Phase 0 update focuses on the fixes that most improve first impressions for a CSO, Head of Legal or ESG consultant.

## Phase 0 Changes Delivered

- Added a static Natural Earth country dataset under `public/world-110m/`, filtered to tracked jurisdictions and EU member states, with attribution in `public/world-110m.LICENSE.txt`.
- Added `components/WorldChoropleth.tsx`, a pure React/SVG choropleth map with no paid APIs, no Mapbox and no runtime external data calls.
- Updated the home page to use the new choropleth map instead of the previous tile-and-label map.
- Added canonical jurisdiction `code` fields so the UI can show ISO-style labels such as `USA`, `CAN`, `GBR`, `NLD`, `EUU` and `USA-CA` without changing existing internal record IDs in a risky migration.
- Added `data/_meta.ts` with dataset edition, last reviewed date, next review date, byline and contact email.
- Renamed the public trust surface from "Data Quality" to "Methodology" in navigation and added `/methodology`.
- Preserved `/data-quality` as a redirect to `/methodology`.
- Added `/about` with methodology, scope, byline, review cadence and contact CTA.
- Added per-regulation detail routes under `/regulations/[slug]`.
- Changed the regulation table "Open" action from a drawer-only button to a real link.
- Added confidence display to the regulation table.
- Reduced repeated "MVP / seed" language in visible product surfaces.
- Fixed the assessment profile typo: "headquarter, large size, corporate ." is now `headquarters · size · company type`.
- Removed the duplicate value-chain filter value `Investments and portfolio companies`.
- Removed the TCFD `2018` reporting-year outlier from visible reporting-year filters while preserving the underlying record for future content review.
- Pulled sectors into `data/sectors.ts` as a single source of truth and stopped truncating the assessment sector picker.

## Technical Notes

- No Stripe, Supabase, authentication, paid APIs, Mapbox, environment variables, database, scraping, cron jobs or runtime AI calls were added.
- The new map fetches `/world-110m/index.json` and same-origin Natural Earth geometry from the app's own `public/` directory.
- The country fill bucket is driven by record count in the active view: `0`, `1-2`, `3-6`, and `7+`.
- EU-level records highlight EU member-state polygons and keep a separate `EUU` overlay label for the supranational jurisdiction.
- California is shown as `USA-CA`, not `CA`, to avoid confusion with Canada.

## Validation

- `tsc --noEmit` passed locally using the bundled Node runtime.
- `git diff --check` passed.
- Out-of-scope dependency/code scan found no Stripe, Supabase, Mapbox, payment, webhook or environment-variable usage.
- Local `next build` remains blocked by the sandbox macOS SWC binary code-sign issue. This has occurred before in this environment and is not an app TypeScript/import/Tailwind error.

## Known Tradeoffs

- Internal jurisdiction IDs were not migrated wholesale to ISO3 codes in this pass because that would be a risky cross-repository identifier migration. Canonical `code` fields now solve the visible UI problem and can support a later controlled migration.
- The map now uses real country polygons, but it is still a lightweight MVP choropleth rather than a full GIS product.
- Per-regulation detail routes use the existing data model with optional `applicabilityScope` and `penalties` fields. Deep threshold and penalty population remains a content-depth task.

## Recommended Next Phase

Phase 1 should add the operational primitives from the review:

- printable/copyable country briefs
- two-jurisdiction comparison
- sector by jurisdiction heatmap
- changelog page
- ranked assessment scoring with visible rubric
- horizontal timeline/swimlane with quarter precision
