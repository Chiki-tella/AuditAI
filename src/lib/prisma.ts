import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

import { setDefaultAutoSelectFamilyAttemptTimeout } from "node:net";

// 1. MANUALLY load .env at the absolute top level to ensure the Prisma engine sees it
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

// 2. Fix Node.js connection issues on Windows (Happy Eyeballs)
if (typeof window === "undefined") {
  setDefaultAutoSelectFamilyAttemptTimeout(1000);
}

// 3. Configure Neon to use HTTP instead of WebSockets if needed
if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
  // Use 'as any' because the property exists at runtime but may be missing in older TS types
  (neonConfig as any).useFetchConnection = true; 
}

const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  console.error("❌ DATABASE_URL IS MISSING! Env Path:", envPath);
  throw new Error("❌ DATABASE_URL is missing! Check your .env file and RESTART the server.");
}

const createPrismaClient = () => {
  console.log("🛠️  Initializing Neon Prisma Client...");
  console.log("🔗 Target DB Host:", new URL(connectionString).host);
  
  // In Prisma 7, we pass the connectionString directly to the adapter
  // so it can share the URL with the internal engine.
  const adapter = new PrismaNeon({ connectionString });
  
  return new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });
};

// Use a very specific key to avoid conflicts with other libraries or Next.js internals
const globalForPrisma = globalThis as unknown as {
  __AUDIT_AI_PRISMA_INSTANCE__: PrismaClient | undefined;
};

export const prisma = globalForPrisma.__AUDIT_AI_PRISMA_INSTANCE__ ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__AUDIT_AI_PRISMA_INSTANCE__ = prisma;
}
