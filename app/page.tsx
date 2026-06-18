import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import WhatMakesSpecial from "@/components/home/WhatMakesSpecial";
import DarbarBowls from "@/components/home/DarbarBowls";
import AboutTeaser from "@/components/home/AboutTeaser";
import Reviews from "@/components/home/Reviews";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Dilli Darbar — Home-Cooked Food Delivery in Amar Colony, Delhi",
  description:
    "Fresh North Indian meals delivered from our home kitchen in Amar Colony. Rajma bowls, parathas, dal makhani & more. Order online or on WhatsApp.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <WhatMakesSpecial />
      <DarbarBowls />
      <AboutTeaser />
      <Reviews />
      <FinalCTA />
    </main>
  );
}
