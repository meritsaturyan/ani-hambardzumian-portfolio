import { Pool } from "pg";

const { DATABASE_URL, PGSSL, NODE_ENV } = process.env;

// Проверяем, что в DATABASE_URL не лежит заглушка типа postgres://USER:PASS@HOST:5432/DB_NAME
const hasRealDbUrl =
  typeof DATABASE_URL === "string" &&
  DATABASE_URL.trim() !== "" &&
  !/USER|PASS|HOST|DB_NAME/.test(DATABASE_URL);

let pool = null;

if (hasRealDbUrl) {
  // Нормальный режим — база настроена
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl:
      PGSSL === "true"
        ? { rejectUnauthorized: false }
        : false
  });
} else {
  // Режим без базы — удобно для демо/верстки/билда без БД
  if (NODE_ENV !== "production") {
    console.warn(
      "[db] DATABASE_URL is not configured or still contains placeholders. " +
      "Database access is disabled. Set a real Postgres URL in .env, " +
      "например: postgres://user:pass@host:5432/ani_hambardzumian_studios"
    );
  }
}

/**
 * Универсальная функция для запросов.
 * Если пула нет:
 *   - в production (Vercel) возвращаем пустой результат, чтобы сайт не падал;
 *   - в dev кидаем ошибку, чтобы ты видела проблему локально.
 */
export async function query(text, params = []) {
  if (!pool) {
    if (NODE_ENV === "production") {
      console.warn(
        "[db] query() called without configured pool. Returning empty result."
      );
      return {
        rows: [],
        rowCount: 0
      };
    }

    // Локально пусть видно, что базы нет
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
