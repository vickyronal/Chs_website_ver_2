/*
  Site navigation links. The Header and Footer read from here,
  so a menu change happens in one place only.
*/
export interface NavLink {
  label: string;
  to: string;
}

/** Desktop header pills. "Destinations" opens the mega-menu. */
export const mainNav: NavLink[] = [
  { label: "Holidays", to: "/holidays" },
  { label: "Destinations", to: "/destinations" },
  { label: "Experiences", to: "/experiences" },
  { label: "Corporate", to: "/corporate-travel" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

/** Footer "Explore" column */
export const exploreNav: NavLink[] = [
  { label: "Holiday Packages", to: "/holidays" },
  { label: "Destinations", to: "/destinations" },
  { label: "Travel Experiences", to: "/experiences" },
  { label: "Corporate Travel", to: "/corporate-travel" },
  { label: "Travel Services", to: "/services" },
];

/** Footer "Company" column */
export const companyNav: NavLink[] = [
  { label: "About CHS", to: "/about" },
  { label: "Reviews", to: "/reviews" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Cancellation Policy", to: "/cancellation-policy" },
];
