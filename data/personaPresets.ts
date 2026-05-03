import type { FilterState } from "@/types/regulation";

export type PersonaPreset = {
  id: string;
  label: string;
  role: string;
  description: string;
  filters: Partial<FilterState>;
  firstQuestions: string[];
  firstActions: string[];
};

export const personaPresets: PersonaPreset[] = [
  {
    id: "cso-sustainability",
    label: "CSO",
    role: "Sustainability leader",
    description: "Climate, reporting, transition planning and ESG governance records for sustainability leadership triage.",
    filters: { businessFunction: "Sustainability" },
    firstQuestions: [
      "Which rules create reporting, transition-plan or governance workstreams?",
      "Which records need source review before being used in a board or executive update?"
    ],
    firstActions: ["Map accountable data owners.", "Prioritise high-impact and first-reporting records."]
  },
  {
    id: "legal-compliance",
    label: "Legal",
    role: "In-house legal or compliance",
    description: "Legal, compliance, due-diligence, green-claims and source-review records that need careful applicability review.",
    filters: { businessFunction: "Legal" },
    firstQuestions: [
      "Which records may depend on thresholds, local implementation or legal interpretation?",
      "Which caveats, source gaps or phase-in uncertainties need counsel review?"
    ],
    firstActions: ["Review primary source links.", "Log thresholds, caveats and open legal interpretation points."]
  },
  {
    id: "finance-controller",
    label: "Finance",
    role: "Finance or ESG controller",
    description: "Financial reporting, assurance, taxonomy, controls and investor-disclosure records for finance-led readiness.",
    filters: { businessFunction: "Finance" },
    firstQuestions: [
      "Which records affect reporting calendars, assurance, controls or financial disclosure?",
      "What evidence needs to connect to finance systems and reporting boundaries?"
    ],
    firstActions: ["Map reporting calendar impacts.", "Identify control owners and evidence repositories."]
  },
  {
    id: "procurement-supply-chain",
    label: "Procurement",
    role: "Procurement or supplier lead",
    description: "Supplier, importer/exporter, deforestation, product and due-diligence records for value-chain exposure.",
    filters: { valueChain: "Upstream suppliers" },
    firstQuestions: [
      "Which records may require supplier data, commodity evidence or importer/exporter controls?",
      "Which customer or market-entry requests could make these records relevant indirectly?"
    ],
    firstActions: ["Map high-risk supplier and commodity flows.", "Prepare supplier evidence and attestation requests."]
  },
  {
    id: "private-equity-investor",
    label: "Private equity",
    role: "Investor or portfolio operator",
    description: "Portfolio, financed-emissions, fund disclosure and exit-readiness records for investors and private equity teams.",
    filters: { sector: "Private equity" },
    firstQuestions: [
      "Which obligations sit with the fund manager versus portfolio companies?",
      "Which investor, lender or buyer requests could drive ESG data collection?"
    ],
    firstActions: ["Screen portfolio exposure by market and sector.", "Prioritise portfolio ESG data and financed-emissions needs."]
  },
  {
    id: "external-advisor",
    label: "Advisor",
    role: "External ESG advisor",
    description: "Gap-assessment and advisory-workstream records for scoping regulatory exposure reviews and client briefings.",
    filters: { advisory: "Gap assessment" },
    firstQuestions: [
      "Which records create the strongest advisory workstreams?",
      "What should be verified before turning the output into client advice?"
    ],
    firstActions: ["Build a caveated client shortlist.", "Separate source-ready records from records needing review."]
  }
];

export function personaPresetById(id: string) {
  return personaPresets.find((preset) => preset.id === id);
}
