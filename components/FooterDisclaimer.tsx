"use client";

import Link from "next/link";
import { DATASET_META } from "@/data/_meta";
import { formatDate } from "@/lib/utils";
import { LegalNotice } from "./LegalNotice";
import { useLanguage } from "./LanguageProvider";

export function FooterDisclaimer() {
  const { t } = useLanguage();

  return (
    <footer className="rounded-2xl border border-slate-200 bg-white p-5 text-xs leading-6 text-slate-500 shadow-sm dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-400">
      <p className="font-semibold text-ink dark:text-white">
        Dataset last reviewed: {formatDate(DATASET_META.lastReviewed)}. Edition {DATASET_META.edition}.
      </p>
      <div className="mt-2 flex items-start gap-2">
        <img className="mt-0.5 h-6 w-6 shrink-0" src="/etica-esg-logo.svg" alt="" />
        <p>
          {DATASET_META.byline} Contact:{" "}
          <a className="text-teal underline dark:text-mint" href={`mailto:${DATASET_META.contactEmail}`}>
            {DATASET_META.contactEmail}
          </a>
          . <Link className="text-teal underline dark:text-mint" href="/about">About Etica ESG</Link>.
        </p>
      </div>
      <p className="mt-2">
        LinkedIn:{" "}
        <a className="text-teal underline dark:text-mint" href={DATASET_META.linkedinUrl} target="_blank" rel="noreferrer">
          linkedin.com/in/gabrielgage
        </a>
      </p>
      <LegalNotice compact tone="slate" className="mt-3">
        <p>
          <strong className="text-ink dark:text-white">{t("disclaimer.fullLabel")} </strong>
          {t("disclaimer.full")}
        </p>
      </LegalNotice>
    </footer>
  );
}
