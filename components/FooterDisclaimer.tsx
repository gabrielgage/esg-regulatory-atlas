import Link from "next/link";
import { DATASET_META } from "@/data/_meta";
import { formatDate } from "@/lib/utils";

export function FooterDisclaimer() {
  return (
    <footer className="rounded-2xl border bg-white p-5 text-xs leading-6 text-slate-500 shadow-sm">
      <p className="font-semibold text-ink">
        Dataset last reviewed: {formatDate(DATASET_META.lastReviewed)}. Edition {DATASET_META.edition}.
      </p>
      <p className="mt-2">
        {DATASET_META.byline} Contact:{" "}
        <a className="text-teal underline" href={`mailto:${DATASET_META.contactEmail}`}>
          {DATASET_META.contactEmail}
        </a>
        . <Link className="text-teal underline" href="/about">About this radar</Link>.
      </p>
      <p className="mt-3">
        <strong className="text-ink">Legal and data disclaimer: </strong>
        This site provides structured ESG and sustainability regulatory intelligence for orientation and planning purposes only.
        It is not legal, tax, investment or assurance advice. Applicability depends on entity-specific facts, jurisdictional
        implementation, sector rules and legal interpretation. Users should validate requirements with qualified counsel or
        regulatory advisors before relying on the information for compliance decisions.
      </p>
    </footer>
  );
}
