"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Button from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { SWIGGY_URL } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Catering", href: "/catering" },
];

function CartButton({ onClick }: { onClick: () => void }) {
  const { count } = useCart();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open cart${count ? `, ${count} items` : ""}`}
      className="relative flex h-11 w-11 items-center justify-center text-cream hover:text-saffron transition-colors"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 6h15l-1.5 9h-12z" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <path d="M6 6 5 3H2" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-saffron text-cream text-[11px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openCart } = useCart();
  const { status } = useSession();
  const loggedIn = status === "authenticated";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-ink border-b border-saffron"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] flex items-center justify-between px-6 md:px-[76px] h-20">
          <Link
            href="/"
            className={`font-display text-2xl md:text-3xl transition-colors duration-300 ${
              scrolled ? "text-cream" : "text-saffron"
            }`}
          >
            दिल्ली — Darbar
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body font-medium text-cream hover:text-saffron transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={loggedIn ? "/account" : "/login"}
              className="font-body font-medium text-cream hover:text-saffron transition-colors duration-200"
            >
              {loggedIn ? "Account" : "Login"}
            </Link>
            <CartButton onClick={openCart} />
            <Button href={SWIGGY_URL} target="_blank">
              Order Now
            </Button>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <CartButton onClick={openCart} />
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="flex flex-col gap-1.5 w-11 h-11 items-center justify-center"
            >
              <span
                className={`block w-7 h-[2px] bg-cream transition-transform duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block w-7 h-[2px] bg-cream transition-opacity duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block w-7 h-[2px] bg-cream transition-transform duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl text-cream"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={loggedIn ? "/account" : "/login"}
              onClick={() => setOpen(false)}
              className="font-display text-4xl text-cream"
            >
              {loggedIn ? "Account" : "Login"}
            </Link>
            <Button
              onClick={() => {
                setOpen(false);
                openCart();
              }}
              variant="outline"
              className="mt-4"
            >
              View Cart
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
