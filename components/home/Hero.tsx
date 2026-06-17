"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { menu, type MenuItem } from "@/data/menu";
import { useItemDrawer } from "@/components/menu/ItemDrawerProvider";
import { useCart } from "@/components/cart/CartProvider";

const bowls = menu.filter((item) => item.category === "DARBAR BOWLS");
// Plates for the rotating carousel: only bowls that have a photo.
const PLATES = bowls.filter((b) => b.image);

const ACHIEVEMENTS = [
  "25,000+ orders delivered",
  "4.8★ average rating",
  "Serving Amar Colony since 2021",
];

// Three visible slots: left (small, behind), center (large, front), right (small, behind).
const SLOTS = [
  { className: "w-[27vw] sm:w-[20vw] md:w-[250px]", y: 14, scale: 0.92, opacity: 0.9, z: 10 },
  { className: "w-[40vw] sm:w-[30vw] md:w-[380px]", y: -18, scale: 1, opacity: 1, z: 20 },
  { className: "w-[27vw] sm:w-[20vw] md:w-[250px]", y: 14, scale: 0.92, opacity: 0.9, z: 10 },
];

export default function Hero() {
  const { openItem } = useItemDrawer();
  const { add, openCart } = useCart();
  // order[1] is the centered plate.
  const [order, setOrder] = useState([0, 1, 2]);

  // Step through the full deck (not just permute the 3 visible) so every plate
  // surfaces, including the 4th+ bowl.
  const len = PLATES.length;
  const rotateRight = () =>
    setOrder((p) => [(p[0] - 1 + len) % len, p[0], p[1]]); // left -> centre, new enters left
  const rotateLeft = () =>
    setOrder((p) => [p[1], p[2], (p[2] + 1) % len]); // right -> centre, new enters right

  const centerIndex = order[1] % PLATES.length;

  const handleAdd = (item: MenuItem) => {
    add(item, 1);
    openCart();
  };

  return (
    <Section
      bg="maroon"
      size="hero"
      className="relative overflow-hidden"
      innerClassName="flex flex-col"
    >
      {/* Wordmark + rotating plates */}
      <div className="relative mt-3 md:mt-5">
        <span className="block text-center font-display text-saffron leading-none text-[7vw] md:text-4xl">
          दिल्ली
        </span>
        <h1 className="font-display text-cream text-center leading-[0.8] select-none text-[24vw] md:text-[14vw] -mt-1">
          Darbar
          <sup className="text-saffron align-super text-[0.28em]">™</sup>
        </h1>

        <div className="relative z-10 -mt-[11vw] md:-mt-[6vw] flex items-center justify-center gap-2 sm:gap-8 md:gap-16">
          {order.map((plateIndex, slot) => {
            const plate = PLATES[plateIndex % PLATES.length];
            const { className, y, scale, opacity, z } = SLOTS[slot];
            const isCenter = slot === 1;
            return (
              <motion.button
                key={plateIndex}
                layout
                type="button"
                onClick={() =>
                  isCenter
                    ? openItem(plate)
                    : slot === 0
                      ? rotateRight()
                      : rotateLeft()
                }
                aria-label={isCenter ? `View ${plate.name}` : `Show ${plate.name}`}
                style={{ zIndex: z }}
                animate={{ y, scale, opacity }}
                whileHover={{ scale: scale * 1.05 }}
                transition={{
                  layout: { type: "spring", stiffness: 260, damping: 30 },
                  scale: { type: "spring", stiffness: 260, damping: 22 },
                  y: { type: "spring", stiffness: 120, damping: 18 },
                  opacity: { duration: 0.4 },
                }}
                className={`group relative aspect-square shrink-0 cursor-pointer [filter:drop-shadow(-20px_4px_4px_rgba(0,0,0,0.13))] ${className}`}
              >
                {/* gentle idle float, layered under the spring transitions */}
                <motion.span
                  className="relative block w-full h-full"
                  animate={{ y: isCenter ? [0, -8, 0] : [0, -5, 0] }}
                  transition={{
                    duration: isCenter ? 6 : 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={plate.image}
                    alt={plate.name}
                    fill
                    sizes="(min-width: 768px) 380px, 40vw"
                    className="object-contain"
                    priority={isCenter}
                  />
                </motion.span>

                {/* Name reveal on hover */}
                <span className="pointer-events-none absolute -bottom-1 left-1/2 z-30 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-ink/85 px-3 py-1 font-body text-[11px] md:text-xs text-cream opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                  {plate.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={rotateLeft}
          aria-label="Previous dish"
          className="absolute left-0 bottom-[16%] md:bottom-[26%] z-30 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream bg-maroon/40 backdrop-blur-sm transition hover:bg-saffron hover:border-saffron hover:scale-110"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={rotateRight}
          aria-label="Next dish"
          className="absolute right-0 bottom-[16%] md:bottom-[26%] z-30 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream bg-maroon/40 backdrop-blur-sm transition hover:bg-saffron hover:border-saffron hover:scale-110"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {PLATES.map((plate, i) => (
          <button
            key={plate.id}
            type="button"
            aria-label={`Show ${plate.name}`}
            onClick={() => setOrder([(i + 2) % PLATES.length, i, (i + 1) % PLATES.length])}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === centerIndex ? "w-6 bg-saffron" : "w-2 bg-cream/30 hover:bg-cream/60"
            }`}
          />
        ))}
      </div>

      {/* Tagline + small CTA */}
      <p className="text-center font-heading text-cream text-2xl md:text-4xl mt-6 leading-tight">
        A lot on your plate?{" "}
        <span className="italic text-saffron">Let us handle dinner.</span>
      </p>
      <div className="flex justify-center mt-4">
        <Link
          href="/menu"
          className="group inline-flex items-center gap-2 border border-cream/40 text-cream font-body font-bold uppercase tracking-wide text-xs px-5 py-2.5 hover:bg-cream hover:text-ink transition-colors"
        >
          Explore the full menu
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Low-opacity achievements (trust, not overpowering) */}
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1 mt-6 text-cream/35 font-body text-xs md:text-sm">
        {ACHIEVEMENTS.map((a, i) => (
          <span key={a} className="flex items-center gap-6">
            {i > 0 && <span className="hidden sm:inline text-cream/20">•</span>}
            {a}
          </span>
        ))}
      </div>

      {/* Clickable featured food cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {bowls.map((item, i) => (
          <FoodCard key={item.id} item={item} accent={i} onAdd={handleAdd} onOpen={openItem} />
        ))}
      </div>
    </Section>
  );
}

const ACCENTS = ["bg-[#1f8a70]", "bg-saffron", "bg-[#e8b62c]", "bg-[#c0392b]"];

function FoodCard({
  item,
  accent,
  onAdd,
  onOpen,
}: {
  item: MenuItem;
  accent: number;
  onAdd: (item: MenuItem) => void;
  onOpen: (item: MenuItem) => void;
}) {
  return (
    <div className="group bg-cream text-ink flex flex-col overflow-hidden border border-transparent hover:border-saffron transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`View ${item.name}`}
        className={`relative aspect-[4/3] ${ACCENTS[accent % ACCENTS.length]} overflow-hidden`}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 320px, 50vw"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-display text-cream/80 text-xl text-center px-3">
            {item.name}
          </span>
        )}
        <span
          className={`absolute top-2 left-2 w-3.5 h-3.5 rounded-full border-2 border-cream ${
            item.veg ? "bg-green-600" : "bg-red-600"
          }`}
        />
      </button>

      <div className="p-3 flex flex-col gap-1 flex-1">
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="text-left font-display text-lg leading-tight hover:text-saffron transition-colors"
        >
          {item.name}
        </button>
        <p className="font-body text-ink/50 text-xs">~{item.calories} kcal</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-body font-bold text-saffron">₹{item.price}</span>
          <button
            type="button"
            onClick={() => onAdd(item)}
            className="font-body font-bold text-[11px] uppercase tracking-wide bg-ink text-cream px-3 py-2 hover:bg-saffron transition-colors"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
