import type { Theme } from "../types/content";

/*
  Kinds of holiday. These come from the CHS business brief
  (family, honeymoon, group tours, customised packages).
  Summaries are DRAFT copy for CHS to approve.
*/
export const themes: Theme[] = [
  {
    slug: "family",
    name: "Family Holidays",
    summary: "Trips that work for every age, from grandparents to toddlers.",
    photo: { image: "theme-family", alt: "A smiling multi-generation family standing together on a lawn" },
  },
  {
    slug: "honeymoon",
    name: "Honeymoon",
    summary: "Unhurried escapes for two.",
    photo: { image: "theme-honeymoon", alt: "A laughing couple on the beach, one carrying the other piggyback" },
  },
  {
    slug: "group",
    name: "Group Tours",
    summary: "Friends, clubs and big gangs travelling together.",
    photo: { image: "theme-group", alt: "Four friends smiling together on a rooftop terrace" },
  },
  {
    slug: "customised",
    name: "Customised Trips",
    summary: "Tell us the idea; we shape the itinerary around it.",
    photo: { image: "plane-wing-sunset", alt: "An aircraft wing with a red tip above the clouds at sunset" },
  },
];
