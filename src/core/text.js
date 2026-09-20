// Textwerkzeuge, Zufall, Datum. Reine Funktionen ohne DOM.

export function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Zufall mit optionalem Seed (für reproduzierbare Tests)
let rng = Math.random;
export function setSeed(seed) {
  if (seed == null) { rng = Math.random; return; }
  let a = seed >>> 0;
  rng = () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const random = () => rng();
export function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
export function pick(a, n) { return shuffle(a).slice(0, n); }
export function rand(a) { return a[Math.floor(random() * a.length)]; }

// Datum als 'YYYY-MM-DD' in lokaler Zeit
export function pad2(n) { return String(n).padStart(2, '0'); }
export function todayStr(d) { d = d || new Date(); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
export function addDays(dateStr, n) { const [y, m, d] = dateStr.split('-').map(Number); return todayStr(new Date(y, m - 1, d + n)); }
export function daysBetween(a, b) {
  const [y1, m1, d1] = a.split('-').map(Number); const [y2, m2, d2] = b.split('-').map(Number);
  return Math.round((new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1)) / 86400000);
}

// Normalisierung
const PUNCT = /[.,!?;:"'„“”‚‘’()。、！？]/g;
export function norm(s) { return String(s || '').normalize('NFC').toLowerCase().replace(PUNCT, ' ').replace(/\s+/g, ' ').trim(); }
export function tokens(s) { return norm(s).split(' ').filter(Boolean); }
export function words(s) { return String(s).replace(PUNCT, '').split(/\s+/).filter(Boolean); }
// Nur die fünf vietnamesischen Tonzeichen entfernen, Vokalzeichen (ă â ê ô ơ ư) bleiben
export function stripTones(s) { return String(s).normalize('NFD').replace(/[̣̀́̃̉]/g, '').normalize('NFC'); }

export function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length; if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}
export function similarity(a, b) { const m = Math.max(a.length, b.length); return m ? 1 - levenshtein(a, b) / m : 1; }
