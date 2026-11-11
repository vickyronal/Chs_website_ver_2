/*
  STYLEGUIDE — internal page to review the design system (Phase 2).
  Not linked from the menu and hidden from Google (noindex).
  ⚠️ All text, packages and reasons below are SAMPLE content for layout review only.
*/
import { useState, type CSSProperties } from "react";
import type { Route } from "./+types/styleguide";
import { Carousel, CarouselControls } from "../components/carousel/Carousel";
import { useCarousel } from "../components/carousel/useCarousel";
import { OverlayCard, PackageCard, PhotoLabelCard, PolaroidCard, TextCard } from "../components/cards/Cards";
import { JourneyPath } from "../components/journey/JourneyPath";
import { Button } from "../components/ui/Button";
import { Cluster, Container, Section, Stack } from "../components/ui/Layout";
import { Logo } from "../components/ui/Logo";
import { LocationPill, PillToggle, Tag } from "../components/ui/Pills";
import { DisplayType, Em, Eyebrow, Heading, Lead, Muted } from "../components/ui/Typography";
import styles from "./styleguide.module.css";

export const meta: Route.MetaFunction = () => [
  { title: "Styleguide | CHS Tours" },
  { name: "robots", content: "noindex, nofollow" },
];

const swatches = [
  { name: "CHS Red", token: "--brand-red", hex: "#EE2124", note: "Large shapes, emphasis words, path" },
  { name: "Accent red", token: "--color-accent", hex: "#D41A1D", note: "Buttons, links, small red text" },
  { name: "CHS Black", token: "--brand-black", hex: "#1A1A1A", note: "Text, dark panels" },
  { name: "CHS White", token: "--brand-white", hex: "#FFFFFF", note: "Page background" },
  { name: "Surface", token: "--color-surface", hex: "#F5F5F4", note: "Alternate sections" },
  { name: "Muted", token: "--color-muted", hex: "#5C5C5C", note: "Secondary text, grey words" },
];

const heroCards = [
  { image: "destination-bali", alt: "Pura Ulun Danu Bratan temple on Lake Bratan at sunrise, Bali", location: "Bali", rotate: -5, lift: 40 },
  { image: "destination-maldives", alt: "Overwater villas above turquoise water in the Maldives", location: "Maldives", rotate: 3, lift: -10 },
  { image: "destination-sri-lanka", alt: "Elephant grazing below Sigiriya rock, Sri Lanka", location: "Sri Lanka", rotate: -3, lift: 20 },
  { image: "destination-philippines", alt: "Limestone islands and boats in a turquoise lagoon, Philippines", location: "Philippines", rotate: 5, lift: -30 },
] as const;

export default function Styleguide() {
  const [region, setRegion] = useState<"india" | "international">("international");
  const destinationsApi = useCarousel();

  return (
    <>
      {/* ---------- Intro ---------- */}
      <Section spacing="compact">
        <Container>
          <Stack gap={4} align="start">
            <Logo height={56} />
            <Eyebrow>Design system · Phase 2 · internal review</Eyebrow>
            <Lead>
              Every building block of the CHS Tours V2 site in one place. All text and packages here are sample content for
              review only.
            </Lead>
          </Stack>
        </Container>
      </Section>

      {/* ---------- Journey hero preview ---------- */}
      <div className={styles.heroFrame}>
        <div className={styles.hero}>
          <Container className={styles.heroText}>
            <Eyebrow tone="white">Hero preview · sample copy</Eyebrow>
            <Heading as="h1" size="display" tone="white" align="center">
              Your next <Em>journey</Em> starts with a conversation
            </Heading>
            <Cluster>
              <Button href="#" icon="whatsapp" arrow>
                Plan on WhatsApp
              </Button>
              <Button to="/holidays" variant="light">
                Browse holidays
              </Button>
            </Cluster>
          </Container>

          <div className={styles.heroJourney}>
            <JourneyPath tone="dark" className={styles.heroPath} />
            <ul className={styles.heroCards}>
              {heroCards.map((card, i) => (
                <li key={card.location} style={{ "--lift": `${card.lift}px` } as CSSProperties}>
                  <PolaroidCard
                    to="/destinations"
                    image={card.image}
                    alt={card.alt}
                    location={card.location}
                    rotate={card.rotate}
                    pillSide={i % 2 ? "left" : "right"}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- Colour ---------- */}
      <Section>
        <Container>
          <Stack gap={8}>
            <Heading>
              Colour <Muted>from the CHS brand</Muted>
            </Heading>
            <div className={styles.swatches}>
              {swatches.map((s) => (
                <div key={s.token} className={styles.swatch}>
                  <span className={styles.chip} style={{ background: `var(${s.token})` }} />
                  <strong>{s.name}</strong>
                  <code>{s.hex}</code>
                  <span className={styles.note}>{s.note}</span>
                </div>
              ))}
            </div>
          </Stack>
        </Container>
      </Section>

      {/* ---------- Typography ---------- */}
      <Section tone="surface">
        <Container>
          <Stack gap={8}>
            <Eyebrow>Typography · Fraunces + Inter</Eyebrow>
            <Heading as="h2" size="display">
              Travel is more than <Em>moving</Em>
            </Heading>
            <Heading as="h2" size="h1">
              Unforgettable moments <Muted>in the heart of</Muted> Kerala
            </Heading>
            <Heading as="h3" size="h2">
              Not sure where to go?
            </Heading>
            <Heading as="h3">Heading 3: card and sub-section titles</Heading>
            <Lead>Lead paragraph: short intros under headings, in muted grey, a little larger than body text.</Lead>
            <p className={styles.measure}>
              Body text is Inter. It is set at 16–18px with comfortable line spacing for reading on phones. Links look{" "}
              <a href="#">like this</a>, using the accessible deeper red.
            </p>
          </Stack>
        </Container>
      </Section>

      {/* ---------- Buttons & pills ---------- */}
      <Section>
        <Container>
          <Stack gap={8}>
            <Heading>Buttons &amp; pills</Heading>
            <Cluster>
              <Button href="#" icon="whatsapp" arrow>
                Plan on WhatsApp
              </Button>
              <Button href="#" variant="dark">
                Find a holiday
              </Button>
              <Button href="#" variant="outline" arrow>
                View details
              </Button>
              <Button href="#" variant="outline" icon="phone">
                Call us
              </Button>
              <Button href="#" variant="soft">
                Explore all
              </Button>
              <Button href="#" size="sm" arrow>
                Small
              </Button>
            </Cluster>
            <div className={styles.darkPanel}>
              <Cluster>
                <Button href="#" variant="light" arrow>
                  On dark backgrounds
                </Button>
                <Button href="#" icon="whatsapp">
                  Plan on WhatsApp
                </Button>
              </Cluster>
            </div>
            <Cluster>
              <LocationPill>Bali</LocationPill>
              <LocationPill>Sri Lanka</LocationPill>
              <Tag>Honeymoon</Tag>
              <Tag>5N / 6D</Tag>
              <Tag tone="dark">International</Tag>
            </Cluster>
            <PillToggle
              label="Destination region"
              value={region}
              onChange={setRegion}
              options={[
                { value: "india", label: "India" },
                { value: "international", label: "International" },
              ]}
            />
          </Stack>
        </Container>
      </Section>

      {/* ---------- Photo + label cards (row) ---------- */}
      <Section tone="surface">
        <Container>
          <Stack gap={4} align="center">
            <Heading align="center">Not sure where to go?</Heading>
            <Lead align="center">Card style 1 in a "row" slider. Swipe, drag, or use the arrows.</Lead>
          </Stack>
        </Container>
        <Carousel label="Kinds of holiday">
          <PhotoLabelCard to="/experiences/family" image="theme-family" alt="A smiling multi-generation family outdoors" label="Family Holidays" />
          <PhotoLabelCard to="/experiences/honeymoon" image="theme-honeymoon" alt="A laughing couple on the beach" label="Honeymoon" />
          <PhotoLabelCard to="/experiences/group" image="theme-group" alt="Four friends smiling on a rooftop" label="Group Tours" />
          <PhotoLabelCard to="/experiences/customised" image="plane-wing-sunset" alt="Aircraft wing with a red tip above the clouds at sunset" label="Customised Trips" />
          <PhotoLabelCard to="/experiences/international" image="destination-maldives" alt="Overwater villas in the Maldives" label="Beach Escapes" />
        </Carousel>
        <Container>
          <Stack align="center">
            <Button to="/experiences" variant="soft">
              Explore all
            </Button>
          </Stack>
        </Container>
      </Section>

      {/* ---------- Overlay cards (staggered, controls beside text) ---------- */}
      <Section>
        <div className={styles.split}>
          <Container className={styles.splitText}>
            <Stack gap={6} align="start">
              <Eyebrow>Your next destination</Eyebrow>
              <Heading>
                Places worth the <Em>journey</Em>
              </Heading>
              <Lead>Card style 2 in a "staggered" slider, with the arrows placed beside the text.</Lead>
              <CarouselControls api={destinationsApi} className={styles.splitControls} />
            </Stack>
          </Container>
          <Carousel label="Popular destinations" variant="staggered" controls="none" api={destinationsApi} bleed={false} itemWidth="clamp(240px, 70vw, 340px)">
            <OverlayCard to="/destinations/bali" image="destination-bali" alt="Temple on Lake Bratan at sunrise, Bali" title="Bali" subtitle="Indonesia" />
            <OverlayCard to="/destinations/maldives" image="destination-maldives" alt="Overwater villas, Maldives" title="Maldives" subtitle="Indian Ocean" />
            <OverlayCard to="/destinations/sri-lanka" image="destination-sri-lanka" alt="Elephant below Sigiriya rock" title="Sri Lanka" subtitle="South Asia" />
            <OverlayCard to="/destinations/philippines" image="destination-philippines" alt="Lagoon and limestone islands, Philippines" title="Philippines" subtitle="Southeast Asia" />
          </Carousel>
        </div>
      </Section>

      {/* ---------- Package cards ---------- */}
      <Section tone="surface">
        <Container>
          <Stack gap={4}>
            <Heading>
              Featured holidays <Muted>picked for this season</Muted>
            </Heading>
            <Lead>Card style 3. Sample packages only: titles, durations and prices are not real.</Lead>
          </Stack>
        </Container>
        <Carousel label="Featured holidays">
          <PackageCard to="/holidays/sample-bali" image="destination-bali" alt="Temple on Lake Bratan, Bali" title="Sample: Bali Escape" destination="Bali" nights={5} days={6} price={null} />
          <PackageCard to="/holidays/sample-maldives" image="destination-maldives" alt="Overwater villas, Maldives" title="Sample: Maldives by the Sea" destination="Maldives" nights={4} days={5} price={null} />
          <PackageCard to="/holidays/sample-sri-lanka" image="destination-sri-lanka" alt="Sigiriya rock, Sri Lanka" title="Sample: Sri Lanka Highlights" destination="Sri Lanka" nights={6} days={7} price={null} />
          <PackageCard to="/holidays/sample-philippines" image="destination-philippines" alt="Lagoon, Philippines" title="Sample: Island Hopping" destination="Philippines" nights={5} days={6} price={null} />
        </Carousel>
      </Section>

      {/* ---------- Fan ---------- */}
      <Section>
        <Carousel label="Why travel with CHS Tours" variant="fan" itemWidth="clamp(240px, 70vw, 300px)">
          <PolaroidCard image="theme-honeymoon" alt="Couple on the beach" />
          <TextCard title="Sample reason">Each reason will be a verified fact supplied by CHS, never a made-up claim.</TextCard>
          <PolaroidCard image="destination-sri-lanka" alt="Sigiriya rock, Sri Lanka" />
          <TextCard title="Sample reason">On desktop these cards fan open as you scroll; on phones they become a simple slider.</TextCard>
          <PolaroidCard image="theme-family" alt="A family outdoors" />
        </Carousel>
        <Container>
          <Stack gap={4} align="center">
            <Eyebrow>The CHS difference</Eyebrow>
            <Heading align="center">Why travel with us</Heading>
          </Stack>
        </Container>
      </Section>

      {/* ---------- Giant type ---------- */}
      <Section spacing="compact">
        <DisplayType>Let’s go.</DisplayType>
      </Section>

      {/* ---------- Logos ---------- */}
      <Section tone="ink">
        <Container>
          <Stack gap={8} align="start">
            <Eyebrow tone="white">Logos</Eyebrow>
            <div className={styles.logos}>
              <div className={styles.logoLight}>
                <Logo variant="color" height={64} />
              </div>
              <div className={styles.logoLight}>
                <Logo variant="black" height={64} />
              </div>
              <div className={styles.logoDark}>
                <Logo variant="white" height={64} />
              </div>
            </div>
          </Stack>
        </Container>
        <DisplayType tone="faint">CHS TOURS</DisplayType>
      </Section>
    </>
  );
}
