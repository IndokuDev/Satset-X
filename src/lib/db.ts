import { Pool } from "pg";

declare const process: {
  env: Record<string, string | undefined>;
};

export const pool = new Pool({
  connectionString: process.env.SATSET_DATABASE_URL,
  ssl: process.env.SATSET_DATABASE_URL?.includes("neon.tech")
    ? { rejectUnauthorized: false }
    : undefined,
});

export const query: typeof pool.query = (...args) => pool.query(...(args as any));
