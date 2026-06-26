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

function PartnerCard({ name, photo, initials, title = [], contacts = [], photoFilter, style, ...props }) {
  return (
    <div style={{ width: '210px', textAlign: 'center', ...style }} {...props}>
      <div style={{ background: 'var(--green)', color: 'var(--white)', fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-semibold)', fontSize: '13px', padding: '8px 10px', marginBottom: '14px' }}>{name}</div>
      <div style={{ width: '150px', height: '150px', borderRadius: '50%', margin: '0 auto 12px', overflow: 'hidden', background: '#d0d0d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {photo ? <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', ...(photoFilter ? { filter: photoFilter } : {}) }} /> : <span style={{ fontSize: '42px', color: '#999', fontWeight: 'var(--fw-light)' }}>{initials}</span>}
      </div>
      <div style={{ fontSize: '11.5px', color: 'var(--text-light)', lineHeight: 1.55, marginBottom: '12px' }}>
        {title.map((line, i) => <Fragment key={i}>{line}{i < title.length - 1 && <br />}</Fragment>)}
      </div>
      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
        {contacts.map((c, i) => <ContactIcon key={i} icon={c.icon} label={c.label} href={c.href} target={c.target} rel={c.target === '_blank' ? 'noopener noreferrer' : undefined} />)}
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
/* inline */

/* Shared responsive hook — mobile when viewport <= 760px. Exposed on window
   so screens.jsx and app.jsx (separate Babel scopes in dev) can use it too. */
function frUseIsMobile(bp) {
  bp = bp || 760;
  const [m, setM] = useState(typeof window !== 'undefined' && window.innerWidth <= bp);
  useEffect(() => {
    const on = () => setM(window.innerWidth <= bp);
    window.addEventListener('resize', on);
    on();
    return () => window.removeEventListener('resize', on);
  }, [bp]);
  return m;
}
window.frUseIsMobile = frUseIsMobile;

/* ---- Mobile navigation: hamburger + accordion (touch friendly) ---- */
function MobileNavItem({ item, depth, onNavigate }) {
  const hasKids = item.children && item.children.length > 0;
  const [open, setOpen] = useState(depth === 0 && !!item.active);
  const pad = 18 + depth * 18;
  const labelClick = (e) => {
    e.preventDefault();
    if (item.onClick) { item.onClick(e); onNavigate(); }
    else if (hasKids) setOpen((o) => !o);
  };
  return (
    <li style={{ listStyle: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'stretch', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
        <a href={item.href || '#'} onClick={labelClick}
          style={{ flex: 1, padding: `15px ${pad}px`, color: item.active ? 'var(--green)' : '#fff', fontFamily: 'var(--font-sans)', fontSize: depth === 0 ? '16px' : '15px', fontWeight: 'var(--fw-semibold)', letterSpacing: '.05em', textTransform: 'uppercase', textDecoration: 'none' }}>
          {item.label}
        </a>
        {hasKids && (
          <button onClick={() => setOpen((o) => !o)} aria-label="Untermenü"
            style={{ width: 52, background: 'none', border: 'none', borderLeft: '1px solid rgba(255,255,255,.08)', color: 'var(--green)', fontSize: 20, cursor: 'pointer', transition: 'transform var(--ease)', transform: open ? 'rotate(90deg)' : 'none' }}>
            ›
          </button>
        )}
      </div>
      {hasKids && open && (
        <ul style={{ margin: 0, padding: 0, background: 'rgba(0,0,0,.18)' }}>
          {item.children.map((c, i) => <MobileNavItem key={i} item={c} depth={depth + 1} onNavigate={onNavigate} />)}
        </ul>
      )}
    </li>
  );
}

function MobileNav({ items, open, onNavigate }) {
  return (
    <div style={{ overflow: 'hidden', maxHeight: open ? '80vh' : 0, transition: 'max-height .3s ease', background: 'var(--charcoal)', borderTop: open ? '3px solid var(--green)' : 'none' }}>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', overflowY: 'auto', maxHeight: '80vh' }}>
        {items.map((it, i) => <MobileNavItem key={i} item={it} depth={0} onNavigate={onNavigate} />)}
      </ul>
    </div>
  );
}

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

function HeaderBrand({ go, isMobile, menuOpen, onToggle }) {
  return (
    <header style={{ background: 'var(--white)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: isMobile ? '20px 16px 18px' : '44px 20px 40px', display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'space-between' : 'center', gap: 12 }}>
        <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border)', paddingLeft: isMobile ? 14 : 22, cursor: 'pointer' }} onClick={() => go('home')}>
          <span style={{ font: `300 ${isMobile ? '25px' : '42px'}/1.18 var(--font-sans)`, color: 'var(--green)', display: 'block' }}>Fiedler &amp; Rieß</span>
          <span style={{ font: `300 ${isMobile ? '13px' : '18px'}/1.3 var(--font-sans)`, color: 'var(--green)', display: 'block', marginTop: 2 }}>Rechtsanwälte PartGmbB</span>
        </div>
        {isMobile && (
          <button onClick={onToggle} aria-label="Menü öffnen" aria-expanded={menuOpen}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5, flexShrink: 0 }}>
            <span style={{ display: 'block', width: 26, height: 3, background: 'var(--green)', transition: 'transform var(--ease), opacity var(--ease)', transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 26, height: 3, background: 'var(--green)', transition: 'opacity var(--ease)', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 26, height: 3, background: 'var(--green)', transition: 'transform var(--ease)', transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
          </button>
        )}
      </div>
    </header>
  );
}

function Hero({ children }) {
  const isMobile = frUseIsMobile();
  const [cur, setCur] = useState(0);
  const slides = ['img/hero1.png', 'img/hero2.png'];
  useEffect(() => {
    const t = setInterval(() => setCur((c) => (c + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'relative' }}>
      {children}
      <div style={{ height: isMobile ? 180 : 310, position: 'relative', overflow: 'hidden', background: '#4a4a4a' }}>
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
  const isMobile = frUseIsMobile();
  return (
    <div style={{ background: 'var(--white)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: isMobile ? '26px 16px 4px' : '34px 20px 8px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: isMobile ? 18 : 50 }}>
        <div style={{ maxWidth: 760, flex: 1 }}>
          <h1 style={{ font: `300 ${isMobile ? '26px' : '30px'} var(--font-sans)`, color: 'var(--text)', display: 'inline-block', paddingBottom: 8, borderBottom: '2px solid var(--green)' }}>{title}</h1>
          {tagline && <p style={{ font: '400 14px var(--font-sans)', color: 'var(--text-light)', marginTop: 12 }}>{tagline}</p>}
        </div>
        {!isMobile && (
          <aside style={{ flex: '0 0 220px', borderLeft: '1px solid var(--border)', paddingLeft: 24, textAlign: 'center' }}>
            <KanzleiBox style={{ border: 'none', padding: 0, textAlign: 'center' }} />
          </aside>
        )}
      </div>
    </div>
  );
}

function Footer({ go }) {
  const nav = (r) => (e) => { e.preventDefault(); if (go) go(r); };
  return (
    <footer style={{ background: 'var(--white)', borderTop: '1px solid var(--border)', padding: '15px 0' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <span style={{ color: 'var(--green)', font: '700 13px var(--font-sans)', display: 'block' }}>Fiedler &amp; Rieß Rechtsanwälte PartGmbB</span>
          <span style={{ color: 'var(--text-light)', font: '400 12px var(--font-sans)' }}>Rotenburger Str. 17 · 36199 Rotenburg a.d. Fulda</span>
        </div>
        <nav style={{ display: 'flex', gap: 20 }}>
          <a href="#" onClick={nav('impressum')} style={{ color: 'var(--green)', font: '400 13px var(--font-sans)' }}>Impressum</a>
          <a href="#" onClick={nav('datenschutz')} style={{ color: 'var(--green)', font: '400 13px var(--font-sans)' }}>Datenschutz</a>
        </nav>
      </div>
    </footer>
  );
}

function CookieBanner({ onClose }) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--white)', borderTop: '1px solid var(--border)', padding: '18px 20px', zIndex: 9999, boxShadow: '0 -3px 12px rgba(0,0,0,.09)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
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

Object.assign(window, { HeaderBrand, Hero, PageHeader, KanzleiBox, Footer, CookieBanner, NAV_ITEMS, NavRail, MobileNav, frUseIsMobile });


/* ===== SCREENS ===== */
/* ============================================
   Fiedler & Rieß — Website UI Kit · Screens
   Home, Practice (Arbeitsrecht), Fragebogen, Anfahrt, Karriere.
   Composes DS components: PracticeCard, PartnerCard, Card, Button.
   ============================================ */
/* inline */
const FRBox = window.KanzleiBox;

const CONTAINER = { maxWidth: 960, margin: '0 auto', padding: '0 20px' };

/* anwalt.de Mitgliedssiegel — loader script must run AFTER the target div is mounted,
   so we inject it in an effect (React does not execute <script> tags rendered as JSX). */
function AnwaltSiegel() {
  React.useEffect(() => {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://widget.anwalt.de/mitgliedssiegel/31/id/149420/get.js?v=2';
    document.body.appendChild(s);
    return () => { try { document.body.removeChild(s); } catch (e) {} };
  }, []);
  return <div data-anw-widget="31" style={{ display: 'flex', justifyContent: 'center' }}></div>;
}

/* ---------- HOME ---------- */
function HomeScreen({ go }) {
  const isMobile = window.frUseIsMobile();
  return (
    <div>
      {/* Intro + practice grid — centered, no sidebar */}
      <section style={{ background: 'var(--white)', padding: isMobile ? '26px 0 30px' : '40px 0 44px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ font: `300 ${isMobile ? '26px' : '30px'}/1.35 var(--font-sans)`, color: 'var(--text)', textAlign: isMobile ? 'left' : 'center' }}>Fokussiert<br />auf Struktur und Lösung.</h1>
          <div style={{ marginTop: isMobile ? 22 : 26, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 16 }}>
            <PracticeCard area="Arbeitsrecht" href="#" moreLabel=">> mehr erfahren"
              items={['Verhandlungen', 'Konfliktlösung, Schlichtung und Einigungsstellen', 'Arbeitszeit', 'Vergütungssysteme', 'Umstrukturierungen']}
              onClick={(e) => { if (e.target.tagName === 'A') { e.preventDefault(); go('practice'); } }} />
            <PracticeCard area="Verkehrsrecht" href="#" moreLabel=">> mehr erfahren"
              items={['Unfallregulierung', 'Personen- und Sachschäden', 'Bußgeld', 'Verkehrsstrafsachen', 'Ordnungswidrigkeiten', 'Führerscheinsachen']}
              onClick={(e) => { if (e.target.tagName === 'A') { e.preventDefault(); go('verkehrsrecht'); } }} />
            <PracticeCard area="Jagdrecht" href="#" moreLabel=">> mehr erfahren"
              items={['Beratung im Jagd- und Waffenrecht', 'Jagdschein-/WBK-Sachen', 'Ordnungswidrigkeiten- und Strafsachen mit jagdrechtlichem Bezug', 'Jagdpacht- und Revierangelegenheiten']}
              onClick={(e) => { if (e.target.tagName === 'A') { e.preventDefault(); go('jagdrecht'); } }} />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section style={{ background: 'var(--white)', padding: isMobile ? '32px 0 40px' : '40px 0 50px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'center', gap: isMobile ? 36 : 50, flexWrap: 'wrap' }}>
          <PartnerCard name="Dr. Dominik Fiedler" photo="img/fiedler.png" initials="DF"
            title={['Rechtsanwalt | Fachanwalt für Arbeitsrecht | Partner']}
            contacts={[
              { icon: 'mail', label: 'E-Mail', href: 'mailto:d.fiedler@fiedler-riess.de' },
              { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile', target: '_blank' },
              { icon: 'phone', label: 'Telefon', href: 'tel:+4917476936860' },
            ]} />
          <PartnerCard name="Stephan Rieß" photo="img/riess.png" initials="SR"
            title={['Rechtsanwalt | Fachanwalt für Verkehrsrecht | Partner']}
            contacts={[
              { icon: 'mail', label: 'E-Mail', href: 'mailto:s.riess@fiedler-riess.de' },
              { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/stephan-rieß-a46576416', target: '_blank' },
              { icon: 'phone', label: 'Telefon', href: 'tel:+4966233008120' },
            ]} />
        </div>
      </section>

      {/* Mitgliedschaften ausgeblendet */}
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

function VerkehrsrechtScreen({ go }) {
  const isMobile = window.frUseIsMobile();
  return (
    <main style={{ padding: isMobile ? '28px 0 48px' : '40px 0 60px' }}>
      <div style={{ ...CONTAINER, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: isMobile ? 36 : 50 }}>
        <div style={{ maxWidth: 760, flex: 1 }}>
          <h1 style={{ font: `300 ${isMobile ? '26px' : '30px'} var(--font-sans)`, color: 'var(--text)', display: 'inline-block', paddingBottom: 8, borderBottom: '2px solid var(--green)', marginBottom: 28 }}>Verkehrsrecht von A – Z</h1>
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
          <p style={{ font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)' }}>Das Ziel ist, die MPU-Prüfung zu bestehen und künftige Gesetzeskonflikte zu vermeiden. Die MPU ist kein Wissenstest, sondern ein komplexer Vorgang zur Überprüfung der persönlichen Eignung zum Führen von Kfz im Straßenverkehr – dasselbe gilt auch für den <a href="#" onClick={(e) => { e.preventDefault(); go && go('jagdrecht'); }} style={{ color: 'var(--green)' }}>Jagdschein bzw. die Waffenbesitzkarte</a>.</p>

          <div style={{ margin: '24px 0 8px', textAlign: 'center' }}>
            <a href="https://www.dvhpraxis.de/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', textDecoration: 'none' }}>
              <img src="img/dvh-logo.png" alt="Diana Voigt-Hohoff" style={{ width: 150, height: 'auto', display: 'block', margin: '0 auto' }} />
            </a>
            <p style={{ font: '400 13.5px/1.6 var(--font-sans)', color: 'var(--text-light)', marginTop: 14 }}>Praxis für Organisationsberatung,<br />Coaching, Supervision und MPU-Schulung</p>
          </div>
        </div>

        <aside style={{ flex: isMobile ? '1 1 auto' : '0 0 220px', alignSelf: isMobile ? 'center' : 'auto', textAlign: 'center', borderLeft: isMobile ? 'none' : '1px solid var(--border)', borderTop: isMobile ? '1px solid var(--border)' : 'none', paddingLeft: isMobile ? 0 : 24, paddingTop: isMobile ? 28 : 0, marginTop: 4 }}>
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
  const isMobile = window.frUseIsMobile();
  const head = { font: '700 16px var(--font-sans)', color: 'var(--green)', marginTop: 32, marginBottom: 12 };
  const para = { font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 16 };
  return (
    <main style={{ padding: isMobile ? '28px 0 48px' : '40px 0 60px' }}>
      <div style={{ ...CONTAINER, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: isMobile ? 36 : 50 }}>
        <div style={{ maxWidth: 760, flex: 1 }}>
          <h1 style={{ font: `300 ${isMobile ? '26px' : '30px'} var(--font-sans)`, color: 'var(--text)', display: 'inline-block', paddingBottom: 8, borderBottom: '2px solid var(--green)', marginBottom: 28 }}>Jagdrecht</h1>
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

        <aside style={{ flex: isMobile ? '1 1 auto' : '0 0 220px', alignSelf: isMobile ? 'center' : 'auto', textAlign: 'center', borderLeft: isMobile ? 'none' : '1px solid var(--border)', borderTop: isMobile ? '1px solid var(--border)' : 'none', paddingLeft: isMobile ? 0 : 24, paddingTop: isMobile ? 28 : 0, marginTop: 4 }}>
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
  const isMobile = window.frUseIsMobile();
  const rows = [
    { text: <>Sie möchten uns Angaben zur Mandatsaufnahme machen? Hier geht es zu unserem Online-Mandantenbogen:</>, cta: 'Mandantenbogen ausfüllen', href: 'mandantenbogen.html', online: true },
    { text: <>Sie hatten einen Unfall und Sie möchten uns schildern, was passiert ist? Hier geht es zu unserem Online-Fragebogen zum Unfallgeschehen:</>, cta: 'Unfallfragebogen ausfüllen', href: 'unfallfragebogen.html', online: true },
    { text: <>Sie haben einen Bußgeldbescheid oder einen Strafbefehl erhalten und Ihnen droht ein Fahrverbot? Hier geht es zu unserem Online-Fragebogen zum Fahrverbot:</>, cta: 'Fahrverbotfragebogen ausfüllen', href: 'fahrverbotfragebogen.html', online: true },
    { text: <>Sie möchten uns Unterlagen (Fotos, Gutachten, Rechnungen, …) zukommen lassen?</>, cta: 'Unterlagen Upload', href: 'https://app.jupus.de/client/portal/external/questionnaires/zBn2LNWXVWzzSASw1qVtlKzejSxZHnnuGx3Jgj_4gu1w7qVt/5lomOa4HwnxEHkFl3u6iLC5jT50weh2U6iI1kF_lotyIS8GH' },
  ];
  return (
    <main style={{ padding: '34px 0 60px' }}>
      <div style={CONTAINER}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: isMobile ? 18 : 50, marginBottom: 40 }}>
          <h1 style={{ font: `300 ${isMobile ? '26px' : '30px'} var(--font-sans)`, color: 'var(--text)', display: 'inline-block', paddingBottom: 8, borderBottom: '2px solid var(--green)', maxWidth: 760, flex: 1 }}>Sie haben ein Anliegen - wir kümmern uns.</h1>
          {!isMobile && (
            <aside style={{ flex: '0 0 220px', borderLeft: '1px solid var(--border)', paddingLeft: 24, textAlign: 'center' }}>
              <FRBox style={{ border: 'none', padding: 0, textAlign: 'center' }} />
            </aside>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 24 : 36, maxWidth: 760 }}>
          {rows.map((r, i) => {
            const isPdf = (r.href || '').endsWith('.pdf');
            const icon = r.online ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            ) : isPdf ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            );
            return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 280px', gap: isMobile ? 14 : 40, alignItems: 'center' }}>
              <p style={{ font: '400 15px/1.6 var(--font-sans)', color: 'var(--text-light)' }}>{r.text}</p>
              <a href={r.href || '#'} target={r.online ? undefined : (r.href ? '_blank' : undefined)} rel={r.href && !r.online ? 'noopener noreferrer' : undefined} onClick={r.href ? undefined : (e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 12, background: 'var(--green)', color: 'var(--white)', font: '600 15px var(--font-sans)', padding: '16px 22px', textDecoration: 'none', transition: 'background var(--ease)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--green-dark)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--green)'}>{icon}{r.cta}</a>
            </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

/* ---------- ANFAHRT ---------- */
function AnfahrtScreen() {
  const isMobile = window.frUseIsMobile();
  const [active, setActive] = React.useState(false);
  const mapSrc = 'https://www.google.com/maps?q=Rotenburger+Str.+17,+36199+Rotenburg+an+der+Fulda&output=embed';
  return (
    <main style={{ padding: isMobile ? '20px 0 48px' : '24px 0 60px' }}>
      <div style={CONTAINER}>
        <div style={{ maxWidth: 760, border: '1px solid var(--border)', height: isMobile ? 340 : 460 }}>
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

/* ---------- IMPRESSUM ---------- */
function ImpressumScreen() {
  const isMobile = window.frUseIsMobile();
  const h2 = { font: '700 17px var(--font-sans)', color: 'var(--text)', margin: '34px 0 12px', paddingBottom: 6, borderBottom: '2px solid var(--green)', display: 'inline-block' };
  const p = { font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 12 };
  const lbl = { font: '700 13px var(--font-sans)', color: 'var(--text-light)' };
  const val = { font: '400 13px/1.6 var(--font-sans)', color: 'var(--text)' };
  const rowGrid = { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '180px 1fr', gap: isMobile ? '2px 0' : '10px 24px', marginBottom: 8, alignItems: 'baseline' };
  return (
    <main style={{ padding: isMobile ? '28px 0 48px' : '40px 0 60px' }}>
      <div style={CONTAINER}>
        <div style={{ maxWidth: 760 }}>
          <h1 style={{ font: `300 ${isMobile ? '26px' : '30px'} var(--font-sans)`, color: 'var(--text)', display: 'inline-block', paddingBottom: 8, borderBottom: '2px solid var(--green)', marginBottom: 28 }}>Impressum</h1>

          <p style={{ font: '700 15px var(--font-sans)', color: 'var(--green)', marginBottom: 2 }}>Fiedler &amp; Rieß Rechtsanwälte PartGmbB</p>
          <p style={{ ...p, marginBottom: 24 }}>Rotenburger Str. 17, 36199 Rotenburg a.d. Fulda</p>

          <div style={rowGrid}>
            <span style={lbl}>Registergericht:</span><span style={val}>Amtsgericht Frankfurt, PR-Nr.: 2872</span>
            <span style={lbl}>Sitz:</span><span style={val}>Rotenburg a.d. Fulda</span>
            <span style={lbl}>Partner:</span><span style={val}>Dr. Dominik Fiedler, Rechtsanwalt und Fachanwalt für Arbeitsrecht<br />Stephan Rieß, Rechtsanwalt und Fachanwalt für Verkehrsrecht</span>
          </div>

          <div style={{ ...rowGrid, marginTop: 16 }}>
            <span style={lbl}>Telefon:</span><span style={val}>06623 300 812 0</span>
            <span style={lbl}>Mobilnummer:</span><span style={val}>0174 7693686</span>
            <span style={lbl}>Telefax:</span><span style={val}>06623 300 812 2</span>
            <span style={lbl}>E-Mail:</span><span style={val}><a href="mailto:d.fiedler@fiedler-riess.de" style={{ color: 'var(--green)' }}>d.fiedler@fiedler-riess.de</a><br /><a href="mailto:s.riess@fiedler-riess.de" style={{ color: 'var(--green)' }}>s.riess@fiedler-riess.de</a></span>
          </div>

          <h2 style={h2}>Berufsbezeichnung und zuständige Rechtsanwaltskammer</h2>
          <p style={p}>Dr. Dominik Fiedler, Stephan Rieß und Mona Broghammer sind nach dem Recht der Bundesrepublik Deutschland als Rechtsanwälte zugelassen. Frau Rechtsanwältin Broghammer ist angestellt.</p>
          <p style={p}>Alle Rechtsanwälte sind Mitglieder der Rechtsanwaltskammer Kassel, Karthäuserstraße 5, 34117 Kassel, <a href="https://www.rechtsanwaltskammer-kassel.de" style={{ color: 'var(--green)' }}>www.rechtsanwaltskammer-kassel.de</a>.</p>

          <h2 style={h2}>Umsatzsteuer-Identifikationsnummer</h2>
          <p style={p}>DE 343 424 147</p>

          <h2 style={h2}>Vermögensschaden-Haftpflichtversicherung</h2>
          <p style={p}>Fiedler &amp; Rieß Rechtsanwälte PartGmbB unterhält eine Vermögensschaden-Haftpflichtversicherung bei der Markel International Insurance Company Limited, Niederlassung für Deutschland, Luisenstrasse 14, 80333 München.</p>
          <p style={p}>Räumlicher Geltungsbereich ist jeweils das Gebiet der Europäischen Union und den Staaten des Abkommens über den Europäischen Wirtschaftsraum. Die Partnerschaftgesellschaft mit beschränkter Berufshaftung ist nach § 51 a Bundesrechtsanwaltsordnung (BRAO) verpflichtet, eine Vermögensschaden-Haftpflichtversicherung mit einer Mindestversicherungssumme von 2.500.000,00 Euro zu unterhalten.</p>

          <h2 style={h2}>Berufsrechtliche Regelungen</h2>
          <p style={p}>Die geltenden berufsrechtlichen Regelungen sind die Bundesrechtsanwaltsordnung (BRAO), die Berufsordnung für Rechtsanwälte (BORA), die Fachanwaltsordnung (FAO), das Rechtsanwaltsvergütungsgesetz (RVG) und die Berufsregeln der Rechtsanwälte der Europäischen Union (CCBE). Sie können über die Internetseite der Bundesrechtsanwaltskammer (<a href="https://www.brak.de" style={{ color: 'var(--green)' }}>www.brak.de</a>) in der Rubrik „Berufsrecht" in deutscher und englischer Sprache eingesehen und abgerufen werden.</p>

          <h2 style={h2}>Außergerichtliche Streitschlichtung</h2>
          <p style={p}>Streitigkeiten zwischen Rechtsanwälten und ihren Auftraggebern können auf Antrag außergerichtlich durch Streitschlichtung bei der zuständigen Rechtsanwaltskammer nach § 73 Abs. 2 Nr. 3 in Verbindung mit § 73 Abs. 5 Bundesrechtsanwaltsordnung oder bei der Schlichtungsstelle der Rechtsanwaltschaft bei der Bundesrechtsanwaltskammer nach § 191 f. Bundesrechtsanwaltsordnung beigelegt werden.</p>
          <p style={p}>Fiedler &amp; Rieß Rechtsanwälte PartGmbB nimmt an der vorgenannten Streitschlichtung teil.</p>
          <p style={p}>Die Internet-Adresse der Rechtsanwaltskammer Kassel lautet: <a href="https://www.rechtsanwaltskammer-kassel.de" style={{ color: 'var(--green)' }}>www.rechtsanwaltskammer-kassel.de</a>.<br />Die Internet-Adresse der Bundesrechtsanwaltskammer lautet: <a href="https://www.brak.de" style={{ color: 'var(--green)' }}>www.brak.de</a>.<br />Die Schlichtungsstelle der Rechtsanwaltschaft kann über folgende E-Mail-Adresse erreicht werden: <a href="mailto:Schlichtungsstelle@brak.de" style={{ color: 'var(--green)' }}>Schlichtungsstelle@brak.de</a>.</p>

          <h2 style={h2}>Informationen und Haftung</h2>
          <p style={p}>Eine Richtigkeit der auf diesen Internetseiten enthaltenen Informationen und verbundenen Internetseiten ("Links") wird nicht gewährleistet. Jegliche Haftung im Zusammenhang mit der Nutzung der auf diesen Internetseiten oder den Links enthaltenen Informationen ist ausgeschlossen; auf eine Richtigkeit kann nicht vertraut werden. Dominik Fiedler distanziert sich ausdrücklich von den Inhalten der verbundenen Internetseiten. Die auf dieser Internetseite enthaltenen Informationen sind keine Rechtsberatung.</p>

          <h2 style={h2}>Bilder</h2>
          <p style={p}>Die Bilder von unserem Team wurden von Florian Krämer angefertigt.</p>

          <h2 style={h2}>Anwendbares Recht</h2>
          <p style={p}>Die Informationen auf dieser Internet-Seite sowie alle Fragen und Streitigkeiten im Zusammenhang mit dieser Internet-Seite unterliegen dem Recht der Bundesrepublik Deutschland.</p>
        </div>
      </div>
    </main>
  );
}

/* ---------- DATENSCHUTZ ---------- */
function DatenschutzScreen() {
  const isMobile = window.frUseIsMobile();
  const h2 = { font: '700 17px var(--font-sans)', color: 'var(--text)', margin: '34px 0 12px', paddingBottom: 6, borderBottom: '2px solid var(--green)', display: 'inline-block' };
  const h3 = { font: '700 14px var(--font-sans)', color: 'var(--green)', margin: '20px 0 10px' };
  const p = { font: '400 14px/1.75 var(--font-sans)', color: 'var(--text)', marginBottom: 12 };
  const lbl = { font: '700 13px var(--font-sans)', color: 'var(--text-light)' };
  const val = { font: '400 13px/1.6 var(--font-sans)', color: 'var(--text)' };
  const rowGrid = { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? '2px 0' : '8px 24px', marginBottom: 6, alignItems: 'baseline' };
  const li = { font: '400 14px/1.7 var(--font-sans)', color: 'var(--text)', marginBottom: 10 };
  return (
    <main style={{ padding: isMobile ? '28px 0 48px' : '40px 0 60px' }}>
      <div style={CONTAINER}>
        <div style={{ maxWidth: 760 }}>
          <h1 style={{ font: `300 ${isMobile ? '26px' : '30px'} var(--font-sans)`, color: 'var(--text)', display: 'inline-block', paddingBottom: 8, borderBottom: '2px solid var(--green)', marginBottom: 28 }}>Datenschutz</h1>

          <h2 style={h2}>1. Name und Kontaktdaten des Verantwortlichen für die Datenverarbeitung</h2>
          <p style={p}>Diese Datenschutz-Information gilt für die Datenverarbeitung durch:</p>
          <p style={{ font: '700 15px var(--font-sans)', color: 'var(--green)', marginBottom: 2 }}>Fiedler &amp; Rieß Rechtsanwälte PartGmbB</p>
          <p style={{ ...p, marginBottom: 20 }}>Rotenburger Str. 17, 36199 Rotenburg a.d. Fulda</p>
          <div style={rowGrid}>
            <span style={lbl}>Partner:</span><span style={val}>Dr. Dominik Fiedler, Rechtsanwalt und Fachanwalt für Arbeitsrecht<br />Stephan Rieß, Rechtsanwalt und Fachanwalt für Verkehrsrecht</span>
            <span style={lbl}>Sitz der Gesellschaft:</span><span style={val}>Rotenburg a.d. Fulda</span>
            <span style={lbl}>Partnerschaftsregister:</span><span style={val}>Amtsgericht Frankfurt a.M., PR Nr.: 2872</span>
            <span style={lbl}>Telefon:</span><span style={val}>06623 300 8120</span>
            <span style={lbl}>Telefax:</span><span style={val}>06623 300 8122</span>
            <span style={lbl}>Verantwortliche:</span><span style={val}>Dr. Dominik Fiedler, Rechtsanwalt und Fachanwalt für Arbeitsrecht<br />Stephan Rieß, Rechtsanwalt und Fachanwalt für Verkehrsrecht</span>
          </div>

          <h2 style={h2}>2. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung</h2>
          <h3 style={h3}>a) Beim Besuch der Website</h3>
          <p style={p}>Beim Aufrufen unserer Website www.fiedler-riess.de werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sog. Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten Löschung gespeichert: IP-Adresse des anfragenden Rechners, Datum und Uhrzeit des Zugriffs, Name und URL der abgerufenen Datei, Website, von der aus der Zugriff erfolgt (Referrer-URL), verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name Ihres Access-Providers. Die genannten Daten werden durch uns zu folgenden Zwecken verarbeitet: Gewährleistung eines reibungslosen Verbindungsaufbaus der Website, Gewährleistung einer komfortablen Nutzung unserer Website, Auswertung der Systemsicherheit und -stabilität sowie zu weiteren administrativen Zwecken.</p>
          <p style={p}>Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO. Unser berechtigtes Interesse folgt aus oben aufgelisteten Zwecken zur Datenerhebung. In keinem Fall verwenden wir die erhobenen Daten zu dem Zweck, Rückschlüsse auf Ihre Person zu ziehen. Darüber hinaus setzen wir beim Besuch unserer Website Cookies sowie Analysedienste ein. Nähere Erläuterungen dazu erhalten Sie unter den Ziff. 4 und 5 dieser Datenschutzerklärung.</p>
          <h3 style={h3}>b) Bei Nutzung unseres E-Mail-Adresse(n) und Telefonnummer(n)</h3>
          <p style={p}>Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, mit uns über eine auf unserer Website angegebene(n) E-Mail-Adresse(n) und Telefonnummer(n) Kontakt aufzunehmen. Dabei ist die Angabe einer gültigen E-Mail-Adresse erforderlich, damit wir wissen, von wem die Anfrage stammt und um diese beantworten zu können. Telefonnummern können unterdrückt werden. Weitere Angaben können freiwillig getätigt werden.</p>
          <p style={p}>Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt nach Art. 6 Abs. 1 S. 1 lit. a DSGVO auf Grundlage Ihrer freiwillig erteilten Einwilligung. Die von uns erhobenen personenbezogenen Daten werden nach Erledigung der von Ihnen gestellten Anfrage nach den gesetzlichen Vorschriften gelöscht.</p>

          <h2 style={h2}>3. Weitergabe von Daten</h2>
          <p style={p}>Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten Zwecken findet nicht statt.</p>
          <p style={p}>Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:</p>
          <ul style={{ listStyle: 'disc', paddingLeft: 20 }}>
            <li style={li}>Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche Einwilligung dazu erteilt haben,</li>
            <li style={li}>die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein überwiegendes schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben,</li>
            <li style={li}>für den Fall, dass für die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. c DSGVO eine gesetzliche Verpflichtung besteht, sowie</li>
            <li style={li}>dies gesetzlich zulässig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO für die Abwicklung von Vertragsverhältnissen mit Ihnen erforderlich ist.</li>
          </ul>

          <h2 style={h2}>4. Cookies</h2>
          <p style={p}>Wir setzen auf unserer Seite Cookies ein. Hierbei handelt es sich um kleine Dateien, die Ihr Browser automatisch erstellt und die auf Ihrem Endgerät (Laptop, Tablet, Smartphone o.ä.) gespeichert werden, wenn Sie unsere Seite besuchen. Cookies richten auf Ihrem Endgerät keinen Schaden an, enthalten keine Viren, Trojaner oder sonstige Schadsoftware. In dem Cookie werden Informationen abgelegt, die sich jeweils im Zusammenhang mit dem spezifisch eingesetzten Endgerät ergeben. Dies bedeutet jedoch nicht, dass wir dadurch unmittelbar Kenntnis von Ihrer Identität erhalten. Der Einsatz von Cookies dient dazu, die Nutzung unseres Angebots für Sie angenehmer zu gestalten. So setzen wir sogenannte Session-Cookies ein, um zu erkennen, dass Sie einzelne Seiten unserer Website bereits besucht haben. Diese werden nach Verlassen unserer Seite automatisch gelöscht.</p>
          <p style={p}>Unsere Webseite wurde über den Webseiten-Baukasten der Firma Strato AG, Pascalstraße 10, 10587 Berlin, erstellt. Welche Cookies verwendet werden, finden Sie insofern auf der folgenden Webseite: <a href="https://strato.de/blog/dsgvo-cookies/" style={{ color: 'var(--green)' }}>https://strato.de/blog/dsgvo-cookies/</a>. Die durch Cookies verarbeiteten Daten sind für die genannten Zwecke zur Wahrung unserer berechtigten Interessen sowie der Dritter nach Art. 6 Abs. 1 S. 1 lit. f DSGVO erforderlich.</p>
          <p style={p}>Die meisten Browser akzeptieren Cookies automatisch. Sie können Ihren Browser jedoch so konfigurieren, dass keine Cookies auf Ihrem Computer gespeichert werden oder stets ein Hinweis erscheint, bevor ein neuer Cookie angelegt wird. Die vollständige Deaktivierung von Cookies kann jedoch dazu führen, dass Sie nicht alle Funktionen unserer Website nutzen können.</p>

          <h2 style={h2}>5. Analyse-Tools</h2>
          <p style={p}>Analyse-Tools (z.B. Google Analytics) werden von uns nicht verwendet. Über den Baukasten der Strato AG - mit dem diese Webseite erstellt wurde - ist jedoch statistisch erhoben, über welchen Weg der Nutzer auf die Webseite kam (z.B. über eine Suchmaschine) und welche Seite bzw. Unterseite aufgerufen wurde.</p>

          <h2 style={h2}>6. Social Media Plug-ins</h2>
          <p style={p}>Social Plug-ins der sozialen Netzwerke wie Facebook, Twitter und Instagram werden von uns nicht verwendet.</p>

          <h2 style={h2}>7. Betroffenenrechte</h2>
          <p style={p}>Sie haben das Recht:</p>
          <ul style={{ listStyle: 'disc', paddingLeft: 20 }}>
            <li style={li}>gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen. Insbesondere können Sie Auskunft über die Verarbeitungszwecke, die Kategorie der personenbezogenen Daten, die Kategorien von Empfängern, gegenüber denen Ihre Daten offengelegt wurden oder werden, die geplante Speicherdauer, das Bestehen eines Rechts auf Berichtigung, Löschung, Einschränkung der Verarbeitung oder Widerspruch, das Bestehen eines Beschwerderechts, die Herkunft ihrer Daten, sofern diese nicht bei uns erhoben wurden, sowie über das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling und ggf. aussagekräftigen Informationen zu deren Einzelheiten verlangen;</li>
            <li style={li}>gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;</li>
            <li style={li}>gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen, soweit nicht die Verarbeitung zur Ausübung des Rechts auf freie Meinungsäußerung und Information, zur Erfüllung einer rechtlichen Verpflichtung, aus Gründen des öffentlichen Interesses oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist;</li>
            <li style={li}>gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, soweit die Richtigkeit der Daten von Ihnen bestritten wird, die Verarbeitung unrechtmäßig ist, Sie aber deren Löschung ablehnen und wir die Daten nicht mehr benötigen, Sie jedoch diese zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen oder Sie gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung eingelegt haben;</li>
            <li style={li}>gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesebaren Format zu erhalten oder die Übermittlung an einen anderen Verantwortlichen zu verlangen;</li>
            <li style={li}>gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit gegenüber uns zu widerrufen. Dies hat zur Folge, dass wir die Datenverarbeitung, die auf dieser Einwilligung beruhte, für die Zukunft nicht mehr fortführen dürfen und</li>
            <li style={li}>gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren. In der Regel können Sie sich hierfür an die Aufsichtsbehörde Ihres üblichen Aufenthaltsortes oder Arbeitsplatzes oder unseres Kanzleisitzes wenden.</li>
          </ul>

          <h2 style={h2}>8. Widerspruchsrecht</h2>
          <p style={p}>Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO verarbeitet werden, haben Sie das Recht, gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen, soweit dafür Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben oder sich der Widerspruch gegen Direktwerbung richtet. Im letzteren Fall haben Sie ein generelles Widerspruchsrecht, das ohne Angabe einer besonderen Situation von uns umgesetzt wird.</p>
          <p style={p}>Möchten Sie von Ihrem Widerrufs- oder Widerspruchsrecht Gebrauch machen, genügt eine E-Mail an <a href="mailto:d.fiedler@drfiedler-rechtsanwaelte.de" style={{ color: 'var(--green)' }}>d.fiedler@drfiedler-rechtsanwaelte.de</a></p>

          <h2 style={h2}>9. Datensicherheit</h2>
          <p style={p}>Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. In der Regel handelt es sich dabei um eine 256 Bit Verschlüsselung. Ob eine einzelne Seite unseres Internetauftrittes verschlüsselt übertragen wird, erkennen Sie an der geschlossenen Darstellung des Schüssel- beziehungsweise Schloss-Symbols in der unteren Statusleiste Ihres Browsers.</p>
          <p style={p}>Wir bedienen uns im Übrigen geeigneter technischer und organisatorischer Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder gegen den unbefugten Zugriff Dritter zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert.</p>

          <h2 style={h2}>10. Aktualität und Änderung dieser Datenschutzerklärung</h2>
          <p style={p}>Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April 2022.</p>
          <p style={p}>Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf der Website unter <a href="https://www.fiedler-riess.de" style={{ color: 'var(--green)' }}>https://www.fiedler-riess.de</a> von Ihnen abgerufen und ausgedruckt werden.</p>
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { HomeScreen, PracticeScreen, VerkehrsrechtScreen, JagdrechtScreen, FragebogenScreen, AnfahrtScreen, KarriereScreen, ImpressumScreen, DatenschutzScreen });


/* ===== APP ===== */
/* ============================================
   Fiedler & Rieß — Website UI Kit · App
   Click-through shell: header, nav rail over hero/page-header,
   routed screen, footer, dismissible cookie banner.
   ============================================ */
const { useState: useAppState, useEffect: useAppEffect } = React;

const PAGE_META = {
  practice:     { title: 'Arbeitsrecht', tagline: 'Beratung, Verhandlung und Konfliktlösung im Betrieb' },
  verkehrsrecht: { title: 'Verkehrsrecht', tagline: 'Verkehrsrecht von A – Z' },
  jagdrecht:    { title: 'Jagdrecht', tagline: 'Jagd- und Waffenrecht' },
  fragebogen:   { title: 'Sie haben ein Anliegen – wir kümmern uns', tagline: 'Bitte laden Sie das passende Formular herunter und senden Sie es ausgefüllt zurück.' },
  anfahrt:      { title: 'Anfahrt' },
  karriere:     { title: 'Karriere' },
  impressum:    { title: 'Impressum' },
  datenschutz:  { title: 'Datenschutz' },
};

function App() {
  const KNOWN_ROUTES = ['home','practice','verkehrsrecht','jagdrecht','fragebogen','anfahrt','karriere','impressum','datenschutz'];
  const hashRoute = (typeof location !== 'undefined' ? (location.hash || '').replace(/^#/, '') : '');
  const [route, setRoute] = useAppState(KNOWN_ROUTES.indexOf(hashRoute) !== -1 ? hashRoute : 'home');
  const [cookie, setCookie] = useAppState(true);
  const [menuOpen, setMenuOpen] = useAppState(false);
  const isMobile = window.frUseIsMobile();
  const go = (r) => {
    setRoute(r);
    setMenuOpen(false);
    if (typeof history !== 'undefined' && history.replaceState) {
      history.replaceState(null, '', r === 'home' ? location.pathname + location.search : '#' + r);
    }
    window.scrollTo({ top: 0 });
  };

  // Reagiere auf Vor/Zurück und auf Deep-Links von den Formularseiten (index.html#fragebogen)
  useAppEffect(() => {
    const onHash = () => {
      const r = (location.hash || '').replace(/^#/, '');
      setRoute(KNOWN_ROUTES.indexOf(r) !== -1 ? r : 'home');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

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

  // Widget nach dem Rendern laden
  useAppEffect(() => {
    if (window.getAnwaltWidget) {
      setTimeout(() => window.getAnwaltWidget?.(), 200);
    }
  }, [route]);

  return (
    <div style={{ position: 'relative', minHeight: '100%', background: 'var(--white)', display: 'flex', flexDirection: 'column' }}>
      <HeaderBrand go={go} isMobile={isMobile} menuOpen={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />

      {isMobile && <MobileNav items={navItems} open={menuOpen} onNavigate={() => setMenuOpen(false)} />}

      <div style={{ position: 'relative' }}>
        {!isMobile && (
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 200, pointerEvents: 'none' }}>
            <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px', height: '100%' }}>
              <div style={{ display: 'inline-block', height: '100%', background: 'rgba(245,245,243,0.62)', pointerEvents: 'auto' }}>
                <NavRail items={navItems} variant="transparent" />
              </div>
            </div>
          </div>
        )}
        <Hero />
      </div>

      {route !== 'home' && route !== 'fragebogen' && route !== 'verkehrsrecht' && route !== 'jagdrecht' && route !== 'impressum' && route !== 'datenschutz' && <PageHeader title={meta.title} tagline={meta.tagline} />}

      <div style={{ flex: 1 }}>
        {route === 'home' && <HomeScreen go={go} />}
        {route === 'practice' && <PracticeScreen />}
        {route === 'verkehrsrecht' && <VerkehrsrechtScreen go={go} />}
        {route === 'jagdrecht' && <JagdrechtScreen />}
        {route === 'fragebogen' && <FragebogenScreen />}
        {route === 'anfahrt' && <AnfahrtScreen />}
        {route === 'karriere' && <KarriereScreen />}
        {route === 'impressum' && <ImpressumScreen />}
        {route === 'datenschutz' && <DatenschutzScreen />}
      </div>

      <Footer go={go} />
      {cookie && <CookieBanner onClose={() => setCookie(false)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
