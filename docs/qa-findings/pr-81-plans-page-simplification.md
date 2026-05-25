# PR 81 - Plans Page Simplification

Date: 2026-05-25  
Area: Commercial validation UX, advisory funnel, legal-safety copy

## Finding

The plans page explained the free, premium, advisory and enterprise model, but it showed too many commercial-validation concepts at once. A first-time visitor could read the page as a paid SaaS pricing page even though the MVP intentionally has no checkout, accounts, billing, gated content or automated alerts.

## Resolution

- Reworked `/plans` around two current paths: Free Atlas and Advisory Atlas.
- Moved Premium Intelligence and Enterprise/API Future into secondary validation cards.
- Collapsed the full comparison table behind a details disclosure.
- Removed the first-load manual-validation card grid while preserving manual request guidance.
- Strengthened visible caveats that premium and enterprise paths are not live SaaS infrastructure.

## Prevention Rule

Commercial validation surfaces should not compete with the live product journey. On `/plans`, keep the free Atlas and manual advisory scan path primary until checkout, accounts, billing, production alerts or gated premium content are explicitly approved.

## Legal/Trust Note

The plans page remains a static orientation and request-access surface. It does not provide legal advice, definitive applicability determinations, complete coverage, paid subscriptions, automated alerts or production monitoring.
