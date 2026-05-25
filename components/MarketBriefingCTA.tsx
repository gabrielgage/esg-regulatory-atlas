import { AdvisoryScanCTA } from "./AdvisoryScanCTA";

export function MarketBriefingCTA({ compact = false, jurisdictionName }: { compact?: boolean; jurisdictionName?: string }) {
  return (
    <AdvisoryScanCTA
      compact={compact}
      eyebrow="Advisory-supported scans and briefings"
      title="Request a source-linked market scan"
      body="Share the jurisdiction, sector, company type or portfolio question you want reviewed. Etica can return a manually prepared exposure scan, market briefing or readiness note based on the current Atlas and primary-source review needs."
      subject={jurisdictionName ? `Etica ESG market briefing request - ${jurisdictionName}` : "Etica ESG market briefing request"}
      emailBody="Hi Gabriel,\n\nI would like to discuss an ESG Regulatory Atlas market briefing, portfolio scan, sector pack or readiness review.\n\nContext:\n- Jurisdiction(s):\n- Sector / company type:\n- Main regulatory question:\n"
    />
  );
}
