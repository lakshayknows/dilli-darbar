"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WORDMARKS } from "@/data/wordmarks";

/**
 * The animated "Dilli Darbar" wordmark that cycles across scripts. Shared by the
 * first-load SplashScreen and the route-level loading screen so the two are always
 * visually identical.
 *
 * - `loop` (loading screen): cycle forever from a random start, so a brief flash
 *   isn't always the English frame.
 * - default (splash): play once from English through every script, then fire
 *   `onComplete` so the caller can dismiss.
 */
export default function SplashWordmark({
  loop = false,
  onComplete,
  stepMs = 480,
  /** How many wordmarks to show before completing (once mode). Defaults to all. */
  steps,
  /** Duration of each enter/exit transition, in ms. */
  transitionMs = 350,
}: {
  loop?: boolean;
  onComplete?: () => void;
  stepMs?: number;
  steps?: number;
  transitionMs?: number;
}) {
  const total = Math.min(steps ?? WORDMARKS.length, WORDMARKS.length);

  const [index, setIndex] = useState(() =>
    loop ? Math.floor(Math.random() * WORDMARKS.length) : 0,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (!loop && prev === total - 1) {
          clearInterval(interval);
          onComplete?.();
          return prev;
        }
        return (prev + 1) % WORDMARKS.length;
      });
    }, stepMs);

    return () => clearInterval(interval);
  }, [loop, onComplete, stepMs, total]);

  return (
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <div className="relative w-full flex h-28 md:h-44 items-center justify-center">
        <AnimatePresence>
          <motion.h1
            key={index}
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -48, opacity: 0 }}
            transition={{ duration: transitionMs / 1000, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F5EDD6] tracking-tight leading-none"
            style={{ fontFamily: WORDMARKS[index].font }}
          >
            {WORDMARKS[index].text}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
}
