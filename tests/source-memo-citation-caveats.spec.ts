import { expect, test } from "@playwright/test";

test("regulation detail source memo and citations carry caveats", async ({ page }) => {
  await page.goto("/regulations/csrd");

  await expect(page.getByRole("heading", { name: /^CSRD$/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy source memo/i })).toBeVisible();
  await expect(page.getByText(/Copied Markdown includes caveats and source-review notes/i)).toBeVisible();

  await page.getByText("Cite this record").click();
  await expect(page.getByTestId("citation-caveat")).toContainText(/not official legal citations/i);
  await expect(page.getByText(/Atlas citation only; not legal authority/i).first()).toBeVisible();
});
