# 2026-05-28 Main Vercel Status Incident

## Summary

After PR #91 was merged, GitHub reported the latest `main` commit `02e01179509440fff601eef3c5448ad833c0a7ff` with a failing `Vercel` status and no target URL. The PR branch checks had been green before merge, and the immediately previous `main` commits had successful Vercel status URLs.

## Observed Signals

- `main` source metadata reports `0.5.74 - May 2026` in `data/_meta.ts`.
- The public URL `https://esg-regulatory-atlas.vercel.app/` was still serving `0.5.57 - May 2026` during the check.
- GitHub combined status for `02e01179509440fff601eef3c5448ad833c0a7ff` returned `Vercel: failure` with `target_url: null`.
- GitHub Actions workflow runs were not present for the merge commit.
- The Vercel connector returned `403 Forbidden`, so deployment logs could not be inspected from Codex.

## Current Working Hypothesis

This looks more like a Vercel Git integration or production-alias/deployment-status issue than a confirmed application build failure. PR branch validation was green, and there was no Vercel build log target URL attached to the failing status.

## Immediate Recovery Step

This documentation-only PR intentionally changes no product behavior. Its purpose is to generate a fresh CI and Vercel signal on top of the same `main` tree so reviewers can distinguish a transient/status-only deployment incident from a reproducible production deployment issue.

## If The Fresh Vercel Check Fails Again

1. Open the Vercel dashboard deployment for the latest commit.
2. Capture the build or Git integration error message.
3. Check whether production branch, domain alias promotion or deployment protection settings changed.
4. Do not continue product feature work until the production deployment path is green or the failure is understood.

## Guardrails

No Stripe, Supabase, authentication, database, paid APIs, Mapbox, scraping, cron jobs, production email backend, AI legal summaries or required environment variables were added.
