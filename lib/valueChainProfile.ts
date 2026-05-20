import { jurisdictions } from "@/data/jurisdictions";
import { regulations } from "@/data/seed";
import { valueChainImpacts } from "@/data/taxonomy";
import { readinessScore } from "@/lib/scoring";
import { uniq } from "@/lib/utils";
import type { Regulation } from "@/types/regulation";

export type ValueChainProfile = ReturnType<typeof valueChainProfileFor>;

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
