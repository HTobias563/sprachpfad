# Sprachpfad

Eigene Lern-App für Urlaubssprachen, gebaut wie Duolingo: Lernpfad, kurze Sessions, Wiederholung nach fester Leiter (1, 3, 7, 14, 30 Tage), Serie. Läuft als Web-App auf dem Handy, komplett offline, ohne Account, ohne Build-Tool.

Aktuell: Vietnamesisch (146 Wörter und Sätze in 19 Lektionen, Ton-Trainer). Koreanisch und Japanisch folgen, siehe [docs/PLAN.md](docs/PLAN.md).

## Benutzen

1. https://htobias563.github.io/sprachpfad/ auf dem Handy in Safari öffnen.
2. Teilen-Symbol, dann „Zum Home-Bildschirm“.
3. Ab dann vom Homescreen starten. Der Fortschritt bleibt auf dem Gerät, Sessions überleben Abbruch und App-Wechsel.

Sprachausgabe nutzt die Systemstimme (iPhone: Einstellungen › Bedienungshilfen › Gesprochene Inhalte › Stimmen). Die Sprechübungen brauchen Internet, alles andere geht offline. Bei einer neuen Version zeigt die Startseite „Neue Version bereit“.

## Aufbau

- `index.html`, `styles/app.css` – Hülle und Design
- `src/main.js` – Einstieg, Ereignisse, Kontext
- `src/core/` – Zustand und Migration (`store.js`, `migrations.js`), Wiederholung (`srs.js`), Serie/XP (`progress.js`), Session-Engine (`session.js`), Session-Aufbau (`builders.js`), Textwerkzeuge (`text.js`)
- `src/exercises/` – ein Modul pro Übungstyp mit gemeinsamem Vertrag (make, render, ready, actions, check, regen, autoSpeak, feedback)
- `src/lang/` – Sprachprofile (Stimme, Normalisierung, Segmente, Sprechvergleich) und Plugins wie der Ton-Trainer
- `src/ui/` – Template-Funktion mit Auto-Escaping, Router mit Verlauf, Sheets, Toasts, Screens
- `src/platform/` – Sprachausgabe, Spracherkennung, Töne, Service-Worker-Client
- `data/vi.js` – Inhalte Vietnamesisch (reine Daten)
- `sw.js` – Offline-Cache, Dateiliste wird von `tools/sw-assets.js` erzeugt
- `test/` – Node-Tests (`npm test`) und Chrome-Klicktest (`sh test/ui.sh`)

## Ändern und veröffentlichen

Inhalte in `data/vi.js` anpassen, dann:

```
./deploy.sh "Was sich geändert hat"
```

Das Skript lässt die Tests laufen, erzeugt die Precache-Liste, erhöht die Cache-Version, committet und pusht. GitHub Pages baut die Seite in etwa einer Minute neu. Mit `UI=1 ./deploy.sh ...` läuft zusätzlich der Klicktest in Headless Chrome.
