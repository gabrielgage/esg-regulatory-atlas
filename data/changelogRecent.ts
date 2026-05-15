import type { ChangelogEntry } from "./changelog";

export const RECENT_CHANGELOG: ChangelogEntry[] = [
  {
    edition: "0.5.31 - May 2026",
    date: "2026-05-15",
    label: "Comparison output interpretation guardrail",
    summary:
      "Added contextual glossary help to the comparison workspace so users interpret jurisdiction and regulation comparisons as seed-record planning aids rather than legal equivalence, complete market coverage or source verification.",
    added: [
      "Compare page glossary help card",
      "Smoke coverage for comparison glossary handoff",
      "Release context update for side-by-side comparison interpretation"
    ],
    updated: ["Comparison workspace", "Glossary guidance", "Playwright smoke coverage", "Release metadata"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "california-sb253-sb261"],
    caveat:
      "Comparison outputs remain caveated planning aids. They are not legal equivalence analyses, complete market coverage, compliance determinations, official translations or source verification."
  },
  {
    edition: "0.5.30 - May 2026",
    date: "2026-05-15",
    label: "Briefing output interpretation guardrail",
    summary:
      "Added contextual glossary help to the briefing workspace so users interpret priority records, copied summaries, evidence prompts and advisory signals as planning aids before using them in client or leadership conversations.",
    added: [
      "Briefing page glossary help card",
      "Smoke coverage for briefing glossary handoff",
      "Release context update for copied briefing output interpretation"
    ],
    updated: ["Briefing workspace", "Glossary guidance", "Playwright smoke coverage", "Release metadata"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "sfdr"],
    caveat:
      "Briefing outputs remain caveated planning aids. They are not client-ready legal opinions, compliance determinations, official translations or source verification."
  },
  {
    edition: "0.5.29 - May 2026",
    date: "2026-05-14",
    label: "Timeline date interpretation guardrail",
    summary:
      "Added contextual glossary help to the timeline workflow so users interpret effective dates, first reporting years, first report due dates and Atlas review dates as planning signals before relying on date-sensitive milestones.",
    added: [
      "Timeline page glossary help card",
      "Smoke coverage for timeline glossary handoff",
      "Release context update for timeline date-label interpretation"
    ],
    updated: ["Timeline workspace", "Glossary guidance", "Playwright smoke coverage", "Release metadata"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "california-sb253-sb261"],
    caveat:
      "Timeline dates remain seed intelligence and planning prompts. They are not definitive compliance deadlines, legal advice, official translations or source verification."
  },
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
