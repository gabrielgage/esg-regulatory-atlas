import { expect, test } from "@playwright/test";

test("homepage workspace chrome follows the language toggle", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel(/Language/i).selectOption("es");
  await expect(page.getByRole("link", { name: "Ver mercados", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Buscar regulaciones", exact: true })).toBeVisible();
  await expect(page.getByText(/Explorar el mapa regulatorio/i)).toBeVisible();
  await expect(page.getByTestId("priority-record-card").first()).toContainText(/Fuente a verificar:/i);
  await expect(page.getByTestId("priority-record-card").first()).toContainText(/Primer reporte/i);
});
