import type { SiteSettings } from "../types/content";

/*
  Business contact details — the ONE place these are stored.
  `null` = not supplied yet; the site simply hides that detail (never shows a fake value).
*/
export const site: SiteSettings = {
  name: "CHS Tours",
  tagline: "Go anywhere, with someone to call.",
  url: "https://www.example.com", // PLACEHOLDER: real domain (used for SEO links)
  whatsappNumber: "919080687272", // ✅ confirmed by CHS
  phoneDisplay: "+91 90806 87272", // ✅ confirmed by CHS
  email: null, // PLACEHOLDER
  address: null, // PLACEHOLDER
  hours: null, // PLACEHOLDER
  socials: [], // PLACEHOLDER
};
