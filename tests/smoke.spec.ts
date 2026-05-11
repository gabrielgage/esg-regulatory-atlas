import { expect, test } from "@playwright/test";

test("map workspace loads with core product controls", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Etica ESG/i }).first()).toBeVisible();
  await expect(page.getByTestId("regulatory-map")).toBeVisible();
  await expect(page.getByLabel(/Language/i)).toBeVisible();
  await expect(page.getByPlaceholder(/Search title/i)).toBeVisible();

  const navigation = page.locator("header").getByRole("navigation");
  await expect(navigation.getByRole("link", { name: /Markets/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /Sectors/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /Regulations/i })).toBeVisible();
  await navigation.getByText("More", { exact: true }).click();
  await expect(navigation.getByRole("link", { name: /Data Quality/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /^Alerts$/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /^Advisory$/i })).toBeVisible();
  await expect(navigation.getByRole("link", { name: /^Launch$/i })).toBeVisible();
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
  await expect(page.getByRole("link", { name: /Regulaciones/i })).toBeVisible();
  await expect(page.getByText(/Inteligencia regulatoria indicativa/i)).toBeVisible();
});

test("assessment results include decision readiness prompts", async ({ page }) => {
  await page.goto("/assessment");

  await expect(page.getByText("Indicative shortlist", { exact: true })).toBeVisible();
  await expect(page.getByText(/Suggested owner:/i).first()).toBeVisible();
  await expect(page.getByText(/Missing fact:/i).first()).toBeVisible();
  await expect(page.getByText(/Next 30 days:/i).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy shortlist/i })).toBeVisible();
});

test("regulations workspace supports detail navigation", async ({ page }) => {
  await page.goto("/regulations");

  await expect(page.getByRole("heading", { name: /Search the ESG regulatory database/i })).toBeVisible();
  await expect(page.getByText(/Persona starting points/i)).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
  await page.getByRole("link", { name: /Open CSRD/i }).click();
  await expect(page).toHaveURL(/\/regulations\/csrd$/);
  await expect(page.getByRole("heading", { name: /^CSRD$/i })).toBeVisible();
  await expect(page.locator("p").filter({ hasText: /^Corporate Sustainability Reporting Directive$/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Decision readiness/i })).toBeVisible();
  await expect(page.getByText(/Facts to confirm/i).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /Source evidence trail/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy source memo/i })).toBeVisible();
});

test("persona presets apply shareable regulation filters", async ({ page }) => {
  await page.goto("/regulations");

  await page.getByRole("button", { name: /Apply Finance or ESG controller persona preset/i }).click();
  await expect(page).toHaveURL(/persona=finance-controller/);
  await expect(page.getByText(/Active role lens/i)).toBeVisible();
  await expect(page.getByTestId("active-persona-role")).toHaveText("Finance or ESG controller");
  await expect(page.getByLabel(/Business function/i)).toHaveValue("Finance");
});

test("launch asset copy blocks render", async ({ page }) => {
  await page.goto("/launch");

  await expect(page.getByRole("heading", { name: /Copyable launch assets/i })).toBeVisible();
  await expect(page.getByText(/LinkedIn launch post: free Atlas/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy asset/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Draft email/i }).first()).toBeVisible();
  await expect(page.getByText(/commercial validation/i).first()).toBeVisible();
});

test("market profile pages render jurisdiction decision context", async ({ page }) => {
  await page.goto("/markets");

  await expect(page.getByRole("heading", { name: /Jurisdiction market profiles/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Market quick starts/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /European Union/i }).first()).toBeVisible();

  await page.goto("/jurisdiction/euu");
  await expect(page.getByRole("heading", { name: /European Union/i })).toBeVisible();
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
  await expect(page.getByText(/Planning question:/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /Evidence starter pack/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Likely owner functions/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy as Markdown/i })).toBeVisible();
});

test("briefing client summary exposes handoff links", async ({ page }) => {
  await page.goto("/briefing");

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
  await expect(page.getByText(/Source freshness signals/i)).toBeVisible();
  await expect(page.getByText(/Stale source/i)).toBeVisible();
  await expect(page.getByText(/Missing primary source/i)).toBeVisible();

  await page.getByRole("tab", { name: /Sources/i }).click();
  await expect(page.getByText(/Source posture samples/i)).toBeVisible();

  await page.getByRole("tab", { name: /Coverage/i }).click();
  await expect(page.getByText(/Coverage confidence/i)).toBeVisible();
  await expect(page.getByText(/Average confidence/i)).toBeVisible();

  await page.getByRole("tab", { name: /Review workflow/i }).click();
  await expect(page.getByText(/Premium evidence gates/i)).toBeVisible();
  await expect(page.getByText(/Premium-use blockers/i)).toBeVisible();
  await expect(page.getByText(/Review workflow export/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy priority review packet/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Export review CSV/i })).toBeVisible();
  await expect(page.getByText(/Owner placeholder:/i).first()).toBeVisible();
  await expect(page.getByText(/Premium use:/i).first()).toBeVisible();
});

test("key launch routes render", async ({ page }) => {
  for (const path of ["/markets", "/jurisdiction/euu", "/sectors", "/sectors/financial-services", "/assessment", "/timeline", "/briefing", "/data-quality", "/compare?jurisdictions=EUU,GBR", "/jurisdiction/euu/brief", "/launch"]) {
    await page.goto(path);
    await expect(page.locator("body")).toContainText(/Etica ESG|Regulatory Atlas|Brief|Timeline|Assessment|Data Quality/i);
  }
});
