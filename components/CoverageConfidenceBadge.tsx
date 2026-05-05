import { Badge } from "@/components/Badge";
import { coverageConfidenceClass, coverageConfidenceLabel, type CoverageConfidenceLevel } from "@/lib/coverageConfidence";

export function CoverageConfidenceBadge({ level }: { level: CoverageConfidenceLevel }) {
  return <Badge className={coverageConfidenceClass(level)}>{coverageConfidenceLabel[level]}</Badge>;
}
