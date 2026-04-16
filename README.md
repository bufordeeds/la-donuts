# La Donuts

Website for **La Donuts** — fresh handmade donuts in Gillette, WY. Payload CMS admin + Next.js 15 public site + embedded Square checkout for same-day reservations and next-day pre-orders.

Live: https://la-donuts.com

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Payload CMS 3.50 (admin at `/admin`)
- PostgreSQL 16 + MinIO (S3) — shared VPS infrastructure
- Square Web Payments SDK for online ordering
- Tailwind CSS + shadcn/ui

## Local development

1. Copy `.env.example` to `.env` and fill in values (use sandbox Square keys locally).
2. Start local Postgres + MinIO:
   ```bash
   docker compose up -d
   ```
3. Install deps and run dev:
   ```bash
   pnpm install
   pnpm dev
   ```
4. Open http://localhost:3000 (site) and http://localhost:3000/admin (Payload).

## Deployment

VPS (Hetzner, `178.156.177.102`) at `~/projects/ladonuts`:

```bash
ssh buford@178.156.177.102
cd ~/projects/ladonuts
git pull
docker compose -f docker-compose.prod.yml up -d --build
```

See `CLAUDE.md` for architecture and conventions.
