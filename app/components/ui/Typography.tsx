import type { ReactNode } from "react";
import styles from "./Typography.module.css";

type HeadingLevel = "h1" | "h2" | "h3";
type HeadingSize = "display" | "h1" | "h2" | "h3";

interface HeadingProps {
  children: ReactNode;
  /** Which HTML tag (for SEO/accessibility). One h1 per page. */
  as?: HeadingLevel;
  /** How big it LOOKS (can differ from the tag) */
  size?: HeadingSize;
  align?: "start" | "center";
  tone?: "ink" | "white";
  className?: string;
}

/**
 * Serif headline. Combine with <Em> and <Muted> for the two-tone effect:
 *   <Heading>Your next <Em>journey</Em> starts here</Heading>
 */
export function Heading({ children, as: Tag = "h2", size, align = "start", tone = "ink", className }: HeadingProps) {
  const visualSize = size ?? Tag;
  return (
    <Tag className={[styles.heading, styles[visualSize], styles[align], styles[tone], className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}

/** Emphasised word: italic serif in CHS Red */
export function Em({ children }: { children: ReactNode }) {
  return <em className={styles.em}>{children}</em>;
}

/** De-emphasised words: grey, for the black/grey two-tone headline */
export function Muted({ children }: { children: ReactNode }) {
  return <span className={styles.muted}>{children}</span>;
}

/** Small uppercase label above a heading, e.g. "YOUR NEXT DESTINATION" */
export function Eyebrow({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "muted" | "white" }) {
  return <p className={[styles.eyebrow, styles[`eyebrow-${tone}`]].join(" ")}>{children}</p>;
}

/** Intro paragraph under a heading */
export function Lead({ children, align = "start" }: { children: ReactNode; align?: "start" | "center" }) {
  return <p className={[styles.lead, styles[align]].join(" ")}>{children}</p>;
}

/**
 * Giant type that runs off the edges of the screen (final CTA, footer wordmark).
 * Decorative by default: screen readers skip it unless `decorative={false}`.
 */
export function DisplayType({
  children,
  tone = "red",
  decorative = true,
}: {
  children: ReactNode;
  tone?: "red" | "ink" | "faint";
  decorative?: boolean;
}) {
  return (
    <div className={styles.displayWrap} aria-hidden={decorative || undefined}>
      <p className={[styles.mega, styles[`mega-${tone}`]].join(" ")}>{children}</p>
    </div>
  );
}
