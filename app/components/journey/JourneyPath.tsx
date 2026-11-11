/*
  JOURNEY PATH — the CHS signature motif.
  A dashed red S-curve inspired by the swoosh in the CHS logo ("the continuous
  journey from one destination to the next"). As the visitor scrolls, a small
  plane flies along it and leaves a solid red trail behind.
  Purely decorative, so it's hidden from screen readers.
*/
import { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import styles from "./JourneyPath.module.css";

// The swoosh: rises, dips, rises again (viewBox 1440 × 260)
const PATH = "M-40 214 C 170 214 250 74 470 82 C 690 90 770 222 995 194 C 1225 166 1290 46 1480 52";

interface JourneyPathProps {
  /** "dark" = on the black hero panel (white plane); "light" = on white sections (black plane) */
  tone?: "dark" | "light";
  className?: string;
}

export function JourneyPath({ tone = "dark", className }: JourneyPathProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const reduceMotion = useReducedMotion();

  // 0 → 1 as the path scrolls from the bottom of the screen to the top
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  // Fly the full route while the path crosses the middle of the screen
  const progress = useTransform(scrollYProgress, [0.15, 0.85], [0.04, 0.96], { clamp: true });

  const placePlane = (t: number) => {
    const path = pathRef.current;
    const plane = planeRef.current;
    if (!path || !plane) return;
    const len = path.getTotalLength();
    const a = path.getPointAtLength(t * len);
    const b = path.getPointAtLength(Math.min(len, t * len + 2));
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    plane.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${angle})`);
    plane.style.opacity = "1";
  };

  useMotionValueEvent(progress, "change", (t) => {
    if (!reduceMotion) placePlane(t);
  });

  useEffect(() => {
    placePlane(reduceMotion ? 0.55 : progress.get());
  }, [reduceMotion]); // eslint-disable-line react-hooks/exhaustive-deps -- placePlane only reads refs

  return (
    <div ref={wrapRef} className={[styles.wrap, styles[tone], className].filter(Boolean).join(" ")} aria-hidden="true">
      <svg viewBox="0 0 1440 260" className={styles.svg} preserveAspectRatio="xMidYMid meet">
        <path ref={pathRef} d={PATH} className={styles.dashes} />
        {!reduceMotion && <motion.path d={PATH} className={styles.trail} style={{ pathLength: progress }} />}
        <g ref={planeRef} className={styles.plane} style={{ opacity: 0 }}>
          {/* plane silhouette pointing right, centred on the path */}
          <path
            transform="translate(-22 -22) scale(1.85)"
            d="M21.5 12c0-.9-.8-1.5-1.7-1.5H14.6L10 3H8l2.6 7.5H5.4L3.6 8H2l1.2 4L2 16h1.6l1.8-2.5h5.2L8 21h2l4.6-7.5h5.2c.9 0 1.7-.6 1.7-1.5Z"
          />
        </g>
      </svg>
    </div>
  );
}
