/* Seiten-Chrome (Header, Navigation, Hero, Footer) liefert js/site-chrome.js → window.SiteChrome */

  /* ---- Versand-Konfiguration ---- */
  const RECIPIENT = 's.riess@fiedler-riess.de';      // Empfänger der Fragebögen
  const ENDPOINT = 'fahrverbotfragebogen.php';       // serverseitiger Mailversand (PHP)

  /* Feldgruppen + Beschriftungen für die E-Mail-Zusammenfassung (Fallback per mailto) */
  const FIELD_GROUPS = [
    ['Ihre Angaben', [['name','Name'],['strasse','Straße/Hausnr.'],['plz','PLZ'],['ort','Ort'],['email','E-Mail'],['telefon','Telefon'],['iban','IBAN']]],
    ['I. Persönliche und finanzielle Verhältnisse', [['staat','Staatsangehörigkeit'],['familienstand','Familienstand'],['einkommen','Einkommen netto (monatlich)'],['alleinverdiener','Alleinverdiener/in'],['haushaltseinkommen','Weiteres Haushaltseinkommen'],['haushaltseinkommenBetrag','Höhe Haushaltseinkommen (€/Monat)'],['unterhalt','Unterhaltsverpflichtungen'],['unterhaltBetrag','Unterhalt (€/Monat)'],['verbindlichkeiten','Sonstige Verbindlichkeiten'],['verbindlichkeitenBetrag','Verbindlichkeiten (€/Monat)']]],
    ['II. Berufliche Verhältnisse', [['beruf','Beruf'],['beschaeftigung','Beschäftigungsverhältnis'],['umfang','Beschäftigungsumfang'],['stunden','Stunden pro Woche'],['existenz','Fahrverbot bedroht berufliche Existenz'],['arbeitsplatzGefahr','Gefahr Arbeitsplatzverlust'],['dokumentierbar','Dokumentierbar'],['urlaub','Im Urlaub ableistbar'],['oepnv','Arbeitsort per ÖPNV/Taxi erreichbar'],['fahrerMoeglich','Fahrer/Angehörige möglich'],['kombination','Überbrückung durch Kombination']]],
    ['III. Private Verhältnisse', [['gesundheit','Aus gesundheitlichen Gründen auf Kfz angewiesen'],['gesundheitDetail','Erläuterung Gesundheit'],['ausserhalb','Kfz außerhalb der Arbeitszeit nötig'],['ausserhalbDetail','Erläuterung'],['sonstige','Sonstige Unzumutbarkeitsgründe'],['sonstigeDetail','Erläuterung Gründe'],['ergaenzung','Ergänzende Angaben']]],
  ];
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
    const CONTAINER = { maxWidth: 880, margin: '0 auto', padding: '0 20px' };

    /* Seiten-Chrome – außerhalb von Page, damit Eingabefelder den Fokus behalten. */
    const SiteChrome = window.SiteChrome;
    function Chrome({ children }) {
      return (
        <SiteChrome current="fragebogen" title="Fragebogen – Absehen von Fahrverbot"
          tagline="Ihre Angaben helfen uns, ein Absehen vom Fahrverbot zu begründen.">
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

    function Select({ value, onChange, options, placeholder }) {
      const [focus, setFocus] = React.useState(false);
      return (
        <select value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ ...baseInput, cursor: 'pointer', border: focus ? '1px solid var(--green)' : '1px solid var(--border)', boxShadow: focus ? '0 0 0 2px var(--green-tint)' : 'none', color: value ? 'var(--text)' : 'var(--text-faint)' }}>
          <option value="">{placeholder || 'Bitte wählen …'}</option>
          {options.map((o) => <option key={o} value={o} style={{ color: 'var(--text)' }}>{o}</option>)}
        </select>
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

    /* label + nein/ja; when "ja" reveal a € amount input */
    function ConditionalAmount({ label, hint, choice, onChoice, amount, onAmount, amountLabel }) {
      return (
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
            <label style={{ ...labelStyle, marginBottom: 0, flex: 1, minWidth: 220 }}>{label}</label>
            <YesNo value={choice} onChange={onChoice} />
          </div>
          {hint && <p style={hintStyle}>{hint}</p>}
          {choice === 'ja' && (
            <div style={{ marginTop: 12, maxWidth: 260 }}>
              <label style={{ ...labelStyle, font: '400 12.5px var(--font-sans)', color: 'var(--text-light)' }}>{amountLabel || 'Betrag (€ / Monat)'}</label>
              <TextInput type="text" inputMode="decimal" value={amount} onChange={onAmount} placeholder="z. B. 450" />
            </div>
          )}
        </div>
      );
    }

    /* label + nein/ja; when "ja" reveal a free-text detail */
    function ConditionalText({ label, hint, choice, onChoice, detail, onDetail, detailPlaceholder, rows = 3 }) {
      return (
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
            <label style={{ ...labelStyle, marginBottom: 0, flex: 1, minWidth: 220 }}>{label}</label>
            <YesNo value={choice} onChange={onChoice} />
          </div>
          {hint && <p style={hintStyle}>{hint}</p>}
          {choice === 'ja' && (
            <div style={{ marginTop: 12 }}>
              <TextArea rows={rows} value={detail} onChange={onDetail} placeholder={detailPlaceholder} />
            </div>
          )}
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
      // Mandant
      name: '', strasse: '', plz: '', ort: '', email: '', telefon: '', iban: '',
      // I. persönlich / finanziell
      staat: '', familienstand: '', einkommen: '', alleinverdiener: '',
      haushaltseinkommen: '', haushaltseinkommenBetrag: '',
      unterhalt: '', unterhaltBetrag: '', verbindlichkeiten: '', verbindlichkeitenBetrag: '',
      // II. beruflich
      beruf: '', beschaeftigung: '', umfang: '', stunden: '',
      existenz: '', arbeitsplatzGefahr: '', dokumentierbar: '',
      urlaub: '', oepnv: '', fahrerMoeglich: '', kombination: '',
      // III. privat
      gesundheit: '', gesundheitDetail: '', ausserhalb: '', ausserhalbDetail: '',
      sonstige: '', sonstigeDetail: '', ergaenzung: '',
      // consent
      datenschutz: false,
    };

    function Page() {
      const [form, setForm] = React.useState(EMPTY);
      const [errors, setErrors] = React.useState({});
      const [submitted, setSubmitted] = React.useState(false);
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

      if (submitted) {
        return (
          <Chrome>
            <main style={{ padding: '54px 0 20px' }}>
              <div style={{ ...CONTAINER, maxWidth: 620 }}>
                <div style={{ borderLeft: '3px solid var(--green)', background: 'var(--green-tint)', padding: '30px 32px' }}>
                  <h2 style={{ font: '300 24px var(--font-sans)', color: 'var(--text)', margin: '0 0 12px' }}>Vielen Dank, {form.name.split(' ')[0] || 'Ihre Angaben sind eingegangen'}.</h2>
                  <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', margin: '0 0 14px' }}>
                    Wir haben Ihre Angaben erhalten und prüfen, mit welchen Argumenten sich ein Absehen vom Fahrverbot begründen lässt. Wir melden uns kurzfristig bei Ihnen unter <strong>{form.email}</strong>.
                  </p>
                  <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text-light)', margin: 0 }}>
                    Halten Sie den Bußgeldbescheid sowie ggf. Nachweise zu Ihrer beruflichen Situation bereit – diese können wir im weiteren Verlauf nachfordern.
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
                Bei einem drohenden Fahrverbot kommt es auf Ihre persönlichen, beruflichen und finanziellen Verhältnisse an.
                Bitte füllen Sie den Fragebogen so vollständig wie möglich aus. Pflichtfelder sind mit <span style={{ color: 'var(--crimson)' }}>*</span> gekennzeichnet.
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
                  <Field label="IBAN" required hint="Für die finanzielle Abwicklung Ihres Mandats." error={errors.iban}>
                    <span data-error={!!errors.iban}>
                      <TextInput type="text" value={form.iban}
                        onChange={(v) => set('iban')(formatIban(v).slice(0, 42))}
                        error={errors.iban} placeholder="DE00 0000 0000 0000 0000 00" inputMode="text" autoComplete="off" />
                    </span>
                  </Field>
                </Section>

                <div style={{ height: 26 }} />

                {/* ---------- I. persönlich / finanziell ---------- */}
                <Section num="I." title="Persönliche und finanzielle Verhältnisse">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Field label="Staatsangehörigkeit">
                      <TextInput type="text" value={form.staat} onChange={set('staat')} placeholder="z. B. deutsch" />
                    </Field>
                    <Field label="Familienstand">
                      <Select value={form.familienstand} onChange={set('familienstand')}
                        options={['ledig', 'verheiratet', 'eingetragene Lebenspartnerschaft', 'getrennt lebend', 'geschieden', 'verwitwet']} />
                    </Field>
                  </div>
                  <Field label="Einkommen – monatlich netto" hint="Ungefährer Betrag in Euro.">
                    <div style={{ maxWidth: 260 }}>
                      <TextInput type="text" inputMode="decimal" value={form.einkommen} onChange={set('einkommen')} placeholder="z. B. 2.400 €" />
                    </div>
                  </Field>
                  <YesNoField label="Sind Sie Alleinverdiener/in?" value={form.alleinverdiener} onChange={set('alleinverdiener')} />
                  <ConditionalAmount label="Weiteres Einkommen im Haushalt?" choice={form.haushaltseinkommen} onChoice={set('haushaltseinkommen')}
                    amount={form.haushaltseinkommenBetrag} onAmount={set('haushaltseinkommenBetrag')} amountLabel="Höhe des Haushaltseinkommens (€ / Monat)" />
                  <ConditionalAmount label="Bestehen Unterhaltsverpflichtungen?" choice={form.unterhalt} onChoice={set('unterhalt')}
                    amount={form.unterhaltBetrag} onAmount={set('unterhaltBetrag')} amountLabel="Höhe (€ / Monat)" />
                  <ConditionalAmount label="Bestehen sonstige Verbindlichkeiten?" choice={form.verbindlichkeiten} onChoice={set('verbindlichkeiten')}
                    amount={form.verbindlichkeitenBetrag} onAmount={set('verbindlichkeitenBetrag')} amountLabel="Höhe (€ / Monat)" />
                </Section>

                <div style={{ height: 26 }} />

                {/* ---------- II. beruflich ---------- */}
                <Section num="II." title="Berufliche Verhältnisse">
                  <Field label="Beruf">
                    <TextInput type="text" value={form.beruf} onChange={set('beruf')} placeholder="Berufsbezeichnung" />
                  </Field>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <Field label="Beschäftigungsverhältnis">
                      <Select value={form.beschaeftigung} onChange={set('beschaeftigung')}
                        options={['Selbständig', 'Angestellte/r', 'Beamtin/Beamter', 'Arbeiter/in', 'in Ausbildung', 'sonstiges']} />
                    </Field>
                    <Field label="Umfang">
                      <Select value={form.umfang} onChange={set('umfang')} options={['Vollzeit', 'Teilzeit']} />
                    </Field>
                  </div>
                  <Field label="Stunden pro Woche">
                    <div style={{ maxWidth: 260 }}>
                      <TextInput type="text" inputMode="numeric" value={form.stunden} onChange={set('stunden')} placeholder="z. B. 40" />
                    </div>
                  </Field>

                  <div style={{ borderLeft: '3px solid var(--green)', paddingLeft: 22, margin: '8px 0 4px' }}>
                    <p style={{ font: '600 13px var(--font-sans)', color: 'var(--text)', margin: '0 0 14px' }}>Berufliche Folgen des Fahrverbots</p>
                    <YesNoField label="Bedroht das Fahrverbot Ihre berufliche Existenz?" value={form.existenz} onChange={set('existenz')} />
                    <YesNoField label="Besteht die Gefahr, den Arbeitsplatz zu verlieren?" value={form.arbeitsplatzGefahr} onChange={set('arbeitsplatzGefahr')} />
                    <YesNoField label="Kann dies dokumentiert werden (z. B. Arbeitgeberbescheinigung)?" value={form.dokumentierbar} onChange={set('dokumentierbar')} />
                  </div>

                  <YesNoField label="Können Sie das Fahrverbot ganz oder teilweise während Ihres Urlaubs ableisten?" value={form.urlaub} onChange={set('urlaub')} />
                  <YesNoField label="Können Sie Ihre Arbeitsorte mit öffentlichen Verkehrsmitteln / Taxi erreichen?" value={form.oepnv} onChange={set('oepnv')} />
                  <YesNoField label="Können Sie einen Fahrer einstellen oder sich von Angehörigen fahren lassen?" value={form.fahrerMoeglich} onChange={set('fahrerMoeglich')} />
                  <YesNoField label="Ließe sich die Zeit des Fahrverbots durch eine Kombination der vorgenannten Möglichkeiten überbrücken?" value={form.kombination} onChange={set('kombination')} />
                </Section>

                <div style={{ height: 26 }} />

                {/* ---------- III. privat ---------- */}
                <Section num="III." title="Private Verhältnisse">
                  <ConditionalText label="Sind Sie aus gesundheitlichen Gründen auf ein Kfz angewiesen?"
                    choice={form.gesundheit} onChoice={set('gesundheit')} detail={form.gesundheitDetail} onDetail={set('gesundheitDetail')}
                    detailPlaceholder="Bitte kurz erläutern." rows={2} />
                  <ConditionalText label="Benötigen Sie ein Kfz auch außerhalb der regulären Arbeitszeiten (Bereitschaftsdienste, Pflege von Angehörigen u. Ä.)?"
                    choice={form.ausserhalb} onChoice={set('ausserhalb')} detail={form.ausserhalbDetail} onDetail={set('ausserhalbDetail')}
                    detailPlaceholder="Bitte kurz erläutern." rows={2} />
                  <ConditionalText label="Gibt es sonstige Gründe, die ein Fahrverbot für Sie unzumutbar machen?"
                    choice={form.sonstige} onChoice={set('sonstige')} detail={form.sonstigeDetail} onDetail={set('sonstigeDetail')}
                    detailPlaceholder="Bitte schildern Sie die Gründe." rows={4} />
                  <Field label="Ergänzende Angaben" hint="Optional – alles, was für die Beurteilung wichtig sein könnte.">
                    <TextArea value={form.ergaenzung} onChange={set('ergaenzung')} rows={3} placeholder="Weitere Hinweise" />
                  </Field>
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
