import { Pool } from "pg";
import db from "./db.json";

declare const process: {
  env: Record<string, string | undefined>;
};

export const pool = new Pool({
  connectionString: process.env.SATSET_DATABASE_URL,
  ssl: process.env.SATSET_DATABASE_URL?.includes("neon.tech")
    ? { rejectUnauthorized: false }
    : undefined,
});

export function getProductById(id: string) {
  return db.products.find((product) => product.id === id);
}

export function findShopByPath(path: string) {
  return db.shops.find((shop) => shop.path === path);
}

export const query: typeof pool.query = (...args) => pool.query(...(args as any));
