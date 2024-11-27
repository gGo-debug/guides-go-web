import { createClient } from '@supabase/supabase-js';
import { Container } from '@/components/ui/container';
import AdventureCard from '@/components/adventures/AdventureCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Adventures - Guides GO',
  description: 'Discover and book unique adventures with expert local guides.',
};

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function AdventuresPage() {
  const { data: adventures } = await supabase
    .from('adventures')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

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

          {/* Adventures Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adventures?.map((adventure) => (
              <AdventureCard 
                key={adventure.id} 
                adventure={adventure} 
              />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}