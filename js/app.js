function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inline component library for the standalone build — no imports/exports,
   defines the DS namespace directly so the app code works unchanged. */
const {
  Fragment
} = React;
function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  children,
  style,
  ...props
}) {
  const base = {
    fontFamily: 'var(--font-sans)',
    fontWeight: variant === 'text' ? 'var(--fw-regular)' : 'var(--fw-semibold)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-none)',
    transition: 'background var(--ease), color var(--ease), border-color var(--ease)',
    lineHeight: 1
  };
  const sizes = {
    sm: {
      fontSize: '12.5px',
      padding: '7px 16px'
    },
    md: {
      fontSize: '13px',
      padding: '9px 20px'
    },
    lg: {
      fontSize: '14px',
      padding: '12px 26px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--green)',
      color: 'var(--white)',
      borderColor: 'var(--green)'
    },
    secondary: {
      background: 'var(--white)',
      color: 'var(--text)',
      borderColor: 'var(--border)'
    },
    text: {
      background: 'transparent',
      color: 'var(--green)',
      borderColor: 'transparent',
      padding: 0
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `fr-btn fr-btn--${variant}`,
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...style
    }
  }, props), children);
}
function Card({
  header,
  accent = false,
  interactive = false,
  children,
  style,
  bodyStyle,
  ...props
}) {
  const accentStyle = accent ? {
    background: 'var(--light)',
    borderLeft: '3px solid var(--green)',
    border: 'none'
  } : {
    background: 'var(--surface-card)',
    border: '1px solid var(--border)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: interactive ? 'fr-card--interactive' : undefined,
    style: {
      borderRadius: 'var(--radius-none)',
      ...accentStyle,
      ...style
    }
  }, props), header && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--green)',
      color: 'var(--white)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-bold)',
      fontSize: '13.5px',
      textAlign: 'center',
      padding: '9px 14px',
      letterSpacing: 'var(--ls-label)'
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: accent ? '20px 24px' : '14px 16px',
      ...bodyStyle
    }
  }, children));
}
const FR_GLYPHS = {
  mail: 'M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z',
  phone: 'M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
};
function ContactIcon({
  icon = 'mail',
  label,
  href = '#',
  style,
  ...props
}) {
  const vb = icon === 'linkedin' ? '0 0 24 24' : '0 0 20 20';
  return /*#__PURE__*/React.createElement("a", _extends({
    className: "fr-contact-icon",
    href: href,
    title: label,
    "aria-label": label,
    style: {
      width: '28px',
      height: '28px',
      border: '1px solid var(--green)',
      color: 'var(--green)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-none)',
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("svg", {
    viewBox: vb,
    style: {
      width: '13px',
      height: '13px',
      fill: 'currentColor'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: FR_GLYPHS[icon]
  })));
}
function PracticeCard({
  area,
  items = [],
  href = '#',
  moreLabel = '» mehr erfahren',
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--white)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-none)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--green)',
      color: 'var(--white)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-bold)',
      fontSize: '13.5px',
      textAlign: 'center',
      padding: '9px 14px',
      letterSpacing: 'var(--ls-label)'
    }
  }, area), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 12px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'disc',
      paddingLeft: '16px',
      marginBottom: '12px'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      fontSize: '12.5px',
      color: 'var(--text)',
      lineHeight: 1.55,
      marginBottom: '3px'
    }
  }, it))), /*#__PURE__*/React.createElement("a", {
    className: "fr-morelink",
    href: href,
    style: {
      fontSize: '12px',
      color: 'var(--green)',
      textDecoration: 'none',
      marginTop: 'auto'
    }
  }, moreLabel)));
}
function PartnerCard({
  name,
  photo,
  initials,
  title = [],
  contacts = [],
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: '210px',
      textAlign: 'center',
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--green)',
      color: 'var(--white)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: '13px',
      padding: '8px 10px',
      marginBottom: '14px'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      margin: '0 auto 12px',
      overflow: 'hidden',
      background: '#d0d0d0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, photo ? /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '42px',
      color: '#999',
      fontWeight: 'var(--fw-light)'
    }
  }, initials)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11.5px',
      color: 'var(--text-light)',
      lineHeight: 1.55,
      marginBottom: '12px'
    }
  }, title.map((line, i) => /*#__PURE__*/React.createElement(Fragment, {
    key: i
  }, line, i < title.length - 1 && /*#__PURE__*/React.createElement("br", null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '5px',
      justifyContent: 'center'
    }
  }, contacts.map((c, i) => /*#__PURE__*/React.createElement(ContactIcon, {
    key: i,
    icon: c.icon,
    label: c.label,
    href: c.href,
    target: c.target,
    rel: c.target === '_blank' ? 'noopener noreferrer' : undefined
  }))));
}
function NavRail({
  items = [],
  variant = 'charcoal',
  style,
  ...props
}) {
  const transparent = variant === 'transparent';
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: transparent ? 'fr-nav--transparent' : 'fr-nav--charcoal',
    style: {
      background: transparent ? 'transparent' : 'var(--charcoal)',
      width: transparent ? 'auto' : 'var(--nav-w)',
      display: transparent ? 'inline-block' : 'block',
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '6px'
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement(FRNavItem, {
    key: i,
    item: item,
    transparent: transparent
  }))));
}
function FRNavItem({
  item,
  transparent
}) {
  const hasKids = item.children && item.children.length > 0;
  const itemColor = transparent ? 'var(--green)' : 'var(--white)';
  const ddBg = transparent ? 'rgba(245,245,243,0.62)' : 'var(--charcoal)';
  const subColor = transparent ? 'var(--green)' : 'rgba(255,255,255,.85)';
  const enter = e => {
    const dd = e.currentTarget.querySelector(':scope > .fr-dropdown');
    if (dd) dd.style.display = 'block';
  };
  const leave = e => {
    const dd = e.currentTarget.querySelector(':scope > .fr-dropdown');
    if (dd) dd.style.display = 'none';
  };
  return /*#__PURE__*/React.createElement("li", {
    className: "fr-nav-li",
    style: {
      position: 'relative'
    },
    onMouseEnter: enter,
    onMouseLeave: leave
  }, /*#__PURE__*/React.createElement("a", {
    className: transparent ? 'fr-nav-item fr-nav-item--t' : 'fr-nav-item',
    href: item.href || '#',
    onClick: item.onClick,
    style: {
      display: 'block',
      padding: transparent ? '14px 22px' : '11px 16px',
      color: itemColor,
      fontFamily: 'var(--font-sans)',
      fontSize: transparent ? '17px' : '12.5px',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-nav)',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      borderRight: item.active ? '3px solid var(--green)' : '3px solid transparent',
      transition: 'background var(--ease)'
    }
  }, item.label, hasKids ? ' ›' : ''), hasKids && /*#__PURE__*/React.createElement("ul", {
    className: "fr-dropdown",
    style: {
      display: 'none',
      position: 'absolute',
      top: 0,
      left: '100%',
      minWidth: '200px',
      background: ddBg,
      borderLeft: transparent ? 'none' : '2px solid var(--green)',
      zIndex: 300,
      listStyle: 'none'
    }
  }, item.children.map((c, j) => /*#__PURE__*/React.createElement(FRSubItem, {
    key: j,
    item: c,
    transparent: transparent,
    ddBg: ddBg,
    subColor: subColor
  }))));
}
function FRSubItem({
  item,
  transparent,
  ddBg,
  subColor
}) {
  const hasKids = item.children && item.children.length > 0;
  const enter = e => {
    const dd = e.currentTarget.querySelector(':scope > .fr-dropdown');
    if (dd) dd.style.display = 'block';
  };
  const leave = e => {
    const dd = e.currentTarget.querySelector(':scope > .fr-dropdown');
    if (dd) dd.style.display = 'none';
  };
  return /*#__PURE__*/React.createElement("li", {
    style: {
      position: 'relative'
    },
    onMouseEnter: enter,
    onMouseLeave: leave
  }, /*#__PURE__*/React.createElement("a", {
    className: transparent ? 'fr-nav-sub fr-nav-sub--t' : 'fr-nav-sub',
    href: item.href || '#',
    onClick: item.onClick,
    style: {
      display: 'block',
      padding: transparent ? '12px 22px' : '9px 16px',
      color: subColor,
      fontFamily: 'var(--font-sans)',
      fontSize: transparent ? '16px' : '12.5px',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      transition: 'background var(--ease)'
    }
  }, item.label, hasKids ? '  ›' : ''), hasKids && /*#__PURE__*/React.createElement("ul", {
    className: "fr-dropdown",
    style: {
      display: 'none',
      position: 'absolute',
      top: 0,
      left: '100%',
      minWidth: '200px',
      background: ddBg,
      borderLeft: transparent ? 'none' : '2px solid var(--green)',
      zIndex: 300,
      listStyle: 'none'
    }
  }, item.children.map((c, k) => /*#__PURE__*/React.createElement(FRSubItem, {
    key: k,
    item: c,
    transparent: transparent,
    ddBg: ddBg,
    subColor: subColor
  }))));
}
window.FiedlerRieDesignSystem_490d4c = {
  Button,
  Card,
  ContactIcon,
  PracticeCard,
  PartnerCard,
  NavRail
};

/* ===== CHROME ===== */
/* ============================================
   Fiedler & Rieß — Website UI Kit · Chrome
   Header brand, hero slider, footer, cookie banner.
   Composes NavRail from the design-system bundle.
   ============================================ */
const {
  useState,
  useEffect
} = React;
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
function MobileNavItem({
  item,
  depth,
  onNavigate
}) {
  const hasKids = item.children && item.children.length > 0;
  const [open, setOpen] = useState(depth === 0 && !!item.active);
  const pad = 18 + depth * 18;
  const labelClick = e => {
    e.preventDefault();
    if (item.onClick) {
      item.onClick(e);
      onNavigate();
    } else if (hasKids) setOpen(o => !o);
  };
  return /*#__PURE__*/React.createElement("li", {
    style: {
      listStyle: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      borderBottom: '1px solid rgba(255,255,255,.08)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: item.href || '#',
    onClick: labelClick,
    style: {
      flex: 1,
      padding: `15px ${pad}px`,
      color: item.active ? 'var(--green)' : '#fff',
      fontFamily: 'var(--font-sans)',
      fontSize: depth === 0 ? '16px' : '15px',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '.05em',
      textTransform: 'uppercase',
      textDecoration: 'none'
    }
  }, item.label), hasKids && /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    "aria-label": "Untermen\xFC",
    style: {
      width: 52,
      background: 'none',
      border: 'none',
      borderLeft: '1px solid rgba(255,255,255,.08)',
      color: 'var(--green)',
      fontSize: 20,
      cursor: 'pointer',
      transition: 'transform var(--ease)',
      transform: open ? 'rotate(90deg)' : 'none'
    }
  }, "\u203A")), hasKids && open && /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      background: 'rgba(0,0,0,.18)'
    }
  }, item.children.map((c, i) => /*#__PURE__*/React.createElement(MobileNavItem, {
    key: i,
    item: c,
    depth: depth + 1,
    onNavigate: onNavigate
  }))));
}
function MobileNav({
  items,
  open,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      maxHeight: open ? '80vh' : 0,
      transition: 'max-height .3s ease',
      background: 'var(--charcoal)',
      borderTop: open ? '3px solid var(--green)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      overflowY: 'auto',
      maxHeight: '80vh'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement(MobileNavItem, {
    key: i,
    item: it,
    depth: 0,
    onNavigate: onNavigate
  }))));
}
const NAV_ITEMS = (go, current) => [{
  label: 'Start',
  href: '#',
  active: current === 'home',
  onClick: e => {
    e.preventDefault();
    go('home');
  }
}, {
  label: 'Rechtsgebiete',
  href: '#',
  active: current === 'practice',
  children: [{
    label: 'Arbeitsrecht',
    href: '#',
    onClick: e => {
      e.preventDefault();
      go('practice');
    }
  }, {
    label: 'Verkehrsrecht',
    href: '#',
    onClick: e => {
      e.preventDefault();
      go('practice');
    }
  }, {
    label: 'Jagdrecht',
    href: '#',
    onClick: e => {
      e.preventDefault();
      go('practice');
    }
  }]
}, {
  label: 'Karriere',
  href: '#',
  active: current === 'karriere',
  onClick: e => {
    e.preventDefault();
    go('karriere');
  }
}, {
  label: 'Anfahrt',
  href: '#',
  active: current === 'anfahrt',
  onClick: e => {
    e.preventDefault();
    go('anfahrt');
  }
}];
function HeaderBrand({
  go,
  isMobile,
  menuOpen,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'var(--white)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--max-w)',
      margin: '0 auto',
      padding: isMobile ? '20px 16px 18px' : '44px 20px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'left',
      borderLeft: '1px solid var(--border)',
      paddingLeft: isMobile ? 14 : 22,
      cursor: 'pointer'
    },
    onClick: () => go('home')
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `300 ${isMobile ? '25px' : '42px'}/1.18 var(--font-sans)`,
      color: 'var(--green)',
      display: 'block'
    }
  }, "Fiedler & Rie\xDF"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `300 ${isMobile ? '13px' : '18px'}/1.3 var(--font-sans)`,
      color: 'var(--green)',
      display: 'block',
      marginTop: 2
    }
  }, "Rechtsanw\xE4lte PartGmbB")), isMobile && /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    "aria-label": "Men\xFC \xF6ffnen",
    "aria-expanded": menuOpen,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 5,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 26,
      height: 3,
      background: 'var(--green)',
      transition: 'transform var(--ease), opacity var(--ease)',
      transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 26,
      height: 3,
      background: 'var(--green)',
      transition: 'opacity var(--ease)',
      opacity: menuOpen ? 0 : 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 26,
      height: 3,
      background: 'var(--green)',
      transition: 'transform var(--ease)',
      transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none'
    }
  }))));
}
function Hero({
  children
}) {
  const isMobile = frUseIsMobile();
  const [cur, setCur] = useState(0);
  const slides = ['img/hero1.png', 'img/hero2.png'];
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, children, /*#__PURE__*/React.createElement("div", {
    style: {
      height: isMobile ? 180 : 310,
      position: 'relative',
      overflow: 'hidden',
      background: '#4a4a4a'
    }
  }, slides.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: `url('${s}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 30%',
      backgroundRepeat: 'no-repeat',
      transform: i === cur ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 1.1s ease',
      opacity: i === cur ? 1 : 0
    }
  }))));
}
function KanzleiBox({
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '1px solid var(--border)',
      padding: '2px 0 2px 18px',
      textAlign: 'left',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 14px var(--font-sans)',
      color: 'var(--green)',
      display: 'block'
    }
  }, "Fiedler & Rie\xDF"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 12px var(--font-sans)',
      color: 'var(--text-light)'
    }
  }, "Rechtsanw\xE4lte PartGmbB"));
}
function PageHeader({
  title,
  tagline
}) {
  const isMobile = frUseIsMobile();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--white)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--max-w)',
      margin: '0 auto',
      padding: isMobile ? '26px 16px 4px' : '34px 20px 8px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'flex-start',
      gap: isMobile ? 18 : 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: `300 ${isMobile ? '26px' : '30px'} var(--font-sans)`,
      color: 'var(--text)',
      display: 'inline-block',
      paddingBottom: 8,
      borderBottom: '2px solid var(--green)'
    }
  }, title), tagline && /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px var(--font-sans)',
      color: 'var(--text-light)',
      marginTop: 12
    }
  }, tagline)), !isMobile && /*#__PURE__*/React.createElement("aside", {
    style: {
      flex: '0 0 220px',
      borderLeft: '1px solid var(--border)',
      paddingLeft: 24,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(KanzleiBox, {
    style: {
      border: 'none',
      padding: 0,
      textAlign: 'center'
    }
  }))));
}
function Footer({
  go
}) {
  const nav = r => e => {
    e.preventDefault();
    if (go) go(r);
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--white)',
      borderTop: '1px solid var(--border)',
      padding: '15px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--max-w)',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--green)',
      font: '700 13px var(--font-sans)',
      display: 'block'
    }
  }, "Fiedler & Rie\xDF Rechtsanw\xE4lte PartGmbB"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-light)',
      font: '400 12px var(--font-sans)'
    }
  }, "Rotenburger Str. 17 \xB7 36199 Rotenburg a.d. Fulda")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: nav('impressum'),
    style: {
      color: 'var(--green)',
      font: '400 13px var(--font-sans)'
    }
  }, "Impressum"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: nav('datenschutz'),
    style: {
      color: 'var(--green)',
      font: '400 13px var(--font-sans)'
    }
  }, "Datenschutz"))));
}
function CookieBanner({
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'var(--white)',
      borderTop: '1px solid var(--border)',
      padding: '18px 20px',
      zIndex: 9999,
      boxShadow: '0 -3px 12px rgba(0,0,0,.09)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--max-w)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: '700 14px var(--font-sans)',
      marginBottom: 6
    }
  }, "Cookie-Einstellungen"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 12.5px/1.5 var(--font-sans)',
      color: 'var(--text-light)',
      marginBottom: 14
    }
  }, "Diese Webseite verwendet Cookies, um Besuchern ein optimales Nutzererlebnis zu bieten. Bestimmte Inhalte von Drittanbietern werden nur angezeigt, wenn die entsprechende Option aktiviert ist. Weitere Informationen in der ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--green)'
    }
  }, "Datenschutzerkl\xE4rung"), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      flexWrap: 'wrap',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      font: '400 12.5px var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: true,
    disabled: true,
    style: {
      accentColor: 'var(--green)'
    }
  }), " Technisch notwendige"), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      font: '400 12.5px var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    style: {
      accentColor: 'var(--green)'
    }
  }), " Analytische"), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      font: '400 12.5px var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    style: {
      accentColor: 'var(--green)'
    }
  }), " Drittanbieter-Inhalte")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onClose
  }, "Ablehnen"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onClose
  }, "Alle akzeptieren"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onClose
  }, "Speichern"))));
}
Object.assign(window, {
  HeaderBrand,
  Hero,
  PageHeader,
  KanzleiBox,
  Footer,
  CookieBanner,
  NAV_ITEMS,
  NavRail,
  MobileNav,
  frUseIsMobile
});

/* ===== SCREENS ===== */
/* ============================================
   Fiedler & Rieß — Website UI Kit · Screens
   Home, Practice (Arbeitsrecht), Fragebogen, Anfahrt, Karriere.
   Composes DS components: PracticeCard, PartnerCard, Card, Button.
   ============================================ */
/* inline */
const FRBox = window.KanzleiBox;
const CONTAINER = {
  maxWidth: 'var(--max-w)',
  margin: '0 auto',
  padding: '0 20px'
};

/* ---------- HOME ---------- */
function HomeScreen({
  go
}) {
  const isMobile = window.frUseIsMobile();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--white)',
      padding: isMobile ? '26px 0 18px' : '40px 0 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--max-w)',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'flex-start',
      gap: isMobile ? 20 : 50
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: `300 ${isMobile ? '26px' : '30px'}/1.35 var(--font-sans)`,
      color: 'var(--text)',
      maxWidth: 760,
      flex: 1
    }
  }, "Fokussiert", /*#__PURE__*/React.createElement("br", null), "auf Struktur und L\xF6sung."), !isMobile && /*#__PURE__*/React.createElement("aside", {
    style: {
      flex: '0 0 220px',
      borderLeft: '1px solid var(--border)',
      paddingLeft: 24,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(FRBox, {
    style: {
      border: 'none',
      padding: 0,
      textAlign: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)',
      marginTop: 20,
      paddingTop: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://anwaltverein.de/",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      font: '400 13px/1.4 var(--font-sans)',
      color: 'var(--green)',
      textDecoration: 'none'
    }
  }, "Deutscher Anwaltverein"), /*#__PURE__*/React.createElement("a", {
    href: "https://anwaltverein.de/mitgliedschaft/arbeitsgemeinschaften/verkehrsrecht",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      font: '400 13px/1.4 var(--font-sans)',
      color: 'var(--green)',
      textDecoration: 'none'
    }
  }, "Arbeitsgemeinschaft Verkehrsrecht"), /*#__PURE__*/React.createElement("a", {
    href: "https://www.anwalt.de/riess-stephan",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      font: '400 13px/1.4 var(--font-sans)',
      color: 'var(--green)',
      textDecoration: 'none'
    }
  }, "Stephan Rie\xDF auf anwalt.de"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--white)',
      padding: isMobile ? '8px 0 30px' : '0 0 44px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--max-w)',
      margin: '0 auto',
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PracticeCard, {
    area: "Arbeitsrecht",
    href: "#",
    moreLabel: ">> mehr erfahren",
    items: ['Verhandlungen', 'Konfliktlösung, Schlichtung und Einigungsstellen', 'Arbeitszeit', 'Vergütungssysteme', 'Umstrukturierungen'],
    onClick: e => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        go('practice');
      }
    }
  }), /*#__PURE__*/React.createElement(PracticeCard, {
    area: "Verkehrsrecht",
    href: "#",
    moreLabel: ">> mehr erfahren",
    items: ['Unfallregulierung', 'Personen- und Sachschäden', 'Bußgeld', 'Verkehrsstrafsachen', 'Ordnungswidrigkeiten', 'Führerscheinsachen'],
    onClick: e => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        go('verkehrsrecht');
      }
    }
  }), /*#__PURE__*/React.createElement(PracticeCard, {
    area: "Jagdrecht",
    href: "#",
    moreLabel: ">> mehr erfahren",
    items: ['Beratung im Jagd- und Waffenrecht', 'Jagdschein-/WBK-Sachen', 'Ordnungswidrigkeiten- und Strafsachen mit jagdrechtlichem Bezug', 'Jagdpacht- und Revierangelegenheiten'],
    onClick: e => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        go('jagdrecht');
      }
    }
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--white)',
      padding: isMobile ? '32px 0 40px' : '40px 0 50px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...CONTAINER,
      display: 'flex',
      justifyContent: isMobile ? 'center' : 'flex-start',
      gap: isMobile ? 36 : 50,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(PartnerCard, {
    name: "Dr. Dominik Fiedler",
    photo: "img/fiedler.png",
    initials: "DF",
    title: ['Rechtsanwalt | Fachanwalt für Arbeitsrecht | Partner'],
    contacts: [{
      icon: 'mail',
      label: 'E-Mail',
      href: 'mailto:d.fiedler@fiedler-riess.de'
    }, {
      icon: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile',
      target: '_blank'
    }, {
      icon: 'phone',
      label: 'Telefon',
      href: 'tel:+4917476936860'
    }]
  }), /*#__PURE__*/React.createElement(PartnerCard, {
    name: "Stephan Rie\xDF",
    photo: "img/riess.png",
    initials: "SR",
    title: ['Rechtsanwalt | Fachanwalt für Verkehrsrecht | Partner'],
    contacts: [{
      icon: 'mail',
      label: 'E-Mail',
      href: 'mailto:s.riess@fiedler-riess.de'
    }, {
      icon: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/stephan-rieß-a46576416',
      target: '_blank'
    }, {
      icon: 'phone',
      label: 'Telefon',
      href: 'tel:+4966233008120'
    }]
  }))));
}

/* ---------- PRACTICE DETAIL (Arbeitsrecht) ---------- */
function PracticeScreen() {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: '40px 0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: CONTAINER
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 16
    }
  }, "Wir \xFCbernehmen ausgew\xE4hlte Mandate im Arbeitsrecht."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 16
    }
  }, "Der Fokus liegt auf Situationen, in denen Standardl\xF6sungen nicht tragen \u2013 insbesondere im Betriebsverfassungsrecht, bei Arbeitszeit- und Verg\xFCtungssystemen sowie bei Umstrukturierungen."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 34
    }
  }, "Unsere T\xE4tigkeit ist auf Beratung, Verhandlung und Konfliktl\xF6sung ausgerichtet."), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '700 17px var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 12,
      paddingBottom: 6,
      borderBottom: '2px solid var(--green)',
      display: 'inline-block'
    }
  }, "Wof\xFCr wir beauftragt werden"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'disc',
      paddingLeft: 20,
      marginBottom: 30
    }
  }, ['Entwicklung und Strukturierung von Betriebsvereinbarungen', 'Begleitung anspruchsvoller Verhandlungen zwischen den Betriebsparteien', 'Gestaltung von Arbeitszeit- und Vergütungssystemen', 'Unterstützung bei Umstrukturierungen und Betriebsänderungen', 'Vorbereitung und Begleitung von Einigungsstellenverfahren als Vorsitzender oder Beisitzer'].map((t, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      font: '400 14px/1.7 var(--font-sans)',
      marginBottom: 6
    }
  }, t))), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 16
    }
  }, "Unsere Arbeit verbindet juristische Pr\xE4zision mit methodischer Verhandlungsf\xFChrung. Durch Erfahrung in der Beratung sowohl von Arbeitgebern als auch von Betriebsr\xE4ten besteht ein klares Verst\xE4ndnis f\xFCr Dynamiken, Interessen und Entscheidungsprozesse. Ziel ist eine L\xF6sung, die rechtlich belastbar und praktisch umsetzbar ist."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 16
    }
  }, "Wir beraten Betriebsparteien in mittelgro\xDFen Unternehmen sowie in Konzernen mit komplexen Strukturen. Die Mandate sind regelm\xE4\xDFig durch anspruchsvolle Verhandlungs- und Entscheidungsprozesse gepr\xE4gt. Ein Teil unserer Mandatsbeziehungen besteht seit vielen Jahren.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34,
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement(Card, {
    accent: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '700 16px var(--font-sans)',
      marginBottom: 10
    }
  }, "Ansprechpartner"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.7 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 4
    }
  }, "Die Mandatsarbeit erfolgt pers\xF6nlich."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.7 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 14
    }
  }, "F\xFCr den Bereich Arbeitsrecht stehen Ihnen ", /*#__PURE__*/React.createElement("strong", null, "Dr. Dominik Fiedler"), " und ", /*#__PURE__*/React.createElement("strong", null, "Mona Broghammer"), " zur Verf\xFCgung."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:arbeitsrecht@fiedler-riess.de",
    style: {
      color: 'var(--green)'
    }
  }, "arbeitsrecht@fiedler-riess.de"))))));
}

/* ---------- VERKEHRSRECHT ---------- */
function SectionHead({
  children
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '700 15px var(--font-sans)',
      color: 'var(--green)',
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      marginBottom: 12,
      marginTop: 32
    }
  }, children);
}
function VerkehrsrechtScreen({
  go
}) {
  const isMobile = window.frUseIsMobile();
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: isMobile ? '28px 0 48px' : '40px 0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...CONTAINER,
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'flex-start',
      gap: isMobile ? 36 : 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: `300 ${isMobile ? '26px' : '30px'} var(--font-sans)`,
      color: 'var(--text)',
      display: 'inline-block',
      paddingBottom: 8,
      borderBottom: '2px solid var(--green)',
      marginBottom: 28
    }
  }, "Verkehrsrecht von A \u2013 Z"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '300 22px var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 18
    }
  }, "Handwerklich pr\xE4zise \u2013 Exzellent"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 16
    }
  }, "Ob Unfall, Fahrzeugkauf oder Bu\xDFgeldbescheid \u2013 Rechtsanwalt Stephan Rie\xDF beherrscht als Fachanwalt alle Facetten des Verkehrsrechts."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)'
    }
  }, "Wir sind bundesweit t\xE4tig und nachgefragt."), /*#__PURE__*/React.createElement(SectionHead, null, "Unfallregulierung"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 16
    }
  }, "Ein Schwerpunkt unserer verkehrsrechtlichen Praxis liegt in der Regulierung von Verkehrsunf\xE4llen im In- und Ausland einschlie\xDFlich von Fahrzeug- und Personensch\xE4den."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 16
    }
  }, "Unsere Mandanten unterst\xFCtzen wir \u2013 in dieser oft belastenden Situation \u2013 umfassend und helfen ihnen aktiv. Wir k\xFCmmern uns f\xFCr sie um die Abwicklung mit Versicherern, Sachverst\xE4ndigen, Berufsgenossenschaften, Integrationsstellen, Versorgungs\xE4mtern, Gerichten, Staatsanwaltschaften, Beh\xF6rden und allen weiteren Beteiligten."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)'
    }
  }, "Sach- und Personensch\xE4den arbeiten wir auf und setzen sie fachm\xE4nnisch durch, sei es beim Unfallgegner, dessen Versicherung oder auch der eigenen Versicherung (z.B. Haftpflicht, Kasko, Unfall, Rechtschutz, Berufsunf\xE4higkeit)."), /*#__PURE__*/React.createElement(SectionHead, null, "Fahrzeugkauf und -Leasing"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)'
    }
  }, "Beim Kauf und Leasing von Neu- und Gebrauchtfahrzeugen beraten wir sowohl vor als auch nach Vertragsabschluss. Autos, Wohnmobile, Motorr\xE4der, Fahrr\xE4der oder E-Bikes \u2013 Probleme mit dem Fahrzeug f\xFChren wir interessengerechte L\xF6sungen zu, seien es unwahre Werbeaussagen oder sonstige technische M\xE4ngel."), /*#__PURE__*/React.createElement(SectionHead, null, "Fehlverhalten im Stra\xDFenverkehr"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)'
    }
  }, "Ob Bu\xDFgeldverfahren oder strafrechtliches Ermittlungsverfahren, in diesen oft schwierigen Situationen stehen wir mit Rat und Tat zur Seite. Gemeinsam treten wir den Tatvorw\xFCrfen sachgerecht entgegen. H\xE4ufig entscheiden Details. Diese aufzusp\xFCren sowie strategisch und zielorientiert einzusetzen bedarf nicht nur besonderer Erfahrung, sondern ist zugleich unsere Motivation."), /*#__PURE__*/React.createElement(SectionHead, null, "Recht & Psychologie"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 16
    }
  }, "Wurde die Fahrerlaubnis bereits entzogen, kl\xE4ren wir die M\xF6glichkeiten, diese wiederzuerlangen. Das tun wir in enger Zusammenarbeit mit Diana Voigt-Hohoff, Inhaberin der DVH-Praxis f\xFCr Organisationsberatung, Coaching, Supervision und MPU-Schulung, die auf fachliche Stellungnahmen und Begutachtungen zur pers\xF6nlichen Eignung und Zuverl\xE4ssigkeit im Rahmen beh\xF6rdlicher Verfahren (z. B. MPU-Kontext) spezialisiert ist."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)'
    }
  }, "Das Ziel ist, die MPU-Pr\xFCfung zu bestehen und k\xFCnftige Gesetzeskonflikte zu vermeiden. Die MPU ist kein Wissenstest, sondern ein komplexer Vorgang zur \xDCberpr\xFCfung der pers\xF6nlichen Eignung zum F\xFChren von Kfz im Stra\xDFenverkehr \u2013 dasselbe gilt auch f\xFCr den ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go && go('jagdrecht');
    },
    style: {
      color: 'var(--green)'
    }
  }, "Jagdschein bzw. die Waffenbesitzkarte"), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '24px 0 8px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.dvhpraxis.de/",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'inline-block',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "img/dvh-logo.png",
    alt: "Diana Voigt-Hohoff",
    style: {
      width: 150,
      height: 'auto',
      display: 'block',
      margin: '0 auto'
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 13.5px/1.6 var(--font-sans)',
      color: 'var(--text-light)',
      marginTop: 14
    }
  }, "Praxis f\xFCr Organisationsberatung,", /*#__PURE__*/React.createElement("br", null), "Coaching, Supervision und MPU-Schulung"))), /*#__PURE__*/React.createElement("aside", {
    style: {
      flex: isMobile ? '1 1 auto' : '0 0 220px',
      alignSelf: isMobile ? 'center' : 'auto',
      textAlign: 'center',
      borderLeft: isMobile ? 'none' : '1px solid var(--border)',
      borderTop: isMobile ? '1px solid var(--border)' : 'none',
      paddingLeft: isMobile ? 0 : 24,
      paddingTop: isMobile ? 28 : 0,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(FRBox, {
    style: {
      border: 'none',
      padding: 0,
      textAlign: 'center',
      marginBottom: 28
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: '700 15px/1.35 var(--font-sans)',
      color: 'var(--green)',
      textTransform: 'uppercase',
      letterSpacing: '.02em',
      marginBottom: 18
    }
  }, "Auf Spur \u2013 im", /*#__PURE__*/React.createElement("br", null), "Verkehrsrecht"), /*#__PURE__*/React.createElement("img", {
    src: "img/riess.png",
    alt: "Stephan Rie\xDF",
    style: {
      width: 150,
      height: 150,
      borderRadius: '50%',
      objectFit: 'cover',
      display: 'block',
      margin: '0 auto 16px'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '600 14px var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 12
    }
  }, "Stephan Rie\xDF"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 13.5px/1.7 var(--font-sans)',
      color: 'var(--text-light)'
    }
  }, "Rechtsanwalt und", /*#__PURE__*/React.createElement("br", null), "Fachanwalt f\xFCr", /*#__PURE__*/React.createElement("br", null), "Verkehrsrecht"))));
}

/* ---------- JAGDRECHT ---------- */
function JagdrechtScreen() {
  const isMobile = window.frUseIsMobile();
  const head = {
    font: '700 16px var(--font-sans)',
    color: 'var(--green)',
    marginTop: 32,
    marginBottom: 12
  };
  const para = {
    font: '400 14px/1.75 var(--font-sans)',
    color: 'var(--text)',
    marginBottom: 16
  };
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: isMobile ? '28px 0 48px' : '40px 0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...CONTAINER,
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'flex-start',
      gap: isMobile ? 36 : 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: `300 ${isMobile ? '26px' : '30px'} var(--font-sans)`,
      color: 'var(--text)',
      display: 'inline-block',
      paddingBottom: 8,
      borderBottom: '2px solid var(--green)',
      marginBottom: 28
    }
  }, "Jagdrecht"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '300 22px var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 18
    }
  }, "Handwerklich pr\xE4zise \u2013 Treffsicher"), /*#__PURE__*/React.createElement("p", {
    style: para
  }, "Als passionierter J\xE4ger ber\xE4t und vertritt Stephan Rie\xDF Sie umfassend im Jagd- und Waffenrecht, insbesondere bei der Erteilung, dem Erhalt und der Wiedererlangung von Jagdschein und Waffenbesitzkarte (WBK)."), /*#__PURE__*/React.createElement("p", {
    style: para
  }, "Gerade nach bu\xDFgeld- oder strafrechtlichen Vorf\xE4llen drohen der Entzug des Jagdscheins oder der Widerruf der WBK. Ein Schwerpunkt liegt auf der Pr\xFCfung von Zuverl\xE4ssigkeit und pers\xF6nlicher Eignung nach \xA7\xA7 5, 6 WaffG."), /*#__PURE__*/React.createElement("p", {
    style: para
  }, "Eine fr\xFChzeitige anwaltliche Unterst\xFCtzung ist hier entscheidend, um Ihre Rechte effektiv zu sichern."), /*#__PURE__*/React.createElement("h2", {
    style: head
  }, "Verkehrsrecht \u2013 Jagdrecht \u2013 Waffenrecht"), /*#__PURE__*/React.createElement("p", {
    style: para
  }, "Verkehrsverst\xF6\xDFe k\xF6nnen zur \xDCberpr\xFCfung Ihrer waffenrechtlichen Zuverl\xE4ssigkeit f\xFChren \u2013 bis hin zu MPU-Anordnung, Entzug des Jagdscheins oder Widerruf der Waffenbesitzkarte."), /*#__PURE__*/React.createElement("p", {
    style: para
  }, "Als Fachanwalt f\xFCr Verkehrsrecht verf\xFCgt Stephan Rie\xDF \xFCber umfassende Erfahrung in Bu\xDFgeld-, Straf- und Verwaltungsverfahren und setzt dieses Wissen gezielt f\xFCr Ihre Interessen und Zielsetzung im Jagd- und Waffenrecht ein."), /*#__PURE__*/React.createElement("h2", {
    style: head
  }, "Recht & Psychologie im Schulterschluss \u2013 Interdisziplin\xE4re Zusammenarbeit"), /*#__PURE__*/React.createElement("p", {
    style: para
  }, "Ein Alleinstellungsmerkmal ist die Zusammenarbeit mit Diana Voigt-Hohoff, Inhaberin der DVH-Praxis f\xFCr Organisationsberatung, Coaching, Supervision und MPU-Schulung, die auf fachliche Stellungnahmen und Begutachtungen zur pers\xF6nlichen Eignung und Zuverl\xE4ssigkeit im Rahmen beh\xF6rdlicher Verfahren (z. B. MPU-Kontext) spezialisiert ist. So k\xF6nnen rechtliche und tats\xE4chliche Aspekte optimal miteinander verzahnt und Ihre Erfolgschancen gezielt verbessert werden."), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '24px 0 8px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.dvhpraxis.de/",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'inline-block',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "img/dvh-logo.png",
    alt: "Diana Voigt-Hohoff",
    style: {
      width: 150,
      height: 'auto',
      display: 'block',
      margin: '0 auto'
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 13.5px/1.6 var(--font-sans)',
      color: 'var(--text-light)',
      marginTop: 14
    }
  }, "Praxis f\xFCr Organisationsberatung,", /*#__PURE__*/React.createElement("br", null), "Coaching, Supervision und MPU-Schulung")), /*#__PURE__*/React.createElement("h2", {
    style: head
  }, "Regional f\xFCr Sie t\xE4tig \u2013 Nordhessen, Osthessen & Westth\xFCringen"), /*#__PURE__*/React.createElement("p", {
    style: para
  }, "Gemeinsam sind wir Ihre Ansprechpartner im Jagd- und Waffenrecht in Nordhessen, Osthessen und Westth\xFCringen, insbesondere in Rotenburg a. d. Fulda, Bad Hersfeld, Fulda, Kassel, Eisenach und Gotha.")), /*#__PURE__*/React.createElement("aside", {
    style: {
      flex: isMobile ? '1 1 auto' : '0 0 220px',
      alignSelf: isMobile ? 'center' : 'auto',
      textAlign: 'center',
      borderLeft: isMobile ? 'none' : '1px solid var(--border)',
      borderTop: isMobile ? '1px solid var(--border)' : 'none',
      paddingLeft: isMobile ? 0 : 24,
      paddingTop: isMobile ? 28 : 0,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(FRBox, {
    style: {
      border: 'none',
      padding: 0,
      textAlign: 'center',
      marginBottom: 28
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: '700 15px/1.35 var(--font-sans)',
      color: 'var(--green)',
      textTransform: 'uppercase',
      letterSpacing: '.02em',
      marginBottom: 18
    }
  }, "Zielsicher \u2013 im Jagd-", /*#__PURE__*/React.createElement("br", null), "und Waffenrecht"), /*#__PURE__*/React.createElement("img", {
    src: "img/riess.png",
    alt: "Stephan Rie\xDF",
    style: {
      width: 150,
      height: 150,
      borderRadius: '50%',
      objectFit: 'cover',
      display: 'block',
      margin: '0 auto 16px'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '600 14px var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 12
    }
  }, "Stephan Rie\xDF"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 13.5px/1.7 var(--font-sans)',
      color: 'var(--text-light)'
    }
  }, "Rechtsanwalt und", /*#__PURE__*/React.createElement("br", null), "Fachanwalt f\xFCr", /*#__PURE__*/React.createElement("br", null), "Verkehrsrecht"))));
}

/* ---------- FRAGEBOGEN ---------- */
function FragebogenScreen() {
  const isMobile = window.frUseIsMobile();
  const rows = [{
    text: /*#__PURE__*/React.createElement(React.Fragment, null, "Sie m\xF6chten uns Angaben zur Mandatsaufnahme machen? Hier gehte es zu unserem Mandantenbogen."),
    cta: 'Mandantenbogen',
    href: 'docs/mandantenbogen.pdf'
  }, {
    text: /*#__PURE__*/React.createElement(React.Fragment, null, "Sie hatten einen Unfall und Sie m\xF6chten uns schildern, was passiert ist? Hier geht zu unserem Fragebogen zum Unfallgeschehen:"),
    cta: 'Unfallfragebogen',
    href: 'docs/unfallfragebogen.pdf'
  }, {
    text: /*#__PURE__*/React.createElement(React.Fragment, null, "Sie haben einen Bu\xDFgeldbescheid oder einen Strafbefehl erhalten und Ihnen droht ein Fahrverbot? Hier geht es zu unserem Fragebogen zum Fahrverbot:"),
    cta: 'Fahrverbotfragebogen',
    href: 'docs/fahrverbotfragebogen.pdf'
  }, {
    text: /*#__PURE__*/React.createElement(React.Fragment, null, "Sie m\xF6chten uns Unterlagen (Fotos, Gutachten, Rechnungen, \u2026) zukommen lassen?"),
    cta: 'Unterlagen Upload',
    href: 'https://app.jupus.de/client/portal/external/questionnaires/zBn2LNWXVWzzSASw1qVtlKzejSxZHnnuGx3Jgj_4gu1w7qVt/5lomOa4HwnxEHkFl3u6iLC5jT50weh2U6iI1kF_lotyIS8GH'
  }];
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: '34px 0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: CONTAINER
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'flex-start',
      gap: isMobile ? 18 : 50,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: `300 ${isMobile ? '26px' : '30px'} var(--font-sans)`,
      color: 'var(--text)',
      display: 'inline-block',
      paddingBottom: 8,
      borderBottom: '2px solid var(--green)',
      maxWidth: 760,
      flex: 1
    }
  }, "Sie haben ein Anliegen - wir k\xFCmmern uns."), !isMobile && /*#__PURE__*/React.createElement("aside", {
    style: {
      flex: '0 0 220px',
      borderLeft: '1px solid var(--border)',
      paddingLeft: 24,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(FRBox, {
    style: {
      border: 'none',
      padding: 0,
      textAlign: 'center'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? 24 : 36,
      maxWidth: 760
    }
  }, rows.map((r, i) => {
    const isPdf = (r.href || '').endsWith('.pdf');
    const icon = isPdf ? /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "14 2 14 8 20 8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "13",
      x2: "16",
      y2: "13"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "17",
      x2: "13",
      y2: "17"
    })) : /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "17 8 12 3 7 8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "3",
      x2: "12",
      y2: "15"
    }));
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 280px',
        gap: isMobile ? 14 : 40,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: '400 15px/1.6 var(--font-sans)',
        color: 'var(--text-light)'
      }
    }, r.text), /*#__PURE__*/React.createElement("a", {
      href: r.href || '#',
      target: r.href ? '_blank' : undefined,
      rel: r.href ? 'noopener noreferrer' : undefined,
      onClick: r.href ? undefined : e => e.preventDefault(),
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 12,
        background: 'var(--green)',
        color: 'var(--white)',
        font: '600 15px var(--font-sans)',
        padding: '16px 22px',
        textDecoration: 'none',
        transition: 'background var(--ease)'
      },
      onMouseEnter: e => e.currentTarget.style.background = 'var(--green-dark)',
      onMouseLeave: e => e.currentTarget.style.background = 'var(--green)'
    }, icon, r.cta));
  }))));
}

/* ---------- ANFAHRT ---------- */
function AnfahrtScreen() {
  const isMobile = window.frUseIsMobile();
  const [active, setActive] = React.useState(false);
  const mapSrc = 'https://www.google.com/maps?q=Rotenburger+Str.+17,+36199+Rotenburg+an+der+Fulda&output=embed';
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: isMobile ? '20px 0 48px' : '24px 0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: CONTAINER
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      border: '1px solid var(--border)',
      height: isMobile ? 340 : 460
    }
  }, active ? /*#__PURE__*/React.createElement("iframe", {
    title: "Google Maps \u2013 Fiedler & Rie\xDF",
    src: mapSrc,
    style: {
      width: '100%',
      height: '100%',
      border: 0,
      display: 'block'
    },
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade"
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: 'var(--light)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      textAlign: 'center',
      padding: 24,
      backgroundImage: 'linear-gradient(rgba(0,0,0,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.02) 1px, transparent 1px)',
      backgroundSize: '28px 28px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 13.5px/1.6 var(--font-sans)',
      color: 'var(--text-light)',
      maxWidth: 460
    }
  }, "Mit dem Laden der Karte akzeptieren Sie die Datenschutzerkl\xE4rung von Google."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setActive(true)
  }, "Karte aktivieren")))));
}

/* ---------- KARRIERE ---------- */
function KarriereScreen() {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: '40px 0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: CONTAINER
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '300 22px var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 22
    }
  }, "Unser Team sucht Verst\xE4rkung."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 16
    }
  }, "In unserer Partnerschaft sind noch Pl\xE4tze frei."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 16
    }
  }, "Wir suchen zum n\xE4chst m\xF6glichen Zeitpunkt mehrere Rechtsanw\xE4lte (m/w/d), die sich uns als Partner anschlie\xDFen m\xF6chten."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.75 var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 34
    }
  }, "Bevorzugt sind Fachanw\xE4lte (m/w/d) aus bisher nicht abgedeckten Rechtsbereichen (z.B. Miet-, Familien- oder Erbrecht)."), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '700 17px var(--font-sans)',
      color: 'var(--text)',
      marginBottom: 14,
      paddingBottom: 6,
      borderBottom: '2px solid var(--green)',
      display: 'inline-block'
    }
  }, "Ansprechpartner"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.9 var(--font-sans)',
      color: 'var(--text)'
    }
  }, "Dr. Dominik Fiedler"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 14px/1.9 var(--font-sans)',
      color: 'var(--text)'
    }
  }, "Stephan Rie\xDF"))));
}

/* ---------- IMPRESSUM ---------- */
function ImpressumScreen() {
  const isMobile = window.frUseIsMobile();
  const h2 = {
    font: '700 17px var(--font-sans)',
    color: 'var(--text)',
    margin: '34px 0 12px',
    paddingBottom: 6,
    borderBottom: '2px solid var(--green)',
    display: 'inline-block'
  };
  const p = {
    font: '400 14px/1.75 var(--font-sans)',
    color: 'var(--text)',
    marginBottom: 12
  };
  const lbl = {
    font: '700 13px var(--font-sans)',
    color: 'var(--text-light)'
  };
  const val = {
    font: '400 13px/1.6 var(--font-sans)',
    color: 'var(--text)'
  };
  const rowGrid = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '180px 1fr',
    gap: isMobile ? '2px 0' : '10px 24px',
    marginBottom: 8,
    alignItems: 'baseline'
  };
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: isMobile ? '28px 0 48px' : '40px 0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: CONTAINER
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: `300 ${isMobile ? '26px' : '30px'} var(--font-sans)`,
      color: 'var(--text)',
      display: 'inline-block',
      paddingBottom: 8,
      borderBottom: '2px solid var(--green)',
      marginBottom: 28
    }
  }, "Impressum"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '700 15px var(--font-sans)',
      color: 'var(--green)',
      marginBottom: 2
    }
  }, "Fiedler & Rie\xDF Rechtsanw\xE4lte PartGmbB"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...p,
      marginBottom: 24
    }
  }, "Rotenburger Str. 17, 36199 Rotenburg a.d. Fulda"), /*#__PURE__*/React.createElement("div", {
    style: rowGrid
  }, /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "Registergericht:"), /*#__PURE__*/React.createElement("span", {
    style: val
  }, "Amtsgericht Frankfurt, PR-Nr.: 2872"), /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "Sitz:"), /*#__PURE__*/React.createElement("span", {
    style: val
  }, "Rotenburg a.d. Fulda"), /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "Partner:"), /*#__PURE__*/React.createElement("span", {
    style: val
  }, "Dr. Dominik Fiedler, Rechtsanwalt und Fachanwalt f\xFCr Arbeitsrecht", /*#__PURE__*/React.createElement("br", null), "Stephan Rie\xDF, Rechtsanwalt und Fachanwalt f\xFCr Verkehrsrecht")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...rowGrid,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "Telefon:"), /*#__PURE__*/React.createElement("span", {
    style: val
  }, "06623 300 812 0"), /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "Mobilnummer:"), /*#__PURE__*/React.createElement("span", {
    style: val
  }, "0174 7693686"), /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "Telefax:"), /*#__PURE__*/React.createElement("span", {
    style: val
  }, "06623 300 812 2"), /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "E-Mail:"), /*#__PURE__*/React.createElement("span", {
    style: val
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:d.fiedler@fiedler-riess.de",
    style: {
      color: 'var(--green)'
    }
  }, "d.fiedler@fiedler-riess.de"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: "mailto:s.riess@fiedler-riess.de",
    style: {
      color: 'var(--green)'
    }
  }, "s.riess@fiedler-riess.de"))), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "Berufsbezeichnung und zust\xE4ndige Rechtsanwaltskammer"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Dr. Dominik Fiedler, Stephan Rie\xDF und Mona Broghammer sind nach dem Recht der Bundesrepublik Deutschland als Rechtsanw\xE4lte zugelassen. Frau Rechtsanw\xE4ltin Broghammer ist angestellt."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Alle Rechtsanw\xE4lte sind Mitglieder der Rechtsanwaltskammer Kassel, Karth\xE4userstra\xDFe 5, 34117 Kassel, ", /*#__PURE__*/React.createElement("a", {
    href: "https://www.rechtsanwaltskammer-kassel.de",
    style: {
      color: 'var(--green)'
    }
  }, "www.rechtsanwaltskammer-kassel.de"), "."), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "Umsatzsteuer-Identifikationsnummer"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "DE 343 424 147"), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "Verm\xF6gensschaden-Haftpflichtversicherung"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Fiedler & Rie\xDF Rechtsanw\xE4lte PartGmbB unterh\xE4lt eine Verm\xF6gensschaden-Haftpflichtversicherung bei der Markel International Insurance Company Limited, Niederlassung f\xFCr Deutschland, Luisenstrasse 14, 80333 M\xFCnchen."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "R\xE4umlicher Geltungsbereich ist jeweils das Gebiet der Europ\xE4ischen Union und den Staaten des Abkommens \xFCber den Europ\xE4ischen Wirtschaftsraum. Die Partnerschaftgesellschaft mit beschr\xE4nkter Berufshaftung ist nach \xA7 51 a Bundesrechtsanwaltsordnung (BRAO) verpflichtet, eine Verm\xF6gensschaden-Haftpflichtversicherung mit einer Mindestversicherungssumme von 2.500.000,00 Euro zu unterhalten."), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "Berufsrechtliche Regelungen"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Die geltenden berufsrechtlichen Regelungen sind die Bundesrechtsanwaltsordnung (BRAO), die Berufsordnung f\xFCr Rechtsanw\xE4lte (BORA), die Fachanwaltsordnung (FAO), das Rechtsanwaltsverg\xFCtungsgesetz (RVG) und die Berufsregeln der Rechtsanw\xE4lte der Europ\xE4ischen Union (CCBE). Sie k\xF6nnen \xFCber die Internetseite der Bundesrechtsanwaltskammer (", /*#__PURE__*/React.createElement("a", {
    href: "https://www.brak.de",
    style: {
      color: 'var(--green)'
    }
  }, "www.brak.de"), ") in der Rubrik \u201EBerufsrecht\" in deutscher und englischer Sprache eingesehen und abgerufen werden."), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "Au\xDFergerichtliche Streitschlichtung"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Streitigkeiten zwischen Rechtsanw\xE4lten und ihren Auftraggebern k\xF6nnen auf Antrag au\xDFergerichtlich durch Streitschlichtung bei der zust\xE4ndigen Rechtsanwaltskammer nach \xA7 73 Abs. 2 Nr. 3 in Verbindung mit \xA7 73 Abs. 5 Bundesrechtsanwaltsordnung oder bei der Schlichtungsstelle der Rechtsanwaltschaft bei der Bundesrechtsanwaltskammer nach \xA7 191 f. Bundesrechtsanwaltsordnung beigelegt werden."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Fiedler & Rie\xDF Rechtsanw\xE4lte PartGmbB nimmt an der vorgenannten Streitschlichtung teil."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Die Internet-Adresse der Rechtsanwaltskammer Kassel lautet: ", /*#__PURE__*/React.createElement("a", {
    href: "https://www.rechtsanwaltskammer-kassel.de",
    style: {
      color: 'var(--green)'
    }
  }, "www.rechtsanwaltskammer-kassel.de"), ".", /*#__PURE__*/React.createElement("br", null), "Die Internet-Adresse der Bundesrechtsanwaltskammer lautet: ", /*#__PURE__*/React.createElement("a", {
    href: "https://www.brak.de",
    style: {
      color: 'var(--green)'
    }
  }, "www.brak.de"), ".", /*#__PURE__*/React.createElement("br", null), "Die Schlichtungsstelle der Rechtsanwaltschaft kann \xFCber folgende E-Mail-Adresse erreicht werden: ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:Schlichtungsstelle@brak.de",
    style: {
      color: 'var(--green)'
    }
  }, "Schlichtungsstelle@brak.de"), "."), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "Informationen und Haftung"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Eine Richtigkeit der auf diesen Internetseiten enthaltenen Informationen und verbundenen Internetseiten (\"Links\") wird nicht gew\xE4hrleistet. Jegliche Haftung im Zusammenhang mit der Nutzung der auf diesen Internetseiten oder den Links enthaltenen Informationen ist ausgeschlossen; auf eine Richtigkeit kann nicht vertraut werden. Dominik Fiedler distanziert sich ausdr\xFCcklich von den Inhalten der verbundenen Internetseiten. Die auf dieser Internetseite enthaltenen Informationen sind keine Rechtsberatung."), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "Bilder"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Die Bilder von unserem Team wurden von Florian Kr\xE4mer angefertigt."), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "Anwendbares Recht"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Die Informationen auf dieser Internet-Seite sowie alle Fragen und Streitigkeiten im Zusammenhang mit dieser Internet-Seite unterliegen dem Recht der Bundesrepublik Deutschland."))));
}

/* ---------- DATENSCHUTZ ---------- */
function DatenschutzScreen() {
  const isMobile = window.frUseIsMobile();
  const h2 = {
    font: '700 17px var(--font-sans)',
    color: 'var(--text)',
    margin: '34px 0 12px',
    paddingBottom: 6,
    borderBottom: '2px solid var(--green)',
    display: 'inline-block'
  };
  const h3 = {
    font: '700 14px var(--font-sans)',
    color: 'var(--green)',
    margin: '20px 0 10px'
  };
  const p = {
    font: '400 14px/1.75 var(--font-sans)',
    color: 'var(--text)',
    marginBottom: 12
  };
  const lbl = {
    font: '700 13px var(--font-sans)',
    color: 'var(--text-light)'
  };
  const val = {
    font: '400 13px/1.6 var(--font-sans)',
    color: 'var(--text)'
  };
  const rowGrid = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
    gap: isMobile ? '2px 0' : '8px 24px',
    marginBottom: 6,
    alignItems: 'baseline'
  };
  const li = {
    font: '400 14px/1.7 var(--font-sans)',
    color: 'var(--text)',
    marginBottom: 10
  };
  return /*#__PURE__*/React.createElement("main", {
    style: {
      padding: isMobile ? '28px 0 48px' : '40px 0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: CONTAINER
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: `300 ${isMobile ? '26px' : '30px'} var(--font-sans)`,
      color: 'var(--text)',
      display: 'inline-block',
      paddingBottom: 8,
      borderBottom: '2px solid var(--green)',
      marginBottom: 28
    }
  }, "Datenschutz"), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "1. Name und Kontaktdaten des Verantwortlichen f\xFCr die Datenverarbeitung"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Diese Datenschutz-Information gilt f\xFCr die Datenverarbeitung durch:"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '700 15px var(--font-sans)',
      color: 'var(--green)',
      marginBottom: 2
    }
  }, "Fiedler & Rie\xDF Rechtsanw\xE4lte PartGmbB"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...p,
      marginBottom: 20
    }
  }, "Rotenburger Str. 17, 36199 Rotenburg a.d. Fulda"), /*#__PURE__*/React.createElement("div", {
    style: rowGrid
  }, /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "Partner:"), /*#__PURE__*/React.createElement("span", {
    style: val
  }, "Dr. Dominik Fiedler, Rechtsanwalt und Fachanwalt f\xFCr Arbeitsrecht", /*#__PURE__*/React.createElement("br", null), "Stephan Rie\xDF, Rechtsanwalt und Fachanwalt f\xFCr Verkehrsrecht"), /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "Sitz der Gesellschaft:"), /*#__PURE__*/React.createElement("span", {
    style: val
  }, "Rotenburg a.d. Fulda"), /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "Partnerschaftsregister:"), /*#__PURE__*/React.createElement("span", {
    style: val
  }, "Amtsgericht Frankfurt a.M., PR Nr.: 2872"), /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "Telefon:"), /*#__PURE__*/React.createElement("span", {
    style: val
  }, "06623 300 8120"), /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "Telefax:"), /*#__PURE__*/React.createElement("span", {
    style: val
  }, "06623 300 8122"), /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "Verantwortliche:"), /*#__PURE__*/React.createElement("span", {
    style: val
  }, "Dr. Dominik Fiedler, Rechtsanwalt und Fachanwalt f\xFCr Arbeitsrecht", /*#__PURE__*/React.createElement("br", null), "Stephan Rie\xDF, Rechtsanwalt und Fachanwalt f\xFCr Verkehrsrecht")), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "2. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung"), /*#__PURE__*/React.createElement("h3", {
    style: h3
  }, "a) Beim Besuch der Website"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Beim Aufrufen unserer Website www.fiedler-riess.de werden durch den auf Ihrem Endger\xE4t zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden tempor\xE4r in einem sog. Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten L\xF6schung gespeichert: IP-Adresse des anfragenden Rechners, Datum und Uhrzeit des Zugriffs, Name und URL der abgerufenen Datei, Website, von der aus der Zugriff erfolgt (Referrer-URL), verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name Ihres Access-Providers. Die genannten Daten werden durch uns zu folgenden Zwecken verarbeitet: Gew\xE4hrleistung eines reibungslosen Verbindungsaufbaus der Website, Gew\xE4hrleistung einer komfortablen Nutzung unserer Website, Auswertung der Systemsicherheit und -stabilit\xE4t sowie zu weiteren administrativen Zwecken."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Die Rechtsgrundlage f\xFCr die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO. Unser berechtigtes Interesse folgt aus oben aufgelisteten Zwecken zur Datenerhebung. In keinem Fall verwenden wir die erhobenen Daten zu dem Zweck, R\xFCckschl\xFCsse auf Ihre Person zu ziehen. Dar\xFCber hinaus setzen wir beim Besuch unserer Website Cookies sowie Analysedienste ein. N\xE4here Erl\xE4uterungen dazu erhalten Sie unter den Ziff. 4 und 5 dieser Datenschutzerkl\xE4rung."), /*#__PURE__*/React.createElement("h3", {
    style: h3
  }, "b) Bei Nutzung unseres E-Mail-Adresse(n) und Telefonnummer(n)"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Bei Fragen jeglicher Art bieten wir Ihnen die M\xF6glichkeit, mit uns \xFCber eine auf unserer Website angegebene(n) E-Mail-Adresse(n) und Telefonnummer(n) Kontakt aufzunehmen. Dabei ist die Angabe einer g\xFCltigen E-Mail-Adresse erforderlich, damit wir wissen, von wem die Anfrage stammt und um diese beantworten zu k\xF6nnen. Telefonnummern k\xF6nnen unterdr\xFCckt werden. Weitere Angaben k\xF6nnen freiwillig get\xE4tigt werden."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt nach Art. 6 Abs. 1 S. 1 lit. a DSGVO auf Grundlage Ihrer freiwillig erteilten Einwilligung. Die von uns erhobenen personenbezogenen Daten werden nach Erledigung der von Ihnen gestellten Anfrage nach den gesetzlichen Vorschriften gel\xF6scht."), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "3. Weitergabe von Daten"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Eine \xDCbermittlung Ihrer pers\xF6nlichen Daten an Dritte zu anderen als den im Folgenden aufgef\xFChrten Zwecken findet nicht statt."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Wir geben Ihre pers\xF6nlichen Daten nur an Dritte weiter, wenn:"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'disc',
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: li
  }, "Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdr\xFCckliche Einwilligung dazu erteilt haben,"), /*#__PURE__*/React.createElement("li", {
    style: li
  }, "die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur Geltendmachung, Aus\xFCbung oder Verteidigung von Rechtsanspr\xFCchen erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein \xFCberwiegendes schutzw\xFCrdiges Interesse an der Nichtweitergabe Ihrer Daten haben,"), /*#__PURE__*/React.createElement("li", {
    style: li
  }, "f\xFCr den Fall, dass f\xFCr die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. c DSGVO eine gesetzliche Verpflichtung besteht, sowie"), /*#__PURE__*/React.createElement("li", {
    style: li
  }, "dies gesetzlich zul\xE4ssig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO f\xFCr die Abwicklung von Vertragsverh\xE4ltnissen mit Ihnen erforderlich ist.")), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "4. Cookies"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Wir setzen auf unserer Seite Cookies ein. Hierbei handelt es sich um kleine Dateien, die Ihr Browser automatisch erstellt und die auf Ihrem Endger\xE4t (Laptop, Tablet, Smartphone o.\xE4.) gespeichert werden, wenn Sie unsere Seite besuchen. Cookies richten auf Ihrem Endger\xE4t keinen Schaden an, enthalten keine Viren, Trojaner oder sonstige Schadsoftware. In dem Cookie werden Informationen abgelegt, die sich jeweils im Zusammenhang mit dem spezifisch eingesetzten Endger\xE4t ergeben. Dies bedeutet jedoch nicht, dass wir dadurch unmittelbar Kenntnis von Ihrer Identit\xE4t erhalten. Der Einsatz von Cookies dient dazu, die Nutzung unseres Angebots f\xFCr Sie angenehmer zu gestalten. So setzen wir sogenannte Session-Cookies ein, um zu erkennen, dass Sie einzelne Seiten unserer Website bereits besucht haben. Diese werden nach Verlassen unserer Seite automatisch gel\xF6scht."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Unsere Webseite wurde \xFCber den Webseiten-Baukasten der Firma Strato AG, Pascalstra\xDFe 10, 10587 Berlin, erstellt. Welche Cookies verwendet werden, finden Sie insofern auf der folgenden Webseite: ", /*#__PURE__*/React.createElement("a", {
    href: "https://strato.de/blog/dsgvo-cookies/",
    style: {
      color: 'var(--green)'
    }
  }, "https://strato.de/blog/dsgvo-cookies/"), ". Die durch Cookies verarbeiteten Daten sind f\xFCr die genannten Zwecke zur Wahrung unserer berechtigten Interessen sowie der Dritter nach Art. 6 Abs. 1 S. 1 lit. f DSGVO erforderlich."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Die meisten Browser akzeptieren Cookies automatisch. Sie k\xF6nnen Ihren Browser jedoch so konfigurieren, dass keine Cookies auf Ihrem Computer gespeichert werden oder stets ein Hinweis erscheint, bevor ein neuer Cookie angelegt wird. Die vollst\xE4ndige Deaktivierung von Cookies kann jedoch dazu f\xFChren, dass Sie nicht alle Funktionen unserer Website nutzen k\xF6nnen."), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "5. Analyse-Tools"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Analyse-Tools (z.B. Google Analytics) werden von uns nicht verwendet. \xDCber den Baukasten der Strato AG - mit dem diese Webseite erstellt wurde - ist jedoch statistisch erhoben, \xFCber welchen Weg der Nutzer auf die Webseite kam (z.B. \xFCber eine Suchmaschine) und welche Seite bzw. Unterseite aufgerufen wurde."), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "6. Social Media Plug-ins"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Social Plug-ins der sozialen Netzwerke wie Facebook, Twitter und Instagram werden von uns nicht verwendet."), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "7. Betroffenenrechte"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Sie haben das Recht:"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'disc',
      paddingLeft: 20
    }
  }, /*#__PURE__*/React.createElement("li", {
    style: li
  }, "gem\xE4\xDF Art. 15 DSGVO Auskunft \xFCber Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen. Insbesondere k\xF6nnen Sie Auskunft \xFCber die Verarbeitungszwecke, die Kategorie der personenbezogenen Daten, die Kategorien von Empf\xE4ngern, gegen\xFCber denen Ihre Daten offengelegt wurden oder werden, die geplante Speicherdauer, das Bestehen eines Rechts auf Berichtigung, L\xF6schung, Einschr\xE4nkung der Verarbeitung oder Widerspruch, das Bestehen eines Beschwerderechts, die Herkunft ihrer Daten, sofern diese nicht bei uns erhoben wurden, sowie \xFCber das Bestehen einer automatisierten Entscheidungsfindung einschlie\xDFlich Profiling und ggf. aussagekr\xE4ftigen Informationen zu deren Einzelheiten verlangen;"), /*#__PURE__*/React.createElement("li", {
    style: li
  }, "gem\xE4\xDF Art. 16 DSGVO unverz\xFCglich die Berichtigung unrichtiger oder Vervollst\xE4ndigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;"), /*#__PURE__*/React.createElement("li", {
    style: li
  }, "gem\xE4\xDF Art. 17 DSGVO die L\xF6schung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen, soweit nicht die Verarbeitung zur Aus\xFCbung des Rechts auf freie Meinungs\xE4u\xDFerung und Information, zur Erf\xFCllung einer rechtlichen Verpflichtung, aus Gr\xFCnden des \xF6ffentlichen Interesses oder zur Geltendmachung, Aus\xFCbung oder Verteidigung von Rechtsanspr\xFCchen erforderlich ist;"), /*#__PURE__*/React.createElement("li", {
    style: li
  }, "gem\xE4\xDF Art. 18 DSGVO die Einschr\xE4nkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, soweit die Richtigkeit der Daten von Ihnen bestritten wird, die Verarbeitung unrechtm\xE4\xDFig ist, Sie aber deren L\xF6schung ablehnen und wir die Daten nicht mehr ben\xF6tigen, Sie jedoch diese zur Geltendmachung, Aus\xFCbung oder Verteidigung von Rechtsanspr\xFCchen ben\xF6tigen oder Sie gem\xE4\xDF Art. 21 DSGVO Widerspruch gegen die Verarbeitung eingelegt haben;"), /*#__PURE__*/React.createElement("li", {
    style: li
  }, "gem\xE4\xDF Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, g\xE4ngigen und maschinenlesebaren Format zu erhalten oder die \xDCbermittlung an einen anderen Verantwortlichen zu verlangen;"), /*#__PURE__*/React.createElement("li", {
    style: li
  }, "gem\xE4\xDF Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit gegen\xFCber uns zu widerrufen. Dies hat zur Folge, dass wir die Datenverarbeitung, die auf dieser Einwilligung beruhte, f\xFCr die Zukunft nicht mehr fortf\xFChren d\xFCrfen und"), /*#__PURE__*/React.createElement("li", {
    style: li
  }, "gem\xE4\xDF Art. 77 DSGVO sich bei einer Aufsichtsbeh\xF6rde zu beschweren. In der Regel k\xF6nnen Sie sich hierf\xFCr an die Aufsichtsbeh\xF6rde Ihres \xFCblichen Aufenthaltsortes oder Arbeitsplatzes oder unseres Kanzleisitzes wenden.")), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "8. Widerspruchsrecht"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen gem\xE4\xDF Art. 6 Abs. 1 S. 1 lit. f DSGVO verarbeitet werden, haben Sie das Recht, gem\xE4\xDF Art. 21 DSGVO Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen, soweit daf\xFCr Gr\xFCnde vorliegen, die sich aus Ihrer besonderen Situation ergeben oder sich der Widerspruch gegen Direktwerbung richtet. Im letzteren Fall haben Sie ein generelles Widerspruchsrecht, das ohne Angabe einer besonderen Situation von uns umgesetzt wird."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "M\xF6chten Sie von Ihrem Widerrufs- oder Widerspruchsrecht Gebrauch machen, gen\xFCgt eine E-Mail an ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:d.fiedler@drfiedler-rechtsanwaelte.de",
    style: {
      color: 'var(--green)'
    }
  }, "d.fiedler@drfiedler-rechtsanwaelte.de")), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "9. Datensicherheit"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils h\xF6chsten Verschl\xFCsselungsstufe, die von Ihrem Browser unterst\xFCtzt wird. In der Regel handelt es sich dabei um eine 256 Bit Verschl\xFCsselung. Ob eine einzelne Seite unseres Internetauftrittes verschl\xFCsselt \xFCbertragen wird, erkennen Sie an der geschlossenen Darstellung des Sch\xFCssel- beziehungsweise Schloss-Symbols in der unteren Statusleiste Ihres Browsers."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Wir bedienen uns im \xDCbrigen geeigneter technischer und organisatorischer Sicherheitsma\xDFnahmen, um Ihre Daten gegen zuf\xE4llige oder vors\xE4tzliche Manipulationen, teilweisen oder vollst\xE4ndigen Verlust, Zerst\xF6rung oder gegen den unbefugten Zugriff Dritter zu sch\xFCtzen. Unsere Sicherheitsma\xDFnahmen werden entsprechend der technologischen Entwicklung fortlaufend verbessert."), /*#__PURE__*/React.createElement("h2", {
    style: h2
  }, "10. Aktualit\xE4t und \xC4nderung dieser Datenschutzerkl\xE4rung"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Diese Datenschutzerkl\xE4rung ist aktuell g\xFCltig und hat den Stand April 2022."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Durch die Weiterentwicklung unserer Website und Angebote dar\xFCber oder aufgrund ge\xE4nderter gesetzlicher beziehungsweise beh\xF6rdlicher Vorgaben kann es notwendig werden, diese Datenschutzerkl\xE4rung zu \xE4ndern. Die jeweils aktuelle Datenschutzerkl\xE4rung kann jederzeit auf der Website unter ", /*#__PURE__*/React.createElement("a", {
    href: "https://www.fiedler-riess.de",
    style: {
      color: 'var(--green)'
    }
  }, "https://www.fiedler-riess.de"), " von Ihnen abgerufen und ausgedruckt werden."))));
}
Object.assign(window, {
  HomeScreen,
  PracticeScreen,
  VerkehrsrechtScreen,
  JagdrechtScreen,
  FragebogenScreen,
  AnfahrtScreen,
  KarriereScreen,
  ImpressumScreen,
  DatenschutzScreen
});

/* ===== APP ===== */
/* ============================================
   Fiedler & Rieß — Website UI Kit · App
   Click-through shell: header, nav rail over hero/page-header,
   routed screen, footer, dismissible cookie banner.
   ============================================ */
const {
  useState: useAppState
} = React;
const PAGE_META = {
  practice: {
    title: 'Arbeitsrecht',
    tagline: 'Beratung, Verhandlung und Konfliktlösung im Betrieb'
  },
  verkehrsrecht: {
    title: 'Verkehrsrecht',
    tagline: 'Verkehrsrecht von A – Z'
  },
  jagdrecht: {
    title: 'Jagdrecht',
    tagline: 'Jagd- und Waffenrecht'
  },
  fragebogen: {
    title: 'Sie haben ein Anliegen – wir kümmern uns',
    tagline: 'Bitte laden Sie das passende Formular herunter und senden Sie es ausgefüllt zurück.'
  },
  anfahrt: {
    title: 'Anfahrt'
  },
  karriere: {
    title: 'Karriere'
  },
  impressum: {
    title: 'Impressum'
  },
  datenschutz: {
    title: 'Datenschutz'
  }
};
function App() {
  const [route, setRoute] = useAppState('home');
  const [cookie, setCookie] = useAppState(true);
  const [menuOpen, setMenuOpen] = useAppState(false);
  const isMobile = window.frUseIsMobile();
  const go = r => {
    setRoute(r);
    setMenuOpen(false);
    window.scrollTo({
      top: 0
    });
  };

  // nav: Arbeitsrecht -> practice, Verkehrsrecht -> fragebogen, Jagdrecht -> practice
  const navItems = [{
    label: 'Start',
    href: '#',
    active: route === 'home',
    onClick: e => {
      e.preventDefault();
      go('home');
    }
  }, {
    label: 'Rechtsgebiete',
    href: '#',
    active: route === 'practice' || route === 'verkehrsrecht' || route === 'jagdrecht' || route === 'fragebogen',
    children: [{
      label: 'Arbeitsrecht',
      href: '#',
      onClick: e => {
        e.preventDefault();
        go('practice');
      }
    }, {
      label: 'Verkehrsrecht',
      href: '#',
      onClick: e => {
        e.preventDefault();
        go('verkehrsrecht');
      },
      children: [{
        label: 'Fragebogen',
        href: '#',
        onClick: e => {
          e.preventDefault();
          go('fragebogen');
        }
      }]
    }, {
      label: 'Jagdrecht',
      href: '#',
      onClick: e => {
        e.preventDefault();
        go('jagdrecht');
      }
    }]
  }, {
    label: 'Karriere',
    href: '#',
    active: route === 'karriere',
    onClick: e => {
      e.preventDefault();
      go('karriere');
    }
  }, {
    label: 'Anfahrt',
    href: '#',
    active: route === 'anfahrt',
    onClick: e => {
      e.preventDefault();
      go('anfahrt');
    }
  }];
  const meta = PAGE_META[route];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '100%',
      background: 'var(--white)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(HeaderBrand, {
    go: go,
    isMobile: isMobile,
    menuOpen: menuOpen,
    onToggle: () => setMenuOpen(o => !o)
  }), isMobile && /*#__PURE__*/React.createElement(MobileNav, {
    items: navItems,
    open: menuOpen,
    onNavigate: () => setMenuOpen(false)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, !isMobile && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 210,
      zIndex: 200,
      background: 'rgba(245,245,243,0.62)'
    }
  }, /*#__PURE__*/React.createElement(NavRail, {
    items: navItems,
    variant: "transparent"
  })), /*#__PURE__*/React.createElement(Hero, null)), route !== 'home' && route !== 'fragebogen' && route !== 'verkehrsrecht' && route !== 'jagdrecht' && route !== 'impressum' && route !== 'datenschutz' && /*#__PURE__*/React.createElement(PageHeader, {
    title: meta.title,
    tagline: meta.tagline
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, route === 'home' && /*#__PURE__*/React.createElement(HomeScreen, {
    go: go
  }), route === 'practice' && /*#__PURE__*/React.createElement(PracticeScreen, null), route === 'verkehrsrecht' && /*#__PURE__*/React.createElement(VerkehrsrechtScreen, {
    go: go
  }), route === 'jagdrecht' && /*#__PURE__*/React.createElement(JagdrechtScreen, null), route === 'fragebogen' && /*#__PURE__*/React.createElement(FragebogenScreen, null), route === 'anfahrt' && /*#__PURE__*/React.createElement(AnfahrtScreen, null), route === 'karriere' && /*#__PURE__*/React.createElement(KarriereScreen, null), route === 'impressum' && /*#__PURE__*/React.createElement(ImpressumScreen, null), route === 'datenschutz' && /*#__PURE__*/React.createElement(DatenschutzScreen, null)), /*#__PURE__*/React.createElement(Footer, {
    go: go
  }), cookie && /*#__PURE__*/React.createElement(CookieBanner, {
    onClose: () => setCookie(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));