import Link from "next/link";
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { Badge } from "@/components/Badge";
import { CommercialCTA } from "@/components/CommercialCTA";
import { ManualRequestPanel } from "@/components/ManualRequestPanel";
import { commercialCaveat, commercialComparisonRows, commercialOffers } from "@/data/commercialOffers";
import { conversionSurfaces, conversionTrackingCaveat } from "@/data/conversionTracking";
import { DATASET_META } from "@/data/_meta";

const tierClass = {
  free: "border-teal/20 bg-teal/10 text-teal",
  premium: "border-violet/20 bg-violet/10 text-violet",
  advisory: "border-amber-200 bg-amber-50 text-amber-800",
  "enterprise-future": "border-slate-200 bg-slate-50 text-slate-600"
};

const statusLabel = {
  available: "Available",
  preview: "Preview",
  "design-partner": "Design partner",
  future: "Future"
};

export default function PlansPage() {
  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Plans"
          title="Free Atlas, premium previews and advisory support"
          body="The May 2026 strategy is simple: keep the public Atlas free as the trust surface, validate Premium Intelligence with static previews, and monetize first through advisory-supported scans and briefings."
          meta="No Stripe, authentication, database, paid APIs, automated email backend or gated content are implemented in this MVP."
        />
        <DisclaimerBanner />

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <LockKeyhole className="h-3.5 w-3.5 text-teal" />
                Manual request path
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">Commercial signal without product complexity</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Premium Intelligence and Advisory Atlas are presented as request-access and manual service pathways. This keeps the product launchable while testing which alerts, market packs and advisory scans users actually want.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
              {commercialCaveat}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          {commercialOffers.map((offer) => (
            <article key={offer.id} className="flex flex-col rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex flex-wrap gap-2">
                <Badge className={tierClass[offer.tier]}>{offer.tier.replace("-", " ")}</Badge>
                <Badge className="border-slate-200 bg-slate-50 text-slate-600">{statusLabel[offer.status]}</Badge>
              </div>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-ink">{offer.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{offer.description}</p>
              <div className="mt-4 grow space-y-2">
                {offer.includedOutputs.slice(0, 5).map((output) => (
                  <div key={output} className="flex gap-2 text-sm leading-5 text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    <span>{output}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">{offer.legalCaveat}</p>
              {offer.ctaHref.startsWith("/") ? (
                <Link href={offer.ctaHref} className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                  {offer.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <a href={offer.ctaHref} className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                  {offer.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </article>
          ))}
        </section>

        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-lg font-semibold text-ink">Free vs premium vs advisory</h2>
            <p className="mt-1 text-sm text-slate-500">Premium and enterprise features remain previews or future-state concepts until demand and governance are validated.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3">Capability</th>
                  <th className="px-4 py-3">Free Atlas</th>
                  <th className="px-4 py-3">Premium Intelligence</th>
                  <th className="px-4 py-3">Advisory Atlas</th>
                  <th className="px-4 py-3">Enterprise/API Future</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {commercialComparisonRows.map((row) => (
                  <tr key={row.capability}>
                    <td className="px-4 py-3 font-semibold text-ink">{row.capability}</td>
                    <td className="px-4 py-3 text-slate-600">{row.freeAtlas}</td>
                    <td className="px-4 py-3 text-slate-600">{row.premiumIntelligence}</td>
                    <td className="px-4 py-3 text-slate-600">{row.advisoryAtlas}</td>
                    <td className="px-4 py-3 text-slate-600">{row.enterpriseFuture}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Faq title="Why no checkout yet?" body="The offer needs validation first. Billing, accounts and subscriptions add operational complexity before demand is proven." />
          <Faq title="Are alerts live?" body="No. The alerts page shows sample editorial previews and request-access options. Production email alerts are a later phase." />
          <Faq title="Can advisory work start now?" body="Yes. Advisory scans and briefings can be handled manually using the current Atlas, source links, caveats and review-risk workflow." />
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-ink">Manual validation loop</h2>
              <p className="mt-1 text-sm text-slate-500">{conversionTrackingCaveat}</p>
            </div>
            <Link href="/advisory" className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
              Advisory path <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {conversionSurfaces.slice(0, 6).map((surface) => (
              <article key={surface.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{surface.intent.replaceAll("-", " ")}</div>
                <h3 className="mt-2 font-semibold text-ink">{surface.ctaLabel}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{surface.successSignal}</p>
                <p className="mt-2 text-xs text-slate-500">Subject signal: {surface.mailtoSubject}</p>
              </article>
            ))}
          </div>
        </section>

        <ManualRequestPanel
          subject="Etica ESG commercial preview request"
          requestType="a commercial preview, market pack or advisory scan"
          whatToSend={["Which path you want to test: Premium Intelligence, market pack or advisory scan", "Jurisdiction, topic, sector or portfolio context", "Your role or intended audience", "Whether this is for internal planning, client scoping or board/advisory preparation"]}
          whatEticaReturns={["Suggested Atlas route or offer path", "Relevant preview, sample pack or advisory scan scope", "Source-review caveats and facts to confirm", "Recommended next manual validation step"]}
        />

        <CommercialCTA
          title="Help validate the first premium offer"
          body="Request an alert preview, market pack outline or advisory exposure scan. The current path is manual and source-linked, not automated SaaS."
          href={`mailto:${DATASET_META.contactEmail}?subject=${encodeURIComponent("Etica ESG commercial preview request")}`}
          label="Request preview"
          secondaryHref="/advisory"
          secondaryLabel="Advisory options"
        />

        <FooterDisclaimer />
      </div>
    </main>
  );
}

function Faq({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </article>
  );
}
