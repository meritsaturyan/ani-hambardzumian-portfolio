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
 * Внутренняя функция — гарантирует, что пул есть.
 * Если базы нет (например, на демо без БД), выбросит понятную ошибку.
 */
function ensurePool() {
  if (!pool) {
    throw new Error(
      "Database is not configured. " +
        "Set a real DATABASE_URL in environment (НЕ localhost на Vercel) " +
        "или обработай отсутствие базы в месте, где вызывается query()."
    );
  }
  return pool;
}

/**
 * Универсальная функция для запросов.
 * @param {string} text - SQL запрос
 * @param {any[]} params - параметры для плейсхолдеров ($1, $2, ...)
 */
export async function query(text, params = []) {
  const db = ensurePool();
  const client = await db.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

/**
 * Корректно закрывает пул соединений.
 * Можно вызывать, если нужно завершить приложение.
 */
export async function closePool() {
  if (!pool) return;
  await pool.end();
  pool = null;
}
