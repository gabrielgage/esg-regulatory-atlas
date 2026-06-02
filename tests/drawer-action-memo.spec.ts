import { expect, test } from "@playwright/test";

test("map workspace drawer exposes compact action memo", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("priority-record-card").first().click();

  const drawer = page.locator("aside").filter({ has: page.getByRole("button", { name: /Close regulation detail/i }) });
  await expect(drawer.getByRole("button", { name: /Close regulation detail/i })).toBeVisible();

  const memo = drawer.getByTestId("regulation-action-memo");
  await expect(memo).toContainText(/Decision-ready next step summary/i);
  await expect(memo).toContainText(/Facts to confirm before reliance/i);
  await expect(memo).toContainText(/First 30-day actions/i);
  await expect(memo).toContainText(/Source to verify first/i);
  await expect(memo.getByRole("button", { name: /Copy action memo/i })).toBeVisible();
  await expect(memo).toContainText(/does not determine legal applicability/i);
});
