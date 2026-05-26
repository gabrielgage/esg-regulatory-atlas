# Legal Safeguards

## Purpose

Etica ESG · Regulatory Atlas provides structured regulatory intelligence for orientation and planning. It must not present itself as legal advice, tax advice, investment advice, assurance advice, or a definitive compliance determination.

The legal safeguard approach is based on clear disclaimers, cautious wording, visible source quality, and consistent uncertainty labels.

## Core Disclaimer

Use this short disclaimer in persistent or prominent surfaces:

> This tool provides structured regulatory intelligence for orientation and planning purposes. It does not constitute legal, tax, investment or assurance advice. Applicability depends on entity-specific facts, jurisdictional implementation, sector rules, thresholds and legal interpretation.

Use the fuller disclaimer in footer, methodology, and detail surfaces:

> Etica ESG · Regulatory Atlas provides structured ESG and sustainability regulatory intelligence for orientation and planning purposes only. It is not legal, tax, investment or assurance advice. Applicability depends on entity-specific facts, jurisdictional implementation, sector rules, thresholds, and legal interpretation. Users should validate requirements with qualified counsel or regulatory advisors before relying on the information for compliance decisions.

## Implementation Convention

As of `0.5.66 - May 2026`, recurring caveat text should start from `data/legalNotices.ts`, and recurring visual disclaimer blocks should use `components/LegalNotice.tsx`.

Use the shared source for:

- persistent short disclaimers
- footer or full-route legal notices
- copied-output notes
- manual request caveats
- commercial-preview caveats
- generic seed-record caveats

Route-specific caveats, localized disclaimer strings and regulation-specific caveats can remain local when the wording truly needs to vary. New one-off caveat text should be avoided unless the product surface has a distinct legal or source-governance risk that the shared notices do not cover.

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

Assessment outputs may show review priority, evidence to collect, functions involved and source-to-verify guidance. These are planning prompts only. They must not be worded as compliance instructions, legal conclusions or final applicability decisions.

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

## Commercial Page Safeguards

Commercial pages such as `/plans`, `/alerts`, `/advisory`, `/premium-roadmap` and `/premium-packs/[id]` must make the current product state clear:

- Free Atlas is public regulatory intelligence for orientation and planning.
- Premium Intelligence is a static preview until production alert, billing and account infrastructure are explicitly approved.
- Advisory Atlas is manual advisory support and does not replace qualified legal, tax, investment or assurance advice.
- Enterprise/API is future-state only.

Do not imply that paid subscriptions, automated alerts, email monitoring, accounts, workspaces, API access, billing or gated content are live unless those systems are actually implemented and approved.

Manual conversion tracking must remain transparent and lightweight during the static MVP. Do not add analytics SDKs, cookies, CRM sync, account tracking, billing events or hidden user profiling without explicit approval.

Content review queues must be described as editorial/source-governance tools. Do not imply that a record is legally complete, verified for client reliance or definitively applicable because it appears in a Marquee review list.

Assessment missing-fact prompts, suggested owners and next 30-day actions must be described as planning prompts. They do not determine applicability, confirm compliance duties or replace qualified legal review.

Decision-readiness gates, facts-to-confirm lists, evidence packages, source-review steps and premium-use blockers are governance controls for source review and advisory scoping. They must not be described as legal verification, premium certification, complete source review or definitive applicability.

Source evidence trails, source freshness labels and copied source-review memos are also governance controls. They may identify which source to check and which facts to confirm, but they must not imply that Etica ESG has completed legal review, certified source completeness, translated legal text officially or confirmed applicability.

Review workflow CSV/JSON exports and copied priority review packets are operational tracker outputs. They can be moved into Notion, spreadsheets or advisory prep, but they must keep their caveat and should not be treated as legal opinions, official translations, legal verification, source completeness certification or compliance determinations.

## Alert Preview Safeguards

Alert previews must use wording such as:

- "sample digest"
- "static preview"
- "request access"
- "design-partner preview"
- "manual editorial workflow"
- "production monitoring is not live"

Avoid saying "we monitor all changes," "real-time alerts," "guaranteed updates," or "complete regulatory monitoring" unless a governed monitoring operation exists.

## Advisory Safeguards

Advisory pages and CTAs may describe exposure scans, watchlists, source review, portfolio/supplier maps and briefings. They must remain careful:

- use "potentially relevant," "indicative," "source-linked," "planning," and "validate with qualified counsel"
- avoid "we determine what applies" or "we guarantee compliance"
- include caveats in copied summaries, briefs and request flows

## Premium Pack Safeguards

Premium pack previews may show sample tables of contents, outputs and regimes. They must not imply that gated production content exists. Each pack should state that source, date, threshold and jurisdiction-specific applicability should be reviewed before client reliance.

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
- Source freshness and review-blocker signals
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
- Commercial preview caveats that separate free, premium-preview, advisory and future enterprise functionality
- Launch-asset caveats that preserve manual-validation, no-production-monitoring and no-legal-advice language when copy is reused outside the site

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

Copyable launch assets must also preserve commercial caveats. They may invite feedback, premium-preview interest or advisory conversations, but they must not imply that paid subscriptions, automated alerts, account features or production monitoring are live.

Source-governance labels such as "source-ready seed", "premium use blocked", "stale source" or "missing primary source" are editorial controls for review prioritization. They must not be framed as legal verification, official source approval or complete legal review.

Copyable source-review memos must preserve the non-legal-advice caveat, source links, review timing and facts-to-confirm language. They are suitable for research workflow notes, not final legal opinions.

Review workflow exports must preserve the non-legal-advice caveat, source posture, priority source, facts to confirm, evidence needed and next-review action fields. If a reviewer copies the export into another tracker, the caveat and source-review action should stay attached to the row.

Decision-readiness labels such as "orientation-ready seed", "review before client use" and "premium use blocked" are also editorial controls. They indicate review posture for the static seed record, not whether a business is in or out of scope.

These outputs may help plan review or advisory work, but they should not say or imply that:

- all applicable laws have been identified
- a company is definitively in or out of scope
- a date is a final compliance deadline for a specific entity
- the output is a legal opinion

Client summaries and jurisdiction briefs may include first 30-day actions and evidence packages when phrased as readiness planning steps. Avoid imperative legal language such as "you must file" or "you are required to comply"; use "confirm", "review", "prepare", "assign" and "validate" instead.

## Context Maintenance

When legal wording, disclaimers, assessment categories or copy/export behavior changes, update this file and the relevant UI text in the same pass.
