export { jurisdictions } from "./jurisdictions";
import { coverageAdditions } from "./coverageAdditions";
import { regulations as coreRegulations } from "./regulations";

export const regulations = [...coreRegulations, ...coverageAdditions];

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
