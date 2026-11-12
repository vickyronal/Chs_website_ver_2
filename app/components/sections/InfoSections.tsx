/*
  Building blocks for the inner pages (Corporate, Services, About, FAQ, Contact, Legal).
  Same design language as the homepage: pill labels, two-tone statements,
  numbered editorial rows, hairline dividers, no generic icon cards.
*/
import type { ReactNode } from "react";
import { Link } from "react-router";
import type { Faq, FaqGroup, Offering, Step } from "../../content/pages";
import { Button } from "../ui/Button";
import { Icon, type IconName } from "../ui/Icon";
import { Container, Section, Stack } from "../ui/Layout";
import { Tag } from "../ui/Pills";
import { Eyebrow, Heading, RichText } from "../ui/Typography";
import styles from "./InfoSections.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/* ---------- Two-tone statement ---------- */
export function Statement({ label, text }: { label: string; text: string }) {
  return (
    <Section>
      <Container>
        <div className={styles.statementWrap}>
          <Eyebrow>{label}</Eyebrow>
          <p className={styles.statement}>
            <RichText text={text} />
          </p>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- Numbered offering rows ---------- */
export function OfferingList({
  id,
  label,
  title,
  offerings,
  whatsapp,
}: {
  id: string;
  label: string;
  title: string;
  offerings: Offering[];
  whatsapp?: string | null;
}) {
  return (
    <Section labelledBy={`${id}-title`} tone="surface">
      <Container>
        <div className={styles.listHead}>
          <Eyebrow>{label}</Eyebrow>
          <Heading id={`${id}-title`}>
            <RichText text={title} />
          </Heading>
        </div>
        <ol className={styles.rows}>
          {offerings.map((o, i) => (
            <li key={o.id} id={o.id} className={styles.row}>
              <span className={styles.num}>{pad(i + 1)}</span>
              <div className={styles.rowMain}>
                <h3 className={styles.rowTitle}>
                  {o.title} {o.confirm && <Tag>To be confirmed</Tag>}
                </h3>
                <p className={styles.rowBody}>{o.body}</p>
                {o.points && (
                  <ul className={styles.points}>
                    {o.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.rowAction}>
                {o.to ? (
                  <Button to={o.to} variant="dark" size="sm" arrow="split">
                    Explore
                  </Button>
                ) : (
                  whatsapp && (
                    <Button href={whatsapp} variant="outline" size="sm" icon="whatsapp">
                      Ask us
                    </Button>
                  )
                )}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ---------- Numbered steps / values ---------- */
export function Steps({ id, label, title, steps }: { id: string; label: string; title: string; steps: Step[] }) {
  return (
    <Section labelledBy={`${id}-title`}>
      <Container>
        <div className={styles.listHead}>
          <Eyebrow>{label}</Eyebrow>
          <Heading id={`${id}-title`}>
            <RichText text={title} />
          </Heading>
        </div>
        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.num}>{pad(i + 1)}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ---------- Prose block (e.g. "Who we are") ---------- */
export function Prose({ id, label, title, paragraphs, aside }: { id: string; label: string; title: string; paragraphs: string[]; aside?: ReactNode }) {
  return (
    <Section labelledBy={`${id}-title`}>
      <Container>
        <div className={styles.prose}>
          <Stack gap={4} align="start">
            <Eyebrow>{label}</Eyebrow>
            <Heading id={`${id}-title`}>
              <RichText text={title} />
            </Heading>
          </Stack>
          <div className={styles.proseBody}>
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {aside}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- FAQ: topic list + accordions ---------- */
export function FaqList({ groups }: { groups: FaqGroup[] }) {
  return (
    <Section spacing="compact">
      <Container>
        <div className={styles.faq}>
          <nav aria-label="FAQ topics" className={styles.faqNav}>
            <ul>
              {groups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`}>{g.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.faqGroups}>
            {groups.map((g) => (
              <section key={g.id} id={g.id} className={styles.faqGroup} aria-labelledby={`${g.id}-title`}>
                <h2 id={`${g.id}-title`} className={styles.faqGroupTitle}>
                  {g.title}
                </h2>
                <div className={styles.faqItems}>
                  {g.items.map((item) => (
                    <FaqItem key={item.q} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FaqItem({ item }: { item: Faq }) {
  return (
    <details className={styles.faqItem}>
      <summary>
        <span>{item.q}</span>
        <span className={styles.plus} aria-hidden="true" />
      </summary>
      <p>{item.a}</p>
    </details>
  );
}

/* ---------- Contact methods ---------- */
export interface ContactMethod {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
  note?: string;
  primary?: boolean;
}

export function ContactMethods({ methods }: { methods: ContactMethod[] }) {
  return (
    <ul className={styles.contactGrid}>
      {methods.map((m) => {
        const inner = (
          <>
            <span className={styles.contactIcon}>
              <Icon name={m.icon} size={20} />
            </span>
            <span className={styles.contactLabel}>{m.label}</span>
            <span className={styles.contactValue}>{m.value}</span>
            {m.note && <span className={styles.contactNote}>{m.note}</span>}
          </>
        );
        const className = [styles.contactCard, m.primary && styles.contactPrimary].filter(Boolean).join(" ");
        return (
          <li key={m.label}>
            {m.href ? (
              <a href={m.href} className={className} {...(/^https?:/.test(m.href) && { target: "_blank", rel: "noopener noreferrer" })}>
                {inner}
              </a>
            ) : (
              <div className={className}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Legal page body ---------- */
export function LegalBody({ sections, updated }: { sections: readonly string[]; updated?: string }) {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <Section spacing="compact">
      <Container>
        <div className={styles.legal}>
          <nav aria-label="On this page" className={styles.faqNav}>
            <ul>
              {sections.map((s) => (
                <li key={s}>
                  <a href={`#${slug(s)}`}>{s}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.legalBody}>
            <p className={styles.legalNotice} role="note">
              <strong>Placeholder.</strong> This policy has not been written yet. The headings show the planned structure; CHS
              Tours will supply the final text.{updated && ` Last updated: ${updated}.`}
            </p>
            {sections.map((s, i) => (
              <section key={s} id={slug(s)} className={styles.legalSection}>
                <h2>
                  {i + 1}. {s}
                </h2>
                <p>Text for this section will be provided by CHS Tours.</p>
              </section>
            ))}
            <p className={styles.legalBack}>
              Questions? <Link to="/contact">Contact us</Link>.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
