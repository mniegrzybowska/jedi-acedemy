import { NextResponse } from "next/server";
import { CourseService } from "../CourseService";

export class GetCourseByIdController {
  private service: CourseService;

  constructor() {
    this.service = new CourseService();
  }

  handle(id: number) {
    const course = this.service.getCourseById(id);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json(course);
  }
}
