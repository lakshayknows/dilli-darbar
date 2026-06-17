"use client";

import SplashWordmark from "@/components/layout/SplashWordmark";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#FF4D00] overflow-hidden select-none"
      style={{ backgroundColor: "#FF4D00" }}
    >
      {/* Same animated wordmark as the splash, looping. */}
      <SplashWordmark loop />
    </div>
  );
}
