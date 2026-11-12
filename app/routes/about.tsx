import type { Route } from "./+types/about";
import { FinalCta, WhyChsBento } from "../components/sections/HomeSections";
import { Prose, Statement, Steps } from "../components/sections/InfoSections";
import { PageHero } from "../components/sections/PageHero";
import { site } from "../content/site";
import { getAboutPage, getHomeContent, getThemes } from "../lib/content";
import { phoneLink, whatsappLink } from "../lib/contact";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "About CHS Tours",
    description: "About CHS Tours: domestic, international and corporate travel, planned in a conversation with you.",
    path: "/about",
  });

export async function loader() {
  const themes = getThemes();
  return {
    page: getAboutPage(),
    reasons: getHomeContent().reasons,
    photo: themes.find((t) => t.slug === "group")?.photo ?? themes[0]?.photo,
  };
}

export default function About({ loaderData }: Route.ComponentProps) {
  const { page, reasons, photo } = loaderData;
  const whatsapp = whatsappLink();
  return (
    <>
      <PageHero crumbs={[{ label: "Home", to: "/" }, { label: "About" }]} eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Statement label="What we believe" text={page.statement} />
      <Prose id="story" label="Who we are" title="Our *story*" paragraphs={page.story} />
      <Steps id="values" label="How we work" title="Four things *we hold to*" steps={page.values} />
      <WhyChsBento reasons={reasons} photo={photo} whatsapp={whatsapp} />
      <FinalCta whatsapp={whatsapp} tel={phoneLink()} phoneDisplay={site.phoneDisplay} />
    </>
  );
}
