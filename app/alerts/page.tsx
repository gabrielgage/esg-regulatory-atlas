import { Bell, CalendarClock, Eye, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { CopyOutputNote } from "@/components/CopyOutputNote";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { FooterDisclaimer } from "@/components/FooterDisclaimer";
import { PageIntro } from "@/components/PageIntro";
import { Badge } from "@/components/Badge";
import { CommercialCTA } from "@/components/CommercialCTA";
import { ManualRequestPanel } from "@/components/ManualRequestPanel";
import { alertDigestPreviews, alertRequestHref, alertWatchlistOptions, sourceQualityLegend } from "@/data/alertDigests";
import { buildAlertDigestMarkdown } from "@/lib/alertDigestBrief";

const frequencyLabel = {
  weekly: "Weekly",
  monthly: "Monthly",
  "urgent-watchlist": "Urgent watchlist"
};

const sourceClass = {
  primary: "border-teal/20 bg-teal/10 text-teal",
  "regulator-guidance": "border-blue-200 bg-blue-50 text-blue-700",
  "standard-setter": "border-violet/20 bg-violet/10 text-violet",
  secondary: "border-slate-200 bg-slate-50 text-slate-600",
  "needs-review": "border-amber-200 bg-amber-50 text-amber-800"
};

export default function AlertsPage() {
  return (
    <main id="main-content" className="min-h-screen pb-12">
      <Header />
      <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 md:px-6">
        <PageIntro
          eyebrow="Alerts preview"
          title="Premium ESG regulatory alert previews"
          body="Preview weekly and monthly ESG regulatory intelligence formats before production alert infrastructure exists. This page validates demand for watchlists, digests and editorial workflows."
          meta="No automated email backend, cron job, scraping pipeline, account system or paid alert product is live in this MVP."
        />
        <DisclaimerBanner />

        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1fr_.9fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-teal">
                <Bell className="h-4 w-4" />
                Editorial preview, not production monitoring
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">What paid regulatory intelligence could feel like</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Alert concepts are intentionally static in May 2026. The goal is to learn which jurisdictions, sectors, topics and personas users want to track before adding email operations, unsubscribe mechanics, source monitoring, legal review workflow or billing.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <Metric icon={CalendarClock} label="Formats" value="Weekly + monthly" />
              <Metric icon={Eye} label="Watchlists" value={`${alertWatchlistOptions.length} previews` } />
              <Metric icon={ShieldCheck} label="Legal posture" value="Source review first" />
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {alertDigestPreviews.map((digest) => (
            <article key={digest.id} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  <Badge className="border-teal/20 bg-teal/10 text-teal">{frequencyLabel[digest.frequency]}</Badge>
                  <Badge className="border-slate-200 bg-slate-50 text-slate-600">{digest.audience.slice(0, 2).join(" / ")}</Badge>
                </div>
                <CopyMarkdownButton text={buildAlertDigestMarkdown(digest)} label="Copy digest preview" />
              </div>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-ink">{digest.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Jurisdictions: {digest.jurisdictions.join(", ")}. Topics: {digest.topics.join(", ")}.
              </p>
              <CopyOutputNote className="mt-2" />
              <div className="mt-4 space-y-3">
                {digest.sampleItems.map((item) => (
                  <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-semibold text-ink">{item.title}</h3>
                      <Badge className={sourceClass[item.sourceQuality]}>{item.sourceQuality.replace("-", " ")}</Badge>
                    </div>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{item.statusLabel}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.whyItMatters}</p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <MiniBlock title="Who should monitor" body={item.whoShouldMonitor.join(", ")} />
                      <MiniBlock title="Recommended next action" body={item.recommendedAction} />
                    </div>
                    {item.advisoryNote ? <p className="mt-3 text-sm leading-6 text-slate-500">{item.advisoryNote}</p> : null}
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">{digest.disclaimer}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Watchlist concepts</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">These are candidate premium watchlists to validate manually before any email product exists.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {alertWatchlistOptions.map((option) => (
                <Badge key={option} className="border-slate-200 bg-slate-50 text-slate-600">
                  {option}
                </Badge>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Source-quality legend</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {sourceQualityLegend.map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold text-ink">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        <ManualRequestPanel
          title="Request a sample alert preview"
          body="Tell Etica which jurisdiction, topic, sector or persona watchlist would be most useful. This validates editorial demand before production monitoring or email automation exists."
          subject="Etica ESG alert preview request"
          requestType="a sample ESG regulatory alert preview"
          whatToSend={["Preferred frequency: weekly, monthly or urgent watchlist", "Jurisdictions, topics, sectors or personas to monitor", "Example business decision the alert should support", "Whether the output is for internal, board, client or portfolio use"]}
          whatEticaReturns={["Sample digest framing", "Candidate watchlist structure", "Source-review and confidence caveats", "Recommended manual monitoring next step"]}
        />

        <CommercialCTA
          eyebrow="Request access"
          title="Tell us which watchlist would be worth paying for"
          body="Request a sample digest or design-partner preview. The current flow is manual and editorial; production monitoring and automated email delivery are future-state only."
          href={alertRequestHref}
          label="Request alert preview"
          secondaryHref="/plans"
          secondaryLabel="Compare options"
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

function MiniBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg bg-white p-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</div>
      <p className="mt-1 text-sm leading-5 text-slate-600">{body}</p>
    </div>
  );
}
