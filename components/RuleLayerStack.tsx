import { ArrowUpRight, Building2, Globe2, Network, ShieldAlert } from "lucide-react";
import { Badge } from "./Badge";
import { Jurisdiction, Regulation } from "@/types/regulation";
import { formatDate, statusClass, statusLabel, uniq } from "@/lib/utils";
import { internationalRecords, localRecords, recordsForJurisdiction, sectoralRecords } from "@/lib/layers";

export function RuleLayerStack({
  jurisdiction,
  regulations,
  onSelect
}: {
  jurisdiction: Jurisdiction | null;
  regulations: Regulation[];
  onSelect: (regulation: Regulation) => void;
}) {
  if (!jurisdiction) {
    return (
      <section className="rounded-2xl border bg-white p-6 text-slate-500 shadow-sm">
        Select a jurisdiction to view international, local and sectoral rule layers.
      </section>
    );
  }

  const applicable = recordsForJurisdiction(jurisdiction, regulations);
  const layers = [
    {
      title: "International baseline",
      description: "Global disclosure frameworks and market standards that shape investor and regulator expectations.",
      icon: Globe2,
      records: internationalRecords(regulations)
    },
    {
      title: "Local rules",
      description: "National, local or supranational rules that directly apply in the selected jurisdiction.",
      icon: Building2,
      records: localRecords(jurisdiction, applicable)
    },
    {
      title: "Sectoral and regional impact",
      description: "Cross-border, sectoral and value-chain rules that can bite locally through customers, suppliers or financing.",
      icon: Network,
      records: sectoralRecords(jurisdiction, applicable)
    }
  ];

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Three-layer rule radar</h2>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            {jurisdiction.name} viewed through international baseline, local requirements and sectoral or regional impact layers.
          </p>
        </div>
        <Badge className="border-teal/20 bg-teal/10 text-teal">{applicable.length} applicable records</Badge>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {layers.map((layer) => (
          <LayerColumn key={layer.title} layer={layer} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function LayerColumn({
  layer,
  onSelect
}: {
  layer: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    records: Regulation[];
  };
  onSelect: (regulation: Regulation) => void;
}) {
  const Icon = layer.icon;
  const sectors = uniq(layer.records.flatMap((record) => record.sectors)).slice(0, 4);

  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-teal" />
            <h3 className="font-semibold text-ink">{layer.title}</h3>
          </div>
          <p className="mt-2 text-sm leading-5 text-slate-500">{layer.description}</p>
        </div>
        <Badge className="border-slate-200 bg-slate-50 text-slate-600">{layer.records.length}</Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {sectors.map((sector) => (
          <Badge key={sector} className="border-slate-200 bg-slate-50 text-slate-600">
            {sector}
          </Badge>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {layer.records.slice(0, 4).map((regulation) => (
          <button
            key={regulation.id}
            type="button"
            onClick={() => onSelect(regulation)}
            className="w-full rounded-lg border border-slate-200 p-3 text-left hover:border-teal/40 hover:bg-teal/5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-ink">{regulation.shortName}</span>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>
            <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">{regulation.applicability}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <Badge className={statusClass[regulation.status]}>{statusLabel[regulation.status]}</Badge>
              <Badge className="border-slate-200 bg-white text-slate-600">
                First reporting {regulation.firstReportingYear || formatDate(regulation.effectiveDate)}
              </Badge>
            </div>
          </button>
        ))}
        {!layer.records.length && <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">No records in this layer for the current filters.</p>}
      </div>
    </div>
  );
}
