/* Inline component library for the standalone build — no imports/exports,
   defines the DS namespace directly so the app code works unchanged. */
const { Fragment } = React;

function Button({ variant = 'primary', size = 'md', as = 'button', children, style, ...props }) {
  const base = {
    fontFamily: 'var(--font-sans)', fontWeight: variant === 'text' ? 'var(--fw-regular)' : 'var(--fw-semibold)',
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    textDecoration: 'none', border: '1px solid transparent', borderRadius: 'var(--radius-none)',
    transition: 'background var(--ease), color var(--ease), border-color var(--ease)', lineHeight: 1,
  };
  const sizes = { sm: { fontSize: '12.5px', padding: '7px 16px' }, md: { fontSize: '13px', padding: '9px 20px' }, lg: { fontSize: '14px', padding: '12px 26px' } };
  const variants = {
    primary: { background: 'var(--green)', color: 'var(--white)', borderColor: 'var(--green)' },
    secondary: { background: 'var(--white)', color: 'var(--text)', borderColor: 'var(--border)' },
    text: { background: 'transparent', color: 'var(--green)', borderColor: 'transparent', padding: 0 },
  };
  const Tag = as;
  return <Tag className={`fr-btn fr-btn--${variant}`} style={{ ...base, ...sizes[size], ...variants[variant], ...style }} {...props}>{children}</Tag>;
}

function Card({ header, accent = false, interactive = false, children, style, bodyStyle, ...props }) {
  const accentStyle = accent
    ? { background: 'var(--light)', borderLeft: '3px solid var(--green)', border: 'none' }
    : { background: 'var(--surface-card)', border: '1px solid var(--border)' };
  return (
    <div className={interactive ? 'fr-card--interactive' : undefined} style={{ borderRadius: 'var(--radius-none)', ...accentStyle, ...style }} {...props}>
      {header && (
        <div style={{ background: 'var(--green)', color: 'var(--white)', fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-bold)', fontSize: '13.5px', textAlign: 'center', padding: '9px 14px', letterSpacing: 'var(--ls-label)' }}>{header}</div>
      )}
      <div style={{ padding: accent ? '20px 24px' : '14px 16px', ...bodyStyle }}>{children}</div>
    </div>
  );
}

const FR_GLYPHS = {
  mail: 'M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z',
  phone: 'M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
};
function ContactIcon({ icon = 'mail', label, href = '#', style, ...props }) {
  const vb = icon === 'linkedin' ? '0 0 24 24' : '0 0 20 20';
  return (
    <a className="fr-contact-icon" href={href} title={label} aria-label={label}
      style={{ width: '28px', height: '28px', border: '1px solid var(--green)', color: 'var(--green)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-none)', ...style }} {...props}>
      <svg viewBox={vb} style={{ width: '13px', height: '13px', fill: 'currentColor' }}><path d={FR_GLYPHS[icon]} /></svg>
    </a>
  );
}

function PracticeCard({ area, items = [], href = '#', moreLabel = '» mehr erfahren', style, ...props }) {
  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-none)', height: '100%', display: 'flex', flexDirection: 'column', ...style }} {...props}>
      <div style={{ background: 'var(--green)', color: 'var(--white)', fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-bold)', fontSize: '13.5px', textAlign: 'center', padding: '9px 14px', letterSpacing: 'var(--ls-label)' }}>{area}</div>
      <div style={{ padding: '14px 16px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ul style={{ listStyle: 'disc', paddingLeft: '16px', marginBottom: '12px' }}>
          {items.map((it, i) => <li key={i} style={{ fontSize: '12.5px', color: 'var(--text)', lineHeight: 1.55, marginBottom: '3px' }}>{it}</li>)}
        </ul>
        <a className="fr-morelink" href={href} style={{ fontSize: '12px', color: 'var(--green)', textDecoration: 'none', marginTop: 'auto' }}>{moreLabel}</a>
      </div>
    </div>
  );
}

function PartnerCard({ name, photo, initials, title = [], contacts = [], style, ...props }) {
  return (
    <div style={{ width: '210px', textAlign: 'center', ...style }} {...props}>
      <div style={{ background: 'var(--green)', color: 'var(--white)', fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-semibold)', fontSize: '13px', padding: '8px 10px', marginBottom: '14px' }}>{name}</div>
      <div style={{ width: '150px', height: '150px', borderRadius: '50%', margin: '0 auto 12px', overflow: 'hidden', background: '#d0d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {photo ? <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '42px', color: '#999', fontWeight: 'var(--fw-light)' }}>{initials}</span>}
      </div>
      <div style={{ fontSize: '11.5px', color: 'var(--text-light)', lineHeight: 1.55, marginBottom: '12px' }}>
        {title.map((line, i) => <Fragment key={i}>{line}{i < title.length - 1 && <br />}</Fragment>)}
      </div>
      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
        {contacts.map((c, i) => <ContactIcon key={i} icon={c.icon} label={c.label} href={c.href} />)}
      </div>
    </div>
  );
}

function NavRail({ items = [], variant = 'charcoal', style, ...props }) {
  const transparent = variant === 'transparent';
  return (
    <nav className={transparent ? 'fr-nav--transparent' : 'fr-nav--charcoal'} style={{ background: transparent ? 'transparent' : 'var(--charcoal)', width: transparent ? 'auto' : 'var(--nav-w)', display: transparent ? 'inline-block' : 'block', ...style }} {...props}>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', paddingTop: '6px' }}>
        {items.map((item, i) => <FRNavItem key={i} item={item} transparent={transparent} />)}
      </ul>
    </nav>
  );
}
function FRNavItem({ item, transparent }) {
  const hasKids = item.children && item.children.length > 0;
  const itemColor = transparent ? 'var(--green)' : 'var(--white)';
  const ddBg = transparent ? 'rgba(245,245,243,0.62)' : 'var(--charcoal)';
  const subColor = transparent ? 'var(--green)' : 'rgba(255,255,255,.85)';
  const enter = (e) => { const dd = e.currentTarget.querySelector(':scope > .fr-dropdown'); if (dd) dd.style.display = 'block'; };
  const leave = (e) => { const dd = e.currentTarget.querySelector(':scope > .fr-dropdown'); if (dd) dd.style.display = 'none'; };
  return (
    <li className="fr-nav-li" style={{ position: 'relative' }} onMouseEnter={enter} onMouseLeave={leave}>
      <a className={transparent ? 'fr-nav-item fr-nav-item--t' : 'fr-nav-item'} href={item.href || '#'} onClick={item.onClick}
        style={{ display: 'block', padding: transparent ? '14px 22px' : '11px 16px', color: itemColor, fontFamily: 'var(--font-sans)', fontSize: transparent ? '17px' : '12.5px', fontWeight: 'var(--fw-semibold)', letterSpacing: 'var(--ls-nav)', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none', borderRight: item.active ? '3px solid var(--green)' : '3px solid transparent', transition: 'background var(--ease)' }}>
        {item.label}{hasKids ? ' ›' : ''}
      </a>
      {hasKids && (
        <ul className="fr-dropdown" style={{ display: 'none', position: 'absolute', top: 0, left: '100%', minWidth: '200px', background: ddBg, borderLeft: transparent ? 'none' : '2px solid var(--green)', zIndex: 300, listStyle: 'none' }}>
          {item.children.map((c, j) => <FRSubItem key={j} item={c} transparent={transparent} ddBg={ddBg} subColor={subColor} />)}
        </ul>
      )}
    </li>
  );
}
function FRSubItem({ item, transparent, ddBg, subColor }) {
  const hasKids = item.children && item.children.length > 0;
  const enter = (e) => { const dd = e.currentTarget.querySelector(':scope > .fr-dropdown'); if (dd) dd.style.display = 'block'; };
  const leave = (e) => { const dd = e.currentTarget.querySelector(':scope > .fr-dropdown'); if (dd) dd.style.display = 'none'; };
  return (
    <li style={{ position: 'relative' }} onMouseEnter={enter} onMouseLeave={leave}>
      <a className={transparent ? 'fr-nav-sub fr-nav-sub--t' : 'fr-nav-sub'} href={item.href || '#'} onClick={item.onClick}
        style={{ display: 'block', padding: transparent ? '12px 22px' : '9px 16px', color: subColor, fontFamily: 'var(--font-sans)', fontSize: transparent ? '16px' : '12.5px', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'background var(--ease)' }}>
        {item.label}{hasKids ? '  ›' : ''}
      </a>
      {hasKids && (
        <ul className="fr-dropdown" style={{ display: 'none', position: 'absolute', top: 0, left: '100%', minWidth: '200px', background: ddBg, borderLeft: transparent ? 'none' : '2px solid var(--green)', zIndex: 300, listStyle: 'none' }}>
          {item.children.map((c, k) => <FRSubItem key={k} item={c} transparent={transparent} ddBg={ddBg} subColor={subColor} />)}
        </ul>
      )}
    </li>
  );
}

window.FiedlerRieDesignSystem_490d4c = { Button, Card, ContactIcon, PracticeCard, PartnerCard, NavRail };


/* ===== CHROME ===== */
/* ============================================
   Fiedler & Rieß — Website UI Kit · Chrome
   Header brand, hero slider, footer, cookie banner.
   Composes NavRail from the design-system bundle.
   ============================================ */
const { useState, useEffect } = React;
// components defined inline

const NAV_ITEMS = (go, current) => ([
  { label: 'Start', href: '#', active: current === 'home', onClick: (e) => { e.preventDefault(); go('home'); } },
  { label: 'Rechtsgebiete', href: '#', active: current === 'practice',
    children: [
      { label: 'Arbeitsrecht', href: '#', onClick: (e) => { e.preventDefault(); go('practice'); } },
      { label: 'Verkehrsrecht', href: '#', onClick: (e) => { e.preventDefault(); go('practice'); } },
      { label: 'Jagdrecht', href: '#', onClick: (e) => { e.preventDefault(); go('practice'); } },
    ] },
  { label: 'Karriere', href: '#', active: current === 'karriere', onClick: (e) => { e.preventDefault(); go('karriere'); } },
  { label: 'Anfahrt', href: '#', active: current === 'anfahrt', onClick: (e) => { e.preventDefault(); go('anfahrt'); } },
]);

function HeaderBrand({ go }) {
  return (
    <header style={{ background: 'var(--white)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '44px 20px 40px' }}>
        <div style={{ display: 'inline-block', textAlign: 'left', borderLeft: '1px solid var(--border)', paddingLeft: 22, cursor: 'pointer' }} onClick={() => go('home')}>
          <span style={{ font: '300 42px/1.18 var(--font-sans)', color: 'var(--green)', display: 'block' }}>Fiedler &amp; Rieß</span>
          <span style={{ font: '300 18px/1.3 var(--font-sans)', color: 'var(--green)', display: 'block', marginTop: 2 }}>Rechtsanwälte PartGmbB</span>
        </div>
      </div>
    </header>
  );
}

function Hero({ children }) {
  const [cur, setCur] = useState(0);
  const slides = ['img/hero1.png', 'img/hero2.png'];
  useEffect(() => {
    const t = setInterval(() => setCur((c) => (c + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'relative' }}>
      {children}
      <div style={{ height: 310, position: 'relative', overflow: 'hidden', background: '#4a4a4a' }}>
        {slides.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0, backgroundImage: `url('${s}')`,
            backgroundSize: 'cover', backgroundPosition: 'center 30%', backgroundRepeat: 'no-repeat',
            transform: i === cur ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 1.1s ease', opacity: i === cur ? 1 : 0,
          }} />
        ))}
      </div>
    </div>
  );
}

function KanzleiBox({ style }) {
  return (
    <div style={{ borderLeft: '1px solid var(--border)', padding: '2px 0 2px 18px', textAlign: 'left', ...style }}>
      <span style={{ font: '700 14px var(--font-sans)', color: 'var(--green)', display: 'block' }}>Fiedler &amp; Rieß</span>
      <span style={{ font: '600 12px var(--font-sans)', color: 'var(--text-light)' }}>Rechtsanwälte PartGmbB</span>
    </div>
  );
}

function PageHeader({ title, tagline }) {
  return (
    <div style={{ background: 'var(--white)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '34px 20px 8px', display: 'flex', alignItems: 'flex-start', gap: 50 }}>
        <div style={{ maxWidth: 760, flex: 1 }}>
          <h1 style={{ font: '300 30px var(--font-sans)', color: 'var(--text)', display: 'inline-block', paddingBottom: 8, borderBottom: '2px solid var(--green)' }}>{title}</h1>
          {tagline && <p style={{ font: '400 14px var(--font-sans)', color: 'var(--text-light)', marginTop: 12 }}>{tagline}</p>}
        </div>
        <aside style={{ flex: '0 0 220px', borderLeft: '1px solid var(--border)', paddingLeft: 24, textAlign: 'center' }}>
          <KanzleiBox style={{ border: 'none', padding: 0, textAlign: 'center' }} />
        </aside>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', padding: '15px 0' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <span style={{ color: 'var(--green)', font: '700 13px var(--font-sans)', display: 'block' }}>Fiedler &amp; Rieß Rechtsanwälte PartGmbB</span>
          <span style={{ color: 'var(--text-light)', font: '400 12px var(--font-sans)' }}>Rotenburger Str. 17 · 36199 Rotenburg a.d. Fulda</span>
        </div>
        <nav style={{ display: 'flex', gap: 20 }}>
          <a href="#" style={{ color: 'var(--green)', font: '400 13px var(--font-sans)' }}>Impressum</a>
          <a href="#" style={{ color: 'var(--green)', font: '400 13px var(--font-sans)' }}>Datenschutz</a>
        </nav>
      </div>
    </footer>
  );
}

function CookieBanner({ onClose }) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--white)', borderTop: '1px solid var(--border)', padding: '18px 20px', zIndex: 9999, boxShadow: '0 -3px 12px rgba(0,0,0,.09)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <h3 style={{ font: '700 14px var(--font-sans)', marginBottom: 6 }}>Cookie-Einstellungen</h3>
        <p style={{ font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--text-light)', marginBottom: 14 }}>Diese Webseite verwendet Cookies, um Besuchern ein optimales Nutzererlebnis zu bieten. Bestimmte Inhalte von Drittanbietern werden nur angezeigt, wenn die entsprechende Option aktiviert ist. Weitere Informationen in der <a href="#" style={{ color: 'var(--green)' }}>Datenschutzerklärung</a>.</p>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5, font: '400 12.5px var(--font-sans)' }}><input type="checkbox" checked disabled style={{ accentColor: 'var(--green)' }} /> Technisch notwendige</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5, font: '400 12.5px var(--font-sans)' }}><input type="checkbox" style={{ accentColor: 'var(--green)' }} /> Analytische</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5, font: '400 12.5px var(--font-sans)' }}><input type="checkbox" style={{ accentColor: 'var(--green)' }} /> Drittanbieter-Inhalte</label>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={onClose}>Ablehnen</Button>
          <Button variant="primary" onClick={onClose}>Alle akzeptieren</Button>
          <Button variant="secondary" onClick={onClose}>Speichern</Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeaderBrand, Hero, PageHeader, KanzleiBox, Footer, CookieBanner, NAV_ITEMS, NavRail });


/* ===== SCREENS ===== */
/* ============================================
   Fiedler & Rieß — Website UI Kit · Screens
   Home, Practice (Arbeitsrecht), Fragebogen, Anfahrt, Karriere.
   Composes DS components: PracticeCard, PartnerCard, Card, Button.
   ============================================ */
// components defined inline
const FRBox = window.KanzleiBox;

const CONTAINER = { maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 20px' };

/* ---------- HOME ---------- */
function HomeScreen({ go }) {
  return (
    <div>
      {/* Intro */}
      <section style={{ background: 'var(--white)', padding: '40px 0 30px' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'flex-start', gap: 50 }}>
          <h1 style={{ font: '300 30px/1.35 var(--font-sans)', color: 'var(--text)', maxWidth: 760, flex: 1 }}>Fokussiert<br />auf Struktur und Lösung.</h1>
          <aside style={{ flex: '0 0 220px', borderLeft: '1px solid var(--border)', paddingLeft: 24, textAlign: 'center' }}>
            <FRBox style={{ border: 'none', padding: 0, textAlign: 'center' }} />
          </aside>
        </div>
      </section>

      {/* Practice grid */}
      <section style={{ background: 'var(--light)', padding: '32px 0 38px' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ maxWidth: 760, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          <PracticeCard area="Arbeitsrecht" href="#" moreLabel=">> mehr erfahren"
            items={['Verhandlungen', 'Konfliktlösung, Schlichtung und Einigungsstellen', 'Arbeitszeit', 'Vergütungssysteme', 'Umstrukturierungen']}
            onClick={(e) => { if (e.target.tagName === 'A') { e.preventDefault(); go('practice'); } }} />
          <PracticeCard area="Verkehrsrecht" href="#" moreLabel=">> mehr erfahren"
            items={['Unfallregulierung', 'Personen- und Sachschäden', 'Bußgeld', 'Verkehrsstrafsachen', 'Ordnungswidrigkeiten', 'Führerscheinsachen']}
            onClick={(e) => { if (e.target.tagName === 'A') { e.preventDefault(); go('practice'); } }} />
          <PracticeCard area="Jagdrecht" href="#" moreLabel=">> mehr erfahren"
            items={['Beratung im Jagd- und Waffenrecht', 'Jagdschein-/WBK-Sachen', 'Ordnungswidrigkeiten- und Strafsachen mit jagdrechtlichem Bezug', 'Jagdpacht- und Revierangelegenheiten']}
            onClick={(e) => { if (e.target.tagName === 'A') { e.preventDefault(); go('practice'); } }} />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section style={{ background: 'var(--white)', padding: '40px 0 50px' }}>
        <div style={{ ...CONTAINER, display: 'flex', justifyContent: 'flex-start', gap: 50, flexWrap: 'wrap' }}>
          <PartnerCard name="Dr. Dominik Fiedler" photo="img/fiedler.png" initials="DF"
            title={['Rechtsanwalt | Fachanwalt für Arbeitsrecht | Partner']}
            contacts={[
              { icon: 'mail', label: 'E-Mail', href: 'mailto:d.fiedler@fiedler-riess.de' },
              { icon: 'linkedin', label: 'LinkedIn', href: '#' },
              { icon: 'phone', label: 'Telefon', href: 'tel:+4917476936860' },
            ]} />
          <PartnerCard name="Stephan Rieß" photo="img/riess.png" initials="SR"
            title={['Rechtsanwalt | Fachanwalt für Verkehrsrecht | Partner']}
            contacts={[
              { icon: 'mail', label: 'E-Mail', href: 'mailto:s.riess@fiedler-riess.de' },
              { icon: 'phone', label: 'Telefon', href: 'tel:+4966233008120' },
            ]} />
        </div>
      </section>
    </div>
  );
}

/* ---------- PRACTICE DETAIL (Arbeitsrecht) ---------- */
function PracticeScreen() {
  return (
    <main style={{ padding: '40px 0 60px' }}>
      <div style={CONTAINER}>
        <div style={{ maxWidth: 760 }}>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 16 }}>Wir übernehmen ausgewählte Mandate im Arbeitsrecht.</p>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 16 }}>Der Fokus liegt auf Situationen, in denen Standardlösungen nicht tragen – insbesondere im Betriebsverfassungsrecht, bei Arbeitszeit- und Vergütungssystemen sowie bei Umstrukturierungen.</p>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 34 }}>Unsere Tätigkeit ist auf Beratung, Verhandlung und Konfliktlösung ausgerichtet.</p>

          <h2 style={{ font: '700 17px var(--font-sans)', color: 'var(--text)', marginBottom: 12, paddingBottom: 6, borderBottom: '2px solid var(--green)', display: 'inline-block' }}>Wofür wir beauftragt werden</h2>
          <ul style={{ listStyle: 'disc', paddingLeft: 20, marginBottom: 30 }}>
            {['Entwicklung und Strukturierung von Betriebsvereinbarungen', 'Begleitung anspruchsvoller Verhandlungen zwischen den Betriebsparteien', 'Gestaltung von Arbeitszeit- und Vergütungssystemen', 'Unterstützung bei Umstrukturierungen und Betriebsänderungen', 'Vorbereitung und Begleitung von Einigungsstellenverfahren als Vorsitzender oder Beisitzer'].map((t, i) => (
              <li key={i} style={{ font: '400 14px/1.7 var(--font-sans)', marginBottom: 6 }}>{t}</li>
            ))}
          </ul>

          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 16 }}>Unsere Arbeit verbindet juristische Präzision mit methodischer Verhandlungsführung. Durch Erfahrung in der Beratung sowohl von Arbeitgebern als auch von Betriebsräten besteht ein klares Verständnis für Dynamiken, Interessen und Entscheidungsprozesse. Ziel ist eine Lösung, die rechtlich belastbar und praktisch umsetzbar ist.</p>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 16 }}>Wir beraten Betriebsparteien in mittelgroßen Unternehmen sowie in Konzernen mit komplexen Strukturen. Die Mandate sind regelmäßig durch anspruchsvolle Verhandlungs- und Entscheidungsprozesse geprägt. Ein Teil unserer Mandatsbeziehungen besteht seit vielen Jahren.</p>
        </div>

        <div style={{ marginTop: 34, maxWidth: 760 }}>
          <Card accent>
            <h2 style={{ font: '700 16px var(--font-sans)', marginBottom: 10 }}>Ansprechpartner</h2>
            <p style={{ font: '400 14px/1.7 var(--font-sans)', color: 'var(--text)', marginBottom: 4 }}>Die Mandatsarbeit erfolgt persönlich.</p>
            <p style={{ font: '400 14px/1.7 var(--font-sans)', color: 'var(--text)', marginBottom: 14 }}>Für den Bereich Arbeitsrecht stehen Ihnen <strong>Dr. Dominik Fiedler</strong> und <strong>Mona Broghammer</strong> zur Verfügung.</p>
            <p style={{ font: '400 14px var(--font-sans)' }}><a href="mailto:arbeitsrecht@fiedler-riess.de" style={{ color: 'var(--green)' }}>arbeitsrecht@fiedler-riess.de</a></p>
          </Card>
        </div>
      </div>
    </main>
  );
}

/* ---------- VERKEHRSRECHT ---------- */
function SectionHead({ children }) {
  return (
    <h2 style={{ font: '700 15px var(--font-sans)', color: 'var(--green)', letterSpacing: '.04em', textTransform: 'uppercase', marginBottom: 12, marginTop: 32 }}>{children}</h2>
  );
}

function VerkehrsrechtScreen() {
  return (
    <main style={{ padding: '40px 0 60px' }}>
      <div style={{ ...CONTAINER, display: 'flex', alignItems: 'flex-start', gap: 50 }}>
        <div style={{ maxWidth: 760, flex: 1 }}>
          <h1 style={{ font: '300 30px var(--font-sans)', color: 'var(--text)', display: 'inline-block', paddingBottom: 8, borderBottom: '2px solid var(--green)', marginBottom: 28 }}>Verkehrsrecht von A – Z</h1>
          <h2 style={{ font: '300 22px var(--font-sans)', color: 'var(--text)', marginBottom: 18 }}>Handwerklich präzise – Exzellent</h2>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 16 }}>Ob Unfall, Fahrzeugkauf oder Bußgeldbescheid – Rechtsanwalt Stephan Rieß beherrscht als Fachanwalt alle Facetten des Verkehrsrechts.</p>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)' }}>Wir sind bundesweit tätig und nachgefragt.</p>

          <SectionHead>Unfallregulierung</SectionHead>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 16 }}>Ein Schwerpunkt unserer verkehrsrechtlichen Praxis liegt in der Regulierung von Verkehrsunfällen im In- und Ausland einschließlich von Fahrzeug- und Personenschäden.</p>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 16 }}>Unsere Mandanten unterstützen wir – in dieser oft belastenden Situation – umfassend und helfen ihnen aktiv. Wir kümmern uns für sie um die Abwicklung mit Versicherern, Sachverständigen, Berufsgenossenschaften, Integrationsstellen, Versorgungsämtern, Gerichten, Staatsanwaltschaften, Behörden und allen weiteren Beteiligten.</p>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)' }}>Sach- und Personenschäden arbeiten wir auf und setzen sie fachmännisch durch, sei es beim Unfallgegner, dessen Versicherung oder auch der eigenen Versicherung (z.B. Haftpflicht, Kasko, Unfall, Rechtschutz, Berufsunfähigkeit).</p>

          <SectionHead>Fahrzeugkauf und -Leasing</SectionHead>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)' }}>Beim Kauf und Leasing von Neu- und Gebrauchtfahrzeugen beraten wir sowohl vor als auch nach Vertragsabschluss. Autos, Wohnmobile, Motorräder, Fahrräder oder E-Bikes – Probleme mit dem Fahrzeug führen wir interessengerechte Lösungen zu, seien es unwahre Werbeaussagen oder sonstige technische Mängel.</p>

          <SectionHead>Fehlverhalten im Straßenverkehr</SectionHead>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)' }}>Ob Bußgeldverfahren oder strafrechtliches Ermittlungsverfahren, in diesen oft schwierigen Situationen stehen wir mit Rat und Tat zur Seite. Gemeinsam treten wir den Tatvorwürfen sachgerecht entgegen. Häufig entscheiden Details. Diese aufzuspüren sowie strategisch und zielorientiert einzusetzen bedarf nicht nur besonderer Erfahrung, sondern ist zugleich unsere Motivation.</p>

          <SectionHead>Recht &amp; Psychologie</SectionHead>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 16 }}>Wurde die Fahrerlaubnis bereits entzogen, klären wir die Möglichkeiten, diese wiederzuerlangen. Das tun wir in enger Zusammenarbeit mit Diana Voigt-Hohoff, Inhaberin der DVH-Praxis für Organisationsberatung, Coaching, Supervision und MPU-Schulung, die auf fachliche Stellungnahmen und Begutachtungen zur persönlichen Eignung und Zuverlässigkeit im Rahmen behördlicher Verfahren (z. B. MPU-Kontext) spezialisiert ist.</p>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)' }}>Das Ziel ist, die MPU-Prüfung zu bestehen und künftige Gesetzeskonflikte zu vermeiden. Die MPU ist kein Wissenstest, sondern ein komplexer Vorgang zur Überprüfung der persönlichen Eignung zum Führen von Kfz im Straßenverkehr – dasselbe gilt auch für den Jagdschein bzw. die Waffenbesitzkarte.</p>

          <div style={{ margin: '24px 0 8px', textAlign: 'center' }}>
            <a href="https://www.dvhpraxis.de/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>
              <img src="img/dvh-logo.png" alt="Diana Voigt-Hohoff" style={{ width: 150, height: 'auto', display: 'block', margin: '0 auto' }} />
            </a>
            <p style={{ font: '400 13.5px/1.6 var(--font-sans)', color: 'var(--text-light)', marginTop: 14 }}>Praxis für Organisationsberatung,<br />Coaching, Supervision und MPU-Schulung</p>
          </div>
        </div>

        <aside style={{ flex: '0 0 220px', textAlign: 'center', borderLeft: '1px solid var(--border)', paddingLeft: 24, marginTop: 4 }}>
          <FRBox style={{ border: 'none', padding: 0, textAlign: 'center', marginBottom: 28 }} />
          <h3 style={{ font: '700 15px/1.35 var(--font-sans)', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '.02em', marginBottom: 18 }}>Auf Spur – im<br />Verkehrsrecht</h3>
          <img src="img/riess.png" alt="Stephan Rieß" style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover', display: 'block', margin: '0 auto 16px' }} />
          <p style={{ font: '600 14px var(--font-sans)', color: 'var(--text)', marginBottom: 12 }}>Stephan Rieß</p>
          <p style={{ font: '400 13.5px/1.7 var(--font-sans)', color: 'var(--text-light)' }}>Rechtsanwalt und<br />Fachanwalt für<br />Verkehrsrecht</p>
        </aside>
      </div>
    </main>
  );
}

/* ---------- JAGDRECHT ---------- */
function JagdrechtScreen() {
  const head = { font: '700 16px var(--font-sans)', color: 'var(--green)', marginTop: 32, marginBottom: 12 };
  const para = { font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 16 };
  return (
    <main style={{ padding: '40px 0 60px' }}>
      <div style={{ ...CONTAINER, display: 'flex', alignItems: 'flex-start', gap: 50 }}>
        <div style={{ maxWidth: 760, flex: 1 }}>
          <h1 style={{ font: '300 30px var(--font-sans)', color: 'var(--text)', display: 'inline-block', paddingBottom: 8, borderBottom: '2px solid var(--green)', marginBottom: 28 }}>Jagdrecht</h1>
          <h2 style={{ font: '300 22px var(--font-sans)', color: 'var(--text)', marginBottom: 18 }}>Handwerklich präzise – Treffsicher</h2>
          <p style={para}>Als passionierter Jäger berät und vertritt Stephan Rieß Sie umfassend im Jagd- und Waffenrecht, insbesondere bei der Erteilung, dem Erhalt und der Wiedererlangung von Jagdschein und Waffenbesitzkarte (WBK).</p>
          <p style={para}>Gerade nach bußgeld- oder strafrechtlichen Vorfällen drohen der Entzug des Jagdscheins oder der Widerruf der WBK. Ein Schwerpunkt liegt auf der Prüfung von Zuverlässigkeit und persönlicher Eignung nach §§ 5, 6 WaffG.</p>
          <p style={para}>Eine frühzeitige anwaltliche Unterstützung ist hier entscheidend, um Ihre Rechte effektiv zu sichern.</p>

          <h2 style={head}>Verkehrsrecht – Jagdrecht – Waffenrecht</h2>
          <p style={para}>Verkehrsverstöße können zur Überprüfung Ihrer waffenrechtlichen Zuverlässigkeit führen – bis hin zu MPU-Anordnung, Entzug des Jagdscheins oder Widerruf der Waffenbesitzkarte.</p>
          <p style={para}>Als Fachanwalt für Verkehrsrecht verfügt Stephan Rieß über umfassende Erfahrung in Bußgeld-, Straf- und Verwaltungsverfahren und setzt dieses Wissen gezielt für Ihre Interessen und Zielsetzung im Jagd- und Waffenrecht ein.</p>

          <h2 style={head}>Recht &amp; Psychologie im Schulterschluss – Interdisziplinäre Zusammenarbeit</h2>
          <p style={para}>Ein Alleinstellungsmerkmal ist die Zusammenarbeit mit Diana Voigt-Hohoff, Inhaberin der DVH-Praxis für Organisationsberatung, Coaching, Supervision und MPU-Schulung, die auf fachliche Stellungnahmen und Begutachtungen zur persönlichen Eignung und Zuverlässigkeit im Rahmen behördlicher Verfahren (z. B. MPU-Kontext) spezialisiert ist. So können rechtliche und tatsächliche Aspekte optimal miteinander verzahnt und Ihre Erfolgschancen gezielt verbessert werden.</p>
          <div style={{ margin: '24px 0 8px', textAlign: 'center' }}>
            <a href="https://www.dvhpraxis.de/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>
              <img src="img/dvh-logo.png" alt="Diana Voigt-Hohoff" style={{ width: 150, height: 'auto', display: 'block', margin: '0 auto' }} />
            </a>
            <p style={{ font: '400 13.5px/1.6 var(--font-sans)', color: 'var(--text-light)', marginTop: 14 }}>Praxis für Organisationsberatung,<br />Coaching, Supervision und MPU-Schulung</p>
          </div>

          <h2 style={head}>Regional für Sie tätig – Nordhessen, Osthessen &amp; Westthüringen</h2>
          <p style={para}>Gemeinsam sind wir Ihre Ansprechpartner im Jagd- und Waffenrecht in Nordhessen, Osthessen und Westthüringen, insbesondere in Rotenburg a. d. Fulda, Bad Hersfeld, Fulda, Kassel, Eisenach und Gotha.</p>
        </div>

        <aside style={{ flex: '0 0 220px', textAlign: 'center', borderLeft: '1px solid var(--border)', paddingLeft: 24, marginTop: 4 }}>
          <FRBox style={{ border: 'none', padding: 0, textAlign: 'center', marginBottom: 28 }} />
          <h3 style={{ font: '700 15px/1.35 var(--font-sans)', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '.02em', marginBottom: 18 }}>Zielsicher – im Jagd-<br />und Waffenrecht</h3>
          <img src="img/riess.png" alt="Stephan Rieß" style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover', display: 'block', margin: '0 auto 16px' }} />
          <p style={{ font: '600 14px var(--font-sans)', color: 'var(--text)', marginBottom: 12 }}>Stephan Rieß</p>
          <p style={{ font: '400 13.5px/1.7 var(--font-sans)', color: 'var(--text-light)' }}>Rechtsanwalt und<br />Fachanwalt für<br />Verkehrsrecht</p>
        </aside>
      </div>
    </main>
  );
}

/* ---------- FRAGEBOGEN ---------- */
function FragebogenScreen() {
  const rows = [
    { text: <>Sie möchten uns Angaben zur Mandatsaufnahme machen? Hier gehte es zu unserem Mandantenbogen.</>, cta: 'Mandantenbogen' },
    { text: <>Sie hatten einen Unfall und Sie möchten uns schildern, was passiert ist? Hier geht zu unserem Fragebogen zum Unfallgeschehen:</>, cta: 'Unfallfragebogen' },
    { text: <>Sie haben einen Bußgeldbescheid oder einen Strafbefehl erhalten und Ihnen droht ein Fahrverbot? Hier geht es zu unserem Fragebogen zum Fahrverbot:</>, cta: 'Fahrverbotfragebogen' },
    { text: <>Sie möchten uns Unterlagen (Fotos, Gutachten, Rechnungen, …) zukommen lassen?</>, cta: 'Unterlagen Upload' },
  ];
  return (
    <main style={{ padding: '34px 0 60px' }}>
      <div style={CONTAINER}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 50, marginBottom: 40 }}>
          <h1 style={{ font: '300 30px var(--font-sans)', color: 'var(--crimson)', maxWidth: 760, flex: 1 }}>Sie haben ein Anliegen - wir kümmern uns.</h1>
          <aside style={{ flex: '0 0 220px', borderLeft: '1px solid var(--border)', paddingLeft: 24, textAlign: 'center' }}>
            <FRBox style={{ border: 'none', padding: 0, textAlign: 'center' }} />
          </aside>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36, maxWidth: 760 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 40, alignItems: 'center' }}>
              <p style={{ font: '400 15px/1.6 var(--font-sans)', color: 'var(--text-light)' }}>{r.text}</p>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--crimson)', color: 'var(--white)', font: '400 16px var(--font-sans)', padding: '16px 20px', textDecoration: 'none', transition: 'background var(--ease)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--crimson-dark)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--crimson)'}>{r.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ---------- ANFAHRT ---------- */
function AnfahrtScreen() {
  const [active, setActive] = React.useState(false);
  const mapSrc = 'https://www.google.com/maps?q=Rotenburger+Str.+17,+36199+Rotenburg+an+der+Fulda&output=embed';
  return (
    <main style={{ padding: '24px 0 60px' }}>
      <div style={CONTAINER}>
        <div style={{ maxWidth: 760, border: '1px solid var(--border)', height: 460 }}>
          {active ? (
            <iframe
              title="Google Maps – Fiedler & Rieß"
              src={mapSrc}
              style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'var(--light)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center', padding: 24, backgroundImage: 'linear-gradient(rgba(0,0,0,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.02) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
              <p style={{ font: '400 13.5px/1.6 var(--font-sans)', color: 'var(--text-light)', maxWidth: 460 }}>
                Mit dem Laden der Karte akzeptieren Sie die Datenschutzerklärung von Google.
              </p>
              <Button variant="primary" onClick={() => setActive(true)}>Karte aktivieren</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* ---------- KARRIERE ---------- */
function KarriereScreen() {
  return (
    <main style={{ padding: '40px 0 60px' }}>
      <div style={CONTAINER}>
        <div style={{ maxWidth: 680 }}>
          <h2 style={{ font: '300 22px var(--font-sans)', color: 'var(--text)', marginBottom: 22 }}>Unser Team sucht Verstärkung.</h2>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 16 }}>In unserer Partnerschaft sind noch Plätze frei.</p>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 16 }}>Wir suchen zum nächst möglichen Zeitpunkt mehrere Rechtsanwälte (m/w/d), die sich uns als Partner anschließen möchten.</p>
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 34 }}>Bevorzugt sind Fachanwälte (m/w/d) aus bisher nicht abgedeckten Rechtsbereichen (z.B. Miet-, Familien- oder Erbrecht).</p>

          <h2 style={{ font: '700 17px var(--font-sans)', color: 'var(--text)', marginBottom: 14, paddingBottom: 6, borderBottom: '2px solid var(--green)', display: 'inline-block' }}>Ansprechpartner</h2>
          <p style={{ font: '400 14px/1.9 var(--font-sans)', color: 'var(--text)' }}>Dr. Dominik Fiedler</p>
          <p style={{ font: '400 14px/1.9 var(--font-sans)', color: 'var(--text)' }}>Stephan Rieß</p>
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { HomeScreen, PracticeScreen, VerkehrsrechtScreen, JagdrechtScreen, FragebogenScreen, AnfahrtScreen, KarriereScreen });


/* ===== APP ===== */
/* ============================================
   Fiedler & Rieß — Website UI Kit · App
   Click-through shell: header, nav rail over hero/page-header,
   routed screen, footer, dismissible cookie banner.
   ============================================ */
const { useState: useAppState } = React;

const PAGE_META = {
  practice:     { title: 'Arbeitsrecht', tagline: 'Beratung, Verhandlung und Konfliktlösung im Betrieb' },
  verkehrsrecht: { title: 'Verkehrsrecht', tagline: 'Verkehrsrecht von A – Z' },
  jagdrecht:    { title: 'Jagdrecht', tagline: 'Jagd- und Waffenrecht' },
  fragebogen:   { title: 'Sie haben ein Anliegen – wir kümmern uns', tagline: 'Bitte laden Sie das passende Formular herunter und senden Sie es ausgefüllt zurück.' },
  anfahrt:      { title: 'Anfahrt' },
  karriere:     { title: 'Karriere' },
};

function App() {
  const [route, setRoute] = useAppState('home');
  const [cookie, setCookie] = useAppState(true);
  const go = (r) => { setRoute(r); window.scrollTo({ top: 0 }); };

  // nav: Arbeitsrecht -> practice, Verkehrsrecht -> fragebogen, Jagdrecht -> practice
  const navItems = [
    { label: 'Start', href: '#', active: route === 'home', onClick: (e) => { e.preventDefault(); go('home'); } },
    { label: 'Rechtsgebiete', href: '#', active: route === 'practice' || route === 'verkehrsrecht' || route === 'jagdrecht' || route === 'fragebogen',
      children: [
        { label: 'Arbeitsrecht', href: '#', onClick: (e) => { e.preventDefault(); go('practice'); } },
        { label: 'Verkehrsrecht', href: '#', onClick: (e) => { e.preventDefault(); go('verkehrsrecht'); },
          children: [
            { label: 'Fragebogen', href: '#', onClick: (e) => { e.preventDefault(); go('fragebogen'); } },
          ] },
        { label: 'Jagdrecht', href: '#', onClick: (e) => { e.preventDefault(); go('jagdrecht'); } },
      ] },
    { label: 'Karriere', href: '#', active: route === 'karriere', onClick: (e) => { e.preventDefault(); go('karriere'); } },
    { label: 'Anfahrt', href: '#', active: route === 'anfahrt', onClick: (e) => { e.preventDefault(); go('anfahrt'); } },
  ];

  const meta = PAGE_META[route];

  return (
    <div style={{ position: 'relative', minHeight: '100%', background: 'var(--white)', display: 'flex', flexDirection: 'column' }}>
      <HeaderBrand go={go} />

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 210, zIndex: 200, background: 'rgba(245,245,243,0.62)' }}>
          <NavRail items={navItems} variant="transparent" />
        </div>
        <Hero />
      </div>

      {route !== 'home' && route !== 'fragebogen' && route !== 'verkehrsrecht' && route !== 'jagdrecht' && <PageHeader title={meta.title} tagline={meta.tagline} />}

      <div style={{ flex: 1 }}>
        {route === 'home' && <HomeScreen go={go} />}
        {route === 'practice' && <PracticeScreen />}
        {route === 'verkehrsrecht' && <VerkehrsrechtScreen />}
        {route === 'jagdrecht' && <JagdrechtScreen />}
        {route === 'fragebogen' && <FragebogenScreen />}
        {route === 'anfahrt' && <AnfahrtScreen />}
        {route === 'karriere' && <KarriereScreen />}
      </div>

      <Footer />
      {cookie && <CookieBanner onClose={() => setCookie(false)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
