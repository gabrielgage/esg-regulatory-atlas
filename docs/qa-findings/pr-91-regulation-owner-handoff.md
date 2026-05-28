# PR 91 QA Note - Regulation Owner Handoff

## Change

Added a regulation-detail owner handoff panel that connects a selected seed record to likely internal owner lanes, first actions, evidence focus and source-review prompts. The panel links to `/functions` and to a filtered regulation database view by business function.

## Why It Matters

The owner workbench introduced a useful planning surface, but regulation detail pages still required users to infer how a specific record should translate into internal action. The handoff panel closes that gap without adding backend infrastructure or expanding the homepage.

## Validation Added

- `tests/owner-handoff.spec.ts` checks that `/regulations/csrd` renders the owner handoff panel.
- The test verifies owner-lane copy, first actions, evidence focus, cautious planning language, the `/functions` handoff and a business-function database filter link.

## CI Finding And Resolution

The first remote Lighthouse build failed during TypeScript checking. Root cause: the new `MiniMetric` helper typed the icon prop as a generic React component with an `aria-hidden?: boolean` prop, while JSX passes `aria-hidden="true"` as the usual string attribute. The fix switched the prop to Lucide's `LucideIcon` type, matching the actual icon components used in the panel.

Prevention: when passing Lucide icons through reusable helpers, type the prop as `LucideIcon` instead of inventing a narrowed SVG prop shape. This keeps accessibility attributes aligned with React/Lucide typing and prevents build-only type failures.

## Legal And Product Caveat

Owner handoff panels are seed-data planning aids. They do not assign formal legal accountability, determine entity-specific applicability, verify sources or replace qualified legal/regulatory review.

## Guardrails

No Stripe, Supabase, authentication, database, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.
