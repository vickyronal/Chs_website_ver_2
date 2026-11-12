import type { Route } from "./+types/corporate-travel";
import { FinalCta } from "../components/sections/HomeSections";
import { OfferingList, Statement, Steps } from "../components/sections/InfoSections";
import { PageHero } from "../components/sections/PageHero";
import { Button } from "../components/ui/Button";
import { Cluster } from "../components/ui/Layout";
import { site } from "../content/site";
import { getCorporatePage } from "../lib/content";
import { phoneLink, whatsappLink } from "../lib/contact";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Corporate Travel",
    description: "Corporate group tours, business travel and team offsites planned by CHS Tours, with one point of contact.",
    path: "/corporate-travel",
  });

export async function loader() {
  return getCorporatePage();
}

/** Site-wide WhatsApp buttons on this page start a corporate conversation */
export const handle = { whatsapp: { kind: "corporate" } };

export default function CorporateTravel({ loaderData: page }: Route.ComponentProps) {
  const whatsapp = whatsappLink({ kind: "corporate" });
  return (
    <>
      <PageHero crumbs={[{ label: "Home", to: "/" }, { label: "Corporate Travel" }]} eyebrow={page.eyebrow} title={page.title} intro={page.intro}>
        <Cluster>
          {whatsapp && (
            <Button href={whatsapp} icon="whatsapp" arrow>
              Discuss your trip
            </Button>
          )}
          <Button to="/contact" variant="light">
            Send a brief
          </Button>
        </Cluster>
      </PageHero>
      <Statement label="How we work with companies" text={page.statement} />
      <OfferingList id="offerings" label="What we offer" title="Corporate travel *services*" offerings={page.offerings} whatsapp={whatsapp} />
      <Steps id="process" label="The process" title="From brief to boarding, *in four steps*" steps={page.steps} />
      <FinalCta whatsapp={whatsapp} tel={phoneLink()} phoneDisplay={site.phoneDisplay} />
    </>
  );
}
