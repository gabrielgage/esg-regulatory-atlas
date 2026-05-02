# Etica ESG · Regulatory Atlas Handoff

## Current Phase

The app is now in a static Phase 1B market coverage and usability pass on top of the Phase 1A Etica credibility update. The goal remains deployability and legal caution, but the emphasis has moved to broader per-market regulation coverage, clearer map legibility, multilingual interface chrome, share/export utility and planning-grade scoring.

## Phase 1B Changes Delivered

- Added `data/marketCoverage.ts` and imported it through `data/seed.ts` so under-covered markets no longer rely on one or two records.
- Added market-depth records for Mexico, Netherlands, California, United States, China, Singapore, Japan, Australia, Brazil, Switzerland and Turkey.
- Kept new market records legally cautious with source links, review dates, confidence levels and data-quality flags rather than presenting complete legal coverage.
- Added `lib/i18n.ts`, `components/LanguageProvider.tsx` and `components/LanguageToggle.tsx` for English, Spanish, Dutch, French, German and Portuguese product chrome.
- Translated navigation, legal disclaimer text, hero guidance, key homepage labels and share/export labels while leaving legal/regulatory record content in source-linked seed English.
- Improved `components/WorldChoropleth.tsx` with stronger country borders, higher non-selected opacity, clearer legend borders and subtle graticule cues.
- Added `lib/urlFilters.ts` and shareable query-string persistence for Map and Regulations filters.
- Added `components/ShareViewButton.tsx` and `components/RegulationExportButtons.tsx`.
- Added `lib/scoring.ts` and surfaced readiness-priority scoring in the regulation table, regulation drawer and per-regulation detail pages.
- Expanded `/compare` with readiness, thresholds, first report due date, affected functions, advisory opportunities and enforcement rows for regulation comparisons.
- Updated `components/RegulatoryTimeline.tsx` to group more milestones by year rather than showing a short flat list.
- Improved `components/DataQualityPanel.tsx` with high-impact review checks, upcoming review counts and a larger prioritized research queue.
- Improved `components/ExportSummaryButton.tsx` with jurisdiction, sector and company-type controls for more useful client planning summaries.
- Added a `0.5.1 - May 2026` changelog entry for market coverage and usability changes.

## Etica ESG Rebrand / v4 Unblock Changes Delivered

- Rebranded the product identity to `Etica ESG · Regulatory Atlas`.
- Added temporary Etica SVG assets at `public/etica-esg-logo.svg`, `public/favicon.svg` and `public/og-image.svg`.
- Updated `data/_meta.ts` with publisher, publisher URL, editor, contact email, LinkedIn URL, edition slug and Etica byline fields.
- Updated root metadata and visible header/footer identity to Etica ESG publisher framing.
- Added `components/ThemeToggle.tsx` and Tailwind class-based dark mode. The toggle persists `etica-theme` in local storage and is available in the global header.
- Added `app/not-found.tsx` with branded recovery links, methodology/regulations/map links and Etica contact.
- Added redirects for `/regulations/issb-ifrs-s1`, `/regulations/issb-ifrs-s2`, `/regulations/issb` and `/regulations/ifrs-s1` to `/regulations/issb-s1-s2`.
- Added `components/CitationWidget.tsx` on regulation detail pages with APA-style, legal research note and BibTeX copy blocks.
- Added `/edition/0.5/regulations/[slug]` as the current static edition snapshot route for regulation details.
- Added typed `data/changelog.ts` and updated `/changelog` to render reverse-chronological edition cards with regulation record chips.
- Expanded `/compare` to support `?jurisdictions=EUU,GBR`, legacy `?a=EUU&b=GBR`, and regulation comparison via `?ids=csrd,issb-s1-s2`.
- Added `components/ComparePicker.tsx` to `/regulations` using an accessible `<details>` panel.
- Added print/copy controls and Etica publisher/byline copy to jurisdiction briefs.
- Added four assessment persona doorways: CSO, SME supplier sustainability lead, in-house legal and external advisor.
- Added `aria-pressed` to assessment and compare chip toggles.
- Added `components/StatusBadge.tsx` with icons so status no longer relies on color alone; voluntary styling is now neutral slate.
- Grouped advanced filters into Geography, Regulatory shape and Business framing.
- Added global skip-to-content link and print CSS for cleaner A4 output.
- Simplified the primary navigation to Map, Regulations, Assessment, Timeline, Briefing and Data Quality, while keeping Methodology, Changelog, Compare and About as support routes.
- Restored `/data-quality` as a real governance page for source library, coverage matrix and review-risk workflows.

## Why These Changes Were Made

The deep review identified three credibility risks: the map claimed country fill without rendering country polygons, the product repeated "MVP / seed" language too often, and core operational surfaces such as per-regulation detail pages and methodology framing were missing. The Phase 0 update focuses on the fixes that most improve first impressions for a CSO, Head of Legal or ESG consultant.

## Phase 0 Changes Delivered

- Added a static Natural Earth country dataset under `public/world-110m/`, filtered to tracked jurisdictions and EU member states, with attribution in `public/world-110m.LICENSE.txt`.
- Added `components/WorldChoropleth.tsx`, a pure React/SVG choropleth map with no paid APIs, no Mapbox and no runtime external data calls.
- Updated the home page to use the new choropleth map instead of the previous tile-and-label map.
- Added canonical jurisdiction `code` fields so the UI can show ISO-style labels such as `USA`, `CAN`, `GBR`, `NLD`, `EUU` and `USA-CA` without changing existing internal record IDs in a risky migration.
- Added `data/_meta.ts` with dataset edition, last reviewed date, next review date, byline and contact email.
- Added `/methodology` for methodology explanation and restored `/data-quality` as the primary source coverage and review-risk governance route.
- Added `/about` with methodology, scope, byline, review cadence and contact CTA.
- Added per-regulation detail routes under `/regulations/[slug]`.
- Changed the regulation table "Open" action from a drawer-only button to a real link.
- Added confidence display to the regulation table.
- Reduced repeated "MVP / seed" language in visible product surfaces.
- Fixed the assessment profile typo: "headquarter, large size, corporate ." is now `headquarters · size · company type`.
- Removed the duplicate value-chain filter value `Investments and portfolio companies`.
- Removed the TCFD `2018` reporting-year outlier from visible reporting-year filters while preserving the underlying record for future content review.
- Pulled sectors into `data/sectors.ts` as a single source of truth and stopped truncating the assessment sector picker.

## Phase 1A / v3 Review Changes Delivered

- Updated dataset metadata to edition `0.5 - May 2026` with a dataset last-reviewed date of `2026-05-02`.
- Added source-linked scope, threshold and penalty/enforcement notes for marquee EU records including CSRD, ESRS, EU Taxonomy, SFDR, CSDDD, CBAM, EUDR, ESPR, EU Batteries Regulation and EU Forced Labour Regulation.
- Added `transposedJurisdictionIds` to the regulation type so EU-level records can be relevant to Netherlands without inflating direct Netherlands map counts.
- Updated the choropleth count logic so country fill and visible counts use direct jurisdiction records rather than parent EU records.
- Kept jurisdiction profile panels broader by still showing linked and inherited exposure where useful.
- Removed generic threshold and penalty placeholder text from regulation detail pages.
- Added last-reviewed trust lines to regulation detail pages and drawers.
- Added `/changelog` as a public edition/update log.
- Added `/compare` for two-jurisdiction comparison using query parameters such as `/compare?a=EUU&b=GBR`.
- Added `/jurisdiction/[code]/brief` for printable/copyable jurisdiction briefs.
- Added a sector heatmap tab to `/briefing`.
- Added a copyable assessment shortlist on `/assessment`.
- Added a homepage "What's new" strip tied to the current edition.
- Added an About-page key trends section.
- Added a favicon and mobile map fallback list.
- Added `AGENTS.md` and `docs/` context files, including `docs/development-workflow.md`, so future agents know how to work safely.
- Updated `npm run build` to use `next build --webpack`, the verified stable build path for this MVP.

## Technical Notes

- No Stripe, Supabase, authentication, paid APIs, Mapbox, environment variables, database, scraping, cron jobs or runtime AI calls were added.
- The new map fetches `/world-110m/index.json` and same-origin Natural Earth geometry from the app's own `public/` directory.
- The country fill bucket is driven by direct record count in the active view: `0`, `1-2`, `3-6`, and `7+`.
- EU-level records highlight EU member-state polygons and keep a separate `EUU` overlay label for the supranational jurisdiction.
- California is shown as `USA-CA`, not `CA`, to avoid confusion with Canada.
- Parent or transposed exposure should be shown as linked/inherited context, not counted as direct national records on the map.
- Next.js default Turbopack builds may fail in the Codex sandbox when helper processes try to bind to a port. The project build script uses the webpack build path because it passed locally and is lower risk for this MVP.

## Validation

- `tsc --noEmit` passed locally using the bundled Node runtime.
- `next build --webpack` passed locally and generated the app routes, including `/changelog`, `/compare`, `/jurisdiction/[code]/brief` and `/regulations/[slug]`.
- New Etica routes to verify include `/compare?jurisdictions=EUU,GBR`, `/compare?ids=csrd,issb-s1-s2`, `/regulations/issb-s1-s2`, `/edition/0.5/regulations/csrd` and the ISSB redirects.
- `git diff --check` passed.
- Out-of-scope dependency/code scan found no Stripe, Supabase, Mapbox, payment, webhook or environment-variable usage.
- Local dev-server startup may be blocked by sandbox port-binding restrictions. Treat that as an environment limitation if TypeScript and production build pass.

## Known Tradeoffs

- Internal jurisdiction IDs were not migrated wholesale to ISO3 codes in this pass because that would be a risky cross-repository identifier migration. Canonical `code` fields now solve the visible UI problem and can support a later controlled migration.
- The map now uses real country polygons, but it is still a lightweight MVP choropleth rather than a full GIS product.
- Per-regulation detail routes now support populated `applicabilityScope` and `penalties` fields. Further threshold and penalty population remains a content-depth task for non-marquee records.
- `/compare` is currently a static/dynamic route driven by query parameters and server-rendered on demand. It is useful but intentionally simple.
- Jurisdiction briefs are copyable and printable, but not PDF-generating yet.

## Recommended Next Phase

Next useful improvements:

- horizontal timeline/swimlane with quarter precision
- CSV or JSON export of the static regulation database
- richer comparison fields for thresholds, assurance, taxonomy and transition plans
- better per-record maturity axis, such as mandatory in place, mandatory in progress, voluntary in place or ISSB-aligned in progress
- more source-reviewed threshold and penalty content for non-EU and non-marquee records
- source review queue for records marked `needs_review`, `date_uncertain` or `source_missing`

## Ongoing Agent Instruction

When future work changes product behavior, route structure, validation, data fields, taxonomy, legal wording or roadmap status, update the relevant context files in the same pass. The repo should become easier to continue after each iteration.
