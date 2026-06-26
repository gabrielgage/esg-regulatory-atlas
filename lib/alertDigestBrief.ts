import { DATASET_META } from "@/data/_meta";
import type { AlertDigestPreview } from "@/data/alertDigests";

const frequencyLabel = {
  weekly: "Weekly",
  monthly: "Monthly",
  "urgent-watchlist": "Urgent watchlist"
} satisfies Record<AlertDigestPreview["frequency"], string>;

export function buildAlertDigestMarkdown(digest: AlertDigestPreview) {
  return [
    `# ${digest.title}`,
    "",
    `Edition: ${DATASET_META.edition}`,
    `Publisher: ${DATASET_META.publisher}`,
    `Editor: ${DATASET_META.editor}`,
    `Contact: ${DATASET_META.contactEmail}`,
    "",
    "This is a static alert preview for commercial validation and planning. It is not a production monitoring service, legal advice, tax advice, investment advice or assurance advice.",
    "",
    "## Digest context",
    `- Frequency concept: ${frequencyLabel[digest.frequency]}`,
    `- Intended audience: ${digest.audience.join(", ")}`,
    `- Jurisdictions: ${digest.jurisdictions.join(", ")}`,
    `- Topics: ${digest.topics.join(", ")}`,
    "",
    "## Sample alert items",
    ...digest.sampleItems.flatMap((item) => [
      `- ${item.title}`,
      `  - Status signal: ${item.statusLabel}`,
      `  - Why it matters: ${item.whyItMatters}`,
      `  - Who should monitor: ${item.whoShouldMonitor.join(", ")}`,
      `  - Source quality: ${item.sourceQuality.replaceAll("-", " ")}`,
      `  - Recommended next action: ${item.recommendedAction}`,
      item.advisoryNote ? `  - Advisory note: ${item.advisoryNote}` : `  - Advisory note: Review whether this item should become a source-reviewed watchlist or manual advisory prompt.`
    ]),
    "",
    "## Manual validation questions",
    "- Which jurisdictions, topics, sectors or personas would make this digest valuable enough to request regularly?",
    "- Which items need primary-source review before they can be reused in a client, board or premium context?",
    "- Which internal owners should receive a manual briefing if a similar change appears in a future source-reviewed digest?",
    "- Which evidence, controls, supplier data or reporting-calendar steps should be triggered by the alert?",
    "",
    "## Caveat",
    digest.disclaimer,
    "This copied preview is illustrative seed intelligence only. It does not activate paid alerts, automated monitoring, email delivery, source verification, legal advice, official translation or entity-specific applicability determinations."
  ].join("\n");
}
