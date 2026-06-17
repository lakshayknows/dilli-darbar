"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Section from "@/components/ui/Section";
import { useCart } from "@/components/cart/CartProvider";
import { placeOrder } from "@/app/checkout/actions";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, clear } = useCart();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [placedId, setPlacedId] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const res = await placeOrder({
      name: String(data.get("name")),
      phone: String(data.get("phone")),
      address: String(data.get("address")),
      lines: lines.map((l) => ({ id: l.id, qty: l.qty })),
    });
    setLoading(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    clear();
    setPlacedId(res.orderId);
  }

  if (placedId) {
    return (
      <main className="bg-maroon min-h-screen">
        <Section bg="maroon" size="hero" innerClassName="max-w-xl text-center">
          <h1 className="font-heading text-cream text-5xl">Order placed!</h1>
          <p className="font-body text-cream/70 mt-4">
            Thank you — your order{" "}
            <span className="text-saffron font-bold">
              #{placedId.slice(-6).toUpperCase()}
            </span>{" "}
            is in. We&apos;ll call to confirm delivery.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/account"
              className="min-h-[44px] px-6 inline-flex items-center bg-saffron text-cream font-body font-bold uppercase tracking-wide"
            >
              View my orders
            </Link>
            <Link
              href="/menu"
              className="min-h-[44px] px-6 inline-flex items-center border border-cream text-cream font-body font-bold uppercase tracking-wide"
            >
              Back to menu
            </Link>
          </div>
        </Section>
      </main>
    );
  }

  return (
    <main className="bg-maroon min-h-screen">
      <Section bg="maroon" size="hero" innerClassName="max-w-3xl">
        <h1 className="font-heading text-cream text-5xl md:text-6xl">Checkout</h1>

        {lines.length === 0 ? (
          <p className="font-body text-cream/70 mt-6">
            Your cart is empty.{" "}
            <Link href="/menu" className="text-saffron font-bold">
              Browse the menu →
            </Link>
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-10 mt-10">
            <form onSubmit={onSubmit} className="space-y-4 order-2 md:order-1">
              {error && (
                <p className="font-body text-sm bg-red-700/15 text-red-200 px-3 py-2">
                  {error}
                </p>
              )}
              <Field label="Name" name="name" type="text" />
              <Field label="Phone" name="phone" type="tel" />
              <label className="block">
                <span className="font-body text-cream/70 text-sm">
                  Delivery address
                </span>
                <textarea
                  name="address"
                  required
                  rows={3}
                  className="mt-1 w-full bg-transparent border border-cream/30 px-3 py-2.5 text-cream font-body focus:border-saffron focus:outline-none"
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[44px] bg-saffron text-cream font-body font-bold uppercase tracking-wide hover:brightness-110 transition disabled:opacity-60"
              >
                {loading ? "Placing order…" : `Place order · ₹${subtotal}`}
              </button>
              <p className="font-body text-cream/50 text-xs">
                Payment is collected on delivery for now.
              </p>
            </form>

            <div className="order-1 md:order-2 bg-cream text-ink p-6 h-fit">
              <h2 className="font-heading text-2xl mb-4">Order summary</h2>
              <ul className="divide-y divide-ink/10">
                {lines.map((l) => (
                  <li key={l.id} className="flex justify-between py-2 font-body text-sm">
                    <span>
                      {l.name} × {l.qty}
                    </span>
                    <span className="font-bold">₹{l.price * l.qty}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-4 pt-4 border-t border-ink/10">
                <span className="font-body font-bold">Subtotal</span>
                <span className="font-display text-2xl">₹{subtotal}</span>
              </div>
            </div>
          </div>
        )}
      </Section>
    </main>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <label className="block">
      <span className="font-body text-cream/70 text-sm">{label}</span>
      <input
        name={name}
        type={type}
        required
        className="mt-1 w-full bg-transparent border border-cream/30 px-3 py-2.5 text-cream font-body focus:border-saffron focus:outline-none"
      />
    </label>
  );
}
