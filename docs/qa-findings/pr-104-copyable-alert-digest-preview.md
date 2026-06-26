# PR 104 QA Finding - Copyable Alert Digest Preview

Date: 2026-06-26

## Scope

Added copyable alert digest previews to the `/alerts` commercial-validation surface.

## Why It Was Needed

The alerts page showed useful weekly and monthly sample digests, but users could not easily reuse the sample structure in design-partner conversations, advisory scoping or manual outreach. A copyable preview makes the static premium-intelligence concept more tangible without adding email operations, monitoring automation or billing.

## Resolution

- Added `lib/alertDigestBrief.ts` to generate Markdown alert previews from existing static digest data.
- Added `Copy digest preview` to each alert digest card on `/alerts`.
- Included audience, jurisdictions, topics, sample items, source-quality labels, recommended actions, manual validation questions and caveats.
- Added smoke coverage for the digest copy control.

## Legal And Product Guardrail

The copied digest is framed as static commercial-validation material. It does not activate paid alerts, automated monitoring, email delivery, source verification, legal advice, official translation or entity-specific applicability determinations.

## Validation

Run before merge:

- `node node_modules/typescript/bin/tsc --noEmit`
- `npm run lint`
- `npm audit --omit=dev --cache /private/tmp/esg-atlas-npm-cache`
- `npm run build`
- `git diff --check`

GitHub Actions and Vercel remain the authoritative browser and deployment checks after publishing.
