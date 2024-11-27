import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Users } from 'lucide-react';

interface AdventureCardProps {
  adventure: {
    id: string;
    title: string;
    description: string;
    location: string;
    duration: string;
    price: number;
    group_size: string;
    image_url: string;
  };
}

export default function AdventureCard({ adventure }: AdventureCardProps) {
  return (
    <Link 
      href={`/adventures/${adventure.id}`}
      className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 rounded-t-xl overflow-hidden">
        <Image
          src={adventure.image_url}
          alt={adventure.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-[#0E9871]">
          ${adventure.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#0E9871] transition-colors">
          {adventure.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2">
          {adventure.description}
        </p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {adventure.location}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {adventure.duration}
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {adventure.group_size}
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-[#0E9871] to-[#39CF8D] text-white rounded-lg 
          py-2 px-4 text-sm font-medium hover:opacity-90 transition-opacity">
          View Details
        </button>
      </div>
    </Link>
  );
}