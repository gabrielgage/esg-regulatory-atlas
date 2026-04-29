import { ClipboardCheck, Radar, ShieldCheck, TrendingUp } from "lucide-react";
import { Badge } from "./Badge";
import { Regulation } from "@/types/regulation";

export function AdvisoryInsights({ regulations }: { regulations: Regulation[] }) {
  const highImpact = regulations.filter((regulation) => regulation.highImpact).length;
  const needsReview = regulations.filter((regulation) => regulation.dataQualityStatus === "needs_review" || regulation.dataQualityStatus === "date_uncertain").length;
  const nearTerm = regulations.filter((regulation) => {
    const year = regulation.firstReportingYear || 0;
    return year >= 2025 && year <= 2027;
  }).length;

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Radar className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Consultant review layer</h2>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            MVP prioritisation view for sustainability, legal, finance and advisory teams. It flags where the dataset creates immediate client workstreams rather than treating every regulation as equal.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-red-200 bg-red-50 text-red-700">{highImpact} high impact</Badge>
          <Badge className="border-amber-200 bg-amber-50 text-amber-800">{needsReview} review items</Badge>
          <Badge className="border-teal/20 bg-teal/10 text-teal">{nearTerm} near-term</Badge>
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <Insight
          icon={ClipboardCheck}
          title="Immediate readiness work"
          body="Prioritise CSRD/ESRS, California climate, Australia, Singapore and ISSB-aligned reporting where reporting years are active or near-term."
        />
        <Insight
          icon={TrendingUp}
          title="Commercial opportunity"
          body="The strongest advisory plays are double materiality, climate data controls, assurance preparation, supplier due diligence and product compliance data models."
        />
        <Insight
          icon={ShieldCheck}
          title="Data governance warning"
          body="Keep confidence and review status visible. A production product needs named source owners, jurisdiction-specific legal review and monitored change logs."
        />
      </div>
    </section>
  );
}

function Insight({
  icon: Icon,
  title,
  body
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <Icon className="h-5 w-5 text-teal" />
      <h3 className="mt-3 text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}
