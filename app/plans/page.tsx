import Link from "next/link";
import { ArrowRight, CheckCircle2, Handshake, SearchCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { Badge } from "@/components/Badge";
import { ManualRequestPanel } from "@/components/ManualRequestPanel";
import { commercialCaveat, commercialComparisonRows, commercialOffers, type CommercialOffer } from "@/data/commercialOffers";
import { conversionTrackingCaveat } from "@/data/conversionTracking";

const tierClass: Record<CommercialOffer["tier"], string> = {
  free: "border-teal/20 bg-teal/10 text-teal",
  premium: "border-violet/20 bg-violet/10 text-violet",
  advisory: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-400/40 dark:bg-amber-950/30 dark:text-amber-100",
  "enterprise-future": "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
};

const statusLabel: Record<CommercialOffer["status"], string> = {
  available: "Available",
  preview: "Preview",
  "design-partner": "Design partner",
  future: "Future"
};

export default function PlansPage() {
  const freeAtlas = commercialOffers.find((offer) => offer.id === "free-atlas");
  const advisoryAtlas = commercialOffers.find((offer) => offer.id === "advisory-atlas");
  const premiumIntelligence = commercialOffers.find((offer) => offer.id === "premium-intelligence");
  const enterpriseFuture = commercialOffers.find((offer) => offer.id === "enterprise-api-future");

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Plans"
          title="Choose the current path"
          body="The live MVP has two practical paths: use the free Atlas for orientation, or request a manual advisory-supported scan when you need source-linked help. Premium intelligence remains a preview until demand and governance are validated."
          meta="No Stripe, authentication, database, paid APIs, automated email backend or gated content are implemented in this MVP."
        />
        <DisclaimerBanner />

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge className="border-teal/20 bg-teal/10 text-teal">Live today</Badge>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Start free, request help when the question becomes specific</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Keep the Atlas public as the trust surface. Use advisory scans for manual, source-linked planning support. Treat premium alerts and
                enterprise workflows as future validation paths, not live product promises.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:border-amber-400/40 dark:bg-amber-950/30 dark:text-amber-100">
              {conversionTrackingCaveat}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {freeAtlas ? <PrimaryOfferCard offer={freeAtlas} icon="search" emphasis="Explore the source-linked public Atlas." /> : null}
          {advisoryAtlas ? <PrimaryOfferCard offer={advisoryAtlas} icon="handshake" emphasis="Request a manual scan for a concrete business question." /> : null}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal">Not live SaaS yet</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-ink">Premium and enterprise paths are validation surfaces</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">{commercialCaveat}</p>
            </div>
            <Link href="/premium-roadmap" className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
              View roadmap
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[premiumIntelligence, enterpriseFuture].filter(Boolean).map((offer) => (
              <SecondaryOfferCard key={offer!.id} offer={offer!} />
            ))}
          </div>
        </section>

        <details className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <summary className="cursor-pointer p-5 text-lg font-semibold text-ink">Compare all paths</summary>
          <div className="border-t border-slate-100 dark:border-slate-700">
            <div className="px-5 pt-4">
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                Premium and enterprise features remain previews or future-state concepts until demand and governance are validated.
              </p>
            </div>
            <div className="overflow-x-auto p-5 pt-4">
              <table className="min-w-[900px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-950">
                  <tr>
                    <th className="px-4 py-3">Capability</th>
                    <th className="px-4 py-3">Free Atlas</th>
                    <th className="px-4 py-3">Premium Intelligence</th>
                    <th className="px-4 py-3">Advisory Atlas</th>
                    <th className="px-4 py-3">Enterprise/API Future</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {commercialComparisonRows.map((row) => (
                    <tr key={row.capability}>
                      <td className="px-4 py-3 font-semibold text-ink">{row.capability}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.freeAtlas}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.premiumIntelligence}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.advisoryAtlas}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.enterpriseFuture}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </details>

        <section className="grid gap-3 md:grid-cols-3">
          <Faq title="Why no checkout yet?" body="The offer needs validation first. Billing, accounts and subscriptions add operational complexity before demand is proven." />
          <Faq title="Are alerts live?" body="No. The alerts page shows sample editorial previews and request-access options. Production email alerts are a later phase." />
          <Faq title="Can advisory work start now?" body="Yes. Advisory scans and briefings can be handled manually using the current Atlas, source links, caveats and review-risk workflow." />
        </section>

        <ManualRequestPanel
          subject="Etica ESG commercial preview request"
          requestType="a commercial preview, market pack or advisory scan"
          whatToSend={["Which path you want to test: Premium Intelligence, market pack or advisory scan", "Jurisdiction, topic, sector or portfolio context", "Your role or intended audience", "Whether this is for internal planning, client scoping or board/advisory preparation"]}
          whatEticaReturns={["Suggested Atlas route or offer path", "Relevant preview, sample pack or advisory scan scope", "Source-review caveats and facts to confirm", "Recommended next manual validation step"]}
        />

        <FooterDisclaimer />
      </div>
    </main>
  );
}

function PrimaryOfferCard({ offer, icon, emphasis }: { offer: CommercialOffer; icon: "search" | "handshake"; emphasis: string }) {
  const Icon = icon === "search" ? SearchCheck : Handshake;

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className={tierClass[offer.tier]}>{offer.tier.replace("-", " ")}</Badge>
        <Badge className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">{statusLabel[offer.status]}</Badge>
      </div>
      <Icon className="mt-5 h-7 w-7 text-teal" aria-hidden="true" />
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink">{offer.name}</h2>
      <p className="mt-2 text-sm font-semibold text-teal">{emphasis}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{offer.description}</p>
      <div className="mt-5 grow space-y-2">
        {offer.includedOutputs.slice(0, 4).map((output) => (
          <div key={output} className="flex gap-2 text-sm leading-5 text-slate-600 dark:text-slate-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
            <span>{output}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs leading-5 text-slate-500 dark:text-slate-400">{offer.legalCaveat}</p>
      <OfferLink href={offer.ctaHref} label={offer.ctaLabel} primary />
    </article>
  );
}

function SecondaryOfferCard({ offer }: { offer: CommercialOffer }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
      <div className="flex flex-wrap gap-2">
        <Badge className={tierClass[offer.tier]}>{offer.tier.replace("-", " ")}</Badge>
        <Badge className="border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">{statusLabel[offer.status]}</Badge>
      </div>
      <h3 className="mt-4 text-lg font-bold tracking-tight text-ink">{offer.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{offer.description}</p>
      <ul className="mt-4 space-y-2 text-sm leading-5 text-slate-600 dark:text-slate-300">
        {offer.includedOutputs.slice(0, 3).map((output) => (
          <li key={output}>• {output}</li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-5 text-slate-500 dark:text-slate-400">{offer.legalCaveat}</p>
      <OfferLink href={offer.ctaHref} label={offer.ctaLabel} />
    </article>
  );
}

function OfferLink({ href, label, primary = false }: { href: string; label: string; primary?: boolean }) {
  const className = primary
    ? "mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
    : "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal underline";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function Faq({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{body}</p>
    </article>
  );
}
