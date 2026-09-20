# Sprachpfad – Ausbauplan zur Drei-Sprachen-App

Stand: 2026-09-20. Grundlage: vier unabhängige Reviews (Didaktik, Produkt/UX, Architektur, Vietnamesisch-Inhalte) der aktuellen Version, zusammengeführt und gegengelesen. Noch nichts davon ist umgesetzt.

## 1. Ziel

Eine App, die sich wie eine echte iPhone-App anfühlt, mit drei Sprachen (Vietnamesisch, Koreanisch, Japanisch), je einem optimalen Anfängerkurs bis Urlaubsniveau, Fortschritts-Tracking pro Sprache und einer Serie über alle Sprachen. Randbedingungen bleiben: kostenlos, offline, kein Login, GitHub Pages, ein Befehl zum Veröffentlichen, möglichst keine Hürden für eine Nutzerin mit wenig Zeit und Motivation.

## 2. Was die Reviews ergeben haben

**Didaktik.** Das Grundgerüst stimmt (Chunks statt Grammatik, Töne zuerst, Fehler-Wiederholung ohne Strafe, Notizen mit Kultur- und Nord/Süd-Hinweisen). Schwächen: Lektionen mit 8–9 Wörtern sind zu lang (bis 28 Übungen), vier Zahlenlektionen am Stück sind ein Motivationsloch, die Anrede (anh/chị/em) fehlt als Lektion, der Übungsmix ist zufällig statt gestuft, der Wiederholungsrückstand wächst systemisch, Hints mischen Nord- und Süd-Aussprache.

**Produkt/UX.** Die App wirkt wie eine sehr gute mobile Webseite, nicht wie eine App: Jeder Screen wird komplett neu gezeichnet, keine Übergänge, keine App-Shell (fester Kopf und Fuß, nur die Mitte scrollt), Emoji-Icons in der Tab-Bar, kein Onboarding, kein Fortschritts-Screen, Sprechübungen sind ohne Erklärung an, der Fortschrittsbalken animiert nie, Abbruch wirft alles weg.

**Architektur.** Der Code ist sauber, aber auf eine Sprache verdrahtet: Felder heißen `vi`/`de`, ein Zustand ohne Sprachschlüssel, keine Migration. Echte Bugs: Fortschritt wird nur am Session-Ende gespeichert (iOS beendet PWAs im Hintergrund), Tonvergleich entfernt auch Vokalzeichen, Mikrofon wird beim Überspringen nicht gestoppt, doppelte Sprachausgabe bei schnellem Tippen, Service Worker kann Mischversionen cachen.

**Vietnamesisch-Inhalte.** Alle 146 Einträge orthografisch korrekt. Zu korrigieren: rund 20 Lautschrift-Hinweise (ư/ơ müssen ü/ö sein, z. B. „mười“ = „mü-öi“, nicht „mu-oi“), eine falsche Erklärung („Không sao“ hat nichts mit „Stern“ zu tun), Süd-Aussprache in Hints obwohl die Stimme Nord spricht, ein paar Multiple-Choice-Kollisionen („Ja“ vs. „Ja (höflich)“, „morgen“ vs. „morgens“), einige unnatürliche Sätze („Đi đến sân bay“ → „Cho tôi đến sân bay“), Euro-Umrechnungen etwas zu hoch. 25 fehlende Urlaubsphrasen, vor allem die Anrede und „Có … không?“.

## 3. Entscheidungen

### Produkt

- **Vier Tabs:** Lernen · Üben · Reise · Profil.
  - Lernen: Pfad der aktiven Sprache, oben links Flaggen-Chip für den Sprachwechsel, rechts Serie und Ziel-Ring, eine „Heute“-Karte mit genau einem großen Knopf.
  - Üben: Wiederholen (fällig), Schnellrunde 2 Minuten, Nur-Hören, Ton-/Hangul-/Kana-Trainer.
  - Reise: Phrasenbuch aller Wörter (auch ungelernte) mit Suche und Situationen, „Groß zeigen“-Modus zum Hinhalten, Zahlen-Helfer, Aussprache-Legende. Ersetzt den Tab „Wörter“.
  - Profil: Streak-Kalender, Wochenbalken, Karten pro Sprache, „Du kannst jetzt …“-Aussagen, Reisefit-Prozent, Einstellungen, Backup.
- **Sprachwechsel** über den Flaggen-Chip, Sheet mit drei Sprachen und Kurzfortschritt. Serie, Tagesziel und Einstellungen sind global, Wortschatz und Lektionen pro Sprache.
- **Onboarding** beim ersten Start, drei Karten: Sprache wählen, Tagesziel (Standard: 1 Session), Stimmen-Check mit Anleitung. Danach direkt in die erste Lektion.
- **App-Gefühl:** App-Shell statt Body-Scroll, SVG-Icons statt Emojis, Statusleiste durchscheinend, fünf sparsame Übergänge (Tab-Cross-Fade, Push von rechts, Session von unten, Sheets hochschieben, Fragenwechsel), animierter Fortschrittsbalken, Feedback-Panel schiebt sich hoch, Wackeln bei Fehlern, hochzählende Zahlen am Session-Ende, Verlauf mit Zurück-Geste, Dark-Mode-Schalter, reduzierte Bewegung respektieren.
- **Motivation:** Session-Länge 3–5 Minuten mit Zeitangabe, Tagesziel in Sessions statt XP, ein automatischer Pausentag pro Woche für die Serie, Teil-Gutschrift bei Abbruch, Meilensteine mit Reise-Nutzen, „Willkommen zurück“-Session nach Pause, Kalender-Erinnerung per .ics, App-Badge mit fälligen Wörtern. Bewusst nicht: Herzen, Ligen, Shop, Schuld-Nachrichten.

### Didaktik

- **5–6 neue Wörter pro Lektion**, Session etwa 20 Übungen. Wiederholungs-Session 10–12 Wörter.
- **Fester Session-Ablauf:** Aufwärmen mit 2 fälligen Wörtern → Block A (3 neue: Intro, dann Erkennen) → Block B → Festigen in zwei Runden (erst Hören/Wählen, dann Kacheln/Lückentext/Nachsprechen, zweiter Abruf frühestens 4 Übungen nach dem ersten) → 3–5 fällige Wörter → Fehlerrunde. Vor der Lektion eine Tipp-Karte mit dem Muster der Lektion.
- **Lektionstyp „Verstehen“:** Sätze, die man nur erkennen muss (was Bedienung, Taxifahrer, Hotel sagen). Nur Hör- und Bedeutungsübungen.
- **Wiederholung:** feste Leiter 1 → 3 → 7 → 14 → 30 Tage statt SM-2. Fehler = zwei Sprossen zurück, nicht auf null. Startseite zeigt nie mehr als 12 fällige, Rückstand wird gedeckelt. Nach 7 Tagen Pause eine sanfte Auffrisch-Session ohne neue Wörter.
- **Stufen:** gesehen → gelernt (an 2 Tagen richtig) → gefestigt (an 4 Tagen richtig, kein Fehler in den letzten 3 Abrufen). Problemwörter ab 5 Fehlern werden markiert und können aus dem Lernen genommen werden.
- **Neue Übungstypen:** Zuordnung (5 Paare), Lückentext, Zeichen sehen → Laut wählen, Laut hören → Zeichen wählen, Silbe bauen (Hangul), Wort aus Zeichen bauen, Preis hören (generiert), später Szenen-Dialoge. Kacheln erst ab 3 Teilen. Kein Tippen in Fremdschrift.
- **Umschrift:** Zwei Ebenen. Standard-Umschrift (Revised Romanization, Hepburn) zum Lesen, verschwindet nach der Schrift-Einheit und ist per Tipp aufdeckbar. Deutscher „Klingt wie“-Hint nur im Intro, beim Nachsprechen und im Fehler-Feedback. Vietnamesisch: Hints konsequent Nord wie die Stimme Linh, Südvarianten in der Notiz, feste Legende (ư = ü, ơ = ö, d/gi/r = z wie in „Rose“, kh = ch wie in „Bach“).

### Kurse

**Vietnamesisch, Umbau:** 7 Einheiten, etwa 30 Lektionen, 185 Einträge. Erste Worte (Töne · Hallo & Danke · Ja, Nein, Bitte · Anrede & Rufen · Verstehen) → Essen & Trinken → Zahlen & Preise → Unterwegs → Einkaufen & Hotel → Smalltalk & Zeit → Notfall & Gesundheit. Zahlen kompakter und näher an den Preisen, Vorstellen nach hinten, Ton-Übungen mit echten Wortpaaren in Einheit 1–3 eingestreut.

**Koreanisch:** 8 Einheiten, etwa 175 Einträge plus 45 Zeichen. Hangul komplett vorne in 5 Lektionen (Grundvokale und -konsonanten, Silbenblock, behaucht/gespannt nur erkennen, Endkonsonanten, Lesen mit echten Wörtern). Nur 해요체 als Muster, 합니다-Formen nur als feste Floskeln. Sino-Zahlen 1–10 plus 백/천/만 für Preise, native Zahlen nur 1–4 mit 개/명/잔/병. Partikeln nicht als Thema. Zeichen nie isoliert vorlesen lassen, immer in Beispielsilben.

**Japanisch:** 8 Einheiten, etwa 175 Einträge plus etwa 100 Kana und 18 Kanji. Hiragana verteilt über die ersten drei Einheiten, jeweils gefolgt von einer Phrasenlektion. Katakana in den Einheiten Essen und Unterwegs, wo es sich auszahlt. Kanji nur 18 Schilder zum Erkennen (円 駅 出口 入口 男 女 押 引 禁煙 …). Nur です/ます. Drei Universalwerkzeuge früh: すみません, お願いします, ください. Kacheln über explizite Segmente, da Japanisch keine Leerzeichen hat.

### Technik

- **ES-Module ohne Build-Tool.** Node 20 und iOS Safari können das nativ; Tests importieren dieselben Dateien wie der Browser. Kein Framework, weiter innerHTML, aber mit drei Regeln: Template-Funktion escaped automatisch, eine Event-Delegation statt Neu-Binden nach jedem Render, Session rendert Frage und Fußbereich getrennt.
- **Struktur:** `src/core` (Store, Migration, SRS, Session-Engine, Antwortprüfung), `src/exercises` (ein Modul pro Übungstyp mit gemeinsamem Vertrag), `src/lang/<code>` (Sprachprofil: TTS-Stimme, Normalisierung, Segmentierung, Plugins für Töne/Hangul/Kana), `src/ui` (Router, Shell, Sheets, Screens), `src/platform` (TTS, Spracherkennung, Sounds, SW-Client), `data/*.js` (reine Inhalte), `styles/app.css`.
- **Datenformat pro Eintrag:** `id`, `text` (Zielschrift), `reading` (nur JA, Kana-Lesung), `roman` (Umschrift), `de`, `hint`, `note`, `tts` (abweichender Sprechtext), `seg` (Kachel-Segmente), `alt` (weitere richtige Antworten), `tags`. Lektionen: `type: 'vocab' | 'script' | 'understand'`, Schrift-Lektionen verweisen auf ein Plugin. Ein Daten-Linter prüft jedes Sprachpaket (IDs, Pflichtfelder, Schriftbereiche, Segment-Invarianten, Verwechselbarkeit der deutschen Bedeutungen).
- **Zustand v2:** `langs.<code>.{items, lessons, sessions, plugins}`, `days` global, `settings` global, `pending` als Snapshot der laufenden Session nach jeder Antwort. Migration von v1, der alte Schlüssel bleibt als Sicherheitsnetz liegen. Speicher bleibt localStorage plus `storage.persist()`. Backup-Erinnerung alle 14 Lerntage.
- **Service Worker:** Precache-Liste wird generiert, kein Laufzeit-Cache mehr, Update-Hinweis „Neue Version bereit“ statt stillem Austausch, nie während einer Session.
- **Tests:** `node --test` mit festem Zufalls-Seed, Daten-Linter für alle Pakete, Engine-Tests für jede Lektion, Antwortprüfungs-Tabellen pro Sprache, Migrationstest mit echtem v1-Backup, Headless-Chrome-Klickdurchlauf pro Sprache. `deploy.sh`: Tests → Asset-Liste → Versionsbump → Commit → Push, Abbruch vor jeder Änderung bei rotem Test.
- **Bugfixes im ersten Schritt:** Tonvergleich, Mikrofon-Abbruch, TTS-Sequenz, Speicherfehler als Hinweis, Hörübungen ohne Stimme automatisch ersetzen, Statusleiste, Kontraste, `lang`-Attribute.

## 4. Phasen

Jede Phase wird einzeln veröffentlicht, die App bleibt dazwischen benutzbar, der Vietnamesisch-Fortschritt bleibt erhalten. „Session“ = eine Arbeitssitzung von Claude mit Tests und Deploy.

| Phase | Inhalt | Was du danach merkst | Aufwand |
|---|---|---|---|
| 1 Fundament | Bugfixes, Test-Infrastruktur, ES-Module, Zustand v2 mit Migration und Session-Snapshot, Auto-Escape, Router mit Verlauf, Sprachprofile, Übungs-Registry, Ton-Trainer als Plugin | Sessions überleben Abbruch und App-Wechsel, Zurück-Geste funktioniert, sonst gleich | 3 Sessions |
| 2 Vietnamesisch-Kurs | Inhalte nach Audit korrigiert, Lektionen auf 5–6 Wörter, Anrede- und Verstehen-Lektionen, 40 neue Phrasen, fester Session-Ablauf, Tipp-Karten, Wiederholungs-Leiter, Kacheln ab 3 Teilen, Zuordnung und Lückentext | Kürzere, besser gestufte Lektionen; korrekte Lautschrift; weniger Rückstau | 2 Sessions |
| 3 App-Gefühl | App-Shell, 4 Tabs mit SVG-Icons, Sprachwechsel-Sheet, Onboarding, Übergänge, animierter Balken, Feedback-Animationen, Session-Ende mit Zahlen und Meilensteinen, Streak-Pausentag, Teil-Gutschrift, Dark-Mode-Schalter | Der große Sprung zu „echte App“ | 2 Sessions |
| 4 Koreanisch | Hangul-Daten und -Plugin mit drei Zeichen-Übungen, Sprachprofil, Kurs mit 8 Einheiten | Zweite Sprache wählbar, Hangul in einer Woche lesbar | 3 Sessions |
| 5 Japanisch | Kana-Daten und -Plugin, Segmentierung, Sprachprofil mit Kana-Normalisierung, Kurs mit 8 Einheiten, Kanji-Schilder | Dritte Sprache | 3 Sessions |
| 6 Üben & Reise | Üben-Tab mit Schnellrunde und Trainern, Reise-Tab mit Phrasenbuch, Suche, Groß-zeigen, Zahlen-Helfer, Preis-hören-Übung, Aussprache-Legenden mit Anhören | Die App, die man im Urlaub tatsächlich öffnet | 2 Sessions |
| 7 Profil & Polish | Streak-Kalender, Wochenbalken, Karten pro Sprache, Können-Aussagen, Reisefit, Kalender-Erinnerung, App-Badge, Update-Hinweis, Willkommen-zurück-Session, Szenen-Dialoge | Fortschritt sichtbar, Erinnerung, Dialoge | 2 Sessions |

Gesamt etwa 17 Sessions. Reihenfolge: Fundament zuerst, weil jede Sprache sonst gegen das alte Schema gebaut und später nochmal angefasst werden müsste. Der Vietnamesisch-Kurs vor dem App-Gefühl, weil die Inhalte täglich benutzt werden und die Korrekturen klein, aber wirksam sind. Koreanisch vor Japanisch, weil Hangul der schnellste Erfolg ist und Kana-Plugin und Segmentierung auf dem Hangul-Plugin aufbauen.

## 5. Offene Entscheidungen

1. Reihenfolge der Sprachen: Koreanisch vor Japanisch (Empfehlung) oder umgekehrt?
2. Tabs Lernen · Üben · Reise · Profil so in Ordnung?
3. Umbau des Vietnamesisch-Kurses: Lektionen werden neu zugeschnitten. Gelernte Wörter und die Serie bleiben, aber einzelne Lektionen erscheinen im Pfad wieder als offen. In Ordnung?
4. Reisedatum als Einstellung (Countdown, Auffrischen vor Abreise, Reise-Modus mit pausierter Serie): einbauen oder weglassen?
5. Beispielsatz „Tôi tên là Hannah“ behalten oder neutral machen?

## 6. Bewusst nicht gebaut

Login und Cloud-Sync, Push-Benachrichtigungen mit Server, Herzen/Ligen/Shop, Freitext-Tippen in Hangul/Kana, Strichfolgen-Schreiben, Grammatik-Erklärseiten über die Tipp-Karten hinaus, Build-Tool oder Framework, KI-Gesprächsmodus in der App (geht direkt mit Claude im Chat).
