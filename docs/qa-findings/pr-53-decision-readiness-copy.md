# PR 53 - Decision Readiness Checklist Copy

Date: 2026-05-18

## Finding

Regulation detail pages already showed decision-readiness controls, but the checklist could not be copied as a complete research handoff. Users could copy source memos and citations, while the decision-readiness output still required manual transcription.

## Why It Matters

Decision readiness is one of the Atlas surfaces most likely to move into advisory notes, board-prep materials, client scoping emails or premium-pack review queues. If copied manually, the output can lose its edition context, source-review steps and legal-caution caveats.

## Resolution

- Added a copy readiness checklist control to the regulation detail decision-readiness panel.
- Added a generated Markdown checklist containing edition metadata, publisher/editor/contact context, facts to confirm, evidence package, first 30-day actions, source-review steps, decision-data gaps, sources to verify, related records and caveats.
- Added visible copied-output guidance beside the new copy control.
- Added focused smoke coverage for the copyable checklist surface.

## Guardrails

The copied checklist is a planning aid only. It is not legal advice, a legal opinion, source verification, an official translation, complete coverage or an entity-specific applicability determination.

## Future Note

When future copy/export surfaces are added, they should include edition context, source-review notes and caveats at the source rather than relying on surrounding UI text.
