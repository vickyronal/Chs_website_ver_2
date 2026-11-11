/*
  FLOATING HEADER
  Desktop: white rounded bar with pill links, a Destinations mega-menu and the
           red "Plan on WhatsApp" button.
  Mobile:  logo + WhatsApp icon + menu button that opens a full-screen menu.
*/
import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { mainNav } from "../../content/navigation";
import { getDestinations, getThemes } from "../../lib/content";
import { phoneLink } from "../../lib/contact";
import { usePageWhatsApp } from "../../lib/usePageWhatsApp";
import { site } from "../../content/site";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Logo } from "../ui/Logo";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const whatsapp = usePageWhatsApp();
  const megaId = useId();
  const menuId = useId();
  const megaRef = useRef<HTMLLIElement>(null);

  // Slightly stronger shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when the page changes
  const [lastPath, setLastPath] = useState(location.pathname);
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  // Esc closes menus; clicking outside closes the mega-menu
  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (megaOpen && megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [megaOpen, mobileOpen]);

  // Stop the page scrolling behind the full-screen mobile menu
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", mobileOpen);
  }, [mobileOpen]);

  const international = getDestinations("international");
  const india = getDestinations("india");
  const themes = getThemes();
  const tel = phoneLink();

  return (
    <header className={[styles.header, scrolled && styles.scrolled].filter(Boolean).join(" ")}>
      <div className={styles.bar}>
        <Link to="/" className={styles.logo} aria-label={`${site.name} home`}>
          <Logo height={40} />
        </Link>

        {/* ---------- Desktop navigation ---------- */}
        <nav aria-label="Main" className={styles.desktopNav}>
          <ul className={styles.pills}>
            {mainNav.map((item) =>
              item.to === "/destinations" ? (
                <li key={item.to} ref={megaRef} className={styles.megaWrap}>
                  <button
                    type="button"
                    className={styles.pill}
                    aria-expanded={megaOpen}
                    aria-controls={megaId}
                    onClick={() => setMegaOpen((o) => !o)}
                  >
                    {item.label}
                    <span className={styles.caret} aria-hidden="true" />
                  </button>
                  <div id={megaId} className={styles.mega} hidden={!megaOpen}>
                    <div className={styles.megaCol}>
                      <p className={styles.megaHeading}>International</p>
                      <ul>
                        {international.map((d) => (
                          <li key={d.slug}>
                            <Link to={`/destinations/${d.slug}`}>{d.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {india.length > 0 && (
                      <div className={styles.megaCol}>
                        <p className={styles.megaHeading}>India</p>
                        <ul>
                          {india.map((d) => (
                            <li key={d.slug}>
                              <Link to={`/destinations/${d.slug}`}>{d.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className={styles.megaCol}>
                      <p className={styles.megaHeading}>Kinds of holiday</p>
                      <ul>
                        {themes.map((t) => (
                          <li key={t.slug}>
                            <Link to={`/experiences/${t.slug}`}>{t.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link to="/destinations" className={styles.megaAll}>
                      All destinations <Icon name="arrow-right" size={16} />
                    </Link>
                  </div>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink to={item.to} className={({ isActive }) => [styles.pill, isActive && styles.active].filter(Boolean).join(" ")}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          {whatsapp && (
            <>
              <Button href={whatsapp} icon="whatsapp" arrow size="sm" className={styles.desktopCta}>
                Plan on WhatsApp
              </Button>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={[styles.iconButton, styles.whatsappIcon].join(" ")} aria-label="Plan on WhatsApp">
                <Icon name="whatsapp" size={20} />
              </a>
            </>
          )}
          <button
            type="button"
            className={[styles.iconButton, styles.menuButton].join(" ")}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <Icon name={mobileOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* ---------- Mobile full-screen menu ---------- */}
      <div id={menuId} className={styles.mobileMenu} hidden={!mobileOpen}>
        <nav aria-label="Mobile">
          <ul className={styles.mobileLinks}>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.mobileContact}>
          {whatsapp && (
            <Button href={whatsapp} icon="whatsapp" arrow fullWidth>
              Plan on WhatsApp
            </Button>
          )}
          {tel && (
            <Button href={tel} icon="phone" variant="outline" fullWidth>
              Call {site.phoneDisplay}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
