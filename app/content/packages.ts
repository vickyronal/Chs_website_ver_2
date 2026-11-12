import type { HolidayPackage } from "../types/content";

/*
  Holiday packages.
  ⚠️ SAMPLE ONLY: everything below (titles, durations, itineraries, inclusions)
  is placeholder content to show how the pages work. It is NOT a real CHS product.
  - Prices are null on purpose → the site shows "Price on request".
  - `sample: true` shows a "Sample" badge on cards and a notice on the detail page.
  Replace with real packages from CHS; keep the same shape.
*/

const standardInclusions = [
  "Hotel stay on twin-sharing basis (sample)",
  "Daily breakfast (sample)",
  "Airport transfers (sample)",
  "Sightseeing as per itinerary (sample)",
];

const standardExclusions = [
  "Flights (sample)",
  "Visa fees (sample)",
  "Personal expenses and tips",
  "Anything not listed under inclusions",
];

export const packages: HolidayPackage[] = [
  {
    slug: "bali-sample",
    title: "Bali Escape",
    summary:
      "A sample itinerary mixing temples, rice terraces and beach time, used here to show how a CHS package page is laid out.",
    destinations: ["bali"],
    themes: ["honeymoon", "family"],
    duration: { nights: 5, days: 6 },
    price: { from: null, basis: null },
    photo: { image: "destination-bali", alt: "Temple on Lake Bratan at sunrise, Bali" },
    highlights: ["Temple visit at sunrise", "A day in the hills", "Free beach day", "Sunset dinner (sample)"],
    itinerary: [
      { day: 1, title: "Arrive in Bali", description: "Airport pick-up and transfer to your hotel. Evening at leisure." },
      { day: 2, title: "Temples and lakes", description: "Full-day sightseeing including a lakeside temple." },
      { day: 3, title: "Into the hills", description: "Rice terraces and village visits, return to the hotel." },
      { day: 4, title: "Beach day", description: "A free day to relax by the sea or add an optional activity." },
      { day: 5, title: "At your own pace", description: "Free day for shopping, spa or exploring." },
      { day: 6, title: "Departure", description: "Breakfast, check-out and airport transfer." },
    ],
    inclusions: standardInclusions,
    exclusions: standardExclusions,
    featured: true,
    sample: true,
  },
  {
    slug: "maldives-sample",
    title: "Maldives by the Sea",
    summary: "A sample island stay, used here to show how a short, relaxed package is presented.",
    destinations: ["maldives"],
    themes: ["honeymoon"],
    duration: { nights: 4, days: 5 },
    price: { from: null, basis: null },
    photo: { image: "destination-maldives", alt: "Overwater villas above turquoise water, Maldives" },
    highlights: ["Island resort stay", "Lagoon time", "Optional water activities (sample)"],
    itinerary: [
      { day: 1, title: "Arrive in Malé", description: "Meet and transfer to your island resort." },
      { day: 2, title: "Island time", description: "A day at leisure on the island." },
      { day: 3, title: "On the water", description: "Optional snorkelling or a boat trip (sample)." },
      { day: 4, title: "Free day", description: "Relax, swim or book a spa session." },
      { day: 5, title: "Departure", description: "Breakfast and transfer back to the airport." },
    ],
    inclusions: standardInclusions,
    exclusions: standardExclusions,
    featured: true,
    sample: true,
  },
  {
    slug: "sri-lanka-sample",
    title: "Sri Lanka Highlights",
    summary: "A sample round trip through heritage sites and green country, used here to show a multi-stop package.",
    destinations: ["sri-lanka"],
    themes: ["family", "group"],
    duration: { nights: 6, days: 7 },
    price: { from: null, basis: null },
    photo: { image: "destination-sri-lanka", alt: "An elephant in front of Sigiriya rock, Sri Lanka" },
    highlights: ["Heritage rock fortress", "Wildlife drive (sample)", "Hill country stay", "Coastal finish"],
    itinerary: [
      { day: 1, title: "Arrive in Colombo", description: "Airport pick-up and transfer to your hotel." },
      { day: 2, title: "To the cultural triangle", description: "Drive inland with stops along the way." },
      { day: 3, title: "Heritage day", description: "Visit the rock fortress and nearby sites." },
      { day: 4, title: "Wildlife", description: "Optional safari drive (sample)." },
      { day: 5, title: "Hill country", description: "Tea country views and a scenic drive." },
      { day: 6, title: "Coast", description: "Transfer to the coast for a relaxed last day." },
      { day: 7, title: "Departure", description: "Breakfast and airport transfer." },
    ],
    inclusions: standardInclusions,
    exclusions: standardExclusions,
    featured: true,
    sample: true,
  },
  {
    slug: "philippines-sample",
    title: "Philippines Island Hopping",
    summary: "A sample island-hopping trip, used here to show a group-friendly package.",
    destinations: ["philippines"],
    themes: ["group"],
    duration: { nights: 5, days: 6 },
    price: { from: null, basis: null },
    photo: { image: "destination-philippines", alt: "Limestone islands and boats in a lagoon, Philippines" },
    highlights: ["Island-hopping boat day", "Lagoon swims", "Beach evenings (sample)"],
    itinerary: [
      { day: 1, title: "Arrive", description: "Airport pick-up and hotel check-in." },
      { day: 2, title: "Island hopping", description: "Full-day boat trip around nearby islands." },
      { day: 3, title: "Lagoons", description: "Visit lagoons and swimming spots (sample)." },
      { day: 4, title: "Free day", description: "Beach time or optional activities." },
      { day: 5, title: "Town and markets", description: "Explore at your own pace." },
      { day: 6, title: "Departure", description: "Breakfast and airport transfer." },
    ],
    inclusions: standardInclusions,
    exclusions: standardExclusions,
    featured: true,
    sample: true,
  },
];
