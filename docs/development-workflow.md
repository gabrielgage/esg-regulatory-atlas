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

## Context Files To Read First

For product or UX work:

- `README.md`
- `docs/product-brief.md`
- `docs/roadmap.md`
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
- The app requires no environment variables.
- The map uses local static assets and no paid map provider.
- Pull requests should include a Vercel preview link and note whether the Map, Regulations, language toggle and detail route were checked.
- The project intentionally avoids Stripe, Supabase, authentication, paid APIs, scraping, cron jobs, email alerts and production AI summaries.
- Local dev servers may be blocked in some Codex sandboxes by port-binding restrictions; do not treat that as an app failure if production build passes.
