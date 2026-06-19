"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashWordmark from "@/components/layout/SplashWordmark";

const SESSION_KEY = "hasSeenDilliDarbarSplash";

export default function SplashScreen() {
  // Start visible so the splash covers the page from the very first paint
  // (server-rendered). This prevents the "site flashes, then splash appears"
  // glitch. Returning visitors are hidden immediately in the effect below.
  const [isVisible, setIsVisible] = useState(true);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      // Already seen this session — don't play again.
      setIsVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";
    setPlay(true);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleComplete = useCallback(() => {
    // Linger on the final wordmark briefly, then slide the splash away.
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem(SESSION_KEY, "true");
      document.body.style.overflow = "";
    }, 650);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#FF4D00] overflow-hidden select-none"
          style={{ backgroundColor: "#FF4D00" }}
        >
          {/* Same animated wordmark as the loading screen; plays once, slower. */}
          {play && <SplashWordmark onComplete={handleComplete} stepMs={520} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
