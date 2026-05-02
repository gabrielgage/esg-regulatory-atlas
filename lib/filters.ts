import { FilterState, Regulation } from "@/types/regulation";
import { jurisdictions } from "@/data/jurisdictions";

export const initialFilters: FilterState = {
  query: "",
  jurisdiction: "",
  region: "",
  topic: "",
  sector: "",
  companyType: "",
  jurisdictionType: "",
  status: "",
  reportingYear: "",
  valueChain: "",
  businessFunction: "",
  obligation: "",
  confidence: "",
  dataQuality: "",
  advisory: "",
  recordType: "",
  legalForce: "",
  clientRelevance: ""
};

export function filterRegulations(regulations: Regulation[], filters: FilterState) {
  const query = filters.query.trim().toLowerCase();

  return regulations.filter((regulation) => {
    const haystack = [
      regulation.title,
      regulation.shortName,
      regulation.jurisdiction,
      regulation.summary,
      regulation.applicability,
      regulation.issuingBody,
      regulation.latestUpdate,
      regulation.changeLogSummary || "",
      regulation.recordType || "",
      regulation.legalForce || "",
      regulation.clientRelevanceCategory || "",
      regulation.sourceSystem || "",
      ...(regulation.aliases || []),
      ...(regulation.childItems || []).flatMap((item) => [item.label, item.type, item.status || "", item.note || ""]),
      ...regulation.topics,
      ...regulation.sectors,
      ...regulation.valueChain,
      ...regulation.businessImpacts,
      ...regulation.affectedFunctions,
      ...(regulation.companyTypes || []),
      ...(regulation.requiredActions || []),
      ...(regulation.evidenceRequired || []),
      ...(regulation.typicalClientQuestions || []),
      ...regulation.advisoryOpportunities
    ].join(" ").toLowerCase();

    const reportingYear = filters.reportingYear ? Number(filters.reportingYear) : null;
    const regionIds = filters.region
      ? jurisdictions.filter((jurisdiction) => jurisdiction.region === filters.region).map((jurisdiction) => jurisdiction.id)
      : [];

    return (
      (!query || haystack.includes(query)) &&
      (!filters.jurisdiction || regulation.jurisdictionIds.includes(filters.jurisdiction) || regulation.jurisdiction === filters.jurisdiction) &&
      (!filters.region || regulation.jurisdictionIds.some((jurisdictionId) => regionIds.includes(jurisdictionId))) &&
      (!filters.topic || regulation.topics.includes(filters.topic)) &&
      (!filters.sector || regulation.sectors.includes(filters.sector)) &&
      (!filters.companyType || inferredCompanyTypes(regulation).includes(filters.companyType)) &&
      (!filters.jurisdictionType || jurisdictionTypeMatches(regulation.jurisdictionType, filters.jurisdictionType)) &&
      (!filters.status || regulation.status === filters.status) &&
      (!reportingYear || regulation.firstReportingYear === reportingYear) &&
      (!filters.valueChain || regulation.valueChain.includes(filters.valueChain)) &&
      (!filters.businessFunction || regulation.affectedFunctions.includes(filters.businessFunction)) &&
      (!filters.obligation || regulation.businessImpacts.includes(filters.obligation as Regulation["businessImpacts"][number])) &&
      (!filters.confidence || regulation.confidenceLevel === filters.confidence) &&
      (!filters.dataQuality || regulation.dataQualityStatus === filters.dataQuality) &&
      (!filters.advisory || regulation.advisoryOpportunities.includes(filters.advisory)) &&
      (!filters.recordType || regulation.recordType === filters.recordType) &&
      (!filters.legalForce || regulation.legalForce === filters.legalForce) &&
      (!filters.clientRelevance || regulation.clientRelevanceCategory === filters.clientRelevance)
    );
  });
}

export function yearsFrom(regulations: Regulation[]) {
  return Array.from(
    new Set(regulations.map((regulation) => regulation.firstReportingYear).filter((year) => year && year >= 2021) as number[])
  ).sort((a, b) => a - b);
}

function jurisdictionTypeMatches(recordType: string, filterType: string) {
  if (filterType === "subnational") return recordType === "subnational" || recordType === "local";
  return recordType === filterType;
}

export function inferredCompanyTypes(regulation: Regulation) {
  const values = new Set(regulation.companyTypes || []);
  if (regulation.sectors.includes("Financial services")) values.add("Financial institution");
  if (regulation.sectors.includes("Asset management")) values.add("Asset manager");
  if (regulation.sectors.includes("Banking")) values.add("Bank");
  if (regulation.sectors.includes("Insurance")) values.add("Insurer");
  if (regulation.sectors.includes("Private equity")) values.add("Private equity fund");
  if (regulation.sectors.includes("Listed companies")) values.add("Listed company");
  if (regulation.jurisdictionType !== "international") values.add("Corporate");
  if (regulation.valueChain.some((value) => value.includes("Upstream") || value.includes("supplier"))) values.add("Supplier");
  if (regulation.valueChain.some((value) => value.includes("Product") || value.includes("Trade"))) values.add("Exporter");
  if (regulation.valueChain.some((value) => value.includes("Investment") || value.includes("portfolio"))) values.add("Portfolio company");
  return Array.from(values);
}
