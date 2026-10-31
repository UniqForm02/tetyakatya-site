FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY index.html robots.txt sitemap.xml og-image.jpg /srv/
COPY make-kz.sh /make-kz.sh
RUN sh /make-kz.sh
