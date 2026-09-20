// Vietnamesisch – Inhalte für den Urlaub
// Felder: id, text (Vietnamesisch), de (Deutsch), hint (klingt ungefähr wie), note (Hinweis)
export default {
    code: 'vi',
    name: 'Vietnamesisch',
    ttsLang: 'vi-VN',
    flag: '🇻🇳',

    tones: [
      { key: 'ngang', mark: '', sample: 'ma', name: 'ngang', label: 'Ebener Ton', desc: 'Gleichmäßig, mittlere Höhe. Kein Zeichen.', meaning: 'ma = Geist' },
      { key: 'huyen', mark: '̀', sample: 'mà', name: 'huyền', label: 'Fallend', desc: 'Beginnt tief und sinkt weich ab. Zeichen: Gravis (à).', meaning: 'mà = aber' },
      { key: 'sac', mark: '́', sample: 'má', name: 'sắc', label: 'Steigend', desc: 'Steigt zügig nach oben. Zeichen: Akut (á).', meaning: 'má = Wange, Mama (Süden)' },
      { key: 'hoi', mark: '̉', sample: 'mả', name: 'hỏi', label: 'Fallend-steigend', desc: 'Sinkt ab und kommt wieder hoch, wie eine Frage. Zeichen: Häkchen (ả).', meaning: 'mả = Grab' },
      { key: 'nga', mark: '̃', sample: 'mã', name: 'ngã', label: 'Steigend mit Knick', desc: 'Steigt mit kurzem Bruch in der Mitte. Im Süden wie hỏi. Zeichen: Tilde (ã).', meaning: 'mã = Code' },
      { key: 'nang', mark: '̣', sample: 'mạ', name: 'nặng', label: 'Kurz und tief', desc: 'Kurz, tief, abrupt abgebrochen. Zeichen: Punkt unten (ạ).', meaning: 'mạ = Reissetzling' }
    ],
    toneSets: [['ma', 'mà', 'má', 'mả', 'mã', 'mạ'], ['ba', 'bà', 'bá', 'bả', 'bã', 'bạ'], ['la', 'là', 'lá', 'lả', 'lã', 'lạ'], ['ta', 'tà', 'tá', 'tả', 'tã', 'tạ']],

    pronunciation: [
      ['đ', 'd wie in „du“'],
      ['d, gi', 'Norden: s wie in „Rose“ · Süden: j wie in „ja“'],
      ['ph', 'f'],
      ['th', 't mit Hauch'],
      ['tr', 'tsch (Süden) · tj (Norden)'],
      ['ch', 'tj, fast wie tsch'],
      ['nh', 'nj wie in „Cognac“'],
      ['ng', 'ng wie in „singen“, auch am Wortanfang'],
      ['kh', 'ch wie in „Bach“'],
      ['x', 'ß, stimmloses s'],
      ['s', 'sch (Süden) · s (Norden)'],
      ['c, k, q', 'k'],
      ['ơ', 'ö ohne Lippenrundung, wie „uh“'],
      ['ư', 'ü ohne Lippenrundung'],
      ['â', 'kurzes, dumpfes a'],
      ['ă', 'kurzes a'],
      ['ê', 'geschlossenes e wie in „See“'],
      ['e', 'offenes ä'],
      ['ô', 'geschlossenes o wie in „Boot“'],
      ['o', 'sehr offenes o'],
      ['ay', 'ai'],
      ['ây', 'äi'],
      ['ai', 'a-i, lang']
    ],

    units: [
      {
        id: 'u1', title: 'Erste Worte', subtitle: 'Töne, Hallo, Danke, Vorstellen', color: '#2563eb',
        lessons: [
          { id: 'u1l0', title: 'Die 6 Töne', type: 'script', plugin: 'tones' },
          {
            id: 'u1l1', title: 'Hallo & Danke', items: [
              { id: 'xin-chao', text: 'Xin chào', de: 'Hallo', hint: 'sin tschau', note: 'Passt zu jeder Tageszeit. „Chào“ allein ist lockerer.' },
              { id: 'cam-on', text: 'Cảm ơn', de: 'Danke', hint: 'kam ön', note: 'Höflicher mit „ạ“ am Ende: „Cảm ơn ạ“.' },
              { id: 'cam-on-nhieu', text: 'Cảm ơn nhiều', de: 'Vielen Dank', hint: 'kam ön njieu', note: '„nhiều“ heißt viel.' },
              { id: 'xin-loi', text: 'Xin lỗi', de: 'Entschuldigung', hint: 'sin loi', note: 'Zum Entschuldigen und um Aufmerksamkeit zu bekommen.' },
              { id: 'khong-sao', text: 'Không sao', de: 'Kein Problem', hint: 'chong sau', note: 'Antwort auf eine Entschuldigung. Wörtlich: „nichts Stern“, sinngemäß „macht nichts“.' },
              { id: 'tam-biet', text: 'Tạm biệt', de: 'Auf Wiedersehen', hint: 'tam biet', note: 'Locker geht auch „Bye bye“.' },
              { id: 'hen-gap-lai', text: 'Hẹn gặp lại', de: 'Bis bald', hint: 'hen gap lai', note: 'Wörtlich: „Verabreden, wieder treffen“.' }
            ]
          },
          {
            id: 'u1l2', title: 'Ja & Nein', items: [
              { id: 'vang', text: 'Vâng', de: 'Ja', hint: 'wang', note: 'Höflich, vor allem im Norden. Im Süden meist „Dạ“.' },
              { id: 'da', text: 'Dạ', de: 'Ja (höflich)', hint: 'ja (Süden) · sa (Norden)', note: 'Sehr höflich, wird auch vor Antworten gesetzt: „Dạ, cảm ơn“.' },
              { id: 'khong', text: 'Không', de: 'Nein', hint: 'chong', note: 'Bedeutet auch „nicht“ und steht dann vor dem Verb.' },
              { id: 'toi', text: 'Tôi', de: 'ich', hint: 'toi', note: 'Neutral und immer richtig.' },
              { id: 'ban', text: 'Bạn', de: 'du', hint: 'ban', note: 'Freundlich, für Gleichaltrige. Für ältere Männer „anh“, für ältere Frauen „chị“.' },
              { id: 'toi-khong-hieu', text: 'Tôi không hiểu', de: 'Ich verstehe nicht', hint: 'toi chong hieu', note: '' },
              { id: 'noi-tieng-anh', text: 'Bạn nói tiếng Anh không?', de: 'Sprichst du Englisch?', hint: 'ban noi tieng ang chong', note: 'Fragen enden oft auf „không?“, wörtlich „oder nicht?“.' },
              { id: 'lam-on', text: 'Làm ơn', de: 'Bitte (Bitte um etwas)', hint: 'lam ön', note: 'Nur beim Bitten. Als Antwort auf Danke: „Không có gì“.' },
              { id: 'khong-co-gi', text: 'Không có gì', de: 'Gern geschehen', hint: 'chong ko ji', note: 'Wörtlich: „Da ist nichts“.' }
            ]
          },
          {
            id: 'u1l3', title: 'Vorstellen', items: [
              { id: 'toi-ten-la', text: 'Tôi tên là Hannah', de: 'Ich heiße Hannah', hint: 'toi ten la Hannah', note: '„tên“ = Name, „là“ = sein.' },
              { id: 'ban-ten-la-gi', text: 'Bạn tên là gì?', de: 'Wie heißt du?', hint: 'ban ten la ji', note: '„gì“ = was.' },
              { id: 'toi-den-tu-duc', text: 'Tôi đến từ Đức', de: 'Ich komme aus Deutschland', hint: 'toi den tü duk', note: '„Đức“ = Deutschland.' },
              { id: 'rat-vui', text: 'Rất vui được gặp bạn', de: 'Freut mich, dich kennenzulernen', hint: 'rat wui duok gap ban', note: '„rất vui“ = sehr froh.' },
              { id: 'ban-khoe-khong', text: 'Bạn khỏe không?', de: 'Wie geht es dir?', hint: 'ban chwä chong', note: 'Wörtlich: „Bist du gesund?“' },
              { id: 'toi-khoe', text: 'Tôi khỏe, cảm ơn', de: 'Mir geht es gut, danke', hint: 'toi chwä, kam ön', note: '' },
              { id: 'nguoi-duc', text: 'Tôi là người Đức', de: 'Ich bin Deutsche', hint: 'toi la ngu-oi duk', note: '„người“ = Mensch, Person.' },
              { id: 'khach-du-lich', text: 'Tôi là khách du lịch', de: 'Ich bin Touristin', hint: 'toi la chak ju lik', note: '„khách“ = Gast.' }
            ]
          }
        ]
      },
      {
        id: 'u2', title: 'Zahlen & Geld', subtitle: 'Zählen, Preise, Dong', color: '#16a34a',
        lessons: [
          {
            id: 'u2l1', title: '0 bis 5', items: [
              { id: 'n0', text: 'không', de: '0', hint: 'chong', note: 'Dasselbe Wort wie „nein“.' },
              { id: 'n1', text: 'một', de: '1', hint: 'mot (kurz)', note: '' },
              { id: 'n2', text: 'hai', de: '2', hint: 'hai', note: '' },
              { id: 'n3', text: 'ba', de: '3', hint: 'ba', note: '' },
              { id: 'n4', text: 'bốn', de: '4', hint: 'bon', note: '' },
              { id: 'n5', text: 'năm', de: '5', hint: 'nam', note: 'Heißt auch „Jahr“.' }
            ]
          },
          {
            id: 'u2l2', title: '6 bis 10', items: [
              { id: 'n6', text: 'sáu', de: '6', hint: 'sau', note: '' },
              { id: 'n7', text: 'bảy', de: '7', hint: 'bai', note: '' },
              { id: 'n8', text: 'tám', de: '8', hint: 'tam', note: '' },
              { id: 'n9', text: 'chín', de: '9', hint: 'tschin', note: '' },
              { id: 'n10', text: 'mười', de: '10', hint: 'mu-oi', note: '' }
            ]
          },
          {
            id: 'u2l3', title: '11 bis 100', items: [
              { id: 'n11', text: 'mười một', de: '11', hint: 'mu-oi mot', note: 'Zehn-eins. Genauso: mười hai = 12, mười ba = 13.' },
              { id: 'n15', text: 'mười lăm', de: '15', hint: 'mu-oi lam', note: 'Achtung: 5 wird nach „mười“ zu „lăm“.' },
              { id: 'n20', text: 'hai mươi', de: '20', hint: 'hai mu-oi', note: 'Ab 20 wird „mười“ zu „mươi“ (anderer Ton).' },
              { id: 'n21', text: 'hai mươi mốt', de: '21', hint: 'hai mu-oi mot', note: 'Die 1 wird nach „mươi“ zu „mốt“.' },
              { id: 'n30', text: 'ba mươi', de: '30', hint: 'ba mu-oi', note: '' },
              { id: 'n50', text: 'năm mươi', de: '50', hint: 'nam mu-oi', note: '' },
              { id: 'n100', text: 'một trăm', de: '100', hint: 'mot tscham', note: '' }
            ]
          },
          {
            id: 'u2l4', title: 'Preise', items: [
              { id: 'n1000', text: 'một nghìn', de: '1.000', hint: 'mot ngin', note: 'Im Süden „một ngàn“.' },
              { id: 'n10000', text: 'mười nghìn', de: '10.000', hint: 'mu-oi ngin', note: 'Etwa 40 Cent.' },
              { id: 'n100000', text: 'một trăm nghìn', de: '100.000', hint: 'mot tscham ngin', note: 'Etwa 4 Euro. Beim Preis wird „nghìn“ oft weggelassen: „một trăm“.' },
              { id: 'n1m', text: 'một triệu', de: '1.000.000', hint: 'mot tschieu', note: 'Etwa 40 Euro.' },
              { id: 'bao-nhieu-tien', text: 'Bao nhiêu tiền?', de: 'Wie viel kostet das?', hint: 'bau njieu tien', note: '„bao nhiêu“ = wie viel, „tiền“ = Geld.' },
              { id: 'dong', text: 'đồng', de: 'Dong (Währung)', hint: 'dong', note: 'Steht nach der Zahl: „năm mươi nghìn đồng“.' },
              { id: 'dat-qua', text: 'Đắt quá!', de: 'Zu teuer!', hint: 'dat kwa', note: '„quá“ = zu sehr, total. Nützlich beim Handeln.' },
              { id: 'tien', text: 'tiền', de: 'Geld', hint: 'tien', note: '' }
            ]
          }
        ]
      },
      {
        id: 'u3', title: 'Essen & Trinken', subtitle: 'Bestellen, Gerichte, Wünsche', color: '#f59e0b',
        lessons: [
          {
            id: 'u3l1', title: 'Bestellen', items: [
              { id: 'cho-toi-ca-phe', text: 'Cho tôi một cà phê', de: 'Einen Kaffee für mich', hint: 'tscho toi mot ka fe', note: '„Cho tôi ...“ = Geben Sie mir ... Die Standardformel zum Bestellen.' },
              { id: 'ca-phe-sua-da', text: 'cà phê sữa đá', de: 'Eiskaffee mit Kondensmilch', hint: 'ka fe süa da', note: 'Das Nationalgetränk. „sữa“ = Milch, „đá“ = Eis.' },
              { id: 'mot-chai-nuoc', text: 'một chai nước', de: 'eine Flasche Wasser', hint: 'mot tschai nu-ok', note: '„chai“ = Flasche, „nước“ = Wasser.' },
              { id: 'bia', text: 'bia', de: 'Bier', hint: 'bia', note: '' },
              { id: 'tra', text: 'trà', de: 'Tee', hint: 'tscha', note: '„trà đá“ = Eistee, gibt es oft gratis.' },
              { id: 'thuc-don', text: 'thực đơn', de: 'Speisekarte', hint: 'tuk don', note: '„Menu“ versteht auch jeder.' },
              { id: 'tinh-tien', text: 'Tính tiền!', de: 'Die Rechnung, bitte!', hint: 'tin tien', note: 'Wörtlich: „Geld zählen“.' },
              { id: 'toi-muon-cai-nay', text: 'Tôi muốn cái này', de: 'Ich möchte das hier', hint: 'toi muon kai nai', note: 'Zeigen und sagen. „cái này“ = das hier.' }
            ]
          },
          {
            id: 'u3l2', title: 'Gerichte', items: [
              { id: 'pho-bo', text: 'phở bò', de: 'Nudelsuppe mit Rind', hint: 'fö bo', note: '„bò“ = Rind.' },
              { id: 'pho-ga', text: 'phở gà', de: 'Nudelsuppe mit Huhn', hint: 'fö ga', note: '„gà“ = Huhn.' },
              { id: 'banh-mi', text: 'bánh mì', de: 'Baguette-Sandwich', hint: 'bain mi', note: '„bánh“ = Gebäck, „mì“ = Weizen.' },
              { id: 'com', text: 'cơm', de: 'Reis (gekocht)', hint: 'köm', note: '„cơm“ heißt auch einfach „Mahlzeit“.' },
              { id: 'bun-cha', text: 'bún chả', de: 'Reisnudeln mit Grillfleisch', hint: 'bun tscha', note: 'Hanoi-Klassiker.' },
              { id: 'goi-cuon', text: 'gỏi cuốn', de: 'Sommerrollen', hint: 'goi kuon', note: 'Frisch, nicht frittiert.' },
              { id: 'nuoc-mia', text: 'nước mía', de: 'Zuckerrohrsaft', hint: 'nu-ok mia', note: '' },
              { id: 'nuoc-dua', text: 'nước dừa', de: 'Kokoswasser', hint: 'nu-ok jü-a', note: '' }
            ]
          },
          {
            id: 'u3l3', title: 'Geschmack & Wünsche', items: [
              { id: 'ngon-qua', text: 'Ngon quá!', de: 'Sehr lecker!', hint: 'ngon kwa', note: 'Freut jede Köchin.' },
              { id: 'cay', text: 'cay', de: 'scharf', hint: 'kai', note: '' },
              { id: 'khong-cay', text: 'không cay', de: 'nicht scharf', hint: 'chong kai', note: '' },
              { id: 'khong-duong', text: 'không đường', de: 'ohne Zucker', hint: 'chong du-ong', note: 'Getränke sind oft sehr süß.' },
              { id: 'it-da', text: 'ít đá', de: 'wenig Eis', hint: 'it da', note: '' },
              { id: 'toi-an-chay', text: 'Tôi ăn chay', de: 'Ich esse vegetarisch', hint: 'toi an tschai', note: '„ăn“ = essen, „chay“ = vegetarisch.' },
              { id: 'di-ung', text: 'Tôi bị dị ứng', de: 'Ich habe eine Allergie', hint: 'toi bi ji ung', note: 'Danach das Wort zeigen, z. B. „đậu phộng“ = Erdnuss.' },
              { id: 'nuoc-mam', text: 'nước mắm', de: 'Fischsauce', hint: 'nu-ok mam', note: '' },
              { id: 'no-roi', text: 'Tôi no rồi', de: 'Ich bin satt', hint: 'toi no roi', note: '„rồi“ = schon.' }
            ]
          }
        ]
      },
      {
        id: 'u4', title: 'Unterwegs', subtitle: 'Wege, Taxi, Orte', color: '#a855f7',
        lessons: [
          {
            id: 'u4l1', title: 'Wo ist ...?', items: [
              { id: 'nha-ve-sinh', text: 'Nhà vệ sinh ở đâu?', de: 'Wo ist die Toilette?', hint: 'nja we sin ö dau', note: '„... ở đâu?“ = Wo ist ...? Das Gesuchte kommt davor.' },
              { id: 'ben-trai', text: 'bên trái', de: 'links', hint: 'ben tschai', note: '' },
              { id: 'ben-phai', text: 'bên phải', de: 'rechts', hint: 'ben fai', note: '' },
              { id: 'di-thang', text: 'đi thẳng', de: 'geradeaus', hint: 'di tang', note: '„đi“ = gehen.' },
              { id: 're-trai', text: 'rẽ trái', de: 'links abbiegen', hint: 're tschai', note: '' },
              { id: 'gan', text: 'gần', de: 'nah', hint: 'gan', note: '' },
              { id: 'xa', text: 'xa', de: 'weit', hint: 'sa', note: '' },
              { id: 'o-day', text: 'ở đây', de: 'hier', hint: 'ö däi', note: '' },
              { id: 'o-do', text: 'ở đó', de: 'dort', hint: 'ö do', note: '' }
            ]
          },
          {
            id: 'u4l2', title: 'Taxi & Bus', items: [
              { id: 'taxi', text: 'taxi', de: 'Taxi', hint: 'tak-si', note: 'Die App Grab ist wie Uber und meist günstiger.' },
              { id: 'xe-may', text: 'xe máy', de: 'Moped', hint: 'se mai', note: '„xe“ = Fahrzeug, „máy“ = Maschine.' },
              { id: 'xe-buyt', text: 'xe buýt', de: 'Bus', hint: 'se buit', note: '' },
              { id: 'san-bay', text: 'sân bay', de: 'Flughafen', hint: 'san bai', note: '„bay“ = fliegen.' },
              { id: 'ga-tau', text: 'ga tàu', de: 'Bahnhof', hint: 'ga tau', note: '„tàu“ = Zug, auch Schiff.' },
              { id: 'di-den-san-bay', text: 'Đi đến sân bay', de: 'Zum Flughafen, bitte', hint: 'di den san bai', note: '„đi đến“ = gehen zu.' },
              { id: 'dung-o-day', text: 'Dừng ở đây', de: 'Hier anhalten', hint: 'jung ö däi', note: '' },
              { id: 'bao-lau', text: 'Bao lâu?', de: 'Wie lange?', hint: 'bau lau', note: '' },
              { id: 'bao-xa', text: 'Bao xa?', de: 'Wie weit?', hint: 'bau sa', note: '' }
            ]
          },
          {
            id: 'u4l3', title: 'Orte', items: [
              { id: 'khach-san', text: 'khách sạn', de: 'Hotel', hint: 'chak san', note: '' },
              { id: 'cho', text: 'chợ', de: 'Markt', hint: 'tschö', note: '' },
              { id: 'bai-bien', text: 'bãi biển', de: 'Strand', hint: 'bai bien', note: '„biển“ = Meer.' },
              { id: 'ngan-hang', text: 'ngân hàng', de: 'Bank', hint: 'ngan hang', note: '' },
              { id: 'benh-vien', text: 'bệnh viện', de: 'Krankenhaus', hint: 'ben wien', note: '' },
              { id: 'hieu-thuoc', text: 'hiệu thuốc', de: 'Apotheke', hint: 'hieu tuok', note: 'Im Süden „nhà thuốc“.' },
              { id: 'nha-hang', text: 'nhà hàng', de: 'Restaurant', hint: 'nja hang', note: '' },
              { id: 'sieu-thi', text: 'siêu thị', de: 'Supermarkt', hint: 'sieu ti', note: '' },
              { id: 'cay-atm', text: 'cây ATM', de: 'Geldautomat', hint: 'käi a-te-em', note: '' }
            ]
          }
        ]
      },
      {
        id: 'u5', title: 'Einkaufen & Hotel', subtitle: 'Markt, Handeln, Zimmer', color: '#ef4444',
        lessons: [
          {
            id: 'u5l1', title: 'Auf dem Markt', items: [
              { id: 'cai-nay-bao-nhieu', text: 'Cái này bao nhiêu?', de: 'Wie viel kostet das hier?', hint: 'kai nai bau njieu', note: '' },
              { id: 'dat', text: 'đắt', de: 'teuer', hint: 'dat', note: '' },
              { id: 're', text: 'rẻ', de: 'billig', hint: 're', note: '' },
              { id: 'giam-gia', text: 'Giảm giá được không?', de: 'Geht es billiger?', hint: 'jam ja duok chong', note: 'Wörtlich: „Preis senken möglich?“ Auf Märkten normal.' },
              { id: 'toi-lay-cai-nay', text: 'Tôi lấy cái này', de: 'Ich nehme das hier', hint: 'toi läi kai nai', note: '' },
              { id: 'cai-kia', text: 'cái kia', de: 'das da', hint: 'kai kia', note: '' },
              { id: 'chi-xem-thoi', text: 'Chỉ xem thôi', de: 'Ich schaue nur', hint: 'tschi sem toi', note: 'Freundlich abwimmeln.' },
              { id: 'lon', text: 'lớn', de: 'groß', hint: 'lon', note: '' },
              { id: 'nho', text: 'nhỏ', de: 'klein', hint: 'njo', note: '' }
            ]
          },
          {
            id: 'u5l2', title: 'Im Hotel', items: [
              { id: 'phong', text: 'phòng', de: 'Zimmer', hint: 'fong', note: '' },
              { id: 'da-dat-phong', text: 'Tôi đã đặt phòng', de: 'Ich habe ein Zimmer reserviert', hint: 'toi da dat fong', note: '„đã“ = Vergangenheit, „đặt“ = reservieren.' },
              { id: 'chia-khoa', text: 'chìa khóa', de: 'Schlüssel', hint: 'tschia chwa', note: '' },
              { id: 'mat-khau-wifi', text: 'Mật khẩu wifi là gì?', de: 'Wie ist das WLAN-Passwort?', hint: 'mat chau wifi la ji', note: '„mật khẩu“ = Passwort.' },
              { id: 'bua-sang', text: 'bữa sáng', de: 'Frühstück', hint: 'büa sang', note: '„bữa“ = Mahlzeit, „sáng“ = Morgen.' },
              { id: 'may-gio', text: 'Mấy giờ?', de: 'Um wie viel Uhr?', hint: 'mäi jö', note: '„giờ“ = Stunde, Uhr.' },
              { id: 'nuoc-nong', text: 'nước nóng', de: 'heißes Wasser', hint: 'nu-ok nong', note: '' },
              { id: 'dieu-hoa', text: 'điều hòa', de: 'Klimaanlage', hint: 'dieu hwa', note: 'Im Süden „máy lạnh“.' },
              { id: 'tra-phong', text: 'Tôi trả phòng', de: 'Ich checke aus', hint: 'toi tscha fong', note: 'Wörtlich: „Ich gebe das Zimmer zurück“.' }
            ]
          }
        ]
      },
      {
        id: 'u6', title: 'Alltag & Notfall', subtitle: 'Zeit, Smalltalk, Hilfe', color: '#0891b2',
        lessons: [
          {
            id: 'u6l1', title: 'Zeit', items: [
              { id: 'hom-nay', text: 'hôm nay', de: 'heute', hint: 'hom nai', note: '' },
              { id: 'ngay-mai', text: 'ngày mai', de: 'morgen', hint: 'ngai mai', note: '' },
              { id: 'hom-qua', text: 'hôm qua', de: 'gestern', hint: 'hom kwa', note: '' },
              { id: 'bay-gio', text: 'bây giờ', de: 'jetzt', hint: 'bäi jö', note: '' },
              { id: 'buoi-sang', text: 'buổi sáng', de: 'morgens', hint: 'buoi sang', note: '' },
              { id: 'buoi-chieu', text: 'buổi chiều', de: 'nachmittags', hint: 'buoi tschieu', note: '' },
              { id: 'buoi-toi', text: 'buổi tối', de: 'abends', hint: 'buoi toi', note: '' },
              { id: 'may-gio-roi', text: 'Mấy giờ rồi?', de: 'Wie spät ist es?', hint: 'mäi jö roi', note: '' },
              { id: 'ba-gio-chieu', text: 'ba giờ chiều', de: '3 Uhr nachmittags', hint: 'ba jö tschieu', note: 'Zahl + giờ + Tageszeit.' }
            ]
          },
          {
            id: 'u6l2', title: 'Smalltalk', items: [
              { id: 'viet-nam-dep-qua', text: 'Việt Nam đẹp quá!', de: 'Vietnam ist so schön!', hint: 'wiet nam dep kwa', note: '„đẹp“ = schön.' },
              { id: 'troi-nong-qua', text: 'Trời nóng quá!', de: 'Es ist so heiß!', hint: 'tschoi nong kwa', note: '„trời“ = Himmel, Wetter.' },
              { id: 'toi-thich-pho', text: 'Tôi thích phở', de: 'Ich mag Phở', hint: 'toi tik fö', note: '„thích“ = mögen.' },
              { id: 'lam-nghe-gi', text: 'Bạn làm nghề gì?', de: 'Was arbeitest du?', hint: 'ban lam nge ji', note: '' },
              { id: 'bao-nhieu-tuoi', text: 'Bạn bao nhiêu tuổi?', de: 'Wie alt bist du?', hint: 'ban bau njieu tuoi', note: 'Wird schnell gefragt, weil die Anrede vom Alter abhängt. Nicht unhöflich.' },
              { id: 'toi-ba-muoi-tuoi', text: 'Tôi ba mươi tuổi', de: 'Ich bin 30 Jahre alt', hint: 'toi ba mu-oi tuoi', note: '„tuổi“ = Alter, Lebensjahre.' },
              { id: 'chuc-ngon-mieng', text: 'Chúc ngon miệng!', de: 'Guten Appetit!', hint: 'tschuk ngon mieng', note: '' },
              { id: 'lan-dau', text: 'Đây là lần đầu tôi đến Việt Nam', de: 'Das ist mein erstes Mal in Vietnam', hint: 'däi la lan dau toi den wiet nam', note: '„lần đầu“ = erstes Mal.' }
            ]
          },
          {
            id: 'u6l3', title: 'Notfall', items: [
              { id: 'cuu-toi-voi', text: 'Cứu tôi với!', de: 'Hilfe!', hint: 'kü-u toi woi', note: '„cứu“ = retten.' },
              { id: 'goi-canh-sat', text: 'Gọi cảnh sát!', de: 'Rufen Sie die Polizei!', hint: 'goi kain sat', note: 'Notruf Polizei: 113.' },
              { id: 'goi-bac-si', text: 'Gọi bác sĩ!', de: 'Rufen Sie einen Arzt!', hint: 'goi bak si', note: 'Notruf Rettung: 115.' },
              { id: 'toi-bi-om', text: 'Tôi bị ốm', de: 'Ich bin krank', hint: 'toi bi om', note: 'Im Süden „Tôi bị bệnh“.' },
              { id: 'toi-bi-lac', text: 'Tôi bị lạc', de: 'Ich habe mich verlaufen', hint: 'toi bi lak', note: '„bị“ markiert etwas Unangenehmes.' },
              { id: 'mat-ho-chieu', text: 'Tôi mất hộ chiếu', de: 'Ich habe meinen Pass verloren', hint: 'toi mat ho tschieu', note: '„hộ chiếu“ = Reisepass.' },
              { id: 'can-than', text: 'Cẩn thận!', de: 'Vorsicht!', hint: 'kan tan', note: '' },
              { id: 'toi-can-giup-do', text: 'Tôi cần giúp đỡ', de: 'Ich brauche Hilfe', hint: 'toi kan jup dö', note: '„cần“ = brauchen.' },
              { id: 'dai-su-quan', text: 'đại sứ quán', de: 'Botschaft', hint: 'dai su kwan', note: '' }
            ]
          }
        ]
      }
    ]
};
