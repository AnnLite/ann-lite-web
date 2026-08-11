# Changelog

All notable changes to `ann-lite-web` are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [1.0.0] - 2026-08-11
### Added
- Initial multilingual (ht/fr/en) Next.js 16 App Router frontend.
- Pages: home, about, Bible reader, prayers, reflections, donate
  (card/crypto/celo), impact, transparency, projects, search, contact,
  privacy, terms, accessibility, 404.
- Design system tokens (colors, type) derived from the Ann Lite logo.
- Server-only, secret-free API client and typed content contracts shared
  with `ann-lite-api`.
- Donation-intent and contact route handlers with server-side validation.
- Unit/component tests (Vitest + Testing Library), E2E and accessibility
  tests (Playwright + axe-core).
- CI: lint, format check, typecheck, unit tests, build, E2E, dependency
  audit.
