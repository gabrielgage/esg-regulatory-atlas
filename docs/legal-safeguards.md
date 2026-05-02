# Legal Safeguards

## Purpose

Etica ESG · Regulatory Atlas provides structured regulatory intelligence for orientation and planning. It must not present itself as legal advice, tax advice, investment advice, assurance advice, or a definitive compliance determination.

The legal safeguard approach is based on clear disclaimers, cautious wording, visible source quality, and consistent uncertainty labels.

## Core Disclaimer

Use this short disclaimer in persistent or prominent surfaces:

> This tool provides structured regulatory intelligence for orientation and planning purposes. It does not constitute legal, tax, investment or assurance advice. Applicability depends on entity-specific facts, jurisdictional implementation, sector rules, thresholds and legal interpretation.

Use the fuller disclaimer in footer, methodology, and detail surfaces:

> Etica ESG · Regulatory Atlas provides structured ESG and sustainability regulatory intelligence for orientation and planning purposes only. It is not legal, tax, investment or assurance advice. Applicability depends on entity-specific facts, jurisdictional implementation, sector rules, thresholds, and legal interpretation. Users should validate requirements with qualified counsel or regulatory advisors before relying on the information for compliance decisions.

## Approved Language

Use language that reflects uncertainty and context:

- "may apply"
- "may be relevant"
- "potentially relevant"
- "indicative"
- "subject to thresholds"
- "depending on entity-specific facts"
- "based on the available seed record"
- "review the linked source"
- "confirm with qualified counsel or regulatory advisors"
- "orientation and planning"

## Avoided Language

Avoid language that implies a legal determination:

- "this applies to your company"
- "you must comply"
- "definitive requirement"
- "complete coverage"
- "verified legal advice"
- "legally required for you"
- "guaranteed compliance"
- "all applicable regulations"
- "final determination"

## Assessment Wizard Categories

The assessment wizard should use these categories:

- Potentially directly relevant
- Potentially indirectly relevant
- Relevant through investors or customers
- Monitor only

Do not use "Likely directly applicable" unless threshold logic, source verification, and legal review support the statement. For the MVP, safer wording is preferred.

## Regulation Detail Caveat

Each regulation detail surface should include a caveat similar to:

> This record is seed regulatory intelligence and may be incomplete. Review the linked primary sources and confirm applicability before using it for compliance decisions.

## Client Summary Caveat

Any copied or exported summary should include:

> This summary is indicative and based on static seed data. It does not constitute legal advice or a definitive applicability determination.

Filtered CSV/JSON exports should be treated as data extracts from illustrative seed records, not as validated legal inventories.

## Language Toggle Safeguard

The language toggle translates product chrome, filters, table controls, map guidance, disclaimer guidance and navigation. It does not create legally reviewed translations of regulatory record content.

Do not describe the product as providing official legal translations. If deeper localization is added later, it should include source-language review, translation review and jurisdiction-specific legal review.

## Source Uncertainty

When source certainty is incomplete:

- Show a lower confidence level.
- Mark the record as `needs-review`, `source-missing`, `date-uncertain`, or `seed-data`.
- Avoid strong applicability conclusions.
- Prefer "monitor" or "potentially relevant" language.

## Jurisdiction Caveats

Some regulation depends on local transposition, regulator guidance, sector-specific rules, thresholds, phase-in dates, and entity facts. Jurisdiction panels should frame summaries as an orientation layer, not a final legal position.

## Visual Safeguards

The UI should reinforce caution through:

- Persistent short disclaimer
- Footer disclaimer
- Source links
- Confidence badges
- Data quality badges
- Last reviewed dates
- Caveats in detail pages
- Clear distinction between seed data and verified data
- Copy/export disclaimers
- Language caveat where useful, especially when users may assume translated legal content
- Citation blocks that identify edition and publisher
- Edition snapshot routes that make version context explicit
- Public update log and dataset edition metadata

## Review Checklist For New Features

Before shipping a new feature, confirm:

- It does not claim legal certainty.
- It preserves disclaimers and caveats.
- It exposes sources where regulatory claims are made.
- It distinguishes seed data from verified data.
- It avoids implying the tool has reviewed all relevant laws.
- It does not personalize legal advice beyond cautious, indicative filtering.

## Copy, Export And Briefing Safeguards

Copyable assessment summaries, client planning summaries and jurisdiction briefs must include a caveat that the output is indicative and based on static seed data.

These outputs may help plan review or advisory work, but they should not say or imply that:

- all applicable laws have been identified
- a company is definitively in or out of scope
- a date is a final compliance deadline for a specific entity
- the output is a legal opinion

## Context Maintenance

When legal wording, disclaimers, assessment categories or copy/export behavior changes, update this file and the relevant UI text in the same pass.
