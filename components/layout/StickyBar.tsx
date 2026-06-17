"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/constants";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="md:hidden">
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            onClick={() => setSheetOpen(true)}
            initial={{ y: 56 }}
            animate={{
              y: 0,
              scale: [1, 1.03, 1],
            }}
            exit={{ y: 56 }}
            transition={{
              y: { duration: 0.3 },
              scale: {
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 6.8,
                ease: "easeInOut",
              },
            }}
            className="fixed bottom-0 left-0 right-0 z-40 h-14 bg-saffron flex items-center justify-center font-display text-cream text-lg"
          >
            ORDER NOW
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink/60"
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-cream rounded-t-none px-6 py-8 flex flex-col gap-4"
            >
              <p className="font-heading text-2xl text-ink mb-2">
                Order from Delhi Darbar
              </p>
              <Link
                href="/menu"
                onClick={() => setSheetOpen(false)}
                className="min-h-[44px] flex items-center justify-center bg-saffron text-cream font-body font-bold uppercase tracking-wide"
              >
                Order Online
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] flex items-center justify-center border border-ink text-ink font-body font-bold uppercase tracking-wide"
              >
                WhatsApp Order
              </a>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="min-h-[44px] font-body text-ink/60"
              >
                Cancel
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
