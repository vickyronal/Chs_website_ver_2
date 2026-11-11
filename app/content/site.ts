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
  // ⚠️ DUMMY: replace with the real office address before launch
  address: "No. 00, Sample Street, Sample Nagar, City – 000 000, India",
  hours: null, // PLACEHOLDER
  // ⚠️ DUMMY: links go to each platform's home page; replace with CHS Tours profile URLs
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/" },
    { label: "Facebook", url: "https://www.facebook.com/" },
    { label: "YouTube", url: "https://www.youtube.com/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
  ],
};
