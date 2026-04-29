import { FilterState, Regulation } from "@/types/regulation";

export const initialFilters: FilterState = {
  query: "",
  topic: "",
  sector: "",
  jurisdictionType: "",
  status: "",
  reportingYear: "",
  valueChain: "",
  confidence: "",
  advisory: ""
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
      ...regulation.topics,
      ...regulation.sectors,
      ...regulation.valueChain,
      ...regulation.businessImpacts,
      ...regulation.advisoryOpportunities
    ].join(" ").toLowerCase();

    const reportingYear = filters.reportingYear ? Number(filters.reportingYear) : null;

    return (
      (!query || haystack.includes(query)) &&
      (!filters.topic || regulation.topics.includes(filters.topic)) &&
      (!filters.sector || regulation.sectors.includes(filters.sector)) &&
      (!filters.jurisdictionType || regulation.jurisdictionType === filters.jurisdictionType) &&
      (!filters.status || regulation.status === filters.status) &&
      (!reportingYear || regulation.firstReportingYear === reportingYear) &&
      (!filters.valueChain || regulation.valueChain.includes(filters.valueChain)) &&
      (!filters.confidence || regulation.confidenceLevel === filters.confidence) &&
      (!filters.advisory || regulation.advisoryOpportunities.includes(filters.advisory))
    );
  });
}

export function yearsFrom(regulations: Regulation[]) {
  return Array.from(
    new Set(regulations.map((regulation) => regulation.firstReportingYear).filter(Boolean) as number[])
  ).sort((a, b) => a - b);
}
