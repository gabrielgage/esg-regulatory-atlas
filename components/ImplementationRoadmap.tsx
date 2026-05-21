import { CalendarClock, ClipboardList, FileCheck2 } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { CopyOutputNote } from "@/components/CopyOutputNote";
import { implementationRoadmapFor, implementationRoadmapMarkdown } from "@/lib/implementationRoadmap";
import type { Regulation } from "@/types/regulation";

export function ImplementationRoadmap({
  regulation,
  allRegulations = [],
  compact = false
}: {
  regulation: Regulation;
  allRegulations?: Regulation[];
  compact?: boolean;
}) {
  const roadmap = implementationRoadmapFor(regulation, allRegulations);
  const markdown = implementationRoadmapMarkdown(regulation, allRegulations);

  return (
    <section
      data-testid="implementation-roadmap"
      className={compact ? "rounded-2xl border border-slate-200 bg-slate-50 p-5" : "rounded-2xl border bg-white p-6 text-sm leading-6 text-slate-700 shadow-sm"}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-teal" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-ink">Implementation roadmap</h2>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
            A cautious 30/60/90-day planning path for source review, owner assignment, evidence preparation and briefing.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <CopyMarkdownButton text={markdown} label="Copy roadmap" />
          <CopyOutputNote className="max-w-xs sm:text-right" />
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <MiniCard title="Suggested owner" body={roadmap.owner} />
        <MiniCard title="Source to verify" body={roadmap.sourceToVerify} />
        <MiniCard title="Source posture" body={roadmap.sourcePosture} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {roadmap.stages.map((stage) => (
          <article key={stage.timeframe} className="rounded-2xl border border-slate-200 bg-white p-4">
            <Badge className="border-teal/20 bg-teal/10 text-teal">{stage.timeframe}</Badge>
            <h3 className="mt-3 font-semibold text-ink">{stage.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{stage.intent}</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              {stage.actions.map((action) => (
                <li key={action} className="rounded-xl bg-slate-50 px-3 py-2">
                  {action}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_.8fr]">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <FileCheck2 className="h-4 w-4 text-teal" aria-hidden="true" />
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Evidence focus</h3>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {roadmap.evidenceFocus.map((item) => (
              <Badge key={item} className="border-slate-200 bg-white text-slate-600">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" aria-hidden="true" />
            <h3 className="text-xs font-semibold uppercase tracking-wide">Roadmap caveat</h3>
          </div>
          <p className="mt-2">{roadmap.caveat}</p>
        </div>
      </div>
    </section>
  );
}

function MiniCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-ink">{body}</p>
    </div>
  );
}
