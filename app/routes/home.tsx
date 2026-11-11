import { Link } from "react-router";
import type { Route } from "./+types/home";
import { legalNav, mainNav, secondaryNav } from "../content/navigation";
import { site } from "../content/site";
import { buildMeta } from "../lib/seo";
import styles from "./home.module.css";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Domestic & International Holiday Packages",
    description: "Fixed holiday packages in India and abroad, planned with CHS Tours and supported on WhatsApp.",
    path: "/",
  });

/**
 * TEMPORARY homepage for Phase 1: a list of every page so each route can be tested.
 * Replaced by the real homepage sections in Phase 3.
 */
export default function Home() {
  const allPages = [...mainNav, ...secondaryNav, ...legalNav];

  return (
    <section className={styles.home}>
      <p className={styles.eyebrow}>{site.name} · Version 2 · Phase 1</p>
      <h1>{site.tagline}</h1>
      <p className={styles.intro}>Project setup complete. Every page below is a placeholder that loads correctly.</p>

      <nav aria-label="All pages (temporary)">
        <ul className={styles.list}>
          {allPages.map((page) => (
            <li key={page.to}>
              <Link to={page.to}>{page.label}</Link>
            </li>
          ))}
          <li>
            <Link to="/holidays/sample-package">Sample package detail</Link>
          </li>
          <li>
            <Link to="/destinations/sample-destination">Sample destination detail</Link>
          </li>
          <li>
            <Link to="/experiences/honeymoon">Sample experience (honeymoon)</Link>
          </li>
          <li>
            <Link to="/this-page-does-not-exist">Test 404 page</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
