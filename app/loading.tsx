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

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LANGUAGES.length);
    }, 480);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#FF4D00] overflow-hidden select-none"
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
    </div>
  );
}
