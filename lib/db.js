import { Pool } from "pg";

const { DATABASE_URL, PGSSL, NODE_ENV } = process.env;

const isProd = NODE_ENV === "production";

const isPlaceholderUrl =
  !DATABASE_URL ||
  /USER|PASS|HOST|DB_NAME/.test(DATABASE_URL || "");

const isLocalhostUrl =
  (DATABASE_URL || "").includes("127.0.0.1") ||
  (DATABASE_URL || "").includes("localhost");

// ВАЖНО:
// - в dev можно ходить на localhost
// - в prod (Vercel) localhost считаем НЕрабочим и отключаем базу
const shouldDisableDb = isPlaceholderUrl || (isProd && isLocalhostUrl);

let pool = null;

if (!shouldDisableDb) {
  // Нормальный режим — реальная база настроена
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl:
      PGSSL === "true"
        ? { rejectUnauthorized: false }
        : false
  });
} else {
  if (!isProd) {
    console.warn(
      "[db] DATABASE_URL is not configured or uses localhost. " +
      "DB access is disabled. Set real Postgres URL in .env " +
      "(например: postgres://user:pass@host:5432/ani_hambardzumian_studios)"
    );
  }
}

/**
 * Универсальная функция для запросов.
 * Если пула нет:
 *   - в production (Vercel) возвращаем пустой результат, чтобы сайт НЕ падал;
 *   - в dev кидаем ошибку, чтобы ты видела, что базы нет.
 */
export async function query(text, params = []) {
  if (!pool) {
    if (isProd) {
      console.warn(
        "[db] query() called without configured pool in production. Returning empty result."
      );
      return {
        rows: [],
        rowCount: 0
      };
    }

    throw new Error(
      "Database is not configured. Set a real DATABASE_URL in your .env"
    );
  }

  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

export async function closePool() {
  if (!pool) return;
  await pool.end();
  pool = null;
}
