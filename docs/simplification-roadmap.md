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
| P1 | Value-chain lane cleanup | `/value-chain` | Six primary lanes, lane-specific evidence, and less repeated chip text. |
| P1 | Briefing scenario flow | `/briefing` | Scenario cards appear before outputs; no large default briefing is shown before a scenario is selected. |
| P1 | Plans simplification | `/plans` | Free Atlas and advisory-supported scan are primary; premium previews and future enterprise remain secondary. |
| P1 | Language toggle label | Header | Advanced in `0.5.63`: language selector now uses interface-language labelling and a localized caveat so users do not mistake translated chrome for official legal translation. |

## Next 30 Days

| Priority | Item | Why It Is Deferred |
|---|---|---|
| P2 | Shared disclaimer component family | Useful legal-design improvement, but broader replacement needs careful pass across copy/export/detail surfaces. |
| P2 | Route metadata classification | Helps sitemap/noindex/navigation governance, but should follow the first simplification pass. |
| P2 | Static advisory sample outputs | Strong commercial proof, but should not crowd the core homepage before the journey is calmer. |
| P2 | Print CSS improvements across briefs | Valuable for sharing, but current urgent trust issue was edition consistency. |
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
