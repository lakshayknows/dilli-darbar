"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { menu, MenuCategory } from "@/data/menu";
import FilterBar from "@/components/menu/FilterBar";
import MenuCard from "@/components/menu/MenuCard";

export default function MenuGrid() {
  const [active, setActive] = useState<MenuCategory | "ALL">("ALL");
  const [vegOnly, setVegOnly] = useState(false);

  const items = useMemo(() => {
    let list = menu;
    if (active === "LUNCH") {
      list = menu.filter(
        (item) => item.category === "LUNCH" || item.category === "MEAL BOXES"
      );
    } else if (active !== "ALL") {
      list = menu.filter((item) => item.category === active);
    }
    if (vegOnly) list = list.filter((item) => item.veg);
    return list;
  }, [active, vegOnly]);

  return (
    <div>
      <FilterBar
        active={active}
        onChange={setActive}
        vegOnly={vegOnly}
        onVegOnlyChange={setVegOnly}
      />

      {items.length === 0 ? (
        <p className="font-body text-cream/60 mt-10">
          No vegetarian dishes in this category.
        </p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
