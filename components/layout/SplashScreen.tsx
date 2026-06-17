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

export default function SplashScreen() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the splash screen in this session
    const hasSeen = sessionStorage.getItem("hasSeenDilliDarbarSplash");
    
    if (!hasSeen) {
      setIsVisible(true);
      // Prevent scrolling during splash animation
      document.body.style.overflow = "hidden";
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Cycle through languages
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === LANGUAGES.length - 1) {
          clearInterval(interval);
          // Start exit animation after the last language
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem("hasSeenDilliDarbarSplash", "true");
            document.body.style.overflow = "";
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 280);

    return () => {
      clearInterval(interval);
    };
  }, [isVisible]);

  // Clean up body scroll lock if component unmounts unexpectedly
  useEffect(() => {
    return () => {
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
            transition: { 
              duration: 0.8, 
              ease: [0.76, 0, 0.24, 1] // Custom easeInOutQuint for premium slide-up
            }
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#FF4D00] overflow-hidden select-none"
          style={{ backgroundColor: "#FF4D00" }}
        >
          {/* Subtle radial glow in the center */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,rgba(245,237,214,0.4)_0%,transparent_65%)] pointer-events-none" />
          
          <div className="text-center px-4 relative z-10">
            <div className="h-24 md:h-36 lg:h-48 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={index}
                  initial={{ y: 70, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -70, opacity: 0 }}
                  transition={{
                    duration: 0.28,
                    ease: [0.215, 0.61, 0.355, 1], // Custom premium easeOutCubic
                  }}
                  className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[#F5EDD6] tracking-tight leading-none text-center"
                  style={{ fontFamily: "'Gajraj One', serif" }}
                >
                  {LANGUAGES[index].text}
                </motion.h1>
              </AnimatePresence>
            </div>
            
            {/* Minimal loader line */}
            <div className="w-16 h-[2px] bg-[#F5EDD6] opacity-35 mx-auto mt-6 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#F5EDD6]"
                initial={{ left: "-100%", width: "100%" }}
                animate={{ left: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
