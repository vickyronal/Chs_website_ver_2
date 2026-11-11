import { Link } from "react-router";
import styles from "./PageStub.module.css";

interface PageStubProps {
  title: string;
  intro?: string;
  /** Which roadmap phase will build this page out */
  phase?: number;
  note?: string;
}

/**
 * TEMPORARY placeholder used while pages are being built.
 * Each route renders this until its real sections are made in later phases.
 */
export function PageStub({ title, intro, phase, note }: PageStubProps) {
  return (
    <section className={styles.stub}>
      <p className={styles.eyebrow}>CHS Tours</p>
      <h1>{title}</h1>
      {intro && <p className={styles.intro}>{intro}</p>}
      {phase && <p className={styles.phase}>Placeholder page — built in Phase {phase}.</p>}
      {note && <pre className={styles.note}>{note}</pre>}
      <Link to="/" className={styles.back}>
        ← Back to home
      </Link>
    </section>
  );
}
