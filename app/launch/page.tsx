import Link from "next/link";
import { ArrowRight, Mail, Megaphone, MousePointerClick, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { LaunchAssetLibrary } from "@/components/LaunchAssetLibrary";
import { PageIntro } from "@/components/PageIntro";
import { CommercialCTA } from "@/components/CommercialCTA";
import { DATASET_META } from "@/data/_meta";
import { launchAssets } from "@/data/launchAssets";

export default function LaunchPage() {
  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Launch resources"
          title="Copyable launch assets for commercial validation"
          body="Use these static assets to test demand for the free Atlas, premium alerts, market packs and advisory exposure scans before adding paid infrastructure or production automation."
          meta="Manual outreach only. No checkout, accounts, automated emails, scraping, cron jobs, database or paid APIs are implemented."
        />
        <DisclaimerBanner />

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-teal">
                <Megaphone className="h-4 w-4" />
                Launch operator workspace
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">Validate demand without pretending the full SaaS exists</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                The launch page turns the static offer data into reusable outreach material. Each asset preserves caveats so copied text does not imply legal advice, complete coverage, production monitoring or a live paid product.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <Metric icon={MousePointerClick} label="Conversion path" value="Manual inquiry" />
              <Metric icon={Mail} label="Primary channel" value="Email + LinkedIn" />
              <Metric icon={ShieldCheck} label="Legal posture" value="Caveats preserved" />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <RouteCard href="/plans" title="Plans" body="Use this when a user needs the free, premium, advisory and future enterprise model." />
          <RouteCard href="/alerts" title="Alerts preview" body="Use this when testing weekly or monthly regulatory digest interest." />
          <RouteCard href="/advisory" title="Advisory Atlas" body="Use this when the next step is a manual exposure scan or briefing." />
        </section>

        <LaunchAssetLibrary assets={launchAssets} />

        <CommercialCTA
          eyebrow="Manual launch follow-up"
          title="Turn a launch conversation into a source-linked advisory scan"
          body="When someone replies with a jurisdiction, market, sector or portfolio question, route them toward a manual Advisory Atlas exposure scan rather than promising automated monitoring."
          href={`mailto:${DATASET_META.contactEmail}?subject=${encodeURIComponent("Etica ESG launch follow-up")}&body=${encodeURIComponent(
            "Hi Gabriel,\n\nI would like to follow up on the Etica ESG Regulatory Atlas launch.\n\nInterest area:\n- Free Atlas:\n- Premium alerts:\n- Market pack:\n- Advisory scan:\n\nContext:\n"
          )}`}
          label="Start follow-up email"
          secondaryHref="/advisory"
          secondaryLabel="Open advisory page"
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

function RouteCard({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="rounded-2xl border bg-white p-5 shadow-sm transition hover:border-teal/30 hover:bg-teal/5">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal">
        Open route <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
