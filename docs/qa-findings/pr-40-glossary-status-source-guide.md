# PR 40 - Glossary Status And Source Guide

## Finding

The public Atlas now includes a glossary, but users still need clearer interpretation support for status labels and data-quality signals before using records in assessments, market profiles or briefings. Terms such as `in force`, `first reporting`, `transition`, `voluntary`, `needs review`, `date uncertain` and `source missing` affect planning decisions and legal-risk posture.

## Resolution

- Added `data/glossaryGuides.ts` with structured regulatory-status and source-confidence guide entries.
- Added `components/GlossaryGuide.tsx` to render the guide as a calm glossary section instead of adding another top-level workspace.
- Added the guide to `/glossary` above the existing concept-area term cards.
- Extended glossary smoke coverage to verify status, source-confidence and legal-caution copy render.

## Product Rationale

This improves the Atlas wedge around source-linked, legally cautious regulatory intelligence. Users can interpret the lifecycle and confidence labels without mistaking them for legal determinations. It also supports consultants and internal teams who need a shared vocabulary before running an assessment or producing a client briefing.

## Legal And Data Guardrails

- Status labels are described as planning signals, not applicability conclusions.
- Source-confidence labels explicitly preserve source-review and qualified-advisor caveats.
- Proposed and consultation-stage items are not described as binding obligations.
- No regulatory record status, threshold, source URL, scoring logic or applicability logic changed.
- No Stripe, Supabase, authentication, database, paid API, Mapbox, scraping, cron, production email backend, AI summary or required environment variable was added.

## Follow-Up

Future product passes can link status badges and source-quality badges directly to this glossary guide or add contextual tooltips, but that should be done carefully to avoid cluttering dense data tables.
