import type { ChangelogEntry } from "./changelog";

export const RECENT_CHANGELOG: ChangelogEntry[] = [
  {
    edition: "0.5.28 - May 2026",
    date: "2026-05-13",
    label: "Assessment label interpretation guardrail",
    summary:
      "Added contextual glossary help to the assessment workflow so users interpret shortlist categories, confidence labels and data-quality signals as triage prompts before using outputs in client or internal planning.",
    added: [
      "Assessment page glossary help card",
      "Smoke coverage for assessment glossary handoff",
      "Release context update for the assessment label guardrail"
    ],
    updated: ["Assessment wizard", "Glossary guidance", "Playwright smoke coverage", "Release metadata"],
    records: ["csrd", "issb-s1-s2", "california-sb253-sb261", "uk-sdr"],
    caveat:
      "Assessment categories remain indicative planning prompts. They do not determine legal applicability, compliance scope, official translation or source verification."
  },
  {
    edition: "0.5.27 - May 2026",
    date: "2026-05-13",
    label: "Glossary and label interpretation rollout",
    summary:
      "Added a public glossary and connected plain-language label guidance back into the regulation database, Data Quality workspace and regulation detail pages so users can interpret status, confidence, legal-force and data-quality labels before using Atlas output.",
    added: [
      "Public glossary route at `/glossary`",
      "Status and source-confidence guide for glossary users",
      "Contextual glossary help cards on `/regulations`, `/data-quality` and `/regulations/[slug]`",
      "Focused smoke coverage for glossary route, navigation and label-help surfaces"
    ],
    updated: [
      "Regulations workspace",
      "Data Quality workspace",
      "Regulation detail pages",
      "Header More menu",
      "Playwright smoke coverage",
      "Release metadata"
    ],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "sfdr", "eudr"],
    caveat:
      "Glossary definitions and label guidance are plain-language orientation aids. They are not official legal definitions, official translations, legal applicability determinations or source verification."
  },
  {
    edition: "0.5.26 - May 2026",
    date: "2026-05-12",
    label: "Homepage workspace and multilingual handoff polish",
    summary:
      "Polished the map-first homepage handoff with priority-record cards, source-to-verify cues and localized workspace chrome across the supported interface languages.",
    added: [
      "Homepage priority-record cards with first-reporting and source-to-verify cues",
      "Localized homepage workspace labels in English, Spanish, Dutch, French, German and Portuguese",
      "Scoped smoke tests for priority-card and language chrome behavior"
    ],
    updated: ["Homepage map workspace", "Interface chrome", "Smoke tests", "QA documentation"],
    records: ["csrd", "california-sb253-sb261", "australia-climate-reporting"],
    caveat:
      "This release changed workspace guidance and product chrome only. Regulation titles, source links, legal-force values, thresholds and applicability logic were not translated or changed."
  },
  {
    edition: "0.5.25 - May 2026",
    date: "2026-05-11",
    label: "Assessment profile transparency",
    summary:
      "Made the assessment journey clearer by summarizing the active profile, showing facts still needed to confirm relevance and making profile reset behavior explicit.",
    added: [
      "Assessment profile summary for selected user facts",
      "Facts-to-confirm prompts before users interpret indicative results",
      "Reset-profile affordance for restarting the static assessment flow",
      "Smoke coverage for assessment profile transparency"
    ],
    updated: ["Assessment wizard", "Copied assessment shortlist", "Playwright smoke coverage", "QA documentation"],
    records: ["csrd", "issb-s1-s2", "california-sb253-sb261", "uk-sdr"],
    caveat:
      "Assessment outputs remain indicative planning prompts. They do not determine whether a regulation applies to a specific entity and should be validated against primary sources and qualified advice."
  }
];
