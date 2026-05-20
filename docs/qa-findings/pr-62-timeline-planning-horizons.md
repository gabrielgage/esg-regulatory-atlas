# PR 62 QA Finding - Timeline Planning Horizons

## Finding

The expert review flagged that `/timeline` was useful but too historical by default. Users needed a near-term planning view before reviewing the full chronology of effective dates, reporting years, due dates and Atlas review milestones.

## Why It Matters

Regulatory intelligence is date-driven. A sustainability leader, legal team or advisor usually needs to know what to plan for in the next reporting cycles before reviewing older or longer-term milestone history.

## Resolution

- Added planning-horizon tabs to `/timeline`: next 12 months, next 24 months, already in force, longer-term watch and full history.
- Made next 24 months the default view.
- Kept high-impact already-effective obligations visible in the default view as readiness context.
- Updated the timeline summary so non-default horizons appear as active filters.
- Added smoke coverage for horizon selection and reset behavior.

## Validation

- `npm run lint`
- `npm run build`
- `git diff --check`

## Product Guardrail

Timeline horizons are planning filters over static seed data. They do not confirm legal deadlines, filing obligations, local implementation, official translations or entity-specific applicability.
