function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Seiten-Chrome (Header, Navigation, Hero, Footer) liefert js/site-chrome.js → window.SiteChrome */

/* ---- Versand-Konfiguration ---- */
const RECIPIENT = 's.riess@fiedler-riess.de'; // Empfänger der Bögen
const ENDPOINT = 'mandantenbogen.php'; // serverseitige Verarbeitung (PHP)

/* Feldgruppen + Beschriftungen für die E-Mail-Zusammenfassung (Fallback per mailto) */
const FIELD_GROUPS = [['Stammdaten', [['name', 'Name'], ['strasse', 'Straße/Hausnr.'], ['plz', 'PLZ'], ['ort', 'Ort'], ['email', 'E-Mail'], ['telefon', 'Telefon'], ['vorsteuer', 'Vorsteuerabzugsberechtigt']]], ['Bankverbindung', [['bank', 'Bank'], ['iban', 'IBAN']]], ['Rechtsschutzversicherung', [['rsv', 'Rechtsschutzversicherung vorhanden'], ['rsvName', 'Name der RSV'], ['rsvSchein', 'Versicherungsschein-Nr.'], ['rsvNehmer', 'Versicherungsnehmer'], ['rsvSchaden', 'Schaden-Nr.'], ['selbstbeteiligung', 'Selbstbeteiligung'], ['selbstbeteiligungBetrag', 'Höhe Selbstbeteiligung']]], ['Angaben zum Mandat', [['inSachen', 'In Sachen (gegen wen / was)'], ['wegen', 'Wegen (Gegenstand)']]], ['Einwilligungen', [['datenStr', 'Speicherung der Daten gem. Hinweisen'], ['emailConsent', 'Unverschlüsselte E-Mail-/Fax-Kommunikation'], ['sofortLeistung', 'Sofortiger Leistungsbeginn (Verzicht Widerruf)'], ['datenschutz', 'Datenschutzerklärung']]]];
function jaNein(v) {
  return v === true ? 'Ja' : v === false ? 'Nein' : v;
}
function summaryText(f) {
  let out = 'Mandantenbogen – Datenerfassung\n';
  for (const [title, fields] of FIELD_GROUPS) {
    const lines = fields.map(([k, l]) => [l, jaNein(f[k])]).filter(([, v]) => String(v == null ? '' : v).trim() !== '').map(([l, v]) => l + ': ' + v);
    if (lines.length) out += '\n' + title + '\n' + lines.join('\n') + '\n';
  }
  return out.trim();
}
function mailtoHref(f) {
  return 'mailto:' + RECIPIENT + '?subject=' + encodeURIComponent('Mandantenbogen – ' + (f.name || '')) + '&body=' + encodeURIComponent(summaryText(f));
}
function mount() {
  const CONTAINER = {
    maxWidth: 880,
    margin: '0 auto',
    padding: '0 20px'
  };

  /* Seiten-Chrome – außerhalb von Page, damit Eingabefelder den Fokus behalten. */
  const SiteChrome = window.SiteChrome;
  function Chrome({
    children
  }) {
    return /*#__PURE__*/React.createElement(SiteChrome, {
      current: "mandant",
      title: "Mandantenbogen",
      tagline: "Datenerfassung f\xFCr neue Mandantinnen und Mandanten."
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

  /* label + nein/ja on one row */
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
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        ...labelStyle,
        marginBottom: 0,
        flex: 1,
        minWidth: 220
      }
    }, label), /*#__PURE__*/React.createElement(YesNo, {
      value: value,
      onChange: onChange
    })), hint && /*#__PURE__*/React.createElement("p", {
      style: hintStyle
    }, hint));
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
    }, num ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--green)',
        font: '700 14px var(--font-sans)'
      }
    }, num) : null, title), children);
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
    // Formatprüfung: Länderkürzel (2 Buchstaben) + 2 Prüfziffern + mind. 11 Zeichen
    // Die Prüfsumme (Mod 97) prüft die Bank; hier reicht die Struktur.
    const iban = normalizeIban(raw);
    return /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban) && iban.length >= 15 && iban.length <= 34;
  }
  const EMPTY = {
    // Stammdaten
    name: '',
    strasse: '',
    plz: '',
    ort: '',
    email: '',
    telefon: '',
    vorsteuer: '',
    // Bank
    bank: '',
    iban: '',
    // RSV
    rsv: '',
    rsvName: '',
    rsvSchein: '',
    rsvNehmer: '',
    rsvSchaden: '',
    selbstbeteiligung: '',
    selbstbeteiligungBetrag: '',
    // Mandat
    inSachen: '',
    wegen: '',
    // Einwilligungen
    datenStr: false,
    emailConsent: false,
    sofortLeistung: false,
    datenschutz: false
  };
  function Page() {
    const [form, setForm] = React.useState(EMPTY);
    const [errors, setErrors] = React.useState({});
    const [submitted, setSubmitted] = React.useState(false);
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
      if (!form.datenStr) e.datenStr = 'Für die Mandatsbearbeitung ist Ihre Einwilligung zur Datenspeicherung erforderlich.';
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
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else {
          setSendError(data && data.error || 'Der Mandantenbogen konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schicken Sie uns Ihre Angaben per E-Mail.');
        }
      } catch (err) {
        setSendError('Es besteht derzeit keine Verbindung zum Server. Bitte versuchen Sie es später erneut oder schicken Sie uns Ihre Angaben per E-Mail.');
      } finally {
        setSending(false);
      }
    }

    // Chrome ist oben (außerhalb von Page) definiert.

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
      }, "Wir haben Ihre Mandantendaten erhalten und legen Ihre Akte an. F\xFCr die Bearbeitung melden wir uns bei Ihnen unter ", /*#__PURE__*/React.createElement("strong", null, form.email), "."), /*#__PURE__*/React.createElement("p", {
        style: {
          font: '400 14px/1.75 var(--font-sans)',
          color: 'var(--text-light)',
          margin: 0
        }
      }, "Die Vollmacht und die \xFCbrigen Unterlagen besprechen und unterzeichnen wir gemeinsam zu Mandatsbeginn.")), /*#__PURE__*/React.createElement("button", {
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
      }, "Neuen Bogen ausf\xFCllen"))));
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
    }, "Bitte f\xFCllen Sie diesen Bogen in Ihrem eigenen Interesse vollst\xE4ndig aus, damit wir Sie in Notf\xE4llen umgehend erreichen und empfangene Gelder \xFCberweisen k\xF6nnen. Ihre Daten werden vertraulich behandelt und dienen ausschlie\xDFlich der ordnungsgem\xE4\xDFen Mandatsf\xFChrung. Pflichtfelder sind mit ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--crimson)'
      }
    }, "*"), " gekennzeichnet."), /*#__PURE__*/React.createElement("form", {
      onSubmit: handleSubmit,
      noValidate: true,
      style: {
        maxWidth: 680,
        marginTop: 30
      }
    }, /*#__PURE__*/React.createElement(Section, {
      title: "Stammdaten"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Name",
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
      hint: "F\xFCr R\xFCckfragen und Notf\xE4lle."
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "tel",
      value: form.telefon,
      onChange: set('telefon'),
      placeholder: "0151 23456789",
      autoComplete: "tel"
    }))), /*#__PURE__*/React.createElement(YesNoField, {
      label: "Vorsteuerabzugsberechtigt?",
      value: form.vorsteuer,
      onChange: set('vorsteuer')
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 26
      }
    }), /*#__PURE__*/React.createElement(Section, {
      title: "Bankverbindung"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        ...hintStyle,
        marginTop: 0,
        marginBottom: 16
      }
    }, "F\xFCr die \xDCberweisung empfangener Gelder auf Ihr Konto."), /*#__PURE__*/React.createElement(Field, {
      label: "Bank"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.bank,
      onChange: set('bank'),
      placeholder: "Name des Kreditinstituts"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "IBAN",
      required: true,
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
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 26
      }
    }), /*#__PURE__*/React.createElement(Section, {
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
        height: 26
      }
    }), /*#__PURE__*/React.createElement(Section, {
      title: "Angaben zum Mandat"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        ...hintStyle,
        marginTop: 0,
        marginBottom: 16
      }
    }, "Worum geht es? Diese Angaben helfen uns bei der Vorbereitung \u2013 die Vollmacht selbst unterzeichnen wir gemeinsam."), /*#__PURE__*/React.createElement(Field, {
      label: "In Sachen (gegen wen / was)"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.inSachen,
      onChange: set('inSachen'),
      placeholder: "z. B. Gegenseite, Beh\xF6rde, Arbeitgeber \u2026"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Wegen (Gegenstand des Mandats)"
    }, /*#__PURE__*/React.createElement(TextArea, {
      value: form.wegen,
      onChange: set('wegen'),
      rows: 3,
      placeholder: "Kurze Beschreibung Ihres Anliegens"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 26
      }
    }), /*#__PURE__*/React.createElement(Section, {
      title: "Erkl\xE4rungen und Einwilligungen"
    }, /*#__PURE__*/React.createElement(Consent, {
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
    }, "Datenschutzerkl\xE4rung"), " gelesen und willige in die Verarbeitung meiner Angaben zur Bearbeitung meines Anliegens ein.", /*#__PURE__*/React.createElement(Req, null))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: '1px solid var(--border)',
        marginTop: 22,
        paddingTop: 24
      }
    }, hasErrors && /*#__PURE__*/React.createElement("p", {
      style: {
        font: '400 13px/1.6 var(--font-sans)',
        color: 'var(--crimson)',
        marginBottom: 18
      }
    }, "Bitte pr\xFCfen Sie die rot markierten Felder."), sendError && /*#__PURE__*/React.createElement("div", {
      style: {
        borderLeft: '3px solid var(--crimson)',
        background: '#fbeaed',
        padding: '14px 18px',
        marginBottom: 18
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
    }, sending ? 'Wird gesendet …' : 'Mandantenbogen absenden'), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 12.5px var(--font-sans)',
        color: 'var(--text-faint)'
      }
    }, "Ihre Angaben werden direkt an die Kanzlei \xFCbermittelt.")))))));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Page, null));
}
mount();