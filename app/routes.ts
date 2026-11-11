import { type RouteConfig, index, route } from "@react-router/dev/routes";

/*
  THE SITEMAP IN CODE.
  Each line = one URL → one page file in app/routes/.
  ":packageSlug" etc. are dynamic parts, e.g. /holidays/kerala-backwaters-5n6d
*/
export default [
  index("routes/home.tsx"),

  // Holidays & destinations
  route("holidays", "routes/holidays.tsx"),
  route("holidays/:packageSlug", "routes/holiday-detail.tsx"),
  route("destinations", "routes/destinations.tsx"),
  route("destinations/:destinationSlug", "routes/destination-detail.tsx"),
  route("experiences", "routes/experiences.tsx"),
  route("experiences/:themeSlug", "routes/experience-detail.tsx"),

  // Business & services
  route("corporate-travel", "routes/corporate-travel.tsx"),
  route("services", "routes/services.tsx"),

  // About & trust
  route("about", "routes/about.tsx"),
  route("reviews", "routes/reviews.tsx"),
  route("faq", "routes/faq.tsx"),
  route("contact", "routes/contact.tsx"),
  route("thank-you", "routes/thank-you.tsx"),

  // Legal
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("terms", "routes/terms.tsx"),
  route("cancellation-policy", "routes/cancellation-policy.tsx"),

  // Internal: design system review page (hidden from search engines and menus)
  route("styleguide", "routes/styleguide.tsx"),

  // Anything else → 404 page
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
