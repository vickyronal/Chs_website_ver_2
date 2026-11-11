import { site } from "../content/site";

interface MetaInput {
  title: string;
  description: string;
  /** path such as "/holidays"; used for the canonical URL */
  path: string;
}

/**
 * Builds the <title>, description, canonical and Open Graph tags for a page.
 * Every route calls this from its `meta` export so all pages are consistent.
 */
export function buildMeta({ title, description, path }: MetaInput) {
  const fullTitle = path === "/" ? `${site.name} — ${title}` : `${title} | ${site.name}`;
  const url = new URL(path, site.url).toString();

  return [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}
