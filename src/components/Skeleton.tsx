import Container from "./container";

// components/Skeleton.tsx
export default function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded-md ${className}`}
    />
  );
}
// components/TodaySkeleton.tsx
export function TodaySkeleton() {
  return (
    <section className="flex flex-col gap-4">
      {/* title */}
      <Skeleton className="h-6 w-40" />

      <Container className="text-center flex flex-col gap-4">
        {/* temp */}
        <Skeleton className="h-12 w-24 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-4 w-28 mx-auto" />

        {/* hourly */}
        <div className="flex gap-6 overflow-x-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-3 w-8" />
            </div>
          ))}
        </div>
      </Container>

      {/* bottom cards */}
      <div className="flex gap-4">
        <Container className="flex flex-col items-center gap-2 px-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </Container>

        <Container className="flex gap-4 px-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-3 w-10" />
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}


// components/ForecastSkeleton.tsx
export function ForecastSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      <Skeleton className="h-6 w-40" />

      {Array.from({ length: 7 }).map((_, i) => (
        <Container key={i} className="flex justify-between items-center p-4">
          {/* left */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* right */}
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-12" />
            ))}
          </div>
        </Container>
      ))}
    </section>
  );
}