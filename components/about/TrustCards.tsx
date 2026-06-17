import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const TRUST_POINTS = [
  "Home kitchen, Amar Colony",
  "Fresh daily",
  "Real ingredients",
  "FSSAI certified (certification in progress)",
];

export default function TrustCards() {
  return (
    <Section bg="maroon" size="md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {TRUST_POINTS.map((point, i) => (
          <Reveal key={point} delay={i * 0.1}>
            <div className="bg-cream p-6 h-full flex items-center">
              <p className="font-body font-medium text-ink">{point}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
