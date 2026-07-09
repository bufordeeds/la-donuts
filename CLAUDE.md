# CLAUDE.md

Guidance for Claude Code working in this repository.

## Project Overview

**La Donuts** — website for a donut trailer in Gillette, WY. Payload CMS admin (flavors, hours, pricing) + Next.js 15 public site. Informational only: ordering redirects to Facebook Messenger / text — the client declined the integrated Square checkout, so the Orders collection and Square flow described below are dormant/unbuilt.

Deployed at `la-donuts.com` on Buford's Hetzner VPS (178.156.177.102), alongside the shared Caddy + Postgres + MinIO stack.

## Development Commands

```bash
# Dev
pnpm dev                     # Next dev server on :3000 (Payload admin at /admin)
pnpm build                   # Production build
pnpm start                   # Start production server
pnpm dev:prod                # Clean build + start locally

# Quality
pnpm lint
pnpm lint:fix

# Payload
pnpm payload migrate         # Run pending migrations
pnpm payload migrate:create  # Create a new migration from current schema
pnpm generate:types          # Regenerate src/payload-types.ts
pnpm generate:importmap      # Regenerate admin importmap
```

## Environment Setup

See `.env.example`. Key vars:
- `POSTGRES_URL` — local Postgres or VPS Postgres
- `PAYLOAD_SECRET` — JWT secret
- `NEXT_PUBLIC_SERVER_URL` — site URL, no trailing slash
- `S3_*` — MinIO on VPS (same stack as Skateland)
- `SQUARE_*` / `NEXT_PUBLIC_SQUARE_*` — Square Web Payments SDK + server
- `RESEND_*` — transactional email for order confirmations

## Architecture

### Stack
- Next.js 15 (App Router), React 19, TypeScript, Tailwind 3
- Payload CMS 3.50 with admin at `/admin`
- PostgreSQL 16 (shared VPS instance, `ladonuts` database)
- S3-compatible storage via `@payloadcms/storage-s3` (MinIO on VPS)
- Square Web Payments SDK + Square Payments API for checkout
- shadcn/ui + Radix primitives

### Key Directories
- `src/app/(frontend)/` — public Next pages
- `src/app/(payload)/` — Payload admin + Payload REST/GraphQL API
- `src/app/api/` — custom Next route handlers (orders/create, square/webhook)
- `src/collections/` — Payload collections: **Flavors**, **Orders**, Pages, Media, Users
- `src/globals/` — Payload globals: **Hours**, **Location**, **ContactLinks**, **SiteSettings** (+ Header, Footer)
- `src/blocks/` — page-builder blocks (HeroSection, CTASection, Content, MediaBlock, Form, CallToAction, Testimonials — La Donuts-specific blocks FlavorGrid/HoursLocation/OrderCTA added as needed)
- `src/lib/` — server-side helpers (Square client, pickup-slot generator, etc.)

### Routing
- Dynamic pages: `[slug]` routes fetch from `pages` collection
- `/menu` — flavor grid grouped by category
- `/order` — checkout flow (pickup type → flavors → customer → Square card form)
- `/order/[orderNumber]` — confirmation
- `/admin` — Payload admin

### Payload schema
- **Flavors** — name, category (classic/specialty/filled/seasonal), price (cents), `squareCatalogId`, `isAvailableToday` (same-day gate), `isOnRotation` (menu visibility), sortOrder, image
- **Orders** — auto `orderNumber` (LD-000042), customer info, items array, subtotal/total (cents), `pickupType` (same-day / next-day), pickupDate/pickupTime, `squarePaymentId`, status (pending | paid | ready | picked-up | cancelled | refunded)
- **Pages** — block-based layout builder
- **Media** — uploads via MinIO S3
- **Users** — admin auth

### Globals
- **Hours** — weekly schedule + "sold out daily" note
- **Location** — address + Google Maps URL + parking note
- **ContactLinks** — FB Messenger, SMS, Instagram, FB, TikTok, email
- **SiteSettings** — logo, brand colors, hero tagline, `orderingEnabled` kill-switch, `sameDayCutoffMinutesBeforeClose`

### Square flow (planned)
1. Client mounts `@square/web-sdk` card form on `/order` final step
2. Tokenize card → POST to `/api/orders/create`
3. Server: create Payload `Order` (status=pending) → `square.paymentsApi.createPayment` with idempotency key = orderNumber → update to `paid` with squarePaymentId
4. Webhook at `/api/square/webhook` verifies signature + handles async `payment.updated` (refunds, chargebacks)

Catalog sync is manual in v1 — she pastes a Square catalog ID into each Flavor doc.

## Deployment

VPS at 178.156.177.102 (Hetzner). Wildcard DNS `*.buford.dev` is live; `la-donuts.com` points to VPS via Cloudflare DNS-only.

**CI/CD (since 2026-07-09):** push to `main` → CI (lint, typecheck, build) → on success, `deploy.yml` builds the image on GitHub's runners, pushes to GHCR, snapshots the DB, runs Payload migrations as a one-off container, swaps the live container, and smoke-tests https://la-donuts.com. No manual deploys, no building on the VPS.

- Roll back: Actions → Rollback → run with a previously deployed SHA (app-level only; migrations are roll-forward).
- Deploy failure emails hello@buford.dev via a script on the VPS.
- Content changes (menu, pricing, hours) go through Payload admin — no deploy involved.

Caddy block reverse-proxies `la-donuts.com` to the `ladonuts` container on port 3000.

## Deferred / out of v1
Square checkout (client declined), SMS notifications (Twilio), inventory-aware same-day counts, loyalty, blog/posts, newsletter signup.
