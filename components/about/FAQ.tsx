"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Faq = { q: string; a: string };

export default function FAQ({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="mt-10 max-w-[760px] mx-auto divide-y divide-cream/15 border-y border-cream/15">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-heading text-cream text-lg md:text-xl">
                {item.q}
              </span>
              <span
                className={`shrink-0 text-saffron text-2xl leading-none transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-cream/75 leading-relaxed pb-5 pr-10">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
