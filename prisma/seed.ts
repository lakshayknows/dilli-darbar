import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Demo customer (idempotent on email).
  const passwordHash = await bcrypt.hash("demo1234", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@dillidarbar.test" },
    update: {},
    create: {
      name: "Demo Customer",
      email: "demo@dillidarbar.test",
      phone: "9990000000",
      passwordHash,
    },
  });

  // One sample order for the demo customer (only if they have none yet).
  const existingOrders = await prisma.order.count({ where: { userId: user.id } });
  if (existingOrders === 0) {
    await prisma.order.create({
      data: {
        userId: user.id,
        status: "PENDING",
        total: 518,
        items: {
          create: [
            { itemId: "rajma-rice-bowl", name: "Rajma Rice Bowl", price: 249, quantity: 1 },
            { itemId: "dal-makhani-bowl", name: "Dal Makhani Bowl", price: 269, quantity: 1 },
          ],
        },
      },
    });
  }

  // A couple of sample leads (only seed if the table is empty).
  const existingLeads = await prisma.lead.count();
  if (existingLeads === 0) {
    await prisma.lead.createMany({
      data: [
        {
          type: "CATERING",
          name: "Ravi Sharma",
          phone: "9811122233",
          email: "ravi@example.com",
          payload: JSON.stringify({
            eventType: "Office Lunch",
            headcount: "40",
            date: "2026-07-01",
          }),
        },
        {
          type: "ORDER",
          name: "Demo Customer",
          phone: "9990000000",
          email: "demo@dillidarbar.test",
          payload: JSON.stringify({ items: 2, total: 518 }),
        },
      ],
    });
  }

  console.log("🌱 Seed complete:", {
    user: user.email,
    orders: await prisma.order.count(),
    leads: await prisma.lead.count(),
  });
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
