import { Pool } from "pg";

const { DATABASE_URL, PGSSL } = process.env;

if (!DATABASE_URL || /USER|PASS|HOST|DB_NAME/.test(DATABASE_URL)) {
  throw new Error(
    "DATABASE_URL is not configured. Edit your .env and set a real Postgres URL, e.g. postgres://postgres:postgres@127.0.0.1:5432/ani_hambardzumian_studios"
  );
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: PGSSL === "true" ? { rejectUnauthorized: false } : false
});

export async function query(text, params = []) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

export async function closePool() {
  await pool.end();
}
