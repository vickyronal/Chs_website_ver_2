import { copyFile } from "node:fs/promises";
import path from "node:path";
import type { Config } from "@react-router/dev/config";

// React Router "framework mode" settings.
// ssr: false   → no server is needed to run the site; it builds to static files
//                in build/client (Vercel's outputDirectory points there: see vercel.json).
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
  // After building: hosts like Vercel and Netlify serve "404.html" (with a real
  // 404 status) for unknown URLs. We copy the app shell there, so visitors see
  // the site's own "Page not found" page.
  async buildEnd({ reactRouterConfig }) {
    const client = path.join(reactRouterConfig.buildDirectory, "client");
    await copyFile(path.join(client, "__spa-fallback.html"), path.join(client, "404.html"));
  },
} satisfies Config;
