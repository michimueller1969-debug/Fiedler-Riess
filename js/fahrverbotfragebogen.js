function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Seiten-Chrome (Header, Navigation, Hero, Footer) liefert js/site-chrome.js → window.SiteChrome */

/* ---- Versand-Konfiguration ---- */
const RECIPIENT = 's.riess@fiedler-riess.de'; // Empfänger der Fragebögen
const ENDPOINT = 'fahrverbotfragebogen.php'; // serverseitiger Mailversand (PHP)

/* Feldgruppen + Beschriftungen für die E-Mail-Zusammenfassung (Fallback per mailto) */
const FIELD_GROUPS = [['Ihre Angaben', [['name', 'Name'], ['strasse', 'Straße/Hausnr.'], ['plz', 'PLZ'], ['ort', 'Ort'], ['email', 'E-Mail'], ['telefon', 'Telefon'], ['iban', 'IBAN']]], ['I. Persönliche und finanzielle Verhältnisse', [['staat', 'Staatsangehörigkeit'], ['familienstand', 'Familienstand'], ['einkommen', 'Einkommen netto (monatlich)'], ['alleinverdiener', 'Alleinverdiener/in'], ['haushaltseinkommen', 'Weiteres Haushaltseinkommen'], ['haushaltseinkommenBetrag', 'Höhe Haushaltseinkommen (€/Monat)'], ['unterhalt', 'Unterhaltsverpflichtungen'], ['unterhaltBetrag', 'Unterhalt (€/Monat)'], ['verbindlichkeiten', 'Sonstige Verbindlichkeiten'], ['verbindlichkeitenBetrag', 'Verbindlichkeiten (€/Monat)']]], ['II. Berufliche Verhältnisse', [['beruf', 'Beruf'], ['beschaeftigung', 'Beschäftigungsverhältnis'], ['umfang', 'Beschäftigungsumfang'], ['stunden', 'Stunden pro Woche'], ['existenz', 'Fahrverbot bedroht berufliche Existenz'], ['arbeitsplatzGefahr', 'Gefahr Arbeitsplatzverlust'], ['dokumentierbar', 'Dokumentierbar'], ['urlaub', 'Im Urlaub ableistbar'], ['oepnv', 'Arbeitsort per ÖPNV/Taxi erreichbar'], ['fahrerMoeglich', 'Fahrer/Angehörige möglich'], ['kombination', 'Überbrückung durch Kombination']]], ['III. Private Verhältnisse', [['gesundheit', 'Aus gesundheitlichen Gründen auf Kfz angewiesen'], ['gesundheitDetail', 'Erläuterung Gesundheit'], ['ausserhalb', 'Kfz außerhalb der Arbeitszeit nötig'], ['ausserhalbDetail', 'Erläuterung'], ['sonstige', 'Sonstige Unzumutbarkeitsgründe'], ['sonstigeDetail', 'Erläuterung Gründe'], ['ergaenzung', 'Ergänzende Angaben']]]];
function summaryText(f) {
  let out = 'Fragebogen – Absehen von Fahrverbot\n';
  for (const [title, fields] of FIELD_GROUPS) {
    const lines = fields.filter(([k]) => String(f[k] == null ? '' : f[k]).trim() !== '').map(([k, l]) => l + ': ' + f[k]);
    if (lines.length) out += '\n' + title + '\n' + lines.join('\n') + '\n';
  }
  return out.trim();
}
function mailtoHref(f) {
  return 'mailto:' + RECIPIENT + '?subject=' + encodeURIComponent('Fahrverbot-Fragebogen – ' + (f.name || '')) + '&body=' + encodeURIComponent(summaryText(f));
}
function mount() {
  const CONTAINER = {
    maxWidth: 960,
    margin: '0 auto',
    padding: '0 20px'
  };

  /* Seiten-Chrome – außerhalb von Page, damit Eingabefelder den Fokus behalten. */
  const SiteChrome = window.SiteChrome;
  function Chrome({
    children
  }) {
    return /*#__PURE__*/React.createElement(SiteChrome, {
      current: "fragebogen",
      title: "Fragebogen \u2013 Absehen von Fahrverbot",
      tagline: "Ihre Angaben helfen uns, ein Absehen vom Fahrverbot zu begr\xFCnden."
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
  function Select({
    value,
    onChange,
    options,
    placeholder
  }) {
    const [focus, setFocus] = React.useState(false);
    return /*#__PURE__*/React.createElement("select", {
      value: value,
      onChange: e => onChange(e.target.value),
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: {
        ...baseInput,
        cursor: 'pointer',
        border: focus ? '1px solid var(--green)' : '1px solid var(--border)',
        boxShadow: focus ? '0 0 0 2px var(--green-tint)' : 'none',
        color: value ? 'var(--text)' : 'var(--text-faint)'
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, placeholder || 'Bitte wählen …'), options.map(o => /*#__PURE__*/React.createElement("option", {
      key: o,
      value: o,
      style: {
        color: 'var(--text)'
      }
    }, o)));
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

  /* label + nein/ja; when "ja" reveal a € amount input */
  function ConditionalAmount({
    label,
    hint,
    choice,
    onChoice,
    amount,
    onAmount,
    amountLabel
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
      value: choice,
      onChange: onChoice
    })), hint && /*#__PURE__*/React.createElement("p", {
      style: hintStyle
    }, hint), choice === 'ja' && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        maxWidth: 260
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        ...labelStyle,
        font: '400 12.5px var(--font-sans)',
        color: 'var(--text-light)'
      }
    }, amountLabel || 'Betrag (€ / Monat)'), /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      inputMode: "decimal",
      value: amount,
      onChange: onAmount,
      placeholder: "z. B. 450"
    })));
  }

  /* label + nein/ja; when "ja" reveal a free-text detail */
  function ConditionalText({
    label,
    hint,
    choice,
    onChoice,
    detail,
    onDetail,
    detailPlaceholder,
    rows = 3
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
      value: choice,
      onChange: onChoice
    })), hint && /*#__PURE__*/React.createElement("p", {
      style: hintStyle
    }, hint), choice === 'ja' && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement(TextArea, {
      rows: rows,
      value: detail,
      onChange: onDetail,
      placeholder: detailPlaceholder
    })));
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
    // Mandant
    name: '',
    strasse: '',
    plz: '',
    ort: '',
    email: '',
    telefon: '',
    iban: '',
    // I. persönlich / finanziell
    staat: '',
    familienstand: '',
    einkommen: '',
    alleinverdiener: '',
    haushaltseinkommen: '',
    haushaltseinkommenBetrag: '',
    unterhalt: '',
    unterhaltBetrag: '',
    verbindlichkeiten: '',
    verbindlichkeitenBetrag: '',
    // II. beruflich
    beruf: '',
    beschaeftigung: '',
    umfang: '',
    stunden: '',
    existenz: '',
    arbeitsplatzGefahr: '',
    dokumentierbar: '',
    urlaub: '',
    oepnv: '',
    fahrerMoeglich: '',
    kombination: '',
    // III. privat
    gesundheit: '',
    gesundheitDetail: '',
    ausserhalb: '',
    ausserhalbDetail: '',
    sonstige: '',
    sonstigeDetail: '',
    ergaenzung: '',
    // consent
    datenschutz: false
  };
  function Page() {
    const [form, setForm] = React.useState(EMPTY);
    const [errors, setErrors] = React.useState({});
    const [submitted, setSubmitted] = React.useState(false);
    const [showNextPrompt, setShowNextPrompt] = React.useState(false);
    const [sending, setSending] = React.useState(false);
    const [sendError, setSendError] = React.useState('');
    const isMobile = window.frUseIsMobile();
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
      }, "Wir haben Ihre Angaben erhalten und pr\xFCfen, mit welchen Argumenten sich ein Absehen vom Fahrverbot begr\xFCnden l\xE4sst. Wir melden uns kurzfristig bei Ihnen unter ", /*#__PURE__*/React.createElement("strong", null, form.email), "."), /*#__PURE__*/React.createElement("p", {
        style: {
          font: '400 14px/1.75 var(--font-sans)',
          color: 'var(--text-light)',
          margin: 0
        }
      }, "Halten Sie den Bu\xDFgeldbescheid sowie ggf. Nachweise zu Ihrer beruflichen Situation bereit \u2013 diese k\xF6nnen wir im weiteren Verlauf nachfordern.")), /*#__PURE__*/React.createElement("button", {
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
        padding: '40px 0 60px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        padding: '0 20px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 680
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: '400 14px/1.75 var(--font-sans)',
        color: 'var(--text-light)',
        maxWidth: 680,
        marginTop: 0,
        marginBottom: 8
      }
    }, "Bei einem drohenden Fahrverbot kommt es auf Ihre pers\xF6nlichen, beruflichen und finanziellen Verh\xE4ltnisse an. Bitte f\xFCllen Sie den Fragebogen so vollst\xE4ndig wie m\xF6glich aus. Pflichtfelder sind mit ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--crimson)'
      }
    }, "*"), " gekennzeichnet."), /*#__PURE__*/React.createElement("form", {
      onSubmit: handleSubmit,
      noValidate: true,
      style: {
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
      label: "IBAN",
      required: true,
      hint: "F\xFCr die finanzielle Abwicklung Ihres Mandats.",
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
      num: "I.",
      title: "Pers\xF6nliche und finanzielle Verh\xE4ltnisse"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Staatsangeh\xF6rigkeit"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.staat,
      onChange: set('staat'),
      placeholder: "z. B. deutsch"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Familienstand"
    }, /*#__PURE__*/React.createElement(Select, {
      value: form.familienstand,
      onChange: set('familienstand'),
      options: ['ledig', 'verheiratet', 'eingetragene Lebenspartnerschaft', 'getrennt lebend', 'geschieden', 'verwitwet']
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Einkommen \u2013 monatlich netto",
      hint: "Ungef\xE4hrer Betrag in Euro."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 260
      }
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      inputMode: "decimal",
      value: form.einkommen,
      onChange: set('einkommen'),
      placeholder: "z. B. 2.400 \u20AC"
    }))), /*#__PURE__*/React.createElement(YesNoField, {
      label: "Sind Sie Alleinverdiener/in?",
      value: form.alleinverdiener,
      onChange: set('alleinverdiener')
    }), /*#__PURE__*/React.createElement(ConditionalAmount, {
      label: "Weiteres Einkommen im Haushalt?",
      choice: form.haushaltseinkommen,
      onChoice: set('haushaltseinkommen'),
      amount: form.haushaltseinkommenBetrag,
      onAmount: set('haushaltseinkommenBetrag'),
      amountLabel: "H\xF6he des Haushaltseinkommens (\u20AC / Monat)"
    }), /*#__PURE__*/React.createElement(ConditionalAmount, {
      label: "Bestehen Unterhaltsverpflichtungen?",
      choice: form.unterhalt,
      onChoice: set('unterhalt'),
      amount: form.unterhaltBetrag,
      onAmount: set('unterhaltBetrag'),
      amountLabel: "H\xF6he (\u20AC / Monat)"
    }), /*#__PURE__*/React.createElement(ConditionalAmount, {
      label: "Bestehen sonstige Verbindlichkeiten?",
      choice: form.verbindlichkeiten,
      onChoice: set('verbindlichkeiten'),
      amount: form.verbindlichkeitenBetrag,
      onAmount: set('verbindlichkeitenBetrag'),
      amountLabel: "H\xF6he (\u20AC / Monat)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 26
      }
    }), /*#__PURE__*/React.createElement(Section, {
      num: "II.",
      title: "Berufliche Verh\xE4ltnisse"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Beruf"
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      value: form.beruf,
      onChange: set('beruf'),
      placeholder: "Berufsbezeichnung"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Besch\xE4ftigungsverh\xE4ltnis"
    }, /*#__PURE__*/React.createElement(Select, {
      value: form.beschaeftigung,
      onChange: set('beschaeftigung'),
      options: ['Selbständig', 'Angestellte/r', 'Beamtin/Beamter', 'Arbeiter/in', 'in Ausbildung', 'sonstiges']
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Umfang"
    }, /*#__PURE__*/React.createElement(Select, {
      value: form.umfang,
      onChange: set('umfang'),
      options: ['Vollzeit', 'Teilzeit']
    }))), /*#__PURE__*/React.createElement(Field, {
      label: "Stunden pro Woche"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 260
      }
    }, /*#__PURE__*/React.createElement(TextInput, {
      type: "text",
      inputMode: "numeric",
      value: form.stunden,
      onChange: set('stunden'),
      placeholder: "z. B. 40"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderLeft: '3px solid var(--green)',
        paddingLeft: 22,
        margin: '8px 0 4px'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: '600 13px var(--font-sans)',
        color: 'var(--text)',
        margin: '0 0 14px'
      }
    }, "Berufliche Folgen des Fahrverbots"), /*#__PURE__*/React.createElement(YesNoField, {
      label: "Bedroht das Fahrverbot Ihre berufliche Existenz?",
      value: form.existenz,
      onChange: set('existenz')
    }), /*#__PURE__*/React.createElement(YesNoField, {
      label: "Besteht die Gefahr, den Arbeitsplatz zu verlieren?",
      value: form.arbeitsplatzGefahr,
      onChange: set('arbeitsplatzGefahr')
    }), /*#__PURE__*/React.createElement(YesNoField, {
      label: "Kann dies dokumentiert werden (z. B. Arbeitgeberbescheinigung)?",
      value: form.dokumentierbar,
      onChange: set('dokumentierbar')
    })), /*#__PURE__*/React.createElement(YesNoField, {
      label: "K\xF6nnen Sie das Fahrverbot ganz oder teilweise w\xE4hrend Ihres Urlaubs ableisten?",
      value: form.urlaub,
      onChange: set('urlaub')
    }), /*#__PURE__*/React.createElement(YesNoField, {
      label: "K\xF6nnen Sie Ihre Arbeitsorte mit \xF6ffentlichen Verkehrsmitteln / Taxi erreichen?",
      value: form.oepnv,
      onChange: set('oepnv')
    }), /*#__PURE__*/React.createElement(YesNoField, {
      label: "K\xF6nnen Sie einen Fahrer einstellen oder sich von Angeh\xF6rigen fahren lassen?",
      value: form.fahrerMoeglich,
      onChange: set('fahrerMoeglich')
    }), /*#__PURE__*/React.createElement(YesNoField, {
      label: "Lie\xDFe sich die Zeit des Fahrverbots durch eine Kombination der vorgenannten M\xF6glichkeiten \xFCberbr\xFCcken?",
      value: form.kombination,
      onChange: set('kombination')
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 26
      }
    }), /*#__PURE__*/React.createElement(Section, {
      num: "III.",
      title: "Private Verh\xE4ltnisse"
    }, /*#__PURE__*/React.createElement(ConditionalText, {
      label: "Sind Sie aus gesundheitlichen Gr\xFCnden auf ein Kfz angewiesen?",
      choice: form.gesundheit,
      onChoice: set('gesundheit'),
      detail: form.gesundheitDetail,
      onDetail: set('gesundheitDetail'),
      detailPlaceholder: "Bitte kurz erl\xE4utern.",
      rows: 2
    }), /*#__PURE__*/React.createElement(ConditionalText, {
      label: "Ben\xF6tigen Sie ein Kfz auch au\xDFerhalb der regul\xE4ren Arbeitszeiten (Bereitschaftsdienste, Pflege von Angeh\xF6rigen u. \xC4.)?",
      choice: form.ausserhalb,
      onChoice: set('ausserhalb'),
      detail: form.ausserhalbDetail,
      onDetail: set('ausserhalbDetail'),
      detailPlaceholder: "Bitte kurz erl\xE4utern.",
      rows: 2
    }), /*#__PURE__*/React.createElement(ConditionalText, {
      label: "Gibt es sonstige Gr\xFCnde, die ein Fahrverbot f\xFCr Sie unzumutbar machen?",
      choice: form.sonstige,
      onChoice: set('sonstige'),
      detail: form.sonstigeDetail,
      onDetail: set('sonstigeDetail'),
      detailPlaceholder: "Bitte schildern Sie die Gr\xFCnde.",
      rows: 4
    }), /*#__PURE__*/React.createElement(Field, {
      label: "Erg\xE4nzende Angaben",
      hint: "Optional \u2013 alles, was f\xFCr die Beurteilung wichtig sein k\xF6nnte."
    }, /*#__PURE__*/React.createElement(TextArea, {
      value: form.ergaenzung,
      onChange: set('ergaenzung'),
      rows: 3,
      placeholder: "Weitere Hinweise"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: '1px solid var(--border)',
        marginTop: 30,
        paddingTop: 24
      }
    }, /*#__PURE__*/React.createElement("label", {
      "data-error": !!errors.datenschutz,
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: form.datenschutz,
      onChange: e => set('datenschutz')(e.target.checked),
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
    }, "Ich habe die ", /*#__PURE__*/React.createElement("a", {
      href: "index.html#datenschutz",
      style: {
        color: 'var(--green)'
      }
    }, "Datenschutzerkl\xE4rung"), " gelesen und willige in die Verarbeitung meiner Angaben zur Bearbeitung meines Anliegens ein.", /*#__PURE__*/React.createElement(Req, null))), errors.datenschutz && /*#__PURE__*/React.createElement("p", {
      style: {
        ...hintStyle,
        color: 'var(--crimson)',
        marginLeft: 30
      }
    }, errors.datenschutz), hasErrors && /*#__PURE__*/React.createElement("p", {
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
    }, "Ihre Angaben werden direkt an die Kanzlei \xFCbermittelt."))))))));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Page, null));
}
mount();