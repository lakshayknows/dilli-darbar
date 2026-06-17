import Reveal from "@/components/ui/Reveal";

// Replace these placeholders with real kitchen photography
const PROCESS_STEPS = [
  "Rolling paratha dough",
  "Butter on hot tawa",
  "Packing your order",
];

export default function ProcessGrid() {
  return (
    <Reveal className="bg-cream px-6 md:px-10 py-12 md:py-16 mx-6 md:mx-[76px] mt-6">
      <div className="grid md:grid-cols-3 gap-5">
        {PROCESS_STEPS.map((label) => (
          <div
            key={label}
            className="aspect-[4/3] bg-ink/10 flex items-center justify-center"
          >
            <span className="font-body text-ink/40 text-sm uppercase tracking-wide text-center px-4">
              {label}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
