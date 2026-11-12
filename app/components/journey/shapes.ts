/* Shared journey shapes (the logo swoosh and the plane), used by JourneyPath and SiteJourney. */

// The swoosh: rises, dips, rises again (viewBox 1440 × 260).
// Kept as numbers so the site-wide journey (SiteJourney) can reuse the exact curve.
export const SWOOSH = {
  start: [-40, 214],
  curves: [
    [170, 214, 250, 74, 470, 82],
    [690, 90, 770, 222, 995, 194],
    [1225, 166, 1290, 46, 1480, 52],
  ],
} as const;

/** Plane silhouette pointing right (24 × 24 box). Shared with SiteJourney. */
export const PLANE_D =
  "M21.5 12c0-.9-.8-1.5-1.7-1.5H14.6L10 3H8l2.6 7.5H5.4L3.6 8H2l1.2 4L2 16h1.6l1.8-2.5h5.2L8 21h2l4.6-7.5h5.2c.9 0 1.7-.6 1.7-1.5Z";

