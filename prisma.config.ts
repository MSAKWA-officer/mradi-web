import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // This looks for the variable named DATABASE_URL in your .env file
    url: process.env.DATABASE_URL, 
  },
});
