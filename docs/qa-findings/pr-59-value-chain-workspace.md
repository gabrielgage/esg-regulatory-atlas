# PR 59 QA Note - Value-Chain Exposure Workspace

Date: 2026-05-20  
Area: Product UX, value-chain triage, regulation filtering  
Release context: `0.5.43 - May 2026`

## Trigger

The product owner asked to stop improving the AI review feedback mechanism and return to product backlog and feature improvements.

## Finding

The Atlas had strong market, sector, regulation, assessment and Data Quality surfaces, but no dedicated entry point for users who start with a business exposure such as suppliers, imports, products, customer claims, financed emissions or portfolio companies.

## Resolution

Added:

- `/value-chain`
- `lib/valueChainProfile.ts`
- value-chain profile metrics, evidence prompts, first actions, market counts and priority records
- copyable value-chain exposure briefs
- filtered links into `/regulations?valueChain=...`
- Header More-menu access
- smoke coverage for the new route

## Prevention Rule

When adding new product features, prefer user-facing triage paths that help users move from business context to regulation records, evidence needs and source review. Keep infrastructure-heavy concepts in future-phase docs until explicitly approved.

## Caveat

Value-chain exposure outputs are seed intelligence and evidence-planning aids. They are not legal advice, source verification, complete value-chain coverage or entity-specific applicability determinations.
