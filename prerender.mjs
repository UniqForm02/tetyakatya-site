// Сборка сайта: заранее вставляет тексты в HTML (русская и казахская версии),
// чтобы Google и Яндекс видели весь текст страницы без запуска JavaScript.
// Запускается автоматически при обновлении сайта на Railway. Править вручную не нужно.
import { parseHTML } from "linkedom";
import fs from "node:fs";

const src = fs.readFileSync("index.html", "utf8");

const KZ_HEAD = [
  [/<title>[^<]*<\/title>/, "<title>Алматыдағы «Тётя Катя» ательесі – киім жөндеу, шақтау және тігу</title>"],
  [/<meta name="description" content="[^"]*">/, '<meta name="description" content="«Тётя Катя» ательесі Алматыда, Мақатаев көшесі 137: шалбар мен джинсы қысқарту, тарылту, сыдырма ауыстыру, тапсырыспен тігу, бумен үтіктеу. Мерзімі 1–3 күн, шұғыл – кезексіз. Дс–Жм, 9:00–18:00. WhatsApp +7 707 171 00 24.">'],
  [/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="«Тётя Катя» ательесі – Алматыда киім жөндеу және тігу">'],
  [/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="Қысқартамыз, тарылтамыз, сыдырма ауыстырамыз, тапсырыспен тігеміз. Мақатаев 137, Дс–Жм, 9:00–18:00.">'],
  [/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="https://tetyakatya.kz/kz/">'],
  [/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="https://tetyakatya.kz/kz/">'],
  [/<meta property="og:locale" content="ru_RU">/, '<meta property="og:locale" content="kk_KZ">'],
];

function render(pathname) {
  const { window, document } = parseHTML(src);
  const scripts = [...document.querySelectorAll("script")].filter(s => !s.getAttribute("type") && !s.getAttribute("src"));
  const code = scripts[scripts.length - 1].textContent;
  const g = {
    window, document,
    location: { pathname, hash: "", search: "", href: "https://tetyakatya.kz" + pathname },
    localStorage: { getItem() { return null; }, setItem() {} },
    navigator: {}, getSelection: () => null,
  };
  new Function(...Object.keys(g), code)(...Object.values(g));
  let html = "<!doctype html>\n" + document.documentElement.outerHTML;
  if (pathname === "/kz/") for (const [re, v] of KZ_HEAD) {
    if (!re.test(html)) throw new Error("Не найдено в <head>: " + re);
    html = html.replace(re, () => v);
  }
  // проверка: заголовок страницы не пустой
  if (!/<h1[^>]*>[^<]+/.test(html)) throw new Error("Пустой заголовок h1 для " + pathname);
  return html;
}

fs.mkdirSync("out/kz", { recursive: true });
fs.writeFileSync("out/index.html", render("/"));
fs.writeFileSync("out/kz/index.html", render("/kz/"));
console.log("OK: out/index.html, out/kz/index.html");
