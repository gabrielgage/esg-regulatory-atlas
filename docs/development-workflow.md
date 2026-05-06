# Development Workflow

This workflow keeps Etica ESG · Regulatory Atlas easy to improve across Codex, Claude, VS Code, GitHub and Vercel.

## Working Model

Use Codex for implementation and debugging, VS Code for review and file visibility, GitHub for pull requests, and Vercel for deployment validation.

The preferred loop is:

1. Read the current request and relevant context files.
2. Inspect the code before changing it.
3. Make scoped changes in the appropriate layer.
4. Keep regulatory data in `data/`, shared logic in `lib/`, shared types in `types/`, and UI in `components/` or `app/`.
5. Validate locally with TypeScript and production build.
6. Update context files when the change affects future work.
7. Summarize exactly what changed, why it changed, and what still needs review.

## Bug And Failed Check Workflow

Any time a bug, failed GitHub check, failed Vercel deployment, visible UI defect or data issue appears, follow this workflow:

1. Capture the exact symptom, including the route, screenshot, check name, job name or log message.
2. Determine what failed: app code, deployment, test, Lighthouse, data, configuration or platform setting.
3. Inspect the source evidence before changing code.
4. Fix the smallest layer responsible for the issue.
5. Validate with the closest available local or remote check.
6. Document the incident in `docs/issue-resolution-log.md`.
7. Update this workflow, `AGENTS.md`, README or handoff docs if the learning changes how future work should be done.

Do not treat a successful Vercel deployment plus failing GitHub checks as a deployment failure. In that case, inspect the failing GitHub Actions logs first.

Do not weaken checks just to make a PR green. If a check is brittle or configured at the wrong strictness for the MVP, fix the check configuration and explain why in the issue log.

## Context Files To Read First

For product or UX work:

- `README.md`
- `docs/product-brief.md`
- `docs/roadmap.md`
- `docs/product-improvement-backlog.md`
- `ESG_Regulatory_Atlas_Claude_Handoff.md`

For data or regulatory content work:

- `docs/data-methodology.md`
- `docs/legal-safeguards.md`
- `docs/regulatory-taxonomy.md`
- `data/_meta.ts`
- `types/regulation.ts`

For agent or process work:

- `AGENTS.md`
- `docs/development-workflow.md`
- `docs/issue-resolution-log.md`
- `ESG_Regulatory_Atlas_Claude_Handoff.md`

## Validation Commands

Use:

```bash
npm run lint
npm run build
npm run test:e2e
npm run lhci
```

Current `npm run build` uses:

```bash
next build --webpack
```

This is intentional for the MVP because the verified webpack path avoids local Turbopack sandbox port-binding failures and gives a stable Vercel-compatible production build.

If `npm` is unavailable in the Codex shell, use the bundled Node runtime against local package entry points, or document why validation could not run.

GitHub should now run four high-ROI launch checks:

- CI typecheck and production build on pull requests and pushes to `main`
- Playwright smoke tests against the built app
- Lighthouse CI on key public routes
- Pull request preview checklist requiring Vercel preview review before merge

The local Codex sandbox may not have `npm` or Playwright browser binaries available. In that case, run TypeScript and production build with the bundled Node runtime, then rely on GitHub Actions/Vercel for browser and Lighthouse validation after pushing.

Run `next build` and standalone `tsc --noEmit` sequentially, not in parallel. Next.js regenerates `.next/types` during production builds; a simultaneous TypeScript process can briefly see missing generated route files and report false `TS6053` errors.

## Documentation Update Rule

After meaningful changes, update the smallest set of context files needed to keep the repo understandable.

Examples:

- New route: update `README.md`, `ESG_Regulatory_Atlas_Claude_Handoff.md`, and possibly `docs/product-brief.md`.
- New data field: update `types/regulation.ts`, `docs/data-methodology.md`, and any affected UI docs.
- New taxonomy label: update `data/taxonomy.ts`, `docs/regulatory-taxonomy.md`, and filters if needed.
- New legal wording or assessment category: update `docs/legal-safeguards.md`.
- Delivered roadmap item: update `docs/roadmap.md`.
- New validation limitation or build strategy: update `README.md`, `AGENTS.md`, and this file.
- New automation or review workflow: update `README.md`, `.github/pull_request_template.md` where relevant, and this file.
- Bug, failed deployment or failed check: update `docs/issue-resolution-log.md`, then update adjacent docs if the learning affects future workflow.

## Commercial Surface Checklist

When changing `/plans`, `/alerts`, `/advisory`, `/premium-roadmap`, `/premium-packs/[id]`, `/launch`, commercial CTAs or launch assets, confirm:

- The page is static and deployable without required environment variables.
- No Stripe, checkout, billing SDK, subscription, authentication, database, production email backend, scraping, cron job or paid API was added.
- CTAs use mailto or static links only.
- Copy distinguishes Free Atlas, Premium Intelligence preview, Advisory Atlas and Enterprise/API future.
- Alert previews do not imply production monitoring is live.
- Advisory copy avoids definitive legal applicability language.
- Commercial data files are treated as product/go-to-market data, not legal source authority.
- Manual conversion tracking stays no-dependency unless analytics, CRM, database or email infrastructure is explicitly approved.
- Copyable launch assets preserve caveats when copied into email, LinkedIn or sales-one-pager contexts.
- README, product brief, roadmap, legal safeguards and handoff docs are updated.

When changing content review queues or Marquee launch governance:

- Treat the queue as editorial/source-governance support, not legal verification.
- Confirm launch-blocker labels do not imply complete legal coverage.
- Check that premium-use labels map to static previews or advisory workflows only.
- Keep owner placeholders and next actions operational, not legal conclusions.
- Source freshness labels should mean review priority, not source verification.
- Update `docs/data-methodology.md`, `docs/legal-safeguards.md`, `docs/roadmap.md` and the handoff.

When changing assessment or decision-readiness output:

- Preserve cautious categories such as potentially relevant, facts to confirm and source to verify.
- Do not add definitive applicability language or compliance instructions.
- Ensure copied summaries keep legal caveats and source-review warnings.
- Update smoke tests when new decision prompts become launch-critical.

When changing source evidence or source-governance output:

- Use `lib/sourceGovernance.ts` for source posture, review packet and copyable source memo logic.
- Use `lib/reviewWorkflow.ts` for Data Quality review rows, priority scoring, CSV/JSON exports and copyable priority packets.
- Keep source evidence panels as governance and QA aids, not legal verification.
- Preserve source links, last-reviewed date, next-review date, confidence, data quality and caveats in copied memos.
- Preserve caveats in exported review trackers and copied priority packets when moving them into Notion, spreadsheets or advisory prep.
- Do not imply that a source has been officially translated, fully reviewed or certified for client reliance.
- Update `docs/data-methodology.md`, `docs/legal-safeguards.md`, `docs/roadmap.md`, README and handoff docs when the source workflow changes.

## CI Lessons Learned

The current browser and Lighthouse checks are intended to protect launch-critical behavior without making the MVP impossible to iterate.

Known lesson from PR #11:

- Browser smoke tests should assert stable UI contracts with scoped locators. For regulation detail pages, assert the short-name heading and scoped supporting title text rather than assuming the full regulation title is the H1.
- Citation widgets repeat regulation titles inside copy blocks. Avoid broad text locators where repeated content is expected.
- Assessment and workspace pages often repeat feature labels in hero/helper copy. Prefer exact labels, roles or scoped locators for smoke tests so repeated explanatory text does not create strict-mode failures.
- Lighthouse category thresholds are warning-level launch signals. Do not use the full `lighthouse:recommended` assertion preset as a hard gate unless the team intentionally accepts every default audit as blocking.
- Do not run standalone TypeScript checks in parallel with `next build` while `.next/types/**/*.ts` is included in `tsconfig.json`; run build first, then rerun TypeScript if needed.

## Coding Principles

- Prefer local patterns over new abstractions.
- Keep static MVP constraints unless the owner explicitly changes phase.
- Keep regulatory records out of UI components.
- Avoid duplicate labels in taxonomy and filters.
- Avoid generic placeholders in client-visible regulatory details.
- Show source links, caveats, last-reviewed dates and confidence indicators where regulatory claims appear.
- Make copy/export text legally cautious.

## Current Build Notes

- Tailwind uses v3 configuration.
- Tailwind dark mode uses class strategy and `components/ThemeToggle.tsx` stores the `etica-theme` preference in local storage.
- Theme behavior should default first-time visitors to light mode, then respect the user's saved explicit light/dark selection.
- The app requires no environment variables.
- The map uses local static assets and no paid map provider.
- Map changes should preserve local Natural Earth geometry, visible country outlines from tablet widths upward, keyboard-selectable tracked countries and a clear geometry fallback.
- Coverage-depth changes should update `data/coverageTargets.ts`, keep direct-record target checks passing and mark new market records as seed intelligence unless a production source review has verified them.
- Sector-starting-point changes should use `lib/sectorProfile.ts` and existing regulation sector tags instead of hardcoding regulatory content in route components. Preserve the caveat that sector pages are current tracked coverage, not complete sector legal inventories.
- Persona preset changes should update `data/personaPresets.ts`, preserve `?persona=` URL behavior on `/regulations`, and clear the active role lens when a user manually changes filters.
- Pull requests should include a Vercel preview link and note whether the Map, Regulations, language toggle and detail route were checked.
- The project intentionally avoids Stripe, Supabase, authentication, paid APIs, scraping, cron jobs, email alerts and production AI summaries.
- Local dev servers may be blocked in some Codex sandboxes by port-binding restrictions; do not treat that as an app failure if production build passes.
