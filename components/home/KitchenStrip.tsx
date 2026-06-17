import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const COLUMNS = [
  {
    title: "HOME COOKED",
    body: "Made fresh in our Amar Colony kitchen, not a factory",
  },
  {
    title: "REAL INGREDIENTS",
    body: "Proper masalas, fresh vegetables, no shortcuts",
  },
  {
    title: "YOUR NEIGHBOUR",
    body: "We're literally around the corner from you",
  },
];

export default function KitchenStrip() {
  return (
    <Section bg="maroon" size="lg">
      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cream/20">
        {COLUMNS.map((col, i) => (
          <Reveal
            key={col.title}
            delay={i * 0.15}
            className="py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0"
          >
            <h3 className="font-heading text-cream text-3xl md:text-4xl">
              {col.title}
            </h3>
            <p className="font-body text-cream/75 mt-3 max-w-[280px]">
              {col.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
