# Deployment — ann-lite-web

## Prerequisites

- Node.js 20+
- `ann-lite-api` deployed and reachable (or accept the "not connected
  yet" fallback state for a partial launch)
- A hosting target that supports Next.js 16 App Router with route
  handlers (e.g. Vercel, or a Node.js server / Docker container)

## Environment variables (production)

Set these in your hosting provider, never in the repository:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SITE_URL`

## Build

```bash
npm ci
npm run build
npm run start   # or your platform's Next.js runtime
```

## Recommended production checklist

- [ ] `NEXT_PUBLIC_API_URL` points at the production `ann-lite-api`
- [ ] `NEXT_PUBLIC_SITE_URL` matches the real domain (affects sitemap,
      canonical URLs, Open Graph)
- [ ] HTTPS / SSL certificate active
- [ ] CSP header in `next.config.ts` reviewed against final third-party
      script needs (currently allows none beyond same-origin)
- [ ] Run `npm run test:e2e` against a staging URL before promoting to
      production
- [ ] Confirm `robots.txt` / `sitemap.ts` domain matches production
