"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const cateringSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  eventType: z.string().min(1),
  headcount: z.string().min(1),
  date: z.string().min(1),
  message: z.string().optional().or(z.literal("")),
});

export type CateringInput = z.infer<typeof cateringSchema>;
export type CateringResult = { ok: true } | { ok: false; error: string };

export async function submitCateringLead(
  input: CateringInput
): Promise<CateringResult> {
  const parsed = cateringSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please complete the required fields." };
  }

  const { name, phone, eventType, headcount, date, message } = parsed.data;

  await prisma.lead.create({
    data: {
      type: "CATERING",
      name,
      phone,
      payload: JSON.stringify({ eventType, headcount, date, message }),
    },
  });

  return { ok: true };
}
