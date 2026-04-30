"use client";

import { useMemo, useState } from "react";
import { Globe2, Layers2 } from "lucide-react";
import { Jurisdiction, Regulation } from "@/types/regulation";
import { cn, scoreJurisdiction } from "@/lib/utils";

const colors: Record<string, string> = {
  high: "#0f766e",
  medium: "#57c3b7",
  emerging: "#67e8d1",
  none: "#94a3b8"
};

const tileColumns = [0, 1, 2, 3];
const tileRows = [1, 2];
const tileSize = 256;
const worldWidth = tileSize * 4;
const mapHeight = tileSize * tileRows.length;
const tileYStart = tileRows[0] * tileSize;

const labelOffsets: Record<string, { x: number; y: number }> = {
  eu: { x: -52, y: -58 },
  nl: { x: 68, y: -54 },
  uk: { x: -72, y: -36 },
  ch: { x: 58, y: -18 },
  tr: { x: 70, y: 28 },
  "ca-us": { x: -54, y: 34 },
  us: { x: 0, y: 36 },
  ca: { x: 0, y: -36 },
  mx: { x: 44, y: 26 },
  br: { x: 0, y: 38 },
  sg: { x: -64, y: 24 },
  jp: { x: 42, y: -24 },
  au: { x: 0, y: -30 },
  in: { x: -36, y: 32 },
  cn: { x: 44, y: 0 }
};

const mapLayers = [
  "Global overview",
  "Corporate reporting",
  "Sustainable finance",
  "Climate disclosure",
  "Supply chain due diligence",
  "Product and trade",
  "Biodiversity and nature",
  "Private equity impact",
  "ISSB adoption"
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
  const mapped = useMemo(
    () => jurisdictions.filter((jurisdiction) => jurisdiction.coordinates && jurisdiction.type !== "international"),
    [jurisdictions]
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState(mapLayers[0]);
  const featured = mapped.find((jurisdiction) => jurisdiction.id === hoveredId) || mapped.find((jurisdiction) => jurisdiction.id === selectedId);
  const featuredRecords = featured ? recordsFor(featured, regulations) : [];

  return (
    <section className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Interactive regulatory map</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Country fill reflects regulatory intensity; the selected layer badge indicates the analytical lens.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <Legend color={colors.high} label="High" />
          <Legend color={colors.medium} label="Medium" />
          <Legend color={colors.emerging} label="Emerging" />
          <Legend color={colors.none} label="No filtered data" />
        </div>
      </div>

      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {mapLayers.map((layer) => (
          <button
            key={layer}
            type="button"
            onClick={() => setActiveLayer(layer)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
              activeLayer === layer ? "border-violet/30 bg-violet/10 text-violet" : "border-slate-200 bg-white text-slate-600 hover:border-teal/30 hover:bg-teal/5"
            )}
          >
            {layer}
          </button>
        ))}
      </div>

      <div data-testid="regulatory-map" className="relative aspect-[2/1] min-h-[320px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2">
          {tileRows.flatMap((row) =>
            tileColumns.map((column) => (
              <img
                key={`${column}-${row}`}
                alt=""
                aria-hidden="true"
                draggable={false}
                loading="eager"
                referrerPolicy="no-referrer"
                className="h-full w-full select-none object-cover contrast-[1.04] saturate-[0.9]"
                src={`https://a.basemaps.cartocdn.com/light_all/2/${column}/${row}.png`}
              />
            ))
          )}
        </div>
        <div className="absolute inset-0 bg-white/10" />
        <div className="pointer-events-none absolute bottom-2 right-2 z-20 rounded-md bg-white/85 px-2 py-1 text-[10px] font-medium text-slate-500 shadow-sm">
          Map data: OpenStreetMap, CARTO
        </div>
        <div className="pointer-events-none absolute right-2 top-2 z-20 rounded-md border border-violet/20 bg-white/90 px-2 py-1 text-[10px] font-semibold text-violet shadow-sm">
          Layer: {activeLayer}
        </div>

        {featured && (
          <div className="pointer-events-none absolute left-4 top-4 z-20 w-[min(300px,calc(100%-2rem))] rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold text-ink">{featured.name}</div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{featuredRecords.length}</span>
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{featured.executiveSummary}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="rounded-full bg-teal/10 px-2 py-1 text-xs font-semibold capitalize text-teal">{scoreJurisdiction(featuredRecords)}</span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold capitalize text-slate-600">{featured.type}</span>
            </div>
          </div>
        )}

        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${worldWidth} ${mapHeight}`} role="img" aria-label="World regulatory coverage map">
          <rect width={worldWidth} height={mapHeight} fill="transparent" />
          {mapped.map((jurisdiction) => {
            const regs = recordsFor(jurisdiction, regulations);
            const intensity = scoreJurisdiction(regs);
            const active = selectedId === jurisdiction.id;
            const hovered = hoveredId === jurisdiction.id;
            const [longitude, latitude] = jurisdiction.coordinates!;
            const position = project(longitude, latitude);
            const label = shortLabel(jurisdiction.name);
            const offset = labelOffsets[jurisdiction.id] || { x: 0, y: -28 };
            const width = Math.max(44, label.length * 9 + 30);
            const x = clamp(position.x + offset.x - width / 2, 8, worldWidth - width - 8);
            const y = clamp(position.y + offset.y - 17, 14, mapHeight - 42);

            return (
              <g
                key={jurisdiction.id}
                role="button"
                tabIndex={0}
                aria-label={`${jurisdiction.name}: ${regs.length} tracked records`}
                onClick={() => onSelect(jurisdiction)}
                onMouseEnter={() => setHoveredId(jurisdiction.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(jurisdiction.id)}
                onBlur={() => setHoveredId(null)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") onSelect(jurisdiction);
                }}
                className="cursor-pointer outline-none"
              >
                <line
                  x1={position.x}
                  y1={position.y}
                  x2={x + width / 2}
                  y2={y + 17}
                  stroke={active || hovered ? "#312e81" : "#64748b"}
                  strokeWidth={active || hovered ? 2 : 1.25}
                  strokeDasharray="4 4"
                  opacity="0.75"
                />
                <circle
                  cx={position.x}
                  cy={position.y}
                  r={active || hovered ? 5 : 3.5}
                  fill={active ? "#6d5dfc" : colors[intensity]}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height="34"
                  rx="8"
                  fill={active ? "#6d5dfc" : "#ffffff"}
                  stroke={active || hovered ? "#312e81" : colors[intensity]}
                  strokeWidth={active || hovered ? 2 : 1.5}
                  opacity="0.97"
                />
                <text
                  x={x + 12}
                  y={y + 21}
                  className="pointer-events-none select-none text-[12px] font-bold"
                  fill={active ? "#ffffff" : "#0f172a"}
                >
                  {label}
                </text>
                <text
                  x={x + width - 12}
                  y={y + 21}
                  textAnchor="end"
                  className="pointer-events-none select-none text-[11px] font-semibold"
                  fill={active ? "#e0f2fe" : "#64748b"}
                >
                  {regs.length}
                </text>
                <title>{`${jurisdiction.name}: ${regs.length} tracked records`}</title>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {mapped.map((jurisdiction) => {
          const regs = recordsFor(jurisdiction, regulations);
          const intensity = scoreJurisdiction(regs);
          return (
            <button
              key={jurisdiction.id}
              type="button"
              onClick={() => onSelect(jurisdiction)}
              onMouseEnter={() => setHoveredId(jurisdiction.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition hover:border-teal/40 hover:bg-teal/5",
                selectedId === jurisdiction.id ? "border-teal bg-teal/10" : "border-slate-200 bg-white"
              )}
            >
              <span className="flex min-w-0 items-center gap-2">
                <Layers2 className="h-4 w-4 shrink-0" style={{ color: selectedId === jurisdiction.id ? "#6d5dfc" : colors[intensity] }} />
                <span className="truncate font-semibold text-ink">{jurisdiction.name}</span>
              </span>
              <span className="ml-2 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{regs.length}</span>
            </button>
          );
        })}
      </div>
    </section>
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
  const sinLatitude = Math.sin((latitude * Math.PI) / 180);
  const x = ((longitude + 180) / 360) * worldWidth;
  const worldY = (0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI)) * worldWidth;

  return {
    x,
    y: worldY - tileYStart
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function shortLabel(name: string) {
  if (name === "United States") return "US";
  if (name === "United Kingdom") return "UK";
  if (name === "Netherlands") return "NL";
  if (name === "Switzerland") return "CH";
  if (name === "California") return "CA";
  if (name === "European Union") return "EU";
  if (name === "Singapore") return "SG";
  if (name === "Australia") return "AU";
  if (name === "Brazil") return "BR";
  if (name === "Canada") return "Canada";
  if (name === "China") return "China";
  if (name === "India") return "India";
  if (name === "Japan") return "Japan";
  if (name === "Mexico") return "Mexico";
  if (name === "Turkey") return "Turkey";
  return name;
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <i className="h-3 w-3 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
