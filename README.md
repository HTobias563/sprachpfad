# Sprachpfad

Eigene Lern-App für Urlaubssprachen, gebaut wie Duolingo: Lernpfad, kurze Sessions, Wiederholung nach Spaced Repetition, Streak. Läuft als Web-App auf dem Handy, komplett offline, ohne Account.

Aktuell: Vietnamesisch (146 Wörter und Sätze in 19 Lektionen, Ton-Trainer).

## Benutzen

1. Link auf dem Handy in Safari öffnen.
2. Teilen-Symbol, dann „Zum Home-Bildschirm“.
3. Ab dann vom Homescreen starten. Der Fortschritt bleibt auf dem Gerät.

Sprachausgabe nutzt die Systemstimme (iPhone: Einstellungen › Bedienungshilfen › Gesprochene Inhalte › Stimmen › Vietnamesisch › Linh laden). Die Sprechübungen brauchen Internet, alles andere geht offline.

## Aufbau

- `index.html` – Layout und Design
- `app.js` – Lernpfad, Übungen, Spaced Repetition, Streak, Backup
- `data/vi.js` – Inhalte Vietnamesisch
- `sw.js` – Offline-Cache
- `test/test.js` – Logik-Tests (`node test/test.js`)
- `test/ui.html` – Klick-Test durch eine ganze Session im Browser

## Ändern und veröffentlichen

Inhalte in `data/vi.js` anpassen, dann:

```
./deploy.sh "Was sich geändert hat"
```

Das Skript erhöht die Cache-Version, committet und pusht. GitHub Pages baut die Seite in etwa einer Minute neu. Auf dem Handy die App einmal schließen und wieder öffnen.
