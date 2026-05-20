# Review Feedback Intake Template

Date:
Reviewer:
Review source: Claude / ChatGPT / ESG specialist / legal-risk reviewer / user interview / QA pass
Atlas edition reviewed:

## Executive Summary

- Highest-risk finding:
- Highest-ROI improvement:
- Launch confidence impact:
- Premium/advisory-use impact:

## Findings To Route

| Finding | Category | Evidence / source | Recommended destination | Priority | Premium-use blocked? |
| --- | --- | --- | --- | --- | --- |
|  | Confirmed bug or failed check / Regulatory content gap / Static MVP improvement / Future platform capability |  |  | P0 / P1 / P2 / P3 | Yes / No |

## Routing Rules

Use these destinations:

- Confirmed bugs, failed checks, broken routes or visible product defects: `docs/issue-resolution-log.md` and a focused QA note under `docs/qa-findings/`.
- Regulatory content gaps, weak sources, stale dates, threshold gaps or market-depth gaps: `docs/ai-review/Regulatory_Coverage_Review_Worksheet.csv` and the content review queue.
- Static MVP improvements that fit the current guardrails: `docs/product-improvement-backlog.md` and `docs/notion-update-plan.md`.
- Future platform capabilities requiring auth, database, monitoring, email automation, billing, AI extraction or admin workflows: `docs/ai-review/Future_Capabilities_Deep_Review_Backlog.md`.

## Guardrails

Do not convert review feedback into implementation that adds Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email backends, AI legal summaries, external databases or required environment variables without explicit scope approval.

Review feedback is not legal advice, source verification, official translation, complete regulatory coverage or an entity-specific applicability determination.
