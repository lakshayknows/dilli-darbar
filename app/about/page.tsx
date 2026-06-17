import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Story from "@/components/about/Story";
import ProcessGrid from "@/components/about/ProcessGrid";
import TrustCards from "@/components/about/TrustCards";
import { WHATSAPP_URL, SWIGGY_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About — Delhi Darbar",
};

export default function AboutPage() {
  return (
    <main className="bg-maroon min-h-screen">
      <Section bg="maroon" size="hero">
        <Reveal>
          <h1 className="font-display text-cream text-[14vw] md:text-8xl leading-[0.95]">
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

      <Section bg="maroon" size="lg" innerClassName="text-center">
        <Reveal>
          <h2 className="font-display text-cream text-5xl md:text-7xl">
            READY TO ORDER?
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap justify-center gap-4 mt-8">
          <Button href={SWIGGY_URL} target="_blank">
            Order on Swiggy
          </Button>
          <Button href={WHATSAPP_URL} target="_blank" variant="outline">
            WhatsApp Order
          </Button>
        </Reveal>
      </Section>
    </main>
  );
}
