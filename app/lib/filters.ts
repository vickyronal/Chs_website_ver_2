/*
  Holiday filters. The filters live in the URL (e.g. /holidays?where=bali&theme=honeymoon)
  so a filtered list can be shared, bookmarked, and the back button works.
  These are plain functions, so they're easy to test and reuse.
*/
import type { Destination, HolidayPackage } from "../types/content";

export const DURATIONS = [
  { value: "short", label: "Up to 4 nights", test: (n: number) => n <= 4 },
  { value: "week", label: "5–7 nights", test: (n: number) => n >= 5 && n <= 7 },
  { value: "long", label: "8+ nights", test: (n: number) => n >= 8 },
] as const;

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "mar" → "March" */
export function monthName(code: string | null) {
  if (!code) return null;
  return MONTHS.find((m) => m.slice(0, 3).toLowerCase() === code) ?? null;
}

export interface HolidayFilters {
  /** "india", "international", or a destination slug */
  where: string | null;
  theme: string | null;
  duration: string | null;
  month: string | null;
}

export function readFilters(params: URLSearchParams): HolidayFilters {
  return {
    where: params.get("where") || null,
    theme: params.get("theme") || null,
    duration: params.get("duration") || null,
    month: params.get("month") || null,
  };
}

export function filterPackages(packages: HolidayPackage[], destinations: Destination[], f: HolidayFilters) {
  return packages.filter((p) => {
    if (f.where) {
      if (f.where === "india" || f.where === "international") {
        const regions = p.destinations.map((slug) => destinations.find((d) => d.slug === slug)?.region);
        if (!regions.includes(f.where)) return false;
      } else if (!p.destinations.includes(f.where)) {
        return false;
      }
    }
    if (f.theme && !p.themes.includes(f.theme)) return false;
    if (f.duration) {
      const bucket = DURATIONS.find((d) => d.value === f.duration);
      if (bucket && !bucket.test(p.duration.nights)) return false;
    }
    // Month is not used to filter (packages don't have fixed dates yet).
    // It's passed into the WhatsApp message instead.
    return true;
  });
}
