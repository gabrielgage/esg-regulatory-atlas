import { expect, test } from "@playwright/test";

test("homepage workspace chrome follows the language toggle", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel(/Language/i).selectOption("es");
  await expect(page.getByRole("link", { name: /Comparar opciones/i })).toBeVisible();
  await expect(page.getByText(/Espacio de mapa/i)).toBeVisible();
  await expect(page.getByTestId("priority-record-card").first()).toContainText(/Fuente a verificar:/i);
  await expect(page.getByTestId("priority-record-card").first()).toContainText(/Primer reporte/i);
});
