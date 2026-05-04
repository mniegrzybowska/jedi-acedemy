import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CourseService } from "../CourseService";

interface CreateCourseInput {
  title: string;
  description: string;
  jediId: number;
  maxCapacity: number;
  schedule: string;
}

export class CreateCourseController {
  private service: CourseService;

  constructor() {
    this.service = new CourseService();
  }

  async handle(request: NextRequest) {
    try {
      const body = (await request.json()) as CreateCourseInput;
      const id = this.service.createCourse(body);
      const course = this.service.getCourseById(id);
      return NextResponse.json(course, { status: 201 });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid request";
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }
}
