import type { Config } from "@react-router/dev/config";

// React Router "framework mode" settings.
// ssr: false   → no server is needed to run the site; it builds to static files.
// prerender    → at build time, every page below is turned into a real HTML file,
//                so Google and WhatsApp/Facebook link previews see full content.
export default {
  ssr: false,
  async prerender({ getStaticPaths }) {
    // Every package, destination and experience URL comes from the content data,
    // so adding a package automatically creates its page.
    const { getDynamicPaths } = await import("./app/lib/content");
    return [...getStaticPaths(), ...getDynamicPaths()];
  },
} satisfies Config;
