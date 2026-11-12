import type { ReactNode } from "react";
import { Link } from "react-router";
import { Icon, type IconName } from "./Icon";
import styles from "./Button.module.css";

type Variant = "primary" | "dark" | "outline" | "light" | "soft";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  /** Small icon before the label, e.g. "whatsapp" or "phone" */
  icon?: IconName;
  /**
   * Round ↗ arrow:
   *   true    → inside the pill (the WhatsApp button)
   *   "split" → as a separate round button beside the pill: [ See all tours ] (↗)
   */
  arrow?: boolean | "split";
  fullWidth?: boolean;
  className?: string;
}

/** Internal page link → uses React Router <Link> (no full page reload) */
type LinkProps = BaseProps & { to: string; href?: never; onClick?: never; type?: never };
/** External link, WhatsApp (wa.me) or phone (tel:) → plain <a> */
type AnchorProps = BaseProps & { href: string; to?: never; onClick?: never; type?: never };
/** Action on this page → <button> */
type ButtonProps = BaseProps & { onClick?: () => void; type?: "button" | "submit"; to?: never; href?: never };

export type ButtonAllProps = LinkProps | AnchorProps | ButtonProps;

/**
 * One button component for the whole site.
 * It renders the right HTML element automatically:
 *   <Button to="/holidays">…        → internal link
 *   <Button href="https://wa.me/…"> → external link (opens in a new tab)
 *   <Button onClick={…}>            → real button
 */
export function Button(props: ButtonAllProps) {
  const { children, variant = "primary", size = "md", icon, arrow, fullWidth, className } = props;
  const split = arrow === "split";
  const classes = [styles.button, styles[variant], styles[size], split && styles.split, fullWidth && styles.full, className]
    .filter(Boolean)
    .join(" ");

  const content = split ? (
    <>
      <span className={styles.splitLabel}>
        {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
        {children}
      </span>
      <ArrowCircle className={styles.splitArrow} />
    </>
  ) : (
    <>
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
      <span className={styles.label}>{children}</span>
      {arrow && <ArrowCircle />}
    </>
  );

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    const external = /^https?:/.test(props.href);
    return (
      <a href={props.href} className={classes} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
        {content}
      </a>
    );
  }
  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={classes}>
      {content}
    </button>
  );
}

/** The round ↗ arrow. Used inside buttons and on cards. */
export function ArrowCircle({ className }: { className?: string }) {
  return (
    <span className={[styles.arrowCircle, className].filter(Boolean).join(" ")} aria-hidden="true">
      <Icon name="arrow-up-right" size={16} />
    </span>
  );
}
