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
    }, 450);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FF4D00] overflow-hidden select-none"
      style={{ backgroundColor: "#FF4D00" }}
    >
      {/* Background patterns or subtle glowing core for rich premium feel */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(245,237,214,0.3)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="text-center px-4 relative z-10">
        <div className="h-24 md:h-36 lg:h-48 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: [0.215, 0.61, 0.355, 1], // Custom premium easeOutCubic
              }}
              className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[#F5EDD6] tracking-tight leading-none text-center"
              style={{ fontFamily: "'Gajraj One', serif" }}
            >
              {LANGUAGES[index].text}
            </motion.h1>
          </AnimatePresence>
        </div>
        
        {/* Subtle high-end loading line indicator */}
        <div className="w-16 h-[2px] bg-[#F5EDD6] opacity-30 mx-auto mt-6 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#F5EDD6]"
            initial={{ left: "-100%", width: "100%" }}
            animate={{ left: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}
