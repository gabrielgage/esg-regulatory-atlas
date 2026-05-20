# PR 56 QA Finding - Daily Launch Pulse

## Finding

The launch train is moving quickly, but recent release context was split between changelog entries, current-release notes and Data Quality review surfaces.

## Risk

Future reviewers or agents could miss the latest shipping context, validation expectations or next product-review focus, especially when several small hardening PRs ship close together.

## Resolution

Added `data/dailyUpdates.ts` and `components/DailyUpdatePulse.tsx`, then surfaced the same compact daily pulse on `/changelog` and the Data Quality overview.

During validation, `npm audit --omit=dev` also flagged a high-severity Next.js production dependency advisory. The release patches Next.js to `^16.2.6`, refreshes the package lock and documents the root cause in `docs/issue-resolution-log.md`.

PR CI then caught that the compact Data Quality variant hid the Next focus column. The component now keeps Shipped, Validation and Next focus visible in both standard and compact layouts.

## Guardrail

The daily pulse is static editorial release context. It does not create automated monitoring, email alerts, a database, accounts, payment infrastructure, official translations, source verification or legal advice.

## Validation

- Smoke coverage checks the daily pulse on `/changelog`.
- Smoke coverage checks the daily pulse on `/data-quality`.
- Production dependency audit passes with dev dependencies omitted.
