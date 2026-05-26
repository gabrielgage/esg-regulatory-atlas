import { expect, test } from "@playwright/test";

test("data quality page links status and source labels to glossary", async ({ page }) => {
  await page.goto("/data-quality");

  await expect(page.getByRole("heading", { name: /Need help interpreting status and source labels/i })).toBeVisible();
  await expect(page.getByText(/in force, first reporting, needs review, date uncertain and source missing/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open glossary/i })).toHaveAttribute("href", "/glossary");
  await expect(page.getByTestId("glossary-term-links").first().getByRole("link", { name: /Seed intelligence/i })).toHaveAttribute("href", "/glossary#seed-intelligence");
  await expect(page.getByTestId("glossary-term-links").first().getByRole("link", { name: /Legal force/i })).toHaveAttribute("href", "/glossary#legal-force");
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

test("briefing page links copied outputs to glossary", async ({ page }) => {
  await page.goto("/briefing");

  await expect(page.getByRole("heading", { name: /Interpret briefing outputs carefully/i })).toBeVisible();
  await expect(page.getByText(/Briefing tabs and copied summaries combine seed records, status labels, evidence prompts and advisory signals/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open glossary/i })).toHaveAttribute("href", "/glossary");
});

test("compare page links comparison outputs to glossary", async ({ page }) => {
  await page.goto("/compare?jurisdictions=EUU,GBR");

  await expect(page.getByRole("heading", { name: /Interpret comparison outputs carefully/i })).toBeVisible();
  await expect(page.getByText(/Comparison tables show tracked differences in seed records, not legal equivalence or complete market coverage/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open glossary/i })).toHaveAttribute("href", "/glossary");
});

test("markets page links coverage counts to glossary", async ({ page }) => {
  await page.goto("/markets");

  await expect(page.getByRole("heading", { name: /Interpret market coverage carefully/i })).toBeVisible();
  await expect(page.getByText(/Market counts, confidence badges and review prompts describe current tracked seed coverage/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open glossary/i })).toHaveAttribute("href", "/glossary");
});

test("sectors page links sector coverage to glossary", async ({ page }) => {
  await page.goto("/sectors");

  await expect(page.getByRole("heading", { name: /Interpret sector coverage carefully/i })).toBeVisible();
  await expect(page.getByText(/Sector pages blend direct sector matches with broad all-sector rules/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open glossary/i })).toHaveAttribute("href", "/glossary");
});

test("jurisdiction profile links market detail labels to glossary", async ({ page }) => {
  await page.goto("/jurisdiction/euu");

  await expect(page.getByRole("heading", { name: /Interpret market profile details carefully/i })).toBeVisible();
  await expect(page.getByText(/This profile combines direct and inherited seed records, priority sorting, readiness scores and source-confidence signals/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open glossary/i })).toHaveAttribute("href", "/glossary");
});

test("sector profile links sector detail labels to glossary", async ({ page }) => {
  await page.goto("/sectors/financial-services");

  await expect(page.getByRole("heading", { name: /Interpret sector profile details carefully/i })).toBeVisible();
  await expect(page.getByText(/This profile combines direct sector matches, broad all-sector records, timing signals, source-confidence cues and advisory prompts/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Open glossary/i })).toHaveAttribute("href", "/glossary");
});
