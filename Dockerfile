FROM node:22-slim AS builder
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM caddy:2-alpine AS production
RUN adduser -D -u 10001 site && chown -R site:site /data /config
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist /srv

USER site
EXPOSE 8080
