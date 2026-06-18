import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Story from "@/components/about/Story";
import ProcessGrid from "@/components/about/ProcessGrid";
import TrustCards from "@/components/about/TrustCards";
import FAQ, { type Faq } from "@/components/about/FAQ";
import JsonLd from "@/components/legal/JsonLd";
import { WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Dilli Darbar · Our Story & Kitchen Standards",
  description:
    "Meet the team behind Dilli Darbar. Home cloud kitchen in Amar Colony since 2021. 25,000+ orders, 4.8★ rating. Fresh ingredients, zero preservatives.",
  alternates: { canonical: "/about" },
};

const faqs: Faq[] = [
  {
    q: "Does Dilli Darbar deliver outside Amar Colony?",
    a: "Yes. We deliver across Amar Colony, Lajpat Nagar and surrounding South Delhi areas — order directly on our website or message us on WhatsApp.",
  },
  {
    q: "Are the meals prepared hygienically?",
    a: "Absolutely. Dilli Darbar is a home cloud kitchen using fresh, locally sourced ingredients with no preservatives. We cook in small batches and pack every order in sealed, tamper-evident packaging.",
  },
  {
    q: "Do you offer healthy or sugar-free options?",
    a: "Yes. Our menu includes high-protein, sugar-free desserts like Mango Cheesecake (paneer, dahi, honey — no added sugar) and balanced meal boxes under 800 kcal.",
  },
  {
    q: "How do I place a bulk or catering order?",
    a: "Fill out our catering enquiry form at thedillidarbar.com/catering, or message us on WhatsApp to customise a menu for your event.",
  },
  {
    q: "What cuisines does Dilli Darbar serve?",
    a: "Authentic North Indian home-style cooking — dal makhani, rajma, chole, parathas, chicken biryani and our signature Darbar Bowls.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AboutPage() {
  return (
    <main className="bg-maroon min-h-screen">
      <JsonLd data={faqLd} />
      <Section bg="maroon" size="hero">
        <Reveal>
          <h1 className="font-heading text-cream text-[14vw] md:text-8xl leading-[0.95]">
            MADE IN AMAR COLONY.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-body text-cream/75 max-w-[480px] mt-6">
            A home cloud kitchen, run by people who live in your
            neighbourhood, cooking the food you grew up on.
          </p>
        </Reveal>
      </Section>

      <Story />
      <ProcessGrid />
      <TrustCards />

      <Section bg="maroon" size="lg">
        <Reveal>
          <h2 className="font-heading text-cream text-4xl md:text-6xl text-center">
            FREQUENTLY ASKED
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <FAQ items={faqs} />
        </Reveal>
      </Section>

      <Section bg="maroon" size="lg" innerClassName="text-center">
        <Reveal>
          <h2 className="font-heading text-cream text-5xl md:text-7xl">
            READY TO ORDER?
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap justify-center gap-4 mt-8">
          <Button href="/menu">Order Online</Button>
          <Button href={WHATSAPP_URL} target="_blank" variant="outline">
            WhatsApp Order
          </Button>
        </Reveal>
      </Section>
    </main>
  );
}
