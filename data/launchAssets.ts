export type LaunchAsset = {
  id: string;
  title: string;
  channel: "homepage" | "linkedin" | "email" | "direct-outreach" | "sales-one-pager";
  status: "draft" | "ready-for-review" | "future";
  audience: string[];
  copy: string;
  caveat?: string;
};

export const launchAssets: LaunchAsset[] = [
  {
    id: "homepage-commercial-strip",
    title: "Free Atlas + premium preview + advisory support homepage strip",
    channel: "homepage",
    status: "ready-for-review",
    audience: ["Site visitors", "ESG advisors", "Legal/compliance teams"],
    copy:
      "Explore the free Atlas, preview premium regulatory alerts and market packs, or request an advisory-supported exposure scan.",
    caveat: "Premium previews are static validation surfaces; production alerts and paid accounts are not live."
  },
  {
    id: "linkedin-free-atlas",
    title: "LinkedIn launch post: free Atlas",
    channel: "linkedin",
    status: "draft",
    audience: ["Sustainability leaders", "ESG consultants", "Legal teams"],
    copy:
      "I am building Etica ESG · Regulatory Atlas: a free, source-linked ESG regulatory intelligence map for orientation across jurisdictions, sectors, value chains and reporting years. It is not legal advice; it is a trust surface for structured regulatory planning."
  },
  {
    id: "linkedin-alerts-preview",
    title: "LinkedIn launch post: alerts preview",
    channel: "linkedin",
    status: "draft",
    audience: ["CSOs", "Legal teams", "Advisors", "Investors"],
    copy:
      "Next validation step: premium ESG regulatory alert previews. The goal is not automated monitoring yet. It is testing which jurisdictions, topics and sectors people actually want to track before adding infrastructure."
  },
  {
    id: "linkedin-advisory-scans",
    title: "LinkedIn launch post: advisory exposure scans",
    channel: "linkedin",
    status: "draft",
    audience: ["Potential advisory clients", "ESG consultants", "Portfolio teams"],
    copy:
      "The fastest path from regulatory intelligence to client value is an advisory-supported exposure scan: what may matter, why it appears, what evidence is needed, which sources to verify and what to do in the first 30 days."
  },
  {
    id: "direct-advisory-scan-email",
    title: "Direct outreach email: advisory scan",
    channel: "direct-outreach",
    status: "draft",
    audience: ["Consultants", "Legal/compliance leads", "CSOs"],
    copy:
      "I am testing a source-linked ESG Regulatory Exposure Scan built on Etica ESG · Regulatory Atlas. The scan gives a cautious shortlist of potentially relevant rules, trigger reasons, missing facts, evidence needs and source-quality notes. Would it be useful to run one for a market, portfolio or supplier profile you are working on?"
  },
  {
    id: "premium-alert-preview-email",
    title: "Direct outreach email: premium alert preview",
    channel: "email",
    status: "draft",
    audience: ["ESG leaders", "Legal teams", "Advisors"],
    copy:
      "I am validating a weekly/monthly ESG regulatory alert preview before building any automated email or paid account infrastructure. Which watchlists would be most useful: CSRD/ESRS, ISSB adoption, supply-chain due diligence, product sustainability, sustainable finance or California/US climate disclosure?"
  }
];
