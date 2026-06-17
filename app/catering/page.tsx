import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import UseCases from "@/components/catering/UseCases";
import ContactForm from "@/components/catering/ContactForm";
import { WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Catering — Delhi Darbar",
};

export default function CateringPage() {
  return (
    <main className="bg-maroon min-h-screen">
      <Section bg="maroon" size="hero">
      <Reveal>
        <h1 className="font-heading text-cream text-[11vw] md:text-7xl leading-[0.95] max-w-4xl">
          FEEDING YOUR OFFICE? YOUR SOCIETY? YOUR FAMILY?
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="font-body text-cream/75 max-w-[560px] mt-6">
          Delhi Darbar takes bulk orders for offices, society events,
          birthday parties, and family gatherings in and around Amar Colony.
        </p>
      </Reveal>

      <div className="mt-14">
        <UseCases />
      </div>

      <Reveal className="mt-14 max-w-2xl">
        <ContactForm />
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <Button href={WHATSAPP_URL} target="_blank" variant="outline">
          Discuss Your Order on WhatsApp →
        </Button>
      </Reveal>
      </Section>
    </main>
  );
}
