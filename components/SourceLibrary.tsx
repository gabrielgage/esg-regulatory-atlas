import { ArrowUpRight, BookOpenCheck, ExternalLink, FileWarning, Library } from "lucide-react";
import { Badge } from "./Badge";
import { Regulation, SourceLink } from "@/types/regulation";
import { formatDate, uniq } from "@/lib/utils";

const sourceTypeLabel: Record<SourceLink["type"], string> = {
  primary: "Primary",
  secondary: "Secondary",
  regulator: "Regulator",
  standards_body: "Standards body"
};

export function SourceLibrary({
  regulations,
  onSelect
}: {
  regulations: Regulation[];
  onSelect: (regulation: Regulation) => void;
}) {
  const links = regulations.flatMap((regulation) =>
    regulation.sourceUrls.map((source) => ({
      ...source,
      regulation
    }))
  );
  const missing = regulations.filter((regulation) => regulation.sourceUrls.length === 0);
  const sourceTypes = uniq(links.map((source) => source.type)) as SourceLink["type"][];
  const nextReviews = regulations
    .filter((regulation) => regulation.nextReviewDate)
    .sort((a, b) => String(a.nextReviewDate).localeCompare(String(b.nextReviewDate)))
    .slice(0, 4);

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Library className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Source library</h2>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Source inventory for the current filter view, including missing-source records and upcoming review dates.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-teal/20 bg-teal/10 text-teal">{links.length} source links</Badge>
          <Badge className={missing.length ? "border-red-200 bg-red-50 text-red-700" : "border-slate-200 bg-slate-50 text-slate-600"}>
            {missing.length} missing
          </Badge>
        </div>
      </div>

      <div className="mt-4 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-xl border border-slate-200">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <BookOpenCheck className="h-4 w-4 text-teal" />
              Source register
            </div>
            <div className="flex flex-wrap gap-1">
              {sourceTypes.map((type) => (
                <Badge key={type} className="border-slate-200 bg-slate-50 text-slate-600">
                  {sourceTypeLabel[type]}
                </Badge>
              ))}
            </div>
          </div>
          <div className="max-h-[460px] divide-y divide-slate-100 overflow-y-auto">
            {links.length ? (
              links.slice(0, 16).map((source) => (
                <div key={`${source.regulation.id}-${source.url}`} className="grid gap-2 px-4 py-3 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelect(source.regulation)}
                        className="font-semibold text-ink hover:text-teal"
                      >
                        {source.regulation.shortName}
                      </button>
                      <Badge className="border-slate-200 bg-slate-50 text-slate-600">{sourceTypeLabel[source.type]}</Badge>
                    </div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 flex items-start gap-2 text-sm leading-5 text-teal underline"
                    >
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span className="break-words">{source.label}</span>
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelect(source.regulation)}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-600 hover:border-teal/40 hover:bg-teal/5 hover:text-teal"
                  >
                    Open
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <p className="p-4 text-sm text-slate-500">No source links match the current filters.</p>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <FileWarning className="h-4 w-4 text-amber-600" />
              Missing-source watchlist
            </div>
            <div className="mt-3 space-y-2">
              {missing.length ? (
                missing.slice(0, 5).map((regulation) => (
                  <button
                    key={regulation.id}
                    type="button"
                    onClick={() => onSelect(regulation)}
                    className="w-full rounded-lg bg-slate-50 p-3 text-left hover:bg-teal/5"
                  >
                    <div className="font-semibold text-ink">{regulation.shortName}</div>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">{regulation.latestUpdate}</p>
                  </button>
                ))
              ) : (
                <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">No missing-source records in the current filters.</p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-ink">Upcoming review dates</h3>
            <div className="mt-3 space-y-2">
              {nextReviews.map((regulation) => (
                <button
                  key={regulation.id}
                  type="button"
                  onClick={() => onSelect(regulation)}
                  className="flex w-full items-center justify-between gap-3 rounded-lg bg-slate-50 p-3 text-left hover:bg-teal/5"
                >
                  <span className="font-semibold text-ink">{regulation.shortName}</span>
                  <span className="text-sm text-slate-500">{formatDate(regulation.nextReviewDate)}</span>
                </button>
              ))}
              {!nextReviews.length && <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">No review dates in current filters.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
