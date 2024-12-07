import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Users } from 'lucide-react';

interface AdventureCardProps {
  adventure: {
    id: string;
    title: string;
    description: string;
    location: string;
    duration_minutes: number;
    price: number;
    min_group_size: number;
    max_group_size: number;
    image_url: string;
  };
}

export default function AdventureCard({ adventure }: AdventureCardProps) {
  // Format duration for display
  const formatDuration = (minutes: number) => {
    if (minutes >= 1440) { // More than a day
      const days = Math.floor(minutes / 1440);
      return `${days} day${days > 1 ? 's' : ''}`;
    } else if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    return `${minutes} minutes`;
  };

  // Format group size for display
  const formatGroupSize = (min: number, max: number) => {
    if (min === max) return `${min} people`;
    return `${min}-${max} people`;
  };

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
            {formatDuration(adventure.duration_minutes)}
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {formatGroupSize(adventure.min_group_size, adventure.max_group_size)}
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