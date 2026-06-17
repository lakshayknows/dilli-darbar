"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SplashWordmark from "@/components/layout/SplashWordmark";

const SPLASH_KEY = "hasSeenDilliDarbarSplash";
/** How long the cycling curtain stays up on each navigation (~3 wordmark frames). */
const SHOW_MS = 1400;

/**
 * Shows the cycling "Dilli Darbar" wordmark as a brief curtain on every route
 * change, so the branded intro is actually visible on each page load (the
 * built-in app/loading.tsx only flashes for an instant on fast static pages).
 * Skips the very first load when the SplashScreen is playing its full intro.
 */
export default function RouteLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      // On the first load the SplashScreen handles the intro (when it hasn't
      // been seen this session). Don't double up — only curtain the initial
      // load if the splash is being skipped.
      if (!sessionStorage.getItem(SPLASH_KEY)) return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, SHOW_MS);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="route-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9998] bg-[#FF4D00] overflow-hidden select-none"
          style={{ backgroundColor: "#FF4D00" }}
        >
          <SplashWordmark loop stepMs={420} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
