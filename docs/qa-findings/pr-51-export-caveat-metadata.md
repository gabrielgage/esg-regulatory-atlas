# PR 51 Export Caveat Metadata

Date: 2026-05-18

## Finding

CSV and JSON regulation exports are likely to leave the Atlas interface and be reused in spreadsheets, client notes, diligence folders or internal planning workbooks. Before this release, the export action sat near page-level disclaimers, but the downloaded files did not carry their own edition metadata, source-review note or legal-caution metadata.

## Product Reasoning

Exported data has a higher misuse risk than on-page data because it loses surrounding UI context. A lightweight static export envelope and CSV metadata columns preserve the Atlas edition, publisher, review dates and caveat language without adding authentication, databases, paid APIs or workflow infrastructure.

## Resolution

- Added visible export caveat guidance below CSV/JSON buttons on `/regulations`.
- Wrapped JSON exports in a `metadata` plus `records` object so the downloaded file carries edition, review date, publisher, contact and caveat context.
- Added CSV metadata columns for edition, exported date, publisher, editor, record count, export caveat and source-review note.
- Added Playwright smoke coverage for the export caveat note.
- Updated release metadata, changelog supplement, README and current release context to `0.5.35 - May 2026`.

## Guardrails

- No regulation records, source URLs, dates, status values, thresholds, scoring rules, map data or applicability logic changed.
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries, external database or required environment variables were added.
- Exported files remain planning aids, not legal opinions, source verification, official translations, complete coverage, compliance determinations or entity-specific applicability decisions.

## Future Note

If exports become a paid or client-deliverable workflow, add a static export manifest, checksum and source-review status summary before considering any database, account or audit-trail infrastructure.
