import type { CSSProperties } from "react";
import type { Destination } from "../../types/content";
import { PolaroidCard } from "../cards/Cards";
import { JourneyPath } from "../journey/JourneyPath";
import { Button } from "../ui/Button";
import { Cluster } from "../ui/Layout";
import { Eyebrow, Heading, RichText } from "../ui/Typography";
import styles from "./JourneyHero.module.css";

// Tilt and height of each card along the flight path (repeats if more cards)
const CARD_POSES = [
  { rotate: -5, lift: 40 },
  { rotate: 3, lift: -10 },
  { rotate: -3, lift: 20 },
  { rotate: 5, lift: -30 },
];

interface JourneyHeroProps {
  eyebrow: string;
  heading: string;
  intro: string;
  destinations: Destination[];
  whatsapp: string | null;
}

/**
 * The homepage hero: a CHS Black rounded panel with a big headline and
 * destination photo cards sitting along the red flight path from the logo.
 */
export function JourneyHero({ eyebrow, heading, intro, destinations, whatsapp }: JourneyHeroProps) {
  return (
    <section className={styles.frame} aria-labelledby="hero-heading">
      <div className={styles.panel}>
        <div className={styles.text}>
          <Eyebrow tone="white">{eyebrow}</Eyebrow>
          <Heading as="h1" size="display" tone="white" align="center" id="hero-heading">
            <RichText text={heading} />
          </Heading>
          <p className={styles.intro}>{intro}</p>
          <Cluster className={styles.ctas}>
            {whatsapp && (
              <Button href={whatsapp} icon="whatsapp" arrow>
                Plan on WhatsApp
              </Button>
            )}
            <Button to="/holidays" variant="light">
              Browse holidays
            </Button>
          </Cluster>
        </div>

        {destinations.length > 0 && (
          <div className={styles.journey}>
            <JourneyPath tone="dark" className={styles.path} />
            <ul className={styles.cards} aria-label="Featured destinations">
              {destinations.slice(0, 4).map((d, i) => {
                const pose = CARD_POSES[i % CARD_POSES.length];
                return (
                  <li key={d.slug} style={{ "--lift": `${pose.lift}px` } as CSSProperties}>
                    <PolaroidCard
                      to={`/destinations/${d.slug}`}
                      image={d.photo.image}
                      alt={d.photo.alt}
                      location={d.name}
                      rotate={pose.rotate}
                      pillSide={i % 2 ? "left" : "right"}
                      priority={i < 2}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
