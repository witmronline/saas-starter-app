// db.ts
import { Pool } from "pg";

declare global {
    // ensure global caching (safe across hot reloads)
    // eslint-disable-next-line no-var
    var _pgPool: Pool | undefined;
}

const pool =
    global._pgPool ??
    new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

if (process.env.NODE_ENV !== "production") {
    global._pgPool = pool;
}

export function getPool(): Pool {
    return pool;
}
