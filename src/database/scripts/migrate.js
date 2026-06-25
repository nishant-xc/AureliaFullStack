import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  const migrationsDir = path.join(__dirname, "..", "migrations");

  const files = (await fs.readdir(migrationsDir))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  try {
    for (const file of files) {
      console.log(`Running migration: ${file}`);

      const sql = await fs.readFile(
        path.join(migrationsDir, file),
        "utf8"
      );

      await pool.query(sql);

      console.log(`✓ ${file} completed`);
    }

    console.log("All migrations completed successfully.");
  } catch (error) {
    console.error("Migration failed:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

runMigrations();
