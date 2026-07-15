function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Seiten-Chrome (Header, Navigation, Hero, Footer) liefert js/site-chrome.js → window.SiteChrome */

/* ---- Versand-Konfiguration ---- */
const RECIPIENT = 's.riess@fiedler-riess.de'; // Empfänger der Fragebögen
const ENDPOINT = 'unfallfragebogen.php'; // serverseitiger Mailversand (PHP)

/* Feldgruppen + Beschriftungen für die E-Mail-Zusammenfassung (Fallback per mailto) */
const FIELD_GROUPS = [['Ihre Angaben', [['name', 'Name'], ['strasse', 'Straße/Hausnr.'], ['plz', 'PLZ'], ['ort', 'Ort'], ['email', 'E-Mail'], ['telefon', 'Telefon'], ['vorsteuer', 'Vorsteuerabzugsberechtigt'], ['bank', 'Bank'], ['iban', 'IBAN']]], ['I. Eigenes Fahrzeug', [['eigentuemer', 'Eigentümer'], ['fahrzeugart', 'Art des Fahrzeugs'], ['fahrzeugartDetail', 'Art (Sonstiges)'], ['kennzeichen', 'Kennzeichen'], ['leasing', 'Leasingfahrzeug'], ['leasingDetail', 'Leasing-Details'], ['finanziert', 'Finanziert'], ['finanziertDetail', 'Finanzierung-Details'], ['fahrer', 'Fahrer zum Unfallzeitpunkt'], ['scheckheft', 'Scheckheftgepflegt'], ['vollkasko', 'Vollkasko'], ['vollkaskoDetail', 'Vollkasko-Details'], ['begutachtet', 'Begutachtet'], ['begutachtetDetail', 'Sachverständigenbüro'], ['fahrbereit', 'Fahrbereit/verkehrssicher']]], ['II. Unfallgegner', [['gKennzeichen', 'Kennzeichen'], ['gFahrer', 'Name/Anschrift Fahrer'], ['gVersicherung', 'Haftpflichtversicherung'], ['gVssNr', 'VSS-/Schadennr.']]], ['III. Unfall', [['uOrt', 'Unfallort'], ['uDatum', 'Unfalltag'], ['uZeit', 'Uhrzeit'], ['zeugen', 'Zeugen'], ['polizei', 'Polizei aufgenommen'], ['polizeiDetail', 'Dienststelle/Az.'], ['schilderung', 'Unfallschilderung']]], ['IV. Personenschäden', [['personenschaden', 'Person verletzt'], ['psName', 'Name/Anschrift Verletzte/r'], ['psKontakt', 'Kontakt'], ['psGeburt', 'Geburtsdatum'], ['khAufenthalt', 'Krankenhausaufenthalt'], ['khVon', 'von'], ['khBis', 'bis'], ['khAnschrift', 'Krankenhaus-Anschrift'], ['psArzt', 'Ärzte/Therapeuten'], ['wegeunfall', 'Wegeunfall']]], ['V. Rechtsschutzversicherung', [['rsv', 'Rechtsschutzversicherung vorhanden'], ['rsvName', 'Name der RSV'], ['rsvSchein', 'Versicherungsschein-Nr.'], ['rsvNehmer', 'Versicherungsnehmer'], ['rsvSchaden', 'Schaden-Nr.'], ['selbstbeteiligung', 'Selbstbeteiligung'], ['selbstbeteiligungBetrag', 'Höhe Selbstbeteiligung']]], ['Einwilligungen', [['datenStr', 'Speicherung der Daten gem. Hinweisen'], ['emailConsent', 'Unverschlüsselte E-Mail-/Fax-Kommunikation'], ['sofortLeistung', 'Sofortiger Leistungsbeginn (Verzicht Widerruf)'], ['datenschutz', 'Datenschutzerklärung']]]];
function jaNein(v) {
  return v === true ? 'Ja' : v === false ? '' : v;
}
function summaryText(f) {
  let out = 'Verkehrsunfall-Fragebogen\n';
  for (const [title, fields] of FIELD_GROUPS) {
    const lines = fields.map(([k, l]) => [l, jaNein(f[k])]).filter(([, v]) => String(v == null ? '' : v).trim() !== '').map(([l, v]) => l + ': ' + v);
    if (lines.length) out += '\n' + title + '\n' + lines.join('\n') + '\n';
  }
  return out.trim();
}
function mailtoHref(f) {
  return 'mailto:' + RECIPIENT + '?subject=' + encodeURIComponent('Unfallfragebogen – ' + (f.name || '')) + '&body=' + encodeURIComponent(summaryText(f));
}
function mount() {
  const CONTAINER = {
    maxWidth: 880,
    margin: '0 auto',
    padding: '0 20px'
  };

  /* Seiten-Chrome (Header, Navigation, Hero, Footer) – außerhalb von Page,
     damit Eingabefelder beim Tippen nicht den Fokus verlieren. */
  const SiteChrome = window.SiteChrome;
  function Chrome({
    children
  }) {
    return /*#__PURE__*/React.createElement(SiteChrome, {
      current: "fragebogen",
      title: "Verkehrsunfall-Fragebogen",
      tagline: "Schildern Sie uns den Unfall \u2013 wir k\xFCmmern uns um die Regulierung."
    }, children);
  }

  /* ---------- shared styles ---------- */
  const labelStyle = {
    display: 'block',
    font: '600 13px/1.5 var(--font-sans)',
    color: 'var(--text)',
    marginBottom: 7,
    letterSpacing: '0.01em'
  };
  const hintStyle = {
    font: '400 12.5px/1.5 var(--font-sans)',
    color: 'var(--text-light)',
    marginTop: 5
  };
  const baseInput = {
    width: '100%',
    padding: '11px 12px',
    font: '400 14px/1.5 var(--font-sans)',
    color: 'var(--text)',
    background: 'var(--white)',
    border: '1px solid var(--border)',
    outline: 'none',
    transition: 'border-color var(--ease)'
  };
  function fieldBorder(hasError) {
    return hasError ? '1px solid var(--crimson)' : '1px solid var(--border)';
  }

  /* ---------- primitives ---------- */
  function Req() {
    return /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        color: 'var(--crimson)',
        marginLeft: 3
      }
    }, "*");
  }
  function Field({
    label,
    required,
    hint,
    error,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 20
      }
    }, label && /*#__PURE__*/React.createElement("label", {
      style: labelStyle
    }, label, required && /*#__PURE__*/React.createElement(Req, null)), children, error ? /*#__PURE__*/React.createElement("p", {
      style: {
        ...hintStyle,
        color: 'var(--crimson)'
      }
    }, error) : hint && /*#__PURE__*/React.createElement("p", {
      style: hintStyle
    }, hint));
  }
  function TextInput({
    value,
    onChange,
    error,
    focusable = true,
    ...rest
  }) {
    const [focus, setFocus] = React.useState(false);
    return /*#__PURE__*/React.createElement("input", _extends({}, rest, {
      value: value,
      onChange: e => onChange(e.target.value),
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: {
        ...baseInput,
        border: error ? '1px solid var(--crimson)' : focus ? '1px solid var(--green)' : '1px solid var(--border)',
        boxShadow: focus && !error ? '0 0 0 2px var(--green-tint)' : 'none'
      }
    }));
  }
  function TextArea({
    value,
    onChange,
    error,
    rows = 4,
    ...rest
  }) {
    const [focus, setFocus] = React.useState(false);
    return /*#__PURE__*/React.createElement("textarea", _extends({}, rest, {
      rows: rows,
      value: value,
      onChange: e => onChange(e.target.value),
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: {
        ...baseInput,
        border: error ? '1px solid var(--crimson)' : focus ? '1px solid var(--green)' : '1px solid var(--border)',
        boxShadow: focus && !error ? '0 0 0 2px var(--green-tint)' : 'none'
      }
    }));
  }

  /* Segmented nein / ja control */
  function YesNo({
    value,
    onChange
  }) {
    const opts = [{
      v: 'nein',
      l: 'Nein'
    }, {
      v: 'ja',
      l: 'Ja'
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        border: '1px solid var(--border)'
      }
    }, opts.map((o, i) => {
      const active = value === o.v;
      return /*#__PURE__*/React.createElement("button", {
        key: o.v,
        type: "button",
        onClick: () => onChange(active ? '' : o.v),
        style: {
          font: '600 13px var(--font-sans)',
          padding: '9px 22px',
          border: 'none',
          borderLeft: i === 0 ? 'none' : '1px solid var(--border)',
          cursor: 'pointer',
          background: active ? 'var(--green)' : 'var(--white)',
          color: active ? 'var(--white)' : 'var(--text-light)',
          transition: 'background var(--ease), color var(--ease)'
        }
      }, o.l);
    }));
  }
  function Section({
    num,
    title,
    children
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        font: '700 16px var(--font-sans)',
        color: 'var(--text)',
        margin: '0 0 18px',
        paddingBottom: 8,
        borderBottom: '2px solid var(--green)',
        display: 'flex',
        alignItems: 'baseline',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--green)',
        font: '700 14px var(--font-sans)'
      }
    }, num), title), children);
  }

  /* A label + nein/ja with a conditional detail text field */
  function ConditionalField({
    label,
    hint,
    choice,
    onChoice,
    detailValue,
    onDetail,
    detailPlaceholder
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: labelStyle
    }, label), hint && /*#__PURE__*/React.createElement("p", {
      style: {
        ...hintStyle,
        marginTop: 0,
        marginBottom: 10
      }
    }, hint), /*#__PURE__*/React.createElement(YesNo, {
      value: choice,
      onChange: onChoice
    }), choice === 'ja' && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: detailValue,
      onChange: onDetail,
      placeholder: detailPlaceholder
    })));
  }

  /* label + nein/ja stacked (Nein/Ja under the question) */
  function YesNoField({
    label,
    hint,
    value,
    onChange
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: labelStyle
    }, label), hint && /*#__PURE__*/React.createElement("p", {
      style: {
        ...hintStyle,
        marginTop: 0,
        marginBottom: 10
      }
    }, hint), /*#__PURE__*/React.createElement(YesNo, {
      value: value,
      onChange: onChange
    }));
  }

  /* consent checkbox */
  function Consent({
    checked,
    onChange,
    error,
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("label", {
      "data-error": !!error,
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: checked,
      onChange: e => onChange(e.target.checked),
      style: {
        width: 18,
        height: 18,
        marginTop: 2,
        accentColor: 'var(--green)',
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 13px/1.6 var(--font-sans)',
        color: 'var(--text-light)'
      }
    }, children)), error && /*#__PURE__*/React.createElement("p", {
      style: {
        ...hintStyle,
        color: 'var(--crimson)',
        marginLeft: 30
      }
    }, error));
  }

  /* ---------- validation ---------- */
  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }
  function normalizeIban(v) {
    return v.replace(/\s+/g, '').toUpperCase();
  }
  function formatIban(v) {
    return normalizeIban(v).replace(/(.{4})/g, '$1 ').trim();
  }
  function isValidIban(raw) {
    const iban = normalizeIban(raw);
    if (!/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(iban)) return false;
    // length per country (DE = 22); accept others but length-bound
    if (iban.length < 15 || iban.length > 34) return false;
    const rearr = iban.slice(4) + iban.slice(0, 4);
    const numeric = rearr.replace(/[A-Z]/g, c => (c.charCodeAt(0) - 55).toString());
    // mod 97 over a long numeric string
    let rem = 0;
    for (let i = 0; i < numeric.length; i++) rem = (rem * 10 + (numeric.charCodeAt(i) - 48)) % 97;
    return rem === 1;
  }
  const EMPTY = {
    // Mandant
    name: '',
    strasse: '',
    plz: '',
    ort: '',
    email: '',
    telefon: '',
    iban: '',
    // I. eigenes Fahrzeug
    eigentuemer: '',
    fahrzeugart: '',
    fahrzeugartDetail: '',
    kennzeichen: '',
    leasing: '',
    leasingDetail: '',
    finanziert: '',
    finanziertDetail: '',
    fahrer: '',
    scheckheft: '',
    vollkasko: '',
    vollkaskoDetail: '',
    begutachtet: '',
    begutachtetDetail: '',
    fahrbereit: '',
    // II. Unfallgegner
    gKennzeichen: '',
    gFahrer: '',
    gVersicherung: '',
    gVssNr: '',
    // III. Unfall
    uOrt: '',
    uDatum: '',
    uZeit: '',
    zeugen: '',
    polizei: '',
    polizeiDetail: '',
    schilderung: '',
    // IV. Personenschäden
    personenschaden: '',
    psName: '',
    psKontakt: '',
    psGeburt: '',
    khAufenthalt: '',
    khVon: '',
    khBis: '',
    khAnschrift: '',
    psArzt: '',
    wegeunfall: '',
    // Stammdaten-Ergänzungen
    vorsteuer: '',
    bank: '',
    // V. Rechtsschutzversicherung
    rsv: '',
    rsvName: '',
    rsvSchein: '',
    rsvNehmer: '',
    rsvSchaden: '',
    selbstbeteiligung: '',
    selbstbeteiligungBetrag: '',
    // consent
    datenStr: false,
    emailConsent: false,
    sofortLeistung: false,
    datenschutz: false
  };
  function Page() {
    const [form, setForm] = React.useState(EMPTY);
    const [errors, setErrors] = React.useState({});
    const [submitted, setSubmitted] = React.useState(false);
    const [showNextPrompt, setShowNextPrompt] = React.useState(false);
    const [sending, setSending] = React.useState(false);
    const [sendError, setSendError] = React.useState('');
    const set = k => v => setForm(f => ({
      ...f,
      [k]: v
    }));
    function validate() {
      const e = {};
      if (!form.name.trim()) e.name = 'Bitte geben Sie Ihren Namen an.';
      if (!form.strasse.trim()) e.strasse = 'Bitte geben Sie Straße und Hausnummer an.';
      if (!form.plz.trim() || !form.ort.trim()) e.ort = 'Bitte geben Sie PLZ und Ort an.';
      if (!form.email.trim()) e.email = 'Bitte geben Sie Ihre E-Mail-Adresse an.';else if (!isEmail(form.email)) e.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
      if (!form.iban.trim()) e.iban = 'Bitte geben Sie Ihre IBAN an.';else if (!isValidIban(form.iban)) e.iban = 'Diese IBAN ist ungültig. Bitte prüfen Sie Ihre Eingabe.';
      if (!form.fahrzeugart) e.fahrzeugart = 'Bitte wählen Sie die Art des Fahrzeugs.';else if (form.fahrzeugart === 'Sonstiges' && !form.fahrzeugartDetail.trim()) e.fahrzeugartDetail = 'Bitte geben Sie die Art des Fahrzeugs an.';
      if (!form.datenStr) e.datenStr = 'Für die Bearbeitung ist Ihre Einwilligung zur Datenspeicherung erforderlich.';
      if (!form.datenschutz) e.datenschutz = 'Bitte stimmen Sie der Datenschutzerklärung zu.';
      return e;
    }
    async function handleSubmit(ev) {
      ev.preventDefault();
      const e = validate();
      setErrors(e);
      if (Object.keys(e).length > 0) return;
      setSendError('');
      setSending(true);
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        });
        let data = null;
        try {
          data = await res.json();
        } catch (_) {}
        if (res.ok && data && data.ok) {
          setSubmitted(true);
          setShowNextPrompt(true);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else {
          setSendError(data && data.error || 'Der Fragebogen konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schicken Sie uns Ihre Angaben per E-Mail.');
        }
      } catch (err) {
        setSendError('Es besteht derzeit keine Verbindung zum Server. Bitte versuchen Sie es später erneut oder schicken Sie uns Ihre Angaben per E-Mail.');
      } finally {
        setSending(false);
      }
    }

    // Chrome ist oben (außerhalb von Page) definiert.

    if (showNextPrompt && submitted) {
      return /*#__PURE__*/React.createElement(Chrome, null, /*#__PURE__*/React.createElement("section", {
        style: {
          background: 'var(--white)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          ...CONTAINER,
          maxWidth: 500,
          textAlign: 'center'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          background: 'var(--white)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '40px 32px'
        }
      }, /*#__PURE__*/React.createElement("h2", {
        style: {
          font: '300 24px var(--font-sans)',
          color: 'var(--text)',
          margin: '0 0 16px'
        }
      }, "M\xF6chten Sie einen weiteren Fragebogen ausf\xFCllen?"), /*#__PURE__*/React.createElement("p", {
        style: {
          font: '400 14px/1.75 var(--font-sans)',
          color: 'var(--text-light)',
          margin: '0 0 28px'
        }
      }, "Sie k\xF6nnen jetzt einen weiteren Fragebogen starten oder zur Startseite zur\xFCckkehren."), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 12,
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React.createElement("a", {
        href: "../index.html#fragebogen",
        style: {
          background: 'var(--green)',
          color: 'var(--white)',
          border: 'none',
          font: '600 13px var(--font-sans)',
          padding: '12px 24px',
          borderRadius: '4px',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'inline-block'
        }
      }, "Ja, weiterer Fragebogen"), /*#__PURE__*/React.createElement("a", {
        href: "../index.html",
        style: {
          background: 'none',
          color: 'var(--text-light)',
          border: '1px solid var(--border)',
          font: '600 13px var(--font-sans)',
          padding: '12px 24px',
          borderRadius: '4px',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'inline-block'
        }
      }, "Nein, zur Startseite"))))));
    }
    if (submitted) {
      return /*#__PURE__*/React.createElement(Chrome, null, /*#__PURE__*/React.createElement("main", {
        style: {
          padding: '54px 0 20px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          ...CONTAINER,
          maxWidth: 620
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          borderLeft: '3px solid var(--green)',
          background: 'var(--green-tint)',
          padding: '30px 32px'
        }
      }, /*#__PURE__*/React.createElement("h2", {
        style: {
          font: '300 24px var(--font-sans)',
          color: 'var(--text)',
          margin: '0 0 12px'
        }
      }, "Vielen Dank, ", form.name.split(' ')[0] || 'Ihre Angaben sind eingegangen', "."), /*#__PURE__*/React.createElement("p", {
        style: {
          font: '400 14px/1.75 var(--font-sans)',
          color: 'var(--text)',
          margin: '0 0 14px'
        }
      }, "Wir haben Ihre Angaben zum Unfallgeschehen erhalten und melden uns kurzfristig bei Ihnen unter ", /*#__PURE__*/React.createElement("strong", null, form.email), "."), /*#__PURE__*/React.createElement("p", {
        style: {
          font: '400 14px/1.75 var(--font-sans)',
          color: 'var(--text-light)',
          margin: 0
        }
      }, "Halten Sie Rechnungen, Gutachten und Belege bereit \u2013 diese k\xF6nnen wir im weiteren Verlauf nachfordern.")), /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: () => {
          setForm(EMPTY);
          setErrors({});
          setSubmitted(false);
        },
        style: {
          marginTop: 22,
          background: 'none',
          border: '1px solid var(--border)',
          color: 'var(--text-light)',
          font: '600 13px var(--font-sans)',
          padding: '11px 20px',
          cursor: 'pointer'
        }
      }, "Neuen Fragebogen ausf\xFCllen"))));
    }
    const hasErrors = Object.keys(errors).length > 0;
    return /*#__PURE__*/React.createElement(Chrome, null, /*#__PURE__*/React.createElement("main", {
      style: {
        padding: '40px 0 10px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: CONTAINER
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: '400 14px/1.75 var(--font-sans)',
        color: 'var(--text-light)',
        maxWidth: 680,
        marginTop: 0,
        marginBottom: 8
      }
    }, "Bitte f\xFCllen Sie den Fragebogen so vollst\xE4ndig wie m\xF6glich aus. Pflichtfelder sind mit ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--crimson)'
      }
    }, "*"), " gekennzeichnet. Rechnungen und sonstige Belege reichen wir sp\xE4ter gemeinsam mit Ihnen nach."), /*#__PURE__*/React.createElement("form", {
      onSubmit: handleSubmit,
      noValidate: true,
      style: {
        maxWidth: 680,
        marginTop: 30
      }
    }, /*#__PURE__*/React.createElement(Section, {
      num: "",
      title: "Ihre Angaben"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Name (Mandant/in)",
      required: true,
      error: errors.name
    }, /*#__PURE__*/React.createElement("span", {
      "data-error": !!errors.name
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.name,
      onChange: set('name'),
      error: errors.name,
      placeholder: "Vor- und Nachname",
      autoComplete: "name"
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Stra\xDFe und Hausnummer",
      required: true,
      error: errors.strasse
    }, /*#__PURE__*/React.createElement("span", {
      "data-error": !!errors.strasse
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.strasse,
      onChange: set('strasse'),
      error: errors.strasse,
      placeholder: "z. B. Rotenburger Str. 17",
      autoComplete: "street-address"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '180px 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "PLZ",
      required: true,
      error: errors.ort ? ' ' : null
    }, /*#__PURE__*/React.createElement("span", {
      "data-error": !!errors.ort
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.plz,
      onChange: set('plz'),
      error: errors.ort,
      placeholder: "36199",
      autoComplete: "postal-code",
      inputMode: "numeric"
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Ort",
      required: true,
      error: errors.ort
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.ort,
      onChange: set('ort'),
      error: errors.ort,
      placeholder: "Rotenburg a.d. Fulda",
      autoComplete: "address-level2"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "E-Mail",
      required: true,
      error: errors.email
    }, /*#__PURE__*/React.createElement("span", {
      "data-error": !!errors.email
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "email",
      value: form.email,
      onChange: set('email'),
      error: errors.email,
      placeholder: "name@beispiel.de",
      autoComplete: "email"
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Telefon",
      hint: "F\xFCr kurzfristige R\xFCckfragen."
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "tel",
      value: form.telefon,
      onChange: set('telefon'),
      placeholder: "0151 23456789",
      autoComplete: "tel"
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Bank",
      hint: "Name des Kreditinstituts."
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.bank,
      onChange: set('bank'),
      placeholder: "Name des Kreditinstituts"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "IBAN",
      required: true,
      hint: "F\xFCr die Auszahlung regulierter Sch\xE4den auf Ihr Konto.",
      error: errors.iban
    }, /*#__PURE__*/React.createElement("span", {
      "data-error": !!errors.iban
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.iban,
      onChange: v => set('iban')(formatIban(v).slice(0, 42)),
      error: errors.iban,
      placeholder: "DE00 0000 0000 0000 0000 00",
      inputMode: "text",
      autoComplete: "off"
    }))), /*#__PURE__*/React.createElement(YesNoField, {
      label: "Vorsteuerabzugsberechtigt?",
      value: form.vorsteuer,
      onChange: set('vorsteuer')
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 26
      }
    }), /*#__PURE__*/React.createElement(Section, {
      num: "I.",
      title: "Angaben zum eigenen Fahrzeug"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Wer ist Eigent\xFCmer des Fahrzeugs?",
      hint: "Bei Kauffahrzeugen bitte sp\xE4ter eine Kopie des Kaufvertrags beif\xFCgen."
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.eigentuemer,
      onChange: set('eigentuemer'),
      placeholder: "Name des Eigent\xFCmers"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Art des Fahrzeugs",
      required: true,
      error: errors.fahrzeugart
    }, /*#__PURE__*/React.createElement("span", {
      "data-error": !!errors.fahrzeugart
    }, /*#__PURE__*/React.createElement("select", {
      value: form.fahrzeugart,
      onChange: e => set('fahrzeugart')(e.target.value),
      style: {
        ...baseInput,
        appearance: 'auto',
        border: errors.fahrzeugart ? '1px solid var(--crimson)' : '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Bitte w\xE4hlen \u2026"), /*#__PURE__*/React.createElement("option", {
      value: "PKW"
    }, "PKW"), /*#__PURE__*/React.createElement("option", {
      value: "LKW"
    }, "LKW"), /*#__PURE__*/React.createElement("option", {
      value: "Motorrad"
    }, "Motorrad"), /*#__PURE__*/React.createElement("option", {
      value: "e-Bike"
    }, "e-Bike"), /*#__PURE__*/React.createElement("option", {
      value: "Fussg\xE4nger"
    }, "Fu\xDFg\xE4nger"), /*#__PURE__*/React.createElement("option", {
      value: "Sonstiges"
    }, "Sonstiges")))), form.fahrzeugart === 'Sonstiges' && /*#__PURE__*/React.createElement(Field, {
      label: "Art des Fahrzeugs (Sonstiges)",
      required: true,
      error: errors.fahrzeugartDetail
    }, /*#__PURE__*/React.createElement("span", {
      "data-error": !!errors.fahrzeugartDetail
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.fahrzeugartDetail,
      onChange: set('fahrzeugartDetail'),
      error: errors.fahrzeugartDetail,
      placeholder: "Bitte n\xE4her angeben"
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Kennzeichen des Fahrzeugs"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.kennzeichen,
      onChange: set('kennzeichen'),
      placeholder: "z. B. HEF-AB 123"
    })), /*#__PURE__*/React.createElement(ConditionalField, {
      label: "Handelt es sich um ein Leasingfahrzeug?",
      hint: "Wenn ja: Leasinggeber und Vertrags-Nr. angeben.",
      choice: form.leasing,
      onChoice: set('leasing'),
      detailValue: form.leasingDetail,
      onDetail: set('leasingDetail'),
      detailPlaceholder: "Leasinggeber / Vertrags-Nr."
    }), /*#__PURE__*/React.createElement(ConditionalField, {
      label: "Ist das Fahrzeug finanziert?",
      hint: "Wenn ja: Darlehensgeber und Vertrags-Nr. angeben.",
      choice: form.finanziert,
      onChoice: set('finanziert'),
      detailValue: form.finanziertDetail,
      onDetail: set('finanziertDetail'),
      detailPlaceholder: "Darlehensgeber / Vertrags-Nr."
    }), /*#__PURE__*/React.createElement(Field, {
      label: "Wer war Fahrer zum Unfallzeitpunkt?"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.fahrer,
      onChange: set('fahrer'),
      placeholder: "Name des Fahrers"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Ist das Fahrzeug scheckheftgepflegt?",
      hint: "Wenn ja, bitte sp\xE4ter das Serviceheft in Kopie beif\xFCgen."
    }, /*#__PURE__*/React.createElement(YesNo, {
      value: form.scheckheft,
      onChange: set('scheckheft')
    })), /*#__PURE__*/React.createElement(ConditionalField, {
      label: "Besteht eine Vollkaskoversicherung?",
      hint: "Wenn ja: Versicherer und VSS-Nr. angeben.",
      choice: form.vollkasko,
      onChoice: set('vollkasko'),
      detailValue: form.vollkaskoDetail,
      onDetail: set('vollkaskoDetail'),
      detailPlaceholder: "Versicherer / VSS-Nr."
    }), /*#__PURE__*/React.createElement(ConditionalField, {
      label: "Wurde das Fahrzeug bereits begutachtet?",
      hint: "Wenn ja: Sachverst\xE4ndigenb\xFCro angeben, Gutachten ggf. nachreichen.",
      choice: form.begutachtet,
      onChoice: set('begutachtet'),
      detailValue: form.begutachtetDetail,
      onDetail: set('begutachtetDetail'),
      detailPlaceholder: "Sachverst\xE4ndigenb\xFCro"
    }), /*#__PURE__*/React.createElement(Field, {
      label: "Ist das Fahrzeug fahrbereit und verkehrssicher?"
    }, /*#__PURE__*/React.createElement(YesNo, {
      value: form.fahrbereit,
      onChange: set('fahrbereit')
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 26
      }
    }), /*#__PURE__*/React.createElement(Section, {
      num: "II.",
      title: "Angaben zum Unfallgegner"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Kennzeichen"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.gKennzeichen,
      onChange: set('gKennzeichen'),
      placeholder: "z. B. HEF-AB 123"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "VSS-/Schadennummer"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.gVssNr,
      onChange: set('gVssNr'),
      placeholder: "Versicherungs-/Schadennummer"
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Name und Anschrift des Fahrers"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.gFahrer,
      onChange: set('gFahrer'),
      placeholder: "Name, Stra\xDFe, PLZ, Ort"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Wo ist das Kfz haftpflichtversichert?"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.gVersicherung,
      onChange: set('gVersicherung'),
      placeholder: "Name der Haftpflichtversicherung"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 26
      }
    }), /*#__PURE__*/React.createElement(Section, {
      num: "III.",
      title: "Informationen zum Unfall"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Unfallort / Stra\xDFe"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.uOrt,
      onChange: set('uOrt'),
      placeholder: "Stra\xDFe, Kreuzung, Ort"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Unfalltag"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "date",
      value: form.uDatum,
      onChange: set('uDatum')
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Ungef\xE4hre Uhrzeit"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "time",
      value: form.uZeit,
      onChange: set('uZeit')
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Name und Anschrift von Zeugen"
    }, /*#__PURE__*/React.createElement(TextArea, {
      value: form.zeugen,
      onChange: set('zeugen'),
      rows: 2,
      placeholder: "Name, Anschrift, ggf. Telefon"
    })), /*#__PURE__*/React.createElement(ConditionalField, {
      label: "Hat die Polizei den Unfall aufgenommen?",
      hint: "Wenn ja: aufnehmende Dienststelle und Aktenzeichen angeben.",
      choice: form.polizei,
      onChoice: set('polizei'),
      detailValue: form.polizeiDetail,
      onDetail: set('polizeiDetail'),
      detailPlaceholder: "Dienststelle / Aktenzeichen"
    }), /*#__PURE__*/React.createElement(Field, {
      label: "Kurze Unfallschilderung",
      hint: "Von wo nach wo fuhren Sie und der Unfallgegner? Geschwindigkeiten? Sicht- und Stra\xDFenverh\xE4ltnisse? Was ist passiert?"
    }, /*#__PURE__*/React.createElement(TextArea, {
      value: form.schilderung,
      onChange: set('schilderung'),
      rows: 6,
      placeholder: "Schildern Sie den Unfallhergang in eigenen Worten."
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 26
      }
    }), /*#__PURE__*/React.createElement(Section, {
      num: "IV.",
      title: "Personensch\xE4den"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Wurde eine Person verletzt?"
    }, /*#__PURE__*/React.createElement(YesNo, {
      value: form.personenschaden,
      onChange: set('personenschaden')
    })), form.personenschaden === 'ja' && /*#__PURE__*/React.createElement("div", {
      style: {
        borderLeft: '3px solid var(--green)',
        paddingLeft: 22,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Name und Anschrift der verletzten Person"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.psName,
      onChange: set('psName'),
      placeholder: "Name, Stra\xDFe, PLZ, Ort"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 200px',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Telefon (Festnetz/Mobil), Fax, E-Mail"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.psKontakt,
      onChange: set('psKontakt'),
      placeholder: "Kontaktdaten"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Geburtsdatum"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "date",
      value: form.psGeburt,
      onChange: set('psGeburt')
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Krankenhausaufenthalt?"
    }, /*#__PURE__*/React.createElement(YesNo, {
      value: form.khAufenthalt,
      onChange: set('khAufenthalt')
    })), form.khAufenthalt === 'ja' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Von"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "date",
      value: form.khVon,
      onChange: set('khVon')
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Bis"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "date",
      value: form.khBis,
      onChange: set('khBis')
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Anschrift des Krankenhauses"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.khAnschrift,
      onChange: set('khAnschrift'),
      placeholder: "Name und Anschrift"
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Ambulant behandelnde \xC4rzte / Therapeuten"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.psArzt,
      onChange: set('psArzt'),
      placeholder: "Namen und Anschriften"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Ereignete sich der Unfall auf dem Weg von oder zur Arbeitsstelle?"
    }, /*#__PURE__*/React.createElement(YesNo, {
      value: form.wegeunfall,
      onChange: set('wegeunfall')
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 26
      }
    }), /*#__PURE__*/React.createElement(Section, {
      num: "V.",
      title: "Rechtsschutzversicherung"
    }, /*#__PURE__*/React.createElement(YesNoField, {
      label: "Besteht eine Rechtsschutzversicherung?",
      value: form.rsv,
      onChange: set('rsv')
    }), form.rsv === 'ja' && /*#__PURE__*/React.createElement("div", {
      style: {
        borderLeft: '3px solid var(--green)',
        paddingLeft: 22,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Name der Versicherung"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.rsvName,
      onChange: set('rsvName'),
      placeholder: "z. B. ARAG, ADAC \u2026"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Versicherungsschein-Nr."
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.rsvSchein,
      onChange: set('rsvSchein'),
      placeholder: "Schein-Nr."
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Versicherungsnehmer"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.rsvNehmer,
      onChange: set('rsvNehmer'),
      placeholder: "falls abweichend"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Schaden-Nr."
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.rsvSchaden,
      onChange: set('rsvSchaden'),
      placeholder: "falls bekannt"
    }))), /*#__PURE__*/React.createElement(YesNoField, {
      label: "Ist eine Selbstbeteiligung vereinbart?",
      value: form.selbstbeteiligung,
      onChange: set('selbstbeteiligung')
    }), form.selbstbeteiligung === 'ja' && /*#__PURE__*/React.createElement(Field, {
      label: "H\xF6he der Selbstbeteiligung"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 260
      }
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      inputMode: "decimal",
      value: form.selbstbeteiligungBetrag,
      onChange: set('selbstbeteiligungBetrag'),
      placeholder: "z. B. 150 \u20AC"
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: '1px solid var(--border)',
        marginTop: 30,
        paddingTop: 24
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        font: '700 16px var(--font-sans)',
        color: 'var(--text)',
        margin: '0 0 18px',
        paddingBottom: 8,
        borderBottom: '2px solid var(--green)'
      }
    }, "Erkl\xE4rungen und Einwilligungen"), /*#__PURE__*/React.createElement(Consent, {
      checked: form.datenStr,
      onChange: set('datenStr'),
      error: errors.datenStr
    }, "Ich bin mit der Speicherung meiner Daten gem\xE4\xDF den ", /*#__PURE__*/React.createElement("a", {
      href: "index.html#datenschutz",
      style: {
        color: 'var(--green)'
      }
    }, "Hinweisen zur Datenverarbeitung"), " einverstanden. Mir ist bekannt, dass die Daten elektronisch gespeichert werden.", /*#__PURE__*/React.createElement(Req, null)), /*#__PURE__*/React.createElement(Consent, {
      checked: form.emailConsent,
      onChange: set('emailConsent')
    }, "Ich w\xFCnsche ausdr\xFCcklich die Kommunikation per ", /*#__PURE__*/React.createElement("strong", null, "unverschl\xFCsselter E-Mail und/oder Telefax"), " und bin auf die damit verbundenen Risiken hingewiesen worden. Diese Erkl\xE4rung kann ich jederzeit widerrufen. ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-faint)'
      }
    }, "(optional)")), /*#__PURE__*/React.createElement(Consent, {
      checked: form.sofortLeistung,
      onChange: set('sofortLeistung')
    }, "Ich w\xFCnsche, dass die Kanzlei bereits ", /*#__PURE__*/React.createElement("strong", null, "vor Ablauf der 14-t\xE4gigen Widerrufsfrist"), " mit der T\xE4tigkeit beginnt. Mir ist bekannt, dass ich bei Widerruf bereits erbrachte Leistungen zu verg\xFCten habe und mein Widerrufsrecht bei vollst\xE4ndiger Erf\xFCllung erlischt. ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-faint)'
      }
    }, "(optional)")), /*#__PURE__*/React.createElement(Consent, {
      checked: form.datenschutz,
      onChange: set('datenschutz'),
      error: errors.datenschutz
    }, "Ich habe die ", /*#__PURE__*/React.createElement("a", {
      href: "index.html#datenschutz",
      style: {
        color: 'var(--green)'
      }
    }, "Datenschutzerkl\xE4rung"), " gelesen und willige in die Verarbeitung meiner Angaben zur Bearbeitung meines Anliegens ein.", /*#__PURE__*/React.createElement(Req, null)), hasErrors && /*#__PURE__*/React.createElement("p", {
      style: {
        font: '400 13px/1.6 var(--font-sans)',
        color: 'var(--crimson)',
        marginTop: 18
      }
    }, "Bitte pr\xFCfen Sie die rot markierten Felder."), sendError && /*#__PURE__*/React.createElement("div", {
      style: {
        borderLeft: '3px solid var(--crimson)',
        background: '#fbeaed',
        padding: '14px 18px',
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: '400 13px/1.6 var(--font-sans)',
        color: 'var(--crimson)',
        margin: 0
      }
    }, sendError), /*#__PURE__*/React.createElement("a", {
      href: mailtoHref(form),
      style: {
        font: '600 13px var(--font-sans)',
        color: 'var(--crimson)',
        display: 'inline-block',
        marginTop: 8
      }
    }, "Angaben per E-Mail senden \u203A")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        marginTop: 22,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      disabled: sending,
      style: {
        background: sending ? 'var(--green-dark)' : 'var(--green)',
        color: 'var(--white)',
        font: '600 15px var(--font-sans)',
        border: 'none',
        padding: '15px 34px',
        cursor: sending ? 'progress' : 'pointer',
        opacity: sending ? 0.85 : 1,
        transition: 'background var(--ease)'
      },
      onMouseEnter: e => {
        if (!sending) e.currentTarget.style.background = 'var(--green-dark)';
      },
      onMouseLeave: e => {
        if (!sending) e.currentTarget.style.background = 'var(--green)';
      }
    }, sending ? 'Wird gesendet …' : 'Fragebogen absenden'), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 12.5px var(--font-sans)',
        color: 'var(--text-faint)'
      }
    }, "Ihre Angaben werden direkt an die Kanzlei \xFCbermittelt.")))))));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Page, null));
}
mount();