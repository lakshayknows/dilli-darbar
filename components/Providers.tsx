"use client";

import { SessionProvider } from "next-auth/react";
import CartProvider from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import ItemDrawerProvider from "@/components/menu/ItemDrawerProvider";
import ItemDrawer from "@/components/menu/ItemDrawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        <ItemDrawerProvider>
          {children}
          <ItemDrawer />
          <CartDrawer />
        </ItemDrawerProvider>
      </CartProvider>
    </SessionProvider>
  );
}
