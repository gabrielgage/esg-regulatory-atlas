"use client";

import { useEffect, useMemo, useState } from "react";
import { Globe2, Layers2 } from "lucide-react";
import { Jurisdiction, Regulation } from "@/types/regulation";
import { cn } from "@/lib/utils";

const width = 1000;
const height = 520;

const colors = {
  high: "#0f766e",
  medium: "#57c3b7",
  emerging: "#b8f2e6",
  none: "#e2e8f0",
  active: "#6d5dfc",
  border: "#ffffff"
};

const euMembers = new Set([
  "AUT",
  "BEL",
  "BGR",
  "HRV",
  "CYP",
  "CZE",
  "DNK",
  "EST",
  "FIN",
  "FRA",
  "DEU",
  "GRC",
  "HUN",
  "IRL",
  "ITA",
  "LVA",
  "LTU",
  "LUX",
  "MLT",
  "NLD",
  "POL",
  "PRT",
  "ROU",
  "SVK",
  "SVN",
  "ESP",
  "SWE"
]);

type Position = [number, number];
type Ring = Position[];
type Polygon = Ring[];
type MultiPolygon = Polygon[];

type CountryFeature = {
  type: "Feature";
  properties: {
    iso3: string;
    name: string;
    continent?: string;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: Polygon | MultiPolygon;
  };
};

type WorldMapIndex = {
  source: string;
  license: string;
  chunks: string[];
};

export function WorldChoropleth({
  jurisdictions,
  regulations,
  selectedId,
  viewLabel = "Global overview",
  onSelect
}: {
  jurisdictions: Jurisdiction[];
  regulations: Regulation[];
  selectedId?: string;
  viewLabel?: string;
  onSelect: (j: Jurisdiction) => void;
}) {
  const [features, setFeatures] = useState<CountryFeature[]>([]);
  const [hoveredIso, setHoveredIso] = useState<string | null>(null);
  const [hoveredJurisdictionId, setHoveredJurisdictionId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/world-110m/index.json")
      .then((response) => response.json() as Promise<WorldMapIndex>)
      .then(async (index) => {
        const chunks = await Promise.all(
          index.chunks.map((chunk) => fetch(`/world-110m/${chunk}`).then((response) => response.json() as Promise<CountryFeature[]>))
        );
        if (!cancelled) setFeatures(chunks.flat().filter((feature) => feature.properties.iso3 !== "ATA"));
      })
      .catch(() => {
        if (!cancelled) setFeatures([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const trackedCountries = useMemo(
    () =>
      jurisdictions.filter(
        (jurisdiction) => jurisdiction.coordinates && jurisdiction.type !== "international" && jurisdiction.type !== "supranational" && jurisdiction.type !== "subnational"
      ),
    [jurisdictions]
  );
  const subnational = useMemo(
    () => jurisdictions.filter((jurisdiction) => jurisdiction.coordinates && jurisdiction.type === "subnational"),
    [jurisdictions]
  );
  const euJurisdiction = jurisdictions.find((jurisdiction) => jurisdiction.code === "EUU");
  const trackedByIso3 = new Map(trackedCountries.map((jurisdiction) => [jurisdiction.iso3 || jurisdiction.code, jurisdiction]));
  const countsById = new Map(jurisdictions.map((jurisdiction) => [jurisdiction.id, recordsFor(jurisdiction, regulations).length]));
  const euCount = euJurisdiction ? recordsFor(euJurisdiction, regulations).length : 0;
  const selectedJurisdiction = jurisdictions.find((jurisdiction) => jurisdiction.id === selectedId);
  const hoveredCountry = hoveredIso ? countryInfo(hoveredIso, features, trackedByIso3, euJurisdiction, countsById, euCount) : null;
  const hoveredSubnational = hoveredJurisdictionId ? jurisdictions.find((jurisdiction) => jurisdiction.id === hoveredJurisdictionId) : null;
  const featured = hoveredSubnational || hoveredCountry?.jurisdiction || selectedJurisdiction;
  const featuredCount = featured ? recordsFor(featured, regulations).length : 0;
  const featuredFirstYear = featured ? firstReportingYear(recordsFor(featured, regulations)) : null;

  return (
    <section className="flex h-full min-h-[520px] flex-col rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Interactive regulatory map</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Country fill reflects the number of regulations in the active view.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <Legend color={colors.high} label="High 7+" />
          <Legend color={colors.medium} label="Medium 3-6" />
          <Legend color={colors.emerging} label="Emerging 1-2" />
          <Legend color={colors.none} label="No data" />
        </div>
      </div>

      <div data-testid="regulatory-map" className="relative min-h-[420px] flex-1 overflow-hidden rounded-xl border border-slate-200 bg-[#f8fafc]">
        <div className="pointer-events-none absolute right-2 top-2 z-20 rounded-md border border-violet/20 bg-white/90 px-2 py-1 text-[10px] font-semibold text-violet shadow-sm">
          View: {viewLabel}
        </div>

        {featured && (
          <div className="pointer-events-none absolute left-4 top-4 z-20 w-[min(320px,calc(100%-2rem))] rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-ink">{featured.name}</div>
                <div className="mt-0.5 text-xs font-semibold text-slate-500">{featured.code}</div>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{featuredCount} records</span>
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{featured.executiveSummary}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="rounded-full bg-teal/10 px-2 py-1 text-xs font-semibold text-teal">
                First reporting {featuredFirstYear || "varies"}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold capitalize text-slate-600">{featured.type}</span>
            </div>
          </div>
        )}

        {!features.length && (
          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-500">
            Loading local world map...
          </div>
        )}

        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="World regulatory coverage choropleth map">
          <rect width={width} height={height} fill="#f8fafc" />
          <g>
            {features.map((feature) => {
              const info = countryInfo(feature.properties.iso3, features, trackedByIso3, euJurisdiction, countsById, euCount);
              const selectable = Boolean(info.jurisdiction);
              const active =
                selectedJurisdiction?.code === info.jurisdiction?.code ||
                Boolean(selectedJurisdiction?.code === "EUU" && euMembers.has(feature.properties.iso3));
              const hovered = hoveredIso === feature.properties.iso3;
              const fill = active ? colors.active : colorForCount(info.count);
              const euOverlay = euCount > 0 && euMembers.has(feature.properties.iso3);

              return (
                <path
                  key={feature.properties.iso3}
                  d={geometryToPath(feature.geometry)}
                  fill={fill}
                  stroke={active || hovered ? "#312e81" : euOverlay ? "#0f766e" : colors.border}
                  strokeWidth={active || hovered ? 1.8 : euOverlay ? 1.1 : 0.55}
                  opacity={selectable || euOverlay ? 0.96 : 0.7}
                  role={selectable ? "button" : undefined}
                  tabIndex={selectable ? 0 : undefined}
                  aria-label={selectable ? `${info.jurisdiction?.name}: ${info.count} records` : feature.properties.name}
                  className={cn("outline-none transition", selectable && "cursor-pointer hover:brightness-95")}
                  onClick={() => info.jurisdiction && onSelect(info.jurisdiction)}
                  onMouseEnter={() => setHoveredIso(feature.properties.iso3)}
                  onMouseLeave={() => setHoveredIso(null)}
                  onFocus={() => setHoveredIso(feature.properties.iso3)}
                  onBlur={() => setHoveredIso(null)}
                  onKeyDown={(event) => {
                    if (info.jurisdiction && (event.key === "Enter" || event.key === " ")) onSelect(info.jurisdiction);
                  }}
                >
                  <title>{`${info.jurisdiction?.name || feature.properties.name}: ${info.count} records`}</title>
                </path>
              );
            })}
          </g>

          {trackedCountries.map((jurisdiction) => (
            <MapLabel
              key={jurisdiction.id}
              jurisdiction={jurisdiction}
              selected={selectedId === jurisdiction.id}
              count={countsById.get(jurisdiction.id) || 0}
              onSelect={onSelect}
              onHover={setHoveredJurisdictionId}
            />
          ))}

          {euJurisdiction && (
            <MapLabel
              jurisdiction={euJurisdiction}
              selected={selectedId === euJurisdiction.id}
              count={euCount}
              onSelect={onSelect}
              onHover={setHoveredJurisdictionId}
              offset={{ x: -70, y: -30 }}
            />
          )}

          {subnational.map((jurisdiction) => (
            <MapLabel
              key={jurisdiction.id}
              jurisdiction={jurisdiction}
              selected={selectedId === jurisdiction.id}
              count={countsById.get(jurisdiction.id) || 0}
              onSelect={onSelect}
              onHover={setHoveredJurisdictionId}
              offset={{ x: -36, y: 26 }}
            />
          ))}
        </svg>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {jurisdictions
          .filter((jurisdiction) => jurisdiction.type !== "international")
          .map((jurisdiction) => {
            const count = countsById.get(jurisdiction.id) || 0;
            return (
              <button
                key={jurisdiction.id}
                type="button"
                onClick={() => onSelect(jurisdiction)}
                onMouseEnter={() => setHoveredJurisdictionId(jurisdiction.id)}
                onMouseLeave={() => setHoveredJurisdictionId(null)}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition hover:border-teal/40 hover:bg-teal/5",
                  selectedId === jurisdiction.id ? "border-teal bg-teal/10" : "border-slate-200 bg-white"
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Layers2 className="h-4 w-4 shrink-0" style={{ color: selectedId === jurisdiction.id ? colors.active : colorForCount(count) }} />
                  <span className="truncate font-semibold text-ink">{jurisdiction.name}</span>
                </span>
                <span className="ml-2 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{jurisdiction.code}</span>
              </button>
            );
          })}
      </div>
    </section>
  );
}

function countryInfo(
  iso3: string,
  features: CountryFeature[],
  trackedByIso3: Map<string, Jurisdiction>,
  euJurisdiction: Jurisdiction | undefined,
  countsById: Map<string, number>,
  euCount: number
) {
  const direct = trackedByIso3.get(iso3);
  const euFallback = euJurisdiction && euMembers.has(iso3) ? euJurisdiction : undefined;
  const jurisdiction = direct || euFallback;
  const directCount = direct ? countsById.get(direct.id) || 0 : 0;
  const count = direct ? Math.max(directCount, euFallback ? euCount : 0) : euFallback ? euCount : 0;
  const featureName = features.find((feature) => feature.properties.iso3 === iso3)?.properties.name || iso3;
  return { jurisdiction, count, featureName };
}

function recordsFor(jurisdiction: Jurisdiction, regulations: Regulation[]) {
  return regulations.filter(
    (regulation) =>
      regulation.jurisdictionIds.includes(jurisdiction.id) ||
      Boolean(jurisdiction.parent && regulation.jurisdictionIds.includes(jurisdiction.parent))
  );
}

function firstReportingYear(regulations: Regulation[]) {
  const years = regulations.map((regulation) => regulation.firstReportingYear).filter(Boolean) as number[];
  return years.length ? Math.min(...years) : null;
}

function colorForCount(count: number) {
  if (count >= 7) return colors.high;
  if (count >= 3) return colors.medium;
  if (count >= 1) return colors.emerging;
  return colors.none;
}

function geometryToPath(geometry: CountryFeature["geometry"]) {
  if (geometry.type === "Polygon") return polygonToPath(geometry.coordinates as Polygon);
  return (geometry.coordinates as MultiPolygon).map((polygon) => polygonToPath(polygon)).join(" ");
}

function polygonToPath(polygon: Polygon) {
  return polygon
    .map((ring) =>
      ring
        .map(([longitude, latitude], index) => {
          const point = project(longitude, latitude);
          return `${index === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`;
        })
        .join(" ") + " Z"
    )
    .join(" ");
}

function project(longitude: number, latitude: number) {
  return {
    x: ((longitude + 180) / 360) * width,
    y: ((90 - latitude) / 180) * height
  };
}

function MapLabel({
  jurisdiction,
  count,
  selected,
  offset = { x: 0, y: 0 },
  onSelect,
  onHover
}: {
  jurisdiction: Jurisdiction;
  count: number;
  selected: boolean;
  offset?: { x: number; y: number };
  onSelect: (jurisdiction: Jurisdiction) => void;
  onHover: (id: string | null) => void;
}) {
  if (!jurisdiction.coordinates) return null;
  const base = project(jurisdiction.coordinates[0], jurisdiction.coordinates[1]);
  const x = Math.min(Math.max(base.x + offset.x, 18), width - 86);
  const y = Math.min(Math.max(base.y + offset.y, 18), height - 28);
  const label = jurisdiction.code;
  const labelWidth = Math.max(50, label.length * 8 + 20);

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${jurisdiction.name}: ${count} records`}
      onClick={() => onSelect(jurisdiction)}
      onMouseEnter={() => onHover(jurisdiction.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(jurisdiction.id)}
      onBlur={() => onHover(null)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onSelect(jurisdiction);
      }}
      className="cursor-pointer outline-none"
    >
      <circle cx={base.x} cy={base.y} r={selected ? 5 : 3.5} fill={selected ? colors.active : colorForCount(count)} stroke="#fff" strokeWidth="2" />
      <line x1={base.x} y1={base.y} x2={x + labelWidth / 2} y2={y + 14} stroke={selected ? "#312e81" : "#64748b"} strokeWidth={selected ? 1.8 : 1} strokeDasharray="3 4" />
      <rect x={x} y={y} width={labelWidth} height="28" rx="8" fill={selected ? colors.active : "#ffffff"} stroke={selected ? "#312e81" : colorForCount(count)} strokeWidth={selected ? 2 : 1.4} />
      <text x={x + 10} y={y + 18} className="pointer-events-none select-none text-[11px] font-bold" fill={selected ? "#ffffff" : "#0f172a"}>
        {label}
      </text>
      <text x={x + labelWidth - 9} y={y + 18} textAnchor="end" className="pointer-events-none select-none text-[10px] font-semibold" fill={selected ? "#e0f2fe" : "#64748b"}>
        {count}
      </text>
    </g>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <i className="h-3 w-3 rounded-sm border border-white/70" style={{ background: color }} />
      {label}
    </span>
  );
}
