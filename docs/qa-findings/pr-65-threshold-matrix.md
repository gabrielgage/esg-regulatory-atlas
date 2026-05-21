# PR #65 - Threshold Matrix For High-Value Records

## Finding

The May 20 expert review identified threshold and scope interpretation as one of the largest remaining trust risks. Threshold-sensitive regimes such as CSRD, CSDDD, SFDR, EU Taxonomy, EUDR, California climate disclosure and ISSB adoption need a visible review lane before they appear in assessment, premium-preview or advisory contexts.

## Root Cause

Threshold facts were present in individual regulation records and decision-readiness panels, but users had to open records one by one. The product did not yet provide a single matrix showing which facts to confirm, which source to verify and which records are review-before-use or date-sensitive.

## Resolution

- Added `/thresholds` as a public, source-linked threshold matrix.
- Added `data/thresholdMatrix.ts` with threshold type, threshold signal, facts to confirm, timing signal, source to verify, review status, confidence and caveat.
- Added Data Quality and regulation-detail links to the matrix.
- Added data guardrail checks for threshold matrix row integrity.

## Prevention Rule

When adding or changing high-value records, update the threshold matrix if the record depends on entity size, listing status, financial-market role, market nexus, product/trade exposure, value-chain role or jurisdictional adoption. Keep the row caveated and source-linked.

## Caveat

Threshold rows are seed planning signals. They are not legal advice, source verification, official translations, legal opinions, client-ready scope findings or compliance determinations.

