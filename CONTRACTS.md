# API Contracts — ann-lite-web ↔ ann-lite-api

This document is the source of truth for what `ann-lite-web` expects from
`ann-lite-api`. TypeScript types are defined in `src/types/content.ts` and
must stay in sync with this document.

## Envelope

Every JSON response follows:

```ts
interface ApiEnvelope<T> {
  data: T | null;
  error: { code: string; message: string } | null;
}
```

## Endpoints consumed by this repo

| Method | Path | Purpose |
|---|---|---|
| GET | `/v1/prayers` | List prayers (all locales embedded per item) |
| GET | `/v1/prayers/:slug` | Single prayer |
| GET | `/v1/reflections` | List reflections |
| GET | `/v1/reflections/:slug` | Single reflection |
| GET | `/v1/bible/:translation/:book/:chapter` | Bible chapter text + copyright metadata |
| GET | `/v1/projects` | List charity projects |
| GET | `/v1/projects/:slug` | Single charity project |
| GET | `/v1/transparency/summary` | Aggregate donation + on-chain stats |
| POST | `/v1/donations/intent` | Create a donation intent (never a confirmed donation) |
| POST | `/v1/contact` | Submit a contact message |

## Environment variables

| Variable | Consumed by | Notes |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `src/lib/api-client.ts` | Base URL of ann-lite-api. Unset in this release. |
| `NEXT_PUBLIC_SITE_URL` | metadata, sitemap | Canonical public URL of this site. |

## Contract rules

1. `ann-lite-web` never calls a payment provider or the Celo network
   directly — only `ann-lite-api` does, and only server-side.
2. A donation is never marked successful by this frontend; only a
   confirmed webhook or on-chain confirmation on the backend can do that.
3. Any breaking change to a response shape must bump the API version
   (`/v1` → `/v2`) and be called out in both repos' `CHANGELOG.md`.
