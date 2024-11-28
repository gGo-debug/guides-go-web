import { Container } from '@/components/ui/container';

export default function Loading() {
  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="relative h-[400px] rounded-2xl bg-gray-200 animate-pulse" />
            
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-20 bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-[600px] bg-gray-200 rounded-2xl animate-pulse" />
        </div>
      </Container>
    </main>
  );
}

