import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import WhatMakesSpecial from "@/components/home/WhatMakesSpecial";
import DarbarBowls from "@/components/home/DarbarBowls";
import AboutTeaser from "@/components/home/AboutTeaser";
import Reviews from "@/components/home/Reviews";
import FinalCTA from "@/components/home/FinalCTA";

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
