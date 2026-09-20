// Kana: Hiragana und Katakana nach Reihen, mit Hepburn-Umschrift, Verwechselpaaren und Wortpools zum Lesenüben
const H = {
  a: [['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o']],
  ka: [['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko']],
  sa: [['さ', 'sa'], ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so']],
  ta: [['た', 'ta'], ['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to']],
  na: [['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no']],
  ha: [['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho']],
  ma: [['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo']],
  ya: [['や', 'ya'], ['ゆ', 'yu'], ['よ', 'yo']],
  ra: [['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro']],
  wa: [['わ', 'wa'], ['を', 'o'], ['ん', 'n']]
};
const K = {
  a: [['ア', 'a'], ['イ', 'i'], ['ウ', 'u'], ['エ', 'e'], ['オ', 'o']],
  ka: [['カ', 'ka'], ['キ', 'ki'], ['ク', 'ku'], ['ケ', 'ke'], ['コ', 'ko']],
  sa: [['サ', 'sa'], ['シ', 'shi'], ['ス', 'su'], ['セ', 'se'], ['ソ', 'so']],
  ta: [['タ', 'ta'], ['チ', 'chi'], ['ツ', 'tsu'], ['テ', 'te'], ['ト', 'to']],
  na: [['ナ', 'na'], ['ニ', 'ni'], ['ヌ', 'nu'], ['ネ', 'ne'], ['ノ', 'no']],
  ha: [['ハ', 'ha'], ['ヒ', 'hi'], ['フ', 'fu'], ['ヘ', 'he'], ['ホ', 'ho']],
  ma: [['マ', 'ma'], ['ミ', 'mi'], ['ム', 'mu'], ['メ', 'me'], ['モ', 'mo']],
  ya: [['ヤ', 'ya'], ['ユ', 'yu'], ['ヨ', 'yo']],
  ra: [['ラ', 'ra'], ['リ', 'ri'], ['ル', 'ru'], ['レ', 're'], ['ロ', 'ro']],
  wa: [['ワ', 'wa'], ['ヲ', 'o'], ['ン', 'n']]
};
const HINTS = { a: 'a wie in „Vater“', i: 'i', u: 'u, mit wenig Lippenrundung', e: 'e wie in „Bett“', o: 'o', shi: 'schi', chi: 'tschi', tsu: 'tsu, wie in „Zug“ ohne g', fu: 'zwischen f und h, ohne Zähne an der Lippe', ra: 'zwischen r, l und d, kurz mit der Zunge', ri: 'zwischen r und l', ru: 'zwischen r und l', re: 'zwischen r und l', ro: 'zwischen r und l', n: 'n am Silbenende, vor b/m/p wie m', ya: 'ja', yu: 'ju', yo: 'jo' };
function rows(tab, kind, names) { return names.flatMap(row => tab[row].map(([k, r]) => ({ k, r, kind, row, hint: HINTS[r] || r }))); }
// Regeln: Trübung, Halbtrübung, kleine ya/yu/yo, kleines tsu, lange Vokale
const RULES_H = [
  { k: 'が', r: 'ga', hint: 'Zwei Striche (Dakuten) machen k → g, s → z, t → d, h → b: が ざ だ ば', ex: 'がっこう = gakkō (Schule)' },
  { k: 'ざ', r: 'za', hint: 'さ mit Dakuten. じ = ji, ず = zu', ex: 'ざっし = zasshi (Zeitschrift)' },
  { k: 'だ', r: 'da', hint: 'た mit Dakuten. で = de, ど = do', ex: 'でんしゃ = densha (Zug)' },
  { k: 'ば', r: 'ba', hint: 'は mit Dakuten. び = bi, ぶ = bu', ex: 'びょういん = byōin (Krankenhaus)' },
  { k: 'ぱ', r: 'pa', hint: 'は mit Kreis (Handakuten) = p: ぱ ぴ ぷ ぺ ぽ', ex: 'きっぷ = kippu (Fahrkarte)' },
  { k: 'きゃ', r: 'kya', hint: 'Kleines ゃ ゅ ょ verschmilzt mit der Silbe davor: きゃ きゅ きょ', ex: 'きょう = kyō (heute)' },
  { k: 'しゃ', r: 'sha', hint: 'しゃ しゅ しょ = sha shu sho; ちゃ = cha; じゃ = ja', ex: 'おちゃ = ocha (Tee)' },
  { k: 'っ', r: '(Doppelkonsonant)', hint: 'Kleines っ verdoppelt den folgenden Konsonanten: kurzer Stopp wie im Italienischen', ex: 'きっぷ = kippu' },
  { k: 'おう', r: 'ō', hint: 'Lange Vokale: おう und おお = ō, えい = ē, うう = ū. Lang halten, sonst ändert sich das Wort', ex: 'とうきょう = Tōkyō' }
];
const RULES_K = [
  { k: 'ー', r: '(lang)', hint: 'Der Strich verlängert den Vokal davor', ex: 'コーヒー = kōhī (Kaffee)' },
  { k: 'ガ', r: 'ga', hint: 'Dakuten wie bei Hiragana: ガ ザ ダ バ, Handakuten パ', ex: 'バス = basu (Bus)' },
  { k: 'ッ', r: '(Doppelkonsonant)', hint: 'Kleines ッ verdoppelt den folgenden Konsonanten', ex: 'チケット = chiketto (Ticket)' },
  { k: 'キャ', r: 'kya', hint: 'Kleines ャ ュ ョ wie bei Hiragana', ex: 'メニュー = menyū' },
  { k: 'ティ', r: 'ti', hint: 'Kleine Vokale bilden neue Laute für Fremdwörter: ティ ディ ファ フィ ウィ', ex: 'パーティー = pātī' }
];
export const STAGES = [
  { id: 'H1', kind: 'H', title: 'Hiragana 1: あ bis こ', chars: rows(H, 'H', ['a', 'ka']) },
  { id: 'H2', kind: 'H', title: 'Hiragana 2: さ bis と', chars: rows(H, 'H', ['sa', 'ta']) },
  { id: 'H3', kind: 'H', title: 'Hiragana 3: な bis ほ', chars: rows(H, 'H', ['na', 'ha']) },
  { id: 'H4', kind: 'H', title: 'Hiragana 4: ま bis ん', chars: rows(H, 'H', ['ma', 'ya', 'ra', 'wa']) },
  { id: 'H5', kind: 'H', title: 'Hiragana 5: Trübung, kleine Zeichen, lange Vokale', chars: [], rules: RULES_H },
  { id: 'K1', kind: 'K', title: 'Katakana 1: ア bis ソ', chars: rows(K, 'K', ['a', 'ka', 'sa']) },
  { id: 'K2', kind: 'K', title: 'Katakana 2: タ bis ホ', chars: rows(K, 'K', ['ta', 'na', 'ha']) },
  { id: 'K3', kind: 'K', title: 'Katakana 3: マ bis ン und Regeln', chars: rows(K, 'K', ['ma', 'ya', 'ra', 'wa']), rules: RULES_K }
];
export const CONFUSABLE = {
  'ぬ': ['め', 'ね'], 'め': ['ぬ', 'の'], 'ね': ['れ', 'わ'], 'れ': ['ね', 'わ'], 'わ': ['ね', 'れ'], 'さ': ['き', 'ち'], 'き': ['さ'], 'ち': ['さ', 'ら'],
  'は': ['ほ', 'ま'], 'ほ': ['は', 'ま'], 'ま': ['も', 'は'], 'る': ['ろ'], 'ろ': ['る'], 'う': ['つ', 'ら'], 'つ': ['う'], 'い': ['り'], 'り': ['い'],
  'こ': ['に'], 'に': ['こ'], 'た': ['な'], 'な': ['た'], 'く': ['へ'], 'へ': ['く'], 'あ': ['お'], 'お': ['あ'], 'け': ['は'], 'せ': ['さ'],
  'シ': ['ツ', 'ン', 'ソ'], 'ツ': ['シ', 'ソ', 'ン'], 'ソ': ['ン', 'ツ', 'リ'], 'ン': ['ソ', 'シ', 'ツ'], 'ク': ['ワ', 'タ'], 'ワ': ['ク', 'フ'], 'タ': ['ク', 'ナ'],
  'ナ': ['メ', 'タ'], 'メ': ['ナ', 'ノ'], 'ノ': ['メ', 'ソ'], 'ア': ['マ', 'ヤ'], 'マ': ['ア'], 'ユ': ['コ'], 'コ': ['ユ', 'ロ'], 'ロ': ['コ', 'ル'], 'ル': ['レ', 'ロ'],
  'レ': ['ル'], 'ス': ['ヌ', 'ネ'], 'ヌ': ['ス'], 'ホ': ['オ', 'ネ'], 'オ': ['ホ'], 'チ': ['テ'], 'テ': ['チ'], 'カ': ['力', 'ヵ'], 'フ': ['ワ', 'ス'], 'ヒ': ['ビ'], 'セ': ['サ']
};
// Wörter zum Lesenüben, je Stufe nur mit bis dahin bekannten Zeichen
export const WORDS = {
  H1: [['あい', 'ai', 'Liebe'], ['いえ', 'ie', 'Haus'], ['かお', 'kao', 'Gesicht'], ['えき', 'eki', 'Bahnhof'], ['あき', 'aki', 'Herbst'], ['こえ', 'koe', 'Stimme'], ['いけ', 'ike', 'Teich'], ['うえ', 'ue', 'oben'], ['あお', 'ao', 'blau'], ['かき', 'kaki', 'Kaki']],
  H2: [['すし', 'sushi', 'Sushi'], ['さけ', 'sake', 'Sake'], ['たこ', 'tako', 'Krake'], ['いす', 'isu', 'Stuhl'], ['あさ', 'asa', 'Morgen'], ['そと', 'soto', 'draußen'], ['しお', 'shio', 'Salz'], ['つき', 'tsuki', 'Mond'], ['くつ', 'kutsu', 'Schuhe'], ['ちかてつ', 'chikatetsu', 'U-Bahn'], ['おさけ', 'osake', 'Alkohol']],
  H3: [['はな', 'hana', 'Blume'], ['ねこ', 'neko', 'Katze'], ['いぬ', 'inu', 'Hund'], ['ふね', 'fune', 'Schiff'], ['はし', 'hashi', 'Stäbchen'], ['ほし', 'hoshi', 'Stern'], ['にく', 'niku', 'Fleisch'], ['なつ', 'natsu', 'Sommer'], ['ひと', 'hito', 'Mensch'], ['おなか', 'onaka', 'Bauch']],
  H4: [['やま', 'yama', 'Berg'], ['みせ', 'mise', 'Laden'], ['わたし', 'watashi', 'ich'], ['ゆき', 'yuki', 'Schnee'], ['さくら', 'sakura', 'Kirschblüte'], ['みかん', 'mikan', 'Mandarine'], ['よる', 'yoru', 'Nacht'], ['まち', 'machi', 'Stadt'], ['うみ', 'umi', 'Meer'], ['ゆめ', 'yume', 'Traum'], ['おかね', 'okane', 'Geld'], ['みず', 'mizu', 'Wasser']],
  H5: [['がっこう', 'gakkō', 'Schule'], ['きっぷ', 'kippu', 'Fahrkarte'], ['おちゃ', 'ocha', 'Tee'], ['でんしゃ', 'densha', 'Zug'], ['とうきょう', 'Tōkyō', 'Tokio'], ['ぎんこう', 'ginkō', 'Bank'], ['びょういん', 'byōin', 'Krankenhaus'], ['じかん', 'jikan', 'Zeit'], ['きょう', 'kyō', 'heute'], ['ざっし', 'zasshi', 'Zeitschrift'], ['りょこう', 'ryokō', 'Reise']],
  K1: [['アイス', 'aisu', 'Eis'], ['ケーキ', 'kēki', 'Kuchen'], ['ソース', 'sōsu', 'Soße'], ['スイカ', 'suika', 'Wassermelone'], ['コース', 'kōsu', 'Kurs, Menü'], ['エース', 'ēsu', 'Ass'], ['キス', 'kisu', 'Kuss'], ['カカオ', 'kakao', 'Kakao']],
  K2: [['バス', 'basu', 'Bus'], ['タクシー', 'takushī', 'Taxi'], ['カード', 'kādo', 'Karte'], ['チーズ', 'chīzu', 'Käse'], ['ハート', 'hāto', 'Herz'], ['ドア', 'doa', 'Tür'], ['テスト', 'tesuto', 'Test'], ['ビデオ', 'bideo', 'Video'], ['ホース', 'hōsu', 'Schlauch'], ['スープ', 'sūpu', 'Suppe'], ['トースト', 'tōsuto', 'Toast']],
  K3: [['ホテル', 'hoteru', 'Hotel'], ['トイレ', 'toire', 'Toilette'], ['ビール', 'bīru', 'Bier'], ['コーヒー', 'kōhī', 'Kaffee'], ['レストラン', 'resutoran', 'Restaurant'], ['メニュー', 'menyū', 'Speisekarte'], ['ラーメン', 'rāmen', 'Ramen'], ['コンビニ', 'konbini', 'Minimarkt'], ['ドイツ', 'doitsu', 'Deutschland'], ['パスポート', 'pasupōto', 'Reisepass'], ['チケット', 'chiketto', 'Ticket'], ['サラダ', 'sarada', 'Salat'], ['ワイン', 'wain', 'Wein'], ['カメラ', 'kamera', 'Kamera'], ['ミルク', 'miruku', 'Milch'], ['パン', 'pan', 'Brot']]
};
export const ALL_CHARS = STAGES.flatMap(s => s.chars);
