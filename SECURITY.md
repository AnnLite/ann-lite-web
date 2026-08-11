# Security Policy

## Scope

This document covers `ann-lite-web`, the public frontend. It holds **no**
secrets, database credentials, or private keys — those live in
`ann-lite-api`, `ann-lite-admin`, and `ann-lite-contracts`.

## Reporting a vulnerability

Please do not open a public GitHub issue for security vulnerabilities.
Instead, email the address listed in the organization's `SECURITY.md` in
`ann-lite-docs` (Repository 6), or use GitHub's private vulnerability
reporting feature on this repository if enabled. Include:

- A description of the issue and its impact
- Steps to reproduce
- Any relevant logs or screenshots (redact personal data)

We aim to acknowledge reports within 5 business days.

## What this repo does to reduce risk

- No secrets in the codebase; all sensitive calls happen server-side via
  Next.js route handlers, never from the browser.
- Strict Content-Security-Policy, X-Frame-Options, and related security
  headers set in `next.config.ts`.
- All form input validated server-side with `zod` before use.
- Donation status is never trusted from the client — this repo only ever
  creates a *donation intent*; final confirmation is the backend's
  responsibility.
- Dependency vulnerabilities are scanned weekly via Dependabot and on
  every CI run via `npm audit --audit-level=high`.

## Out of scope for this repo

Smart contract security (`ann-lite-contracts`), payment webhook
verification (`ann-lite-api`), and admin authentication (`ann-lite-admin`)
are documented and audited in their own repositories.
