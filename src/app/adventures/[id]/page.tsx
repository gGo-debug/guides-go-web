// import { createClient } from '@supabase/supabase-js';
// import { Container } from '@/components/ui/container';
// import { BookingSection } from '@/components/adventures/BookingSection';
// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import { MapPin, Clock, Users, CheckCircle } from 'lucide-react';
// import type { Metadata } from 'next';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
// const supabase = createClient(supabaseUrl, supabaseKey);

// interface Adventure {
//   id: string;
//   title: string;
//   description: string;
//   location: string;
//   duration: string;
//   price: number;
//   group_size: string;
//   image_url: string;
//   included_items: string[];
//   required_items: string[];
// }

// async function getAdventure(id: string): Promise<Adventure | null> {
//   const { data, error } = await supabase
//     .from('adventures')
//     .select('*')
//     .eq('id', id)
//     .single();

//   if (error) {
//     console.error('Error fetching adventure:', error);
//     return null;
//   }

//   return data;
// }

// function AdventureDetails({ adventure }: { adventure: Adventure }) {
//   return (
//     <div className="space-y-8">
//       <div className="relative h-[400px] rounded-2xl overflow-hidden">
//         <Image
//           src={adventure.image_url}
//           alt={adventure.title}
//           fill
//           className="object-cover"
//           priority
//         />
//       </div>

//       <div>
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">{adventure.title}</h1>
//         <p className="text-lg text-gray-600">{adventure.description}</p>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="flex items-center gap-2 text-gray-600">
//           <MapPin className="w-5 h-5" />
//           <span>{adventure.location}</span>
//         </div>
//         <div className="flex items-center gap-2 text-gray-600">
//           <Clock className="w-5 h-5" />
//           <span>{adventure.duration}</span>
//         </div>
//         <div className="flex items-center gap-2 text-gray-600">
//           <Users className="w-5 h-5" />
//           <span>{adventure.group_size}</span>
//         </div>
//         <div className="flex items-center gap-2 text-gray-600">
//           <div className="w-5 h-5 rounded-full bg-[#0E9871] text-white flex items-center justify-center text-sm">
//             $
//           </div>
//           <span>${adventure.price} per person</span>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-2xl font-semibold text-gray-900">What's Included</h2>
//         <ul className="grid grid-cols-2 gap-3">
//           {adventure.included_items?.map((item: string) => (
//             <li key={item} className="flex items-center gap-2 text-gray-600">
//               <CheckCircle className="w-5 h-5 text-[#0E9871]" />
//               <span>{item}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-2xl font-semibold text-gray-900">What to Bring</h2>
//         <ul className="grid grid-cols-2 gap-3">
//           {adventure.required_items?.map((item: string) => (
//             <li key={item} className="flex items-center gap-2 text-gray-600">
//               <div className="w-2 h-2 rounded-full bg-[#0E9871]" />
//               <span>{item}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// type PageProps = {
//   params: Promise<{ id: string }>;
// };

// export async function generateMetadata(
//   props: PageProps
// ): Promise<Metadata> {
//   const { id } = await props.params;
//   const adventure = await getAdventure(id);

//   if (!adventure) {
//     return {
//       title: 'Adventure Not Found',
//       description: 'The requested adventure could not be found.',
//     };
//   }

//   return {
//     title: `${adventure.title} - Book Now`,
//     description: adventure.description,
//   };
// }

// export default async function Page(props: PageProps) {
//   const { id } = await props.params;
//   const adventure = await getAdventure(id);

//   if (!adventure) {
//     notFound();
//   }

//   return (
//     <main className="min-h-screen py-20">
//       <Container>
//         <div className="grid lg:grid-cols-2 gap-12">
//           <AdventureDetails adventure={adventure} />

//           <div className="lg:sticky lg:top-24 h-fit">
//             <BookingSection 
//               adventureId={adventure.id}
//               price={adventure.price}
//               title={adventure.title}
//             />
//           </div>
//         </div>
//       </Container>
//     </main>
//   );
// }

// app/adventures/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ImageGallery } from "@/components/adventures/ImageGallery";
import { BookingSection } from "@/components/adventures/BookingSection";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPin,
  Clock,
  Users,
  Star,
  CheckCircle,
  Award,
  Loader2
} from "lucide-react";

interface Adventure {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;                // Original duration field
  duration_minutes: number;        // New duration field
  price: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  group_size: string;             // Original group size field
  min_group_size: number;         // New group size field
  max_group_size: number;         // New group size field
  guide_id: string;
  image_url: string;
  available_dates: any;           // jsonb type
  included_items: string[];
  required_items: string[];
  category: string;
  average_rating: number;
  review_count: number;
  is_featured: boolean;
  status: 'active' | 'draft' | 'cancelled';
  created_at: string;
}

interface GuideProfile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url: string;            // Adjust if your profile table uses a different field
  bio: string;
}

export default function AdventurePage({ params }: { params: { id: string } }) {
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [guide, setGuide] = useState<GuideProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdventureDetails();
  }, [params.id]);

  const fetchAdventureDetails = async () => {
    try {
      // First fetch the adventure
      const { data: adventureData, error: adventureError } = await supabase
        .from('adventures')
        .select('*')
        .eq('id', params.id)
        .eq('status', 'active')
        .single();

      if (adventureError) throw adventureError;

      if (!adventureData) {
        throw new Error('Adventure not found');
      }

      setAdventure(adventureData);

      // Then fetch the guide details
      if (adventureData.guide_id) {
        const { data: guideData, error: guideError } = await supabase
          .from('profiles')  // Using 'profiles' instead of 'guide_profiles'
          .select('*')
          .eq('id', adventureData.guide_id)
          .single();

        if (guideError) throw guideError;
        setGuide(guideData);
      }
    } catch (err) {
      console.error('Error fetching adventure details:', err);
      setError(err instanceof Error ? err.message : 'Failed to load adventure details');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get group size display
  const getGroupSizeDisplay = (adventure: Adventure): string => {
    if (adventure.min_group_size && adventure.max_group_size) {
      return `${adventure.min_group_size}-${adventure.max_group_size} people`;
    }
    return adventure.group_size;
  };

  // Helper function to get duration display
  const getDurationDisplay = (adventure: Adventure): string => {
    if (adventure.duration_minutes) {
      const hours = Math.floor(adventure.duration_minutes / 60);
      const minutes = adventure.duration_minutes % 60;
      return hours > 0 
        ? `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} min` : ''}`
        : `${minutes} minutes`;
    }
    return adventure.duration;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !adventure) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        {error || 'Adventure not found'}
      </div>
    );
  }

  return (
    <main className="py-12">
      <Container>
        <div className="grid lg:grid-cols-[1fr,400px] gap-12">
          {/* Left Column - Adventure Details */}
          <div className="space-y-8">
            {/* Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <img
                src={adventure.image_url}
                alt={adventure.title}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Title and Basic Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {adventure.title}
              </h1>

              <div className="flex items-center gap-4 flex-wrap">
                <Badge variant="secondary">{adventure.difficulty}</Badge>
                <Badge variant="outline">{adventure.category}</Badge>
                {adventure.average_rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{adventure.average_rating}</span>
                    <span className="text-muted-foreground">
                      ({adventure.review_count} reviews)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-muted-foreground">{adventure.location}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-muted-foreground">
                      {getDurationDisplay(adventure)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Group Size</p>
                    <p className="text-muted-foreground">
                      {getGroupSizeDisplay(adventure)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rest of the content (description, included items, etc.) remains the same */}
            {/* ... */}
          </div>

          {/* Right Column - Booking Section */}
          <div className="lg:sticky lg:top-8 h-fit">
            <BookingSection 
              adventureId={adventure.id}
              basePrice={adventure.price}
              maxGroupSize={adventure.max_group_size || parseInt(adventure.group_size.split('-')[1]) || 10}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}