"use client";

import { Globe2, MapPin } from "lucide-react";
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
  const mapped = jurisdictions.filter(
    (jurisdiction) => jurisdiction.coordinates && jurisdiction.type !== "international"
  );

  return (
    <section className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Interactive regulatory map</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">Tracked jurisdictions are plotted on a dependency-free SVG map and shaded by the current filter view.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <Legend color={colors.high} label="High" />
          <Legend color={colors.medium} label="Medium" />
          <Legend color={colors.emerging} label="Emerging" />
          <Legend color={colors.none} label="No filtered data" />
        </div>
      </div>

      <div className="aspect-[900/520] min-h-[280px] rounded-xl border border-slate-100 bg-[#e9f2f4] p-2">
        <svg className="block h-full w-full" viewBox="0 0 900 520" role="img" aria-label="World regulatory intensity map">
          <rect width="900" height="520" rx="18" fill="#e9f2f4" />
          <path d="M40 112 C160 40 294 56 392 108 C514 172 639 129 830 82" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 9" opacity="0.9" />
          <path d="M70 424 C244 480 409 452 553 398 C686 349 792 356 850 398" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 9" opacity="0.9" />

          {continents.map((continent) => (
            <path key={continent.name} d={continent.d} fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" opacity="0.98" />
          ))}

          {mapped.map((jurisdiction) => {
            const regs = recordsFor(jurisdiction, regulations);
            const intensity = scoreJurisdiction(regs);
            const [longitude, latitude] = jurisdiction.coordinates!;
            const position = project(longitude, latitude);
            const active = selectedId === jurisdiction.id;

            return (
              <g
                key={jurisdiction.id}
                role="button"
                tabIndex={0}
                aria-label={`${jurisdiction.name}: ${regs.length} tracked records`}
                onClick={() => onSelect(jurisdiction)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") onSelect(jurisdiction);
                }}
                className="cursor-pointer outline-none"
              >
                <circle
                  cx={position.x}
                  cy={position.y}
                  r={active ? 12 : 9}
                  fill={active ? "#6d5dfc" : colors[intensity]}
                  stroke="#ffffff"
                  strokeWidth="4"
                  className="transition"
                />
                <circle cx={position.x} cy={position.y} r={active ? 18 : 14} fill="transparent" />
                <text
                  x={position.x + 13}
                  y={position.y + 4}
                  className="pointer-events-none select-none text-[13px] font-semibold"
                  fill={active ? "#312e81" : "#334155"}
                >
                  {shortLabel(jurisdiction.name)}
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
              className={cn(
                "flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition hover:border-teal/40 hover:bg-teal/5",
                selectedId === jurisdiction.id ? "border-teal bg-teal/10" : "border-slate-200 bg-white"
              )}
            >
              <span className="flex min-w-0 items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" style={{ color: selectedId === jurisdiction.id ? "#6d5dfc" : colors[intensity] }} />
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
