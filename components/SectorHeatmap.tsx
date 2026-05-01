"use client";

import { jurisdictions, regulations, sectors } from "@/data/seed";
import { recordsForJurisdiction } from "@/lib/layers";
import { cn } from "@/lib/utils";

const trackedJurisdictions = jurisdictions.filter((jurisdiction) => jurisdiction.type !== "international").slice(0, 10);
const trackedSectors = sectors.filter((sector) => sector !== "All sectors").slice(0, 12);

export function SectorHeatmap() {
  const maxCount = Math.max(
    1,
    ...trackedSectors.flatMap((sector) =>
      trackedJurisdictions.map(
        (jurisdiction) =>
          recordsForJurisdiction(jurisdiction, regulations).filter((regulation) => regulation.sectors.includes(sector) || regulation.sectors.includes("All sectors")).length
      )
    )
  );

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="font-semibold text-ink">Sector heatmap</h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Scan where sector exposure clusters across tracked jurisdictions. Counts include direct and parent-jurisdiction records for orientation.
          </p>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          Darker = more tracked records
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[900px] border-separate border-spacing-1 text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-white p-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Sector
              </th>
              {trackedJurisdictions.map((jurisdiction) => (
                <th key={jurisdiction.id} className="p-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {jurisdiction.code}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {trackedSectors.map((sector) => (
              <tr key={sector}>
                <th className="sticky left-0 z-10 max-w-48 bg-white p-2 text-left font-semibold text-ink">
                  {sector}
                </th>
                {trackedJurisdictions.map((jurisdiction) => {
                  const count = recordsForJurisdiction(jurisdiction, regulations).filter(
                    (regulation) => regulation.sectors.includes(sector) || regulation.sectors.includes("All sectors")
                  ).length;
                  return (
                    <td key={`${sector}-${jurisdiction.id}`} className="p-1">
                      <div
                        className={cn(
                          "flex h-11 items-center justify-center rounded-lg border text-xs font-semibold",
                          count ? "border-teal/20 text-ink" : "border-slate-100 bg-slate-50 text-slate-400"
                        )}
                        style={{ backgroundColor: count ? heatColor(count, maxCount) : undefined }}
                        title={`${sector} in ${jurisdiction.name}: ${count} tracked records`}
                      >
                        {count || "-"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function heatColor(count: number, maxCount: number) {
  const opacity = Math.max(0.12, Math.min(0.82, count / maxCount));
  return `rgba(20, 184, 166, ${opacity})`;
}
