import { expect, test } from "@playwright/test";

test("data quality page links status and source labels to glossary", async ({ page }) => {
  await page.goto("/data-quality");

  await expect(page.getByRole("heading", { name: /Need help interpreting status and source labels/i })).toBeVisible();
  await expect(page.getByText(/in force, first reporting, needs review, date uncertain and source missing/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open glossary/i })).toHaveAttribute("href", "/glossary");
});

test("regulation detail page links record labels to glossary", async ({ page }) => {
  await page.goto("/regulations/csrd");

  await expect(page.getByRole("heading", { name: /^CSRD$/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Interpret this record before using it/i })).toBeVisible();
  await expect(page.getByText(/Status, legal-force, readiness and data-quality labels are planning signals/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open glossary/i })).toHaveAttribute("href", "/glossary");
});

test("assessment page links shortlist categories to glossary", async ({ page }) => {
  await page.goto("/assessment");

  await expect(page.getByRole("heading", { name: /Interpret assessment categories carefully/i })).toBeVisible();
  await expect(page.getByText(/Assessment categories, confidence labels and data-quality signals are triage prompts/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open glossary/i })).toHaveAttribute("href", "/glossary");
});

test("timeline page links date labels to glossary", async ({ page }) => {
  await page.goto("/timeline");

  await expect(page.getByRole("heading", { name: /Interpret timeline dates carefully/i })).toBeVisible();
  await expect(page.getByText(/Timeline labels such as effective date, first reporting year, first report due date and Atlas review date are planning signals/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open glossary/i })).toHaveAttribute("href", "/glossary");
});
