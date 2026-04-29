'use client';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Regulation, Jurisdiction } from "@/types/regulation";
import { scoreJurisdiction } from "@/lib/utils";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const colors: Record<string, string> = { high: "#0f766e", medium: "#7dd3c7", emerging: "#c7f2eb", none: "#e5e7eb" };

export function WorldMap({ jurisdictions, regulations, selectedId, onSelect }: { jurisdictions: Jurisdiction[]; regulations: Regulation[]; selectedId?: string; onSelect: (j: Jurisdiction) => void }) {
  const byName = new Map(jurisdictions.filter(j=>j.type !== "supranational" && j.type !== "international").map(j => [j.name.toLowerCase(), j]));
  const aliases: Record<string, string> = { "united states of america": "United States", "united kingdom": "United Kingdom", "netherlands": "Netherlands", "japan": "Japan", "australia": "Australia", "singapore": "Singapore" };
  return (
    <div className="rounded-3xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div><h2 className="font-semibold">Interactive regulatory map</h2><p className="text-sm text-slate-500">Click a tracked country to open its profile.</p></div>
        <div className="hidden gap-3 text-xs text-slate-500 md:flex"><Legend color="#0f766e" label="High"/><Legend color="#7dd3c7" label="Medium"/><Legend color="#c7f2eb" label="Emerging"/><Legend color="#e5e7eb" label="No data"/></div>
      </div>
      <ComposableMap projectionConfig={{ scale: 145 }} className="h-[440px] w-full">
        <Geographies geography={geoUrl}>{({ geographies }) => geographies.map(geo => {
          const raw = String(geo.properties.name || "").toLowerCase();
          const canonical = aliases[raw] || geo.properties.name;
          const j = byName.get(String(canonical).toLowerCase());
          const regs = j ? regulations.filter(r => r.jurisdictionIds.includes(j.id)) : [];
          const intensity = scoreJurisdiction(regs);
          const active = selectedId && j?.id === selectedId;
          return <Geography key={geo.rsmKey} geography={geo} onClick={() => j && onSelect(j)} title={j ? `${j.name}: ${regs.length} tracked records` : geo.properties.name} style={{ default: { fill: active ? "#6d5dfc" : colors[intensity], stroke: "#ffffff", strokeWidth: 0.5, outline: "none", cursor: j ? "pointer" : "default" }, hover: { fill: j ? "#6d5dfc" : "#d1d5db", outline: "none" }, pressed: { outline: "none" } }} />;
        })}</Geographies>
      </ComposableMap>
    </div>
  );
}
function Legend({color,label}:{color:string;label:string}){ return <span className="flex items-center gap-1"><i className="h-3 w-3 rounded-full" style={{background:color}} />{label}</span> }
