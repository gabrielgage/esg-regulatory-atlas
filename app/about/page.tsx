import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { Badge } from "@/components/Badge";
import { DATASET_META } from "@/data/_meta";
import { jurisdictions, regulations } from "@/data/seed";
import { formatDate } from "@/lib/utils";

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-5xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="About"
          title="About Etica ESG"
          body="Etica ESG publishes a source-led Regulatory Atlas for sustainability and ESG regulatory planning."
        />
        <DisclaimerBanner />

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <Badge className="border-teal/20 bg-teal/10 text-teal">{regulations.length} records</Badge>
            <Badge className="border-slate-200 bg-slate-50 text-slate-600">
              {jurisdictions.filter((jurisdiction) => jurisdiction.type !== "international").length} jurisdictions
            </Badge>
            <Badge className="border-violet/20 bg-violet/10 text-violet">Edition {DATASET_META.edition}</Badge>
          </div>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              Etica ESG · Regulatory Atlas is an independent, free-to-use radar of sustainability and ESG regulation. It is structured around three layers:
              international baseline frameworks such as ISSB, GRI and TCFD, local jurisdictional rules, and sectoral or regional regulations that
              affect cross-border value chains, products, finance and corporate reporting.
            </p>
            <p>
              The Atlas is intentionally an editorial product. Records are hand-curated, connected to source material, and reviewed on a published
              cadence. The current dataset was last reviewed on {formatDate(DATASET_META.lastReviewed)} and the next scheduled review is{" "}
              {formatDate(DATASET_META.nextReview)}.
            </p>
            <p>
              Published by {DATASET_META.publisher} and edited by {DATASET_META.editor}. The product is designed for orientation, planning and briefing. It does not provide legal, tax, investment or
              assurance advice.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/methodology" className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Review methodology <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`mailto:${DATASET_META.contactEmail}`} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              <Mail className="h-4 w-4" />
              Request a briefing
            </a>
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">Key trends emerging</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Trend
              title="ISSB convergence is accelerating"
              body="Singapore, Japan, Australia, Brazil, Canada and Turkey show how national disclosure regimes are using ISSB-aligned standards as a baseline while preserving local timing and assurance rules."
            />
            <Trend
              title="EU simplification is now a core watch item"
              body="CSRD and CSDDD scope, timing and reporting burdens are being reshaped through stop-the-clock and Omnibus measures, making dated source review essential."
            />
            <Trend
              title="Product and trade rules are becoming operational"
              body="CBAM, EUDR, ESPR, Batteries and Forced Labour move ESG from reporting teams into procurement, customs, product data and supplier evidence workflows."
            />
            <Trend
              title="State and market pressure fill federal gaps"
              body="Where federal climate disclosure is paused or uncertain, California, investor expectations, customer requests and international regimes still create practical readiness needs."
            />
          </div>
        </section>

        <FooterDisclaimer />
      </div>
    </main>
  );
}

function Trend({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </div>
  );
}
