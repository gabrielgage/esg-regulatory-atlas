"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from "react";
import { Globe2, Layers2, LocateFixed, Minus, Move, Plus } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { Jurisdiction, Regulation } from "@/types/regulation";
import { cn } from "@/lib/utils";

const width = 1000;
const height = 520;

const colors = {
  high: "#0f766e",
  medium: "#3fb8ad",
  emerging: "#a7f3d0",
  none: "var(--map-land-untracked)",
  active: "#6d5dfc",
  border: "var(--map-border)",
  euBorder: "#0f766e",
  background: "var(--map-ocean)",
  graticule: "var(--map-graticule)",
  outline: "var(--map-outline)"
};

const minZoom = 1;
const maxZoom = 3.2;

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
  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [hoveredIso, setHoveredIso] = useState<string | null>(null);
  const [hoveredJurisdictionId, setHoveredJurisdictionId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragState = useRef<{ pointerId: number; x: number; y: number; pan: { x: number; y: number }; moved: boolean } | null>(null);
  const ignoreNextClick = useRef(false);
  const { t } = useLanguage();

  useEffect(() => {
    let cancelled = false;
    fetch("/world-110m/index.json")
      .then((response) => response.json() as Promise<WorldMapIndex>)
      .then(async (index) => {
        const chunks = await Promise.all(
          index.chunks.map((chunk) => fetch(`/world-110m/${chunk}`).then((response) => response.json() as Promise<CountryFeature[]>))
        );
        if (!cancelled) {
          setFeatures(chunks.flat().filter((feature) => feature.properties.iso3 !== "ATA"));
          setMapStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFeatures([]);
          setMapStatus("failed");
        }
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
  const countsById = new Map(jurisdictions.map((jurisdiction) => [jurisdiction.id, directRecordsFor(jurisdiction, regulations).length]));
  const euCount = euJurisdiction ? directRecordsFor(euJurisdiction, regulations).length : 0;
  const selectedJurisdiction = jurisdictions.find((jurisdiction) => jurisdiction.id === selectedId);
  const hoveredCountry = hoveredIso ? countryInfo(hoveredIso, features, trackedByIso3, euJurisdiction, countsById, euCount) : null;
  const hoveredSubnational = hoveredJurisdictionId ? jurisdictions.find((jurisdiction) => jurisdiction.id === hoveredJurisdictionId) : null;
  const featured = hoveredSubnational || hoveredCountry?.jurisdiction || selectedJurisdiction;
  const featuredRecords = featured ? directRecordsFor(featured, regulations) : [];
  const featuredCount = featuredRecords.length;
  const featuredFirstYear = firstReportingYear(featuredRecords);

  function zoomBy(delta: number) {
    setZoom((current) => clamp(current + delta, minZoom, maxZoom));
  }

  function resetMapView() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function handleWheel(event: ReactWheelEvent<SVGSVGElement>) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.16 : 0.16;
    zoomBy(delta);
  }

  function handlePointerDown(event: ReactPointerEvent<SVGSVGElement>) {
    if (event.button !== 0) return;
    dragState.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      pan,
      moved: false
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<SVGSVGElement>) {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
    setPan({
      x: clamp(drag.pan.x + dx, -width * 0.42, width * 0.42),
      y: clamp(drag.pan.y + dy, -height * 0.38, height * 0.38)
    });
  }

  function handlePointerUp(event: ReactPointerEvent<SVGSVGElement>) {
    const drag = dragState.current;
    if (drag?.pointerId === event.pointerId) {
      ignoreNextClick.current = drag.moved;
      dragState.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      window.setTimeout(() => {
        ignoreNextClick.current = false;
      }, 0);
    }
  }

  function selectFromMap(jurisdiction: Jurisdiction) {
    if (!ignoreNextClick.current) onSelect(jurisdiction);
  }

  return (
    <section className="flex h-full min-h-[560px] flex-col rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">{t("map.title")}</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {t("map.body")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <Legend color={colors.high} label={t("map.high")} />
          <Legend color={colors.medium} label={t("map.medium")} />
          <Legend color={colors.emerging} label={t("map.emerging")} />
          <Legend color={colors.none} label={t("map.noData")} />
        </div>
      </div>
      <div className="mb-3 grid gap-2 text-xs leading-5 text-slate-600 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="font-semibold text-ink">{t("map.legend.directTitle")}</span> {t("map.legend.directBody")}
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="font-semibold text-ink">{t("map.legend.viewTitle")}</span> {t("map.legend.viewBody")}
        </div>
      </div>

      <div data-testid="regulatory-map" className="relative min-h-[420px] flex-1 overflow-hidden rounded-xl border border-slate-400 bg-[#e6eef6] shadow-inner">
        <div className="pointer-events-none absolute right-2 top-2 z-20 rounded-md border border-violet/20 bg-white/90 px-2 py-1 text-[10px] font-semibold text-violet shadow-sm">
          {t("map.view")}: {viewLabel}
        </div>

        <div className="absolute bottom-3 right-3 z-30 hidden flex-col overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-lg md:flex">
          <button
            type="button"
            aria-label={t("map.zoomIn")}
            title={t("map.zoomIn")}
            onClick={() => zoomBy(0.24)}
            className="inline-flex h-9 w-9 items-center justify-center text-slate-700 transition hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={t("map.zoomOut")}
            title={t("map.zoomOut")}
            onClick={() => zoomBy(-0.24)}
            className="inline-flex h-9 w-9 items-center justify-center border-t border-slate-200 text-slate-700 transition hover:bg-slate-50"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={t("map.reset")}
            title={t("map.reset")}
            onClick={resetMapView}
            className="inline-flex h-9 w-9 items-center justify-center border-t border-slate-200 text-slate-700 transition hover:bg-slate-50"
          >
            <LocateFixed className="h-4 w-4" />
          </button>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-3 z-20 hidden items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm md:flex">
          <Move className="h-3.5 w-3.5 text-teal" />
          {t("map.panHint")} · {Math.round(zoom * 100)}%
        </div>

        {featured && (
          <div className="pointer-events-none absolute left-4 top-4 z-20 hidden w-[min(320px,calc(100%-2rem))] rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur lg:block">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold text-ink">{featured.name}</div>
                <div className="mt-0.5 text-xs font-semibold text-slate-500">{featured.code}</div>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{featuredCount} {t("map.records")}</span>
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{featured.executiveSummary}</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{t("map.directSeedRecords")}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="rounded-full bg-teal/10 px-2 py-1 text-xs font-semibold text-teal">
                {t("map.firstReporting")} {featuredFirstYear || t("map.varies")}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold capitalize text-slate-600">{featured.type}</span>
            </div>
          </div>
        )}

        {mapStatus === "loading" && <MapSkeleton />}
        {mapStatus === "failed" && <MapFallback />}

        <div className="absolute inset-x-0 bottom-0 top-10 overflow-y-auto p-3 md:hidden">
          <div className="space-y-2">
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
                      "flex w-full items-start justify-between gap-3 rounded-xl border px-3 py-3 text-left transition hover:border-teal/40 hover:bg-teal/5",
                      selectedId === jurisdiction.id ? "border-teal bg-teal/10" : "border-slate-200 bg-white"
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink">{jurisdiction.name}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">{jurisdiction.executiveSummary}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                      {jurisdiction.code} - {count}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>

        <noscript>
          <div className="absolute inset-0 overflow-y-auto bg-white p-4 text-sm text-slate-600">
            <p className="font-semibold text-ink">Tracked jurisdictions</p>
            <ul className="mt-3 grid gap-2">
              {jurisdictions
                .filter((jurisdiction) => jurisdiction.type !== "international")
                .map((jurisdiction) => (
                  <li key={jurisdiction.id}>
                    {jurisdiction.name} ({jurisdiction.code})
                  </li>
                ))}
            </ul>
          </div>
        </noscript>

        <svg
          className="absolute inset-0 hidden h-full w-full cursor-grab touch-none select-none md:block"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="World regulatory coverage choropleth map"
          preserveAspectRatio="xMidYMid meet"
          data-testid="country-outline-map"
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ background: colors.background }}
        >
          <rect width={width} height={height} fill={colors.background} />
          <g opacity="0.32">
            {[-120, -60, 0, 60, 120].map((longitude) => {
              const x = project(longitude, 0).x;
              return <line key={`lon-${longitude}`} x1={x} y1={18} x2={x} y2={height - 18} stroke={colors.graticule} strokeWidth="0.8" strokeDasharray="4 8" />;
            })}
            {[-45, 0, 45].map((latitude) => {
              const y = project(0, latitude).y;
              return <line key={`lat-${latitude}`} x1={18} y1={y} x2={width - 18} y2={y} stroke={colors.graticule} strokeWidth="0.8" strokeDasharray="4 8" />;
            })}
          </g>
          <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
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
                  data-testid="country-path"
                  data-iso3={feature.properties.iso3}
                  data-coverage={info.count > 0 ? "tracked" : "untracked"}
                  fill={fill}
                  stroke={active || hovered ? "#312e81" : euOverlay ? colors.euBorder : colors.border}
                  strokeWidth={active || hovered ? 2.8 : euOverlay ? 1.85 : 1.35}
                  vectorEffect="non-scaling-stroke"
                  strokeLinejoin="round"
                  opacity={selectable || euOverlay ? 0.99 : 0.9}
                  aria-label={selectable ? `${info.jurisdiction?.name}: ${info.count} records` : feature.properties.name}
                  className={cn("outline-none transition", selectable && "cursor-pointer hover:brightness-95")}
                  onClick={() => {
                    if (ignoreNextClick.current) return;
                    if (info.jurisdiction) selectFromMap(info.jurisdiction);
                  }}
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

          <g pointerEvents="none">
            {features.map((feature) => (
              <path
                key={`outline-${feature.properties.iso3}`}
                d={geometryToPath(feature.geometry)}
                fill="none"
                stroke={colors.outline}
                strokeOpacity="0.72"
                strokeWidth="0.95"
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
              />
            ))}
          </g>

          {trackedCountries.map((jurisdiction) => {
            const selected = selectedId === jurisdiction.id;
            const hovered = hoveredJurisdictionId === jurisdiction.id || hoveredCountry?.jurisdiction?.id === jurisdiction.id;
            return selected || hovered ? (
              <MapLabel
                key={jurisdiction.id}
                jurisdiction={jurisdiction}
                selected={selected}
                count={countsById.get(jurisdiction.id) || 0}
                onSelect={selectFromMap}
                onHover={setHoveredJurisdictionId}
              />
            ) : (
              <MapPin
                key={jurisdiction.id}
                jurisdiction={jurisdiction}
                count={countsById.get(jurisdiction.id) || 0}
                onSelect={selectFromMap}
                onHover={setHoveredJurisdictionId}
              />
            );
          })}

          {euJurisdiction && (
            <MapLabel
              jurisdiction={euJurisdiction}
              selected={selectedId === euJurisdiction.id}
              count={euCount}
              onSelect={selectFromMap}
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
              onSelect={selectFromMap}
              onHover={setHoveredJurisdictionId}
              offset={{ x: -36, y: 26 }}
            />
          ))}
          </g>
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
  const count = direct ? directCount : euFallback ? euCount : 0;
  const featureName = features.find((feature) => feature.properties.iso3 === iso3)?.properties.name || iso3;
  return { jurisdiction, count, featureName };
}

function directRecordsFor(jurisdiction: Jurisdiction, regulations: Regulation[]) {
  return regulations.filter((regulation) => regulation.jurisdictionIds.includes(jurisdiction.id));
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function MapPin({
  jurisdiction,
  count,
  onSelect,
  onHover
}: {
  jurisdiction: Jurisdiction;
  count: number;
  onSelect: (jurisdiction: Jurisdiction) => void;
  onHover: (id: string | null) => void;
}) {
  if (!jurisdiction.coordinates) return null;
  const base = project(jurisdiction.coordinates[0], jurisdiction.coordinates[1]);

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
      <circle cx={base.x} cy={base.y} r="12" fill="transparent" pointerEvents="all" />
      <circle cx={base.x} cy={base.y} r="3.8" fill="#ffffff" fillOpacity="0.9" stroke={colorForCount(count)} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <circle cx={base.x} cy={base.y} r="1.8" fill={colorForCount(count)} />
    </g>
  );
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
      <i className="h-3 w-3 rounded-sm border border-slate-400/70" style={{ background: color }} />
      {label}
    </span>
  );
}

function MapSkeleton() {
  return (
    <svg className="absolute inset-0 hidden h-full w-full md:block" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <rect width={width} height={height} fill={colors.background} />
      <path d="M80 180 C145 110 260 125 302 190 C265 238 160 250 90 220 Z" fill="#e2e8f0" />
      <path d="M270 310 C320 270 410 285 430 350 C390 420 290 395 250 345 Z" fill="#e2e8f0" />
      <path d="M455 145 C525 105 630 125 655 205 C610 245 500 250 440 210 Z" fill="#e2e8f0" />
      <path d="M520 250 C575 225 640 260 632 335 C590 385 515 350 500 300 Z" fill="#e2e8f0" />
      <path d="M660 165 C760 95 910 135 940 235 C850 295 725 275 650 225 Z" fill="#e2e8f0" />
      <path d="M760 345 C830 315 925 345 940 430 C865 470 780 430 740 380 Z" fill="#e2e8f0" />
    </svg>
  );
}

function MapFallback() {
  return (
    <div className="absolute inset-0 z-10 hidden items-center justify-center bg-[#e6eef6] p-6 md:flex">
      <div className="max-w-md rounded-2xl border border-amber-200 bg-white/95 p-5 text-center shadow-lg">
        <p className="font-semibold text-ink">Map geometry could not load</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          The Atlas is still usable through the jurisdiction list below. The local Natural Earth map file should be checked if this appears in production.
        </p>
      </div>
    </div>
  );
}
