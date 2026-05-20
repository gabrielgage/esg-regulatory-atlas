export type ReviewIntakeCategory = {
  label: string;
  description: string;
  destination: string;
  examples: string[];
};

export const reviewIntakeFiles = [
  "docs/ai-review/ESG_Regulatory_Atlas_AI_Review_Export_2026-05-20.md",
  "docs/ai-review/AI_Reviewer_Feedback_Prompt.md",
  "docs/ai-review/Future_Capabilities_Deep_Review_Backlog.md",
  "docs/ai-review/Regulatory_Coverage_Review_Worksheet.md",
  "docs/ai-review/Regulatory_Coverage_Review_Worksheet.csv",
  "docs/ai-review/Review_Feedback_Intake_Template.md"
] as const;

export const reviewIntakeCategories: ReviewIntakeCategory[] = [
  {
    label: "Confirmed bug or failed check",
    description: "A real product defect, broken route, CI failure, browser failure or deployment issue.",
    destination: "docs/issue-resolution-log.md and a focused QA note under docs/qa-findings/",
    examples: ["Smoke test failure", "dark-mode contrast issue", "broken source link handling", "copy output missing caveat"]
  },
  {
    label: "Regulatory content gap",
    description: "Missing regulation, weak source, stale date, unclear threshold, weak caveat or market-depth concern.",
    destination: "docs/ai-review/Regulatory_Coverage_Review_Worksheet.csv and the content review queue",
    examples: ["Mexico needs more direct records", "SEC climate rule status date uncertain", "missing primary source"]
  },
  {
    label: "Static MVP improvement",
    description: "A UX, product, copy, export, source-governance or data-quality improvement that fits the current Vercel-safe static model.",
    destination: "docs/product-improvement-backlog.md and docs/notion-update-plan.md",
    examples: ["clearer map legend", "better assessment evidence prompts", "review packet summary"]
  },
  {
    label: "Future platform capability",
    description: "A useful idea that would require auth, database, monitoring, email automation, billing, AI extraction or another future architecture decision.",
    destination: "docs/ai-review/Future_Capabilities_Deep_Review_Backlog.md",
    examples: ["client workspaces", "saved watchlists", "email alerts", "admin CMS", "source monitoring pipeline"]
  }
];

export function reviewIntakeMarkdown() {
  return [
    "# Etica ESG Regulatory Atlas - External Review Intake",
    "",
    "Use this packet to convert external AI, ESG specialist or legal-risk review feedback into scoped implementation work.",
    "",
    "## Review Pack Files",
    "",
    ...reviewIntakeFiles.map((file) => `- ${file}`),
    "",
    "## Intake Routing",
    "",
    ...reviewIntakeCategories.flatMap((category) => [
      `### ${category.label}`,
      "",
      `- Description: ${category.description}`,
      `- Destination: ${category.destination}`,
      `- Examples: ${category.examples.join("; ")}`,
      ""
    ]),
    "## Guardrail",
    "",
    "External review findings are product QA, source-governance and roadmap inputs. They are not legal opinions, source verification, official translations, complete coverage or compliance determinations."
  ].join("\n");
}
