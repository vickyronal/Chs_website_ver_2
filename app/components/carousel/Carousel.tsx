/*
  CAROUSEL — the horizontal slider used across the site.

  How it works (simple version):
  - It's a normal horizontally-scrolling list using CSS "scroll-snap", so touch
    swiping, trackpads and keyboard scrolling all work natively and smoothly.
  - JavaScript only adds: the arrow buttons, the progress bar, and mouse dragging.

  Variants:
  - "row"        straight row, next card peeks in from the edge
  - "staggered"  every other card sits lower (desktop)
  - "fan"        cards rotate into an arc that opens as you scroll to it (desktop);
                 on phones it becomes a normal row
*/
import { Children, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useInView } from "motion/react";
import { useCarousel, type CarouselApi } from "./useCarousel";
import { Icon } from "../ui/Icon";
import styles from "./Carousel.module.css";

interface CarouselProps {
  /** Accessible name, e.g. "Kinds of holiday" */
  label: string;
  children: ReactNode;
  variant?: "row" | "staggered" | "fan";
  /** Card width, e.g. "clamp(260px, 78vw, 380px)" */
  itemWidth?: string;
  /** "below" shows arrows + progress bar under the slider; "none" hides them (or place <CarouselControls> yourself) */
  controls?: "below" | "none";
  /** Line the first card up with the page content while letting the row run to the screen edges */
  bleed?: boolean;
  /** Pass a useCarousel() result if you render <CarouselControls> somewhere else */
  api?: CarouselApi;
}

export function Carousel({
  label,
  children,
  variant = "row",
  itemWidth = "clamp(260px, 78vw, 380px)",
  controls = "below",
  bleed = true,
  api,
}: CarouselProps) {
  const own = useCarousel();
  const carousel = api ?? own;
  const { trackRef } = carousel;
  const rootRef = useRef<HTMLDivElement>(null);
  const open = useInView(rootRef, { amount: 0.35, once: true });
  // Before JavaScript loads, the fan shows OPEN (so it never looks broken).
  // Once loaded, it closes until scrolled into view, then animates open.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const items = Children.toArray(children);
  const centre = (items.length - 1) / 2;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={[styles.carousel, styles[variant], bleed && styles.bleed].filter(Boolean).join(" ")}
      data-open={ready ? open : undefined}
      style={{ "--item-w": itemWidth } as CSSProperties}
    >
      <ul ref={trackRef} className={styles.track} tabIndex={0}>
        {items.map((child, i) => {
          const offset = i - centre;
          return (
            <li
              key={i}
              className={styles.item}
              style={{ "--offset": offset, "--abs": Math.abs(offset) } as CSSProperties}
            >
              {child}
            </li>
          );
        })}
      </ul>
      {controls === "below" && <CarouselControls api={carousel} className={styles.controlsBelow} />}
    </div>
  );
}

/** Arrow buttons + progress bar. Can be placed anywhere (e.g. beside a heading). */
export function CarouselControls({
  api,
  className,
  tone = "ink",
}: {
  api: CarouselApi;
  className?: string;
  tone?: "ink" | "white";
}) {
  const travel = api.visible < 1 ? (api.progress * (1 - api.visible)) / api.visible : 0;
  return (
    <div className={[styles.controls, styles[`controls-${tone}`], className].filter(Boolean).join(" ")}>
      <button type="button" className={styles.arrow} onClick={api.prev} disabled={!api.canPrev} aria-label="Previous">
        <Icon name="arrow-left" />
      </button>
      <div className={styles.progress} aria-hidden="true">
        <span
          className={styles.progressThumb}
          style={{ width: `${api.visible * 100}%`, transform: `translateX(${travel * 100}%)` }}
        />
      </div>
      <button type="button" className={styles.arrow} onClick={api.next} disabled={!api.canNext} aria-label="Next">
        <Icon name="arrow-right" />
      </button>
    </div>
  );
}
