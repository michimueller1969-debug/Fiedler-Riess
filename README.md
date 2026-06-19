# Fiedler & Rieß – Website (Deploy-Paket)

Statische Website, fertig zum Hochladen auf einen Webserver.
Responsiv – optimiert für Desktop, Tablet und Smartphone (Hamburger-Menü unter 760px).
**Keine externen Aufrufe** (kein Google, kein CDN) – datenschutzfreundlich.

## Inhalt
```
website-dist/
├── index.html                  ← Einstiegsseite
├── unfallfragebogen.html       ← Online-Fragebogen zum Verkehrsunfall
├── unfallfragebogen.php        ← Verarbeitung des Unfall-Fragebogens (PHP)
├── fahrverbotfragebogen.html   ← Online-Fragebogen „Absehen von Fahrverbot“
├── fahrverbotfragebogen.php    ← Verarbeitung des Fahrverbot-Fragebogens (PHP)
├── mandantenbogen.html         ← Online-Mandantenbogen (Datenerfassung)
├── mandantenbogen.php          ← Verarbeitung des Mandantenbogens (PHP)
├── css/
│   └── styles.css     ← komplettes Stylesheet (Tokens, Komponenten, Basis)
├── js/
│   ├── app.js                       ← gesamte Seitenlogik, fertig kompiliert (wird geladen)
│   ├── app.jsx                      ← Quellcode dazu (nur zur Pflege, wird NICHT geladen)
│   ├── unfallfragebogen.js          ← Formularlogik, fertig kompiliert (wird geladen)
│   ├── unfallfragebogen.jsx         ← Quellcode dazu (nur zur Pflege)
│   ├── fahrverbotfragebogen.js      ← Formularlogik, fertig kompiliert (wird geladen)
│   ├── fahrverbotfragebogen.jsx     ← Quellcode dazu (nur zur Pflege)
│   ├── mandantenbogen.js            ← Formularlogik, fertig kompiliert (wird geladen)
│   ├── mandantenbogen.jsx           ← Quellcode dazu (nur zur Pflege)
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

## Online-Fragebögen + E-Mail-Versand
Die Seiten `unfallfragebogen.html`, `fahrverbotfragebogen.html` und
`mandantenbogen.html` ersetzen die bisherigen PDF-Downloads durch ausfüllbare
Online-Formulare. Die Buttons auf den Fragebogen-/Mandatsseiten führen dorthin.
Pflichtfelder sind jeweils **Name, Anschrift, E-Mail und IBAN** (IBAN wird auf
Gültigkeit geprüft); der Mandantenbogen verlangt zusätzlich die Einwilligung zur
Datenspeicherung.

Beim Absenden schicken die Formulare die Angaben an das jeweilige PHP-Skript
(**`unfallfragebogen.php`** / **`fahrverbotfragebogen.php`** /
**`mandantenbogen.php`**), das eine E-Mail an die Kanzlei sendet:

- **Empfänger:** `s.riess@fiedler-riess.de`
- **Reply-To:** die E-Mail-Adresse des Mandanten (direkt antwortbar)
- Es werden **keine Drittanbieter** genutzt – der Versand läuft über den eigenen
  Server (datenschutzfreundlich).

**Voraussetzung:** Das Hosting muss **PHP** unterstützen und `mail()` erlauben
(bei klassischem Webhosting wie IONOS, Strato, All-Inkl. üblich). Oben in den
`*.php`-Skripten lassen sich Empfänger, technische Absenderadresse
(`$ABSENDER` – sollte zur Domain gehören, damit die Mail nicht im Spam landet)
und eine optionale Kopie-Adresse einstellen.

> Falls kein PHP/`mail()` verfügbar ist, zeigt das Formular automatisch einen
> Fallback: einen Link, der die Angaben in einer vorausgefüllten E-Mail im
> Mail-Programm des Absenders öffnet. Bei Bedarf bauen wir auch eine andere
> Versandlösung (z. B. SMTP) ein.

## Alternative: Eingänge auf dem Server ablegen (statt/zusätzlich zur E-Mail)
Die PHP-Skripte können jeden abgesendeten Fragebogen **als Datei auf dem Server
speichern** – das ist auf einem selbst verwalteten Server oft zuverlässiger als
E-Mail (kein Mailserver nötig). Oben in den `*.php`-Skripten steuern zwei Schalter
das Verhalten:

```php
$SPEICHERN = true;   // Eingänge als Datei ablegen
$VERSAND   = true;   // zusätzlich per E-Mail senden  (false = NUR ablegen)
```

- **Nur ablegen:** `$VERSAND = false` setzen.
- **Nur mailen:** `$SPEICHERN = false` setzen.
- **Beides:** beide auf `true` (Standard) – die Bestätigung erscheint bereits,
  sobald der Eingang gesichert ist.

Abgelegt wird im Ordner **`eingaenge/`** (Unterordner `unfall/`, `fahrverbot/`
bzw. `mandanten/`), je Eingang eine gut lesbare `.txt`- und eine maschinenlesbare
`.json`-Datei mit Zeitstempel und Namen im Dateinamen. **Abruf per FTP/SFTP.**

> **Wichtig – Datenschutz:** `eingaenge/` enthält personenbezogene Daten (inkl.
> IBAN) und darf **nicht öffentlich abrufbar** sein. Die mitgelieferte
> `eingaenge/.htaccess` sperrt den Zugriff auf **Apache**. Bei **nginx** greift
> `.htaccess` nicht – dort serverseitig sperren
> (`location ^~ /eingaenge/ { deny all; }`). Bitte nach dem Hochladen prüfen,
> dass `https://IHRE-DOMAIN/eingaenge/unfall/` im Browser **403/Forbidden**
> liefert. Details siehe `eingaenge/HINWEIS.txt`.

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
