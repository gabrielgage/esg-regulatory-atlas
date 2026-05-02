# Roadmap

This roadmap separates what belongs in the static MVP from later product phases. Do not implement later-phase items unless the project owner explicitly expands scope.

## Current MVP

The current MVP should remain:

- Static
- Vercel deployable
- Free of required environment variables
- Free of paid APIs
- Free of authentication
- Free of external databases
- Legally cautious
- Source-linked
- Useful for initial ESG regulatory orientation

Current capability areas:

- Interactive regulatory map
- Jurisdiction profiles
- Filterable regulation table
- Regulation detail view
- Assessment wizard
- Timeline view
- Methodology and data quality surfaces
- Consulting-oriented advisory opportunities
- Business impact and obligation tags
- Public changelog
- Jurisdiction and regulation comparison
- Printable and copyable jurisdiction briefs
- Citation copy blocks and edition snapshot routes
- Persona doorway presets in the assessment wizard
- Light/dark mode toggle
- Multilingual interface chrome for English, Spanish, Dutch, French, German and Portuguese
- Shareable filtered Map and Regulations URLs
- Filtered CSV and JSON regulation exports
- Readiness-priority scoring on records
- Sector heatmap in the briefing workspace
- Copyable assessment shortlist
- Static seed data

## Recently Delivered Phase 1A Items

- Public changelog route at `/changelog`
- Two-jurisdiction comparison route at `/compare`
- Regulation comparison route via `/compare?ids=csrd,issb-s1-s2`
- Printable/copyable jurisdiction brief route at `/jurisdiction/[code]/brief`
- Etica ESG rebrand, branded 404 and ISSB redirect aliases
- Regulation citation widget and `/edition/0.5/regulations/[slug]` snapshot route
- Assessment persona doorways and advanced filter grouping
- Header light/dark mode toggle
- Real `/data-quality` governance page and simplified primary navigation
- Sector heatmap tab in `/briefing`
- Homepage "What's new" strip
- Mobile map fallback list
- Favicon
- Marquee EU record threshold and penalty cleanup
- Direct vs inherited jurisdiction record-count distinction
- Agent and documentation workflow files

## Recently Delivered Phase 1B Items

- Added market-depth seed records through `data/marketCoverage.ts`, especially for Mexico, Netherlands, California, United States, China, Singapore, Japan, Australia, Brazil, Switzerland and Turkey.
- Improved map legibility with stronger country outlines and local graticule cues while keeping the dependency-free local Natural Earth approach.
- Added language toggle support for English, Spanish, Dutch, French, German and Portuguese product chrome.
- Added shareable filtered URLs to the Map and Regulations workspaces.
- Added filtered CSV and JSON exports for the static regulation database.
- Added readiness-priority scoring and reasons for planning conversations.
- Grouped timeline milestones by year and expanded the visible milestone set.
- Expanded comparison mode with thresholds, first report due date, readiness, affected functions, advisory opportunities and enforcement rows.
- Improved the data-quality page with high-impact review checks and a larger prioritized research queue.
- Added configurable client planning summaries by jurisdiction, sector and company type.

## Phase 1: Credibility And Utility

Phase 1 should deepen the static product without changing the deployment model.

Recommended improvements:

- More precise timeline view with quarter-level milestone grouping
- Deeper source review queue workflow with assigned owners and review states
- Changelog detail grouped by regulation and jurisdiction
- More consistent source metadata across all records
- Better assessment scoring with visible reasons
- Stronger regulation detail pages with threshold summaries and caveats
- Improved map legend and layer explanations
- Better mobile and tablet refinements
- Excel and PDF-ready export formats after the CSV/JSON pattern is validated
- Maturity axis alongside status, such as mandatory in place or mandatory in progress
- Deeper threshold, penalty and phase-in content for non-marquee records

Phase 1 still should not add authentication, databases, paid APIs, Stripe, scraping, cron jobs, or AI-generated summaries.

## Phase 2: Data Operations

Phase 2 may introduce structured content operations after the static MVP proves useful.

Possible features:

- Database-backed regulation records
- Admin editing interface
- Reviewer roles
- Source review workflow
- Legal review workflow
- Jurisdiction owner assignment
- Change history
- Source monitoring queue
- Draft and published record states
- Client workspaces
- Saved views per client or portfolio
- Authentication
- Team permissions

Candidate database options should be evaluated separately. Supabase is not part of the MVP and should not be added without explicit approval.

## Phase 3: Intelligence And Monitoring

Phase 3 may introduce active monitoring and AI-assisted workflows.

Possible features:

- Automated source monitoring
- Regulatory change alerts
- Email notifications
- AI-assisted summaries with human review
- Evidence extraction from primary sources
- Diffing regulation updates over time
- Client-specific impact briefs
- Portfolio-level impact scoring
- Jurisdiction watchlists

Any AI feature must include source grounding, human review, uncertainty display, and legal safeguard language.

## Phase 4: Commercialization

Commercial packaging belongs after product-market validation.

Possible features:

- Paid plans
- Billing
- Subscription management
- Usage limits
- Enterprise workspaces
- SSO
- Audit logs
- Advanced exports

Stripe is explicitly out of scope until the project owner requests commercialization work.

## Near-Term Priority Order

1. Improve remaining content depth: thresholds, penalties, phase-ins and primary sources for non-marquee records.
2. Improve planning: horizontal timeline/swimlane, quarter precision and milestone grouping.
3. Improve exportability: CSV/JSON export and richer copyable briefs.
4. Improve usability: map legend, mobile layout, comparison fields and filters.
5. Improve maintainability: reusable data helpers, consistent taxonomy and living documentation.

## Non-Goals For The MVP

- Definitive legal applicability engine
- Legal opinion generation
- Tax advice or assurance advice
- Production-grade regulatory monitoring
- Customer accounts
- Paid subscriptions
- Mapbox or paid geospatial services
- Multi-tenant architecture
- Complex CMS
- Email alerts
- Scraping pipelines
