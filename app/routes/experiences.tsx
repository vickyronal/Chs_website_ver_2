import type { Route } from "./+types/experiences";
import { PhotoLabelCard } from "../components/cards/Cards";
import { PageHero } from "../components/sections/PageHero";
import { CardGrid } from "../components/ui/CardGrid";
import { Container, Section } from "../components/ui/Layout";
import { getThemes } from "../lib/content";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Travel Experiences",
    description: "Family holidays, honeymoons, group tours and customised trips from CHS Tours.",
    path: "/experiences",
  });

export async function loader() {
  return { themes: getThemes() };
}

export default function Experiences({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Experiences" }]}
        eyebrow="Travel experiences"
        title="Not sure *where to go?*"
        intro="Start with the kind of trip you have in mind. We'll suggest places that fit."
      />
      <Section spacing="compact">
        <Container>
          <CardGrid min="15rem">
            {loaderData.themes.map((t) => (
              <PhotoLabelCard key={t.slug} to={`/experiences/${t.slug}`} image={t.photo.image} alt={t.photo.alt} label={t.name} />
            ))}
          </CardGrid>
        </Container>
      </Section>
    </>
  );
}
