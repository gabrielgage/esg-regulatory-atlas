import { expect, test } from "@playwright/test";
import { premiumPacks } from "../data/premiumPacks";
import { regulations } from "../data/seed";
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
