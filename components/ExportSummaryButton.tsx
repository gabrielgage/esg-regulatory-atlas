"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { ClipboardCheck, ClipboardCopy, FileText, Search, Send } from "lucide-react";
import { DATASET_META } from "@/data/_meta";
import { companyTypes, jurisdictions, sectors } from "@/data/seed";
import { clientRelevanceLabel, legalForceLabel, statusLabel } from "@/data/taxonomy";
import { Jurisdiction, Regulation } from "@/types/regulation";
import { uniq } from "@/lib/utils";

export function ExportSummaryButton({
  jurisdiction,
  regulations
}: {
  jurisdiction: Jurisdiction | null;
  regulations: Regulation[];
}) {
  const [copied, setCopied] = useState(false);
  const [selectedJurisdictionId, setSelectedJurisdictionId] = useState(jurisdiction?.id || "");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedCompanyType, setSelectedCompanyType] = useState("");
  const selectedJurisdiction = useMemo(
    () => jurisdiction || jurisdictions.find((item) => item.id === selectedJurisdictionId) || null,
    [jurisdiction, selectedJurisdictionId]
  );
  const scoped = useMemo(
    () =>
      regulations.filter((regulation) => {
        const jurisdictionMatch =
          !selectedJurisdiction ||
          regulation.jurisdictionIds.includes(selectedJurisdiction.id) ||
          Boolean(selectedJurisdiction.parent && regulation.jurisdictionIds.includes(selectedJurisdiction.parent));
        const sectorMatch = !selectedSector || regulation.sectors.includes(selectedSector) || regulation.sectors.includes("All sectors");
        const companyTypeMatch = !selectedCompanyType || regulation.companyTypes?.includes(selectedCompanyType) || selectedCompanyType === "Corporate";
        return jurisdictionMatch && sectorMatch && companyTypeMatch;
      }),
    [regulations, selectedCompanyType, selectedJurisdiction, selectedSector]
  );
  const summary = useMemo(
    () => buildSummary(selectedJurisdiction, scoped, selectedSector, selectedCompanyType),
    [selectedCompanyType, selectedJurisdiction, scoped, selectedSector]
  );
  const selectedBriefHref = selectedJurisdiction ? `/jurisdiction/${selectedJurisdiction.code.toLowerCase()}/brief` : "/markets";

  async function copySummary() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-semibold text-ink">Client planning summary</h2>
          <p className="mt-1 text-sm text-slate-500">Copy a cautious, source-aware briefing for advisory planning or internal triage.</p>
        </div>
        <button
          type="button"
          onClick={copySummary}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-navy px-4 text-sm font-semibold text-white hover:bg-slate-800"
        >
          {copied ? <ClipboardCheck className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy summary"}
        </button>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {!jurisdiction && (
          <label>
            <span className="sr-only">Jurisdiction</span>
            <select
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
              value={selectedJurisdictionId}
              onChange={(event) => setSelectedJurisdictionId(event.target.value)}
            >
              <option value="">Global / current dataset</option>
              {jurisdictions
                .filter((item) => item.type !== "international")
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </label>
        )}
        <label>
          <span className="sr-only">Sector</span>
          <select
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
            value={selectedSector}
            onChange={(event) => setSelectedSector(event.target.value)}
          >
            <option value="">All sectors</option>
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Company type</span>
          <select
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700"
            value={selectedCompanyType}
            onChange={(event) => setSelectedCompanyType(event.target.value)}
          >
            <option value="">All company types</option>
            {companyTypes.map((companyType) => (
              <option key={companyType} value={companyType}>
                {companyType}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-3 text-xs font-semibold text-slate-500">{scoped.length} records included in this planning summary.</p>
      <div className="mt-4" data-testid="client-briefing-handoff">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Briefing handoff path</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <HandoffLink href="/assessment" title="Run assessment" body="Generate an indicative shortlist before copying a client note.">
            <Search className="h-4 w-4" />
          </HandoffLink>
          <HandoffLink
            href={selectedBriefHref}
            title={selectedJurisdiction ? `${selectedJurisdiction.name} brief` : "Choose market brief"}
            body="Open the printable jurisdiction brief with sources, evidence and owner prompts."
          >
            <FileText className="h-4 w-4" />
          </HandoffLink>
          <HandoffLink href="/advisory" title="Request review" body="Move from static orientation into a source-linked advisory exposure scan.">
            <Send className="h-4 w-4" />
          </HandoffLink>
        </div>
      </div>
      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-semibold text-teal">Preview summary text</summary>
        <textarea
          readOnly
          className="mt-3 min-h-48 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs leading-5 text-slate-600"
          value={summary}
        />
      </details>
    </div>
  );
}

function HandoffLink({ href, title, body, children }: { href: string; title: string; body: string; children: ReactNode }) {
  return (
    <Link href={href} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm transition hover:border-teal/30 hover:bg-teal/5">
      <span className="flex items-center gap-2 font-semibold text-ink">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-teal">{children}</span>
        {title}
      </span>
      <span className="mt-2 block leading-5 text-slate-500">{body}</span>
    </Link>
  );
}

function buildSummary(jurisdiction: Jurisdiction | null, scoped: Regulation[], sector: string, companyType: string) {
  const highPriority = scoped.filter((regulation) => regulation.highImpact).slice(0, 6);
  const relevant = (highPriority.length ? highPriority : scoped).slice(0, 6);
  const dates = uniq(relevant.map((regulation) => String(regulation.firstReportingYear || "")).filter(Boolean));
  const impacts = uniq(relevant.flatMap((regulation) => regulation.businessImpacts)).slice(0, 8);
  const functions = uniq(relevant.flatMap((regulation) => regulation.affectedFunctions)).slice(0, 8);
  const evidence = uniq(relevant.flatMap((regulation) => regulation.evidenceRequired || [])).slice(0, 8);
  const sourceBacked = relevant.filter((regulation) => regulation.sourceUrls.length > 0).length;
  const reviewFlags = relevant.filter((regulation) => regulation.dataQualityStatus !== "verified_seed" || regulation.confidenceLevel !== "high").length;
  const briefPath = jurisdiction ? `/jurisdiction/${jurisdiction.code.toLowerCase()}/brief` : "/markets";
  const actions = uniq(
    relevant.flatMap((regulation) => {
      if (regulation.requiredActions?.length) return regulation.requiredActions;
      if (regulation.businessImpacts.includes("data collection obligation")) return ["Map data owners, source systems and evidence controls."];
      if (regulation.businessImpacts.includes("due diligence obligation")) return ["Assess supplier and value chain due diligence exposure."];
      return ["Confirm applicability thresholds and owner for source review."];
    })
  ).slice(0, 6);

  return [
    "Etica ESG · Regulatory Atlas - indicative client planning summary",
    "",
    `Selected jurisdiction: ${jurisdiction?.name || "Global / current filtered view"}`,
    `Selected sector: ${sector || "All sectors"}`,
    `Selected company type: ${companyType || "All company types"}`,
    `Tracked records in scope: ${scoped.length}`,
    `Most relevant records: ${relevant.map((regulation) => regulation.shortName).join(", ") || "n/a"}`,
    `Indicative reporting years: ${dates.join(", ") || "n/a"}`,
    `Main business impacts: ${impacts.join(", ") || "n/a"}`,
    `Functions likely involved: ${functions.join(", ") || "n/a"}`,
    `Source-backed priority records: ${sourceBacked}/${relevant.length || 0}`,
    `Records needing source/confidence review before reliance: ${reviewFlags}`,
    "",
    "Priority records:",
    ...relevant.map((regulation) => {
      const legalForce = regulation.legalForce ? legalForceLabel[regulation.legalForce] : "Not classified";
      const clientRelevance = regulation.clientRelevanceCategory ? clientRelevanceLabel[regulation.clientRelevanceCategory] : "Indicative";
      return `- ${regulation.shortName}: ${statusLabel[regulation.status]}; ${legalForce}; ${clientRelevance}. ${regulation.summary}`;
    }),
    "",
    "Immediate planning actions:",
    ...actions.map((action) => `- ${action}`),
    "",
    "Evidence to start collecting:",
    ...(evidence.length ? evidence.map((item) => `- ${item}`) : ["- Applicability assessment", "- Source review log", "- Accountable owner and management sign-off record"]),
    "",
    "Recommended Atlas next steps:",
    "- Run or refresh the indicative assessment: /assessment",
    `- Open the selected market brief: ${briefPath}`,
    "- Review premium market-pack scope: /premium-roadmap",
    "- Request advisory review: /advisory",
    "",
    "Optional advisory next step:",
    `Request a source-linked exposure scan, market pack or board/client briefing from ${DATASET_META.publisher}: ${DATASET_META.contactEmail}`,
    "Suggested request subject: Etica ESG advisory review - copied client planning summary",
    "",
    "Source and legal caution:",
    "This summary is generated from indicative regulatory intelligence. It is not legal, tax, investment or assurance advice. Applicability depends on entity-specific facts, thresholds, jurisdictional implementation, sector rules and legal interpretation. Review primary sources and validate with qualified counsel or regulatory advisors before relying on it for compliance decisions."
  ].join("\n");
}
