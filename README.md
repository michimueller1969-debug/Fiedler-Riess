# Fiedler & Rieß – Website (Deploy-Paket)

Statische Website, fertig zum Hochladen auf einen Webserver.
Responsiv – optimiert für Desktop, Tablet und Smartphone (Hamburger-Menü unter 760px).
**Keine externen Aufrufe** (kein Google, kein CDN) – datenschutzfreundlich.

## Inhalt
```
website-dist/
├── index.html        ← Einstiegsseite
├── css/
│   └── styles.css     ← komplettes Stylesheet (Tokens, Komponenten, Basis)
├── js/
│   ├── app.js         ← gesamte Seitenlogik, fertig kompiliert (wird geladen)
│   ├── app.jsx        ← Quellcode dazu (nur zur Pflege, wird NICHT geladen)
│   └── vendor/
│       ├── react.production.min.js       ← React, lokal
│       └── react-dom.production.min.js    ← ReactDOM, lokal
├── img/               ← Bilder (Hero, Anwaltsfotos, DVH-Logo)
└── fonts/             ← Open Sans (woff2) + LICENSE.txt (SIL OFL 1.1)
```

## Veröffentlichen
Den **gesamten Ordner `website-dist/`** per FTP/SFTP in das Web-Verzeichnis
des Servers kopieren (z. B. `/var/www/html/` oder `htdocs/`). Die Seite läuft
dann unter der Domain. Es ist **kein Build-Schritt** nötig.

> Wichtig: Die Seite muss über **http(s)** ausgeliefert werden (also über einen
> Webserver), nicht per Doppelklick als `file://` geöffnet werden – sonst können
> die `js/`-Dateien aus Sicherheitsgründen nicht geladen werden.

## Datenschutz / Urheberrecht
- **Schrift:** Open Sans wird lokal aus `fonts/` geladen (kein Google-Fonts-Server).
  Lizenz: SIL Open Font License 1.1 – siehe `fonts/LICENSE.txt`. Kommerzielle
  Nutzung, Selbst-Hosting und Einbetten sind ausdrücklich erlaubt.
- **React:** wird lokal aus `js/vendor/` geladen (kein CDN). React steht unter der
  MIT-Lizenz (frei für kommerzielle Nutzung).
- Beim Aufruf der Seite werden somit **keine Daten an Dritte (Google, unpkg, …)**
  übertragen. (Externe Links wie LinkedIn oder die jupus-Fragebögen öffnen
  natürlich erst nach Klick die jeweilige fremde Seite.)

## Code ändern
`js/app.jsx` ist der lesbare Quellcode. Wird er geändert, muss er neu zu
`js/app.js` kompiliert werden (das ist die Datei, die der Browser lädt).
Sagen Sie uns einfach Bescheid – wir liefern das aktualisierte Paket.
