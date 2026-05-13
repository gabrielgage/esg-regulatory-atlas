# PR 44 Assessment Glossary Help

Date: 2026-05-13

## Finding

The assessment page is one of the highest-risk interpretation surfaces because it produces an indicative shortlist. Recent glossary work covered the regulation database, Data Quality and regulation detail pages, but assessment users still needed the same reminder before reading category, confidence and data-quality labels.

## Product Reasoning

Assessment outputs are useful only when users understand them as triage prompts. A lightweight glossary helper near the top of `/assessment` gives users a clear path to interpret category and label language without adding another section, database, authentication or legal-advice workflow.

## Resolution

- Added `GlossaryHelpCard` to `/assessment` after the short disclaimer.
- Wrote page-specific copy explaining that assessment categories, confidence labels and data-quality signals are triage prompts.
- Added Playwright smoke coverage for the assessment glossary handoff.
- Updated release metadata, changelog supplement, README and current release context to `0.5.28 - May 2026`.

## Guardrails

- No regulation records, source links, status values, thresholds, scoring rules or applicability logic changed.
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries, external database or required environment variables were added.
- The page continues to state that applicability depends on thresholds, entity facts and legal interpretation.

## Future Note

The next useful extension is to connect glossary terms directly inside copied assessment summaries or result cards, but only if it does not make the results visually busy or imply legal certainty.
