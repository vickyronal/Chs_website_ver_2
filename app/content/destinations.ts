import type { Destination } from "../types/content";

/*
  Destinations.
  ⚠️ SAMPLE: these four are based on the photos supplied so far. CHS must confirm
  which destinations it actually sells (India and international) before launch.
  India destinations will appear automatically once added here with region "india".
*/
export const destinations: Destination[] = [
  {
    slug: "bali",
    name: "Bali",
    region: "international",
    area: "Indonesia",
    photo: { image: "destination-bali", alt: "Pura Ulun Danu Bratan temple on Lake Bratan at sunrise, Bali" },
    sample: true,
  },
  {
    slug: "maldives",
    name: "Maldives",
    region: "international",
    area: "Indian Ocean",
    photo: { image: "destination-maldives", alt: "Overwater villas above turquoise water in the Maldives" },
    sample: true,
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    region: "international",
    area: "South Asia",
    photo: { image: "destination-sri-lanka", alt: "An elephant grazing in front of Sigiriya rock, Sri Lanka" },
    sample: true,
  },
  {
    slug: "philippines",
    name: "Philippines",
    region: "international",
    area: "Southeast Asia",
    photo: { image: "destination-philippines", alt: "Limestone islands and boats in a turquoise lagoon, Philippines" },
    sample: true,
  },
];
