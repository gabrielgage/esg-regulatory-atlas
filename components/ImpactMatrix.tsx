import { Blocks, BriefcaseBusiness } from "lucide-react";
import { businessImpactTypes } from "@/data/seed";
import { Badge } from "./Badge";
import { Regulation } from "@/types/regulation";
import { uniq } from "@/lib/utils";

export function ImpactMatrix({ regulations }: { regulations: Regulation[] }) {
  const rows = businessImpactTypes
    .map((impact) => {
      const matching = regulations.filter((regulation) => regulation.businessImpacts.includes(impact));
      return {
        impact,
        matching,
        opportunities: uniq(matching.flatMap((regulation) => regulation.advisoryOpportunities)).slice(0, 3)
      };
    })
    .filter((row) => row.matching.length)
    .sort((a, b) => b.matching.length - a.matching.length);

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Blocks className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Business impact matrix</h2>
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Converts regulations into operating-model impact areas so teams can see whether work belongs with finance, legal, procurement, product, data or the board.
          </p>
        </div>
        <Badge className="border-teal/20 bg-teal/10 text-teal">{rows.length} impact areas</Badge>
      </div>

      <div className="mt-4 divide-y divide-slate-100">
        {rows.length ? (
          rows.map((row) => (
            <div key={row.impact} className="grid gap-3 py-4 md:grid-cols-[220px_80px_1fr] md:items-start">
              <div className="flex items-center gap-2 font-semibold text-ink">
                <BriefcaseBusiness className="h-4 w-4 text-teal" />
                {row.impact}
              </div>
              <div>
                <Badge className="border-slate-200 bg-slate-50 text-slate-600">{row.matching.length} records</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {row.opportunities.map((opportunity) => (
                  <Badge key={opportunity} className="border-violet/20 bg-violet/10 text-violet">
                    {opportunity}
                  </Badge>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-sm text-slate-500">No business impact classifications match the current filters.</div>
        )}
      </div>
    </section>
  );
}
