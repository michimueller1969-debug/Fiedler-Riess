/* ============================================================
   Fiedler & Rieß — gemeinsame Seiten-Chrome für Unterseiten
   (Formulare etc.). Bildet Header, Navigation, Hero und Footer
   exakt wie die Hauptseite ab; die Navigation verlinkt zurück
   in die Single-Page-Anwendung (index.html#route).
   Exportiert window.SiteChrome.
   ============================================================ */
(function () {
  const {
    useState,
    useEffect
  } = React;
  function useIsMobile(bp) {
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

  /* ---- Navigationspunkte (echte Links in die SPA) ---- */
  function navItems(current) {
    const rechtsgebieteActive = current === 'fragebogen' || current === 'practice';
    return [{
      label: 'Start',
      href: 'index.html'
    }, {
      label: 'Rechtsgebiete',
      href: 'index.html#practice',
      active: rechtsgebieteActive,
      children: [{
        label: 'Arbeitsrecht',
        href: 'index.html#practice'
      }, {
        label: 'Verkehrsrecht',
        href: 'index.html#verkehrsrecht',
        children: [{
          label: 'Fragebogen',
          href: 'index.html#fragebogen'
        }]
      }, {
        label: 'Jagdrecht',
        href: 'index.html#jagdrecht'
      }]
    }, {
      label: 'Karriere',
      href: 'index.html#karriere'
    }, {
      label: 'Anfahrt',
      href: 'index.html#anfahrt'
    }];
  }

  /* ---- Desktop-Navigationsleiste (links, über dem Hero schwebend) ---- */
  function NavRail({
    items,
    variant
  }) {
    const transparent = variant === 'transparent';
    return /*#__PURE__*/React.createElement("nav", {
      style: {
        background: transparent ? 'transparent' : 'var(--charcoal)',
        width: transparent ? 'auto' : 'var(--nav-w)',
        display: transparent ? 'inline-block' : 'block'
      }
    }, /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        paddingTop: 6,
        display: 'flex',
        flexDirection: 'column'
      }
    }, items.map((item, i) => /*#__PURE__*/React.createElement(NavItem, {
      key: i,
      item: item,
      transparent: transparent
    }))));
  }
  function NavItem({
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
      style: {
        position: 'relative'
      },
      onMouseEnter: enter,
      onMouseLeave: leave
    }, /*#__PURE__*/React.createElement("a", {
      href: item.href || '#',
      style: {
        display: 'block',
        padding: transparent ? '14px 22px' : '11px 16px',
        color: itemColor,
        fontFamily: 'var(--font-sans)',
        fontSize: transparent ? 17 : 12.5,
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
        minWidth: 200,
        background: ddBg,
        borderLeft: transparent ? 'none' : '2px solid var(--green)',
        zIndex: 300,
        listStyle: 'none',
        margin: 0,
        padding: 0
      }
    }, item.children.map((c, j) => /*#__PURE__*/React.createElement(SubItem, {
      key: j,
      item: c,
      transparent: transparent,
      ddBg: ddBg,
      subColor: subColor
    }))));
  }
  function SubItem({
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
      href: item.href || '#',
      style: {
        display: 'block',
        padding: transparent ? '12px 22px' : '9px 16px',
        color: subColor,
        fontFamily: 'var(--font-sans)',
        fontSize: transparent ? 16 : 12.5,
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
        minWidth: 200,
        background: ddBg,
        borderLeft: transparent ? 'none' : '2px solid var(--green)',
        zIndex: 300,
        listStyle: 'none',
        margin: 0,
        padding: 0
      }
    }, item.children.map((c, k) => /*#__PURE__*/React.createElement(SubItem, {
      key: k,
      item: c,
      transparent: transparent,
      ddBg: ddBg,
      subColor: subColor
    }))));
  }

  /* ---- Mobile-Navigation: Hamburger + Akkordeon ---- */
  function MobileNavItem({
    item,
    depth
  }) {
    const hasKids = item.children && item.children.length > 0;
    const [open, setOpen] = useState(depth === 0 && !!item.active);
    const pad = 18 + depth * 18;
    const labelClick = e => {
      if (hasKids) {
        e.preventDefault();
        setOpen(o => !o);
      }
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
        fontSize: depth === 0 ? 16 : 15,
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
      depth: depth + 1
    }))));
  }
  function MobileNav({
    items,
    open
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
      depth: 0
    }))));
  }
  function HeaderBrand({
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
    }, /*#__PURE__*/React.createElement("a", {
      href: "index.html",
      style: {
        textDecoration: 'none',
        textAlign: 'left',
        borderLeft: '1px solid var(--border)',
        paddingLeft: isMobile ? 14 : 22
      }
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
  function Hero() {
    const isMobile = useIsMobile();
    const [cur, setCur] = useState(0);
    const slides = ['img/hero1.png', 'img/hero2.png'];
    useEffect(() => {
      const t = setInterval(() => setCur(c => (c + 1) % slides.length), 4000);
      return () => clearInterval(t);
    }, []);
    return /*#__PURE__*/React.createElement("div", {
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
    })));
  }
  function PageHeader({
    title,
    tagline
  }) {
    const isMobile = useIsMobile();
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
        borderBottom: '2px solid var(--green)',
        margin: 0
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
    }, "Rechtsanw\xE4lte PartGmbB"))));
  }
  function Footer() {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: 'var(--white)',
        borderTop: '1px solid var(--border)',
        padding: '15px 0',
        marginTop: 50
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
      href: "index.html#impressum",
      style: {
        color: 'var(--green)',
        font: '400 13px var(--font-sans)'
      }
    }, "Impressum"), /*#__PURE__*/React.createElement("a", {
      href: "index.html#datenschutz",
      style: {
        color: 'var(--green)',
        font: '400 13px var(--font-sans)'
      }
    }, "Datenschutz"))));
  }

  /* ---- Gesamte Chrome ---- */
  function SiteChrome({
    current,
    title,
    tagline,
    children
  }) {
    const isMobile = useIsMobile();
    const [menuOpen, setMenuOpen] = useState(false);
    const items = navItems(current);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        minHeight: '100%',
        background: 'var(--white)',
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement(HeaderBrand, {
      isMobile: isMobile,
      menuOpen: menuOpen,
      onToggle: () => setMenuOpen(o => !o)
    }), isMobile && /*#__PURE__*/React.createElement(MobileNav, {
      items: items,
      open: menuOpen
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, !isMobile && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        padding: '0 20px',
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-block',
        height: '100%',
        background: 'rgba(245,245,243,0.62)',
        pointerEvents: 'auto'
      }
    }, /*#__PURE__*/React.createElement(NavRail, {
      items: items,
      variant: "transparent"
    })))), /*#__PURE__*/React.createElement(Hero, null)), title && /*#__PURE__*/React.createElement(PageHeader, {
      title: title,
      tagline: tagline
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, children), /*#__PURE__*/React.createElement(Footer, null));
  }
  window.SiteChrome = SiteChrome;
})();