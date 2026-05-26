# PR 83 QA Finding - Route Metadata Classification

## Finding

The public navigation had been simplified, but route placement still lived directly inside the header component. That made future pages easy to add ad hoc without deciding whether they belonged in primary navigation, the More menu, contextual links, internal/noindex workspaces or dynamic templates.

## Risk

Without a route registry, the Atlas can become visually busy again as new product, trust, commercial and internal pages are added. Internal launch assets or governance surfaces could also be accidentally promoted into public navigation.

## Resolution

- Added `data/routeRegistry.ts` with route placement, visibility, robots, group, template and user-decision metadata.
- Updated `components/Header.tsx` to source primary and More navigation from the registry.
- Added guardrail tests for static route coverage, `/launch` internal/noindex classification and contextual dynamic templates.

## Prevention Rule

Every new route should be added to `data/routeRegistry.ts` before it is linked. Keep the public header focused on Start, Assessment, Markets, Regulations and Advisory unless user testing proves a route deserves primary placement. Keep `/launch` internal/noindex and absent from public navigation.
