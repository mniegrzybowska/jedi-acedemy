import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CourseService } from "../CourseService";

interface UpdateCourseInput {
  title?: string;
  description?: string;
  jediId?: number;
  maxCapacity?: number;
  schedule?: string;
}

export class UpdateCourseController {
  private service: CourseService;

  constructor() {
    this.service = new CourseService();
  }

  async handle(id: number, request: NextRequest) {
    try {
      const body = (await request.json()) as UpdateCourseInput;
      const updated = this.service.updateCourse(id, body);
      if (!updated) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
      }
      const course = this.service.getCourseById(id);
      return NextResponse.json(course);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid request";
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }
}
