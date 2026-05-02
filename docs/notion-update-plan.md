# Notion Update Plan

This page mirrors the Notion launch updates needed for the May 2026 commercialization sprint. Keep it in the repo even when Notion is updated so future agents can reconcile Notion state with code state.

## Launch Command Center Section

Add section: `2026-05 May Commercialization Sprint`

Objective:

Ship ESG Regulatory Atlas as a credible free MVP by May 23, 2026, and validate monetization by May 31, 2026 through premium alert previews, premium market-pack previews, and advisory lead-generation CTAs.

Commercial strategy:

- Free Atlas remains the public trust surface.
- Premium Intelligence is validated through static alert and market-pack previews before billing infrastructure.
- Advisory Atlas is the near-term revenue path via exposure scans, portfolio/supplier maps, custom watchlists, and board/client briefings.
- No Stripe, auth, database, cron jobs, scraping, or production email-alert backend until demand and governance are validated.

May exit criteria:

- Public site explains free vs premium vs advisory.
- `/alerts` shows weekly/monthly digest previews.
- `/plans` and `/premium-roadmap` show premium market-pack options.
- `/advisory` supports inquiry flow.
- Assessment and regulation detail pages produce decision-ready next steps.
- Data Quality explains coverage tiers, source quality, and review limitations.
- Launch Tasks, Content Review, Feature Requests, Decisions, QA, and Launch Assets are updated.

## Decisions Log ADRs

ADR-014:

- Decision: Validate premium demand before Stripe/auth.
- Why: Current MVP is static and guardrails prohibit paid infrastructure without explicit phase change.
- Consequence: Build static offer pages and request-access CTAs first.
- Status: Active.

ADR-015:

- Decision: Treat email alerts as editorial preview in May.
- Why: Production alerts require monitoring, email ops, unsubscribe/privacy mechanics, and governance.
- Consequence: Build `/alerts` preview and sample digest; use manual list/request flow.
- Status: Active.

ADR-016:

- Decision: Use advisory-led monetization first.
- Why: Advisory can monetize without product infrastructure and fits ESG regulatory intelligence.
- Consequence: Add `/advisory`, CTAs, sample scan outputs, outreach assets.
- Status: Active.

ADR-017:

- Decision: Free Atlas remains broad trust surface.
- Why: Free tier builds credibility and acquisition.
- Consequence: Do not gate core map/regulation/methodology before validation.
- Status: Active.

ADR-018:

- Decision: Track May commercial interest manually before analytics or CRM.
- Why: The static MVP can learn from mailto subjects, route context and direct replies without cookies, SDKs, accounts, databases or CRM sync.
- Consequence: Use `data/conversionTracking.ts`, copied-summary subject lines and a manual review cadence until demand justifies instrumentation.
- Status: Active.

## Launch Tasks

Create or update `LAUNCH-001` through `LAUNCH-025` from the May 2026 sprint prompt. Mark implemented static website work as Review once code has shipped locally, and keep future infrastructure tasks as Post-launch or Deferred.

## Content Review

Add or verify review entries for the Marquee 10 and Marquee 25 records. Mark launch blockers where thresholds, legal status, source review or date confidence are incomplete for records used in premium examples.

## Launch Assets

Track:

- Free Atlas launch homepage strip
- Premium Alerts preview copy
- Monthly ESG regulatory digest sample
- Advisory Exposure Scan one-pager
- Market Pack sample table of contents
- LinkedIn launch post 1: free Atlas
- LinkedIn launch post 2: alerts preview
- LinkedIn launch post 3: advisory scans
- Direct outreach email for advisory scan
- Direct outreach email for premium alert preview
- Premium pack sample pages for EU, ISSB, supply chain, financial services and portfolio/private equity use cases
- Manual conversion tracking log template

## QA And Review Findings

Log issues discovered during implementation, especially:

- dark mode readability
- map clarity
- legal wording
- broken routes
- stale data labels
- missing source links
- export caveat failures
- copied summary disclaimer failures
- mobile CTA/layout issues
