# ESG Regulatory Atlas

Interactive sustainability regulatory intelligence by jurisdiction, sector, value chain and reporting year.

ESG Regulatory Atlas is a static Next.js MVP for exploring ESG, climate, sustainable finance, supply chain due diligence, biodiversity, product sustainability and corporate reporting rules. It is designed for sustainability leaders, ESG consultants, legal and compliance teams, finance and controllership teams, investors, banks, insurers, procurement teams and board/risk committees.

## MVP scope

- Next.js, React, TypeScript and Tailwind v3
- Stable Tailwind/PostCSS v3 setup for Vercel deployment
- Interactive world map with no paid map API and no Mapbox token
- Jurisdiction profile panel
- Regulation detail drawer with sources, caveats, business impact and advisory opportunities
- Client applicability wizard with indicative categories
- Search and filters across jurisdiction, region, topic, sector, company type, value chain, function, obligation, status, year, confidence, data quality and advisory opportunity
- Saved quick views for consulting and compliance workflows
- Timeline, source library, coverage matrix, impact matrix and comparison views
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

- `data/jurisdictions.ts`
- `data/regulations.ts`
- `data/coverageAdditions.ts`
- `data/taxonomy.ts`

Shared types live in `types/regulation.ts`. Filtering and applicability logic live in `lib/filters.ts` and `lib/applicability.ts`.

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
- map coordinates where available
- regulatory intensity
- executive summary

Then reference the jurisdiction `id` from regulation records.

## Known limitations

- Seed data is illustrative and not legal advice.
- Source verification needs a production research workflow with named owners and review cadence.
- The regulatory overlay uses centroid labels, not production GIS polygons.
- External CARTO/OpenStreetMap basemap tiles are used for visual country borders.
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
