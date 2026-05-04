import Database from "better-sqlite3";
import path from "path";
import { initSchema } from "./schema";

const DB_PATH = path.join(process.cwd(), "jedi-academy.db");

export class DatabaseManager {
  private static instance: DatabaseManager | null = null;
  private db: Database.Database;

  private constructor() {
    this.db = new Database(DB_PATH);
    this.db.pragma("journal_mode = WAL");
    this.db.pragma("foreign_keys = ON");
    initSchema(this.db);
  }

  static getInstance(): DatabaseManager {
    DatabaseManager.instance ??= new DatabaseManager();
    return DatabaseManager.instance;
  }

  getConnection(): Database.Database {
    return this.db;
  }
}
