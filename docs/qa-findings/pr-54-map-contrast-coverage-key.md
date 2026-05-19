# PR 54 - Map Contrast And Untracked Coverage Key

Date: 2026-05-19

## Finding

The homepage map used local country geometry, but untracked countries, ocean background and country borders were too subtle. This could make the map feel like disconnected shapes or make users think countries without direct Atlas records were missing from the map entirely.

## Why It Matters

The map is the primary discovery surface. Users need to understand the difference between:

- a country visible on the map but not yet tracked directly
- a country with direct seed records
- EU/inherited coverage
- selected or hovered jurisdictions

If those states blur together, the Atlas can look less credible even when the underlying geometry and data are present.

## Resolution

- Increased map land, ocean, outline and border contrast in light and dark mode.
- Added a subtle ocean gradient and frame to make the SVG read as a map.
- Added an explicit untracked-country key explaining that pale countries are visible but do not yet have direct Atlas seed coverage.
- Added smoke coverage for the map key and untracked-country styling.

## Guardrails

Map intensity remains a seed-coverage signal. It does not indicate legal applicability, complete jurisdiction coverage, regulatory burden or entity-specific compliance scope.

## Future Note

Any future map layer should explicitly state whether it is showing direct seed coverage, inherited/regional coverage, intensity, legal status or user-selected filter relevance.
