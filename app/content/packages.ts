import type { HolidayPackage } from "../types/content";

/*
  Holiday packages.
  ⚠️ SAMPLE ONLY: titles and durations below are layout placeholders, not real CHS
  products. Prices are null ("Price on request") on purpose. Cards show a "Sample"
  badge while `sample: true`. Replace with real packages from CHS (Phase 4).
*/
const empty = { highlights: [], itinerary: [], inclusions: [], exclusions: [] };

export const packages: HolidayPackage[] = [
  {
    slug: "bali-sample",
    title: "Bali Escape",
    summary: "Sample package for layout review.",
    destinations: ["bali"],
    themes: ["honeymoon", "family"],
    duration: { nights: 5, days: 6 },
    price: { from: null, basis: null },
    photo: { image: "destination-bali", alt: "Temple on Lake Bratan at sunrise, Bali" },
    featured: true,
    sample: true,
    ...empty,
  },
  {
    slug: "maldives-sample",
    title: "Maldives by the Sea",
    summary: "Sample package for layout review.",
    destinations: ["maldives"],
    themes: ["honeymoon"],
    duration: { nights: 4, days: 5 },
    price: { from: null, basis: null },
    photo: { image: "destination-maldives", alt: "Overwater villas, Maldives" },
    featured: true,
    sample: true,
    ...empty,
  },
  {
    slug: "sri-lanka-sample",
    title: "Sri Lanka Highlights",
    summary: "Sample package for layout review.",
    destinations: ["sri-lanka"],
    themes: ["family", "group"],
    duration: { nights: 6, days: 7 },
    price: { from: null, basis: null },
    photo: { image: "destination-sri-lanka", alt: "Sigiriya rock, Sri Lanka" },
    featured: true,
    sample: true,
    ...empty,
  },
  {
    slug: "philippines-sample",
    title: "Philippines Island Hopping",
    summary: "Sample package for layout review.",
    destinations: ["philippines"],
    themes: ["group"],
    duration: { nights: 5, days: 6 },
    price: { from: null, basis: null },
    photo: { image: "destination-philippines", alt: "Lagoon and limestone islands, Philippines" },
    featured: true,
    sample: true,
    ...empty,
  },
];
