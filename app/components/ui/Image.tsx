import { images, type ImageName } from "../../content/images.generated";

interface ImageProps {
  /** File name (without size/extension) from assets/source/images, e.g. "destination-bali" */
  name: ImageName;
  /** Describe the photo for people who can't see it. Use "" only for purely decorative images. */
  alt: string;
  /**
   * Roughly how wide the image appears on screen, so the browser downloads the right size.
   * e.g. "(min-width: 1024px) 33vw, 80vw"
   */
  sizes?: string;
  /** true for the first big image on a page (hero): loads immediately instead of lazily */
  priority?: boolean;
  className?: string;
  /** Which part of the photo to keep when cropped, e.g. "50% 30%" */
  focus?: string;
}

/**
 * Responsive, optimised photo.
 * Serves AVIF (smallest) → WebP → fallback, in several widths, with the real
 * width/height so the layout doesn't jump while the image loads.
 * Generated files come from `npm run images`.
 */
export function Image({ name, alt, sizes = "100vw", priority = false, className, focus }: ImageProps) {
  const meta = images[name];
  const srcSet = (format: "avif" | "webp") =>
    meta.widths.map((w) => `/images/${name}-${w}.${format} ${w}w`).join(", ");
  const fallbackWidth = meta.widths.find((w) => w >= 800) ?? meta.widths[meta.widths.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`/images/${name}-${fallbackWidth}.webp`}
        alt={alt}
        width={meta.width}
        height={meta.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={className}
        style={focus ? { objectPosition: focus } : undefined}
      />
    </picture>
  );
}
