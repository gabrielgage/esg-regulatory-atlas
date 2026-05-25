import { jurisdictions } from "@/data/jurisdictions";
import { regulations } from "@/data/seed";
import { valueChainImpacts } from "@/data/taxonomy";
import { readinessScore } from "@/lib/scoring";
import { uniq } from "@/lib/utils";
import type { Regulation } from "@/types/regulation";

export type ValueChainProfile = ReturnType<typeof valueChainProfileFor>;

export type ValueChainLaneId =
  | "supplier-due-diligence"
  | "trade-imports"
  | "products-claims"
  | "portfolio-finance"
  | "own-operations"
  | "customer-market-pressure";

export type ValueChainLaneDefinition = {
  id: ValueChainLaneId;
  label: string;
  shortLabel: string;
  description: string;
  startQuestion: string;
  audience: string;
  tags: string[];
  evidencePrompts: string[];
  firstActions: string[];
  suggestedOwners: string[];
};

export type ValueChainLaneProfile = ValueChainLaneDefinition & {
  slug: string;
  records: Regulation[];
  priorityRecords: Regulation[];
  highImpact: Regulation[];
  reviewFlags: number;
  sourceBacked: number;
  primarySourceBacked: number;
  markets: ReturnType<typeof marketCounts>;
  topics: string[];
  businessImpacts: string[];
  relatedTags: string[];
};

export const valueChainLaneDefinitions: ValueChainLaneDefinition[] = [
  {
    id: "supplier-due-diligence",
    label: "Supplier due diligence",
    shortLabel: "Suppliers",
    description: "Supplier, procurement, commodity and upstream human-rights or environmental risk exposure.",
    startQuestion: "Do suppliers, commodities, contractors or outsourced activities create ESG evidence needs?",
    audience: "Procurement, legal, compliance, sustainability and operations teams",
    tags: ["Upstream suppliers", "Land use and nature"],
    evidencePrompts: ["Supplier list and tiering", "Commodity and origin evidence", "Supplier ESG attestations", "Due-diligence policy and escalation records"],
    firstActions: ["Map suppliers by jurisdiction and commodity.", "Identify supplier evidence already collected.", "Prioritise high-risk supplier records for source review."],
    suggestedOwners: ["Procurement", "Legal", "Compliance", "Sustainability"]
  },
  {
    id: "trade-imports",
    label: "Trade and imports",
    shortLabel: "Trade",
    description: "Importer/exporter, customs, market-access, embedded-emissions and origin-data exposure.",
    startQuestion: "Do imported goods, exported products or customs records create sustainability obligations?",
    audience: "Trade compliance, procurement, operations, finance and product teams",
    tags: ["Trade and imports"],
    evidencePrompts: ["Import/export data", "CN/HS code mapping", "Origin and supplier declarations", "Embedded-emissions or commodity-risk evidence"],
    firstActions: ["Map trade flows and product categories.", "Confirm product and origin data availability.", "Assign legal, trade and finance source-review owners."],
    suggestedOwners: ["Trade compliance", "Operations", "Finance", "Procurement"]
  },
  {
    id: "products-claims",
    label: "Products, claims and circularity",
    shortLabel: "Products",
    description: "Product sustainability, circularity, labeling, green claims and substantiation exposure.",
    startQuestion: "Are products, labels, environmental claims or product data requests creating regulatory risk?",
    audience: "Product, marketing, legal, sustainability and supply-chain teams",
    tags: ["Products and services", "Products and materials", "Customer claims and labels"],
    evidencePrompts: ["Product specifications", "Environmental claim substantiation", "Lifecycle or circularity evidence", "Market placement and labeling evidence"],
    firstActions: ["Inventory product lines and claims by market.", "Collect substantiation and product-compliance evidence.", "Review claims and labeling rules with counsel."],
    suggestedOwners: ["Product", "Legal", "Marketing", "Sustainability"]
  },
  {
    id: "portfolio-finance",
    label: "Portfolio and financed emissions",
    shortLabel: "Portfolio",
    description: "Fund, asset-management, lender, insurer, investor and portfolio-company ESG data exposure.",
    startQuestion: "Do funds, investees, loans, insurance portfolios or investor requests create ESG data needs?",
    audience: "Asset managers, banks, insurers, private equity, investor relations and finance teams",
    tags: ["Investment portfolio", "Financed emissions"],
    evidencePrompts: ["Portfolio company ESG data", "Financed-emissions methodology", "Fund classification evidence", "Stewardship and engagement records"],
    firstActions: ["Map funds, loans, investees and portfolio data requests.", "Identify financed-emissions and classification data gaps.", "Prioritise investor-facing source review."],
    suggestedOwners: ["Finance", "Investor relations", "Risk", "Sustainability"]
  },
  {
    id: "own-operations",
    label: "Own operations and governance",
    shortLabel: "Operations",
    description: "Operational footprint, reporting boundaries, board oversight, controls and internal governance exposure.",
    startQuestion: "Do direct operations, facilities, reporting boundaries or board oversight create readiness work?",
    audience: "Sustainability, finance, legal, risk, internal audit and board teams",
    tags: ["Own operations", "Board and executive oversight"],
    evidencePrompts: ["Legal entity and site map", "Operational emissions and controls", "Board oversight evidence", "Reporting calendar and owner matrix"],
    firstActions: ["Map legal entities, sites and reporting boundaries.", "Assign owners for operational evidence.", "Review governance and assurance readiness."],
    suggestedOwners: ["Sustainability", "Finance", "Risk", "Internal audit"]
  },
  {
    id: "customer-market-pressure",
    label: "Customer and market pressure",
    shortLabel: "Customers",
    description: "Customer, investor, tender, buyer and downstream data-request exposure even where direct legal scope is uncertain.",
    startQuestion: "Are customers, buyers or tenders requesting ESG evidence because of their own obligations?",
    audience: "Sales, procurement, sustainability, legal and customer-facing teams",
    tags: ["Downstream customers"],
    evidencePrompts: ["Customer ESG questionnaires", "Tender and contract evidence requests", "Product or supplier disclosures", "Investor or buyer request logs"],
    firstActions: ["Catalogue recurring ESG data requests.", "Link buyer requests to likely source regimes.", "Create a reusable evidence pack with caveats."],
    suggestedOwners: ["Sales", "Sustainability", "Legal", "Procurement"]
  }
];

export function valueChainSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function trackedValueChainImpacts() {
  const observed = uniq(regulations.flatMap((regulation) => [...regulation.valueChain, ...regulation.valueChainImpact]).filter(Boolean));
  return uniq([...valueChainImpacts, ...observed]);
}

export function valueChainProfileFor(label: string) {
  const directRecords = regulations.filter((regulation) => regulationTouchesValueChain(regulation, label));
  const sortedRecords = [...directRecords].sort(prioritySort);
  const highImpact = sortedRecords.filter((regulation) => regulation.highImpact);
  const reviewFlags = sortedRecords.filter((regulation) => regulation.dataQualityStatus !== "verified_seed" || regulation.confidenceLevel !== "high").length;
  const sourceBacked = sortedRecords.filter((regulation) => regulation.sourceUrls.length > 0).length;
  const primarySourceBacked = sortedRecords.filter((regulation) =>
    regulation.sourceUrls.some((source) => source.type === "primary" || source.type === "regulator" || source.type === "standards_body")
  ).length;

  return {
    label,
    slug: valueChainSlug(label),
    records: sortedRecords,
    priorityRecords: sortedRecords.slice(0, 5),
    highImpact,
    reviewFlags,
    sourceBacked,
    primarySourceBacked,
    markets: marketCounts(sortedRecords),
    topics: uniq(sortedRecords.flatMap((regulation) => regulation.topics)).slice(0, 8),
    sectors: uniq(sortedRecords.flatMap((regulation) => regulation.sectors).filter((sector) => sector !== "All sectors")).slice(0, 8),
    companyTypes: uniq(sortedRecords.flatMap((regulation) => regulation.companyTypes || [])).slice(0, 8),
    businessImpacts: uniq(sortedRecords.flatMap((regulation) => regulation.businessImpacts)).slice(0, 8),
    evidenceRequired: uniq(sortedRecords.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 6),
    requiredActions: uniq(sortedRecords.flatMap((regulation) => regulation.requiredActions || [])).slice(0, 6),
    advisoryOpportunities: uniq(sortedRecords.flatMap((regulation) => regulation.advisoryOpportunities)).slice(0, 6)
  };
}

export function valueChainProfiles() {
  return trackedValueChainImpacts()
    .map((label) => valueChainProfileFor(label))
    .filter((profile) => profile.records.length > 0)
    .sort((a, b) => {
      if (b.records.length !== a.records.length) return b.records.length - a.records.length;
      if (b.highImpact.length !== a.highImpact.length) return b.highImpact.length - a.highImpact.length;
      return a.label.localeCompare(b.label);
    });
}

export function valueChainLaneProfiles() {
  return valueChainLaneDefinitions.map((lane) => {
    const records = regulations
      .filter((regulation) => lane.tags.some((tag) => regulationTouchesValueChain(regulation, tag)))
      .sort(prioritySort);
    const sortedRecords = uniqueRegulations(records);
    const highImpact = sortedRecords.filter((regulation) => regulation.highImpact);
    const reviewFlags = sortedRecords.filter((regulation) => regulation.dataQualityStatus !== "verified_seed" || regulation.confidenceLevel !== "high").length;
    const sourceBacked = sortedRecords.filter((regulation) => regulation.sourceUrls.length > 0).length;
    const primarySourceBacked = sortedRecords.filter((regulation) =>
      regulation.sourceUrls.some((source) => source.type === "primary" || source.type === "regulator" || source.type === "standards_body")
    ).length;

    return {
      ...lane,
      slug: lane.id,
      records: sortedRecords,
      priorityRecords: sortedRecords.slice(0, 4),
      highImpact,
      reviewFlags,
      sourceBacked,
      primarySourceBacked,
      markets: marketCounts(sortedRecords),
      topics: uniq(sortedRecords.flatMap((regulation) => regulation.topics)).slice(0, 6),
      businessImpacts: uniq(sortedRecords.flatMap((regulation) => regulation.businessImpacts)).slice(0, 6),
      relatedTags: lane.tags
    } satisfies ValueChainLaneProfile;
  });
}

export function valueChainLaneMarkdown(lane: ValueChainLaneProfile) {
  return [
    `# ${lane.label} value-chain lane`,
    "",
    "This is indicative seed regulatory intelligence for orientation and planning. It is not legal, tax, investment or assurance advice.",
    "",
    `Start question: ${lane.startQuestion}`,
    `Primary users: ${lane.audience}`,
    "",
    "## Priority records to review",
    ...(lane.priorityRecords.length
      ? lane.priorityRecords.map((regulation) => `- ${regulation.shortName}: ${regulation.summary}`)
      : ["- No priority records in the current seed dataset."]),
    "",
    `Tracked records: ${lane.records.length}`,
    `High-impact records: ${lane.highImpact.length}`,
    `Source-backed records: ${lane.sourceBacked}/${lane.records.length || 0}`,
    `Priority-source backed records: ${lane.primarySourceBacked}/${lane.records.length || 0}`,
    `Records needing confidence/source review: ${lane.reviewFlags}`,
    "",
    "## Evidence to prepare",
    ...lane.evidencePrompts.map((item) => `- ${item}`),
    "",
    "## First actions",
    ...lane.firstActions.map((action) => `- ${action}`),
    "",
    "## Suggested owners",
    ...lane.suggestedOwners.map((owner) => `- ${owner}`),
    "",
    "## Caveat",
    "This value-chain lane reflects current Atlas seed records tagged to this exposure. It is not a complete legal inventory and does not determine entity-specific applicability."
  ].join("\n");
}

export function valueChainMarkdown(profile: ValueChainProfile) {
  return [
    `# ${profile.label} value-chain exposure`,
    "",
    "This is indicative seed regulatory intelligence for orientation and planning. It is not legal, tax, investment or assurance advice.",
    "",
    "## Priority records",
    ...(profile.priorityRecords.length
      ? profile.priorityRecords.map((regulation) => `- ${regulation.shortName}: ${regulation.summary}`)
      : ["- No tracked records in the current seed dataset."]),
    "",
    `Tracked records: ${profile.records.length}`,
    `High-impact records: ${profile.highImpact.length}`,
    `Source-backed records: ${profile.sourceBacked}/${profile.records.length || 0}`,
    `Priority-source backed records: ${profile.primarySourceBacked}/${profile.records.length || 0}`,
    `Records needing confidence/source review: ${profile.reviewFlags}`,
    "",
    "## Markets to inspect first",
    ...(profile.markets.length ? profile.markets.map((market) => `- ${market.name}: ${market.count} tracked records`) : ["- No mapped markets in the current seed dataset."]),
    "",
    "## Evidence to prepare",
    ...(profile.evidenceRequired.length ? profile.evidenceRequired.map((item) => `- ${item}`) : fallbackEvidence(profile.label).map((item) => `- ${item}`)),
    "",
    "## First actions",
    ...(profile.requiredActions.length ? profile.requiredActions.map((action) => `- ${action}`) : fallbackActions(profile.label).map((action) => `- ${action}`)),
    "",
    "## Caveat",
    "This value-chain summary reflects current Atlas seed records tagged to this exposure. It is not a complete legal inventory and does not determine entity-specific applicability."
  ].join("\n");
}

export function fallbackEvidence(label: string) {
  if (label.toLowerCase().includes("supplier")) {
    return ["Supplier list and tiering", "Supplier ESG requests or attestations", "Commodity and country-of-origin data", "Due-diligence policy and escalation evidence"];
  }
  if (label.toLowerCase().includes("trade") || label.toLowerCase().includes("import")) {
    return ["Customs/import data", "Product origin and supplier declarations", "CN/HS code mapping", "Embedded emissions or commodity-risk evidence"];
  }
  if (label.toLowerCase().includes("product") || label.toLowerCase().includes("claim")) {
    return ["Product specifications", "Substantiation file for environmental claims", "Lifecycle or circularity evidence", "Market placement and labeling evidence"];
  }
  if (label.toLowerCase().includes("financed") || label.toLowerCase().includes("investment") || label.toLowerCase().includes("portfolio")) {
    return ["Portfolio company ESG data", "Financed-emissions methodology", "Fund classification evidence", "Stewardship and engagement records"];
  }
  return ["Legal entity and market exposure map", "Source review log", "Internal owner assignment", "Evidence and control inventory"];
}

export function fallbackActions(label: string) {
  if (label.toLowerCase().includes("supplier")) {
    return ["Map supplier exposure by jurisdiction, sector and commodity.", "Identify supplier evidence already collected by procurement.", "Prioritise high-risk suppliers for source and threshold review."];
  }
  if (label.toLowerCase().includes("trade") || label.toLowerCase().includes("import")) {
    return ["Map imports, exporters, products and origin data.", "Confirm whether trade or product-specific thresholds may be relevant.", "Assign legal, procurement and operations owners for source review."];
  }
  if (label.toLowerCase().includes("product") || label.toLowerCase().includes("claim")) {
    return ["Inventory product lines and environmental claims by market.", "Collect substantiation evidence and product compliance data.", "Review claims, labeling and circularity requirements with counsel."];
  }
  if (label.toLowerCase().includes("financed") || label.toLowerCase().includes("investment") || label.toLowerCase().includes("portfolio")) {
    return ["Map funds, portfolio companies and financed-emissions exposure.", "Identify investor or client ESG data requests.", "Prioritise portfolio data gaps and stewardship evidence."];
  }
  return ["Confirm entity facts, operating markets and value-chain exposure.", "Review priority records and primary sources.", "Create a 30-day evidence and owner plan."];
}

function regulationTouchesValueChain(regulation: Regulation, label: string) {
  return regulation.valueChain.includes(label) || regulation.valueChainImpact.includes(label);
}

function marketCounts(records: Regulation[]) {
  const counts = new Map<string, number>();

  records.forEach((regulation) => {
    regulation.jurisdictionIds.forEach((id) => counts.set(id, (counts.get(id) || 0) + 1));
  });

  return Array.from(counts.entries())
    .map(([id, count]) => {
      const jurisdiction = jurisdictions.find((item) => item.id === id);
      return {
        id,
        code: jurisdiction?.code || id.toUpperCase(),
        name: jurisdiction?.name || id,
        region: jurisdiction?.region || "Unmapped",
        count
      };
    })
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 8);
}

function prioritySort(a: Regulation, b: Regulation) {
  if (Boolean(b.highImpact) !== Boolean(a.highImpact)) return Number(Boolean(b.highImpact)) - Number(Boolean(a.highImpact));
  return readinessScore(b) - readinessScore(a);
}

function uniqueRegulations(records: Regulation[]) {
  return Array.from(new Map(records.map((regulation) => [regulation.id, regulation])).values());
}
