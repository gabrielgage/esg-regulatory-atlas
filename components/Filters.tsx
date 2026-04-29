import { topics, sectors } from "@/data/seed";

interface Props { query: string; setQuery: (v:string)=>void; topic: string; setTopic:(v:string)=>void; sector:string; setSector:(v:string)=>void; status:string; setStatus:(v:string)=>void; }
export function Filters({ query, setQuery, topic, setTopic, sector, setSector, status, setStatus }: Props) {
  return (
    <section className="grid gap-3 rounded-3xl border bg-white p-4 shadow-sm md:grid-cols-4">
      <input className="rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal/30" placeholder="Search regulations, topics, sectors" value={query} onChange={e=>setQuery(e.target.value)} />
      <select className="rounded-2xl border px-4 py-3 text-sm" value={topic} onChange={e=>setTopic(e.target.value)}><option value="">All topics</option>{topics.map(t=><option key={t}>{t}</option>)}</select>
      <select className="rounded-2xl border px-4 py-3 text-sm" value={sector} onChange={e=>setSector(e.target.value)}><option value="">All sectors</option>{sectors.map(s=><option key={s}>{s}</option>)}</select>
      <select className="rounded-2xl border px-4 py-3 text-sm" value={status} onChange={e=>setStatus(e.target.value)}><option value="">All status</option><option value="consultation">Consultation</option><option value="adopted">Adopted</option><option value="in_force">In force</option><option value="first_reporting">First reporting</option><option value="transition">Transition</option><option value="paused">Paused</option></select>
    </section>
  );
}
