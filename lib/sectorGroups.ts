export type SectorGroupId = "capital-markets" | "industrial-infrastructure" | "consumer-supply-chain" | "public-digital";

export type SectorGroup = {
  id: SectorGroupId;
  label: string;
  description: string;
  trigger: string;
  sectors: string[];
};

export const sectorGroups: SectorGroup[] = [
  {
    id: "capital-markets",
    label: "Capital markets",
    description: "Finance, funds, insurance, listed-company and portfolio exposure.",
    trigger: "Start here for sustainable finance, disclosure, portfolio data and investor/customer reporting pressure.",
    sectors: ["Financial services", "Asset management", "Banking", "Insurance", "Private equity", "Listed companies"]
  },
  {
    id: "industrial-infrastructure",
    label: "Industrial and infrastructure",
    description: "Energy, manufacturing, real assets, transport, mining, chemicals and heavy operations.",
    trigger: "Start here for climate, emissions, permitting, transition plans, product, trade and operational evidence.",
    sectors: ["Energy", "Manufacturing", "Chemicals", "Mining", "Construction", "Transport", "Automotive", "Real estate", "Waste"]
  },
  {
    id: "consumer-supply-chain",
    label: "Consumer and supply chain",
    description: "Agriculture, food, retail, consumer goods, packaging and textiles.",
    trigger: "Start here for supplier due diligence, deforestation, circular economy, green claims and product evidence.",
    sectors: ["Agriculture", "Food and beverage", "Packaging", "Retail", "Consumer goods", "Textiles"]
  },
  {
    id: "public-digital",
    label: "Digital and public sector",
    description: "Technology and public-sector operating contexts.",
    trigger: "Start here for procurement, public reporting, digital operations and cross-sector data requests.",
    sectors: ["Technology", "Public sector"]
  }
];

export function sectorGroupFor(sector: string) {
  return sectorGroups.find((group) => group.sectors.includes(sector)) || sectorGroups[1];
}
