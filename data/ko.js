// Koreanisch – Inhalte für den Urlaub (reine Daten)
// Felder je Eintrag: id, text (Hangul), roman (Revised Romanization), de, hint (Klingt wie, nach der Legende), note, optional alt
// Höflichkeit: durchgehend 해요체 (-요). 합니다-Formen nur als feste Floskeln.
export default {
  code: 'ko',
  version: 1,
  name: 'Koreanisch',
  ttsLang: 'ko-KR',
  flag: '🇰🇷',
  testPhrase: '안녕하세요, 만나서 반갑습니다.',
  emergency: 'Notruf Polizei 112, Rettung und Feuerwehr 119.',

  // Legende der Lautschrift („Klingt wie“)
  pronunciation: [
    ['어', 'o, offen wie in „Ordnung“'],
    ['오', 'oh, geschlossen wie in „Boot“'],
    ['으', 'ü ohne Lippenrundung, fast ein gemurmeltes e'],
    ['우', 'u'],
    ['애, 에', 'e wie in „Bett“'],
    ['여 / 요', 'jo (offen) / joh (geschlossen)'],
    ['ㅈ', 'dsch, weich'],
    ['ㅊ', 'tsch'],
    ['ㅅ', 's, vor i wie sch'],
    ['ㄹ', 'zwischen r und l: am Silbenanfang r, am Ende l'],
    ['ㄱ ㄷ ㅂ', 'am Wortanfang weiches k, t, p; zwischen Vokalen g, d, b'],
    ['ㅋ ㅌ ㅍ', 'k, t, p mit kräftigem Hauch'],
    ['ㄲ ㄸ ㅃ ㅆ ㅉ', 'gepresst, ohne Hauch (kk, tt, pp, ss, tch)'],
    ['ㅇ am Silbenende', 'ng'],
    ['-습니다', 'sprich „sümnida“, das ㅂ wird vor ㄴ zu m'],
    ['Betonung', 'gleichmäßig, keine Silbe stark betonen']
  ],

  units: [
    {
      id: 'ko-u0', title: 'Hangul lesen', subtitle: 'Die Schrift in fünf Lektionen', color: '#0ea5e9',
      can: ['Hangul-Silben lesen', 'Schilder und Speisekarten entziffern'],
      lessons: [
        { id: 'ko-u0l1', title: 'Hangul 1: Grundvokale & erste Konsonanten', type: 'script', plugin: 'hangul', stage: 1 },
        { id: 'ko-u0l2', title: 'Hangul 2: Mehr Konsonanten, ya yeo yo yu', type: 'script', plugin: 'hangul', stage: 2 },
        { id: 'ko-u0l3', title: 'Hangul 3: Behaucht, gespannt, ae e', type: 'script', plugin: 'hangul', stage: 3 },
        { id: 'ko-u0l4', title: 'Hangul 4: Endkonsonanten & Doppelvokale', type: 'script', plugin: 'hangul', stage: 4 },
        { id: 'ko-u0l5', title: 'Hangul 5: Echte Wörter lesen', type: 'script', plugin: 'hangul', stage: 5 }
      ]
    },
    {
      id: 'ko-u1', title: 'Erste Worte', subtitle: 'Hallo, Danke, Bitte, Vorstellen', color: '#2563eb',
      can: ['grüßen und dich bedanken', 'um etwas bitten', 'sagen, dass du nichts verstehst'],
      lessons: [
        {
          id: 'ko-u1l1', title: 'Hallo & Danke', tip: 'Endet dein Satz auf „-요“, bist du höflich genug. Immer. „안녕하세요“ passt zu jeder Tageszeit und zu jedem Gegenüber.',
          items: [
            { id: 'ko-annyeong', text: '안녕하세요', roman: 'annyeonghaseyo', de: 'Hallo', hint: 'an-njong-ha-se-joh', note: 'Zu jeder Tageszeit, zu jedem. Mit leichter Verbeugung.' },
            { id: 'ko-gamsa', text: '감사합니다', roman: 'gamsahamnida', de: 'Danke', hint: 'kam-sa-ham-ni-da', note: '„고맙습니다“ ist gleichwertig.', alt: ['고맙습니다'] },
            { id: 'ko-joesong', text: '죄송합니다', roman: 'joesonghamnida', de: 'Entschuldigung (tut mir leid)', hint: 'dschwe-song-ham-ni-da', note: 'Für echte Entschuldigungen, etwa wenn man jemanden anrempelt.' },
            { id: 'ko-sillye', text: '실례합니다', roman: 'sillyehamnida', de: 'Entschuldigen Sie (um Aufmerksamkeit)', hint: 'schil-lje-ham-ni-da', note: 'Zum Ansprechen von Fremden, etwa um nach dem Weg zu fragen.' },
            { id: 'ko-annyeonghi-gaseyo', text: '안녕히 가세요', roman: 'annyeonghi gaseyo', de: 'Auf Wiedersehen (zu jemandem, der geht)', hint: 'an-njong-hi ga-se-joh', note: 'Wörtlich „Geh in Frieden“. Sagt man, wenn das Gegenüber geht.' },
            { id: 'ko-annyeonghi-gyeseyo', text: '안녕히 계세요', roman: 'annyeonghi gyeseyo', de: 'Auf Wiedersehen (zu jemandem, der bleibt)', hint: 'an-njong-hi gje-se-joh', note: 'Wörtlich „Bleib in Frieden“. Zum Personal, wenn du den Laden verlässt.' }
          ]
        },
        {
          id: 'ko-u1l2', title: 'Ja, Nein, Bitte', tip: '„주세요“ heißt „bitte geben Sie mir“ und wird hinter jedes Wort gehängt: 물 주세요 = Wasser, bitte. Das ist die wichtigste Formel der Reise.',
          items: [
            { id: 'ko-ne', text: '네', roman: 'ne', de: 'Ja', hint: 'ne', note: 'Auch als „ich höre zu“ und „bitte?“. Lockerer: 예.' },
            { id: 'ko-aniyo', text: '아니요', roman: 'aniyo', de: 'Nein', hint: 'a-ni-joh', note: '' },
            { id: 'ko-juseyo', text: '주세요', roman: 'juseyo', de: 'Bitte geben Sie mir', hint: 'dschu-se-joh', note: 'Hinter jedes Wort: „커피 주세요“ = Kaffee, bitte.' },
            { id: 'ko-gwaenchanayo', text: '괜찮아요', roman: 'gwaenchanayo', de: 'Kein Problem / Es geht', hint: 'gwen-tscha-na-joh', note: 'Antwort auf eine Entschuldigung, und höfliches „nein danke“ beim Ablehnen.' },
            { id: 'ko-jamsimanyo', text: '잠시만요', roman: 'jamsimanyo', de: 'Einen Moment, bitte', hint: 'dscham-schi-man-joh', note: 'Auch, um sich in der U-Bahn durchzuschieben.' },
            { id: 'ko-jeogiyo', text: '저기요', roman: 'jeogiyo', de: 'Entschuldigung! (jemanden rufen)', hint: 'dscho-gi-joh', note: 'So ruft man Bedienung oder Passanten. Wörtlich „dort drüben“.' }
          ]
        },
        {
          id: 'ko-u1l3', title: 'Verstehen & Nachfragen', tip: '„-해 주세요“ = „bitte tun Sie …“. 말해 주세요 = bitte sagen, 천천히 = langsam, 다시 = nochmal.',
          items: [
            { id: 'ko-yeongeo', text: '영어 할 수 있어요?', roman: 'yeongeo hal su isseoyo?', de: 'Sprechen Sie Englisch?', hint: 'jong-o hal su i-sso-joh', note: '영어 = Englisch. Junge Leute in Seoul: meist ja.' },
            { id: 'ko-moreugesseoyo', text: '모르겠어요', roman: 'moreugesseoyo', de: 'Ich weiß nicht', hint: 'mo-rü-ge-sso-joh', note: 'Auch für „ich verstehe nicht“.' },
            { id: 'ko-cheoncheonhi', text: '천천히 말해 주세요', roman: 'cheoncheonhi malhae juseyo', de: 'Bitte langsam sprechen', hint: 'tschon-tschon-hi mal-he dschu-se-joh', note: '' },
            { id: 'ko-dasi', text: '다시 한번 말해 주세요', roman: 'dasi hanbeon malhae juseyo', de: 'Bitte noch einmal sagen', hint: 'da-schi han-bon mal-he dschu-se-joh', note: '다시 = nochmal, 한번 = einmal.' },
            { id: 'ko-ige-mwoyeyo', text: '이게 뭐예요?', roman: 'ige mwoyeyo?', de: 'Was ist das?', hint: 'i-ge mwo-je-joh', note: 'Zeigen und fragen. 뭐 = was.' },
            { id: 'ko-algesseoyo', text: '알겠어요', roman: 'algesseoyo', de: 'Verstanden', hint: 'al-ge-sso-joh', note: 'Förmlicher: 알겠습니다.' }
          ]
        },
        {
          id: 'ko-u1l4', title: 'Vorstellen', tip: '„저는 … 예요“ = „Ich bin …“. Nach einem Konsonanten heißt es „이에요“, nach einem Vokal „예요“.',
          items: [
            { id: 'ko-jeoneun', text: '저는 한나예요', roman: 'jeoneun Hannayeyo', de: 'Ich bin Hannah', hint: 'dscho-nün han-na-je-joh', note: '저 = ich (höflich), 는 markiert das Thema.' },
            { id: 'ko-ireumi', text: '이름이 뭐예요?', roman: 'ireumi mwoyeyo?', de: 'Wie heißt du?', hint: 'i-rü-mi mwo-je-joh', note: '이름 = Name.' },
            { id: 'ko-dogil', text: '독일에서 왔어요', roman: 'dogireseo wasseoyo', de: 'Ich komme aus Deutschland', hint: 'do-gi-re-so wa-sso-joh', note: '독일 = Deutschland, 에서 = aus, 왔어요 = bin gekommen.' },
            { id: 'ko-mannaseo', text: '만나서 반갑습니다', roman: 'mannaseo bangapseumnida', de: 'Freut mich, Sie kennenzulernen', hint: 'man-na-so ban-gap-süm-ni-da', note: '' },
            { id: 'ko-gwangwanggaek', text: '관광객이에요', roman: 'gwangwanggaegieyo', de: 'Ich bin Touristin', hint: 'gwan-gwang-ge-gi-e-joh', note: '관광객 = Tourist.' },
            { id: 'ko-hangugeo', text: '한국어 조금 해요', roman: 'hangugeo jogeum haeyo', de: 'Ich spreche ein bisschen Koreanisch', hint: 'han-gu-go dscho-güm he-joh', note: 'Öffnet jedes Gespräch. 조금 = ein bisschen.' }
          ]
        },
        {
          id: 'ko-u1l5', title: 'Was das Personal sagt', type: 'understand', tip: 'Nur verstehen, nicht sagen. Diese Sätze hörst du beim Betreten jedes Ladens und Lokals.',
          items: [
            { id: 'ko-u-eoseo', text: '어서 오세요', roman: 'eoseo oseyo', de: 'Willkommen (beim Betreten)', hint: 'o-so oh-se-joh', note: 'Hört man in jedem Laden. Keine Antwort nötig, ein Nicken reicht.' },
            { id: 'ko-u-myeot-bun', text: '몇 분이세요?', roman: 'myeot buniseyo?', de: 'Wie viele Personen?', hint: 'mjot bu-ni-se-joh', note: 'Antwort: Zahl + 명, zum Beispiel 두 명.' },
            { id: 'ko-u-yeogiseo', text: '여기서 드세요?', roman: 'yeogiseo deuseyo?', de: 'Essen Sie hier?', hint: 'jo-gi-so dü-se-joh', note: 'Antwort: 네 oder 포장이요 (zum Mitnehmen).' },
            { id: 'ko-u-pojang', text: '포장이세요?', roman: 'pojangiseyo?', de: 'Zum Mitnehmen?', hint: 'po-dschang-i-se-joh', note: '' },
            { id: 'ko-u-bongtu', text: '봉투 필요하세요?', roman: 'bongtu piryohaseyo?', de: 'Brauchen Sie eine Tüte?', hint: 'bong-tu pi-rjo-ha-se-joh', note: 'Tüten kosten extra. Antwort: 네 oder 아니요.' }
          ]
        }
      ]
    },
    {
      id: 'ko-u2', title: 'Zahlen & Geld', subtitle: 'Sino-Zahlen, Won, Zählwörter', color: '#16a34a',
      can: ['Preise verstehen und nennen', 'Portionen und Personen zählen'],
      lessons: [
        {
          id: 'ko-u2l1', title: 'Zahlen 0 bis 5', tip: 'Koreanisch hat zwei Zahlensysteme. Diese sino-koreanischen Zahlen brauchst du für Preise, Nummern, Minuten und Daten.',
          items: [
            { id: 'ko-n0', text: '공', roman: 'gong', de: '0', hint: 'gong', note: 'Bei Telefon- und Zimmernummern. In Rechnungen 영.' },
            { id: 'ko-n1', text: '일', roman: 'il', de: '1', hint: 'il', note: '' },
            { id: 'ko-n2', text: '이', roman: 'i', de: '2', hint: 'i', note: '' },
            { id: 'ko-n3', text: '삼', roman: 'sam', de: '3', hint: 'sam', note: '' },
            { id: 'ko-n4', text: '사', roman: 'sa', de: '4', hint: 'sa', note: 'Klingt wie „Tod“ (死), deshalb fehlt in manchen Aufzügen die 4.' },
            { id: 'ko-n5', text: '오', roman: 'o', de: '5', hint: 'oh', note: '' }
          ]
        },
        {
          id: 'ko-u2l2', title: 'Zahlen 6 bis 10', tip: 'Zusammensetzen wie im Deutschen ohne Ausnahmen: 십일 = 11, 이십 = 20, 이십오 = 25.',
          items: [
            { id: 'ko-n6', text: '육', roman: 'yuk', de: '6', hint: 'juk', note: '' },
            { id: 'ko-n7', text: '칠', roman: 'chil', de: '7', hint: 'tschil', note: '' },
            { id: 'ko-n8', text: '팔', roman: 'pal', de: '8', hint: 'pal', note: '' },
            { id: 'ko-n9', text: '구', roman: 'gu', de: '9', hint: 'gu', note: '' },
            { id: 'ko-n10', text: '십', roman: 'sip', de: '10', hint: 'schip', note: '십일 = 11, 이십 = 20.' }
          ]
        },
        {
          id: 'ko-u2l3', title: 'Hundert, Tausend, Won', tip: 'Koreanisch zählt in Zehntausendern: 만 = 10.000. Ein Kaffee kostet 사천 원 (4.000), ein Essen 만 원 (10.000). Faustregel: 1.000 Won ≈ 65 Cent.',
          items: [
            { id: 'ko-n100', text: '백', roman: 'baek', de: '100', hint: 'bek', note: '' },
            { id: 'ko-n1000', text: '천', roman: 'cheon', de: '1.000', hint: 'tschon', note: '' },
            { id: 'ko-n10000', text: '만', roman: 'man', de: '10.000', hint: 'man', note: '십만 = 100.000, 백만 = eine Million.' },
            { id: 'ko-won', text: '원', roman: 'won', de: 'Won (Währung)', hint: 'won', note: 'Steht nach der Zahl.' },
            { id: 'ko-eolma', text: '얼마예요?', roman: 'eolmayeyo?', de: 'Wie viel kostet das?', hint: 'ol-ma-je-joh', note: '' },
            { id: 'ko-ocheon-won', text: '오천 원', roman: 'ocheon won', de: '5.000 Won', hint: 'oh-tschon won', note: 'Zahl + 원. 만 원 = 10.000 Won.' }
          ]
        },
        {
          id: 'ko-u2l4', title: 'Zählen & Zählwörter', tip: 'Für Stückzahlen nimmt man die koreanischen Zahlen. Vor einem Zählwort verkürzen sich 하나, 둘, 셋, 넷 zu 한, 두, 세, 네: 커피 두 잔 = zwei Kaffee.',
          items: [
            { id: 'ko-hana', text: '하나', roman: 'hana', de: 'eins (beim Zählen)', hint: 'ha-na', note: 'Vor Zählwörtern 한: 한 개.' },
            { id: 'ko-dul', text: '둘', roman: 'dul', de: 'zwei (beim Zählen)', hint: 'dul', note: 'Vor Zählwörtern 두: 두 명.' },
            { id: 'ko-set', text: '셋', roman: 'set', de: 'drei (beim Zählen)', hint: 'set', note: 'Vor Zählwörtern 세: 세 잔.' },
            { id: 'ko-net', text: '넷', roman: 'net', de: 'vier (beim Zählen)', hint: 'net', note: 'Vor Zählwörtern 네: 네 개.' },
            { id: 'ko-han-jan', text: '한 잔', roman: 'han jan', de: 'ein Glas', hint: 'han dschan', note: '잔 = Glas, Tasse. „커피 한 잔 주세요“.' },
            { id: 'ko-du-myeong', text: '두 명', roman: 'du myeong', de: 'zwei Personen', hint: 'du mjong', note: '명 = Zählwort für Personen. Antwort auf 몇 분이세요?' },
            { id: 'ko-i-inbun', text: '이 인분', roman: 'i inbun', de: 'zwei Portionen', hint: 'i in-bun', note: 'Beim Grillen. Portionen werden mit Sino-Zahlen gezählt.' }
          ]
        }
      ]
    },
    {
      id: 'ko-u3', title: 'Essen & Trinken', subtitle: 'Bestellen, Gerichte, Wünsche, Café', color: '#f59e0b',
      can: ['Essen und Getränke bestellen', 'die Rechnung verlangen', 'sagen, was du nicht isst'],
      lessons: [
        {
          id: 'ko-u3l1', title: 'Bestellen', tip: 'Bedienung rufen ist normal und höflich: „저기요!“ oder „여기요!“. Bezahlt wird meist an der Kasse beim Ausgang.',
          items: [
            { id: 'ko-ige-juseyo', text: '이거 주세요', roman: 'ige juseyo', de: 'Das hier, bitte', hint: 'i-go dschu-se-joh', note: 'Zeigen und sagen. 이거 = das hier.' },
            { id: 'ko-menyu', text: '메뉴판 주세요', roman: 'menyupan juseyo', de: 'Die Speisekarte, bitte', hint: 'me-nju-pan dschu-se-joh', note: '' },
            { id: 'ko-yeogiyo', text: '여기요!', roman: 'yeogiyo!', de: 'Hier, bitte! (Bedienung rufen)', hint: 'jo-gi-joh', note: 'Wie 저기요, im Restaurant noch üblicher.' },
            { id: 'ko-gyesan', text: '계산해 주세요', roman: 'gyesanhae juseyo', de: 'Die Rechnung, bitte', hint: 'gje-san-he dschu-se-joh', note: '계산 = Rechnung. Oft zahlt man an der Kasse.' },
            { id: 'ko-pojang-juseyo', text: '포장해 주세요', roman: 'pojanghae juseyo', de: 'Zum Mitnehmen, bitte', hint: 'po-dschang-he dschu-se-joh', note: '포장 = einpacken.' },
            { id: 'ko-yeogiseo-meogeulgeyo', text: '여기서 먹을게요', roman: 'yeogiseo meogeulgeyo', de: 'Ich esse hier', hint: 'jo-gi-so mo-gül-ge-joh', note: '' }
          ]
        },
        {
          id: 'ko-u3l2', title: 'Getränke', tip: 'Wasser gibt es im Restaurant gratis, oft am Selbstbedienungsautomaten. „아이스“ und „따뜻한“ vor dem Getränk regeln kalt oder warm.',
          items: [
            { id: 'ko-mul', text: '물', roman: 'mul', de: 'Wasser', hint: 'mul', note: '' },
            { id: 'ko-keopi', text: '커피', roman: 'keopi', de: 'Kaffee', hint: 'ko-pi', note: '' },
            { id: 'ko-amerikano', text: '아이스 아메리카노', roman: 'aiseu amerikano', de: 'Eiskaffee (schwarz)', hint: 'a-i-sü a-me-ri-ka-noh', note: 'Das koreanische Nationalgetränk, auch im Winter.' },
            { id: 'ko-maekju', text: '맥주', roman: 'maekju', de: 'Bier', hint: 'mek-dschu', note: '' },
            { id: 'ko-soju', text: '소주', roman: 'soju', de: 'Soju', hint: 'soh-dschu', note: 'Klarer Schnaps, wird gemeinsam getrunken. Einschenken lassen, nicht selbst.' },
            { id: 'ko-cha', text: '차', roman: 'cha', de: 'Tee', hint: 'tscha', note: '녹차 = grüner Tee.' }
          ]
        },
        {
          id: 'ko-u3l3', title: 'Gerichte', tip: 'Viele Namen kannst du nach der Hangul-Einheit einfach lesen. 밥 = Reis, 국 und 찌개 = Suppe und Eintopf, 구이 = gegrillt.',
          items: [
            { id: 'ko-bibimbap', text: '비빔밥', roman: 'bibimbap', de: 'Reisschale mit Gemüse und Ei', hint: 'bi-bim-bap', note: '비빔 = gemischt, 밥 = Reis. Vor dem Essen kräftig umrühren.' },
            { id: 'ko-kimchijjigae', text: '김치찌개', roman: 'gimchijjigae', de: 'Kimchi-Eintopf', hint: 'kim-tschi-tschi-ge', note: 'Scharf, mit Schweinefleisch oder Tofu.' },
            { id: 'ko-bulgogi', text: '불고기', roman: 'bulgogi', de: 'mariniertes Rindfleisch', hint: 'bul-go-gi', note: 'Wörtlich „Feuerfleisch“. Nicht scharf.' },
            { id: 'ko-gimbap', text: '김밥', roman: 'gimbap', de: 'Reisrolle', hint: 'kim-bap', note: 'Günstig, überall, perfekt für unterwegs.' },
            { id: 'ko-tteokbokki', text: '떡볶이', roman: 'tteokbokki', de: 'scharfe Reiskuchen', hint: 'tok-bo-kki', note: 'Streetfood-Klassiker.' },
            { id: 'ko-samgyeopsal', text: '삼겹살', roman: 'samgyeopsal', de: 'Schweinebauch vom Tischgrill', hint: 'sam-gjop-sal', note: 'Wird in Salatblätter gewickelt. Meist ab 2 Portionen.' },
            { id: 'ko-chikin', text: '치킨', roman: 'chikin', de: 'Brathähnchen', hint: 'tschi-kin', note: '치맥 = Hähnchen mit Bier.' }
          ]
        },
        {
          id: 'ko-u3l4', title: 'Wünsche & Allergien', tip: '„안“ vor dem Verb verneint: 안 먹어요 = ich esse nicht. „잘 먹겠습니다“ vor dem Essen und „잘 먹었습니다“ danach sind feste Floskeln, die jeder gern hört.',
          items: [
            { id: 'ko-masisseoyo', text: '맛있어요', roman: 'masisseoyo', de: 'Es schmeckt sehr gut', hint: 'ma-schi-sso-joh', note: '맛 = Geschmack.' },
            { id: 'ko-an-maepge', text: '안 맵게 해 주세요', roman: 'an maepge hae juseyo', de: 'Bitte nicht scharf', hint: 'an mep-ge he dschu-se-joh', note: '맵다 = scharf sein.' },
            { id: 'ko-jal-meokget', text: '잘 먹겠습니다', roman: 'jal meokgetseumnida', de: 'Guten Appetit (sagt man selbst, vor dem Essen)', hint: 'dschal mok-get-süm-ni-da', note: 'Wörtlich „Ich werde gut essen“.' },
            { id: 'ko-jal-meogeot', text: '잘 먹었습니다', roman: 'jal meogeotseumnida', de: 'Danke fürs Essen (nach dem Essen)', hint: 'dschal mo-go-ssüm-ni-da', note: 'Wörtlich „Ich habe gut gegessen“. Zum Abschied im Lokal.' },
            { id: 'ko-chaesik', text: '채식주의자예요', roman: 'chaesikjuuijayeyo', de: 'Ich bin Vegetarierin', hint: 'tsche-schik-dschu-üi-dscha-je-joh', note: 'Fischsauce und Fleischbrühe sind oft trotzdem drin.' },
            { id: 'ko-gogi-an', text: '고기 안 먹어요', roman: 'gogi an meogeoyo', de: 'Ich esse kein Fleisch', hint: 'go-gi an mo-go-joh', note: '고기 = Fleisch.' },
            { id: 'ko-allereugi', text: '알레르기 있어요', roman: 'allereugi isseoyo', de: 'Ich habe eine Allergie', hint: 'al-le-rü-gi i-sso-joh', note: 'Danach die Zutat zeigen, z. B. 땅콩 = Erdnuss.' }
          ]
        },
        {
          id: 'ko-u3l5', title: 'Café & Laden', tip: 'Im Café: erst Getränk, dann „따뜻한 거요“ oder „차가운 거요“. Karte geht fast überall, auch für 1.000 Won.',
          items: [
            { id: 'ko-ttatteuthan', text: '따뜻한 거요', roman: 'ttatteuthan geoyo', de: 'Heiß, bitte', hint: 'ta-tü-tan go-joh', note: '거 = Ding, Sache. „Das Heiße, bitte“.' },
            { id: 'ko-chagaun', text: '차가운 거요', roman: 'chagaun geoyo', de: 'Kalt, bitte', hint: 'tscha-ga-un go-joh', note: '' },
            { id: 'ko-bongtu-eopseoyo', text: '봉투 필요 없어요', roman: 'bongtu piryo eopseoyo', de: 'Keine Tüte, danke', hint: 'bong-tu pi-rjo op-sso-joh', note: '필요 없어요 = brauche ich nicht.' },
            { id: 'ko-kadeu', text: '카드 돼요?', roman: 'kadeu dwaeyo?', de: 'Geht Karte?', hint: 'ka-dü dwe-joh', note: '돼요 = geht, ist möglich.' },
            { id: 'ko-hyeongeum', text: '현금', roman: 'hyeongeum', de: 'Bargeld', hint: 'hjon-güm', note: 'Auf Märkten manchmal nötig.' }
          ]
        },
        {
          id: 'ko-u3l6', title: 'Was die Bedienung sagt', type: 'understand', tip: 'Nur verstehen. „-세요“ und „-셨어요“ sind die höflichen Formen, die das Personal dir gegenüber benutzt.',
          items: [
            { id: 'ko-u-jumun', text: '주문하시겠어요?', roman: 'jumunhasigesseoyo?', de: 'Möchten Sie bestellen?', hint: 'dschu-mun-ha-schi-ge-sso-joh', note: '주문 = Bestellung.' },
            { id: 'ko-u-maewoyo', text: '매워요', roman: 'maewoyo', de: 'Das ist scharf', hint: 'me-wo-joh', note: 'Eine Warnung, ernst nehmen.' },
            { id: 'ko-u-da-deusyeosseoyo', text: '다 드셨어요?', roman: 'da deusyeosseoyo?', de: 'Sind Sie fertig mit dem Essen?', hint: 'da dü-schjo-sso-joh', note: 'Antwort: 네 oder 아직이요 (noch nicht).' },
            { id: 'ko-u-masitge', text: '맛있게 드세요', roman: 'masitge deuseyo', de: 'Guten Appetit (vom Personal)', hint: 'ma-schit-ge dü-se-joh', note: 'Antwort: 감사합니다.' }
          ]
        }
      ]
    },
    {
      id: 'ko-u4', title: 'Unterwegs', subtitle: 'Wege, Taxi, U-Bahn, Orte', color: '#a855f7',
      can: ['nach dem Weg fragen', 'Taxi und U-Bahn nutzen', 'wichtige Orte benennen'],
      lessons: [
        {
          id: 'ko-u4l1', title: 'Wo ist …?', tip: '„… 어디예요?“ = „Wo ist …?“. Das Gesuchte kommt davor, oft mit „이“ oder „가“ dahinter: 화장실이 어디예요?',
          items: [
            { id: 'ko-hwajangsil', text: '화장실이 어디예요?', roman: 'hwajangsiri eodiyeyo?', de: 'Wo ist die Toilette?', hint: 'hwa-dschang-schi-ri o-di-je-joh', note: '화장실 = Toilette.' },
            { id: 'ko-eodiyeyo', text: '어디예요?', roman: 'eodiyeyo?', de: 'Wo ist …?', hint: 'o-di-je-joh', note: 'Nach jedem Ort: 역 어디예요? = Wo ist der Bahnhof?' },
            { id: 'ko-yeogi', text: '여기', roman: 'yeogi', de: 'hier', hint: 'jo-gi', note: '' },
            { id: 'ko-jeogi', text: '저기', roman: 'jeogi', de: 'dort', hint: 'dscho-gi', note: '' },
            { id: 'ko-oenjjok', text: '왼쪽', roman: 'oenjjok', de: 'links', hint: 'wen-tschok', note: '' },
            { id: 'ko-oreunjjok', text: '오른쪽', roman: 'oreunjjok', de: 'rechts', hint: 'oh-rün-tschok', note: '' },
            { id: 'ko-jikjin', text: '직진', roman: 'jikjin', de: 'geradeaus', hint: 'dschik-dschin', note: '' }
          ]
        },
        {
          id: 'ko-u4l2', title: 'Taxi', tip: '„…(으)로 가 주세요“ = „Bitte fahren Sie nach …“. Taxis sind günstig und fahren nach Taxameter. Adresse auf dem Handy zeigen hilft immer.',
          items: [
            { id: 'ko-taeksi', text: '택시', roman: 'taeksi', de: 'Taxi', hint: 'tek-schi', note: 'App: Kakao T.' },
            { id: 'ko-gonghang-euro', text: '공항으로 가 주세요', roman: 'gonghangeuro ga juseyo', de: 'Zum Flughafen, bitte', hint: 'gong-hang-ü-roh ga dschu-se-joh', note: '으로 = nach, zu. Nach Vokal nur 로.' },
            { id: 'ko-sewo', text: '여기서 세워 주세요', roman: 'yeogiseo sewo juseyo', de: 'Hier anhalten, bitte', hint: 'jo-gi-so se-wo dschu-se-joh', note: '' },
            { id: 'ko-eolmana', text: '얼마나 걸려요?', roman: 'eolmana geollyeoyo?', de: 'Wie lange dauert es?', hint: 'ol-ma-na gol-ljo-joh', note: '' },
            { id: 'ko-juso', text: '주소', roman: 'juso', de: 'Adresse', hint: 'dschu-soh', note: 'Hoteladresse auf Koreanisch dabeihaben.' }
          ]
        },
        {
          id: 'ko-u4l3', title: 'U-Bahn & Bus', tip: 'Die T-money-Karte (교통카드) gibt es im Minimarkt und gilt für U-Bahn, Bus und Taxi. Ausgänge sind nummeriert: 3번 출구 = Ausgang 3.',
          items: [
            { id: 'ko-jihacheol', text: '지하철', roman: 'jihacheol', de: 'U-Bahn', hint: 'dschi-ha-tschol', note: '' },
            { id: 'ko-yeok', text: '역', roman: 'yeok', de: 'Bahnhof, Station', hint: 'jok', note: '서울역 = Seoul Hauptbahnhof.' },
            { id: 'ko-chulgu', text: '출구', roman: 'chulgu', de: 'Ausgang', hint: 'tschul-gu', note: '입구 = Eingang.' },
            { id: 'ko-myeot-beon-chulgu', text: '몇 번 출구예요?', roman: 'myeot beon chulguyeyo?', de: 'Welcher Ausgang?', hint: 'mjot bon tschul-gu-je-joh', note: '번 = Nummer.' },
            { id: 'ko-beoseu', text: '버스', roman: 'beoseu', de: 'Bus', hint: 'bo-sü', note: '' },
            { id: 'ko-gyotongkadeu', text: '교통카드', roman: 'gyotongkadeu', de: 'Verkehrskarte (T-money)', hint: 'gjo-tong-ka-dü', note: 'Beim Ein- und Aussteigen an das Lesegerät halten.' },
            { id: 'ko-gonghang', text: '공항', roman: 'gonghang', de: 'Flughafen', hint: 'gong-hang', note: '인천공항 = Flughafen Incheon.' }
          ]
        },
        {
          id: 'ko-u4l4', title: 'Orte', tip: 'Zusammen mit „어디예요?“ ergibt jedes Wort eine fertige Frage. 편의점 gibt es an jeder Ecke, rund um die Uhr.',
          items: [
            { id: 'ko-hotel', text: '호텔', roman: 'hotel', de: 'Hotel', hint: 'ho-tel', note: '' },
            { id: 'ko-sijang', text: '시장', roman: 'sijang', de: 'Markt', hint: 'schi-dschang', note: '' },
            { id: 'ko-pyeonuijeom', text: '편의점', roman: 'pyeonuijeom', de: 'Minimarkt', hint: 'pjo-nüi-dschom', note: 'GS25, CU, 7-Eleven. Rund um die Uhr offen.' },
            { id: 'ko-eunhaeng', text: '은행', roman: 'eunhaeng', de: 'Bank', hint: 'ün-heng', note: '' },
            { id: 'ko-byeongwon', text: '병원', roman: 'byeongwon', de: 'Krankenhaus', hint: 'bjong-won', note: '' },
            { id: 'ko-yakguk', text: '약국', roman: 'yakguk', de: 'Apotheke', hint: 'jak-guk', note: '' },
            { id: 'ko-sikdang', text: '식당', roman: 'sikdang', de: 'Restaurant', hint: 'schik-dang', note: '' },
            { id: 'ko-kape', text: '카페', roman: 'kape', de: 'Café', hint: 'ka-pe', note: '' }
          ]
        }
      ]
    },
    {
      id: 'ko-u5', title: 'Einkaufen & Hotel', subtitle: 'Markt, Laden, Zimmer', color: '#ef4444',
      can: ['auf dem Markt kaufen und handeln', 'im Hotel einchecken', 'nach WLAN und Frühstück fragen'],
      lessons: [
        {
          id: 'ko-u5l1', title: 'Markt & Laden', tip: 'Handeln geht auf Märkten, nicht in Läden mit Preisschild. „깎아 주세요“ mit Lächeln, dann meist ein kleiner Nachlass.',
          items: [
            { id: 'ko-ige-eolma', text: '이거 얼마예요?', roman: 'ige eolmayeyo?', de: 'Was kostet das hier?', hint: 'i-go ol-ma-je-joh', note: '' },
            { id: 'ko-bissayo', text: '비싸요', roman: 'bissayo', de: 'teuer', hint: 'bi-ssa-joh', note: '너무 비싸요 = zu teuer.' },
            { id: 'ko-ssayo', text: '싸요', roman: 'ssayo', de: 'billig', hint: 'ssa-joh', note: '' },
            { id: 'ko-kkakka', text: '깎아 주세요', roman: 'kkakka juseyo', de: 'Bitte etwas billiger', hint: 'ka-kka dschu-se-joh', note: 'Wörtlich „bitte abschneiden“.' },
            { id: 'ko-gugyeong', text: '그냥 구경해요', roman: 'geunyang gugyeonghaeyo', de: 'Ich schaue nur', hint: 'gü-njang gu-gjong-he-joh', note: 'Freundlich abwimmeln.' },
            { id: 'ko-keun-geo', text: '큰 거', roman: 'keun geo', de: 'das Große', hint: 'kün go', note: '큰 거 주세요 = das Große, bitte.' },
            { id: 'ko-jageun-geo', text: '작은 거', roman: 'jageun geo', de: 'das Kleine', hint: 'dscha-gün go', note: '' }
          ]
        },
        {
          id: 'ko-u5l2', title: 'Im Hotel', tip: '„-했어요“ ist Vergangenheit: 예약했어요 = ich habe reserviert. Nächte zählt man mit 박: 이박 = zwei Nächte.',
          items: [
            { id: 'ko-yeyak', text: '예약했어요', roman: 'yeyakhaesseoyo', de: 'Ich habe reserviert', hint: 'je-ja-ke-sso-joh', note: '예약 = Reservierung.' },
            { id: 'ko-bang', text: '방', roman: 'bang', de: 'Zimmer', hint: 'bang', note: '' },
            { id: 'ko-kadeu-ki', text: '카드 키', roman: 'kadeu ki', de: 'Zimmerkarte', hint: 'ka-dü ki', note: '' },
            { id: 'ko-waipai', text: '와이파이 비밀번호가 뭐예요?', roman: 'waipai bimilbeonhoga mwoyeyo?', de: 'Wie ist das WLAN-Passwort?', hint: 'wa-i-pa-i bi-mil-bon-ho-ga mwo-je-joh', note: '비밀번호 = Passwort.' },
            { id: 'ko-josik', text: '조식 몇 시예요?', roman: 'josik myeot siyeyo?', de: 'Um wie viel Uhr gibt es Frühstück?', hint: 'dscho-schik mjot schi-je-joh', note: '조식 = Frühstück (im Hotel), 몇 시 = wie viel Uhr.' },
            { id: 'ko-chekeuaut', text: '체크아웃', roman: 'chekeuaut', de: 'Check-out', hint: 'tsche-kü-a-ut', note: '체크아웃 할게요 = Ich checke aus.' },
            { id: 'ko-ibak', text: '이박', roman: 'ibak', de: 'zwei Nächte', hint: 'i-bak', note: '박 = Übernachtung. 삼박 = drei Nächte.' }
          ]
        }
      ]
    },
    {
      id: 'ko-u6', title: 'Smalltalk & Zeit', subtitle: 'Tage, Uhrzeit, kleine Gespräche', color: '#0891b2',
      can: ['über Zeit und Tage sprechen', 'Smalltalk über Reise und Wetter machen'],
      lessons: [
        {
          id: 'ko-u6l1', title: 'Zeit & Tage', tip: 'Uhrzeit: koreanische Zahl + 시. 세 시 = 3 Uhr. „몇 시예요?“ fragt nach der Uhrzeit.',
          items: [
            { id: 'ko-oneul', text: '오늘', roman: 'oneul', de: 'heute', hint: 'oh-nül', note: '' },
            { id: 'ko-naeil', text: '내일', roman: 'naeil', de: 'morgen', hint: 'ne-il', note: '' },
            { id: 'ko-eoje', text: '어제', roman: 'eoje', de: 'gestern', hint: 'o-dsche', note: '' },
            { id: 'ko-jigeum', text: '지금', roman: 'jigeum', de: 'jetzt', hint: 'dschi-güm', note: '' },
            { id: 'ko-achim', text: '아침', roman: 'achim', de: 'Morgen, Frühstück', hint: 'a-tschim', note: 'Heißt beides.' },
            { id: 'ko-jeonyeok', text: '저녁', roman: 'jeonyeok', de: 'Abend, Abendessen', hint: 'dscho-njok', note: 'Heißt beides.' },
            { id: 'ko-myeot-si', text: '몇 시예요?', roman: 'myeot siyeyo?', de: 'Wie spät ist es?', hint: 'mjot schi-je-joh', note: '' }
          ]
        },
        {
          id: 'ko-u6l2', title: 'Smalltalk', tip: '„좋아요“ = gut, gefällt mir. Alles, was du magst, plus 좋아요: 한국 좋아요, 김치 좋아요.',
          items: [
            { id: 'ko-hanguk-joayo', text: '한국 좋아요', roman: 'hanguk joayo', de: 'Ich mag Korea', hint: 'han-guk dscho-a-joh', note: '한국 = Korea.' },
            { id: 'ko-deowoyo', text: '더워요', roman: 'deowoyo', de: 'Es ist heiß', hint: 'do-wo-joh', note: '추워요 = es ist kalt.' },
            { id: 'ko-cheoeum', text: '처음 왔어요', roman: 'cheoeum wasseoyo', de: 'Ich bin zum ersten Mal hier', hint: 'tscho-üm wa-sso-joh', note: '처음 = zum ersten Mal.' },
            { id: 'ko-sajin', text: '사진 찍어도 돼요?', roman: 'sajin jjigeodo dwaeyo?', de: 'Darf ich ein Foto machen?', hint: 'sa-dschin tschi-go-do dwe-joh', note: '„-어도 돼요?“ = Darf ich …?' },
            { id: 'ko-jaemi', text: '재미있어요', roman: 'jaemiisseoyo', de: 'Das macht Spaß', hint: 'dsche-mi-i-sso-joh', note: '' },
            { id: 'ko-tto-olgeyo', text: '또 올게요', roman: 'tto olgeyo', de: 'Ich komme wieder', hint: 'to ol-ge-joh', note: 'Zum Abschied im Lokal. Freut jeden.' }
          ]
        }
      ]
    },
    {
      id: 'ko-u7', title: 'Notfall & Gesundheit', subtitle: 'Hilfe, krank, verloren', color: '#64748b',
      can: ['um Hilfe rufen', 'Beschwerden beschreiben', 'Verlust von Pass oder Weg melden'],
      lessons: [
        {
          id: 'ko-u7l1', title: 'Hilfe!', tip: 'Notrufnummern: Polizei 112, Rettung und Feuerwehr 119. Beide haben Dolmetscher für Englisch.',
          items: [
            { id: 'ko-dowajuseyo', text: '도와주세요!', roman: 'dowajuseyo!', de: 'Hilfe! Helfen Sie mir!', hint: 'do-wa-dschu-se-joh', note: '' },
            { id: 'ko-gyeongchal', text: '경찰', roman: 'gyeongchal', de: 'Polizei', hint: 'gjong-tschal', note: 'Notruf 112.' },
            { id: 'ko-gyeongchal-bulleo', text: '경찰 불러 주세요', roman: 'gyeongchal bulleo juseyo', de: 'Rufen Sie die Polizei', hint: 'gjong-tschal bul-lo dschu-se-joh', note: '불러 주세요 = bitte rufen.' },
            { id: 'ko-josimhaseyo', text: '조심하세요', roman: 'josimhaseyo', de: 'Vorsicht', hint: 'dscho-schim-ha-se-joh', note: '' },
            { id: 'ko-eunggeupsil', text: '응급실', roman: 'eunggeupsil', de: 'Notaufnahme', hint: 'üng-güp-schil', note: 'Notruf Rettung 119.' }
          ]
        },
        {
          id: 'ko-u7l2', title: 'Krank & Apotheke', tip: '„…가 아파요“ = „… tut weh“. Körperteil davor: 배 = Bauch, 머리 = Kopf, 목 = Hals.',
          items: [
            { id: 'ko-apayo', text: '아파요', roman: 'apayo', de: 'Es tut weh', hint: 'a-pa-joh', note: '' },
            { id: 'ko-baega', text: '배가 아파요', roman: 'baega apayo', de: 'Ich habe Bauchschmerzen', hint: 'be-ga a-pa-joh', note: '배 = Bauch.' },
            { id: 'ko-meoriga', text: '머리가 아파요', roman: 'meoriga apayo', de: 'Ich habe Kopfschmerzen', hint: 'mo-ri-ga a-pa-joh', note: '머리 = Kopf.' },
            { id: 'ko-yak', text: '약', roman: 'yak', de: 'Medikament', hint: 'jak', note: 'In der Apotheke: 배 아픈 약 주세요 = Medikament gegen Bauchschmerzen.' },
            { id: 'ko-uisa', text: '의사', roman: 'uisa', de: 'Arzt', hint: 'üi-sa', note: '' },
            { id: 'ko-yeori', text: '열이 있어요', roman: 'yeori isseoyo', de: 'Ich habe Fieber', hint: 'jo-ri i-sso-joh', note: '열 = Fieber, Hitze.' }
          ]
        },
        {
          id: 'ko-u7l3', title: 'Verloren', tip: 'Verlorenes taucht in Korea oft wieder auf. Bei der Polizei gibt es ein Protokoll für die Versicherung, die Botschaft ist in Seoul.',
          items: [
            { id: 'ko-yeogwon', text: '여권을 잃어버렸어요', roman: 'yeogwoneul ireobeoryeosseoyo', de: 'Ich habe meinen Pass verloren', hint: 'jo-gwo-nül i-ro-bo-rjo-sso-joh', note: '여권 = Reisepass.' },
            { id: 'ko-gireul', text: '길을 잃었어요', roman: 'gireul ireosseoyo', de: 'Ich habe mich verlaufen', hint: 'gi-rül i-ro-sso-joh', note: '길 = Weg.' },
            { id: 'ko-daesagwan', text: '대사관', roman: 'daesagwan', de: 'Botschaft', hint: 'de-sa-gwan', note: '독일 대사관 = Deutsche Botschaft.' },
            { id: 'ko-doumi', text: '도움이 필요해요', roman: 'doumi piryohaeyo', de: 'Ich brauche Hilfe', hint: 'do-u-mi pi-rjo-he-joh', note: '도움 = Hilfe, 필요해요 = brauche.' }
          ]
        }
      ]
    }
  ]
};
