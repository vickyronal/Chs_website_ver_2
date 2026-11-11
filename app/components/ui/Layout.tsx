import type { ReactNode } from "react";
import styles from "./Layout.module.css";

/** Centres content and keeps it within the max width, with side gutters. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={[styles.container, className].filter(Boolean).join(" ")}>{children}</div>;
}

interface SectionProps {
  children: ReactNode;
  /** Background colour of the band */
  tone?: "paper" | "surface" | "ink";
  /** Vertical padding */
  spacing?: "default" | "compact" | "none";
  id?: string;
  className?: string;
  /** Accessible name for the section (usually the heading's id) */
  labelledBy?: string;
}

/** A full-width page band. Every homepage section is wrapped in one of these. */
export function Section({ children, tone = "paper", spacing = "default", id, className, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={[styles.section, styles[tone], styles[`spacing-${spacing}`], className].filter(Boolean).join(" ")}
    >
      {children}
    </section>
  );
}

/** Vertical stack with consistent gaps. */
export function Stack({
  children,
  gap = 6,
  align = "stretch",
  className,
}: {
  children: ReactNode;
  gap?: 2 | 4 | 6 | 8 | 12;
  align?: "stretch" | "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={[styles.stack, styles[`align-${align}`], className].filter(Boolean).join(" ")}
      style={{ gap: `var(--space-${gap})` }}
    >
      {children}
    </div>
  );
}

/** Horizontal row that wraps on small screens (e.g. a group of buttons). */
export function Cluster({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={[styles.cluster, className].filter(Boolean).join(" ")}>{children}</div>;
}
