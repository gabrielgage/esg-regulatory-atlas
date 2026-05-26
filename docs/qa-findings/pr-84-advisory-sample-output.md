# PR 84 QA Finding - Advisory Sample Output

## Finding

The Advisory page described exposure scans, watchlists and briefings, but users still had to infer what an advisory-supported output might actually look like.

## Risk

Without a concrete example, advisory CTAs can feel abstract and users may not understand the difference between the free Atlas, static premium previews and a manual advisory scan.

## Resolution

- Added `data/advisorySampleOutputs.ts` with a structured supplier/exporter exposure scan example.
- Added `components/AdvisorySampleOutput.tsx` with copyable Markdown output.
- Added the sample to `/advisory` with priority records, facts to confirm, evidence package, first actions, source-review notes and legal caveats.
- Added smoke coverage for the sample output.

## Prevention Rule

Advisory proof points should be concrete, copyable and caveated. Keep them static and manual during the MVP; do not imply legal advice, official source verification, automated delivery, subscriptions, accounts or definitive applicability determinations.
