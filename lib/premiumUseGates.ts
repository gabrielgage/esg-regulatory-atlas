import { marqueeReviewItems } from "@/data/contentReview";
import type { Regulation } from "@/types/regulation";

export type PremiumUseGateLevel = "ready" | "review-before-use" | "illustrative-only";

export type PremiumUseGate = {
  level: PremiumUseGateLevel;
  label: string;
  body: string;
  className: string;
};

export function premiumUseGateFor(regulation: Regulation): PremiumUseGate {
  const reviewItem = marqueeReviewItems.find((item) => item.id === regulation.id);

  if (reviewItem?.premiumUseBlockedUntilReviewed) {
    return {
      level: "illustrative-only",
      label: "Illustrative only",
      body: "This record is blocked from premium use until source, status and threshold review is complete. It can appear in the sample scope only with this caveat.",
      className: "border-red-200 bg-red-50 text-red-700"
    };
  }

  if (reviewItem?.launchBlocker || (reviewItem && reviewItem.status !== "source-ready")) {
    return {
      level: "review-before-use",
      label: "Review before premium use",
      body: "Use this record for free Atlas orientation only until source, status, threshold and timing checks are complete for the selected pack context.",
      className: "border-amber-200 bg-amber-50 text-amber-800"
    };
  }

  if (regulation.dataQualityStatus !== "verified_seed" || regulation.confidenceLevel !== "high") {
    return {
      level: "review-before-use",
      label: "Review source status",
      body: "This seed record should be reviewed before it is reused in a client-ready premium or advisory output.",
      className: "border-amber-200 bg-amber-50 text-amber-800"
    };
  }

  return {
    level: "ready",
    label: "Orientation-ready seed",
    body: "This record can support source-linked Atlas orientation with caveats. Confirm entity facts and primary sources before client reliance.",
    className: "border-teal/20 bg-teal/10 text-teal"
  };
}

export function premiumGateSummary(regulations: Regulation[]) {
  const gates = regulations.map((regulation) => ({ regulation, gate: premiumUseGateFor(regulation) }));
  return {
    gates,
    blocked: gates.filter(({ gate }) => gate.level === "illustrative-only"),
    review: gates.filter(({ gate }) => gate.level === "review-before-use"),
    ready: gates.filter(({ gate }) => gate.level === "ready")
  };
}
