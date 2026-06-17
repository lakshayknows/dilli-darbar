import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Section from "@/components/ui/Section";
import SignOutButton from "@/components/auth/SignOutButton";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "My Account — Delhi Darbar",
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/account");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <main className="bg-maroon min-h-screen">
      <Section bg="maroon" size="hero">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-cream text-5xl md:text-6xl">
              {session.user.name ? `Hi, ${session.user.name.split(" ")[0]}` : "My account"}
            </h1>
            <p className="font-body text-cream/60 mt-2">{session.user.email}</p>
          </div>
          <SignOutButton />
        </div>

        <h2 className="font-heading text-cream text-3xl mt-12 mb-4">
          Order history
        </h2>

        {orders.length === 0 ? (
          <p className="font-body text-cream/70">
            No orders yet.{" "}
            <Link href="/menu" className="text-saffron font-bold">
              Order something →
            </Link>
          </p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="bg-cream text-ink p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-heading text-xl">
                    Order #{order.id.slice(-6).toUpperCase()}
                  </span>
                  <span className="font-body text-xs uppercase tracking-wide bg-ink/10 px-2 py-1">
                    {order.status}
                  </span>
                </div>
                <p className="font-body text-ink/50 text-xs mt-1">
                  {new Date(order.createdAt).toLocaleString("en-IN")}
                </p>
                <ul className="mt-3 font-body text-sm text-ink/80">
                  {order.items.map((it) => (
                    <li key={it.id}>
                      {it.name} × {it.quantity}
                    </li>
                  ))}
                </ul>
                <p className="font-body font-bold text-saffron mt-3">
                  Total ₹{order.total}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </main>
  );
}
