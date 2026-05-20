# ESG Regulatory Atlas AI Review Export

Date: 2026-05-20  
Current release context: `0.5.41 - May 2026` review pack update  
Public site: https://esg-regulatory-atlas.vercel.app  
Publisher: Etica ESG  
Editor: Gabriel Gage  
Contact: gabriel@eticaesg.com

## Purpose Of This Export

This document is designed to be pasted into Claude, ChatGPT or another AI reviewer while Codex continues implementation work. It gives enough context for an external reviewer to critique the current product, future roadmap, regulatory coverage, UX, data-quality model, commercial strategy and legal safeguards without needing to inspect the repository first.

The requested reviewer output should be concrete and prioritized. Avoid generic encouragement. The useful output is a set of specific findings, missing capabilities, regulatory corpus gaps, UX risks, legal-risk wording issues and next implementation recommendations.

## Product Mission

Etica ESG · Regulatory Atlas is a static MVP for interactive sustainability and ESG regulatory intelligence. It helps users explore ESG, climate, sustainable finance, corporate reporting, supply-chain due diligence, biodiversity, product sustainability, green claims, carbon, responsible business and related regulation by:

- jurisdiction
- region
- sector
- company type
- listing status
- value-chain exposure
- obligation type
- reporting year
- legal status
- source authority
- data-quality confidence
- advisory opportunity

The product is not intended to provide legal advice or definitive applicability decisions. It is a regulatory orientation, triage, planning and advisory-scoping product.

## Non-Negotiable MVP Guardrails

The current MVP must remain:

- static
- Vercel-simple
- deployable without environment variables
- source-linked
- legally cautious
- transparent about seed data
- low-cost and free of external runtime infrastructure

Do not add or recommend immediate implementation of:

- Stripe, checkout, billing, paid plans or payment webhooks
- Supabase or external databases
- authentication, user accounts or client workspaces
- paid APIs or Mapbox
- scraping, cron jobs or production regulatory monitoring
- production email-alert backend
- AI-generated legal summaries
- definitive legal applicability determinations

Future phases may evaluate these only after explicit scope approval and a governance model.

## Primary Users

The product is designed for:

- sustainability leaders and CSOs
- ESG consultants and external advisors
- legal and compliance teams
- finance and ESG controllership teams
- private equity investors and portfolio teams
- asset managers, banks and insurers
- procurement and supply-chain teams
- corporate strategy teams
- board and risk committees
- SMEs and exporters trying to understand customer-driven sustainability requirements

## Main User Problem

ESG and sustainability regulation is fragmented across jurisdictions, sectors, frameworks, thresholds, legal instruments, source types and implementation dates. Users need a fast way to answer:

- Which regulations may matter to us?
- Where do they apply?
- What type of instrument is this?
- Is it mandatory, voluntary, transitional, delayed, a market expectation or a monitor item?
- What facts are needed to confirm relevance?
- What evidence might be needed?
- Which functions should be involved?
- What dates matter?
- Which sources should be reviewed before relying on the information?
- Where is advisory support likely needed?

## Current Product Structure

The app uses Next.js App Router, React, TypeScript and Tailwind v3. It is deployed on Vercel as a static or mostly static application. The seed data is stored in TypeScript files under `data/`.

Core routes:

- `/` map workspace
- `/regulations` regulation database
- `/regulations/[slug]` regulation detail pages
- `/assessment` indicative applicability wizard
- `/timeline` regulatory milestone timeline
- `/briefing` client/advisory briefing workspace
- `/data-quality` source, coverage and review-governance workspace
- `/compare` jurisdiction and regulation comparison
- `/markets` market profile index
- `/jurisdiction/[code]` market profile pages
- `/jurisdiction/[code]/brief` printable/copyable jurisdiction briefs
- `/sectors` sector profile index
- `/sectors/[slug]` sector profile pages
- `/glossary` plain-language regulatory glossary
- `/methodology` methodology and data caveats
- `/changelog` public update log
- `/plans` free/premium/advisory positioning
- `/alerts` static alert preview
- `/advisory` manual advisory service page
- `/premium-roadmap` premium roadmap and pack concepts
- `/premium-packs/[id]` static premium pack sample pages
- `/launch` copyable launch and outreach assets
- `/about` product background

The current build generates hundreds of static pages, including 140+ regulation detail routes, jurisdiction pages, jurisdiction briefs, sector pages and edition snapshot routes.

## Current Implemented Capabilities

### Map Workspace

The homepage is map-first. It includes:

- compact hero
- short disclaimer
- unified view selector
- compact filters
- shareable filtered URL
- local Natural Earth country-outline map
- tracked and untracked country styling
- pan, zoom and reset controls
- selected jurisdiction panel
- regulation preview cards
- table preview
- assessment prompt

Map caveat:

Map color reflects tracked Atlas seed record volume in the active view. It is not a legal applicability determination, a statement of complete market coverage or a measure of regulatory burden.

### Regulation Database

The database supports:

- search
- jurisdiction filters
- topic filters
- sector filters
- company type filters
- reporting year filters
- region filters
- jurisdiction type filters
- value-chain filters
- business-function filters
- obligation filters
- status filters
- confidence and data-quality filters
- advisory opportunity filters
- record type, legal force and client relevance filters
- CSV and JSON export
- source-review caveat metadata in exports
- persona presets on `/regulations`

### Regulation Detail Pages And Drawers

Regulation records show:

- title and short name
- jurisdiction and issuing body
- legal instrument / record type where available
- status, legal force and data quality
- key dates
- applicability summary
- key requirements
- business impact
- affected functions
- evidence likely needed
- decision-readiness checklist
- facts to confirm
- first 30-day actions
- source evidence trail
- copyable source-review memo
- citation widget
- advisory opportunities
- caveats
- related record context where available

### Assessment Wizard

The assessment wizard is static and indicative. It asks profile questions and returns cautious categories:

- potentially directly relevant
- potentially indirectly relevant
- relevant through investors or customers
- voluntary best practice
- monitor only

Outputs include:

- why a record appears
- missing facts
- evidence needed
- suggested owner
- source to verify
- next 30-day actions
- copyable shortlist
- caveat language

The wizard must not say “this applies to your company” or “you must comply.”

### Data Quality Workspace

The Data Quality page is a governance surface, not a client homepage. It includes:

- overview governance cards
- daily launch pulse
- source library
- coverage confidence panel
- coverage depth panel
- coverage matrix
- source freshness signals
- review queue scoring
- Marquee 10 / Marquee 25 review queue
- premium evidence gates
- review workflow CSV and JSON exports
- copyable priority review packet

Source governance distinguishes:

- primary law or regulation
- regulator guidance
- standard setter material
- secondary commentary
- source missing
- needs review
- stale or upcoming review

### Markets And Sectors

The app includes market and sector entry points:

- `/markets` groups tracked jurisdictions by region and review posture.
- `/jurisdiction/[code]` shows direct and inherited records, priority records, timing signals, evidence needs, source confidence and advisory opportunities.
- `/sectors` groups sector starting points.
- `/sectors/[slug]` shows priority records, market signals, evidence needs, timing, source confidence and advisory opportunities.

### Briefing And Commercial Surfaces

Commercial validation remains static:

- `/plans` explains Free Atlas, Premium Intelligence preview, Advisory Atlas and Enterprise/API Future.
- `/alerts` previews alert digests and watchlists without email automation.
- `/advisory` presents manual exposure scans, watchlists, portfolio/supplier maps and board/client briefings.
- `/premium-roadmap` and `/premium-packs/[id]` preview premium pack concepts.
- `/launch` contains copyable LinkedIn, direct outreach and email assets.

This supports monetization validation without Stripe, accounts, gating or automated delivery.

## Current Data Model

Regulation records include fields for:

- id
- title
- shortName
- jurisdiction
- jurisdictionIds
- transposed/inherited jurisdiction IDs
- jurisdiction type
- issuing body
- status
- adoption level
- topics
- sectors
- value chain and value-chain impact
- effective date
- first reporting year
- summary
- applicability
- applicability scope
- key requirements
- business impact
- business impact tags
- affected functions
- source URLs and source type
- latest update
- last reviewed
- next review date
- confidence
- data quality status
- advisory opportunities
- company types
- evidence required
- typical client questions
- immediate readiness actions
- likely pain points
- software enablement opportunity
- caveats
- phase-in notes
- penalties
- high-impact flag

The current model has enough structure for static MVP decision support, but production data operations would require a governed content workflow, named reviewers, review history and possibly a database.

## Regulatory Coverage Snapshot

Coverage includes:

- European Union corporate reporting and sustainable finance
- CSRD / ESRS
- EU Taxonomy
- SFDR
- CSDDD
- CBAM
- EUDR
- ESPR / Digital Product Passport
- Green Claims
- EU Batteries Regulation
- EU Forced Labour Regulation
- UK SDR, anti-greenwashing, TCFD-aligned disclosure, transition planning and modern slavery
- US / California climate disclosure and related monitor records
- Canada, Brazil, India, China, Singapore, Japan, Australia, Hong Kong and APAC ISSB alignment records
- South Africa and other expansion market records
- national due-diligence regimes such as Germany, France and Norway
- voluntary and international frameworks including ISSB, GRI, TCFD, TNFD, SBTi, GHG Protocol, OECD Guidelines and UNGPs
- financial services, product sustainability, supply-chain, biodiversity, circular economy and green-claims lenses

Important limitation:

Coverage is seed regulatory intelligence. It is not complete global coverage and not a verified legal inventory.

## Legal Safety Model

Approved wording:

- may apply
- may be relevant
- potentially relevant
- indicative
- source to verify
- facts to confirm
- monitor only
- review primary sources
- validate with qualified counsel or regulatory advisors

Avoid:

- this applies to your company
- you must comply
- complete global coverage
- all applicable regulations
- legally required for you
- guaranteed compliance
- legal opinion
- official legal translation

Disclaimers are included at the top of the app, in the footer, in regulation detail surfaces, in exports, in copied summaries and in source/citation outputs.

## Technical Architecture

Current stack:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v3
- static TypeScript data
- local Natural Earth map geometry
- no database
- no auth
- no paid APIs
- no environment variables
- Vercel deployment
- GitHub Actions CI
- Playwright smoke tests
- Lighthouse CI

Recent technical note:

Next.js was patched to `^16.2.6` after production dependency audit flagged a high-severity advisory in the previous range. Production audit now reports zero vulnerabilities with dev dependencies omitted.

## Current Strengths

- Strong static MVP discipline.
- Clear non-legal-advice posture.
- Source and data-quality visibility are treated as product features.
- Map, regulation database, assessment, timeline, briefing, data-quality and commercial validation surfaces are already in place.
- The product has moved beyond a generic ESG catalogue toward a source-governed decision-support workspace.
- Commercial path is sensible: free trust surface, static premium previews, manual advisory conversion.
- Good guardrails against overbuilding infrastructure too early.
- Strong documentation habit: README, handoff, roadmap, methodology, legal safeguards, issue log, QA findings and Notion-ready plan.

## Current Weaknesses Or Review Risks

Potential reviewer concerns:

- Regulatory coverage is broad but uneven by market.
- Source verification is not production-grade yet.
- Data is static and manually maintained.
- Some regulatory records may need more granular threshold, exemption, penalty and phase-in fields.
- The UX may still feel dense in detail and governance areas.
- Multilingual support covers interface chrome, not official legal translations.
- Map is useful for MVP, but not a full GIS product.
- Commercial pages are previews, not live subscription products.
- The assessment is indicative only and should not imply legal applicability.
- Named source reviewers and review workflow ownership are future-state.

## Highest-Value Future Capability Areas

The next useful review should evaluate:

1. Which regulations are most important to source-review before public launch.
2. Which markets need more direct records for credibility.
3. Whether the map experience is clear enough for first-time users.
4. Whether the regulation detail page answers “what do I do next?” quickly enough.
5. Whether the assessment output is useful but legally cautious.
6. Whether the commercial funnel makes advisory and premium demand testable.
7. Whether Data Quality is too internal or appropriately placed.
8. Whether future database/admin workflow should wait until demand validation.
9. Whether any copy overclaims coverage, certainty or legal applicability.
10. Which parts of the product should be simplified before public sharing.

## Suggested External AI Review Output Format

Ask the reviewer to return:

1. Executive verdict: launchable now, launchable with fixes or not launchable.
2. Top 10 product risks.
3. Top 10 ESG/regulatory content gaps.
4. Top 10 UX/UI improvements.
5. Top 10 legal/data-quality safeguards to add.
6. Top 10 commercial/monetization improvements.
7. Recommended 7-day sprint plan.
8. Recommended 30-day roadmap.
9. Features to explicitly defer.
10. Copy edits where current language may be too strong.

## Current Product Principle

Do not make the product look more powerful than its data governance. Make uncertainty visible, useful and commercially credible.
