import { CourseRepository } from "./CourseRepository";
import type { Course } from "./Course";

interface CreateCourseInput {
  title: string;
  description: string;
  jediId: number;
  maxCapacity: number;
  schedule: string;
}

interface UpdateCourseInput {
  title?: string;
  description?: string;
  jediId?: number;
  maxCapacity?: number;
  schedule?: string;
}

export class CourseService {
  private repository: CourseRepository;

  constructor() {
    this.repository = new CourseRepository();
  }

  getAllCourses(): Course[] {
    return this.repository.findAll();
  }

  getCourseById(id: number): Course | null {
    return this.repository.findById(id);
  }

  createCourse(input: CreateCourseInput): number {
    if (!input.title.trim()) {
      throw new Error("Title is required");
    }
    if (input.maxCapacity <= 0) {
      throw new Error("Max capacity must be greater than 0");
    }

    return this.repository.create(input);
  }

  updateCourse(id: number, input: UpdateCourseInput): boolean {
    if (input.title !== undefined && !input.title.trim()) {
      throw new Error("Title cannot be empty");
    }
    if (input.maxCapacity !== undefined && input.maxCapacity <= 0) {
      throw new Error("Max capacity must be greater than 0");
    }

    return this.repository.update(id, input);
  }

  deleteCourse(id: number): boolean {
    return this.repository.delete(id);
  }
}
