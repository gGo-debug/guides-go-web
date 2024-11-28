import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Container } from '@/components/ui/container';
import { BookingSection } from '@/components/adventures/BookingSection';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Clock, Users, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Adventure {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  group_size: string;
  image_url: string;
  included_items: string[];
  required_items: string[];
}

interface PageProps {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}

async function getAdventure(id: string): Promise<Adventure> {
  const { data, error } = await supabase
    .from('adventures')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }

  return data;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const adventure = await getAdventure(params.id);

  return {
    title: `${adventure.title} - Book Now`,
    description: adventure.description,
  };
}

function AdventureDetails({ adventure }: { adventure: Adventure }) {
  return (
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

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">What's Included</h2>
        <ul className="grid grid-cols-2 gap-3">
          {adventure.included_items?.map((item: string) => (
            <li key={item} className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="w-5 h-5 text-[#0E9871]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">What to Bring</h2>
        <ul className="grid grid-cols-2 gap-3">
          {adventure.required_items?.map((item: string) => (
            <li key={item} className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 rounded-full bg-[#0E9871]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default async function Page({ params, searchParams }: PageProps) {
  const adventure = await getAdventure(params.id);

  return (
    <main className="min-h-screen py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12">
          <Suspense fallback={<div>Loading...</div>}>
            <AdventureDetails adventure={adventure} />
          </Suspense>

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