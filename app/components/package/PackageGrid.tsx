import type { Destination, HolidayPackage } from "../../types/content";
import { PackageCard } from "../cards/Cards";
import { CardGrid } from "../ui/CardGrid";

/** A grid of package cards. Used on Holidays, destination and experience pages. */
export function PackageGrid({ packages, destinations }: { packages: HolidayPackage[]; destinations: Destination[] }) {
  const nameOf = (slug: string) => destinations.find((d) => d.slug === slug)?.name ?? slug;
  return (
    <CardGrid>
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
    </CardGrid>
  );
}
