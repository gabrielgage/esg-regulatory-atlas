import { expect, test } from "@playwright/test";

test("regulation exports explain caveat metadata", async ({ page }) => {
  await page.goto("/regulations");

  await expect(page.getByRole("button", { name: /CSV/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /JSON/i })).toBeVisible();
  await expect(page.getByTestId("regulation-export-caveat")).toContainText(/Exports include Etica ESG edition metadata/i);
  await expect(page.getByTestId("regulation-export-caveat")).toContainText(/confirm primary sources/i);
});
