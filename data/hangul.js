// Hangul: Zeichen mit Umschrift (Revised Romanization), deutschem Klang-Hinweis und Beispielsilbe
// kind: V = Vokal, C = Konsonant, T = Endkonsonant (Batchim). stage = Lektion, in der das Zeichen eingeführt wird.
export const JAMO = [
  // Stufe 1: Grundvokale und erste Konsonanten
  { j: 'ㅏ', r: 'a', kind: 'V', stage: 1, hint: 'a wie in „Vater“', ex: '아', exr: 'a' },
  { j: 'ㅓ', r: 'eo', kind: 'V', stage: 1, hint: 'offenes o wie in „Ordnung“', ex: '어', exr: 'eo' },
  { j: 'ㅗ', r: 'o', kind: 'V', stage: 1, hint: 'geschlossenes o wie in „Boot“', ex: '오', exr: 'o' },
  { j: 'ㅜ', r: 'u', kind: 'V', stage: 1, hint: 'u wie in „gut“', ex: '우', exr: 'u' },
  { j: 'ㅡ', r: 'eu', kind: 'V', stage: 1, hint: 'ü ohne Lippenrundung, fast ein gemurmeltes e', ex: '으', exr: 'eu' },
  { j: 'ㅣ', r: 'i', kind: 'V', stage: 1, hint: 'i wie in „Kino“', ex: '이', exr: 'i' },
  { j: 'ㄱ', r: 'g', kind: 'C', stage: 1, hint: 'weiches k am Wortanfang, g zwischen Vokalen', ex: '가', exr: 'ga' },
  { j: 'ㄴ', r: 'n', kind: 'C', stage: 1, hint: 'n', ex: '나', exr: 'na' },
  { j: 'ㅁ', r: 'm', kind: 'C', stage: 1, hint: 'm', ex: '마', exr: 'ma' },
  { j: 'ㅅ', r: 's', kind: 'C', stage: 1, hint: 's, vor i wie sch', ex: '사', exr: 'sa' },
  { j: 'ㅇ', r: '', kind: 'C', stage: 1, hint: 'am Silbenanfang stumm, nur Platzhalter. Am Silbenende: ng', ex: '아', exr: 'a' },
  // Stufe 2
  { j: 'ㄷ', r: 'd', kind: 'C', stage: 2, hint: 'weiches t am Wortanfang, d zwischen Vokalen', ex: '다', exr: 'da' },
  { j: 'ㄹ', r: 'r', kind: 'C', stage: 2, hint: 'zwischen r und l, mit Zungenschlag. Am Silbenende l', ex: '라', exr: 'ra' },
  { j: 'ㅂ', r: 'b', kind: 'C', stage: 2, hint: 'weiches p am Wortanfang, b zwischen Vokalen', ex: '바', exr: 'ba' },
  { j: 'ㅈ', r: 'j', kind: 'C', stage: 2, hint: 'dsch, weich', ex: '자', exr: 'ja' },
  { j: 'ㅎ', r: 'h', kind: 'C', stage: 2, hint: 'h', ex: '하', exr: 'ha' },
  { j: 'ㅑ', r: 'ya', kind: 'V', stage: 2, hint: 'ja', ex: '야', exr: 'ya' },
  { j: 'ㅕ', r: 'yeo', kind: 'V', stage: 2, hint: 'jo, mit offenem o', ex: '여', exr: 'yeo' },
  { j: 'ㅛ', r: 'yo', kind: 'V', stage: 2, hint: 'joh, mit geschlossenem o', ex: '요', exr: 'yo' },
  { j: 'ㅠ', r: 'yu', kind: 'V', stage: 2, hint: 'ju', ex: '유', exr: 'yu' },
  // Stufe 3: behaucht, gespannt, ㅐ ㅔ
  { j: 'ㅋ', r: 'k', kind: 'C', stage: 3, hint: 'k mit kräftigem Hauch', ex: '카', exr: 'ka' },
  { j: 'ㅌ', r: 't', kind: 'C', stage: 3, hint: 't mit kräftigem Hauch', ex: '타', exr: 'ta' },
  { j: 'ㅍ', r: 'p', kind: 'C', stage: 3, hint: 'p mit kräftigem Hauch', ex: '파', exr: 'pa' },
  { j: 'ㅊ', r: 'ch', kind: 'C', stage: 3, hint: 'tsch mit Hauch', ex: '차', exr: 'cha' },
  { j: 'ㄲ', r: 'kk', kind: 'C', stage: 3, hint: 'gepresstes k ohne Hauch', ex: '까', exr: 'kka' },
  { j: 'ㄸ', r: 'tt', kind: 'C', stage: 3, hint: 'gepresstes t ohne Hauch', ex: '따', exr: 'tta' },
  { j: 'ㅃ', r: 'pp', kind: 'C', stage: 3, hint: 'gepresstes p ohne Hauch', ex: '빠', exr: 'ppa' },
  { j: 'ㅆ', r: 'ss', kind: 'C', stage: 3, hint: 'scharfes, gepresstes s', ex: '싸', exr: 'ssa' },
  { j: 'ㅉ', r: 'jj', kind: 'C', stage: 3, hint: 'gepresstes tsch ohne Hauch', ex: '짜', exr: 'jja' },
  { j: 'ㅐ', r: 'ae', kind: 'V', stage: 3, hint: 'e wie in „Bett“', ex: '애', exr: 'ae' },
  { j: 'ㅔ', r: 'e', kind: 'V', stage: 3, hint: 'e, heute genauso wie ㅐ', ex: '에', exr: 'e' },
  // Stufe 4: zusammengesetzte Vokale (Endkonsonanten kommen als Regel)
  { j: 'ㅘ', r: 'wa', kind: 'V', stage: 4, hint: 'wa', ex: '와', exr: 'wa' },
  { j: 'ㅝ', r: 'wo', kind: 'V', stage: 4, hint: 'wo, mit offenem o', ex: '워', exr: 'wo' },
  { j: 'ㅚ', r: 'oe', kind: 'V', stage: 4, hint: 'we', ex: '외', exr: 'oe' },
  { j: 'ㅟ', r: 'wi', kind: 'V', stage: 4, hint: 'wi', ex: '위', exr: 'wi' },
  { j: 'ㅢ', r: 'ui', kind: 'V', stage: 4, hint: 'üi, schnell gesprochen', ex: '의', exr: 'ui' }
];
// Endkonsonanten: sieben Lautwerte
export const FINALS = [
  { j: 'ㄱ', r: 'k', hint: 'kurzes, nicht gelöstes k', ex: '각', exr: 'gak', also: ['ㅋ', 'ㄲ'] },
  { j: 'ㄴ', r: 'n', hint: 'n', ex: '간', exr: 'gan', also: [] },
  { j: 'ㄷ', r: 't', hint: 'kurzes, nicht gelöstes t. So klingen am Ende auch ㅅ ㅆ ㅈ ㅊ ㅌ ㅎ', ex: '갇', exr: 'gat', also: ['ㅅ', 'ㅆ', 'ㅈ', 'ㅊ', 'ㅌ', 'ㅎ'] },
  { j: 'ㄹ', r: 'l', hint: 'l', ex: '갈', exr: 'gal', also: [] },
  { j: 'ㅁ', r: 'm', hint: 'm', ex: '감', exr: 'gam', also: [] },
  { j: 'ㅂ', r: 'p', hint: 'kurzes, nicht gelöstes p. So klingt am Ende auch ㅍ', ex: '갑', exr: 'gap', also: ['ㅍ'] },
  { j: 'ㅇ', r: 'ng', hint: 'ng wie in „singen“', ex: '강', exr: 'gang', also: [] }
];
// Wörter zum Lesenüben (Stufe 5)
export const WORDS = [
  { w: '물', r: 'mul', de: 'Wasser' }, { w: '밥', r: 'bap', de: 'Reis, Essen' }, { w: '김치', r: 'gimchi', de: 'Kimchi' }, { w: '커피', r: 'keopi', de: 'Kaffee' },
  { w: '맥주', r: 'maekju', de: 'Bier' }, { w: '서울', r: 'seoul', de: 'Seoul' }, { w: '네', r: 'ne', de: 'ja' }, { w: '아니요', r: 'aniyo', de: 'nein' },
  { w: '사람', r: 'saram', de: 'Mensch' }, { w: '한국', r: 'hanguk', de: 'Korea' }, { w: '택시', r: 'taeksi', de: 'Taxi' }, { w: '감사합니다', r: 'gamsahamnida', de: 'Danke' },
  { w: '버스', r: 'beoseu', de: 'Bus' }, { w: '호텔', r: 'hotel', de: 'Hotel' }, { w: '시장', r: 'sijang', de: 'Markt' }, { w: '병원', r: 'byeongwon', de: 'Krankenhaus' }
];
export const L_LIST = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
export const V_LIST = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
export const T_LIST = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
export function compose(l, v, t) {
  const li = L_LIST.indexOf(l), vi = V_LIST.indexOf(v), ti = t ? T_LIST.indexOf(t) : 0;
  if (li < 0 || vi < 0 || ti < 0) return '';
  return String.fromCharCode(0xAC00 + (li * 21 + vi) * 28 + ti);
}
export function decompose(ch) {
  const c = ch.charCodeAt(0) - 0xAC00; if (c < 0 || c > 11171) return null;
  return { l: L_LIST[Math.floor(c / 588)], v: V_LIST[Math.floor((c % 588) / 28)], t: T_LIST[c % 28] };
}
export const ROMAN_T = { '': '', 'ㄱ': 'k', 'ㄴ': 'n', 'ㄷ': 't', 'ㄹ': 'l', 'ㅁ': 'm', 'ㅂ': 'p', 'ㅇ': 'ng' };
