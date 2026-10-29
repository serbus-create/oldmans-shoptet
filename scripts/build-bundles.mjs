/* Sestaví bundles.json — složení balíčků ze SADY PRODUKTŮ v exportu Shoptetu.
   Zdroj pravdy: Produkty → Export → „Kompletní export“ (XML) → u každého produktu
   s ITEM_TYPE=set seznam SET_ITEMS (kód + počet kusů). Texty popisů se NEČTOU,
   takže překlep v popisu už složení balíčku nerozbije.
   Odkaz na export obsahuje tajný klíč → bere se z proměnné SHOPTET_EXPORT_URL
   (GitHub Secret), nikdy se nezapisuje do repa ani do logu.
   Výstup: kódy (sku) položek; živé ceny/odkazy/fotky si web dotahuje sám.
   Spuštění: node scripts/build-bundles.mjs [výstup.json] [--file export.xml]  (vyžaduje jsdom). */
import { JSDOM } from 'jsdom';
import fs from 'node:fs';

const args = process.argv.slice(2);
const fileIdx = args.indexOf('--file');
const FILE = fileIdx >= 0 ? args[fileIdx + 1] : '';
const OUT = args.find((a, i) => !a.startsWith('--') && i !== fileIdx + 1) || 'bundles.json';

let xml = '';
if (FILE) {
  xml = fs.readFileSync(FILE, 'utf8');
} else {
  const url = process.env.SHOPTET_EXPORT_URL || '';
  if (!url) {
    console.error('SHOPTET_EXPORT_URL není nastaveno (GitHub Secret) — ponechávám stávající bundles.json.');
    process.exit(0);
  }
  let r;
  try { r = await fetch(url, { headers: { 'user-agent': 'oldmans-bundles-builder' } }); }
  catch (e) { console.error('CHYBA: export se nepodařilo stáhnout (síť).'); process.exit(1); }
  if (!r.ok) { console.error('CHYBA: export vrátil HTTP ' + r.status + ' — ponechávám stará data.'); process.exit(1); }
  xml = await r.text();
}
if (!/<SHOPITEM[\s>]/.test(xml)) { console.error('CHYBA: v exportu nejsou žádné produkty — ponechávám stará data.'); process.exit(1); }

const doc = new JSDOM(xml, { contentType: 'text/xml' }).window.document;
const txt = (el, sel) => { const n = el.querySelector(':scope > ' + sel); return n ? n.textContent.trim() : ''; };
const shopItems = [...doc.documentElement.children].filter((e) => e.tagName === 'SHOPITEM');
const known = new Set(shopItems.map((s) => txt(s, 'CODE')));

const out = [], skipped = [];
for (const s of shopItems) {
  if (txt(s, 'ITEM_TYPE') !== 'set') continue;
  const code = txt(s, 'CODE'), name = txt(s, 'NAME');
  if (txt(s, 'VISIBLE') !== '1') continue; /* skrytý balíček web nenabízí */
  const items = [...s.querySelectorAll(':scope > SET_ITEMS > SET_ITEM')].map((it) => ({
    code: txt(it, 'CODE'),
    qty: Math.max(1, Math.round(parseFloat(txt(it, 'AMOUNT')) || 1)),
  })).filter((x) => x.code);
  if (items.length < 2) { skipped.push({ code, name, reason: 'sada má méně než 2 položky' }); continue; }
  const missing = items.find((x) => !known.has(x.code));
  if (missing) { skipped.push({ code, name, reason: 'položka ' + missing.code + ' není v exportu' }); continue; }
  out.push({ code, items });
}

const byCode = (x, y) => String(x.code).localeCompare(String(y.code), 'cs', { numeric: true });
out.sort(byCode); skipped.sort(byCode);
const json = { generated: new Date().toISOString(), bundles: out, skipped };

/* Pojistka: nikdy nepřepsat fungující data prázdnými */
let prev = null;
try { prev = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch (e) { /* první běh */ }
if (prev && prev.bundles && prev.bundles.length > 0 && out.length === 0) {
  console.error('CHYBA: v exportu se nenašla žádná sada, ponechávám předchozí data.');
  process.exit(1);
}
const same = prev && JSON.stringify([prev.bundles, prev.skipped]) === JSON.stringify([json.bundles, json.skipped]);
if (!same) fs.writeFileSync(OUT, JSON.stringify(json, null, 1) + '\n');
console.error(same ? 'Beze změny.' : 'Zapsáno: ' + OUT);
console.error('Balíčky OK:', out.length, '| vynechané:', skipped.length);
skipped.forEach((x) => console.error('  VYNECHÁNO', x.code, x.name.slice(0, 40), '—', x.reason));
