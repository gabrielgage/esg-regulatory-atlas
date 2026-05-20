import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { Badge } from "@/components/Badge";
import { DailyUpdatePulse } from "@/components/DailyUpdatePulse";
import { DATASET_META } from "@/data/_meta";
import { CHANGELOG } from "@/data/changelog";
import { RECENT_CHANGELOG } from "@/data/changelogRecent";
import { regulations } from "@/data/seed";

export const metadata = {
  title: "Changelog | Etica ESG"
};

const changelogEntries = [...RECENT_CHANGELOG, ...CHANGELOG];

export default function ChangelogPage() {
  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-5xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Changelog"
          title="Public update log"
          body="Track dataset, source-quality and product-surface changes by edition. This is designed to make regulatory intelligence cadence visible rather than hidden in commit history."
          meta={`Current edition: ${DATASET_META.edition}. Dataset last reviewed ${DATASET_META.lastReviewed}.`}
        />
        <DisclaimerBanner />
        <DailyUpdatePulse />

        <div className="space-y-4">
          {changelogEntries.map((edition) => (
            <section key={edition.edition} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="border-teal/20 bg-teal/10 text-teal">{edition.edition}</Badge>
                    <Badge className="border-slate-200 bg-slate-50 text-slate-600">{edition.label}</Badge>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-ink">{edition.summary}</h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays className="h-4 w-4" />
                    {edition.date}
                  </p>
                </div>
                <Link href="/methodology" className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:underline">
                  Methodology <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <List title="Added" values={edition.added} />
                <List title="Updated" values={edition.updated} />
              </div>
              <div className="mt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Record chips</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {edition.records.map((id) => {
                    const regulation = regulations.find((item) => item.id === id);
                    return (
                      <Link key={id} href={`/regulations/${id}`} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-teal/40 hover:text-teal">
                        {regulation?.shortName || id}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">{edition.caveat}</p>
            </section>
          ))}
        </div>

        <FooterDisclaimer />
      </div>
    </main>
  );
}

function List({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
