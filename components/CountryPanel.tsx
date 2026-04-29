import { Jurisdiction, Regulation } from "@/types/regulation";
import { Badge } from "./Badge";
import { statusClass, statusLabel } from "@/lib/utils";

export function CountryPanel({ jurisdiction, regulations, onRegulation }: { jurisdiction: Jurisdiction | null; regulations: Regulation[]; onRegulation:(r: Regulation)=>void }) {
  if (!jurisdiction) return <div className="rounded-3xl border bg-white p-6 text-slate-500 shadow-sm">Select a tracked country on the map to view the jurisdiction profile.</div>;
  const regs = regulations.filter(r => r.jurisdictionIds.includes(jurisdiction.id) || (jurisdiction.parent && r.jurisdictionIds.includes(jurisdiction.parent)));
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-wide text-teal">Jurisdiction profile</p>
      <h2 className="mt-1 text-2xl font-bold">{jurisdiction.name}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{jurisdiction.executiveSummary}</p>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <Metric label="Records" value={String(regs.length)} />
        <Metric label="Region" value={jurisdiction.region} />
        <Metric label="Type" value={jurisdiction.type} />
      </div>
      <h3 className="mt-6 font-semibold">Applicable regulations</h3>
      <div className="mt-3 space-y-3">
        {regs.map(r => <button key={r.id} onClick={()=>onRegulation(r)} className="w-full rounded-2xl border p-4 text-left hover:bg-slate-50"><div className="flex items-center justify-between gap-3"><span className="font-semibold">{r.shortName}</span><Badge className={statusClass[r.status]}>{statusLabel[r.status]}</Badge></div><p className="mt-2 line-clamp-2 text-sm text-slate-500">{r.summary}</p></button>)}
      </div>
    </div>
  );
}
function Metric({label,value}:{label:string;value:string}) { return <div className="rounded-2xl bg-slate-50 p-3"><div className="text-xs uppercase text-slate-400">{label}</div><div className="mt-1 truncate text-sm font-semibold capitalize">{value}</div></div> }
