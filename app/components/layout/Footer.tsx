import { Link } from "react-router";
import { companyNav, exploreNav, legalNav } from "../../content/navigation";
import { site } from "../../content/site";
import { phoneLink } from "../../lib/contact";
import { usePageWhatsApp } from "../../lib/usePageWhatsApp";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { DisplayType } from "../ui/Typography";
import styles from "./Footer.module.css";

// Set once when the page is built (not on every render)
const YEAR = new Date().getFullYear();

export function Footer() {
  const whatsapp = usePageWhatsApp();
  const tel = phoneLink();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo variant="white" height={56} />
          <p className={styles.tagline}>{site.tagline}</p>
          <div className={styles.ctas}>
            {whatsapp && (
              <Button href={whatsapp} icon="whatsapp" arrow>
                Plan on WhatsApp
              </Button>
            )}
            {tel && (
              <Button href={tel} icon="phone" variant="light">
                {site.phoneDisplay}
              </Button>
            )}
          </div>
        </div>

        <nav aria-label="Footer" className={styles.columns}>
          <FooterColumn title="Explore" links={exploreNav} />
          <FooterColumn title="Company" links={companyNav} />
          <div>
            <p className={styles.columnTitle}>Contact</p>
            <ul className={styles.list}>
              {tel && (
                <li>
                  <a href={tel}>{site.phoneDisplay}</a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              )}
              {site.address && <li className={styles.plain}>{site.address}</li>}
              {site.hours && <li className={styles.plain}>{site.hours}</li>}
            </ul>
          </div>
        </nav>
      </div>

      <div className={styles.legal}>
        <p>
          © {YEAR} {site.name}
        </p>
        <ul className={styles.legalLinks}>
          {legalNav.map((l) => (
            <li key={l.to}>
              <Link to={l.to}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <DisplayType tone="faint">CHS TOURS</DisplayType>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className={styles.columnTitle}>{title}</p>
      <ul className={styles.list}>
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
