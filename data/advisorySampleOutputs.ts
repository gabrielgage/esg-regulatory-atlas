import { DATASET_META } from "./_meta";
import { LEGAL_NOTICES } from "./legalNotices";

export type AdvisorySampleOutput = {
  id: string;
  title: string;
  scenario: string;
  audience: string[];
  profileSnapshot: string[];
  priorityQuestions: string[];
  priorityRecords: Array<{
    label: string;
    whyItAppears: string;
    sourceToVerify: string;
  }>;
  factsToConfirm: string[];
  evidencePackage: string[];
  firstActions: string[];
  sourceReviewNotes: string[];
  caveat: string;
};

export const advisorySampleOutputs: AdvisorySampleOutput[] = [
  {
    id: "supplier-exporter-exposure-scan",
    title: "Sample regulatory exposure scan",
    scenario: "EU-facing supplier and exporter planning scan",
    audience: ["SME supplier lead", "Procurement", "Legal", "Sustainability advisor"],
    profileSnapshot: [
      "Manufacturing supplier with EU customer exposure",
      "Exports or sells products into EU-facing value chains",
      "Likely customer requests for emissions, due-diligence and product data",
      "No entity-specific threshold review completed in this sample"
    ],
    priorityQuestions: [
      "Which EU or customer-driven ESG requirements may trigger data requests?",
      "Which facts are missing before direct or indirect relevance can be assessed?",
      "What evidence should the supplier prepare in the next 30 days?",
      "Which sources need review before the output is used in client work?"
    ],
    priorityRecords: [
      {
        label: "CSRD / ESRS",
        whyItAppears:
          "Potentially relevant through EU customer reporting requests and value-chain datapoints, even where the supplier is not directly in scope.",
        sourceToVerify: "European Commission CSRD and ESRS source materials"
      },
      {
        label: "CSDDD",
        whyItAppears:
          "Potentially relevant through customer due-diligence expectations, supplier codes of conduct and human-rights or environmental risk mapping.",
        sourceToVerify: "Official EU CSDDD legal text and implementation guidance"
      },
      {
        label: "EUDR / CBAM / product rules",
        whyItAppears:
          "May become relevant if regulated commodities, carbon-intensive goods or product-sustainability data are part of the customer relationship.",
        sourceToVerify: "Official EU EUDR, CBAM and product sustainability source pages"
      }
    ],
    factsToConfirm: [
      "Exact selling markets and whether goods enter the EU market",
      "Customer reporting or supplier questionnaire requirements",
      "Product categories, commodities, HS codes and origin data",
      "Company size, ownership structure and listed/private status",
      "Existing emissions, supplier, human-rights and product data maturity"
    ],
    evidencePackage: [
      "Customer ESG questionnaires and contractual clauses",
      "GHG inventory status and Scope 1, 2 and material Scope 3 data availability",
      "Supplier list, country-of-origin data and due-diligence policies",
      "Product, commodity, customs or bill-of-materials records",
      "Board, management or control-owner evidence for ESG data governance"
    ],
    firstActions: [
      "Create a one-page exposure profile covering markets, products, customers and suppliers",
      "Map customer requests against CSRD/ESRS, CSDDD, EUDR, CBAM and product-data themes",
      "Assign owners for emissions data, supplier data, product data, legal review and customer response",
      "Review primary sources and confirm which obligations are direct, indirect, customer-driven or monitor-only",
      "Prepare a 30-day data-gap and evidence plan before making compliance commitments"
    ],
    sourceReviewNotes: [
      "Use official EU and regulator sources before client reliance",
      "Treat customer-driven relevance separately from direct legal applicability",
      "Confirm phase-in dates, thresholds, product scope and national implementation where relevant"
    ],
    caveat:
      "This is a static sample advisory output for orientation. It is not a legal opinion, official source verification, complete supplier-risk assessment or definitive applicability determination."
  }
];

export function advisorySampleMarkdown(sample: AdvisorySampleOutput) {
  return [
    `# ${sample.title}`,
    "",
    `Scenario: ${sample.scenario}`,
    `Edition: ${DATASET_META.edition}`,
    `Publisher: ${DATASET_META.publisher}`,
    "",
    "## Intended audience",
    ...sample.audience.map((item) => `- ${item}`),
    "",
    "## Profile snapshot",
    ...sample.profileSnapshot.map((item) => `- ${item}`),
    "",
    "## Priority questions",
    ...sample.priorityQuestions.map((item) => `- ${item}`),
    "",
    "## Priority records",
    ...sample.priorityRecords.map((record) => `- ${record.label}: ${record.whyItAppears} Source to verify: ${record.sourceToVerify}.`),
    "",
    "## Facts to confirm",
    ...sample.factsToConfirm.map((item) => `- ${item}`),
    "",
    "## Evidence package",
    ...sample.evidencePackage.map((item) => `- ${item}`),
    "",
    "## First 30-day actions",
    ...sample.firstActions.map((item) => `- ${item}`),
    "",
    "## Source review notes",
    ...sample.sourceReviewNotes.map((item) => `- ${item}`),
    "",
    "## Caveat",
    `${sample.caveat} ${LEGAL_NOTICES.fullDisclaimer}`
  ].join("\n");
}
