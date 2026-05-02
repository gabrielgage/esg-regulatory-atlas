export { jurisdictions } from "./jurisdictions";
import { coverageAdditions } from "./coverageAdditions";
import { marketCoverage } from "./marketCoverage";
import { masterRecordEnhancements, masterUpdateAdditions } from "./masterUpdateAdditions";
import { phase1cCoverage } from "./phase1cCoverage";
import { regulations as coreRegulations } from "./regulations";

const baseRegulations = [...coreRegulations, ...coverageAdditions, ...marketCoverage, ...phase1cCoverage, ...masterUpdateAdditions];

export const regulations = baseRegulations.map((regulation) => {
  const enhancement = masterRecordEnhancements[regulation.id];
  if (!enhancement) return regulation;

  return {
    ...regulation,
    ...enhancement,
    aliases: mergeStrings(regulation.aliases, enhancement.aliases),
    childItems: [...(regulation.childItems || []), ...(enhancement.childItems || [])]
  };
});

function mergeStrings(existing: string[] | undefined, additional: string[] | undefined) {
  return Array.from(new Set([...(existing || []), ...(additional || [])]));
}

export {
  advisoryOpportunities,
  businessFunctions,
  businessImpactTypes,
  clientRelevanceCategories,
  clientRelevanceLabel,
  companyTypes,
  legalForceLabel,
  legalForces,
  quickViews,
  recordTypeLabel,
  recordTypes,
  sectors,
  statusLabel,
  topics,
  valueChainImpacts
} from "./taxonomy";
