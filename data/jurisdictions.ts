import { Jurisdiction } from "@/types/regulation";

export const jurisdictions: Jurisdiction[] = [
  {
    id: "eu",
    name: "European Union",
    region: "Europe",
    type: "supranational",
    regulatoryIntensity: "high",
    executiveSummary: "High intensity ESG regulatory environment spanning corporate reporting, sustainable finance, supply chain due diligence, product sustainability, deforestation and carbon border measures."
  },
  {
    id: "nl",
    name: "Netherlands",
    iso2: "NL",
    iso3: "NLD",
    region: "Europe",
    type: "national",
    parent: "eu",
    coordinates: [5.3, 52.1],
    regulatoryIntensity: "high",
    executiveSummary: "High exposure to EU reporting and sustainable finance rules, with additional national nitrogen, nature and permitting constraints that affect agriculture, construction, infrastructure and real estate."
  },
  {
    id: "uk",
    name: "United Kingdom",
    iso2: "GB",
    iso3: "GBR",
    region: "Europe",
    type: "national",
    coordinates: [-2.4, 54.8],
    regulatoryIntensity: "medium",
    executiveSummary: "Developing sustainability disclosure regime with FCA sustainable investment labels, climate reporting expectations and transition plan guidance influencing listed companies and asset managers."
  },
  {
    id: "us",
    name: "United States",
    iso2: "US",
    iso3: "USA",
    region: "North America",
    type: "national",
    coordinates: [-98.5, 39.8],
    regulatoryIntensity: "emerging",
    executiveSummary: "Fragmented ESG and climate disclosure landscape with material state-level obligations, investor expectations and sector-specific requirements."
  },
  {
    id: "ca-us",
    name: "California",
    iso2: "US-CA",
    region: "North America",
    type: "local",
    parent: "us",
    coordinates: [-119.4, 36.8],
    regulatoryIntensity: "high",
    executiveSummary: "High impact state-level climate disclosure regime for large companies doing business in California, focused on emissions disclosure and climate-related financial risk reporting."
  },
  {
    id: "sg",
    name: "Singapore",
    iso2: "SG",
    iso3: "SGP",
    region: "Asia Pacific",
    type: "national",
    coordinates: [103.8, 1.35],
    regulatoryIntensity: "medium",
    executiveSummary: "Climate-first sustainability reporting roadmap aligned with ISSB for listed companies and large non-listed companies, with phased assurance expectations."
  },
  {
    id: "jp",
    name: "Japan",
    iso2: "JP",
    iso3: "JPN",
    region: "Asia Pacific",
    type: "national",
    coordinates: [138.2, 36.2],
    regulatoryIntensity: "medium",
    executiveSummary: "ISSB-aligned domestic sustainability disclosure standards are progressing through the Sustainability Standards Board of Japan, with relevance for listed companies and global investors."
  },
  {
    id: "au",
    name: "Australia",
    iso2: "AU",
    iso3: "AUS",
    region: "Asia Pacific",
    type: "national",
    coordinates: [133.8, -25.3],
    regulatoryIntensity: "medium",
    executiveSummary: "Mandatory climate-related financial reporting is moving through staged implementation for large entities and financial institutions under Corporations Act sustainability reporting rules."
  },
  {
    id: "br",
    name: "Brazil",
    iso2: "BR",
    iso3: "BRA",
    region: "Latin America",
    type: "national",
    coordinates: [-51.9, -14.2],
    regulatoryIntensity: "medium",
    executiveSummary: "ISSB-aligned sustainability reporting is being embedded into capital markets through CVM rules, with voluntary early adoption followed by mandatory reporting for listed companies."
  },
  {
    id: "in",
    name: "India",
    iso2: "IN",
    iso3: "IND",
    region: "Asia Pacific",
    type: "national",
    coordinates: [78.9, 22.9],
    regulatoryIntensity: "medium",
    executiveSummary: "Business Responsibility and Sustainability Reporting creates mandatory ESG disclosure obligations for large listed entities and is expanding into value chain data expectations."
  },
  {
    id: "cn",
    name: "China",
    iso2: "CN",
    iso3: "CHN",
    region: "Asia Pacific",
    type: "national",
    coordinates: [104.2, 35.9],
    regulatoryIntensity: "emerging",
    executiveSummary: "Listed-company ESG and sustainability reporting expectations are developing through stock exchange guidance and climate-related disclosure initiatives."
  },
  {
    id: "ca",
    name: "Canada",
    iso2: "CA",
    iso3: "CAN",
    region: "North America",
    type: "national",
    coordinates: [-106.3, 56.1],
    regulatoryIntensity: "emerging",
    executiveSummary: "Canadian Sustainability Disclosure Standards provide an ISSB-aligned baseline while securities regulators continue to assess mandatory climate disclosure requirements."
  },
  {
    id: "ch",
    name: "Switzerland",
    iso2: "CH",
    iso3: "CHE",
    region: "Europe",
    type: "national",
    coordinates: [8.2, 46.8],
    regulatoryIntensity: "medium",
    executiveSummary: "Climate disclosure requirements for large public-interest companies are anchored in Swiss corporate reporting obligations and international climate disclosure frameworks."
  },
  {
    id: "tr",
    name: "Turkey",
    iso2: "TR",
    iso3: "TUR",
    region: "Europe and Middle East",
    type: "national",
    coordinates: [35.2, 39.0],
    regulatoryIntensity: "emerging",
    executiveSummary: "Turkey has introduced ISSB-derived sustainability reporting standards with phased application and transitional relief for early reporting cycles."
  },
  {
    id: "mx",
    name: "Mexico",
    iso2: "MX",
    iso3: "MEX",
    region: "Latin America",
    type: "national",
    coordinates: [-102.6, 23.6],
    regulatoryIntensity: "watch",
    executiveSummary: "Mexico is a watch jurisdiction for ESG reporting, sustainable finance and supply chain impacts, especially for companies linked to North American and EU value chains."
  },
  {
    id: "int",
    name: "International",
    region: "Global",
    type: "international",
    regulatoryIntensity: "high",
    executiveSummary: "Global standards and frameworks such as ISSB, GRI, TCFD and TNFD shape investor expectations and are increasingly referenced by national regulators."
  }
];
