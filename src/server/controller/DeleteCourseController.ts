import { NextResponse } from "next/server";
import { CourseService } from "../CourseService";

export class DeleteCourseController {
  private service: CourseService;

  constructor() {
    this.service = new CourseService();
  }

  handle(id: number) {
    const deleted = this.service.deleteCourse(id);
    if (!deleted) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  }
}
