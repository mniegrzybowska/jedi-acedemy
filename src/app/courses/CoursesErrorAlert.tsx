export function CoursesErrorAlert() {
  return (
    <div role="alert" className="rounded-lg border border-sith-red/30 bg-sith-red/10 px-6 py-8 text-center">
      <p className="text-lg font-semibold text-sith-red">Failed to load courses</p>
      <p className="mt-2 text-dust-gray">
        Something went wrong while fetching the course list. Please try again later.
      </p>
    </div>
  );
}
