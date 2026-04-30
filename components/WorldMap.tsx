"use client";

import { useMemo, useState } from "react";
import { Globe2, Layers2 } from "lucide-react";
import { Jurisdiction, Regulation } from "@/types/regulation";
import { cn, scoreJurisdiction } from "@/lib/utils";

const colors: Record<string, string> = {
  high: "#0f766e",
  medium: "#57c3b7",
  emerging: "#b8eee5",
  none: "#94a3b8"
};

const continents = [
  {
    name: "North America",
    d: "M91 161 C118 118 174 106 219 129 C246 143 257 171 240 195 C222 220 185 209 165 229 C140 252 112 244 98 219 C87 199 78 181 91 161 Z"
  },
  {
    name: "South America",
    d: "M210 279 C243 292 258 330 251 371 C246 405 226 436 205 474 C180 438 177 392 188 355 C197 326 189 300 210 279 Z"
  },
  {
    name: "Europe",
    d: "M392 155 C425 127 477 130 500 158 C518 180 493 203 456 200 C421 197 380 187 392 155 Z"
  },
  {
    name: "Africa",
    d: "M430 227 C469 203 523 220 543 264 C566 315 537 376 495 430 C458 391 421 343 414 292 C410 263 411 241 430 227 Z"
  },
  {
    name: "Asia",
    d: "M520 156 C576 114 666 120 739 156 C797 184 807 232 765 265 C727 295 671 269 636 290 C598 313 539 293 515 247 C495 210 493 176 520 156 Z"
  },
  {
    name: "Australia",
    d: "M704 376 C746 357 800 371 816 406 C790 436 741 438 702 418 C684 407 686 386 704 376 Z"
  }
];

type LatLngBounds = [[number, number], [number, number]];

const jurisdictionBounds: Record<string, { bounds: LatLngBounds; shortLabel?: string; minWidth?: number; minHeight?: number }> = {
  eu: { bounds: [[35, -10], [60, 32]], shortLabel: "EU", minWidth: 56, minHeight: 34 },
  nl: { bounds: [[50.7, 3.3], [53.6, 7.2]], shortLabel: "NL", minWidth: 28, minHeight: 20 },
  uk: { bounds: [[49.5, -8], [59, 2]], shortLabel: "UK", minWidth: 34, minHeight: 30 },
  us: { bounds: [[25, -125], [49.5, -66]], shortLabel: "US" },
  "ca-us": { bounds: [[32, -124.5], [42.2, -114]], shortLabel: "CA", minWidth: 28, minHeight: 22 },
  sg: { bounds: [[1.0, 103.5], [1.6, 104.1]], shortLabel: "SG", minWidth: 26, minHeight: 18 },
  jp: { bounds: [[30, 129], [46, 146]], shortLabel: "JP", minWidth: 34, minHeight: 38 },
  au: { bounds: [[-44, 112], [-10, 154]], shortLabel: "AU" },
  br: { bounds: [[-34, -74], [5, -34]], shortLabel: "BR" },
  in: { bounds: [[8, 68], [35, 97]], shortLabel: "IN" },
  cn: { bounds: [[18, 73], [54, 135]], shortLabel: "CN" },
  ca: { bounds: [[42, -141], [70, -52]], shortLabel: "CA" },
  ch: { bounds: [[45.8, 5.9], [47.9, 10.5]], shortLabel: "CH", minWidth: 28, minHeight: 18 },
  tr: { bounds: [[36, 26], [42.3, 45]], shortLabel: "TR", minWidth: 36, minHeight: 20 },
  mx: { bounds: [[14, -118], [32, -86]], shortLabel: "MX" }
};

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
    () => jurisdictions.filter((jurisdiction) => jurisdiction.type !== "international" && jurisdictionBounds[jurisdiction.id]),
    [jurisdictions]
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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
            Tracked jurisdictions are shown as shaded map regions, using simplified country bounds for a stable no-token MVP.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <Legend color={colors.high} label="High" />
          <Legend color={colors.medium} label="Medium" />
          <Legend color={colors.emerging} label="Emerging" />
          <Legend color={colors.none} label="No filtered data" />
        </div>
      </div>

      <div className="relative aspect-[900/520] min-h-[320px] overflow-hidden rounded-xl border border-slate-100 bg-[#e9f2f4] p-2">
        {featured && (
          <div className="pointer-events-none absolute left-4 top-4 z-10 w-[min(280px,calc(100%-2rem))] rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
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

        <svg className="block h-full w-full" viewBox="0 0 900 520" role="img" aria-label="World regulatory intensity map">
          <rect width="900" height="520" rx="18" fill="#e9f2f4" />
          <Grid />
          <path d="M40 112 C160 40 294 56 392 108 C514 172 639 129 830 82" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 9" opacity="0.9" />
          <path d="M70 424 C244 480 409 452 553 398 C686 349 792 356 850 398" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 9" opacity="0.9" />

          {continents.map((continent) => (
            <path key={continent.name} d={continent.d} fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" opacity="0.98" />
          ))}

          {mapped.map((jurisdiction) => {
            const config = jurisdictionBounds[jurisdiction.id];
            const region = regionFromBounds(config.bounds, config.minWidth, config.minHeight);
            const regs = recordsFor(jurisdiction, regulations);
            const intensity = scoreJurisdiction(regs);
            const active = selectedId === jurisdiction.id;
            const hovered = hoveredId === jurisdiction.id;

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
                <path
                  d={region.path}
                  fill={active ? "#6d5dfc" : colors[intensity]}
                  fillOpacity={intensity === "none" ? 0.48 : 0.78}
                  stroke={active || hovered ? "#312e81" : "#ffffff"}
                  strokeWidth={active || hovered ? 3 : 2}
                  className="transition"
                />
                <text
                  x={region.cx}
                  y={region.cy + 4}
                  textAnchor="middle"
                  className="pointer-events-none select-none text-[12px] font-bold"
                  fill={active ? "#ffffff" : intensity === "emerging" ? "#0f172a" : "#ffffff"}
                >
                  {config.shortLabel || shortLabel(jurisdiction.name)}
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

function Grid() {
  const longitudes = [-120, -60, 0, 60, 120];
  const latitudes = [-45, 0, 45];
  return (
    <g opacity="0.45">
      {longitudes.map((longitude) => {
        const point = project(longitude, 0);
        return <path key={longitude} d={`M ${point.x} 35 L ${point.x} 485`} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 8" />;
      })}
      {latitudes.map((latitude) => {
        const point = project(0, latitude);
        return <path key={latitude} d={`M 35 ${point.y} L 865 ${point.y}`} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 8" />;
      })}
    </g>
  );
}

function regionFromBounds(bounds: LatLngBounds, minWidth = 0, minHeight = 0) {
  const [[south, west], [north, east]] = bounds;
  const nw = project(west, north);
  const se = project(east, south);
  let x = Math.min(nw.x, se.x);
  let y = Math.min(nw.y, se.y);
  let width = Math.abs(se.x - nw.x);
  let height = Math.abs(se.y - nw.y);

  if (width < minWidth) {
    x -= (minWidth - width) / 2;
    width = minWidth;
  }
  if (height < minHeight) {
    y -= (minHeight - height) / 2;
    height = minHeight;
  }

  const radius = Math.min(18, Math.max(8, Math.min(width, height) / 3));
  const path = [
    `M ${x + radius} ${y}`,
    `L ${x + width - radius} ${y + Math.max(0, height * 0.04)}`,
    `Q ${x + width} ${y} ${x + width} ${y + radius}`,
    `L ${x + width - Math.max(0, width * 0.04)} ${y + height - radius}`,
    `Q ${x + width} ${y + height} ${x + width - radius} ${y + height}`,
    `L ${x + radius} ${y + height - Math.max(0, height * 0.05)}`,
    `Q ${x} ${y + height} ${x} ${y + height - radius}`,
    `L ${x + Math.max(0, width * 0.03)} ${y + radius}`,
    `Q ${x} ${y} ${x + radius} ${y}`,
    "Z"
  ].join(" ");

  return {
    path,
    cx: x + width / 2,
    cy: y + height / 2
  };
}

function project(longitude: number, latitude: number) {
  return {
    x: ((longitude + 180) / 360) * 900,
    y: ((90 - latitude) / 180) * 520
  };
}

function shortLabel(name: string) {
  if (name === "United States") return "US";
  if (name === "United Kingdom") return "UK";
  if (name === "Netherlands") return "NL";
  if (name === "Switzerland") return "CH";
  if (name === "California") return "CA";
  if (name === "European Union") return "EU";
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
