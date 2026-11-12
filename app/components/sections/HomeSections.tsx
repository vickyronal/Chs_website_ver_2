/*
  Homepage sections (except the hero). Each one receives its content as props,
  so the same sections can be fed from the CMS later without changes here.
*/
import { useState } from "react";
import { Form, Link } from "react-router";
import { MONTHS } from "../../lib/filters";
import type { Destination, HolidayPackage, Reason, Region, Theme } from "../../types/content";
import { Carousel } from "../carousel/Carousel";
import { OverlayCard, PackageCard, PhotoLabelCard, PolaroidCard, TextCard } from "../cards/Cards";
import { ArrowCircle, Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Image } from "../ui/Image";
import { Cluster, Container, Section, Stack } from "../ui/Layout";
import { PillToggle } from "../ui/Pills";
import { DisplayType, Em, Eyebrow, Heading, Lead, Muted, RichText } from "../ui/Typography";
import styles from "./HomeSections.module.css";

/* ---------------------------------------------------------------
   QUICK FINDER: Where · Kind of holiday · Month → /holidays?…
---------------------------------------------------------------- */

export function QuickFinder({ destinations, themes }: { destinations: Destination[]; themes: Theme[] }) {
  return (
    <div className={styles.finderWrap}>
      <Form method="get" action="/holidays" className={styles.finder} aria-label="Find a holiday">
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Where</span>
          <select name="where" defaultValue="">
            <option value="">Anywhere</option>
            <option value="india">India</option>
            <option value="international">International</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Kind of holiday</span>
          <select name="theme" defaultValue="">
            <option value="">Any</option>
            {themes.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>When</span>
          <select name="month" defaultValue="">
            <option value="">Not sure yet</option>
            {MONTHS.map((m) => (
              <option key={m} value={m.slice(0, 3).toLowerCase()}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <Button type="submit" variant="dark" arrow>
          Find holidays
        </Button>
      </Form>
    </div>
  );
}

/* ---------------------------------------------------------------
   "NOT SURE WHERE TO GO?" — kinds of holiday slider
---------------------------------------------------------------- */
export function ThemeSlider({ themes }: { themes: Theme[] }) {
  if (themes.length === 0) return null;
  return (
    <Section labelledBy="themes-heading">
      <Container>
        <Stack gap={4} align="center">
          <Heading id="themes-heading" align="center">
            Not sure <Em>where to go?</Em>
          </Heading>
          <Lead align="center">Start with the kind of trip you have in mind.</Lead>
        </Stack>
      </Container>
      <Carousel label="Kinds of holiday">
        {themes.map((t) => (
          <PhotoLabelCard key={t.slug} to={`/experiences/${t.slug}`} image={t.photo.image} alt={t.photo.alt} label={t.name} />
        ))}
      </Carousel>
      <Container>
        <Stack align="center">
          <Button to="/experiences" variant="soft">
            Explore all
          </Button>
        </Stack>
      </Container>
    </Section>
  );
}

/* ---------------------------------------------------------------
   FEATURED PACKAGES
---------------------------------------------------------------- */
export function FeaturedPackages({ packages, destinations }: { packages: HolidayPackage[]; destinations: Destination[] }) {
  if (packages.length === 0) return null;
  const nameOf = (slug: string) => destinations.find((d) => d.slug === slug)?.name ?? slug;
  return (
    <Section tone="surface" labelledBy="featured-heading">
      <Container>
        <div className={styles.headRow}>
          <Stack gap={4} align="start">
            <Eyebrow>Featured holidays</Eyebrow>
            <Heading id="featured-heading">
              Ready-made trips, <Muted>planned down to the day</Muted>
            </Heading>
          </Stack>
          <Button to="/holidays" variant="outline" arrow>
            All holidays
          </Button>
        </div>
      </Container>
      <Carousel label="Featured holidays">
        {packages.map((p) => (
          <PackageCard
            key={p.slug}
            to={`/holidays/${p.slug}`}
            image={p.photo.image}
            alt={p.photo.alt}
            title={p.title}
            destination={p.destinations.map(nameOf).join(", ")}
            nights={p.duration.nights}
            days={p.duration.days}
            price={p.price.from}
            sample={p.sample}
          />
        ))}
      </Carousel>
    </Section>
  );
}

/* ---------------------------------------------------------------
   POPULAR DESTINATIONS — editorial showcase
   Tablet/desktop: numbered destination index (left) + one large image (right)
   that crossfades to whichever destination you hover, focus or step to.
   Phones: the familiar swipe carousel.
---------------------------------------------------------------- */
export function DestinationShowcase({ destinations }: { destinations: Destination[] }) {
  const regions = (["india", "international"] as Region[]).filter((r) => destinations.some((d) => d.region === r));
  const [region, setRegion] = useState<Region>(regions.includes("india") ? "india" : "international");
  const [active, setActive] = useState(0);
  if (destinations.length === 0) return null;
  const shown = destinations.filter((d) => d.region === region);
  const current = shown[Math.min(active, shown.length - 1)];
  const pad = (n: number) => String(n).padStart(2, "0");
  const step = (dir: 1 | -1) => setActive((i) => (i + dir + shown.length) % shown.length);

  return (
    <Section labelledBy="destinations-heading">
      <Container>
        <div className={styles.showcase}>
          <div className={styles.showcaseText}>
            <Eyebrow>Popular destinations</Eyebrow>
            <Heading id="destinations-heading">
              Places worth <Em>the journey</Em>
            </Heading>
            <Lead>From the hills at home to islands abroad. Pick a place and we'll plan the rest.</Lead>
            {regions.length > 1 && (
              <PillToggle
                label="Destination region"
                value={region}
                onChange={(r) => {
                  setRegion(r);
                  setActive(0);
                }}
                options={regions.map((r) => ({ value: r, label: r === "india" ? "India" : "International" }))}
              />
            )}

            {/* Numbered index: hover or focus previews, click opens the destination */}
            <ol className={styles.destIndex}>
              {shown.map((d, i) => (
                <li key={d.slug}>
                  <Link
                    to={`/destinations/${d.slug}`}
                    className={[styles.destRow, d === current && styles.destRowActive].filter(Boolean).join(" ")}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={d === current ? "true" : undefined}
                  >
                    <span className={styles.destNum}>{pad(i + 1)}</span>
                    <span className={styles.destName}>{d.name}</span>
                    <span className={styles.destArea}>{d.area}</span>
                  </Link>
                </li>
              ))}
            </ol>

            <Link to="/destinations" className={styles.textLink}>
              All destinations <ArrowCircle />
            </Link>
          </div>

          {/* Large image of the active destination (crossfade) */}
          <div className={styles.showcaseMedia}>
            {shown.map((d) => (
              <div key={d.slug} className={[styles.showcaseImage, d === current && styles.showcaseImageActive].filter(Boolean).join(" ")} aria-hidden={d !== current}>
                <Image name={d.photo.image} alt={d.photo.alt} sizes="(min-width: 1024px) 40vw, 50vw" />
              </div>
            ))}
            <div className={styles.showcaseCaption}>
              <p className={styles.showcaseCount}>
                {pad(shown.indexOf(current) + 1)} <span>/ {pad(shown.length)}</span>
              </p>
              <p className={styles.showcaseName}>{current.name}</p>
              <p className={styles.showcaseArea}>{current.area}</p>
              <div className={styles.showcaseActions}>
                <Button to={`/destinations/${current.slug}`} variant="light" size="sm" arrow>
                  Explore {current.name}
                </Button>
                {shown.length > 1 && (
                  <div className={styles.showcaseArrows}>
                    <button type="button" onClick={() => step(-1)} aria-label="Previous destination">
                      <Icon name="arrow-left" size={18} />
                    </button>
                    <button type="button" onClick={() => step(1)} aria-label="Next destination">
                      <Icon name="arrow-right" size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Phones: swipe carousel */}
      <div className={styles.showcaseMobile}>
        <Carousel label={`${region === "india" ? "India" : "International"} destinations`} itemWidth="clamp(240px, 74vw, 340px)">
          {shown.map((d) => (
            <OverlayCard key={d.slug} to={`/destinations/${d.slug}`} image={d.photo.image} alt={d.photo.alt} title={d.name} subtitle={d.area} />
          ))}
        </Carousel>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------
   WHY CHS — fan of reason cards and photos
---------------------------------------------------------------- */
export function WhyChsFan({ reasons, photos }: { reasons: Reason[]; photos: { image: Theme["photo"]["image"]; alt: string }[] }) {
  if (reasons.length === 0) return null;
  // Reason cards fanned around one photo in the centre (max 5 cards so text stays readable)
  const shown = reasons.slice(0, 4);
  const textCards = shown.map((r) => (
    <TextCard key={r.title} title={r.title}>
      {r.body}
    </TextCard>
  ));
  const mid = Math.ceil(textCards.length / 2);
  const centre = photos[0] ? [<PolaroidCard key="photo" image={photos[0].image} alt={photos[0].alt} />] : [];
  const cards = [...textCards.slice(0, mid), ...centre, ...textCards.slice(mid)];

  return (
    <Section labelledBy="why-heading" className={styles.why}>
      <Carousel label="Why travel with CHS Tours" variant="fan" itemWidth="clamp(240px, 70vw, 270px)">
        {cards}
      </Carousel>
      <Container>
        <Stack gap={4} align="center">
          <Eyebrow>The CHS difference</Eyebrow>
          <Heading id="why-heading" align="center">
            Why travel <Em>with us</Em>
          </Heading>
        </Stack>
      </Container>
    </Section>
  );
}

/* ---------------------------------------------------------------
   CORPORATE TRAVEL band
---------------------------------------------------------------- */
export function CorporateBand({
  eyebrow,
  heading,
  body,
  offerings,
  whatsapp,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  offerings: string[];
  whatsapp: string | null;
}) {
  return (
    <section className={styles.corporateFrame} aria-labelledby="corporate-heading">
      <div className={styles.corporate}>
        <div className={styles.corporateMedia}>
          <Image name="plane-wing-sunset" alt="An aircraft wing with a red tip above the clouds at sunset" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <div className={styles.corporateText}>
          <Eyebrow tone="white">{eyebrow}</Eyebrow>
          <Heading id="corporate-heading" tone="white">
            <RichText text={heading} />
          </Heading>
          <p className={styles.corporateBody}>{body}</p>
          <ul className={styles.offerings}>
            {offerings.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <Cluster>
            <Button to="/corporate-travel" variant="light" arrow>
              Corporate travel
            </Button>
            {whatsapp && (
              <Button href={whatsapp} icon="whatsapp">
                Talk to us
              </Button>
            )}
          </Cluster>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   WHAT WE DO — editorial statement + numbered columns
   One sentence names every service (each name is a link), then four
   numbered columns give the one-line detail. No cards, no icons.
---------------------------------------------------------------- */
export function ServicesList({ services }: { services: { title: string; body: string; to: string }[] }) {
  if (services.length === 0) return null;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <Section labelledBy="services-heading">
      <Container>
        <div className={styles.whatWeDo}>
          <Eyebrow>What we do</Eyebrow>
          <h2 id="services-heading" className={styles.statement}>
            We plan{" "}
            {services.map((s, i) => (
              <span key={s.title}>
                <Link to={s.to} className={styles.statementLink}>
                  {s.title.toLowerCase()}
                </Link>
                {i < services.length - 2 ? ", " : i === services.length - 2 ? " and " : ""}
              </span>
            ))}
            <span className={styles.statementMuted}>, all from one conversation.</span>
          </h2>

          <ol className={styles.serviceCols}>
            {services.map((s, i) => (
              <li key={s.title} className={styles.serviceCol}>
                <span className={styles.serviceNum}>{pad(i + 1)}</span>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceBody}>{s.body}</p>
                <Link to={s.to} className={styles.serviceLink} aria-label={`Explore ${s.title}`}>
                  Explore <Icon name="arrow-right" size={16} />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/* ---------------------------------------------------------------
   FINAL CTA — giant "Let's go."
---------------------------------------------------------------- */
export function FinalCta({ whatsapp, tel, phoneDisplay }: { whatsapp: string | null; tel: string | null; phoneDisplay: string | null }) {
  return (
    <Section labelledBy="final-heading">
      <DisplayType>Let’s go.</DisplayType>
      <Container>
        <div className={styles.finalRow}>
          <Heading id="final-heading" size="h2">
            Where do you want to <Em>go next?</Em>
          </Heading>
          <Cluster>
            {whatsapp && (
              <Button href={whatsapp} icon="whatsapp" arrow>
                Plan on WhatsApp
              </Button>
            )}
            {tel && (
              <Button href={tel} icon="phone" variant="outline">
                {phoneDisplay}
              </Button>
            )}
            <Button to="/contact" variant="soft">
              Send an enquiry
            </Button>
          </Cluster>
        </div>
      </Container>
    </Section>
  );
}
