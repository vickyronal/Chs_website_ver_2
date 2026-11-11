import type { SiteSettings } from "../types/content";

/*
  Business contact details — the ONE place these are stored.
  ⚠️ PLACEHOLDERS: every value below must be replaced with real CHS Tours details.
  Components check `isPlaceholder` so we never show fake numbers as if they were real.
*/
export const site: SiteSettings = {
  name: "CHS Tours",
  tagline: "Go anywhere, with someone to call.",
  url: "https://www.example.com", // PLACEHOLDER: real domain
  whatsappNumber: null, // PLACEHOLDER: international format without "+", e.g. "91XXXXXXXXXX"
  phone: null, // PLACEHOLDER
  email: null, // PLACEHOLDER
  address: null, // PLACEHOLDER
  hours: null, // PLACEHOLDER
  socials: [], // PLACEHOLDER
  isPlaceholder: true,
};
