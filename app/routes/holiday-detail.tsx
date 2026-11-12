import { data } from "react-router";
import type { Route } from "./+types/holiday-detail";
import { Carousel } from "../components/carousel/Carousel";
import { PackageCard } from "../components/cards/Cards";
import {
  EnquiryPanel,
  Highlights,
  Inclusions,
  Itinerary,
  QuickFacts,
  SampleNotice,
  SectionNav,
} from "../components/package/PackageDetail";
import { PageHero } from "../components/sections/PageHero";
import { Container, Section, Stack } from "../components/ui/Layout";
import { Heading } from "../components/ui/Typography";
import { site } from "../content/site";
import { destinationNames, getPackage, getRelatedPackages, getTheme } from "../lib/content";
import { phoneLink, whatsappLink, type WhatsAppContext } from "../lib/contact";
import { buildMeta } from "../lib/seo";
import styles from "./holiday-detail.module.css";

/** Runs at build time for every package (see react-router.config.ts). */
export async function loader({ params }: Route.LoaderArgs) {
  const pkg = getPackage(params.packageSlug);
  if (!pkg) throw data("Package not found", { status: 404 });
  const related = getRelatedPackages(pkg).map((p) => ({ ...p, destinationLabel: destinationNames(p) }));
  return {
    pkg,
    destinationLabel: destinationNames(pkg),
    themeNames: pkg.themes.map((slug) => getTheme(slug)?.name).filter((n): n is string => Boolean(n)),
    related,
  };
}

export const meta: Route.MetaFunction = ({ loaderData, params }) => {
  if (!loaderData) return [{ title: `Holiday not found | ${site.name}` }];
  const { pkg, destinationLabel } = loaderData;
  return buildMeta({
    title: `${pkg.title}: ${pkg.duration.nights}N/${pkg.duration.days}D ${destinationLabel} holiday`,
    description: pkg.summary,
    path: `/holidays/${params.packageSlug}`,
  });
};

/** Site-wide WhatsApp buttons on this page mention the package. */
function packageContext(loaderData: unknown): WhatsAppContext {
  const d = loaderData as Awaited<ReturnType<typeof loader>> | undefined;
  if (!d) return { kind: "general" };
  return {
    kind: "package",
    title: d.pkg.title,
    nights: d.pkg.duration.nights,
    days: d.pkg.duration.days,
    destination: d.destinationLabel,
    url: `${site.url}/holidays/${d.pkg.slug}`,
  };
}
export const handle = { whatsapp: packageContext };

export default function HolidayDetail({ loaderData }: Route.ComponentProps) {
  const { pkg, destinationLabel, themeNames, related } = loaderData;
  const whatsapp = whatsappLink(packageContext(loaderData));

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Holidays", to: "/holidays" }, { label: pkg.title }]}
        eyebrow={`${destinationLabel} · ${pkg.duration.nights}N / ${pkg.duration.days}D`}
        title={pkg.title}
        photo={pkg.photo}
      >
        <QuickFacts pkg={pkg} destinationNames={destinationLabel} themeNames={themeNames} />
      </PageHero>

      <Section spacing="compact">
        <Container>
          <div className={styles.layout}>
            <div className={styles.main}>
              <SectionNav
                links={[
                  { id: "overview", label: "Overview" },
                  { id: "itinerary", label: "Itinerary" },
                  { id: "included", label: "What’s included" },
                  ...(related.length ? [{ id: "similar", label: "Similar holidays" }] : []),
                ]}
              />
              <Stack gap={16}>
                {pkg.sample && <SampleNotice />}

                <section id="overview" className={styles.block} aria-labelledby="overview-title">
                  <Heading as="h2" size="h3" id="overview-title">
                    Overview
                  </Heading>
                  <p className={styles.lead}>{pkg.summary}</p>
                  <Highlights items={pkg.highlights} />
                </section>

                <section id="itinerary" className={styles.block} aria-labelledby="itinerary-title">
                  <Heading as="h2" size="h3" id="itinerary-title">
                    Day by day
                  </Heading>
                  <Itinerary days={pkg.itinerary} />
                </section>

                <section id="included" className={styles.block} aria-labelledby="included-title">
                  <Heading as="h2" size="h3" id="included-title">
                    What’s included
                  </Heading>
                  <Inclusions inclusions={pkg.inclusions} exclusions={pkg.exclusions} />
                </section>
              </Stack>
            </div>

            <div className={styles.side}>
              <EnquiryPanel pkg={pkg} whatsapp={whatsapp} tel={phoneLink()} />
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="surface" labelledBy="similar" className={styles.similar}>
          <Container>
            <Heading id="similar">Similar holidays</Heading>
          </Container>
          <Carousel label="Similar holidays">
            {related.map((p) => (
              <PackageCard
                key={p.slug}
                to={`/holidays/${p.slug}`}
                image={p.photo.image}
                alt={p.photo.alt}
                title={p.title}
                destination={p.destinationLabel}
                nights={p.duration.nights}
                days={p.duration.days}
                price={p.price.from}
                sample={p.sample}
              />
            ))}
          </Carousel>
        </Section>
      )}
    </>
  );
}
