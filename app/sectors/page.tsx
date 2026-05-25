import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { GlossaryHelpCard } from "@/components/GlossaryHelpCard";
import { Header } from "@/components/Header";
import { MarketBriefingCTA } from "@/components/MarketBriefingCTA";
import { PageIntro } from "@/components/PageIntro";
import { SectorDirectory, type SectorDirectoryItem } from "@/components/SectorDirectory";
import { DATASET_META } from "@/data/_meta";
import { sectorGroupFor } from "@/lib/sectorGroups";
import { fallbackSectorActions, sectorProfiles } from "@/lib/sectorProfile";

export const metadata = {
  title: "Sector starting points | Etica ESG Regulatory Atlas",
  description: "Browse ESG regulatory intelligence by sector, business impact, value-chain exposure and source-review risk."
};

export default function SectorsPage() {
  const profiles = sectorProfiles();
  const directoryItems: SectorDirectoryItem[] = profiles.map((profile) => {
    const group = sectorGroupFor(profile.sector);

    return {
      sector: profile.sector,
      slug: profile.slug,
      groupId: group.id,
      groupLabel: group.label,
      groupTrigger: group.trigger,
      directCount: profile.directRecords.length,
      broadCount: profile.broadRecords.length,
      highImpactCount: profile.highImpact.length,
      reviewFlags: profile.reviewFlags,
      marketCount: profile.markets.length,
      sourceBackedCount: profile.sourceBacked,
      totalScoped: profile.scoped.length,
      topMarkets: profile.markets.slice(0, 3).map((market) => market.name),
      topTopics: profile.topics.slice(0, 3),
      priorityRecords: profile.priorityRecords.slice(0, 3).map((regulation) => ({
        id: regulation.id,
        shortName: regulation.shortName
      })),
      firstAction: (profile.requiredActions.length ? profile.requiredActions : fallbackSectorActions())[0]
    };
  });

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Sectors"
          title="Sector starting points for regulatory triage"
          body="Choose a business context first, then move into source-linked records, markets, evidence needs, internal owners and advisory workstreams."
          meta={`${DATASET_META.edition} · current tracked seed coverage, not complete sector legal inventory`}
        />
        <GlossaryHelpCard
          title="Interpret sector coverage carefully"
          body="Sector pages blend direct sector matches with broad all-sector rules. Treat them as first-pass triage before confirming thresholds, entity facts and primary sources."
          compact
        />

        <SectorDirectory sectors={directoryItems} />

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-ink">Need entity-specific context?</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Sector pages are best for exploration. Use the assessment to combine sector with jurisdiction, company type, size, listing status and value-chain exposure.
              </p>
            </div>
            <Link href="/assessment" className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
              Run company assessment
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <MarketBriefingCTA />
        <FooterDisclaimer />
      </div>
    </main>
  );
}
