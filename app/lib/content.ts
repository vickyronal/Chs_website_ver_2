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
import type { Region } from "../types/content";

export function getThemes() {
  return themes;
}

export function getDestinations(region?: Region) {
  return region ? destinations.filter((d) => d.region === region) : destinations;
}

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug) ?? null;
}

export function getFeaturedPackages() {
  return packages.filter((p) => p.featured);
}

export function getHomeContent() {
  return { hero, reasons, services, corporate };
}
