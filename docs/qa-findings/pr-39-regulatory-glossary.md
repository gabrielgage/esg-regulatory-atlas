# PR 39 - Regulatory Glossary

## Finding

The Atlas has grown into a multi-surface product with map, assessment, data-quality, briefing, market and sector pages. New users may not share the same understanding of terms such as double materiality, legal force, value chain, taxonomy alignment, assurance, financed emissions or seed intelligence. Without a shared vocabulary, users can misread orientation signals as legal conclusions or confuse reporting concepts with operational obligations.

## Resolution

- Added a static `/glossary` route with plain-language ESG regulatory terms grouped by concept area.
- Added related links from terms into Atlas workflows such as regulations, assessment, timeline, sectors, methodology and data quality.
- Added the glossary to the secondary More navigation with language-aware menu labels.
- Added smoke coverage to verify the route, key terms and navigation entry render.

## Guardrails

- Glossary content is orientation support only and does not change regulation records, scoring, applicability logic, source confidence or legal-force labels.
- The page explicitly says definitions are not legal definitions or official translations.
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.

## Follow-Up

Use the glossary as the public entry point for future taxonomy education, but only add jurisdiction-specific legal definitions after a governed source and translation review process exists.
