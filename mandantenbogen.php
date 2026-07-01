<?php
/* ============================================================
   Fiedler & Rieß – Mandantenbogen · Verarbeitung
   ============================================================ */

// Auf dem Server liegen vendor/ und smtp_config.php in private/ (außerhalb Web-Root)
$_private = is_dir('/opt/fiedler-riess/private') ? '/opt/fiedler-riess/private' : __DIR__;
require_once $_private . '/vendor/autoload.php';
require_once $_private . '/smtp_config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

/* ---- KONFIGURATION ---- */
$EMPFAENGER    = 's.riess@fiedler-riess.de';
$KOPIE_AN      = 'v.leister@fiedler-riess.de';

$SPEICHERN     = true;
$VERSAND       = true;
$_data = is_dir('/opt/fiedler-riess/eingaenge') ? '/opt/fiedler-riess/eingaenge' : __DIR__ . '/eingaenge';
$ABLAGE_ORDNER = $_data . '/mandanten';
/* ----------------------- */

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
    $data = $_POST;
}
if (!is_array($data) || count($data) === 0) {
    fail('Es wurden keine Daten empfangen.');
}

function val($data, $key) {
    return isset($data[$key]) ? trim((string)$data[$key]) : '';
}
function jn($data, $key) {
    if (!isset($data[$key])) return '';
    $v = $data[$key];
    if ($v === true) return 'Ja';
    if ($v === false) return 'Nein';
    return trim((string)$v);
}
function clean_header($s) {
    return trim(str_replace(array("\r", "\n", "%0a", "%0d"), '', $s));
}
/* Eingang als Datei ablegen (lesbares .txt + maschinenlesbares .json). Gibt true bei Erfolg. */
function speichern($ordner, $name, $body, $data) {
    if (!is_dir($ordner) && !@mkdir($ordner, 0700, true)) return false;
    $ht = dirname($ordner) . '/.htaccess';
    if (!file_exists($ht)) @file_put_contents($ht, "Require all denied\nDeny from all\n");
    $stamp = date('Y-m-d_His');
    // Umlaute + Sonderzeichen im Dateinamen behalten, nur Slashes etc. entfernen
    $safe = preg_replace('/[\/\\\\:*?"<>|]+/', '-', $name);
    $safe = preg_replace('/-+/', '-', trim($safe, '-'));
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
$datenStr   = !empty($data['datenStr']);
$datenschutz = !empty($data['datenschutz']);

$fehler = array();
if ($name === '')    $fehler[] = 'Name';
if ($strasse === '') $fehler[] = 'Straße/Hausnummer';
if ($plz === '' || $ort === '') $fehler[] = 'PLZ/Ort';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $fehler[] = 'gültige E-Mail';
if ($iban === '' || !preg_match('/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/', $iban)) $fehler[] = 'gültige IBAN';
if (!$datenStr) $fehler[] = 'Einwilligung Datenspeicherung';
if (!$datenschutz) $fehler[] = 'Einwilligung Datenschutz';

if (count($fehler) > 0) {
    fail('Bitte prüfen Sie folgende Felder: ' . implode(', ', $fehler) . '.', 422);
}

/* ---- Felder + Beschriftungen (Reihenfolge wie im Formular) ---- */
$text  = array('name','strasse','plz','ort','email','telefon','bank','iban',
               'rsvName','rsvSchein','rsvNehmer','rsvSchaden','selbstbeteiligungBetrag','inSachen','wegen');
$janein = array('vorsteuer','rsv','selbstbeteiligung','datenStr','emailConsent','sofortLeistung','datenschutz');

$gruppen = array(
    'Stammdaten' => array(
        'name' => 'Name', 'strasse' => 'Straße/Hausnr.', 'plz' => 'PLZ', 'ort' => 'Ort',
        'email' => 'E-Mail', 'telefon' => 'Telefon', 'vorsteuer' => 'Vorsteuerabzugsberechtigt',
    ),
    'Bankverbindung' => array(
        'bank' => 'Bank', 'iban' => 'IBAN',
    ),
    'Rechtsschutzversicherung' => array(
        'rsv' => 'Vorhanden', 'rsvName' => 'Name der RSV', 'rsvSchein' => 'Versicherungsschein-Nr.',
        'rsvNehmer' => 'Versicherungsnehmer', 'rsvSchaden' => 'Schaden-Nr.',
        'selbstbeteiligung' => 'Selbstbeteiligung', 'selbstbeteiligungBetrag' => 'Höhe Selbstbeteiligung',
    ),
    'Angaben zum Mandat' => array(
        'inSachen' => 'In Sachen', 'wegen' => 'Wegen',
    ),
    'Erklärungen und Einwilligungen' => array(
        'datenStr' => 'Speicherung der Daten gem. Hinweisen',
        'emailConsent' => 'Unverschlüsselte E-Mail-/Fax-Kommunikation gewünscht',
        'sofortLeistung' => 'Sofortiger Leistungsbeginn (Verzicht Widerruf)',
        'datenschutz' => 'Datenschutzerklärung akzeptiert',
    ),
);

/* ---- Textkörper bauen ---- */
$body  = "Neuer Mandantenbogen\n";
$body .= "Eingegangen am " . date('d.m.Y \u\m H:i') . " Uhr\n";
$body .= str_repeat('=', 48) . "\n";
foreach ($gruppen as $titel => $felder) {
    $zeilen = array();
    foreach ($felder as $key => $label) {
        $v = in_array($key, $janein, true) ? jn($data, $key) : val($data, $key);
        if ($v !== '') $zeilen[] = $label . ': ' . $v;
    }
    if (count($zeilen) > 0) {
        $body .= "\n" . $titel . "\n" . str_repeat('-', strlen($titel)) . "\n";
        $body .= implode("\n", $zeilen) . "\n";
    }
}
$body .= "\n" . str_repeat('=', 48) . "\n";
$body .= "Diese Nachricht wurde über das Online-Formular auf der Website erzeugt.\n";

$betreff = 'Mandantenbogen – ' . $name;

/* ---- 1) Eingang auf dem Server ablegen ---- */
$gespeichert = false;
if ($SPEICHERN) {
    $gespeichert = speichern($ABLAGE_ORDNER, $name, $body, $data);
    if (!$gespeichert) {
        fail('Der Mandantenbogen konnte auf dem Server nicht gespeichert werden. Bitte kontaktieren Sie uns direkt.', 500);
    }
}

/* ---- 2) Per E-Mail via SMTP senden ---- */
$gemailt = false;
if ($VERSAND) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Port 465
        $mail->Port       = SMTP_PORT;
        $mail->CharSet    = 'UTF-8';

        $mail->setFrom(SMTP_FROM, SMTP_FROM_NAME);
        $mail->addAddress($EMPFAENGER);
        if ($KOPIE_AN !== '') $mail->addCC($KOPIE_AN);
        $mail->addReplyTo($email, $name);

        $mail->Subject = $betreff;
        $mail->Body    = $body;
        $mail->isHTML(false);

        $mail->send();
        $gemailt = true;
    } catch (Exception $e) {
        error_log('PHPMailer: ' . $mail->ErrorInfo);
    }
}

if ($gespeichert || $gemailt) {
    echo json_encode(array('ok' => true));
} else {
    fail('Der Mandantenbogen konnte nicht verarbeitet werden. Bitte kontaktieren Sie uns direkt per E-Mail.', 500);
}
