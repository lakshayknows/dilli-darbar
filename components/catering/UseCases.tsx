import Reveal from "@/components/ui/Reveal";

const USE_CASES = [
  {
    title: "Office Lunches",
    body: "Daily or one-off bulk meal boxes delivered to your office, on time, every time.",
  },
  {
    title: "Society Events",
    body: "Feeding an entire RWA gathering or community event without the kitchen stress.",
  },
  {
    title: "Family Occasions",
    body: "Birthdays, get-togethers, and celebrations — home-style food for the whole family.",
  },
];

export default function UseCases() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {USE_CASES.map((useCase, i) => (
        <Reveal key={useCase.title} delay={i * 0.1}>
          <div className="bg-cream p-6 h-full">
            <h3 className="font-heading text-ink text-2xl">
              {useCase.title}
            </h3>
            <p className="font-body text-ink/70 mt-2">{useCase.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
