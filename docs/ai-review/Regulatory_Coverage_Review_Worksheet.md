# Regulatory Coverage Review Worksheet

Date prepared: 2026-05-20  
Product: Etica ESG · Regulatory Atlas  
Current review-pack context: `0.5.41 - May 2026`  
Purpose: Give an external AI reviewer, ESG specialist, legal reviewer or research analyst a structured way to identify regulatory coverage gaps, source gaps and launch-readiness risks.

## How To Use This Worksheet

Use this worksheet with the companion files:

- `ESG_Regulatory_Atlas_AI_Review_Export_2026-05-20.md`
- `AI_Reviewer_Feedback_Prompt.md`
- `Future_Capabilities_Deep_Review_Backlog.md`

Review the Atlas as seed regulatory intelligence, not as legal advice or complete legal coverage. The useful output is not a legal opinion. The useful output is a prioritized list of records, markets, source links, thresholds, dates, caveats and user-facing explanations that should be improved before launch, premium-pack use or advisory reuse.

## Review Questions

For each market or regulation, answer:

1. Is the current Atlas coverage commercially credible for orientation?
2. Are the most important national, regional, supranational or market rules represented?
3. Are the source links official or sufficiently authoritative for seed intelligence?
4. Are the status, dates, thresholds and applicability caveats clear enough?
5. Would a user understand that this is not legal advice or complete coverage?
6. Should this record be blocked from premium examples until source review improves?
7. What is the next smallest improvement that would materially increase trust?

## Coverage Review Fields

Use these columns in a spreadsheet, Notion table or AI-generated review output:

| Field | Description |
| --- | --- |
| Market / jurisdiction | Country, subnational market, region, supranational body or international framework context. |
| Regulation / framework | Official title or common name. |
| Current Atlas record id | Existing record id if present; use `missing` if absent. |
| Record relationship | Direct, inherited, parent, child, watchlist, framework or missing. |
| Current status | In force, partially in force, adopted, consultation, voluntary, delayed, monitor item or unknown. |
| Source quality | Primary law, regulator guidance, standard setter, government announcement, professional body, secondary commentary, internal analysis or source missing. |
| Source gap | Missing primary source, missing regulator guidance, stale source, source behind PDF, unclear source date or none. |
| Applicability gap | Missing threshold, missing sector scope, missing company-size trigger, missing non-domestic trigger, missing financial-market participant trigger or unclear. |
| Timing gap | Missing effective date, first reporting year, due date, consultation deadline, phase-in note or date caveat. |
| Evidence gap | Missing data/evidence requirements, suggested internal owner, system/data source, assurance/control implications or next actions. |
| Legal-risk gap | Overclaiming, weak caveat, unclear legal force, unclear transposition, source uncertainty or official translation issue. |
| UX gap | Hard to find, hard to compare, too many chips, weak copy, inaccessible badge, poor mobile behavior or confusing map signal. |
| Reviewer recommendation | Concrete action in one or two sentences. |
| Priority | P0 launch blocker, P1 important, P2 useful, P3 later. |
| Premium-use blocked? | Yes if this should not be used in paid/premium sample content until reviewed. |
| Suggested source to verify | URL or description of source to inspect next. |
| Notes | Anything else the reviewer should preserve. |

## High-Priority Markets For Coverage Review

Start with these markets because they are commercially important, frequently requested or currently useful in demos:

- European Union
- United Kingdom
- United States
- California
- Canada
- Netherlands
- Germany
- France
- Norway
- Switzerland
- Australia
- Singapore
- Hong Kong
- Japan
- India
- China
- Brazil
- Mexico
- South Africa
- South Korea
- Taiwan
- New Zealand
- Malaysia
- Indonesia
- Thailand
- Philippines

## Launch-Critical Regimes To Review First

These should be high-confidence, source-linked and clearly caveated before they are used in launch claims, premium pack examples or advisory sales conversations:

1. CSRD / ESRS
2. ISSB IFRS S1/S2 and jurisdiction adoption
3. EU Taxonomy
4. SFDR
5. CSDDD
6. EUDR
7. CBAM
8. California SB 253 / SB 261
9. UK SDR, anti-greenwashing rule and UK SRS development
10. SEC climate disclosure status and alternatives

## Suggested Reviewer Output Format

Return findings in this structure:

```markdown
## Executive Verdict

- Launch confidence:
- Main concern:
- Highest-ROI next fix:

## P0 Findings

| Finding | Why it matters | Recommended fix | Affected page/data | Premium-use blocked? |
| --- | --- | --- | --- | --- |

## P1 Findings

| Finding | Why it matters | Recommended fix | Affected page/data | Premium-use blocked? |
| --- | --- | --- | --- | --- |

## Coverage Gaps By Market

| Market | Current issue | Regulation/source to add or review | Priority |
| --- | --- | --- | --- |

## Legal And Trust Wording Issues

| Wording or surface | Risk | Safer wording |
| --- | --- | --- |

## Next 10 Implementation Tickets

1. 
2. 
3. 
```

## Legal And Data Caveat

This worksheet supports product QA, research planning and source-governance review. It does not create legal advice, legal verification, official translation, complete regulatory coverage or entity-specific applicability determinations. Any regulatory finding intended for compliance reliance should be reviewed against primary sources and qualified legal or regulatory advice.
