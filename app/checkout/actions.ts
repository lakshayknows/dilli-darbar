"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { menu } from "@/data/menu";

const checkoutSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  address: z.string().min(6),
  lines: z
    .array(z.object({ id: z.string(), qty: z.number().int().positive() }))
    .min(1),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CheckoutResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

export async function placeOrder(input: CheckoutInput): Promise<CheckoutResult> {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please complete all delivery details." };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, error: "Please sign in to place your order." };
  }

  // Recompute prices server-side from the canonical menu (never trust the client).
  const items = parsed.data.lines.map((line) => {
    const menuItem = menu.find((m) => m.id === line.id);
    if (!menuItem) throw new Error(`Unknown item: ${line.id}`);
    return {
      itemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: line.qty,
    };
  });

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      status: "PENDING",
      total,
      items: { create: items },
    },
  });

  // Capture the order as a lead for the kitchen.
  await prisma.lead.create({
    data: {
      type: "ORDER",
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: session.user.email ?? null,
      payload: JSON.stringify({
        orderId: order.id,
        address: parsed.data.address,
        items,
        total,
      }),
    },
  });

  return { ok: true, orderId: order.id };
}
