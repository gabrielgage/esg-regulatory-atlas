# Feature Request Tracking

This document turns deep research, competitor observations, user feedback, QA findings and monetization hypotheses into a controlled product backlog for Etica ESG · Regulatory Atlas.

## Purpose

Feature requests should improve launch credibility, regulatory usefulness, source trust, advisory workflow or commercial validation. They should not push the MVP into authentication, databases, billing, scraping, cron jobs, production AI or paid APIs before the product owner explicitly changes phase.

## Feature Request Schema

Use these fields in Notion or in a static tracker:

- Feature
- Product Area
- Source
- Evidence Link
- User Persona
- Customer Problem
- Revenue Relevance
- Priority
- Effort
- Confidence
- MVP Fit
- Acceptance Criteria
- Legal/Data Risk
- Status
- Codex Task ID
- Owner
- Due Date

## Product Areas

- Map
- Regulations
- Assessment
- Alerts
- Premium
- Advisory
- Data Quality
- Exports
- Notion Ops
- Content Workflow
- Source Governance
- Timeline
- Comparison
- Jurisdiction Briefs
- API Future
- Enterprise Future

## Source Types

- Deep Research
- Website Review
- Seneca/Drive
- Competitor Benchmark
- User Interview
- Founder Idea
- QA Finding
- Regulatory Corpus Gap
- Monetization Hypothesis

Internal, Seneca, Drive and competitor material can support product insight, workflow design, prioritization and positioning. They must not be treated as legal authority for regulatory status, thresholds, penalties or applicability.

## Revenue Relevance

- None
- Lead-gen
- Premium alerts
- Market packs
- Advisory
- Enterprise/API

## MVP Fit

- Ship now
- Prototype
- Defer
- Do not build

## Confidence

- Observed
- Inferred
- Needs validation

## Prioritization Formula

Priority score =

`user pain severity + credibility/trust impact + monetization relevance + implementation simplicity + strategic differentiation - legal/data-quality risk - architecture complexity`

Interpretation:

- 20+ = P0
- 15-19 = P1
- 10-14 = P2
- below 10 = P3 or defer

## May 2026 Feature Request Seeds

| Feature | Product Area | Source | Persona | Revenue | MVP Fit | Priority | Acceptance Criteria |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Free vs premium vs advisory plans page | Premium | Monetization Hypothesis | CSO / advisor | Lead-gen | Ship now | P0 | `/plans` explains Free Atlas, Premium Intelligence, Advisory Atlas and Enterprise/API Future with no Stripe/auth/gating. |
| Static alert preview page | Alerts | Deep Research | Legal / CSO / advisor | Premium alerts | Ship now | P0 | `/alerts` shows weekly/monthly sample digests, watchlist concepts, source-quality legend and request-access CTA. |
| Advisory service page | Advisory | Monetization Hypothesis | Advisor / portfolio / legal | Advisory | Ship now | P0 | `/advisory` explains exposure scans, watchlists, portfolio/supplier maps and briefing packs. |
| Premium market pack previews | Premium | Competitor Benchmark | CSO / legal / finance | Market packs | Prototype | P1 | Premium roadmap shows concrete pack concepts and sample table-of-contents sections. |
| Regulation detail decision cards | Regulations | Website Review | Legal / CSO | Advisory | Ship now | P0 | Detail pages show what this is, who may be affected, evidence, owners, caveats and advisory next step. |
| Assessment missing facts model | Assessment | Deep Research | SME / legal / advisor | Advisory | Prototype | P1 | Assessment results show missing facts needed to confirm applicability. |
| Source freshness owner workflow | Source Governance | QA Finding | Data/research owner | Enterprise/API | Defer | P2 | Data-quality queue can later hold owner, status, review priority and source freshness fields. |
| Launch outreach assets | Launch Assets | Monetization Hypothesis | Founder / advisor | Lead-gen | Ship now | P1 | Draft LinkedIn and direct outreach copy for Free Atlas, alerts preview and advisory scans. |

## Triage Process

1. Capture the idea with source, persona, problem and revenue relevance.
2. Confirm whether the idea can ship statically.
3. Score the idea using the prioritization formula.
4. Route it:
   - Launch blocker -> Launch Tasks
   - Regulatory content issue -> Content Review
   - Strategic decision -> Decisions Log
   - Output/collateral -> Launch Assets
   - Bug or UX defect -> QA & Review Findings plus `docs/issue-resolution-log.md` when resolved
5. Write acceptance criteria before implementation.
6. Keep legal/data risk visible.

## Guardrails

Do not implement database-backed feature requests, production alerts, paid plans, user accounts, API infrastructure, source scraping, cron jobs, AI legal summaries or Stripe until the project owner explicitly authorizes a later phase.
