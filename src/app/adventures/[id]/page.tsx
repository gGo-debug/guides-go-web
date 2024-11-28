import { createClient } from '@supabase/supabase-js';
import { Container } from '@/components/ui/container';
import { BookingSection } from '@/components/adventures/BookingSection';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Clock, Users, CheckCircle } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function AdventurePage({ params }: { params: { id: string } }) {
  const { data: adventure } = await supabase
    .from('adventures')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!adventure) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Adventure Details */}
          <div className="space-y-8">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src={adventure.image_url}
                alt={adventure.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{adventure.title}</h1>
              <p className="text-lg text-gray-600">{adventure.description}</p>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{adventure.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{adventure.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>{adventure.group_size}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-5 h-5 rounded-full bg-[#0E9871] text-white flex items-center justify-center text-sm">
                  $
                </div>
                <span>${adventure.price} per person</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">What's Included</h2>
              <ul className="grid grid-cols-2 gap-3">
                {adventure.included_items?.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-[#0E9871]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Bring */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">What to Bring</h2>
              <ul className="grid grid-cols-2 gap-3">
                {adventure.required_items?.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-[#0E9871]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Booking Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <BookingSection 
              adventureId={adventure.id}
              price={adventure.price}
              title={adventure.title}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}