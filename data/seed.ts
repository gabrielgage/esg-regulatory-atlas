export { jurisdictions } from "./jurisdictions";
import { coverageAdditions } from "./coverageAdditions";
import { marketCoverage } from "./marketCoverage";
import { phase1cCoverage } from "./phase1cCoverage";
import { regulations as coreRegulations } from "./regulations";

export const regulations = [...coreRegulations, ...coverageAdditions, ...marketCoverage, ...phase1cCoverage];

export {
  advisoryOpportunities,
  businessFunctions,
  businessImpactTypes,
  companyTypes,
  quickViews,
  sectors,
  statusLabel,
  topics,
  valueChainImpacts
} from "./taxonomy";
