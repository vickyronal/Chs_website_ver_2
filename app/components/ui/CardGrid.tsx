import type { CSSProperties, ReactNode } from "react";
import styles from "./CardGrid.module.css";

/** Responsive grid of cards: 1 column on phones, up to 3–4 on desktop. */
export function CardGrid({ children, min = "17rem" }: { children: ReactNode; min?: string }) {
  return (
    <ul className={styles.grid} style={{ "--min": min } as CSSProperties}>
      {Array.isArray(children) ? children.map((c, i) => <li key={i}>{c}</li>) : <li>{children}</li>}
    </ul>
  );
}

/** Friendly "nothing here yet" message with an action. */
export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className={styles.empty}>
      <p className={styles.emptyTitle}>{title}</p>
      {children}
    </div>
  );
}
