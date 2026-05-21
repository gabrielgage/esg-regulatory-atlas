import { expect, test } from "@playwright/test";

test("regulation detail decision readiness checklist is copyable with caveat guidance", async ({ page }) => {
  await page.goto("/regulations/csrd");

  await expect(page.getByRole("heading", { name: /^CSRD$/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Decision readiness/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy readiness checklist/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Implementation roadmap/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy roadmap/i })).toBeVisible();
  await expect(page.getByText(/Copied Markdown includes caveats and source-review notes/i).first()).toBeVisible();
  await expect(page.getByText(/Decision readiness is an orientation control/i)).toBeVisible();
});
