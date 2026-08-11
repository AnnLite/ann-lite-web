# Contributing to ann-lite-web

Thank you for helping build Ann Lite. This repository is the multilingual
frontend for the platform.

## Before you start

1. Read `README.md` for local setup.
2. Read `docs/CONTRACTS.md` to understand what this repo expects from
   `ann-lite-api`.
3. Check `TODO.md` for known gaps and external dependencies.

## Workflow

1. Fork or branch from `main`.
2. Make your change. Keep pull requests focused on one concern.
3. Run locally before opening a PR:
   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```
4. If you touch UI copy, update **all three** locale files:
   `src/i18n/messages/ht.json`, `fr.json`, `en.json`. A PR that adds an
   English string without Haitian Creole and French equivalents will not
   be merged — trilingual parity is a project requirement, not optional
   polish.
5. If you touch anything donation- or data-related, re-read
   `SECURITY.md` first.
6. Open a pull request using the provided template. CI must pass (lint,
   typecheck, test, build, e2e, dependency audit) before review.

## Content and copyright

Never add Bible text, song lyrics, or third-party copyrighted content
directly into this repository. This repo renders content served by
`ann-lite-api`/`ann-lite-content`; those repos are responsible for
license verification.

## Commit style

Use clear, imperative commit messages (e.g. `Add crypto donation status
badge`, not `updates`). Reference the related issue when one exists.
