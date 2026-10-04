# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Stage 1 - build
# Installs the full dependency tree (including devDependencies) and compiles
# TypeScript to JS. This stage is thrown away, so the heavy toolchain never
# reaches the final image.
# ---------------------------------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /usr/src/app

# Copy manifests first and install separately. Docker caches this layer, so
# editing source code does not re-run `npm ci` on every rebuild.
COPY package.json package-lock.json ./

# `npm ci` installs exactly what the lockfile pins, which is what you want in
# a reproducible build. Note: devDependencies are required here because
# TypeScript itself is needed to compile.
RUN npm ci

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src

RUN npm run build


# ---------------------------------------------------------------------------
# Stage 2 - runtime
# Contains only production dependencies plus the compiled output.
# ---------------------------------------------------------------------------
FROM node:22-alpine AS runtime

# tini reaps zombie processes and forwards SIGTERM to Node, so the container
# shuts down cleanly on `docker compose down` instead of waiting for a kill.
RUN apk add --no-cache tini

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

# --omit=dev drops TypeScript, Jest and the Nest CLI. Those are only needed for
# building and testing, not for running the compiled output.
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build --chown=node:node /usr/src/app/dist ./dist

# Drop root. Nothing here needs elevated privileges, and a compromised process
# should not automatically own the container.
USER node

EXPOSE 3000

# Reports unhealthy until the Nest app is actually serving. Uses Node's own
# http client so no extra package (curl/wget) has to be installed.
# /tasks is used because the app defines no root route.
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||3000)+'/tasks',r=>process.exit(r.statusCode<500?0:1)).on('error',()=>process.exit(1))"

ENTRYPOINT ["/sbin/tini", "--"]

# Exec form so node is PID 1's child and receives signals directly.
CMD ["node", "dist/main.js"]