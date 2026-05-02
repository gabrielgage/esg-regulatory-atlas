import { DATASET_META } from "./_meta";

export type ConversionIntent =
  | "premium-alert-preview"
  | "premium-pack-request"
  | "advisory-scan"
  | "market-briefing"
  | "design-partner"
  | "launch-feedback";

export type ConversionSurface = {
  id: string;
  route: string;
  ctaLabel: string;
  intent: ConversionIntent;
  mailtoSubject: string;
  manualReviewCadence: "weekly" | "launch-window" | "monthly";
  owner: string;
  successSignal: string;
  followUpAction: string;
};

export const conversionSurfaces: ConversionSurface[] = [
  {
    id: "plans-premium-preview",
    route: "/plans",
    ctaLabel: "Request preview",
    intent: "premium-alert-preview",
    mailtoSubject: "Etica ESG commercial preview request",
    manualReviewCadence: "weekly",
    owner: DATASET_META.editor,
    successSignal: "User names a watchlist, market pack, sector or jurisdiction they would pay to track.",
    followUpAction: "Reply with sample alert or pack outline and ask whether they want a design-partner call."
  },
  {
    id: "alerts-request-access",
    route: "/alerts",
    ctaLabel: "Request alert preview",
    intent: "premium-alert-preview",
    mailtoSubject: "Etica ESG alert preview request",
    manualReviewCadence: "weekly",
    owner: DATASET_META.editor,
    successSignal: "User selects alert frequency, audience or watchlist type.",
    followUpAction: "Classify request by jurisdiction/topic/persona and add it to the premium alert validation log."
  },
  {
    id: "premium-pack-request",
    route: "/premium-packs/[id]",
    ctaLabel: "Request pack preview",
    intent: "premium-pack-request",
    mailtoSubject: "Etica ESG premium pack request",
    manualReviewCadence: "launch-window",
    owner: DATASET_META.editor,
    successSignal: "User asks for a named pack or describes a use case that maps to a premium pack.",
    followUpAction: "Capture pack, market, sector and buyer persona. Decide whether to prepare a sample table of contents or advisory quote."
  },
  {
    id: "advisory-scan-request",
    route: "/advisory",
    ctaLabel: "Request advisory scan",
    intent: "advisory-scan",
    mailtoSubject: "Etica ESG advisory scan request",
    manualReviewCadence: "weekly",
    owner: DATASET_META.editor,
    successSignal: "User provides company, portfolio, supplier, jurisdiction or market-entry context.",
    followUpAction: "Respond with scope questions and propose a manual exposure scan or briefing."
  },
  {
    id: "market-briefing-cta",
    route: "/briefing, /jurisdiction/[code]/brief, jurisdiction panel",
    ctaLabel: "Request market briefing",
    intent: "market-briefing",
    mailtoSubject: "Etica ESG market briefing request",
    manualReviewCadence: "launch-window",
    owner: DATASET_META.editor,
    successSignal: "User references a specific jurisdiction, sector or client briefing need.",
    followUpAction: "Capture market and briefing audience. Decide whether it is advisory, premium pack or future product feedback."
  },
  {
    id: "copied-summary-advisory-review",
    route: "/briefing, /jurisdiction/[code]/brief",
    ctaLabel: "Copied summary advisory request",
    intent: "advisory-scan",
    mailtoSubject: "Etica ESG advisory review - copied client planning summary",
    manualReviewCadence: "weekly",
    owner: DATASET_META.editor,
    successSignal: "User forwards or references a copied client planning summary.",
    followUpAction: "Ask for entity facts, thresholds, jurisdictions and source-review needs before preparing any advisory output."
  }
];

export const conversionTrackingCaveat =
  "Conversion tracking is manual in this MVP. Do not add analytics SDKs, cookies, CRM sync, automated email, account tracking or billing events until explicitly approved.";
