export default function Loading() {
  return (
    <>
      {/* Accessible loading announcement for screen readers */}
      <span className="sr-only">Loading content...</span>

      <div aria-hidden="true">
        {/* Header Skeleton */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
          <div className="max-w-2xl w-full">
            {/* Title line 1 */}
            <div
              className="h-10 md:h-14 lg:h-[64px] w-[85%] bg-surface-container-high rounded-2xl animate-pulse"
              style={{ animationDelay: "0ms" }}
            />
            {/* Title line 2 */}
            <div
              className="h-10 md:h-14 lg:h-[64px] w-[55%] bg-surface-container-high rounded-2xl animate-pulse mt-3"
              style={{ animationDelay: "75ms" }}
            />
          </div>
          {/* CTA link placeholder */}
          <div
            className="h-5 w-28 bg-surface-container-high rounded-lg animate-pulse shrink-0"
            style={{ animationDelay: "150ms" }}
          />
        </header>

        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-bento-gap auto-rows-min">
          {/* Stat Card 1 — col-span-3 */}
          <div
            className="md:col-span-3 h-[200px] bg-surface-container-high border border-white/5 rounded-2xl animate-pulse p-8 flex flex-col items-center justify-center gap-3"
            style={{ animationDelay: "100ms" }}
          >
            <div className="h-8 w-28 bg-white/[0.04] rounded-xl" />
            <div className="h-3 w-40 bg-white/[0.04] rounded-lg" />
          </div>

          {/* Stat Card 2 — col-span-6 */}
          <div
            className="md:col-span-6 h-[200px] bg-surface-container-high border border-white/5 rounded-2xl animate-pulse p-8 flex flex-col items-center justify-center gap-3"
            style={{ animationDelay: "200ms" }}
          >
            <div className="h-12 w-44 bg-white/[0.04] rounded-xl" />
            <div className="h-3 w-48 bg-white/[0.04] rounded-lg" />
          </div>

          {/* Stat Card 3 — col-span-3 */}
          <div
            className="md:col-span-3 h-[200px] bg-surface-container-high border border-white/5 rounded-2xl animate-pulse p-8 flex flex-col items-center justify-center gap-3"
            style={{ animationDelay: "300ms" }}
          >
            <div className="h-8 w-28 bg-white/[0.04] rounded-xl" />
            <div className="h-3 w-36 bg-white/[0.04] rounded-lg" />
          </div>

          {/* Stat Card 4 — col-span-4 */}
          <div
            className="md:col-span-4 h-[240px] bg-surface-container-high border border-white/5 rounded-2xl animate-pulse p-8 flex flex-col justify-center items-start gap-3"
            style={{ animationDelay: "400ms" }}
          >
            <div className="w-9 h-9 bg-white/[0.04] rounded-full" />
            <div className="h-5 w-32 bg-white/[0.04] rounded-lg" />
            <div className="h-3 w-48 bg-white/[0.04] rounded-lg" />
          </div>

          {/* About Card — col-span-8 */}
          <div
            className="md:col-span-8 h-[240px] bg-surface-container-high border border-white/5 rounded-2xl animate-pulse p-8 flex flex-col justify-between"
            style={{ animationDelay: "500ms" }}
          >
            <div className="flex flex-col gap-3">
              <div className="h-5 w-56 bg-white/[0.04] rounded-lg" />
              <div className="h-3 w-full max-w-md bg-white/[0.04] rounded-lg" />
              <div className="h-3 w-full max-w-sm bg-white/[0.04] rounded-lg" />
            </div>
            <div className="h-4 w-32 bg-white/[0.04] rounded-lg" />
          </div>

          {/* Featured Project — col-span-12 */}
          <div
            className="md:col-span-12 min-h-[500px] bg-surface-container-high border border-white/5 rounded-2xl animate-pulse p-8 flex flex-col"
            style={{ animationDelay: "600ms" }}
          >
            {/* Featured header row */}
            <div className="flex justify-between items-center mb-8">
              <div className="h-6 w-44 bg-white/[0.04] rounded-lg" />
              <div className="h-4 w-28 bg-white/[0.04] rounded-lg" />
            </div>
            {/* Image area */}
            <div className="flex-grow rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden">
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-pulse" />
              {/* Bottom caption area */}
              <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col gap-3">
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-white/[0.04] rounded-full" />
                  <div className="h-6 w-14 bg-white/[0.04] rounded-full" />
                  <div className="h-6 w-20 bg-white/[0.04] rounded-full" />
                </div>
                <div className="h-5 w-64 bg-white/[0.04] rounded-lg" />
                <div className="h-3 w-96 max-w-full bg-white/[0.04] rounded-lg" />
              </div>
            </div>
          </div>

          {/* Certifications — col-span-12 */}
          <div
            className="md:col-span-12 bg-surface-container-high border border-white/5 rounded-2xl animate-pulse p-8"
            style={{ animationDelay: "700ms" }}
          >
            {/* Section title */}
            <div className="h-3 w-48 bg-white/[0.04] rounded-lg mx-auto mb-8" />
            {/* 4-column cert grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="h-20 bg-white/[0.04] rounded-lg border border-white/5" />
              <div className="h-20 bg-white/[0.04] rounded-lg border border-white/5" />
              <div className="h-20 bg-white/[0.04] rounded-lg border border-white/5" />
              <div className="h-20 bg-white/[0.04] rounded-lg border border-white/5" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
