import type { NextRequest } from "next/server";
import { GetCourseByIdController } from "@/server/controller/GetCourseByIdController";
import { UpdateCourseController } from "@/server/controller/UpdateCourseController";
import { DeleteCourseController } from "@/server/controller/DeleteCourseController";

const getByIdController = new GetCourseByIdController();
const updateController = new UpdateCourseController();
const deleteController = new DeleteCourseController();

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  return getByIdController.handle(Number(id));
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  return updateController.handle(Number(id), request);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  return deleteController.handle(Number(id));
}
