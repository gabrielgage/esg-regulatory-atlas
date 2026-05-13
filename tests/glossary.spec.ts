import { expect, test } from "@playwright/test";

test("glossary route renders orientation terms and navigation", async ({ page }) => {
  await page.goto("/glossary");

  await expect(page.getByRole("heading", { name: /Plain-language ESG regulatory terms/i })).toBeVisible();
  await expect(page.getByText(/Definitions are for orientation only/i)).toBeVisible();
  await expect(page.getByRole("heading", { name: /Double materiality/i })).toBeVisible();
  await expect(page.locator("h2", { hasText: "Value chain" })).toBeVisible();
  await expect(page.getByRole("link", { name: /CSRD record/i })).toBeVisible();

  await page.locator("header").getByText("More", { exact: true }).click();
  await expect(page.locator("header").getByRole("link", { name: /Glossary/i })).toBeVisible();
});
