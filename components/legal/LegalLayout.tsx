import type { ReactNode } from "react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/legal/JsonLd";
import { BUSINESS, LAST_UPDATED } from "@/lib/legal";

export type FaqItem = { q: string; a: string };

/** A titled block of legal prose. Use inside LegalLayout's children. */
export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-8 first:mt-0">
      <h2 className="font-heading text-ink text-xl md:text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 font-body text-ink/80 leading-relaxed text-[15px]">
        {children}
      </div>
    </section>
  );
}

export default function LegalLayout({
  title,
  lead,
  lastUpdated = LAST_UPDATED,
  faq,
  children,
}: {
  title: string;
  /** Factual 40–60 word summary — the AEO/GEO extract. Rendered first. */
  lead: string;
  lastUpdated?: string;
  /** If present, renders a visible FAQ + matching FAQPage JSON-LD. */
  faq?: FaqItem[];
  children: ReactNode;
}) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: BUSINESS.name,
    url: BUSINESS.siteUrl,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    priceRange: "₹₹",
    servesCuisine: ["North Indian", "Home Style"],
    hasMap: BUSINESS.mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.line1,
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "22:00",
    },
  };

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: lead,
    publisher: { "@type": "Organization", name: BUSINESS.name, url: BUSINESS.siteUrl },
  };

  const faqLd =
    faq && faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <main className="bg-maroon min-h-screen">
      <JsonLd data={organizationLd} />
      <JsonLd data={webPageLd} />
      {faqLd && <JsonLd data={faqLd} />}

      <Section bg="maroon" size="hero">
        <Reveal>
          <h1 className="font-heading text-cream text-4xl md:text-6xl leading-[0.95]">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="font-body text-cream/80 max-w-[640px] mt-5 leading-relaxed">
            {lead}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-body text-cream/45 text-xs uppercase tracking-wide mt-4">
            Last updated: {lastUpdated}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="bg-cream text-ink mt-10 p-6 md:p-10 max-w-[820px]">
            {children}

            {faq && faq.length > 0 && (
              <section className="mt-10 pt-6 border-t border-ink/10">
                <h2 className="font-heading text-ink text-xl md:text-2xl">
                  Frequently asked questions
                </h2>
                <dl className="mt-4 space-y-4">
                  {faq.map((item) => (
                    <div key={item.q}>
                      <dt className="font-body font-bold text-ink">{item.q}</dt>
                      <dd className="font-body text-ink/80 leading-relaxed text-[15px] mt-1">
                        {item.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <section className="mt-10 pt-6 border-t border-ink/10">
              <h2 className="font-heading text-ink text-lg">Contact</h2>
              <address className="not-italic font-body text-ink/80 text-[15px] mt-2 leading-relaxed">
                <strong className="font-bold text-ink">{BUSINESS.name}</strong>
                <br />
                {BUSINESS.address.full}
                <br />
                Phone:{" "}
                <a
                  href={`tel:${BUSINESS.phoneE164}`}
                  className="text-saffron hover:underline"
                >
                  {BUSINESS.phone}
                </a>
                <br />
                Email:{" "}
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-saffron hover:underline"
                >
                  {BUSINESS.email}
                </a>
                <br />
                Hours: {BUSINESS.hours}
              </address>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 font-body font-bold text-saffron hover:underline"
              >
                View on Google Maps →
              </a>
            </section>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
