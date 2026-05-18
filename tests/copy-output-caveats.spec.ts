import { expect, test } from "@playwright/test";

test("jurisdiction profile tells users copied markdown includes caveats", async ({ page }) => {
  await page.goto("/jurisdiction/euu");

  await expect(page.getByText(/Copied Markdown includes caveats and source-review notes/i)).toBeVisible();
});

test("sector profile tells users copied markdown includes caveats", async ({ page }) => {
  await page.goto("/sectors/financial-services");

  await expect(page.getByText(/Copied Markdown includes caveats and source-review notes/i)).toBeVisible();
});

test("printable jurisdiction brief tells users copied markdown includes caveats", async ({ page }) => {
  await page.goto("/jurisdiction/euu/brief");

  await expect(page.getByText(/Copied Markdown includes caveats and source-review notes/i)).toBeVisible();
});
