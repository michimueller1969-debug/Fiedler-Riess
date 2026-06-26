/* Seiten-Chrome (Header, Navigation, Hero, Footer) liefert js/site-chrome.js → window.SiteChrome */

  /* ---- Versand-Konfiguration ---- */
  const RECIPIENT = 's.riess@fiedler-riess.de';   // Empfänger der Fragebögen
  const ENDPOINT = 'unfallfragebogen.php';        // serverseitiger Mailversand (PHP)

  /* Feldgruppen + Beschriftungen für die E-Mail-Zusammenfassung (Fallback per mailto) */
  const FIELD_GROUPS = [
    ['Ihre Angaben', [['name','Name'],['strasse','Straße/Hausnr.'],['plz','PLZ'],['ort','Ort'],['email','E-Mail'],['telefon','Telefon'],['iban','IBAN']]],
    ['I. Eigenes Fahrzeug', [['eigentuemer','Eigentümer'],['leasing','Leasingfahrzeug'],['leasingDetail','Leasing-Details'],['finanziert','Finanziert'],['finanziertDetail','Finanzierung-Details'],['fahrer','Fahrer zum Unfallzeitpunkt'],['scheckheft','Scheckheftgepflegt'],['vollkasko','Vollkasko'],['vollkaskoDetail','Vollkasko-Details'],['begutachtet','Begutachtet'],['begutachtetDetail','Sachverständigenbüro']]],
    ['II. Unfallgegner', [['gKennzeichen','Kennzeichen'],['gFahrer','Name/Anschrift Fahrer'],['gVersicherung','Haftpflichtversicherung'],['gVssNr','VSS-/Schadennr.']]],
    ['III. Unfall', [['uOrt','Unfallort'],['uDatum','Unfalltag'],['uZeit','Uhrzeit'],['zeugen','Zeugen'],['polizei','Polizei aufgenommen'],['polizeiDetail','Dienststelle/Az.'],['schilderung','Unfallschilderung']]],
    ['IV. Personenschäden', [['personenschaden','Person verletzt'],['psName','Name/Anschrift Verletzte/r'],['psKontakt','Kontakt'],['psGeburt','Geburtsdatum'],['khAufenthalt','Krankenhausaufenthalt'],['khVon','von'],['khBis','bis'],['khAnschrift','Krankenhaus-Anschrift'],['psArzt','Ärzte/Therapeuten'],['wegeunfall','Wegeunfall']]],
  ];
  function summaryText(f) {
    let out = 'Verkehrsunfall-Fragebogen\n';
    for (const [title, fields] of FIELD_GROUPS) {
      const lines = fields.filter(([k]) => String(f[k] == null ? '' : f[k]).trim() !== '').map(([k, l]) => l + ': ' + f[k]);
      if (lines.length) out += '\n' + title + '\n' + lines.join('\n') + '\n';
    }
    return out.trim();
  }
  function mailtoHref(f) {
    return 'mailto:' + RECIPIENT + '?subject=' + encodeURIComponent('Unfallfragebogen – ' + (f.name || '')) + '&body=' + encodeURIComponent(summaryText(f));
  }

  function mount() {
    const CONTAINER = { maxWidth: 880, margin: '0 auto', padding: '0 20px' };

    /* Seiten-Chrome (Header, Navigation, Hero, Footer) – außerhalb von Page,
       damit Eingabefelder beim Tippen nicht den Fokus verlieren. */
    const SiteChrome = window.SiteChrome;
    function Chrome({ children }) {
      return (
        <SiteChrome current="fragebogen" title="Verkehrsunfall-Fragebogen"
          tagline="Schildern Sie uns den Unfall – wir kümmern uns um die Regulierung.">
          {children}
        </SiteChrome>
      );
    }

    /* ---------- shared styles ---------- */
    const labelStyle = { display: 'block', font: '600 13px/1.5 var(--font-sans)', color: 'var(--text)', marginBottom: 7, letterSpacing: '0.01em' };
    const hintStyle = { font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--text-light)', marginTop: 5 };
    const baseInput = { width: '100%', padding: '11px 12px', font: '400 14px/1.5 var(--font-sans)', color: 'var(--text)', background: 'var(--white)', border: '1px solid var(--border)', outline: 'none', transition: 'border-color var(--ease)' };

    function fieldBorder(hasError) { return hasError ? '1px solid var(--crimson)' : '1px solid var(--border)'; }

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

    function TextInput({ value, onChange, error, focusable = true, ...rest }) {
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
              <button
                key={o.v}
                type="button"
                onClick={() => onChange(active ? '' : o.v)}
                style={{
                  font: '600 13px var(--font-sans)',
                  padding: '9px 22px',
                  border: 'none',
                  borderLeft: i === 0 ? 'none' : '1px solid var(--border)',
                  cursor: 'pointer',
                  background: active ? 'var(--green)' : 'var(--white)',
                  color: active ? 'var(--white)' : 'var(--text-light)',
                  transition: 'background var(--ease), color var(--ease)',
                }}
              >
                {o.l}
              </button>
            );
          })}
        </div>
      );
    }

    function Section({ num, title, children }) {
      return (
        <section style={{ marginBottom: 14 }}>
          <h2 style={{ font: '700 16px var(--font-sans)', color: 'var(--text)', margin: '0 0 18px', paddingBottom: 8, borderBottom: '2px solid var(--green)', display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ color: 'var(--green)', font: '700 14px var(--font-sans)' }}>{num}</span>
            {title}
          </h2>
          {children}
        </section>
      );
    }

    /* A label + nein/ja with a conditional detail text field */
    function ConditionalField({ label, hint, choice, onChoice, detailValue, onDetail, detailPlaceholder }) {
      return (
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>{label}</label>
          {hint && <p style={{ ...hintStyle, marginTop: 0, marginBottom: 10 }}>{hint}</p>}
          <YesNo value={choice} onChange={onChoice} />
          {choice === 'ja' && (
            <div style={{ marginTop: 12 }}>
              <TextInput type="text" value={detailValue} onChange={onDetail} placeholder={detailPlaceholder} />
            </div>
          )}
        </div>
      );
    }

    /* ---------- validation ---------- */
    function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }

    function normalizeIban(v) { return v.replace(/\s+/g, '').toUpperCase(); }
    function formatIban(v) { return normalizeIban(v).replace(/(.{4})/g, '$1 ').trim(); }
    function isValidIban(raw) {
      const iban = normalizeIban(raw);
      if (!/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(iban)) return false;
      // length per country (DE = 22); accept others but length-bound
      if (iban.length < 15 || iban.length > 34) return false;
      const rearr = iban.slice(4) + iban.slice(0, 4);
      const numeric = rearr.replace(/[A-Z]/g, (c) => (c.charCodeAt(0) - 55).toString());
      // mod 97 over a long numeric string
      let rem = 0;
      for (let i = 0; i < numeric.length; i++) rem = (rem * 10 + (numeric.charCodeAt(i) - 48)) % 97;
      return rem === 1;
    }

    const EMPTY = {
      // Mandant
      name: '', strasse: '', plz: '', ort: '', email: '', telefon: '', iban: '',
      // I. eigenes Fahrzeug
      eigentuemer: '', leasing: '', leasingDetail: '', finanziert: '', finanziertDetail: '',
      fahrer: '', scheckheft: '', vollkasko: '', vollkaskoDetail: '', begutachtet: '', begutachtetDetail: '',
      // II. Unfallgegner
      gKennzeichen: '', gFahrer: '', gVersicherung: '', gVssNr: '',
      // III. Unfall
      uOrt: '', uDatum: '', uZeit: '', zeugen: '', polizei: '', polizeiDetail: '', schilderung: '',
      // IV. Personenschäden
      personenschaden: '', psName: '', psKontakt: '', psGeburt: '',
      khAufenthalt: '', khVon: '', khBis: '', khAnschrift: '', psArzt: '', wegeunfall: '',
      // consent
      datenschutz: false,
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
            setSendError((data && data.error) || 'Der Fragebogen konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schicken Sie uns Ihre Angaben per E-Mail.');
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
                    Wir haben Ihre Angaben zum Unfallgeschehen erhalten und melden uns kurzfristig bei Ihnen unter <strong>{form.email}</strong>.
                  </p>
                  <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text-light)', margin: 0 }}>
                    Halten Sie Rechnungen, Gutachten und Belege bereit – diese können wir im weiteren Verlauf nachfordern.
                  </p>
                </div>
                <button type="button" onClick={() => { setForm(EMPTY); setErrors({}); setSubmitted(false); }}
                  style={{ marginTop: 22, background: 'none', border: '1px solid var(--border)', color: 'var(--text-light)', font: '600 13px var(--font-sans)', padding: '11px 20px', cursor: 'pointer' }}>
                  Neuen Fragebogen ausfüllen
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
                Bitte füllen Sie den Fragebogen so vollständig wie möglich aus. Pflichtfelder sind mit <span style={{ color: 'var(--crimson)' }}>*</span> gekennzeichnet.
                Rechnungen und sonstige Belege reichen wir später gemeinsam mit Ihnen nach.
              </p>

              <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 680, marginTop: 30 }}>

                {/* ---------- Mandant ---------- */}
                <Section num="" title="Ihre Angaben">
                  <Field label="Name (Mandant/in)" required error={errors.name}>
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
                    <Field label="Telefon" hint="Für kurzfristige Rückfragen.">
                      <TextInput type="tel" value={form.telefon} onChange={set('telefon')} placeholder="0151 23456789" autoComplete="tel" />
                    </Field>
                  </div>

                  <Field label="IBAN" required hint="Für die Auszahlung regulierter Schäden auf Ihr Konto." error={errors.iban}>
                    <span data-error={!!errors.iban}>
                      <TextInput type="text" value={form.iban}
                        onChange={(v) => set('iban')(formatIban(v).slice(0, 42))}
                        error={errors.iban} placeholder="DE00 0000 0000 0000 0000 00" inputMode="text" autoComplete="off" />
                    </span>
                  </Field>
                </Section>

                <div style={{ height: 26 }} />

                {/* ---------- I. eigenes Fahrzeug ---------- */}
                <Section num="I." title="Angaben zum eigenen Fahrzeug">
                  <Field label="Wer ist Eigentümer des Fahrzeugs?" hint="Bei Kauffahrzeugen bitte später eine Kopie des Kaufvertrags beifügen.">
                    <TextInput type="text" value={form.eigentuemer} onChange={set('eigentuemer')} placeholder="Name des Eigentümers" />
                  </Field>
                  <ConditionalField label="Handelt es sich um ein Leasingfahrzeug?" hint="Wenn ja: Leasinggeber und Vertrags-Nr. angeben."
                    choice={form.leasing} onChoice={set('leasing')} detailValue={form.leasingDetail} onDetail={set('leasingDetail')} detailPlaceholder="Leasinggeber / Vertrags-Nr." />
                  <ConditionalField label="Ist das Fahrzeug finanziert?" hint="Wenn ja: Darlehensgeber und Vertrags-Nr. angeben."
                    choice={form.finanziert} onChoice={set('finanziert')} detailValue={form.finanziertDetail} onDetail={set('finanziertDetail')} detailPlaceholder="Darlehensgeber / Vertrags-Nr." />
                  <Field label="Wer war Fahrer zum Unfallzeitpunkt?">
                    <TextInput type="text" value={form.fahrer} onChange={set('fahrer')} placeholder="Name des Fahrers" />
                  </Field>
                  <Field label="Ist das Fahrzeug scheckheftgepflegt?" hint="Wenn ja, bitte später das Serviceheft in Kopie beifügen.">
                    <YesNo value={form.scheckheft} onChange={set('scheckheft')} />
                  </Field>
                  <ConditionalField label="Besteht eine Vollkaskoversicherung?" hint="Wenn ja: Versicherer und VSS-Nr. angeben."
                    choice={form.vollkasko} onChoice={set('vollkasko')} detailValue={form.vollkaskoDetail} onDetail={set('vollkaskoDetail')} detailPlaceholder="Versicherer / VSS-Nr." />
                  <ConditionalField label="Wurde das Fahrzeug bereits begutachtet?" hint="Wenn ja: Sachverständigenbüro angeben, Gutachten ggf. nachreichen."
                    choice={form.begutachtet} onChoice={set('begutachtet')} detailValue={form.begutachtetDetail} onDetail={set('begutachtetDetail')} detailPlaceholder="Sachverständigenbüro" />
                </Section>

                <div style={{ height: 26 }} />

                {/* ---------- II. Unfallgegner ---------- */}
                <Section num="II." title="Angaben zum Unfallgegner">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Field label="Kennzeichen">
                      <TextInput type="text" value={form.gKennzeichen} onChange={set('gKennzeichen')} placeholder="z. B. HEF-AB 123" />
                    </Field>
                    <Field label="VSS-/Schadennummer">
                      <TextInput type="text" value={form.gVssNr} onChange={set('gVssNr')} placeholder="Versicherungs-/Schadennummer" />
                    </Field>
                  </div>
                  <Field label="Name und Anschrift des Fahrers">
                    <TextInput type="text" value={form.gFahrer} onChange={set('gFahrer')} placeholder="Name, Straße, PLZ, Ort" />
                  </Field>
                  <Field label="Wo ist das Kfz haftpflichtversichert?">
                    <TextInput type="text" value={form.gVersicherung} onChange={set('gVersicherung')} placeholder="Name der Haftpflichtversicherung" />
                  </Field>
                </Section>

                <div style={{ height: 26 }} />

                {/* ---------- III. Unfall ---------- */}
                <Section num="III." title="Informationen zum Unfall">
                  <Field label="Unfallort / Straße">
                    <TextInput type="text" value={form.uOrt} onChange={set('uOrt')} placeholder="Straße, Kreuzung, Ort" />
                  </Field>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Field label="Unfalltag">
                      <TextInput type="date" value={form.uDatum} onChange={set('uDatum')} />
                    </Field>
                    <Field label="Ungefähre Uhrzeit">
                      <TextInput type="time" value={form.uZeit} onChange={set('uZeit')} />
                    </Field>
                  </div>
                  <Field label="Name und Anschrift von Zeugen">
                    <TextArea value={form.zeugen} onChange={set('zeugen')} rows={2} placeholder="Name, Anschrift, ggf. Telefon" />
                  </Field>
                  <ConditionalField label="Hat die Polizei den Unfall aufgenommen?" hint="Wenn ja: aufnehmende Dienststelle und Aktenzeichen angeben."
                    choice={form.polizei} onChoice={set('polizei')} detailValue={form.polizeiDetail} onDetail={set('polizeiDetail')} detailPlaceholder="Dienststelle / Aktenzeichen" />
                  <Field label="Kurze Unfallschilderung" hint="Von wo nach wo fuhren Sie und der Unfallgegner? Geschwindigkeiten? Sicht- und Straßenverhältnisse? Was ist passiert?">
                    <TextArea value={form.schilderung} onChange={set('schilderung')} rows={6} placeholder="Schildern Sie den Unfallhergang in eigenen Worten." />
                  </Field>
                </Section>

                <div style={{ height: 26 }} />

                {/* ---------- IV. Personenschäden ---------- */}
                <Section num="IV." title="Personenschäden">
                  <Field label="Wurde eine Person verletzt?">
                    <YesNo value={form.personenschaden} onChange={set('personenschaden')} />
                  </Field>
                  {form.personenschaden === 'ja' && (
                    <div style={{ borderLeft: '3px solid var(--green)', paddingLeft: 22, marginTop: 4 }}>
                      <Field label="Name und Anschrift der verletzten Person">
                        <TextInput type="text" value={form.psName} onChange={set('psName')} placeholder="Name, Straße, PLZ, Ort" />
                      </Field>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 16 }}>
                        <Field label="Telefon (Festnetz/Mobil), Fax, E-Mail">
                          <TextInput type="text" value={form.psKontakt} onChange={set('psKontakt')} placeholder="Kontaktdaten" />
                        </Field>
                        <Field label="Geburtsdatum">
                          <TextInput type="date" value={form.psGeburt} onChange={set('psGeburt')} />
                        </Field>
                      </div>
                      <Field label="Krankenhausaufenthalt?">
                        <YesNo value={form.khAufenthalt} onChange={set('khAufenthalt')} />
                      </Field>
                      {form.khAufenthalt === 'ja' && (
                        <React.Fragment>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Field label="Von">
                              <TextInput type="date" value={form.khVon} onChange={set('khVon')} />
                            </Field>
                            <Field label="Bis">
                              <TextInput type="date" value={form.khBis} onChange={set('khBis')} />
                            </Field>
                          </div>
                          <Field label="Anschrift des Krankenhauses">
                            <TextInput type="text" value={form.khAnschrift} onChange={set('khAnschrift')} placeholder="Name und Anschrift" />
                          </Field>
                        </React.Fragment>
                      )}
                      <Field label="Ambulant behandelnde Ärzte / Therapeuten">
                        <TextInput type="text" value={form.psArzt} onChange={set('psArzt')} placeholder="Namen und Anschriften" />
                      </Field>
                      <Field label="Ereignete sich der Unfall auf dem Weg von oder zur Arbeitsstelle?">
                        <YesNo value={form.wegeunfall} onChange={set('wegeunfall')} />
                      </Field>
                    </div>
                  )}
                </Section>

                {/* ---------- consent + submit ---------- */}
                <div style={{ borderTop: '1px solid var(--border)', marginTop: 30, paddingTop: 24 }}>
                  <label data-error={!!errors.datenschutz} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.datenschutz} onChange={(e) => set('datenschutz')(e.target.checked)}
                      style={{ width: 18, height: 18, marginTop: 2, accentColor: 'var(--green)', flexShrink: 0 }} />
                    <span style={{ font: '400 13px/1.6 var(--font-sans)', color: 'var(--text-light)' }}>
                      Ich habe die <a href="index.html#datenschutz" style={{ color: 'var(--green)' }}>Datenschutzerklärung</a> gelesen und willige in die Verarbeitung meiner Angaben zur Bearbeitung meines Anliegens ein.<Req />
                    </span>
                  </label>
                  {errors.datenschutz && <p style={{ ...hintStyle, color: 'var(--crimson)', marginLeft: 30 }}>{errors.datenschutz}</p>}

                  {hasErrors && (
                    <p style={{ font: '400 13px/1.6 var(--font-sans)', color: 'var(--crimson)', marginTop: 18 }}>
                      Bitte prüfen Sie die rot markierten Felder.
                    </p>
                  )}

                  {sendError && (
                    <div style={{ borderLeft: '3px solid var(--crimson)', background: '#fbeaed', padding: '14px 18px', marginTop: 18 }}>
                      <p style={{ font: '400 13px/1.6 var(--font-sans)', color: 'var(--crimson)', margin: 0 }}>{sendError}</p>
                      <a href={mailtoHref(form)} style={{ font: '600 13px var(--font-sans)', color: 'var(--crimson)', display: 'inline-block', marginTop: 8 }}>Angaben per E-Mail senden &rsaquo;</a>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 22, flexWrap: 'wrap' }}>
                    <button type="submit" disabled={sending}
                      style={{ background: sending ? 'var(--green-dark)' : 'var(--green)', color: 'var(--white)', font: '600 15px var(--font-sans)', border: 'none', padding: '15px 34px', cursor: sending ? 'progress' : 'pointer', opacity: sending ? 0.85 : 1, transition: 'background var(--ease)' }}
                      onMouseEnter={(e) => { if (!sending) e.currentTarget.style.background = 'var(--green-dark)'; }}
                      onMouseLeave={(e) => { if (!sending) e.currentTarget.style.background = 'var(--green)'; }}>
                      {sending ? 'Wird gesendet …' : 'Fragebogen absenden'}
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