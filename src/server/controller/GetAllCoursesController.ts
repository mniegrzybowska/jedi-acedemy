import { NextResponse } from "next/server";
import { CourseService } from "../CourseService";

export class GetAllCoursesController {
  private service: CourseService;

  constructor() {
    this.service = new CourseService();
  }

  handle() {
    const courses = this.service.getAllCourses();
    return NextResponse.json(courses);
  }
}
