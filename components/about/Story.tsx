import Reveal from "@/components/ui/Reveal";

export default function Story() {
  return (
    <Reveal className="bg-cream px-6 md:px-10 py-12 md:py-16 mx-6 md:mx-[76px] -mt-10 relative z-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-5 font-body text-ink/80">
          <p>
            Delhi Darbar started as a home kitchen in Amar Colony, run by
            people who wanted their neighbours to eat the way they eat at
            home — parathas rolled by hand, dal simmered for hours, nothing
            rushed.
          </p>
          <p>
            What makes our food different is simple: we don&apos;t cook for a
            menu, we cook for a household. Proper masalas, fresh vegetables
            bought daily, and recipes that haven&apos;t been simplified for
            speed.
          </p>
          <p>
            Our promise is that every box that leaves this kitchen is
            something we&apos;d serve our own family — cooked fresh, packed
            with care, and delivered while it&apos;s still warm.
          </p>
        </div>

        <div className="w-full aspect-[4/3] bg-ink/10 flex items-center justify-center">
          <span className="font-body text-ink/40 text-sm uppercase tracking-wide">
            Kitchen photo goes here
          </span>
        </div>
      </div>
    </Reveal>
  );
}
