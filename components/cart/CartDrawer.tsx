"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";
import useIsDesktop from "@/components/ui/useIsDesktop";

export default function CartDrawer() {
  const { lines, subtotal, count, setQty, remove, isOpen, closeCart } = useCart();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const panelMotion = isDesktop
    ? { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } }
    : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-ink/60"
          />

          <motion.aside
            {...panelMotion}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="fixed z-[70] bg-cream text-ink flex flex-col
              inset-y-0 right-0 w-full max-w-md
              max-md:inset-x-0 max-md:inset-y-auto max-md:bottom-0 max-md:max-w-none
              max-md:max-h-[88vh] max-md:rounded-t-3xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
              <h2 className="font-heading text-2xl">
                Your Cart{count > 0 ? ` (${count})` : ""}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="w-10 h-10 -mr-2 flex items-center justify-center text-ink/60 hover:text-ink"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <p className="font-body text-ink/60">Your cart is empty.</p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-4 font-body font-bold text-saffron uppercase tracking-wide text-sm"
                >
                  Browse the menu →
                </button>
              </div>
            ) : (
              <>
                <ul className="overflow-y-auto flex-1 px-6 py-4 divide-y divide-ink/10">
                  {lines.map((line) => (
                    <li key={line.id} className="flex gap-4 py-4">
                      <div className="relative w-16 h-16 shrink-0 bg-ink/5">
                        {line.image ? (
                          <Image
                            src={line.image}
                            alt={line.name}
                            fill
                            sizes="64px"
                            className="object-contain"
                          />
                        ) : (
                          <span
                            className={`absolute top-1 left-1 w-2.5 h-2.5 rounded-full ${
                              line.veg ? "bg-green-700" : "bg-red-700"
                            }`}
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-display text-lg leading-tight truncate">
                          {line.name}
                        </p>
                        <p className="font-body text-saffron font-bold text-sm mt-0.5">
                          ₹{line.price}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-ink/20">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(line.id, line.qty - 1)}
                              className="w-8 h-8 text-ink/70 hover:text-ink"
                            >
                              −
                            </button>
                            <span className="w-7 text-center font-body text-sm font-bold">
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQty(line.id, line.qty + 1)}
                              className="w-8 h-8 text-ink/70 hover:text-ink"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(line.id)}
                            className="font-body text-xs text-ink/50 hover:text-red-700 uppercase tracking-wide"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <span className="font-body font-bold text-sm">
                        ₹{line.price * line.qty}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-ink/10 px-6 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-body text-ink/70">Subtotal</span>
                    <span className="font-display text-2xl">₹{subtotal}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block text-center min-h-[44px] leading-[44px] bg-saffron text-cream font-body font-bold uppercase tracking-wide hover:brightness-110 transition"
                  >
                    Checkout
                  </Link>
                  <p className="font-body text-ink/50 text-xs text-center mt-2">
                    You&apos;ll be asked to sign in to place the order.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
