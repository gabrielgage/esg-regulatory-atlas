export const LEGAL_NOTICES = {
  shortDisclaimer:
    "This tool provides structured regulatory intelligence for orientation and planning purposes. It does not constitute legal, tax, investment or assurance advice. Applicability depends on entity-specific facts, jurisdictional implementation, sector rules, thresholds and legal interpretation.",
  fullDisclaimer:
    "Etica ESG · Regulatory Atlas provides structured ESG and sustainability regulatory intelligence for orientation and planning purposes only. It is not legal, tax, investment or assurance advice. Applicability depends on entity-specific facts, jurisdictional implementation, sector rules, thresholds and legal interpretation. Users should validate requirements with qualified counsel or regulatory advisors before relying on the information for compliance decisions.",
  copyOutput:
    "Copied Markdown includes caveats and source-review notes. Validate primary sources and entity-specific facts before sharing or relying on it.",
  manualRequest:
    "Requests are manually reviewed and caveated. They do not create a paid account, subscription, automated alert, legal opinion or compliance determination.",
  commercialPreview:
    "Commercial pages are static validation surfaces. Premium alerts, market packs and enterprise/API paths are previews or manual advisory-supported workflows unless a later release explicitly launches production infrastructure.",
  regulationRecord:
    "This record is seed regulatory intelligence and may be incomplete. Review linked primary sources and confirm entity-specific applicability before using it for compliance decisions."
} as const;

export type LegalNoticeKey = keyof typeof LEGAL_NOTICES;
