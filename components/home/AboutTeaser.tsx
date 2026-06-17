import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

const STATS = [
  { value: "2021", label: "Cooking since" },
  { value: "25k+", label: "Orders delivered" },
  { value: "4.8★", label: "Average rating" },
];

export default function AboutTeaser() {
  return (
    <Section bg="cream" size="lg">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal>
          <span className="font-body font-bold uppercase tracking-[0.2em] text-saffron text-xs">
            Our Story
          </span>
          <h2 className="font-heading text-ink text-4xl md:text-6xl mt-3 leading-[0.95]">
            A kitchen run by your neighbours.
          </h2>
          <p className="font-body text-ink/75 mt-5 max-w-[480px]">
            Dilli Darbar started as a home kitchen in Amar Colony, run by people
            who wanted their neighbours to eat the way they eat at home —
            parathas rolled by hand, dal simmered for hours, nothing rushed.
          </p>
          <p className="font-body text-ink/75 mt-3 max-w-[480px]">
            We don&apos;t cook for a menu, we cook for a household. That&apos;s
            the whole difference.
          </p>
          <div className="mt-7">
            <Button
              href="/about"
              variant="ink"
              className="hover:bg-saffron transition-colors"
            >
              Read our story →
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="aspect-[4/3] bg-ink/10 flex items-center justify-center">
              <span className="font-body text-ink/40 text-sm uppercase tracking-wide">
                Kitchen photo
              </span>
            </div>
            <div className="grid grid-cols-3 divide-x divide-ink/10 border-t border-ink/10 mt-0">
              {STATS.map((stat) => (
                <div key={stat.label} className="py-5 text-center bg-cream">
                  <p className="font-display text-ink text-3xl md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="font-body text-ink/50 text-xs uppercase tracking-wide mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
