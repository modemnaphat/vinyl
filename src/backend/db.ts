import "server-only";
import { Pool } from "pg";
import { readFileSync } from "node:fs";
import path from "node:path";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("ยังไม่ได้ตั้งค่า DATABASE_URL");
}

const globalForDb = globalThis as typeof globalThis & {
  dbPool?: Pool;
};

export const db =
  globalForDb.dbPool ??
  new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: true,
        ca: readFileSync(
            path.join(process.cwd(), "certs", "prod-ca-2021.crt"),
            "utf8"
        ),
    },
    max: 5,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.dbPool = db;
}