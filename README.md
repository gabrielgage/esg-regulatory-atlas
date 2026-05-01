# Etica ESG · Regulatory Atlas

Interactive sustainability regulatory intelligence by jurisdiction, sector, value chain and reporting year.

Etica ESG · Regulatory Atlas is a static Next.js MVP for exploring ESG, climate, sustainable finance, supply chain due diligence, biodiversity, product sustainability and corporate reporting rules. It is designed for sustainability leaders, ESG consultants, legal and compliance teams, finance and controllership teams, investors, banks, insurers, procurement teams and board/risk committees.

Publisher: Etica ESG. Editor: Gabriel Gage. Contact: `gabriel@eticaesg.com`.

## MVP scope

- Next.js, React, TypeScript and Tailwind v3
- Stable Tailwind/PostCSS v3 setup for Vercel deployment
- Production build uses the stable Next.js webpack build path for this MVP
- Static Natural Earth choropleth map with no paid map API and no Mapbox token
- Jurisdiction profile panel
- Regulation detail drawer and `/regulations/[slug]` pages with sources, caveats, business impact and advisory opportunities
- Public changelog at `/changelog`
- Jurisdiction and regulation comparison workspace at `/compare`
- Printable/copyable jurisdiction briefs at `/jurisdiction/[code]/brief`
- Client applicability wizard with indicative categories
- Persona doorway presets for CSO, SME supplier lead, in-house legal and external advisor use cases
- Search and filters across jurisdiction, region, topic, sector, company type, value chain, function, obligation, status, year, confidence, data quality and advisory opportunity
- Saved quick views for consulting and compliance workflows
- Timeline, methodology/source library, coverage matrix, impact matrix and comparison views
- Dedicated Data Quality page for source coverage and review risk
- Citation widget on regulation detail pages with APA-style, legal research note and BibTeX copy blocks
- Edition snapshot route at `/edition/0.5/regulations/[slug]`
- Branded 404 page and ISSB redirect aliases
- Light/dark mode toggle with local preference persistence
- Copyable client planning summary
- Static TypeScript seed data only
- No authentication, database, Supabase, Stripe, scraping, cron jobs, AI summaries, email alerts or required environment variables

## Important disclaimer

This tool provides structured regulatory intelligence for orientation and planning purposes. It does not constitute legal advice, tax advice, investment advice or assurance advice. Applicability depends on entity-specific facts, jurisdictional transposition, sector rules, thresholds and legal interpretation. Users should validate requirements with qualified counsel or regulatory advisors before relying on the information for compliance decisions.

All records are illustrative seed data unless independently verified through a production research workflow.

## Local setup

```bash
npm install
npm run dev
npm run lint
npm run build
```

Open `http://localhost:3000`.

## Deployment

Deploy on Vercel with the default Next.js settings. The MVP does not require environment variables.

If a deployed URL shows `401 Unauthorized`, check Vercel Project Settings -> Deployment Protection. For client demos, production should usually be public while preview deployments can remain protected.

Do not add app-level authentication to solve a Vercel dashboard protection setting.

## Tailwind/PostCSS strategy

This project intentionally uses the stable Tailwind v3 path:

- `tailwindcss ^3.4.17`
- `postcss ^8.5.10`
- `autoprefixer ^10.4.20`
- `postcss.config.mjs` uses `tailwindcss` and `autoprefixer`
- `app/globals.css` starts with `@tailwind base`, `@tailwind components`, `@tailwind utilities`

The original deployment failure was caused by an inconsistent Tailwind/PostCSS setup where Tailwind was being loaded as a PostCSS plugin in a way incompatible with the installed Tailwind version. The MVP keeps one consistent v3 configuration.

## Data structure

Seed data is stored in:

- `data/_meta.ts`
- `data/changelog.ts`
- `data/sectors.ts`
- `data/jurisdictions.ts`
- `data/regulations.ts`
- `data/coverageAdditions.ts`
- `data/taxonomy.ts`

Shared types live in `types/regulation.ts`. Filtering and applicability logic live in `lib/filters.ts` and `lib/applicability.ts`.

## Project guidance

Use these files to brief future coding agents, reviewers and collaborators:

- `AGENTS.md`: repo-specific operating instructions for Codex, Claude and future agents
- `ESG_Regulatory_Atlas_Claude_Handoff.md`: implementation handoff and current technical context
- `docs/product-brief.md`: product purpose, users, workflow and success criteria
- `docs/roadmap.md`: phase boundaries and recommended next improvements
- `docs/data-methodology.md`: seed data structure, source hierarchy and review workflow
- `docs/legal-safeguards.md`: approved legal wording, disclaimers and caution rules
- `docs/regulatory-taxonomy.md`: canonical topics, sectors, value chain labels and statuses
- `docs/development-workflow.md`: working process, validation steps and documentation update rules

## Current edition

The current seed dataset edition is `0.5 - May 2026`.

This edition focuses on the Etica rebrand and credibility improvements from the v4 review:

- rebranded global identity to Etica ESG with temporary SVG logo, favicon and social image
- updated dataset metadata with Etica publisher, editor, contact email and LinkedIn fields
- added dark/light mode toggle in the global header
- simplified the primary navigation to Map, Regulations, Assessment, Timeline, Briefing and Data Quality
- restored `/data-quality` as a real governance page rather than a redirect
- added branded not-found route and redirect aliases for common ISSB URLs
- added citation copy blocks and edition snapshot routes for regulation pages
- expanded `/compare` so it supports both jurisdiction pairs and regulation record IDs
- added persona doorway presets and safer assessment wording
- grouped advanced filters into geography, regulatory shape and business framing
- replaced generic threshold placeholders on marquee EU records with source-linked scope notes
- removed generic penalty placeholders from regulation detail pages
- updated EU records for CSRD, ESRS, EU Taxonomy, SFDR, CSDDD, CBAM, EUDR, ESPR, Batteries and Forced Labour
- changed the map aggregation so national counts are not inflated by parent EU records
- added public changelog, comparison, jurisdiction brief and sector heatmap surfaces
- added favicon and mobile map fallback list

## Agent workflow rule

When making meaningful updates, keep the context files current. Future Codex or Claude runs should not need to rediscover product state, build strategy, data methodology, legal wording or shipped routes from scratch.

The shortest rule is: if a change affects how the product works, how it is validated, how data is structured, or how legal risk is managed, update the relevant documentation in the same pass.

## Adding a regulation

Add a typed record to `data/regulations.ts` or `data/coverageAdditions.ts`.

At minimum include:

- `id`, `title`, `shortName`
- jurisdiction fields and `jurisdictionIds`
- issuing body, status and adoption level
- topics, sectors, value chain coverage and affected functions
- summary, applicability, key requirements and business impact
- business impact tags
- advisory opportunities
- source URLs
- latest update, last reviewed, confidence and data quality status
- caveats if the record has uncertainty

Use careful language such as "may apply", "potentially relevant" and "indicative" rather than definitive legal conclusions.

## Adding a jurisdiction

Add a record to `data/jurisdictions.ts` with:

- `id`, `name`, region and type
- canonical `code` for UI display, such as `USA`, `CAN`, `EUU` or `USA-CA`
- map coordinates where available
- regulatory intensity
- executive summary

Then reference the jurisdiction `id` from regulation records.

## Known limitations

- Seed data is illustrative and not legal advice.
- Source verification needs a production research workflow with named owners and review cadence.
- The world map uses simplified Natural Earth polygons suitable for MVP choropleth display, not production GIS analysis.
- No authentication yet.
- No database yet.
- No automated regulatory update monitoring yet.
- No email alerts yet.
- No payment integration yet.
- No legal opinion or definitive applicability determination.

## Phase 2 roadmap

Do not implement these in the MVP without an explicit follow-up decision:

- Supabase or another database
- Admin editing interface
- Authentication and client workspaces
- Regulatory monitoring workflow
- Source review and legal review workflow
- Email alerts
- AI-generated summaries
- PDF export
- Stripe paid plans
