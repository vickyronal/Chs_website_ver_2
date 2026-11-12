import type { ReactNode } from "react";
import { Link } from "react-router";
import type { Photo } from "../../types/content";
import { Image } from "../ui/Image";
import { Eyebrow, Heading, RichText } from "../ui/Typography";
import { Sky } from "./Sky";
import styles from "./PageHero.module.css";

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  /** Use *stars* around the second half to set it in grey (two-tone) */
  title: string;
  intro?: string;
  /** With a photo: the photo fills the panel (white text). Without: a soft sky (dark text). */
  photo?: Photo;
  crumbs?: Crumb[];
  /** Extra content under the intro, e.g. buttons or facts */
  children?: ReactNode;
}

/** The top of every inner page: breadcrumbs, title, intro, optional photo. */
export function PageHero({ eyebrow, title, intro, photo, crumbs, children }: PageHeroProps) {
  const tone = photo ? "white" : "ink";
  return (
    <section className={styles.frame} aria-labelledby="page-title">
      <div className={[styles.panel, photo ? styles.withPhoto : styles.withSky].join(" ")}>
        {photo ? (
          <div className={styles.media}>
            <Image name={photo.image} alt={photo.alt} sizes="100vw" priority />
          </div>
        ) : (
          <Sky soft />
        )}
        <div className={styles.content}>
          {crumbs && crumbs.length > 0 && (
            <nav aria-label="Breadcrumb">
              <ol className={styles.crumbs}>
                {crumbs.map((c, i) => (
                  <li key={c.label}>
                    {c.to && i < crumbs.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
          <Heading as="h1" size="h1" tone={tone} id="page-title">
            <RichText text={title} />
          </Heading>
          {intro && <p className={styles.intro}>{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
