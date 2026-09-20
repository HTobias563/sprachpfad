// Japanisch – Inhalte für den Urlaub (reine Daten)
// Felder: id, text (natürliche Schreibung mit Kanji), reading (Lesung in Kana, wenn text Kanji enthält), roman (Hepburn mit Makron),
// de, hint (nur wo Hepburn Deutsche täuscht), note, seg (Segmente für Kacheln, Japanisch hat keine Leerzeichen), optional tts, alt
// Höflichkeit: durchgehend です/ます.
export default {
  code: 'ja',
  version: 1,
  name: 'Japanisch',
  ttsLang: 'ja-JP',
  flag: '🇯🇵',
  testPhrase: 'こんにちは、はじめまして。',
  emergency: 'Notruf Polizei 110, Rettung und Feuerwehr 119.',

  pronunciation: [
    ['u nach s und k', 'oft verschluckt: desu → „dess“, -masu → „mass“'],
    ['r', 'zwischen r, l und d, kurz mit der Zunge'],
    ['j', 'dsch'],
    ['z', 'weiches ds'],
    ['y', 'j'],
    ['sh', 'sch'],
    ['ch', 'tsch'],
    ['w', 'englisches w, ohne Zähne an der Lippe'],
    ['f (ふ)', 'zwischen f und h'],
    ['ō, ū, ē (Makron)', 'langer Vokal, deutlich länger halten'],
    ['Doppelkonsonant (っ)', 'kurzer Stopp wie im Italienischen: kippu, chiketto'],
    ['n vor b, m, p', 'wie m: shinbun → „schimbun“'],
    ['Betonung', 'gleichmäßig, keine Silbe stark betonen']
  ],

  units: [
    {
      id: 'ja-u1', title: 'Erste Worte', subtitle: 'Hiragana, Hallo, Danke, Bitte', color: '#2563eb',
      can: ['grüßen und dich bedanken', 'um etwas bitten', 'sagen, dass du nichts verstehst'],
      lessons: [
        { id: 'ja-u1l1', title: 'Hiragana 1: あ bis こ', type: 'script', plugin: 'kana', stage: 'H1' },
        {
          id: 'ja-u1l2', title: 'Hallo & Danke', tip: '„すみません“ ist das Schweizer Taschenmesser: Entschuldigung, Verzeihung, Bedienung rufen, und sogar Danke. Wenn du nur ein Wort lernst, dann dieses.',
          items: [
            { id: 'ja-konnichiwa', text: 'こんにちは', roman: 'konnichiwa', de: 'Hallo / Guten Tag', hint: 'kon-ni-tschi-wa', note: 'Tagsüber. Das letzte は wird „wa“ gesprochen.' },
            { id: 'ja-ohayo', text: 'おはようございます', roman: 'ohayō gozaimasu', de: 'Guten Morgen', hint: 'o-ha-joh go-sa-i-mass', note: 'Bis etwa 10 Uhr.', seg: ['おはよう', 'ございます'] },
            { id: 'ja-konbanwa', text: 'こんばんは', roman: 'konbanwa', de: 'Guten Abend', hint: 'kom-ban-wa', note: '' },
            { id: 'ja-arigato', text: 'ありがとうございます', roman: 'arigatō gozaimasu', de: 'Danke', hint: 'a-ri-ga-toh go-sa-i-mass', note: 'Ohne ございます lockerer. Mit Verbeugung.', seg: ['ありがとう', 'ございます'] },
            { id: 'ja-sumimasen', text: 'すみません', roman: 'sumimasen', de: 'Entschuldigung', hint: 'su-mi-ma-sen', note: 'Für alles: Verzeihung, Bedienung rufen, sich vorbeidrängen, auch Danke für eine Mühe.' },
            { id: 'ja-hai', text: 'はい', roman: 'hai', de: 'Ja', hint: '', note: 'Heißt auch „ich höre zu“. Ein „hai“ ist nicht immer Zustimmung.' },
            { id: 'ja-iie', text: 'いいえ', roman: 'iie', de: 'Nein', hint: 'i-i-e', note: 'Direktes Nein ist selten. Höflicher: ちょっと… (das ist etwas schwierig).' }
          ]
        },
        { id: 'ja-u1l3', title: 'Hiragana 2: さ bis と', type: 'script', plugin: 'kana', stage: 'H2' },
        {
          id: 'ja-u1l4', title: 'Bitte & Verstehen', tip: '„お願いします“ ist die Bitte um alles, „ください“ die Bitte um etwas Konkretes: これをください = das hier, bitte.',
          items: [
            { id: 'ja-onegai', text: 'お願いします', reading: 'おねがいします', roman: 'onegai shimasu', de: 'Bitte (Bitte um etwas)', hint: 'o-ne-gai schi-mass', note: 'Nach jeder Bitte, auch allein als „Bitte, ja“.', seg: ['お願い', 'します'] },
            { id: 'ja-kudasai', text: 'ください', roman: 'kudasai', de: 'Bitte geben Sie mir', hint: 'ku-da-sai', note: 'Hinter das Gewünschte: 水をください.' },
            { id: 'ja-daijobu', text: '大丈夫です', reading: 'だいじょうぶです', roman: 'daijōbu desu', de: 'Alles gut / Kein Problem', hint: 'dai-dschoh-bu dess', note: 'Auch als höfliches „nein danke“.', seg: ['大丈夫', 'です'] },
            { id: 'ja-wakarimasen', text: 'わかりません', roman: 'wakarimasen', de: 'Ich verstehe nicht', hint: 'wa-ka-ri-ma-sen', note: '' },
            { id: 'ja-eigo', text: '英語できますか', reading: 'えいごできますか', roman: 'eigo dekimasu ka', de: 'Sprechen Sie Englisch?', hint: 'eh-go de-ki-mass ka', note: '„か“ am Ende macht die Frage.', seg: ['英語', 'できます', 'か'] },
            { id: 'ja-yukkuri', text: 'ゆっくりお願いします', reading: 'ゆっくりおねがいします', roman: 'yukkuri onegai shimasu', de: 'Bitte langsam', hint: 'juk-ku-ri o-ne-gai schi-mass', note: 'ゆっくり = langsam.', seg: ['ゆっくり', 'お願い', 'します'] },
            { id: 'ja-moichido', text: 'もう一度お願いします', reading: 'もういちどおねがいします', roman: 'mō ichido onegai shimasu', de: 'Bitte noch einmal', hint: 'moh i-tschi-do o-ne-gai schi-mass', note: 'もう一度 = noch einmal.', seg: ['もう一度', 'お願い', 'します'] }
          ]
        }
      ]
    },
    {
      id: 'ja-u2', title: 'Vorstellen', subtitle: 'Mehr Hiragana, Name, Herkunft', color: '#0ea5e9',
      can: ['dich vorstellen', 'verstehen, was das Personal sagt'],
      lessons: [
        { id: 'ja-u2l1', title: 'Hiragana 3: な bis ほ', type: 'script', plugin: 'kana', stage: 'H3' },
        {
          id: 'ja-u2l2', title: 'Vorstellen', tip: '„…です“ = „ich bin …“. Name, Herkunft, Beruf: alles mit です. „はじめまして“ und „よろしくお願いします“ rahmen jede Vorstellung ein.',
          items: [
            { id: 'ja-hajimemashite', text: 'はじめまして', roman: 'hajimemashite', de: 'Freut mich (beim ersten Treffen)', hint: 'ha-dschi-me-ma-schi-te', note: 'Immer als erster Satz beim Kennenlernen.' },
            { id: 'ja-hana-desu', text: 'ハンナです', roman: 'Hanna desu', de: 'Ich bin Hannah', hint: 'han-na dess', note: 'Namen aus dem Ausland schreibt man in Katakana.', seg: ['ハンナ', 'です'] },
            { id: 'ja-doitsu', text: 'ドイツから来ました', reading: 'ドイツからきました', roman: 'doitsu kara kimashita', de: 'Ich komme aus Deutschland', hint: 'do-i-tsu ka-ra ki-ma-schi-ta', note: 'ドイツ = Deutschland, から = aus.', seg: ['ドイツ', 'から', '来ました'] },
            { id: 'ja-kanko', text: '観光です', reading: 'かんこうです', roman: 'kankō desu', de: 'Ich bin auf Urlaubsreise', hint: 'kan-koh dess', note: 'Die Antwort auf die Frage nach dem Reisezweck.', seg: ['観光', 'です'] },
            { id: 'ja-onamae', text: 'お名前は？', reading: 'おなまえは', roman: 'onamae wa?', de: 'Wie heißen Sie?', hint: 'o-na-ma-e wa', note: 'お vor Wörtern macht sie höflich.', seg: ['お名前', 'は'] },
            { id: 'ja-yoroshiku', text: 'よろしくお願いします', reading: 'よろしくおねがいします', roman: 'yoroshiku onegai shimasu', de: 'Freut mich, auf gute Zusammenarbeit', hint: 'jo-ro-schi-ku o-ne-gai schi-mass', note: 'Der Abschluss jeder Vorstellung. Unübersetzbar, unverzichtbar.', seg: ['よろしく', 'お願い', 'します'] }
          ]
        },
        { id: 'ja-u2l3', title: 'Hiragana 4: ま bis ん', type: 'script', plugin: 'kana', stage: 'H4' },
        {
          id: 'ja-u2l4', title: 'Was das Personal sagt', type: 'understand', tip: 'Nur verstehen. Das Personal spricht sehr höflich, mit langen Endungen. Achte auf die Schlüsselwörter.',
          items: [
            { id: 'ja-u-irasshaimase', text: 'いらっしゃいませ', roman: 'irasshaimase', de: 'Willkommen (beim Betreten)', hint: 'i-ra-schai-ma-se', note: 'Keine Antwort nötig.' },
            { id: 'ja-u-nanmei', text: '何名様ですか', reading: 'なんめいさまですか', roman: 'nanmei-sama desu ka', de: 'Wie viele Personen?', hint: 'nam-meh-sa-ma dess ka', note: 'Antwort: ひとりです / ふたりです oder Finger zeigen.', seg: ['何名様', 'です', 'か'] },
            { id: 'ja-u-kochira', text: 'こちらへどうぞ', roman: 'kochira e dōzo', de: 'Hier entlang, bitte', hint: 'ko-tschi-ra e doh-so', note: 'どうぞ = bitte (anbietend).', seg: ['こちら', 'へ', 'どうぞ'] },
            { id: 'ja-u-ijo', text: '以上でよろしいですか', reading: 'いじょうでよろしいですか', roman: 'ijō de yoroshii desu ka', de: 'Ist das alles?', hint: 'i-dschoh de jo-ro-schi-i dess ka', note: 'Antwort: はい.', seg: ['以上', 'で', 'よろしい', 'です', 'か'] },
            { id: 'ja-u-fukuro', text: '袋はご利用ですか', reading: 'ふくろはごりようですか', roman: 'fukuro wa goriyō desu ka', de: 'Brauchen Sie eine Tüte?', hint: 'fu-ku-ro wa go-ri-joh dess ka', note: 'Tüten kosten ein paar Yen. Antwort: はい oder 大丈夫です.', seg: ['袋', 'は', 'ご利用', 'です', 'か'] }
          ]
        }
      ]
    },
    {
      id: 'ja-u3', title: 'Zahlen & Geld', subtitle: 'Regeln, Zahlen, Yen, Zähler', color: '#16a34a',
      can: ['bis 10 zählen', 'Preise verstehen', 'Stückzahlen und Personen angeben'],
      lessons: [
        { id: 'ja-u3l1', title: 'Hiragana 5: Trübung, kleine Zeichen, lange Vokale', type: 'script', plugin: 'kana', stage: 'H5' },
        {
          id: 'ja-u3l2', title: 'Zahlen 1 bis 5', tip: 'Zusammensetzen ohne Ausnahmen: 十一 = 11, 二十 = 20, 二十五 = 25. Für 4 gibt es zwei Lesungen, よん ist die sichere.',
          items: [
            { id: 'ja-n1', text: '一', reading: 'いち', roman: 'ichi', de: '1', hint: 'i-tschi', note: '' },
            { id: 'ja-n2', text: '二', reading: 'に', roman: 'ni', de: '2', hint: '', note: '' },
            { id: 'ja-n3', text: '三', reading: 'さん', roman: 'san', de: '3', hint: '', note: '' },
            { id: 'ja-n4', text: '四', reading: 'よん', roman: 'yon', de: '4', hint: 'jon', note: 'Auch し, aber das klingt wie „Tod“. Also よん.' },
            { id: 'ja-n5', text: '五', reading: 'ご', roman: 'go', de: '5', hint: '', note: '' }
          ]
        },
        {
          id: 'ja-u3l2b', title: 'Zahlen 6 bis 10', tip: 'Für 7 gibt es auch しち und für 9 auch く, aber なな und きゅう sind die eindeutigen Formen.',
          items: [
            { id: 'ja-n6', text: '六', reading: 'ろく', roman: 'roku', de: '6', hint: '', note: '' },
            { id: 'ja-n7', text: '七', reading: 'なな', roman: 'nana', de: '7', hint: '', note: 'Auch しち. なな ist eindeutiger.' },
            { id: 'ja-n8', text: '八', reading: 'はち', roman: 'hachi', de: '8', hint: 'ha-tschi', note: '' },
            { id: 'ja-n9', text: '九', reading: 'きゅう', roman: 'kyū', de: '9', hint: 'kjuh', note: '' },
            { id: 'ja-n10', text: '十', reading: 'じゅう', roman: 'jū', de: '10', hint: 'dschuh', note: '十一 = 11, 二十 = 20.' }
          ]
        },
        {
          id: 'ja-u3l3', title: 'Hundert, Tausend, Yen', tip: 'Japan zählt in Zehntausendern: 万 = 10.000. Faustregel: 1.000 Yen sind etwa 6 Euro. Preise stehen fast überall auf Schildern, oft mit 円 dahinter.',
          items: [
            { id: 'ja-n100', text: '百', reading: 'ひゃく', roman: 'hyaku', de: '100', hint: 'hja-ku', note: '三百 = 300, aber 600 = ろっぴゃく, 800 = はっぴゃく.' },
            { id: 'ja-n1000', text: '千', reading: 'せん', roman: 'sen', de: '1.000', hint: '', note: '三千 = 3.000, 8.000 = はっせん.' },
            { id: 'ja-n10000', text: '万', reading: 'まん', roman: 'man', de: '10.000', hint: '', note: '一万円 = 10.000 Yen, etwa 60 Euro.' },
            { id: 'ja-en', text: '円', reading: 'えん', roman: 'en', de: 'Yen', hint: '', note: 'Steht nach der Zahl. Auf Schildern auch als ¥.' },
            { id: 'ja-ikura', text: 'いくらですか', roman: 'ikura desu ka', de: 'Wie viel kostet das?', hint: 'i-ku-ra dess ka', note: '', seg: ['いくら', 'です', 'か'] },
            { id: 'ja-sen-en', text: '千円', reading: 'せんえん', roman: 'sen\'en', de: '1.000 Yen', hint: 'sen-en', note: 'Zahl + 円.' }
          ]
        },
        {
          id: 'ja-u3l4', title: 'Zählen & Personen', tip: 'Für „ein Stück, zwei Stück“ gibt es die Universalzähler ひとつ, ふたつ, みっつ. Personen zählt man mit ひとり, ふたり, danach Zahl + 人 (にん).',
          items: [
            { id: 'ja-hitotsu', text: 'ひとつ', roman: 'hitotsu', de: 'eins (ein Stück)', hint: 'hi-to-tsu', note: 'これをひとつ = eins hiervon.' },
            { id: 'ja-futatsu', text: 'ふたつ', roman: 'futatsu', de: 'zwei (Stück)', hint: 'fu-ta-tsu', note: '' },
            { id: 'ja-mittsu', text: 'みっつ', roman: 'mittsu', de: 'drei (Stück)', hint: 'mit-tsu', note: '' },
            { id: 'ja-hitori', text: 'ひとり', roman: 'hitori', de: 'eine Person', hint: 'hi-to-ri', note: 'ひとりです = ich bin allein.' },
            { id: 'ja-futari', text: 'ふたり', roman: 'futari', de: 'zwei Personen', hint: 'fu-ta-ri', note: '' },
            { id: 'ja-futari-desu', text: '二人です', reading: 'ふたりです', roman: 'futari desu', de: 'Wir sind zu zweit', hint: 'fu-ta-ri dess', note: 'Antwort auf 何名様ですか. Drei: 三人です (さんにん).', seg: ['二人', 'です'] }
          ]
        }
      ]
    },
    {
      id: 'ja-u4', title: 'Essen & Trinken', subtitle: 'Katakana, Bestellen, Gerichte', color: '#f59e0b',
      can: ['Essen und Getränke bestellen', 'die Rechnung verlangen', 'Speisekarten in Katakana lesen'],
      lessons: [
        { id: 'ja-u4l1', title: 'Katakana 1: ア bis ソ', type: 'script', plugin: 'kana', stage: 'K1' },
        {
          id: 'ja-u4l2', title: 'Bestellen', tip: '„…をください“ = „… bitte“. Zeigen auf die Karte oder die Plastikmodelle im Schaufenster, dann これをください. In vielen Lokalen bestellt man am Automaten.',
          items: [
            { id: 'ja-kore-kudasai', text: 'これをください', roman: 'kore o kudasai', de: 'Das hier, bitte', hint: 'ko-re o ku-da-sai', note: 'これ = das hier, を markiert das Objekt.', seg: ['これ', 'を', 'ください'] },
            { id: 'ja-menyu', text: 'メニュー', roman: 'menyū', de: 'Speisekarte', hint: 'me-njuh', note: 'Oft mit Bildern, manchmal auf Englisch.' },
            { id: 'ja-omizu', text: 'お水ください', reading: 'おみずください', roman: 'omizu kudasai', de: 'Wasser, bitte', hint: 'o-mi-su ku-da-sai', note: 'Wasser ist gratis und kommt meist ungefragt.', seg: ['お水', 'ください'] },
            { id: 'ja-chumon', text: '注文お願いします', reading: 'ちゅうもんおねがいします', roman: 'chūmon onegai shimasu', de: 'Ich möchte bestellen', hint: 'tschuh-mon o-ne-gai schi-mass', note: 'Oder einfach すみません rufen.', seg: ['注文', 'お願い', 'します'] },
            { id: 'ja-okaikei', text: 'お会計お願いします', reading: 'おかいけいおねがいします', roman: 'okaikei onegai shimasu', de: 'Die Rechnung, bitte', hint: 'o-kai-keh o-ne-gai schi-mass', note: 'Meist zahlt man an der Kasse. Kein Trinkgeld.', seg: ['お会計', 'お願い', 'します'] },
            { id: 'ja-mochikaeri', text: '持ち帰りで', reading: 'もちかえりで', roman: 'mochikaeri de', de: 'Zum Mitnehmen', hint: 'mo-tschi-ka-e-ri de', note: 'Zum Hieressen: ここで.', seg: ['持ち帰り', 'で'] }
          ]
        },
        { id: 'ja-u4l3', title: 'Katakana 2: タ bis ホ', type: 'script', plugin: 'kana', stage: 'K2' },
        {
          id: 'ja-u4l4', title: 'Getränke', tip: 'Getränke aus dem Ausland stehen in Katakana: コーヒー, ビール, ジュース. Genau dafür lohnt sich Katakana.',
          items: [
            { id: 'ja-ocha', text: 'お茶', reading: 'おちゃ', roman: 'ocha', de: 'Tee (grün)', hint: 'o-tscha', note: 'Kommt oft gratis, heiß oder kalt.' },
            { id: 'ja-kohi', text: 'コーヒー', roman: 'kōhī', de: 'Kaffee', hint: 'koh-hih', note: 'アイスコーヒー = Eiskaffee.' },
            { id: 'ja-biru', text: 'ビール', roman: 'bīru', de: 'Bier', hint: 'bih-ru', note: '生ビール (なま) = frisch gezapft.' },
            { id: 'ja-mizu', text: '水', reading: 'みず', roman: 'mizu', de: 'Wasser', hint: 'mi-su', note: '' },
            { id: 'ja-nihonshu', text: '日本酒', reading: 'にほんしゅ', roman: 'nihonshu', de: 'Sake (Reiswein)', hint: 'ni-hon-schu', note: '„Sake“ heißt in Japan jeder Alkohol.' },
            { id: 'ja-jusu', text: 'ジュース', roman: 'jūsu', de: 'Saft', hint: 'dschuh-su', note: '' }
          ]
        },
        {
          id: 'ja-u4l5', title: 'Gerichte', tip: 'Viele Lokale haben nur ein Gericht in Varianten. 定食 (Tagesmenü) ist mittags die günstigste, beste Wahl.',
          items: [
            { id: 'ja-ramen', text: 'ラーメン', roman: 'rāmen', de: 'Ramen (Nudelsuppe)', hint: 'rah-men', note: 'Schlürfen ist erwünscht.' },
            { id: 'ja-sushi', text: '寿司', reading: 'すし', roman: 'sushi', de: 'Sushi', hint: 'su-schi', note: 'Mit den Fingern ist erlaubt.' },
            { id: 'ja-udon', text: 'うどん', roman: 'udon', de: 'Udon (dicke Weizennudeln)', hint: '', note: '' },
            { id: 'ja-tempura', text: '天ぷら', reading: 'てんぷら', roman: 'tempura', de: 'Tempura (frittiert)', hint: 'tem-pu-ra', note: '' },
            { id: 'ja-kare', text: 'カレー', roman: 'karē', de: 'Curry (japanisch, mild)', hint: 'ka-reh', note: '' },
            { id: 'ja-onigiri', text: 'おにぎり', roman: 'onigiri', de: 'Reisball', hint: '', note: 'Im Minimarkt. Die Folie hat Nummern zum Öffnen.' },
            { id: 'ja-yakitori', text: '焼き鳥', reading: 'やきとり', roman: 'yakitori', de: 'Hühnchenspieße', hint: 'ja-ki-to-ri', note: '' },
            { id: 'ja-teishoku', text: '定食', reading: 'ていしょく', roman: 'teishoku', de: 'Tagesmenü (Set)', hint: 'teh-scho-ku', note: 'Hauptgericht, Reis, Suppe, Beilagen.' }
          ]
        },
        {
          id: 'ja-u4l6', title: 'Wünsche & Allergien', tip: '„いただきます“ vor dem Essen und „ごちそうさまでした“ danach sind feste Floskeln. Das zweite auch zum Personal beim Rausgehen.',
          items: [
            { id: 'ja-oishii', text: 'おいしいです', roman: 'oishii desu', de: 'Es ist lecker', hint: 'o-i-schi-i dess', note: '', seg: ['おいしい', 'です'] },
            { id: 'ja-itadakimasu', text: 'いただきます', roman: 'itadakimasu', de: 'Guten Appetit (sagt man selbst)', hint: 'i-ta-da-ki-mass', note: 'Vor dem Essen, wörtlich „ich empfange demütig“.' },
            { id: 'ja-gochisosama', text: 'ごちそうさまでした', roman: 'gochisōsama deshita', de: 'Danke fürs Essen', hint: 'go-tschi-soh-sa-ma de-schi-ta', note: 'Nach dem Essen und beim Verlassen des Lokals.', seg: ['ごちそうさま', 'でした'] },
            { id: 'ja-karaku', text: '辛くしないでください', reading: 'からくしないでください', roman: 'karaku shinaide kudasai', de: 'Bitte nicht scharf', hint: 'ka-ra-ku schi-nai-de ku-da-sai', note: '辛い = scharf.', seg: ['辛く', 'しないで', 'ください'] },
            { id: 'ja-bejitarian', text: 'ベジタリアンです', roman: 'bejitarian desu', de: 'Ich bin Vegetarierin', hint: 'be-dschi-ta-ri-an dess', note: 'Dashi-Brühe aus Fisch ist fast überall drin.', seg: ['ベジタリアン', 'です'] },
            { id: 'ja-arerugi', text: 'アレルギーがあります', roman: 'arerugī ga arimasu', de: 'Ich habe eine Allergie', hint: 'a-re-ru-gih ga a-ri-mass', note: 'Danach die Zutat zeigen.', seg: ['アレルギー', 'が', 'あります'] },
            { id: 'ja-niku', text: '肉は食べません', reading: 'にくはたべません', roman: 'niku wa tabemasen', de: 'Ich esse kein Fleisch', hint: 'ni-ku wa ta-be-ma-sen', note: '肉 = Fleisch, 食べません = esse nicht.', seg: ['肉', 'は', '食べません'] }
          ]
        }
      ]
    },
    {
      id: 'ja-u5', title: 'Unterwegs', subtitle: 'Katakana, Wege, Züge, Schilder', color: '#a855f7',
      can: ['nach dem Weg fragen', 'Zug und Taxi nutzen', 'die wichtigsten Schilder lesen'],
      lessons: [
        { id: 'ja-u5l1', title: 'Katakana 3: マ bis ン und Regeln', type: 'script', plugin: 'kana', stage: 'K3' },
        {
          id: 'ja-u5l2', title: 'Wo ist …?', tip: '„…はどこですか“ = „Wo ist …?“. Japaner bringen dich oft persönlich hin, statt den Weg zu erklären.',
          items: [
            { id: 'ja-toire', text: 'トイレはどこですか', roman: 'toire wa doko desu ka', de: 'Wo ist die Toilette?', hint: 'to-i-re wa do-ko dess ka', note: 'Auf Schildern: お手洗い oder 化粧室.', seg: ['トイレ', 'は', 'どこ', 'です', 'か'] },
            { id: 'ja-doko', text: 'どこですか', roman: 'doko desu ka', de: 'Wo ist …?', hint: 'do-ko dess ka', note: 'Ort davor: 駅はどこですか.', seg: ['どこ', 'です', 'か'] },
            { id: 'ja-koko', text: 'ここ', roman: 'koko', de: 'hier', hint: '', note: '' },
            { id: 'ja-asoko', text: 'あそこ', roman: 'asoko', de: 'dort', hint: '', note: '' },
            { id: 'ja-hidari', text: '左', reading: 'ひだり', roman: 'hidari', de: 'links', hint: 'hi-da-ri', note: '' },
            { id: 'ja-migi', text: '右', reading: 'みぎ', roman: 'migi', de: 'rechts', hint: '', note: '' },
            { id: 'ja-massugu', text: 'まっすぐ', roman: 'massugu', de: 'geradeaus', hint: 'mas-su-gu', note: '' }
          ]
        },
        {
          id: 'ja-u5l3', title: 'Taxi', tip: '„…までお願いします“ = „Bis … bitte“. Taxitüren öffnen automatisch. Adresse oder Hotelkarte zeigen ist am sichersten.',
          items: [
            { id: 'ja-takushi', text: 'タクシー', roman: 'takushī', de: 'Taxi', hint: 'ta-ku-schih', note: 'Teuer, aber zuverlässig. Kein Trinkgeld.' },
            { id: 'ja-eki-made', text: '駅までお願いします', reading: 'えきまでおねがいします', roman: 'eki made onegai shimasu', de: 'Zum Bahnhof, bitte', hint: 'e-ki ma-de o-ne-gai schi-mass', note: 'まで = bis.', seg: ['駅', 'まで', 'お願い', 'します'] },
            { id: 'ja-tomete', text: 'ここで止めてください', reading: 'ここでとめてください', roman: 'koko de tomete kudasai', de: 'Hier anhalten, bitte', hint: 'ko-ko de to-me-te ku-da-sai', note: '', seg: ['ここ', 'で', '止めて', 'ください'] },
            { id: 'ja-donokurai', text: 'どのくらいかかりますか', roman: 'dono kurai kakarimasu ka', de: 'Wie lange dauert es?', hint: 'do-no ku-rai ka-ka-ri-mass ka', note: 'Auch für „wie viel kostet es“ verwendbar.', seg: ['どのくらい', 'かかります', 'か'] },
            { id: 'ja-jusho', text: '住所', reading: 'じゅうしょ', roman: 'jūsho', de: 'Adresse', hint: 'dschuh-scho', note: 'Hoteladresse auf Japanisch dabeihaben.' }
          ]
        },
        {
          id: 'ja-u5l4', title: 'Zug & Bahnhof', tip: 'Eine IC-Karte (Suica, Pasmo) gilt für alle Züge, Busse und Minimärkte. Ausgänge heißen nach Himmelsrichtungen: 東口 = Ostausgang.',
          items: [
            { id: 'ja-eki', text: '駅', reading: 'えき', roman: 'eki', de: 'Bahnhof', hint: '', note: '東京駅 = Bahnhof Tokio.' },
            { id: 'ja-deguchi', text: '出口', reading: 'でぐち', roman: 'deguchi', de: 'Ausgang', hint: 'de-gu-tschi', note: '' },
            { id: 'ja-kippu', text: '切符', reading: 'きっぷ', roman: 'kippu', de: 'Fahrkarte', hint: 'kip-pu', note: 'Am Automaten, meist mit Englisch-Knopf.' },
            { id: 'ja-kuko', text: '空港', reading: 'くうこう', roman: 'kūkō', de: 'Flughafen', hint: 'kuh-koh', note: '' },
            { id: 'ja-shinkansen', text: '新幹線', reading: 'しんかんせん', roman: 'shinkansen', de: 'Shinkansen (Schnellzug)', hint: 'schin-kan-sen', note: 'Mit Japan Rail Pass inklusive.' },
            { id: 'ja-ic-kado', text: 'ICカード', reading: 'アイシーカード', roman: 'aishī kādo', de: 'IC-Karte (Suica, Pasmo)', hint: 'ai-schih kah-do', note: 'Auflegen beim Ein- und Aussteigen.' },
            { id: 'ja-homu', text: 'ホーム', roman: 'hōmu', de: 'Bahnsteig', hint: 'hoh-mu', note: 'Von englisch „platform“.' },
            { id: 'ja-norikae', text: '乗り換え', reading: 'のりかえ', roman: 'norikae', de: 'Umsteigen', hint: 'no-ri-ka-e', note: '' }
          ]
        },
        {
          id: 'ja-u5l5', title: 'Orte', tip: 'Zusammen mit „はどこですか“ ergibt jedes Wort eine fertige Frage. コンビニ gibt es an jeder Ecke, rund um die Uhr.',
          items: [
            { id: 'ja-hoteru', text: 'ホテル', roman: 'hoteru', de: 'Hotel', hint: 'ho-te-ru', note: '' },
            { id: 'ja-konbini', text: 'コンビニ', roman: 'konbini', de: 'Minimarkt', hint: 'kom-bi-ni', note: '7-Eleven, Lawson, FamilyMart. Geldautomat, Essen, Tickets.' },
            { id: 'ja-ginko', text: '銀行', reading: 'ぎんこう', roman: 'ginkō', de: 'Bank', hint: 'gin-koh', note: '' },
            { id: 'ja-byoin', text: '病院', reading: 'びょういん', roman: 'byōin', de: 'Krankenhaus', hint: 'bjoh-in', note: '' },
            { id: 'ja-yakkyoku', text: '薬局', reading: 'やっきょく', roman: 'yakkyoku', de: 'Apotheke', hint: 'jak-kjo-ku', note: 'Auch ドラッグストア.' },
            { id: 'ja-resutoran', text: 'レストラン', roman: 'resutoran', de: 'Restaurant', hint: 're-su-to-ran', note: '' },
            { id: 'ja-jinja', text: '神社', reading: 'じんじゃ', roman: 'jinja', de: 'Schrein (Shintō)', hint: 'dschin-dscha', note: 'Am roten Tor (鳥居) leicht verbeugen.' },
            { id: 'ja-otera', text: 'お寺', reading: 'おてら', roman: 'otera', de: 'Tempel (buddhistisch)', hint: 'o-te-ra', note: '' }
          ]
        },
        {
          id: 'ja-u5l6', title: 'Schilder lesen 1', type: 'understand', tip: 'Diese Kanji musst du nur erkennen, nicht schreiben oder aussprechen. Sie stehen an jeder Tür, jedem Bahnhof und jeder Toilette.',
          items: [
            { id: 'ja-k-en', text: '円', reading: 'えん', roman: 'en', de: 'Yen (auf Preisschildern)', hint: '', note: '' },
            { id: 'ja-k-eki', text: '駅', reading: 'えき', roman: 'eki', de: 'Bahnhof (auf Schildern)', hint: '', note: '' },
            { id: 'ja-k-deguchi', text: '出口', reading: 'でぐち', roman: 'deguchi', de: 'Ausgang (Schild)', hint: '', note: '' },
            { id: 'ja-k-iriguchi', text: '入口', reading: 'いりぐち', roman: 'iriguchi', de: 'Eingang', hint: '', note: '' },
            { id: 'ja-k-higashi', text: '東', reading: 'ひがし', roman: 'higashi', de: 'Ost', hint: '', note: '東口 = Ostausgang.' },
            { id: 'ja-k-nishi', text: '西', reading: 'にし', roman: 'nishi', de: 'West', hint: '', note: '' },
            { id: 'ja-k-minami', text: '南', reading: 'みなみ', roman: 'minami', de: 'Süd', hint: '', note: '' },
            { id: 'ja-k-kita', text: '北', reading: 'きた', roman: 'kita', de: 'Nord', hint: '', note: '' },
            { id: 'ja-k-otearai', text: 'お手洗い', reading: 'おてあらい', roman: 'otearai', de: 'Toilette (Schild)', hint: '', note: 'Auch 化粧室 oder トイレ.' }
          ]
        },
        {
          id: 'ja-u5l7', title: 'Schilder lesen 2', type: 'understand', tip: 'Türen, Verbote, Öffnungszeiten. 押 und 引 stehen auf fast jeder Tür.',
          items: [
            { id: 'ja-k-otoko', text: '男', reading: 'おとこ', roman: 'otoko', de: 'Männer (Toilette)', hint: '', note: '' },
            { id: 'ja-k-onna', text: '女', reading: 'おんな', roman: 'onna', de: 'Frauen (Toilette)', hint: '', note: '' },
            { id: 'ja-k-osu', text: '押', reading: 'おす', roman: 'osu', de: 'Drücken (Tür)', hint: '', note: '' },
            { id: 'ja-k-hiku', text: '引', reading: 'ひく', roman: 'hiku', de: 'Ziehen (Tür)', hint: '', note: '' },
            { id: 'ja-k-hiraku', text: '開', reading: 'ひらく', roman: 'hiraku', de: 'Öffnen (Aufzugknopf)', hint: '', note: '' },
            { id: 'ja-k-shimeru', text: '閉', reading: 'しめる', roman: 'shimeru', de: 'Schließen (Aufzugknopf)', hint: '', note: '' },
            { id: 'ja-k-kinen', text: '禁煙', reading: 'きんえん', roman: 'kin\'en', de: 'Rauchen verboten', hint: '', note: '' },
            { id: 'ja-k-muryo', text: '無料', reading: 'むりょう', roman: 'muryō', de: 'Gratis', hint: '', note: '有料 = kostenpflichtig.' },
            { id: 'ja-k-eigyochu', text: '営業中', reading: 'えいぎょうちゅう', roman: 'eigyōchū', de: 'Geöffnet', hint: '', note: '準備中 = noch geschlossen.' }
          ]
        }
      ]
    },
    {
      id: 'ja-u6', title: 'Einkaufen & Hotel', subtitle: 'Laden, Zimmer, Gepäck', color: '#ef4444',
      can: ['im Laden fragen und bezahlen', 'im Hotel einchecken', 'Gepäck aufbewahren lassen'],
      lessons: [
        {
          id: 'ja-u6l1', title: 'Im Laden', tip: 'Handeln gibt es nicht. Geld legt man in die kleine Schale an der Kasse, nicht in die Hand. „袋はいりません“ spart Plastik und Yen.',
          items: [
            { id: 'ja-kore-ikura', text: 'これはいくらですか', roman: 'kore wa ikura desu ka', de: 'Was kostet das hier?', hint: 'ko-re wa i-ku-ra dess ka', note: '', seg: ['これ', 'は', 'いくら', 'です', 'か'] },
            { id: 'ja-takai', text: '高いです', reading: 'たかいです', roman: 'takai desu', de: 'Das ist teuer', hint: 'ta-kai dess', note: '', seg: ['高い', 'です'] },
            { id: 'ja-yasui', text: '安い', reading: 'やすい', roman: 'yasui', de: 'billig', hint: 'ja-su-i', note: '' },
            { id: 'ja-miteiru', text: '見ているだけです', reading: 'みているだけです', roman: 'mite iru dake desu', de: 'Ich schaue nur', hint: 'mi-te i-ru da-ke dess', note: 'だけ = nur.', seg: ['見ている', 'だけ', 'です'] },
            { id: 'ja-fukuro-irimasen', text: '袋はいりません', reading: 'ふくろはいりません', roman: 'fukuro wa irimasen', de: 'Keine Tüte, danke', hint: 'fu-ku-ro wa i-ri-ma-sen', note: 'いりません = brauche ich nicht.', seg: ['袋', 'は', 'いりません'] },
            { id: 'ja-shichaku', text: '試着できますか', reading: 'しちゃくできますか', roman: 'shichaku dekimasu ka', de: 'Kann ich das anprobieren?', hint: 'schi-tscha-ku de-ki-mass ka', note: 'Schuhe aus in der Kabine.', seg: ['試着', 'できます', 'か'] },
            { id: 'ja-kado', text: 'カードは使えますか', reading: 'カードはつかえますか', roman: 'kādo wa tsukaemasu ka', de: 'Kann ich mit Karte zahlen?', hint: 'kah-do wa tsu-ka-e-mass ka', note: 'Bargeld ist noch verbreitet, immer etwas dabeihaben.', seg: ['カード', 'は', '使えます', 'か'] }
          ]
        },
        {
          id: 'ja-u6l2', title: 'Im Hotel', tip: '„…しています“ = „ich habe … gemacht und es gilt noch“: 予約しています = ich habe eine Reservierung. Nächte zählt man mit 泊: 二泊 = zwei Nächte.',
          items: [
            { id: 'ja-yoyaku', text: '予約しています', reading: 'よやくしています', roman: 'yoyaku shite imasu', de: 'Ich habe reserviert', hint: 'jo-ja-ku schi-te i-mass', note: '予約 = Reservierung.', seg: ['予約', 'して', 'います'] },
            { id: 'ja-heya', text: '部屋', reading: 'へや', roman: 'heya', de: 'Zimmer', hint: 'he-ja', note: '' },
            { id: 'ja-kagi', text: '鍵', reading: 'かぎ', roman: 'kagi', de: 'Schlüssel', hint: '', note: '' },
            { id: 'ja-waifai', text: 'Wi-Fiのパスワードは？', reading: 'ワイファイのパスワードは', roman: 'waifai no pasuwādo wa?', de: 'Wie ist das WLAN-Passwort?', hint: 'wai-fai no pa-su-wah-do wa', note: 'の = von. Halbe Frage reicht, der Rest ist klar.', seg: ['Wi-Fi', 'の', 'パスワード', 'は'], tts: 'ワイファイのパスワードは？' },
            { id: 'ja-choshoku', text: '朝食は何時ですか', reading: 'ちょうしょくはなんじですか', roman: 'chōshoku wa nanji desu ka', de: 'Um wie viel Uhr gibt es Frühstück?', hint: 'tschoh-scho-ku wa nan-dschi dess ka', note: '何時 = wie viel Uhr.', seg: ['朝食', 'は', '何時', 'です', 'か'] },
            { id: 'ja-chekkuauto', text: 'チェックアウト', roman: 'chekkuauto', de: 'Check-out', hint: 'tschek-ku-a-u-to', note: 'チェックアウトお願いします.' },
            { id: 'ja-nimotsu', text: '荷物を預かってもらえますか', reading: 'にもつをあずかってもらえますか', roman: 'nimotsu o azukatte moraemasu ka', de: 'Können Sie mein Gepäck aufbewahren?', hint: 'ni-mo-tsu o a-su-kat-te mo-ra-e-mass ka', note: 'Fast jedes Hotel macht das, auch nach dem Check-out.', seg: ['荷物', 'を', '預かって', 'もらえます', 'か'] },
            { id: 'ja-nihaku', text: '二泊', reading: 'にはく', roman: 'nihaku', de: 'zwei Nächte', hint: 'ni-ha-ku', note: '一泊 (いっぱく) = eine Nacht, 三泊 (さんぱく) = drei.' }
          ]
        }
      ]
    },
    {
      id: 'ja-u7', title: 'Smalltalk & Zeit', subtitle: 'Tage, Uhrzeit, kleine Gespräche', color: '#0891b2',
      can: ['über Zeit und Tage sprechen', 'Smalltalk über Reise und Wetter machen'],
      lessons: [
        {
          id: 'ja-u7l1', title: 'Zeit & Tage', tip: 'Uhrzeit: Zahl + 時 (じ). Drei Ausnahmen: 4 Uhr = よじ, 7 Uhr = しちじ, 9 Uhr = くじ.',
          items: [
            { id: 'ja-kyo', text: '今日', reading: 'きょう', roman: 'kyō', de: 'heute', hint: 'kjoh', note: '' },
            { id: 'ja-ashita', text: '明日', reading: 'あした', roman: 'ashita', de: 'morgen', hint: 'a-schi-ta', note: '' },
            { id: 'ja-kino', text: '昨日', reading: 'きのう', roman: 'kinō', de: 'gestern', hint: 'ki-noh', note: '' },
            { id: 'ja-ima', text: '今', reading: 'いま', roman: 'ima', de: 'jetzt', hint: '', note: '' },
            { id: 'ja-asa', text: '朝', reading: 'あさ', roman: 'asa', de: 'Morgen (Tageszeit)', hint: '', note: '' },
            { id: 'ja-yoru', text: '夜', reading: 'よる', roman: 'yoru', de: 'Abend, Nacht', hint: 'jo-ru', note: '' },
            { id: 'ja-nanji', text: '何時ですか', reading: 'なんじですか', roman: 'nanji desu ka', de: 'Wie spät ist es?', hint: 'nan-dschi dess ka', note: '', seg: ['何時', 'です', 'か'] },
            { id: 'ja-sanji', text: '三時', reading: 'さんじ', roman: 'sanji', de: '3 Uhr', hint: 'san-dschi', note: 'Zahl + 時.' }
          ]
        },
        {
          id: 'ja-u7l2', title: 'Smalltalk', tip: '„…ですね“ = „…, nicht wahr?“ ist die Smalltalk-Endung schlechthin: きれいですね, 暑いですね. Das Gegenüber antwortet そうですね.',
          items: [
            { id: 'ja-kirei', text: 'きれいですね', roman: 'kirei desu ne', de: 'Wie schön!', hint: 'ki-reh dess ne', note: 'Für Landschaften, Tempel, Menschen.', seg: ['きれい', 'です', 'ね'] },
            { id: 'ja-atsui', text: '暑いですね', reading: 'あついですね', roman: 'atsui desu ne', de: 'Heiß heute, nicht wahr?', hint: 'a-tsu-i dess ne', note: '寒い (さむい) = kalt.', seg: ['暑い', 'です', 'ね'] },
            { id: 'ja-suki', text: '日本料理が好きです', reading: 'にほんりょうりがすきです', roman: 'nihon ryōri ga suki desu', de: 'Ich mag japanisches Essen', hint: 'ni-hon rjoh-ri ga su-ki dess', note: '„…が好きです“ = ich mag …', seg: ['日本料理', 'が', '好き', 'です'] },
            { id: 'ja-hajimete', text: '初めて来ました', reading: 'はじめてきました', roman: 'hajimete kimashita', de: 'Ich bin zum ersten Mal hier', hint: 'ha-dschi-me-te ki-ma-schi-ta', note: '初めて = zum ersten Mal.', seg: ['初めて', '来ました'] },
            { id: 'ja-shashin', text: '写真を撮ってもいいですか', reading: 'しゃしんをとってもいいですか', roman: 'shashin o totte mo ii desu ka', de: 'Darf ich ein Foto machen?', hint: 'scha-schin o tot-te mo i-i dess ka', note: '„…てもいいですか“ = Darf ich …?', seg: ['写真', 'を', '撮っても', 'いい', 'です', 'か'] },
            { id: 'ja-tanoshikatta', text: '楽しかったです', reading: 'たのしかったです', roman: 'tanoshikatta desu', de: 'Es war schön', hint: 'ta-no-schi-kat-ta dess', note: 'Zum Abschied.', seg: ['楽しかった', 'です'] }
          ]
        }
      ]
    },
    {
      id: 'ja-u8', title: 'Notfall & Gesundheit', subtitle: 'Hilfe, krank, verloren', color: '#64748b',
      can: ['um Hilfe rufen', 'Beschwerden beschreiben', 'Verlust von Pass oder Weg melden'],
      lessons: [
        {
          id: 'ja-u8l1', title: 'Hilfe & Polizei', tip: 'Notruf Polizei 110, Rettung und Feuerwehr 119. Die kleinen Polizeihäuschen 交番 (kōban) helfen auch bei Wegfragen und Fundsachen.',
          items: [
            { id: 'ja-tasukete', text: '助けて！', reading: 'たすけて', roman: 'tasukete!', de: 'Hilfe!', hint: 'ta-su-ke-te', note: '' },
            { id: 'ja-keisatsu', text: '警察', reading: 'けいさつ', roman: 'keisatsu', de: 'Polizei', hint: 'keh-sa-tsu', note: 'Notruf 110.' },
            { id: 'ja-keisatsu-yonde', text: '警察を呼んでください', reading: 'けいさつをよんでください', roman: 'keisatsu o yonde kudasai', de: 'Rufen Sie die Polizei', hint: 'keh-sa-tsu o jon-de ku-da-sai', note: '', seg: ['警察', 'を', '呼んで', 'ください'] },
            { id: 'ja-kiotsukete', text: '気をつけて', reading: 'きをつけて', roman: 'ki o tsukete', de: 'Vorsicht / Pass auf dich auf', hint: 'ki o tsu-ke-te', note: 'Auch als Abschiedsgruß.', seg: ['気', 'を', 'つけて'] },
            { id: 'ja-kyukyusha', text: '救急車', reading: 'きゅうきゅうしゃ', roman: 'kyūkyūsha', de: 'Krankenwagen', hint: 'kjuh-kjuh-scha', note: 'Notruf 119. Kostenlos.' }
          ]
        },
        {
          id: 'ja-u8l2', title: 'Krank & Apotheke', tip: '„…が痛いです“ = „… tut weh“. Körperteil davor: お腹 = Bauch, 頭 = Kopf, 喉 = Hals.',
          items: [
            { id: 'ja-itai', text: '痛いです', reading: 'いたいです', roman: 'itai desu', de: 'Es tut weh', hint: 'i-tai dess', note: '', seg: ['痛い', 'です'] },
            { id: 'ja-onaka', text: 'お腹が痛いです', reading: 'おなかがいたいです', roman: 'onaka ga itai desu', de: 'Ich habe Bauchschmerzen', hint: 'o-na-ka ga i-tai dess', note: '', seg: ['お腹', 'が', '痛い', 'です'] },
            { id: 'ja-atama', text: '頭が痛いです', reading: 'あたまがいたいです', roman: 'atama ga itai desu', de: 'Ich habe Kopfschmerzen', hint: 'a-ta-ma ga i-tai dess', note: '', seg: ['頭', 'が', '痛い', 'です'] },
            { id: 'ja-kusuri', text: '薬', reading: 'くすり', roman: 'kusuri', de: 'Medikament', hint: 'ku-su-ri', note: '' },
            { id: 'ja-isha', text: '医者', reading: 'いしゃ', roman: 'isha', de: 'Arzt', hint: 'i-scha', note: '' },
            { id: 'ja-netsu', text: '熱があります', reading: 'ねつがあります', roman: 'netsu ga arimasu', de: 'Ich habe Fieber', hint: 'ne-tsu ga a-ri-mass', note: '', seg: ['熱', 'が', 'あります'] }
          ]
        },
        {
          id: 'ja-u8l3', title: 'Verloren', tip: 'Verlorenes kommt in Japan fast immer zurück. Erste Anlaufstelle: das nächste 交番 oder das Fundbüro im Bahnhof.',
          items: [
            { id: 'ja-pasupoto', text: 'パスポートをなくしました', roman: 'pasupōto o nakushimashita', de: 'Ich habe meinen Pass verloren', hint: 'pa-su-poh-to o na-ku-schi-ma-schi-ta', note: '', seg: ['パスポート', 'を', 'なくしました'] },
            { id: 'ja-michi', text: '道に迷いました', reading: 'みちにまよいました', roman: 'michi ni mayoimashita', de: 'Ich habe mich verlaufen', hint: 'mi-tschi ni ma-jo-i-ma-schi-ta', note: '', seg: ['道', 'に', '迷いました'] },
            { id: 'ja-taishikan', text: '大使館', reading: 'たいしかん', roman: 'taishikan', de: 'Botschaft', hint: 'tai-schi-kan', note: 'Deutsche Botschaft in Tokio, Konsulat in Osaka.' },
            { id: 'ja-tasuke', text: '助けが必要です', reading: 'たすけがひつようです', roman: 'tasuke ga hitsuyō desu', de: 'Ich brauche Hilfe', hint: 'ta-su-ke ga hi-tsu-joh dess', note: '', seg: ['助け', 'が', '必要', 'です'] }
          ]
        }
      ]
    }
  ]
};
