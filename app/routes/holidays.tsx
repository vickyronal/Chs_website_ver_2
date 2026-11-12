import { useSearchParams } from "react-router";
import type { Route } from "./+types/holidays";
import { FilterBar } from "../components/package/FilterBar";
import { PackageGrid } from "../components/package/PackageGrid";
import { PageHero } from "../components/sections/PageHero";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/CardGrid";
import { Cluster, Container, Section, Stack } from "../components/ui/Layout";
import { getDestinations, getPackages, getThemes } from "../lib/content";
import { whatsappLink } from "../lib/contact";
import { filterPackages, monthName, readFilters } from "../lib/filters";
import { useHydrated } from "../lib/useHydrated";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Holiday Packages",
    description: "Browse CHS Tours holiday packages in India and abroad. Filter by destination, kind of holiday and length.",
    path: "/holidays",
  });

export async function loader() {
  return { packages: getPackages(), destinations: getDestinations(), themes: getThemes() };
}

export default function Holidays({ loaderData }: Route.ComponentProps) {
  const { packages, destinations, themes } = loaderData;
  const [params] = useSearchParams();
  const hydrated = useHydrated();
  // Pre-built HTML has no filters; apply the URL's filters once React has taken over
  const filters = readFilters(hydrated ? params : new URLSearchParams());
  const results = filterPackages(packages, destinations, filters);

  // Pass the visitor's choices into the WhatsApp message
  const whereName =
    filters.where === "india" ? "India" : filters.where === "international" ? "International" : destinations.find((d) => d.slug === filters.where)?.name;
  const themeName = themes.find((t) => t.slug === filters.theme)?.name;
  const whatsapp = whatsappLink({ kind: "search", where: whereName, theme: themeName, month: monthName(filters.month) });

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Holidays" }]}
        eyebrow="Holiday packages"
        title="Ready-made trips, *planned* down to the day"
        intro="Fixed packages in India and abroad. Filter by where, what kind of trip and how long, then plan the details with us on WhatsApp."
      />
      <Section spacing="compact">
        <Container>
          <Stack gap={12}>
            <FilterBar filters={filters} destinations={destinations} themes={themes} resultCount={results.length} />
            {results.length > 0 ? (
              <PackageGrid packages={results} destinations={destinations} />
            ) : (
              <EmptyState title="No packages match those filters yet, but we can still plan it for you.">
                <Cluster>
                  {whatsapp && (
                    <Button href={whatsapp} icon="whatsapp" arrow>
                      Ask on WhatsApp
                    </Button>
                  )}
                  <Button to="/holidays" variant="outline">
                    Clear filters
                  </Button>
                </Cluster>
              </EmptyState>
            )}
          </Stack>
        </Container>
      </Section>
    </>
  );
}
