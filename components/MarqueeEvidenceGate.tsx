import { AlertTriangle, ClipboardList, LockKeyhole, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/Badge";
import { marqueeReviewItems } from "@/data/contentReview";
import { decisionReadinessClass, decisionReadinessFor } from "@/lib/decisionReadiness";
import type { Regulation } from "@/types/regulation";

export function MarqueeEvidenceGate({ regulations }: { regulations: Regulation[] }) {
  const rows = marqueeReviewItems.map((item) => {
    const regulation = regulations.find((record) => record.id === item.id);
    return {
      item,
      regulation,
      plan: regulation ? decisionReadinessFor(regulation, regulations) : null
    };
  });
  const clientReuseBlocked = rows.filter((row) => row.plan?.level === "premium-blocked").length;
  const reviewBeforeClientUse = rows.filter((row) => row.plan?.level === "review-before-client-use").length;
  const orientationReady = rows.filter((row) => row.plan?.level === "orientation-ready").length;

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <LockKeyhole className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">Client reuse review gates</h2>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Launch-critical regimes need a source, threshold and evidence review before they appear in premium packs or client-ready advisory outputs. This panel turns the review queue into practical review decisions.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-red-200 bg-red-50 text-red-700">{clientReuseBlocked} need source/threshold review</Badge>
          <Badge className="border-amber-200 bg-amber-50 text-amber-800">{reviewBeforeClientUse} review first</Badge>
          <Badge className="border-teal/20 bg-teal/10 text-teal">{orientationReady} orientation-ready</Badge>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Metric icon={LockKeyhole} label="Client reuse blockers" value={String(clientReuseBlocked)} />
        <Metric icon={AlertTriangle} label="Client-use review" value={String(reviewBeforeClientUse)} />
        <Metric icon={ShieldCheck} label="Mapped records" value={`${rows.filter((row) => row.regulation).length}/${rows.length}`} />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">Regime</th>
              <th className="px-3 py-2">Gate</th>
              <th className="px-3 py-2">Owner</th>
              <th className="px-3 py-2">Facts to confirm</th>
              <th className="px-3 py-2">Evidence package</th>
              <th className="px-3 py-2">Source step</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(({ item, regulation, plan }) => (
              <tr key={item.id}>
                <td className="px-3 py-3 align-top">
                  <div className="font-semibold text-ink">{regulation?.shortName || item.id}</div>
                  <div className="mt-1 text-xs text-slate-500">{item.tier.replace("-", " ")} · {item.premiumUse || "Premium surface TBD"}</div>
                </td>
                <td className="px-3 py-3 align-top">
                  {plan ? <Badge className={decisionReadinessClass[plan.level]}>{plan.levelLabel}</Badge> : <Badge className="border-red-200 bg-red-50 text-red-700">Record missing</Badge>}
                </td>
                <td className="px-3 py-3 align-top text-slate-600">{plan?.owner || item.ownerPlaceholder || "Assign reviewer"}</td>
                <td className="px-3 py-3 align-top text-slate-600">{plan?.factsToConfirm[0] || item.thresholdReviewNextAction || "Confirm source and threshold scope."}</td>
                <td className="px-3 py-3 align-top text-slate-600">{plan?.evidencePackage.slice(0, 2).join("; ") || "Evidence package not yet generated."}</td>
                <td className="px-3 py-3 align-top text-slate-600">{plan?.sourceReviewSteps[0] || item.sourceReviewNextAction || "Add source-review next action."}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</div>
        <Icon className="h-4 w-4 text-teal" />
      </div>
      <div className="mt-2 text-2xl font-bold text-ink">{value}</div>
    </div>
  );
}
