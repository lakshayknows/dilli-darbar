import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import MenuGrid from "@/components/menu/MenuGrid";
import JsonLd from "@/components/legal/JsonLd";
import { BUSINESS } from "@/lib/legal";
import { menu } from "@/data/menu";

// Unique categories in menu order, so every dish (incl. Meal Boxes) is covered.
const categories = [...new Set(menu.map((item) => item.category))];

export const metadata: Metadata = {
  title: "Dilli Darbar Menu · Bowls, Parathas, Meals & Desserts",
  description:
    "Explore 40+ dishes: signature Darbar Bowls from ₹249, fresh parathas from ₹79, meal boxes, chicken biryani & sugar-free mango cheesecake.",
  alternates: { canonical: "/menu" },
};

// Menu + MenuItem structured data, generated from the single menu source.
const menuLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Dilli Darbar Menu",
  url: `${BUSINESS.siteUrl}/menu`,
  hasMenuSection: categories.map((category) => ({
    "@type": "MenuSection",
    name: category,
    hasMenuItem: menu
      .filter((item) => item.category === category)
      .map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          offers: {
            "@type": "Offer",
            price: String(item.price),
            priceCurrency: "INR",
          },
          nutrition: {
            "@type": "NutritionInformation",
            calories: `${item.calories} calories`,
          },
          suitableForDiet: item.veg
            ? "https://schema.org/VegetarianDiet"
            : undefined,
        })),
    })),
};

export default function MenuPage() {
  return (
    <main className="bg-maroon min-h-screen">
      <JsonLd data={menuLd} />
      <Section bg="maroon" size="hero">
        <h1 className="font-heading text-cream text-[14vw] md:text-8xl leading-[0.95]">
          OUR MENU
        </h1>
        <MenuGrid />
      </Section>
    </main>
  );
}
