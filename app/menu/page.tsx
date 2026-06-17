import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import MenuGrid from "@/components/menu/MenuGrid";

export const metadata: Metadata = {
  title: "Menu — Delhi Darbar",
};

export default function MenuPage() {
  return (
    <main className="bg-maroon min-h-screen">
      <Section bg="maroon" size="hero">
        <h1 className="font-heading text-cream text-[14vw] md:text-8xl leading-[0.95]">
          OUR MENU
        </h1>
        <MenuGrid />
      </Section>
    </main>
  );
}
