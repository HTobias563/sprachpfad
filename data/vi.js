// Vietnamesisch – Inhalte für den Urlaub (reine Daten)
// Felder je Eintrag: id (bleibt stabil, daran hängt der Lernfortschritt), text (Vietnamesisch, Nord-Standard),
// de (Deutsch), hint (Klingt wie, nach der Legende unten), note (Hinweis), optional tts (Sprechtext), alt (weitere richtige Antworten)
// Lektionen: type 'script' (Plugin), 'understand' (nur erkennen), sonst Vokabeln. tip = Tipp-Karte vor der ersten Aufgabe.
export default {
  code: 'vi',
  version: 2,
  name: 'Vietnamesisch',
  ttsLang: 'vi-VN',
  flag: '🇻🇳',
  testPhrase: 'Xin chào, tôi tên là Linh.',

  tones: [
    { key: 'ngang', mark: '', sample: 'ma', name: 'ngang', label: 'Ebener Ton', desc: 'Gleichmäßig, mittlere Höhe. Kein Zeichen.', meaning: 'ma = Geist' },
    { key: 'huyen', mark: '̀', sample: 'mà', name: 'huyền', label: 'Fallend', desc: 'Beginnt tief und sinkt weich ab. Zeichen: Gravis (à).', meaning: 'mà = aber' },
    { key: 'sac', mark: '́', sample: 'má', name: 'sắc', label: 'Steigend', desc: 'Steigt zügig nach oben. Zeichen: Akut (á).', meaning: 'má = Wange, Mama (Süden)' },
    { key: 'hoi', mark: '̉', sample: 'mả', name: 'hỏi', label: 'Fallend-steigend', desc: 'Sinkt ab und kommt wieder hoch, wie eine Frage. Zeichen: Häkchen (ả).', meaning: 'mả = Grab' },
    { key: 'nga', mark: '̃', sample: 'mã', name: 'ngã', label: 'Steigend mit Knick', desc: 'Steigt mit kurzem Bruch in der Mitte. Im Süden wie hỏi. Zeichen: Tilde (ã).', meaning: 'mã = Code' },
    { key: 'nang', mark: '̣', sample: 'mạ', name: 'nặng', label: 'Kurz und tief', desc: 'Kurz, tief, abrupt abgebrochen. Im Süden tief, aber länger. Zeichen: Punkt unten (ạ).', meaning: 'mạ = Reissetzling' }
  ],
  toneSets: [['ma', 'mà', 'má', 'mả', 'mã', 'mạ'], ['ba', 'bà', 'bá', 'bả', 'bã', 'bạ'], ['la', 'là', 'lá', 'lả', 'lã', 'lạ'], ['ta', 'tà', 'tá', 'tả', 'tã', 'tạ']],
  // Echte Wortpaare, die sich nur im Ton unterscheiden
  toneWordSets: [
    [{ t: 'mười', de: '10' }, { t: 'mươi', de: '-zig, wie in hai mươi' }],
    [{ t: 'ba', de: '3' }, { t: 'bà', de: 'Großmutter, ältere Frau' }],
    [{ t: 'năm', de: '5' }, { t: 'nằm', de: 'liegen' }],
    [{ t: 'đắt', de: 'teuer' }, { t: 'đặt', de: 'reservieren' }, { t: 'đất', de: 'Erde, Boden' }],
    [{ t: 'xa', de: 'weit' }, { t: 'xã', de: 'Gemeinde' }],
    [{ t: 'chợ', de: 'Markt' }, { t: 'chờ', de: 'warten' }],
    [{ t: 'ngon', de: 'lecker' }, { t: 'ngón', de: 'Finger' }],
    [{ t: 'tiền', de: 'Geld' }, { t: 'tiến', de: 'vorwärts gehen' }],
    [{ t: 'mai', de: 'morgen' }, { t: 'mái', de: 'Dach' }],
    [{ t: 'bảy', de: '7' }, { t: 'bay', de: 'fliegen' }],
    [{ t: 'gần', de: 'nah' }, { t: 'gân', de: 'Sehne' }],
    [{ t: 'mà', de: 'aber' }, { t: 'má', de: 'Wange' }, { t: 'ma', de: 'Geist' }]
  ],

  // Legende der Lautschrift („Klingt wie“), Nord-Aussprache wie die Stimme Linh
  pronunciation: [
    ['đ', 'd'],
    ['d, gi, r', 'z = weiches s wie in „Rose“ (Norden; im Süden j)'],
    ['s, x', 's, scharf'],
    ['ch, tr', 'tsch'],
    ['nh', 'nj wie in „Cognac“'],
    ['ng, ngh', 'ng wie in „singen“, auch am Wortanfang'],
    ['kh', 'ch wie in „Bach“'],
    ['th', 't mit Hauch (wie in „Theater“)'],
    ['ph', 'f'],
    ['v', 'w'],
    ['qu', 'kw'],
    ['c, k', 'k'],
    ['ư', 'ü, ohne Lippenrundung'],
    ['ơ', 'ö, ohne Lippenrundung'],
    ['â', 'ö, kurz und dumpf'],
    ['ă', 'a, kurz'],
    ['ê', 'e wie in „See“'],
    ['e', 'ä'],
    ['ô', 'o wie in „Boot“'],
    ['o', 'o, sehr offen'],
    ['ươ / ưa', 'ü-ö / ü-a'],
    ['iê / ia', 'ie'],
    ['uô / ua', 'u-o'],
    ['ay / ây', 'ai (kurz) / äi'],
    ['ai', 'ai, langes a'],
    ['ao, au', 'au'],
    ['âu', 'öu'],
    ['-anh / -ach', 'ain / ak'],
    ['-c, -t, -p', 'am Ende kurz, nicht abgesprengt']
  ],

  units: [
    {
      id: 'u1', title: 'Erste Worte', subtitle: 'Töne, Hallo, Danke, Anrede', color: '#2563eb',
      can: ['grüßen und dich bedanken', 'jemanden richtig ansprechen', 'sagen, dass du nichts verstehst'],
      lessons: [
        { id: 'u1l0', title: 'Die 6 Töne', type: 'script', plugin: 'tones' },
        {
          id: 'u1l1', title: 'Hallo & Danke', tip: '„Xin chào“ passt zu jeder Tageszeit. „Cảm ơn“ wird höflicher mit einem Namen oder einer Anrede dahinter, zum Beispiel „Cảm ơn chị“.',
          items: [
            { id: 'xin-chao', text: 'Xin chào', de: 'Hallo', hint: 'sin tschau', note: 'Passt zu jeder Tageszeit. „Chào“ allein ist lockerer.' },
            { id: 'cam-on', text: 'Cảm ơn', de: 'Danke', hint: 'kam ön', note: 'Höflicher mit „ạ“ am Ende: „Cảm ơn ạ“.' },
            { id: 'cam-on-nhieu', text: 'Cảm ơn nhiều', de: 'Vielen Dank', hint: 'kam ön njieu', note: '„nhiều“ heißt viel.' },
            { id: 'xin-loi', text: 'Xin lỗi', de: 'Entschuldigung', hint: 'sin loi', note: 'Zum Entschuldigen und um Aufmerksamkeit zu bekommen.' },
            { id: 'khong-sao', text: 'Không sao', de: 'Kein Problem', hint: 'chong sau', note: 'Antwort auf eine Entschuldigung. „sao“ heißt hier „wie, was“, sinngemäß „nichts passiert“.' },
            { id: 'tam-biet', text: 'Tạm biệt', de: 'Auf Wiedersehen', hint: 'tam biet', note: 'Im Alltag verabschiedet man sich oft auch mit „Chào anh“ oder „Chào chị“.' }
          ]
        },
        {
          id: 'u1l2', title: 'Ja, Nein, Bitte', tip: 'Fragen enden oft auf „không?“, wörtlich „oder nicht?“. Die Antwort ist dann „Có“ (ja, gibt es) oder „Không“ (nein).',
          items: [
            { id: 'vang', text: 'Vâng', de: 'Ja (Norden)', hint: 'wöng', note: 'Höflich, im Norden üblich.' },
            { id: 'da', text: 'Dạ', de: 'Ja (Süden, sehr höflich)', hint: 'za (Norden) · ja (Süden)', note: 'Wird auch vor Antworten gesetzt: „Dạ, cảm ơn“.' },
            { id: 'khong', text: 'Không', de: 'Nein', hint: 'chong', note: 'Bedeutet auch „nicht“ und steht dann vor dem Verb.' },
            { id: 'co', text: 'Có', de: 'Ja, gibt es', hint: 'ko', note: 'Antwort auf „Có … không?“ Wörtlich: „haben, es gibt“.' },
            { id: 'lam-on', text: 'Làm ơn', de: 'Bitte (Bitte um etwas)', hint: 'lam ön', note: 'Nur beim Bitten. Als Antwort auf Danke: „Không có gì“.' },
            { id: 'khong-co-gi', text: 'Không có gì', de: 'Gern geschehen', hint: 'chong ko zi', note: 'Wörtlich: „Da ist nichts“.' }
          ]
        },
        {
          id: 'u1l3', title: 'Anrede & Rufen', tip: 'Vietnamesen sprechen sich nach Alter an. Faustregel: etwas älter als du → anh (Mann) oder chị (Frau), jünger → em. Im Zweifel anh/chị, das schmeichelt. „Bạn“ ist neutral für Gleichaltrige.',
          items: [
            { id: 'toi', text: 'Tôi', de: 'ich', hint: 'toi', note: 'Neutral und immer richtig.' },
            { id: 'ban', text: 'Bạn', de: 'du (Gleichaltrige)', hint: 'ban', note: 'Freundlich, für Gleichaltrige. Für Ältere lieber anh oder chị.' },
            { id: 'anh', text: 'anh', de: 'Sie / du (zu etwas älterem Mann)', hint: 'ain', note: 'Wörtlich „großer Bruder“. Deutlich Ältere: „chú“ (Mann), „cô“ (Frau).' },
            { id: 'chi', text: 'chị', de: 'Sie / du (zu etwas älterer Frau)', hint: 'tschi', note: 'Wörtlich „große Schwester“. Passt zu Verkäuferinnen, Bedienungen, Hotelpersonal.' },
            { id: 'em', text: 'em', de: 'du (zu Jüngeren)', hint: 'äm', note: 'Für jüngere Bedienungen, Kinder, jüngere Freunde.' },
            { id: 'em-oi', text: 'Em ơi!', de: 'Hallo, Bedienung! (zu Jüngeren)', hint: 'äm öi', note: 'So ruft man im Restaurant. Bei älterem Personal: „Anh ơi!“ oder „Chị ơi!“.' },
            { id: 'chao-chi', text: 'Chào chị', de: 'Hallo (zu einer Frau)', hint: 'tschau tschi', note: 'Gruß plus Anrede wirkt viel freundlicher als „Xin chào“ allein.' }
          ]
        },
        {
          id: 'u1l4', title: 'Verstehen & Nachfragen', tip: '„Được“ ist ein Alleskönner: „geht“, „okay“, „möglich“. Als Frage „… được không?“ = „Geht das?“',
          items: [
            { id: 'toi-khong-hieu', text: 'Tôi không hiểu', de: 'Ich verstehe nicht', hint: 'toi chong hieu', note: '' },
            { id: 'noi-tieng-anh', text: 'Bạn có nói tiếng Anh không?', de: 'Sprichst du Englisch?', hint: 'ban ko noi tieng ain chong', note: '„có … không?“ ist der normale Ja/Nein-Rahmen.' },
            { id: 'noi-cham-lai', text: 'Làm ơn nói chậm lại', de: 'Bitte langsamer sprechen', hint: 'lam ön noi tschöm lai', note: '„chậm“ = langsam, „lại“ = nochmal.' },
            { id: 'doi-mot-chut', text: 'Đợi một chút', de: 'Einen Moment, bitte', hint: 'döi mot tschut', note: '„một chút“ = ein bisschen.' },
            { id: 'cai-nay-la-gi', text: 'Cái này là gì?', de: 'Was ist das?', hint: 'kai nai la zi', note: 'Zeigen und fragen. „gì“ = was.' },
            { id: 'duoc', text: 'Được', de: 'Okay, geht', hint: 'dü-ök', note: 'Antwort auf fast alles. Verneint: „Không được“ = geht nicht.' }
          ]
        }
      ]
    },
    {
      id: 'u2', title: 'Essen & Trinken', subtitle: 'Bestellen, Getränke, Gerichte, Wünsche', color: '#f59e0b',
      can: ['Essen und Getränke bestellen', 'die Rechnung verlangen', 'sagen, was du nicht isst'],
      lessons: [
        {
          id: 'u2l1', title: 'Bestellen', tip: '„Cho tôi …“ heißt wörtlich „Geben Sie mir …“ und ist die Standardformel zum Bestellen. Freundlicher mit „nhé“ am Ende: „Cho tôi một cà phê nhé“.',
          items: [
            { id: 'cho-toi-ca-phe', text: 'Cho tôi một cà phê', de: 'Einen Kaffee für mich', hint: 'tscho toi mot ka fe', note: '„một“ = ein. Danach einfach das Gericht oder Getränk einsetzen.' },
            { id: 'thuc-don', text: 'thực đơn', de: 'Speisekarte', hint: 'thük dön', note: '„Menu“ versteht auch jeder.' },
            { id: 'toi-muon-cai-nay', text: 'Tôi muốn cái này', de: 'Ich möchte das hier', hint: 'toi mu-on kai nai', note: 'Zeigen und sagen. „cái này“ = das hier.' },
            { id: 'tinh-tien', text: 'Tính tiền!', de: 'Die Rechnung, bitte!', hint: 'ting tien', note: 'Wörtlich: „Geld berechnen“. Gern mit Anrede: „Em ơi, tính tiền!“' },
            { id: 'mang-ve', text: 'Mang về', de: 'Zum Mitnehmen', hint: 'mang we', note: 'Wörtlich: „nach Hause bringen“.' },
            { id: 'an-o-day', text: 'Ăn ở đây', de: 'Hier essen', hint: 'an ö däi', note: 'Antwort auf die Frage „Ăn ở đây hay mang về?“' }
          ]
        },
        {
          id: 'u2l2', title: 'Getränke', tip: 'Kaffee gibt es „sữa“ (mit süßer Kondensmilch) oder „đen“ (schwarz), jeweils „đá“ (mit Eis) oder „nóng“ (heiß). In Hanoi heißt cà phê sữa đá oft „nâu đá“.',
          items: [
            { id: 'ca-phe-sua-da', text: 'cà phê sữa đá', de: 'Eiskaffee mit Kondensmilch', hint: 'ka fe sü-a da', note: 'Das Nationalgetränk. In Hanoi: „nâu đá“.' },
            { id: 'ca-phe-den-da', text: 'cà phê đen đá', de: 'schwarzer Eiskaffee', hint: 'ka fe dän da', note: 'Stark und oft leicht gesüßt. Ungesüßt: „không đường“.' },
            { id: 'mot-chai-nuoc', text: 'một chai nước', de: 'eine Flasche Wasser', hint: 'mot tschai nü-ök', note: '„chai“ = Flasche, „nước“ = Wasser. Mineralwasser: „nước suối“.' },
            { id: 'bia', text: 'bia', de: 'Bier', hint: 'bia', note: '„bia hơi“ ist frisches Fassbier für ein paar Tausend Dong.' },
            { id: 'tra', text: 'trà đá', de: 'Eistee', hint: 'tscha da', note: 'Gibt es in vielen Lokalen gratis zum Essen.' },
            { id: 'nuoc-dua', text: 'nước dừa', de: 'Kokoswasser', hint: 'nü-ök zü-a', note: 'Direkt aus der Nuss mit Strohhalm.' },
            { id: 'nuoc-mia', text: 'nước mía', de: 'Zuckerrohrsaft', hint: 'nü-ök mia', note: 'Frisch gepresst an Straßenständen.' }
          ]
        },
        {
          id: 'u2l3', title: 'Gerichte', tip: '„phở“ spricht man „fö“, nicht „fo“. „bò“ = Rind, „gà“ = Huhn, „heo“ oder „lợn“ = Schwein.',
          items: [
            { id: 'pho-bo', text: 'phở bò', de: 'Nudelsuppe mit Rind', hint: 'fö bo', note: '„bò“ = Rind.' },
            { id: 'pho-ga', text: 'phở gà', de: 'Nudelsuppe mit Huhn', hint: 'fö ga', note: '„gà“ = Huhn.' },
            { id: 'banh-mi', text: 'bánh mì', de: 'Baguette-Sandwich', hint: 'bain mi', note: '„bánh“ = Gebäck, „mì“ = Weizen.' },
            { id: 'com', text: 'cơm', de: 'Reis (gekocht)', hint: 'köm', note: '„cơm“ heißt auch einfach „Mahlzeit“.' },
            { id: 'bun-cha', text: 'bún chả', de: 'Reisnudeln mit Grillfleisch', hint: 'bun tscha', note: 'Hanoi-Klassiker.' },
            { id: 'goi-cuon', text: 'gỏi cuốn', de: 'Sommerrollen', hint: 'goi ku-on', note: 'Frisch, nicht frittiert. Im Norden „nem cuốn“.' }
          ]
        },
        {
          id: 'u2l4', title: 'Wünsche & Allergien', tip: '„không“ vor einem Wort heißt „ohne“ oder „nicht“: không cay = nicht scharf, không đường = ohne Zucker.',
          items: [
            { id: 'ngon-qua', text: 'Ngon quá!', de: 'Sehr lecker!', hint: 'ngon kwa', note: '„quá“ = sehr, total. Freut jede Köchin.' },
            { id: 'khong-cay', text: 'không cay', de: 'nicht scharf', hint: 'chong kai', note: '„cay“ = scharf.' },
            { id: 'khong-duong', text: 'không đường', de: 'ohne Zucker', hint: 'chong dü-öng', note: 'Getränke sind oft sehr süß.' },
            { id: 'it-da', text: 'ít đá', de: 'wenig Eis', hint: 'it da', note: '„ít“ = wenig, „đá“ = Eis.' },
            { id: 'toi-an-chay', text: 'Tôi ăn chay', de: 'Ich esse vegetarisch', hint: 'toi an tschai', note: 'Fischsauce ist oft trotzdem drin. Sicherheitshalber: „không nước mắm“.' },
            { id: 'khong-an-thit', text: 'Tôi không ăn thịt', de: 'Ich esse kein Fleisch', hint: 'toi chong an thit', note: '„thịt“ = Fleisch.' },
            { id: 'di-ung', text: 'Tôi bị dị ứng', de: 'Ich habe eine Allergie', hint: 'toi bi zi üng', note: 'Danach das Wort zeigen oder sagen, z. B. „đậu phộng“ = Erdnuss.' }
          ]
        },
        {
          id: 'u2l5', title: 'Zutaten', tip: 'Diese Wörter braucht man für Allergien und Wünsche: „không“ + Zutat = ohne diese Zutat.',
          items: [
            { id: 'thit', text: 'thịt', de: 'Fleisch', hint: 'thit', note: '„thịt bò“ = Rindfleisch, „thịt heo“ = Schweinefleisch.' },
            { id: 'ca', text: 'cá', de: 'Fisch', hint: 'ka', note: '' },
            { id: 'tom', text: 'tôm', de: 'Garnelen', hint: 'tom', note: '' },
            { id: 'trung', text: 'trứng', de: 'Ei', hint: 'tschüng', note: '' },
            { id: 'dau-phong', text: 'đậu phộng', de: 'Erdnuss', hint: 'döu fong', note: 'Im Norden „lạc“. Bei Allergie beides sagen.' },
            { id: 'rau', text: 'rau', de: 'Gemüse', hint: 'zau', note: '„rau thơm“ = frische Kräuter.' },
            { id: 'nuoc-mam', text: 'nước mắm', de: 'Fischsauce', hint: 'nü-ök mam', note: 'In fast allem drin.' }
          ]
        },
        {
          id: 'u2l6', title: 'Was die Bedienung sagt', type: 'understand', tip: 'Diese Sätze musst du nur verstehen, nicht sagen. Hör genau hin.',
          items: [
            { id: 'u-an-hay-mang-ve', text: 'Ăn ở đây hay mang về?', de: 'Hier essen oder mitnehmen?', hint: 'an ö däi hai mang we', note: 'Antwort: „Ăn ở đây“ oder „Mang về“.' },
            { id: 'u-may-nguoi', text: 'Mấy người?', de: 'Wie viele Personen?', hint: 'mäi ngü-öi', note: 'Antwort: Zahl + „người“, z. B. „Hai người“.' },
            { id: 'u-uong-gi', text: 'Uống gì?', de: 'Was möchten Sie trinken?', hint: 'u-ong zi', note: '„uống“ = trinken.' },
            { id: 'u-het-roi', text: 'Hết rồi', de: 'Ist aus (ausverkauft)', hint: 'het zoi', note: 'Dann etwas anderes bestellen.' }
          ]
        }
      ]
    },
    {
      id: 'u3', title: 'Zahlen & Preise', subtitle: 'Zählen, Dong, Handeln', color: '#16a34a',
      can: ['bis 100 zählen', 'Preise verstehen und nennen', 'nach dem Preis fragen und handeln'],
      lessons: [
        {
          id: 'u3l1', title: '0 bis 5', tip: 'Kurze Wörter, aber die Töne zählen: „năm“ (5) mit ebenem Ton, „nằm“ mit fallendem Ton heißt „liegen“.',
          items: [
            { id: 'n0', text: 'không', de: '0', hint: 'chong', note: 'Dasselbe Wort wie „nein“.' },
            { id: 'n1', text: 'một', de: '1', hint: 'mot', note: '' },
            { id: 'n2', text: 'hai', de: '2', hint: 'hai', note: '' },
            { id: 'n3', text: 'ba', de: '3', hint: 'ba', note: '' },
            { id: 'n4', text: 'bốn', de: '4', hint: 'bon', note: '' },
            { id: 'n5', text: 'năm', de: '5', hint: 'nam', note: 'Heißt auch „Jahr“.' }
          ]
        },
        {
          id: 'u3l2', title: '6 bis 10', tip: '„mười“ (10) hat den Ton huyền (fallend). Ab 20 wird daraus „mươi“ mit ebenem Ton.',
          items: [
            { id: 'n6', text: 'sáu', de: '6', hint: 'sau', note: '' },
            { id: 'n7', text: 'bảy', de: '7', hint: 'bai', note: '' },
            { id: 'n8', text: 'tám', de: '8', hint: 'tam', note: '' },
            { id: 'n9', text: 'chín', de: '9', hint: 'tschin', note: '' },
            { id: 'n10', text: 'mười', de: '10', hint: 'mü-öi', note: '' }
          ]
        },
        {
          id: 'u3l3', title: '11 bis 100', tip: 'Zehn-eins, zehn-zwei … Drei Ausnahmen: 15 = mười lăm, ab 20 heißt zehn „mươi“, und die 1 wird nach mươi zu „mốt“.',
          items: [
            { id: 'n11', text: 'mười một', de: '11', hint: 'mü-öi mot', note: 'Zehn-eins. Genauso: mười hai = 12, mười ba = 13.' },
            { id: 'n15', text: 'mười lăm', de: '15', hint: 'mü-öi lam', note: 'Achtung: 5 wird nach „mười“ zu „lăm“.' },
            { id: 'n20', text: 'hai mươi', de: '20', hint: 'hai mü-öi', note: 'Ab 20 wird „mười“ zu „mươi“ (anderer Ton).' },
            { id: 'n21', text: 'hai mươi mốt', de: '21', hint: 'hai mü-öi mot', note: 'Die 1 wird nach „mươi“ zu „mốt“.' },
            { id: 'n50', text: 'năm mươi', de: '50', hint: 'nam mü-öi', note: '' },
            { id: 'n100', text: 'một trăm', de: '100', hint: 'mot tscham', note: '' }
          ]
        },
        {
          id: 'u3l4', title: 'Tausend & Dong', tip: 'Faustregel: 30.000 Dong sind etwa 1 Euro. Nullen streichen und durch drei teilen. Beim Preis lässt man „nghìn“ oft weg: „năm mươi“ heißt dann 50.000.',
          items: [
            { id: 'n1000', text: 'một nghìn', de: '1.000', hint: 'mot ngin', note: 'Im Süden „một ngàn“.' },
            { id: 'n10000', text: 'mười nghìn', de: '10.000', hint: 'mü-öi ngin', note: 'Etwa 35 Cent.' },
            { id: 'n100000', text: 'một trăm nghìn', de: '100.000', hint: 'mot tscham ngin', note: 'Etwa 3,50 Euro. Beim Preis oft nur „một trăm“.' },
            { id: 'n1m', text: 'một triệu', de: '1.000.000', hint: 'mot tschieu', note: 'Etwa 35 Euro.' },
            { id: 'dong', text: 'đồng', de: 'Dong (Währung)', hint: 'dong', note: 'Steht nach der Zahl: „năm mươi nghìn đồng“.' }
          ]
        },
        {
          id: 'u3l5', title: 'Wie viel kostet?', tip: 'Auf Märkten ist Handeln normal, in Läden mit Preisschild nicht. „Đắt quá!“ mit Lächeln ist der Einstieg.',
          items: [
            { id: 'bao-nhieu-tien', text: 'Bao nhiêu tiền?', de: 'Wie viel kostet das?', hint: 'bau njieu tien', note: '„bao nhiêu“ = wie viel, „tiền“ = Geld.' },
            { id: 'dat-qua', text: 'Đắt quá!', de: 'Zu teuer!', hint: 'dat kwa', note: 'Im Süden: „Mắc quá!“' },
            { id: 'giam-gia', text: 'Giảm giá được không?', de: 'Geht es billiger?', hint: 'zam za dü-ök chong', note: 'Wörtlich: „Preis senken möglich?“' },
            { id: 'tien', text: 'tiền', de: 'Geld', hint: 'tien', note: '' },
            { id: 'tien-mat', text: 'tiền mặt', de: 'Bargeld', hint: 'tien mat', note: 'Auf Märkten und in kleinen Läden das einzige Zahlungsmittel.' },
            { id: 'tra-bang-the', text: 'Trả bằng thẻ được không?', de: 'Kann ich mit Karte zahlen?', hint: 'tscha bang thä dü-ök chong', note: '„thẻ“ = Karte, „trả“ = bezahlen.' }
          ]
        }
      ]
    },
    {
      id: 'u4', title: 'Unterwegs', subtitle: 'Wege, Taxi, Bahn, Orte', color: '#a855f7',
      can: ['nach dem Weg fragen', 'ein Taxi ans Ziel bringen', 'wichtige Orte benennen'],
      lessons: [
        {
          id: 'u4l1', title: 'Wo ist …?', tip: '„… ở đâu?“ = Wo ist …? Das Gesuchte kommt davor: „Nhà vệ sinh ở đâu?“',
          items: [
            { id: 'nha-ve-sinh', text: 'Nhà vệ sinh ở đâu?', de: 'Wo ist die Toilette?', hint: 'nja we sing ö döu', note: '„Toilet“ versteht auch jeder.' },
            { id: 'o-dau', text: 'ở đâu?', de: 'Wo?', hint: 'ö döu', note: 'Nach jedem Ort: „Chợ ở đâu?“ = Wo ist der Markt?' },
            { id: 'o-day', text: 'ở đây', de: 'hier', hint: 'ö däi', note: '' },
            { id: 'o-do', text: 'ở đó', de: 'dort', hint: 'ö do', note: '' },
            { id: 'gan', text: 'gần', de: 'nah', hint: 'gön', note: '' },
            { id: 'xa', text: 'xa', de: 'weit', hint: 'sa', note: '' }
          ]
        },
        {
          id: 'u4l2', title: 'Richtungen', tip: 'Mit Handzeichen zusammen reicht das völlig. Im Süden sagt man statt „rẽ“ meist „quẹo“.',
          items: [
            { id: 'ben-trai', text: 'bên trái', de: 'links', hint: 'ben tschai', note: '' },
            { id: 'ben-phai', text: 'bên phải', de: 'rechts', hint: 'ben fai', note: '' },
            { id: 'di-thang', text: 'đi thẳng', de: 'geradeaus', hint: 'di thang', note: '„đi“ = gehen.' },
            { id: 're-trai', text: 'rẽ trái', de: 'links abbiegen', hint: 'zä tschai', note: 'Süden: „quẹo trái“.' },
            { id: 're-phai', text: 'rẽ phải', de: 'rechts abbiegen', hint: 'zä fai', note: 'Süden: „quẹo phải“.' }
          ]
        },
        {
          id: 'u4l3', title: 'Taxi & Grab', tip: 'Die App Grab ist wie Uber, meist günstiger und ohne Preisdiskussion. Bei normalen Taxis vorher den Preis ausmachen oder auf das Taxameter bestehen.',
          items: [
            { id: 'taxi', text: 'taxi', de: 'Taxi', hint: 'tak-si', note: 'Verlässliche Firmen: Mai Linh, Vinasun.' },
            { id: 'xe-om', text: 'xe ôm', de: 'Motorradtaxi', hint: 'sä om', note: 'Wörtlich „Umarm-Fahrzeug“. Über Grab als „GrabBike“.' },
            { id: 'di-den-san-bay', text: 'Cho tôi đến sân bay', de: 'Zum Flughafen, bitte', hint: 'tscho toi den sön bai', note: '„Cho tôi đến …“ = Bringen Sie mich nach …' },
            { id: 'dung-o-day', text: 'Dừng ở đây', de: 'Hier anhalten', hint: 'zung ö däi', note: '' },
            { id: 'bao-lau', text: 'Bao lâu?', de: 'Wie lange?', hint: 'bau löu', note: '' },
            { id: 'den-do-bao-nhieu', text: 'Đến đó bao nhiêu tiền?', de: 'Was kostet die Fahrt dorthin?', hint: 'den do bau njieu tien', note: 'Vor dem Einsteigen fragen.' }
          ]
        },
        {
          id: 'u4l4', title: 'Zug, Bus, Ticket', tip: '„xe“ steht vor allem, was fährt: xe máy, xe buýt, xe đạp (Fahrrad). „vé“ ist das Ticket für alles.',
          items: [
            { id: 'xe-may', text: 'xe máy', de: 'Motorroller', hint: 'sä mai', note: '„xe“ = Fahrzeug, „máy“ = Maschine.' },
            { id: 'xe-buyt', text: 'xe buýt', de: 'Bus', hint: 'sä buit', note: '' },
            { id: 'ga-tau', text: 'ga tàu', de: 'Bahnhof', hint: 'ga tau', note: '„tàu“ = Zug, auch Schiff.' },
            { id: 'san-bay', text: 'sân bay', de: 'Flughafen', hint: 'sön bai', note: '„bay“ = fliegen.' },
            { id: 've', text: 'vé', de: 'Ticket', hint: 'wä', note: '„một vé đi Huế“ = ein Ticket nach Huế.' },
            { id: 'toi-muon-di', text: 'Tôi muốn đi Hà Nội', de: 'Ich möchte nach Hanoi', hint: 'toi mu-on di ha noi', note: '„muốn“ = wollen, „đi“ = gehen, fahren.' }
          ]
        },
        {
          id: 'u4l5', title: 'Orte', tip: 'Zusammen mit „ở đâu?“ ergibt jedes dieser Wörter eine fertige Frage.',
          items: [
            { id: 'khach-san', text: 'khách sạn', de: 'Hotel', hint: 'chak san', note: '' },
            { id: 'cho', text: 'chợ', de: 'Markt', hint: 'tschö', note: '' },
            { id: 'bai-bien', text: 'bãi biển', de: 'Strand', hint: 'bai bien', note: '„biển“ = Meer.' },
            { id: 'ngan-hang', text: 'ngân hàng', de: 'Bank', hint: 'ngön hang', note: '' },
            { id: 'nha-hang', text: 'nhà hàng', de: 'Restaurant', hint: 'nja hang', note: '„quán“ ist das einfache Lokal.' },
            { id: 'sieu-thi', text: 'siêu thị', de: 'Supermarkt', hint: 'sieu thi', note: '' }
          ]
        },
        {
          id: 'u4l6', title: 'Mehr Orte', tip: '„nhà“ heißt Haus und steckt in vielen Ortswörtern: nhà thuốc, nhà hàng, nhà vệ sinh.',
          items: [
            { id: 'benh-vien', text: 'bệnh viện', de: 'Krankenhaus', hint: 'beng wien', note: '' },
            { id: 'nha-thuoc', text: 'nhà thuốc', de: 'Apotheke', hint: 'nja thu-ok', note: 'Steht landesweit auf den Schildern. Umgangssprachlich Nord: „hiệu thuốc“.' },
            { id: 'cay-atm', text: 'cây ATM', de: 'Geldautomat', hint: 'käi a-te-em', note: '', tts: 'cây a tê em' },
            { id: 'chua', text: 'chùa', de: 'Pagode, Tempel', hint: 'tschu-a', note: 'Schultern und Knie bedecken.' },
            { id: 'cua-hang', text: 'cửa hàng', de: 'Laden', hint: 'kü-a hang', note: '' }
          ]
        }
      ]
    },
    {
      id: 'u5', title: 'Einkaufen & Hotel', subtitle: 'Markt, Größen, Zimmer', color: '#ef4444',
      can: ['auf dem Markt kaufen und handeln', 'im Hotel einchecken', 'nach WLAN und Frühstück fragen'],
      lessons: [
        {
          id: 'u5l1', title: 'Auf dem Markt', tip: 'Erst „Cái này bao nhiêu?“, dann „Đắt quá!“, dann einen Gegenvorschlag. Zum Abwimmeln freundlich „Chỉ xem thôi“.',
          items: [
            { id: 'cai-nay-bao-nhieu', text: 'Cái này bao nhiêu?', de: 'Was kostet das hier?', hint: 'kai nai bau njieu', note: '' },
            { id: 'dat', text: 'đắt', de: 'teuer', hint: 'dat', note: 'Süden: „mắc“.' },
            { id: 're', text: 'rẻ', de: 'billig', hint: 'zä', note: '' },
            { id: 'toi-lay-cai-nay', text: 'Tôi lấy cái này', de: 'Ich nehme das (Kauf)', hint: 'toi läi kai nai', note: '„lấy“ = nehmen.' },
            { id: 'cai-kia', text: 'cái kia', de: 'das da', hint: 'kai kia', note: '' },
            { id: 'chi-xem-thoi', text: 'Chỉ xem thôi', de: 'Ich schaue nur', hint: 'tschi säm thoi', note: 'Freundlich abwimmeln.' }
          ]
        },
        {
          id: 'u5l2', title: 'Größe & Auswahl', tip: '„Có … không?“ heißt „Gibt es …?“ und funktioniert mit allem: Có wifi không? Có cỡ khác không?',
          items: [
            { id: 'lon', text: 'lớn', de: 'groß', hint: 'lön', note: '' },
            { id: 'nho', text: 'nhỏ', de: 'klein', hint: 'njo', note: '' },
            { id: 'co-co-khac', text: 'Có cỡ khác không?', de: 'Gibt es eine andere Größe?', hint: 'ko kö chak chong', note: '„cỡ“ = Größe, „khác“ = anders.' },
            { id: 'co-mau-khac', text: 'Có màu khác không?', de: 'Gibt es eine andere Farbe?', hint: 'ko mau chak chong', note: '„màu“ = Farbe.' },
            { id: 'du-roi', text: 'Đủ rồi', de: 'Das reicht', hint: 'du zoi', note: 'Auch beim Nachschenken oder Auffüllen.' }
          ]
        },
        {
          id: 'u5l3', title: 'Hotel-Ankunft', tip: '„đã“ vor dem Verb markiert Vergangenheit: „Tôi đã đặt phòng“ = Ich habe reserviert.',
          items: [
            { id: 'phong', text: 'phòng', de: 'Zimmer', hint: 'fong', note: '' },
            { id: 'da-dat-phong', text: 'Tôi đã đặt phòng', de: 'Ich habe ein Zimmer reserviert', hint: 'toi da dat fong', note: '„đặt“ = reservieren.' },
            { id: 'hai-dem', text: 'hai đêm', de: 'zwei Nächte', hint: 'hai dem', note: '„đêm“ = Nacht.' },
            { id: 'chia-khoa', text: 'chìa khóa', de: 'Schlüssel', hint: 'tschia chwa', note: '' },
            { id: 'mat-khau-wifi', text: 'Mật khẩu wifi là gì?', de: 'Wie ist das WLAN-Passwort?', hint: 'möt chöu wifi la zi', note: '„mật khẩu“ = Passwort.', tts: 'Mật khẩu wi-fi là gì?' },
            { id: 'bua-sang', text: 'bữa sáng', de: 'Frühstück', hint: 'bü-a sang', note: '„bữa“ = Mahlzeit, „sáng“ = Morgen.' }
          ]
        },
        {
          id: 'u5l4', title: 'Im Zimmer', tip: '„Mấy giờ?“ fragt nach der Uhrzeit von etwas: „Bữa sáng mấy giờ?“ = Wann gibt es Frühstück?',
          items: [
            { id: 'may-gio', text: 'Mấy giờ?', de: 'Um wie viel Uhr?', hint: 'mäi zö', note: '„giờ“ = Stunde, Uhr.' },
            { id: 'nuoc-nong', text: 'nước nóng', de: 'heißes Wasser', hint: 'nü-ök nong', note: '' },
            { id: 'dieu-hoa', text: 'điều hòa', de: 'Klimaanlage', hint: 'dieu hwa', note: 'Im Süden „máy lạnh“.' },
            { id: 'khan', text: 'khăn', de: 'Handtuch', hint: 'chan', note: '„khăn tắm“ = Badetuch.' },
            { id: 'tra-phong', text: 'Tôi trả phòng', de: 'Ich checke aus', hint: 'toi tscha fong', note: 'Wörtlich: „Ich gebe das Zimmer zurück“.' }
          ]
        },
        {
          id: 'u5l5', title: 'Was das Hotel sagt', type: 'understand', tip: 'Nur verstehen, nicht sagen. Beim Einchecken kommen fast immer diese Sätze.',
          items: [
            { id: 'u-cho-xem-ho-chieu', text: 'Cho xem hộ chiếu', de: 'Bitte den Pass zeigen', hint: 'tscho säm ho tschieu', note: '„hộ chiếu“ = Reisepass.' },
            { id: 'u-may-dem', text: 'Mấy đêm?', de: 'Wie viele Nächte?', hint: 'mäi dem', note: 'Antwort: „hai đêm“, „ba đêm“.' },
            { id: 'u-bua-sang-tu', text: 'Bữa sáng từ sáu giờ đến mười giờ', de: 'Frühstück von 6 bis 10 Uhr', hint: 'bü-a sang tü sau zö den mü-öi zö', note: '„từ … đến …“ = von … bis …' },
            { id: 'u-phong-o-tang', text: 'Phòng ở tầng hai', de: 'Das Zimmer ist im zweiten Stock', hint: 'fong ö töng hai', note: '„tầng“ = Stockwerk.' }
          ]
        }
      ]
    },
    {
      id: 'u6', title: 'Smalltalk & Zeit', subtitle: 'Vorstellen, Alter, Tage, Wetter', color: '#0891b2',
      can: ['dich vorstellen', 'Smalltalk über Reise und Wetter machen', 'über Zeit und Tage sprechen'],
      lessons: [
        {
          id: 'u6l1', title: 'Vorstellen', tip: '„là“ = sein. „Tôi là …“ funktioniert für Name, Herkunft, Beruf.',
          items: [
            { id: 'toi-ten-la', text: 'Tôi tên là Hannah', de: 'Ich heiße Hannah', hint: 'toi ten la Hannah', note: '„tên“ = Name.', tts: 'Tôi tên là Han-na' },
            { id: 'ban-ten-la-gi', text: 'Bạn tên là gì?', de: 'Wie heißt du?', hint: 'ban ten la zi', note: 'Höflicher: „Anh tên là gì?“ / „Chị tên là gì?“' },
            { id: 'toi-den-tu-duc', text: 'Tôi đến từ Đức', de: 'Ich komme aus Deutschland', hint: 'toi den tü dük', note: '„Đức“ = Deutschland.' },
            { id: 'nguoi-duc', text: 'Tôi là người Đức', de: 'Ich bin Deutsche', hint: 'toi la ngü-öi dük', note: '„người“ = Mensch, Person.' },
            { id: 'rat-vui', text: 'Rất vui được gặp bạn', de: 'Freut mich, dich kennenzulernen', hint: 'zöt wui dü-ök gap ban', note: '„rất vui“ = sehr froh.' },
            { id: 'hen-gap-lai', text: 'Hẹn gặp lại', de: 'Bis bald', hint: 'hän gap lai', note: 'Wörtlich: „Verabreden, wieder treffen“.' }
          ]
        },
        {
          id: 'u6l2', title: 'Wie geht’s & Alter', tip: 'Nach dem Alter zu fragen ist normal, weil die Anrede davon abhängt. Nicht unhöflich.',
          items: [
            { id: 'ban-khoe-khong', text: 'Bạn khỏe không?', de: 'Wie geht es dir?', hint: 'ban chwä chong', note: 'Wörtlich: „Bist du gesund?“' },
            { id: 'toi-khoe', text: 'Tôi khỏe, cảm ơn', de: 'Mir geht es gut, danke', hint: 'toi chwä, kam ön', note: '' },
            { id: 'bao-nhieu-tuoi', text: 'Bạn bao nhiêu tuổi?', de: 'Wie alt bist du?', hint: 'ban bau njieu tu-oi', note: '' },
            { id: 'toi-ba-muoi-tuoi', text: 'Tôi ba mươi tuổi', de: 'Ich bin 30 Jahre alt', hint: 'toi ba mü-öi tu-oi', note: '„tuổi“ = Alter, Lebensjahre. Zahl einfach austauschen.' },
            { id: 'khach-du-lich', text: 'Tôi là khách du lịch', de: 'Ich bin Touristin', hint: 'toi la chak zu lik', note: '„khách“ = Gast.' }
          ]
        },
        {
          id: 'u6l3', title: 'Zeit & Tage', tip: '„giờ“ = Uhr, Stunde. Uhrzeit: Zahl + giờ: „ba giờ“ = 3 Uhr, „ba giờ chiều“ = 15 Uhr.',
          items: [
            { id: 'hom-nay', text: 'hôm nay', de: 'heute', hint: 'hom nai', note: '' },
            { id: 'ngay-mai', text: 'ngày mai', de: 'morgen (der Tag)', hint: 'ngai mai', note: '' },
            { id: 'hom-qua', text: 'hôm qua', de: 'gestern', hint: 'hom kwa', note: '' },
            { id: 'bay-gio', text: 'bây giờ', de: 'jetzt', hint: 'bäi zö', note: '' },
            { id: 'buoi-sang', text: 'buổi sáng', de: 'morgens (Tageszeit)', hint: 'bu-oi sang', note: '„buổi chiều“ = nachmittags.' },
            { id: 'buoi-toi', text: 'buổi tối', de: 'abends', hint: 'bu-oi toi', note: '' },
            { id: 'may-gio-roi', text: 'Mấy giờ rồi?', de: 'Wie spät ist es?', hint: 'mäi zö zoi', note: '' }
          ]
        },
        {
          id: 'u6l4', title: 'Gefällt mir & Wetter', tip: '„quá“ nach einem Adjektiv heißt „so, sehr“: đẹp quá, nóng quá, ngon quá. Der einfachste Smalltalk überhaupt.',
          items: [
            { id: 'viet-nam-dep-qua', text: 'Việt Nam đẹp quá!', de: 'Vietnam ist so schön!', hint: 'wiet nam däp kwa', note: '„đẹp“ = schön.' },
            { id: 'troi-nong-qua', text: 'Trời nóng quá!', de: 'Es ist so heiß!', hint: 'tschöi nong kwa', note: '„trời“ = Himmel, Wetter.' },
            { id: 'toi-thich-pho', text: 'Tôi thích phở', de: 'Ich mag Phở', hint: 'toi thik fö', note: '„thích“ = mögen.' },
            { id: 'lan-dau', text: 'Đây là lần đầu tôi đến Việt Nam', de: 'Das ist mein erstes Mal in Vietnam', hint: 'däi la lön döu toi den wiet nam', note: '„lần đầu“ = erstes Mal.' },
            { id: 'chup-anh', text: 'Chụp ảnh được không?', de: 'Darf ich ein Foto machen?', hint: 'tschup ain dü-ök chong', note: 'Immer fragen, vor allem bei Menschen und in Tempeln.' },
            { id: 'tuyet-voi', text: 'Tuyệt vời!', de: 'Großartig!', hint: 'tu-iet wöi', note: '' }
          ]
        }
      ]
    },
    {
      id: 'u7', title: 'Notfall & Gesundheit', subtitle: 'Hilfe, krank, verloren', color: '#64748b',
      can: ['um Hilfe rufen', 'Beschwerden beschreiben', 'Verlust von Pass oder Weg melden'],
      lessons: [
        {
          id: 'u7l1', title: 'Hilfe!', tip: 'Notrufnummern: Polizei 113, Rettung 115, Feuerwehr 114. Die Polizei heißt im Alltag „công an“.',
          items: [
            { id: 'cuu-toi-voi', text: 'Cứu tôi với!', de: 'Hilfe!', hint: 'kü-u toi wöi', note: '„cứu“ = retten. Nur im echten Notfall.' },
            { id: 'giup-toi-voi', text: 'Giúp tôi với!', de: 'Helfen Sie mir bitte!', hint: 'zup toi wöi', note: 'Die normale Bitte um Hilfe, weniger dramatisch als „Cứu tôi với“.' },
            { id: 'goi-canh-sat', text: 'Gọi cảnh sát!', de: 'Rufen Sie die Polizei!', hint: 'goi kain sat', note: 'Notruf 113. Alltagswort für Polizei: „công an“.' },
            { id: 'goi-bac-si', text: 'Gọi bác sĩ!', de: 'Rufen Sie einen Arzt!', hint: 'goi bak si', note: 'Notruf Rettung: 115.' },
            { id: 'can-than', text: 'Cẩn thận!', de: 'Vorsicht!', hint: 'kön thön', note: '' }
          ]
        },
        {
          id: 'u7l2', title: 'Krank', tip: '„bị“ vor einem Wort markiert etwas Unangenehmes, das einem passiert: bị ốm, bị đau, bị lạc.',
          items: [
            { id: 'toi-bi-om', text: 'Tôi bị ốm', de: 'Ich bin krank', hint: 'toi bi om', note: 'Im Süden „Tôi bị bệnh“.' },
            { id: 'dau', text: 'đau', de: 'Schmerz, weh tun', hint: 'dau', note: '„đau đầu“ = Kopfschmerzen, „đau răng“ = Zahnschmerzen.' },
            { id: 'dau-bung', text: 'Tôi bị đau bụng', de: 'Ich habe Bauchschmerzen', hint: 'toi bi dau bung', note: '„bụng“ = Bauch. Der Klassiker im Urlaub.' },
            { id: 'sot', text: 'sốt', de: 'Fieber', hint: 'sot', note: '„Tôi bị sốt“ = Ich habe Fieber.' },
            { id: 'thuoc', text: 'thuốc', de: 'Medikament', hint: 'thu-ok', note: 'In der Apotheke: „thuốc đau bụng“ = Medikament gegen Bauchschmerzen.' },
            { id: 'toi-can-bac-si', text: 'Tôi cần bác sĩ', de: 'Ich brauche einen Arzt', hint: 'toi kön bak si', note: '„cần“ = brauchen.' }
          ]
        },
        {
          id: 'u7l3', title: 'Verloren & Polizei', tip: 'Bei Verlust des Passes: erst zur Polizei (Protokoll), dann zur Botschaft in Hanoi oder zum Generalkonsulat in Ho-Chi-Minh-Stadt.',
          items: [
            { id: 'toi-bi-lac', text: 'Tôi bị lạc', de: 'Ich habe mich verlaufen', hint: 'toi bi lak', note: '' },
            { id: 'mat-ho-chieu', text: 'Tôi bị mất hộ chiếu', de: 'Ich habe meinen Pass verloren', hint: 'toi bi möt ho tschieu', note: '„hộ chiếu“ = Reisepass, „mất“ = verlieren.' },
            { id: 'toi-can-giup-do', text: 'Tôi cần giúp đỡ', de: 'Ich brauche Hilfe', hint: 'toi kön zup dö', note: '' },
            { id: 'cong-an', text: 'công an', de: 'Polizei', hint: 'kong an', note: 'Steht auf Uniformen und Wachen. „cảnh sát“ ist das offizielle Wort.' },
            { id: 'dai-su-quan', text: 'đại sứ quán', de: 'Botschaft', hint: 'dai sü kwan', note: 'Deutsche Botschaft in Hanoi. In Ho-Chi-Minh-Stadt: „Tổng lãnh sự quán Đức“ (Generalkonsulat).' }
          ]
        }
      ]
    }
  ]
};
