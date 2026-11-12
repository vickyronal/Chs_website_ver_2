/*
  SITE JOURNEY — one connected flight across the whole page.

  How it works (simple version):
  1. MEASURE: after the page lays out, we build one route in page coordinates:
     - it starts on the hero's swoosh (the same curve from the CHS logo),
     - runs down the empty side margin,
     - swoops across the gap between sections (an S-curve, like the logo),
     - continues down the other margin… and lands above the final "Let's go."
     It only travels through margins and section gaps, so it never sits on text.
  2. FLY: Motion's useScroll gives one smoothed 0→1 scroll value (no extra
     scroll listeners). We convert it to a point on the route and move the plane.
     Horizontal swoops cost a little scroll, vertical runs follow the page,
     so the plane stays on screen the whole way.
  3. ADAPT: the route is rebuilt when the layout changes (resize, images, fonts).

  Modes:
  - "route"  desktop with a fine pointer: the full journey described above
  - "static" reduced motion: the route is drawn, but the plane doesn't fly
  - "bar"    phones, tablets and low-power devices: a slim journey bar under the
             header (see JourneyBar); the hero keeps its own plane
*/
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { PLANE_D, SWOOSH } from "./shapes";
import type { JourneyMode } from "./useJourneyMode";
import styles from "./SiteJourney.module.css";

/* ---------------- Route geometry ---------------- */

interface Geometry {
  width: number;
  height: number;
  /** hero part of the route (the plane flies here, but the hero draws its own dashes) */
  heroD: string;
  /** everything after the hero */
  restD: string;
}

const CROSS_HALF = 90; // half the height of each S-swoop between sections
const MIN_GAP = 520; // don't swoop more often than this (px of page)

function buildGeometry(): Geometry | null {
  const main = document.getElementById("main");
  const footer = document.querySelector("footer");
  if (!main || !footer) return null;

  const sy = window.scrollY;
  const sx = window.scrollX;
  const width = document.documentElement.clientWidth;
  const footerTop = footer.getBoundingClientRect().top + sy;
  const height = Math.ceil(footer.getBoundingClientRect().bottom + sy);

  // Centre lines of the left/right page margins
  const gutter = Math.min(48, Math.max(16, width * 0.04));
  const margin = Math.max(gutter, (width - 1280) / 2);
  const xL = margin / 2;
  const xR = width - margin / 2;

  const f = (n: number) => n.toFixed(1);
  let heroD = "";
  let cur: { x: number; y: number };

  // 1. Start on the hero swoosh, converted from its SVG coordinates to page coordinates
  const start = document.querySelector<SVGSVGElement>("[data-journey-start]");
  const ctm = start?.getScreenCTM();
  if (start && ctm) {
    const map = (x: number, y: number) => ({ x: ctm.a * x + ctm.c * y + ctm.e + sx, y: ctm.b * x + ctm.d * y + ctm.f + sy });
    const p0 = map(SWOOSH.start[0], SWOOSH.start[1]);
    heroD = `M${f(p0.x)} ${f(p0.y)}`;
    let end = p0;
    for (const c of SWOOSH.curves) {
      const a = map(c[0], c[1]);
      const b = map(c[2], c[3]);
      end = map(c[4], c[5]);
      heroD += ` C${f(a.x)} ${f(a.y)} ${f(b.x)} ${f(b.y)} ${f(end.x)} ${f(end.y)}`;
    }
    cur = end;
  } else {
    // Pages without the swoosh: start at the bottom-right of the first section
    const first = main.firstElementChild;
    const y = first ? first.getBoundingClientRect().bottom + sy : 200;
    cur = { x: xR, y };
  }

  // 2. Drop into the right margin
  let restD = `M${f(cur.x)} ${f(cur.y)} C${f(cur.x)} ${f(cur.y + 90)} ${f(xR)} ${f(cur.y + 70)} ${f(xR)} ${f(cur.y + 180)}`;
  let side: "R" | "L" = "R";
  let lastY = cur.y + 180;

  // 3. Swoop across each section gap (top edge of every later section)
  const endY = footerTop - 64;
  const tops = Array.from(main.children)
    .map((el) => el.getBoundingClientRect().top + sy)
    .filter((y) => y > lastY + 260 && y < endY - 360);
  for (const y of tops) {
    if (y - lastY < MIN_GAP) continue;
    const from = side === "R" ? xR : xL;
    const to = side === "R" ? xL : xR;
    const k = CROSS_HALF * 1.7;
    restD += ` L${f(from)} ${f(y - CROSS_HALF)}`;
    restD += ` C${f(from)} ${f(y - CROSS_HALF + k)} ${f(to)} ${f(y + CROSS_HALF - k)} ${f(to)} ${f(y + CROSS_HALF)}`;
    side = side === "R" ? "L" : "R";
    lastY = y + CROSS_HALF;
  }

  // 4. Land: curve in from the margin to the centre, arriving level
  const x = side === "R" ? xR : xL;
  const dir = side === "R" ? -1 : 1;
  restD += ` L${f(x)} ${f(endY - 160)}`;
  restD += ` C${f(x)} ${f(endY - 40)} ${f(width / 2 - dir * 260)} ${f(endY)} ${f(width / 2)} ${f(endY)}`;

  return { width, height, heroD, restD };
}

/* ---------------- Lookup table: scroll progress → point on route ---------------- */

interface Sample {
  x: number;
  y: number;
  len: number;
  effort: number;
}

function buildSamples(path: SVGPathElement, startX: number, heroLen: number): Sample[] {
  const total = path.getTotalLength();
  const step = 6;
  const raw: { x: number; y: number; len: number }[] = [];
  for (let len = 0; len <= total; len += step) {
    const p = path.getPointAtLength(len);
    raw.push({ x: p.x, y: p.y, len });
  }
  // Skip the part of the swoosh that starts off-screen to the left
  const first = Math.max(0, raw.findIndex((p) => p.x >= startX));
  const pts = raw.slice(first);

  // "Effort" = how much scroll each bit of route costs.
  // - Vertical travel follows the page 1:1, so the plane keeps pace with the content.
  // - The hero swoosh gets a generous share (HERO_LAMBDA), so its opening flight is visible.
  // - The other horizontal swoops cost a fraction (λ), chosen so the whole route
  //   fits the page's scroll length and the plane stays on screen.
  const HERO_LAMBDA = 0.38;
  let ey = 0;
  let exHero = 0;
  let exRest = 0;
  for (let i = 1; i < pts.length; i++) {
    ey += Math.abs(pts[i].y - pts[i - 1].y);
    const dx = Math.abs(pts[i].x - pts[i - 1].x);
    if (pts[i].len <= heroLen) exHero += dx;
    else exRest += dx;
  }
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const budget = maxScroll - ey - HERO_LAMBDA * exHero;
  const lambda = Math.min(0.6, Math.max(0.04, exRest > 0 ? budget / exRest : 0.1));

  let effort = 0;
  return pts.map((p, i) => {
    if (i > 0) {
      const w = p.len <= heroLen ? HERO_LAMBDA : lambda;
      effort += Math.abs(p.y - pts[i - 1].y) + w * Math.abs(p.x - pts[i - 1].x);
    }
    return { ...p, effort };
  });
}

function pointAt(samples: Sample[], t: number) {
  const target = t * samples[samples.length - 1].effort;
  let lo = 0;
  let hi = samples.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (samples[mid].effort < target) lo = mid + 1;
    else hi = mid;
  }
  const a = samples[Math.max(0, lo - 3)];
  const b = samples[Math.min(samples.length - 1, lo + 3)];
  const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
  return { ...samples[lo], angle };
}

/* ---------------- The route layer (desktop) ---------------- */

export function SiteJourney({ mode }: { mode: JourneyMode }) {
  const [geo, setGeo] = useState<Geometry | null>(null);
  const sampleRef = useRef<SVGPathElement>(null);
  const heroRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const samplesRef = useRef<Sample[]>([]);

  const active = mode === "route" || mode === "static";

  // Tell the hero's own curve to hide its plane while this one flies
  useEffect(() => {
    if (mode === "route") document.documentElement.dataset.journey = "route";
    return () => {
      delete document.documentElement.dataset.journey;
    };
  }, [mode]);

  // Build the route now, and again whenever the layout changes
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    let timer = 0;
    const rebuild = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setGeo(buildGeometry()));
    };
    const debounced = () => {
      clearTimeout(timer);
      timer = window.setTimeout(rebuild, 150);
    };
    rebuild();
    const ro = new ResizeObserver(debounced);
    ro.observe(document.body);
    window.addEventListener("resize", debounced);
    document.fonts?.ready.then(rebuild);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("resize", debounced);
    };
  }, [active]);

  // One smoothed scroll value for the whole page
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.6 });

  const place = useCallback((t: number) => {
    const samples = samplesRef.current;
    const plane = planeRef.current;
    const trail = trailRef.current;
    const hero = heroRef.current;
    if (!samples.length || !plane) return;
    const p = pointAt(samples, Math.min(1, Math.max(0, t)));
    plane.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.angle.toFixed(1)})`);
    plane.style.opacity = "1";
    // Solid trail behind the plane: hero part first, then the rest of the route
    const heroLen = hero ? hero.getTotalLength() : 0;
    if (trail) trail.style.strokeDasharray = `${Math.max(0, p.len - heroLen)} 1000000`;
  }, []);

  // After each rebuild: sample the new route and re-place the plane
  useLayoutEffect(() => {
    const path = sampleRef.current;
    if (!geo || !path) return;
    const gutter = Math.min(48, Math.max(16, geo.width * 0.04));
    samplesRef.current = buildSamples(path, gutter, heroRef.current?.getTotalLength() ?? 0);
    if (mode === "route") place(smooth.get());
  }, [geo, mode, place, smooth]);

  useMotionValueEvent(smooth, "change", (t) => {
    if (mode === "route") place(t);
  });

  if (!active || !geo) return null;

  return (
    <div className={styles.layer} style={{ height: geo.height }} aria-hidden="true">
      <svg className={styles.svg} width={geo.width} height={geo.height} viewBox={`0 0 ${geo.width} ${geo.height}`}>
        {/* invisible full route, used only to measure positions */}
        <path ref={sampleRef} d={`${geo.heroD} ${geo.restD}`} className={styles.measure} />
        {geo.heroD && <path ref={heroRef} d={geo.heroD} className={styles.measure} />}
        <path d={geo.restD} className={styles.dashes} />
        {mode === "route" && (
          <>
            <path ref={trailRef} d={geo.restD} className={styles.trail} style={{ strokeDasharray: "0 1000000" }} />
            <g ref={planeRef} className={styles.plane} style={{ opacity: 0 }}>
              <path transform="translate(-15 -15) scale(1.25)" d={PLANE_D} />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}

/* ---------------- Journey bar (phones, tablets, low-power) ---------------- */

export function JourneyBar() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const x = useTransform(smooth, [0, 1], ["0%", "100%"]);
  return (
    <div className={styles.bar} aria-hidden="true">
      <div className={styles.barTrack}>
        <motion.span className={styles.barTrail} style={{ scaleX: smooth }} />
        <motion.span className={styles.barPlane} style={{ left: x }}>
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path d={PLANE_D} />
          </svg>
        </motion.span>
      </div>
    </div>
  );
}
