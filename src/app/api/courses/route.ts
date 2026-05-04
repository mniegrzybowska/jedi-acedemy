import type { NextRequest } from "next/server";
import { GetAllCoursesController } from "@/server/controller/GetAllCoursesController";
import { CreateCourseController } from "@/server/controller/CreateCourseController";

const getAllController = new GetAllCoursesController();
const createController = new CreateCourseController();

export function GET() {
  return getAllController.handle();
}

export function POST(request: NextRequest) {
  return createController.handle(request);
}
