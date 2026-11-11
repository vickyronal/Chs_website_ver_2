/*
  Site navigation links. The Header (Phase 3) and Footer will read from here,
  so a menu change happens in one place only.
*/
export interface NavLink {
  label: string;
  to: string;
}

export const mainNav: NavLink[] = [
  { label: "Holidays", to: "/holidays" },
  { label: "Destinations", to: "/destinations" },
  { label: "Experiences", to: "/experiences" },
  { label: "Corporate Travel", to: "/corporate-travel" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const secondaryNav: NavLink[] = [
  { label: "Reviews", to: "/reviews" },
  { label: "FAQ", to: "/faq" },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Cancellation Policy", to: "/cancellation-policy" },
];
