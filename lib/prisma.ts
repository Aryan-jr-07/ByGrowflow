// lib/prisma.ts
// Prisma 7.x client singleton with Neon serverless adapter
// Prevents connection exhaustion in Next.js dev mode

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.warn("DATABASE_URL not set — Prisma operations will fail at runtime");
    const dummyAdapter = new PrismaNeon({ connectionString: "postgresql://dummy:dummy@localhost/dummy" });
    return new PrismaClient({ adapter: dummyAdapter } as any);
  }

  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
