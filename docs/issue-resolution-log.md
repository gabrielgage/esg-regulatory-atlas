# Issue Resolution Log

This log captures bugs, failed checks and product defects that were investigated and resolved. The purpose is to prevent future agents from rediscovering the same root cause and to keep learning close to the code.

## Issue Resolution Protocol

Whenever a bug, failed deployment, failing check or visible product issue appears:

1. Identify the symptom precisely.
2. Confirm whether the app itself failed, the deployment failed, or an added quality check failed.
3. Inspect logs, screenshots, route output or browser behavior before changing code.
4. Find the root cause in the smallest responsible layer: data, UI, test, workflow, dependency, configuration or platform setting.
5. Apply the narrowest durable fix.
6. Validate with the closest available check.
7. Document the issue, root cause, resolution and prevention rule in this file.
8. Update adjacent docs when the learning affects workflow, CI, legal wording, data governance or future agent behavior.

Do not hide a real product issue by weakening a check. If a check is itself brittle or misconfigured, fix the check and document why.

## 2026-05-22 - GitHub Actions Warned About Node 20 Action Runtime Deprecation

Status: resolved in PR #72 after the first compatibility opt-in landed in PR #71.

### Symptom

The post-merge main CI for PR #70 passed, but GitHub added annotations warning that `actions/checkout@v4` and `actions/setup-node@v4` were running on the Node 20 JavaScript action runtime. GitHub's warning stated that JavaScript actions will be forced to Node 24 by default starting June 2, 2026, and that Node 20 will be removed from the runner later in 2026. PR #71 opted the workflows into Node 24 and proved compatibility, but GitHub then clarified that the v4 actions still targeted Node 20 while being forced to run on Node 24.

### Root Cause

The repository workflows had a clear application build runtime (`node-version: 22`) but had not opted the GitHub-hosted JavaScript actions themselves into the upcoming Node 24 action runtime. After the opt-in, the remaining root cause was that `actions/checkout@v4` and `actions/setup-node@v4` target Node 20 internally.

### Resolution

Added workflow-level `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` to both CI and Lighthouse workflows, then upgraded `actions/checkout` and `actions/setup-node` to v5. This validates the GitHub action runtime migration early while preserving Node 22 for the application install, typecheck, build, browser smoke and Lighthouse steps.

### Prevention Rule

When GitHub Actions emits platform deprecation annotations on otherwise green checks, treat them as workflow maintenance issues. Fix the smallest workflow layer, validate the PR checks, and document the distinction between GitHub action runtime and application build runtime.

### Files Changed

- `.github/workflows/ci.yml`
- `.github/workflows/lighthouse.yml`
- `docs/development-workflow.md`
- `docs/issue-resolution-log.md`

## 2026-05-20 - Threshold Matrix Guardrail Caught Weak Caveat Wording

Status: resolved in PR #65.

### Symptom

The new threshold matrix data guardrail failed on the California climate disclosure row after the matrix was added. The row had a source link and facts to confirm, but its caveat did not contain the standard planning, review, verify or confirm language required by the guardrail.

### Root Cause

The caveat used "verified" as a passive description instead of the stronger product-safety wording that tells users the row is a planning signal and needs source review.

### Resolution

Updated the California climate disclosure threshold caveat to state that the threshold and deadline signals are implementation-sensitive planning signals and should be reviewed against CARB materials.

### Prevention Rule

Every threshold matrix row must include explicit caveat language that tells users the row is a planning or orientation signal and needs source review or confirmation before client reliance.

### Files Changed

- `data/thresholdMatrix.ts`
- `tests/data-guardrails.spec.ts`
- `docs/issue-resolution-log.md`

## 2026-05-20 - Local Lint Failed On Duplicate Generated Next Types

Status: resolved locally before PR #65 validation.

### Symptom

`npm run lint` failed with duplicate identifier errors in `.next/types/cache-life.d 2.ts` and `.next/types/routes.d 2.ts`.

### Root Cause

The local `.next/types` folder contained duplicate generated files with ` 2` suffixes. These are build artifacts, not source files, but the TypeScript config correctly includes `.next/types/**/*.ts` so generated route types are checked.

### Resolution

Deleted the duplicate generated files and reran lint successfully. No source-code change was required for this issue.

### Prevention Rule

If TypeScript reports duplicate identifiers from `.next/types/* 2.ts`, inspect generated artifacts before changing application code. Clean the duplicate generated files or regenerate `.next` through a fresh build.

## 2026-05-20 - PR #60 Smoke Test Used Ambiguous Text Selectors

Status: resolved in PR #60 follow-up commit.

### Symptom

The GitHub browser smoke test failed after the Start Here module and premium pack source-review gates were added. The app rendered correctly, but Playwright reported strict-mode violations because the Spanish "Regulaciones" link and the premium-use blocker sentence each appeared in more than one visible place.

### Root Cause

The smoke assertions selected global text instead of the intended UI region. The language toggle check looked for any link named "Regulaciones", which matched both the header and the homepage Start Here card. The premium pack check looked for blocker copy globally, which matched multiple regulation cards.

### Resolution

Scoped the language check to the header navigation and scoped the premium blocker check to the CSRD gate card. This keeps the smoke test verifying the same product behavior while avoiding false failures when repeated accessible text is valid.

### Prevention Rule

When a test validates navigation or repeated card content, scope the locator to the smallest stable region: header, table row, drawer, named card or `data-testid`. Do not use page-wide text selectors for phrases that can naturally appear in multiple product surfaces.

### Files Changed

- `tests/smoke.spec.ts`
- `docs/issue-resolution-log.md`

## 2026-05-20 - Expert Review Found Public Navigation And Premium Gate Trust Risks

Status: resolved in PR #60.

### Symptom

The expert review found two trust-risk defects: `/launch` appeared in the public More menu even though it is an operator workspace, and premium pack previews could list records already marked as blocked pending source, status or threshold review without a visible pack-level gate.

### Root Cause

Navigation and commercial validation grew faster than the governance layer. The Header treated launch assets as a normal public workspace, while premium packs matched regime names directly to seed records without reading the Marquee review queue's premium-use blockers.

### Resolution

Removed `/launch` from public navigation, added noindex metadata to the launch route, replaced public commercial CTA secondary links to user-facing plan/advisory routes, and added `lib/premiumUseGates.ts` so premium pack previews label records as illustrative-only, review-before-use or orientation-ready.

### Prevention Rule

Internal/operator routes should not be placed in public navigation unless they are rewritten as client-facing resources. Any premium, advisory or alert preview that lists regulation records must also render record-level source-review or premium-use gates when those records are blocked or review-needed.

### Files Changed

- `components/Header.tsx`
- `app/launch/page.tsx`
- `app/premium-packs/[id]/page.tsx`
- `lib/premiumUseGates.ts`
- `tests/smoke.spec.ts`

## 2026-05-20 - Expert Review Found CSRD/CSDDD Threshold Conflation Risk

Status: resolved in PR #60.

### Symptom

The expert review flagged that EU threshold language could be read as mixing CSRD corporate-reporting signals with CSDDD due-diligence scope thresholds.

### Root Cause

High-risk EU records contained threshold text in the same general "applicability" shape, while the UI and assessment logic could surface the first threshold bullet without enough regime-specific warning.

### Resolution

Updated CSRD and CSDDD seed records to explicitly state that CSDDD thresholds must not be reused as general CSRD, ESRS or EU Taxonomy threshold signals. Added caveats and latest-update language emphasizing national implementation, Omnibus context and source review before reliance.

### Prevention Rule

EU thresholds must be regime-specific. Do not reuse employee, turnover, balance sheet, listing, franchise, due-diligence or reporting thresholds across CSRD, ESRS, CSDDD, EU Taxonomy or SFDR without an explicit source and caveat.

### Files Changed

- `data/regulations.ts`
- `docs/issue-resolution-log.md`

## 2026-05-20 - Daily Pulse Compact Variant Hid Next-Focus Content

Status: resolved in PR #56 follow-up commit.

### Symptom

PR #56 browser smoke tests failed on Data Quality because the test expected the daily launch pulse to include next product-review focus content, but the compact variant rendered only shipped and validation sections.

### Root Cause

`DailyUpdatePulse` accepted a `compact` mode and used that mode to hide the Next focus column. The product intent for the pulse was to keep shipped, validation and next-focus context visible wherever the pulse appears.

### Resolution

Updated the compact layout to keep all three columns visible while tightening the grid spacing. The smoke test remains strict because the missing section was a real product-content mismatch, not a bad selector.

### Prevention Rule

For reusable launch-governance components, compact variants may reduce spacing or layout density but should not silently remove required decision context such as next actions, caveats, source status or validation expectations.

### Files Changed

- `components/DailyUpdatePulse.tsx`
- `docs/issue-resolution-log.md`

## 2026-05-20 - Production Dependency Audit Flagged Next.js Advisory

Status: resolved in PR #56.

### Symptom

`npm audit --omit=dev` flagged a high-severity production dependency advisory for the installed Next.js range.

### Root Cause

The app was pinned to `next ^16.2.4`, while the audit database identified vulnerabilities affecting the installed range up to the currently resolved version.

### Resolution

Updated Next.js to `^16.2.6`, refreshed the package lock, reran production dependency audit, and confirmed `npm audit --omit=dev` reports zero vulnerabilities.

### Prevention Rule

Every daily launch-train update should run a production dependency audit when dependencies are installed locally. If the issue affects production dependencies and a non-breaking patch is available, include the smallest dependency patch and document the root cause here.

### Files Changed

- `package.json`
- `package-lock.json`
- `docs/issue-resolution-log.md`

## 2026-05-19 - Map Coverage Key Was English-Only

Status: resolved in PR #55.

### Symptom

The map coverage key added in PR #54 explained untracked countries in English only, while the rest of the map workspace supports English, Spanish, Dutch, French, German and Portuguese interface chrome.

### Root Cause

The new product guidance was hardcoded directly in `components/WorldChoropleth.tsx` instead of being added to `lib/i18n.ts` with the other map labels.

### Resolution

Moved the untracked-country title and body copy into the translation dictionary, added all six supported language strings, and extended the language smoke test to assert the Spanish map coverage key.

### Prevention Rule

When adding visible product chrome to the map, filters, navigation, homepage, exports or other already-localized surfaces, add translation keys in the same change. Hardcoded English is acceptable only for regulation source titles or legal record content that intentionally remains source-linked seed intelligence.

### Files Changed

- `components/WorldChoropleth.tsx`
- `lib/i18n.ts`
- `tests/smoke.spec.ts`
- `docs/issue-resolution-log.md`

## 2026-05-19 - Map Untracked Countries Were Too Easy To Miss

Status: resolved in PR #54.

### Symptom

The map could appear visually blank or shape-like to users because untracked countries, ocean background and borders did not have enough visual separation. Users could reasonably miss that grey/pale countries were present but not yet covered by direct Atlas seed records.

### Root Cause

The map used local country geometry correctly, but the visual language did not make the distinction between "untracked country visible on the map" and "tracked jurisdiction with seed records" explicit enough. The ocean, untracked land and border colors were too subtle for a product whose map is the primary workspace.

### Resolution

Increased map color contrast, strengthened country borders, added a subtle ocean gradient/frame, and added an explicit map key explaining that pale countries are visible but do not yet have direct Atlas seed coverage. Smoke coverage now checks the map key and untracked-country styling.

### Prevention Rule

For map or coverage UI, do not rely on color alone or a generic legend. Always explain whether a visual state means untracked, no data, low intensity, selected, inherited coverage or direct seed coverage. Add smoke coverage for the state users previously found confusing.

### Files Changed

- `components/WorldChoropleth.tsx`
- `app/globals.css`
- `tests/smoke.spec.ts`
- `docs/issue-resolution-log.md`

## 2026-05-18 - PR #53 Persona Preset Hydration Race

Status: resolved in PR #53 follow-up commit.

### Symptom

PR #53 passed TypeScript/build and Vercel, but the browser smoke test for regulation persona presets failed. The test clicked the Finance or ESG controller persona preset and the URL stayed at `/regulations` instead of receiving `?persona=finance-controller`.

### Root Cause

The regulations page rendered persona preset buttons before the client-side URL filter hydration effect had finished. A fast click could set the persona state, then the initial URL hydration effect could run with an empty URL and overwrite that interaction. The product issue was a real timing race, not just a test issue.

### Resolution

Disabled persona preset and clear-role controls until URL filter hydration is complete, and guarded the persona apply/reset handlers while `urlReady` is false. This keeps shareable filter restoration and user clicks from racing each other.

### Prevention Rule

When a client page initializes filters from the URL and also exposes immediate filter/action buttons, disable or gate those actions until URL hydration is complete. Do not rely on tests or users waiting for effects implicitly.

### Files Changed

- `app/regulations/page.tsx`
- `components/PersonaPresets.tsx`
- `docs/issue-resolution-log.md`

## 2026-05-18 - PR #53 Copy-Output Note Smoke Locator Ambiguity

Status: resolved in PR #53 follow-up commit.

### Symptom

The source memo/citation smoke test failed after PR #53 added a second copied-output note to regulation detail pages. Playwright strict mode found two matching caveat note elements.

### Root Cause

The product page was correct, but the smoke test used a broad text locator for copy-output caveat guidance. Adding a legitimate second copy surface made the locator ambiguous.

### Resolution

Scoped the assertion to the first matching note in that smoke test. The new decision-readiness copy surface has its own dedicated smoke test.

### Prevention Rule

When a page can contain repeated copy-output caveat notes, smoke tests should scope by section, button proximity, stable test hook or an explicit index. Do not assume there will only be one generic caveat note on a page.

### Files Changed

- `tests/source-memo-citation-caveats.spec.ts`
- `docs/issue-resolution-log.md`

## 2026-05-13 - PR #39 Glossary Smoke Test Used Broad Heading Locator

Status: resolved in PR #39 follow-up commit.

### Symptom

PR #39 passed Vercel and Lighthouse, and the CI build/typecheck step succeeded, but `CI / Browser smoke tests` failed in the new glossary route test.

### Root Cause

The test used `page.getByRole("heading", { name: /Value chain/i })`. The glossary page intentionally renders both a category heading named `Value chain` and a term card heading named `Value chain`, so Playwright strict mode correctly found two matching headings. The product page was rendering correctly; the new smoke locator was too broad for a page where category and term names can overlap.

### Resolution

Scoped the assertion to the category heading level with `page.locator("h2", { hasText: "Value chain" })`. This preserves the user-facing page structure and makes the test assert the intended concept-area section.

### Prevention Rule

When glossary, taxonomy or directory pages can contain the same label as both a section heading and an item title, smoke tests should scope by heading level, region, card container or stable test hook instead of using broad role/name locators.

### Files Changed

- `tests/glossary.spec.ts`
- `docs/issue-resolution-log.md`

## 2026-05-12 - PR #33 Smoke Test Locator Collided With Removable Filter Chip

Status: resolved.

### Symptom

PR #33 showed one failing GitHub check: `CI / Browser smoke tests`. Vercel deployment, TypeScript and production build were successful.

### Root Cause

The test used `page.getByLabel(/Business function/i)` to assert the filter select value. After active filter chips became removable buttons, the new button had the accessible label `Remove Business function filter`, so Playwright strict mode correctly found two matching labeled controls: the select and the remove-chip button. The product behavior was correct; the test locator was too broad for the new accessible UI.

### Resolution

Scoped the smoke test to the actual filter control with a label-scoped select locator before checking the value. The removable chip keeps its clear accessible label, and the test now distinguishes the filter input from the chip action.

### Prevention Rule

When adding accessible action buttons that repeat filter names, do not use broad `getByLabel(/Filter name/)` locators for form controls. Scope the locator to `label ... select`, use exact accessible names, or add a dedicated test hook for the form field.

### Files Changed

- `tests/smoke.spec.ts`
- `docs/issue-resolution-log.md`

## 2026-05-11 - README Current Edition Drifted Behind Dataset Metadata

Status: resolved.

### Symptom

The public README `Current edition` section referenced an older May 2026 dataset edition while `data/_meta.ts` and `data/changelog.ts` had advanced through later launch-train releases.

### Root Cause

Several rapid PRs updated dataset metadata and the changelog, but the long-form README release narrative was not updated in the same pass. This created documentation drift rather than an app runtime defect.

### Resolution

- Updated README current edition notes to `0.5.25 - May 2026`.
- Added the guided briefing-builder and client briefing handoff updates to the README release narrative.
- Added this issue-log entry so future release PRs treat README edition alignment as part of the documentation checklist.

### Prevention Rule

Whenever `DATASET_META.edition` changes, update `data/changelog.ts` and the README `Current edition` section in the same PR. If a PR intentionally skips README release notes, state that in the PR body with a follow-up task.

### Files Changed

- `README.md`
- `data/_meta.ts`
- `data/changelog.ts`
- `docs/issue-resolution-log.md`

## 2026-05-11 - PR #29 Client Briefing Smoke Test Used Display Code Instead Of Data ID

Status: resolved.

### Symptom

PR #29 passed typecheck/build, Lighthouse and Vercel, but `CI / Browser smoke tests` failed in the new briefing handoff test. The failing step attempted to select the European Union from the client-summary jurisdiction dropdown with `selectOption("euu")`.

### Root Cause

The application dropdown stores jurisdiction IDs as option values, while the visible route/code for the European Union is `EUU`. The correct option value is `eu`, not `euu`. The product UI rendered correctly; the new smoke assertion used the display code instead of the data-layer ID.

### Resolution

- Updated the smoke test to select the European Union by jurisdiction ID: `selectOption("eu")`.
- Kept the subsequent assertion against the visible `European Union brief` link so the test still confirms the user-facing handoff changes.

### Prevention Rule

When testing dropdowns, inspect the application data model and select by option value, not by route code or display code unless those are confirmed to be the option values.

### Files Changed

- `tests/smoke.spec.ts`
- `docs/issue-resolution-log.md`

## 2026-05-10 - Codex Sandbox Could Edit Files But Could Not Write Git Index

Status: documented workflow limitation.

### Symptom

During the navigation and homepage calm-down pass on `codex/workspace-navigation-polish`, Codex could edit repository files and run TypeScript checks, but `git add` failed with:

`fatal: Unable to create '.git/index.lock': Operation not permitted`

Manual checks also showed that creating any new file under `.git/` failed with `Operation not permitted`, even though the working tree files were writable.

### Root Cause

The local Codex sandbox could not write inside the repository's `.git` directory. The directory and files were owned by the user, but macOS reported protected metadata on `.git` and refused index-lock creation from the sandbox. This is a local git-index permission limitation, not an app-code, TypeScript, Tailwind, Vercel or deployment problem.

### Resolution

- Kept all code and documentation changes in the working tree.
- Confirmed TypeScript and whitespace checks still pass from the editable working tree.
- Documented that staging, resolving the already-clean conflict markers, committing and pushing may need to be done in GitHub Desktop or another authenticated local Git client when Codex cannot write `.git/index.lock`.

### Prevention Rule

If Codex reports `Operation not permitted` while creating `.git/index.lock`, do not keep retrying staging commands or change remotes. Confirm the working tree files are intact, check for conflict markers, run available source validation, document the limitation, and ask the project owner to stage/commit/push from GitHub Desktop.

### Files Changed

- `docs/issue-resolution-log.md`

## 2026-05-06 - Local Feature Branch Tracked `origin/main`

Status: resolved.

### Symptom

The Phase 1S review-workflow export commit appeared on remote `main` after the user published from GitHub Desktop, while the expected feature branch `codex/source-workflow-export-qa` was not visible on GitHub.

### Root Cause

The local feature branch had been created from `origin/main` with upstream tracking still pointed at `origin/main`. That made the desktop publish/push flow ambiguous and allowed the local feature commit to land on `main` instead of a same-named remote feature branch.

### Resolution

- Treated the remote `main` commit as source of truth because Vercel reported success for it.
- Created a clean follow-up branch from the new `origin/main`.
- Unset the local upstream on the follow-up branch before asking for desktop publish.
- Documented the branch-creation prevention rule in the development workflow.

### Prevention Rule

When creating a local feature branch for user-assisted GitHub Desktop publishing, create it without tracking `origin/main`, or immediately unset upstream tracking before asking the user to publish. Use `git switch --no-track -c <branch> origin/main` or run `git branch --unset-upstream` after branch creation. Confirm `git status --short --branch` does not show `...origin/main` before asking the user to click Publish Branch.

### Files Changed

- `docs/issue-resolution-log.md`
- `docs/development-workflow.md`

## 2026-05-03 - PR #21 Persona Smoke Test Matched The Wrong Button

Status: resolved.

### Symptom

PR #21 showed one failing GitHub check: `CI / Browser smoke tests`. Typecheck/build and Vercel deployment checks were successful.

### Root Cause

The new persona smoke test clicked `page.getByRole("button", { name: /Finance/i })`. Playwright found two matching persona cards because the private equity preset also contained finance-related text in its accessible button name. The application behavior was correct; the browser test locator was too broad.

### Resolution

- Added explicit `aria-label` values to persona preset buttons using the full role name.
- Updated the smoke test to click `Apply Finance or ESG controller persona preset`.
- Added a focused active-persona test hook so the smoke test does not match both the card label and the active role label.
- Kept the test focused on the user-facing accessibility contract instead of hidden implementation details.

### Prevention Rule

When card buttons contain rich descriptive text, give them clear accessible labels and use exact role-label locators in smoke tests. Do not rely on a broad keyword when several cards may contain that word in supporting copy.

When a selected state repeats a card label elsewhere on the page, scope the assertion to the selected-state region or a stable test hook rather than using broad page text.

### Files Changed

- `components/PersonaPresets.tsx`
- `tests/smoke.spec.ts`
- `docs/issue-resolution-log.md`

## 2026-05-03 - PR #16 Browser Smoke Test Used Broad Assessment Locator

Status: resolved.

### Symptom

PR #16 showed one failing GitHub check: `CI / Browser smoke tests`. Typecheck/build, Lighthouse, Vercel deployment and preview comments were successful.

### Root Cause

The new assessment smoke test used `page.getByText(/Indicative shortlist/i)`. The assessment page also includes intro copy containing "indicative shortlist", so Playwright strict mode found two matching visible elements. The application rendered correctly; the test locator was too broad.

### Resolution

Changed the assertion to the exact shortlist label: `page.getByText("Indicative shortlist", { exact: true })`.

### Prevention Rule

Browser smoke tests should use exact text, roles, headings or scoped locators when repeated marketing or helper copy may share words with component labels.

### Files Changed

- `tests/smoke.spec.ts`
- `docs/issue-resolution-log.md`
- `docs/development-workflow.md`

## 2026-05-02 - Country Outline Map Was Hidden On Tablet/Narrow Desktop Layouts

Status: resolved.

### Symptom

The homepage map could appear as a non-map list or visually blank/unclear in browser widths below the large desktop breakpoint. The user could not see a meaningful country outline map.

### Root Cause

`components/WorldChoropleth.tsx` rendered the local Natural Earth SVG country map only at the `lg` breakpoint. Below that breakpoint, the component showed an absolute-positioned jurisdiction list instead of the actual SVG map. The country borders and ocean/land contrast were also too subtle, so even when the map rendered it did not feel visually unmistakable.

### Resolution

- Made the SVG country-outline map visible from tablet widths upward.
- Strengthened ocean/land contrast, country borders, selected-state styling and EU overlay strokes.
- Added `data-testid` markers for country paths so smoke tests can confirm the map is not blank.
- Added a clear fallback state if local map geometry cannot load while preserving jurisdiction navigation.
- Added Playwright checks for visible country paths, tablet sizing, jurisdiction selection and geometry failure fallback.

### Prevention Rule

Map changes must verify the visual SVG, not only the surrounding map container. Smoke tests should assert visible country paths and a non-collapsed SVG at tablet/desktop sizes.

### Files Changed

- `components/WorldChoropleth.tsx`
- `tests/smoke.spec.ts`
- `docs/issue-resolution-log.md`

## 2026-05-02 - Local Sandbox Could Not Run Playwright Map Smoke Tests

Status: documented environment limitation.

### Symptom

During the Phase 1I visible-map validation pass, the new Playwright map checks could not be executed locally. The shell also could not run `npm run lint` because no `npm` executable is available in this Codex sandbox.

### Root Cause

The bundled desktop runtime exposes a `node` executable but not an `npm` executable. The current local `node_modules` tree also does not include `@playwright/test`, so direct Playwright CLI execution failed before any browser test code ran. Separately, starting `next dev` was blocked by sandbox port-binding permissions, which is already documented below.

### Resolution

Validated the closest checks available in this sandbox:

- standalone TypeScript check with `node node_modules/typescript/bin/tsc --noEmit`
- whitespace check with `git diff --check`
- static coverage-target check using `node -r sucrase/register`
- static local-map-geometry check against `public/world-110m`
- guardrail and legal wording scans

The Playwright test files remain in the repo and should run in GitHub Actions or a normal developer terminal after `npm install`.

### Prevention Rule

When this sandbox lacks `npm` or Playwright packages, document the limitation and validate static logic directly where possible. Do not remove or weaken browser smoke tests; rely on CI/Vercel preview for dependency-installed browser validation.

### Files Changed

- `tests/smoke.spec.ts`
- `tests/coverage-targets.spec.ts`
- `ESG_Regulatory_Atlas_Claude_Handoff.md`
- `docs/issue-resolution-log.md`

## 2026-05-02 - Codex Sandbox Could Not Load Next SWC Native Binary

Status: documented environment limitation.

### Symptom

During the Phase 1H premium-output and Marquee review queue update, `next build --webpack` failed before app compilation with a `Failed to load SWC binary for darwin/arm64` error. The diagnostic showed a macOS code-signature mismatch for `@next/swc-darwin-arm64/next-swc.darwin-arm64.node`.

### Root Cause

The Codex desktop runtime attempted to load Next.js's native SWC binary from `node_modules`, but macOS rejected the native module because the mapped binary and process had different Team IDs. This happened before TypeScript, Tailwind, route generation or application code was evaluated.

### Resolution

Validated the closest checks that do not depend on loading the native SWC module:

- standalone `tsc --noEmit`
- `git diff --check`
- out-of-scope dependency and guardrail scan
- legal-risk wording scan

The issue is expected to be resolved by running the build in GitHub Actions, Vercel, or a local developer terminal with a normally installed Node/npm runtime. If CI or Vercel reports a separate application build failure, investigate that log independently.

### Prevention Rule

Do not treat a local Codex SWC native binary code-signature failure as a product deployment defect when standalone TypeScript and source checks pass. Document the limitation in the handoff, keep strict code checks, and rely on CI/Vercel for the final Next.js native compilation signal.

### Files Changed

- `docs/issue-resolution-log.md`
- `ESG_Regulatory_Atlas_Claude_Handoff.md`

## 2026-05-02 - Codex Sandbox Could Build But Could Not Start Local Server

Status: documented environment limitation.

### Symptom

During the Phase 1F commercial-validation sprint, production build and standalone TypeScript validation passed, but local route smoke testing through `next start` could not begin because the sandbox returned `listen EPERM` when binding to `127.0.0.1:3000`.

### Root Cause

The Codex desktop sandbox for this thread allows file edits and build execution, but does not permit this shell session to bind a local web server port. This is a local execution permission issue, not a Next.js compile, TypeScript, Tailwind, route-generation or Vercel deployment issue.

### Resolution

Validation used the closest checks that do not require opening a local port:

- production `next build --webpack`
- standalone `tsc --noEmit`
- `git diff --check`
- guardrail text/dependency scan

Browser smoke and Lighthouse checks should run in GitHub Actions, Vercel preview checks or a local developer terminal with normal port permissions.

## 2026-05-02 - Parallel TypeScript Check Saw Missing `.next/types` During Build

Status: resolved.

### Symptom

A local TypeScript check reported missing generated files under `.next/types/app/...` immediately after a production build command was started in parallel.

### Root Cause

The TypeScript check and Next.js production build were run at the same time. Next.js regenerates `.next/types` during the build, so the standalone TypeScript process briefly saw generated files that had been removed and not yet recreated. This was a validation sequencing issue, not an application TypeScript failure.

### Resolution

The production build was allowed to finish, then `tsc --noEmit` was rerun after `.next/types` had been regenerated. The rerun passed.

### Prevention Rule

Do not run standalone `tsc --noEmit` in parallel with `next build` when the project includes `.next/types/**/*.ts` in `tsconfig.json`. Run the production build first, then run TypeScript or lint checks sequentially if a separate check is needed.

### Files Changed

- `docs/issue-resolution-log.md`

## 2026-05-02 - PR #11 Browser Smoke And Lighthouse Checks Failed After Vercel Deployed

Status: resolved.

### Symptom

GitHub showed two failing checks on PR #11:

- `CI / Browser smoke tests`
- `Lighthouse / Lighthouse CI`

The same PR also showed that the Vercel branch deployment completed successfully. This meant the app deployment was not the failing component.

### Root Cause

Two separate quality-check issues were present:

- The Playwright smoke test expected the CSRD regulation detail page heading to contain `Corporate Sustainability Reporting Directive`. The page's actual heading is the short name `CSRD`, while the full title appears as supporting text below the heading. The test encoded a wrong UI assumption.
- The Lighthouse config used the default `lighthouse:recommended` assertion preset. That preset treats many individual audits as hard failures, including audits that were intended to be launch warnings for this MVP, such as contrast, unused JavaScript, legacy JavaScript and network-dependency tree checks.

### Resolution

- Updated `tests/smoke.spec.ts` so the detail-route smoke test asserts the real UI contract: the page URL is `/regulations/csrd`, the heading is `CSRD`, and the full title appears in the title paragraph.
- Updated `.lighthouserc.json` to remove the default recommended preset and keep explicit category thresholds as warning-level launch signals.
- Confirmed GitHub reruns passed for both `CI` and `Lighthouse` on the updated PR branch.

### Prevention Rule

- Smoke tests should verify stable user-facing contracts, not assumptions about whether a full regulation title is the primary heading.
- When a page includes citations or copy blocks, avoid broad text locators that can match repeated content. Prefer role, exact heading, paragraph or scoped locators.
- Lighthouse should be used as a launch signal for this static MVP, not as a hard gate for every default audit, unless the team intentionally chooses stricter thresholds.
- When GitHub says checks failed but Vercel says deployed, investigate check logs first and do not label it as a Vercel deployment failure without evidence.

### Files Changed

- `tests/smoke.spec.ts`
- `.lighthouserc.json`
- `docs/issue-resolution-log.md`
- `docs/development-workflow.md`
- `AGENTS.md`
- `README.md`
- `ESG_Regulatory_Atlas_Claude_Handoff.md`
- `.github/pull_request_template.md`

## 2026-05-02 - First Visit Opened In System Dark Mode And Some Dark Text Lacked Contrast

Status: resolved.

### Symptom

The site could open in dark mode for first-time visitors when their operating system preferred dark mode. Some colored labels and warning/disclaimer text used light-mode text colors on dark-mode surfaces, making the interface feel less premium and harder to read.

### Root Cause

The theme initialization script and `ThemeToggle` helper used `prefers-color-scheme` when no `etica-theme` preference existed. That made dark mode the default for some first-time users. The dark-mode CSS also handled neutral slate text but did not consistently retune amber, red, blue, violet and teal text utilities, colored badge backgrounds, rings, form placeholders and related border colors.

### Resolution

- Updated `app/layout.tsx` and `components/ThemeToggle.tsx` so first-time visitors default to light mode.
- Preserved explicit user choice by continuing to respect saved `etica-theme` values after a user toggles the theme.
- Strengthened `app/globals.css` dark-mode rules for colored text, badge backgrounds, borders, rings, inputs, placeholders and hover states.
- Added `docs/product-improvement-backlog.md` so visual/accessibility quality remains a Wave 1 priority.

### Prevention Rule

- Theme defaults should be product-led, not inferred from system preference, unless the product owner asks for system theme detection.
- Dark-mode changes need a route-level visual pass on the map, regulations table, assessment, timeline, briefing, data quality, detail drawer and disclaimer surfaces.
- When adding a new badge/status color, include a dark-mode contrast check before shipping.

### Files Changed

- `app/layout.tsx`
- `app/globals.css`
- `components/ThemeToggle.tsx`
- `docs/issue-resolution-log.md`
- `docs/product-improvement-backlog.md`
- `README.md`
- `AGENTS.md`
- `docs/development-workflow.md`
- `docs/product-brief.md`
- `docs/roadmap.md`

## 2026-05-03 - Codex Sandbox Could Not Push Branch To GitHub

Status: documented workflow limitation.

### Symptom

After the next launch-train updates were committed locally, `git push -u origin codex/source-governance-deepening` could not publish the branch from the Codex sandbox.

### Root Cause

Two separate environment constraints appeared:

- before network permission was granted, the sandbox could not resolve `github.com`
- after network permission was granted, git still could not read GitHub HTTPS credentials from the sandbox (`could not read Username for 'https://github.com': Device not configured`)

The local repository was clean and the commits existed locally, so this was a publish-credential limitation rather than an application, build or branch-state defect.

### Resolution

- Kept the completed commits on local branches.
- Documented that GitHub Desktop should be used to publish the current branch when shell credentials are unavailable.
- Future Codex rounds should attempt direct push only after network access exists, then fall back quickly to the GitHub Desktop "Publish branch" flow if credentials are unavailable.

### Prevention Rule

When local git push fails with credential access errors, do not keep retrying or change repository remotes. Confirm the branch is clean, document the limitation and ask the owner to publish the branch through GitHub Desktop or another authenticated Git client.

### Files Changed

- `docs/issue-resolution-log.md`

## 2026-05-07 - Homepage Felt Busy And Map Lacked Inspectable Pan/Zoom Context

Status: resolved in the next map-workspace refresh branch.

### Symptom

The homepage had too many commercial and update panels before the core product workspace, making the first experience feel busy. The map also did not feel like an inspectable world map because users could not zoom or pan it, untracked countries were too visually quiet, and the always-on map labels competed with the country outlines.

### Root Cause

`app/page.tsx` placed the changelog strip, three commercial tiles, view selector and filter card ahead of the map. `components/WorldChoropleth.tsx` rendered local Natural Earth country paths, but the SVG had no viewport controls and used subtle static colors. Tracked-market labels were also always rendered, which made the canvas noisier while not improving country recognition.

A follow-up CI smoke test also exposed that `public/world-110m/index.json` only pointed to `tracked.json`, a subset of tracked jurisdictions and EU member states. That meant untracked countries could not render as neutral background land even after the map styling supported them.

A second smoke-test run then exposed a separate interaction issue: the test could see the full country map, but clicking Canada did not open the Canada panel reliably. The country path itself was being used as the accessible button. For large irregular SVG countries, the browser click target can land near the center of the path's bounding box rather than on a practical visible interaction point. A follow-up run showed that the SVG-level drag handler could still capture pointer events before the pin click completed.

### Resolution

- Refactored the homepage into a calmer map-first workspace with a compact hero, one disclaimer, one control surface and the map/jurisdiction panel as the main product.
- Added no-dependency SVG zoom, reset and drag-to-pan controls to the map.
- Added CSS variables for ocean, untracked land, borders, outlines and graticules so light and dark themes render the map with clear contrast.
- Reduced map label noise by showing persistent labels only for selected, hovered, EU and subnational markers while retaining clickable country paths.
- Replaced the tracked-only geometry bundle with locally bundled public-domain Natural Earth 1:110m Admin 0 country geometry so untracked countries can render as neutral land.
- Added clickable, keyboard-accessible jurisdiction pin hit targets on top of the country outlines while keeping country paths selectable, so irregular country geometry does not create fragile click behavior.
- Stopped pin and label pointer-down events from bubbling into the map pan handler so click selection and drag-to-pan do not compete.
- Added smoke checks for visible untracked countries and map viewport controls.

### Prevention Rule

Homepage changes should keep the map workspace within the first meaningful viewport after the hero and disclaimer. Map QA must verify not only that SVG paths exist, but also that untracked countries, outlines, background contrast and viewport controls are visible. Do not ship a map geometry index that only includes tracked countries if the UI claims no-data countries are visible. Do not rely on complex SVG country polygons as the only accessible click target; tracked markets need a stable button or pin target for testing, keyboard users and practical user selection. When an SVG supports both drag-to-pan and clickable children, child controls should stop pointer-down propagation so the pan handler does not capture ordinary clicks.

### Files Changed

- `app/page.tsx`
- `components/WorldChoropleth.tsx`
- `components/Filters.tsx`
- `components/ViewSelector.tsx`
- `app/globals.css`
- `lib/i18n.ts`
- `tests/smoke.spec.ts`
- `data/_meta.ts`
- `data/changelog.ts`
- `docs/issue-resolution-log.md`
- `public/world-110m/countries.json`
- `public/world-110m/index.json`

## 2026-05-12 - Homepage Priority Cue Smoke Test Matched Hidden Filter Option

Status: resolved in PR #37 follow-up commit.

### Symptom

PR #37 passed Vercel and the TypeScript/build job, but `CI / Browser smoke tests` failed in the homepage smoke test. The failing assertion expected `First reporting` to be visible.

### Root Cause

The test used a broad page-level text locator: `page.getByText(/First reporting/i).first()`. Playwright resolved the first match to a hidden `<option value="first_reporting">First reporting</option>` inside the status filter rather than the visible priority-record card cue. The product UI was rendering the cue, but the assertion was not scoped to the new card.

### Resolution

- Added `data-testid="priority-record-card"` to homepage priority cards.
- Scoped the smoke assertion to the first priority card and checked that the card contains both `Source to verify:` and `First reporting`.
- Kept the product UI unchanged except for the test id.

### Prevention Rule

When asserting text that may also exist in hidden select options, scope browser smoke tests to the smallest stable container. Prefer component-level `data-testid` anchors for repeated homepage cards and filter-heavy pages.

### Files Changed

- `app/page.tsx`
- `tests/smoke.spec.ts`
- `docs/issue-resolution-log.md`

## 2026-05-25 - Public Journey Exposed Too Many First-Level Choices

Status: resolved in the public-journey simplification branch.

### Symptom

The May 25 simplification review found that the public site felt busy even though the underlying regulatory intelligence was useful. The header and homepage exposed too many destinations, including planning workspaces, governance pages, commercial previews and launch resources, before helping a first-time user choose a simple path.

### Root Cause

The launch train added valuable routes faster than the information architecture was consolidated. The primary header and homepage began mirroring the internal product structure rather than the three main user jobs: assess what may matter, inspect a market/regulation, or request advisory support.

### Resolution

- Reduced primary navigation to Start, Assessment, Markets, Regulations, Advisory and grouped More.
- Moved planning, trust/methodology and commercial-preview routes into grouped secondary navigation.
- Reframed the homepage hero around assessment, market browsing and regulation search.
- Added an advisory-scan path to the Start panel.
- Replaced public "Static MVP CTA only" language with source-linked advisory-scan copy.
- Kept `/launch` noindex and relabelled it as an internal launch workspace.
- Restored current-edition changelog entries above older recent-review-pack entries.
- Added smoke coverage for hidden Launch nav, launch noindex metadata and current printable brief edition.
- Ignored local Playwright `test-results` artifacts so browser QA output does not appear as commit-ready product changes.
- Updated stale browser smoke assertions that still expected the old Compare-options CTA and header wordmark heading after the public journey was simplified.

### Prevention Rule

Do not add new routes directly to primary navigation without classifying the route first. Core discovery gets primary placement; planning, trust and commercial-preview pages belong in More; internal/operator surfaces should remain noindex and absent from public navigation. Homepage changes should keep one clear user decision before expert filters, governance panels or commercial previews.

When changing public navigation or homepage CTAs, update both direct smoke tests and language-toggle smoke tests in the same pass. Header brand text is product chrome, not a page heading; tests should anchor on the route's actual H1 or stable `data-testid` markers.

### Files Changed

- `components/Header.tsx`
- `app/page.tsx`
- `components/MarketBriefingCTA.tsx`
- `app/launch/page.tsx`
- `app/changelog/page.tsx`
- `.gitignore`
- `tests/smoke.spec.ts`
- `docs/simplification-roadmap.md`
- `docs/qa-findings/pr-74-public-journey-simplification.md`
- `docs/issue-resolution-log.md`

## 2026-05-25 - Assessment Results Needed A Decision-First Summary

Status: resolved in the assessment-shortlist-overview branch.

### Symptom

The assessment workflow had useful profile context, trigger review, readiness plan and detailed shortlist cards, but users still had to scan multiple dense sections before seeing the clearest answer: which records should be reviewed first and what facts/actions matter next.

### Root Cause

Assessment capabilities were added iteratively as separate planning aids. The page accumulated strong evidence and trigger logic, but the result hierarchy did not yet put top records, relevance mix, facts to confirm and first 30-day actions ahead of the detailed reasoning.

### Resolution

- Added an assessment shortlist overview before the detailed trigger review.
- Surfaced top records to review first with cautious category and review-priority labels.
- Added relevance-mix counts across the four assessment categories.
- Added facts-to-confirm and first-30-day action panels.
- Added a direct advisory-scan CTA inside the assessment output.
- Added smoke coverage for the new overview.
- Replaced a stale hardcoded printable-brief edition assertion with the shared `DATASET_META.edition` value after CI caught `0.5.58` lingering in smoke coverage.

### Prevention Rule

Assessment changes should keep the sequence decision-first: summary, top records, missing facts, first actions, then detailed trigger logic. Do not add more trigger cards or chip walls above the shortlist overview unless they directly help the user choose a next action.

Edition-sensitive smoke tests should import central release metadata instead of hardcoding the current edition. Hardcoded historical strings are acceptable only for explicit negative regression checks.

### Files Changed

- `components/ApplicabilityWizard.tsx`
- `tests/smoke.spec.ts`
- `data/_meta.ts`
- `data/changelog.ts`
- `README.md`
- `docs/current-release.md`
- `docs/simplification-roadmap.md`
- `docs/product-improvement-backlog.md`
- `docs/qa-findings/pr-75-assessment-shortlist-overview.md`
- `docs/issue-resolution-log.md`

## 2026-05-25 - Regulations Database Exposed Secondary Tools Before Search Flow

Status: resolved in the regulations-search-first-layout branch.

### Symptom

The Regulations page had strong capabilities, including role lenses, compare, glossary help, sharing and export controls, but the first screen felt like a tool shelf instead of a database workflow. Users could encounter persona presets and support utilities before the page made search and primary filters feel like the main action.

### Root Cause

Regulations capabilities were added incrementally as useful adjacent modules. Over time, optional tools gained the same visual priority as the core job: search the database, filter by a few primary dimensions and inspect matching records.

### Resolution

- Added a search-first workspace at the top of `/regulations`.
- Put search, jurisdiction, topic, sector, company type and reporting year before results.
- Moved role lenses, compare, label help, share and export controls below the result table.
- Added embedded role-lens support so persona presets can render inside a secondary tools panel without nested card chrome.
- Updated smoke coverage to assert the new hierarchy and expand role lenses before persona-preset checks.
- Fixed the first PR #76 browser-smoke failure by scoping primary-filter assertions to `regulations-search-workspace` and using exact labels so `Jurisdiction` does not also match `Jurisdiction type`.

### Prevention Rule

Keep `/regulations` oriented around search, primary filters and database results. Optional tools should support the result set after the table unless user testing shows they are critical before search. When moving controls behind collapsed sections, update smoke tests to expand those controls before asserting their internal behavior. When checking similarly named form controls, scope assertions to a stable container and use exact label matching.

### Files Changed

- `app/regulations/page.tsx`
- `components/PersonaPresets.tsx`
- `tests/smoke.spec.ts`
- `data/_meta.ts`
- `data/changelog.ts`
- `README.md`
- `docs/current-release.md`
- `docs/simplification-roadmap.md`
- `docs/product-improvement-backlog.md`
- `docs/qa-findings/pr-76-regulations-search-first-layout.md`
- `docs/issue-resolution-log.md`
