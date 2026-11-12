/*
  Content for the inner pages: Corporate, Services, About, FAQ, Contact, Legal.

  ✏️ DRAFT PLACEHOLDER CONTENT
  Structure modelled on what a full-service travel agency site covers (LGT Holidays
  was the reference for WHICH topics to include). All wording is original and generic.
  - Nothing here states a fact about CHS that CHS hasn't confirmed.
  - Items with `confirm: true` are services CHS must confirm it offers; they show a
    "To be confirmed" tag until then.
  - Replace every line with CHS's own content when it is supplied.
*/

export interface Offering {
  id: string;
  title: string;
  body: string;
  points?: string[];
  confirm?: boolean;
  to?: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: Faq[];
}

/* ---------------- Corporate travel ---------------- */
export const corporatePage = {
  eyebrow: "Corporate travel",
  title: "Business travel, *handled end to end*",
  intro:
    "From a single business trip to a full team offsite, one CHS contact plans the travel, stays and on-ground details so your team can focus on the work.",
  statement:
    "Tell us the dates, the headcount and the goal. *We'll shape the itinerary, the stays and the logistics around it.*",
  offerings: [
    {
      id: "mice",
      title: "Meetings, incentives, conferences & events",
      body: "Planning for offsites, incentive trips, conferences and company events, from venue to transfers.",
      points: ["Venue and stay options", "Group transfers", "Event-day coordination"],
      confirm: true,
    },
    {
      id: "group-tours",
      title: "Corporate group tours",
      body: "Fixed or tailored group itineraries for teams travelling together.",
      points: ["Team-friendly itineraries", "Single point of contact", "Group rooming"],
    },
    {
      id: "business-travel",
      title: "Business travel",
      body: "Trips for individual travellers or small teams, arranged around your schedule.",
      points: ["Itinerary planning", "Stays near your meetings", "Changes handled for you"],
    },
    {
      id: "ticketing",
      title: "Flight ticketing",
      body: "Domestic and international flight bookings for your travellers.",
      confirm: true,
    },
    {
      id: "hotels",
      title: "Hotel bookings",
      body: "Stays matched to your budget, location and travel policy.",
      confirm: true,
    },
    {
      id: "visa",
      title: "Visa assistance",
      body: "Guidance on documents and the application process for international trips.",
      confirm: true,
    },
  ] satisfies Offering[],
  steps: [
    { title: "Share your brief", body: "Dates, destination, headcount, budget and the purpose of the trip." },
    { title: "Get a plan", body: "We come back with an itinerary and options to compare." },
    { title: "Confirm and travel", body: "Once approved, we book everything and share the final details." },
    { title: "Support on the way", body: "Reach us on WhatsApp or phone if plans change." },
  ] satisfies Step[],
};

/* ---------------- Services ---------------- */
export const servicesPage = {
  eyebrow: "Travel services",
  title: "Everything around your trip, *in one place*",
  intro: "Holiday packages, customised trips and the practical pieces that go with them.",
  offerings: [
    {
      id: "domestic",
      title: "Domestic holidays",
      body: "Fixed holiday packages across India, with clear day-by-day plans.",
      to: "/holidays?where=india",
    },
    {
      id: "international",
      title: "International holidays",
      body: "Fixed packages to destinations abroad, planned with you on WhatsApp.",
      to: "/holidays?where=international",
    },
    {
      id: "customised",
      title: "Customised packages",
      body: "Start from your idea, dates and budget; we shape the itinerary around them.",
      to: "/experiences/customised",
    },
    {
      id: "corporate",
      title: "Corporate travel",
      body: "Business trips, team offsites and corporate group tours.",
      to: "/corporate-travel",
    },
    {
      id: "ticketing",
      title: "Flight ticketing",
      body: "Help booking flights that fit your holiday or business plans.",
      confirm: true,
    },
    {
      id: "hotels",
      title: "Hotel bookings",
      body: "Stays chosen for location, comfort and budget.",
      confirm: true,
    },
    {
      id: "visa",
      title: "Visa assistance",
      body: "Guidance on what you need and how to apply for international trips.",
      confirm: true,
    },
  ] satisfies Offering[],
};

/* ---------------- About ---------------- */
export const aboutPage = {
  eyebrow: "About CHS Tours",
  title: "Travel planned *like a conversation*",
  intro: "CHS Tours plans domestic, international and corporate travel, with every trip shaped in a conversation with you.",
  statement:
    "We believe a good trip starts with listening. *Tell us how you like to travel, and we'll plan the rest around you.*",
  // ⚠️ PLACEHOLDER: replace with the real CHS story (founder, year, journey so far)
  story: [
    "This is where the CHS Tours story will go: how the company started, who is behind it, and what kind of travel it loves to plan.",
    "Until CHS supplies its story, this text is a placeholder and should not be published as-is.",
  ],
  values: [
    { title: "Clear", body: "Itineraries, inclusions and next steps written plainly, with no surprises." },
    { title: "Personal", body: "Every plan starts from who is travelling and what they enjoy." },
    { title: "Reachable", body: "A real person on WhatsApp or phone before, during and after the trip." },
    { title: "Careful", body: "Details checked and confirmed before anything is booked." },
  ] satisfies Step[],
};

/* ---------------- FAQ ---------------- */
export const faqGroups: FaqGroup[] = [
  {
    id: "booking",
    title: "Planning & booking",
    items: [
      {
        q: "How do I book a holiday with CHS Tours?",
        a: "Choose a package or tell us your idea, then message us on WhatsApp, call, or send an enquiry. We'll confirm the details, dates and price with you before anything is booked.",
      },
      {
        q: "Can I change a fixed package?",
        a: "Yes. Fixed packages are a starting point. Tell us what you'd like to add, remove or change and we'll suggest options.",
      },
      {
        q: "Do you plan trips for groups and families?",
        a: "Yes: families, friends, and corporate groups. Share the number of travellers and any special needs when you enquire.",
      },
      {
        q: "How early should I plan my trip?",
        a: "The earlier the better, especially for peak seasons and international trips. Message us with your dates and we'll advise.",
      },
    ],
  },
  {
    id: "payments",
    title: "Prices & payments",
    items: [
      {
        q: "Why do some packages show “Price on request”?",
        a: "Prices depend on dates, hotels and the number of travellers. Send us your details and we'll share an exact quote.",
      },
      {
        q: "How and when do I pay?",
        a: "Payment options and schedule will be shared with your quote. (Placeholder: CHS to confirm its payment terms.)",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes & cancellations",
    items: [
      {
        q: "What if I need to cancel or change my trip?",
        a: "Please contact us as soon as possible. Charges depend on what has already been booked; see our cancellation policy for details.",
      },
    ],
  },
  {
    id: "documents",
    title: "Documents & visas",
    items: [
      {
        q: "What documents do I need for international travel?",
        a: "A valid passport is required, and many countries also need a visa. Requirements differ by destination and nationality, so always check before you travel. We'll share what to check for your trip.",
      },
      {
        q: "Do you help with visas?",
        a: "Ask us when you enquire. (Placeholder: CHS to confirm whether visa assistance is offered.)",
      },
    ],
  },
  {
    id: "on-trip",
    title: "During your trip",
    items: [
      {
        q: "Who do I contact if something comes up while I'm travelling?",
        a: "Message or call CHS Tours on the number shared with your booking. We'll help you sort it out.",
      },
    ],
  },
];

/* ---------------- Legal pages ---------------- */
// ⚠️ Section headings only. The actual policy text must be written or approved by CHS
// (ideally with legal advice). Nothing here is a real policy.
export const legalPages = {
  "privacy-policy": {
    title: "Privacy Policy",
    sections: [
      "What information we collect",
      "How we use your information",
      "WhatsApp, phone and form enquiries",
      "Who we share information with",
      "How long we keep information",
      "Your rights and choices",
      "How to contact us about privacy",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    sections: [
      "About these terms",
      "Quotes, prices and availability",
      "Bookings and confirmation",
      "Payments",
      "Changes by you or by us",
      "Travel documents and visas",
      "Responsibilities and limitations",
      "Contact",
    ],
  },
  "cancellation-policy": {
    title: "Cancellation & Refund Policy",
    sections: [
      "How to cancel",
      "Cancellation charges",
      "Refunds",
      "Changes to dates or travellers",
      "Cancellations by CHS Tours or suppliers",
      "Contact",
    ],
  },
} as const;

export type LegalSlug = keyof typeof legalPages;
