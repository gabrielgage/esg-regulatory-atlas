import { ArrowUpRight, Bell, BriefcaseBusiness, Database, FileText, LockKeyhole, ScanSearch, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { DATASET_META } from "@/data/_meta";

const futureProducts = [
  {
    title: "Market packs",
    icon: FileText,
    body: "Jurisdiction-specific summaries, source-quality notes, milestones, client questions and first-action checklists."
  },
  {
    title: "Sector packs",
    icon: BriefcaseBusiness,
    body: "Financial services, private equity, manufacturing, real assets, agriculture, retail and energy-specific obligation views."
  },
  {
    title: "Portfolio screening",
    icon: ScanSearch,
    body: "Static portfolio-company exposure scan by jurisdiction, company type, sector, value chain and reporting year."
  },
  {
    title: "Watchlists and alerts",
    icon: Bell,
    body: "Future source-monitoring workflow for records that need legal review, source verification or date updates."
  },
  {
    title: "Client workspaces",
    icon: Users,
    body: "Future authenticated client views, saved assessments and briefing history. Not implemented in the MVP."
  },
  {
    title: "Data licensing",
    icon: Database,
    body: "Future CSV/API licensing concept once source governance, review cadence and legal review are production-ready."
  }
];

export default function PremiumRoadmapPage() {
  const subject = encodeURIComponent("Etica ESG premium roadmap discussion");
  const body = encodeURIComponent(
    "Hi Gabriel,\n\nI would like to discuss future Etica ESG Regulatory Atlas market packs, sector packs, portfolio screening or readiness support.\n"
  );

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-6xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Premium roadmap"
          title="Commercial roadmap without MVP complexity"
          body="The current Atlas remains static, public and source-linked. These are future premium workflows to validate before adding authentication, database persistence or payments."
        />

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <LockKeyhole className="h-3.5 w-3.5 text-teal" />
                No gating in this MVP
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink">Validate premium demand before adding product complexity</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                The recommended path is lead generation first: market briefings, portfolio scans, sector packs and regulatory readiness reviews. Payments, accounts and automated monitoring remain Phase 2 or later.
              </p>
            </div>
            <a
              href={`mailto:${DATASET_META.contactEmail}?subject=${subject}&body=${body}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Discuss roadmap
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {futureProducts.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border bg-white p-5 shadow-sm">
                <Icon className="h-5 w-5 text-teal" />
                <h2 className="mt-4 text-lg font-semibold text-ink">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </article>
            );
          })}
        </section>

        <section className="rounded-2xl border bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Implementation guardrails</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Guardrail text="Do not add Stripe, checkout, subscriptions or payment webhooks until the offer is validated." />
            <Guardrail text="Do not add authentication or client workspaces until the data model and review workflow are stable." />
            <Guardrail text="Do not add automated alerts until source verification, change logging and legal review workflows are designed." />
            <Guardrail text="Keep public records legally cautious and visibly labelled as seed regulatory intelligence." />
          </div>
        </section>

        <FooterDisclaimer />
      </div>
    </main>
  );
}

function Guardrail({ text }: { text: string }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">{text}</div>;
}
