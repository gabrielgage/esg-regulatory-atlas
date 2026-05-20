"use client";

import { ClipboardList, FileText, GitPullRequestArrow, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/Badge";
import { CopyMarkdownButton } from "@/components/CopyMarkdownButton";
import { reviewIntakeCategories, reviewIntakeFiles, reviewIntakeMarkdown } from "@/data/reviewIntake";

export function ExternalReviewIntakePanel() {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm" data-testid="external-review-intake">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <GitPullRequestArrow className="h-5 w-5 text-teal" />
            <h2 className="font-semibold text-ink">External review intake</h2>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Use this lane to turn Claude, ChatGPT, ESG specialist or legal-risk feedback into the right operating artifact before it becomes code, content or launch copy.
          </p>
        </div>
        <CopyMarkdownButton text={reviewIntakeMarkdown()} label="Copy intake routing" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-teal" />
            <h3 className="text-sm font-semibold text-ink">Review pack files</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Start external review from these repo files instead of raw chat history so feedback inherits the current release, constraints and coverage-review format.
          </p>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-600">
            {reviewIntakeFiles.map((file) => (
              <li key={file} className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono">
                {file}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {reviewIntakeCategories.map((category) => (
            <article key={category.label} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-center gap-2">
                <ClipboardList className="h-4 w-4 text-teal" />
                <h3 className="text-sm font-semibold text-ink">{category.label}</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">{category.description}</p>
              <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600">
                <span className="font-semibold text-ink">Route to: </span>
                {category.destination}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {category.examples.slice(0, 3).map((example) => (
                  <Badge key={example} className="border-slate-200 bg-slate-50 text-slate-600">
                    {example}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <p className="mt-4 flex gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
        External review findings are inputs for product QA, source governance and roadmap triage. They are not legal advice, source verification, official translations, complete coverage or compliance determinations.
      </p>
    </section>
  );
}
