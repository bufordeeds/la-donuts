# To use this Dockerfile, you have to set `output: 'standalone'` in your next.config.js file.
# From https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:22-alpine AS base
RUN npm install -g pnpm@10

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Payload needs a database connection string at build time for config validation.
# This dummy value is overridden at runtime by the real env vars.
ENV POSTGRES_URL=postgresql://dummy:dummy@localhost:5432/dummy
ENV PAYLOAD_SECRET=build-time-placeholder
ENV NEXT_PUBLIC_SERVER_URL=https://skateland.buford.dev

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_BUILD_SKIP_DB=true

RUN pnpm run build

# Migrator stage: same base as the runner, but preserves the Payload CLI
# and its transitive deps (cross-env, payload binary, tsx, etc) that the
# Next standalone tracer strips out of the runner image. The deploy
# workflow publishes this as a second tag (`:<sha>-migrator`) and runs it
# as a one-off container to apply pending Payload migrations BEFORE the
# live service container is swapped, so a failing migration aborts the
# deploy instead of leaving a half-migrated DB.
FROM base AS migrator
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml tsconfig.json next.config.js ./
COPY src ./src
# No CMD — override via `docker run ... pnpm payload migrate`

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Remove this line if you do not have this folder
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
