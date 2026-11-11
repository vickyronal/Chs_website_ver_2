/*
  Builds WhatsApp and phone links from app/content/site.ts.
  The WhatsApp message is pre-filled with what the visitor was looking at,
  so CHS knows the context the moment the chat opens.
*/
import { site } from "../content/site";

export type WhatsAppContext =
  | { kind: "general" }
  | { kind: "destination"; name: string }
  | { kind: "theme"; name: string }
  | { kind: "package"; title: string; nights: number; days: number; destination: string; url?: string }
  | { kind: "corporate" };

export function whatsappMessage(context: WhatsAppContext = { kind: "general" }): string {
  const hi = `Hi ${site.name},`;
  switch (context.kind) {
    case "destination":
      return `${hi} I'm planning a trip to ${context.name}. Could you share some options?`;
    case "theme":
      return `${hi} I'm looking for a ${context.name.toLowerCase()} holiday. Could you share some options?`;
    case "package":
      return `${hi} I'm interested in "${context.title}" (${context.nights}N/${context.days}D, ${context.destination}).${
        context.url ? ` ${context.url}` : ""
      }`;
    case "corporate":
      return `${hi} I'd like to discuss corporate travel for our team.`;
    default:
      return `${hi} I'd like help planning a holiday.`;
  }
}

/** https://wa.me/… link, or null if no WhatsApp number is set */
export function whatsappLink(context?: WhatsAppContext): string | null {
  if (!site.whatsappNumber) return null;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(whatsappMessage(context))}`;
}

/** tel: link, or null if no phone number is set */
export function phoneLink(): string | null {
  if (!site.phoneDisplay) return null;
  return `tel:${site.phoneDisplay.replace(/[^\d+]/g, "")}`;
}
