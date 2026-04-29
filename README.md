# ESG Regulatory Atlas

Interactive sustainability and ESG regulatory tracker MVP.

## What is included

- Next.js, React, TypeScript and Tailwind app
- Interactive world map using react-simple-maps
- Searchable regulation database
- Country profile side panel
- Regulation detail panel
- Filters by topic, sector and status
- Realistic illustrative seed data for CSRD, EU Taxonomy, SFDR, CSDDD, ISSB, UK SDR, California climate laws and Dutch nitrogen rules
- Data quality fields including source URLs, last reviewed date and confidence level

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to Vercel and create a new project.
3. Import the GitHub repository.
4. Keep the default Next.js settings.
5. Click Deploy.

## Upgrade path to Supabase

Create tables for:

- jurisdictions
- regulations
- regulation_jurisdictions
- topics
- regulation_topics
- sectors
- regulation_sectors
- updates
- sources

Move the records in `data/seed.ts` into Supabase and replace the local import in `app/page.tsx` with a server side Supabase query.

## Important disclaimer

The seed data is illustrative and not legal advice. Before using this as a client facing or commercial product, verify every record against primary regulatory sources and establish an owner, review frequency and change log.
