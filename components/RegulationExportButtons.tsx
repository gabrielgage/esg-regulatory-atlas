"use client";

import { Download } from "lucide-react";
import { DATASET_META } from "@/data/_meta";
import { Regulation } from "@/types/regulation";
import { useLanguage } from "./LanguageProvider";

const EXPORT_CAVEAT =
  "This export is indicative seed regulatory intelligence for orientation and planning. It is not legal, tax, investment or assurance advice and does not determine entity-specific applicability.";
const SOURCE_REVIEW_NOTE =
  "Source-backed records include captured source links in the seed dataset, but exported data is not independent source verification. Confirm primary sources, thresholds, dates and entity-specific facts before relying on this export.";

export function RegulationExportButtons({ regulations }: { regulations: Regulation[] }) {
  const { t } = useLanguage();

  function exportJson() {
    const exportedAt = new Date().toISOString();
    download(
      `etica-esg-regulations-${dateStamp()}.json`,
      JSON.stringify(
        {
          metadata: exportMetadata(regulations.length, exportedAt),
          records: regulations
        },
        null,
        2
      ),
      "application/json"
    );
  }

  function exportCsv() {
    const exportedAt = new Date().toISOString();
    const metadata = exportMetadata(regulations.length, exportedAt);
    const rows = [
      [
        "atlasEdition",
        "exportedAt",
        "publisher",
        "editor",
        "recordCount",
        "exportCaveat",
        "sourceReviewNote",
        "id",
        "shortName",
        "title",
        "jurisdiction",
        "status",
        "topics",
        "sectors",
        "firstReportingYear",
        "confidence",
        "dataQualityStatus",
        "sources"
      ],
      ...regulations.map((regulation) => [
        metadata.edition,
        metadata.exportedAt,
        metadata.publisher,
        metadata.editor,
        String(metadata.recordCount),
        metadata.caveat,
        metadata.sourceReviewNote,
        regulation.id,
        regulation.shortName,
        regulation.title,
        regulation.jurisdiction,
        regulation.status,
        regulation.topics.join("; "),
        regulation.sectors.join("; "),
        String(regulation.firstReportingYear || ""),
        regulation.confidenceLevel,
        regulation.dataQualityStatus,
        regulation.sourceUrls.map((source) => source.url).join("; ")
      ])
    ];
    download(`etica-esg-regulations-${dateStamp()}.csv`, rows.map((row) => row.map(csvCell).join(",")).join("\n"), "text/csv");
  }

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={exportCsv}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
        >
          <Download className="h-4 w-4 text-teal" />
          {t("export.csv")}
        </button>
        <button
          type="button"
          onClick={exportJson}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
        >
          <Download className="h-4 w-4 text-teal" />
          {t("export.json")}
        </button>
      </div>
      <p className="max-w-xl text-xs leading-5 text-slate-500" data-testid="regulation-export-caveat">
        Exports include Etica ESG edition metadata, caveat fields and source-review notes. Treat exported files as planning aids and confirm primary sources before relying on them.
      </p>
    </div>
  );
}

function exportMetadata(recordCount: number, exportedAt: string) {
  return {
    publisher: DATASET_META.publisher,
    editor: DATASET_META.editor,
    contactEmail: DATASET_META.contactEmail,
    edition: DATASET_META.edition,
    datasetLastReviewed: DATASET_META.lastReviewed,
    datasetNextReview: DATASET_META.nextReview,
    exportedAt,
    recordCount,
    caveat: EXPORT_CAVEAT,
    sourceReviewNote: SOURCE_REVIEW_NOTE
  };
}

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function dateStamp() {
  return new Date().toISOString().slice(0, 10);
}
