# PR 45 Timeline Glossary Help

Date: 2026-05-14

## Finding

The timeline page is a high-risk interpretation surface because users may treat effective dates, first reporting years or first report due dates as definitive compliance deadlines. The glossary and contextual label-help rollout already covered regulation, data-quality and assessment surfaces, but the timeline needed the same cautionary handoff.

## Product Reasoning

Date-sensitive planning is one of the strongest Atlas use cases, but it also needs careful caveats. A compact glossary helper near the top of `/timeline` keeps the page calm while reminding users that date labels are planning signals and should be confirmed against primary sources and entity-specific facts.

## Resolution

- Added `GlossaryHelpCard` to `/timeline` after the short disclaimer.
- Wrote timeline-specific copy for effective dates, first reporting years, first report due dates and Atlas review dates.
- Added Playwright smoke coverage for the timeline glossary handoff.
- Updated release metadata, changelog supplement, README and current release context to `0.5.29 - May 2026`.

## Guardrails

- No regulation records, dates, source links, status values, thresholds, scoring rules or applicability logic changed.
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries, external database or required environment variables were added.
- Timeline dates remain seed intelligence and planning prompts, not definitive compliance deadlines.

## Future Note

If the timeline grows more complex, consider a dedicated date-quality badge for `source-reviewed`, `date-uncertain`, `estimated`, and `monitor-only` milestones. Keep that as static metadata until a formal review workflow is approved.
