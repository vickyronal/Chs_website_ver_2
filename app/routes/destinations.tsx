import type { Route } from "./+types/destinations";
import { OverlayCard } from "../components/cards/Cards";
import { PageHero } from "../components/sections/PageHero";
import { CardGrid } from "../components/ui/CardGrid";
import { Container, Section, Stack } from "../components/ui/Layout";
import { Eyebrow, Heading } from "../components/ui/Typography";
import { getDestinations } from "../lib/content";
import { buildMeta } from "../lib/seo";
import type { Destination } from "../types/content";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Destinations",
    description: "Explore CHS Tours holiday destinations in India and around the world.",
    path: "/destinations",
  });

export async function loader() {
  return { india: getDestinations("india"), international: getDestinations("international") };
}

export default function Destinations({ loaderData }: Route.ComponentProps) {
  const { india, international } = loaderData;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Destinations" }]}
        eyebrow="Destinations"
        title="Places worth *the journey*"
        intro="Pick a place to see its holidays, or tell us where you'd like to go on WhatsApp."
      />
      <RegionSection id="india" title="India" items={india} />
      <RegionSection id="international" title="International" items={international} />
    </>
  );
}

function RegionSection({ id, title, items }: { id: string; title: string; items: Destination[] }) {
  if (items.length === 0) return null;
  return (
    <Section spacing="compact" id={id} labelledBy={`${id}-title`}>
      <Container>
        <Stack gap={8}>
          <Stack gap={2} align="start">
            <Eyebrow>{items.length} destinations</Eyebrow>
            <Heading id={`${id}-title`}>{title}</Heading>
          </Stack>
          <CardGrid min="15rem">
            {items.map((d) => (
              <OverlayCard key={d.slug} to={`/destinations/${d.slug}`} image={d.photo.image} alt={d.photo.alt} title={d.name} subtitle={d.area} />
            ))}
          </CardGrid>
        </Stack>
      </Container>
    </Section>
  );
}
