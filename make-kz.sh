#!/bin/sh
# Делает казахскую страницу /kz/ из index.html: меняет язык, заголовок и описание для поиска.
# Править вручную не нужно – запускается автоматически при обновлении сайта.
set -e
mkdir -p /srv/kz
sed \
 -e 's|<html lang="ru">|<html lang="kk">|' \
 -e 's|<title>[^<]*</title>|<title>«Тётя Катя» ательесі – Алматыда киім жөндеу және тігу, Мақатаев к-сі 137</title>|' \
 -e 's|<meta name="description" content="[^"]*">|<meta name="description" content="«Тётя Катя» ательесі Алматыда, Мақатаев көшесі 137: шалбар мен джинсы қысқарту, тарылту, сыдырма ауыстыру, тапсырыспен тігу, бумен үтіктеу. Мерзімі 1–3 күн, шұғыл – кезексіз. 9:00–18:00. WhatsApp +7 707 171 00 24.">|' \
 -e 's|<meta property="og:title" content="[^"]*">|<meta property="og:title" content="«Тётя Катя» ательесі – Алматыда киім жөндеу және тігу">|' \
 -e 's|<meta property="og:description" content="[^"]*">|<meta property="og:description" content="Қысқартамыз, тарылтамыз, сыдырма ауыстырамыз, тапсырыспен тігеміз. Мақатаев 137, 9:00–18:00.">|' \
 -e 's|<link rel="canonical" href="[^"]*">|<link rel="canonical" href="https://tetyakatya.kz/kz/">|' \
 -e 's|<meta property="og:url" content="[^"]*">|<meta property="og:url" content="https://tetyakatya.kz/kz/">|' \
 -e 's|<meta property="og:locale" content="ru_RU">|<meta property="og:locale" content="kk_KZ">|' \
 /srv/index.html > /srv/kz/index.html
