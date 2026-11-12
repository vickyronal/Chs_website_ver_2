/*
  PREVIEW SERVER — run with:  npm run preview   (after `npm run build`)

  Serves the built site from build/client exactly like a static host
  (Netlify, Vercel, etc.) would:
    /holidays/bali-sample  →  build/client/holidays/bali-sample/index.html
  Unknown URLs get 404.html (with a 404 status), which shows the site's own
  "Page not found" page, the same way Vercel and Netlify do.

  (Vite's own `vite preview` serves the homepage for nested URLs, which
  breaks pre-rendered pages, so we use this tiny server instead.)
*/
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../build/client");
const port = Number(process.env.PORT) || 4173;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".data": "text/x-script",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

async function isFile(p) {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
}

async function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const full = path.join(root, clean);
  if (!full.startsWith(root)) return null; // block ../ tricks
  if (await isFile(full)) return { file: full, status: 200 };
  const index = path.join(full, "index.html");
  if (await isFile(index)) return { file: index, status: 200 };
  return { file: path.join(root, "404.html"), status: 404 };
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");
  const found = await resolve(pathname);
  if (!found) {
    res.writeHead(400).end("Bad request");
    return;
  }
  res.writeHead(found.status, { "Content-Type": types[path.extname(found.file)] ?? "application/octet-stream" });
  createReadStream(found.file).pipe(res);
}).listen(port, () => {
  console.log(`\n  Preview of the built site: http://localhost:${port}/\n`);
});
