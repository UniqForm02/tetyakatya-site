FROM node:22-alpine AS build
WORKDIR /build
RUN npm install --no-save linkedom@0.18.12
COPY index.html prerender.mjs ./
RUN node prerender.mjs

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /build/out/ /srv/
COPY robots.txt sitemap.xml og-image.jpg /srv/
