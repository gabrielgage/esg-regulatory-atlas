import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { GlossaryGuide } from "@/components/GlossaryGuide";
import { glossaryCategories, glossaryTerms } from "@/data/glossary";

export const metadata: Metadata = {
  title: "Glossary | Etica ESG Regulatory Atlas",
  description: "Plain-language ESG regulatory glossary for orientation, planning and source review."
};

export default function GlossaryPage() {
  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-6 md:px-6">
        <section className="rounded-2xl border bg-white p-6 shadow-sm md:p-8 dark:border-slate-700 dark:bg-slate-900/80">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Glossary</p>
              <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Plain-language ESG regulatory terms
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
                A practical reference for terms used across the Atlas, assessment, map, regulation details and briefing surfaces.
                Definitions are for orientation only and should not be treated as legal definitions or official translations.
              </p>
            </div>
            <div className="rounded-2xl border border-teal/20 bg-teal/5 p-4 dark:border-teal/30 dark:bg-teal/10">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <BookOpen className="h-4 w-4 text-teal" /> {glossaryTerms.length} terms
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Use this page to align teams before reviewing sources, running an assessment or preparing a client briefing.
              </p>
            </div>
          </div>
        </section>

        <DisclaimerBanner />

        <GlossaryGuide />

        <section className="rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-ink">Browse by concept area</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-300">
                The categories mirror how regulatory work usually gets triaged: status, reporting, value chain, finance, data and product/nature claims.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {glossaryCategories.map((category) => (
                <a key={category} href={`#${slugify(category)}`} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                  {category}
                </a>
              ))}
            </div>
          </div>
        </section>

        {glossaryCategories.map((category) => {
          const terms = glossaryTerms.filter((term) => term.category === category);
          return (
            <section key={category} id={slugify(category)} className="scroll-mt-28 rounded-2xl border bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-ink">{category}</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{terms.length} orientation terms</p>
                </div>
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                {terms.map((term) => (
                  <article key={term.id} id={term.id} className="scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/40">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-ink">{term.term}</h3>
                      <span className="rounded-full bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                        Orientation
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{term.plainEnglish}</p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl bg-white p-3 dark:bg-slate-800/80">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Why it matters</p>
                        <p className="mt-2 text-sm leading-5 text-slate-600 dark:text-slate-300">{term.whyItMatters}</p>
                      </div>
                      <div className="rounded-xl bg-white p-3 dark:bg-slate-800/80">
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                          <ShieldCheck className="h-3.5 w-3.5" /> Caveat
                        </p>
                        <p className="mt-2 text-sm leading-5 text-slate-600 dark:text-slate-300">{term.caveat}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {term.relatedTopics.map((topic) => (
                        <span key={topic} className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {term.relatedLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="inline-flex items-center gap-1 rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800">
                          {link.label} <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <FooterDisclaimer />
      </div>
    </main>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
