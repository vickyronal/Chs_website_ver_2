import type { Route } from "./+types/contact";
import { ContactMethods, type ContactMethod } from "../components/sections/InfoSections";
import { PageHero } from "../components/sections/PageHero";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/CardGrid";
import { Container, Section, Stack } from "../components/ui/Layout";
import { Eyebrow, Heading } from "../components/ui/Typography";
import { site } from "../content/site";
import { phoneLink, whatsappLink } from "../lib/contact";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "Contact",
    description: "Contact CHS Tours on WhatsApp, by phone or by email to plan your next holiday or business trip.",
    path: "/contact",
  });

export default function Contact() {
  const whatsapp = whatsappLink();
  const tel = phoneLink();

  // Only details that exist are shown (null = not supplied yet)
  const methods: ContactMethod[] = [
    whatsapp && { icon: "whatsapp", label: "WhatsApp (fastest)", value: "Chat with us", href: whatsapp, note: site.phoneDisplay ?? undefined, primary: true },
    tel && site.phoneDisplay && { icon: "phone", label: "Call", value: site.phoneDisplay, href: tel },
    site.email && { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
    site.address && { icon: "pin", label: "Visit", value: site.address, note: site.hours ?? undefined },
  ].filter(Boolean) as ContactMethod[];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="Let's plan *your next trip*"
        intro="The quickest way to reach us is WhatsApp. Tell us where, when and who's travelling, and we'll take it from there."
      />
      <Section>
        <Container>
          <Stack gap={12}>
            <ContactMethods methods={methods} />

            <Stack gap={6} align="start">
              <Eyebrow>Enquiry form</Eyebrow>
              <Heading size="h3">Prefer to write it all down?</Heading>
              {/* The secure enquiry form is built in Phase 6 (it needs a server to receive messages safely). */}
              <EmptyState title="Our online enquiry form is coming soon. For now, WhatsApp is the fastest way to reach us.">
                {whatsapp && (
                  <Button href={whatsapp} icon="whatsapp" arrow>
                    Plan on WhatsApp
                  </Button>
                )}
              </EmptyState>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
