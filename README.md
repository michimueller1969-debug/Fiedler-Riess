# Fiedler & Rieß – Website (Deploy-Paket)

Statische Website, fertig zum Hochladen auf einen Webserver.
Responsiv – optimiert für Desktop, Tablet und Smartphone (Hamburger-Menü unter 760px).

## Inhalt
```
website-dist/
├── index.html        ← Einstiegsseite
├── css/
│   └── styles.css     ← komplettes Stylesheet (Tokens, Komponenten, Basis)
├── js/
│   └── app.jsx        ← gesamte Seitenlogik (React)
├── img/               ← Bilder (Hero, Anwaltsfotos, DVH-Logo)
└── fonts/             ← Open Sans (woff2)
```

## Veröffentlichen
Den **gesamten Ordner `website-dist/`** per FTP/SFTP in das Web-Verzeichnis
des Servers kopieren (z. B. `/var/www/html/` oder `htdocs/`). Die Seite läuft
dann unter der Domain. Es ist **kein Build-Schritt** nötig.

> Wichtig: Die Seite muss über **http(s)** ausgeliefert werden (also über einen
> Webserver), nicht per Doppelklick als `file://` geöffnet werden – sonst kann
> der Browser `js/app.jsx` aus Sicherheitsgründen nicht laden.

## Hinweis zu React/Babel
`index.html` lädt React und den Babel-Transformer aktuell vom CDN (unpkg.com).
Das funktioniert auf jedem Server mit Internetzugang sofort.

Für einen **vollständig internen Betrieb ohne externe Abhängigkeiten** können die
drei Bibliotheken lokal abgelegt werden:
1. `react.production.min.js`, `react-dom.production.min.js` und `babel.min.js`
   herunterladen und z. B. unter `js/vendor/` ablegen.
2. In `index.html` die drei `src="https://unpkg.com/..."`-Pfade auf die lokalen
   Dateien umstellen.

Für höhere Performance kann `app.jsx` zusätzlich vorab kompiliert werden, sodass
der Babel-Transformer im Browser entfällt – für den normalen Betrieb ist das
aber nicht erforderlich.
