import { readinessScore } from "@/lib/scoring";
import { uniq } from "@/lib/utils";
import type { BusinessImpact, Jurisdiction, Regulation } from "@/types/regulation";

type ObligationConfig = {
  impact: BusinessImpact;
  title: string;
  description: string;
  firstAction: string;
};

export type MarketObligationProfile = ObligationConfig & {
  matchedRecords: Regulation[];
  topRecords: Regulation[];
  ownerFunctions: string[];
  evidence: string[];
};

const obligationConfigs: ObligationConfig[] = [
  {
    impact: "reporting obligation",
    title: "Reporting obligation",
    description: "Disclosure, filing or sustainability reporting signals in the current market profile.",
    firstAction: "Confirm reporting entity scope, reporting year, consolidation boundary and source systems."
  },
  {
    impact: "assurance obligation",
    title: "Assurance obligation",
    description: "Assurance, audit-readiness or controls-evidence signals that may affect reporting preparation.",
    firstAction: "Map assurance evidence, control owners and documentation gaps before treating records as client-ready."
  },
  {
    impact: "governance obligation",
    title: "Governance obligation",
    description: "Governance, policy, oversight or management-system signals tied to sustainability regulation.",
    firstAction: "Identify accountable owners, governance forums and policy documents that may need review."
  },
  {
    impact: "board oversight obligation",
    title: "Board oversight obligation",
    description: "Board, risk committee or senior-management oversight signals in the tracked seed records.",
    firstAction: "Prepare a board-level summary of source status, timing, business exposure and open facts to confirm."
  },
  {
    impact: "due diligence obligation",
    title: "Due diligence obligation",
    description: "Human-rights, environmental, supplier or risk-based due-diligence signals.",
    firstAction: "Confirm scope triggers, covered relationships, risk methodology and remediation evidence."
  },
  {
    impact: "supply chain obligation",
    title: "Supply-chain obligation",
    description: "Supplier, importer/exporter, commodity or upstream value-chain signals.",
    firstAction: "Build a supplier evidence file and identify procurement, legal and operations owners."
  },
  {
    impact: "financial disclosure obligation",
    title: "Financial disclosure obligation",
    description: "Financial-market, investor, prudential or climate-financial disclosure signals.",
    firstAction: "Separate entity, product, portfolio and investor-request evidence before preparing a briefing."
  },
  {
    impact: "taxonomy disclosure obligation",
    title: "Taxonomy disclosure obligation",
    description: "Taxonomy eligibility, alignment or classification signals for sustainable finance and reporting.",
    firstAction: "Confirm eligible activities, financial KPI boundaries and source methodology before reuse."
  },
  {
    impact: "transition plan obligation",
    title: "Transition-plan obligation",
    description: "Climate transition planning, target, scenario or decarbonization-plan signals.",
    firstAction: "Map transition-plan ownership, emissions baselines, target evidence and governance approvals."
  },
  {
    impact: "data collection obligation",
    title: "Data collection obligation",
    description: "Data, metric, evidence or systems signals needed to support sustainability compliance planning.",
    firstAction: "Create a data-owner inventory and identify unavailable, unaudited or manually collected datapoints."
  },
  {
    impact: "product compliance obligation",
    title: "Product compliance obligation",
    description: "Product, trade, market-placement, circularity, claims or technical-file signals.",
    firstAction: "Confirm covered products, market-placement facts, technical documentation and claim substantiation."
  }
];

export function marketObligationProfiles(records: Regulation[]) {
  const sorted = [...records].sort((a, b) => readinessScore(b) - readinessScore(a));

  return obligationConfigs
    .map((config) => {
      const matchedRecords = sorted.filter((record) => record.businessImpacts.includes(config.impact));
      return {
        ...config,
        matchedRecords,
        topRecords: matchedRecords.slice(0, 3),
        ownerFunctions: uniq(matchedRecords.flatMap((record) => record.affectedFunctions)).slice(0, 5),
        evidence: uniq(matchedRecords.flatMap((record) => record.evidenceRequired || [])).slice(0, 5)
      };
    })
    .sort((a, b) => {
      if (b.matchedRecords.length !== a.matchedRecords.length) return b.matchedRecords.length - a.matchedRecords.length;
      return topScore(b.topRecords) - topScore(a.topRecords);
    });
}

export function marketObligationMarkdown(jurisdiction: Jurisdiction, records: Regulation[]) {
  const profiles = marketObligationProfiles(records).filter((profile) => profile.matchedRecords.length > 0);

  return [
    "## Market obligation footprint",
    `The ${jurisdiction.name} obligation footprint is derived from current seed records and should be used as planning orientation only.`,
    "",
    ...(profiles.length
      ? profiles.flatMap((profile) => [
          `### ${profile.title}`,
          profile.description,
          "",
          `Matched records: ${profile.matchedRecords.length}`,
          `Priority records: ${profile.topRecords.map((record) => record.shortName).join(", ") || "n/a"}`,
          `Likely owner functions: ${profile.ownerFunctions.join(", ") || "Confirm during source review"}`,
          `Evidence starter: ${profile.evidence.slice(0, 3).join(", ") || "Confirm record-level evidence needs"}`,
          `First action: ${profile.firstAction}`,
          ""
        ])
      : ["No obligation categories are populated for this market in the current seed dataset.", ""]),
    "The obligation footprint does not determine legal applicability, entity-specific duties or complete jurisdiction coverage."
  ].join("\n");
}

function topScore(records: Regulation[]) {
  return records.length ? readinessScore(records[0]) : 0;
}
