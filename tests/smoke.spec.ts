import { expect, test } from "@playwright/test";

test("map workspace loads with core product controls", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Etica ESG/i }).first()).toBeVisible();
  await expect(page.getByTestId("regulatory-map")).toBeVisible();
  await expect(page.getByLabel(/Language/i)).toBeVisible();
  await expect(page.getByPlaceholder(/Search title/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Regulations/i })).toBeVisible();
});

test("country outline map renders and supports jurisdiction selection on tablet", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 900 });
  await page.goto("/");

  await expect(page.getByTestId("country-outline-map")).toBeVisible();
  await expect(page.getByTestId("country-path").first()).toBeVisible();
  expect(await page.getByTestId("country-path").count()).toBeGreaterThan(30);

  const mapBox = await page.getByTestId("country-outline-map").boundingBox();
  expect(mapBox?.width).toBeGreaterThan(500);
  expect(mapBox?.height).toBeGreaterThan(300);

  await page.getByRole("button", { name: /Canada:/ }).first().click();
  await expect(page.getByRole("heading", { name: /Canada/i }).first()).toBeVisible();
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

test("regulations workspace supports detail navigation", async ({ page }) => {
  await page.goto("/regulations");

  await expect(page.getByRole("heading", { name: /Search the ESG regulatory database/i })).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
  await page.getByRole("link", { name: /Open CSRD/i }).click();
  await expect(page).toHaveURL(/\/regulations\/csrd$/);
  await expect(page.getByRole("heading", { name: /^CSRD$/i })).toBeVisible();
  await expect(page.locator("p").filter({ hasText: /^Corporate Sustainability Reporting Directive$/ })).toBeVisible();
});

test("key launch routes render", async ({ page }) => {
  for (const path of ["/assessment", "/timeline", "/briefing", "/data-quality", "/compare?jurisdictions=EUU,GBR", "/jurisdiction/euu/brief"]) {
    await page.goto(path);
    await expect(page.locator("body")).toContainText(/Etica ESG|Regulatory Atlas|Brief|Timeline|Assessment|Data Quality/i);
  }
});
