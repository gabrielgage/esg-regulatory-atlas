import { expect, test } from "@playwright/test";

test("business function workbench renders owner-oriented planning", async ({ page }) => {
  await page.goto("/functions");

  await expect(page.getByRole("heading", { name: /Translate regulation into internal action/i })).toBeVisible();
  await expect(page.getByTestId("business-function-metrics")).toContainText(/Owner functions/i);
  await expect(page.getByTestId("owner-priority-lanes")).toContainText(/Priority owner lanes/i);
  await expect(page.getByTestId("owner-priority-lanes")).toContainText(/Sustainability/i);
  await expect(page.getByTestId("business-function-workbench")).toContainText(/Evidence focus/i);
  await expect(page.getByTestId("business-function-workbench")).toContainText(/Priority records/i);
  await expect(page.getByText(/Owner views are planning aids/i)).toBeVisible();

  const filterLink = page.getByRole("link", { name: /Filter database/i }).first();
  await expect(filterLink).toHaveAttribute("href", /businessFunction=Sustainability/);
  await expect(page.getByRole("link", { name: /Request owner matrix/i })).toHaveAttribute("href", /mailto:gabriel@eticaesg\.com/);
});

test("owner workbench is available from planning navigation", async ({ page }) => {
  await page.goto("/");

  const navigation = page.locator("header").getByRole("navigation");
  await navigation.getByText("More", { exact: true }).click();
  await expect(navigation.getByRole("link", { name: /^Functions$/i })).toBeVisible();
});
