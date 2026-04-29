import { Badge } from "./Badge";
import { Regulation } from "@/types/regulation";
import { statusClass, statusLabel } from "@/lib/utils";

export function RegulationTable({ regulations, onSelect }: { regulations: Regulation[]; onSelect: (r: Regulation) => void }) {
  if (!regulations.length) return <div className="rounded-3xl border bg-white p-8 text-center text-slate-500">No regulations match the selected filters.</div>;
  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="border-b px-5 py-4"><h2 className="font-semibold">Regulation database</h2></div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="px-5 py-3">Regulation</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Topics</th><th className="px-5 py-3">First reporting</th><th className="px-5 py-3">Confidence</th></tr>
          </thead>
          <tbody className="divide-y">
            {regulations.map(r => (
              <tr key={r.id} onClick={() => onSelect(r)} className="cursor-pointer hover:bg-slate-50">
                <td className="px-5 py-4"><div className="font-semibold text-ink">{r.shortName}</div><div className="max-w-xl text-slate-500">{r.title}</div></td>
                <td className="px-5 py-4"><Badge className={statusClass[r.status]}>{statusLabel[r.status]}</Badge></td>
                <td className="px-5 py-4"><div className="flex flex-wrap gap-1">{r.topics.slice(0,3).map(t=><Badge key={t} className="border-slate-200 bg-slate-50 text-slate-600">{t}</Badge>)}</div></td>
                <td className="px-5 py-4">{r.firstReportingYear || "n/a"}</td>
                <td className="px-5 py-4 capitalize">{r.confidence.replace("_", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
