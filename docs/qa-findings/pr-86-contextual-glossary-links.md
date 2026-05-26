# PR 86 QA Finding - Contextual Glossary Term Links

## Finding

Contextual label-help cards linked only to the top-level glossary, so users had to leave the current workflow and manually scan for terms such as legal force, reporting year, seed intelligence, value chain or assurance.

## Risk

Label-heavy regulatory intelligence surfaces can feel more complex than necessary. If users cannot quickly interpret status, timing, source-quality and value-chain terms, they may overread planning labels as legal conclusions or miss source-review caveats.

## Resolution

- Added direct key-term links inside the shared `GlossaryHelpCard`.
- Added stable anchors to each glossary term card on `/glossary`.
- Wired route-specific term IDs into assessment, regulation, Data Quality, timeline, briefing, compare, markets, sectors, jurisdiction and value-chain help cards.
- Added data guardrail coverage so contextual term IDs must match known glossary anchors.
- Added smoke coverage for direct glossary links.

## Prevention Rule

Use `GlossaryHelpCard.termIds` for contextual glossary help, and source all term IDs from `data/glossary.ts`. Do not create route-specific glossary chip systems unless the shared component cannot support the use case.
