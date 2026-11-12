import type { Route } from "./+types/home";
import { JourneyHero } from "../components/sections/JourneyHero";
import {
  CorporateBand,
  DestinationShowcase,
  FeaturedPackages,
  FinalCta,
  QuickFinder,
  ServicesList,
  ThemeSlider,
  WhyChsBento,
} from "../components/sections/HomeSections";
import { site } from "../content/site";
import { getDestinations, getFeaturedPackages, getHomeContent, getThemes } from "../lib/content";
import { phoneLink, whatsappLink } from "../lib/contact";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Domestic & International Holiday Packages",
    description: "Fixed holiday packages in India and abroad, planned with CHS Tours on WhatsApp.",
    path: "/",
  });

/**
 * loader = "fetch the data this page needs".
 * With pre-rendering it runs at BUILD time, so the finished HTML already contains
 * everything. Later, this is where the Sanity CMS queries will go.
 */
export async function loader() {
  return {
    ...getHomeContent(),
    themes: getThemes(),
    destinations: getDestinations(),
    packages: getFeaturedPackages(),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { hero, reasons, services, corporate, themes, destinations, packages } = loaderData;
  const whatsapp = whatsappLink();

  return (
    <>
      <JourneyHero {...hero} destinations={destinations} whatsapp={whatsapp} />
      <QuickFinder destinations={destinations} themes={themes} />
      <ThemeSlider themes={themes} />
      <FeaturedPackages packages={packages} destinations={destinations} />
      <DestinationShowcase destinations={destinations} />
      <WhyChsBento reasons={reasons} photo={themes.find((t) => t.slug === "family")?.photo ?? themes[0]?.photo} whatsapp={whatsapp} />
      <CorporateBand {...corporate} whatsapp={whatsappLink({ kind: "corporate" })} />
      <ServicesList services={services} />
      {/* Testimonials appear here once CHS supplies real reviews (none are shown until then) */}
      <FinalCta whatsapp={whatsapp} tel={phoneLink()} phoneDisplay={site.phoneDisplay} />
    </>
  );
}
