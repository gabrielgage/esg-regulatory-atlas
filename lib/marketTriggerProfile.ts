import type { Jurisdiction, Regulation } from "@/types/regulation";
import { readinessScore } from "@/lib/scoring";
import { uniq } from "@/lib/utils";

export type MarketTriggerKind =
  | "corporate-reporting"
  | "climate-transition"
  | "sustainable-finance"
  | "supply-chain"
  | "product-trade"
  | "source-review";

export type MarketTrigger = {
  kind: MarketTriggerKind;
  title: string;
  description: string;
  matchedRecords: Regulation[];
  topRecords: Regulation[];
  verifyNext: string;
  firstAction: string;
};

export function marketTriggersFor(jurisdiction: Jurisdiction, records: Regulation[]): MarketTrigger[] {
  const sorted = [...records].sort((a, b) => readinessScore(b) - readinessScore(a));

  return [
    buildTrigger(
      "corporate-reporting",
      "Corporate reporting and disclosure",
      "Reporting, assurance, data-collection and governance obligations that may affect corporate sustainability disclosure.",
      sorted.filter((record) =>
        hasTopic(record, ["Corporate reporting", "Assurance", "Governance"]) ||
        hasImpact(record, ["reporting obligation", "assurance obligation", "data collection obligation", "board oversight obligation"])
      ),
      "Confirm entity size, listing status, group boundary, reporting year, assurance timing and local transposition.",
      "Map reporting owners, datapoints, source systems and assurance evidence before turning this into a compliance workplan."
    ),
    buildTrigger(
      "climate-transition",
      "Climate, GHG and transition planning",
      "Climate-risk, emissions, transition-plan and climate-financial-disclosure records that may shape reporting or governance readiness.",
      sorted.filter((record) =>
        hasTopic(record, ["Climate", "Climate disclosure", "GHG emissions", "Climate transition planning"]) ||
        hasImpact(record, ["transition plan obligation"])
      ),
      "Confirm first reporting period, climate-scenario expectations, emissions boundaries and whether Scope 3 or transition-plan signals are in scope.",
      "Create a climate data inventory, owner map and milestone calendar for potentially relevant records."
    ),
    buildTrigger(
      "sustainable-finance",
      "Sustainable finance and investor disclosure",
      "Fund, banking, insurance, taxonomy, portfolio, financed-emissions and investor-facing records that may shape financial-market workflows.",
      sorted.filter((record) =>
        hasTopic(record, ["Sustainable finance", "Taxonomy and classification", "Financial risk"]) ||
        record.sectors.some((sector) => ["Financial services", "Asset management", "Banking", "Insurance", "Private equity"].includes(sector)) ||
        hasImpact(record, ["financial disclosure obligation", "taxonomy disclosure obligation"])
      ),
      "Confirm regulated-entity role, financial product status, portfolio exposure, taxonomy linkage and investor/customer data requests.",
      "Separate entity-level, product-level and portfolio-level evidence before using the record in a financial-services briefing."
    ),
    buildTrigger(
      "supply-chain",
      "Supply chain, due diligence and human rights",
      "Supplier, upstream, importer/exporter, human-rights and due-diligence signals that may affect procurement, trade or value-chain governance.",
      sorted.filter((record) =>
        hasTopic(record, ["Supply chain due diligence", "Human rights", "Deforestation"]) ||
        hasImpact(record, ["due diligence obligation", "supply chain obligation"]) ||
        record.valueChain.some((value) => /supplier|upstream|trade|import|commodity/i.test(value))
      ),
      "Confirm supplier role, control relationships, high-risk commodities, importer/exporter status and customer data-request exposure.",
      "Build a supplier and value-chain evidence file with source review, risk owners and open legal questions."
    ),
    buildTrigger(
      "product-trade",
      "Product, trade, circularity and claims",
      "Product-compliance, circular-economy, green-claims, batteries, packaging, CBAM, EUDR and market-placement signals.",
      sorted.filter((record) =>
        hasTopic(record, ["Product sustainability", "Circular economy", "Green claims", "Deforestation"]) ||
        hasImpact(record, ["product compliance obligation"]) ||
        record.valueChain.some((value) => /product|trade|import|downstream/i.test(value))
      ),
      "Confirm products placed on market, covered goods, customs or commodity codes, claim substantiation and technical-file obligations.",
      "Assign legal, product, procurement and operations owners to screen market-placement and product-data evidence."
    ),
    buildTrigger(
      "source-review",
      "Source and threshold review",
      "Records with lower confidence, non-verified data status, date uncertainty or threshold-sensitive scope that should be checked before reuse.",
      sorted.filter((record) => record.dataQualityStatus !== "verified_seed" || record.confidenceLevel !== "high" || record.highImpact),
      "Confirm priority sources, source dates, threshold facts, phase-in timing, legal status and unresolved caveats.",
      "Use Data Quality, the threshold matrix and regulation detail roadmaps before using these records in premium or advisory outputs."
    )
  ];
}

export function marketTriggerMarkdown(jurisdiction: Jurisdiction, records: Regulation[]) {
  const triggers = marketTriggersFor(jurisdiction, records).filter((trigger) => trigger.matchedRecords.length > 0);

  return [
    "## Market trigger review",
    ...(triggers.length
      ? triggers.flatMap((trigger) => [
          `### ${trigger.title}`,
          trigger.description,
          "",
          `Matched records: ${trigger.matchedRecords.length}`,
          `Priority records: ${trigger.topRecords.map((record) => record.shortName).join(", ") || "n/a"}`,
          `Verify next: ${trigger.verifyNext}`,
          `First action: ${trigger.firstAction}`,
          ""
        ])
      : ["No trigger categories are populated for this market in the current seed dataset.", ""]),
    "Market trigger review is orientation only. It does not determine legal applicability or complete jurisdiction coverage."
  ].join("\n");
}

function buildTrigger(
  kind: MarketTriggerKind,
  title: string,
  description: string,
  matchedRecords: Regulation[],
  verifyNext: string,
  firstAction: string
): MarketTrigger {
  const uniqueRecords = uniq(matchedRecords.map((record) => record.id))
    .map((id) => matchedRecords.find((record) => record.id === id))
    .filter(Boolean) as Regulation[];

  return {
    kind,
    title,
    description,
    matchedRecords: uniqueRecords,
    topRecords: uniqueRecords.slice(0, 3),
    verifyNext,
    firstAction
  };
}

function hasTopic(record: Regulation, topics: string[]) {
  return record.topics.some((topic) => topics.includes(topic));
}

function hasImpact(record: Regulation, impacts: string[]) {
  return record.businessImpacts.some((impact) => impacts.includes(impact));
}
