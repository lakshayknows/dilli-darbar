import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const FEATURES = [
  {
    title: "Home Cooked",
    body: "Made fresh in our Amar Colony kitchen every day — never a factory, never frozen.",
  },
  {
    title: "Real Ingredients",
    body: "Proper masalas, vegetables bought daily, slow-cooked dals. No shortcuts, no powders.",
  },
  {
    title: "Your Neighbour",
    body: "We're literally around the corner. Warm food reaches you fast, the way ghar ka khana should.",
  },
  {
    title: "Cooked With Care",
    body: "Every box is something we'd serve our own family — packed clean, sent out warm.",
  },
];

export default function WhatMakesSpecial() {
  return (
    <Section bg="maroon" size="lg">
      <Reveal>
        <h2 className="font-display text-cream text-5xl md:text-7xl">
          WHAT MAKES US SPECIAL
        </h2>
        <p className="font-body text-cream/70 max-w-[520px] mt-4">
          We&apos;re not a restaurant chain. We&apos;re a home kitchen cooking
          the food we grew up on, for the neighbourhood we live in.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        {FEATURES.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 0.1}>
            <div className="group h-full bg-cream/[0.04] border border-cream/15 p-6 transition-all duration-200 hover:bg-cream/[0.08] hover:border-saffron hover:-translate-y-1">
              <span className="font-display text-saffron text-2xl">
                0{i + 1}
              </span>
              <h3 className="font-display text-cream text-2xl md:text-3xl mt-3 group-hover:text-saffron transition-colors">
                {feature.title}
              </h3>
              <p className="font-body text-cream/70 text-sm mt-3">
                {feature.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
