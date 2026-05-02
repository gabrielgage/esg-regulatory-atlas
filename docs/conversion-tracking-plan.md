# Manual Conversion Tracking Plan

This plan explains how Etica ESG · Regulatory Atlas tracks commercial interest during the static MVP phase without adding analytics SDKs, cookies, accounts, billing, CRM sync, automated email, scraping, cron jobs or required environment variables.

## Principle

Commercial interest should be validated manually before infrastructure is added. The first launch goal is to learn which premium alerts, market packs and advisory scans people request, not to automate a funnel prematurely.

## Current Tracking Surfaces

The source of truth for current CTA surfaces is `data/conversionTracking.ts`.

Tracked surfaces include:

- `/plans` commercial preview request
- `/alerts` alert preview request
- `/premium-packs/[id]` premium pack request
- `/advisory` advisory scan request
- market briefing CTAs on briefing and jurisdiction surfaces
- copied planning summaries that include an advisory review subject line

## Manual Fields To Capture

For each inbound request, capture:

- Date received
- Source route or copied summary
- Mailto subject line
- User persona
- Organization type
- Jurisdictions mentioned
- Topics mentioned
- Sector or company type
- Requested output
- Revenue relevance: premium alerts, market packs, advisory, enterprise/API future
- Follow-up action
- Whether a call or advisory scope was requested
- Data-quality or source-review concerns raised

## Review Cadence

- Weekly during May 2026 launch window.
- Same day for advisory scan or board/client briefing requests.
- Monthly after launch if request volume is low.

## Success Signals

Strong signals:

- A user requests a named premium pack.
- A user asks for a jurisdiction, sector or topic watchlist.
- A user forwards a copied summary and asks for advisory review.
- A user provides company, supplier, portfolio or market-entry context.
- A user asks what a paid or advisory version would include.

Weak signals:

- Generic praise without a use case.
- Curiosity about future accounts or dashboards without a concrete workflow.
- Requests for broad global completeness without source-review budget or scope.

## Guardrails

Do not add:

- analytics SDKs
- tracking cookies
- production email automation
- billing events
- CRM sync
- account tracking
- hidden user profiling
- database-backed lead capture

Do not describe a request-access CTA as a live subscription, automated alert or paid account.

## Next Decision Point

After May 31, 2026, review inbound requests and decide whether to:

- keep manual advisory-led validation
- prepare one reviewed premium market pack
- create a manual newsletter list outside the app
- evaluate an email provider
- defer paid infrastructure until stronger demand appears
