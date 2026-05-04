import type Database from "better-sqlite3";
import { DatabaseManager } from "./DatabaseManager";
import { Course } from "./Course";

interface CourseRow {
  id: number;
  title: string;
  description: string;
  maxCapacity: number;
  schedule: string;
  instructorName: string;
  enrollmentCount: number;
}

interface CreateCourseData {
  title: string;
  description: string;
  jediId: number;
  maxCapacity: number;
  schedule: string;
}

interface UpdateCourseData {
  title?: string;
  description?: string;
  jediId?: number;
  maxCapacity?: number;
  schedule?: string;
}

export class CourseRepository {
  private db: Database.Database;

  constructor() {
    this.db = DatabaseManager.getInstance().getConnection();
  }

  findAll(): Course[] {
    const rows = this.db
      .prepare(
        `SELECT
          c.id,
          c.title,
          c.description,
          c.maxCapacity,
          c.schedule,
          j.name AS instructorName,
          (SELECT COUNT(*) FROM enrollment e WHERE e.courseId = c.id) AS enrollmentCount
        FROM course c
        JOIN jedi j ON j.id = c.jediId
        ORDER BY c.id`
      )
      .all() as CourseRow[];

    return rows.map((row) => this.toCourse(row));
  }

  findById(id: number): Course | null {
    const row = this.db
      .prepare(
        `SELECT
          c.id,
          c.title,
          c.description,
          c.maxCapacity,
          c.schedule,
          j.name AS instructorName,
          (SELECT COUNT(*) FROM enrollment e WHERE e.courseId = c.id) AS enrollmentCount
        FROM course c
        JOIN jedi j ON j.id = c.jediId
        WHERE c.id = ?`
      )
      .get(id) as CourseRow | undefined;

    return row ? this.toCourse(row) : null;
  }

  create(data: CreateCourseData): number {
    const result = this.db
      .prepare(
        "INSERT INTO course (title, description, jediId, maxCapacity, schedule) VALUES (?, ?, ?, ?, ?)"
      )
      .run(data.title, data.description, data.jediId, data.maxCapacity, data.schedule);

    return Number(result.lastInsertRowid);
  }

  update(id: number, data: UpdateCourseData): boolean {
    const fields: string[] = [];
    const values: unknown[] = [];

    if (data.title !== undefined) { fields.push("title = ?"); values.push(data.title); }
    if (data.description !== undefined) { fields.push("description = ?"); values.push(data.description); }
    if (data.jediId !== undefined) { fields.push("jediId = ?"); values.push(data.jediId); }
    if (data.maxCapacity !== undefined) { fields.push("maxCapacity = ?"); values.push(data.maxCapacity); }
    if (data.schedule !== undefined) { fields.push("schedule = ?"); values.push(data.schedule); }

    if (fields.length === 0) return true;

    values.push(id);
    const result = this.db
      .prepare(`UPDATE course SET ${fields.join(", ")} WHERE id = ?`)
      .run(...values);

    return result.changes > 0;
  }

  delete(id: number): boolean {
    const result = this.db
      .prepare("DELETE FROM course WHERE id = ?")
      .run(id);

    return result.changes > 0;
  }

  private toCourse = (row: CourseRow): Course =>
    new Course(
      row.id,
      row.title,
      row.description,
      row.maxCapacity,
      row.schedule,
      row.instructorName,
      row.enrollmentCount
    );
}
