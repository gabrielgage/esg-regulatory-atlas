import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, FileSearch, Filter, HelpCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Badge } from "@/components/Badge";
import { StatusBadge } from "@/components/StatusBadge";
import { RecordMetaBadges } from "@/components/RecordMetaBadges";
import { DATASET_META } from "@/data/_meta";
import { thresholdMatrixRows, type ThresholdMatrixReviewStatus, type ThresholdMatrixType } from "@/data/thresholdMatrix";
import { marqueeReviewItems } from "@/data/contentReview";
import { regulations } from "@/data/seed";
import type { Regulation } from "@/types/regulation";

export const metadata = {
  title: "Threshold Matrix | Etica ESG"
};

const typeLabels: Record<ThresholdMatrixType, string> = {
  "entity-size": "Entity size",
  "role-based": "Role based",
  "market-exposure": "Market exposure",
  "product-or-trade": "Product or trade",
  "jurisdiction-adoption": "Jurisdiction adoption",
  "value-chain": "Value chain",
  "listing-or-regulated-entity": "Listing or regulated entity"
};

const statusLabels: Record<ThresholdMatrixReviewStatus, string> = {
  "source-reviewed-seed": "Source-reviewed seed",
  "review-before-client-use": "Review before client use",
  "date-sensitive": "Date-sensitive",
  "jurisdiction-dependent": "Jurisdiction-dependent"
};

const statusStyles: Record<ThresholdMatrixReviewStatus, string> = {
  "source-reviewed-seed": "border-teal/20 bg-teal/10 text-teal",
  "review-before-client-use": "border-amber-200 bg-amber-50 text-amber-800",
  "date-sensitive": "border-violet/20 bg-violet/10 text-violet",
  "jurisdiction-dependent": "border-blue-200 bg-blue-50 text-blue-700"
};

export default function ThresholdsPage() {
  const rows = thresholdMatrixRows
    .map((row) => ({
      row,
      regulation: regulations.find((regulation) => regulation.id === row.regulationId),
      reviewItem: marqueeReviewItems.find((item) => item.id === row.regulationId)
    }))
    .filter((item): item is { row: (typeof thresholdMatrixRows)[number]; regulation: Regulation; reviewItem: (typeof marqueeReviewItems)[number] | undefined } =>
      Boolean(item.regulation)
    );
  const reviewBeforeUse = rows.filter((item) => item.row.reviewStatus === "review-before-client-use" || item.reviewItem?.premiumUseBlockedUntilReviewed).length;
  const sourceReviewed = rows.filter((item) => item.row.reviewStatus === "source-reviewed-seed").length;
  const dateSensitive = rows.filter((item) => item.row.reviewStatus === "date-sensitive").length;

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Threshold matrix"
          title="High-value scope signals to verify first"
          body="Use this matrix to spot which entity, market, product, value-chain or adoption facts should be checked before a record is used in an assessment, premium preview or advisory conversation."
          meta={`Current edition ${DATASET_META.edition}. Threshold rows are seed planning signals, not legal determinations.`}
        />
        <DisclaimerBanner />

        <section className="grid gap-4 md:grid-cols-4">
          <MetricCard icon={FileSearch} label="Tracked threshold rows" value={String(rows.length)} body="High-value records with explicit facts to confirm." />
          <MetricCard icon={CheckCircle2} label="Source-reviewed seed" value={String(sourceReviewed)} body="Rows with stronger source posture, still caveated." />
          <MetricCard icon={AlertTriangle} label="Review before use" value={String(reviewBeforeUse)} body="Rows needing source, status or threshold review before client use." />
          <MetricCard icon={Clock3} label="Date-sensitive" value={String(dateSensitive)} body="Rows where timing or implementation status is especially important." />
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-2xl border bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm">
            <div className="flex items-center gap-2 text-teal">
              <HelpCircle className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-semibold text-ink">How to read this matrix</h2>
            </div>
            <p className="mt-3">
              A threshold row is a screening prompt. It tells a reviewer which facts to confirm and which source to open first. It does not decide whether
              a company, fund, product, supplier or portfolio company is legally in scope.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <GuideItem title="Separate regimes" body="CSRD, CSDDD, SFDR, Taxonomy and EUDR use different scope logic. Do not transfer one threshold into another record." />
              <GuideItem title="Check local implementation" body="ISSB adoption, national laws and phase-in dates can depend on jurisdiction, listing rules, regulators and current guidance." />
              <GuideItem title="Use review status" body="Rows marked review-before-use or date-sensitive should stay out of client-ready outputs until source review is complete." />
            </div>
          </article>

          <article className="rounded-2xl border bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm">
            <div className="flex items-center gap-2 text-teal">
              <Filter className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-semibold text-ink">Current review emphasis</h2>
            </div>
            <p className="mt-3">
              The matrix prioritizes high-value records from the Marquee review queue: EU reporting and due diligence, sustainable finance, ISSB adoption,
              climate disclosure, supply-chain transparency and product or trade regimes.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.values(typeLabels).map((label) => (
                <Badge key={label} className="border-slate-200 bg-slate-50 text-slate-600">
                  {label}
                </Badge>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
              <p className="font-semibold">Operational rule</p>
              <p className="mt-1">
                If a threshold row is marked review-before-use, treat the related premium pack, alert preview or advisory output as illustrative until the
                source and entity facts are checked.
              </p>
            </div>
          </article>
        </section>

        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-semibold text-ink">Threshold review matrix</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Rows are sorted by product importance, not by legal risk. Open the linked regulation record for the full source trail, caveats, decision-readiness
              checklist and advisory next step.
            </p>
          </div>
          <div className="divide-y divide-slate-200">
            {rows.map(({ row, regulation, reviewItem }) => (
              <article key={row.id} className="grid gap-4 p-5 lg:grid-cols-[minmax(220px,0.75fr)_minmax(0,1.25fr)]">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={regulation.status} />
                    <Badge className={statusStyles[row.reviewStatus]}>{statusLabels[row.reviewStatus]}</Badge>
                    {reviewItem?.premiumUseBlockedUntilReviewed ? (
                      <Badge className="border-amber-200 bg-amber-50 text-amber-800">Premium use blocked pending review</Badge>
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-ink">
                    <Link href={`/regulations/${regulation.id}`} className="hover:text-teal">
                      {regulation.shortName}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{regulation.jurisdiction}</p>
                  <RecordMetaBadges regulation={regulation} compact />
                  <Link href={`/regulations/${regulation.id}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-ink">
                    Open source trail <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="border-slate-200 bg-white text-slate-600">{typeLabels[row.thresholdType]}</Badge>
                      <Badge className="border-slate-200 bg-white text-slate-600">Confidence: {row.confidence.replaceAll("_", " ")}</Badge>
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-6 text-ink">{row.thresholdSignal}</p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <ListBlock title="Facts to confirm" values={row.factsToConfirm} />
                    <div className="rounded-xl border border-slate-200 p-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Timing signal</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{row.timingSignal}</p>
                      <h4 className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">Source to verify</h4>
                      <a className="mt-2 inline-flex text-sm font-semibold text-teal hover:text-ink" href={row.sourceUrl} target="_blank" rel="noreferrer">
                        {row.sourceToVerify}
                      </a>
                    </div>
                  </div>
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                    <span className="font-semibold">Caveat: </span>
                    {row.caveat}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Recommended next review round</h2>
          <p className="mt-2">
            Continue source-reviewing Marquee 10 records before using them in premium or advisory examples. Prioritize CSRD, EU Taxonomy, SFDR, CSDDD,
            California climate disclosure, UK SDR and ISSB adoption paths where thresholds, timing or local implementation can change user interpretation.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/data-quality" className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Open Data Quality <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/regulations" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              Search regulations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <FooterDisclaimer />
      </div>
    </main>
  );
}

function MetricCard({ icon: Icon, label, value, body }: { icon: typeof FileSearch; label: string; value: string; body: string }) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
        </div>
        <span className="rounded-xl bg-teal/10 p-3 text-teal">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
    </article>
  );
}

function GuideItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}

function ListBlock({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

