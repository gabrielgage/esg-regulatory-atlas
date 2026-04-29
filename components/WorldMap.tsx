"use client";

import { Globe2 } from "lucide-react";
import { Regulation, Jurisdiction } from "@/types/regulation";
import { scoreJurisdiction, cn } from "@/lib/utils";

const colors: Record<string, string> = { high: "#0f766e", medium: "#7dd3c7", emerging: "#c7f2eb", none: "#94a3b8" };

const regionBands = [
  { label: "North America", x: 13, y: 33, w: 23, h: 22 },
  { label: "Latin America", x: 28, y: 58, w: 18, h: 25 },
  { label: "Europe", x: 48, y: 31, w: 18, h: 17 },
  { label: "Asia", x: 66, y: 36, w: 24, h: 24 },
  { label: "Australia", x: 78, y: 68, w: 13, h: 12 }
];

export function WorldMap({
  jurisdictions,
  regulations,
  selectedId,
  onSelect
}: {
  jurisdictions: Jurisdiction[];
  regulations: Regulation[];
  selectedId?: string;
  onSelect: (j: Jurisdiction) => void;
}) {
  const mapped = jurisdictions.filter((jurisdiction) => jurisdiction.coordinates && jurisdiction.type !== "international" && jurisdiction.type !== "supranational");

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-teal" />
            <h2 className="font-semibold">Interactive regulatory map</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">Dependency-free map interface with tracked jurisdictions shaded by current filtered intensity.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <Legend color="#0f766e" label="High" />
          <Legend color="#7dd3c7" label="Medium" />
          <Legend color="#c7f2eb" label="Emerging" />
          <Legend color="#94a3b8" label="No filtered data" />
        </div>
      </div>

      <div className="relative min-h-[430px] overflow-hidden rounded-xl border border-slate-100 bg-[#eaf2f4]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <rect width="100" height="100" fill="#eaf2f4" />
          {regionBands.map((band) => (
            <rect
              key={band.label}
              x={band.x}
              y={band.y}
              width={band.w}
              height={band.h}
              rx="5"
              fill="#ffffff"
              opacity="0.9"
              stroke="#cbd5e1"
              strokeWidth="0.35"
            />
          ))}
          <path d="M5 26 C19 17, 32 21, 41 28 C51 18, 67 20, 80 25 C91 30, 97 41, 95 54" fill="none" stroke="#cbd5e1" strokeWidth="0.35" strokeDasharray="2 2" />
          <path d="M11 72 C26 80, 42 78, 54 70 C69 61, 82 63, 93 72" fill="none" stroke="#cbd5e1" strokeWidth="0.35" strokeDasharray="2 2" />
        </svg>

        {regionBands.map((band) => (
          <span key={band.label} className="absolute text-[11px] font-semibold uppercase tracking-wide text-slate-400" style={{ left: `${band.x + 1}%`, top: `${band.y + 1}%` }}>
            {band.label}
          </span>
        ))}

        {mapped.map((jurisdiction) => {
          const regs = recordsFor(jurisdiction, regulations);
          const intensity = scoreJurisdiction(regs);
          const [longitude, latitude] = jurisdiction.coordinates!;
          const position = project(longitude, latitude);
          const active = selectedId === jurisdiction.id;

          return (
            <button
              key={jurisdiction.id}
              type="button"
              onClick={() => onSelect(jurisdiction)}
              className={cn(
                "absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg transition hover:scale-110",
                active ? "h-5 w-5 bg-violet" : "h-4 w-4"
              )}
              style={{ left: `${position.x}%`, top: `${position.y}%`, backgroundColor: active ? "#6d5dfc" : colors[intensity] }}
              aria-label={`${jurisdiction.name}: ${regs.length} tracked records`}
              title={`${jurisdiction.name}: ${regs.length} tracked records`}
            >
              <span className="sr-only">{jurisdiction.name}</span>
            </button>
          );
        })}

        <div className="absolute bottom-4 left-4 right-4 grid gap-2 rounded-xl border border-white/70 bg-white/85 p-3 shadow-sm backdrop-blur md:grid-cols-3">
          {mapped.slice(0, 12).map((jurisdiction) => {
            const regs = recordsFor(jurisdiction, regulations);
            return (
              <button
                key={jurisdiction.id}
                type="button"
                onClick={() => onSelect(jurisdiction)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs hover:bg-slate-50",
                  selectedId === jurisdiction.id && "bg-teal/10 text-teal"
                )}
              >
                <span className="font-semibold">{jurisdiction.name}</span>
                <span className="text-slate-500">{regs.length}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function recordsFor(jurisdiction: Jurisdiction, regulations: Regulation[]) {
  return regulations.filter(
    (regulation) =>
      regulation.jurisdictionIds.includes(jurisdiction.id) ||
      Boolean(jurisdiction.parent && regulation.jurisdictionIds.includes(jurisdiction.parent))
  );
}

function project(longitude: number, latitude: number) {
  return {
    x: ((longitude + 180) / 360) * 100,
    y: ((90 - latitude) / 180) * 100
  };
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <i className="h-3 w-3 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
