import { regulations } from "@/data/seed";
import { jurisdictions } from "@/data/jurisdictions";
import { sectors as sectorTaxonomy } from "@/data/sectors";
import { readinessScore } from "@/lib/scoring";
import { uniq } from "@/lib/utils";
import type { Regulation } from "@/types/regulation";

export function sectorSlug(sector: string) {
  return sector
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function sectorNameFromSlug(slug: string) {
  const normalized = slug.toLowerCase();
  return trackedSectors().find((sector) => sectorSlug(sector) === normalized);
}

export function trackedSectors() {
  const observed = uniq(regulations.flatMap((regulation) => regulation.sectors).filter(Boolean));
  return uniq([...sectorTaxonomy, ...observed]).filter((sector) => sector !== "All sectors");
}

export function sectorProfileFor(sector: string) {
  const directRecords = regulations.filter((regulation) => regulation.sectors.includes(sector));
  const broadRecords = regulations.filter(
    (regulation) => regulation.sectors.includes("All sectors") && !regulation.sectors.includes(sector)
  );
  const scoped = [...directRecords, ...broadRecords].sort((a, b) => prioritySort(a, b, sector));
  const priorityRecords = scoped.slice(0, 8);
  const watchItems = scoped
    .filter(
      (regulation) =>
        regulation.status === "consultation" ||
        regulation.status === "transition" ||
        regulation.confidenceLevel !== "high" ||
        regulation.dataQualityStatus !== "verified_seed"
    )
    .sort((a, b) => prioritySort(a, b, sector))
    .slice(0, 6);
  const sourceBacked = scoped.filter((regulation) => regulation.sourceUrls.length > 0).length;
  const primarySourceBacked = scoped.filter((regulation) =>
    regulation.sourceUrls.some((source) => source.type === "primary" || source.type === "regulator" || source.type === "standards_body")
  ).length;
  const reviewFlags = scoped.filter((regulation) => regulation.dataQualityStatus !== "verified_seed" || regulation.confidenceLevel !== "high").length;
  const markets = marketCounts(directRecords.length ? directRecords : scoped);

  return {
    sector,
    slug: sectorSlug(sector),
    scoped,
    directRecords,
    broadRecords,
    priorityRecords,
    watchItems,
    sourceBacked,
    primarySourceBacked,
    reviewFlags,
    markets,
    highImpact: scoped.filter((regulation) => regulation.highImpact),
    firstReportingYears: uniq(scoped.map((regulation) => String(regulation.firstReportingYear || "")).filter(Boolean)).sort(),
    topics: uniq(scoped.flatMap((regulation) => regulation.topics)).slice(0, 12),
    businessImpacts: uniq(scoped.flatMap((regulation) => regulation.businessImpacts)).slice(0, 12),
    valueChain: uniq(scoped.flatMap((regulation) => regulation.valueChain)).slice(0, 12),
    affectedFunctions: uniq(scoped.flatMap((regulation) => regulation.affectedFunctions)).slice(0, 12),
    advisoryOpportunities: uniq(scoped.flatMap((regulation) => regulation.advisoryOpportunities)).slice(0, 12),
    evidenceRequired: uniq(scoped.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 12),
    requiredActions: uniq(scoped.flatMap((regulation) => regulation.requiredActions || [])).slice(0, 10),
    companyTypes: uniq(scoped.flatMap((regulation) => regulation.companyTypes || [])).slice(0, 10)
  };
}

export function sectorProfiles() {
  return trackedSectors()
    .map((sector) => sectorProfileFor(sector))
    .sort((a, b) => {
      if (b.directRecords.length !== a.directRecords.length) return b.directRecords.length - a.directRecords.length;
      if (b.highImpact.length !== a.highImpact.length) return b.highImpact.length - a.highImpact.length;
      return a.sector.localeCompare(b.sector);
    });
}

export function buildSectorMarkdown(sector: string, records: Regulation[]) {
  const relevant = [...records].sort((a, b) => prioritySort(a, b, sector)).slice(0, 8);
  const markets = marketCounts(relevant);
  const impacts = uniq(relevant.flatMap((regulation) => regulation.businessImpacts)).slice(0, 8);
  const evidence = uniq(relevant.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 8);
  const actions = uniq(relevant.flatMap((regulation) => regulation.requiredActions || [])).slice(0, 8);

  return [
    `# ${sector} sector starting point`,
    "",
    "This is indicative seed regulatory intelligence for orientation and planning. It is not legal, tax, investment or assurance advice.",
    "",
    "## Priority records",
    ...(relevant.length ? relevant.map((regulation) => `- ${regulation.shortName}: ${regulation.summary}`) : ["- No tracked records in the current seed dataset."]),
    "",
    `Tracked markets: ${markets.map((market) => `${market.name} (${market.count})`).join(", ") || "n/a"}`,
    `Main business impacts: ${impacts.join(", ") || "n/a"}`,
    "",
    "## Evidence to prepare",
    ...(evidence.length ? evidence.map((item) => `- ${item}`) : ["- Entity applicability facts", "- Source review log", "- Threshold evidence"]),
    "",
    "## First 30-day actions",
    ...(actions.length ? actions.map((action) => `- ${action}`) : fallbackSectorActions().map((action) => `- ${action}`)),
    "",
    "## Caveat",
    "Sector pages show current tracked seed coverage and broad all-sector records where relevant. They are not complete sector legal inventories and do not determine entity-specific applicability."
  ].join("\n");
}

export function fallbackSectorActions() {
  return [
    "Confirm jurisdictions, legal entities, listing status, company size and customer/investor requirements.",
    "Map sector-specific value-chain exposures such as suppliers, products, finance, imports or portfolio companies.",
    "Prioritise high-impact and date-sensitive records for primary-source review.",
    "Assign internal owners for legal, sustainability, finance, procurement and operational evidence."
  ];
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
    .slice(0, 10);
}

function prioritySort(a: Regulation, b: Regulation, sector: string) {
  const directDelta = Number(b.sectors.includes(sector)) - Number(a.sectors.includes(sector));
  if (directDelta) return directDelta;
  if (Boolean(b.highImpact) !== Boolean(a.highImpact)) return Number(Boolean(b.highImpact)) - Number(Boolean(a.highImpact));
  return readinessScore(b) - readinessScore(a);
}
