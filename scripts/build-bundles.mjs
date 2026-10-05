/* Sestaví bundles.json — složení balíčků z veřejného webu oldmans.cz.
   Zdroj: kategorie /kategorie/balicky/ → detail každého balíčku → seznam pod
   nadpisem "Co je v balíčku:" (h3 + ul > li > strong) → názvy se spárují se
   skutečnými produkty přes /vyhledavani/. Výstup: kódy (sku) položek; živé
   ceny/odkazy/fotky si web dotahuje sám podle kódu. Balíček, jehož položky se
   nepodaří jednoznačně spárovat, se VYNECHÁ (a vypíše se do "skipped"), aby
   web raději nic neukázal než špatné procento.
   Spuštění: node scripts/build-bundles.mjs [výstup.json] (vyžaduje jsdom). */
import { JSDOM } from 'jsdom';
import fs from 'node:fs';

const BASE = process.env.OM_BASE || 'https://www.oldmans.cz';
const OUT = process.argv[2] || 'bundles.json';
const UA = 'oldmans-bundles-builder (+https://github.com/serbus-create/oldmans-shoptet)';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getDoc(path) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(new URL(path, BASE), { headers: { 'user-agent': UA } });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return new JSDOM(await r.text()).window.document;
    } catch (e) {
      if (attempt === 3) throw e;
      await sleep(600 * attempt);
    }
  }
}

const strip = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const tokens = (s) => strip(s).replace(/\(.*?\)/g, ' ').replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean);
const NOISE = new Set(['a', 's', 'se', 'na', 'ze', 'z', 'omacka', 'majoneza', 'majonezova', 'squeeze', 'splash', 'blast']);

function cardInfo(card) {
  const a = card.querySelector('a[href*="/zbozi/"]');
  const sku = card.querySelector('[data-micro="sku"]');
  const nm = card.querySelector('[data-micro="name"]') || card.querySelector('.name span, .name');
  return {
    path: a ? new URL(a.getAttribute('href'), BASE).pathname : '',
    sku: sku ? (sku.textContent || sku.getAttribute('content') || '').trim() : '',
    name: nm ? nm.textContent.trim() : '',
  };
}

/* Položky ze seznamu "Co je v balíčku:" → [{ name, qty }] */
function parseComposition(doc) {
  const heads = [...doc.body.querySelectorAll('h1,h2,h3,h4,h5,p,strong,b')]
    .filter((h) => h.children.length < 3 && /co je v bal[ií][cč]ku/i.test(h.textContent) && h.textContent.length < 60);
  if (!heads.length) return null;
  let el = heads[0], ul = null;
  for (let up = 0; up < 3 && el && !ul; up++) {
    let s = el.nextElementSibling;
    for (let k = 0; k < 4 && s; k++, s = s.nextElementSibling) {
      if (s.matches('ul,ol')) { ul = s; break; }
      const f = s.querySelector && s.querySelector('ul,ol');
      if (f) { ul = f; break; }
    }
    el = el.parentElement;
  }
  if (!ul) return null;
  return [...ul.querySelectorAll(':scope > li')].map((li) => {
    const s = li.querySelector('strong,b');
    let name = (s ? s.textContent : li.textContent).replace(/[:\s]+$/, '').trim();
    let qty = 1;
    const m = name.match(/^(\d+)\s*[×x]\s*(.+)$/i);
    if (m) { qty = parseInt(m[1], 10); name = m[2].trim(); }
    return { name, qty };
  }).filter((x) => x.name);
}

/* Název z popisu → produkt (sku). Vrací { sku, why } */
async function resolveName(name, bundleSkus) {
  const need = tokens(name).filter((x) => !NOISE.has(x));
  const weight = (need.find((x) => /^\d+g?$/.test(x)) || '').replace('g', '');
  const q1 = name.replace(/\(.*?\)/g, ' ').replace(/[–—-]/g, ' ').replace(/\s+/g, ' ').trim();
  let cards = [...(await getDoc('/vyhledavani/?string=' + encodeURIComponent(q1))).querySelectorAll('.product')].map(cardInfo);
  if (!cards.length) {
    const q2 = tokens(name).slice(0, 3).join(' ');
    cards = [...(await getDoc('/vyhledavani/?string=' + encodeURIComponent(q2))).querySelectorAll('.product')].map(cardInfo);
  }
  const scored = cards
    .filter((c) => c.sku && !bundleSkus.has(c.sku)) /* samotné balíčky nejsou položky */
    .map((c) => {
      const ct = new Set(tokens(c.name));
      const miss = need.filter((x) => !ct.has(x) && !ct.has(x.replace(/g$/, ''))).length;
      const extra = [...ct].filter((x) => !NOISE.has(x) && !need.includes(x) && !need.includes(x + 'g')).length;
      const wOk = !weight || [...ct].some((x) => x.replace('g', '') === weight);
      return { ...c, miss, extra, wOk };
    })
    .filter((c) => c.wOk && c.miss <= 1)
    .sort((a, b) => a.miss - b.miss || a.extra - b.extra);
  if (!scored.length) return { sku: '', why: 'nenalezeno' };
  if (scored[1] && scored[1].miss === scored[0].miss && scored[1].extra === scored[0].extra) {
    return { sku: '', why: 'nejednoznačné: ' + scored[0].name + ' / ' + scored[1].name };
  }
  return { sku: scored[0].sku, why: 'ok', matched: scored[0].name };
}

const cat = await getDoc('/kategorie/balicky/');
const seen = new Set(), bundles = [];
cat.querySelectorAll('.product').forEach((card) => {
  const c = cardInfo(card);
  if (c.path && c.sku && !seen.has(c.path)) { seen.add(c.path); bundles.push(c); }
});
const bundleSkus = new Set(bundles.map((b) => b.sku));
console.error('Balíčků v kategorii:', bundles.length);

const out = [], skipped = [];
for (const b of bundles) {
  await sleep(150);
  const doc = await getDoc(b.path);
  const comp = parseComposition(doc);
  if (!comp || comp.length < 2) { skipped.push({ code: b.sku, name: b.name, reason: 'bez seznamu "Co je v balíčku:"' }); continue; }
  const items = [];
  let bad = '';
  for (const it of comp) {
    await sleep(150);
    const r = await resolveName(it.name, bundleSkus);
    if (!r.sku) { bad = it.name + ' → ' + r.why; break; }
    items.push({ code: r.sku, qty: it.qty });
  }
  if (bad) { skipped.push({ code: b.sku, name: b.name, reason: bad }); continue; }
  out.push({ code: b.sku, items });
}

const json = { generated: new Date().toISOString(), bundles: out, skipped };
/* Pojistka: kdyby web přestal vracet seznamy (změna šablony, výpadek), nepřepsat
   fungující data prázdnými — raději běh ukončit chybou a nechat staré. */
try {
  const old = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  if (old.bundles && old.bundles.length > 0 && out.length === 0) {
    console.error('CHYBA: nenašel se žádný balíček, ponechávám předchozí data.');
    process.exit(1);
  }
} catch (e) { /* první běh */ }
/* Neukládat znovu, když se obsah (mimo čas) nezměnil — ať Action nedělá prázdné commity */
let prev = null;
try { prev = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch (e) { /* první běh */ }
const sameData = prev && JSON.stringify([prev.bundles, prev.skipped]) === JSON.stringify([json.bundles, json.skipped]);
if (!sameData) fs.writeFileSync(OUT, JSON.stringify(json, null, 1) + '\n');
console.error(sameData ? 'Beze změny.' : 'Zapsáno: ' + OUT);
console.error('Balíčky OK:', out.length, '| vynechané:', skipped.length);
skipped.forEach((s) => console.error('  VYNECHÁNO', s.code, s.name.slice(0, 40), '—', s.reason));
