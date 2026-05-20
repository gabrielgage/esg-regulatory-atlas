import type { ChangelogEntry } from "./changelog";

export const RECENT_CHANGELOG: ChangelogEntry[] = [
  {
    edition: "0.5.42 - May 2026",
    date: "2026-05-20",
    label: "External review intake workflow",
    summary:
      "Added a visible Data Quality intake lane so external AI, ESG specialist and legal-risk review findings can be routed into issue logs, coverage worksheets, product backlog or future-capability planning before implementation.",
    added: [
      "External review intake panel on `/data-quality`",
      "Review intake routing data",
      "Copyable intake routing packet",
      "Review feedback intake template under `docs/ai-review/`"
    ],
    updated: ["Data Quality", "AI review docs", "Smoke tests", "Release metadata", "Project documentation"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "california-sb253-sb261"],
    caveat:
      "External review intake routes feedback for product QA, source governance and roadmap planning. It is not legal advice, source verification, official translation, complete coverage or a compliance determination."
  },
  {
    edition: "0.5.41 - May 2026",
    date: "2026-05-20",
    label: "AI review pack for current and future capabilities",
    summary:
      "Added a reviewer-ready documentation pack so external AI reviewers, ESG specialists and product reviewers can critique current Atlas capabilities, future roadmap priorities, regulatory coverage and legal-safety gaps while implementation continues.",
    added: [
      "Detailed AI review export for current product state and capability context",
      "Reviewer feedback prompt for Claude, ChatGPT or another AI reviewer",
      "Future capabilities deep-review backlog",
      "Regulatory coverage review worksheet in Markdown and CSV formats"
    ],
    updated: ["Release metadata", "README", "Current release docs", "Roadmap", "Product brief", "Agent handoff documentation"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "california-sb253-sb261"],
    caveat:
      "The AI review pack is a product QA and planning aid. It is not legal advice, source verification, official translation, complete regulatory coverage or a compliance determination."
  },
  {
    edition: "0.5.40 - May 2026",
    date: "2026-05-20",
    label: "Daily launch pulse and dependency audit patch",
    summary:
      "Added a compact daily launch pulse so the public changelog and Data Quality workspace share the same latest shipping context, validation expectations and next product-review focus, and patched Next.js after the production dependency audit flagged a high-severity advisory.",
    added: [
      "Static daily launch pulse data",
      "Daily launch pulse component on `/changelog`",
      "Compact daily launch pulse in the Data Quality overview",
      "Smoke coverage for the daily launch pulse"
    ],
    updated: ["Changelog", "Data Quality", "Next.js dependency", "Release metadata", "Project documentation"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "california-sb253-sb261"],
    caveat:
      "The daily pulse is an editorial launch-train note. It is not automated monitoring, legal advice, source verification, official translation or a complete regulatory update service."
  },
  {
    edition: "0.5.39 - May 2026",
    date: "2026-05-19",
    label: "Localized map coverage key",
    summary:
      "Moved the new untracked-country map explanation into the interface translation dictionary so the language toggle covers the map coverage key across English, Spanish, Dutch, French, German and Portuguese.",
    added: [
      "Localized untracked-country map title and body copy",
      "Spanish smoke coverage for the map coverage key",
      "Issue-log learning for avoiding English-only product chrome"
    ],
    updated: ["Map workspace", "World choropleth", "Interface translation dictionary", "Smoke tests", "Release metadata"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "california-sb253-sb261"],
    caveat:
      "Language toggle translations cover product guidance only. Regulation records, legal source titles and legal interpretation remain source-linked seed intelligence and are not official translations."
  },
  {
    edition: "0.5.38 - May 2026",
    date: "2026-05-19",
    label: "Map contrast and untracked coverage key",
    summary:
      "Improved the map workspace so untracked countries, country borders and ocean background are visually clearer, with a dedicated key explaining that pale countries are visible but do not yet have direct Atlas seed records.",
    added: [
      "Explicit untracked-country map key",
      "Stronger country outline and untracked-land contrast",
      "Subtle ocean gradient and map frame for better visual separation",
      "Smoke coverage for map key and untracked-country styling"
    ],
    updated: ["Map workspace", "World choropleth", "Theme map colors", "Smoke tests", "Release metadata"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "california-sb253-sb261"],
    caveat:
      "Map color intensity reflects tracked Atlas seed coverage, not complete legal applicability, regulatory burden or full market coverage."
  },
  {
    edition: "0.5.37 - May 2026",
    date: "2026-05-18",
    label: "Decision readiness checklist copy",
    summary:
      "Made regulation detail decision-readiness controls copyable so advisory planning checklists carry edition context, source-review steps, evidence prompts, first actions and legal-caution caveats outside the Atlas interface.",
    added: [
      "Copy readiness checklist control on regulation detail pages",
      "Edition, publisher, editor and contact metadata in copied readiness checklists",
      "Source-review steps, facts to confirm, evidence package and first 30-day actions in copied readiness output",
      "Smoke coverage for the copyable decision-readiness checklist"
    ],
    updated: ["Decision readiness checklist", "Decision readiness markdown", "Regulation detail pages", "Release metadata"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "sfdr"],
    caveat:
      "Copied decision-readiness checklists remain planning aids. They are not legal opinions, source verification, official translations, complete coverage or entity-specific applicability decisions."
  },
  {
    edition: "0.5.36 - May 2026",
    date: "2026-05-18",
    label: "Source memo and citation caveats",
    summary:
      "Strengthened regulation detail source-review memos and citation snippets so copied research outputs carry edition context and clearer legal-caution language.",
    added: [
      "Visible source memo copied-output caveat guidance",
      "Publisher, edition, contact and source-count metadata in copied source memos",
      "Citation caveat guidance for Atlas record citations",
      "Smoke coverage for source memo and citation caveats"
    ],
    updated: ["Source evidence panel", "Citation widget", "Source governance memo", "Regulation detail pages", "Release metadata"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "sfdr"],
    caveat:
      "Source memos and citation snippets remain planning aids. They are not legal opinions, legal authority, source verification, official translations, complete coverage or entity-specific applicability decisions."
  },
  {
    edition: "0.5.35 - May 2026",
    date: "2026-05-18",
    label: "Export caveat metadata",
    summary:
      "Strengthened CSV and JSON regulation exports so downloaded files carry edition metadata, review context, source-review notes and legal-caution caveats after they leave the Atlas interface.",
    added: [
      "Visible export caveat note near CSV and JSON controls",
      "JSON export metadata envelope with edition, review dates and caveat fields",
      "CSV export metadata columns for edition, source-review note and caveat language",
      "Smoke coverage for export caveat guidance"
    ],
    updated: ["Regulation exports", "Regulations workspace", "Release metadata", "Current release docs"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "sfdr"],
    caveat:
      "Downloaded exports remain planning aids. They are not legal opinions, source verification, official translations, complete coverage or entity-specific applicability decisions."
  },
  {
    edition: "0.5.34 - May 2026",
    date: "2026-05-18",
    label: "Copied summary caveat hardening",
    summary:
      "Strengthened copied Markdown outputs so market profiles, sector profiles and printable jurisdiction briefs carry source-review notes and clearer caveats when shared outside the Atlas interface.",
    added: [
      "Visible copied-output caveat notes near profile and brief copy controls",
      "Source-review notes in copied market and sector summaries",
      "Source-review notes in copied jurisdiction briefs",
      "Smoke coverage for copied-output caveat notes"
    ],
    updated: ["Copied Markdown outputs", "Market profiles", "Sector profiles", "Jurisdiction briefs", "Release metadata"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "sfdr"],
    caveat:
      "Copied outputs remain planning aids. They are not legal opinions, source verification, official translations, complete coverage or entity-specific applicability decisions."
  },
  {
    edition: "0.5.33 - May 2026",
    date: "2026-05-15",
    label: "Market and sector detail interpretation guardrail",
    summary:
      "Added contextual glossary help to jurisdiction and sector profile detail pages so users interpret priority records, readiness scores, source-confidence signals, timing cues and advisory prompts as triage aids rather than complete local or sector legal coverage.",
    added: [
      "Jurisdiction profile glossary help card",
      "Sector profile glossary help card",
      "Smoke coverage for profile detail glossary handoffs"
    ],
    updated: ["Jurisdiction profile pages", "Sector profile pages", "Glossary guidance", "Playwright smoke coverage", "Release metadata"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "sfdr"],
    caveat:
      "Profile detail outputs remain caveated planning aids. They are not complete local legal coverage, complete sector legal inventories, entity-specific applicability decisions, official translations or source verification."
  },
  {
    edition: "0.5.32 - May 2026",
    date: "2026-05-15",
    label: "Market and sector coverage interpretation guardrail",
    summary:
      "Added contextual glossary help to the market and sector discovery pages so users treat coverage counts, confidence badges, source-review flags and sector-tagged record links as tracked seed coverage rather than complete jurisdiction or sector inventories.",
    added: [
      "Market coverage glossary help card",
      "Sector coverage glossary help card",
      "Smoke coverage for market and sector glossary handoffs"
    ],
    updated: ["Market profiles", "Sector profiles", "Glossary guidance", "Playwright smoke coverage", "Release metadata"],
    records: ["csrd", "issb-s1-s2", "eu-taxonomy", "eudr"],
    caveat:
      "Market and sector coverage outputs remain caveated planning aids. They are not complete jurisdiction inventories, complete sector legal inventories, compliance determinations, official translations or source verification."
  },
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
