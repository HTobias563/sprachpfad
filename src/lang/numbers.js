// Zahlen in Worte: Vietnamesisch, Koreanisch (sino), Japanisch (mit Lesung). Für Zahlen-Helfer und Preis-hören.

const VI_D = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
function vi3(n, full) {
  // n < 1000; full = Hunderter auch bei 0xx ausschreiben (innerhalb größerer Zahlen)
  const h = Math.floor(n / 100), t = Math.floor((n % 100) / 10), u = n % 10;
  const out = [];
  if (h > 0 || full) out.push(VI_D[h] + ' trăm');
  if (t === 0) { if (u > 0) { if (h > 0 || full) out.push('linh'); out.push(VI_D[u]); } }
  else if (t === 1) { out.push('mười'); if (u === 5) out.push('lăm'); else if (u > 0) out.push(VI_D[u]); }
  else { out.push(VI_D[t] + ' mươi'); if (u === 1) out.push('mốt'); else if (u === 5) out.push('lăm'); else if (u > 0) out.push(VI_D[u]); }
  return out.join(' ');
}
export function vi(n) {
  n = Math.floor(Math.abs(n));
  if (n === 0) return 'không';
  const parts = [];
  const mil = Math.floor(n / 1000000), th = Math.floor((n % 1000000) / 1000), rest = n % 1000;
  if (mil) parts.push(vi3(mil, false) + ' triệu');
  if (th) parts.push(vi3(th, mil > 0) + ' nghìn');
  if (rest) parts.push(vi3(rest, mil > 0 || th > 0));
  return parts.join(' ');
}

const KO_D = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
function ko4(n) {
  // n < 10000
  const parts = [];
  const th = Math.floor(n / 1000), h = Math.floor((n % 1000) / 100), t = Math.floor((n % 100) / 10), u = n % 10;
  if (th) parts.push((th > 1 ? KO_D[th] : '') + '천');
  if (h) parts.push((h > 1 ? KO_D[h] : '') + '백');
  if (t) parts.push((t > 1 ? KO_D[t] : '') + '십');
  if (u) parts.push(KO_D[u]);
  return parts.join('');
}
export function ko(n) {
  n = Math.floor(Math.abs(n));
  if (n === 0) return '영';
  const parts = [];
  const eok = Math.floor(n / 100000000), man = Math.floor((n % 100000000) / 10000), rest = n % 10000;
  if (eok) parts.push(ko4(eok) + '억');
  if (man) parts.push((man === 1 ? '' : ko4(man)) + '만');
  if (rest) parts.push(ko4(rest));
  return parts.join(' ');
}

const JA_K = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const JA_R = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
const HYAKU = { 1: 'ひゃく', 2: 'にひゃく', 3: 'さんびゃく', 4: 'よんひゃく', 5: 'ごひゃく', 6: 'ろっぴゃく', 7: 'ななひゃく', 8: 'はっぴゃく', 9: 'きゅうひゃく' };
const SEN = { 1: 'せん', 2: 'にせん', 3: 'さんぜん', 4: 'よんせん', 5: 'ごせん', 6: 'ろくせん', 7: 'ななせん', 8: 'はっせん', 9: 'きゅうせん' };
function ja4(n, leadingIchi) {
  const th = Math.floor(n / 1000), h = Math.floor((n % 1000) / 100), t = Math.floor((n % 100) / 10), u = n % 10;
  let k = '', r = '';
  if (th) { k += (th > 1 || leadingIchi ? JA_K[th] : '') + '千'; r += (leadingIchi && th === 1 ? 'いっ' : '') + SEN[th]; }
  if (h) { k += (h > 1 ? JA_K[h] : '') + '百'; r += HYAKU[h]; }
  if (t) { k += (t > 1 ? JA_K[t] : '') + '十'; r += (t > 1 ? JA_R[t] : '') + 'じゅう'; }
  if (u) { k += JA_K[u]; r += JA_R[u]; }
  return { k, r };
}
export function ja(n) {
  n = Math.floor(Math.abs(n));
  if (n === 0) return { text: '零', reading: 'ゼロ' };
  let k = '', r = '';
  const oku = Math.floor(n / 100000000), man = Math.floor((n % 100000000) / 10000), rest = n % 10000;
  if (oku) { const p = ja4(oku, true); k += (oku === 1 ? '一' : p.k) + '億'; r += (oku === 1 ? 'いち' : p.r) + 'おく'; }
  if (man) { const p = ja4(man, true); k += (man === 1 ? '一' : p.k) + '万'; r += (man === 1 ? 'いち' : p.r) + 'まん'; }
  if (rest) { const p = ja4(rest, false); k += p.k; r += p.r; }
  return { text: k, reading: r };
}
export const NUMBERS = {
  vi: n => ({ text: vi(n), speak: vi(n) }),
  ko: n => ({ text: ko(n), speak: ko(n) }),
  ja: n => { const x = ja(n); return { text: x.text, reading: x.reading, speak: x.reading }; }
};
export const CURRENCY = { vi: { unit: 'đồng', per: 30000, sym: '₫' }, ko: { unit: '원', per: 1500, sym: '₩' }, ja: { unit: '円', speakUnit: 'えん', per: 160, sym: '¥' } };
export function fmt(n) { return String(Math.floor(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
// Typische Preise je Sprache
export function randomPrice(code, rand) {
  const r = rand || Math.random;
  const pool = code === 'vi' ? [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000, 100000, 120000, 150000, 200000, 250000, 300000, 500000]
    : code === 'ko' ? [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 15000, 20000, 25000, 30000, 50000]
      : [100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000, 1200, 1500, 2000, 2500, 3000, 5000, 10000];
  return pool[Math.floor(r() * pool.length)];
}
