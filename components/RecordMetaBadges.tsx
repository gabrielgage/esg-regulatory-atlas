import { clientRelevanceLabel, legalForceLabel, recordTypeLabel } from "@/data/taxonomy";
import { cn } from "@/lib/utils";
import { Regulation } from "@/types/regulation";
import { Badge } from "./Badge";

export function RecordMetaBadges({ regulation, compact = false }: { regulation: Regulation; compact?: boolean }) {
  const items = [
    regulation.recordType
      ? {
          key: "recordType",
          label: recordTypeLabel[regulation.recordType],
          className: "border-slate-200 bg-slate-50 text-slate-600"
        }
      : null,
    regulation.legalForce
      ? {
          key: "legalForce",
          label: legalForceLabel[regulation.legalForce],
          className: legalForceClass(regulation.legalForce)
        }
      : null,
    regulation.clientRelevanceCategory
      ? {
          key: "clientRelevance",
          label: clientRelevanceLabel[regulation.clientRelevanceCategory],
          className: relevanceClass(regulation.clientRelevanceCategory)
        }
      : null
  ].filter(Boolean);

  if (!items.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5", compact ? "mt-2" : "mt-3")}>
      {items.map((item) => (
        <Badge key={item!.key} className={item!.className}>
          {item!.label}
        </Badge>
      ))}
    </div>
  );
}

function legalForceClass(value: NonNullable<Regulation["legalForce"]>) {
  return cn(
    value === "mandatory" && "border-teal/20 bg-teal/10 text-teal",
    value === "voluntary" && "border-slate-200 bg-slate-50 text-slate-600",
    value === "comply-or-explain" && "border-blue-200 bg-blue-50 text-blue-700",
    value === "supervisory-expectation" && "border-violet/20 bg-violet/10 text-violet",
    value === "market-expectation" && "border-amber-200 bg-amber-50 text-amber-800",
    value === "roadmap" && "border-blue-200 bg-blue-50 text-blue-700",
    value === "monitor" && "border-slate-200 bg-slate-50 text-slate-600"
  );
}

function relevanceClass(value: NonNullable<Regulation["clientRelevanceCategory"]>) {
  return cn(
    value === "potentially-direct" && "border-teal/20 bg-teal/10 text-teal",
    value === "potentially-indirect" && "border-blue-200 bg-blue-50 text-blue-700",
    value === "investor-or-customer-driven" && "border-amber-200 bg-amber-50 text-amber-800",
    value === "voluntary-best-practice" && "border-slate-200 bg-slate-50 text-slate-600",
    value === "monitor-only" && "border-slate-200 bg-slate-50 text-slate-600"
  );
}
