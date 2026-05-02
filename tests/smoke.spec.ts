import { expect, test } from "@playwright/test";

test("map workspace loads with core product controls", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Etica ESG/i }).first()).toBeVisible();
  await expect(page.getByTestId("regulatory-map")).toBeVisible();
  await expect(page.getByLabel(/Language/i)).toBeVisible();
  await expect(page.getByPlaceholder(/Search title/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Regulations/i })).toBeVisible();
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
  await expect(page.getByRole("heading", { name: /Corporate Sustainability Reporting Directive/i })).toBeVisible();
});

test("key launch routes render", async ({ page }) => {
  for (const path of ["/assessment", "/timeline", "/briefing", "/data-quality", "/compare?jurisdictions=EUU,GBR", "/jurisdiction/euu/brief"]) {
    await page.goto(path);
    await expect(page.locator("body")).toContainText(/Etica ESG|Regulatory Atlas|Brief|Timeline|Assessment|Data Quality/i);
  }
});
