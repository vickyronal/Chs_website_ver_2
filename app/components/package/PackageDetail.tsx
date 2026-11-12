/*
  Building blocks for the package detail page.
*/
import type { HolidayPackage, ItineraryDay } from "../../types/content";
import { formatDuration, formatPrice } from "../../lib/format";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Tag } from "../ui/Pills";
import styles from "./PackageDetail.module.css";

/* ---------- Quick facts strip (under the hero) ---------- */
export function QuickFacts({ pkg, destinationNames, themeNames }: { pkg: HolidayPackage; destinationNames: string; themeNames: string[] }) {
  return (
    <dl className={styles.facts}>
      <div>
        <dt>Duration</dt>
        <dd>
          {pkg.duration.nights} nights / {pkg.duration.days} days
        </dd>
      </div>
      <div>
        <dt>Destination</dt>
        <dd>{destinationNames}</dd>
      </div>
      {themeNames.length > 0 && (
        <div>
          <dt>Ideal for</dt>
          <dd>{themeNames.join(", ")}</dd>
        </div>
      )}
      <div>
        <dt>Price</dt>
        <dd>{formatPrice(pkg.price.from)}</dd>
      </div>
    </dl>
  );
}

/* ---------- In-page section links ---------- */
export function SectionNav({ links }: { links: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className={styles.sectionNav}>
      <ul>
        {links.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`}>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ---------- Highlights ---------- */
export function Highlights({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className={styles.highlights}>
      {items.map((h) => (
        <li key={h}>
          <Tag>{h}</Tag>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Day-by-day itinerary ----------
   Uses native <details>/<summary>: works without JavaScript, keyboard friendly. */
export function Itinerary({ days }: { days: ItineraryDay[] }) {
  if (days.length === 0) return <p className={styles.muted}>The day-by-day plan will be added soon.</p>;
  return (
    <ol className={styles.itinerary}>
      {days.map((d, i) => (
        <li key={d.day}>
          <details open={i === 0}>
            <summary>
              <span className={styles.dayNumber}>Day {d.day}</span>
              <span className={styles.dayTitle}>{d.title}</span>
              <span className={styles.chevron} aria-hidden="true" />
            </summary>
            <p className={styles.dayBody}>{d.description}</p>
          </details>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Inclusions / exclusions ---------- */
export function Inclusions({ inclusions, exclusions }: { inclusions: string[]; exclusions: string[] }) {
  return (
    <div className={styles.inclusions}>
      <div>
        <h3 className={styles.listTitle}>Included</h3>
        <ul className={[styles.checkList, styles.yes].join(" ")}>
          {inclusions.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className={styles.listTitle}>Not included</h3>
        <ul className={[styles.checkList, styles.no].join(" ")}>
          {exclusions.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Sticky enquiry panel (desktop sidebar; at the end on phones) ---------- */
export function EnquiryPanel({
  pkg,
  whatsapp,
  tel,
}: {
  pkg: HolidayPackage;
  whatsapp: string | null;
  tel: string | null;
}) {
  return (
    <aside className={styles.panel} aria-label="Enquire about this holiday">
      <p className={styles.panelPrice}>{formatPrice(pkg.price.from)}</p>
      {pkg.price.basis && <p className={styles.muted}>{pkg.price.basis}</p>}
      <p className={styles.panelMeta}>
        <Icon name="plane" size={16} /> {formatDuration(pkg.duration.nights, pkg.duration.days)}
      </p>
      <div className={styles.panelActions}>
        {whatsapp && (
          <Button href={whatsapp} icon="whatsapp" arrow fullWidth>
            Plan on WhatsApp
          </Button>
        )}
        {tel && (
          <Button href={tel} icon="phone" variant="outline" fullWidth>
            Call us
          </Button>
        )}
        <Button to={`/contact?package=${pkg.slug}`} variant="soft" fullWidth>
          Send an enquiry
        </Button>
      </div>
      <p className={styles.panelNote}>We’ll reply on WhatsApp with dates, prices and any changes you’d like.</p>
    </aside>
  );
}

/* ---------- Notice shown on sample packages ---------- */
export function SampleNotice() {
  return (
    <p className={styles.sampleNotice} role="note">
      <strong>Sample package.</strong> This page shows how a CHS Tours package will look. The itinerary and details are
      placeholders, not a real offer.
    </p>
  );
}
