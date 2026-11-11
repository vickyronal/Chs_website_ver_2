/*
  The four CHS card styles. Each one is a single link (the whole card is clickable),
  which is simplest for touch and for keyboard/screen-reader users.
*/
import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router";
import type { ImageName } from "../../content/images.generated";
import { formatDuration, formatPrice } from "../../lib/format";
import { ArrowCircle } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Image } from "../ui/Image";
import { LocationPill, Tag } from "../ui/Pills";
import styles from "./Cards.module.css";

const CARD_SIZES = "(min-width: 1024px) 380px, 78vw";

/* 1. PHOTO + LABEL BAR — "Not sure where to go?" kinds of holiday */
export function PhotoLabelCard({ to, image, alt, label }: { to: string; image: ImageName; alt: string; label: string }) {
  return (
    <Link to={to} className={[styles.card, styles.photoLabel].join(" ")}>
      <div className={styles.media}>
        <Image name={image} alt={alt} sizes={CARD_SIZES} />
      </div>
      <span className={styles.labelBar}>
        <span>{label}</span>
        <Icon name="arrow-right" size={18} />
      </span>
    </Link>
  );
}

/* 2. OVERLAY — destinations: big name on the photo + ↗ */
export function OverlayCard({
  to,
  image,
  alt,
  title,
  subtitle,
}: {
  to: string;
  image: ImageName;
  alt: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Link to={to} className={[styles.card, styles.overlay].join(" ")}>
      <div className={styles.media}>
        <Image name={image} alt={alt} sizes={CARD_SIZES} />
      </div>
      <div className={styles.overlayTop}>
        <h3 className={styles.overlayTitle}>{title}</h3>
        <ArrowCircle className={styles.overlayArrow} />
      </div>
      {subtitle && <p className={styles.overlaySubtitle}>{subtitle}</p>}
    </Link>
  );
}

/* 3. PACKAGE — the core product card */
export function PackageCard({
  to,
  image,
  alt,
  title,
  destination,
  nights,
  days,
  price,
  sample,
}: {
  to: string;
  image: ImageName;
  alt: string;
  title: string;
  destination: string;
  nights: number;
  days: number;
  price: number | null;
  /** Shows a "Sample" badge so placeholder packages are never mistaken for real ones */
  sample?: boolean;
}) {
  return (
    <Link to={to} className={[styles.card, styles.package].join(" ")}>
      <div className={styles.media}>
        <Image name={image} alt={alt} sizes={CARD_SIZES} />
        {sample && (
          <span className={styles.badge}>
            <Tag tone="dark">Sample</Tag>
          </span>
        )}
      </div>
      <div className={styles.packageBody}>
        <p className={styles.packageMeta}>
          {destination} · {formatDuration(nights, days)}
        </p>
        <h3 className={styles.packageTitle}>{title}</h3>
        <div className={styles.packageFooter}>
          <span className={styles.price}>{formatPrice(price)}</span>
          <ArrowCircle />
        </div>
      </div>
    </Link>
  );
}

/* 4. POLAROID — white-bordered, tilted photo with a red location pill (hero, Why-CHS fan) */
export function PolaroidCard({
  to,
  image,
  alt,
  location,
  rotate = 0,
  pillSide = "right",
  priority = false,
}: {
  to?: string;
  image: ImageName;
  alt: string;
  location?: string;
  /** degrees, e.g. -4 or 3 */
  rotate?: number;
  pillSide?: "left" | "right";
  /** Load immediately (use for the first hero cards) */
  priority?: boolean;
}) {
  const inner = (
    <>
      <div className={styles.media}>
        <Image name={image} alt={alt} sizes="(min-width: 1024px) 320px, 70vw" priority={priority} />
      </div>
      {location && <LocationPill className={styles[`pill-${pillSide}`]}>{location}</LocationPill>}
    </>
  );
  const style = { "--rotate": `${rotate}deg` } as CSSProperties;
  return to ? (
    <Link to={to} className={styles.polaroid} style={style}>
      {inner}
    </Link>
  ) : (
    <div className={styles.polaroid} style={style}>
      {inner}
    </div>
  );
}

/* Dark text card — sits between photo cards in the Why-CHS fan */
export function TextCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.textCard}>
      <h3 className={styles.textCardTitle}>{title}</h3>
      <p className={styles.textCardBody}>{children}</p>
    </div>
  );
}
