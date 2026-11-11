/*
  Content types. These describe the SHAPE of business data.
  Today the data lives in app/content/*.ts; later it will come from Sanity CMS
  in exactly this shape, so components never need to change.
*/
import type { ImageName } from "../content/images.generated";

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  url: string;
  /** International format, digits only, e.g. "919080687272" (used for wa.me links) */
  whatsappNumber: string | null;
  /** How the phone number is shown to people, e.g. "+91 90806 87272" */
  phoneDisplay: string | null;
  email: string | null;
  address: string | null;
  hours: string | null;
  socials: SocialLink[];
}

export interface Photo {
  image: ImageName;
  alt: string;
}

/** A kind of holiday: Family, Honeymoon, Group… */
export interface Theme {
  slug: string;
  name: string;
  /** Short line for cards and the theme page intro */
  summary: string;
  photo: Photo;
}

export type Region = "india" | "international";

export interface Destination {
  slug: string;
  name: string;
  region: Region;
  /** Country or wider area shown under the name, e.g. "Indonesia" */
  area: string;
  photo: Photo;
  /** true = demo content to be replaced/confirmed by CHS */
  sample?: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface HolidayPackage {
  slug: string;
  title: string;
  summary: string;
  /** slugs of Destination entries */
  destinations: string[];
  /** slugs of Theme entries */
  themes: string[];
  duration: { nights: number; days: number };
  /** null = "Price on request" (never show a made-up number) */
  price: { from: number | null; basis: string | null };
  photo: Photo;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  featured: boolean;
  /** true = demo content to be replaced/confirmed by CHS */
  sample?: boolean;
}

/** One verified reason to choose CHS (Why-CHS section) */
export interface Reason {
  title: string;
  body: string;
}
