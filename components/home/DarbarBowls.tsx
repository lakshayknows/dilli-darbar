"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { menu } from "@/data/menu";
import { useItemDrawer } from "@/components/menu/ItemDrawerProvider";
import { useCart } from "@/components/cart/CartProvider";

const bowls = menu.filter((item) => item.category === "DARBAR BOWLS");

export default function DarbarBowls() {
  const { openItem } = useItemDrawer();
  const { add, openCart } = useCart();

  return (
    <Section bg="maroon" size="lg">
      <Reveal>
        <h2 className="font-heading text-cream text-5xl md:text-7xl">
          DARBAR BOWLS
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        {bowls.map((bowl, i) => (
          <Reveal key={bowl.id} delay={i * 0.1}>
            <div className="group bg-cream p-6 transition-transform duration-200 hover:-translate-y-1 border border-transparent hover:border-saffron flex flex-col h-full">
              <button
                type="button"
                onClick={() => openItem(bowl)}
                aria-label={`View ${bowl.name}`}
                className="relative w-full aspect-square block"
              >
                {bowl.image ? (
                  <Image
                    src={bowl.image}
                    alt={bowl.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-ink/20 text-3xl text-center px-4">
                      {bowl.name}
                    </span>
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => openItem(bowl)}
                className="text-left font-display text-ink text-2xl mt-4 hover:text-saffron transition-colors"
              >
                {bowl.name}
              </button>
              <p className="font-body text-ink/70 text-[13px] mt-1 flex-1">
                {bowl.description}
              </p>

              <div className="flex items-center justify-between mt-3">
                <span className="font-body font-bold text-saffron">
                  ₹{bowl.price}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    add(bowl, 1);
                    openCart();
                  }}
                  className="font-body font-bold text-[11px] uppercase tracking-wide bg-ink text-cream px-3 py-2 hover:brightness-125 transition"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="flex justify-center mt-12" delay={0.2}>
        <Button
          href="/menu"
          variant="outline"
          className="!border-saffron !text-saffron hover:!bg-saffron hover:!text-ink"
        >
          See Full Menu →
        </Button>
      </Reveal>
    </Section>
  );
}
