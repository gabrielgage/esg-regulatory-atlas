# Etica ESG · Regulatory Atlas Handoff

## Current Phase

The app is now in a static Phase 1K launch-assets and commercial-funnel pass on top of the Phase 1A Etica credibility update, Phase 1B market coverage pass, Phase 1C workflow/translation/coverage-control pass, Phase 1D master content expansion, Phase 1E decision-support polish, Phase 1F commercial-validation surfaces, Phase 1G premium-pack/manual-conversion follow-up, Phase 1H premium-output/content-governance pass, Phase 1I visible-map/coverage-depth pass and Phase 1J decision-readiness pass. The goal remains deployability and legal caution, with added emphasis on turning commercial validation materials into reusable, caveated launch assets without adding payments, authentication, databases, analytics, production alerts or automation.

## Phase 1K Changes Delivered

- Updated dataset metadata and changelog to `0.5.11 - May 2026`.
- Added `/launch` as a public launch-resource workspace.
- Added `components/LaunchAssetLibrary.tsx` to render `data/launchAssets.ts` as copyable cards with caveats and draft-email actions.
- Added Header navigation for Launch.
- Linked Plans, Alerts, Advisory and Premium Roadmap CTAs into the launch workflow.
- Updated README, roadmap, product brief, legal safeguards, development workflow, product backlog and handoff context.

## Phase 1K Product Rationale

The Atlas now has free, premium-preview and advisory offer surfaces, but launch execution needs reusable copy. Phase 1K makes the launch assets visible and copyable so LinkedIn posts, email drafts and advisory scan language can be reused consistently without overclaiming that paid subscriptions, automated alerts or production monitoring are live.

## Phase 1J Changes Delivered

- Updated dataset metadata and changelog to `0.5.10 - May 2026`.
- Extended `ApplicabilityResult` with missing facts, next steps and suggested owner signals.
- Upgraded assessment result cards with suggested owner, missing fact, evidence, source-to-verify and next 30-day action fields.
- Expanded copied assessment shortlists with missing facts, next actions, evidence, source-to-verify and per-record caveats.
- Upgraded the regulation detail drawer with decision cards for thresholds, timing uncertainty, enforcement cues, related regimes and missing decision data.

## Phase 1J Product Rationale

The Atlas already identifies potentially relevant records, but launch demos need to answer the next practical questions: what facts are missing, who should own review, what should happen in the next 30 days and which source should be verified first. Phase 1J makes the output more useful for client triage while preserving cautious legal language and source-review caveats.

## Phase 1I Changes Delivered

- Updated dataset metadata and changelog to `0.5.9 - May 2026`.
- Made the local Natural Earth SVG country-outline map visible from tablet widths upward instead of hiding it until the large desktop breakpoint.
- Strengthened country borders, ocean/land contrast, selected-state styling and EU overlay cues.
- Added a clear geometry failure fallback while preserving jurisdiction navigation.
- Added `data/coverageTargets.ts` with deep-anchor, core-commercial and watch-expansion direct-record targets.
- Added `components/CoverageDepthPanel.tsx` and surfaced it on `/data-quality`.
- Added `data/marketDepthAdditions.ts` with source-linked seed records for under-covered markets.
- Added Playwright checks for visible country paths, tablet map size, jurisdiction selection, geometry fallback and coverage target completeness.

## Phase 1I Product Rationale

The map is the product's first trust surface. If users cannot see country outlines, the Atlas feels less credible even when the data is strong. The coverage-depth panel also makes weak markets visible instead of hiding them behind aggregate counts. This round improves client confidence while keeping the data legally cautious: new records are still seed intelligence and require source review before compliance reliance.

## Phase 1H Changes Delivered

- Updated dataset metadata and changelog to `0.5.8 - May 2026`.
- Added copy and print controls to `/premium-packs/[id]` so each pack can be shared as a caveated Markdown brief.
- Added `data/contentReview.ts` with Marquee 10 and Marquee 25 content-review items.
- Added `components/MarqueeReviewQueue.tsx` and surfaced it on `/data-quality`.
- Added launch-blocker flags, review statuses, premium-use mapping and source/status/threshold review questions for high-value regimes.
- Updated README, roadmap, product brief, product backlog, data methodology, legal safeguards, development workflow and agent context.

## Phase 1H Product Rationale

The commercial pages are only useful if a buyer or advisor can turn them into a conversation. Copyable premium pack briefs support direct outreach and advisory scoping without PDF generation. The Marquee review queue makes the content governance work visible, especially for records used in premium-pack examples, while avoiding any claim that the seed data is legally complete or verified for reliance.

## Phase 1G Changes Delivered

- Updated dataset metadata and changelog to `0.5.7 - May 2026`.
- Added `/premium-packs/[id]` as static sample pages for each premium market pack.
- Linked `/premium-roadmap` pack cards to the new premium-pack sample pages.
- Added `data/conversionTracking.ts` for manual CTA, mailto-subject and validation-loop tracking.
- Added `docs/conversion-tracking-plan.md` for no-dependency commercial interest tracking.
- Added manual validation loop signals to `/plans`.
- Added advisory next-step language to copied jurisdiction briefs and client planning summaries.
- Updated README, roadmap, product brief, product backlog, data methodology, legal safeguards, development workflow and agent context.

## Phase 1G Product Rationale

Phase 1F made the offer architecture visible. Phase 1G makes that offer architecture more concrete and more measurable: users can inspect a specific premium pack before asking for it, and Etica can track which CTAs and subject lines generate interest without introducing analytics, CRM sync, accounts, billing or email automation too early.

## Phase 1F Changes Delivered

- Updated dataset metadata and changelog to `0.5.6 - May 2026`.
- Added static commercial data files:
  - `data/commercialOffers.ts`
  - `data/alertDigests.ts`
  - `data/premiumPacks.ts`
  - `data/launchAssets.ts`
- Added `/plans` for Free Atlas, Premium Intelligence, Advisory Atlas and Enterprise/API Future positioning.
- Added `/alerts` with static weekly/monthly alert previews, watchlist concepts, source-quality legend and request-access CTA.
- Added `/advisory` with manual advisory service packages: exposure scan, custom watchlist, portfolio/supplier map, board/client briefing and market-pack support.
- Rebuilt `/premium-roadmap` around concrete premium pack previews, alert roadmap, advisory-supported pack delivery and future enterprise/API guardrails.
- Added `components/CommercialCTA.tsx` and surfaced commercial CTAs on homepage, assessment, regulation details, briefing/premium surfaces and existing market briefing CTAs.
- Added homepage commercial strip for Free Atlas, Alerts Preview and Advisory Scans.
- Updated header navigation to include Plans, Alerts and Advisory.
- Upgraded regulation detail pages and drawers with decision cards for what the record is, who may be affected, evidence likely needed and suggested internal owners.
- Added source-trust and coverage-tier explainers to Data Quality and Methodology.
- Added `docs/feature-request-tracking.md` and `docs/notion-update-plan.md`.
- Updated README, roadmap, product brief, product backlog, data methodology, legal safeguards, development workflow and agent context.

## Phase 1F Product Rationale

The product needed to become commercially legible before adding any SaaS infrastructure. The chosen strategy keeps the Free Atlas public as the trust surface, validates Premium Intelligence through static alert and market-pack previews, and makes Advisory Atlas the fastest monetization path through manual exposure scans and briefings. This avoids the wrong early build: payments, accounts, production email alerts, scraping and databases before demand and governance are validated.

## Phase 1E Changes Delivered

- Updated dataset metadata and changelog to `0.5.5 - May 2026`.
- Improved `lib/applicability.ts` so assessment scoring considers legal force, core display tier, high-impact classification, client relevance tags, supplier exposure and investor/customer-driven records.
- Extended assessment results with review priority, evidence needed, functions involved, source to verify and source-quality notes.
- Upgraded `/assessment` result cards and copied shortlists so each recommendation explains why it appears, what triggered it, what evidence to start with and which source to verify.
- Converted `/timeline` into a quarter-level milestone view covering consultation deadlines, effective dates, first reporting years, first report due dates and Atlas review dates.
- Updated timeline year filtering so it matches any milestone year, not only `firstReportingYear`.
- Upgraded `/data-quality` with priority-source metrics, confidence checks and review-queue scoring reasons.
- Improved `/briefing` priority cards and copied client summaries with first moves, evidence packages, functions, source coverage, legal force and client relevance.
- Enriched `/jurisdiction/[code]/brief` with source-backed counts, status/metadata badges, 30-day readiness starters, watch items, evidence packages, functions and Etica market briefing CTA.
- Added evidence summaries and review-flag counts to the map-side jurisdiction panel.

## Phase 1E Product Rationale

The previous product had strong coverage breadth and a more credible data model, but a client still needed help translating records into a practical first conversation. Phase 1E focuses on the moments where users ask:

- Why is this regulation on my shortlist?
- What facts or evidence do I need next?
- Which source should I verify before relying on it?
- What is time-sensitive?
- Which records need research review before client use?
- What should a 30-day readiness starter look like for a jurisdiction?

The chosen implementation keeps the MVP static and Vercel-safe while making the assessment, timeline, data-quality and briefing surfaces act more like a regulatory advisory workspace.

## Phase 1D Changes Delivered

- Updated dataset metadata and changelog to `0.5.4 - May 2026`.
- Added master-pack metadata fields to `types/regulation.ts`: `recordType`, `legalForce`, `displayTier`, `atlasGranularity`, `parentRecordId`, `aliases`, `sourceSystem`, `sourceConfidence`, `lastVerified`, `childItems`, `clientRelevanceCategory`, `marketMaturityScore` and `monetizationTier`.
- Added `data/masterUpdateAdditions.ts` and imported it through `data/seed.ts`.
- Added condensed EU financial-services parent records for banking prudential ESG risk, insurance Solvency/ORSA ESG risk, MiFID II/IDD sustainability preferences, AIFMD/UCITS ESG risk, ESG benchmarks, EuGBS, ESG ratings, ESAP, EU ETS and EU Nature Restoration.
- Added UK Modern Slavery Act and a condensed France/Germany/Norway national supply-chain due-diligence cluster.
- Added APAC/ISSB market records for South Korea, Taiwan, New Zealand, Malaysia, Indonesia, Thailand and Philippines.
- Added South Africa as an Africa anchor market through JSE sustainability guidance and green finance taxonomy context.
- Added voluntary and investor/customer-driven framework records for CDP, SBTi, PCAF, PRI, ICMA labelled finance principles, GRESB, IFC/Equator/World Bank safeguards and ISO environmental/GHG standards.
- Added jurisdiction tiles for Hong Kong, South Korea, Taiwan, New Zealand, Malaysia, Indonesia, Thailand, Philippines, France, Germany, Norway and South Africa.
- Enriched existing parent records such as CSRD, ESRS, SFDR, EU Taxonomy, CSDDD, EUDR, EU Batteries, EU Forced Labour, GRI and ISSB with aliases, child items, source-system and client-relevance metadata.
- Linked the existing Hong Kong climate record to the new Hong Kong jurisdiction tile instead of leaving it assigned to `int`.
- Added record type, legal force and client relevance filters in the advanced filter groups.
- Added `components/RecordMetaBadges.tsx` and surfaced metadata badges in the regulation table, jurisdiction panel, regulation detail drawer and per-regulation pages.
- Added source-of-truth governance language to `/data-quality` explaining source hierarchy, review cadence and condensation rules.
- Added `components/MarketBriefingCTA.tsx` and surfaced it on `/briefing` and in jurisdiction panels.
- Added `/premium-roadmap` as a static commercial roadmap page for future market packs, sector packs, portfolio scans, alerts and client workspaces without adding Stripe, auth, Supabase, paid APIs, databases, scraping, cron or required environment variables.
- Updated README, roadmap, data methodology, regulatory taxonomy and product backlog context files so future agents inherit the master-pack direction.

## Phase 1D Product Rationale

The master update pack correctly identified that the Atlas should become a client decision system, not a catalogue of thousands of disconnected standards. The chosen MVP-safe implementation focuses on the highest-leverage static upgrades:

- richer metadata so users can distinguish legal obligations from standards, guidance, voluntary frameworks and market expectations
- condensed parent records with aliases and child details so frameworks remain searchable without overwhelming the map
- stronger market coverage where the current product was weakest: EU financial services and APAC/ISSB adoption
- voluntary frameworks that matter commercially because investors, lenders, customers and procurement teams often drive them
- lead-generation CTAs and a premium roadmap that prepare for monetization without adding payment or account complexity

## Phase 1C Changes Delivered

- Defaulted first-time visitors to light mode while preserving explicit saved dark-mode preferences.
- Improved dark-mode contrast for colored badges, warning/disclaimer text, form controls, rings, borders and hover states.
- Added `docs/product-improvement-backlog.md` with 36 PM/ESG specialist improvements prioritized across three waves.
- Added map interpretation guidance that separates direct seed record volume from legal applicability.
- Updated dataset metadata and changelog to `0.5.3 - May 2026`.
- Added GitHub Actions CI for typecheck and production build validation.
- Added Playwright smoke tests for the map workspace, language toggle, regulation detail route and launch-critical pages.
- Added Lighthouse CI for key public routes with warning-level launch thresholds.
- Added a pull request template requiring Vercel preview review and explicit MVP guardrail checks.
- Added `data/phase1cCoverage.ts` and imported it through `data/seed.ts`, bringing the static seed dataset to 80+ source-linked records.
- Expanded translations in `lib/i18n.ts` and applied them to filters, table controls, map guidance, status labels, confidence labels and data-quality labels.
- Strengthened `components/WorldChoropleth.tsx` with an explicit country-border overlay so country outlines are clearer.
- Added a `0.5.2 - May 2026` changelog entry for workflow checks, expanded translations, regulation tracker workflow and Phase 1C coverage.
- Created a workbook-backed regulation tracker process so website data can be reviewed as a structured coverage inventory.

## CI Incident Resolved After Phase 1C

On 2026-05-02, PR #11 showed a successful Vercel deployment but two failing GitHub checks: `CI / Browser smoke tests` and `Lighthouse / Lighthouse CI`.

Root causes:

- The CSRD smoke test asserted the wrong heading. The regulation detail page uses `CSRD` as the H1 and shows `Corporate Sustainability Reporting Directive` as supporting title text.
- Lighthouse used the default `lighthouse:recommended` assertion preset, which made default audit warnings act as hard failures.

Resolution:

- Updated `tests/smoke.spec.ts` to assert the actual H1 plus scoped supporting title text.
- Updated `.lighthouserc.json` to remove the recommended preset and keep explicit category thresholds as warning-level launch signals.
- Added `docs/issue-resolution-log.md` and updated workflow docs so future agents document root cause, fix and prevention rules for every bug or failed check.

Verification:

- GitHub `CI` passed after the smoke test fix.
- GitHub `Lighthouse` passed after the Lighthouse config fix.
- Vercel deployment was already successful; the issue was in quality-check configuration and test assumptions, not the app deployment.

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
- Theme behavior now defaults first-time visitors to light mode. The saved `etica-theme` preference is still respected after a user explicitly toggles light or dark mode.
- The new map fetches `/world-110m/index.json` and same-origin Natural Earth geometry from the app's own `public/` directory.
- The country fill bucket is driven by direct record count in the active view: `0`, `1-2`, `3-6`, and `7+`.
- EU-level records highlight EU member-state polygons and keep a separate `EUU` overlay label for the supranational jurisdiction.
- California is shown as `USA-CA`, not `CA`, to avoid confusion with Canada.
- Parent or transposed exposure should be shown as linked/inherited context, not counted as direct national records on the map.
- Next.js default Turbopack builds may fail in the Codex sandbox when helper processes try to bind to a port. The project build script uses the webpack build path because it passed locally and is lower risk for this MVP.

## Validation

- Phase 1K validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1K validation: `git diff --check` passed.
- Phase 1K validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1K out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM plus the existing Playwright `process.env.CI` check and a false-positive Public Safety Canada URL; no implementation code or dependencies were added for those items.
- Phase 1K legal-risk wording scan found only banned phrases inside "do not use" guidance, disclaimers and intentional coverage caveats.
- Phase 1K Notion update: Launch Tasks LAUNCH-041 through LAUNCH-043 were created and ADR-022 was added to the Decisions Log.
- Phase 1J validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1J validation: `git diff --check` passed.
- Phase 1J validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1J out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM plus the existing Playwright `process.env.CI` check; no implementation code or dependencies were added for those items.
- Phase 1J legal-risk wording scan found only banned phrases inside "do not use" guidance plus intentional coverage caveats that tracked coverage is not complete global coverage.
- Phase 1I validation: `node node_modules/typescript/bin/tsc --noEmit` passed locally.
- Phase 1I validation: `git diff --check` passed.
- Phase 1I validation: static coverage target check passed for 27 coverage targets using `node -r sucrase/register`; all tracked target markets meet the direct-record target configured in `data/coverageTargets.ts`.
- Phase 1I validation: static map geometry check passed; local Natural Earth data currently exposes 37 country features and 37 tracked labels from `public/world-110m`.
- Phase 1I validation: `next build --webpack` was blocked in the Codex desktop sandbox by the known macOS SWC native binary code-signature issue before app compilation. This is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative build signal.
- Phase 1I validation: local Playwright execution could not run because this sandbox has no `npm` executable and the current local `node_modules` does not include `@playwright/test`. The Playwright map tests were added and should run in GitHub Actions after dependency installation.
- Phase 1I validation: local `next dev` startup was blocked by sandbox port-binding permissions (`listen EPERM 0.0.0.0:3000`), so browser smoke testing should run in CI, Vercel preview or a normal local terminal.
- Phase 1I out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM plus the existing Playwright `process.env.CI` check; no implementation code or dependencies were added for those items.
- Phase 1I legal-risk wording scan found only banned phrases inside "do not use" guidance plus intentional coverage caveats that tracked coverage is not complete global coverage.
- Phase 1I Notion update: Launch Command Center includes the visible-map and coverage-depth note; Launch Tasks LAUNCH-034 through LAUNCH-037 were created; ADR-020 was added to Decisions Log; QA & Review Findings now records the map breakpoint defect.
- Phase 1H validation: `tsc --noEmit` passed locally using the bundled Node runtime.
- Phase 1H validation: `git diff --check` passed.
- Phase 1H validation: `next build --webpack` was blocked in the Codex desktop sandbox by a macOS code-signature failure while loading `@next/swc-darwin-arm64`. This happened before app compilation and is documented in `docs/issue-resolution-log.md`; GitHub Actions or Vercel should provide the authoritative Next.js build signal.
- Phase 1H out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM plus the existing Playwright `process.env.CI` check; no implementation code or dependencies were added for those items.
- Phase 1H legal-risk wording scan found only banned phrases inside "do not use" guidance plus the intentional Data Quality caveat that tracked coverage is not complete global coverage.
- Phase 1H Notion update: Launch Command Center now includes the premium output and Marquee review governance note; Launch Tasks LAUNCH-030 through LAUNCH-033 were created; ADR-019 was added to Decisions Log; Launch Assets were seeded for the premium pack brief template and Marquee review queue note.
- Phase 1G validation: `next build --webpack` passed locally using the bundled Node runtime and generated 264 static pages, including the five `/premium-packs/[id]` sample pages.
- Phase 1G validation: `tsc --noEmit` passed locally using the bundled Node runtime after the production build completed.
- Phase 1G validation: `git diff --check` passed.
- Phase 1G out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron, environment variables, analytics, cookies and CRM plus the existing Playwright `process.env.CI` check; no implementation code or dependencies were added for those items.
- Phase 1G Notion update: Launch Command Center now includes the premium pack/manual conversion follow-up note; Launch Tasks LAUNCH-026 through LAUNCH-029 were created; ADR-018 was added to Decisions Log; Launch Assets were seeded for premium pack sample pages and manual conversion tracking.
- Phase 1F validation: `next build --webpack` passed locally using the bundled Node runtime and generated 259 static pages, including `/plans`, `/alerts`, `/advisory`, `/premium-roadmap`, `/assessment`, `/timeline`, `/briefing`, `/data-quality`, expanded `/regulations/[slug]` pages and edition snapshot pages.
- Phase 1F validation: `tsc --noEmit` passed locally using the bundled Node runtime after the production build completed.
- Phase 1F validation: `git diff --check` passed.
- Phase 1F out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron and environment variables plus the existing Playwright `process.env.CI` check; no implementation code or dependencies were added for those items.
- Phase 1F local route smoke testing with `next start` was blocked by sandbox port-binding permissions (`listen EPERM 127.0.0.1:3000`). This is documented in `docs/issue-resolution-log.md`; browser smoke and Lighthouse should run in GitHub Actions, Vercel preview or a local terminal with normal port permissions.
- Phase 1F Notion update: Launch Command Center now includes the May Commercialization Sprint note; Launch Tasks LAUNCH-001 through LAUNCH-025 were created; ADR-014 through ADR-017 were added to Decisions Log; Launch Assets were seeded; QA & Review Findings records the sandbox port-binding limitation.
- Phase 1E validation: `tsc --noEmit` passed locally using the bundled Node runtime.
- Phase 1E validation: `next build --webpack` passed locally and generated 256 static pages, including `/assessment`, `/timeline`, `/briefing`, `/data-quality`, `/jurisdiction/[code]/brief`, expanded `/regulations/[slug]` pages and edition snapshot pages.
- Phase 1E validation: `git diff --check` passed.
- Phase 1E out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron and environment variables plus the existing Playwright `process.env.CI` check; no implementation code or dependencies were added for those items.
- Phase 1E local route smoke testing with `next start` was blocked by sandbox port-binding permissions (`listen EPERM 0.0.0.0:3001`). This is an environment limitation; production build validation passed.
- Phase 1D validation: `tsc --noEmit` passed locally using the bundled Node runtime.
- Phase 1D validation: `next build --webpack` passed locally and generated 256 static pages, including `/premium-roadmap`, expanded `/regulations/[slug]` pages and expanded `/jurisdiction/[code]/brief` pages.
- Phase 1D validation: `git diff --check` passed.
- Phase 1D out-of-scope scan found only guardrail/documentation mentions of Stripe, Supabase, Mapbox, payments, webhooks, scraping, cron and environment variables; no implementation code or dependencies were added for those items.
- `npm audit --omit=dev` could not be run in the Codex sandbox because the bundled runtime exposes `node` but not an `npm` executable. Re-run with a local Node/npm installation or in CI if audit evidence is required.
- `tsc --noEmit` passed locally using the bundled Node runtime.
- `next build --webpack` passed locally and generated the app routes, including `/changelog`, `/compare`, `/jurisdiction/[code]/brief` and `/regulations/[slug]`.
- New Etica routes to verify include `/compare?jurisdictions=EUU,GBR`, `/compare?ids=csrd,issb-s1-s2`, `/regulations/issb-s1-s2`, `/edition/0.5/regulations/csrd` and the ISSB redirects.
- `git diff --check` passed.
- Out-of-scope dependency/code scan found no Stripe, Supabase, Mapbox, payment, webhook or environment-variable usage.
- PR #11 CI incident is documented in `docs/issue-resolution-log.md`; future bug fixes should update that log.
- Dark-mode default and contrast issue is documented in `docs/issue-resolution-log.md`; future visual defects should be treated as bugs with root-cause notes.
- Local dev-server startup may be blocked by sandbox port-binding restrictions. Treat that as an environment limitation if TypeScript and production build pass.

## Known Tradeoffs

- Internal jurisdiction IDs were not migrated wholesale to ISO3 codes in this pass because that would be a risky cross-repository identifier migration. Canonical `code` fields now solve the visible UI problem and can support a later controlled migration.
- The map now uses real country polygons, but it is still a lightweight MVP choropleth rather than a full GIS product.
- Per-regulation detail routes now support populated `applicabilityScope` and `penalties` fields. Further threshold and penalty population remains a content-depth task for non-marquee records.
- `/compare` is currently a static/dynamic route driven by query parameters and server-rendered on demand. It is useful but intentionally simple.
- Jurisdiction briefs are copyable and printable, but not PDF-generating yet.

## Recommended Next Phase

Next useful improvements:

- use `docs/product-improvement-backlog.md` as the active 36-item PM/ESG specialist backlog
- clearer map legend and layer explanation
- coverage confidence view separating record volume from source confidence and review risk
- persona-specific quick filters and sector starting points
- stronger evidence-needed summaries in briefing and regulation detail surfaces
- horizontal timeline/swimlane with quarter precision
- CSV or JSON export of the static regulation database
- richer comparison fields for thresholds, assurance, taxonomy and transition plans
- better per-record maturity axis, such as mandatory in place, mandatory in progress, voluntary in place or ISSB-aligned in progress
- more source-reviewed threshold and penalty content for non-EU and non-marquee records
- source review queue for records marked `needs_review`, `date_uncertain` or `source_missing`

## Ongoing Agent Instruction

When future work changes product behavior, route structure, validation, data fields, taxonomy, legal wording or roadmap status, update the relevant context files in the same pass. The repo should become easier to continue after each iteration.

When future work fixes a bug, failed check or platform issue, always document the symptom, root cause, fix and prevention rule in `docs/issue-resolution-log.md`.
