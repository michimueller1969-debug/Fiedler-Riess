<?php
/* ============================================================
   Fiedler & Rieß – Verkehrsunfall-Fragebogen · Mailversand
   ------------------------------------------------------------
   Nimmt die Formulardaten (JSON) entgegen, prüft die Pflichtfelder
   und sendet den ausgefüllten Fragebogen per E-Mail an die Kanzlei.
   Läuft auf jedem PHP-fähigen Webhosting (PHP 7+). Es werden KEINE
   Drittanbieter genutzt – der Versand erfolgt über den eigenen Server.
   ============================================================ */

/* ---- KONFIGURATION (bei Bedarf anpassen) ---- */
$EMPFAENGER  = 's.riess@fiedler-riess.de';                 // Wohin der Fragebogen geht
$ABSENDER    = 'website@fiedler-riess.de';                 // Technische Absenderadresse (Domain des Servers!)
$ABSENDER_NAME = 'Unfallfragebogen Website';
$KOPIE_AN    = '';                                         // optional: zweite Adresse (CC), sonst leer lassen

$SPEICHERN   = true;                                       // Eingänge als Datei auf dem Server ablegen
$VERSAND     = true;                                       // zusätzlich per E-Mail senden? (false = NUR ablegen)
$ABLAGE_ORDNER = __DIR__ . '/eingaenge/unfall';            // Ablageordner (muss vor Web-Zugriff geschützt sein!)
/* --------------------------------------------- */

header('Content-Type: application/json; charset=utf-8');

function fail($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(array('ok' => false, 'error' => $msg));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail('Ungültige Anfrage.', 405);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    // Fallback: klassisch formularkodiert
    $data = $_POST;
}
if (!is_array($data) || count($data) === 0) {
    fail('Es wurden keine Daten empfangen.');
}

/* Einzelnen Wert sauber als Text holen */
function val($data, $key) {
    return isset($data[$key]) ? trim((string)$data[$key]) : '';
}
/* Schutz vor Header-Injection in Kopfzeilen-Feldern */
function clean_header($s) {
    return trim(str_replace(array("\r", "\n", "%0a", "%0d"), '', $s));
}
/* Eingang als Datei ablegen (lesbares .txt + maschinenlesbares .json). Gibt true bei Erfolg. */
function speichern($ordner, $name, $body, $data) {
    if (!is_dir($ordner) && !@mkdir($ordner, 0700, true)) return false;
    // Ordner vor Web-Zugriff schützen (Apache) – greift auch für Unterordner
    $ht = dirname($ordner) . '/.htaccess';
    if (!file_exists($ht)) @file_put_contents($ht, "Require all denied\nDeny from all\n");
    $stamp = date('Y-m-d_His');
    $safe = preg_replace('/[^A-Za-z0-9._-]+/', '-', $name);
    if ($safe === '') $safe = 'eingang';
    $basis = $ordner . '/' . $stamp . '_' . substr($safe, 0, 40) . '_' . substr(uniqid(), -5);
    $okTxt  = @file_put_contents($basis . '.txt', $body) !== false;
    $okJson = @file_put_contents($basis . '.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false;
    return $okTxt || $okJson;
}

/* ---- Pflichtfelder serverseitig prüfen ---- */
$name    = val($data, 'name');
$strasse = val($data, 'strasse');
$plz     = val($data, 'plz');
$ort     = val($data, 'ort');
$email   = val($data, 'email');
$iban    = strtoupper(preg_replace('/\s+/', '', val($data, 'iban')));
$consent = !empty($data['datenschutz']);

$fehler = array();
if ($name === '')    $fehler[] = 'Name';
if ($strasse === '') $fehler[] = 'Straße/Hausnummer';
if ($plz === '' || $ort === '') $fehler[] = 'PLZ/Ort';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $fehler[] = 'gültige E-Mail';
if ($iban === '' || !preg_match('/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/', $iban)) $fehler[] = 'gültige IBAN';
if (!$consent) $fehler[] = 'Einwilligung Datenschutz';

if (count($fehler) > 0) {
    fail('Bitte prüfen Sie folgende Felder: ' . implode(', ', $fehler) . '.', 422);
}

/* ---- Felder + Beschriftungen (Reihenfolge wie im Formular) ---- */
$gruppen = array(
    'Ihre Angaben' => array(
        'name' => 'Name', 'strasse' => 'Straße/Hausnr.', 'plz' => 'PLZ', 'ort' => 'Ort',
        'email' => 'E-Mail', 'telefon' => 'Telefon', 'iban' => 'IBAN',
    ),
    'I. Eigenes Fahrzeug' => array(
        'eigentuemer' => 'Eigentümer', 'leasing' => 'Leasingfahrzeug', 'leasingDetail' => 'Leasing-Details',
        'finanziert' => 'Finanziert', 'finanziertDetail' => 'Finanzierung-Details', 'fahrer' => 'Fahrer zum Unfallzeitpunkt',
        'scheckheft' => 'Scheckheftgepflegt', 'vollkasko' => 'Vollkasko', 'vollkaskoDetail' => 'Vollkasko-Details',
        'begutachtet' => 'Begutachtet', 'begutachtetDetail' => 'Sachverständigenbüro',
    ),
    'II. Unfallgegner' => array(
        'gKennzeichen' => 'Kennzeichen', 'gFahrer' => 'Name/Anschrift Fahrer',
        'gVersicherung' => 'Haftpflichtversicherung', 'gVssNr' => 'VSS-/Schadennr.',
    ),
    'III. Unfall' => array(
        'uOrt' => 'Unfallort', 'uDatum' => 'Unfalltag', 'uZeit' => 'Uhrzeit', 'zeugen' => 'Zeugen',
        'polizei' => 'Polizei aufgenommen', 'polizeiDetail' => 'Dienststelle/Az.', 'schilderung' => 'Unfallschilderung',
    ),
    'IV. Personenschäden' => array(
        'personenschaden' => 'Person verletzt', 'psName' => 'Name/Anschrift Verletzte/r', 'psKontakt' => 'Kontakt',
        'psGeburt' => 'Geburtsdatum', 'khAufenthalt' => 'Krankenhausaufenthalt', 'khVon' => 'von', 'khBis' => 'bis',
        'khAnschrift' => 'Krankenhaus-Anschrift', 'psArzt' => 'Ärzte/Therapeuten', 'wegeunfall' => 'Wegeunfall',
    ),
);

/* ---- Textkörper bauen (nur ausgefüllte Felder) ---- */
$body  = "Neuer Verkehrsunfall-Fragebogen\n";
$body .= "Eingegangen am " . date('d.m.Y \u\m H:i') . " Uhr\n";
$body .= str_repeat('=', 48) . "\n";
foreach ($gruppen as $titel => $felder) {
    $zeilen = array();
    foreach ($felder as $key => $label) {
        $v = val($data, $key);
        if ($v !== '') $zeilen[] = $label . ': ' . $v;
    }
    if (count($zeilen) > 0) {
        $body .= "\n" . $titel . "\n" . str_repeat('-', strlen($titel)) . "\n";
        $body .= implode("\n", $zeilen) . "\n";
    }
}
$body .= "\n" . str_repeat('=', 48) . "\n";
$body .= "Diese Nachricht wurde über das Online-Formular auf der Website erzeugt.\n";

/* ---- Kopfzeilen ---- */
$betreff = 'Unfallfragebogen – ' . $name;
$von     = clean_header($ABSENDER_NAME) . ' <' . clean_header($ABSENDER) . '>';
$antwort = clean_header($name) . ' <' . clean_header($email) . '>';

$headers  = 'From: ' . $von . "\r\n";
$headers .= 'Reply-To: ' . $antwort . "\r\n";
if ($KOPIE_AN !== '') $headers .= 'Cc: ' . clean_header($KOPIE_AN) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

$betreff_enc = '=?UTF-8?B?' . base64_encode($betreff) . '?=';

/* ---- 1) Eingang auf dem Server ablegen ---- */
$gespeichert = false;
if ($SPEICHERN) {
    $gespeichert = speichern($ABLAGE_ORDNER, $name, $body, $data);
    if (!$gespeichert) {
        fail('Der Fragebogen konnte auf dem Server nicht gespeichert werden. Bitte kontaktieren Sie uns direkt.', 500);
    }
}

/* ---- 2) Optional zusätzlich per E-Mail senden ("best effort") ---- */
$gemailt = false;
if ($VERSAND) {
    $gemailt = @mail($EMPFAENGER, $betreff_enc, $body, $headers);
}

/* Erfolg, sobald die Daten gesichert sind (abgelegt ODER gemailt). */
if ($gespeichert || $gemailt) {
    echo json_encode(array('ok' => true));
} else {
    fail('Der Fragebogen konnte nicht verarbeitet werden. Bitte kontaktieren Sie uns direkt per E-Mail.', 500);
}
