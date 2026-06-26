import { DATASET_META } from "@/data/_meta";
import { uniq } from "@/lib/utils";
import type { Regulation } from "@/types/regulation";

type TimelineFilterLabel = {
  label: string;
  value: string;
};

export function buildTimelineBriefMarkdown({
  records,
  scopeLabel,
  activeFilters,
  dateBearingRecords
}: {
  records: Regulation[];
  scopeLabel: string;
  activeFilters: TimelineFilterLabel[];
  dateBearingRecords: number;
}) {
  const priority = [...records].sort(timelinePrioritySort).slice(0, 10);
  const dateSensitive = priority.filter((regulation) => timelineSignalsFor(regulation).length > 0);
  const watchItems = priority
    .filter(
      (regulation) =>
        regulation.dataQualityStatus !== "verified_seed" ||
        regulation.confidenceLevel !== "high" ||
        regulation.status === "consultation" ||
        regulation.status === "transition" ||
        regulation.nextReviewDate
    )
    .slice(0, 6);
  const evidence = uniq(priority.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 8);
  const owners = uniq(priority.flatMap((regulation) => regulation.affectedFunctions || [])).slice(0, 8);
  const firstActions = uniq(priority.flatMap((regulation) => regulation.requiredActions || [])).slice(0, 8);

  return [
    `# Timeline planning brief`,
    "",
    `Edition: ${DATASET_META.edition}`,
    `Publisher: ${DATASET_META.publisher}`,
    `Editor: ${DATASET_META.editor}`,
    `Contact: ${DATASET_META.contactEmail}`,
    "",
    "This is indicative seed regulatory intelligence for orientation and planning. It is not legal, tax, investment or assurance advice.",
    "",
    "## View context",
    `- Planning horizon: ${scopeLabel}`,
    `- Active filters: ${activeFilters.length ? activeFilters.map((filter) => `${filter.label}: ${filter.value}`).join("; ") : "none"}`,
    `- Filtered seed records: ${records.length}`,
    `- Records with dated milestone signals: ${dateBearingRecords}`,
    "",
    "## Priority dated records",
    ...(dateSensitive.length
      ? dateSensitive.map((regulation) => {
          const source = regulation.sourceUrls[0];
          return [
            `- ${regulation.shortName} (${regulation.jurisdiction})`,
            `  - Timeline signals: ${timelineSignalsFor(regulation).join("; ")}`,
            `  - Status: ${formatLabel(regulation.status)}; quality: ${formatLabel(regulation.dataQualityStatus)}; confidence: ${formatLabel(regulation.confidenceLevel)}`,
            `  - Planning note: ${regulation.summary}`,
            `  - Source to verify first: ${source ? `${source.label} (${source.url})` : "source missing / needs review"}`
          ].join("\n");
        })
      : ["- No priority records with dated milestone signals appear in the current view. Broaden filters or switch to full history."]),
    "",
    "## Source-review watch items",
    ...(watchItems.length
      ? watchItems.map(
          (regulation) =>
            `- ${regulation.shortName}: ${formatLabel(regulation.status)}; ${formatLabel(regulation.dataQualityStatus)}; last reviewed ${regulation.lastReviewed || "not captured"}; next review ${regulation.nextReviewDate || "not captured"}`
        )
      : ["- No additional watch items identified in the current filtered priority set."]),
    "",
    "## Evidence and owners to prepare",
    `- Likely owner functions: ${owners.join(", ") || "n/a"}`,
    ...(evidence.length ? evidence.map((item) => `- ${item}`) : ["- Entity applicability facts", "- Source review log", "- Threshold evidence"]),
    "",
    "## First 30-day actions",
    ...(firstActions.length ? firstActions.map((action) => `- ${action}`) : fallbackTimelineActions().map((action) => `- ${action}`)),
    "",
    "## Caveat",
    "Timeline briefs show current tracked seed milestone signals and review prompts. They are not complete legal calendars, official filing deadline determinations, source verification or entity-specific applicability advice."
  ].join("\n");
}

function timelinePrioritySort(a: Regulation, b: Regulation) {
  const highImpactDelta = Number(Boolean(b.highImpact)) - Number(Boolean(a.highImpact));
  if (highImpactDelta) return highImpactDelta;
  return earliestTimelineYear(a) - earliestTimelineYear(b) || a.shortName.localeCompare(b.shortName);
}

function earliestTimelineYear(regulation: Regulation) {
  const years = [
    regulation.firstReportingYear,
    yearFromDate(regulation.effectiveDate),
    yearFromDate(regulation.firstReportDueDate),
    yearFromDate(regulation.consultationDeadline),
    yearFromDate(regulation.nextReviewDate)
  ].filter((value): value is number => Boolean(value));

  return years.length ? Math.min(...years) : 9999;
}

function timelineSignalsFor(regulation: Regulation) {
  return [
    regulation.effectiveDate && `effective date ${regulation.effectiveDate}`,
    regulation.firstReportingYear && `first reporting year ${regulation.firstReportingYear}`,
    regulation.firstReportDueDate && `first report due ${regulation.firstReportDueDate}`,
    regulation.consultationDeadline && `consultation deadline ${regulation.consultationDeadline}`,
    regulation.nextReviewDate && `Atlas next review ${regulation.nextReviewDate}`
  ].filter((value): value is string => Boolean(value));
}

function yearFromDate(value?: string) {
  if (!value || value.toLowerCase().includes("uncertain") || value.toLowerCase().includes("market") || value.toLowerCase().includes("stayed")) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.getFullYear();
}

function fallbackTimelineActions() {
  return [
    "Confirm entity scope, market exposure, first reporting periods and filing deadlines with primary sources.",
    "Assign owners for legal, finance, sustainability, risk, procurement and board evidence where relevant.",
    "Back-solve data collection, controls, assurance and approval milestones from the earliest source-confirmed deadline.",
    "Create a review queue for date-sensitive or lower-confidence records before using them in client-ready outputs."
  ];
}

function formatLabel(value: string) {
  return value.replaceAll("_", " ").replaceAll("-", " ");
}
