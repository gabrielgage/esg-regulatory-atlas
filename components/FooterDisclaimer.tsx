"use client";

import Link from "next/link";
import { DATASET_META } from "@/data/_meta";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";

export function FooterDisclaimer() {
  const { t } = useLanguage();

  return (
    <footer className="rounded-2xl border bg-white p-5 text-xs leading-6 text-slate-500 shadow-sm">
      <p className="font-semibold text-ink">
        Dataset last reviewed: {formatDate(DATASET_META.lastReviewed)}. Edition {DATASET_META.edition}.
      </p>
      <div className="mt-2 flex items-start gap-2">
        <img className="mt-0.5 h-6 w-6 shrink-0" src="/etica-esg-logo.svg" alt="" />
        <p>
          {DATASET_META.byline} Contact:{" "}
          <a className="text-teal underline" href={`mailto:${DATASET_META.contactEmail}`}>
            {DATASET_META.contactEmail}
          </a>
          . <Link className="text-teal underline" href="/about">About Etica ESG</Link>.
        </p>
      </div>
      <p className="mt-2">
        LinkedIn:{" "}
        <a className="text-teal underline" href={DATASET_META.linkedinUrl} target="_blank" rel="noreferrer">
          linkedin.com/in/gabrielgage
        </a>
      </p>
      <p className="mt-3">
        <strong className="text-ink">{t("disclaimer.fullLabel")} </strong>
        {t("disclaimer.full")}
      </p>
    </footer>
  );
}
