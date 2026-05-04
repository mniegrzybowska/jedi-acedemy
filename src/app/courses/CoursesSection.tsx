"use client";

import { CourseCardSkeleton } from "./CourseCardSkeleton";
import { CoursesErrorAlert } from "./CoursesErrorAlert";
import { CourseGrid } from "./CourseGrid";
import { useCourses } from "./useCourses";

function CoursesContent() {
  const { data: courses = [], isLoading, isError } = useCourses();

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <CoursesErrorAlert />;
  }

  return <CourseGrid courses={courses} />;
}

export function CoursesSection() {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 py-12 md:px-6">
      <h2 className="mb-8 text-2xl font-semibold text-crawl-gold">
        Available Courses
      </h2>
      <CoursesContent />
    </main>
  );
}
