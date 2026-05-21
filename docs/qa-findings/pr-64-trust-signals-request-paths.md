# PR 64 QA Finding - Trust Signals And Request Paths

## Finding

The expert review found that data-quality metrics such as source coverage, confidence scores and review flags can be misread by public users. The same review also found that commercial and advisory CTAs were present but did not always explain the concrete next step.

## Why It Matters

The Atlas needs transparency to build trust, but raw governance labels can look like defects or complete-coverage claims when they are not interpreted. Commercial validation also depends on users knowing what to send, what Etica returns and why the flow remains manual at MVP stage.

## Resolution

- Added a Quality Signal explainer on Data Quality and Markets.
- Reframed record counts, source-link rates, review prompts and confidence labels as planning signals rather than applicability or completeness claims.
- Replaced user-facing review-flag and broad source-coverage wording with review-prompt and captured-source language.
- Added Manual Request panels on Plans, Alerts, Advisory and Premium Roadmap.
- Preserved mailto-only conversion paths with no checkout, accounts, backend, automated email or monitoring infrastructure.

## Validation

- `npm run check:data`
- `npm run lint`
- `npm run build`
- `git diff --check`

## Product Guardrail

Quality signals and request paths support orientation, source review and advisory scoping only. They do not create legal advice, production monitoring, paid access, complete coverage or entity-specific compliance determinations.
