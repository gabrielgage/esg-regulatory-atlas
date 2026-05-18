# PR 52 Source Memo And Citation Caveats

Date: 2026-05-18

## Finding

Regulation detail pages include two copy-oriented research surfaces: source review memos and citation snippets. These outputs are likely to be reused in research notes, diligence files, client memos or legal/compliance workpapers. Before this release, source memos had a basic caveat, but did not carry the full Atlas edition and publisher metadata. Citation snippets also needed clearer wording that they cite the Atlas seed record rather than legal authority.

## Product Reasoning

Source and citation workflows sit closest to legal research behavior. They should remain useful and compact while making it hard to mistake Atlas seed intelligence for a legal citation, source verification, official translation or compliance determination.

## Resolution

- Added copied-output guidance beside the source memo copy button in `SourceEvidencePanel`.
- Added publisher, editor, contact, edition, dataset review date, source counts and a source-review note to copied source governance memos.
- Added a visible citation caveat to `CitationWidget`.
- Added caveat text to copied APA, legal research note and BibTeX citation snippets.
- Added Playwright smoke coverage for source memo and citation caveat surfaces.
- Updated release metadata, changelog supplement, README and current release context to `0.5.36 - May 2026`.

## Guardrails

- No regulation records, source URLs, dates, status values, thresholds, scoring rules, map data or applicability logic changed.
- No Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries, external database or required environment variables were added.
- Source memos and citation snippets remain planning and review aids, not legal opinions, legal citations, source verification, official translations, complete coverage or entity-specific applicability decisions.

## Future Note

If source memos become a client-deliverable feature, add an explicit reviewer, review date and unresolved-caveat block before considering any database-backed review workflow.
