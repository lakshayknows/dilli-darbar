import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

const REVIEWS = [
  {
    quote:
      "The aloo paratha changed my mornings completely. Butter, crispy, exactly like ghar ka khana.",
    author: "Priya S., Amar Colony",
    dish: "Aloo Paratha",
    rotate: "-2deg",
  },
  {
    quote:
      "Ordered the biryani for the first time, ordered again the next day. That's the review.",
    author: "Rahul M., GK-2",
    dish: "Chicken Biryani",
    rotate: "2deg",
  },
  {
    quote:
      "Dal makhani at midnight hits different. WhatsApp order was easy, delivery was fast.",
    author: "Ananya K., Kalkaji",
    dish: "Dal Makhani",
    rotate: "-1.5deg",
  },
  {
    quote:
      "The mango cheesecake is unreal for something with no added sugar. My kids ask for it every weekend.",
    author: "Sunita P., Amar Colony",
    dish: "Mango Cheesecake",
    rotate: "1.5deg",
  },
];

export default function Reviews() {
  return (
    <Section bg="ink" size="lg">
      <Reveal>
        <h2 className="font-display text-cream text-5xl md:text-7xl mb-12">
          WHAT PEOPLE SAY
        </h2>
      </Reveal>

      <div className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto snap-x-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible">
        {REVIEWS.map((review, i) => (
          <Reveal
            key={review.author}
            delay={i * 0.1}
            className="shrink-0 w-[80%] md:w-auto snap-center-item"
          >
            <div
              className="bg-cream text-ink p-6 h-full flex flex-col"
              style={{ transform: `rotate(${review.rotate})` }}
            >
              <p className="font-body text-ink/90">&ldquo;{review.quote}&rdquo;</p>
              <p className="font-body font-medium text-sm mt-4">
                {review.author}
              </p>
              <p className="font-body text-saffron text-sm">{review.dish}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
