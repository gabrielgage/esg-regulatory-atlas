import { Globe2, ShieldCheck } from "lucide-react";
export function Header() {
  return (
    <header className="border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-navy p-2 text-white"><Globe2 size={22} /></div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">ESG Regulatory Atlas</h1>
            <p className="text-sm text-slate-500">Global sustainability regulation intelligence map</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full border bg-slate-50 px-4 py-2 text-sm text-slate-600 md:flex">
          <ShieldCheck size={16} /> Data disclaimer: intelligence tool, not legal advice
        </div>
      </div>
    </header>
  );
}
