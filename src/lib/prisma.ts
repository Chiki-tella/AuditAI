import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// 1. MANUALLY load .env at the absolute top level to ensure the Prisma engine sees it
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

// Standard setup for Neon serverless
if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  console.error("❌ DATABASE_URL IS MISSING! Env Path:", envPath);
  throw new Error("❌ DATABASE_URL is missing! Check your .env file and RESTART the server.");
}

const createPrismaClient = () => {
  console.log("🛠️  Creating NEW PrismaClient instance...");
  console.log("🔗 Target DB Host:", new URL(connectionString).host);
  
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool as any);
  
  return new PrismaClient({
    adapter,
    log: ["error", "warn"],
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
