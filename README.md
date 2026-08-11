# ann-lite-web

Official multilingual web platform for **Ann Lite** — prayer, Bible,
Christian reflections and transparent charitable giving.

> "Priye. Aprann. Espere. Sèvi." — "Pray. Learn. Hope. Serve."

This is Repository 1 of 6 in the Ann Lite platform. See
[`ann-lite-docs`](../ann-lite-docs) (once published) for the full
cross-repository architecture.

## What this is

A Next.js 16 (App Router) frontend supporting Haitian Creole (`ht`,
default), French (`fr`), and English (`en`). It renders prayers,
reflections, a Bible reader, charity projects, a donation flow (card,
crypto, and Celo/cUSD), and a public transparency dashboard — all sourced
from `ann-lite-api`, which is **not yet deployed** (see `TODO.md`). Until
it is, every data-driven page shows an honest "not connected yet" message
instead of placeholder or fake data.

## Tech stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.2.6 |
| UI | React | 19.1.1 |
| Language | TypeScript (strict) | 5.7.3 |
| Styling | Tailwind CSS | 4.3.3 |
| i18n | next-intl | 4.3.9 |
| Validation | zod | 3.24.1 |
| Unit/component tests | Vitest + Testing Library | 3.0.4 / 16.2.0 |
| E2E + accessibility tests | Playwright + axe-core | 1.50.1 / 4.10.1 |

All dependency versions are pinned in `package.json`.

## Getting started

```bash
npm ci
cp .env.example .env.local   # fill in NEXT_PUBLIC_API_URL once ann-lite-api exists
npm run dev
```

Visit `http://localhost:3000` — it redirects to `/ht` by default.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`next/core-web-vitals`, `next/typescript`) |
| `npm run format` | Prettier check |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit/component tests |
| `npm run test:e2e` | Playwright E2E + accessibility tests |

## Project structure

```
src/
  app/[locale]/        route segments (pages), one tree for ht/fr/en
  app/api/              route handlers (donation intent, contact) — server-only
  components/           ui/, layout/, donation/, contact/
  i18n/                 next-intl routing, navigation, message dictionaries
  lib/api-client.ts     server-only, secret-free client for ann-lite-api
  types/content.ts      shared content types — the contract with ann-lite-api
tests/unit/            Vitest + Testing Library
tests/e2e/             Playwright + axe-core
docs/                  CONTRACTS.md, DEPLOYMENT.md
```

## Internationalization

Every page exists under `/ht`, `/fr`, and `/en`. UI strings live in
`src/i18n/messages/{ht,fr,en}.json` — see `CONTRIBUTING.md`: PRs that add
a string in one locale must add it in all three.

## Security

No secrets live in this repository. See `SECURITY.md`. All calls to
`ann-lite-api` happen server-side; the browser never receives a backend
URL with credentials attached, and donation status is never trusted from
the client.

## Testing status (honest, per project rules)

This repository was generated in an environment with **no network
access**, so `npm install`, `npm run build`, `npm test`, and
`npm run test:e2e` could not be executed against real package registries
or a real browser here. The code is complete and believed correct against
the pinned dependency APIs, but it is **not yet verified**. Run the
commands above yourself (or in CI) before treating this as production
ready — see the final build report for exact status and known risks.

## Creating the GitHub repository

```bash
# from inside the ann-lite-web/ directory
git init
git add .
git commit -m "Initial commit: ann-lite-web v1.0.0"
git branch -M main

gh repo create ann-lite/ann-lite-web \
  --public \
  --description "Official multilingual web platform for Ann Lite — prayer, Bible, Christian reflections and transparent charitable giving." \
  --source=. \
  --remote=origin \
  --push

git tag -a v1.0.0 -m "Ann Lite Web v1.0.0"
git push origin v1.0.0

gh release create v1.0.0 \
  --title "Ann Lite Web v1.0.0" \
  --notes-file CHANGELOG.md
```

(Replace `ann-lite/ann-lite-web` with your actual GitHub org/user and
repo name. Requires the GitHub CLI, `gh`, authenticated via `gh auth
login`.)

## License

MIT for the code in this repository — see `LICENSE`. Content (Bible
translations, prayers, reflections) is licensed separately in
`ann-lite-content`.
