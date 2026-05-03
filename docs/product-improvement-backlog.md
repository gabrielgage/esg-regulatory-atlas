# Product Improvement Backlog

This backlog captures a project/product manager and ESG specialist review of Etica ESG · Regulatory Atlas as of the Phase 1C MVP. It prioritizes improvements that help users understand global sustainability regulation coverage, likely business relevance, evidence needs, implementation timing and advisory next steps.

The backlog is intentionally split into three waves:

- Wave 1 improves the current static MVP without changing the deployment model.
- Wave 2 deepens regulatory usefulness and client workflow quality while staying mostly static or file-backed.
- Wave 3 introduces operational platform capabilities that require explicit scope approval, data governance and likely authentication or database architecture.

Non-negotiable boundaries still apply: no Stripe, Supabase, authentication, paid APIs, Mapbox, scraping, cron jobs, email alerts, production AI summaries or required environment variables unless the project owner explicitly changes phase.

## May 2026 Commercialization Themes

The deep research assessment adds a commercialization overlay to the backlog:

- Free Atlas remains the public trust surface.
- Premium Intelligence is validated through static alerts, watchlists and market-pack previews.
- Advisory Atlas is the near-term revenue path through exposure scans, custom watchlists, portfolio/supplier maps and client-ready briefings.
- Enterprise/API remains future-state until source governance, demand and infrastructure needs are validated.

## Review Summary

The MVP already has the right core shape: a map-centered workspace, source-linked regulation records, jurisdiction panels, assessment, timeline, briefing, data-quality surfaces, exports, comparison, language toggle and launch checks. The next improvement step is not adding more visual sections to the homepage. The highest-value work is making the existing surfaces more decision-oriented, more accessible, more source-governed and more useful for specific personas such as CSOs, legal teams, procurement leads, finance controllers and ESG advisors.

## Wave 1: Launch Quality And Static MVP Usefulness

Target: next 1 to 4 weeks. Keep the app static and Vercel-simple.

1. **Theme and accessibility QA pass**
   Status: partially delivered in `0.5.3 - May 2026`.
   Improve dark-mode text contrast, default first visit to light mode, verify status badges, warning banners, inputs and source links across core routes.

2. **Map legend and layer explanation upgrade**
   Status: materially delivered through `0.5.3 - May 2026` and `0.5.9 - May 2026`.
   The map now uses local country outlines from tablet widths upward, stronger border contrast, selected/EU overlay cues and fallback behavior. Continue improving interpretation copy as layers become more sophisticated.

3. **Coverage confidence view**
   Status: partially delivered in `0.5.4 - May 2026`.
   Add a map/table mode that distinguishes "record volume" from "source confidence" and "needs review" so users can see where the Atlas is strong versus provisional.

4. **Jurisdiction quick-start cards**
   Add compact starter cards for EU, UK, US, California, Singapore, Australia, Japan, India, China, Brazil, Canada, Mexico and Netherlands with first action prompts.

5. **Persona-specific table presets**
   Add quick filters for CSO, legal/compliance, finance/controller, procurement/supplier, private equity and external advisor personas.

6. **Evidence-needed summaries**
   Status: partially delivered in `0.5.5 - May 2026` and expanded in `0.5.10 - May 2026`.
   Surface the most common evidence requirements per selected regulation or jurisdiction, such as emissions inventory, supplier attestations, board minutes, controls evidence and financial statement links. Assessment results now include evidence, missing facts, suggested owners and next 30-day actions.

7. **Sector-specific starting points**
   Add sector entry filters for financial services, manufacturing, agriculture, energy, real estate, retail, technology and transport.

8. **Translation coverage audit**
   Track which UI strings are translated versus intentionally left as English source-linked regulatory content. Add a process note so future records are not accidentally machine-presented as legal translations.

9. **Minimum market coverage checklist**
   Status: materially delivered in `0.5.9 - May 2026`.
   `data/coverageTargets.ts` defines deep-anchor, core-commercial and watch-expansion direct-record targets. `/data-quality` now shows current depth, target depth, gaps and review risk per jurisdiction.

10. **Data quality review queue refinement**
    Status: partially delivered in `0.5.5 - May 2026`.
    Rank review queue items by high-impact status, upcoming date, missing primary source, source age and likely client demand.

11. **Workbook sync routine**
    Document and automate, where possible, a repeatable static export of website seed data to the regulation tracker workbook so website and review inventory stay aligned.

12. **Client briefing copy polish**
    Status: partially delivered in `0.5.5 - May 2026`.
    Make copied summaries more useful for client conversations by including persona, selected sector, jurisdiction, caveat, priority regulations, evidence needs and first 30-day actions.

## Wave 2: Regulatory Depth And Advisory Workflow

Target: next 1 to 3 months. Still avoid production databases unless the owner changes scope.

13. **Quarter-level regulatory timeline**
    Status: partially delivered in `0.5.5 - May 2026`.
    Convert the timeline into a quarter-based swimlane for effective dates, reporting years, consultation deadlines, first reports and phase-in notes.

14. **Threshold matrix**
    Status: partially delivered in `0.5.10 - May 2026` through threshold and missing-fact decision prompts; structured matrix remains open.
    Add structured threshold fields and a comparison matrix for employee, revenue, balance sheet, listing, financial institution, supply chain and market-exposure triggers.

15. **Penalty and enforcement layer**
    Status: partially delivered in `0.5.10 - May 2026` through enforcement/penalty cue cards; record-level population remains open.
    Add legally cautious penalty/enforcement fields by jurisdiction, with source priority and clear caveats where penalties are implementation-dependent or uncertain.

16. **Regulation maturity axis**
    Add a separate maturity classification, such as voluntary framework, consultation, adopted not yet in force, partially in force, in force, delayed or under review.

17. **Jurisdiction market pages**
    Status: partially delivered in `0.5.5 - May 2026` through richer printable/copyable jurisdiction briefs; standalone market pages remain open.
    Build richer `/jurisdiction/[code]` pages with local regulatory drivers, source confidence, first reporting years, priority sectors and watch items.

37. **Commercial offer architecture**
    Status: partially delivered in `0.5.6 - May 2026`.
    Revenue relevance: Lead-gen, premium alerts, market packs and advisory.
    Add `/plans`, commercial comparison, reusable CTAs and static commercial data so visitors understand Free Atlas, Premium Intelligence, Advisory Atlas and Enterprise/API Future.

38. **Premium alerts preview**
    Status: partially delivered in `0.5.6 - May 2026`.
    Revenue relevance: Premium alerts.
    Add static weekly/monthly digest samples, watchlist options, source-quality legend and request-access CTA without email backend.

39. **Advisory service surface**
    Status: partially delivered in `0.5.6 - May 2026`.
    Revenue relevance: Advisory.
    Add `/advisory` with exposure scans, custom watchlists, portfolio/supplier maps, board/client briefings and market-pack support.

40. **Premium market-pack previews**
    Status: partially delivered in `0.5.6 - May 2026` and expanded with individual sample pages in `0.5.7 - May 2026`.
    Revenue relevance: Market packs.
    Add concrete premium pack concepts and table-of-contents previews for EU, ISSB, supply chain, financial services and portfolio/private equity use cases.

42. **Manual conversion tracking loop**
    Status: partially delivered in `0.5.7 - May 2026`.
    Revenue relevance: Lead-gen, premium alerts, market packs and advisory.
    Track commercial interest through visible CTA routes, mailto subjects and manual review notes before adding analytics, CRM sync, email automation or billing infrastructure.

43. **Marquee launch review queue**
    Status: partially delivered in `0.5.8 - May 2026`.
    Revenue relevance: Trust, premium packs and advisory.
    Maintain a high-value content-review queue for Marquee 10 and Marquee 25 regimes with launch-blocker flags, review questions, premium-use mapping and visible source/status/threshold review needs.

44. **Copyable premium pack briefs**
    Status: partially delivered in `0.5.8 - May 2026`.
    Revenue relevance: Market packs and advisory.
    Make each premium pack sample page copyable and printable so it can be used in advisory conversations and direct outreach without adding PDF generation or document automation.

41. **Feature request intake and scoring**
    Status: partially delivered in `0.5.6 - May 2026`.
    Revenue relevance: Notion Ops / product prioritization.
    Convert deep research, competitor benchmarking, QA findings and monetization hypotheses into tracked feature requests with scoring and MVP-fit controls.

18. **Cross-framework mapping**
    Status: partially delivered in `0.5.4 - May 2026`.
    Map connections among CSRD/ESRS, ISSB, GRI, TNFD, TCFD, GHG Protocol, SFDR and taxonomy requirements so users can spot overlapping data needs.

19. **Private equity portfolio view**
    Status: partially delivered in `0.5.4 - May 2026` through PCAF, PRI and portfolio-oriented quick views; deeper assessment logic remains open.
    Add a portfolio-focused assessment flow that classifies regulations by fund manager obligations, portfolio company obligations, financed emissions and investor-requested data.

20. **Supplier and exporter view**
    Add a value-chain flow for suppliers/exporters exposed to EU, UK, US, deforestation, forced labour, CBAM, batteries, product and green claims rules.

21. **Implementation effort scoring**
    Status: partially delivered before `0.5.4`; master metadata now adds record type, legal force and relevance categories for future scoring improvements.
    Add a non-legal readiness score for effort level, likely functions involved, data maturity needed, assurance/control burden and typical advisory workstreams.

22. **Source freshness dashboard**
    Show source age, next review date, stale-source warnings and owner/reviewer placeholders in a governance-focused data-quality dashboard.

23. **Glossary and regulatory taxonomy page**
    Create a user-facing glossary for terms such as double materiality, value chain, assurance, transition plan, taxonomy alignment, due diligence and financed emissions.

24. **Responsive map refinement**
    Improve mobile/tablet map behavior with a tighter map height, easier selected-jurisdiction drawer, larger tap targets and simplified legend behavior.

## Wave 3: Scaled Platform And Data Operations

Target: later phase only, after explicit approval and product validation.

25. **Database-backed regulation records**
    Move from static files to a governed content store only after data ownership, review workflow and access model are designed.

26. **Admin editing interface**
    Add controlled editing for regulation records, jurisdiction profiles, source links, review dates and changelog entries.

27. **Formal research workflow**
    Add source assignment, review status, legal review checkpoints, reviewer comments, approval history and stale-record escalation.

28. **Authentication and client workspaces**
    Add accounts, saved client views, portfolio-specific assessments and workspace permissions only after the MVP is stable.

29. **Regulatory monitoring pipeline**
    Add monitored sources, update queues and change alerts after the legal/research governance model is ready.

30. **Human-reviewed AI assistance**
    Add AI-assisted summaries or source extraction only with source grounding, confidence indicators, human review and clear non-legal-advice safeguards.

31. **PDF and board-pack exports**
    Add branded report exports for client briefings, board packs, jurisdiction snapshots and portfolio views.

32. **Audit trail and edition diffing**
    Show what changed between dataset editions by regulation, jurisdiction, source, status, date and confidence level.

33. **Role-specific dashboards**
    Create dashboards for CSO, legal, finance, procurement, investor, board and advisor users with different default priorities and evidence needs.

34. **Enterprise integrations**
    Evaluate integrations with ESG data platforms, GRC systems, document repositories and reporting tools only after core data quality stabilizes.

35. **Localization governance**
    Add professional translation workflows, source-language tracking and jurisdiction-specific legal review for multilingual regulatory content.

36. **Commercial packaging**
    Explore paid plans, enterprise workspaces, billing and sales collateral only after product-market validation. Stripe remains out of scope until explicitly requested.

## Recommended Immediate Priority

The next implementation sequence should be:

1. Source-review Marquee 10 and Marquee 25 records used in premium examples.
2. Add missing-facts prompts to assessment results.
   Status: delivered in `0.5.10 - May 2026` as assessment result and copied-shortlist prompts.
3. Prepare LinkedIn, email and direct outreach launch assets from `data/launchAssets.ts`.
   Status: delivered in `0.5.11 - May 2026` through `/launch` copyable asset cards and draft-email actions.
4. Run launch QA across `/`, `/plans`, `/alerts`, `/advisory`, `/premium-roadmap`, `/regulations/[slug]`, `/assessment`, `/data-quality` and `/briefing`.
5. Validate demand manually before adding paid or automated infrastructure.

## Documentation Rule

When an item from this backlog is implemented, update this file, `docs/roadmap.md`, `ESG_Regulatory_Atlas_Claude_Handoff.md` and any affected methodology/legal/taxonomy docs. If an implementation reveals a bug or product defect, also update `docs/issue-resolution-log.md`.
