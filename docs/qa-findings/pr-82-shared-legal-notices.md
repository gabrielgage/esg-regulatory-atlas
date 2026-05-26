# PR 82 QA Finding - Shared Legal Notice Components

## Finding

Recurring caveat text had started to appear in separate components for banners, footer disclaimers, copied-output notes and manual request panels. The wording was broadly safe, but repeated one-off text increases the risk that future pages drift away from the core legal boundaries.

## Risk

If each route writes its own caveat, future updates can accidentally imply legal advice, definitive applicability, production alerts, paid accounts or source verification that the static MVP does not provide.

## Resolution

- Added `data/legalNotices.ts` as the shared source for recurring caveat text.
- Added `components/LegalNotice.tsx` for consistent legal-notice presentation in light and dark mode.
- Updated the disclaimer banner, footer disclaimer, copied-output note and manual request panel to use the shared system.
- Added a data guardrail test for the canonical legal-notice wording.

## Prevention Rule

Use `LEGAL_NOTICES` and `LegalNotice` for recurring caveats unless a page needs genuinely route-specific wording. New caveat text should preserve the core boundaries: orientation only, no legal/tax/investment/assurance advice, source validation required, and no live paid infrastructure or production alerting unless explicitly approved and implemented.
