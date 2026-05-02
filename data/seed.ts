export { jurisdictions } from "./jurisdictions";
import { coverageAdditions } from "./coverageAdditions";
import { marketCoverage } from "./marketCoverage";
import { regulations as coreRegulations } from "./regulations";

export const regulations = [...coreRegulations, ...coverageAdditions, ...marketCoverage];

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
