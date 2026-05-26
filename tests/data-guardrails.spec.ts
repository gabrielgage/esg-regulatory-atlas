import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { advisorySampleOutputs } from "../data/advisorySampleOutputs";
import { DATASET_META } from "../data/_meta";
import { premiumPacks } from "../data/premiumPacks";
import { LEGAL_NOTICES } from "../data/legalNotices";
import { primaryNavItems, routeByHref, routeRegistry, secondaryNavGroups } from "../data/routeRegistry";
import { regulations } from "../data/seed";
import { thresholdMatrixRows } from "../data/thresholdMatrix";
import { premiumUseGateFor } from "../lib/premiumUseGates";
import type { Regulation } from "../types/regulation";

const bannedDefinitivePhrases = [
  "this applies to your company",
  "you must comply",
  "guaranteed compliance",
  "all applicable regulations",
  "complete global coverage"
];

test("regulation records carry minimum source governance metadata", () => {
  const failures = regulations.filter((regulation) => {
    const hasSourceOrExplicitGap = regulation.sourceUrls.length > 0 || regulation.dataQualityStatus === "source_missing";
    const hasCoreGovernance = Boolean(regulation.lastReviewed && regulation.confidenceLevel && regulation.dataQualityStatus);
    const highImpactHasReviewSignal = !regulation.highImpact || Boolean(regulation.latestUpdate || regulation.changeLogSummary || regulation.caveats?.length);
    return !hasSourceOrExplicitGap || !hasCoreGovernance || !highImpactHasReviewSignal;
  });

  expect(failures.map(summaryForFailure)).toEqual([]);
});

test("premium pack matched records expose a premium-use gate", () => {
  const failures = premiumPacks.flatMap((pack) =>
    matchedPackRegulations(pack.includedRegimes).flatMap((regulation) => {
      const gate = premiumUseGateFor(regulation);
      if (!gate.label || !gate.body || !gate.level) {
        return [`${pack.id} -> ${regulation.id} is missing a visible premium-use gate`];
      }
      return [];
    })
  );

  expect(failures).toEqual([]);
});

test("seed copy avoids definitive applicability and completeness claims", () => {
  const searchableCopy = [
    ...regulations.flatMap((regulation) => [
      regulation.title,
      regulation.shortName,
      regulation.summary,
      regulation.applicability,
      regulation.businessImpact,
      regulation.latestUpdate,
      regulation.changeLogSummary || "",
      ...(regulation.caveats || []),
      ...(regulation.requiredActions || []),
      ...(regulation.evidenceRequired || [])
    ]),
    ...premiumPacks.flatMap((pack) => [pack.name, pack.description, pack.disclaimer, pack.advisoryExtension, ...pack.outputs, ...pack.sampleTableOfContents])
  ]
    .join("\n")
    .toLowerCase();

  const hits = bannedDefinitivePhrases.filter((phrase) => searchableCopy.includes(phrase));
  expect(hits).toEqual([]);
});

test("shared legal notices preserve core caveats for reused surfaces", () => {
  expect(LEGAL_NOTICES.fullDisclaimer.toLowerCase()).toContain("not legal, tax, investment or assurance advice");
  expect(LEGAL_NOTICES.fullDisclaimer.toLowerCase()).toContain("qualified counsel or regulatory advisors");
  expect(LEGAL_NOTICES.shortDisclaimer.toLowerCase()).toContain("entity-specific facts");
  expect(LEGAL_NOTICES.copyOutput.toLowerCase()).toContain("validate primary sources");
  expect(LEGAL_NOTICES.manualRequest.toLowerCase()).toContain("do not create a paid account");
  expect(LEGAL_NOTICES.commercialPreview.toLowerCase()).toContain("static validation surfaces");
});

test("route registry classifies public navigation and internal surfaces", () => {
  const duplicateRoutes = routeRegistry
    .map((route) => route.href)
    .filter((href, index, all) => all.indexOf(href) !== index);
  expect(duplicateRoutes).toEqual([]);

  expect(primaryNavItems.map((route) => route.href)).toEqual(["/", "/assessment", "/markets", "/regulations", "/advisory"]);

  const visibleNavigationRoutes = [
    ...primaryNavItems.map((route) => route.href),
    ...secondaryNavGroups.flatMap((group) => group.items.map((route) => route.href))
  ];
  expect(visibleNavigationRoutes).not.toContain("/launch");
  expect(visibleNavigationRoutes).toContain("/plans");
  expect(visibleNavigationRoutes).toContain("/data-quality");

  expect(routeByHref("/launch")).toMatchObject({
    placement: "internal",
    visibility: "internal",
    robots: "noindex"
  });

  expect(routeByHref("/regulations/[slug]")).toMatchObject({
    placement: "contextual",
    visibility: "template",
    template: true
  });
});

test("static app routes have route registry entries", () => {
  const staticRoutes = [
    "/",
    "/about",
    "/advisory",
    "/alerts",
    "/assessment",
    "/briefing",
    "/changelog",
    "/compare",
    "/data-quality",
    "/glossary",
    "/launch",
    "/markets",
    "/methodology",
    "/plans",
    "/premium-roadmap",
    "/regulations",
    "/sectors",
    "/thresholds",
    "/timeline",
    "/value-chain"
  ];

  const missing = staticRoutes.filter((href) => !routeByHref(href));
  expect(missing).toEqual([]);
});

test("advisory sample outputs stay caveated and decision-oriented", () => {
  const failures = advisorySampleOutputs.filter((sample) => {
    const hasDecisionShape =
      sample.priorityRecords.length >= 3 &&
      sample.factsToConfirm.length >= 3 &&
      sample.evidencePackage.length >= 3 &&
      sample.firstActions.length >= 3 &&
      sample.sourceReviewNotes.length >= 2;
    const hasCaveat = /not a legal opinion|not legal advice|definitive applicability/i.test(sample.caveat);
    return !hasDecisionShape || !hasCaveat;
  });

  expect(failures.map((sample) => sample.id)).toEqual([]);
});

test("print header uses live dataset metadata instead of stale hardcoded edition", () => {
  const globalsCss = readFileSync("app/globals.css", "utf8");
  const layout = readFileSync("app/layout.tsx", "utf8");

  expect(layout).toContain("data-print-title");
  expect(layout).toContain("DATASET_META.edition");
  expect(globalsCss).toContain("attr(data-print-title)");
  expect(globalsCss).toContain("attr(data-print-subtitle)");
  expect(globalsCss).not.toContain("Edition 0.5 - May 2026");
  expect(DATASET_META.edition).toMatch(/^0\.5\.\d+ - May 2026$/);
});

test("threshold matrix rows map to sourced regulation records and preserve caveats", () => {
  const regulationIds = new Set(regulations.map((regulation) => regulation.id));
  const failures = thresholdMatrixRows.filter((row) => {
    const hasKnownRecord = regulationIds.has(row.regulationId);
    const hasSource = Boolean(row.sourceToVerify && row.sourceUrl);
    const hasCaveat = /planning|orientation|review|verify|confirm|not/i.test(row.caveat);
    const hasFacts = row.factsToConfirm.length >= 3;
    return !hasKnownRecord || !hasSource || !hasCaveat || !hasFacts;
  });

  expect(failures).toEqual([]);
});

function matchedPackRegulations(regimeNames: string[]) {
  const matches = regimeNames
    .map((regime) => regulations.find((regulation) => regulationMatchesRegime(regulation, regime)))
    .filter((regulation): regulation is Regulation => Boolean(regulation));
  return Array.from(new Map(matches.map((regulation) => [regulation.id, regulation])).values());
}

function regulationMatchesRegime(regulation: Regulation, regime: string) {
  const normalizedRegime = normalize(regime);
  const candidates = [regulation.id, regulation.shortName, regulation.title, ...(regulation.aliases || [])].map(normalize);
  return candidates.some((candidate) => candidate.includes(normalizedRegime) || normalizedRegime.includes(candidate));
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function summaryForFailure(regulation: Regulation) {
  return {
    id: regulation.id,
    sourceCount: regulation.sourceUrls.length,
    dataQualityStatus: regulation.dataQualityStatus,
    confidenceLevel: regulation.confidenceLevel,
    lastReviewed: regulation.lastReviewed,
    caveats: regulation.caveats?.length || 0,
    latestUpdate: Boolean(regulation.latestUpdate),
    changeLogSummary: Boolean(regulation.changeLogSummary),
    highImpact: Boolean(regulation.highImpact)
  };
}
