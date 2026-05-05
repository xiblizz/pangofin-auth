# ── Stage 1: build ──────────────────────────────────────────────────────────
FROM oven/bun:1 AS builder

WORKDIR /app

# Install dependencies (including devDependencies needed for the build)
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Copy source and build
COPY . .
RUN bun run build

# ── Stage 2: runtime ─────────────────────────────────────────────────────────
FROM oven/bun:1-slim AS runtime

WORKDIR /app

# Only copy the production output and its direct runtime dependencies
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock* ./

# Install production dependencies only
RUN bun install --frozen-lockfile --production

# Persist the SQLite database across restarts via a named volume mounted here
RUN mkdir -p /app/data

EXPOSE 3000

ENV ADDRESS_HEADER=X-Forwarded-For

CMD ["bun", "./build/index.js"]
