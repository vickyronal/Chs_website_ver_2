import type { Route } from "./+types/services";
import { FinalCta } from "../components/sections/HomeSections";
import { OfferingList } from "../components/sections/InfoSections";
import { PageHero } from "../components/sections/PageHero";
import { site } from "../content/site";
import { getServicesPage } from "../lib/content";
import { phoneLink, whatsappLink } from "../lib/contact";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Travel Services",
    description: "Domestic and international holiday packages, customised trips and corporate travel from CHS Tours.",
    path: "/services",
  });

export async function loader() {
  return getServicesPage();
}

export default function Services({ loaderData: page }: Route.ComponentProps) {
  const whatsapp = whatsappLink();
  return (
    <>
      <PageHero crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]} eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <OfferingList id="services" label="What we do" title="Our *services*" offerings={page.offerings} whatsapp={whatsapp} />
      <FinalCta whatsapp={whatsapp} tel={phoneLink()} phoneDisplay={site.phoneDisplay} />
    </>
  );
}
