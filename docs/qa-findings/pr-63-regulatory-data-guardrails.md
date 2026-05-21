# PR 63 QA Finding - Regulatory Data Guardrails

## Finding

The expert review recommended automated checks for premium-use gates, missing sources, high-impact review signals and definitive legal wording. The Atlas already had strong source-governance UI, but future seed-data edits could regress silently without a dedicated data check.

## Why It Matters

The product's trust depends on visible source links, confidence, caveats and legally cautious copy. As market coverage grows, manual review alone is not enough to catch common metadata and wording issues before a PR reaches Vercel.

## Resolution

- Added `tests/data-guardrails.spec.ts`.
- Added `npm run check:data`.
- Checks now cover minimum source-governance metadata, high-impact review signals, premium-use gate availability and banned definitive wording in seed and premium-pack copy.
- Kept the checks in the existing Playwright CI path so they run without a new dependency or backend service.

## Validation

- `npm run check:data`
- `npm run lint`
- `npm run build`
- `git diff --check`

## Product Guardrail

Automated checks help catch common trust-risk regressions. They do not certify legal accuracy, complete coverage, official translation, current regulatory status or entity-specific applicability.
