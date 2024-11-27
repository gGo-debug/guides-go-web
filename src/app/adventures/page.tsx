import { createClient } from '@supabase/supabase-js';
import AdventureGrid from '@/components/adventures/AdventureGrid';
import { AdventureFilters } from '@/components/adventures/AdventureFilters';
import { Container } from '@/components/ui/container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Adventures - Guides GO',
  description: 'Discover and book unique adventures with expert local guides.',
};

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function BookingPage() {
  const { data: adventures } = await supabase
    .from('adventures')
    .select(`
      *,
      guide:guide_id (
        name,
        profile_image,
        experience_years
      )
    `)
    .eq('status', 'active')
    .order('is_featured', { ascending: false });

  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Discover Amazing{' '}
              <span className="bg-gradient-to-r from-[#0E9871] to-[#39CF8D] text-transparent bg-clip-text">
                Adventures
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore unique experiences curated by our expert local guides. 
              Book your next adventure and create unforgettable memories.
            </p>
          </div>

          {/* Main content */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Filters */}
            <div className="lg:col-span-3">
              <AdventureFilters />
            </div>

            {/* Adventures Grid */}
            <div className="lg:col-span-9">
              <AdventureGrid adventures={adventures || []} />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}