import "dotenv/config";            // 👈 добавили загрузку .env
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Pool } from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("DATABASE_URL is not set. Please configure it in your .env.");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString,
    ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false
  });

  try {
    const schemaPath = path.join(__dirname, "..", "db", "schema.sql");
    const seedPath = path.join(__dirname, "..", "db", "seed.sql");

    const schemaSql = fs.readFileSync(schemaPath, "utf8");
    const seedSql = fs.readFileSync(seedPath, "utf8");

    console.log("Applying schema...");
    await pool.query(schemaSql);
    console.log("Schema applied.");

    console.log("Seeding data...");
    await pool.query(seedSql);
    console.log("Seed data inserted.");

    console.log("Database initialization complete ✅");
  } catch (err) {
    console.error("Error initializing database:", err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
