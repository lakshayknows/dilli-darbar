"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useItemDrawer } from "@/components/menu/ItemDrawerProvider";
import { useCart } from "@/components/cart/CartProvider";
import useIsDesktop from "@/components/ui/useIsDesktop";

export default function ItemDrawer() {
  const { item, isOpen, close } = useItemDrawer();
  const { add, openCart } = useCart();
  const isDesktop = useIsDesktop();
  const [qty, setQty] = useState(1);

  // Reset quantity whenever a new item opens.
  useEffect(() => {
    if (isOpen) setQty(1);
  }, [isOpen, item?.id]);

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const panelMotion = isDesktop
    ? { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } }
    : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };

  const handleAdd = () => {
    if (!item) return;
    add(item, qty);
    close();
    openCart();
  };

  return (
    <AnimatePresence>
      {isOpen && item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-ink/60"
          />

          <motion.aside
            {...panelMotion}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={item.name}
            className="fixed z-[70] bg-cream text-ink flex flex-col
              inset-y-0 right-0 w-full max-w-md
              max-md:inset-x-0 max-md:inset-y-auto max-md:bottom-0 max-md:max-w-none
              max-md:max-h-[88vh] max-md:rounded-t-3xl"
          >
            <div className="flex items-center justify-between px-6 pt-5">
              <span
                className={`inline-flex items-center gap-2 text-xs font-body font-bold uppercase tracking-wide ${
                  item.veg ? "text-green-700" : "text-red-700"
                }`}
              >
                <span
                  className={`w-3 h-3 rounded-full border ${
                    item.veg
                      ? "border-green-700 bg-green-700"
                      : "border-red-700 bg-red-700"
                  }`}
                />
                {item.veg ? "Veg" : "Non-veg"}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="w-10 h-10 -mr-2 flex items-center justify-center text-ink/60 hover:text-ink"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto px-6 pb-4 flex-1">
              <div className="relative w-full aspect-square bg-ink/5 mt-2">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 768px) 28rem, 100vw"
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-ink/15 text-3xl text-center px-6">
                      {item.name}
                    </span>
                  </div>
                )}
              </div>

              <h2 className="font-display text-3xl mt-5">{item.name}</h2>
              <p className="font-body text-ink/70 mt-2">{item.description}</p>

              <div className="flex items-center gap-4 mt-4">
                <span className="font-body font-bold text-saffron text-xl">
                  ₹{item.price}
                </span>
                <span className="font-body text-ink/60 text-sm">
                  ~{item.calories} kcal
                </span>
              </div>

              <h3 className="font-body font-bold uppercase tracking-wide text-xs text-ink/50 mt-6 mb-2">
                Ingredients
              </h3>
              <ul className="flex flex-wrap gap-2">
                {item.ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="font-body text-sm bg-ink/5 px-3 py-1 rounded-full"
                  >
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-ink/10 px-6 py-4 flex items-center gap-4">
              <div className="flex items-center border border-ink/20">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-11 text-xl text-ink/70 hover:text-ink"
                >
                  −
                </button>
                <span className="w-8 text-center font-body font-bold">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-11 text-xl text-ink/70 hover:text-ink"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 min-h-[44px] bg-saffron text-cream font-body font-bold uppercase tracking-wide hover:brightness-110 transition flex items-center justify-center gap-2"
              >
                Add to cart · ₹{item.price * qty}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
