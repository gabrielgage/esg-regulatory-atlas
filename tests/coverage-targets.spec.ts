import { expect, test } from "@playwright/test";
import { coverageTargets } from "../data/coverageTargets";
import { jurisdictions, regulations } from "../data/seed";
import { coverageConfidenceForJurisdiction } from "../lib/coverageConfidence";

test("every tracked jurisdiction has a coverage target", () => {
  const targetIds = new Set(coverageTargets.map((target) => target.jurisdictionId));
  const missing = jurisdictions
    .filter((jurisdiction) => jurisdiction.type !== "international")
    .filter((jurisdiction) => !targetIds.has(jurisdiction.id))
    .map((jurisdiction) => jurisdiction.id);

  expect(missing).toEqual([]);
});

test("coverage targets are met by direct seed records", () => {
  const gaps = coverageTargets
    .map((target) => {
      const count = regulations.filter((regulation) => regulation.jurisdictionIds.includes(target.jurisdictionId)).length;
      return { ...target, count, missing: Math.max(0, target.targetDirectRecords - count) };
    })
    .filter((row) => row.missing > 0);

  expect(gaps).toEqual([]);
});

test("coverage confidence is classified for every tracked jurisdiction", () => {
  const rows = jurisdictions
    .filter((jurisdiction) => jurisdiction.type !== "international")
    .map((jurisdiction) => coverageConfidenceForJurisdiction(jurisdiction, regulations));

  expect(rows).toHaveLength(coverageTargets.length);
  expect(rows.every((row) => row.confidenceScore >= 0 && row.confidenceScore <= 100)).toBe(true);
  expect(rows.some((row) => row.reviewFlagCount > 0)).toBe(true);
});
