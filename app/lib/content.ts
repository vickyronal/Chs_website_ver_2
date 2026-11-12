/*
  THE ONLY DOOR TO CONTENT.
  Pages and loaders get data from these functions, never from app/content/* directly.
  When Sanity CMS arrives, only this file changes (the functions become async
  CMS queries); every page and component stays the same.
*/
import { destinations } from "../content/destinations";
import { corporate, hero, reasons, services } from "../content/home";
import { packages } from "../content/packages";
import { themes } from "../content/themes";
import type { HolidayPackage, Region } from "../types/content";

/* ---------- Themes (kinds of holiday) ---------- */
export function getThemes() {
  return themes;
}

export function getTheme(slug: string) {
  return themes.find((t) => t.slug === slug) ?? null;
}

/* ---------- Destinations ---------- */
export function getDestinations(region?: Region) {
  return region ? destinations.filter((d) => d.region === region) : destinations;
}

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug) ?? null;
}

/* ---------- Packages ---------- */
export function getPackages() {
  return packages;
}

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug) ?? null;
}

export function getFeaturedPackages() {
  return packages.filter((p) => p.featured);
}

export function getPackagesForDestination(slug: string) {
  return packages.filter((p) => p.destinations.includes(slug));
}

export function getPackagesForTheme(slug: string) {
  return packages.filter((p) => p.themes.includes(slug));
}

/** Other packages sharing a destination or theme, best matches first */
export function getRelatedPackages(pkg: HolidayPackage, limit = 4) {
  return packages
    .filter((p) => p.slug !== pkg.slug)
    .map((p) => ({
      p,
      score:
        p.destinations.filter((d) => pkg.destinations.includes(d)).length * 2 +
        p.themes.filter((t) => pkg.themes.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

/** Destination names for a package, e.g. "Bali, Lombok" */
export function destinationNames(pkg: HolidayPackage) {
  return pkg.destinations.map((slug) => getDestination(slug)?.name ?? slug).join(", ");
}

/* ---------- Homepage ---------- */
export function getHomeContent() {
  return { hero, reasons, services, corporate };
}

/* ---------- All URLs, for pre-rendering and the sitemap ---------- */
export function getDynamicPaths() {
  return [
    ...packages.map((p) => `/holidays/${p.slug}`),
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...themes.map((t) => `/experiences/${t.slug}`),
  ];
}
