import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, GitCompare } from "lucide-react";
import { Header } from "@/components/Header";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { CopyOutputNote } from "@/components/CopyOutputNote";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { GlossaryHelpCard } from "@/components/GlossaryHelpCard";
import { PageIntro } from "@/components/PageIntro";
import { Badge } from "@/components/Badge";
import { StatusBadge } from "@/components/StatusBadge";
import { jurisdictions, regulations } from "@/data/seed";
import { buildJurisdictionComparisonBriefMarkdown, buildRegulationComparisonBriefMarkdown } from "@/lib/comparisonBrief";
import { recordsForJurisdiction } from "@/lib/layers";
import { readinessBand, readinessScore } from "@/lib/scoring";
import { uniq } from "@/lib/utils";
import { Jurisdiction, Regulation } from "@/types/regulation";

const presetPairs = [
  ["EUU", "GBR"],
  ["NLD", "GBR"],
  ["SGP", "AUS"],
  ["USA", "USA-CA"],
  ["BRA", "MEX"]
];

export const metadata = {
  title: "Compare | Etica ESG"
};

type CompareParams = {
  a?: string;
  b?: string;
  jurisdictions?: string;
  ids?: string;
};

export default async function ComparePage({ searchParams }: { searchParams: Promise<CompareParams> }) {
  const params = await searchParams;
  const recordIds = idsFromParam(params.ids);

  if (recordIds.length) {
    const selectedRecords = recordIds.map((id) => regulations.find((regulation) => regulation.id.toLowerCase() === id.toLowerCase())).filter(Boolean) as Regulation[];
    return <RegulationCompare records={selectedRecords} requestedIds={recordIds} />;
  }

  const jurisdictionCodes = jurisdictionCodesFromParam(params.jurisdictions);
  const [firstCode, secondCode] = jurisdictionCodes.length >= 2 ? jurisdictionCodes : [params.a, params.b];
  const left = jurisdictionFromParam(params.a) || jurisdictionFromParam("EUU")!;
  const right = jurisdictionFromParam(params.b) || jurisdictionFromParam("GBR")!;
  const resolvedLeft = jurisdictionFromParam(firstCode) || left;
  const resolvedRight = jurisdictionFromParam(secondCode) || right;
  const leftRecords = recordsForJurisdiction(resolvedLeft, regulations);
  const rightRecords = recordsForJurisdiction(resolvedRight, regulations);
  const leftIds = new Set(leftRecords.map((regulation) => regulation.id));
  const rightIds = new Set(rightRecords.map((regulation) => regulation.id));
  const inBoth = leftRecords.filter((regulation) => rightIds.has(regulation.id));
  const onlyLeft = leftRecords.filter((regulation) => !rightIds.has(regulation.id));
  const onlyRight = rightRecords.filter((regulation) => !leftIds.has(regulation.id));
  const markdown = buildJurisdictionComparisonBriefMarkdown({
    left: resolvedLeft,
    right: resolvedRight,
    leftRecords,
    rightRecords
  });

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Compare"
          title="Jurisdiction comparison"
          body="Compare two jurisdictions across reporting, due diligence, sustainable finance, product and source-quality dimensions. Outputs are indicative and should be verified against primary sources."
        />
        <DisclaimerBanner />
        <GlossaryHelpCard
          title="Interpret comparison outputs carefully"
          body="Comparison tables show tracked differences in seed records, not legal equivalence or complete market coverage. Use status, date, confidence and source labels as prompts to review primary sources before making scope decisions."
          termIds={["legal-force", "reporting-year", "seed-intelligence"]}
          compact
        />

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <GitCompare className="h-5 w-5 text-teal" />
              <h2 className="font-semibold text-ink">
                {resolvedLeft.name} vs {resolvedRight.name}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {presetPairs.map(([a, b]) => (
                <Link
                  key={`${a}-${b}`}
                  href={`/compare?jurisdictions=${a},${b}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-white"
                >
                  {a} vs {b}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Metric label="In both" value={String(inBoth.length)} />
            <Metric label={`Only ${resolvedLeft.code}`} value={String(onlyLeft.length)} />
            <Metric label={`Only ${resolvedRight.code}`} value={String(onlyRight.length)} />
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-ink">Copy comparison planning brief</h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Export a cautious market comparison with priority records, difference prompts, source-review reminders and first actions.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <CopyMarkdownButton text={markdown} label="Copy comparison brief" />
              <CopyOutputNote className="max-w-sm sm:text-right" />
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <JurisdictionColumn jurisdiction={resolvedLeft} records={leftRecords} peerRecords={rightRecords} />
          <JurisdictionColumn jurisdiction={resolvedRight} records={rightRecords} peerRecords={leftRecords} />
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-ink">Diff strip</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <RecordList title="Only in first jurisdiction" records={onlyLeft} />
            <RecordList title="In both" records={inBoth} />
            <RecordList title="Only in second jurisdiction" records={onlyRight} />
          </div>
        </section>

        <FooterDisclaimer />
      </div>
    </main>
  );
}

function JurisdictionColumn({
  jurisdiction,
  records,
  peerRecords
}: {
  jurisdiction: Jurisdiction;
  records: Regulation[];
  peerRecords: Regulation[];
}) {
  const peerIds = new Set(peerRecords.map((regulation) => regulation.id));
  const topics = uniq(records.flatMap((regulation) => regulation.topics)).slice(0, 8);
  const obligations = uniq(records.flatMap((regulation) => regulation.businessImpacts)).slice(0, 8);
  const advisory = uniq(records.flatMap((regulation) => regulation.advisoryOpportunities)).slice(0, 8);
  const highConfidence = records.filter((regulation) => regulation.confidenceLevel === "high").length;
  const highImpact = records.filter((regulation) => regulation.highImpact).length;

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">{jurisdiction.code}</p>
          <h2 className="mt-1 text-2xl font-bold text-ink">{jurisdiction.name}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{jurisdiction.executiveSummary}</p>
        </div>
        <Badge className="border-slate-200 bg-slate-50 text-slate-600">{records.length} records</Badge>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="High confidence" value={String(highConfidence)} />
        <Metric label="High impact" value={String(highImpact)} />
        <Metric label="Unique records" value={String(records.filter((record) => !peerIds.has(record.id)).length)} />
        <Metric label="Shared records" value={String(records.filter((record) => peerIds.has(record.id)).length)} />
      </div>

      <ListBlock title="Primary topics" values={topics} />
      <ListBlock title="Business obligations" values={obligations} />
      <ListBlock title="Advisory workstreams" values={advisory} />
    </section>
  );
}

function RecordList({ title, records }: { title: string; records: Regulation[] }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <div className="mt-3 space-y-2">
        {records.slice(0, 8).map((regulation) => (
          <Link
            key={regulation.id}
            href={`/regulations/${regulation.id}`}
            className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-sm hover:bg-teal/5"
          >
            <span className="font-semibold text-ink">{regulation.shortName}</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        ))}
        {!records.length && <p className="text-sm text-slate-500">No records in this bucket.</p>}
      </div>
    </div>
  );
}

function ListBlock({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="mt-4 rounded-xl bg-slate-50 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.map((value) => (
          <Badge key={value} className="border-slate-200 bg-white text-slate-600">
            {value}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-xl font-bold text-ink">{value}</div>
    </div>
  );
}

function RegulationCompare({ records, requestedIds }: { records: Regulation[]; requestedIds: string[] }) {
  const markdown = buildRegulationComparisonBriefMarkdown({ records, requestedIds });

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Compare"
          title="Regulation comparison"
          body="Compare obligations, applicability, dates and evidence needs across selected regulatory records. This is an advisory planning aid, not a legal determination."
          meta={`${records.length} of ${requestedIds.length} requested records found.`}
        />
        <DisclaimerBanner />
        <GlossaryHelpCard
          title="Interpret comparison outputs carefully"
          body="Comparison tables show tracked differences in seed records, not legal equivalence or complete market coverage. Use status, date, confidence and source labels as prompts to review primary sources before making scope decisions."
          termIds={["legal-force", "reporting-year", "seed-intelligence"]}
          compact
        />

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="font-semibold text-ink">Selected records</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">Use the Regulations page compare picker to adjust this set.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <CopyMarkdownButton text={markdown} label="Copy comparison brief" />
              <Link href="/regulations" className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Open picker <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <CopyOutputNote className="mt-3 max-w-2xl" />
          {!records.length && (
            <p className="mt-4 rounded-xl border border-dashed border-slate-200 p-5 text-sm text-slate-500">
              No matching regulation IDs were found. Try `/compare?ids=csrd,issb-s1-s2`.
            </p>
          )}
        </section>

        {records.length ? (
          <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="w-56 px-5 py-3">Dimension</th>
                    {records.map((record) => (
                      <th key={record.id} className="px-5 py-3">
                        <Link href={`/regulations/${record.id}`} className="inline-flex items-center gap-2 text-ink hover:text-teal">
                          {record.shortName}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <CompareRow label="Status" records={records} render={(record) => <StatusBadge status={record.status} />} />
                  <CompareRow label="Jurisdiction" records={records} render={(record) => record.jurisdiction} />
                  <CompareRow label="Issuing body" records={records} render={(record) => record.issuingBody} />
                  <CompareRow label="First reporting" records={records} render={(record) => String(record.firstReportingYear || "n/a")} />
                  <CompareRow label="First report due" records={records} render={(record) => record.firstReportDueDate || "n/a"} />
                  <CompareRow label="Thresholds" records={records} render={(record) => (record.applicabilityScope?.thresholds || []).slice(0, 3).join("; ") || "Confirm source record"} />
                  <CompareRow label="Readiness priority" records={records} render={(record) => `${readinessBand(record)} (${readinessScore(record)}/100)`} />
                  <CompareRow label="Applicability" records={records} render={(record) => record.applicability} />
                  <CompareRow label="Business impact" records={records} render={(record) => record.businessImpact} />
                  <CompareRow label="Business functions" records={records} render={(record) => record.affectedFunctions.slice(0, 6).join("; ")} />
                  <CompareRow label="Evidence required" records={records} render={(record) => (record.evidenceRequired || []).slice(0, 4).join("; ") || "Review source record"} />
                  <CompareRow label="Advisory opportunities" records={records} render={(record) => record.advisoryOpportunities.slice(0, 5).join("; ")} />
                  <CompareRow label="Penalties or enforcement" records={records} render={(record) => record.penalties || "Not captured in seed record"} />
                  <CompareRow label="Source confidence" records={records} render={(record) => `${record.confidenceLevel.replaceAll("_", " ")} · ${record.dataQualityStatus.replaceAll("_", " ")}`} />
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        <FooterDisclaimer />
      </div>
    </main>
  );
}

function CompareRow({
  label,
  records,
  render
}: {
  label: string;
  records: Regulation[];
  render: (record: Regulation) => ReactNode;
}) {
  return (
    <tr>
      <td className="bg-slate-50 px-5 py-4 font-semibold text-ink">{label}</td>
      {records.map((record) => (
        <td key={record.id} className="max-w-lg px-5 py-4 text-slate-600">
          {render(record)}
        </td>
      ))}
    </tr>
  );
}

function idsFromParam(value?: string) {
  return (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function jurisdictionCodesFromParam(value?: string) {
  return (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 2);
}

function jurisdictionFromParam(value?: string) {
  const normalized = (value || "").toLowerCase();
  return jurisdictions.find((jurisdiction) => jurisdiction.code.toLowerCase() === normalized || jurisdiction.id.toLowerCase() === normalized);
}
