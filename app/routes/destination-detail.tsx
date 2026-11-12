import { data } from "react-router";
import type { Route } from "./+types/destination-detail";
import { PackageGrid } from "../components/package/PackageGrid";
import { PageHero } from "../components/sections/PageHero";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/CardGrid";
import { Cluster, Container, Section, Stack } from "../components/ui/Layout";
import { Heading } from "../components/ui/Typography";
import { site } from "../content/site";
import { getDestination, getDestinations, getPackagesForDestination } from "../lib/content";
import { whatsappLink, type WhatsAppContext } from "../lib/contact";
import { buildMeta } from "../lib/seo";

export async function loader({ params }: Route.LoaderArgs) {
  const destination = getDestination(params.destinationSlug);
  if (!destination) throw data("Destination not found", { status: 404 });
  return { destination, packages: getPackagesForDestination(destination.slug), destinations: getDestinations() };
}

export const meta: Route.MetaFunction = ({ loaderData, params }) => {
  if (!loaderData) return [{ title: `Destination not found | ${site.name}` }];
  const { destination } = loaderData;
  return buildMeta({
    title: `${destination.name} Holiday Packages`,
    description: `Holiday packages to ${destination.name}, ${destination.area}, planned by CHS Tours. Enquire on WhatsApp.`,
    path: `/destinations/${params.destinationSlug}`,
  });
};

function destinationContext(loaderData: unknown): WhatsAppContext {
  const d = loaderData as Awaited<ReturnType<typeof loader>> | undefined;
  return d ? { kind: "destination", name: d.destination.name } : { kind: "general" };
}
export const handle = { whatsapp: destinationContext };

export default function DestinationDetail({ loaderData }: Route.ComponentProps) {
  const { destination, packages, destinations } = loaderData;
  const whatsapp = whatsappLink(destinationContext(loaderData));

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Destinations", to: "/destinations" }, { label: destination.name }]}
        eyebrow={destination.area}
        title={destination.name}
        intro={`Holidays to ${destination.name}, planned with you on WhatsApp.`}
        photo={destination.photo}
      >
        {whatsapp && (
          <Cluster>
            <Button href={whatsapp} icon="whatsapp" arrow>
              Plan a {destination.name} trip
            </Button>
          </Cluster>
        )}
      </PageHero>

      <Section labelledBy="packages-title">
        <Container>
          <Stack gap={8}>
            <Heading id="packages-title">{destination.name} holidays</Heading>
            {packages.length > 0 ? (
              <PackageGrid packages={packages} destinations={destinations} />
            ) : (
              <EmptyState title={`No ready-made ${destination.name} packages yet, but we can plan one for you.`}>
                {whatsapp && (
                  <Button href={whatsapp} icon="whatsapp" arrow>
                    Ask on WhatsApp
                  </Button>
                )}
              </EmptyState>
            )}
          </Stack>
        </Container>
      </Section>
    </>
  );
}
