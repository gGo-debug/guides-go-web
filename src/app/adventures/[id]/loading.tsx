import { Container } from '@/components/ui/container';

export default function Loading() {
  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {/* Image skeleton */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gray-200 animate-pulse" />

            {/* Title and description skeleton */}
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-3/4" />
              <div className="h-24 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Details skeleton */}
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                </div>
              ))}
            </div>

            {/* Included items skeleton */}
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-48" />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking section skeleton */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-gray-200 rounded-2xl animate-pulse h-[600px]" />
          </div>
        </div>
      </Container>
    </main>
  );
}