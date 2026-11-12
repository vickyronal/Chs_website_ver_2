import type { Route } from "./+types/faq";
import { FinalCta } from "../components/sections/HomeSections";
import { FaqList } from "../components/sections/InfoSections";
import { PageHero } from "../components/sections/PageHero";
import { site } from "../content/site";
import { getFaqGroups } from "../lib/content";
import { phoneLink, whatsappLink } from "../lib/contact";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Frequently Asked Questions",
    description: "Answers to common questions about planning, booking, payments, documents and travel with CHS Tours.",
    path: "/faq",
  });

export async function loader() {
  return { groups: getFaqGroups() };
}

export default function Faq({ loaderData }: Route.ComponentProps) {
  const whatsapp = whatsappLink();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "FAQ" }]}
        eyebrow="Help"
        title="Questions, *answered*"
        intro="Can't find what you're looking for? Message us on WhatsApp and we'll help."
      />
      <FaqList groups={loaderData.groups} />
      <FinalCta whatsapp={whatsapp} tel={phoneLink()} phoneDisplay={site.phoneDisplay} />
    </>
  );
}
