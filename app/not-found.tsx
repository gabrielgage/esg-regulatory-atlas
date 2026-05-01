import Link from "next/link";
import { ArrowRight, Compass, FileSearch, Home, Mail } from "lucide-react";
import { Header } from "@/components/Header";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { DATASET_META } from "@/data/_meta";

const suggestions = [
  { href: "/", label: "Open the map", icon: Home },
  { href: "/regulations", label: "Search regulations", icon: FileSearch },
  { href: "/methodology", label: "Review methodology", icon: Compass }
];

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-4xl space-y-5 px-4 py-10 md:px-6">
        <section className="rounded-2xl border bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">404</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">This Atlas page is not available</h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                The record may have moved, the jurisdiction code may be unavailable, or the link may refer to a future edition. Use the map, regulations database, or methodology page to continue.
              </p>
            </div>
            <img className="h-16 w-16 rounded-2xl bg-white p-2 ring-1 ring-slate-200" src="/etica-esg-logo.svg" alt="Etica ESG" />
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {suggestions.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-ink hover:border-teal/40 hover:bg-teal/5">
                  <Icon className="mb-3 h-5 w-5 text-teal" />
                  <span className="inline-flex items-center gap-2">
                    {item.label} <ArrowRight className="h-4 w-4 text-slate-400" />
                  </span>
                </Link>
              );
            })}
          </div>
          <a href={`mailto:${DATASET_META.contactEmail}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:underline">
            <Mail className="h-4 w-4" />
            Contact {DATASET_META.publisher}
          </a>
        </section>
        <FooterDisclaimer />
      </div>
    </main>
  );
}
