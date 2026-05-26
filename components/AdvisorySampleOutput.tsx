import type { ComponentType } from "react";
import { FileCheck2, HelpCircle, ListChecks, SearchCheck } from "lucide-react";
import { advisorySampleMarkdown, type AdvisorySampleOutput as AdvisorySampleOutputType } from "@/data/advisorySampleOutputs";
import { CopyMarkdownButton } from "./CopyMarkdownButton";
import { LegalNotice } from "./LegalNotice";

export function AdvisorySampleOutput({ sample }: { sample: AdvisorySampleOutputType }) {
  return (
    <section data-testid="advisory-sample-output" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
      <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-teal dark:text-mint">Sample output</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink dark:text-white">{sample.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{sample.scenario}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {sample.audience.map((audience) => (
              <span key={audience} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                {audience}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <CopyMarkdownButton text={advisorySampleMarkdown(sample)} label="Copy sample scan" />
          </div>
          <LegalNotice compact tone="slate" className="mt-4">
            {sample.caveat}
          </LegalNotice>
        </div>

        <div className="grid gap-3">
          <SamplePanel icon={HelpCircle} title="Priority questions" values={sample.priorityQuestions} />
          <SamplePanel icon={SearchCheck} title="Facts to confirm" values={sample.factsToConfirm} />
          <SamplePanel icon={FileCheck2} title="Evidence package" values={sample.evidencePackage} />
          <SamplePanel icon={ListChecks} title="First 30-day actions" values={sample.firstActions} />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
        <h3 className="text-sm font-semibold text-ink dark:text-white">Priority record scan</h3>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {sample.priorityRecords.map((record) => (
            <article key={record.label} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/70">
              <h4 className="text-sm font-semibold text-ink dark:text-white">{record.label}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{record.whyItAppears}</p>
              <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Source to verify: <span className="font-semibold text-slate-700 dark:text-slate-200">{record.sourceToVerify}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SamplePanel({
  icon: Icon,
  title,
  values
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  values: string[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-teal dark:text-mint" />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</h3>
      </div>
      <ul className="mt-3 space-y-2 text-sm leading-5 text-slate-600 dark:text-slate-300">
        {values.slice(0, 4).map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
