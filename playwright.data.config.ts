import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "data-guardrails.spec.ts",
  timeout: 30_000
});
