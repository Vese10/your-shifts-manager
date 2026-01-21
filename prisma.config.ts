import { defineConfig } from '@prisma/config';
import 'dotenv/config'; // Load .env file

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    seed: './prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
});
