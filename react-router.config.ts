import type { Config } from "@react-router/dev/config";

// React Router "framework mode" settings.
// ssr: false   → no server is needed to run the site; it builds to static files.
// prerender    → at build time, every listed page is turned into a real HTML file,
//                so Google and WhatsApp/Facebook link previews see full content.
//                `true` = all static URLs. Package and destination slugs will be
//                added here in Phase 4, read from the content data.
export default {
  ssr: false,
  prerender: true,
} satisfies Config;
