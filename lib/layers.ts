import { Jurisdiction, Regulation } from "@/types/regulation";

export function recordsForJurisdiction(jurisdiction: Jurisdiction, regulations: Regulation[]) {
  return regulations.filter(
    (regulation) =>
      regulation.jurisdictionIds.includes(jurisdiction.id) ||
      Boolean(jurisdiction.parent && regulation.jurisdictionIds.includes(jurisdiction.parent))
  );
}

export function internationalRecords(regulations: Regulation[]) {
  return regulations.filter(
    (regulation) =>
      regulation.jurisdictionType === "international" ||
      ["ISSB", "GRI", "TCFD", "TNFD"].some((term) => `${regulation.shortName} ${regulation.title}`.includes(term))
  );
}

export function localRecords(jurisdiction: Jurisdiction, regulations: Regulation[]) {
  return regulations.filter((regulation) => {
    if (jurisdiction.type === "supranational") {
      return regulation.jurisdictionIds.includes(jurisdiction.id) && regulation.jurisdictionType === "supranational";
    }
    return regulation.jurisdictionIds.includes(jurisdiction.id) && ["national", "local"].includes(regulation.jurisdictionType);
  });
}

export function sectoralRecords(jurisdiction: Jurisdiction, regulations: Regulation[]) {
  return regulations.filter((regulation) => {
    if (localRecords(jurisdiction, [regulation]).length) return false;
    return (
      regulation.jurisdictionType === "supranational" ||
      regulation.topics.some((topic) =>
        ["Sustainable finance", "Supply chain due diligence", "Product and circular economy", "Carbon pricing", "Biodiversity and nature"].includes(topic)
      )
    );
  });
}
