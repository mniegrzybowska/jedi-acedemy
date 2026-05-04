import Link from "next/link";
import { JediAvatar } from "./JediAvatar";
import type { Course } from "./types";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${String(course.id)}`}
      className="group rounded-lg border border-nebula-gray bg-imperial-gray p-6 shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-crawl-gold hover:shadow-[0_0_10px_rgba(245,197,24,0.3),0_0_20px_rgba(245,197,24,0.1)] hover:[transform:perspective(800px)_rotateX(-1deg)_rotateY(1deg)_translateY(-4px)]"
    >
      <h3 className="text-lg font-semibold text-star-white group-hover:text-crawl-gold transition-colors duration-300">
        {course.title}
      </h3>
      <div className="mt-2 flex items-center gap-2">
        <JediAvatar name={course.instructorName} />
        <span className="text-sm text-crawl-gold">
          {course.instructorName}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-dust-gray line-clamp-3">
        {course.description}
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-dust-gray">
        <span>{course.schedule}</span>
        <span>
          {course.maxCapacity - course.enrollmentCount} spots left
        </span>
      </div>
    </Link>
  );
}
