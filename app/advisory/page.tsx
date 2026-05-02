import { ArrowRight, BriefcaseBusiness, ClipboardCheck, MapPinned, UsersRound } from "lucide-react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { Badge } from "@/components/Badge";
import { CommercialCTA } from "@/components/CommercialCTA";
import { advisoryServices } from "@/data/commercialOffers";
import { DATASET_META } from "@/data/_meta";

export default function AdvisoryPage() {
  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Advisory Atlas"
          title="Advisory-supported ESG regulatory intelligence"
          body="Use the Atlas as a source-linked foundation for exposure scans, custom watchlists, portfolio or supplier maps, market packs and board/client briefings."
          meta="Advisory support is manual and caveated. It does not provide legal, tax, investment or assurance advice."
        />
        <DisclaimerBanner />

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-teal">
                <BriefcaseBusiness className="h-4 w-4" />
                Fastest monetization path
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Turn the free Atlas into client-ready advisory work</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Advisory Atlas packages convert static regulatory intelligence into a practical first conversation: what may be relevant, why it appears, what facts are missing, what evidence is needed, who should own it and which sources need review.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <Metric icon={MapPinned} label="Primary output" value="Exposure scan" />
              <Metric icon={ClipboardCheck} label="Review posture" value="Source-first" />
              <Metric icon={UsersRound} label="Buyer motion" value="Advisory lead-gen" />
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {advisoryServices.map((service) => (
            <article key={service.id} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {service.bestFor.slice(0, 3).map((persona) => (
                  <Badge key={persona} className="border-slate-200 bg-slate-50 text-slate-600">
                    {persona}
                  </Badge>
                ))}
              </div>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-ink">{service.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <List title="Example deliverables" values={service.deliverables} />
                <List title="Suggested process" values={service.process} />
              </div>
              <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">{service.caveat}</p>
              <a href={service.ctaHref} className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                {service.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">What an advisory scan should answer</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <Question text="Which tracked regulations may be relevant to this profile?" />
            <Question text="Which facts are missing before applicability can be confirmed?" />
            <Question text="What evidence, controls and owners should be prepared first?" />
            <Question text="Which sources, dates and caveats need review before reliance?" />
          </div>
        </section>

        <CommercialCTA
          eyebrow="Advisory inquiry"
          title="Request a manual exposure scan or briefing"
          body="Share the jurisdiction, sector, company type or portfolio question. The first advisory output is a cautious source-linked scan, not a legal opinion."
          href={`mailto:${DATASET_META.contactEmail}?subject=${encodeURIComponent("Etica ESG advisory inquiry")}&body=${encodeURIComponent(
            "Hi Gabriel,\n\nI would like to discuss an Advisory Atlas engagement.\n\nContext:\n- Jurisdiction(s):\n- Company/portfolio/supplier profile:\n- Main question:\n"
          )}`}
          label="Request advisory support"
          secondaryHref="/plans"
          secondaryLabel="View plans"
        />

        <FooterDisclaimer />
      </div>
    </main>
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
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
        <Icon className="h-4 w-4 text-teal" />
      </div>
      <div className="mt-2 font-semibold text-ink">{value}</div>
    </div>
  );
}

function List({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-5 text-slate-600">
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

function Question({ text }: { text: string }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-ink">{text}</div>;
}
