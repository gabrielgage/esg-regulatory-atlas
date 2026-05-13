# PR 43 Release Context Sync

Date: 2026-05-13

## Finding

Recent small launch-train PRs shipped user-visible glossary, label interpretation and homepage handoff improvements faster than the release context was updated. The site and documentation still pointed to older May 2026 edition labels even though the product surface had moved forward.

## Root Cause

PRs #35 through #42 were intentionally narrow and focused on UX, smoke-test reliability and trust copy. They updated focused QA notes, but the public changelog and dataset edition metadata were not advanced after the glossary rollout. This is documentation and release-governance drift, not a runtime or Vercel deployment defect.

## Resolution

- Bumped `DATASET_META.edition` to `0.5.27 - May 2026`.
- Added `data/changelogRecent.ts` for recent release entries without rewriting the long historical changelog file.
- Updated `/changelog` to render the recent supplement ahead of the historical `CHANGELOG` array.
- Documented the release-context drift as a QA learning for future heartbeat-driven launch-train work.

## Prevention Rule

When multiple small PRs ship in quick succession, run a release-context sync before starting the next feature round. If a PR changes a user-visible route, navigation item, glossary, assessment output, source-governance surface, legal wording or release-critical smoke test, either update the public changelog/edition metadata in that PR or add an explicit follow-up release-sync task.

## Guardrails

This update is static and documentation-oriented. It does not add Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, production email automation, AI legal summaries, external databases or required environment variables.

## Validation Plan

GitHub CI and Vercel should validate TypeScript, build, smoke tests and Lighthouse for the branch. The main product logic, regulation records, source links, applicability scoring and map rendering were not changed.
