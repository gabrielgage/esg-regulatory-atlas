# Product Brief

## Product Name

Etica ESG · Regulatory Atlas

## Positioning

Etica ESG · Regulatory Atlas is an interactive sustainability regulatory intelligence product for exploring ESG, climate, sustainable finance, corporate reporting, supply chain due diligence, biodiversity, product sustainability, and related disclosure rules by jurisdiction, sector, value chain exposure, and reporting year.

Publisher: Etica ESG. Editor: Gabriel Gage. Contact: `gabriel@eticaesg.com`.

The MVP is designed to help teams move from regulatory fragmentation to an initial, source-linked view of what may matter, why it may matter, and what business actions may be needed.

The May 2026 commercial frame is:

- Free Atlas: public trust surface and acquisition layer.
- Premium Intelligence: static previews for alerts, watchlists and market packs before billing or accounts.
- Advisory Atlas: near-term manual monetization path through exposure scans, custom watchlists, portfolio/supplier maps and briefings.
- Enterprise/API Future: later design-partner concept only.

## Primary Users

- Sustainability leaders
- ESG consultants
- Legal and compliance teams
- Finance and ESG controllership teams
- Private equity investors
- Asset managers
- Banks and insurers
- Corporate strategy teams
- Procurement and supply chain teams
- Board and risk committees

## User Problem

ESG regulation is fragmented across jurisdictions, sectors, frameworks, thresholds, implementation dates, value chain exposure, and reporting standards. Users need a fast way to orient themselves before deeper legal, accounting, or assurance review.

Common user questions:

- Which jurisdictions have relevant ESG regulation for my company or portfolio?
- Which rules may matter by sector, company type, value chain exposure, or reporting year?
- What are the likely business impacts?
- Which functions need to be involved?
- What evidence, controls, and data may be required?
- Which sources should be reviewed before making a compliance decision?
- Is this item a mandatory law, a standard, supervisory expectation, market expectation, voluntary framework or monitor item?

## Core Workflow

The intended workflow is:

1. Start on the map.
2. Select a jurisdiction, market profile, sector starting point or pre-defined view.
3. Narrow the dataset with search and filters.
4. Review jurisdiction or sector context for regulatory drivers, priority records and likely evidence needs.
5. Open individual regulation detail pages or drawers.
6. Review applicability caveats, key dates, sources, confidence, and data quality.
7. Use assessment, timeline, methodology, and briefing pages for deeper planning.

## MVP Scope

The MVP includes:

- Static Next.js application deployable on Vercel
- Local Tailwind v3 styling
- Static typed seed data
- Interactive map using local Natural Earth Admin 0 assets, visible country outlines, untracked-country styling, pan/zoom/reset controls and a geometry fallback
- Jurisdiction profiles
- Searchable and filterable regulations
- Record type, legal force and client relevance filters and badges
- Condensed parent-record model with child items, aliases and milestones
- Regulation detail pages or drawers
- Assessment wizard with legally cautious output categories
- Assessment results with visible trigger reasons, review priority, evidence to prepare, functions involved, source-to-verify guidance, missing facts, suggested owners and next 30-day actions
- Assessment readiness plan cards for threshold facts to check, first 30-day actions and likely owner functions
- Persona doorway presets for CSO, SME supplier lead, in-house legal and external advisor users
- Persona starting points in the Regulations workspace for CSO, legal/compliance, finance/controller, procurement/supplier, private equity and advisor workflows
- Timeline and methodology surfaces
- Quarter-level milestone timeline with default near-term planning horizon for consultation, effective, reporting, due-date and source-review planning
- Data Quality surface for captured source links and source-review prompt governance
- Tabbed Data Quality workspace for overview, sources, coverage and review workflow
- Data-quality review queue with visible scoring reasons for research prioritization
- Marquee 10 source-review packet showing premium-use blockers, priority sources, threshold facts and owner actions
- Threshold matrix for high-value scope signals, facts to confirm, timing signals, source links and review-before-use caveats
- Market coverage-depth dashboard showing target direct-record depth, current count, gaps and source-review prompts by jurisdiction
- Coverage-confidence dashboard separating record volume from priority-source backing, review prompts, stale dates and date-sensitive records
- Public changelog
- Daily launch pulse on Changelog and Data Quality for latest shipping context, validation expectations and next product-review focus
- Jurisdiction and regulation comparison
- Printable and copyable jurisdiction briefs
- Jurisdiction briefs with readiness starters, watch items, evidence packages and source-backed priority-record counts
- Scenario-led briefing workspace with EU reporting, PE portfolio, supplier/exporter, financial-services and board/risk committee planning paths
- Briefing sector heatmap
- Citation copy blocks and edition snapshot routes
- Light/dark mode toggle
- First-time visitors default to light mode; dark mode is an explicit saved preference
- Language toggle for English, Spanish, Dutch, French, German and Portuguese interface chrome
- Shareable filtered views for Map and Regulations
- CSV/JSON exports of filtered regulation records
- Readiness-priority planning score
- Expanded EU financial-services, APAC/ISSB, South Africa and voluntary framework coverage
- Static market briefing CTA and premium roadmap page for future market packs, sector packs and portfolio scans without gating or payments
- `/plans` commercial architecture page
- `/alerts` static premium digest and watchlist preview
- `/advisory` manual service page for exposure scans, watchlists, portfolio/supplier maps and briefing packs
- Grouped navigation that keeps core discovery routes prominent while placing timeline, briefing, data-quality, alert and advisory routes in a More menu; launch-support assets remain an operator route rather than public navigation
- Homepage Start Here panel that routes new users to assessment, markets or regulation search before advanced controls
- Scenario selector on `/briefing` that keeps priority records, evidence prompts and copied summaries tied to a selected planning question
- Premium market-pack previews and sample table-of-contents sections
- `/premium-packs/[id]` static sample pages for individual premium pack scopes
- Premium pack pages with copyable and printable Markdown briefs
- Manual conversion tracking model for CTA and mailto-subject validation without analytics infrastructure
- `/launch` operator workspace with copyable LinkedIn, email, direct outreach, advisory scan and premium-preview assets, marked noindex and not linked from public navigation
- `/markets` workspace for browsing jurisdiction market profiles by region, captured source links and review prompts
- `/sectors` workspace and `/sectors/[slug]` pages for business-context regulatory triage by sector, market signal, evidence need and advisory workstream
- `/value-chain` workspace for supplier, importer/exporter, product, claims, portfolio, financed-emissions, own-operations and board-governance exposure triage
- Marquee launch review queue for high-value regimes used in premium packs and advisory examples
- Marquee 10 operational source-review packet for launch-critical premium and advisory reuse checks
- Premium pack source-review gates that disclose illustrative-only and review-before-use records before commercial reuse
- Source freshness and premium-use blocker signals for source-governance triage
- Decision-readiness checklists that translate source, threshold and evidence gaps into review controls for regulation details and Marquee premium/advisory use
- Source evidence trails and copyable source-review memos that turn captured sources into practical QA packets
- Review workflow CSV/JSON exports and copyable priority review packets from `/data-quality`
- AI review pack under `docs/ai-review/` for external critique of current capabilities, future roadmap, regulatory coverage, source governance, UX and legal-safety posture
- External review intake panel on Data Quality for routing findings into issue logs, coverage review, product backlog or future capability planning
- Reusable commercial CTA surfaces
- Source quality indicators
- Advisory opportunity and business impact views
- Visible legal and data-quality disclaimers

The MVP intentionally excludes:

- Authentication
- External database
- Supabase
- Stripe or payment functionality
- Paid APIs
- Mapbox
- Required environment variables
- Scraping or automated monitoring
- Email alerts
- AI summaries
- Definitive legal applicability determinations

## Product Principles

### Start With Orientation

The first product promise is not "tell me exactly what applies." It is "help me understand the regulatory landscape and what to investigate next."

### Make Sources Visible

Every regulatory insight should lead users toward source review. Primary sources should be visually prioritized over commentary.

### Separate Intelligence From Advice

The product can classify, summarize, organize, and prioritize. It must not imply a final legal opinion, assurance conclusion, tax conclusion, or investment recommendation.

### Keep The Map Central

The map is the main workspace. Heavy tools such as assessment, timeline, data methodology, commercial validation, launch assets and client briefing should support the map from separate routes rather than crowd the homepage.

### Design For Consultant Workflows

The product should help an advisor quickly explain the landscape, identify likely workstreams, and frame next steps such as gap assessment, data readiness, controls, supplier diligence, or reporting preparation.

### Keep Records Condensed

The Atlas should not become a catalogue of thousands of subrules. Major regimes and frameworks should usually be top-level parent records. Delegated acts, questionnaires, sector modules, standards subchapters and implementation milestones should appear as child items, aliases or source notes unless they create a distinct client decision.

## Visual Direction

The interface should feel like a premium regulatory intelligence SaaS product:

- Clean white and deep navy base
- Teal and mint for active or in-force regulation
- Amber for consultation, pending, or review-needed states
- Purple or blue for transitional or monitoring states
- Grey for no data, incomplete data, or lower confidence
- Strong typography
- Controlled whitespace
- Compact but legible tables
- Professional badges
- Calm panels rather than dense walls of chips

## Success Criteria

The MVP is successful when:

- It deploys reliably on Vercel.
- Users can understand the product purpose within a few seconds.
- The map is visually credible and interactive.
- Country outlines, untracked countries and ocean background are visible enough for users to recognize the map as a true world map, not abstract shapes.
- Users can zoom, reset and drag the map viewport without adding a paid map dependency.
- Users can select a jurisdiction and understand key regulatory drivers.
- Users can start from value-chain exposure and identify priority records, evidence needs and filtered regulation handoffs.
- Reviewers can export source, threshold and evidence review rows without treating them as legal verification.
- Users can filter regulations without breaking the interface.
- Regulation records expose sources, caveats, confidence, and data quality.
- Regulation detail pages show the priority source, source freshness posture and source-review packet before client-ready or premium reuse.
- The assessment wizard produces cautious, useful orientation.
- Timelines, briefings and jurisdiction briefs show what to do next without implying legal advice.
- Users can understand what is free, what is premium-preview, what can be requested as advisory support and what is future enterprise/API scope.
- Premium previews do not imply production monitoring, billing, accounts or gated data.
- The product avoids legal overclaiming.
- Future agents can safely extend the system using the documentation in this folder.
- External reviewers can use the AI review pack to provide structured feedback without first reverse-engineering the full repository.

## Current Product Surfaces

- Map workspace: `/`
- Regulation database: `/regulations`
- Persona role lenses: `/regulations?persona=finance-controller`
- Regulation detail: `/regulations/[slug]`
- Edition snapshot: `/edition/0.5/regulations/[slug]`
- Assessment wizard: `/assessment`
- Timeline: `/timeline`
- Briefing workspace: `/briefing`
- Data Quality: `/data-quality`
- Threshold matrix: `/thresholds`
- Comparison: `/compare`, `/compare?jurisdictions=EUU,GBR`, `/compare?ids=csrd,issb-s1-s2`
- Jurisdiction brief: `/jurisdiction/[code]/brief`
- Jurisdiction market profile: `/jurisdiction/[code]`
- Sector starting points: `/sectors`, `/sectors/[slug]`
- Value-chain exposure: `/value-chain`
- Plans: `/plans`
- Alerts preview: `/alerts`
- Advisory: `/advisory`
- Methodology: `/methodology`
- Changelog: `/changelog`
- About: `/about`
- Premium roadmap: `/premium-roadmap`

## Continuous Improvement Expectation

Each meaningful iteration should reduce future friction. When the product changes, update the relevant context files so the next engineer or agent understands the current state, constraints, validation path and rationale.

The active PM/ESG specialist improvement backlog lives in `docs/product-improvement-backlog.md`. It should guide near-term prioritization without expanding the MVP into authentication, database, paid API, monitoring or commercial features prematurely.
