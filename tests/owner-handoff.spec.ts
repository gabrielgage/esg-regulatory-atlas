import { expect, test } from "@playwright/test";

test("regulation details expose owner handoff planning", async ({ page }) => {
  await page.goto("/regulations/csrd");

  const handoff = page.getByTestId("owner-handoff-panel");
  await expect(handoff).toContainText(/Owner handoff/i);
  await expect(handoff).toContainText(/Suggested owner lanes/i);
  await expect(handoff).toContainText(/First actions/i);
  await expect(handoff).toContainText(/Evidence focus/i);
  await expect(handoff).toContainText(/planning signals only/i);
  await expect(handoff.getByRole("link", { name: /Open owner workbench/i })).toHaveAttribute("href", "/functions");
  await expect(handoff.getByRole("link", { name: /Filter by owner/i })).toHaveAttribute("href", /businessFunction=/);
});
