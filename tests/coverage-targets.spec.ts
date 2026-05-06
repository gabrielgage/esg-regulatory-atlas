import { expect, test } from "@playwright/test";
import { coverageTargets } from "../data/coverageTargets";
import { jurisdictions, regulations } from "../data/seed";
import { coverageConfidenceForJurisdiction } from "../lib/coverageConfidence";
import { decisionReadinessFor } from "../lib/decisionReadiness";
import { buildReviewWorkflowRows, reviewWorkflowCsv, reviewWorkflowMarkdown } from "../lib/reviewWorkflow";
import { sourceEvidenceFor, sourceGovernanceMemo } from "../lib/sourceGovernance";

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

test("decision readiness produces review controls for marquee records", () => {
  const csrd = regulations.find((regulation) => regulation.id === "csrd");
  expect(csrd).toBeTruthy();

  const plan = decisionReadinessFor(csrd!, regulations);
  expect(plan.factsToConfirm.length).toBeGreaterThan(0);
  expect(plan.evidencePackage.length).toBeGreaterThan(0);
  expect(plan.firstThirtyDayActions.length).toBeGreaterThan(0);
  expect(plan.sourceReviewSteps.length).toBeGreaterThan(0);
  expect(plan.level).toMatch(/orientation-ready|review-before-client-use|premium-blocked/);
});

test("source governance produces review packets and caveated copy", () => {
  const csrd = regulations.find((regulation) => regulation.id === "csrd");
  expect(csrd).toBeTruthy();

  const evidence = sourceEvidenceFor(csrd!);
  const memo = sourceGovernanceMemo(csrd!);

  expect(evidence.sourceReviewSteps.length).toBeGreaterThan(0);
  expect(evidence.reviewPacket.length).toBeGreaterThan(0);
  expect(evidence.level).toMatch(/current|upcoming-review|stale|review-date-missing|priority-source-needed|source-missing/);
  expect(memo).toContain("Source review memo");
  expect(memo).toContain("does not constitute legal");
});

test("review workflow exports source review rows with caveats", () => {
  const rows = buildReviewWorkflowRows(regulations);
  const csv = reviewWorkflowCsv(rows);
  const markdown = reviewWorkflowMarkdown(rows, 3);

  expect(rows.length).toBe(regulations.length);
  expect(rows[0].reviewPriority).toBeGreaterThanOrEqual(rows[1].reviewPriority);
  expect(csv).toContain("sourcePosture");
  expect(csv).toContain("prioritySourceUrl");
  expect(markdown).toContain("source review workflow packet");
  expect(markdown).toContain("does not constitute legal");
});
