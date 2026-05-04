import type Database from "better-sqlite3";
import { seed } from "./seed";

export function initSchema(db: Database.Database) {
  const tableExists = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='jedi'")
    .get();

  if (tableExists) return;

  db.exec(`
    CREATE TABLE jedi (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      bio TEXT NOT NULL,
      avatar TEXT
    );

    CREATE TABLE course (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      jediId INTEGER NOT NULL REFERENCES jedi(id),
      maxCapacity INTEGER NOT NULL,
      schedule TEXT NOT NULL
    );

    CREATE TABLE enrollment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      courseId INTEGER NOT NULL REFERENCES course(id),
      studentName TEXT NOT NULL,
      studentEmail TEXT NOT NULL,
      enrolledAt TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(courseId, studentEmail)
    );
  `);

  seed(db);
}
