import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // CLI/Migrations should use the DIRECT URL
    url: env("DIRECT_URL"),
  },
});
