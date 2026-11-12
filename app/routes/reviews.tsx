import type { Route } from "./+types/reviews";
import { PageHero } from "../components/sections/PageHero";
import { Button } from "../components/ui/Button";
import { Cluster, Container, Section } from "../components/ui/Layout";
import { EmptyState } from "../components/ui/CardGrid";
import { whatsappLink } from "../lib/contact";
import { buildMeta } from "../lib/seo";

export const meta: Route.MetaFunction = () => [
  ...buildMeta({
    title: "Reviews",
    description: "What travellers say about their CHS Tours holidays.",
    path: "/reviews",
  }),
  // Hidden from search engines until real reviews are added
  { name: "robots", content: "noindex" },
];

/**
 * Reviews are shown ONLY when CHS supplies real, consented traveller reviews.
 * Until then this page explains that honestly instead of showing made-up quotes.
 */
export default function Reviews() {
  const whatsapp = whatsappLink();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Reviews" }]}
        eyebrow="Reviews"
        title="Stories from *our travellers*"
        intro="Real reviews from CHS Tours travellers will appear here."
      />
      <Section spacing="compact">
        <Container>
          <EmptyState title="We're collecting reviews from recent travellers. Travelled with us? We'd love to hear how it went.">
            <Cluster>
              {whatsapp && (
                <Button href={whatsapp} icon="whatsapp" arrow>
                  Share your experience
                </Button>
              )}
              <Button to="/holidays" variant="outline">
                Browse holidays
              </Button>
            </Cluster>
          </EmptyState>
        </Container>
      </Section>
    </>
  );
}
