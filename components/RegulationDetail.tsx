import { X, ExternalLink } from "lucide-react";
import { Regulation } from "@/types/regulation";
import { Badge } from "./Badge";
import { statusClass, statusLabel } from "@/lib/utils";

export function RegulationDetail({ regulation, onClose }: { regulation: Regulation | null; onClose: () => void }) {
  if (!regulation) return null;
  return (
    <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-xl overflow-y-auto border-l bg-white p-6 shadow-2xl">
      <button onClick={onClose} className="absolute right-5 top-5 rounded-full border p-2 hover:bg-slate-50"><X size={18}/></button>
      <div className="pr-12">
        <Badge className={statusClass[regulation.status]}>{statusLabel[regulation.status]}</Badge>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink">{regulation.shortName}</h2>
        <p className="mt-1 text-slate-500">{regulation.title}</p>
      </div>
      <div className="mt-6 grid gap-4">
        <Card title="Overarching requirement">{regulation.summary}</Card>
        <Card title="Applicability">{regulation.applicability}</Card>
        <Card title="What this means for your business">{regulation.businessImpact}</Card>
        <Card title="Key dates"><div className="grid grid-cols-2 gap-3"><Metric label="Effective date" value={regulation.effectiveDate}/><Metric label="First reporting" value={String(regulation.firstReportingYear || "n/a")}/></div></Card>
        <Card title="Value chain impact"><div className="flex flex-wrap gap-2">{regulation.valueChain.map(v=><Badge key={v} className="border-teal/20 bg-teal/10 text-teal">{v}</Badge>)}</div></Card>
        <Card title="Advisory opportunities"><div className="flex flex-wrap gap-2">{regulation.advisoryOpportunities.map(v=><Badge key={v} className="border-violet/20 bg-violet/10 text-violet">{v}</Badge>)}</div></Card>
        <Card title="Latest update">{regulation.latestUpdate}</Card>
        <Card title="Sources"><div className="space-y-2">{regulation.sourceUrls.map(url=><a key={url} className="flex items-center gap-2 text-sm text-teal underline" href={url} target="_blank"><ExternalLink size={14}/>{url}</a>)}</div></Card>
      </div>
    </aside>
  );
}
function Card({ title, children }: {title:string; children: React.ReactNode}) { return <section className="rounded-3xl border bg-slate-50 p-5"><h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3><div className="text-sm leading-6 text-slate-700">{children}</div></section>; }
function Metric({ label, value }: {label:string; value:string}) { return <div className="rounded-2xl bg-white p-4"><div className="text-xs uppercase text-slate-400">{label}</div><div className="mt-1 font-semibold">{value}</div></div>; }
