import type { Reason } from "../types/content";

/*
  Homepage copy.
  ✏️ DRAFT: written from the CHS business brief only (no invented facts, numbers,
  awards or guarantees). CHS should review and edit every line before launch.
*/

export const hero = {
  eyebrow: "Domestic · International · Corporate",
  // Words inside *asterisks* render in italic CHS Red
  heading: "Your next *journey* starts with a conversation",
  intro: "Fixed holiday packages in India and around the world, planned with you on WhatsApp.",
};

export const reasons: Reason[] = [
  {
    title: "Plan it on WhatsApp",
    body: "Message us and plan your trip in a conversation, not a long form.",
  },
  {
    title: "Clear, fixed packages",
    body: "Day-by-day itineraries with what's included listed up front.",
  },
  {
    title: "India and the world",
    body: "Domestic and international holidays for families, couples and groups.",
  },
  {
    title: "Corporate travel too",
    body: "Group tours and business travel planned for teams.",
  },
];

/** Services named in the CHS brief. Visa/ticketing etc. only once CHS confirms them. */
export const services = [
  { title: "Domestic holidays", body: "Fixed packages across India.", to: "/holidays?region=india" },
  { title: "International holidays", body: "Fixed packages abroad.", to: "/holidays?region=international" },
  { title: "Customised packages", body: "Your idea, shaped into an itinerary.", to: "/experiences/customised" },
  { title: "Corporate travel", body: "Business trips and group tours for teams.", to: "/corporate-travel" },
];

export const corporate = {
  eyebrow: "For companies",
  heading: "Corporate travel, *handled*",
  body: "Team offsites, corporate group tours and business travel, planned with one point of contact.",
  offerings: ["Corporate group tours", "Business travel", "Team offsites"],
};
