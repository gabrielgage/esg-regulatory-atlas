"use client";

import { useMemo, useState } from "react";
import { Check, ClipboardCopy, Quote } from "lucide-react";
import { DATASET_META } from "@/data/_meta";
import { Regulation } from "@/types/regulation";

export function CitationWidget({ regulation }: { regulation: Regulation }) {
  const [copied, setCopied] = useState<string | null>(null);
  const citations = useMemo(() => buildCitations(regulation), [regulation]);

  async function copy(label: string, text: string) {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(text);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1800);
  }

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <details>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 font-semibold text-ink">
            <Quote className="h-4 w-4 text-teal" />
            Cite this record
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">APA · legal style · BibTeX</span>
        </summary>
        <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900" data-testid="citation-caveat">
          Citation copies identify the Atlas seed record and edition. They are not official legal citations, source verification, official translations or legal authority. Cite and review primary sources separately before reliance.
        </p>
        <div className="mt-4 grid gap-3">
          {citations.map((citation) => (
            <div key={citation.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">{citation.label}</h3>
                <button
                  type="button"
                  onClick={() => copy(citation.label, citation.text)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:border-teal/40 hover:text-teal"
                >
                  {copied === citation.label ? <Check className="h-3.5 w-3.5" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
                  {copied === citation.label ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-5 text-slate-600">{citation.text}</pre>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}

function buildCitations(regulation: Regulation) {
  const pageUrl = `${DATASET_META.publisherUrl}/regulations/${regulation.id}`;
  const editionUrl = `${DATASET_META.publisherUrl}/edition/${DATASET_META.editionSlug}/regulations/${regulation.id}`;
  const primarySource = regulation.sourceUrls.find((source) => source.type === "primary") || regulation.sourceUrls[0];
  const year = DATASET_META.lastReviewed.slice(0, 4);
  const cleanTitle = `${regulation.shortName}: ${regulation.title}`;
  const citationCaveat = "Atlas citation only; not legal authority, source verification or official translation.";

  return [
    {
      label: "APA style",
      text: `${DATASET_META.publisher}. (${year}). ${cleanTitle}. ${DATASET_META.edition}. Edited by ${DATASET_META.editor}. ${editionUrl} [${citationCaveat}]`
    },
    {
      label: "Legal research note",
      text: `${cleanTitle}, ${DATASET_META.publisher} Regulatory Atlas ${DATASET_META.edition} (${DATASET_META.lastReviewed}), ${editionUrl}${primarySource ? `; primary source to verify: ${primarySource.label}, ${primarySource.url}` : ""}. ${citationCaveat}`
    },
    {
      label: "BibTeX",
      text: [
        `@misc{etica_${regulation.id.replaceAll("-", "_")}_${year},`,
        `  title = {${cleanTitle}},`,
        `  author = {{${DATASET_META.publisher}}},`,
        `  editor = {${DATASET_META.editor}},`,
        `  year = {${year}},`,
        `  note = {${DATASET_META.edition}; seed regulatory intelligence; ${citationCaveat}},`,
        `  url = {${pageUrl}},`,
        `  urldate = {${DATASET_META.lastReviewed}}`,
        `}`
      ].join("\n")
    }
  ];
}
