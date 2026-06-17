"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MenuItem } from "@/data/menu";
import { useItemDrawer } from "@/components/menu/ItemDrawerProvider";
import { useCart } from "@/components/cart/CartProvider";

const MenuCard = forwardRef<HTMLDivElement, { item: MenuItem }>(
  function MenuCard({ item }, ref) {
  const { openItem } = useItemDrawer();
  const { add, openCart } = useCart();

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="group bg-cream p-5 flex flex-col border border-transparent hover:border-saffron transition-colors"
    >
      <button
        type="button"
        onClick={() => openItem(item)}
        aria-label={`View ${item.name}`}
        className="relative w-full aspect-square mb-4 bg-ink/5 block"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-ink/15 text-xl text-center px-3">
              {item.name}
            </span>
          </span>
        )}
      </button>

      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={() => openItem(item)}
          className="text-left font-display text-ink text-xl leading-tight hover:text-saffron transition-colors"
        >
          {item.name}
        </button>
        <span
          aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
          className={`mt-1.5 shrink-0 w-3 h-3 rounded-full border ${
            item.veg ? "border-green-700 bg-green-700" : "border-red-700 bg-red-700"
          }`}
        />
      </div>

      <p className="font-body text-ink/70 text-[13px] mt-1 flex-1">
        {item.description}
      </p>

      <p className="font-body text-ink/45 text-xs mt-2">~{item.calories} kcal</p>

      <div className="flex items-center justify-between mt-3">
        <span className="font-body font-bold text-saffron">₹{item.price}</span>
        <button
          type="button"
          onClick={() => {
            add(item, 1);
            openCart();
          }}
          className="font-body font-bold text-[11px] uppercase tracking-wide bg-ink text-cream px-3 py-2 hover:brightness-125 transition"
        >
          Add to cart
        </button>
      </div>
    </motion.div>
  );
});

export default MenuCard;
