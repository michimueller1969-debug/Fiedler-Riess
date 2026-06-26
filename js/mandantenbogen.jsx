/* Seiten-Chrome (Header, Navigation, Hero, Footer) liefert js/site-chrome.js → window.SiteChrome */

  /* ---- Versand-Konfiguration ---- */
  const RECIPIENT = 's.riess@fiedler-riess.de';      // Empfänger der Bögen
  const ENDPOINT = 'mandantenbogen.php';             // serverseitige Verarbeitung (PHP)

  /* Feldgruppen + Beschriftungen für die E-Mail-Zusammenfassung (Fallback per mailto) */
  const FIELD_GROUPS = [
    ['Stammdaten', [['name','Name'],['strasse','Straße/Hausnr.'],['plz','PLZ'],['ort','Ort'],['email','E-Mail'],['telefon','Telefon'],['vorsteuer','Vorsteuerabzugsberechtigt']]],
    ['Bankverbindung', [['bank','Bank'],['iban','IBAN']]],
    ['Rechtsschutzversicherung', [['rsv','Rechtsschutzversicherung vorhanden'],['rsvName','Name der RSV'],['rsvSchein','Versicherungsschein-Nr.'],['rsvNehmer','Versicherungsnehmer'],['rsvSchaden','Schaden-Nr.'],['selbstbeteiligung','Selbstbeteiligung'],['selbstbeteiligungBetrag','Höhe Selbstbeteiligung']]],
    ['Angaben zum Mandat', [['inSachen','In Sachen (gegen wen / was)'],['wegen','Wegen (Gegenstand)']]],
    ['Einwilligungen', [['datenStr','Speicherung der Daten gem. Hinweisen'],['emailConsent','Unverschlüsselte E-Mail-/Fax-Kommunikation'],['sofortLeistung','Sofortiger Leistungsbeginn (Verzicht Widerruf)'],['datenschutz','Datenschutzerklärung']]],
  ];
  function jaNein(v) { return v === true ? 'Ja' : (v === false ? 'Nein' : v); }
  function summaryText(f) {
    let out = 'Mandantenbogen – Datenerfassung\n';
    for (const [title, fields] of FIELD_GROUPS) {
      const lines = fields
        .map(([k, l]) => [l, jaNein(f[k])])
        .filter(([, v]) => String(v == null ? '' : v).trim() !== '')
        .map(([l, v]) => l + ': ' + v);
      if (lines.length) out += '\n' + title + '\n' + lines.join('\n') + '\n';
    }
    return out.trim();
  }
  function mailtoHref(f) {
    return 'mailto:' + RECIPIENT + '?subject=' + encodeURIComponent('Mandantenbogen – ' + (f.name || '')) + '&body=' + encodeURIComponent(summaryText(f));
  }

  function mount() {
    const CONTAINER = { maxWidth: 880, margin: '0 auto', padding: '0 20px' };

    /* Seiten-Chrome – außerhalb von Page, damit Eingabefelder den Fokus behalten. */
    const SiteChrome = window.SiteChrome;
    function Chrome({ children }) {
      return (
        <SiteChrome current="mandant" title="Mandantenbogen"
          tagline="Datenerfassung für neue Mandantinnen und Mandanten.">
          {children}
        </SiteChrome>
      );
    }

    /* ---------- shared styles ---------- */
    const labelStyle = { display: 'block', font: '600 13px/1.5 var(--font-sans)', color: 'var(--text)', marginBottom: 7, letterSpacing: '0.01em' };
    const hintStyle = { font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--text-light)', marginTop: 5 };
    const baseInput = { width: '100%', padding: '11px 12px', font: '400 14px/1.5 var(--font-sans)', color: 'var(--text)', background: 'var(--white)', border: '1px solid var(--border)', outline: 'none', transition: 'border-color var(--ease)' };

    /* ---------- primitives ---------- */
    function Req() {
      return <span aria-hidden="true" style={{ color: 'var(--crimson)', marginLeft: 3 }}>*</span>;
    }

    function Field({ label, required, hint, error, children }) {
      return (
        <div style={{ marginBottom: 20 }}>
          {label && <label style={labelStyle}>{label}{required && <Req />}</label>}
          {children}
          {error
            ? <p style={{ ...hintStyle, color: 'var(--crimson)' }}>{error}</p>
            : (hint && <p style={hintStyle}>{hint}</p>)}
        </div>
      );
    }

    function TextInput({ value, onChange, error, ...rest }) {
      const [focus, setFocus] = React.useState(false);
      return (
        <input
          {...rest}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            ...baseInput,
            border: error ? '1px solid var(--crimson)' : (focus ? '1px solid var(--green)' : '1px solid var(--border)'),
            boxShadow: focus && !error ? '0 0 0 2px var(--green-tint)' : 'none',
          }}
        />
      );
    }

    function TextArea({ value, onChange, error, rows = 4, ...rest }) {
      const [focus, setFocus] = React.useState(false);
      return (
        <textarea
          {...rest}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            ...baseInput,
            border: error ? '1px solid var(--crimson)' : (focus ? '1px solid var(--green)' : '1px solid var(--border)'),
            boxShadow: focus && !error ? '0 0 0 2px var(--green-tint)' : 'none',
          }}
        />
      );
    }

    /* Segmented nein / ja control */
    function YesNo({ value, onChange }) {
      const opts = [{ v: 'nein', l: 'Nein' }, { v: 'ja', l: 'Ja' }];
      return (
        <div style={{ display: 'inline-flex', border: '1px solid var(--border)' }}>
          {opts.map((o, i) => {
            const active = value === o.v;
            return (
              <button key={o.v} type="button" onClick={() => onChange(active ? '' : o.v)}
                style={{ font: '600 13px var(--font-sans)', padding: '9px 22px', border: 'none', borderLeft: i === 0 ? 'none' : '1px solid var(--border)', cursor: 'pointer', background: active ? 'var(--green)' : 'var(--white)', color: active ? 'var(--white)' : 'var(--text-light)', transition: 'background var(--ease), color var(--ease)' }}>
                {o.l}
              </button>
            );
          })}
        </div>
      );
    }

    /* label + nein/ja on one row */
    function YesNoField({ label, hint, value, onChange }) {
      return (
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
            <label style={{ ...labelStyle, marginBottom: 0, flex: 1, minWidth: 220 }}>{label}</label>
            <YesNo value={value} onChange={onChange} />
          </div>
          {hint && <p style={hintStyle}>{hint}</p>}
        </div>
      );
    }

    /* consent checkbox */
    function Consent({ checked, onChange, error, children }) {
      return (
        <div style={{ marginBottom: 16 }}>
          <label data-error={!!error} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
              style={{ width: 18, height: 18, marginTop: 2, accentColor: 'var(--green)', flexShrink: 0 }} />
            <span style={{ font: '400 13px/1.6 var(--font-sans)', color: 'var(--text-light)' }}>{children}</span>
          </label>
          {error && <p style={{ ...hintStyle, color: 'var(--crimson)', marginLeft: 30 }}>{error}</p>}
        </div>
      );
    }

    function Section({ num, title, children }) {
      return (
        <section style={{ marginBottom: 14 }}>
          <h2 style={{ font: '700 16px var(--font-sans)', color: 'var(--text)', margin: '0 0 18px', paddingBottom: 8, borderBottom: '2px solid var(--green)', display: 'flex', alignItems: 'baseline', gap: 12 }}>
            {num ? <span style={{ color: 'var(--green)', font: '700 14px var(--font-sans)' }}>{num}</span> : null}
            {title}
          </h2>
          {children}
        </section>
      );
    }

    /* ---------- validation ---------- */
    function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }
    function normalizeIban(v) { return v.replace(/\s+/g, '').toUpperCase(); }
    function formatIban(v) { return normalizeIban(v).replace(/(.{4})/g, '$1 ').trim(); }
    function isValidIban(raw) {
      // Formatprüfung: Länderkürzel (2 Buchstaben) + 2 Prüfziffern + mind. 11 Zeichen
      // Die Prüfsumme (Mod 97) prüft die Bank; hier reicht die Struktur.
      const iban = normalizeIban(raw);
      return /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban) && iban.length >= 15 && iban.length <= 34;
    }

    const EMPTY = {
      // Stammdaten
      name: '', strasse: '', plz: '', ort: '', email: '', telefon: '', vorsteuer: '',
      // Bank
      bank: '', iban: '',
      // RSV
      rsv: '', rsvName: '', rsvSchein: '', rsvNehmer: '', rsvSchaden: '',
      selbstbeteiligung: '', selbstbeteiligungBetrag: '',
      // Mandat
      inSachen: '', wegen: '',
      // Einwilligungen
      datenStr: false, emailConsent: false, sofortLeistung: false, datenschutz: false,
    };

    function Page() {
      const [form, setForm] = React.useState(EMPTY);
      const [errors, setErrors] = React.useState({});
      const [submitted, setSubmitted] = React.useState(false);
      const [showNextPrompt, setShowNextPrompt] = React.useState(false);
      const [sending, setSending] = React.useState(false);
      const [sendError, setSendError] = React.useState('');
      const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

      function validate() {
        const e = {};
        if (!form.name.trim()) e.name = 'Bitte geben Sie Ihren Namen an.';
        if (!form.strasse.trim()) e.strasse = 'Bitte geben Sie Straße und Hausnummer an.';
        if (!form.plz.trim() || !form.ort.trim()) e.ort = 'Bitte geben Sie PLZ und Ort an.';
        if (!form.email.trim()) e.email = 'Bitte geben Sie Ihre E-Mail-Adresse an.';
        else if (!isEmail(form.email)) e.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
        if (!form.iban.trim()) e.iban = 'Bitte geben Sie Ihre IBAN an.';
        else if (!isValidIban(form.iban)) e.iban = 'Diese IBAN ist ungültig. Bitte prüfen Sie Ihre Eingabe.';
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          });
          let data = null;
          try { data = await res.json(); } catch (_) {}
          if (res.ok && data && data.ok) {
            setSubmitted(true);
            setShowNextPrompt(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            setSendError((data && data.error) || 'Der Mandantenbogen konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schicken Sie uns Ihre Angaben per E-Mail.');
          }
        } catch (err) {
          setSendError('Es besteht derzeit keine Verbindung zum Server. Bitte versuchen Sie es später erneut oder schicken Sie uns Ihre Angaben per E-Mail.');
        } finally {
          setSending(false);
        }
      }

      // Chrome ist oben (außerhalb von Page) definiert.

      if (showNextPrompt && submitted) {
        return (
          <Chrome>
            <section style={{ background: 'var(--white)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ ...CONTAINER, maxWidth: 500, textAlign: 'center' }}>
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '6px', padding: '40px 32px' }}>
                  <h2 style={{ font: '300 24px var(--font-sans)', color: 'var(--text)', margin: '0 0 16px' }}>Möchten Sie einen weiteren Fragebogen ausfüllen?</h2>
                  <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text-light)', margin: '0 0 28px' }}>Sie können jetzt einen weiteren Fragebogen starten oder zur Startseite zurückkehren.</p>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <a href="../index.html#fragebogen" style={{ background: 'var(--green)', color: 'var(--white)', border: 'none', font: '600 13px var(--font-sans)', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>Ja, weiterer Fragebogen</a>
                    <a href="../index.html" style={{ background: 'none', color: 'var(--text-light)', border: '1px solid var(--border)', font: '600 13px var(--font-sans)', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>Nein, zur Startseite</a>
                  </div>
                </div>
              </div>
            </section>
          </Chrome>
        );
      }

      if (submitted) {
        return (
          <Chrome>
            <main style={{ padding: '54px 0 20px' }}>
              <div style={{ ...CONTAINER, maxWidth: 620 }}>
                <div style={{ borderLeft: '3px solid var(--green)', background: 'var(--green-tint)', padding: '30px 32px' }}>
                  <h2 style={{ font: '300 24px var(--font-sans)', color: 'var(--text)', margin: '0 0 12px' }}>Vielen Dank, {form.name.split(' ')[0] || 'Ihre Angaben sind eingegangen'}.</h2>
                  <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', margin: '0 0 14px' }}>
                    Wir haben Ihre Mandantendaten erhalten und legen Ihre Akte an. Für die Bearbeitung melden wir uns bei Ihnen unter <strong>{form.email}</strong>.
                  </p>
                  <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text-light)', margin: 0 }}>
                    Die Vollmacht und die übrigen Unterlagen besprechen und unterzeichnen wir gemeinsam zu Mandatsbeginn.
                  </p>
                </div>
                <button type="button" onClick={() => { setForm(EMPTY); setErrors({}); setSubmitted(false); }}
                  style={{ marginTop: 22, background: 'none', border: '1px solid var(--border)', color: 'var(--text-light)', font: '600 13px var(--font-sans)', padding: '11px 20px', cursor: 'pointer' }}>
                  Neuen Bogen ausfüllen
                </button>
              </div>
            </main>
          </Chrome>
        );
      }

      const hasErrors = Object.keys(errors).length > 0;

      return (
        <Chrome>
          <main style={{ padding: '40px 0 10px' }}>
            <div style={CONTAINER}>
              <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text-light)', maxWidth: 680, marginTop: 0, marginBottom: 8 }}>
                Bitte füllen Sie diesen Bogen in Ihrem eigenen Interesse vollständig aus, damit wir Sie in Notfällen umgehend erreichen
                und empfangene Gelder überweisen können. Ihre Daten werden vertraulich behandelt und dienen ausschließlich der
                ordnungsgemäßen Mandatsführung. Pflichtfelder sind mit <span style={{ color: 'var(--crimson)' }}>*</span> gekennzeichnet.
              </p>

              <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 680, marginTop: 30 }}>

                {/* ---------- Stammdaten ---------- */}
                <Section title="Stammdaten">
                  <Field label="Name" required error={errors.name}>
                    <span data-error={!!errors.name}>
                      <TextInput type="text" value={form.name} onChange={set('name')} error={errors.name} placeholder="Vor- und Nachname" autoComplete="name" />
                    </span>
                  </Field>
                  <Field label="Straße und Hausnummer" required error={errors.strasse}>
                    <span data-error={!!errors.strasse}>
                      <TextInput type="text" value={form.strasse} onChange={set('strasse')} error={errors.strasse} placeholder="z. B. Rotenburger Str. 17" autoComplete="street-address" />
                    </span>
                  </Field>
                  <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16 }}>
                    <Field label="PLZ" required error={errors.ort ? ' ' : null}>
                      <span data-error={!!errors.ort}>
                        <TextInput type="text" value={form.plz} onChange={set('plz')} error={errors.ort} placeholder="36199" autoComplete="postal-code" inputMode="numeric" />
                      </span>
                    </Field>
                    <Field label="Ort" required error={errors.ort}>
                      <TextInput type="text" value={form.ort} onChange={set('ort')} error={errors.ort} placeholder="Rotenburg a.d. Fulda" autoComplete="address-level2" />
                    </Field>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Field label="E-Mail" required error={errors.email}>
                      <span data-error={!!errors.email}>
                        <TextInput type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="name@beispiel.de" autoComplete="email" />
                      </span>
                    </Field>
                    <Field label="Telefon" hint="Für Rückfragen und Notfälle.">
                      <TextInput type="tel" value={form.telefon} onChange={set('telefon')} placeholder="0151 23456789" autoComplete="tel" />
                    </Field>
                  </div>
                  <YesNoField label="Vorsteuerabzugsberechtigt?" value={form.vorsteuer} onChange={set('vorsteuer')} />
                </Section>

                <div style={{ height: 26 }} />

                {/* ---------- Bankverbindung ---------- */}
                <Section title="Bankverbindung">
                  <p style={{ ...hintStyle, marginTop: 0, marginBottom: 16 }}>Für die Überweisung empfangener Gelder auf Ihr Konto.</p>
                  <Field label="Bank">
                    <TextInput type="text" value={form.bank} onChange={set('bank')} placeholder="Name des Kreditinstituts" />
                  </Field>
                  <Field label="IBAN" required error={errors.iban}>
                    <span data-error={!!errors.iban}>
                      <TextInput type="text" value={form.iban}
                        onChange={(v) => set('iban')(formatIban(v).slice(0, 42))}
                        error={errors.iban} placeholder="DE00 0000 0000 0000 0000 00" inputMode="text" autoComplete="off" />
                    </span>
                  </Field>
                </Section>

                <div style={{ height: 26 }} />

                {/* ---------- Rechtsschutzversicherung ---------- */}
                <Section title="Rechtsschutzversicherung">
                  <YesNoField label="Besteht eine Rechtsschutzversicherung?" value={form.rsv} onChange={set('rsv')} />
                  {form.rsv === 'ja' && (
                    <div style={{ borderLeft: '3px solid var(--green)', paddingLeft: 22, marginTop: 4 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Field label="Name der Versicherung">
                          <TextInput type="text" value={form.rsvName} onChange={set('rsvName')} placeholder="z. B. ARAG, ADAC …" />
                        </Field>
                        <Field label="Versicherungsschein-Nr.">
                          <TextInput type="text" value={form.rsvSchein} onChange={set('rsvSchein')} placeholder="Schein-Nr." />
                        </Field>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Field label="Versicherungsnehmer">
                          <TextInput type="text" value={form.rsvNehmer} onChange={set('rsvNehmer')} placeholder="falls abweichend" />
                        </Field>
                        <Field label="Schaden-Nr.">
                          <TextInput type="text" value={form.rsvSchaden} onChange={set('rsvSchaden')} placeholder="falls bekannt" />
                        </Field>
                      </div>
                      <YesNoField label="Ist eine Selbstbeteiligung vereinbart?" value={form.selbstbeteiligung} onChange={set('selbstbeteiligung')} />
                      {form.selbstbeteiligung === 'ja' && (
                        <Field label="Höhe der Selbstbeteiligung">
                          <div style={{ maxWidth: 260 }}>
                            <TextInput type="text" inputMode="decimal" value={form.selbstbeteiligungBetrag} onChange={set('selbstbeteiligungBetrag')} placeholder="z. B. 150 €" />
                          </div>
                        </Field>
                      )}
                    </div>
                  )}
                </Section>

                <div style={{ height: 26 }} />

                {/* ---------- Angaben zum Mandat ---------- */}
                <Section title="Angaben zum Mandat">
                  <p style={{ ...hintStyle, marginTop: 0, marginBottom: 16 }}>Worum geht es? Diese Angaben helfen uns bei der Vorbereitung – die Vollmacht selbst unterzeichnen wir gemeinsam.</p>
                  <Field label="In Sachen (gegen wen / was)">
                    <TextInput type="text" value={form.inSachen} onChange={set('inSachen')} placeholder="z. B. Gegenseite, Behörde, Arbeitgeber …" />
                  </Field>
                  <Field label="Wegen (Gegenstand des Mandats)">
                    <TextArea value={form.wegen} onChange={set('wegen')} rows={3} placeholder="Kurze Beschreibung Ihres Anliegens" />
                  </Field>
                </Section>

                <div style={{ height: 26 }} />

                {/* ---------- Einwilligungen ---------- */}
                <Section title="Erklärungen und Einwilligungen">
                  <Consent checked={form.datenStr} onChange={set('datenStr')} error={errors.datenStr}>
                    Ich bin mit der Speicherung meiner Daten gemäß den <a href="index.html#datenschutz" style={{ color: 'var(--green)' }}>Hinweisen zur Datenverarbeitung</a> einverstanden. Mir ist bekannt, dass die Daten elektronisch gespeichert werden.<Req />
                  </Consent>
                  <Consent checked={form.emailConsent} onChange={set('emailConsent')}>
                    Ich wünsche ausdrücklich die Kommunikation per <strong>unverschlüsselter E-Mail und/oder Telefax</strong> und bin auf die damit verbundenen Risiken hingewiesen worden. Diese Erklärung kann ich jederzeit widerrufen. <span style={{ color: 'var(--text-faint)' }}>(optional)</span>
                  </Consent>
                  <Consent checked={form.sofortLeistung} onChange={set('sofortLeistung')}>
                    Ich wünsche, dass die Kanzlei bereits <strong>vor Ablauf der 14-tägigen Widerrufsfrist</strong> mit der Tätigkeit beginnt. Mir ist bekannt, dass ich bei Widerruf bereits erbrachte Leistungen zu vergüten habe und mein Widerrufsrecht bei vollständiger Erfüllung erlischt. <span style={{ color: 'var(--text-faint)' }}>(optional)</span>
                  </Consent>
                  <Consent checked={form.datenschutz} onChange={set('datenschutz')} error={errors.datenschutz}>
                    Ich habe die <a href="index.html#datenschutz" style={{ color: 'var(--green)' }}>Datenschutzerklärung</a> gelesen und willige in die Verarbeitung meiner Angaben zur Bearbeitung meines Anliegens ein.<Req />
                  </Consent>
                </Section>

                {/* ---------- submit ---------- */}
                <div style={{ borderTop: '1px solid var(--border)', marginTop: 22, paddingTop: 24 }}>
                  {hasErrors && (
                    <p style={{ font: '400 13px/1.6 var(--font-sans)', color: 'var(--crimson)', marginBottom: 18 }}>
                      Bitte prüfen Sie die rot markierten Felder.
                    </p>
                  )}

                  {sendError && (
                    <div style={{ borderLeft: '3px solid var(--crimson)', background: '#fbeaed', padding: '14px 18px', marginBottom: 18 }}>
                      <p style={{ font: '400 13px/1.6 var(--font-sans)', color: 'var(--crimson)', margin: 0 }}>{sendError}</p>
                      <a href={mailtoHref(form)} style={{ font: '600 13px var(--font-sans)', color: 'var(--crimson)', display: 'inline-block', marginTop: 8 }}>Angaben per E-Mail senden &rsaquo;</a>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
                    <button type="submit" disabled={sending}
                      style={{ background: sending ? 'var(--green-dark)' : 'var(--green)', color: 'var(--white)', font: '600 15px var(--font-sans)', border: 'none', padding: '15px 34px', cursor: sending ? 'progress' : 'pointer', opacity: sending ? 0.85 : 1, transition: 'background var(--ease)' }}
                      onMouseEnter={(e) => { if (!sending) e.currentTarget.style.background = 'var(--green-dark)'; }}
                      onMouseLeave={(e) => { if (!sending) e.currentTarget.style.background = 'var(--green)'; }}>
                      {sending ? 'Wird gesendet …' : 'Mandantenbogen absenden'}
                    </button>
                    <span style={{ font: '400 12.5px var(--font-sans)', color: 'var(--text-faint)' }}>Ihre Angaben werden direkt an die Kanzlei übermittelt.</span>
                  </div>
                </div>

              </form>
            </div>
          </main>
        </Chrome>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<Page />);
  }
  mount();
