import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // One simple read to prove connectivity.
  const [users, orders, leads] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.lead.count(),
  ]);

  console.log("✅ Connected to Prisma Postgres");
  console.log(`   users=${users}  orders=${orders}  leads=${leads}`);
}

main()
  .catch((e) => {
    console.error("❌ Prisma connection failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
