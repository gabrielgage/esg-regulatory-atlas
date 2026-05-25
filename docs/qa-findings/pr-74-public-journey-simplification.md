# PR 74 QA Finding - Public Journey Simplification

Date: 2026-05-25

## Finding

The Atlas had become visibly credible but cognitively heavy. The public experience exposed map, regulation database, sectors, plans, governance, alerts, launch assets and advisory routes at nearly the same level, which made first-time users work too hard before deciding where to start.

## Root Cause

Feature delivery outpaced information architecture consolidation. Each new capability was useful in isolation, but the header and homepage began reflecting the internal product structure instead of the user's first question.

## Resolution

- Reduced primary navigation to Start, Assessment, Markets, Regulations, Advisory and grouped More.
- Moved sectors, timeline, briefing, value-chain, thresholds, methodology, data quality, glossary, changelog, plans, alerts, premium roadmap and About into grouped secondary navigation.
- Reframed the homepage hero around assessment, market browsing and regulation search.
- Updated the Start panel around assessment, market/regulation exploration and advisory scan paths.
- Replaced public “Static MVP CTA only” copy with customer-facing advisory-scan wording.
- Kept `/launch` noindex and labelled it as an internal launch workspace.
- Restored newest release ordering on the public changelog so the current edition appears before older review-pack entries.
- Added smoke coverage for hidden Launch navigation, noindex metadata and current printable brief edition.
- Corrected stale smoke-test expectations after CI caught references to the old Compare-options CTA and header wordmark-as-heading pattern.

## Prevention Rule

Future routes should be classified before appearing in navigation:

- Core discovery: Start, Assessment, Markets, Regulations, Advisory
- Planning support: sectors, timeline, briefing, value chain, thresholds
- Trust support: methodology, data quality, glossary, changelog
- Commercial preview: plans, alerts, premium roadmap
- Internal/noindex: launch resources and operator workspaces

Do not add every new route to the primary header. The homepage should keep one clear user decision before showing expert filters, governance dashboards or launch assets.

When navigation or homepage CTAs change, update both core smoke coverage and language-toggle smoke coverage in the same pass. Header brand text is product chrome, not a page heading; tests should anchor on the route H1 or stable test markers.

## Legal And Product Guardrail

This simplification pass did not change regulatory data, legal interpretation or applicability logic. It keeps the site as static seed regulatory intelligence for orientation and planning, not legal advice, official source verification or a compliance determination.
