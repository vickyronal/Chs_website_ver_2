/*
  Content types. These describe the SHAPE of business data.
  Today the data lives in app/content/*.ts; later it will come from Sanity CMS
  in exactly this shape, so components never need to change.
  (Package, Destination, Theme, Review, Faq models are added in Phase 4.)
*/

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  url: string;
  whatsappNumber: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  hours: string | null;
  socials: SocialLink[];
  /** true while the details above are not yet confirmed by CHS */
  isPlaceholder: boolean;
}
