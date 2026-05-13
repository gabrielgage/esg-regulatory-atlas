export type GlossaryGuideItem = {
  label: string;
  signal: string;
  means: string;
  userAction: string;
  caveat: string;
  tone: "active" | "watch" | "neutral" | "risk";
};

export const regulatoryStatusGuide: GlossaryGuideItem[] = [
  {
    label: "In force",
    signal: "Rule is currently operative in at least one tracked jurisdiction or regime scope.",
    means: "Users should treat the record as a live regulatory intelligence item and confirm whether entity-specific thresholds or sector rules are met.",
    userAction: "Review applicability facts, source links, reporting dates and evidence requirements before planning compliance work.",
    caveat: "In-force status does not mean every company is in scope, and local implementation can still affect duties and timing.",
    tone: "active"
  },
  {
    label: "First reporting",
    signal: "A first reporting period, report publication period or phase-in milestone is underway or near-term.",
    means: "Planning urgency is higher because data collection, controls, assurance and governance decisions often need to happen before the report is filed.",
    userAction: "Check the first reporting year, due-date notes and phase-in caveats, then identify data owners and evidence gaps.",
    caveat: "A first reporting year is not always the same as the filing deadline, and dates can shift through transition rules.",
    tone: "active"
  },
  {
    label: "Adopted",
    signal: "A rule or standard has been formally adopted but may not yet fully apply to all relevant entities.",
    means: "The record is more mature than a consultation, but timing, transposition or phase-in details may still need review.",
    userAction: "Monitor implementation timing, national transposition, regulator guidance and market-specific thresholds.",
    caveat: "Adoption does not remove the need to verify current consolidated text and local implementation.",
    tone: "watch"
  },
  {
    label: "Transition or phased",
    signal: "Requirements are being introduced over time, often by entity size, listing status, sector, product scope or reporting period.",
    means: "Different entities can face different start dates and evidence expectations under the same parent regime.",
    userAction: "Map the entity profile against phase-in notes and missing facts before prioritizing readiness work.",
    caveat: "Phase-in labels are planning aids; they are not a final legal timing determination.",
    tone: "watch"
  },
  {
    label: "Consultation or proposed",
    signal: "The record tracks a developing rule, consultation, policy proposal or regulator roadmap.",
    means: "It may matter for horizon scanning and advisory planning, but obligations may change before final adoption.",
    userAction: "Monitor consultation deadlines, expected rulemaking milestones and source updates before treating it as a compliance requirement.",
    caveat: "Do not describe proposed or consultation-stage items as binding obligations unless primary sources clearly support that conclusion.",
    tone: "watch"
  },
  {
    label: "Voluntary",
    signal: "The record is a voluntary framework, standard, guidance set or market practice unless incorporated into a binding rule elsewhere.",
    means: "It can still drive investor, customer, lender, procurement or board expectations even without direct legal force.",
    userAction: "Assess whether the framework is used by investors, customers, regulators or reporting regimes that matter to the company.",
    caveat: "Voluntary does not mean irrelevant, and it does not automatically mean legally required.",
    tone: "neutral"
  }
];

export const sourceConfidenceGuide: GlossaryGuideItem[] = [
  {
    label: "Verified seed",
    signal: "The record has structured seed content and priority source support suitable for orientation.",
    means: "The Atlas has enough source support to present the record clearly, while still preserving legal and entity-specific caveats.",
    userAction: "Use the record for planning and source review, then verify primary materials before client or compliance reliance.",
    caveat: "Verified seed is not a legal opinion, official translation or complete source review workflow.",
    tone: "active"
  },
  {
    label: "Needs review",
    signal: "A date, threshold, source, legal-force claim or market-specific detail should be reviewed before higher-stakes use.",
    means: "The record may still be useful for orientation, but it should be prioritized for source review before premium examples or advisory reliance.",
    userAction: "Open the source links, check current official guidance and record the next review action in the Data Quality workflow.",
    caveat: "Needs review is a transparency signal, not a claim that the record is wrong.",
    tone: "risk"
  },
  {
    label: "Date uncertain",
    signal: "A key effective date, first reporting year, consultation deadline or phase-in milestone may be incomplete or unstable.",
    means: "Users should avoid relying on the timing until the source and latest regulatory status have been checked.",
    userAction: "Confirm dates against primary law, regulator guidance or standard-setter material before using timelines in client planning.",
    caveat: "Date uncertainty is common in transitional ESG regulation and should be disclosed rather than hidden.",
    tone: "risk"
  },
  {
    label: "Source missing",
    signal: "The record is included as a watch item or coverage placeholder without enough source support for planning reliance.",
    means: "It helps show a market or topic gap, but should not be treated as reviewed regulatory intelligence.",
    userAction: "Prioritize primary-source research or mark the record as watch-only until sources are added.",
    caveat: "Source-missing records should not be used for compliance decisions or premium deliverables.",
    tone: "risk"
  },
  {
    label: "Primary source",
    signal: "A law, official regulation, regulator page, official consultation or standard-setter publication supports the record.",
    means: "Primary sources carry more weight than secondary commentary when checking legal status, dates, thresholds and obligations.",
    userAction: "Use primary sources first, then use secondary commentary only to understand context or implementation practice.",
    caveat: "Even primary sources can require local legal interpretation and current-version checks.",
    tone: "active"
  },
  {
    label: "Secondary commentary",
    signal: "A reputable law firm, consultancy, professional body, NGO or publisher source helps explain a record.",
    means: "Secondary sources can be helpful for interpretation, but they should not replace official materials for status or threshold claims.",
    userAction: "Use secondary commentary as context and trace key claims back to official sources where possible.",
    caveat: "Commercial summaries can be stale, selective or jurisdiction-specific.",
    tone: "neutral"
  }
];
