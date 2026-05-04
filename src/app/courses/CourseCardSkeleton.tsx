export function CourseCardSkeleton() {
  return (
    <div className="rounded-lg border border-nebula-gray bg-imperial-gray p-6 shadow-[0_4px_16px_rgba(0,0,0,0.4)] animate-pulse">
      <div className="h-5 w-3/4 rounded bg-nebula-gray mb-3" />
      <div className="h-3 w-1/3 rounded bg-nebula-gray mb-4" />
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full rounded bg-nebula-gray" />
        <div className="h-3 w-5/6 rounded bg-nebula-gray" />
        <div className="h-3 w-2/3 rounded bg-nebula-gray" />
      </div>
      <div className="h-3 w-1/2 rounded bg-nebula-gray" />
    </div>
  );
}
