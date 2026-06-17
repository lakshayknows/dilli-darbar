import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { WHATSAPP_URL, SWIGGY_URL, ZOMATO_URL } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <Section bg="saffron" size="lg" innerClassName="text-center">
      <Reveal>
        <h2 className="font-display text-ink text-5xl md:text-7xl max-w-3xl mx-auto">
          OKAY. WE GOT YOU HUNGRY.
        </h2>
      </Reveal>

      <Reveal delay={0.15} className="flex flex-wrap justify-center gap-4 mt-10">
        <a
          href={SWIGGY_URL}
          target="_blank"
          rel="noreferrer"
          className="min-h-[44px] inline-flex items-center justify-center px-6 bg-ink text-cream font-body font-bold uppercase tracking-wide hover:brightness-125 transition"
        >
          Order on Swiggy
        </a>
        <a
          href={ZOMATO_URL}
          target="_blank"
          rel="noreferrer"
          className="min-h-[44px] inline-flex items-center justify-center px-6 bg-ink text-cream font-body font-bold uppercase tracking-wide hover:brightness-125 transition"
        >
          Order on Zomato
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="min-h-[44px] inline-flex items-center justify-center px-6 bg-ink text-cream font-body font-bold uppercase tracking-wide hover:brightness-125 transition"
        >
          WhatsApp Order
        </a>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="font-body text-ink/70 mt-8">
          Serving Amar Colony and nearby areas · 10 AM – 10 PM daily
        </p>
      </Reveal>
    </Section>
  );
}
