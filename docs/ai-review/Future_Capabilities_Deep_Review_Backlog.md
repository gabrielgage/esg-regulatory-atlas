# Future Capabilities Deep Review Backlog

Date: 2026-05-20  
Product: Etica ESG · Regulatory Atlas  
Purpose: give external reviewers and future agents a capability map for current, near-term and later-phase improvements.

## Capability Strategy

The Atlas should grow in this order:

1. Trust and clarity.
2. Regulatory coverage depth.
3. Decision support and evidence workflows.
4. Commercial validation.
5. Governed data operations.
6. Platform infrastructure.

Do not reverse this order. Authentication, database, billing, automated alerts and AI extraction should not arrive before source governance, content review and demand validation are credible.

## Current Capability Baseline

Already shipped:

- map-first homepage
- local country-outline map with pan, zoom, untracked-country styling and fallback
- regulation database
- regulation detail pages and drawers
- assessment wizard
- timeline
- briefing workspace
- Data Quality governance workspace
- market profiles
- sector profiles
- comparison
- methodology
- glossary
- public changelog
- daily launch pulse
- plans, alerts preview, advisory, premium roadmap and launch assets
- CSV/JSON regulation export
- copyable assessment, briefing, jurisdiction brief, source memo, citation and decision-readiness outputs
- source quality, confidence and data-quality indicators
- review workflow export
- Marquee 10 / Marquee 25 review queue
- light/dark mode
- six-language interface chrome
- GitHub Actions, Playwright smoke tests and Lighthouse CI

## Wave 1: Immediate Static MVP Improvements

These can be implemented without auth, database, paid APIs, scraping or automation.

### 1. Source Review Priority Sprint

Goal: make the most visible records more credible.

Recommended records:

- CSRD / ESRS
- EU Taxonomy
- SFDR
- CSDDD
- EUDR
- CBAM
- California SB 253 / SB 261
- UK SDR and anti-greenwashing
- ISSB IFRS S1/S2
- Australia, Singapore, Japan, Canada, Brazil and India ISSB-related records

Deliverables:

- add more primary/regulator source links
- verify status and dates
- clarify thresholds
- add date-sensitive caveats
- add source-review notes
- mark unresolved items as needs review

### 2. Regulation Detail Simplification

Goal: make each record answer “what is this, who may care, what evidence is needed, what should we verify?”

Improvements:

- add a concise top summary card
- make “facts to confirm” more prominent
- separate law/status/date caveats from business-impact guidance
- reduce dense chip clusters
- improve “related regulations” and “source to verify” hierarchy

### 3. Assessment Output Upgrade

Goal: make the wizard useful for advisor/client scoping while remaining legally cautious.

Improvements:

- show missing entity facts as a checklist
- group results by likely route to relevance
- add “why this appeared” in plainer language
- show first 30-day actions by function
- add copyable persona-specific summary
- add “what would change this result?” prompts

### 4. Map Interpretation Polish

Goal: ensure first-time users immediately understand map colors and untracked countries.

Improvements:

- add a short “how to read this map” drawer
- clarify record volume versus legal applicability
- add selected-market summary above the side panel
- ensure mobile map fallback remains usable
- add keyboard-visible focus cues for map controls

### 5. Coverage Gap Dashboard

Goal: make “broad but uneven” coverage explicit.

Improvements:

- show top markets below target
- show top markets with stale review dates
- show top markets with no primary/regulator source
- separate direct coverage from inherited EU/international coverage
- add reviewer next action per market

### 6. Client Briefing Polish

Goal: make the briefing route the highest-value advisory output surface.

Improvements:

- add persona and selected-market options
- add a structured “client-ready planning memo” copy block
- include confidence and source caveats automatically
- include market profile and assessment links
- add “request advisory review” mailto with context in subject line

### 7. Regulatory Coverage Depth

Goal: deepen priority markets rather than adding scattered single records.

Priority markets:

- EU
- Netherlands
- UK
- US
- California
- Canada
- Brazil
- India
- China
- Singapore
- Japan
- Australia
- Switzerland
- Turkey
- Mexico
- South Africa
- Hong Kong
- South Korea
- Taiwan
- Malaysia
- Indonesia
- Thailand
- Philippines

Priority topics:

- climate disclosure
- corporate sustainability reporting
- sustainable finance
- supply-chain due diligence
- deforestation and commodities
- forced labour
- product sustainability and circular economy
- green claims
- biodiversity and nature
- carbon pricing / ETS / carbon tax monitor records

## Wave 2: Static Or File-Backed Product Depth

These may still be static but require more careful data work.

### 8. Threshold Matrix

Create a structured comparison table for:

- employee thresholds
- revenue/turnover thresholds
- assets/balance sheet
- listed/private/public-interest entity status
- financial-market participant triggers
- parent/subsidiary/group triggers
- non-domestic triggers
- supplier/importer/exporter triggers

### 9. Obligation Checklist

For each record, classify:

- reporting
- governance
- due diligence
- assurance
- transition plan
- taxonomy
- product compliance
- supplier data collection
- board oversight
- financial disclosure

Show evidence and likely internal owner for each active obligation.

### 10. Sector Playbooks

Add richer static playbooks for:

- financial services
- manufacturing
- agriculture and food
- energy
- real estate and construction
- retail
- technology
- transport
- chemicals
- packaging

Each playbook should include:

- top records
- common evidence
- affected functions
- likely market triggers
- advisory workstreams
- caveats

### 11. Market Pack Samples

Create deeper static premium pack examples for:

- EU ESG Compliance Pack
- ISSB Adoption Tracker Pack
- Supply Chain Due Diligence Pack
- Product Sustainability / EUDR / CBAM Pack
- Financial Services ESG Regulation Pack
- Private Equity Portfolio Exposure Pack

These should remain ungated previews and not require billing or accounts.

### 12. Source Review Workbook Export

The Data Quality CSV/JSON export exists. Next step is a richer workbook-oriented template:

- source-review owner
- reviewer notes
- source date
- official source flag
- threshold verified
- date verified
- caveats unresolved
- premium-use approved
- advisory-use approved

This can remain a downloadable static export.

### 13. Edition Diffing

Static version:

- show what changed between recent public editions
- highlight regulation additions
- highlight source/caveat/date updates
- explain whether the update affects data, UI, docs or legal wording

Full audit trail can wait for a database.

### 14. Search And Discovery Polish

Improve:

- search result snippets
- “no results” recommendations
- related regulation suggestions
- alias matching
- country code matching
- topic synonym matching
- source body/issuing authority matching

### 15. Export And Copy Surface Review

Review every copy/export action for:

- edition metadata
- date generated
- source caveat
- legal caveat
- selected filters/context
- source-review status
- advisory next step

## Wave 3: Later Platform Capabilities

These require explicit phase approval and are not current MVP work.

### 16. Database-Backed Content Store

Needed when:

- source review ownership becomes real
- content volume outgrows static files
- multiple editors need to update records
- review history and approval status matter

### 17. Admin Editing Interface

Only after data governance is defined.

Capabilities:

- add/edit regulation
- assign reviewer
- set review status
- update source links
- create changelog entry
- approve premium use

### 18. Authentication And Client Workspaces

Only after demand validation.

Capabilities:

- saved company profile
- saved watchlists
- portfolio/supplier views
- team collaboration
- permissioned client reports

### 19. Automated Monitoring Pipeline

Requires:

- source list governance
- crawling/scraping policy
- source license review
- human review workflow
- false-positive handling
- update publication process

### 20. Email Alerts

Requires:

- subscriber management
- unsubscribe mechanics
- privacy posture
- alert editorial workflow
- source review before sending

### 21. AI-Assisted Research

Only with:

- source grounding
- human review
- confidence labels
- no legal conclusions
- clear traceability
- reviewer approval

### 22. Billing And Paid Plans

Stripe and paid subscriptions remain out of scope until:

- premium demand is validated
- offer packaging is clear
- access model is designed
- legal and data disclaimers are robust
- support and refund handling are planned

## Features To Avoid For Now

Avoid:

- chatbots that answer legal applicability
- AI-generated regulatory summaries without source review
- “complete compliance checklist” language
- pretending translations are official legal translations
- too many homepage panels
- paying for map or data APIs before demand validation
- gating core trust surfaces too early
- building admin/database infrastructure before source governance is ready

## Recommended Next 7-Day Sprint

1. Source-review the top 10 visible records.
2. Add a reviewer-friendly coverage gap list by market.
3. Simplify regulation detail page hierarchy.
4. Improve assessment output grouping and missing facts.
5. Add more official source links for under-covered priority markets.
6. Polish briefing copy output.
7. Review all legal wording for overclaim risk.
8. Run accessibility and dark-mode QA on core routes.
9. Prepare direct outreach using `/launch` assets.
10. Collect external AI and human feedback using the review pack.

## Recommended Next 30-Day Roadmap

1. Complete Marquee 10 source review.
2. Complete Marquee 25 minimum source review.
3. Build threshold matrix.
4. Build richer sector playbooks.
5. Expand market depth for priority commercial markets.
6. Improve comparison mode for market and regulation groups.
7. Add edition diffing.
8. Prepare workbook-style source review export.
9. Run user interviews with advisors, CSOs, legal and finance teams.
10. Decide whether advisory-led monetization has enough signal to justify database/admin planning.
