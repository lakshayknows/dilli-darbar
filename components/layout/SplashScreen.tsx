"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { text: "dilli-darbar", lang: "en" },
  { text: "दिल्ली दरबार", lang: "hi" },
  { text: "دہلی دربار", lang: "ur" },
  { text: "ਦਿੱਲੀ ਦਰਬਾਰ", lang: "pa" },
  { text: "দিল্লি দরবার", lang: "bn" },
  { text: "தில்லி தர்பார்", lang: "ta" },
  { text: "ఢిల్లీ దర్బార్", lang: "te" },
  { text: "દિલ્હી દરબાર", lang: "gu" },
];

const SESSION_KEY = "hasSeenDilliDarbarSplash";

export default function SplashScreen() {
  // Start visible so the splash covers the page from the very first paint
  // (server-rendered). This prevents the "site flashes, then splash appears"
  // glitch. Returning visitors are hidden immediately in the effect below.
  const [isVisible, setIsVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      // Already seen this session — don't play again.
      setIsVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === LANGUAGES.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem(SESSION_KEY, "true");
            document.body.style.overflow = "";
          }, 650);
          return prev;
        }
        return prev + 1;
      });
    }, 480);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
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
          {/* Wordmark — large typography, dead-centre of the viewport. That's it. */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="relative w-full flex h-28 md:h-44 items-center justify-center">
              <AnimatePresence>
                <motion.h1
                  key={index}
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -48, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                  className="absolute inset-0 flex items-center justify-center font-display text-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F5EDD6] tracking-tight leading-none"
                  style={{ fontFamily: "'Gajraj One', sans-serif" }}
                >
                  {LANGUAGES[index].text}
                </motion.h1>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
