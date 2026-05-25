import { expect, test } from "@playwright/test";

test("map workspace loads with core product controls", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Find the ESG regulations that may matter/i })).toBeVisible();
  await expect(page.getByTestId("regulatory-map")).toBeVisible();
  await expect(page.getByLabel(/Language/i)).toBeVisible();
  await expect(page.getByPlaceholder(/Search title/i)).toBeVisible();
  await expect(page.getByTestId("priority-record-card").first()).toContainText(/Source to verify:/i);
  await expect(page.getByTestId("priority-record-card").first()).toContainText(/First reporting/i);

  const navigation = page.locator("header").getByRole("navigation");
  await expect(navigation.getByRole("link", { name: /^Start$/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /^Assessment$/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /Markets/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /Regulations/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /^Advisory$/i })).toBeVisible();
  await navigation.getByText("More", { exact: true }).click();
  await expect(navigation.getByText(/Planning views/i)).toBeVisible();
  await expect(navigation.getByRole("link", { name: /Sectors/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /Data Quality/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /^Alerts$/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /^Launch$/i })).toHaveCount(0);
  await expect(page.getByTestId("start-here-panel")).toContainText(/Choose the fastest path/i);
  await expect(page.getByRole("link", { name: /Run an exposure assessment/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore a jurisdiction/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Request an advisory scan/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /^Search regulations/i })).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/Static MVP CTA only/i);
});

test("country outline map renders and supports jurisdiction selection on tablet", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 900 });
  await page.goto("/");

  await expect(page.getByTestId("country-outline-map")).toBeVisible();
  await expect(page.getByTestId("country-path").first()).toBeVisible();
  expect(await page.getByTestId("country-path").count()).toBeGreaterThan(30);
  expect(await page.locator('[data-testid="country-path"][data-coverage="untracked"]').count()).toBeGreaterThan(20);
  await expect(page.getByRole("button", { name: /Zoom in/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Zoom out/i })).toBeVisible();
  await expect(page.getByText(/Drag to pan, scroll to zoom/i)).toBeVisible();
  await expect(page.getByTestId("map-coverage-key")).toBeVisible();
  await expect(page.getByTestId("map-untracked-key")).toContainText(/does not yet have direct Atlas seed coverage/i);

  const untrackedPath = page.locator('[data-testid="country-path"][data-coverage="untracked"]').first();
  await expect(untrackedPath).toBeVisible();
  await expect(untrackedPath).toHaveAttribute("fill", "var(--map-land-untracked)");

  const mapBox = await page.getByTestId("country-outline-map").boundingBox();
  expect(mapBox?.width).toBeGreaterThan(500);
  expect(mapBox?.height).toBeGreaterThan(300);

  await page.getByRole("button", { name: /Zoom in/i }).click();
  await page.getByRole("button", { name: /Reset map/i }).click();

  await page.locator('[data-testid="map-jurisdiction-pin"][data-jurisdiction-code="CAN"]').dispatchEvent("click");
  await expect(page.getByTestId("jurisdiction-panel").getByRole("heading", { name: /^Canada$/i })).toBeVisible();
});

test("map geometry failure keeps a clear fallback and jurisdiction list", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 900 });
  await page.route("**/world-110m/index.json", (route) => route.abort());
  await page.goto("/");

  await expect(page.getByText(/Map geometry could not load/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /European Union:/ }).first()).toBeVisible();
});

test("language toggle updates interface chrome", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel(/Language/i).selectOption("es");
  await expect(page.locator("header").getByRole("link", { name: /^Regulaciones$/i })).toBeVisible();
  await expect(page.getByText(/Inteligencia regulatoria indicativa/i)).toBeVisible();
  await expect(page.getByTestId("map-untracked-key")).toContainText(/Contornos de países no rastreados/i);
});

test("assessment results include decision readiness prompts", async ({ page }) => {
  await page.goto("/assessment");

  await expect(page.getByTestId("assessment-profile-summary")).toContainText(/European Union headquarters/i);
  await expect(page.getByTestId("assessment-profile-summary")).toContainText(/Facts to confirm next/i);
  await expect(page.getByTestId("assessment-trigger-review")).toContainText(/Profile trigger review/i);
  await expect(page.getByTestId("assessment-trigger-review")).toContainText(/Jurisdiction and market nexus/i);
  await expect(page.getByTestId("assessment-trigger-review")).toContainText(/Company profile and size/i);
  await expect(page.getByTestId("assessment-trigger-review")).toContainText(/Source and threshold review/i);
  await expect(page.getByTestId("assessment-readiness-plan")).toContainText(/Threshold facts to check/i);
  await expect(page.getByTestId("assessment-readiness-plan")).toContainText(/Open threshold matrix/i);
  await expect(page.getByText("Indicative shortlist", { exact: true })).toBeVisible();
  await expect(page.getByText(/Suggested owner:/i).first()).toBeVisible();
  await expect(page.getByText(/Missing fact:/i).first()).toBeVisible();
  await expect(page.getByText(/Next 30 days:/i).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy shortlist/i })).toBeVisible();
});

test("assessment persona summary can be reset", async ({ page }) => {
  await page.goto("/assessment");

  await page.getByRole("button", { name: /SME supplier lead/i }).click();
  await expect(page).toHaveURL(/persona=supplier/);
  await expect(page.getByTestId("assessment-profile-summary")).toContainText(/Netherlands headquarters/i);
  await expect(page.getByTestId("assessment-profile-summary")).toContainText(/Regulated imports \/ commodities/i);

  await page.getByRole("button", { name: /Reset profile/i }).click();
  expect(page.url()).not.toContain("persona=");
  await expect(page.getByTestId("assessment-profile-summary")).toContainText(/European Union headquarters/i);
  await expect(page.getByTestId("assessment-profile-summary")).toContainText(/EU market exposure/i);
});

test("timeline filters expose active context and reset cleanly", async ({ page }) => {
  await page.goto("/timeline");

  await expect(page.getByTestId("timeline-scope-tabs")).toContainText(/Next 24 months/i);
  await expect(page.getByRole("button", { name: /Next 24 months/i })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("timeline-filter-summary")).toContainText(/No timeline filters are active/i);
  await page.getByRole("button", { name: /Full history/i }).click();
  await expect(page.getByTestId("timeline-filter-summary")).toContainText(/Planning horizon: Full history/i);
  await page.getByLabel("Jurisdiction").selectOption("eu");
  await expect(page.getByTestId("timeline-filter-summary")).toContainText(/Jurisdiction: European Union/i);
  await page.getByRole("button", { name: /^Clear$/i }).click();
  await expect(page.getByLabel("Jurisdiction")).toHaveValue("");
  await expect(page.getByRole("button", { name: /Next 24 months/i })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("timeline-filter-summary")).toContainText(/No timeline filters are active/i);
});

test("regulations workspace supports detail navigation", async ({ page }) => {
  await page.goto("/regulations");

  await expect(page.getByRole("heading", { name: /Search the ESG regulatory database/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /How to read database labels/i })).toBeVisible();
  await expect(page.getByText(/Use the glossary before treating a filtered result as compliance scope/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open glossary/i })).toHaveAttribute("href", "/glossary");
  await expect(page.getByText(/Persona starting points/i)).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
  await page.getByRole("link", { name: /Open CSRD/i }).click();
  await expect(page).toHaveURL(/\/regulations\/csrd$/);
  await expect(page.getByRole("heading", { name: /^CSRD$/i })).toBeVisible();
  await expect(page.locator("p").filter({ hasText: /^Corporate Sustainability Reporting Directive$/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Decision readiness/i })).toBeVisible();
  await expect(page.getByText(/Facts to confirm/i).first()).toBeVisible();
  await expect(page.getByTestId("implementation-roadmap")).toContainText(/Implementation roadmap/i);
  await expect(page.getByTestId("implementation-roadmap")).toContainText(/0-30 days/i);
  await expect(page.getByRole("heading", { name: /Source evidence trail/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy source memo/i })).toBeVisible();
});

test("threshold matrix exposes high-value scope signals with caveats", async ({ page }) => {
  await page.goto("/thresholds");

  await expect(page.getByRole("heading", { name: /High-value scope signals/i })).toBeVisible();
  await expect(page.getByText(/Threshold rows are seed planning signals/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /Threshold review matrix/i })).toBeVisible();
  await expect(page.getByText(/CSRD/i).first()).toBeVisible();
  await expect(page.getByText(/CSDDD threshold signals are regime-specific/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open source trail/i }).first()).toBeVisible();
});

test("persona presets apply shareable regulation filters", async ({ page }) => {
  await page.goto("/regulations");
  const businessFunctionFilter = page.locator("label").filter({ hasText: /^Business function/ }).locator("select");

  await page.getByRole("button", { name: /Apply Finance or ESG controller persona preset/i }).click();
  await expect(page).toHaveURL(/persona=finance-controller/);
  await expect(page.getByText(/Active role lens/i)).toBeVisible();
  await expect(page.getByTestId("active-persona-role")).toHaveText("Finance or ESG controller");
  await expect(page.getByTestId("active-filter-summary")).toContainText(/Role lens: Finance or ESG controller/i);
  await expect(businessFunctionFilter).toHaveValue("Finance");
  await page.getByRole("button", { name: /Remove Business function filter/i }).click();
  await expect(businessFunctionFilter).toHaveValue("");
});

test("launch asset copy blocks render", async ({ page }) => {
  await page.goto("/launch");

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
  await expect(page.getByRole("heading", { name: /Internal launch workspace/i })).toBeVisible();
  await expect(page.getByText(/LinkedIn launch post: free Atlas/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy asset/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Draft email/i }).first()).toBeVisible();
  await expect(page.getByText(/Manual outreach only/i).first()).toBeVisible();
});

test("premium pack previews expose source-review gates", async ({ page }) => {
  await page.goto("/premium-packs/eu-esg-compliance-pack");

  await expect(page.getByTestId("premium-gate-summary")).toContainText(/Premium source-review gates/i);
  await expect(page.getByTestId("premium-gate-summary")).toContainText(/Illustrative only/i);
  const csrdGateCard = page.getByRole("link", { name: /CSRD/i }).first();
  await expect(csrdGateCard).toContainText(/Illustrative only/i);
  await expect(csrdGateCard).toContainText(/blocked from premium use until source, status and threshold review is complete/i);
});

test("market profile pages render jurisdiction decision context", async ({ page }) => {
  await page.goto("/markets");

  await expect(page.getByRole("heading", { name: /Jurisdiction market profiles/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Market quick starts/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /European Union/i }).first()).toBeVisible();

  await page.goto("/jurisdiction/euu");
  await expect(page.getByRole("heading", { name: /European Union/i })).toBeVisible();
  await expect(page.getByTestId("market-trigger-panel")).toContainText(/Market trigger review/i);
  await expect(page.getByTestId("market-trigger-panel")).toContainText(/Corporate reporting and disclosure/i);
  await expect(page.getByTestId("market-trigger-panel")).toContainText(/Source and threshold review/i);
  await expect(page.getByTestId("market-obligation-matrix")).toContainText(/Market obligation footprint/i);
  await expect(page.getByTestId("market-obligation-matrix")).toContainText(/Reporting obligation/i);
  await expect(page.getByTestId("market-obligation-matrix")).toContainText(/Likely owners/i);
  await expect(page.getByText(/Evidence starter pack/i)).toBeVisible();
  await expect(page.getByText(/Priority records/i).first()).toBeVisible();
  await expect(page.getByText(/Source confidence/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Printable brief/i })).toBeVisible();
});

test("sector starting point pages render business-context triage", async ({ page }) => {
  await page.goto("/sectors");

  await expect(page.getByRole("heading", { name: /Sector starting points/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Financial services/i }).first()).toBeVisible();

  await page.goto("/sectors/financial-services");
  await expect(page.getByRole("heading", { name: /Financial services/i })).toBeVisible();
  await expect(page.getByText(/Priority records/i).first()).toBeVisible();
  await expect(page.getByText(/Market signals/i)).toBeVisible();
  await expect(page.getByText(/Source confidence/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Filter database/i })).toBeVisible();
});

test("jurisdiction briefs include market quick-start evidence framing", async ({ page }) => {
  await page.goto("/jurisdiction/euu/brief");

  await expect(page.getByRole("heading", { name: /European Union regulatory brief/i })).toBeVisible();
  await expect(page.locator("body")).toContainText(/0\.5\.58 - May 2026/i);
  await expect(page.locator("body")).not.toContainText(/0\.5\.41 - May 2026/i);
  await expect(page.getByText(/Planning question:/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /Evidence starter pack/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Likely owner functions/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy as Markdown/i })).toBeVisible();
});

test("briefing client summary exposes handoff links", async ({ page }) => {
  await page.goto("/briefing");

  await expect(page.getByTestId("briefing-scenario-empty")).toContainText(/Choose a briefing scenario/i);
  await page.getByRole("button", { name: /EU corporate reporting briefing/i }).click();
  await expect(page.getByTestId("active-briefing-scenario")).toContainText(/EU corporate reporting briefing/i);
  await expect(page.getByRole("heading", { name: /Briefing builder/i })).toBeVisible();
  await expect(page.getByText(/Recommended path/i)).toBeVisible();
  await page.getByRole("button", { name: /Client summary/i }).click();
  await expect(page.getByTestId("client-briefing-handoff")).toBeVisible();
  await expect(page.getByRole("link", { name: /Run assessment/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Choose market brief/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Request review/i })).toBeVisible();
  await page.getByLabel("Jurisdiction").selectOption("eu");
  await expect(page.getByRole("link", { name: /European Union brief/i })).toBeVisible();
});

test("data quality source-governance queue renders", async ({ page }) => {
  await page.goto("/data-quality");

  await expect(page.getByRole("tab", { name: /Overview/i })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { name: /Transparency signals are planning prompts/i })).toBeVisible();
  await expect(page.getByText(/Record counts/i).first()).toBeVisible();
  await expect(page.getByText(/Review prompts/i).first()).toBeVisible();
  await expect(page.getByTestId("daily-launch-pulse")).toContainText(/Daily launch pulse/i);
  await expect(page.getByTestId("daily-launch-pulse")).toContainText(/next product-review focus/i);
  await expect(page.getByText(/Source freshness signals/i)).toBeVisible();
  await expect(page.getByText(/Stale source/i)).toBeVisible();
  await expect(page.getByText(/Missing primary source/i)).toBeVisible();

  await page.getByRole("tab", { name: /Sources/i }).click();
  await expect(page.getByText(/Source posture samples/i)).toBeVisible();

  await page.getByRole("tab", { name: /Coverage/i }).click();
  await expect(page.getByText(/Coverage confidence/i)).toBeVisible();
  await expect(page.getByText(/Average confidence/i)).toBeVisible();

  await page.getByRole("tab", { name: /Review workflow/i }).click();
  await expect(page.getByTestId("marquee-source-review-packet")).toContainText(/Marquee 10 source-review packet/i);
  await expect(page.getByTestId("marquee-source-review-packet")).toContainText(/Source to verify/i);
  await expect(page.getByTestId("marquee-source-review-packet")).toContainText(/Threshold fact/i);
  await expect(page.getByText(/Client reuse review gates/i)).toBeVisible();
  await expect(page.getByText(/Client reuse blockers/i)).toBeVisible();
  await expect(page.getByText(/Review workflow export/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy priority review packet/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Export review CSV/i })).toBeVisible();
  await expect(page.getByTestId("external-review-intake")).toContainText(/External review intake/i);
  await expect(page.getByRole("button", { name: /Copy intake routing/i })).toBeVisible();
  await expect(page.getByText(/Owner placeholder:/i).first()).toBeVisible();
  await expect(page.getByText(/Premium use:/i).first()).toBeVisible();
});

test("commercial routes explain manual request paths", async ({ page }) => {
  for (const path of ["/plans", "/alerts", "/advisory", "/premium-roadmap"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { name: /How to request support|Request a sample alert preview|Request an advisory-supported scan|Request a design-partner preview/i })).toBeVisible();
    await expect(page.getByText(/What to send/i).first()).toBeVisible();
    await expect(page.getByText(/What Etica returns/i).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Email Etica ESG/i }).first()).toHaveAttribute("href", /mailto:gabriel@eticaesg\.com/);
  }
});

test("changelog exposes the daily launch pulse", async ({ page }) => {
  await page.goto("/changelog");

  await expect(page.getByRole("heading", { name: /Public update log/i })).toBeVisible();
  await expect(page.getByTestId("daily-launch-pulse")).toContainText(/Daily launch pulse/i);
  await expect(page.getByTestId("daily-launch-pulse")).toContainText(/0.5.40 - May 2026/i);
  await expect(page.getByTestId("daily-launch-pulse")).toContainText(/not automated monitoring/i);
});

test("key launch routes render", async ({ page }) => {
  for (const path of ["/markets", "/jurisdiction/euu", "/sectors", "/sectors/financial-services", "/value-chain", "/assessment", "/timeline", "/briefing", "/data-quality", "/compare?jurisdictions=EUU,GBR", "/jurisdiction/euu/brief", "/launch"]) {
    await page.goto(path);
    await expect(page.locator("body")).toContainText(/Etica ESG|Regulatory Atlas|Brief|Timeline|Assessment|Data Quality|Value-chain exposure/i);
  }
});
