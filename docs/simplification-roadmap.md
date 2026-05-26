# Simplification Roadmap - 2026-05-25

Source: `ETICA_REGULATORY_ATLAS_SIMPLIFICATION_CODEX_BRIEF_2026-05-25.md`

Purpose: reduce public cognitive load while preserving source-linked regulatory depth, legal safeguards and static deployment constraints.

## Product Principle

The Atlas should answer one user question at a time:

1. What may matter for my organization?
2. Which market or regulation should I inspect?
3. What facts, sources and evidence should I verify next?
4. When should I request an advisory-supported scan?

The public site should not expose every internal launch, governance, commercial validation and product-management artifact as an equal first-level destination.

## Urgent Items For 2026-05-25

Status: implemented in `0.5.58 - May 2026`.

| Priority | Item | Why It Matters | Implementation |
|---|---|---|---|
| P0 | Simplify primary navigation | First-time users were seeing too many choices before understanding the product journey. | Primary nav reduced to Start, Assessment, Markets, Regulations, Advisory and grouped More. |
| P0 | Reframe homepage first screen | The previous hero pointed to changelog/plans instead of the core user jobs. | Hero now leads with assessment, market browsing and regulation search. |
| P0 | Make three user paths obvious | Users should not need to understand the full platform structure before starting. | Start panel now emphasizes assessment, market/regulation exploration and advisory scan. |
| P0 | Remove public MVP/operator wording from core CTAs | “Static MVP CTA only” made the product feel unfinished. | Market briefing CTA now uses advisory-scan language and keeps infrastructure caveats out of the core pitch. |
| P0 | Keep `/launch` internal | Launch resources are useful but should not feel like a customer route. | `/launch` remains noindex and is labelled as an internal launch workspace. |
| P0 | Guard current edition trust | Stale edition metadata undermines a regulatory intelligence product. | Edition bumped to `0.5.58`; smoke coverage checks printable brief edition and old current-page strings. |

## Next 7 Days

| Priority | Item | Route / Area | Acceptance Criteria |
|---|---|---|---|
| P1 | Assessment result hierarchy | `/assessment` | Advanced in `0.5.59`: results now lead with top records, relevance grouping, facts to confirm, first 30-day actions and advisory scan CTA before detailed trigger logic. |
| P1 | Regulations search-first layout | `/regulations` | Advanced in `0.5.60`: the page now leads with search, jurisdiction, topic, sector, company type and reporting year before the result table; role lenses, compare, label help, share and export controls are secondary. |
| P1 | Advisory scan module | Home, markets, regulation detail, assessment | Advanced in `0.5.61`: one reusable advisory CTA now explains what to send, what Etica returns and the legal caveat across market, assessment and regulation-detail surfaces. |
| P1 | Sector page simplification | `/sectors` | Advanced in `0.5.62`: replaced aggregate metrics and dense cards with a searchable sector finder, business-context groups, practical trigger summaries and review-first record cues. |
| P1 | Value-chain lane cleanup | `/value-chain` | Advanced in `0.5.64`: page now uses six primary business-exposure lanes with lane-specific start questions, evidence prompts, first actions and suggested owners. |
| P1 | Briefing scenario flow | `/briefing` | Advanced in `0.5.45`: scenario cards appear before outputs; no large default briefing is shown before a scenario is selected. |
| P1 | Plans simplification | `/plans` | Advanced in `0.5.65`: Free Atlas and Advisory Atlas are the primary live paths; premium previews and future enterprise are secondary validation cards, and the comparison table is collapsed by default. |
| P1 | Language toggle label | Header | Advanced in `0.5.63`: language selector now uses interface-language labelling and a localized caveat so users do not mistake translated chrome for official legal translation. |

## Next 30 Days

| Priority | Item | Why It Is Deferred |
|---|---|---|
| P2 | Shared disclaimer component family | Advanced in `0.5.66`: `LEGAL_NOTICES` and `LegalNotice` now support recurring banner, footer, copy-output and manual-request caveats. |
| P2 | Route metadata classification | Advanced in `0.5.67`: `data/routeRegistry.ts` now classifies public, internal, contextual and dynamic routes and feeds the header navigation. |
| P2 | Static advisory sample outputs | Advanced in `0.5.68`: `/advisory` now includes a copyable sample supplier/exporter exposure scan with caveats, source-review notes and first actions. |
| P2 | Print CSS improvements across briefs | Advanced in `0.5.69`: global print output now uses live dataset metadata, A4 margins, cleaner card printing and a guardrail against stale hardcoded edition strings. |
| P2 | Glossary term linking | Good comprehension feature, lower priority than reducing initial cognitive load. |
| P2 | High-impact source review sprint | Requires official/regulator source research and should be handled as a content-governance sprint. |

## Deferred Infrastructure

Do not implement in this simplification sprint:

- Stripe, checkout, subscriptions or payment webhooks
- Supabase, external database, accounts or authentication
- Automated alerts, email backend, scraping, cron jobs or monitoring pipelines
- Paid map services, Mapbox or runtime geospatial APIs
- AI legal summaries or AI applicability determinations

If a user-facing concept appears to require infrastructure, keep it as a static/manual preview or move it to the roadmap.

## QA Rules Added To The Working Standard

- Primary navigation should stay focused on the main discovery path.
- `/launch` should remain noindex and absent from public navigation.
- Homepage copy should avoid MVP, operator and commercial-validation jargon.
- Printable briefs and copied outputs should use central edition metadata.
- `/regulations` should stay search-first: put search and primary filters before role lenses, compare, glossary help, share and export controls.
- Advanced filters should stay collapsed by default on public discovery surfaces.
- Advisory scan should be the dominant manual commercial next step until demand is validated, and shared advisory CTAs should use `AdvisoryScanCTA` unless a route needs a genuinely different commercial motion.
- `/value-chain` should stay lane-first: use supplier, trade/import, product/claims, portfolio/finance, operations/governance and customer-pressure lanes before exposing raw tag-level detail.
- `/plans` should stay current-path first: Free Atlas and advisory scan are visible primary choices; premium, enterprise and validation mechanics should remain secondary until infrastructure is explicitly approved.
- Recurring disclaimer and caveat blocks should use `data/legalNotices.ts` and `components/LegalNotice.tsx` unless a route needs genuinely specific wording.
- New routes should be added to `data/routeRegistry.ts` with placement, visibility, robots and user-decision metadata before they are linked from navigation.
- Advisory sample outputs belong on `/advisory`, premium pack pages or route-specific CTAs, not the homepage, unless they directly help the user choose a next step.
