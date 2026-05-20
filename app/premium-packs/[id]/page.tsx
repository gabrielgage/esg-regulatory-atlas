import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { Badge } from "@/components/Badge";
import { CommercialCTA } from "@/components/CommercialCTA";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { PrintButton } from "@/components/PrintButton";
import { DATASET_META } from "@/data/_meta";
import { premiumPacks } from "@/data/premiumPacks";
import { regulations } from "@/data/seed";
import { premiumGateSummary, premiumUseGateFor } from "@/lib/premiumUseGates";
import { Regulation } from "@/types/regulation";

export function generateStaticParams() {
  return premiumPacks.map((pack) => ({ id: pack.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pack = premiumPacks.find((item) => item.id === id);
  return {
    title: pack ? `${pack.name} | Etica ESG` : "Premium pack | Etica ESG"
  };
}

export default async function PremiumPackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pack = premiumPacks.find((item) => item.id === id);
  if (!pack) notFound();

  const matchedRegulations = findPackRegulations(pack.includedRegimes);
  const gateSummary = premiumGateSummary(matchedRegulations);
  const markdown = buildPackMarkdown(pack, matchedRegulations);

  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-6xl space-y-5 px-4 py-5 md:px-6">
        <div className="flex flex-col gap-3 print:hidden md:flex-row md:items-center md:justify-between">
          <Link href="/premium-roadmap" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal">
            <ArrowLeft className="h-4 w-4" />
            Back to premium roadmap
          </Link>
          <div className="flex flex-wrap gap-2">
            <PrintButton label="Print pack" />
            <CopyMarkdownButton text={markdown} label="Copy pack brief" />
          </div>
        </div>

        <PageIntro
          eyebrow="Premium pack preview"
          title={pack.name}
          body="A static sample of how a premium market pack could be scoped, reviewed and delivered before billing, gating, accounts or automated monitoring are added."
          meta={`${pack.status.replaceAll("-", " ")} · ${pack.cadence || "on request"} · ${DATASET_META.edition}`}
        />

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-violet/20 bg-violet/10 text-violet">{pack.status.replaceAll("-", " ")}</Badge>
                <Badge className="border-slate-200 bg-slate-50 text-slate-600">{pack.cadence || "on request"}</Badge>
                <Badge className="border-amber-200 bg-amber-50 text-amber-800">Static preview</Badge>
              </div>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-ink">{pack.name}</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This sample pack is designed for validating buyer interest and advisory scope. It shows likely outputs, source-review expectations and sample contents without implying a live paid product or legal applicability determination.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">{pack.disclaimer}</div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard title="Target users" values={pack.targetUsers} />
          <SummaryCard title="Jurisdiction scope" values={pack.jurisdictions} />
          <SummaryCard title="Topic scope" values={pack.topics} />
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm" data-testid="premium-gate-summary">
          <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="text-lg font-semibold text-ink">Premium source-review gates</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The sample pack can mention launch-critical regimes for buyer validation, but blocked or review-needed records must be visibly labelled before they are reused in a premium, client-ready or advisory output.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <GateMetric label="Illustrative only" value={String(gateSummary.blocked.length)} className="border-red-200 bg-red-50 text-red-700" />
              <GateMetric label="Review before use" value={String(gateSummary.review.length)} className="border-amber-200 bg-amber-50 text-amber-800" />
              <GateMetric label="Orientation-ready" value={String(gateSummary.ready.length)} className="border-teal/20 bg-teal/10 text-teal" />
            </div>
          </div>
          {gateSummary.blocked.length || gateSummary.review.length ? (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Records labelled illustrative-only or review-before-use remain suitable for public orientation and pack scoping, but should not be treated as premium-ready until source, status, threshold and timing checks are complete.
            </div>
          ) : null}
        </section>

        <section className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Sample table of contents</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {pack.sampleTableOfContents.map((item, index) => (
                <li key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <span className="font-semibold text-teal">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">What the pack would include</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {pack.outputs.map((output) => (
                <div key={output} className="flex gap-2 rounded-xl border border-slate-200 p-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal" />
                  <span>{output}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-violet/20 bg-violet/10 p-4 text-sm leading-6 text-violet">
              {pack.advisoryExtension}
            </div>
          </section>
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-ink">Regimes included in the sample scope</h2>
              <p className="mt-1 text-sm text-slate-500">Matched records link to the public Atlas; unmatched names remain pack-scope placeholders for content review.</p>
            </div>
            <Link href="/regulations" className="inline-flex items-center gap-2 text-sm font-semibold text-teal underline">
              Open regulations database <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {pack.includedRegimes.map((regime) => {
              const regulation = matchedRegulations.find((item) => matchesRegime(item, regime));
              const gate = regulation ? premiumUseGateFor(regulation) : null;
              return regulation ? (
                <Link key={regime} href={`/regulations/${regulation.id}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4 hover:bg-teal/5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="font-semibold text-ink">{regulation.shortName}</div>
                        {gate ? <Badge className={gate.className}>{gate.label}</Badge> : null}
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">{regulation.summary}</p>
                      {gate && gate.level !== "ready" ? <p className="mt-2 text-xs leading-5 text-slate-500">{gate.body}</p> : null}
                    </div>
                    <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-teal" />
                  </div>
                </Link>
              ) : (
                <div key={regime} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="font-semibold text-ink">{regime}</div>
                  <p className="mt-1 text-sm leading-5 text-slate-500">Pack-scope item to validate during source review.</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <DecisionCard title="Source review posture" body="Primary law, regulator guidance and standard-setter sources should be checked before using this pack for client reliance." />
          <DecisionCard title="Buyer validation signal" body="Track requests by pack name, route and mailto subject before building billing, accounts or email automation." />
          <DecisionCard title="Legal caveat" body="The pack is orientation and planning intelligence. It is not legal, tax, investment or assurance advice." />
        </section>

        <CommercialCTA
          title={`Request the ${pack.name}`}
          body="Use this CTA to validate whether the pack should become a reviewed advisory output, a premium preview, or a later productized intelligence workflow."
          href={pack.ctaHref}
          label={pack.ctaLabel}
          secondaryHref="/advisory"
          secondaryLabel="Advisory options"
        />

        <FooterDisclaimer />
      </div>
    </main>
  );
}

function SummaryCard({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.map((value) => (
          <Badge key={value} className="border-slate-200 bg-slate-50 text-slate-600">
            {value}
          </Badge>
        ))}
      </div>
    </section>
  );
}

function DecisionCard({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
    </section>
  );
}

function GateMetric({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <div className={`rounded-xl border p-4 ${className}`}>
      <div className="text-xs font-semibold uppercase tracking-wide opacity-75">{label}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}

function findPackRegulations(regimeNames: string[]) {
  return regulations.filter((regulation) => regimeNames.some((regime) => matchesRegime(regulation, regime)));
}

function matchesRegime(regulation: Regulation, regime: string) {
  const normalizedRegime = normalize(regime);
  const candidates = [regulation.shortName, regulation.title, ...(regulation.aliases || [])].map(normalize);
  return candidates.some((candidate) => candidate.includes(normalizedRegime) || normalizedRegime.includes(candidate));
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function buildPackMarkdown(pack: (typeof premiumPacks)[number], matchedRegulations: Regulation[]) {
  const regimeLines = pack.includedRegimes.map((regime) => {
    const regulation = matchedRegulations.find((item) => matchesRegime(item, regime));
    if (!regulation) return `- ${regime}: pack-scope item to validate during source review.`;
    const gate = premiumUseGateFor(regulation);
    return `- ${regulation.shortName}: ${regulation.summary} Premium-use gate: ${gate.label}. ${gate.level === "ready" ? "Preserve caveats and source review." : gate.body}`;
  });

  return [
    `# ${pack.name}`,
    "",
    `Publisher: ${DATASET_META.publisher}`,
    `Editor: ${DATASET_META.editor}`,
    `Contact: ${DATASET_META.contactEmail}`,
    `Edition: ${DATASET_META.edition}`,
    "",
    "## Current product state",
    "This is a static premium pack preview for demand validation and advisory scoping. It is not a gated product, automated alert, paid subscription or legal opinion.",
    "",
    "## Target users",
    ...pack.targetUsers.map((item) => `- ${item}`),
    "",
    "## Jurisdiction scope",
    ...pack.jurisdictions.map((item) => `- ${item}`),
    "",
    "## Topic scope",
    ...pack.topics.map((item) => `- ${item}`),
    "",
    "## Sample table of contents",
    ...pack.sampleTableOfContents.map((item, index) => `${index + 1}. ${item}`),
    "",
    "## Expected outputs",
    ...pack.outputs.map((item) => `- ${item}`),
    "",
    "## Regimes included in sample scope",
    ...regimeLines,
    "",
    "## Advisory extension",
    pack.advisoryExtension,
    "",
    "## Optional next step",
    `Request this pack from ${DATASET_META.publisher}: ${DATASET_META.contactEmail}`,
    `Suggested request subject: Etica ESG premium pack request - ${pack.name}`,
    "",
    "## Caveat",
    pack.disclaimer,
    "This pack preview provides structured regulatory intelligence for orientation and planning only. It is not legal, tax, investment or assurance advice. Review primary sources and validate applicability with qualified counsel or regulatory advisors before relying on it for compliance decisions."
  ].join("\n");
}
