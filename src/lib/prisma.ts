import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Standard setup for Neon serverless
if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  throw new Error("❌ DATABASE_URL is missing! Check your .env file and RESTART the server.");
}

const createPrismaClient = () => {
  console.log("🛠️  Creating NEW PrismaClient instance...");
  console.log("🔗 Target DB Host:", new URL(connectionString).host);
  
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool as any);
  
  return new PrismaClient({
    adapter,
    log: ["error", "warn"], // Minimal logging to see errors clearly
  });
};

// Use a very specific key to avoid conflicts with other libraries
const globalForPrisma = globalThis as unknown as {
  __AUDIT_AI_PRISMA__: PrismaClient | undefined;
};

export const prisma = globalForPrisma.__AUDIT_AI_PRISMA__ ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__AUDIT_AI_PRISMA__ = prisma;
}
