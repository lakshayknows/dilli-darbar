"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { MenuItem } from "@/data/menu";

type ItemDrawerContextValue = {
  item: MenuItem | null;
  isOpen: boolean;
  openItem: (item: MenuItem) => void;
  close: () => void;
};

const ItemDrawerContext = createContext<ItemDrawerContextValue | null>(null);

export default function ItemDrawerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [item, setItem] = useState<MenuItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openItem = useCallback((next: MenuItem) => {
    setItem(next);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ item, isOpen, openItem, close }),
    [item, isOpen, openItem, close]
  );

  return (
    <ItemDrawerContext.Provider value={value}>
      {children}
    </ItemDrawerContext.Provider>
  );
}

export function useItemDrawer() {
  const ctx = useContext(ItemDrawerContext);
  if (!ctx) throw new Error("useItemDrawer must be used within ItemDrawerProvider");
  return ctx;
}
