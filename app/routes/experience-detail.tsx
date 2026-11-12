import { data } from "react-router";
import type { Route } from "./+types/experience-detail";
import { PackageGrid } from "../components/package/PackageGrid";
import { PageHero } from "../components/sections/PageHero";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/CardGrid";
import { Cluster, Container, Section, Stack } from "../components/ui/Layout";
import { Heading } from "../components/ui/Typography";
import { site } from "../content/site";
import { getDestinations, getPackagesForTheme, getTheme } from "../lib/content";
import { whatsappLink, type WhatsAppContext } from "../lib/contact";
import { buildMeta } from "../lib/seo";

export async function loader({ params }: Route.LoaderArgs) {
  const theme = getTheme(params.themeSlug);
  if (!theme) throw data("Experience not found", { status: 404 });
  return { theme, packages: getPackagesForTheme(theme.slug), destinations: getDestinations() };
}

export const meta: Route.MetaFunction = ({ loaderData, params }) => {
  if (!loaderData) return [{ title: `Experience not found | ${site.name}` }];
  const { theme } = loaderData;
  return buildMeta({
    title: `${theme.name} Packages`,
    description: `${theme.summary} ${theme.name} packages from CHS Tours, planned on WhatsApp.`,
    path: `/experiences/${params.themeSlug}`,
  });
};

function themeContext(loaderData: unknown): WhatsAppContext {
  const d = loaderData as Awaited<ReturnType<typeof loader>> | undefined;
  return d ? { kind: "theme", name: d.theme.name } : { kind: "general" };
}
export const handle = { whatsapp: themeContext };

export default function ExperienceDetail({ loaderData }: Route.ComponentProps) {
  const { theme, packages, destinations } = loaderData;
  const whatsapp = whatsappLink(themeContext(loaderData));

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Experiences", to: "/experiences" }, { label: theme.name }]}
        eyebrow="Travel experiences"
        title={theme.name}
        intro={theme.summary}
        photo={theme.photo}
      >
        {whatsapp && (
          <Cluster>
            <Button href={whatsapp} icon="whatsapp" arrow>
              Plan on WhatsApp
            </Button>
          </Cluster>
        )}
      </PageHero>

      <Section labelledBy="packages-title">
        <Container>
          <Stack gap={8}>
            <Heading id="packages-title">{theme.name} packages</Heading>
            {packages.length > 0 ? (
              <PackageGrid packages={packages} destinations={destinations} />
            ) : (
              <EmptyState title="We don't have ready-made packages for this yet, but we can plan one around you.">
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
