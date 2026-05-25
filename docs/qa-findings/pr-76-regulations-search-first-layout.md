# PR 76 QA Finding - Regulations Search-First Layout

Date: 2026-05-25

## Finding

The Regulations workspace was useful but still too busy for a first-time user. Role lenses, compare controls, glossary help, sharing and exports were visible alongside the primary database controls, which made the page feel like a collection of features instead of a search workflow.

## Product Risk

For ESG, legal and advisory users, the first action on a regulation database should be clear: search, filter and inspect records. Optional tools should support the result set without competing with search or implying that a role lens is an applicability determination.

## Resolution

- Reframed `/regulations` around a search-first workspace.
- Kept search, jurisdiction, topic, sector, company type and reporting year as the visible primary controls.
- Moved role lenses and compare below the result table.
- Moved label help, share and export controls below the result table.
- Added embedded role-lens rendering so secondary panels stay visually calm.
- Updated smoke coverage to verify the hierarchy and role-lens expansion behavior.

## Prevention

Future Regulations changes should preserve this sequence:

1. Page intro and legal caveat.
2. Search and primary filters.
3. Active filter summary.
4. Result table and regulation detail path.
5. Secondary tools such as role lenses, compare, glossary help, share and export.

Do not add new commercial, governance or analysis panels above the search workspace unless they directly help a user narrow the current result set.

## Legal Safety Note

Role lenses remain orientation filters. They do not determine legal applicability, confirmed scope, filing deadlines, client-ready advice or complete market coverage.
