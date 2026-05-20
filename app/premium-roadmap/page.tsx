import Link from "next/link";
import { ArrowRight, Bell, BriefcaseBusiness, Database, FileText, LockKeyhole, ShieldCheck, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { Badge } from "@/components/Badge";
import { CommercialCTA } from "@/components/CommercialCTA";
import { alertDigestPreviews } from "@/data/alertDigests";
import { commercialCaveat } from "@/data/commercialOffers";
import { premiumPacks } from "@/data/premiumPacks";
import { DATASET_META } from "@/data/_meta";

const futureRoadmap = [
  {
    title: "Design-partner premium previews",
    icon: Bell,
    body: "Validate which weekly/monthly alerts, watchlists and executive digests users would pay for before automating delivery."
  },
  {
    title: "Advisory-supported pack delivery",
    icon: BriefcaseBusiness,
    body: "Use manual exposure scans, source review and briefings as the first revenue motion while the data model matures."
  },
  {
    title: "Source governance workflow",
    icon: ShieldCheck,
    body: "Add named review owners, source freshness, legal review and edition diffing before production monitoring claims."
  },
  {
    title: "Enterprise/API future",
    icon: Database,
    body: "Accounts, workspaces, API/data licensing, audit trails and integrations remain future-state after validation."
  },
  {
    title: "Client workspaces future",
    icon: Users,
    body: "Saved company profiles, watchlists and client views require authentication and a database, so they stay outside the MVP."
  },
  {
    title: "Board-pack outputs future",
    icon: FileText,
    body: "PDF or board-pack generation should follow proven demand for market packs and advisory scans."
  }
];

export default function PremiumRoadmapPage() {
  const subject = encodeURIComponent("Etica ESG premium roadmap discussion");
  const body = encodeURIComponent(
    "Hi Gabriel,\n\nI would like to discuss future Etica ESG Regulatory Atlas premium alerts, market packs, advisory scans or design-partner options.\n\nContext:\n"
  );

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Premium roadmap"
          title="Premium previews before premium infrastructure"
          body="This roadmap makes the commercial direction concrete while preserving the static MVP guardrails: no checkout, accounts, database, production alerts, scraping or paid APIs."
        />

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <LockKeyhole className="h-3.5 w-3.5 text-teal" />
                Validate before gating
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">Free trust surface, premium proof of value, advisory revenue path</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                Premium Intelligence is currently a set of static previews and request-access CTAs. Advisory Atlas can be delivered manually now through exposure scans, custom watchlists, source review and client-ready briefings.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">{commercialCaveat}</div>
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-ink">Premium market pack previews</h2>
              <p className="mt-1 text-sm text-slate-500">Concrete pack concepts to validate with buyers before billing, gating or production data infrastructure.</p>
            </div>
            <Link href="/plans" className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
              View plan comparison <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {premiumPacks.map((pack) => (
              <article key={pack.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="border-violet/20 bg-violet/10 text-violet">{pack.status.replaceAll("-", " ")}</Badge>
                  <Badge className="border-slate-200 bg-white text-slate-600">{pack.cadence || "on-request"}</Badge>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-ink">{pack.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Regimes: {pack.includedRegimes.slice(0, 6).join(", ")}.</p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <MiniList title="Outputs" values={pack.outputs.slice(0, 4)} />
                  <MiniList title="Sample contents" values={pack.sampleTableOfContents.slice(0, 4)} />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">{pack.advisoryExtension}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link href={`/premium-packs/${pack.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
                    View sample pack <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={pack.ctaHref} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 underline">
                    {pack.ctaLabel} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Alert roadmap</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Alerts remain editorial previews until source monitoring, unsubscribe/privacy mechanics, review workflow and email operations are explicitly approved.
            </p>
            <div className="mt-4 space-y-3">
              {alertDigestPreviews.map((digest) => (
                <Link key={digest.id} href="/alerts" className="block rounded-xl border border-slate-200 bg-slate-50 p-4 hover:bg-teal/5">
                  <div className="font-semibold text-ink">{digest.title}</div>
                  <p className="mt-1 text-sm text-slate-600">{digest.audience.slice(0, 3).join(", ")}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-2">
            {futureRoadmap.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border bg-white p-5 shadow-sm">
                  <Icon className="h-5 w-5 text-teal" />
                  <h2 className="mt-4 text-base font-semibold text-ink">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                </article>
              );
            })}
          </section>
        </section>

        <section className="rounded-2xl border bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Implementation guardrails</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Guardrail text="Validate premium demand before adding Stripe, checkout, subscriptions or payment webhooks." />
            <Guardrail text="Keep the Free Atlas broad and public until there is clear evidence that gating improves outcomes." />
            <Guardrail text="Do not claim production monitoring is live while alerts are static previews." />
            <Guardrail text="Use internal and competitor research for product strategy only, not as legal authority." />
          </div>
        </section>

        <CommercialCTA
          title="Discuss a premium preview or design partnership"
          body="Share the market pack, alert, watchlist or advisory scan you would most likely use. This informs what gets validated before infrastructure is added."
          href={`mailto:${DATASET_META.contactEmail}?subject=${subject}&body=${body}`}
          label="Discuss roadmap"
          secondaryHref="/advisory"
          secondaryLabel="Advisory options"
        />

        <FooterDisclaimer />
      </div>
    </main>
  );
}

function MiniList({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-lg bg-white p-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</div>
      <ul className="mt-2 space-y-1 text-sm leading-5 text-slate-600">
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

function Guardrail({ text }: { text: string }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">{text}</div>;
}
