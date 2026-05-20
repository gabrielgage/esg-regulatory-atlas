export type DailyUpdate = {
  date: string;
  edition: string;
  headline: string;
  shipped: string[];
  validation: string[];
  nextFocus: string[];
  caveat: string;
};

export const DAILY_UPDATES: DailyUpdate[] = [
  {
    date: "2026-05-20",
    edition: "0.5.40 - May 2026",
    headline: "Daily launch pulse added and production dependency audit cleared.",
    shipped: [
      "Added a compact daily launch pulse for recent shipping context.",
      "Connected the pulse to Changelog and Data Quality so product and governance readers see the same latest status.",
      "Patched Next.js to the current 16.2.6 release after the production audit flagged a high-severity advisory on the previous range.",
      "Kept the pulse static and source-aware, without adding automation, accounts or backend services."
    ],
    validation: [
      "Typecheck and build remain required before merge.",
      "Production dependency audit now returns zero vulnerabilities with dev dependencies omitted.",
      "Smoke coverage checks that the daily launch pulse renders on public and governance surfaces.",
      "The pulse preserves MVP guardrails: no auth, database, paid API, scraping, cron, production email backend or payment integration."
    ],
    nextFocus: [
      "Continue source-review queue hardening for Marquee 10 and Marquee 25 records.",
      "Expand market coverage only where official or regulator-quality sources can be linked and caveated.",
      "Keep map, assessment and regulation-detail surfaces calmer while preserving decision-ready evidence prompts."
    ],
    caveat:
      "This daily pulse is an editorial launch-train note. It is not automated monitoring, legal advice, source verification, official translation or a complete regulatory update service."
  }
];

export const latestDailyUpdate = DAILY_UPDATES[0];
