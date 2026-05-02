"use client";

import { Download } from "lucide-react";
import { Regulation } from "@/types/regulation";
import { useLanguage } from "./LanguageProvider";

export function RegulationExportButtons({ regulations }: { regulations: Regulation[] }) {
  const { t } = useLanguage();

  function exportJson() {
    download(
      `etica-esg-regulations-${dateStamp()}.json`,
      JSON.stringify(regulations, null, 2),
      "application/json"
    );
  }

  function exportCsv() {
    const rows = [
      ["id", "shortName", "title", "jurisdiction", "status", "topics", "sectors", "firstReportingYear", "confidence", "dataQualityStatus", "sources"],
      ...regulations.map((regulation) => [
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
  );
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
