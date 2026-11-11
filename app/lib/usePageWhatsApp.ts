/*
  Lets any page tell the site-wide WhatsApp buttons (header, sticky bar, footer)
  what the visitor is looking at, so the pre-filled message has context.

  In a route file:
    export const handle = { whatsapp: { kind: "corporate" } };
  or, for pages with data (e.g. a package):
    export const handle = { whatsapp: (data) => ({ kind: "package", ...data }) };
*/
import { useMatches } from "react-router";
import { whatsappLink, type WhatsAppContext } from "./contact";

type WhatsAppHandle = WhatsAppContext | ((loaderData: unknown) => WhatsAppContext);

export function usePageWhatsApp(): string | null {
  const matches = useMatches();
  // The deepest route that declares a context wins
  for (let i = matches.length - 1; i >= 0; i--) {
    const handle = matches[i].handle as { whatsapp?: WhatsAppHandle } | undefined;
    if (handle?.whatsapp) {
      const ctx = typeof handle.whatsapp === "function" ? handle.whatsapp(matches[i].loaderData) : handle.whatsapp;
      return whatsappLink(ctx);
    }
  }
  return whatsappLink();
}
