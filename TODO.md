# TODO / External Dependencies — ann-lite-web

This file lists everything this repository cannot finish on its own,
per the project's rule against inventing information or faking
completion. Nothing below is a code defect in this repo — it's a
dependency on infrastructure or decisions outside it.

## Blocking on other repositories

- [ ] **ann-lite-api is not built yet.** Every data-driven page (prayers,
      reflections, Bible, projects, transparency, donation intents,
      contact) currently renders a real, honest "not connected yet" state
      instead of fake data. Once ann-lite-api (Repository 2) exists and
      `NEXT_PUBLIC_API_URL` is set, these pages will render real content
      with no frontend code changes needed, as long as it matches
      `docs/CONTRACTS.md`.
- [ ] **ann-lite-content is not built yet.** No Bible translation text is
      bundled in this repo (see COPYRIGHT rule below).
- [ ] **Payment provider is not selected.** `POST /v1/donations/intent`
      is called by this frontend but implemented by ann-lite-api, which
      will choose and configure the provider.

## Requires external/legal input

- [ ] Bible translation(s) to display: license/copyright status must be
      verified per translation before it is wired up (see
      `ann-lite-content/COPYRIGHT.md` once that repo exists).
- [ ] `privacy/page.tsx` and `terms/page.tsx` content is an operational
      draft and explicitly labeled as requiring legal review before
      launch — it is not a substitute for one.
- [ ] Real payment-provider hosted checkout URL format (Stripe, or
      another provider) — the frontend only assumes it receives a URL
      string back from the backend; it does not assume a specific
      provider.
- [ ] Production domain / DNS for `NEXT_PUBLIC_SITE_URL`.

## Deliberately not implemented in this repository

- No admin functionality (that's `ann-lite-admin`, Repository 5).
- No direct database or blockchain access (frontend never holds those
  credentials).
- No hardcoded donation success states.

## Verified but not executable in this environment

The assistant that generated this repository does not have network
access and could not run `npm install`, `npm run build`,
`npm test`, or `npm run test:e2e` against real package registries or a
real browser. See the final build report for exact commands to run
these yourself, and do not treat this repo as "tested" until you have
run them.
