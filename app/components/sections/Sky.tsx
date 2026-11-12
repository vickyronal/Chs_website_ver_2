/*
  SKY — the hero backdrop for "a day in the sky".
  Built entirely in CSS: a blue gradient with sun haze, plus a bank of soft
  clouds made from blurred white shapes that drift very slowly.
  No images to download, sharp on every screen. Decorative only.
*/
import type { CSSProperties } from "react";
import styles from "./Sky.module.css";

// Each puff: horizontal position, size and opacity. Overlapping puffs read as a cloud bank.
const PUFFS = [
  { x: -6, w: 34, h: 30, o: 0.95 },
  { x: 14, w: 26, h: 38, o: 1 },
  { x: 30, w: 30, h: 26, o: 0.9 },
  { x: 44, w: 24, h: 42, o: 1 },
  { x: 58, w: 30, h: 30, o: 0.92 },
  { x: 74, w: 26, h: 36, o: 1 },
  { x: 88, w: 30, h: 28, o: 0.95 },
];

export function Sky({ clouds = true, soft = false }: { clouds?: boolean; soft?: boolean }) {
  return (
    <div className={[styles.sky, soft && styles.soft].filter(Boolean).join(" ")} aria-hidden="true">
      <div className={styles.haze} />
      {clouds && (
        <>
          {/* two drifting clouds higher up, framing the headline */}
          <span className={[styles.high, styles.highLeft].join(" ")} />
          <span className={[styles.high, styles.highRight].join(" ")} />
        </>
      )}
      {clouds && (
        <div className={styles.clouds}>
          {PUFFS.map((p, i) => (
            <span
              key={i}
              className={styles.puff}
              style={{ "--x": `${p.x}%`, "--w": `${p.w}%`, "--h": `${p.h}%`, "--o": p.o, "--i": i } as CSSProperties}
            />
          ))}
        </div>
      )}
    </div>
  );
}
